module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
    project: './tsconfig.json',
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // TypeScript-specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Code style and formatting
    'prettier/prettier': 'error',

    // Node.js and general rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'off', // handled by @typescript-eslint/no-unused-vars
    'no-var': 'error',
    'prefer-const': 'error',

    // Best practices
    'no-duplicate-imports': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': 'error',

    // Optional: Relax these rules if needed
    'no-empty-function': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off', // Allow requires in TypeScript
      },
    },
    {
      files: ['*.test.ts', '*.spec.ts'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};

