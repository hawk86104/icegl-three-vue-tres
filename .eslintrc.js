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
    //add by hawk
    // settings: {
    //     'import/resolver': {
    //         alias: {
    //             map: [
    //                 // 这里参照别名配置映射
    //                 ['@', './src'],
    //                 ['PLS', './src/plugins'],
    //             ],
    //         },
    //     },
    // },
    rules: {
        'prettier/prettier': 'off',
        "vue/space-unary-ops": "off",
        "vue/comma-dangle": "off",
        "no-debugger": "off"
        // "space-unary-ops": "off",
        // 'import/no-unresolved': [
        //     2,
        //     {
        //         ignore: ['^@/', 'PLS'], // 设置的路径别名
        //     },
        // ],
    },
};
