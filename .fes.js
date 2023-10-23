/*
 * @Description:
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-23 09:43:31
 */
// import { resolve } from 'path';
import { join } from 'path';
import { defineBuildConfig } from '@fesjs/fes';
import { templateCompilerOptions } from '@tresjs/core';
import UnoCSS from 'unocss/vite';

export default defineBuildConfig({
    access: {
        roles: {
            admin: ['*'],
            manager: ['/'],
        },
    },
    layout: {
        title: 'Ice.gl',
        navigation: 'top',
        multiTabs: false,
        logo: 'logo.png',
        menus: [
            {
                name: 'index',
            },
        ],
    },
    enums: {
        status: [
            ['0', '无效的'],
            ['1', '有效的'],
        ],
    },
    //add by hawk
    viteVuePlugin: {
        ...templateCompilerOptions,
    },
    viteOption: {
        plugins: [
            UnoCSS({
                /* options */
            }),
        ],
    },
    alias: { PLS: join(__dirname, './src/plugins') },
    // { find: 'pls', replacement: resolve(__dirname, './src/plugins') },
    // { '@': join(__dirname, '/src') }
});
