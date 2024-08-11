/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-08-11 18:22:40
 */
// import { resolve } from 'path';
import { join } from 'path'
import { defineBuildConfig } from '@fesjs/fes'
import { templateCompilerOptions } from '@tresjs/core'
// eslint-disable-next-line import/no-unresolved
import UnoCSS from 'unocss/vite'
// eslint-disable-next-line import/no-extraneous-dependencies
import glsl from 'vite-plugin-glsl'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'

const timeStamp = new Date().getTime()
const combinedIsCustomElement = (tag) => tag.startsWith('iconify-icon') || templateCompilerOptions.template.compilerOptions.isCustomElement(tag)

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
        base: './', //     ./     /icegl-three-vue-tres/
        plugins: [
            UnoCSS({
                /* options */
            }),
            glsl(),
            process.env.NODE_ENV === 'production' &&
            obfuscatorPlugin({
                debugger: false,
                // include: ['src/plugins/'],
                // exclude: ['/node_modules/', '/src/.fes/', '/src/app.jsx', /index.jsx$/],
                // apply: 'build',
                options: {
                    // 配置项，根据需要进行调整
                    optionsPreset: 'default',
                    // identifierNamesGenerator: 'mangled',
                    debugProtection: true,
                    disableConsoleOutput: true,
                    reservedStrings: ['suspenseLayout.vue', '/plugins'],
                    // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
                },
            }),
        ],
        build: {
            chunkSizeWarningLimit: 1000, // 单位为KB
            rollupOptions: {
                output: {
                    manualChunks (id) {
                        // 自定义拆分策略，例如将特定的第三方库拆分为单独的 chunk
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0]
                        }
                    },
                    chunkFileNames: `js/[name].[hash]${timeStamp}.js`,
                    entryFileNames: `js/[name].[hash]${timeStamp}.js`,
                    assetFileNames: `[ext]/[name].[hash]${timeStamp}.[ext]`,
                },
            },
            minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
        },
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
            host: '0.0.0.0',
        },
    },
    alias: { PLS: join(__dirname, './src/plugins') },
    // { find: 'pls', replacement: resolve(__dirname, './src/plugins') },
    // { '@': join(__dirname, '/src') }
})
