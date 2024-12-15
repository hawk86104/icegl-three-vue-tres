<template>
    <TresCanvas clearColor="#201919" v-bind="state">
        <TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" :position="[0, 0, 200]" :look-at="[0, 0, 0]" />
        <TresAmbientLight :intensity="2" />
        <OrbitControls v-bind="controlsState" />
        <Suspense>
            <SphereWithLOD :position="[10, 0, 0]" />
        </Suspense>
        <Suspense>
            <SphereWithLOD :position="[0, 0, 0]" />
        </Suspense>
        <Suspense>
            <SphereWithLOD :position="[-10, 0, 0]" />
        </Suspense>
        <TresGridHelper :args="[50, 50]" :position="[0, -5, 0]" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import SphereWithLOD from '../components/SphereWithLOD.vue'

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

<style></style>
