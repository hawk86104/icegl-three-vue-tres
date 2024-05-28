<template>
    <div ref="vChartRef"></div>
</template>

<script setup lang="ts">
import { ref, PropType, toRefs, watch } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { MarkerEnum, ThemeEnum } from './config'
import { isArray } from 'PLS/goView/lib/utils/global'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})
let {
    amapKey,
    amapStyleKey,
    amapLon,
    amapLat,
    amapZindex,
    mapMarkerType,
    lang,
    amapStyleKeyCustom,
    features,
    viewMode,
    showLabel,
    pitch,
    skyColor,
    marker,
    satelliteTileLayer,
    roadNetTileLayer,
    trafficTileLayer,
} = toRefs(props.chartConfig.option.mapOptions)

let mapIns: any = null
let markers: any = []
let AMapIns: any = null
const vChartRef = ref<HTMLElement>()

const initMap = (newData: any) => {
    // 初始化
    AMapLoader.load({
        key: amapKey.value, //api服务key--另外需要在public中使用安全密钥！！！
        version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete'], // 需要使用的的插件列表
    })
        .then((AMap) => {
            AMapIns = AMap
            mapIns = new AMap.Map(vChartRef.value, {
                resizeEnable: true,
                zoom: amapZindex.value, // 地图显示的缩放级别
                center: [amapLon.value, amapLat.value],
                lang: lang.value,
                features: features.value,
                pitch: pitch.value, // 地图俯仰角度，有效范围 0 度- 83 度
                skyColor: skyColor.value,
                viewMode: viewMode.value, // 地图模式
                showLabel: showLabel.value, // 是否显示地图文字标记
                willReadFrequently: true,
            })
            dataHandle(props.chartConfig.option.dataset)

            let satelliteLayer = new AMap.TileLayer.Satellite({
                zIndex: satelliteTileLayer.value.zIndex,
                opacity: satelliteTileLayer.value.opacity,
                zooms: satelliteTileLayer.value.zooms,
            })
            let roadNetLayer = new AMap.TileLayer.RoadNet({
                zIndex: roadNetTileLayer.value.zIndex,
                opacity: roadNetTileLayer.value.opacity,
                zooms: roadNetTileLayer.value.zooms,
            })
            let trafficLayer = new AMap.TileLayer.Traffic({
                zIndex: trafficTileLayer.value.zIndex,
                opacity: trafficTileLayer.value.opacity,
                zooms: trafficTileLayer.value.zooms,
            })
            mapIns.remove([satelliteLayer, roadNetLayer, trafficLayer])
            if (satelliteTileLayer.value.show) {
                mapIns.add([satelliteLayer])
            }
            if (roadNetTileLayer.value.show) {
                mapIns.add([roadNetLayer])
            }
            if (trafficTileLayer.value.show) {
                mapIns.add([trafficLayer])
            }

            mapIns.setMapStyle(`amap://styles/${amapStyleKeyCustom.value !== '' ? amapStyleKeyCustom.value : amapStyleKey.value}`)
        })
        .catch((e) => {})
}

const dataHandle = (newData: any) => {
    if (!mapIns && !AMapIns) {
        initMap(props.chartConfig.option)
        return
    }
    if (isArray(newData.markers)) {
        // 先清除旧标记
        mapIns.remove(markers)
        markers = []
        // 记录新标记
        if (mapMarkerType.value === MarkerEnum.MARKER) {
            newData.markers.forEach((markerItem: any) => {
                const markerInstance = new AMapIns.Marker({
                    position: [markerItem.position[0], markerItem.position[1]],
                    offset: new AMapIns.Pixel(-13, -30),
                })
                markers.push(markerInstance)
                markerInstance.setMap(mapIns)
            })
        } else if (mapMarkerType.value === MarkerEnum.CIRCLE_MARKER) {
            newData.markers.forEach((markerItem: any) => {
                const markerInstance = new AMapIns.CircleMarker({
                    center: [markerItem.position[0], markerItem.position[1]],
                    radius: markerItem.value,
                    ...marker.value,
                })
                markers.push(markerInstance)
                markerInstance.setMap(mapIns)
            })
        }
    }
}

const stopWatch = watch(
    () => props.chartConfig.option.mapOptions,
    (option) => {
        initMap(option)
    },
    {
        immediate: true,
        deep: true,
    },
)

watch(
    () => props.chartConfig.option.dataset,
    (newData) => {
        try {
            dataHandle(newData)
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
    stopWatch()
    dataHandle(newData)
})
</script>
