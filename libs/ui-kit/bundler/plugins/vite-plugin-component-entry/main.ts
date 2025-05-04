import { readFileSync, writeFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";

import { glob } from "glob";
import { PackageJson } from "type-fest";
import { Plugin, defineConfig } from "vite";

import { prettifyJson } from "../../utils/prettify-json";

export interface ComponentsEntryPluginOptions {
  /**
   * Directory where the components are located
   * @default "src/components"
   */
  dir?: string;

  /**
   * Entry component name template
   * Variables:
   * - [name]: component name
   *
   * @default "[name]"
   */
  template?: string;

  /**
   * Whether to generate package exports
   * @default false
   */
  generateExports?: boolean;

  /**
   * Whether the plugin is used in a dts plugin types rollup
   * @default false
   */
  isDtsPluginTypesRollup?: boolean;
}

const configureName = (template: string, name: string, extname: string) => {
  const ext = extname.slice(1);
  const nameWithoutExtension = name.replace(`.${ext}`, "");
  return template.replace(/\[name]/g, nameWithoutExtension);
};

export const componentEntryPlugin = ({
  dir = "src/components",
  template = "[name]",
  isDtsPluginTypesRollup = false,
  generateExports = false
}: ComponentsEntryPluginOptions = {}): Plugin => {
  let outDir: string;
  const renderedEntries = new Map<string, string>();
  const nameEntryMap = new Map<string, string>();

  const extensions = ["js", "jsx", "ts", "tsx"];
  const extString = extensions.join(",");

  const pathIndexComponents = glob.sync(`${dir}/*/index.{${extString}}`, { posix: true });
  const pathIndexNativeComponents = glob.sync(`${dir}/*/*.native.{${extString}}`, {
    posix: true
  });

  const pathRawComponents = glob.sync(`${dir}/*.{${extString}}`, {
    posix: true,
    ignore: ["src/components/index.ts", "src/components/index.native.ts"]
  });
  const pathComponents = pathRawComponents.filter(path => !path.match(/\.native\.[jt]sx?$/));
  const pathNativeComponents = pathRawComponents.filter(path => path.match(/\.native\.[jt]sx?$/));

  const entries = generateExports
    ? {
        ...pathIndexComponents.reduce(
          (acc, path) => {
            const name = path.split("/").at(-2)!;
            const entry = configureName(template, name, extname(path));
            nameEntryMap.set(entry, name);
            acc[entry] = path;
            return acc;
          },
          {} as Record<string, string>
        ),
        ...pathIndexNativeComponents.reduce(
          (acc, path) => {
            const name = path.split("/").at(-2)! + ".native";
            const entry = configureName(template, name, extname(path));
            nameEntryMap.set(entry, name);
            acc[entry] = path;
            return acc;
          },
          {} as Record<string, string>
        ),
        ...pathComponents.reduce(
          (acc, path) => {
            const name = basename(path, extname(path));
            const entry = configureName(template, name, extname(path));
            nameEntryMap.set(entry, name);
            acc[entry] = path;
            return acc;
          },
          {} as Record<string, string>
        ),
        ...pathNativeComponents.reduce(
          (acc, path) => {
            const name = basename(path, extname(path));
            const entry = configureName(template, name, extname(path));
            nameEntryMap.set(entry, name);
            acc[entry] = path;
            return acc;
          },
          {} as Record<string, string>
        )
      }
    : {};

  return {
    name: "oneiro:core-plugins:component-entry",
    enforce: "pre",

    async config(config) {
      outDir = config.build?.outDir ?? "dist";
      return defineConfig({ build: { lib: { entry: entries } } });
    },

    renderChunk(_code, chunk) {
      if (!chunk.isEntry) return;
      if (entries[chunk.name]) {
        renderedEntries.set(chunk.name, chunk.fileName);
      }
    },

    async generateBundle(_output, _bundle, isWrite) {
      if (!isWrite) return;
      if (!generateExports) return;
      const pkgJsonPath = resolve("package.json");
      const json = JSON.parse(readFileSync(pkgJsonPath, "utf-8")) as PackageJson;
      const pkgExports = json.exports ?? {};
      if (typeof pkgExports !== "object") {
        console.warn("package.json exports is not an object");
        return;
      }
      if (Array.isArray(pkgExports)) {
        console.warn("package.json exports is an array. Please use an object");
        return;
      }

      const exports = {};
      for (const [entry, outputFile] of renderedEntries.entries()) {
        const name = nameEntryMap.get(entry)!;
        const entryFile = entries[entry]!;
        const types = isDtsPluginTypesRollup
          ? `./${outDir}/${outputFile.replace(/\.js$/, ".d.ts")}`
          : "./" + entryFile.replace(/^src/, outDir).replace(/\.[jt]sx?$/, ".d.ts");

        // @ts-ignore
        json.exports && delete json.exports[`./${name}`];
        // @ts-ignore
        exports[`./${name}`] = {
          import: `./${outDir}/${outputFile}`,
          require: `./${outDir}/${outputFile}`,
          types
        };
      }
      json.exports = { ...pkgExports, ...exports };
      writeFileSync(pkgJsonPath, await prettifyJson(json, "package.json"));
    }
  };
};
