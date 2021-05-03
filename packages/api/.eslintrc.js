module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['unicorn'],
  rules: {
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          res: {
            result: false,
          },
        },
      },
    ],
  },
};
