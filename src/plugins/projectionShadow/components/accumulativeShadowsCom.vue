<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-18 11:23:10
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-19 11:24:33
-->
<template>
    <TresMesh receive-shadow ref="gPlane" :scale="10" :rotate-x="-Math.PI / 2">
        <TresPlaneGeometry :args="[1, 1]" />
        <TresSoftShadowMaterial v-bind="ssConfig" />
    </TresMesh>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { ref, watch, watchEffect } from 'vue'
import { useTresContext } from '@tresjs/core'
import { ProgressiveLightMap, SoftShadowMaterial } from '@pmndrs/vanilla'

const props = withDefaults(
    defineProps<{
        opacity?: number
        alphaTest?: number
        color?: string
        blend?: number
        lightPosition?: any
        frames?: number
        blendWindow?: number
        ambient?: number
    }>(),
    {
        opacity: 0.8,
        alphaTest: 0.9,
        color: '#000000',
        blend: 2,
        lightPosition: { x: 3, y: 5, z: 3 },
        frames: 60,
        blendWindow: 100,
        ambient: 0.5,
    },
)

let gPlane = ref<THREE.Mesh>()

const { extend, scene, renderer, camera } = useTresContext()

extend({ SoftShadowMaterial })
const lightParams = {
    /** Light position */
    position: new THREE.Vector3().set(props.lightPosition.x, props.lightPosition.y, props.lightPosition.z),
    /** Radius of the jiggle, higher values make softer light */
    radius: 1,
    /** Amount of lights*/
    amount: 8,
    /** Light intensity */
    intensity: Math.PI,
    bias: 0.001, //shadow bias
    mapSize: 1024, // shadow map res
    size: 8, // shadow camera top,bottom,left,right
    near: 0.5, // shadow camera near
    far: 200, // shadow camera far
}
const plm = new ProgressiveLightMap(renderer.value, scene.value, lightParams.mapSize)
const ssConfig = {
    map: plm.progressiveLightMap2.texture,
    transparent: true,
    depthWrite: false,
    toneMapped: true,
    blend: props.blend,
    alphaTest: props.alphaTest,
    opacity: props.opacity,
    color: props.color,
}
const gLights = new THREE.Group()
for (let l = 0; l < lightParams.amount; l++) {
    const dirLight = new THREE.DirectionalLight(0xffffff, lightParams.intensity / lightParams.amount)
    dirLight.castShadow = true
    dirLight.shadow.bias = lightParams.bias
    dirLight.shadow.camera.near = lightParams.near
    dirLight.shadow.camera.far = lightParams.far
    dirLight.shadow.camera.right = lightParams.size / 2
    dirLight.shadow.camera.left = -lightParams.size / 2
    dirLight.shadow.camera.top = lightParams.size / 2
    dirLight.shadow.camera.bottom = -lightParams.size / 2
    dirLight.shadow.mapSize.width = lightParams.mapSize
    dirLight.shadow.mapSize.height = lightParams.mapSize
    gLights.add(dirLight)
}
const randomiseLightPositions = () => {
    const vLength = lightParams.position.length()
    for (let i = 0; i < gLights.children.length; i++) {
        const light = gLights.children[i]
        if (Math.random() > props.ambient) {
            light.position.set(
                lightParams.position.x + THREE.MathUtils.randFloatSpread(lightParams.radius),
                lightParams.position.y + THREE.MathUtils.randFloatSpread(lightParams.radius),
                lightParams.position.z + THREE.MathUtils.randFloatSpread(lightParams.radius),
            )
        } else {
            let lambda = Math.acos(2 * Math.random() - 1) - Math.PI / 2.0
            let phi = 2 * Math.PI * Math.random()
            light.position.set(Math.cos(lambda) * Math.cos(phi) * vLength, Math.abs(Math.cos(lambda) * Math.sin(phi) * vLength), Math.sin(lambda) * vLength)
        }
    }
}
const renderShadows = (frames = 1) => {
    scene.value.add(gLights)
    plm.prepare()
    for (let i = 0; i < frames; i++) {
        randomiseLightPositions()
        plm.update(camera.value as THREE.Camera, props.blendWindow)
        console.log('shadows plm update', i)
    }
    scene.value.remove(gLights)
    plm.finish()
}
watch(
    () => gPlane.value,
    (value) => {
        if (value) {
            plm.configure(value)
            plm.clear()
            console.log('shadows render start')
            renderShadows(props.frames)
            console.log('shadows render end')
        }
    },
)
const reset = () => {
    plm.clear()
    renderShadows(props.frames)
}
watchEffect(() => {
    if (gPlane.value) {
        if (props.opacity) {
            gPlane.value.material.opacity = props.opacity
        }
        if (props.alphaTest) {
            gPlane.value.material.alphaTest = props.alphaTest
        }
        if (props.color) {
            gPlane.value.material.color.set(props.color)
        }
        if (props.blend) {
            gPlane.value.material.blend = props.blend
        }
    }
})

watch(
    () => props.lightPosition,
    (value) => {
        if (value) {
            console.log(props.lightPosition)
            lightParams.position.set(value.x, value.y, value.z)
            reset()
        }
    },
    { deep: true },
)
watch(
    () => [props.frames, props.blendWindow, props.ambient],
    () => {
        reset()
    },
)
</script>
