<template>
    <div>
        <div class="back-icon" v-if="(enter && levelHistory.length !== 0) || (enter && !isPreview())" @click="backLevel">
            <n-icon :color="backColor" :size="backSize * 1.1">
                <ArrowBackIcon />
            </n-icon>
            <span
                :style="{
                    'font-weight': 200,
                    color: backColor,
                    'font-size': `${backSize}px`,
                }"
            >
                返回上级
            </span>
        </div>
        <v-chart
            ref="vChartRef"
            :init-options="initOptions"
            :theme="themeColor"
            :option="option.value"
            :manual-update="isPreview()"
            autoresize
            @click="chartPEvents"
        >
        </v-chart>
    </div>
</template>

<script setup lang="ts">
import { PropType, reactive, watch, ref, nextTick, toRefs } from 'vue'
import config, { includes } from './config'
import VChart from 'vue-echarts'
import { icon } from 'PLS/goView/lib/gPlugins/'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import { use, registerMap } from 'echarts/core'
import { EffectScatterChart, MapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { mergeTheme, setOption } from 'PLS/goView/lib/packages/public/chart'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { isPreview } from 'PLS/goView/lib/utils/global'
import mapJsonWithoutHainanIsLands from './mapWithoutHainanIsLands.json'
import mapChinaJson from './mapGeojson/china.json'
import { DatasetComponent, GridComponent, TooltipComponent, GeoComponent, VisualMapComponent } from 'echarts/components'

const props = defineProps({
    themeSetting: {
        type: Object,
        required: true,
    },
    themeColor: {
        type: Object,
        required: true,
    },
    chartConfig: {
        type: Object as PropType<config>,
        required: true,
    },
})

const { ArrowBackIcon } = icon.ionicons5
let levelHistory: any = ref([])

const { backColor, backSize, enter } = toRefs(props.chartConfig.option.mapRegion)
const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([MapChart, DatasetComponent, CanvasRenderer, GridComponent, TooltipComponent, GeoComponent, EffectScatterChart, VisualMapComponent])

const option = reactive({
    value: mergeTheme(props.chartConfig.option, props.themeSetting, includes),
})
const vChartRef = ref<typeof VChart>()

//动态获取json注册地图
const getGeojson = (regionId: string) => {
    return new Promise<boolean>((resolve) => {
        import(`./mapGeojson/${regionId}.json`).then((data) => {
            registerMap(regionId, { geoJSON: data.default as any, specialAreas: {} })
            resolve(true)
        })
    })
}

//异步时先注册空的 保证初始化不报错
registerMap(`${props.chartConfig.option.mapRegion.adcode}`, { geoJSON: {} as any, specialAreas: {} })

// 进行更换初始化地图 如果为china 单独处理
const registerMapInitAsync = async () => {
    await nextTick()
    const adCode = `${props.chartConfig.option.mapRegion.adcode}`
    if (adCode !== 'china') {
        await getGeojson(adCode)
    } else {
        await hainanLandsHandle(props.chartConfig.option.mapRegion.showHainanIsLands)
    }
    vEchartsSetOption()
}
registerMapInitAsync()

// 手动触发渲染
const vEchartsSetOption = () => {
    option.value = props.chartConfig.option
    setOption(vChartRef.value, props.chartConfig.option)
}

// 更新数据处理
const dataSetHandle = async (dataset: any) => {
    props.chartConfig.option.series.forEach((item: any) => {
        if (item.type === 'effectScatter' && dataset.point) item.data = dataset.point
        else if (item.type === 'lines' && dataset.line) {
            item.data = dataset.line.map((it: any) => {
                return {
                    ...it,
                    lineStyle: {
                        color: props.chartConfig.option.series[2].lineStyle.normal.color,
                    },
                }
            })
        } else if (item.type === 'map' && dataset.map) item.data = dataset.map
    })
    if (dataset.pieces) props.chartConfig.option.visualMap.pieces = dataset.pieces

    isPreview() && vEchartsSetOption()
}
// 处理海南群岛
const hainanLandsHandle = async (newData: boolean) => {
    if (newData) {
        await getGeojson('china')
    } else {
        registerMap('china', { geoJSON: mapJsonWithoutHainanIsLands as any, specialAreas: {} })
    }
}

// 点击区域
const chartPEvents = (e: any) => {
    if (e.seriesType !== 'map') return
    if (!props.chartConfig.option.mapRegion.enter) {
        return
    }
    mapChinaJson.features.forEach((item) => {
        var pattern = new RegExp(e.name)
        if (pattern.test(item.properties.name)) {
            let code = String(item.properties.adcode)
            levelHistory.value.push(code)
            checkOrMap(code)
        }
    })
}

// 返回上一级
const backLevel = () => {
    levelHistory.value = []
    if (levelHistory.value.length > 1) {
        levelHistory.value.pop()
        const code = levelHistory[levelHistory.value.length - 1]
        checkOrMap(code)
    } else {
        checkOrMap('china')
    }
}

// 切换地图
const checkOrMap = async (newData: string) => {
    if (newData === 'china') {
        if (props.chartConfig.option.mapRegion.showHainanIsLands) {
            // 显示南海
            hainanLandsHandle(true)
            vEchartsSetOption()
        } else {
            // 隐藏南海
            hainanLandsHandle(false)
            vEchartsSetOption()
        }
    } else {
        await getGeojson(newData)
    }
    props.chartConfig.option.geo.map = newData
    props.chartConfig.option.series.forEach((item: any) => {
        if (item.type === 'map') item.map = newData
    })
    vEchartsSetOption()
}

//监听 dataset 数据发生变化
watch(
    () => props.chartConfig.option.dataset,
    (newData) => {
        dataSetHandle(newData)
    },
    {
        immediate: true,
        deep: false,
    },
)

// 监听线的颜色
if (props.chartConfig.option.series[2] && !isPreview()) {
    watch(
        () => props.chartConfig.option.series[2].lineStyle.normal.color,
        () => {
            dataSetHandle(props.chartConfig.option.dataset)
        },
        {
            deep: false,
        },
    )
}

//监听是否显示南海群岛
if (!isPreview()) {
    watch(
        () => props.chartConfig.option.mapRegion.showHainanIsLands,
        async (newData) => {
            try {
                await hainanLandsHandle(newData)
                vEchartsSetOption()
            } catch (error) {
                console.log(error)
            }
        },
        {
            deep: false,
        },
    )
}
//监听地图展示区域发生变化
watch(
    () => `${props.chartConfig.option.mapRegion.adcode}`,
    (newData) => {
        try {
            checkOrMap(newData)
        } catch (error) {
            console.log(error)
        }
    },
    {
        deep: false,
    },
)

// 预览
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
    dataSetHandle(newData)
})
</script>

<style scope lang="scss">
.back-icon {
    z-index: 50;
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    gap: 2px;
}
</style>
