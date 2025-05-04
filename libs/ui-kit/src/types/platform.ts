export const Platform = {
  Web: "web",
  Native: "native"
} as const;

export type Platform = (typeof Platform)[keyof typeof Platform];
