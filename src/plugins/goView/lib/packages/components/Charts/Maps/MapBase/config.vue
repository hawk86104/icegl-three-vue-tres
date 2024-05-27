<template>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData"></global-setting>
    <CollapseItem name="地图" :expanded="true">
        <SettingItemBox name="地图区域">
            <SettingItem name="默认中国">
                <n-select size="small" v-model:value="mapRegion.adcode" :options="mapRegionOptions" value-field="adcode" label-field="name" />
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="区域颜色">
            <SettingItem name="0%处颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].itemStyle.areaColor.colorStops[0].color"></n-color-picker>
            </SettingItem>
            <SettingItem name="100%处颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].itemStyle.areaColor.colorStops[1].color"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="阴影">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].itemStyle.shadowColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="模糊程度">
                <n-input-number v-model:value="seriesList[1].itemStyle.shadowBlur" :min="0" size="small" placeholder="请输入模糊程度"></n-input-number>
            </SettingItem>
            <SettingItem name="水平偏移">
                <n-input-number v-model:value="seriesList[1].itemStyle.shadowOffsetX" size="small" placeholder="请输入水平偏移大小"></n-input-number>
            </SettingItem>
            <SettingItem name="垂直偏移">
                <n-input-number v-model:value="seriesList[1].itemStyle.shadowOffsetY" size="small" placeholder="请输入垂直偏移大小"></n-input-number>
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="地理信息名称">
            <SettingItem name="显示">
                <n-space>
                    <n-switch v-model:value="seriesList[1].label.show" size="small"></n-switch>
                </n-space>
            </SettingItem>
            <SettingItem name="字体颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].label.color"></n-color-picker>
            </SettingItem>
            <SettingItem name="字体大小">
                <n-input-number v-model:value="seriesList[1].label.fontSize" :min="1" size="small" placeholder="请输入字体大小"></n-input-number>
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="鼠标悬停聚焦">
            <SettingItem name="禁用（预览可见）">
                <n-space>
                    <n-switch v-model:value="seriesList[1].emphasis.disabled" size="small"></n-switch>
                </n-space>
            </SettingItem>
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].emphasis.itemStyle.areaColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="字体大小">
                <n-input-number v-model:value="seriesList[1].emphasis.label.fontSize" :min="1" size="small" placeholder="请输入字体大小"></n-input-number>
            </SettingItem>
            <SettingItem name="阴影">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].emphasis.itemStyle.shadowColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="边框大小">
                <n-input-number
                    v-model:value="seriesList[1].emphasis.itemStyle.borderWidth"
                    :min="1"
                    size="small"
                    placeholder="请输入边框大小"
                ></n-input-number>
            </SettingItem>
            <SettingItem name="文字颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].emphasis.label.color"></n-color-picker>
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="悬浮弹窗">
            <SettingItem name="显示">
                <n-space>
                    <n-switch v-model:value="seriesList[1].tooltip.show" size="small"></n-switch>
                </n-space>
            </SettingItem>
            <SettingItem name="字体大小">
                <n-input-number v-model:value="seriesList[1].tooltip.textStyle.fontSize" :min="1" size="small" placeholder="请输入字体大小"></n-input-number>
            </SettingItem>
            <SettingItem name="字体颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].tooltip.textStyle.color"></n-color-picker>
            </SettingItem>
            <SettingItem name="背景颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].tooltip.backgroundColor"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="区域边框">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[1].itemStyle.borderColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="宽度大小">
                <n-input-number v-model:value="seriesList[1].itemStyle.borderWidth" :min="1" size="small" placeholder="请输入边框大小"></n-input-number>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="其他" v-if="mapRegion.adcode === 'china'">
            <SettingItem>
                <n-checkbox v-model:checked="mapRegion.showHainanIsLands" size="small">显示南海群岛</n-checkbox>
            </SettingItem>
            <SettingItem v-if="seriesList[2]">
                <n-checkbox v-model:checked="mapRegion.enter" size="small">点击进入下级</n-checkbox>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="返回图标" v-if="mapRegion.enter">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="mapRegion.backColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="大小">
                <n-input-number v-model:value="mapRegion.backSize" :min="1" size="small" placeholder="请输入字体大小"></n-input-number>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
    <CollapseItem name="标记" :expanded="true">
        <SettingItemBox name="样式">
            <SettingItem name="大小">
                <n-input-number v-model:value="seriesList[0].symbolSize" size="small" :min="0"></n-input-number>
            </SettingItem>
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[0].itemStyle.color"></n-color-picker>
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="文本">
            <SettingItem name="显示">
                <n-space>
                    <n-switch v-model:value="seriesList[0].label.show" size="small"></n-switch>
                </n-space>
            </SettingItem>
            <SettingItem name="字体大小">
                <n-input-number v-model:value="seriesList[0].label.fontSize" size="small" :min="0"></n-input-number>
            </SettingItem>
            <SettingItem name="字体颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[0].label.color"></n-color-picker>
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="涟漪">
            <SettingItem name="涟漪大小">
                <n-input-number v-model:value="seriesList[0].rippleEffect.scale" :min="1" size="small" placeholder="请输入涟漪大小"></n-input-number>
            </SettingItem>
            <SettingItem name="涟漪颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[0].rippleEffect.color"></n-color-picker>
            </SettingItem>
            <SettingItem name="涟漪的绘制方式">
                <n-select size="small" v-model:value="seriesList[0].rippleEffect.brushType" :options="rippleEffectOptions" />
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>

    <CollapseItem v-if="seriesList[2]" name="飞线" :expanded="true">
        <SettingItemBox name="箭头">
            <SettingItem name="速度">
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-input-number v-model:value="seriesList[2].effect.period" size="small" :min="0"></n-input-number>
                    </template>
                    值越小速度越快
                </n-tooltip>
            </SettingItem>
            <SettingItem name="尾迹">
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-input-number v-model:value="seriesList[2].effect.trailLength" size="small" :min="0" :max="1"></n-input-number>
                    </template>
                    特效尾迹长度[0,1]值越大，尾迹越长重
                </n-tooltip>
            </SettingItem>
            <SettingItem name="大小">
                <n-input-number v-model:value="seriesList[2].effect.symbolSize" size="small" :min="0"></n-input-number>
            </SettingItem>
        </SettingItemBox>
        <SettingItemBox name="配置">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="seriesList[2].lineStyle.normal.color"></n-color-picker>
            </SettingItem>
            <SettingItem name="宽度">
                <n-input-number v-model:value="seriesList[2].lineStyle.normal.width" size="small" :min="1"></n-input-number>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { GlobalThemeJsonType } from 'PLS/goView/lib/gSettings/chartThemes/index'
import { GlobalSetting } from 'PLS/goView/lib/gPages/ChartItemSetting'
import { ref } from 'vue'
import mapChinaJson from './mapGeojson/china.json'

const mapRegionOptions = ref([
    {
        adcode: 'china',
        name: '中国',
    },
])

const rippleEffectOptions = ref([
    {
        value: 'fill',
        label: '实心',
    },
    {
        value: 'stroke',
        label: '空心',
    },
])

const props = defineProps({
    optionData: {
        type: Object as PropType<GlobalThemeJsonType>,
        required: true,
    },
})

const initMapRegionOptions = () => {
    mapChinaJson.features.forEach((element: any) => {
        if (element.properties.name) {
            mapRegionOptions.value.push({ ...element.properties })
        }
    })
}
initMapRegionOptions()

const seriesList = computed(() => {
    return props.optionData.series
})

const mapRegion = computed(() => {
    return props.optionData.mapRegion
})
</script>
