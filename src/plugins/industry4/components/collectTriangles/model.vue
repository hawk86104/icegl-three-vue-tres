<!--
 * @Description:   :roughness="0.2" :metalness="1" :opacity="0.8"
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-27 10:38:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-09-12 10:57:09
-->
<template>
    <TresMesh ref="targetMesh" :geometry="geometry" :scale="0.005" :material="material" />
    <TresMesh ref="brushMesh" :visible="false">
        <TresSphereGeometry :args="[1, 40, 40]" />
        <TresMeshStandardMaterial
            :color="0xec407a"
            :roughness="0.75"
            :metalness="0"
            :transparent="true"
            :opacity="0.5"
            :premultipliedAlpha="true"
            :emissive="0xec407a"
            :emissiveIntensity="0.5"
        />
    </TresMesh>

    <TresMesh :geometry="outGeometry" :position="[-2, -2, 2]" :scale="0.005">
        <TresMeshStandardMaterial color="#023249" :roughness="0.2" :metalness="0" :envMapIntensity="0.2" />
    </TresMesh>
</template>

<script setup lang="ts">
import { useLoader, useRenderLoop, useTresContext } from '@tresjs/core'
import { STLLoader } from 'three/addons/loaders/STLLoader'
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast, CONTAINED, INTERSECTED, NOT_INTERSECTED } from 'three-mesh-bvh'
import * as THREE from 'three'
import { ref, watchEffect } from 'vue'
import { initEvent } from './event'
import { Pane } from 'tweakpane'

const props = withDefaults(
    defineProps<{
        controls: any
    }>(),
    {},
)

const initMeshBvh = () => {
    THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
    THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
    THREE.Mesh.prototype.raycast = acceleratedRaycast
}
initMeshBvh()

const geometry = await useLoader(STLLoader, './plugins/industry4/model/TR12J_OCC.stl')

const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 1, vertexColors: true })
const colorArray = new Uint8Array(geometry.attributes.position.count * 3)
colorArray.fill(255)
const colorAttr = new THREE.BufferAttribute(colorArray, 3, true)
colorAttr.setUsage(THREE.DynamicDrawUsage)
geometry.setAttribute('color', colorAttr)

const targetMesh = ref<THREE.Mesh | null>(null)
const brushMesh = ref<THREE.Mesh | null>(null)
const brushActive = ref(false)
const mouseType = ref(-1)
const size = ref(0.2)
const mouse = new THREE.Vector2()
const { camera, raycaster } = useTresContext()
const pColor = { x: 15 / 255, y: 78 / 255, z: 85 / 255 }
let bvh = null
watchEffect(() => {
    if (targetMesh.value) {
        console.log('targetMesh.value init', targetMesh.value)
        //@ts-ignore
        targetMesh.value.geometry.computeBoundsTree()
        bvh = geometry.boundsTree
        initEvent(mouse, brushActive, camera, mouseType, targetMesh, props.controls.instance)
    }
})

const { onLoop } = useRenderLoop()
onLoop(() => {
    const indexAttr = geometry.index
    if (!brushMesh.value) {
        return
    }
    if (props.controls.instance.active || !brushActive.value) {
        brushMesh.value.visible = false
    } else {
        brushMesh.value.scale.setScalar(size.value)
        raycaster.value.setFromCamera(mouse, camera.value)
        raycaster.value.firstHitOnly = true

        const res = raycaster.value.intersectObject(targetMesh.value, true)
        if (res.length) {
            brushMesh.value.position.copy(res[0].point)
            props.controls.instance.enabled = false
            brushMesh.value.visible = true

            const inverseMatrix = new THREE.Matrix4()
            inverseMatrix.copy(targetMesh.value.matrixWorld).invert()

            const sphere = new THREE.Sphere()
            sphere.center.copy(brushMesh.value.position).applyMatrix4(inverseMatrix)
            sphere.radius = size.value * 100

            const indices = []
            const tempVec = new THREE.Vector3()
            bvh?.shapecast({
                intersectsBounds: (box) => {
                    const intersects = sphere.intersectsBox(box)
                    const { min, max } = box
                    if (intersects) {
                        for (let x = 0; x <= 1; x++) {
                            for (let y = 0; y <= 1; y++) {
                                for (let z = 0; z <= 1; z++) {
                                    tempVec.set(x === 0 ? min.x : max.x, y === 0 ? min.y : max.y, z === 0 ? min.z : max.z)
                                    if (!sphere.containsPoint(tempVec)) {
                                        return INTERSECTED
                                    }
                                }
                            }
                        }
                        return CONTAINED
                    }
                    return intersects ? INTERSECTED : NOT_INTERSECTED
                },
                intersectsTriangle: (tri, i, contained) => {
                    if (contained || tri.intersectsSphere(sphere)) {
                        const i3 = 3 * i
                        indices.push(i3, i3 + 1, i3 + 2)
                    }
                    return false
                },
            })
            if (mouseType.value === 0 || mouseType.value === 2) {
                let r = 1,
                    g = 1,
                    b = 1
                if (mouseType.value === 0) {
                    r = pColor.x
                    g = pColor.y
                    b = pColor.z
                }
                for (let i = 0, l = indices.length; i < l; i++) {
                    const i2 = indexAttr.getX(indices[i])
                    colorAttr.setX(i2, r)
                    colorAttr.setY(i2, g)
                    colorAttr.setZ(i2, b)
                }
                colorAttr.needsUpdate = true
            }
        } else {
            brushMesh.value.visible = false
            props.controls.instance.enabled = true
        }
    }
})

const paneControl = new Pane()
const btn = paneControl.addButton({
    title: '点击按钮',
    label: '生成模型',
})

const outGeometry = new THREE.BufferGeometry()
btn.on('click', () => {
    const outArray = <number[]>[]
    const outNormalArray = <number[]>[]
    for (let i = 0; i < colorAttr.count; i++) {
        if (colorAttr.getX(i) === pColor.x && colorAttr.getY(i) === pColor.y && colorAttr.getZ(i) === pColor.z) {
            outArray.push(geometry.attributes.position.getX(i), geometry.attributes.position.getY(i), geometry.attributes.position.getZ(i))
            outNormalArray.push(geometry.attributes.normal.getX(i), geometry.attributes.normal.getY(i), geometry.attributes.normal.getZ(i))
        }
    }
    const vertices = new Float32Array(outArray)
    outGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    const verticesNormal = new Float32Array(outNormalArray)
    outGeometry.setAttribute('normal', new THREE.BufferAttribute(vertices, 3))
})
</script>
