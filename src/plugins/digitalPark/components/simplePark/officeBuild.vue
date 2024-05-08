<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-06 16:35:42
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-08 17:49:33
-->
<template>
    <primitive :object="model" cast-shadow receive-shadow :position="[13.5, 0, -45]" :scale="[0.2, 0.3, 0.2]" name="办公大厅" :rotation-y="Math.PI" />
</template>
<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import * as THREE from 'three'
import { gsap } from 'gsap'

const { scene: model } = await useGLTF('./plugins/digitalPark/model/officeBuild.glb', { draco: true, decoderPath: './draco/' })
const { scene, raycaster, camera } = useTresContext()
model.traverse((child) => {
    if (child.isMesh) {
        child.frustumCulled = false // 不剔除
        child.material.side = THREE.DoubleSide
        child.castShadow = true
        child.receiveShadow = true
        child.material.emissive = child.material.color
        child.material.emissiveMap = child.material.map
        child.material.emissiveIntensity = 0.8
        child.material.envmap = scene.value.background
    }
})

const srcModel = model.clone()
let curPointerFloorName = ''
const reSrcMaterial = () => {
    model.getObjectByName(curPointerFloorName)?.traverse((child) => {
        if (child.isMesh) {
            child.material = srcModel.getObjectByName(child.name).material
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}
window.addEventListener('pointermove', (e) => {
    const mouse = new THREE.Vector2()
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    raycaster.value.setFromCamera(mouse, camera.value)
    const res = raycaster.value.intersectObject(model, true)
    if (res.length > 0 && res[0] && res[0].object && res[0].object.parent) {
        if (curPointerFloorName === res[0].object.parent.name) {
            return
        }
        reSrcMaterial()
        res[0].object.parent.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhongMaterial({
                    color: '#00d1ff',
                    transparent: true,
                    opacity: 0.7,
                    // emissive: child.material.color,
                    emissiveMap: child.material.map,
                    emissiveIntensity: 2,
                })
                child.castShadow = false
                child.receiveShadow = false
            }
        })
        curPointerFloorName = res[0].object.parent.name
    } else {
        if (curPointerFloorName) {
            reSrcMaterial()
            curPointerFloorName = ''
        }
    }
})
let curClickFloorName = ''
window.addEventListener('click', (e) => {
    const mouse = new THREE.Vector2()
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    raycaster.value.setFromCamera(mouse, camera.value)
    const res = raycaster.value.intersectObject(model, true)
    if (res.length > 0 && res[0] && res[0].object && res[0].object.parent) {
        if (curClickFloorName === 'runing') {
            return
        }
        if (curClickFloorName === res[0].object.parent.name) {
            gsap.to(res[0].object.parent.position, {
                z: srcModel.getObjectByName(curClickFloorName).position.z,
                duration: 2,
                ease: 'power1.inOut',
                onComplete: () => {
                    curClickFloorName = ''
                },
            })
            curClickFloorName = 'runing'
            return
        }
        if (curClickFloorName) {
            gsap.to(model.getObjectByName(curClickFloorName).position, {
                z: srcModel.getObjectByName(curClickFloorName).position.z,
                duration: 2,
                ease: 'power1.inOut',
                onComplete: () => {
                    curClickFloorName = ''
                },
            })
        }

        gsap.to(res[0].object.parent.position, {
            z: srcModel.getObjectByName(res[0].object.parent.name).position.z - 40,
            duration: 2,
            ease: 'power1.inOut',
            onComplete: () => {
                curClickFloorName = res[0].object.parent.name
            },
        })
        curClickFloorName = 'runing'
    }
})
</script>
