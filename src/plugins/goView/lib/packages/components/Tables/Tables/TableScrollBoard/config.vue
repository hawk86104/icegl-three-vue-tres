<template>
    <CollapseItem name="列表" :expanded="true">
        <SettingItemBox name="基础">
            <SettingItem name="表行数">
                <n-input-number v-model:value="optionData.rowNum" :min="1" size="small" placeholder="请输入自动计算"></n-input-number>
            </SettingItem>
            <SettingItem name="轮播时间(s)">
                <n-input-number v-model:value="optionData.waitTime" :min="1" size="small" placeholder="请输入轮播时间"></n-input-number>
            </SettingItem>
            <SettingItem name="表头高度">
                <n-input-number v-model:value="optionData.headerHeight" :min="1" size="small" placeholder="请输入表头高度"></n-input-number>
            </SettingItem>
            <SettingItem name="显示行号">
                <n-switch size="small" v-model:value="optionData.index" />
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="配置" :alone="true">
            <SettingItem name="表头数据">
                <n-input v-model:value="header" :min="1" size="small" placeholder="表头数据(英文','分割)"></n-input>
            </SettingItem>
            <SettingItem name="列对齐方式">
                <n-input v-model:value="align" :min="1" size="small" placeholder="对齐方式(英文','分割)"></n-input>
            </SettingItem>
            <SettingItem name="列宽度">
                <n-input v-model:value="columnWidth" :min="1" size="small" placeholder="列宽度(英文','分割)"></n-input>
            </SettingItem>
            <SettingItem name="轮播方式">
                <n-select
                    v-model:value="optionData.carousel"
                    :options="[
                        { label: '单条轮播', value: 'single' },
                        { label: '整页轮播', value: 'page' },
                    ]"
                />
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="样式">
            <SettingItem name="表头背景色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.headerBGC"></n-color-picker>
            </SettingItem>
            <SettingItem name="奇数行背景色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.oddRowBGC"></n-color-picker>
            </SettingItem>
            <SettingItem name="偶数行背景色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.evenRowBGC"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})

const header = ref()
const align = ref()
const columnWidth = ref()

watch(
    () => props.optionData,
    (newData) => {
        header.value = props.optionData.header.toString()
        align.value = props.optionData.align.toString()
        columnWidth.value = props.optionData.columnWidth.toString()
    },
    {
        deep: false,
        immediate: true,
    },
)

watch([header, align, columnWidth], ([headerNew, alignNew, columnWidthNew], [headerOld, alignOld, columnWidthOld]) => {
    if (headerNew !== headerOld) {
        props.optionData.header = headerNew.split(',')
    }
    if (alignNew !== alignOld) {
        props.optionData.align = alignNew.split(',')
    }
    if (columnWidthNew !== columnWidthOld) {
        // @ts-ignore
        props.optionData.columnWidth = columnWidthNew.split(',')
    }
})
</script>
