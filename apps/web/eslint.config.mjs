import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // B28: tutup celah lint warna mentah di komponen React — stylelint hanya
    // men-scan file .css, jadi bg-[#hex]/text-[#hex] di className lolos begitu saja.
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    rules: {
      // Konvensi umum: parameter/variabel tak terpakai yang diberi awalan _ sengaja
      // dibiarkan (biasanya method skeleton/interface yang belum diimplementasikan).
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "better-tailwindcss/no-restricted-classes": [
        "error",
        {
          restrict: [
            {
              pattern: "\\[#[0-9a-fA-F]{3,8}\\]",
              message:
                "Nilai warna heksadesimal mentah dilarang di className — pakai token warna semantik dari packages/tokens (lihat @theme di apps/web/app/globals.css).",
            },
          ],
        },
      ],
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "app/globals.css",
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
