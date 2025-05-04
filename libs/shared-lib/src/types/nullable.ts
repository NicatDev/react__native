export type NullableFields<T> = {
  [K in keyof T]: T[K] | null;
};
