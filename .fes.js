/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-12 09:39:34
 */
// import { resolve } from 'path';
import { join } from 'path';
import { defineBuildConfig } from '@fesjs/fes'
import { templateCompilerOptions } from '@tresjs/core'
// eslint-disable-next-line import/no-unresolved
import UnoCSS from 'unocss/vite'
// eslint-disable-next-line import/no-extraneous-dependencies
import glsl from 'vite-plugin-glsl'

export default defineBuildConfig({
    title: 'TvT.js',
    publicPath: './',
    access: {
        roles: {
            admin: ['*'],
            manager: ['/'],
        },
    },
    layout: {
        navigation: null,
    },
    enums: {
        status: [
            ['0', '无效的'],
            ['1', '有效的'],
        ],
    },
    //add by 地虎降天龙
    viteVuePlugin: {
        ...templateCompilerOptions,
    },
    viteOption: {
        base: "./",
        plugins: [
            UnoCSS({
                /* options */
            }),
            glsl()
        ],
        // server: {
        //     host: "0.0.0.0",
        //     proxy: {
        //         '/cosv2': {
        //             target: 'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com',
        //             changeOrigin: true,
        //             rewrite: (path) => path.replace(/^\/cosv2/, '')
        //         },
        //     },
        // },
    },
    alias: { PLS: join(__dirname, './src/plugins') },
    // { find: 'pls', replacement: resolve(__dirname, './src/plugins') },
    // { '@': join(__dirname, '/src') }
});

