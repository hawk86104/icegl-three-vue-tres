/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-10 15:01:11
 */
module.exports = {
    parser: 'babel-eslint',
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
        // "semi": "off",
        // "init-declarations": "off",
        // "space-unary-ops": "off",
        'import/no-unresolved': [
            2,
            {
                ignore: ['^@/', 'PLS'], // 设置的路径别名
            },
        ],
    },
};
