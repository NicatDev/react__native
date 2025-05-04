import { Palette } from "./palette";

export type Colors<TPalette extends Palette> = {
  [K in keyof TPalette]: string | Record<"DEFAULT" & string, string>;
};
