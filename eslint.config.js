import astro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
  ...astro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: { parserOptions: { parser: tsParser, extraFileExtensions: ['.astro'] } }
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { parser: tsParser }
  },
  { ignores: ['.agents/**', 'dist/**', 'node_modules/**', '.astro/**', 'playwright-report/**'] }
];
