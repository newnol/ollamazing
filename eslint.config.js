import pluginJs from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginValtio from "eslint-plugin-valtio";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginPrettier,
  ...pluginQuery.configs["flat/recommended"],
  {
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      valtio: pluginValtio,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off",
      ...pluginValtio.configs.recommended.rules,
      "valtio/state-snapshot-rule": ["warn"],
      "valtio/avoid-this-in-proxy": ["warn"],
    },
  },
];
