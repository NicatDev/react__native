import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [tsconfigPaths(), react(), dtsPlugin({ rollupTypes: true })],
  resolve: { alias: { "react/jsx-runtime": "nativewind/jsx-runtime" } },
  build: {
    outDir: "build",
    ssr: true,
    sourcemap: true,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    lib: {
      entry: {
        "shared-lib": "src/main.ts"
      },
      name: "Dihitask Shared Library",
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
      }
    }
  }
});
