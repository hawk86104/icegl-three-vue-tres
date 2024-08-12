<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-12 21:53:22
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-08-12 11:07:20
-->

<script setup lang="ts">
import { loading1, loading2, bubbleLoading, vnyoonLoading, yangyangLoading, starLoading } from 'PLS/UIdemo'
import { Pane } from 'tweakpane'
import { reactive } from 'vue'

const paneControl = new Pane({
    title: '样式',
    expanded: true,
})
const paneState = reactive({
    styleNum: 22,
    showProgress: true,
})
paneControl.addBinding(paneState, 'showProgress', { label: '显示进度' })
paneControl.addBinding(paneState, 'styleNum', {
    label: '样式选择',
    options: {
        样式一: 0,
        样式二: 1,
        样式三: 2,
        样式四: 3,
        样式五: 4,
        样式六: 5,
        样式七: 6,
        样式八: 7,
        A样式: 10,
        B样式: 11,
        C样式: 12,
        D样式: 13,
        E样式: 14,
        F样式: 15,
        G样式: 16,
        气泡圈: 20,
        滚动彩方: 21,
        花瓣: 22,
        星星环绕: 23,
    },
})
</script>

<template>
    <loading1 v-if="paneState.styleNum < 10" :styleNum="paneState.styleNum" isDemo :showProgress="paneState.showProgress" />
    <loading2 v-else-if="paneState.styleNum < 20" :styleNum="paneState.styleNum - 10" isDemo :showProgress="paneState.showProgress" />
    <bubbleLoading v-else-if="paneState.styleNum === 20" isDemo :showProgress="paneState.showProgress" />
    <vnyoonLoading v-else-if="paneState.styleNum === 21" isDemo :showProgress="paneState.showProgress" />
    <yangyangLoading v-else-if="paneState.styleNum === 22" isDemo :showProgress="paneState.showProgress" />
    <starLoading v-else-if="paneState.styleNum === 23" isDemo :showProgress="paneState.showProgress" />
</template>

<style>
.tp-dfwv {
    z-index: 9999999999;
}
</style>
