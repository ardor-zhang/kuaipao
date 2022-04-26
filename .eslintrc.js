const { defineConfig } = require('eslint-define-config');
module.exports = defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-mutating-props': 'off', // 暂时关闭
    'vue/one-component-per-file': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
});
