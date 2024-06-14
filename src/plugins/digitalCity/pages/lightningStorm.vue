<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-14 08:58:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-14 10:50:16
-->
<template>
    <pagesShow :showAxesHelper="false" :showGridHelper="false">
        <template v-slot:ability>
            <lightStorm
                :minHeight="minHeight.value"
                :maxHeight="maxHeight.value"
                :color="color.value"
                :roughness="roughness.value"
                :straightness="straightness.value"
                :radius0="radius0.value"
                :radius1="radius1.value"
                :timeScale="timeScale.value"
            />
            <gridPlus :args="[100, 100]" v-bind="gridState" :position="[0, -50, 0]" />
        </template>
    </pagesShow>
    <TresLeches />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import pagesShow from '../components/pagesShow.vue'
import lightStorm from '../components/weather/lightStorm.vue'
import { gridPlus } from 'PLS/floor'
const gridState = reactive({
    cellSize: 60,
    cellThickness: 1,
    cellColor: '#6f6f6f',
    sectionColor: '#92399e',
    sectionSize: 330,
    sectionThickness: 1.5,
    fadeDistance: 3600,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
})

import { useControls, TresLeches } from '@tresjs/leches'
import '@tresjs/leches/styles'

const { minHeight, maxHeight, color, roughness, straightness, radius0, radius1, timeScale } = useControls({
    minHeight: {
        label: '最低',
        value: 100,
        min: 10,
        max: 500,
        step: 10,
    },
    maxHeight: {
        label: '最高',
        value: 1000,
        min: 50,
        max: 2000,
        step: 10,
    },
    color: '#ffbde7',
    roughness: {
        label: '粗糙度',
        value: 0.85,
        min: 0,
        max: 1,
        step: 0.01,
    },
    straightness: {
        label: '直度度',
        value: 0.65,
        min: 0,
        max: 1,
        step: 0.01,
    },
    radius0: {
        label: '端部半径',
        value: 1,
        min: 0.1,
        max: 10,
        step: 0.01,
    },
    radius1: {
        label: '未部半径',
        value: 0.5,
        min: 0.1,
        max: 10,
        step: 0.01,
    },
    timeScale: {
        label: '时间缩放',
        value: 0.15,
        min: 0.01,
        max: 1,
        step: 0.01,
    },
})

/*
        subrayPeriod: 4,
        subrayDutyCycle: 0.6,
*/
</script>
