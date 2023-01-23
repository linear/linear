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
    plugins: [typescript(), ...minPlugins],
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
    plugins: [typescript()],
  },
];
