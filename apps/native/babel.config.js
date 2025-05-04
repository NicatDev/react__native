module.exports = api => {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins: [
      "react-native-reanimated/plugin",
      ["module-resolver", { alias: { "@mdreal/ui-kit$": "@mdreal/ui-kit/native", "^react-use$": "react-use-native" } }]
    ]
  };
};
