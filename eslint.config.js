import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettier from "eslint-plugin-prettier";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "coverage", "build"],
  },

  {
    files: ["**/*.{ts,tsx}"],

    extends: [js.configs.recommended, ...tseslint.configs.strict],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      prettier,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      ...reactHooks.configs.recommended.rules,

      // React
      "react/react-in-jsx-scope": "off",

      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // General JS
      eqeqeq: "error",
      curly: "error",
      "no-console": "warn",

      // React Refresh
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],

      // Prettier
      "prettier/prettier": "error",
    },
  },
);
