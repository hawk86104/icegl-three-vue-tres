<template>
    <TresMesh ref="meshRef" :rotation-x="Math.PI / -2">
        <TresSphereGeometry :args="[1, 16, 16]" />
        <TresShaderMaterial :uniforms="uniforms" :vertexShader="vertex" :fragmentShader="fragment" />
    </TresMesh>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import * as Three from 'three'
import { Pane } from 'tweakpane'
import vertex from '../shaders/vertex.glsl'
import fragment from '../shaders/fragment.glsl'
import { useRenderLoop, useTresContext } from '@tresjs/core'

const dim = 41
const width = window.innerWidth
const height = window.innerHeight

const meshRef = ref(null)
const volumeData = ref<Uint8Array | null>(null)

const handleVolumeFileUpload = () => {
    fetch('/plugins/volumeRendering/image/nucleon_41x41x41_uint8.raw')
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
            const uint8Array = new Uint8Array(arrayBuffer)
            const data = new Uint8Array(dim * dim * dim)
            for (let i = 0; i < uint8Array.length; i++) {
                data[i] = uint8Array[i]
            }
            volumeData.value = data
        })
        .catch((error) => {
            console.error('Error fetching volume data:', error)
        })
}

const clock = new Three.Clock()
clock.start()

const panel = new Pane()
const folder = panel.addFolder({ title: 'Display Settings' })

const crossFolder = folder.addFolder({ title: 'Cross Section Settings' })
const crossSectionSize = new Three.Vector3(0.5, 0.5, 0.5)
crossFolder.addBinding(crossSectionSize, 'x', { label: 'X', min: 0.02, max: 0.5, step: 0.02 })
crossFolder.addBinding(crossSectionSize, 'y', { label: 'Y', min: 0.02, max: 0.5, step: 0.02 })
crossFolder.addBinding(crossSectionSize, 'z', { label: 'Z', min: 0.02, max: 0.5, step: 0.02 })
crossFolder.expanded = true

const { camera } = useTresContext()

const uniforms = reactive({
    u_camera: {
        value: camera.value?.position,
    },
    u_resolution: {
        value: new Three.Vector3(width, height, 1),
    },
    u_dt: {
        value: 0.004,
    },
    u_time: {
        value: 0.0,
    },
    u_crossSectionSize: {
        value: crossSectionSize,
    },
    u_color: {
        value: 1,
    },
    u_volume: {
        value: null as Three.Data3DTexture | null,
    },
    u_isoValue: {
        value: 0.2,
    },
    u_alphaVal: {
        value: 0.2,
    },
})

const algoFolder = folder.addFolder({ title: 'Algorithm Settings' })
algoFolder.addBinding(uniforms.u_dt, 'value', { label: 'dt', min: 0.0004, max: 0.016, step: 0.0002 })
algoFolder.addBinding(uniforms.u_color, 'value', { label: 'color', min: 1, max: 3, step: 1 })
algoFolder.addBinding(uniforms.u_alphaVal, 'value', { label: 'alphaVal', min: 0.01, max: 1, step: 0.01 })
algoFolder.addBinding(uniforms.u_isoValue, 'value', { label: 'isoValue', min: 0, max: 1, step: 0.04 })

watch(volumeData, (newData) => {
    if (newData) {
        const volumeDataTexture = new Three.Data3DTexture(newData, dim, dim, dim)
        volumeDataTexture.format = Three.RedFormat
        volumeDataTexture.minFilter = Three.LinearFilter
        volumeDataTexture.magFilter = Three.LinearFilter
        volumeDataTexture.wrapT = Three.RepeatWrapping
        volumeDataTexture.needsUpdate = true

        uniforms.u_volume.value = volumeDataTexture
    }
})
const { onLoop } = useRenderLoop()

onLoop(() => {
    uniforms.u_time.value = clock.getElapsedTime()
})

onMounted(() => {
    handleVolumeFileUpload()
})
</script>
