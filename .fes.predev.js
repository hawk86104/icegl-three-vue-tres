/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-20 21:33:11
 */
import { defineBuildConfig } from '@fesjs/fes'
import addExtraScriptPlugin from './src/common/addExtraScriptPlugin'

export default defineBuildConfig({
    layout: {
        title: 'TvT.js',
        navigation: 'top',
        multiTabs: false,
        isFixedHeader: true,
        logo: 'logo.png',
        menus: [
            {
                name: 'preview',
                path: '/',
                title: '📀 预览演示',
            },
            {
                path: 'https://gitee.com/ice-gl/icegl-three-vue-tres',
                title: '📜 源码地址',
            },
            {
                title: '📚 说明文档',
                children: [
                    {
                        path: 'http://docs.icegl.cn',
                        title: '🧊 TvT框架文档',
                    },
                    {
                        path: 'https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene',
                        title: '🎲 three.js',
                    },
                    {
                        path: 'https://tresjs.org/guide/',
                        title: '⚡ tres.js',
                    },
                    {
                        path: 'https://fesjs.mumblefe.cn/',
                        title: '💠 fes.js',
                    },
                ],
            },
            {
                path: 'https://icegl.cn/',
                title: '🧊 ICEGL官网',
            },
            {
                path: 'https://space.bilibili.com/410503457',
                title: '🅱️ B站主页',
            },
            {
                title: '👨‍🏫 课程中心',
                children: [
                    {
                        path: 'https://icegl.cn/courses',
                        title: '🌁 WebGL初/中/高级教程',
                    },
                    {
                        path: 'https://www.bilibili.com/video/BV1iR4y1C7LQ/',
                        title: '🏙 WebGL Shader初级教程',
                    },
                    {
                        path: 'http://m.study.163.com/provider/480000002303414/index.htm?share=2&shareId=480000002303414',
                        title: '🌇 WebGL Shader中级教程',
                    },
                ],
            },
            {
                path: 'https://icegl.cn/ask',
                title: '🙋‍♀️ 社区问答',
            },
            {
                path: 'https://icegl.cn/p/aboutus',
                title: '💫 关于我们',
            },
        ],
    },
    viteOption: {
        plugins: [addExtraScriptPlugin()],
    },
})
