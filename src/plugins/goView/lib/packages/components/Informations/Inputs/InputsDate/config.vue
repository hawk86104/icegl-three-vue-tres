<template>
    <collapse-item name="展示方式" :expanded="true">
        <setting-item-box name="选择方式">
            <n-select v-model:value="optionData.isPanel" size="small" :options="panelOptions" />
        </setting-item-box>
    </collapse-item>

    <collapse-item name="时间配置" :expanded="true">
        <setting-item-box name="基础">
            <setting-item name="类型">
                <n-select
                    v-model:value="optionData.componentInteractEventKey"
                    size="small"
                    :options="datePickerTypeOptions"
                    @update:value="datePickerTypeUpdate"
                />
            </setting-item>
        </setting-item-box>

        <setting-item-box name="默认值">
            <setting-item name="类型">
                <n-select v-model:value="optionData.defaultType" size="small" :options="defaultTypeOptions" @update:value="defaultTypeUpdate" />
            </setting-item>
        </setting-item-box>
        <setting-item-box v-if="optionData.defaultType === DefaultTypeEnum.STATIC" :alone="true">
            <setting-item name="静态默认值">
                <n-date-picker size="small" clearable v-model:value="optionData.dataset" :type="optionData.componentInteractEventKey" />
            </setting-item>
        </setting-item-box>
        <setting-item-box v-if="optionData.defaultType === DefaultTypeEnum.DYNAMIC">
            <template #name>
                <n-text></n-text>
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-icon size="21" :depth="3">
                            <help-outline-icon></help-outline-icon>
                        </n-icon>
                    </template>
                    <span>打开页面时浏览器操作系统的系统时间+偏移量(单位)</span>
                </n-tooltip>
            </template>
            <setting-item :name="differValueName">
                <n-input-number v-model:value="optionData.differValue[0]" class="input-num-width" size="small">
                    <template #suffix>
                        {{ DifferUnitObject[optionData.differUnit[0]] }}
                    </template>
                </n-input-number>
            </setting-item>
            <setting-item :name="differUnitName">
                <n-select v-model:value="optionData.differUnit[0]" size="small" :options="differUnitOptions" />
            </setting-item>
            <setting-item v-if="isRange" name="结束值动态偏移量">
                <n-input-number v-model:value="optionData.differValue[1]" class="input-num-width" size="small">
                    <template #suffix>
                        {{ DifferUnitObject[optionData.differUnit[1]] }}
                    </template>
                </n-input-number>
            </setting-item>
            <setting-item v-if="isRange" name="结束值偏移单位">
                <n-select v-model:value="optionData.differUnit[1]" size="small" :options="differUnitOptions" />
            </setting-item>
        </setting-item-box>
    </collapse-item>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue'
import { icon } from 'PLS/goView/lib/gPlugins/'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option } from './config'
import { ComponentInteractEventEnum, DefaultTypeEnum, DifferUnitEnum, DifferUnitObject } from './interact'
import dayjs from 'dayjs'

const { HelpOutlineIcon } = icon.ionicons5

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})

const panelOptions = [
    {
        label: '下拉展示',
        value: 0,
    },
    {
        label: '面板展示',
        value: 1,
    },
]

const datePickerTypeOptions = [
    {
        label: '日期',
        value: ComponentInteractEventEnum.DATE,
    },
    {
        label: '日期时间',
        value: ComponentInteractEventEnum.DATE_TIME,
    },
    {
        label: '日期范围',
        value: ComponentInteractEventEnum.DATE_RANGE,
    },
    {
        label: '月份',
        value: ComponentInteractEventEnum.MONTH,
    },
    {
        label: '月份范围',
        value: ComponentInteractEventEnum.MONTH_RANGE,
    },
    {
        label: '年份',
        value: ComponentInteractEventEnum.YEAR,
    },
    {
        label: '年份范围',
        value: ComponentInteractEventEnum.YEAR_RANGE,
    },
    {
        label: '季度',
        value: ComponentInteractEventEnum.QUARTER,
    },
    {
        label: '季度范围',
        value: ComponentInteractEventEnum.QUARTER_RANGE,
    },
]

const defaultTypeOptions = [
    {
        label: '静态',
        value: DefaultTypeEnum.STATIC,
    },
    {
        label: '动态',
        value: DefaultTypeEnum.DYNAMIC,
    },
    {
        label: '无',
        value: DefaultTypeEnum.NONE,
    },
]

const differUnitOptions = [
    // ManipulateType
    {
        value: DifferUnitEnum.DAY,
        label: DifferUnitObject[DifferUnitEnum.DAY],
    },
    {
        value: DifferUnitEnum.WEEK,
        label: DifferUnitObject[DifferUnitEnum.WEEK],
    },
    {
        value: DifferUnitEnum.MONTH,
        label: DifferUnitObject[DifferUnitEnum.MONTH],
    },
    {
        value: DifferUnitEnum.QUARTER,
        label: DifferUnitObject[DifferUnitEnum.QUARTER],
    },
    {
        value: DifferUnitEnum.YEAR,
        label: DifferUnitObject[DifferUnitEnum.YEAR],
    },
    {
        value: DifferUnitEnum.HOUR,
        label: DifferUnitObject[DifferUnitEnum.HOUR],
    },
    {
        value: DifferUnitEnum.MINUTE,
        label: DifferUnitObject[DifferUnitEnum.MINUTE],
    },
    {
        value: DifferUnitEnum.SECOND,
        label: DifferUnitObject[DifferUnitEnum.SECOND],
    },
    {
        value: DifferUnitEnum.MILLISECOND,
        label: DifferUnitObject[DifferUnitEnum.MILLISECOND],
    },
]

const isRange = computed(() => {
    return props.optionData.componentInteractEventKey.endsWith('range')
})

const differValueName = computed(() => {
    return isRange.value ? '开始值动态偏移量' : '动态偏移量'
})

const differUnitName = computed(() => {
    return isRange.value ? '开始值偏移单位' : '偏移单位'
})

const datePickerTypeUpdate = () => {
    props.optionData.dataset = isRange.value ? [dayjs().valueOf(), dayjs().valueOf()] : dayjs().valueOf()
}

const defaultTypeUpdate = (v: string) => {
    if (v === DefaultTypeEnum.STATIC) {
        datePickerTypeUpdate()
    } else {
        // DefaultTypeEnum.
        props.optionData.dataset = null
    }
}
</script>
