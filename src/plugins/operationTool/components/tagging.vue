<template>
    <TresMesh ref="torusref" :position="[-100, 0, 0]" @click="changeObject(torusref)">
        <TresTorusGeometry :args="[50, 5, 128, 128]" />
        <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresMesh ref="boxref" :position="[100, 0, 0]" @click="changeObject(boxref)">
        <TresBoxGeometry :args="[80, 100, 20]" />
        <TresMeshNormalMaterial />
    </TresMesh>
</template>
 
<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { useTresContext } from '@tresjs/core'

const { scene } = useTresContext()
const torusref = ref()
const boxref = ref()
let boundingBox = null as any
function loadFont(fontUrl :string) {
    return new Promise((resolve, reject) => {
        const loader = new FontLoader()
        loader.load(
            fontUrl,
            (font) => resolve(font),
            undefined, // 可以在此插入加载进度回调
            (error) => reject(error),
        )
    })
}
const font = await loadFont('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/fonts/FZLanTingHeiS-UL-GB_Regular.json')
const getOutBox = function (myMesh : any) {
    boundingBox = new THREE.Box3().setFromObject(myMesh)
    const size = new THREE.Vector3()
    boundingBox.getSize(size)
    const boxCenter = new THREE.Vector3()
    boundingBox.getCenter(boxCenter)
    // console.log(`Width: ${size.x}, Height: ${size.y}, Depth: ${size.z}`)
    return { size, boxCenter }
}
const addOutBox = function (size:any, boxCenter:any) {
    const boxGeometry = new THREE.BoxGeometry(size.x, size.y, size.z)
    const edges = new THREE.EdgesGeometry(boxGeometry)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 'red' })
    const lineSegments = new THREE.LineSegments(edges, lineMaterial)

    lineSegments.position.copy(boxCenter)
    scene.value.add(lineSegments)
}
const createLabel = (text:any, position:any, targetNormal:any) => {
    const textGeometry = new TextGeometry(text, {
        font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: false,
    })
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const textMesh = new THREE.Mesh(textGeometry, textMaterial)
    textMesh.position.copy(position)

    const upx = new THREE.Vector3(1, 0, 0)
    const upx_ = new THREE.Vector3(-1, 0, 0)

    const upy = new THREE.Vector3(0, 1, 0)
    const upy_ = new THREE.Vector3(0, -1, 0)

    const upz = new THREE.Vector3(0, 0, 1)
    const upz_ = new THREE.Vector3(0, 0, -1)

    if (targetNormal.equals(upx) || targetNormal.equals(upx_)) {
    } else if (targetNormal.equals(upy) || targetNormal.equals(upy_)) {
        textMesh.rotation.set(0, 0, Math.PI / 2)
    } else if (targetNormal.equals(upz) || targetNormal.equals(upz_)) {
        textMesh.rotation.set(0, Math.PI / 2, 0)
    }

    return textMesh
}
const createLine = (start:any, end:any, targetNormal:any) => {
    const group = new THREE.Group()
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([start, end])
    const line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 'green' }))
    // line.position.copy(midPoint)
    // 创建圆锥箭头
    const radius = 1
    const height = 3
    const radialSegments = 8
    const coneGeometry = new THREE.ConeGeometry(radius, height, radialSegments)
    const coneMaterial = new THREE.MeshBasicMaterial({ color: 'green' })
    // 创建圆锥对象
    const cone1 = new THREE.Mesh(coneGeometry, coneMaterial)
    cone1.type = 'Raycone'
    // 设置圆锥的位置和朝向
    cone1.position.copy(start)
    // 创建圆锥对象
    const cone2 = new THREE.Mesh(coneGeometry, coneMaterial)
    cone2.type = 'Raycone'
    // 设置圆锥的位置和朝向
    cone2.position.copy(end)

    const upx = new THREE.Vector3(1, 0, 0)

    const upy = new THREE.Vector3(0, 1, 0)

    const upz = new THREE.Vector3(0, 0, 1)

    if (targetNormal.equals(upx)) {
        cone1.rotation.set(0, 0, Math.PI / 2)
        cone2.rotation.set(0, 0, -Math.PI / 2)
    } else if (targetNormal.equals(upy)) {
        cone1.rotation.set(0, 0, Math.PI)
    } else if (targetNormal.equals(upz)) {
        cone1.rotation.set(-Math.PI / 2, 0, 0)
        cone2.rotation.set(Math.PI / 2, 0, 0)
    }

    group.add(line)
    group.add(cone1)
    group.add(cone2)
    return group
}
// 添加标注线和文本
const addDimensionLabel = function (start:any, end:any, text:any) {
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
    const direction = new THREE.Vector3().subVectors(end, start).normalize()
    const lineGroup = createLine(start, end, direction)
    scene.value.add(lineGroup)
    const label = createLabel(text, midPoint, direction)
    scene.value.add(label)
}

const changeObject = function (params:any) {
    const { size, boxCenter } = getOutBox(params)
    addOutBox(size, boxCenter)
    const min = boundingBox.min
    const max = boundingBox.max
    const disWidth = Number(size.z.toFixed(2)) + 10
    const disDepth = 10
    const disHeight = Number(size.z.toFixed(2)) + 16

    addDimensionLabel(new THREE.Vector3(min.x, min.y, min.z + disWidth), new THREE.Vector3(max.x, min.y, min.z + disWidth), `长: ${size.x.toFixed(2)}`)

    addDimensionLabel(new THREE.Vector3(min.x, min.y, min.z + disHeight), new THREE.Vector3(min.x, max.y, min.z + disHeight), `高: ${size.y.toFixed(2)}`)

    addDimensionLabel(new THREE.Vector3(min.x - disDepth, min.y, min.z), new THREE.Vector3(min.x - disDepth, min.y, max.z), `宽: ${size.z.toFixed(2)}`)
}
</script>

<style>
</style>
