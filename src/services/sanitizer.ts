export class Sanitizer<T> {
  constructor(public object: T) {}

  /**
   * TODO: Implementation
   * Here we have just created a placeholder
   */
  sanitize(): T {
    return Object.fromEntries(
      Object.entries(this.object as object).map(([key, value]) => {
        return [key, value.trim().toLowerCase()];
      })
    ) as T;
  }
}
