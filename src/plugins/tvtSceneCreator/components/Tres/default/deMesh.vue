<template>
    <TresPerspectiveCamera :position="[20, 15, -20]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
    <OrbitControls enableDamping makeDefault />

    <TresGroup ref="tresGroupRef">
        <primitive :object="toRaw(mesh)" :meshListIndex="index" v-for="(mesh, index) in primitiveList" @click="pClick" />
    </TresGroup>
    <TransformControls
        @dragging="draggingEvent"
        v-if="transformRef && curMeshList.controlState !== 'sel' && curMeshList.controlState !== null && curMeshList.selectedMeshIndex !== null"
        :object="transformRef"
        :mode="curMeshList.controlState"
    />
</template>

<script setup lang="ts">
// @ts-nocheck
import * as THREE from 'three'
import { ref, onMounted, toRaw, watch } from 'vue'
import { useTresContext, useSeek } from '@tresjs/core'
import { OrbitControls, TransformControls, useGLTF } from '@tresjs/cientos'
import { useCurMeshListStore } from 'PLS/tvtSceneCreator/stores/curMeshList'

const curMeshList = useCurMeshListStore()

const transformRef = ref()
const tresMeshRef = ref()

onMounted(() => {})

const getOneMesh = async (m) => {
    const mesh = m as any
    let onePrimitive = null as any
    if (mesh.type === 'AmbientLight') {
        onePrimitive = new THREE[mesh.type](mesh.color, mesh.intensity)
        onePrimitive.name = mesh.type
    } else if (mesh.type === 'DirectionalLight') {
        onePrimitive = new THREE[mesh.type](mesh.color, mesh.intensity)
        onePrimitive.position.set(...toRaw(mesh.position))
        onePrimitive.name = mesh.type
    } else if (mesh.type === 'Mesh') {
        const geometry = new THREE[mesh.geometry](...toRaw(mesh.args))
        const material = new THREE[mesh.material]()
        material.metalness = mesh.metalness
        material.roughness = mesh.roughness
        material.color = new THREE.Color(mesh.color)
        onePrimitive = new THREE[mesh.type](geometry, material)
        onePrimitive.name = mesh.name
        onePrimitive.position.set(...toRaw(mesh.position))
        onePrimitive.rotation.set(...toRaw(mesh.rotation))
        onePrimitive.scale.set(...toRaw(mesh.scale))
    } else {
        const { scene: modelScene } = await useGLTF(mesh.url, { draco: true, decoderPath: './draco/' })
        modelScene.name = mesh.name
        onePrimitive = modelScene
        onePrimitive.position.set(...toRaw(mesh.position))
        onePrimitive.rotation.set(...toRaw(mesh.rotation))
        onePrimitive.scale.set(...toRaw(mesh.scale))
    }
    onePrimitive.visible = mesh.visible
    return onePrimitive
}
const primitiveList = ref([])
watch(
    () => curMeshList.mlist,
    async (mlist) => {
        const list = []
        for (const mesh of curMeshList.mlist) {
            list.push(await getOneMesh(mesh))
        }
        primitiveList.value = list
        console.log('primitiveList', list)
    },
    { immediate: true, deep: true },
)
const pClick = (event) => {
    // event.stopPropagation()
    if (!curMeshList.controlState) {
        return
    }
    if (event.eventObject.meshListIndex) {
        curMeshList.selectedMeshIndex = event.eventObject.meshListIndex
    }
}

const { scene } = useTresContext()
const { seek } = useSeek()
const tresGroupRef = ref()
let directionalLightHelper = null as any
watch(
    () => curMeshList.selectedMeshIndex,
    (index) => {
        if (directionalLightHelper) {
            directionalLightHelper.parent.remove(directionalLightHelper)
            directionalLightHelper.dispose()
            directionalLightHelper = null
        }
        scene.value.children.forEach((child) => {
            if (child.type === 'AmbientLight') {
            } else if (child.type === 'DirectionalLight') {
                if (child.meshListIndex === index) {
                    directionalLightHelper = new THREE.DirectionalLightHelper(child, 10)
                    scene.value.add(directionalLightHelper)
                }
            } else {
                if (child.material) {
                    child.material.wireframe = child.meshListIndex === index
                }
            }
        })

        if (index !== null) {
            // const mesh = seek(tresGroupRef.value, 'meshListIndex', index) as any
            const mesh = seek(scene.value, 'meshListIndex', index) as any

            if (mesh) {
                transformRef.value = toRaw(mesh)
            }
        }
    },
)
watch(
    () => curMeshList.controlState,
    (controlState) => {
        if (controlState) {
            //
        } else {
            curMeshList.selectedMeshIndex = null
        }
    },
)
watch(
    () => tresGroupRef.value,
    (value) => {
        // curMeshList.tresGroup = value
        curMeshList.tresGroup = scene.value

        // curMeshList.addMesh({ name: 'AmbientLight', type: 'AmbientLight', intensity: 10 })
        // curMeshList.addMesh({ name: 'DirectionalLight', type: 'DirectionalLight', intensity: 5, position: [5, 3, 5] })
        // curMeshList.addMesh({ name: 'm1', position: [3, -3, 6], args: [6, 6, 6], metalness: 1, roughness: 0.14 })
        // curMeshList.addMesh({ name: 'm2', position: [0, 2, -4], material: 'MeshNormalMaterial', args: [2, 2, 2] })
        // curMeshList.addMesh({ name: 'm3', position: [0, 8, -4], material: 'MeshNormalMaterial', args: [2, 2, 2] })
    },
)

const draggingEvent = (e: any) => {
    if (!e && window['TvTSCinForPane']) {
        window['TvTSCinForPane']()
    }
}
</script>
