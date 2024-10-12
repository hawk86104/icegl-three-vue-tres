<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-15 10:58:31
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-12 11:00:48
-->

<template>
    <pagesShow :showAxesHelper="false" :autoRotate="false" :showBuildings="false">
        <template v-slot:ability>
            <bModel :model="CityFBX" bulidingsColor="#000000" landColor="#112233" topColor="#999" />
            <bLine :builds="CityFBX.city" v-bind="lineState" />
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import pagesShow from '../components/pagesShow.vue'
import { loadCityFBX } from '../common/loadCity'
import bModel from '../components/buildings/efffectA/bModel.vue'
import bLine from '../components/buildings/efffectA/bLine.vue'


const CityFBX = await loadCityFBX()
const lineState = reactive({
    color: '#FFF',
    srcColor: '#000',
    scale: 2000,
    gradual: 6.6,
    speed: 0.3,
})

const paneControl = new Pane({
    title: '效果参数',
    expanded: true,
})
paneControl.addBinding(lineState, 'srcColor', { label: '线原颜色' })
paneControl.addBinding(lineState, 'color', { label: '线扫颜色' })
paneControl.addBinding(lineState, 'speed', {
    label: '速度',
    min: 0.1,
    max: 1,
    step: 0.1,
})
paneControl.addBinding(lineState, 'scale', {
    label: '最大扩散',
    min: 10,
    max: 2000,
    step: 10,
})
paneControl.addBinding(lineState, 'gradual', {
    label: '扩散系数',
    min: 1.1,
    max: 10,
    step: 0.1,
})
</script>
