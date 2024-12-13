<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-13 14:36:33
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-13 21:09:49
-->
<template>
    <TresCanvas window-size clearColor="#333333">
        <TresPerspectiveCamera :position="[5, 5, 5]" />
        <OrbitControls />
        <TresMesh :position="[0, 1, -4]" :geometry="geometry">
            <TresMeshNormalMaterial transparent :opacity="0.8" />
            <TresMesh :geometry="erodedGeometry">
                <TresMeshBasicMaterial wireframe color="#000" />
            </TresMesh>
        </TresMesh>

        <TresMesh :position="[0, 1, 4]" :geometry="geometry">
            <TresMeshNormalMaterial transparent :opacity="0.9" />
            <TresMesh :geometry="dilatedGeometry">
                <TresMeshBasicMaterial wireframe color="#000" />
            </TresMesh>
        </TresMesh>

        <TresMesh :position="[0, 1, 0]" :geometry="geometry" :renderOrder="1">
            <TresMeshBasicMaterial color="gray" />
            <geometricGlowMesh :geometry="geometry" v-bind="geometricGlowState" />
        </TresMesh>
        <TresGridHelper :args="[10, 10]" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import { dilateBufferGeometry } from '../../common/utils'

import geometricGlowMesh from '../../components/geometricGlowMesh.vue'

const geometry = new THREE.TorusKnotGeometry(0.75, 0.25, 64)
const erodedGeometry = geometry.clone()
dilateBufferGeometry(erodedGeometry, -0.1)

const dilatedGeometry = geometry.clone()
dilateBufferGeometry(dilatedGeometry, 0.1)

const geometricGlowState = reactive({
    inColor: '#0078ff',
    outColor: '#ff00ba',
    inPower: 1.4,
    outPower: 1.2,
    inCoeficient: 1.1,
    outCoeficient: 0.1,
})
const pane = new Pane()
pane.addBinding(geometricGlowState, 'inColor', { label: '内发光色' })
pane.addBinding(geometricGlowState, 'inPower', { label: '内发光强度', step: 0.01, min: 0, max: 4 })
pane.addBinding(geometricGlowState, 'inCoeficient', { step: 0.01, min: 0, max: 4 })
pane.addBinding(geometricGlowState, 'outColor', { label: '外发光色' })
pane.addBinding(geometricGlowState, 'outPower', { label: '外发光强度', step: 0.01, min: 0, max: 6 })
pane.addBinding(geometricGlowState, 'outCoeficient', { step: 0.01, min: 0, max: 4 })
</script>
