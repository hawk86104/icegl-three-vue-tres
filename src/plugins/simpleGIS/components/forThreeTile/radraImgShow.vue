<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-19 11:34:24 
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-20 10:31:20
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
import * as util from './utils'

const props = withDefaults(
    defineProps<{
        map: any
        height?: number
        opacity?: number
    }>(),
    {
        height: 100,
        opacity: 0.6,
    },
)

const material = new THREE.MeshPhongMaterial({
    displacementMap: new THREE.Texture(),
    transparent: true,
    side: THREE.DoubleSide,
    opacity: props.opacity,
    displacementScale: 0.5,
    displacementBias: 0,
    // color: new THREE.Color(props.color),
})
material.onBeforeCompile = (shader: any) => {
    shader.vertexShader =
        `uniform sampler2D map;
	` + shader.vertexShader
    shader.vertexShader = shader.vertexShader.replace(
        '#include <displacementmap_vertex>',
        'transformed += normalize( objectNormal ) * ( texture2D(map, vMapUv ).a * displacementScale + displacementBias );',
    )
}

const pos = props.map.geo2pos(new THREE.Vector3(105, 34, 0)) // 云图的中心点
pos.applyMatrix4(props.map.matrix)

const scale = util.scaleImg(props.map, { x: 67, y: 11 }, { x: 140, y: 57 }, props.height) // 这里计算卫星云图的位置

const imgList = []
for (let index = 0; index < 9; index++) {
    imgList.push(`https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/simpleGIS/QPFRef_202405311${index}40.png`)
}

let curImgIndex = 0
const pTexture = await useTexture(imgList)

material.map = pTexture[curImgIndex]

watch(
    () => [props.color, props.opacity],
    ([color, opacity]) => {
        // material.color.setStyle(color)
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
