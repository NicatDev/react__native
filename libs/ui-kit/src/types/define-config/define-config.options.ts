import { type Config } from "tailwindcss";
import { DefaultColors } from "tailwindcss/types/generated/colors";

import { Colors } from "./colors";
import { Palette } from "./palette";
import { VariantColors } from "./variant-colors";
import { WithPalette } from "./with-palette";

export interface DefineConfigOptions<
  TPalette extends Palette,
  TColorPalette extends Palette = TPalette,
  RColors = TPalette extends WithPalette<DefaultColors> ? VariantColors : Colors<TPalette>
> {
  content?: Config["content"];
  colors?: Partial<RColors> | ((colors: TPalette & TColorPalette) => RColors);
  extra?: Omit<Config, "content">;
  palette?: TPalette;
}
