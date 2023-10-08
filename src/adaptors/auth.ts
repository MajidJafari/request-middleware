import { App } from "../components/app";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { readFileSync } from "fs";
import fromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken;
import { Strategies, UserJWT } from "../types/auth";
import { JwtAuthServices } from "../services/jwt-auth";
import "../adaptors/repository";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: UserJWT, done) {
  done(null, user);
});

declare module "../components/app" {
  interface App {
    auth: () => App;
  }
}

App.prototype.auth = function () {
  const authService = new JwtAuthServices(
    this.getConfig("JWT_EXPIRES_IN"),
    this.repositories.userRepository
  );

  passport.use(
    Strategies.User,
    new Strategy(
      {
        algorithms: ["RS256"],
        secretOrKey: readFileSync("login_public.pem", "utf8"),
        jwtFromRequest: fromAuthHeaderAsBearerToken(),
      },
      authService.verifyUser.bind(authService)
    )
  );

  return this.use(passport.initialize());
};
