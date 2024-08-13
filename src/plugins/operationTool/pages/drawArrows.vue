
<template>
    <TresCanvas clearColor="#201919" window-size v-bind="state">
        <TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" :position="[0, 10, -28]" />
        <TresAmbientLight :intensity="1" />
        <OrbitControls v-bind="controlsState" />
        <Suspense>
           <drawArrows />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { OrbitControls, useGLTF } from '@tresjs/cientos'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { Pane } from 'tweakpane'
import drawArrows from  "../components/drawArrows.vue"

const state = reactive({
    // windowSize: true,
    alpha: true,
    antialias: true,
    autoClear: false,
    disableRender: true,
})
const controlsState = reactive({
    enableDamping: false,
    enableZoom: false,
    autoRotate: false,
    enablePan: false,
    enableRotate: false,
})
</script>

<style >

</style>