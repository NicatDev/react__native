const { getDefaultConfig } = require("expo/metro-config");
const { resolve } = require("node:path");
const { withNativeWind } = require("nativewind/metro");

const workspaceRoot = resolve(__dirname, "../..");
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [resolve(projectRoot, "node_modules"), resolve(workspaceRoot, "node_modules")];
config.resolver.disableHierarchicalLookup = true;

module.exports = withNativeWind(config, { input: "./app/main.css" });
