<template>
    <TresMesh :geometry="geometry" :rotation-x="-Math.PI / 2">
        <TresMeshPhysicalMaterial :roughness="1" :metalness="0" color="seagreen" />
    </TresMesh>
    <TresGroup ref="group">
        <TresMesh v-for="(_item, index) in 12" :key="index" :rnda="Math.random()" :rndb="Math.random()" :rndc="Math.random()" :rndd="Math.random()">
            <TresPlaneGeometry :args="[1, 1, lineLength, 1]" />
            <TresMeshBasicMaterial transparent :depthWrite="false" :side="THREE.DoubleSide" :map="texture" />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'
import { shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'

// 生成地形
const noise2D = createNoise2D()

const elevation = (x: number, y: number) => {
    if (x * x > 24.9) return -1
    if (y * y > 24.9) return -1
    var major = 0.6 * noise2D(0.1 * x, 0.1 * y),
        minor = 0.2 * noise2D(0.3 * x, 0.3 * y)
    return major + minor
}

const geometry = new THREE.PlaneGeometry(10, 10, 100, 100)
const pos = geometry.getAttribute('position')
for (var i = 0; i < pos.count; i++) pos.setZ(i, elevation(pos.getX(i), pos.getY(i)))
geometry.computeVertexNormals()

const lineLength = 20
const linePositionCount = lineLength * 2 + 2

// 生成流动风
const canvas = document.createElement('CANVAS') as HTMLCanvasElement
canvas.width = 64
canvas.height = 8
const context = canvas.getContext('2d')
const gradient = context?.createLinearGradient(0, 0, 64, 0)
gradient?.addColorStop(0.0, 'rgba(255,255,255,0)')
gradient?.addColorStop(0.5, 'rgba(255,255,255,128)')
gradient?.addColorStop(1.0, 'rgba(255,255,255,0)')
if (context && gradient) {
    context.fillStyle = gradient
    context.fillRect(0, 0, 64, 8)
}
const texture = new THREE.CanvasTexture(canvas)

//控制动画流动
const group = shallowRef(null as THREE.Group | null)
const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    if (group.value) {
        group.value.children.forEach((mesh: any, index: number) => {
            const time = elapsed / 5
            const posl = mesh.geometry.getAttribute('position')
            for (let i = 0; i < linePositionCount; i++) {
                const t = time + (i % (lineLength + 1)) / 60
                const x = 3 * Math.sin(5 * mesh.rnda * t + 6 * mesh.rndb)
                const y = 3 * Math.cos(5 * mesh.rndc * t + 6 * mesh.rndd)
                const z = elevation(x, y) + 0.5 + 0.04 * (i > lineLength ? 1 : -1) * Math.cos(((i % (lineLength + 1)) - 10) / 8)
                posl.setXYZ(i, x, z, -y)
            }
            posl.needsUpdate = true
        })
    }
})
</script>
