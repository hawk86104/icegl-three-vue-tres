<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-18 16:22:39
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-18 16:50:16
-->
<template></template>
<script lang="ts" setup>
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { useTresContext, useRenderLoop } from '@tresjs/core'

const props = withDefaults(
    defineProps<{
        map: any
    }>(),
    {},
)

const { camera, controls } = useTresContext()
let twInstant = [] as any
/**
 * 飞行到某世界坐标
 * @param cameraPos 目标摄像机世界坐标
 * @param centerPos 目标地图中心坐标
 */
const flyToPos = (cameraPos: THREE.Vector3, centerPos: THREE.Vector3) => {
    if (controls.value) {
        controls.value.target.copy(centerPos)
    }
    const start = camera.value.position
    twInstant[0] = new TWEEN.Tween(start).to(cameraPos).start()
    // twInstant[1] = new TWEEN.Tween(start)
    //     // 先到10000km高空
    //     .to({ y: 10000, z: 0 }, 500)
    //     // 再到目标位置
    //     .chain(twInstant[0])
    //     .start()
}

/**
 * 飞行到某地理坐标
 * @param cameraGeo 目标摄像机经纬度坐标
 * @param centerGeo 目标地图中心经纬度坐标
 */
const flyToGeo = (cameraGeo: THREE.Vector3, centerGeo: THREE.Vector3) => {
    const getPos = (geo: THREE.Vector3) => {
        return props.map.localToWorld(props.map.geo2pos(geo))
    }

    const cameraPosition = getPos(cameraGeo)
    const centerPosition = getPos(centerGeo)
    flyToPos(cameraPosition, centerPosition)
}

const goToGeo = (cameraGeo: THREE.Vector3, centerGeo: THREE.Vector3) => {
    const newCenterPos = props.map.localToWorld(props.map.geo2pos(centerGeo))
    const newCameraPos = props.map.localToWorld(props.map.geo2pos(cameraGeo))

    camera.value.position.copy(newCameraPos)
    controls.value.target.copy(newCenterPos)
    controls.value.dispatchEvent({ type: 'change' })
}

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(() => {
    if (twInstant) {
        twInstant[0]?.update()
        // twInstant[1]?.update()
    }
})

defineExpose({
    flyToGeo,
    goToGeo,
})
</script>
