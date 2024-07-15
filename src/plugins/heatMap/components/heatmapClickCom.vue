<template>
    <primitive :object="nodes.mesh_0" />
</template>

<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import * as THREE from 'three'
import h337 from 'heatmap.js-fix'
import { watchEffect } from 'vue'

const props = withDefaults(
    defineProps<{
        show2dCanvas?: boolean
        radius?: number
    }>(),
    {
        show2dCanvas: true,
        radius: 20,
    },
)

const { nodes } = await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/heatmap/test.glb', { draco: true, decoderPath: './draco/' })

nodes.mesh_0.position.set(-5088.96, -3.08, 39374.7)
nodes.mesh_0.scale.setScalar(0.01)

let heatmap = null as any
let texture = null as any
let heatmapCanvas = null as any
const initHeatmap = () => {
    heatmapCanvas = document.createElement('heatmap-canvas')
    heatmapCanvas.style.position = 'absolute'
    heatmapCanvas.style.top = '40px'
    heatmapCanvas.style.left = '0'
    document.body.appendChild(heatmapCanvas)
    heatmap = h337.create({
        container: heatmapCanvas,
        width: 256,
        height: 256,
        blur: '.8',
        radius: props.radius,
    })
    heatmap._renderer.canvas.style.border = '1px solid #5384ff'
    heatmap._renderer.canvas.onclick = function (ev: any) {
        heatmap.addData({
            x: ev.layerX,
            y: ev.layerY,
            value: 1,
            radius: props.radius,
        })

        heatmap.setDataMax(1)
        if (texture) {
            texture.needsUpdate = true
        }
    }
    return heatmap
}
texture = new THREE.Texture(initHeatmap()._renderer.canvas)
const shader = {
    vertexShader: `
	varying vec2 vUv;
	void main() {
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		vUv = uv;
	}
	`,
    fragmentShader: `
	uniform sampler2D heightMap;
	uniform float uOpacity;
	varying vec2 vUv;
	void main() {
		gl_FragColor = vec4(texture2D(heightMap, vUv.xy).rgb, uOpacity);
	}
	`,
    uniforms: {
        uOpacity: {
            value: 1,
        },
        heightMap: {
            type: 't',
            value: texture,
        },
    },
    depthWrite: true,
    depthTest: true,
    transparent: true,
    side: THREE.DoubleSide,
}
const creatShaderMaterial = new THREE.ShaderMaterial(shader)
nodes.mesh_0.material = creatShaderMaterial

//重置UV
const resetUV = (geometry) => {
    geometry.computeBoundingBox()
    const { max, min } = geometry.boundingBox
    geometry.deleteAttribute('uv')
    const roomX = max.x - min.x
    const roomZ = max.z - min.z
    const PuvList = [] as any
    for (let i = 0; i < geometry.attributes.position.count; i++) {
        PuvList.push((geometry.attributes.position.getX(i) - min.x) / roomX)
        PuvList.push((geometry.attributes.position.getZ(i) - min.z) / roomZ)
    }
    const Puvs = new Float32Array(PuvList)
    geometry.setAttribute('uv', new THREE.BufferAttribute(Puvs, 2))
}
resetUV(nodes.mesh_0.geometry)

watchEffect(() => {
    heatmapCanvas.style.display = `${props.show2dCanvas ? 'block' : 'none'}`
})
</script>
