import { Request, NextFunction, Response } from "express";
import { App } from "../components/app";
import { UserRepository } from "../repositories/user-repository";

declare module "../components/app" {
  interface App {
    initRepositories: () => App;
    repositories: {
      userRepository: UserRepository;
    };
  }
}

App.prototype.initRepositories = function () {
  this.repositories = {
    userRepository: new UserRepository(),
  };
  return this;
};
