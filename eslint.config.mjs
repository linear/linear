import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import { jsdoc } from "eslint-plugin-jsdoc";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: ["./packages/*/tsconfig.json", "./packages/sdk/tsconfig.test.json"],
      },
    },
  },
  prettierConfig,
  jsdoc(),
  {
    ignores: [
      "eslint.config.mjs",
      "**/rollup.config.js",
      "**/_generated*",
      "**/dist/**",
      "docs/**",
      "examples/**",
      "e2e/smoke/*",
      "packages/import/bin/*.js",
      "packages/sdk/naming-override/*.js",
    ],
  },
  {
    rules: {
      "@typescript-eslint/array-type": [
        "error",
        {
          default: "array",
        },
      ],
      "@typescript-eslint/await-thenable": "warn",
      "@typescript-eslint/dot-notation": "warn",
      "@typescript-eslint/explicit-member-accessibility": [
        "warn",
        {
          accessibility: "explicit",
          overrides: {
            accessors: "explicit",
            constructors: "explicit",
            parameterProperties: "explicit",
          },
        },
      ],
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/member-ordering": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "off", // Too many false positives. See https://github.com/typescript-eslint/typescript-eslint/issues/1410
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/unified-signatures": "error",
      "constructor-super": "error",
      curly: "error",
      "default-case": "error",
      "eol-last": "off",
      eqeqeq: ["error", "always"],
      "id-blacklist": ["warn", "any", "String", "string", "Boolean", "boolean", "Undefined", "undefined"],
      "id-match": "error",
      "jsdoc/check-alignment": "warn",
      "jsdoc/check-indentation": "off",
      "linebreak-style": "off",
      "no-caller": "error",
      "no-console": "warn",
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-empty": "error",
      "no-eval": "error",
      "no-invalid-this": "off",
      "no-null/no-null": "off",
      "no-redeclare": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-shadow": [
        "warn",
        {
          hoist: "all",
        },
      ],
      "no-template-curly-in-string": "error",
      "no-undef-init": "warn",
      "no-underscore-dangle": "off",
      "no-var": "warn",
      "prefer-arrow-functions": "off",
      "prefer-const": "warn",
      "jsdoc/newline-after-description": "off",
      "no-extra-boolean-cast": "off",
    },
  }
);
