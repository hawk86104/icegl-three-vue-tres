/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-08-19 20:24:59
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-03 15:24:40
 */
export default {
    name: 'digitalCity',
    title: '数字城市',
    intro: '基于城市场景的可视化展示插件',
    version: '0.0.1',
    author: '地虎降天龙',
    website: 'https://gitee.com/hawk86104',
    state: 'active',
    require: ['resourceManager'],
    preview: [
        // { "src": "plugins/digitalCity/preview/buildings.mp4", "type": "video", "name": "buildings", "title": "建筑物" },
        { src: 'plugins/digitalCity/preview/buildings.png', type: 'img', name: 'buildings', title: '建筑物' },
        { src: 'plugins/digitalCity/preview/radars.png', type: 'img', name: 'radars', title: '雷达' },
        { src: 'plugins/digitalCity/preview/diffuseCircle.png', type: 'img', name: 'diffuseCircle', title: '扩散圈球' },
        { src: 'plugins/digitalCity/preview/depthBufferDiffuse.png', type: 'img', name: 'depthBufferDiffuse', title: '带深度的半球扩散' },
        { src: 'plugins/digitalCity/preview/weather.png', type: 'img', name: 'weather', title: '天气' },
        { src: 'plugins/digitalCity/preview/lightningStorm.png', type: 'img', name: 'lightningStorm', title: '闪电' },
        { src: 'plugins/digitalCity/preview/stylizedTornado.png', type: 'img', name: 'stylizedTornado', title: '漫画龙卷风' },
        { src: 'plugins/digitalCity/preview/clouds.png', type: 'img', name: 'clouds', title: '云☁️' },
        { src: 'plugins/digitalCity/preview/clouds2.png', type: 'img', name: 'clouds2', title: '云彩2☁️' },
        { src: 'plugins/digitalCity/preview/fog.png', type: 'img', name: 'fog', title: '迷雾' },
        { src: 'plugins/digitalCity/preview/smoke.png', type: 'img', name: 'smoke', title: '烟' },
        {
            src: 'plugins/digitalCity/preview/fireA.png',
            type: 'img',
            name: 'fireA',
            title: '火A🔥效果',
            referenceSource: { title: 'jaimetorrealba', url: 'https://lab.jaimetorrealba.com/fire_shaders_demos' },
        },
        { src: 'plugins/digitalCity/preview/fireB.png', type: 'img', name: 'fireB', title: '火B🔥效果' },
        { src: 'plugins/digitalCity/preview/fireC.png', type: 'img', name: 'fireC', title: '火C🔥效果' },
        { src: 'plugins/digitalCity/preview/fireD.png', type: 'img', name: 'fireD', title: '火D🔥效果' },
        { src: 'plugins/digitalCity/preview/fireE.png', type: 'img', name: 'fireE', title: '火E🔥效果' },
        { src: 'plugins/digitalCity/preview/fireF.png', type: 'img', name: 'fireF', title: '火F🔥效果' },
        { src: 'plugins/digitalCity/preview/fireBall.png', type: 'img', name: 'fireBall', title: '火球🔥效果' },
        { src: 'plugins/digitalCity/preview/heatmap.png', type: 'img', name: 'heatmap', title: '热力图' },
        { src: 'plugins/digitalCity/preview/heatmap2.png', type: 'img', name: 'heatmap2', title: '建筑物-热力图' },
        { src: 'plugins/digitalCity/preview/cityRiver.png', type: 'img', name: 'cityRiver', title: '城市河流' },
        { src: 'plugins/digitalCity/preview/buildingsPassA.png', type: 'img', name: 'buildingsPassA', title: '建筑物后期A' },
        { src: 'plugins/digitalCity/preview/buildingsEffectA.png', type: 'img', name: 'buildingsEffectA', title: '建筑物效果A' },
        { src: 'plugins/digitalCity/preview/buildingsMarkA.png', type: 'img', name: 'buildingsMarkA', title: '建筑物标记A' },
        { src: 'plugins/digitalCity/preview/roadLines.png', type: 'img', name: 'roadLines', title: '道路飞线' },
        { src: 'plugins/digitalCity/preview/flyLines.png', type: 'img', name: 'flyLines', title: '飞线' },
        { src: 'plugins/digitalCity/preview/fence.png', type: 'img', name: 'fence', title: '围栏' },
        { src: 'plugins/digitalCity/preview/fenceWave.png', type: 'img', name: 'fenceWave', title: '波浪围栏' },
        { src: 'plugins/digitalCity/preview/regionGlow.png', type: 'img', name: 'regionGlow', title: '区域内发光' },
        { src: 'plugins/digitalCity/preview/coneAnchorA.png', type: 'img', name: 'coneAnchorA', title: '浮锚标识A' },
        { src: 'plugins/digitalCity/preview/coneAnchorB.png', type: 'img', name: 'coneAnchorB', title: '浮锚标识B' },
        { src: 'plugins/digitalCity/preview/particleFirefly.png', type: 'img', name: 'particleFirefly', title: '粒子萤火虫' },
        { src: 'plugins/digitalCity/preview/city2.gif', type: 'img', name: 'city2', title: '城市新模型' },
    ],
}
