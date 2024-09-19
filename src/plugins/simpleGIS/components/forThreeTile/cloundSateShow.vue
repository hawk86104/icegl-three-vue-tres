<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-19 11:34:24 
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-19 17:59:36
-->
<template>
    <TresGroup :position="[...pos]">
        <TresMesh :scale="[scale.x, scale.y, height]" :material="material" :rotateX="-Math.PI / 2" :renderOrder="9999" :position-y="height / 5">
            <TresPlaneGeometry :args="[1, 1, 529, 420]" />
        </TresMesh>
    </TresGroup>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { watch } from 'vue'
import { useTexture } from '@tresjs/core'

const props = withDefaults(
    defineProps<{
        map: any
        height?: number
        color?: string
        opacity?: number
    }>(),
    {
        height: 100,
        color: '#cccccc',
        opacity: 0.6,
    },
)

const material = new THREE.MeshPhongMaterial({
    displacementMap: new THREE.Texture(),
    transparent: true,
    side: THREE.DoubleSide,
    opacity: props.opacity,
    color: new THREE.Color(props.color),
})
material.onBeforeCompile = (shader: any) => {
    shader.vertexShader =
        `uniform sampler2D map;
		` + shader.vertexShader
    shader.vertexShader = shader.vertexShader.replace(
        '#include <displacementmap_vertex>',
        'transformed += normalize( objectNormal ) * ( texture2D(map, vMapUv ).a * 0.5 + 0.0 );',
    )
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <alphamap_fragment>',
        `
            #include <alphamap_fragment>
            float h = texture2D(map, vMapUv ).a;
            diffuseColor.rgb *= h;
            diffuseColor.a = clamp(diffuseColor.a * 2.0, 0.0, 1.0);
            `,
    )
}

const pos = props.map.geo2pos(new THREE.Vector3(105, 34, 0))
pos.applyMatrix4(props.map.matrix)
const scaleImg = (aa: any, oo: any) => {
    const r = props.map.geo2pos(new THREE.Vector3(aa.x, aa.y))
    const d = props.map.geo2pos(new THREE.Vector3(oo.x, oo.y))
    const p = new THREE.Vector3(d.x - r.x, d.y - r.y, props.height)
    return p
}
const scale = scaleImg({ x: 67, y: 11 }, { x: 140, y: 57 }) // 这里计算卫星云图的位置

const imgList = [
    'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/simpleGIS/SATE_L1_F2G_VISSR_MWB_NOM_FDI-201906171300.HDF.png',
    'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/simpleGIS/SATE_L1_F2G_VISSR_MWB_NOM_FDI-201906171400.HDF.png',
    'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/simpleGIS/SATE_L1_F2G_VISSR_MWB_NOM_FDI-201906171500.HDF.png',
    'https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/simpleGIS/SATE_L1_F2G_VISSR_MWB_NOM_FDI-201906171600.HDF.png',
]
let curImgIndex = 0
const pTexture = await useTexture(imgList)

material.map = pTexture[curImgIndex]

watch(
    () => [props.color, props.opacity],
    ([color, opacity]) => {
        material.color.setStyle(color)
        material.opacity = opacity
    },
)

let intervalId = null as any
let isRunning = false

const toggleTimer = () => {
    if (isRunning) {
        clearInterval(intervalId)
        intervalId = null
        isRunning = false
    } else {
        intervalId = setInterval(() => {
            curImgIndex = curImgIndex < imgList.length - 1 ? curImgIndex + 1 : 0
            material.map = pTexture[curImgIndex]
            material.needsUpdate = true
            console.log(curImgIndex)
        }, 1000)
        isRunning = true
    }
}

toggleTimer()
</script>
