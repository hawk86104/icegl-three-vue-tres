<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-24 10:17:12
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 11:29:11
-->
<template>
    <TresGroup ref="tgRef">
        <TresMesh
            v-for="(item, index) in areaList"
            :key="`${index}`"
            :properties="item.properties"
            :renderOrder="index"
            @pointer-enter="pEnter"
            @pointer-leave="pLeave"
            @pointer-move="pMove"
        >
            <TresExtrudeGeometry :args="[item.shape, extrudeSettings]" />
            <TresMeshBasicMaterial color="#2defff" :transparent="true" :opacity="0.6" />
            <!-- <TresMeshBasicMaterial color="#3480C4" :transparent="true" :opacity="0.5" />  tres暂时不支持多材质 -->
        </TresMesh>
    </TresGroup>
</template>
<script setup>
import { loadGeojson } from 'PLS/digitalCity/common/utils'
import { watchEffect, ref } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import * as D3 from 'd3-geo'
import * as THREE from 'three'
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'

const initMeshBvh = () => {
    THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
    THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
    THREE.Mesh.prototype.raycast = acceleratedRaycast
}
initMeshBvh()

// 墨卡托投影转换
const projection = D3.geoMercator().center([104.0, 37.5]).translate([0, 0])

const areaJson = await loadGeojson('./plugins/simpleGIS/json/china.json', 'features')

const extrudeSettings = {
    depth: 10,
    bevelEnabled: false,
}
const areaList = []
const makeAreaPrimary = () => {
    areaJson.forEach((elem) => {
        const coordinates = elem.geometry.coordinates
        coordinates.forEach((multiPolygon) => {
            multiPolygon.forEach((polygon) => {
                const shape = new THREE.Shape()
                for (let i = 0; i < polygon.length; i++) {
                    const [x, y] = projection(polygon[i])
                    if (i === 0) {
                        shape.moveTo(x, -y)
                    }
                    shape.lineTo(x, -y)
                }
                areaList.push({ shape, properties: elem.properties })
            })
        })
    })
}
makeAreaPrimary()

const material2 = new THREE.LineBasicMaterial({ color: '#3480C4', linewidth: 1, linecap: 'round' })
const tgRef = ref()
watchEffect(() => {
    if (tgRef.value) {
        tgRef.value.children.forEach((item) => {
            item.geometry.computeBoundsTree()

            const arrayMaterial = [item.material, material2]
            item.material = arrayMaterial
        })
    }
})

let tooltip = null
const addElementTips = () => {
    const El = document.createElement('div')
    El.className = 'tooltip'
    El.style.border = '1px solid white'
    El.style.position = 'absolute'
    El.style.color = 'white'
    El.style.padding = '0px 6px'
    El.style.whiteSpace = 'no-wrap'
    El.style.visibility = 'hidden'
    document.body.appendChild(El)
    tooltip = El
}
addElementTips()

const pEnter = (intersection) => {
    intersection.object.material[0].color.set(0xff0000)
    tooltip.innerText = intersection.object.properties.name
    tooltip.style.visibility = 'visible'
}
const pLeave = (intersection) => {
    intersection.eventObject.material[0].color.set(0x2defff)
    tooltip.style.visibility = 'hidden'
}
const pMove = (intersection) => {
    tooltip.style.left = `${intersection.clientX + 6}px`
    tooltip.style.top = `${intersection.clientY + 6}px`
}
const { onLoop } = useRenderLoop()
onLoop(() => {})
</script>
