export interface EntityModel {
  id: string | number;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Roles {
  Admin = "admin",
  User = "user",
}
