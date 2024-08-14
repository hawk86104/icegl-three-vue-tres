
<template>
    <TresCanvas clearColor="#201919" window-size v-bind="state">
        <TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" :position="[0, 10, -28]" />
        <TresAmbientLight :intensity="1" />
        <OrbitControls v-bind="controlsState" />
        <Suspense>
           <FrameSelect/>
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import FrameSelect from  "../components/frameSelect.vue"
let ifExplode = false
const state = reactive({
    // windowSize: true,
    alpha: true,
    antialias: true,
    autoClear: false,
  
})
const controlsState = reactive({
    enableDamping: false,
    enableZoom: false,
    autoRotate: false,
    enablePan: false,
    enableRotate: false,
	makeDefault: true,
})


</script>

<style >

</style>