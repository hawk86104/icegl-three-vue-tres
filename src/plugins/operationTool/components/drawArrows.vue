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
let polygonMesh = null
let MeshRef = ref(null)
const planeGeometry = new THREE.PlaneGeometry(200, 200)
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.set(0, 0, Math.PI / 4)
scene.value.add(plane)
let initLine = function () {
    //   <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow ref="MeshRef">
    //         <TresPlaneGeometry :args="[200, 200]" />
    //         <TresMeshToonMaterial />
    //     </TresMesh>
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
        updatePolygon(intersects[0].normal)
    }
}

let updatePolygon = function (normal) {
    if (polygonMesh != null) {
        scene.value.remove(polygonMesh)
    }
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
let initFace = function () {}
let initUI = function () {
    const paneControl = new Pane({
        title: '箭头',
        expanded: true,
    })
    // paneControl.containerElem_.style.top = '54px'

    const f1 = paneControl.addFolder({
        title: '参数',
    })

    f1.addButton({
        title: '线箭头',
        label: '线箭头', // optional
    }).on('click', () => {
        window.removeEventListener('click', onMouseClick, false)
        initLine()
    })
    f1.addButton({
        title: '面箭头',
        label: '面箭头', // optional
    }).on('click', () => {
        window.removeEventListener('click', onMouseClick, false)
        initFace()
    })
}
onMounted(() => {
    initUI()
})
watchEffect(() => {})
</script>
<style>
</style>
