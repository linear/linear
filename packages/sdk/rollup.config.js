import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import gzip from "rollup-plugin-gzip";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import { terser } from "rollup-plugin-terser";
import { brotliCompressSync } from "zlib";

const plugins = [typescript()];

const minPlugins = [
  ...plugins,
  commonjs(),
  json(),
  sizeSnapshot(),
  terser(),
  gzip(),
  gzip({
    customCompression: content => brotliCompressSync(Buffer.from(content)),
    fileName: ".br",
  }),
];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "./",
        entryFileNames: "dist/index-cjs.min.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        dir: "./",
        entryFileNames: "dist/index-es.min.js",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [...minPlugins, resolve()],
  },
  {
    input: "src/index.ts",
    output: [
      {
        dir: "./",
        entryFileNames: "dist/index-umd.min.js",
        format: "umd",
        sourcemap: true,
        name: "Linear",
      },
    ],
    plugins: minPlugins,
  },
  {
    input: "src/index.ts",
    output: [
      {
        dir: "./",
        entryFileNames: "dist/index-cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        dir: "./",
        entryFileNames: "dist/index-es.js",
        format: "es",
        sourcemap: true,
      },
      {
        dir: "./",
        entryFileNames: "dist/index-umd.js",
        format: "umd",
        sourcemap: true,
        name: "Linear",
      },
    ],
    plugins,
  },
];
