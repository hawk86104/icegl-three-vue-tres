<template>
    <!-- 遍历 seriesList -->
    <CollapseItem v-for="(item, index) in config.series" :key="index" :name="`圆环`" :expanded="true">
        <SettingItemBox name="数据">
            <SettingItem name="数值">
                <n-input-number v-model:value="config.dataset" :min="0" :max="1" :step="0.01" size="small" placeholder="数值"> </n-input-number>
            </SettingItem>
        </SettingItemBox>
        <!-- 中心标题 -->
        <SettingItemBox v-if="config.title" name="标题">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="config.title.textStyle.color"></n-color-picker>
            </SettingItem>
            <SettingItem name="字体大小">
                <n-input-number v-model:value="config.title.textStyle.fontSize" :min="0" :step="1" size="small" placeholder="字体大小"> </n-input-number>
            </SettingItem>
        </SettingItemBox>
        <!-- Echarts 全局设置 -->
        <SettingItemBox name="进度条">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.data[0].itemStyle.color"></n-color-picker>
            </SettingItem>
            <SettingItem name="阴影模糊等级">
                <n-input-number v-model:value="item.data[0].itemStyle.shadowBlur" :min="0" :max="50" :step="1" size="small" placeholder="阴影模糊等级">
                </n-input-number>
            </SettingItem>
            <SettingItem name="阴影颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.data[0].itemStyle.shadowColor"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
        <!-- 其他样式 -->
        <SettingItemBox name="轨道">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.data[1].itemStyle.color"></n-color-picker>
            </SettingItem>
            <SettingItem name="阴影模糊等级">
                <n-input-number v-model:value="item.data[1].itemStyle.shadowBlur" :min="0" :step="1" size="small" placeholder="阴影模糊等级"> </n-input-number>
            </SettingItem>
            <SettingItem name="阴影颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="item.data[1].itemStyle.shadowColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="轨道宽度">
                <n-select
                    v-model:value="item.radius[0]"
                    size="small"
                    :options="[
                        { label: '窄', value: '75%' },
                        { label: '中', value: '60%' },
                        { label: '宽', value: '45%' },
                        { label: '更宽', value: '30%' },
                    ]"
                />
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes'

const props = defineProps({
    optionData: {
        type: Object as PropType<GlobalThemeJsonType>,
        required: true,
    },
})

const config = computed(() => {
    return props.optionData
})
</script>
