import { Config, format, resolveConfig, resolveConfigFile } from "prettier";

const prettierConfigFile = await resolveConfigFile();
const prettierConfig = prettierConfigFile ? await resolveConfig(prettierConfigFile) : {};
export const formatFile = async (file: string, parser: Config["parser"]) => {
  return format(file, { ...prettierConfig, parser });
};
