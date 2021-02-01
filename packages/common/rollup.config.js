import typescript from "@rollup/plugin-typescript";
import gzip from "rollup-plugin-gzip";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import { terser } from "rollup-plugin-terser";
import { brotliCompressSync } from "zlib";

export default [
  {
    input: "src/index.ts",
    external: ["tracer"],
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
      typescript(),
      sizeSnapshot(),
      terser(),
      gzip(),
      gzip({
        customCompression: content => brotliCompressSync(Buffer.from(content)),
        fileName: ".br",
      }),
    ],
  },
  {
    input: "src/index.ts",
    external: ["tracer"],
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
