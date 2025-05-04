import { statSync } from "node:fs";
import { copyFile, mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { join } from "path";

import type { PreRenderedAsset } from "rollup";
import type { Plugin, ResolvedConfig } from "vite";

import { Options } from "./types/options";
import { isAssetFile } from "./utils/is-asset-file";

const pluginName = "oneiro:core-plugins:lib-assets";

interface AssetFile {
  file: string;
  fileAssetName: string;
}

export const libAssetsPlugin = ({}: Options): Plugin => {
  let viteConfig: ResolvedConfig;
  const emittedAssets = new Map<string, AssetFile>();

  return {
    name: pluginName,
    enforce: "pre",

    configResolved(config) {
      viteConfig = config;
    },

    async resolveId(id, parent = "", meta) {
      const resolvedId = await this.resolve(id, parent, meta);
      if (!resolvedId) return null;
      const file = resolvedId.id;
      if (!isAssetFile(file)) return null;
      const limit = viteConfig.build.assetsInlineLimit;
      if (typeof limit === "number" && statSync(file).size < limit) return null;
      const fileContent = await readFile(file);
      if (typeof limit === "function" && limit(file, fileContent)) return null;

      const { output } = viteConfig.build.rollupOptions;
      const assetFileName = Array.isArray(output)
        ? output[0]?.assetFileNames
        : output?.assetFileNames || "[name].[hash][extname]";

      const preRenderedAsset: PreRenderedAsset = {
        name: id,
        names: [id],
        originalFileName: id,
        originalFileNames: [id],
        type: "asset",
        source: fileContent
      };

      const assetName =
        typeof assetFileName === "function"
          ? assetFileName(preRenderedAsset)
          : assetFileName || "[name].[hash][extname]";

      const pathSections = file.split("/");
      const index = pathSections.findIndex(section => section === "assets");
      const fileAssetName = join(...assetName.split("/").slice(0, -1), ...pathSections.slice(index + 2));
      emittedAssets.set(id, { file, fileAssetName });
      const fileFullPath = resolve(viteConfig.root, "src", fileAssetName);
      return { id: fileFullPath, external: "relative" };
    },

    async generateBundle() {
      const outDir = viteConfig.build.outDir || "dist";

      for (const [, { file, fileAssetName }] of emittedAssets) {
        const path = resolve(outDir, fileAssetName);
        await mkdir(dirname(path), { recursive: true });
        await copyFile(file, path);
      }
    }
  };
};
