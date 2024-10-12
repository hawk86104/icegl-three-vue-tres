<template>
    <TresMesh :geometry="meshLine._geometry" :material="material" :render-order="99999" />
</template>
<script lang="ts" setup>
import { watch } from 'vue'
import * as THREE from 'three'
import { useTexture, useRenderLoop } from '@tresjs/core'
import { MeshLine, MeshLineMaterial } from './THREE.MeshLine.js'

const props = withDefaults(
    defineProps<{
        linePoints?: any
        speed?: number
        style?: number
        color?: string
        opacity?: number
        height?: number
        lineWidth?: number
    }>(),
    {
        linePoints: [
            [500, 0, 500],
            [0, 0, 0],
        ],
        speed: 0.01,
        style: 1,
        color: '#fff',
        opacity: 1,
        height: 330,
        lineWidth: 40,
    },
)

const imgList = [
    './plugins/digitalCity/image/flyLine1.png',
    './plugins/digitalCity/image/flyLine2.png',
    './plugins/digitalCity/image/flyLine3.png',
    './plugins/digitalCity/image/flyLine4.png',
    './plugins/digitalCity/image/flyLine5.png',
]

const vX = (props.linePoints[1][0] + props.linePoints[0][0]) / 2
const vZ = (props.linePoints[1][2] + props.linePoints[0][2]) / 2
const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3().fromArray(props.linePoints[0]),
    new THREE.Vector3(vX, props.height, vZ),
    new THREE.Vector3(vX, props.height, vZ),
    new THREE.Vector3().fromArray(props.linePoints[1]),
)

const geo = new THREE.BufferGeometry()
geo.setFromPoints(curve.getPoints(100))

const meshLine = new MeshLine()
meshLine.setGeometry(geo)

const pTexture = await useTexture({ map: imgList[props.style] })
pTexture.map.anisotropy = 16
pTexture.map.wrapS = THREE.RepeatWrapping
pTexture.map.wrapT = THREE.RepeatWrapping

const material = new MeshLineMaterial({
    color: props.color,
    map: pTexture.map,
    useMap: true,
    lineWidth: props.lineWidth,
    resolution: new THREE.Vector2(100, 100),
    dashArray: 0, // 破折号之间的长度和间距。(0 -无破折号)
    dashRatio: 0.7, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
    dashOffset: 1,
    transparent: true,
    sizeAttenuation: 1, // 使线宽不变，不管距离(1个单位是屏幕上的1px)(0 -衰减，1 -不衰减)
    side: THREE.FrontSide,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    opacity: props.opacity,
}) as any

material.depthWrite = false
material.depthTest = true
const { onLoop } = useRenderLoop()

onLoop(() => {
    material.uniforms.offset.value.x -= props.speed
})

watch(
    () => [props.color, props.opacity, props.lineWidth],
    ([color, opacity, lineWidth]) => {
        material.uniforms.color.value.setStyle(color)
        material.uniforms.opacity.value = opacity
        material.uniforms.lineWidth.value = lineWidth
    },
)
</script>
