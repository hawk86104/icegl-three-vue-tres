<template>
    <n-divider style="margin: 10px 0"></n-divider>
    <n-space :size="8" justify="space-between" style="margin-top: 10px">
        <n-button secondary v-for="item in positionList" :key="item.key" @click="positonHandle(item.key)">
            <template #icon>
                <component :is="item.icon"></component>
            </template>
        </n-button>
    </n-space>
    <setting-item-box name="位置">
        <n-input-number v-model:value="chartAttr.y" :min="0" size="small" placeholder="px">
            <template #prefix>
                <n-text depth="3">上</n-text>
            </template>
        </n-input-number>
        <n-input-number v-model:value="chartAttr.x" :min="0" size="small" placeholder="px">
            <template #prefix>
                <n-text depth="3">左</n-text>
            </template>
        </n-input-number>
    </setting-item-box>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { PickCreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { SettingItemBox } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { renderIcon } from 'PLS/goView/lib/utils/global'
import { icon } from 'PLS/goView/lib/gPlugins//index'
import { EditCanvasConfigType } from 'PLS/goView/stores/chartEditStore.d'

const { AlignHorizontalLeftIcon, AlignVerticalCenterIcon, AlignVerticalTopIcon, AlignHorizontalCenterIcon, AlignHorizontalRightIcon, AlignVerticalBottomIcon } =
    icon.carbon

const positionList = [
    {
        key: 'AlignHorizontalLeftIcon',
        lable: '局左',
        icon: renderIcon(AlignHorizontalLeftIcon),
    },
    {
        key: 'AlignVerticalCenterIcon',
        lable: 'X轴居中',
        icon: renderIcon(AlignVerticalCenterIcon),
    },
    {
        key: 'AlignHorizontalRightIcon',
        lable: '局右',
        icon: renderIcon(AlignHorizontalRightIcon),
    },
    {
        key: 'AlignVerticalTopIcon',
        lable: '顶部',
        icon: renderIcon(AlignVerticalTopIcon),
    },
    {
        key: 'AlignHorizontalCenterIcon',
        lable: 'Y轴居中',
        icon: renderIcon(AlignHorizontalCenterIcon),
    },
    {
        key: 'AlignVerticalBottomIcon',
        lable: '底部',
        icon: renderIcon(AlignVerticalBottomIcon),
    },
]

const props = defineProps({
    canvasConfig: {
        type: Object as PropType<EditCanvasConfigType>,
        required: true,
    },
    chartAttr: {
        type: Object as PropType<PickCreateComponentType<'attr'>>,
        required: true,
    },
})

const positonHandle = (key: string) => {
    switch (key) {
        // 局左
        case positionList[0]['key']:
            props.chartAttr.x = 0
            break
        // X轴居中
        case positionList[1]['key']:
            props.chartAttr.y = (props.canvasConfig.height - props.chartAttr.h) / 2
            break
        // 局右
        case positionList[2]['key']:
            props.chartAttr.x = props.canvasConfig.width - props.chartAttr.w
            break
        // 顶部
        case positionList[3]['key']:
            props.chartAttr.y = 0
            break
        // Y轴居中
        case positionList[4]['key']:
            props.chartAttr.x = (props.canvasConfig.width - props.chartAttr.w) / 2
            break
        // 底部
        case positionList[5]['key']:
            props.chartAttr.y = props.canvasConfig.height - props.chartAttr.h
            break
    }
}
</script>
