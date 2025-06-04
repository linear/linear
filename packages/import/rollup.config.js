import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import gzip from "rollup-plugin-gzip";
import { terser } from "rollup-plugin-terser";
import { brotliCompressSync } from "zlib";

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
    plugins: [
      typescript(),
      commonjs({
        sourceMap: true, // Enable source maps for CommonJS modules
        transformMixedEsModules: true, // Allow transforming mixed ES/CommonJS modules
      }),
      json(),
    ],
    external: ["@linear/sdk", "@microsoft/microsoft-graph-client", "isomorphic-fetch", "chalk", "inquirer", "cli-progress", "date-fns", "lodash", "ora", "csvtojson", "fs", "inquirer-file-path", "jira2md", "node-fetch"],
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
    plugins: [
      resolve(),
      typescript(),
      commonjs({
        sourceMap: true,
        transformMixedEsModules: true,
      }),
      json(),
      ...minPlugins
    ],
    external: ["@linear/sdk", "@microsoft/microsoft-graph-client", "isomorphic-fetch"],
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
    plugins: [
      resolve(),
      typescript(),
      commonjs({ // Added commonjs here as well, as it was missing
        sourceMap: true,
        transformMixedEsModules: true,
      }),
      json()
    ],
    external: ["@linear/sdk", "@microsoft/microsoft-graph-client", "isomorphic-fetch"],
  },
];
