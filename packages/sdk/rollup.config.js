import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import gzip from "rollup-plugin-gzip";
import injectProcessEnv from "rollup-plugin-inject-process-env";
import { terser } from "rollup-plugin-terser";
import { brotliCompressSync } from "zlib";

const plugins = [typescript(), json()];

const nodePlugins = [...plugins, resolve(), commonjs()];

const browserPlugins = [
  ...plugins,
  resolve({ browser: true }),
  commonjs(),
  injectProcessEnv({
    NODE_ENV: process.env.NODE_ENV,
    npm_package_name: process.env.npm_package_name,
    npm_package_version: process.env.npm_package_version,
  }),
];

const minPlugins = [
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
        exports: "named",
      },
      {
        dir: "./",
        entryFileNames: "dist/index-es.min.js",
        format: "es",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [...nodePlugins, ...minPlugins],
  },
  {
    input: "src/index.ts",
    output: [
      {
        dir: "./",
        entryFileNames: "dist/index-cjs.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        dir: "./",
        entryFileNames: "dist/index-es.js",
        format: "es",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: nodePlugins,
  },
  {
    input: "src/index.ts",
    output: [
      {
        dir: "./",
        entryFileNames: "dist/index-umd.min.js",
        format: "umd",
        esModule: false,
        sourcemap: true,
        exports: "named",
        name: "Linear",
      },
    ],
    plugins: [...browserPlugins, ...minPlugins],
  },
  {
    input: "src/index.ts",
    output: [
      {
        dir: "./",
        entryFileNames: "dist/index-umd.js",
        format: "umd",
        esModule: false,
        sourcemap: true,
        exports: "named",
        name: "Linear",
      },
    ],
    plugins: [...browserPlugins],
  },
];
