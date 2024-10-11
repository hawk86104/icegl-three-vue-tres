<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-18 15:14:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-19 17:39:57
-->
<template>
    <TresDirectionalLight ref="tdLight" :position="[0, 2e3, 1e3]" :intensity="1" />
    <primitive :object="map" />
    <Suspense>
        <cloundSateShow :map="map" v-bind="cloundSateState" />
    </Suspense>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue'
import * as THREE from 'three'
import { useTresContext } from '@tresjs/core'
import * as tt from 'three-tile'
import * as util from './utils'
import cloundSateShow from './cloundSateShow.vue'
import { Pane } from 'tweakpane'

const cloundSateState = reactive({
    height: 500,
    color: '#cccccc',
    opacity: 0.6,
})
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(cloundSateState, 'color', {
    label: '颜色',
})
paneControl.addBinding(cloundSateState, 'height', {
    label: '高度',
    min: 10,
    max: 5000,
    step: 10,
})
paneControl.addBinding(cloundSateState, 'opacity', {
    label: '透明度',
    min: 0,
    max: 1,
    step: 0.1,
})

const MAPBOXKEY = 'pk.eyJ1IjoiaGF3azg2MTA0IiwiYSI6ImNrbTQ3cWtyeTAxejEzMHBtcW42bmc0N28ifQ.bvS9U_yWdHDh41jzaDS1dw'
// mapbox 影像数据源
// const mapBoxImgSource = new tt.plugin.MapBoxSource({
//     token: MAPBOXKEY,
//     dataType: 'image',
//     style: 'mapbox.satellite',
// })

// mapbox 高程数据源
const mapBoxDemSource = new tt.plugin.MapBoxSource({
    token: MAPBOXKEY,
    dataType: 'terrain-rgb',
    style: 'mapbox.terrain-rgb',
    maxLevel: 15,
})

// 创建地图对象
const map = new tt.TileMap({
    // 影像数据源
    imgSource: [new tt.plugin.GDSource({ style: '6' }), new tt.plugin.GDSource({ style: '8' })],
    // 高程数据源
    demSource: mapBoxDemSource,
    // 地图投影中央经线经度
    lon0: 90,
    // 最小缩放级别
    minLevel: 2,
    // 最大缩放级别
    maxLevel: 20,
})

// 地图旋转到xz平面
map.rotateX(-Math.PI / 2)

// 地图中心坐标(经度，纬度，高度)
const centerGeo = new THREE.Vector3(105, 34, 0)
// 摄像坐标(经度，纬度，高度)
const camersGeo = new THREE.Vector3(110, 0, 10000)
// 地图中心转为世界坐标
const centerPostion = map.localToWorld(map.geo2pos(centerGeo))
// 摄像机转为世界坐标
const cameraPosition = map.localToWorld(map.geo2pos(camersGeo))

const tdLight = ref()

const { camera, controls, scene, renderer } = useTresContext()

if (camera.value) {
    camera.value.position.copy(cameraPosition)
}

watch(
    () => controls.value,
    (value: any) => {
        if (value) {
            value.target.copy(centerPostion)
            util.controlsEvents(value, camera.value, scene.value)
        }
    },
)
watch(
    () => tdLight.value,
    (value) => {
        if (value) {
            value.target.position.copy(centerPostion)
        }
    },
)

util.showLocation(camera.value, renderer.value.domElement, map)
</script>
