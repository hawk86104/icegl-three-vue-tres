<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-06 15:56:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-08 15:32:47
-->
<template>
    <loading />
    <TresCanvas v-bind="state">
        <TresPerspectiveCamera :position="[40, 30, 82]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <Levioso>
            <TresDirectionalLight ref="TDirectionalLight" :position="[80, 80, -8]" :intensity="3.0" :castShadow="true" />
        </Levioso>

        <Suspense>
            <officeBuild />
        </Suspense>
        <Suspense>
            <laboratoryBuild />
        </Suspense>
        <Suspense>
            <street />
        </Suspense>
        <Suspense>
            <sculpture />
        </Suspense>
        <Suspense>
            <car />
        </Suspense>

        <Suspense>
            <skyBoxDmesh :environment="false" texture="https://cdn.polyhaven.com/asset_img/primary/kloofendal_48d_partly_cloudy_puresky.png?width=1920" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { randomLoading as loading } from 'PLS/UIdemo'
import { reactive, shallowRef, watchEffect } from 'vue'
import { OrbitControls, Levioso } from '@tresjs/cientos'
import { skyBoxDmesh } from 'PLS/skyBox'
import * as THREE from 'three'
import officeBuild from '../components/simplePark/officeBuild.vue'
import laboratoryBuild from '../components/simplePark/laboratoryBuild.vue'
import car from '../components/simplePark/car.vue'
import sculpture from '../components/simplePark/sculpture.vue'
import street from '../components/simplePark/street.vue'

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
        TDirectionalLight.value.shadow.mapSize.set(1024 * 5, 1024 * 5)
        TDirectionalLight.value.shadow.bias = -0.00001
        TDirectionalLight.value.shadow.color = new THREE.Color(0x000000)
        TDirectionalLight.value.shadow.camera.near = 0.5
        TDirectionalLight.value.shadow.camera.far = 50000
        TDirectionalLight.value.shadow.camera.top = 300
        TDirectionalLight.value.shadow.camera.right = 300
        TDirectionalLight.value.shadow.camera.left = -300
        TDirectionalLight.value.shadow.camera.bottom = -300
    }
})
</script>
