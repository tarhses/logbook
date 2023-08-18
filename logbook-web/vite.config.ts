/// <reference types="vitest" />
/// <reference types="vite/client" />

import cssnanoPlugin from "cssnano"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    proxy: { "/api": "http://127.0.0.1:3001" },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["@testing-library/jest-dom/vitest.js"],
    // otherwise, solid would be loaded twice:
    deps: { optimizer: { web: { include: ["solid"] } } },
    // if you have few tests, try commenting one
    // or both out to improve performance:
    threads: false,
    isolate: false,
  },
  build: {
    target: "esnext",
    // we'll use cssnano instead:
    cssMinify: false,
  },
  css: {
    postcss: {
      plugins: [cssnanoPlugin()],
    },
  },
  resolve: {
    conditions: ["development", "browser"],
    alias: { "@/libs": fileURLToPath(new URL("./src/libs", import.meta.url)) },
  },
})
