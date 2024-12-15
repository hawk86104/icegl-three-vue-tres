<template>
    <TresCanvas v-bind="state">
        <TresPerspectiveCamera ref="cameraRef" :fov="60" :near="0.1" :far="2000" :position="[0, 0, 25]" :look-at="[0, 0, 0]" />
        <TresAmbientLight :intensity="2" />
        <Suspense>
            <SphereWithManualLOD ref="sphereRef" />
        </Suspense>
        <OrbitControls v-bind="controlsState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import SphereWithManualLOD from '../components/SphereWithManualLOD.vue'
import { Pane, TextBladeApi } from 'tweakpane'
import { PerspectiveCamera } from 'three'

const sphereRef = shallowRef<InstanceType<typeof SphereWithManualLOD>>()
const cameraRef = shallowRef<InstanceType<typeof PerspectiveCamera>>()

const panel = new Pane()

panel.addButton({ title: '更新LOD' }).on('click', () => {
    sphereRef.value?.updateLOD()
})

const levelBinding = panel.addBlade({
    view: 'text',
    label: 'LOD级别',
    parse: (v: any) => String(v),
    value: '0',
}) as TextBladeApi<string | undefined | number>

panel.addButton({ title: '获取LOD级别' }).on('click', () => {
    if (sphereRef.value) {
        const level = sphereRef.value.getLevel()
        levelBinding.value = level
    }
})

const state = reactive({
    windowSize: true,
    alpha: true,
    antialias: true,
    autoClear: false,
    disableRender: true,
})

const controlsState = reactive({
    enableDamping: true,
    enableZoom: true,
    enablePan: true,
    enableRotate: true,
    makeDefault: true,
})
</script>

<style scoped>
.control-panel {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 8px;
    color: white;
}

.slider-container {
    margin-bottom: 10px;
}

button {
    padding: 8px 16px;
    background: #4caf50;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}

button:hover {
    background: #45a049;
}
</style>
