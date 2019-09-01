module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'react-hooks',
    'jsx-a11y'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: [ '.jsx', '.js']}
    ],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-console': ['error', { allow: [ 'tron']}],
    'no-unused-vars': [ 'error', { argsIgnorePattern: '^_'}],
    'global-require': 'off',
    'no-urderscore-dangle': 'off',
    camelcase: 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react-native/no-raw-text': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    "react/prop-types": ["error", { "ignore": ["isFocused"] }]
  },
  settings: {
    'import/resolver': {
      "babel-plugin-root-import": {
        rootPathSuffix: 'src'
      },
    },
  },
};