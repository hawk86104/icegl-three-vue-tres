<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-08 10:57:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-08 15:33:27
-->
<template>
    <!-- <primitive :object="nodes.Sketchfab_model" cast-shadow receive-shadow :position="[0, 0, -500]" :scale="[0.5, 0.5, 0.5]" /> -->
    <!-- <TresGroup :rotation="[0, Math.PI / 2, 0]" :position="[40.4, 0, 0]">
        <primitive :object="group.clone()" />
    </TresGroup> -->
    <TresGroup :position="[10, 0, 0]">
        <TresGroup :position="[-33 * 4, 0, 40.4]">
            <primitive :object="group.clone()" />
        </TresGroup>
        <TresGroup :position="[-33 * 3, 0, 40.4]">
            <primitive :object="group.clone()" />
        </TresGroup>
        <TresGroup :position="[-33 * 2, 0, 40.4]">
            <primitive :object="group.clone()" />
        </TresGroup>
        <TresGroup :position="[-33, 0, 40.4]">
            <primitive :object="group.clone()" />
        </TresGroup>
        <TresGroup :position="[0, 0, 40.4]">
            <primitive :object="group.clone()" />
        </TresGroup>
        <!-- <TresGroup :position="[33, 0, 40.4]">
            <primitive :object="group.clone()" />
        </TresGroup> -->
        <TresGroup :position="[33 * 2 - 5.5, 0, 40.4]">
            <primitive :object="group.clone()" />
        </TresGroup>
        <TresGroup :position="[33 * 3 - 5.5, 0, 40.4]">
            <primitive :object="group.clone()" />
        </TresGroup>
    </TresGroup>
    <TresGroup :position="[-3.3, -0.2, 18]">
        <TresGroup :position="[0, 0, 0]">
            <primitive :object="group2.clone()" />
        </TresGroup>
        <TresGroup :position="[0, 0, 33 * 1]">
            <primitive :object="group2.clone()" />
        </TresGroup>
        <TresGroup :position="[0, 0, 33 * 2]">
            <primitive :object="group2.clone()" />
        </TresGroup>
        <TresGroup :position="[0, 0, 33 * 3]">
            <primitive :object="group2.clone()" />
        </TresGroup>
        <!-- <TresGroup :position="[0, 0, 33 * 4]">
            <primitive :object="group2.clone()" />
        </TresGroup> -->
        <TresGroup :position="[0, 0, 33 * 5 - 6]">
            <primitive :object="group2.clone()" />
        </TresGroup>
        <TresGroup :position="[0, 0, 33 * 6 - 6]">
            <primitive :object="group2.clone()" />
        </TresGroup>
    </TresGroup>
</template>
<script setup>
import { useGLTF } from '@tresjs/cientos'
import * as THREE from 'three'

const { nodes } = await useGLTF('./plugins/digitalPark/model/low_poly_street_v3.glb', { draco: true, decoderPath: './draco/' })

const Cube497_530 = nodes.Sketchfab_model.getObjectByName('Cube497_530')
Cube497_530.children[0].receiveShadow = true
const Cube549_582 = nodes.Sketchfab_model.getObjectByName('Cube549_582')
Cube549_582.children[0].receiveShadow = true
const Cube550_583 = nodes.Sketchfab_model.getObjectByName('Cube550_583')
Cube550_583.children[0].receiveShadow = true
const Cube551_854 = nodes.Sketchfab_model.getObjectByName('Cube551_854')
Cube551_854.children[0].receiveShadow = true
const Cube552_855 = nodes.Sketchfab_model.getObjectByName('Cube552_855')
Cube552_855.children[0].receiveShadow = true
const Cube553_856 = nodes.Sketchfab_model.getObjectByName('Cube553_856')
Cube553_856.children[0].receiveShadow = true

const group = new THREE.Group()
group.add(Cube497_530, Cube549_582, Cube550_583, Cube551_854, Cube552_855, Cube553_856)
group.scale.setScalar(0.83)
group.rotation.set(0, 0.008, 0)
const box = new THREE.Box3().setFromObject(group)
const center = new THREE.Vector3()
box.getCenter(center)
group.position.x = -center.x
group.position.y = -center.y
group.position.z = -center.z

const group2 = group.clone()
group2.rotateY(Math.PI / 2)
</script>
