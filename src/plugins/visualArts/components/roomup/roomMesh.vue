<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-29 17:32:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-30 16:11:56
-->
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { nodes, materials } = await useGLTF('./plugins/visualArts/model/room-transformed.glb', { draco: true, decoderPath: './draco/' })
</script>

<template>
    <TresGroup :rotation="[-Math.PI / 2, 0, 0]">
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_2.geometry" :material="materials.Material" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_3.geometry" :material="materials[`Material.002`]" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_4.geometry" :material="materials[`Material.003`]" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_6.geometry" :material="materials.krzeslo_1" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_7.geometry" :material="materials.krzeslo_okno" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_8.geometry" :material="materials.krzeslo_prawe" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_9.geometry" :material="materials.krzeslo_srodek" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_10.geometry" :material="materials.podloga" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_11.geometry" :material="materials.sciana_okno" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_12.geometry" :material="materials[`stolik.001`]" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_16.geometry" :material="materials[`Material.006`]" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_5.geometry" :material="materials[`Material.004`]" />
        <TresMesh :geometry="nodes.Object_13.geometry">
            <TresMeshStandardMaterial transparent :opacity="0.5" />
        </TresMesh>
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_14.geometry" :material="materials[`Material.002`]" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_15.geometry" :material="materials[`Material.005`]" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_17.geometry" :material="materials.mata" />
        <TresMesh castShadow receiveShadow :geometry="nodes.Object_18.geometry" :material="materials.stolik" />
    </TresGroup>
</template>
