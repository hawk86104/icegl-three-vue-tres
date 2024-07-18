<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 18:27:43
-->
<template>
    <Suspense>
        <loading />
    </Suspense>

    <TresCanvas v-bind="state" window-size>
        <Levioso :speed="showSpeedup ? 66 : 0" :rotationFactor="0.1" :floatFactor="0.1" :range="[-0.2, 0.1]">
            <TresPerspectiveCamera :position="[0, 5, 8]" :fov="45" :near="0.1" :far="500" />
        </Levioso>
        <OrbitControls v-bind="controlsState" />
        <Suspense>
            <car :run="showSpeedup" />
        </Suspense>

        <Suspense>
            <speedup :visible="showSpeedup" />
        </Suspense>

        <Suspense>
            <startroom :hide="showSpeedup" />
        </Suspense>

        <Suspense>
            <Environment :blur="0" :far="10000" :useDefaultScene="showSpeedup">
                <Lightformer :intensity="6" :rotation-x="Math.PI / 2" :position="[0, 7, 0]" :scale="[10, 10, 2]" />
            </Environment>
        </Suspense>

        <su7Effect :hide="showSpeedup" />
    </TresCanvas>
    <UIcarSkin />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { OrbitControls, Levioso } from '@tresjs/cientos'
import { randomLoading as loading } from 'PLS/UIdemo'
import { Pane } from 'tweakpane'
import { Environment, Lightformer } from 'PLS/basic'
import { useSu7Store } from 'PLS/industry4/stores/su7'
import startroom from '../components/su7/startroom.vue'
import car from '../components/su7/car.vue'
import speedup from '../components/su7/speedup.vue'
import su7Effect from '../components/su7/effect.vue'
import UIcarSkin from '../components/su7/UIcarSkin.vue'

const state = reactive({
    clearColor: '#000',
    antialias: true,
    physicallyCorrectLights: true,
    logarithmicDepthBuffer: false, // 开启后，镜面反射底部会透明过来
    renderMode: 'manual',
})
const controlsState = reactive({
    // autoRotate: true,
})

const showSpeedup = ref(false)
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(showSpeedup, 'value', { label: '流光模式' })

const su7Store = useSu7Store()
paneControl.addBinding(su7Store, 'showColorList', { label: '选择皮肤' })
// const btn = paneControl.addButton({
// 	title: '启动',
// 	label: '流光模式',
// })

// // let count = 0
// btn.on('click', () => {
// 	showSpeedup.value = !showSpeedup.value
// 	btn.title = showSpeedup.value ? '停止' : '启动'
// })
</script>
