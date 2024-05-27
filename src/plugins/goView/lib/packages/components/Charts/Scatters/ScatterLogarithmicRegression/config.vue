<template>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData" :in-chart="true"></global-setting>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'
import { GlobalSetting } from 'PLS/goView/lib/gPages/ChartItemSetting'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    optionData: {
        type: Object as PropType<GlobalThemeJsonType>,
        required: true,
    },
})
</script>
