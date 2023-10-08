import { EntityModel } from "./models";

/**
 * This is a generic type for repository
 * The concrete class can be in form of any implementation
 * Such as Mongoose Schema, TypeORM Entity Class, or even a simple mocking
 */
export interface IBaseRepository<T extends EntityModel> {
  findById(id: EntityModel["id"]): T;
  updateById(id: EntityModel["id"], updated: Partial<T>): T;
}
