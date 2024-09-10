<template>
	<TresGroup>
		<TresMesh ref="tmRef" :rotation-x="-Math.PI / 2" :position-y="-0.1">
			<TresPlaneGeometry ref="tpgRef" :args="[10, 10]" />
			<TresMeshStandardMaterial ref="tmsmRef" v-bind="tmsMaterialConfig" />
		</TresMesh>
		<primitive :object="gridHelp" :visible="showGridHelper"/>
	</TresGroup>
</template>

<script lang="ts" setup>
import { Vector2, RepeatWrapping, Color, GridHelper } from "three"
import { useTexture } from '@tresjs/core'
import { Reflector } from '../lib/alienJS/all.three.js'
import { makeVertexShader, makeFragmentShader } from '../shaders/reflectorDiffuse.js'
import { watchEffect, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
	mirror?: Number	// 去除纹理 镜面化
	mixStrength?: Number	//混合
	showGridHelper?: boolean
	color?: string
}>(), {
	mirror: 1,
	mixStrength: 10,
	showGridHelper: true,
	color: '#ffffff'
})

const gridHelp = new GridHelper(9.5, 10)

const tpgRef = ref()
const tmRef = ref()
const tmsmRef = ref()
const reflector = new Reflector()
const uniforms = {
	mirror: { value: props.mirror },
	mixStrength: { value: props.mixStrength }
}

const pTexture = await useTexture(['./plugins/floor/image/polished_concrete_basecolor.jpg', './plugins/floor/image/polished_concrete_normal.jpg', './plugins/floor/image/polished_concrete_orm.jpg'])
for (var i = 0; i < 3; i++) {
	pTexture[i].wrapS = RepeatWrapping
	pTexture[i].wrapT = RepeatWrapping
	pTexture[i].repeat.set(16, 16)
}
const tmsMaterialConfig = {
	color: new Color('#444'),
	metalness: 1,
	roughness: 1,
	map: pTexture[0],
	metalnessMap: pTexture[2],
	roughnessMap: pTexture[2],
	aoMap: pTexture[2],
	aoMapIntensity: 1,
	normalMap: pTexture[1],
	normalScale: new Vector2(3, 3)
}

const makeOnBeforeCompile = (shader: any) => {
	shader.uniforms.reflectMap = reflector.renderTargetUniform
	shader.uniforms.textureMatrix = reflector.textureMatrixUniform
	shader.uniforms = Object.assign(shader.uniforms, uniforms)
	makeVertexShader(shader)
	makeFragmentShader(shader)
}
watchEffect(() => {
	if (tpgRef.value) {
		tpgRef.value.attributes.uv1 = tpgRef.value.attributes.uv
	}
	if (tmsmRef.value) {
		// Second channel for aoMap and lightMap
		// https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.aoMap
		tmsmRef.value.aoMap.channel = 1

		tmsmRef.value.onBeforeCompile = makeOnBeforeCompile
	}
	if (tmRef.value) {
		tmRef.value.add(reflector)
		tmRef.value.onBeforeRender = (rendererSelf: any, sceneSelf: any, cameraSelf: any) => {
			reflector.update(rendererSelf, sceneSelf, cameraSelf)
		}
	}
	if (props.color) {
		if (tmsmRef.value) {
			tmsmRef.value.color = new Color(props.color)
		}
	}
})

</script>