module.exports = {
    // parser: 'babel-eslint',
    extends: ['@webank/eslint-config-webank/vue.js'],
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
        },
    ],
    env: {
        jest: true,
    },
    //add by 地虎降天龙
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
        'vue/space-unary-ops': 'off',
        'vue/comma-dangle': 'off',
        'no-debugger': 'off',
        'guard-for-in': 'off',
        semi: ['error', 'never'],
        // "init-declarations": "off",
        // "space-unary-ops": "off",
        'import/no-unresolved': [
            2,
            {
                ignore: ['^@/', 'PLS'], // 设置的路径别名
            },
        ],
    },
}
