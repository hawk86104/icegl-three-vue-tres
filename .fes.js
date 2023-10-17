/*
 * @Description:
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-17 15:36:11
 */
// import { resolve } from 'path';
import { join } from 'path';
import { defineBuildConfig } from '@fesjs/fes';
import { templateCompilerOptions } from '@tresjs/core';

export default defineBuildConfig({
    access: {
        roles: {
            admin: ['*'],
            manager: ['/'],
        },
    },
    layout: {
        title: 'Ice.gl',
        // footer: '',
        navigation: 'mixin',
        multiTabs: false,
        menus: [
            {
                name: 'index',
            },
            {
                name: 'TheBasic',
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
    alias: { PLS: join(__dirname, './src/plugins') },
    // { find: 'pls', replacement: resolve(__dirname, './src/plugins') },
    // { '@': join(__dirname, '/src') }
});
