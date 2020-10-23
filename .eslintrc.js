module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['react', 'react-hooks'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {},
    settings: {
        react: {
            version: '17.0',
        },
    },
};
