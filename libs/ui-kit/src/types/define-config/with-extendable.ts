import { Config } from "tailwindcss";

import { DefineConfigOptions } from "./define-config.options";
import { Palette } from "./palette";

export interface Extend<TPalette extends Palette> {
  extend<TNewPalette extends Palette>(
    options: DefineConfigOptions<TNewPalette, TPalette>
  ): WithExtendable<TPalette & TNewPalette>;
}

export type WithExtendable<TPalette extends Palette> = Config & Extend<TPalette>;
