import { Config } from "tailwindcss";

const preDefinedConfig: Config = process.env.EXPO_PUBLIC_TAILWIND_CONFIG
  ? JSON.parse(process.env.EXPO_PUBLIC_TAILWIND_CONFIG)
  : { content: [], theme: {}, plugins: [] };
export const useTailwindConfig = () => {
  return preDefinedConfig;
};
