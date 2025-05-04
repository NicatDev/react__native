/// <reference types="vitest" />
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react-swc";

import { componentEntryPlugin, iconsPlugin, libAssetsPlugin } from "./bundler";
import pkg from "./package.json";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    dtsPlugin({ rollupTypes: true }),
    iconsPlugin(),
    libAssetsPlugin({ limit: 0 }),
    componentEntryPlugin({
      template: "component.[name]",
      isDtsPluginTypesRollup: true,
      generateExports: false
    })
  ],
  resolve: { alias: { "react/jsx-runtime": "nativewind/jsx-runtime" } },
  build: {
    outDir: "build",
    ssr: true,
    sourcemap: true,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    lib: {
      entry: {
        "ui-kit": "src/main.ts",
        "ui-kit.server": "src/server.ts",
        "ui-kit.native": "src/native.ts",
        "ui-kit.utils": "src/utils.ts"
      },
      name: "UIKit",
      formats: ["es"]
    },
    rollupOptions: {
      output: {
        chunkFileNames: "chunks/[hash].js",
        assetFileNames(chunkInfo) {
          return (chunkInfo.names?.length ? chunkInfo.names.includes("style.css") : chunkInfo.name === "style.css")
            ? "style.css"
            : "assets/[hash][extname]";
        }
      },
      external: Object.keys(pkg.peerDependencies)
    }
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/vitest.setup.js"]
  }
});
