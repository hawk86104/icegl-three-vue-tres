<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-18 11:23:10
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-19 09:35:34
-->
<template>
    <!-- <TresMesh receive-shadow ref="gPlane" :scale="10" :rotate-x="-Math.PI / 2">
        <TresPlaneGeometry :args="[1, 1]" />
        <TresSoftShadowMaterial v-bind="ssConfig" />
    </TresMesh> -->
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { ref, watch } from 'vue'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { ProgressiveLightMap, SoftShadowMaterial } from '@pmndrs/vanilla'

let gPlane = null

const { extend, scene, renderer, camera } = useTresContext()
debugger
extend({ SoftShadowMaterial })

const plm = new ProgressiveLightMap(renderer.value, scene.value, 1024)

const ssConfig = {
    map: plm.progressiveLightMap2.texture,
    transparent: true,
    depthWrite: false,
    toneMapped: true,
    blend: 40, // ColorBlend, how much colors turn to black, 0 is black, 2
    alphaTest: 0.75,
    opacity: 0.8,
}
const shadowMaterial = new SoftShadowMaterial({
    map: plm.progressiveLightMap2.texture,
    transparent: true,
    depthWrite: false,
    toneMapped: true,
    blend: 40,
    alphaTest: 0.8,
})
gPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), shadowMaterial)
gPlane.scale.setScalar(10)
gPlane.receiveShadow = true
debugger
scene.value.add(gPlane)
plm.configure(gPlane)
plm.clear()
const lightParams = {
    /** Light position */
    position: new THREE.Vector3(3, 5, 3),
    /** Radius of the jiggle, higher values make softer light */
    radius: 1,
    /** Amount of lights*/
    amount: 8,
    /** Light intensity */
    intensity: parseInt(THREE.REVISION.replace(/\D+/g, '')) >= 155 ? Math.PI : 1,
    /** Ambient occlusion, lower values mean less AO, hight more, you can mix AO and directional light */
    ambient: 0.5,
    bias: 0.001, //shadow bias
    mapSize: 1024, // shadow map res
    size: 8, // shadow camera top,bottom,left,right
    near: 0.5, // shadow camera near
    far: 200, // shadow camera far
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
        if (Math.random() > lightParams.ambient) {
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
    // shadowMaterial
    // debugger
    shadowMaterial.opacity = 1.0
    shadowMaterial.alphaTest = 0.8
    scene.value.add(gLights)
    plm.prepare()
    for (let i = 0; i < frames; i++) {
        randomiseLightPositions()
        plm.update(camera.value as THREE.Camera, 40)
    }
    scene.value.remove(gLights)
    plm.finish()
}
let count = 0
// watch(
//     () => gPlane.value,
//     (value) => {
//         if (value) {
//             plm.configure(value)
//             console.log('plm.configure(value)')
//             // renderShadows()
//             debugger
//         }
//     },
// )
watch(
    () => gPlane.value,
    (value) => {
        if (value) {
            plm.configure(value)
            console.log('plm.configure(value)')
            // renderShadows()
            debugger
        }
    },
)
const { onLoop } = useRenderLoop() //onAfterLoop
onLoop(() => {
    if (gPlane && count++ < 40) {
        renderShadows()
        console.log('renderShadows')
    }
    // renderShadows()
})
</script>
