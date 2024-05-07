<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-06 15:56:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-07 15:58:19
-->
<template>
    <loading />
    <TresCanvas v-bind="state">
        <TresPerspectiveCamera :position="[17, 10, 52]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresDirectionalLight ref="TDirectionalLight" v-light-helper :position="[50, 50, -5]" :intensity="3.0" :castShadow="true" />

        <Suspense>
            <officeBuild />
        </Suspense>
        <Suspense>
            <laboratoryBuild />
        </Suspense>
        <Suspense>
            <pool />
        </Suspense>

        <Suspense>
            <skyBoxDmesh :environment="false" texture="https://cdn.polyhaven.com/asset_img/primary/kloofendal_48d_partly_cloudy_puresky.png?width=1920" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { randomLoading as loading } from 'PLS/UIdemo'
import { reactive, shallowRef, watchEffect } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { skyBoxDmesh } from 'PLS/skyBox'
import { vLightHelper } from '@tresjs/core'
import * as THREE from 'three'
import officeBuild from '../components/simplePark/officeBuild.vue'
import laboratoryBuild from '../components/simplePark/laboratoryBuild.vue'
import pool from '../components/simplePark/pool.vue'

const state = reactive({
    // clearColor: '#201919',
    shadows: true,
    windowSize: true,
})

const controlsState = reactive({
    enableDamping: true,
    dampingFactor: 0.05,
})

const TDirectionalLight = shallowRef()

watchEffect(() => {
    if (TDirectionalLight.value) {
        TDirectionalLight.value.shadow.mapSize.set(2048, 2048)
        TDirectionalLight.value.shadow.bias = -0.00001
        TDirectionalLight.value.shadow.color = new THREE.Color(0x000000)
        TDirectionalLight.value.shadow.camera.near = 0.5 // default
        TDirectionalLight.value.shadow.camera.far = 50000 // default
        TDirectionalLight.value.shadow.camera.top = 50
        TDirectionalLight.value.shadow.camera.right = 50
        TDirectionalLight.value.shadow.camera.left = -50
        TDirectionalLight.value.shadow.camera.bottom = -50
    }
})
</script>
