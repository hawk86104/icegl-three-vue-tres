<template>
    <div>
        <CollapseItem name="关系图" :expanded="true">
            <SettingItemBox name="样式">
                <setting-item name="布局">
                    <n-select v-model:value="graphConfig.layout" :options="GraphLayout" size="small" />
                </setting-item>
            </SettingItemBox>
            <SettingItemBox name="标签">
                <setting-item name="展示">
                    <n-select v-model:value="graphConfig.label.show" :options="LabelSwitch" size="small" />
                </setting-item>
                <setting-item name="位置">
                    <n-select v-model:value="graphConfig.label.position" :options="LabelPosition" size="small" />
                </setting-item>
            </SettingItemBox>
            <SettingItemBox name="线条">
                <SettingItem name="弧线">
                    <!-- 需要输入两位的小数才会变化 -->
                    <n-input-number
                        v-model:value="optionData.series[0].lineStyle.curveness"
                        :min="0"
                        :step="0.01"
                        placeholder="弯曲程度"
                        size="small"
                    ></n-input-number>
                </SettingItem>
            </SettingItemBox>
            <SettingItemBox name="图例">
                <SettingItem name="颜色">
                    <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.legend.textStyle.color"></n-color-picker>
                </SettingItem>
                <SettingItem name="文本">
                    <n-input-number v-model:value="optionData.legend.textStyle.fontSize" :min="0" :step="1" size="small" placeholder="文字大小">
                    </n-input-number>
                </SettingItem>
            </SettingItemBox>
            <SettingItemBox name="力引导" v-if="optionData.series[0].force && graphConfig.layout == 'force'">
                <SettingItem name="斥力因子" v-if="optionData.series[0].force.repulsion">
                    <n-input-number v-model:value="optionData.series[0].force.repulsion" :min="0" :step="1" size="small" placeholder="斥力因子大小">
                    </n-input-number>
                </SettingItem>
                <SettingItem name="引力因子" v-if="optionData.series[0].force.gravity">
                    <n-input-number v-model:value="optionData.series[0].force.gravity" :min="0" :step="0.1" size="small" placeholder="引力因子">
                    </n-input-number>
                </SettingItem>
                <SettingItem name="节点距离">
                    <n-input-number v-model:value="optionData.series[0].force.edgeLength" :min="0" :step="1" size="small" placeholder="节点距离">
                    </n-input-number>
                </SettingItem>
                <SettingItem name="迭代动画">
                    <n-select v-model:value="graphConfig.force.layoutAnimation" :options="LayoutAnimation" size="small" />
                </SettingItem>
                <SettingItem name="节点速度">
                    <n-input-number v-model:value="optionData.series[0].force.friction" :min="0" :step="0.1" size="small" placeholder="节点速度">
                    </n-input-number>
                </SettingItem>
            </SettingItemBox>
        </CollapseItem>
    </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { option, GraphLayout, LabelSwitch, LabelPosition, LayoutAnimation } from './config'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'

const props = defineProps({
    optionData: {
        type: Object as PropType<typeof option & GlobalThemeJsonType>,
        required: true,
    },
})

const graphConfig = computed<(typeof option.series)[0]>(() => {
    return props.optionData.series[0]
})
</script>
