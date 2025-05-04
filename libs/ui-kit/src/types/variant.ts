import type { ValueOf } from "type-fest";

export const Variants = {
  Primary: "primary",
  Secondary: "secondary",
  Danger: "danger",
  Link: "link"
} as const;

export const variants = [Variants.Primary, Variants.Secondary, Variants.Danger, Variants.Link] as const;
export type Variant = ValueOf<typeof Variants>;
