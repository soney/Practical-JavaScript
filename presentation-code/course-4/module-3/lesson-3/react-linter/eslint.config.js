import globals from "globals";
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    files: ["src/**/*.js", "src/**/*.jsx"],

    // Extend recommended rule sets from:
    // 1. ESLint JS's recommended rules
    // 2. ESLint React's recommended rules
    extends: [
      eslintJs.configs.recommended,
      eslintReact.configs.recommended
    ],

    // Configure language/parsing options
    languageOptions: {
      // Include browser global variables (window, document, etc.)
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax support
        },
      },
    },

    // Custom rule overrides (modify rule levels or disable rules)
    rules: {
      "@eslint-react/no-missing-key": "warn"
    },
  },
);