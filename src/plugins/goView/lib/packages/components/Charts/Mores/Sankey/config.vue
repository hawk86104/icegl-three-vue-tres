<template>
    <div>
        <CollapseItem name="桑基图" :expanded="true">
            <SettingItemBox name="样式">
                <SettingItem name="方向">
                    <n-select v-model:value="sankeyConfig.orient" size="small" :options="orientList" placeholder="选择方向" />
                </SettingItem>
                <SettingItem name="提示标签">
                    <n-select v-model:value="optionData.tooltip.show" size="small" :options="toolTipSwitch" placeholder="是否开启" />
                </SettingItem>
            </SettingItemBox>
        </CollapseItem>
    </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option, orientList, toolTipSwitch } from './config'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option & GlobalThemeJsonType>,
        required: true,
    },
})

const sankeyConfig = computed<typeof option.series>(() => {
    return props.optionData.series
})
</script>
