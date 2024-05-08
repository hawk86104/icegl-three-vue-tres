<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-07 15:53:08
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-08 10:15:56
-->
<template>
    <primitive :object="model" name="水池" />
</template>
<script lang="ts" setup>
import { useTresContext, useTexture } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import * as THREE from 'three'
import { Water } from 'three/addons/objects/Water2'
// import { resetUV, randomUV } from 'PLS/digitalCity/common/utils.js'

const { scene: model } = await useGLTF('./plugins/digitalPark/model/pool.glb', { draco: true, decoderPath: './draco/' })
const { scene } = useTresContext()

const resetUV = (geometry: THREE.BufferGeometry, isCenter = false) => {
    geometry.computeBoundingBox()
    const { max, min } = geometry.boundingBox
    geometry.deleteAttribute('uv')
    const roomX = max.x - min.x
    const roomY = max.y - min.y
    const PuvList = []
    for (let i = 0; i < geometry.attributes.position.count; i++) {
        if (isCenter) {
            PuvList.push((geometry.attributes.position.getX(i) - (min.x + max.x) / 2) / roomX)
            PuvList.push((geometry.attributes.position.getY(i) - (min.y + max.y) / 2) / roomY)
        } else {
            PuvList.push((geometry.attributes.position.getX(i) - min.x) / roomX)
            PuvList.push((geometry.attributes.position.getY(i) - min.y) / roomY)
        }
    }
    const Puvs = new Float32Array(PuvList)
    geometry.setAttribute('uv', new THREE.BufferAttribute(Puvs, 2))
    // geometry.deleteAttribute('uv1')
    // geometry.deleteAttribute('normal')
    // geometry.computeVertexNormals()
    debugger
}

const setThreeWater2 = async (mesh) => {
    const pTexture = await useTexture(['./plugins/water/images/Water_1_M_Normal.jpg', './plugins/water/images/Water_2_M_Normal.jpg'])
    const waterGeometry = mesh.children[0].geometry.clone()
    resetUV(waterGeometry, true)
    debugger
    const tsWater = new Water(waterGeometry, {
        color: new THREE.Color('#fff'),
        scale: 20,
        flowDirection: new THREE.Vector2(1, 1),
        textureWidth: 1024,
        textureHeight: 1024,
        normalMap0: pTexture[0],
        normalMap1: pTexture[1],
    })
    tsWater.material.transparent = true
    tsWater.material.depthWrite = true
    tsWater.material.depthTest = true
    tsWater.material.side = THREE.DoubleSide
    tsWater.material.uniforms.config.value.w = 20
    tsWater.material.uniforms.reflectivity.value = 0.46
    tsWater.name = '动态水'
    return tsWater
}

model.traverse(async (child) => {
    if (child.isMesh) {
        // child.material.emissive = child.material.color
        // child.material.emissiveMap = child.material.map
        // child.material.emissiveIntensity = 1
        // child.material.envmap = scene.value.background
    }
    if (child.isObject3D) {
        if (child.name === '00baked_baesin_2') {
            const waterMesh = await setThreeWater2(child)
            child.remove(child.children[0])
            // child.visible = false
            // waterMesh.position.y = 10
            // waterMesh.rotation.x = Math.PI * -0.5
            scene.value.add(waterMesh)
        }
    }
})

/* 
            const pTexture = await useTexture(['./plugins/water/images/Water_1_M_Normal.jpg', './plugins/water/images/Water_2_M_Normal.jpg'])
            const waterGeometry = new THREE.PlaneGeometry(20, 20)
            const waterMesh = new Water(waterGeometry, {
                color: new THREE.Color('#fff'),
                scale: 20,
                flowDirection: new THREE.Vector2(1, 1),
                textureWidth: 1024,
                textureHeight: 1024,
                normalMap0: pTexture[0],
                normalMap1: pTexture[1],
            })
*/
</script>
