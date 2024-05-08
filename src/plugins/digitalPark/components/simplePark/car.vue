<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-08 14:23:31
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-08 15:29:29
-->
<template>
    <primitive :object="model" :scale="0.02" :rotation="[0, Math.PI / 2, 0]" :position="[10, 1.5, 35]" />
</template>
<script setup>
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import * as THREE from 'three'

const { scene } = useTresContext()

const {
    scene: model,
    nodes,
    materials,
} = await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/lambo.glb', {
    draco: true,
    decoderPath: './draco/',
})

nodes.glass_003.scale.setScalar(2.7)
materials.FrameBlack.roughness = 0
materials.FrameBlack.metalness = 0.75

materials.Chrome.metalness = 1
materials.Chrome.roughness = 0

materials.BreakDiscs.metalness = 0.2
materials.BreakDiscs.roughness = 0.2

materials.TiresGum.metalness = 0
materials.TiresGum.roughness = 0.4

materials.GreyElements.metalness = 0

nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
    roughness: 0.3,
    metalness: 0.05,
    color: '#ffda35',
    envMapIntensity: 0.75,
    clearcoatRoughness: 0,
    clearcoat: 1,
})

Object.values(nodes).forEach((node) => {
    if (node.isMesh) {
        if (node.name.startsWith('glass')) node.geometry.computeVertexNormals()
        if (node.name === 'silver_001_BreakDiscs_0') {
            node.material = materials.BreakDiscs.clone()
            node.material.color = new THREE.Color('#ddd')
        }
        node.castShadow = true
        node.material.emissive = node.material.color
        node.material.emissiveMap = node.material.map
        node.material.emissiveIntensity = 0.1
        node.material.envmap = scene.value.background
    }
})

const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(10, 1.5, 35),
    new THREE.Vector3(35, 1.5, 35),
    new THREE.Vector3(35, 1.5, -80),
    new THREE.Vector3(47, 1.5, -80),
    new THREE.Vector3(47, 1.5, 35),
    new THREE.Vector3(100, 1.5, 35),
    new THREE.Vector3(100, 1.5, 47),
    new THREE.Vector3(-100, 1.5, 47),
    new THREE.Vector3(-100, 1.5, 35),
])
curve.curveType = 'catmullrom' // 曲线类型
curve.closed = true // 是否封闭曲线
curve.tension = 0.2 // 设置线的张力，0为无弧度折线

// const points = curve.getPoints()
// const geometry = new THREE.BufferGeometry().setFromPoints(points)
// const material = new THREE.LineBasicMaterial({ color: 0xffff00 })
// const curveObject = new THREE.Line(geometry, material)
// curveObject.position.y = 2
// scene.value.add(curveObject)

let progress = 0
const velocity = 0.0006 // 移动速度
const moveOnCurve = () => {
    if (curve) {
        if (progress <= 1 - velocity) {
            const point = curve.getPointAt(progress)
            const pointBox = curve.getPointAt(progress + velocity)

            if (point && pointBox) {
                model.position.set(point.x, point.y, point.z)
                model.lookAt(pointBox.x, pointBox.y, pointBox.z)

                // 若模型加载进来默认面部是正对Z轴负方向的，所以直接lookAt会导致出现倒着跑的现象，这里用重新设置朝向的方法来解决。
                // const offsetAngle = 22 // 目标移动时的朝向偏移
                // const mtx = new THREE.Matrix4() // 创建一个4维矩阵
                // mtx.lookAt(model.position, pointBox, model.up) // 设置朝向
                // mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, offsetAngle, 0)))
                // const toRot = new THREE.Quaternion().setFromRotationMatrix(mtx) //计算出需要进行旋转的四元数值
                // model.quaternion.slerp(toRot, 0.2)
            }
            progress += velocity
        } else {
            progress = 0
        }
    }
}
const { onLoop } = useRenderLoop()

onLoop(() => {
    moveOnCurve()
})
</script>
