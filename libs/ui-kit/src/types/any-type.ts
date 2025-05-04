export type AnyType<T> = T extends (...args: infer U) => infer R ? (...args: U) => R : any;
