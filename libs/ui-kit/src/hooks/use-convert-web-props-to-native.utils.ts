import { AnyType } from "../types/any-type";

export const transferHandler = (props: Record<string, any>, key: string, handler?: AnyType<Function>) => {
  if (typeof handler === "function") {
    const obj = {
      [key](...args: any[]) {
        return handler(...args);
      }
    };
    Object.defineProperty(props, key, { value: obj[key], enumerable: true, configurable: true, writable: true });
  }
};
