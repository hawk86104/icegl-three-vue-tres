<template>
    <CollapseItem name="管道" :expanded="true">
        <SettingItemBox name="默认颜色">
            <SettingItem>
                <n-select v-model:value="optionData.color_type" :options="colorOptions" @update:value="handleColorChange" />
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="管道颜色">
            <SettingItem>
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.o_color"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="水流颜色">
            <SettingItem>
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.i_color"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="流向">
            <SettingItem>
                <n-select v-model:value="optionData.line_class" :options="options" />
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})

const options = ref([
    {
        value: 'svg_ani_flow',
        label: '正向',
    },
    {
        value: 'svg_ani_flow_back',
        label: '反向',
    },
    {
        value: 'svg_ani_flow_stop',
        label: '停止',
    },
])

const colorOptions = ref([
    {
        value: 1,
        label: '蓝',
    },
    {
        value: 2,
        label: '黄',
    },
])

// 默认颜色
const handleColorChange = (e: number) => {
    switch (e) {
        case 1:
            props.optionData.o_color = '#0a7ae2'
            props.optionData.i_color = '#119bfa'
            break
        case 2:
            props.optionData.o_color = '#ff9d00'
            props.optionData.i_color = '#f7ea37'
            break
    }
}
</script>
