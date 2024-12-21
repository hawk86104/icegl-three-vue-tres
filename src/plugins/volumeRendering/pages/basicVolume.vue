<template>
    <div class="info">
        <a href="https://klacansky.com/open-scivis-datasets/skull/skull_256x256x256_uint8.raw" target="_blank">
            https://klacansky.com/open-scivis-datasets/skull/skull_256x256x256_uint8.raw
        </a>
        <br />
        请自行下载数据集, 复制到 /plugins/volumeRendering/image/skull_256x256x256_uint8.raw
        并更改文件请求指向和 dim 大小
    </div>
    <TresCanvas clearColor="#201919" v-bind="state">
        <TresPerspectiveCamera :fov="75" :near="0.001" :far="1000" :position="[-1, 0.4, -1]" :look-at="[0, 0, 0]" :up="[0, 1, 0]" />
        <TresAmbientLight :intensity="2" />
        <OrbitControls v-bind="controlsState" />
        <Suspense>
            <basicVolume :position="[0, 0, 0]" />
        </Suspense>
        <TresGridHelper :args="[50, 50]" :position="[0, -5, 0]" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import basicVolume from '../components/basicVolumeRendering.vue'

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
.info {
    position: absolute;
    top: 50px;
    left: 10px;
    z-index: 1000;
    color: #fff;
}

.info a {
    color: #fff;
}
</style>
