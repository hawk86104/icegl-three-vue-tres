module.exports = {
    extends: ['@webank/eslint-config-webank/vue.js'],
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
        },
    ],
    env: {
        jest: true,
    },
};
