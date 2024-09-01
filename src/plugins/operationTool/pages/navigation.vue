
<template>
    <div>
        <TresCanvas clearColor="#201919" window-size v-bind="state">
            <TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" :position="[0, 0, 50]" :look-at="[0, 0, 0]" ref="navSceneCamera" />
            <TresAmbientLight :intensity="2" />
            <OrbitControls v-bind="controlsState" />
            <Suspense>
                <navScene />
            </Suspense>
        </TresCanvas>
        <navigation :message="navSceneCamera" />
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { OrbitControls, useGLTF } from '@tresjs/cientos'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { Pane } from 'tweakpane'
import navigation from '../components/navigation.vue'
import navScene from '../components/navScene.vue'
const navSceneCamera = ref(null)
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

<style >
#canvas {
    height: 500px;
    width: 500px;
}
</style>