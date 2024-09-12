<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-05 09:36:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-12 11:49:09
-->

<template>
    <TresGroup ref="tgRef">
        <template v-for="(item, index) in areaList" :key="`${index}`">
            <Html v-if="item.type === 'Html'" v-bind="htmlState" :position="item.position">
                <span>
                    {{ item.name }}
                </span>
            </Html>
            <TresSprite v-if="item.type === 'Sprite'" :position="item.position" :scale="0.3" :renderOrder="1000">
                <TresSpriteMaterial :color="0xff0000" :blending="THREE.NormalBlending" :map="pTexture" />
            </TresSprite>
            <TresMesh
                v-if="item.type === 'Shape'"
                :name="item.name"
                :renderOrder="index"
                :pCenter="item.pCenter"
                @pointer-enter="pEnter"
                @pointer-leave="pLeave"
                @click="pClick"
            >
                <TresExtrudeGeometry :args="[item.shape, { depth: item.depth, bevelEnabled: false }]" />
                <TresMeshStandardMaterial
                    :color="item.color"
                    :emissive="0x000000"
                    :roughness="0.45"
                    :metalness="0.8"
                    :transparent="true"
                    :side="THREE.DoubleSide"
                />
            </TresMesh>
            <template v-if="item.type === 'Line'">
                <TresLine :renderOrder="index" :position-z="item.depth + 0.0001">
                    <TresBufferGeometry :position="[item.points, 3]" />
                    <TresLineBasicMaterial :color="0xffffff" :linewidth="0.5" />
                </TresLine>
                <TresLine :renderOrder="index" :position-z="-0.0001">
                    <TresBufferGeometry :position="[item.points, 3]" />
                    <TresLineBasicMaterial :color="0x000000" :linewidth="0.5" />
                </TresLine>
            </template>
        </template>
    </TresGroup>
</template>

<script setup>
import { watchEffect, ref } from 'vue'
import * as D3 from 'd3-geo'
import * as THREE from 'three'
import { loadGeojson } from 'PLS/digitalCity/common/utils'
import { Html } from '@tresjs/cientos'
import { useTexture, useTresContext, useRenderLoop } from '@tresjs/core'
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'
import { flyTo } from '../common/utils'


const initMeshBvh = () => {
    THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
    THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
    THREE.Mesh.prototype.raycast = acceleratedRaycast
}
initMeshBvh()

const areaJson = await loadGeojson('./plugins/simpleGIS/json/320000_full.json', 'features')
const { map: pTexture } = await useTexture({ map: './plugins/simpleGIS/image/icon.png' })

const center = areaJson[0].properties.centroid

//转换成墨卡托坐标，并居中
const offsetXY = D3.geoMercator()
offsetXY.center(center).translate([0, 0])

const areaList = []
const makeAreaPrimary = () => {
    areaJson.forEach((feature) => {
        const color = new THREE.Color(`hsl( ${16}, ${Math.random() * 30 + 55}%, ${Math.random() * 30 + 55}%)`).getHex()
        const depth = Math.random() * 0.3 + 0.3

        // 关于文字和图标 待会儿制作
        const { centroid, oneCenter, center: Cc, name } = feature.properties
        const { coordinates, type } = feature.geometry
        const point = centroid || oneCenter || Cc || [0, 0]

        const htmlPosition = offsetXY(point)
        htmlPosition[1] = -htmlPosition[1]
        htmlPosition[2] = depth
        areaList.push({ type: 'Html', position: htmlPosition, name })

        const spritePosition = offsetXY(point)
        spritePosition[1] = -spritePosition[1] + 0.2
        spritePosition[2] = depth + 0.22

        areaList.push({ type: 'Sprite', position: spritePosition })

        coordinates.forEach((coordinate) => {
            function fn(crdinate) {
                // 制作区域块
                const shape = new THREE.Shape()
                crdinate.forEach((item, idx) => {
                    const [x, y] = offsetXY(item)
                    if (idx === 0) shape.moveTo(x, -y)
                    else shape.lineTo(x, -y)
                })
                areaList.push({ type: 'Shape', shape, name, color, depth, pCenter: spritePosition })

                // 制作边界线
                const points = []
                crdinate.forEach((item) => {
                    const [x, y] = offsetXY(item)
                    points.push(x, -y, 0)
                })
                areaList.push({ type: 'Line', points: new Float32Array(points), depth })
            }

            if (type === 'MultiPolygon') coordinate.forEach((item) => fn(item))
            if (type === 'Polygon') fn(coordinate)
        })
    })
}
makeAreaPrimary()

const setCenter = (map) => {
    map.rotation.x = -Math.PI / 2
    const box = new THREE.Box3().setFromObject(map)
    const centerMap = box.getCenter(new THREE.Vector3())

    const offset = [0, 0]
    map.position.x = map.position.x - centerMap.x - offset[0]
    map.position.z = map.position.z - centerMap.z - offset[1]
}
const tgRef = ref()
watchEffect(() => {
    if (tgRef.value) {
        setCenter(tgRef.value)
        tgRef.value.children.forEach((item) => {
            if (item.type === 'Mesh') {
                item.geometry.computeBoundsTree()
            }
        })
    }
})

const pEnter = (intersection) => {
    intersection.object.material.opacity = 0.4
}
const pLeave = (intersection) => {
    intersection.eventObject.material.opacity = 1
}

const { camera, controls } = useTresContext()
let twInstant = null
const pClick = (intersection) => {
    const targetPosition = new THREE.Vector3()
    targetPosition.x = intersection.point.x
    targetPosition.y = intersection.point.y + 10
    targetPosition.z = intersection.point.z
    twInstant = flyTo(camera, targetPosition, controls)
}
const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(() => {
    twInstant?.update()
})
const htmlState = {
    wrapperClass: 'wrapper',
    as: 'div',
    center: true,
    sprite: true,
    prepend: true,
    transform: true,
}
</script>

<style lang="less">
.wrapper {
    #inner {
        user-select: none;
        pointer-events: none !important;

        span {
            text-shadow: 1px 1px 2px #c92704;
            color: #fff;
            font-size: 12px;
        }
    }
}
</style>
