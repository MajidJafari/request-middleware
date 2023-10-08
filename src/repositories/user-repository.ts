import { IUser } from "../models/user";
import { IBaseRepository } from "../types/base-repository";
import { Roles } from "../types/models";

export class UserRepository implements IBaseRepository<IUser> {
  findById(id: string | number): IUser {
    return this.getMockValue(id);
  }

  updateById(id: string | number, updated: Partial<IUser>): IUser {
    return this.getMockValue(id);
  }

  private getMockValue(id: string | number): IUser {
    const now = new Date();
    return {
      id,
      username: "test",
      firstName: "Ali",
      lastName: "Alaki",
      activated: true,
      password: "fed3b61b26081849378080b34e693d2e",
      refreshToken: "a9c80b48-4de2-4471-b13f-4d27394cd535",
      role: Roles.Admin,
      createdAt: now,
      updatedAt: now,
    };
  }
}
