import merge from "lodash.merge";

import { dirname, isAbsolute, relative, resolve } from "node:path";

import { type Config } from "tailwindcss";
import _colors from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";

import { Colors } from "../types/define-config/colors";
import { DefineConfigThis } from "../types/define-config/define-config-this";
import { DefineConfigOptions } from "../types/define-config/define-config.options";
import { Palette } from "../types/define-config/palette";
import { Extend, WithExtendable } from "../types/define-config/with-extendable";
import { WithPalette } from "../types/define-config/with-palette";
import { getCallee } from "./get-callee";
import { scrollbarPlugin } from "./tailwind/plugins/scrollbar";
import { updateTailwindContent } from "./tailwind/update-tailwind-content";

export function defineConfig<
  TPalette extends Palette = WithPalette<DefaultColors>,
  TColorPalette extends Palette = TPalette
>(this: DefineConfigThis | void, options: DefineConfigOptions<TPalette, TColorPalette>): WithExtendable<TPalette> {
  const isInitial = this?.isInitial ?? true;
  const callee = getCallee(isInitial ? 0 : 1);
  if (!callee) {
    throw new Error("Could not find the file that called defineConfig");
  }
  const base = dirname(callee.file);
  const isRoot = process.cwd() === base;

  options.content = options.content
    ? updateTailwindContent(options.content, file =>
        !isRoot ? resolve(base, file) : isAbsolute(file) ? relative(base, file).replace(/\\/g, "/") : file
      )
    : options.content || [];

  const colors =
    typeof options.colors === "function"
      ? options.colors((options.palette || _colors) as any)
      : options.colors || ({} as Colors<TPalette>);

  const mergedColors = merge(colors, options.palette || {});

  const baseConfig = {
    content: options.content || [],
    darkMode: ["class", '[data-mode="dark"]'],
    theme: { extend: { colors: mergedColors as any } },
    plugins: [scrollbarPlugin]
  } satisfies Config;

  const config = merge<Config, Omit<Config, "content">>(baseConfig, options.extra || {});

  const finalConfig = merge<typeof config, Extend<TPalette>>(config, {
    extend<TNewPalette extends Palette = WithPalette<DefaultColors>>(
      newOptions: DefineConfigOptions<TNewPalette, TPalette>
    ) {
      const oldContent = config.content;
      let newContent = newOptions.content || [];

      if (Array.isArray(oldContent) && Array.isArray(newContent)) {
        newContent.push(...oldContent);
      } else if (Array.isArray(oldContent) && !Array.isArray(newContent)) {
        newContent.files.push(...oldContent);
      } else if (!Array.isArray(oldContent) && Array.isArray(newContent)) {
        newContent = { ...oldContent, files: [...newContent, ...oldContent.files] };
      } else {
        newContent = merge(oldContent, newContent);
      }

      return defineConfig.bind({ isInitial: false })(merge(options, newOptions, { content: newContent }) as any);
    }
  });

  Object.assign(process.env, { EXPO_PUBLIC_TAILWIND_CONFIG: JSON.stringify(finalConfig) });
  return finalConfig;
}
