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
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsonc/prettier',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ['import', 'unicorn', 'sort-destructure-keys', 'jsonc'],
  rules: {
    'import/first': 'error',
    'import/exports-last': 'error',
    'import/extensions': ['error', 'always'],
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-namespace': 'error',
    'import/no-named-default': 'error',
    'import/no-unassigned-import': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-node-protocol': 'off',
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
    'sort-destructure-keys/sort-destructure-keys': 2,
    'jsonc/sort-keys': ['error',
      "asc",
      {
        "caseSensitive": true,
        "natural": false,
        "minKeys": 2
      }
    ]
  },
};
