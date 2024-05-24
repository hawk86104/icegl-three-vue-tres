<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-21 17:24:44
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-24 09:56:20
-->
<template>
    <Suspense>
        <router-view />
    </Suspense>
    <showSrcBtn :parts="parts" v-if="!config?.preview?.disableSrcBtn" />
    <referenceSource :referenceSourceConfig="referenceSourceConfig" />
    <FPSGraph v-if="!config?.preview?.disableFPSGraph" />
</template>
<script setup lang="ts">
import showSrcBtn from './showSrcBtn.vue'
import referenceSource from './referenceSource.vue'
import FPSGraph from './FPSGraph.vue'
import { getOnePluginConfig } from '../../common/utils'

const originalUrl = window.location.href
const hashPart = originalUrl.split('#')[1] || ''
const parts = hashPart.split('/')
let config = null
if (parts[2] === 'basic') {
    config = getOnePluginConfig(parts[2], parts[3], parts[4])
} else {
    config = getOnePluginConfig(parts[2], parts[3])
}

console.log('插件配置:', config)
const referenceSourceConfig = config?.preview?.referenceSource
</script>
