<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-06 15:56:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-09 14:46:25
-->
<template>
    <loading />
    <TresCanvas v-bind="state" ref="tcRef">
        <TresPerspectiveCamera :position="[40, 30, 82]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.1" />
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
            <sculpture :darkModel="darkModel" />
        </Suspense>
        <Suspense>
            <car :darkModel="darkModel" />
        </Suspense>

        <gridPlus :args="[100, 100]" v-bind="gridState" :position="[0, -10, 0]" />

        <Suspense>
            <skyBoxDmesh :environment="false" texture="https://cdn.polyhaven.com/asset_img/primary/kloofendal_48d_partly_cloudy_puresky.png?width=1920" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { randomLoading as loading } from 'PLS/UIdemo'
import { reactive, shallowRef, watch } from 'vue'
import { OrbitControls, Levioso } from '@tresjs/cientos'
import { skyBoxDmesh } from 'PLS/skyBox'
import * as THREE from 'three'
import { gridPlus } from 'PLS/floor'
import { Pane } from 'tweakpane'
import officeBuild from '../components/simplePark/officeBuild.vue'
import laboratoryBuild from '../components/simplePark/laboratoryBuild.vue'
import car from '../components/simplePark/car.vue'
import sculpture from '../components/simplePark/sculpture.vue'
import street from '../components/simplePark/street.vue'

const state = reactive({
    // clearColor: '#201919',
    shadows: true,
    shadowMap: true,
    shadowMapType: THREE.PCFSoftShadowMap,
    windowSize: true,
})

const controlsState = reactive({
    enableDamping: true,
    dampingFactor: 0.05,
})
const gridState = reactive({
    cellSize: 10,
    cellThickness: 1,
    cellColor: '#4c4c4c',
    sectionColor: '#bbc26b',
    sectionSize: 50,
    sectionThickness: 3,
    fadeDistance: 600,
    fadeStrength: 3,
    followCamera: false,
    infiniteGrid: true,
})

const TDirectionalLight = shallowRef()
watch(TDirectionalLight, (value) => {
    if (value) {
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
const darkModel = shallowRef(false)
const paneControl = new Pane()
const tcRef = shallowRef()
paneControl.addBinding(darkModel, 'value', { label: '黑夜模式' })
watch(darkModel, (value) => {
    if (TDirectionalLight.value) {
        TDirectionalLight.value.visible = !value
        if (tcRef.value) {
            tcRef.value.context.scene.value.backgroundIntensity = value ? 0.0 : 1.0
        }
    }
})
</script>
