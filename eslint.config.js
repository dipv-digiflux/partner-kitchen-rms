/**
 * 🔴 PROTECTED: DO NOT MODIFY
 * These lint rules are locked to maintain project consistency.
 * AI agents are strictly prohibited from changing these rules.
 */

import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Global ignores
  {
    ignores: ['dist', 'build', 'node_modules', 'public', 'coverage', 'docs', '.husky', 'babel.config.js', 'metro.config.js', 'preplex'],
  },

  // Base recommended configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Disable ESLint stylistic rules that conflict with Prettier
  eslintConfigPrettier,

  // Main React + TypeScript rules
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      /* -------------------- React -------------------- */
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      /* -------------------- Hooks -------------------- */
      ...reactHooks.configs.recommended.rules,

      /* ------------------ Fast Refresh ------------------ */
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      /* ------------------- Prettier ------------------- */
      'prettier/prettier': 'off',

      /* ----------------- Strict TS ------------------ */
      '@typescript-eslint/no-explicit-any': 'error',
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary', 'coerce'] }],
      'react/prop-types': 'off',
    },
  },

  /* =====================================================
     🔒 Architectural Enforcement Rules
     ===================================================== */

  // Default: disallow types & hooks in regular files
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.types.ts', '**/types/**/*.ts', '**/*.hook.ts', '**/*.hooks.ts', '**/hooks/**/*.ts', '**/*.d.ts', 'vite.config.ts', 'vitest.config.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',

        // Hooks restriction
        {
          selector: 'FunctionDeclaration[id.name=/^use[A-Z]/]',
          message: 'Custom hooks must be placed in *.hook.ts or *.hooks.ts files inside a hooks folder.',
        },
        {
          selector: 'VariableDeclarator[id.name=/^use[A-Z]/]',
          message: 'Custom hooks must be placed in *.hook.ts or *.hooks.ts files inside a hooks folder.',
        },
      ],
    },
  },

  // Allow types in *.types.ts
  {
    files: ['**/*.types.ts', '**/types/**/*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'FunctionDeclaration[id.name=/^use[A-Z]/]',
          message: 'Custom hooks must be placed in *.hook.ts or *.hooks.ts files inside a hooks folder.',
        },
        {
          selector: 'VariableDeclarator[id.name=/^use[A-Z]/]',
          message: 'Custom hooks must be placed in *.hook.ts or *.hooks.ts files inside a hooks folder.',
        },
      ],
    },
  },

  // Allow hooks in *.hook.ts
  {
    files: ['**/*.hook.ts', '**/*.hooks.ts', '**/hooks/**/*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSTypeAliasDeclaration',
          message: 'Type declarations must be placed in *.types.ts files inside a types folder.',
        },
        {
          selector: 'TSInterfaceDeclaration',
          message: 'Interface declarations must be placed in *.types.ts files inside a types folder.',
        },
      ],
    },
  },
)
