/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-27 18:38:02
 */
// import { resolve } from 'path';
import { join } from 'path'
import { defineBuildConfig } from '@fesjs/fes'
import { templateCompilerOptions } from '@tresjs/core'
// eslint-disable-next-line import/no-unresolved
import UnoCSS from 'unocss/vite'
// eslint-disable-next-line import/no-extraneous-dependencies
import glsl from 'vite-plugin-glsl'

const combinedIsCustomElement = (tag) => {
    return tag.startsWith('iconify-icon') || templateCompilerOptions.template.compilerOptions.isCustomElement(tag)
}

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
        template: {
            compilerOptions: {
                isCustomElement: (tag) => combinedIsCustomElement(tag),
            },
        },
    },
    viteOption: {
        base: './',
        plugins: [
            UnoCSS({
                /* options */
            }),
            glsl(),
        ],
        // 全局 css 注册
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: `@import "src/plugins/goView/lib/scss/style.scss";`,
                },
            },
        },
        server: {
            // host: "0.0.0.0",
            //     proxy: {
            //         '/cosv2': {
            //             target: 'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com',
            //             changeOrigin: true,
            //             rewrite: (path) => path.replace(/^\/cosv2/, '')
            //         },
            //     },
        },
    },
    alias: { PLS: join(__dirname, './src/plugins') },
    // { find: 'pls', replacement: resolve(__dirname, './src/plugins') },
    // { '@': join(__dirname, '/src') }
})
