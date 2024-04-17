<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-17 17:41:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-17 19:16:23
-->
<template>
    <loading />
    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[0, 0, 6]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="2.0" />

        <suspense>
            <stickerModel />
        </suspense>

        <suspense>
            <stickerLogo />
        </suspense>

        <suspense>
            <Environment
                :files="['pos-x.jpg', 'neg-x.jpg', 'pos-y.jpg', 'neg-y.jpg', 'pos-z.jpg', 'neg-z.jpg']"
                path="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/"
                :background="false"
            />
        </suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { randomLoading as loading } from 'PLS/UIdemo'
import * as THREE from 'three'
import { OrbitControls, Environment } from '@tresjs/cientos'
import stickerModel from '../components/stickerModel.vue'
import stickerLogo from '../components/stickerLogo.vue'

const tcConfig = {
    clearColor: '#333333',
    windowSize: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 0.8,
    shadows: true,
}
</script>
