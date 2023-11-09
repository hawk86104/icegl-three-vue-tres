<script setup lang="ts">
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { initHeatmap, setData } from 'PLS/heatMap/common/utils'
import { resetUV, setGeometryUVForm } from '../../common/utils'
import { watchEffect } from 'vue';
import * as THREE from 'three'
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

const makeCustomShaderMaterial = (baseMaterial: any, texture: THREE.Texture) => {
	const material = new CustomShaderMaterial({
		baseMaterial: baseMaterial,
		vertexShader: `
		varying vec2 vUv;
		void main() {
			csm_Position = position * vec3(1.0);
			vUv = uv;
		}
		`,
		fragmentShader: `
		uniform sampler2D heightMap;
		uniform float uOpacity;
		varying vec2 vUv;
		void main() {
			csm_DiffuseColor = vec4(texture2D(heightMap, vUv.xy).rgb, uOpacity);
    }
		`,
		silent: true,
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
	return material
}
const CITY_UNTRIANGULATED = props.model.city
const LANDMASS = props.model.land
const setLandMaterial = () => {
	const { geometry } = LANDMASS;
	resetUV(geometry)
	const material = makeCustomShaderMaterial(LANDMASS.material, heatmapTexture)
	LANDMASS.material.dispose()
	LANDMASS.material = material
}
const setBuildMaterial = () => {
	const srcGeometry = LANDMASS.geometry
	const { geometry } = CITY_UNTRIANGULATED;
	setGeometryUVForm(srcGeometry, geometry)
	const material = makeCustomShaderMaterial(CITY_UNTRIANGULATED.material, heatmapTexture)
	CITY_UNTRIANGULATED.material.dispose()
	CITY_UNTRIANGULATED.material = material
}
setLandMaterial()
setBuildMaterial()

watchEffect(() => {
	if (props.opacity) {
		LANDMASS.material.uniforms.uOpacity.value = props.opacity
	}
});
</script>

<template>
	<primitive :object="props.model.model.clone()">
	</primitive>
</template>