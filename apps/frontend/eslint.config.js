import { config } from "@repo/eslint-config/base";

/**
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  ...config,
  {
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
