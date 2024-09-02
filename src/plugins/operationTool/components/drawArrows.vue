<template></template>
 
<script setup lang="ts">
import { onMounted, watchEffect, ref } from 'vue'
import * as THREE from 'three'
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js'
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { Pane } from 'tweakpane'

// const { scene: model, nodes } = await useGLTF('/plugins/operationTool/model/湖中小亭/湖中小亭.gltf')
const { camera, renderer, scene, sizes, raycaster, controls } = useTresContext()

let mouse = new THREE.Vector2()
let points = []
let MeshRef = ref(null)
const planeGeometry = new THREE.PlaneGeometry(200, 200)
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.set(0, 0, Math.PI / 2)
scene.value.add(plane)
let type = ''
let initLine = function () {
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
        switch (type) {
            case 'line':
                updatePolygonLine(intersects[0].normal)
                break
        }
    }
}
let updatePolygonFace = function (normal) {
    if (points.length == 2) {
        const distance = points[0].distanceTo(points[1])
        let geometry = null
        debugger
        if (Math.abs(points[1].x - points[0].x) > Math.abs(points[1].y - points[0].y)) {
            geometry = new THREE.PlaneGeometry(distance, 2)
        } else {
            geometry = new THREE.PlaneGeometry(2, distance)
        }
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }) // 绿色材质，双面可见
        const rectangle = new THREE.Mesh(geometry, material)
        const midpoint = new THREE.Vector3((points[0].x + points[1].x) / 2, (points[0].y + points[1].y) / 2, (points[0].z + points[1].z) / 2 + 0.1)
        rectangle.position.copy(midpoint)
        scene.value.add(rectangle)

        // 计算方向向量
        const direction = new THREE.Vector3().subVectors(points[1], points[0]).normalize()

        // 计算垂直向量 (假设在二维平面内)
        const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)

        // 将垂直向量缩放到5个单位长度
        const offset = perpendicular.clone().multiplyScalar(5)

        // 计算终点两边的两个点
        const pointLeft = new THREE.Vector3().addVectors(points[1], offset)
        const pointRight = new THREE.Vector3().subVectors(points[1], offset)
        console.log(pointLeft, pointRight)

        // drawTriangle()
        points.length = 0
    }
}
let updatePolygonLine = function (normal) {
    if (points.length == 2) {
        const path = new THREE.CatmullRomCurve3(points)
        const tubeGeometry = new THREE.TubeGeometry(path, 20, 2, 8, false)
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        const tube = new THREE.Mesh(tubeGeometry, material)
        scene.value.add(tube)
        let dir = normal
        let group1 = cloneTube(path, dir, Math.PI / 5)
        scene.value.add(group1)
        let group2 = cloneTube(path, dir, -Math.PI / 5)
        scene.value.add(group2)
        let sphere = drawSphere(points[1])
        scene.value.add(sphere)
        points.length = 0
    }
}
let drawSphere = function (position) {
    // 1. 创建一个半径为0.5的球体，使用32个分段来创建比较平滑的表面
    const sphereGeometry = new THREE.SphereGeometry(1.8, 32, 32)
    // 2. 创建材质
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    // 3. 创建球体网格
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    // 4. 设置球体的位置
    sphere.position.copy(position) // 根据需要设置球体的位置
    return sphere
}
let cloneTube = function (path, dir, angle) {
    // 截断比例
    const cutoffRatio = 0.8
    // 生成截断后的路径
    const subPath = new THREE.CatmullRomCurve3([
        path.getPointAt(cutoffRatio), // 原路径的起点
        path.getPointAt(1), // 原路径的截断点
    ])

    // 生成新的 TubeGeometry
    const newTubeGeometry = new THREE.TubeGeometry(subPath, 30, 2, 8, false)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const newTube = new THREE.Mesh(newTubeGeometry, material)
    // 创建 tube 的副本
    const tubeClone = newTube.clone()
    // 创建一个新的组，并将副本添加到组中
    const group = new THREE.Group()
    group.add(tubeClone)
    // 将组的位置移动到起点
    group.position.copy(points[1])
    tubeClone.position.sub(points[1])
    // 旋转副本
    group.rotation.set(Math.abs(dir.x) * angle, Math.abs(dir.y) * angle, Math.abs(dir.z) * angle) // 旋转45度
    // 将组添加到场景中
    return group
}
let drawTriangle = function (pointA, pointB, pointC) {
    const vertices = new Float32Array([pointA.x, pointA.y, pointA.z, pointB.x, pointB.y, pointB.z, pointC.x, pointC.y, pointC.z])
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
    const triangle = new THREE.Mesh(geometry, material)
    return triangle
}
let initUI = function () {
    const paneControl = new Pane({
        title: '箭头',
        expanded: true,
    })
    // paneControl.containerElem_.style.top = '54px'

    const f1 = paneControl.addFolder({
        title: '参数(鼠标间断点两个点，分别作为箭头的起点)',
    })

    f1.addButton({
        title: '绘制箭头',
        label: '激活', // optional
    }).on('click', () => {
        window.removeEventListener('click', onMouseClick, false)
        type = 'line'
        initLine()
    })
}
onMounted(() => {
    initUI()
})
watchEffect(() => {})
</script>
<style>
</style>
