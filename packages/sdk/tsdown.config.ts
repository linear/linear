import { defineConfig } from "tsdown";

export default defineConfig({
  format: {
    esm: { sourcemap: true },
    cjs: {},
  },
  // Declaration maps reference source files that are not included in the package.
  dts: { sourcemap: false },
});
