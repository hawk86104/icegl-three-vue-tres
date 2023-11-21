export default {
    name: 'shadertoyToThreejs',
    title: 'shadertoyToThree',
    intro: 'shadertoy转threejs案例',
    version: '0.0.1',
    author: 'Jsonco',
    state: 'active',
    require: ['cannon-es'],
    preview: [
        // { "src": "plugins/digitalCity/preview/buildings.mp4", "type": "video", "name": "buildings", "title": "建筑物" },
        { src: 'plugins/shadertoyToThreejs/preview/细胞.png', type: 'img', name: 'argestCircle', title: '细胞' },
        { src: 'plugins/shadertoyToThreejs/preview/shadertoyMaterial.png', type: 'img', name: 'shadertoyMaterial', title: 'shadertoyMaterial' },
    ],
};
