import { Config, format, resolveConfig, resolveConfigFile } from "prettier";

export const prettifyJson = async (json: object, filepath = "something.json") => {
  let config = prettifyJson.config;
  if (!config) {
    const configFile = await resolveConfigFile();
    if (configFile) config = await resolveConfig(configFile);
    else config = {};
    prettifyJson.config = config;
  }

  return format(JSON.stringify(json, null, 2), { ...config, parser: "json", filepath });
};

prettifyJson.config = null as null | Config;
