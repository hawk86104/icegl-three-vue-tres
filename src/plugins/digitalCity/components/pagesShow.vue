<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-24 09:49:39
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-22 07:22:18
-->
<template>
    <TresCanvas ref="tcRef" v-bind="state" window-size>
        <TresPerspectiveCamera ref="perspectiveCameraRef" :position="[600, 750, -1221]" :fov="45" :near="1" :far="100000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight color="#ffffff" />
        <TresDirectionalLight :position="[100, 100, 0]" :intensity="0.5" color="#ffffff" />
        <template v-if="props.showBuildings && cityFBX">
            <buildingsModel :model="cityFBX" />
            <buildingsLines :builds="cityFBX.city" color="#000" />
        </template>

        <slot name="ability"></slot>
        <TresAxesHelper v-if="props.showAxesHelper" :args="[1000]" :position="[0, 19, 0]" />
        <TresGridHelper v-if="props.showGridHelper" :args="[6000, 100]" :position="[0, 19, 0]" />
    </TresCanvas>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        showBuildings?: boolean
        autoRotate?: boolean
        showAxesHelper?: boolean
        showGridHelper?: boolean
        disableRender?: boolean
    }>(),
    {
        showBuildings: true,
        autoRotate: true,
        showAxesHelper: true,
        showGridHelper: true,
        disableRender: false,
    },
)
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref } from 'vue'
import {} from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

import { loadCityFBX } from '../common/loadCity'
import buildingsModel from './buildings/buildingsModelCustomShader.vue' // buildingsModelIncompatible buildingsModelShader buildingsModelCustomShader
import buildingsLines from './buildings/buildingsLines.vue'

const state = reactive({
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    useLegacyLights: true,
    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
    disableRender: props.disableRender,
})
const controlsState = reactive({ autoRotate: props.autoRotate, enableDamping: true })

let cityFBX = null
if (props.showBuildings) {
    cityFBX = await loadCityFBX()
}
const perspectiveCameraRef = ref()
const tcRef = ref()
</script>
