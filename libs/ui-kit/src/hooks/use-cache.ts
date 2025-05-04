import { cache } from "@/utils/cache";

export const useCache = <TResponse>(name: string) => {
  return {
    get(key: string) {
      return cache.get(`${key}:${name}`);
    },
    has(key: string) {
      return cache.has(`${key}:${name}`);
    },
    set(key: string, value: TResponse) {
      cache.set(`${key}:${name}`, value);
    }
  };
};
