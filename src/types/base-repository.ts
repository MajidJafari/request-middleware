import { Promisified } from "./global";
import { EntityModel } from "./models";

/**
 * This is a generic type for repository
 * The concrete class can be in form of any implementation
 * Such as Mongoose Schema, TypeORM Entity Class, or even a simple mocking
 */
export interface IBaseRepository<T extends EntityModel> {
  list(): Promisified<T[]>;
  save(record: T): Promisified<T>;
  find(query: Partial<T>): Promisified<T>;
  findById(id: EntityModel["id"]): Promisified<T>;
  updateById(id: EntityModel["id"], updated: Partial<T>): Promisified<T>;
}
