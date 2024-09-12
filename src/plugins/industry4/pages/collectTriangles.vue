<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-12 10:57:56
-->
<template>
    <loading />
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[5, 1, 15]" :fov="30" :near="0.1" :far="1000" />
        <OrbitControls ref="controlsRef" v-bind="controlsState" />
        <TresAmbientLight :intensity="1" />

        <Suspense>
            <model :controls="controlsRef" />
        </Suspense>

        <Suspense>
            <Environment
                :background="false"
                :files="['pos-x.jpg', 'neg-x.jpg', 'pos-y.jpg', 'neg-y.jpg', 'pos-z.jpg', 'neg-z.jpg']"
                path="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/"
            />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { OrbitControls, Environment } from '@tresjs/cientos'
import { randomLoading as loading } from 'PLS/UIdemo'
import model from '../components/collectTriangles/model.vue'

const state = reactive({
    clearColor: '#999999',
    antialias: true,
})
const controlsState = reactive({
    autoRotate: false,
})
const controlsRef = ref(null)
</script>

<style lang="less">
// .fpsStats {
//     display: none !important;
// }
// #app > button {
//     display: none !important;
// }
</style>
