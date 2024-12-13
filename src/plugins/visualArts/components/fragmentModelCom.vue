<!--
 * @Description: 	
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-13 09:05:58
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-13 10:30:08
-->
<template>
    <TresMesh :geometry="geometry">
        <TresShaderMaterial v-bind="tsMaterialConfig" />
    </TresMesh>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { loadOBJ } from 'PLS/medical/common/util'
import { useTexture, useRenderLoop } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import vertexShader from '../shaders/fragmentModel.vert'
import fragmentShader from '../shaders/fragmentModel.frag'

const mergeGeometriesForMesh = (model: THREE.Object3D) => {
    const gList: any[] = []
    model.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
            child.geometry.deleteAttribute('uv')
            child.geometry.deleteAttribute('tangent')
            gList.push(child.geometry)
        }
    })
    return BufferGeometryUtils.mergeGeometries(gList)
}

const guanyuModel = (
    await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/eCommerce/guanYu.glb', { draco: true, decoderPath: './draco/' })
).scene
const guanyuGeometries = mergeGeometriesForMesh(guanyuModel.children[0])
guanyuGeometries.rotateX(Math.PI / 2)
guanyuGeometries.translate(0, -0.9, 0)
const geometry = guanyuGeometries.clone().toNonIndexed()

const planeModel = (await useGLTF('./plugins/industry4/model/modelDraco.glb', { draco: true, decoderPath: './draco/' })).scene
const planeGeometries = mergeGeometriesForMesh(planeModel.children[0])
planeGeometries.rotateX(-Math.PI / 2)
planeGeometries.rotateY(Math.PI / 3)
const toGeometry = planeGeometries.clone().toNonIndexed()

// const geometry = new THREE.TorusGeometry(0.82, 0.3, 32, 120).toNonIndexed()
// const toGeometry = new THREE.TorusKnotGeometry(0.6, 0.1, 180, 20, 4, 2).toNonIndexed()

const position = geometry.attributes.position.array
const length = geometry.attributes.position.count
const NextPosition = toGeometry.attributes.position.array
const NextNormal = toGeometry.attributes.normal.array
const NextLength = toGeometry.attributes.position.count

const randoms = new Float32Array(length)
const centers = new Float32Array((length + 2) * 3)
const toPositions = new Float32Array((length + 2) * 3)
const toNormal = new Float32Array((length + 2) * 3)

for (let index = 0; index < length; index += 3) {
    const random = Math.random() * 1
    const clamp = index % NextLength

    randoms[index] = random
    randoms[index + 1] = random
    randoms[index + 2] = random

    const i3 = index * 3

    const x = position[i3]
    const y = position[i3 + 1]
    const z = position[i3 + 2]

    const x1 = position[i3 + 3]
    const y1 = position[i3 + 4]
    const z1 = position[i3 + 5]

    const x2 = position[i3 + 6]
    const y2 = position[i3 + 7]
    const z2 = position[i3 + 8]

    const center = new THREE.Vector3(x + x1 + x2, y + y1 + y2, z + z1 + z2).divideScalar(3)

    centers.set([center.x, center.y, center.z], index * 3)
    centers.set([center.x, center.y, center.z], (index + 1) * 3)
    centers.set([center.x, center.y, center.z], (index + 2) * 3)

    const setVectors = (sourceArray, targetArray, clampX) => {
        const baseIndex = clampX * 3
        for (let i = 0; i < 3; i++) {
            const offset = baseIndex + i * 3
            targetArray.set([sourceArray[offset], sourceArray[offset + 1], sourceArray[offset + 2]], (clampX + i) * 3)
        }
    }
    setVectors(NextPosition, toPositions, clamp)
    setVectors(NextNormal, toNormal, clamp)
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
geometry.setAttribute('aCenter', new THREE.BufferAttribute(centers, 3))
geometry.setAttribute('toPosition', new THREE.BufferAttribute(toPositions, 3))
geometry.setAttribute('toNormal', new THREE.BufferAttribute(toNormal, 3))

console.log(geometry.attributes)

const pTexture = await useTexture(['./plugins/visualArts/image/fragment512px.png'])

const tsMaterialConfig = {
    uniforms: {
        u_progress: { value: -0.1 },
        matcap1: { value: pTexture },
        m1Color: {
            type: 'v3',
            value: new THREE.Color('#ffc0fa'),
        },
        matcap2: { value: pTexture },
        m2Color: {
            type: 'v3',
            value: new THREE.Color('#bcd4ff'),
        },
    },
    vertexShader,
    fragmentShader,
}

const colors = reactive({
    c1: '#ffc0fa',
    c2: '#bcd4ff',
})
const speed = ref(0.5)
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(tsMaterialConfig.uniforms.u_progress, 'value', {
    label: '变化量',
    min: -0.1,
    max: 1,
    step: 0.001,
}).disabled = true
paneControl.addBinding(colors, 'c1', {
    label: '颜色1st',
})
paneControl.addBinding(colors, 'c2', {
    label: '颜色2rd',
})
paneControl.addBinding(speed, 'value', {
    label: '速度',
    min: 0.001,
    max: 1,
    step: 0.001,
})

watch(
    colors,
    (newValue) => {
        tsMaterialConfig.uniforms.m1Color.value.set(newValue.c1)
        tsMaterialConfig.uniforms.m2Color.value.set(newValue.c2)
    },
    { deep: true },
)

useRenderLoop().onLoop(({ elapsed }) => {
    tsMaterialConfig.uniforms.u_progress.value = (Math.sin(elapsed * speed.value) + 1) / 2
    paneControl.refresh()
})
</script>
