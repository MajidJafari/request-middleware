import { UserCreateDTO } from "../models/dto/create-user.dto";
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

  async save(record: UserCreateDTO): Promise<IUser> {
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
      password:
        "56776e13168def86e53a64fbd5d6d7954331f84e0cd4e36044a81b8f83de19cb495c5a097199c0c8f500a2529b96340d96e36ac8266c2e14f201d5658eb0d53e",
      refreshToken: "a9c80b48-4de2-4471-b13f-4d27394cd535",
      role: Roles.Admin,
      createdAt: now,
      updatedAt: now,
      salt: Buffer.from("testSalt").toString("hex"),
    };
  }
}
