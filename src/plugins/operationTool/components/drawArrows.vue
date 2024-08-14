<template>
    <primitive :object="model" />
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import * as THREE from 'three'
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js'
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'

const { scene: model, nodes } = await useGLTF('/plugins/operationTool/model/湖中小亭/湖中小亭.gltf')
const { camera, renderer, scene, sizes, raycaster, controls } = useTresContext()

let mouse = new THREE.Vector2()
let points = []
let polygonMesh = null
const planeGeometry = new THREE.PlaneGeometry(100, 100)
const planeMaterial = new THREE.MeshBasicMaterial({ visible: false })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.value.add(plane)
let init = function () {
    window.addEventListener('click', onMouseClick, false)
}

let onMouseClick = function (event) {
    // 将鼠标坐标转换到[-1, 1]范围
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // 使用raycaster检测鼠标点击的位置
    raycaster.value.setFromCamera(mouse, camera.value)

    // 默认点击在Z=0的平面上
    const intersects = raycaster.value.intersectObject(plane)
    if (intersects.length > 0) {
        const point = intersects[0].point
        points.push(new THREE.Vector3(point.x, point.y, 0))
        updatePolygon()
    }
}

let updatePolygon = function () {
    debugger
    if (polygonMesh != null) {
        scene.value.remove(polygonMesh)
    }

    if (points.length > 2) {
        const shape = new THREE.Shape()
        shape.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
            shape.lineTo(points[i].x, points[i].y)
        }
        shape.lineTo(points[0].x, points[0].y) // 闭合多边形
        const geometry = new THREE.ShapeGeometry(shape)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
        polygonMesh = new THREE.Mesh(geometry, material)
        scene.value.add(polygonMesh)
    }
}

onMounted(() => {
    init()
})
watchEffect(() => {})
</script>
<style>
</style>
