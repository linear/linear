import typescript from "@rollup/plugin-typescript";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "./",
        entryFileNames: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        dir: "./",
        entryFileNames: pkg.module,
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [typescript(), sizeSnapshot(), terser()],
  },
  {
    input: "src/index.ts",
    output: [
      {
        dir: "./",
        entryFileNames: pkg.main.replace(".min", ""),
        format: "cjs",
        sourcemap: true,
      },
      {
        dir: "./",
        entryFileNames: pkg.module.replace(".min", ""),
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [typescript()],
  },
];
