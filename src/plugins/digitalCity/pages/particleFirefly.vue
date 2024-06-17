<!--
 * @Description
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-14 08:58:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-17 15:10:11
-->
<template>
    <pagesShow :showAxesHelper="false" :showGridHelper="false">
        <template v-slot:ability>
            <Suspense>
                <firefly :position="[0, 20, 0]" />
            </Suspense>

            <gridPlus :args="[100, 100]" v-bind="gridState" :position="[0, -50, 0]" />
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import pagesShow from '../components/pagesShow.vue'
import firefly from '../components/particle/firefly.vue'
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
</script>
