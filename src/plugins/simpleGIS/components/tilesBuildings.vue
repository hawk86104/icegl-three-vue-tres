<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-28 14:45:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-29 10:45:23
-->
<template>
	<TresGroup>
		<primitive :object="tiles.group" />
	</TresGroup>
</template>

<script lang="ts" setup>
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { watchEffect, ref } from 'vue'
import { TilesRenderer } from '3d-tiles-renderer'
import { onLoadTileSetForCesium3Dtitles } from '../lib/utils'
import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import vertexShader from '../shaders/buildingsShaderMaterial.vert?raw'
import fragmentShader from '../shaders/buildingsShaderMaterial.frag?raw'

const props = withDefaults(defineProps<{
	bulidingsColor?: string
	topColor?: string
	opacity?: number
	gradient?: boolean
}>(), {
	bulidingsColor: '#e523ff',
	topColor: '#ffff00',
	opacity: 0.8,
	gradient: true
})
const timeDelta = ref(0)
const setEffectMaterial = (mesh: any) => {
	const { geometry } = mesh
	geometry.computeBoundingBox()
	geometry.computeBoundingSphere()
	const { max, min } = geometry.boundingBox

	const material = new CustomShaderMaterial({
		baseMaterial: new THREE.MeshPhongMaterial(),//mesh.material,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		silent: true,
		uniforms: {
			uMax: { value: max },
			uMin: { value: min },
			uBorderWidth: { value: 5 },
			uCircleTime: { value: 5 },
			uColor: {
				value: new THREE.Color(props.bulidingsColor)
			},
			uOpacity: {
				value: props.opacity
			},
			uLightColor: {
				value: new THREE.Color('#ffffff')
			},
			uTopColor: {
				value: new THREE.Color(props.topColor)
			},
			uTime: timeDelta,
			uGradient: {
				value: props.gradient
			}
		},
		depthWrite: true,
		depthTest: true,
		transparent: true,			//如果材质透明，那么楼宇就被渲染到后面了
		side: THREE.DoubleSide,	//双面渲染
	})
	mesh.material.dispose()
	mesh.material = material
}

const tiles = new TilesRenderer('https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/titleset/sz_ns/no.json') //tileset 如果使用cesium 的tilies带tranfrom的 请把root的tranfrom去除  gltfUpAxis
tiles.errorTarget = 2
tiles.onLoadModel = (scene: any) => {
	scene.traverse(c => {
		if (c.isMesh) {
			setEffectMaterial(c)
			c.receiveShadow = false
			c.castShadow = false
		}
	})
}
onLoadTileSetForCesium3Dtitles(tiles)

const { camera, renderer, sizes } = useTresContext()
watchEffect(() => {
	if (sizes.width.value) {
		tiles.setCamera(camera.value)
		tiles.setResolutionFromRenderer(camera.value, renderer.value)
	}
})

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ delta }) => {
	timeDelta.value += delta
	if (camera.value && sizes.width.value) {
		camera.value.updateMatrixWorld()
		tiles.update()
	}
})

</script>