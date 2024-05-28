<template>
    <collapse-item name="路径" :expanded="true">
        <setting-item v-for="(item, index) in optionData.dataset" :key="index">
            <n-input-group>
                <n-input v-model:value="optionData.dataset[index]" size="small" placeholder="请输入图片地址"></n-input>
                <n-button ghost @click="optionData.dataset.splice(index, 1)"> - </n-button>
            </n-input-group>
        </setting-item>
        <setting-item>
            <n-button size="small" @click="optionData.dataset.push('')"> + 新增</n-button>
        </setting-item>
    </collapse-item>
    <collapse-item name="轮播属性" :expanded="true">
        <setting-item-box name="播放器">
            <setting-item>
                <n-space>
                    <n-switch v-model:value="optionData.autoplay" size="small" />
                    <n-text>自动播放</n-text>
                </n-space>
            </setting-item>
            <!-- 开启自动播放时，设置间隔时间 -->
            <setting-item name="间隔时间">
                <n-input-number v-model:value="optionData.interval" size="small" placeholder="">
                    <template #suffix> 毫秒 </template>
                </n-input-number>
            </setting-item>
            <setting-item name="轮播方向">
                <n-select v-model:value="optionData.direction" :options="directions" placeholder="选择方向" />
            </setting-item>
            <setting-item name="过渡效果">
                <n-select v-model:value="optionData.effect" :options="effects" placeholder="效果" />
            </setting-item>
            <setting-item name="每页数量">
                <n-input-number v-model:value="optionData.slidesPerview" size="small" placeholder=""></n-input-number>
            </setting-item>
            <setting-item>
                <n-space>
                    <n-switch v-model:value="optionData.centeredSlides" size="small" />
                    <n-text>居中显示</n-text>
                </n-space>
            </setting-item>
            <setting-item name="图片样式">
                <n-select v-model:value="optionData.fit" :options="fitList" placeholder="样式" />
            </setting-item>
        </setting-item-box>
        <setting-item-box name="指示器">
            <setting-item name="样式">
                <n-select v-model:value="optionData.dotType" :options="dotTypes" placeholder="选择样式" />
            </setting-item>
            <setting-item name="位置">
                <n-select v-model:value="optionData.dotPlacement" :options="dotPlacements" placeholder="选择位置" />
            </setting-item>
            <setting-item>
                <n-space>
                    <n-switch v-model:value="optionData.showDots" size="small" />
                    <n-text>显示</n-text>
                </n-space>
            </setting-item>
            <setting-item>
                <n-space>
                    <n-switch v-model:value="optionData.showArrow" size="small" />
                    <n-text>箭头</n-text>
                </n-space>
            </setting-item>
            <setting-item>
                <n-space>
                    <n-switch v-model:value="optionData.draggable" size="small" />
                    <n-text>拖曳切换</n-text>
                </n-space>
            </setting-item>
        </setting-item-box>
    </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option>,
        required: true,
    },
})

// 字典
const dotTypes = [
    {
        label: '点',
        value: 'dot',
    },
    {
        label: '线',
        value: 'line',
    },
]
const directions = [
    {
        label: '水平方向',
        value: 'horizontal',
    },
    {
        label: '垂直方向',
        value: 'vertical',
    },
]
const effects = [
    {
        label: 'slide',
        value: 'slide',
    },
    {
        label: 'fade',
        value: 'fade',
    },
    {
        label: 'card',
        value: 'card',
    },
    {
        label: 'custom',
        value: 'custom',
    },
]
const dotPlacements = [
    {
        label: '上边',
        value: 'top',
    },
    {
        label: '下边',
        value: 'bottom',
    },
    {
        label: '左边',
        value: 'left',
    },
    {
        label: '右边',
        value: 'right',
    },
]

// 适应类型
const fitList = [
    {
        value: 'fill',
        label: 'fill',
    },
    {
        value: 'contain',
        label: 'contain',
    },
    {
        value: 'cover',
        label: 'cover',
    },
    {
        value: 'scale-down',
        label: 'scale-down',
    },
    {
        value: 'none',
        label: 'none',
    },
]
</script>
