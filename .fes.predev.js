/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-16 15:22:17
 */
import { defineBuildConfig } from '@fesjs/fes';

export default defineBuildConfig({
    layout: {
        title: 'Icegl',
        navigation: 'top',
        multiTabs: false,
        isFixedHeader: true,
        logo: 'logo.png',
        menus: [
            {
                name: 'preview',
                path: '/',
                title: '开源框架展示'
            }
        ],
    },
});
