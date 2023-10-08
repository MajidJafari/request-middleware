import { IUser } from "../models/user";
import { IBaseRepository } from "../types/base-repository";
import { Promisified } from "../types/global";
import { Roles } from "../types/models";

export class UserRepository implements IBaseRepository<IUser> {
  find(query: Partial<IUser>) {
    return this.getMockValue();
  }

  list() {
    return [this.getMockValue()];
  }

  async save(record: IUser): Promise<IUser> {
    return this.getMockValue();
  }

  findById(id: string | number): IUser {
    return this.getMockValue(id);
  }

  updateById(id: string | number, updated: Partial<IUser>): IUser {
    return this.getMockValue(id);
  }

  private getMockValue(id: string | number = "test"): IUser {
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
