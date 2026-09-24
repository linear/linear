import { defineConfig } from "tsdown";

export default defineConfig({
  format: ["esm", "cjs"],
  sourcemap: false,
  // Declaration maps reference source files that are not included in the package.
  dts: { sourcemap: false },
});
