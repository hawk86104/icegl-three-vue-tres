<template>
    <primitive :object="model" />
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import * as THREE from 'three'
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js'
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
const { scene: model, nodes } = await useGLTF('/plugins/operationTool/model/湖中小亭/湖中小亭.gltf')
const { camera, renderer, scene, sizes, raycaster, controls } = useTresContext()

onMounted(() => {})
watchEffect(() => {})
</script>
<style>
.selectBox {
    border: 1px solid #55aaff;
    background-color: rgba(75, 160, 255, 0.3);
    position: fixed;
}
</style>
