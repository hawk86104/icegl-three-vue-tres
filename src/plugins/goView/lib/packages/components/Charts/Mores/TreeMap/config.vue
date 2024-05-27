<template>
    <global-setting :optionData="optionData"></global-setting>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { GlobalSetting } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option } from './config'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'

defineProps({
    optionData: {
        type: Object as PropType<typeof option & GlobalThemeJsonType>,
        required: true,
    },
})
</script>
