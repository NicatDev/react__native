/// <reference types="vitest" />
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [tsconfigPaths(), react(), dtsPlugin({ rollupTypes: true })],
  build: {
    outDir: "build",
    ssr: true,
    sourcemap: true,
    assetsInlineLimit: 0,
    lib: {
      entry: { ws: "src/main.ts" },
      name: "Websocket Library",
      formats: ["es"]
    },
    rollupOptions: {
      external: [/@oneiro\/.*$/]
    }
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/vitest.setup.js"]
  }
});
