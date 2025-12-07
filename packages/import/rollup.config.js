import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import gzip from "rollup-plugin-gzip";
import { terser } from "rollup-plugin-terser";
import { brotliCompressSync } from "zlib";
import { builtinModules } from "module";

const minPlugins =
  process.env.NODE_ENV === "development"
    ? []
    : [
        terser(),
        gzip(),
        gzip({
          customCompression: content => brotliCompressSync(Buffer.from(content)),
          fileName: ".br",
        }),
      ];

const external = [
  ...builtinModules,
  ...builtinModules.map(m => `node:${m}`),
  "@linear/sdk",
  "chalk",
  "inquirer",
  "cli-progress",
  "date-fns",
  "lodash",
  "ora",
  "csvtojson",
  "node-fetch",
  // Explicit core fallbacks (sometimes not listed in builtinModules in older Node versions)
  "fs",
  "path",
  "stream",
  "events",
  "url",
  "zlib",
  "util",
  "tty",
  "os",
  "crypto",
  "http",
  "https",
];

export default [
  {
    input: "src/cli.ts",
    output: [
      {
        dir: "./",
        entryFileNames: "dist/cli.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    external,
    plugins: [typescript(), commonjs({ ignoreDynamicRequires: true }), json()],
  },
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
    external,
    plugins: [
      typescript(),
      resolve({
        mainFields: ["main", "module", "browser"],
        preferBuiltins: true,
      }),
      commonjs({ ignoreDynamicRequires: true }),
      json(),
      ...minPlugins,
    ],
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
    ],
    external,
    plugins: [typescript()],
  },
];
