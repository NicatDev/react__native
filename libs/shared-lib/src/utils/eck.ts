type MergeKeys<TKeys extends readonly (TemplateStringsArray | string)[]> = TKeys extends [
  infer T extends string,
  ...infer R extends readonly (TemplateStringsArray | string)[]
]
  ? R["length"] extends 1
    ? T
    : `${T}:${MergeKeys<R>}`
  : "";

export interface ToString {
  toString(): string;
}

interface ExtensionFn<TKey extends string> {
  <TKeys extends (TemplateStringsArray | string)[]>(...keys: TKeys): MergeKeys<[TKey, ...TKeys]>;

  e<TNewKey extends string, TExtension extends object>(
    key: TNewKey,
    extension: (cb: ExtensionFn<MergeKeys<[TKey, TNewKey]>>) => TExtension
  ): TExtension & ToString;
}

export const eck = <TKey extends string, TExtension extends object>(
  key: TKey,
  extension: (cb: ExtensionFn<TKey>) => TExtension
) => {
  const c: ExtensionFn<TKey> = <TKeys extends (TemplateStringsArray | string)[]>(...keys: TKeys) =>
    `${key}:${keys.join(":")}` as MergeKeys<[TKey, ...TKeys]>;
  c.e = (newKey, newExtension) => eck(c(newKey), newExtension);

  return Object.assign(key, extension(c));
};
