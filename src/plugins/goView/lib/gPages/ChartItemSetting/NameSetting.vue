<template>
    <setting-item-box name="名称" :alone="true">
        <n-input
            type="text"
            maxlength="12"
            minlength="1"
            placeholder="请输入图表名称"
            size="small"
            clearable
            show-count
            v-model:value="chartConfig.title"
            @focus="handleFocus"
            @blur="handleBlur"
        ></n-input>
    </setting-item-box>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { SettingItemBox } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { ConfigType } from 'PLS/goView/lib/packages/index.d'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<ConfigType>,
        required: true,
    },
})

let valueCatch = ''

const handleFocus = () => {
    valueCatch = props.chartConfig.title
}

const handleBlur = () => {
    if (!props.chartConfig.title.length) {
        window['$message'].warning('请输入至少一个字符!')
        props.chartConfig.title = valueCatch
    }
}
</script>
