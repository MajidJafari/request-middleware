import { EntityModel, Roles } from "../types/models";

export interface IUser extends EntityModel {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  refreshToken: string;
  role: Roles;
  activated: boolean;
}
