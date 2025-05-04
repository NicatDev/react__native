import { defineConfig } from "@mdreal/ui-kit/server";

import { palette } from "./palette";

export const baseConfig = defineConfig({
  colors(colors) {
    return {
      primary: { DEFAULT: colors.primary["60"] },
      secondary: { DEFAULT: colors.secondary["60"] },
      success: { DEFAULT: colors.success["60"] },
      danger: { DEFAULT: colors.danger["60"] },
      neutral: { DEFAULT: colors.neutral["60"] },
      link: { DEFAULT: colors.primary["50"] }
    };
  },
  palette,
  extra: {
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        margin: {
          26: "6.5rem"
        },
        fontSize: {
          "1.5xl": "1.375rem"
        },
        animation: {
          spin: "spin 1s linear infinite"
        },
        keyframes: {
          spin: { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } }
        },
        borderRadius: {
          "2.25xl": "1.125rem"
        }
      }
    }
  }
});
