<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-18 15:14:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-18 17:21:00
-->
<template>
    <TresDirectionalLight ref="tdLight" :position="[0, 2e3, 1e3]" :intensity="1" />
    <primitive :object="map" />
    <flyTo :map="map" ref="flyToRef" />
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import * as THREE from 'three'
import { useTresContext } from '@tresjs/core'
import * as tt from 'three-tile'
import flyTo from './flyTo.vue'
import * as util from './utils'

const MAPBOXKEY = 'pk.eyJ1IjoidG9tYWNoIiwiYSI6ImNrbnR6d3psMzA4YWgydnBzeGhrNW1mdDgifQ.zq6mWEop1OTBrQ24R0SdlA'
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
const centerGeo = new THREE.Vector3(110, 30, 0)
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

const fogFactor = 1.0
watch(
    () => controls.value,
    (value: any) => {
        if (value) {
            value.target.copy(centerPostion)
            value.addEventListener('change', () => {
                // camera polar
                const polar = Math.max(value.getPolarAngle(), 0.1)
                // dist of camera to controls
                const dist = Math.max(value.getDistance(), 0.1)

                // set zoom speed on dist
                value.zoomSpeed = Math.max(Math.log(dist), 1.8)

                if (camera.value) {
                    const cameraC = camera.value as any
                    cameraC.far = THREE.MathUtils.clamp((dist / polar) * 8, 100, 50000)
                    cameraC.near = cameraC.far / 1000
                    cameraC.updateProjectionMatrix()
                }

                // set fog density on dist/polar
                if (scene.value.fog instanceof THREE.FogExp2) {
                    scene.value.fog.density = (polar / (dist + 5)) * fogFactor * 0.25
                }

                // set azimuth to 0 when dist>800
                if (dist > 8000) {
                    value.minAzimuthAngle = 0
                    value.maxAzimuthAngle = 0
                } else {
                    value.minAzimuthAngle = -Infinity
                    value.maxAzimuthAngle = Infinity
                }

                // limit the max polar on dist
                value.maxPolarAngle = Math.min(Math.pow(10000, 4) / Math.pow(dist, 4), 1.2)
            })
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

const flyToRef = ref()
watch(
    () => flyToRef.value,
    (value) => {
        if (value) {
            const newCameraGeo = new THREE.Vector3(118.724693, 32.00741, 9.655599)
            const newCenterGeo = new THREE.Vector3(118.724419, 32.010354, 0.0)

            setTimeout(() => {
                value.flyToGeo(newCameraGeo, newCenterGeo)
            }, 500)
            // value.flyToGeo(newCameraGeo, newCenterGeo)
            // setTimeout(() => {
            //     value.goToGeo(newCameraGeo, newCenterGeo)
            // }, 500)
        }
    },
)

util.showLocation(camera.value, renderer.value.domElement, map)
</script>
