<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-09 09:33:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-13 19:57:41
-->
<script setup lang="ts">
import { initHeatmap, setData, getData } from 'PLS/heatMap/common/utils'
import { resetUV } from '../../common/utils'
import { watchEffect } from 'vue'
import * as THREE from 'three'
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'

const initMeshBvh = () => {
	THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
	THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
	THREE.Mesh.prototype.raycast = acceleratedRaycast;
}
initMeshBvh()

const props = withDefaults(defineProps<{
	model: any
	opacity?: Number
}>(), {
	opacity: 1.0,
})

const heatmap = initHeatmap()
setData(heatmap)
const heatmapTexture = new THREE.Texture(heatmap._renderer.canvas)
heatmapTexture.needsUpdate = true

const creatShaderMaterial = (texture: THREE.Texture) => {
	return new THREE.ShaderMaterial({
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
				value: props.opacity
			},
			heightMap: {
				type: 't',
				value: texture
			},
		},
		depthWrite: true,
		depthTest: true,
		transparent: true,			//如果材质透明，那么楼宇就被渲染到后面了
		side: THREE.DoubleSide,//双面渲染
	})
}
const CITY_UNTRIANGULATED = props.model.city.clone()
delete CITY_UNTRIANGULATED.geometry.attributes.normal
delete CITY_UNTRIANGULATED.geometry.attributes.uv
const geometry1 = CITY_UNTRIANGULATED.geometry.clone().applyMatrix4(CITY_UNTRIANGULATED.matrix)
const LANDMASS = props.model.land.clone()
delete LANDMASS.geometry.attributes.normal
const geometry2 = LANDMASS.geometry.clone().applyMatrix4(LANDMASS.matrix)
//合并
const bufferGeometries = BufferGeometryUtils.mergeGeometries([geometry1, geometry2])
bufferGeometries.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2))
resetUV(bufferGeometries)
bufferGeometries.computeBoundsTree()
const material = creatShaderMaterial(heatmapTexture)
const meshObj = new THREE.Mesh(bufferGeometries, material)

watchEffect(() => {
	if (props.opacity) {
		material.uniforms.uOpacity.value = props.opacity
	}
});

import { useDigitalCityStore } from 'PLS/digitalCity/stores/digitalCity'
const buildingsHeatmap = useDigitalCityStore()
const onPointerMove = (ev) => {
	if (ev) {
		// console.log(ev)
		// uv坐标转canvas坐标
		const valueUV = { x: ev.uv.x * heatmap._config.width, y: (1 - ev.uv.y) * heatmap._config.height }
		console.log('数值：', ev)
		console.log('数值———：', getData(heatmap, valueUV))
		buildingsHeatmap.setTemperature(getData(heatmap, valueUV))
	}
}
const onPointerEnter = (ev) => {
	if (ev) {
		buildingsHeatmap.$patch({ showDiv: true })
	}
}
const onPointerLeave = (ev) => {
	if (ev) {
		buildingsHeatmap.setShowDiv(false)
	}
}

</script>

<template>
	<primitive :object="meshObj" :rotation-x="-Math.PI / 2" @pointer-move="onPointerMove" @pointer-enter="onPointerEnter"
		@pointer-leave="onPointerLeave" />
	<!-- 道路 -->
	<primitive :object="props.model.model.children[0].clone()" />
</template>