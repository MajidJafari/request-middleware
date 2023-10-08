import { createHash } from "crypto";
import { Oauth2 } from "../../types/auth";
import { ControllerAction } from "../../types/routing";
import ClientError from "../../components/error";
import { JwtAuthServices } from "../../services/jwt-auth";
import { pbkdf2Sync } from "crypto";

export const loginController: ControllerAction<Oauth2> = async (
  req: { body: { username: string; password: string } },
  res,
  app
) => {
  const userRepository = app.repositories.userRepository;
  const { username, password } = req.body;
  const user = await userRepository.find({ username, activated: true });

  const hashedPassword = pbkdf2Sync(
    password,
    user.salt,
    1000,
    64,
    "sha512"
  ).toString("hex");

  if (!(user && hashedPassword === user.password)) {
    throw new ClientError(
      401,
      "LOGIN_FAILED",
      "Username or password is wrong.",
      { username }
    );
  }

  return new JwtAuthServices(
    app.getConfig("JWT_EXPIRES_IN"),
    userRepository
  ).getOauth2(user, "RS256", "login_private.pem");
};
