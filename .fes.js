/*
 * @Description:
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-16 10:57:22
 */
import { defineBuildConfig } from '@fesjs/fes';

export default defineBuildConfig({
    access: {
        roles: {
            admin: ['*'],
            manager: ['/'],
        },
    },
    layout: {
        title: 'Fes.js',
        footer: 'Created by MumbleFE',
        navigation: 'mixin',
        multiTabs: false,
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
});
