/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-05 10:15:03
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
        title: 'Icegl',
        navigation: 'top',
        multiTabs: false,
        isFixedHeader: true,
        // isFixedSidebar: true,
        // sideWidth: 800,
        logo: 'logo.png',
        menus: [],
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
