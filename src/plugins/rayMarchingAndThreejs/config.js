export default {
    name: 'rayMarchingAndThreejs',
    title: '基于Threejs的光线行进',
    intro: 'Threejs框架下的光线行进的应用案例',
    version: '0.0.1',
    author: 'Jsonco',
    website: "https://space.bilibili.com/410503457",
    state: 'active',
    require: [],
    preview: [
        { src: 'plugins/rayMarchingAndThreejs/preview/光追基础框架.png', type: 'img', name: 'rayMarchingBasic', title: '光追基础框架' },
        { src: 'plugins/rayMarchingAndThreejs/preview/位置变换.png', type: 'img', name: 'rayMarchingTranform', title: '光追基础变换' },
        {
            src: 'plugins/rayMarchingAndThreejs/preview/多个sdf.png', type: 'img', name: 'rayMarchingCombination', title: '光追创建多个实体',
            referenceSource: { title: 'Inigo Quilez  ', url: 'https://iquilezles.org/articles/distfunctions/' }
        },
        {
            src: 'plugins/rayMarchingAndThreejs/preview/蘑菇.png', type: 'img', name: 'rayMarchingMushroom', title: '光追构建蘑菇',
            referenceSource: { title: 'XsBSzh', url: 'https://www.shadertoy.com/view/XsBSzh' }
        },
        { src: 'plugins/rayMarchingAndThreejs/preview/综合案例1.png', type: 'img', name: 'rayMarchingVIew', title: '光追构建复杂体' },
    ],
};
