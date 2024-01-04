/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-04 10:35:21
 */
// import { resolve } from 'path';
import { join } from 'path';
import { defineBuildConfig, someApi, plugin, ApplyPluginsType } from '@fesjs/fes';
import { templateCompilerOptions } from '@tresjs/core';
import UnoCSS from 'unocss/vite';
// import glsl from 'vite-plugin-glsl';

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
            // glsl(),
        ],
        server: {
            host: "0.0.0.0"
        },
    },
    alias: { PLS: join(__dirname, './src/plugins') },
    // { find: 'pls', replacement: resolve(__dirname, './src/plugins') },
    // { '@': join(__dirname, '/src') }
});

