type Observer<T> = (data: T) => void;

// Global cache and observers
const globalCache: Map<string, any> = new Map();
const globalObservers: Map<string, Observer<any>[]> = new Map();

function subscribe<T>(key: string, observer: Observer<T>): () => void {
  if (!globalObservers.has(key)) {
    globalObservers.set(key, []);
  }
  globalObservers.get(key)?.push(observer);
  return () => unsubscribe(key, observer);
}

function unsubscribe<T>(key: string, observer: Observer<T>): void {
  const observerList = globalObservers.get(key);
  if (observerList) {
    globalObservers.set(
      key,
      observerList.filter(obs => obs !== observer)
    );
  }
}

function notify<T>(key: string, data: T): void {
  const observerList = globalObservers.get(key);
  if (observerList) {
    observerList.forEach(observer => observer(data));
  }
}

function set<T>(key: string, value: T): void {
  globalCache.set(key, value);
  notify(key, value);
}

function get<T>(key: string): T | undefined {
  return globalCache.get(key);
}

function has(key: string): boolean {
  return globalCache.has(key);
}

function remove<T>(key: string): void {
  if (globalCache.has(key)) {
    globalCache.delete(key);
    notify(key, undefined as unknown as T);
  }
}

function clear(): void {
  globalCache.forEach((_, key) => remove(key));
}

export const cache = { subscribe, unsubscribe, notify, set, get, has, remove, clear };
