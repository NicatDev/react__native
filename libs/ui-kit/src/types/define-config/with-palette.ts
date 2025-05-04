export type WithPalette<TDefaultColors> = {
  [K in keyof TDefaultColors]: TDefaultColors[K] | Record<string, string>;
};
