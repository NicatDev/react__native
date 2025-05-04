import { defineConfig } from "./src/utils/define-config";

export default defineConfig({
  content: ["./src/**/*.{js,jsx,ts,tsx}", "!./src/**/*.stories.{js,jsx,ts,tsx}"],
  colors: colors => ({
    primary: { DEFAULT: colors.sky["600"], hover: colors.sky["500"], focus: colors.blue["700"] },
    secondary: {},
    danger: {},
    link: {},
    disabled: { DEFAULT: colors.gray["100"], text: colors.stone["300"] },
    light: "#ccc",
    dark: "#333"
  }),
  extra: {
    theme: {
      extend: {
        borderRadius: {
          "2.5xl": "20px"
        }
      }
    }
  }
});
