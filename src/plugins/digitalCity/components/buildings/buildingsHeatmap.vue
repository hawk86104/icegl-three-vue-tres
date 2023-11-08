
<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { ref, watchEffect, watch } from 'vue';
import h337 from 'heatmap.js-fix'
import * as THREE from 'three'
const props = withDefaults(defineProps<{
	model: any
	bulidingsColor?: string
	landColor?: string
	opacity?: Number
}>(), {
	bulidingsColor: '#e523ff',
	landColor: '#112233',
	opacity: 1.0,
})

let heatmapCanvas = null
let heatmap = null
const getRandom = (max: number, min: number) => {
	return Math.round((Math.random() * (max - min + 1) + min) * 10) / 10;
}
const cW = 250
const cH = 250
const initHeatmap = () => {
	heatmapCanvas = document.createElement("heatmap-canvas")
	heatmapCanvas.style.position = 'absolute'
	// heatmapCanvas.style.display = 'none'
	heatmapCanvas.style.top = '0'
	heatmapCanvas.style.left = '0'
	document.body.appendChild(heatmapCanvas)
	heatmap = h337.create({
		container: heatmapCanvas,
		width: cW,
		height: cH,
		blur: '.8',
		radius: 10
	});
	return heatmap
}
const setData = (data: Array) => {
	const max = 12
	if (data) {

	} else {
		let i = 0
		data = [];
		while (i < 2000) {
			data.push({ x: getRandom(1, cW), y: getRandom(1, cH), value: getRandom(1, 6) });
			i++;
		}
	}
	heatmap.setData({
		max,
		data
	});
	texture.needsUpdate = true
}
const texture = new THREE.Texture(initHeatmap()._renderer.canvas)
setData()
// texture.repeat.set(80000, 80000);
// texture.offset.set(-0.5, -0.5);

const CITY_UNTRIANGULATED = props.model.city
CITY_UNTRIANGULATED.renderOrder = 1001
const LANDMASS = props.model.land
const setColorMaterial = (type: any, param: string) => {
	const { geometry } = LANDMASS;
	geometry.computeBoundingBox()
	const { max, min } = geometry.boundingBox;
	geometry.deleteAttribute('uv')
	geometry.deleteAttribute('normal')
	const roomX = max.x - min.x
	const roomY = max.y - min.y
	const PuvList = []
	for (let i = 0; i < geometry.attributes.position.count; i++) {
		PuvList.push((geometry.attributes.position.getX(i) - min.x) / roomX)
		PuvList.push((geometry.attributes.position.getY(i) - min.y) / roomY)
	}
	const Puvs = new Float32Array(PuvList)
	geometry.setAttribute('uv', new THREE.BufferAttribute(Puvs, 2));
	const material = new CustomShaderMaterial({
		baseMaterial: LANDMASS.material,
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
		uMax: { value: max },
		uMin: { value: min },
		depthWrite: true,
		depthTest: true,
		transparent: true,			//如果材质透明，那么楼宇就被渲染到后面了
		side: THREE.DoubleSide,//双面渲染
	})

	LANDMASS.material.dispose()
	LANDMASS.material = material
}
const setEffectMaterial = () => {
	const { geometry } = CITY_UNTRIANGULATED;
	geometry.computeBoundingBox()
	geometry.computeBoundingSphere()
	const { max, min } = geometry.boundingBox;
	geometry.deleteAttribute('uv')
	geometry.deleteAttribute('normal')
	debugger
	const roomX = max.x - min.x
	const roomY = max.y - min.y
	const PuvList = []
	for (let i = 0; i < geometry.attributes.position.count; i++) {
		PuvList.push((geometry.attributes.position.getX(i) - min.x) / roomX)
		PuvList.push((geometry.attributes.position.getY(i) - min.y) / roomY)
	}
	debugger
	const Puvs = new Float32Array(PuvList)
	geometry.setAttribute('uv', new THREE.BufferAttribute(Puvs, 2));
	// const geometry1 = new THREE.BufferGeometry();
	// // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
	// // 因为在两个三角面片里，这两个顶点都需要被用到。
	// const vertices1 = new Float32Array([
	// 	-1.0, -1.0, 1.0,
	// 	1.0, -1.0, 1.0,
	// 	1.0, 1.0, 1.0,

	// 	1.0, 1.0, 1.0,
	// 	-1.0, 1.0, 1.0,
	// 	-1.0, -1.0, 1.0
	// ]);
	// // itemSize = 3 因为每个顶点都是一个三元组。
	// geometry1.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));
	// debugger
	// CITY_UNTRIANGULATED.material.dispose()
	// 这里对原有的 CITY_UNTRIANGULATED.material 做继承 使用 CustomShaderMaterial
	const material = new CustomShaderMaterial({
		baseMaterial: CITY_UNTRIANGULATED.material,
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
		silent: true, // Disables the default warning if true
		uniforms: {
			uMax: { value: max },
			uMin: { value: min },
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
	CITY_UNTRIANGULATED.material.dispose()
	CITY_UNTRIANGULATED.material = material
}
setEffectMaterial()
setColorMaterial()
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
})
watchEffect(() => {
	// if (props.bulidingsColor) {
	// 	CITY_UNTRIANGULATED.material.uniforms.uColor.value.setStyle(props.bulidingsColor)
	// }
	// if (props.landColor) {
	// 	setColorMaterial('land', 'color')
	// }
	// if (props.opacity) {
	// 	CITY_UNTRIANGULATED.material.uniforms.uOpacity.value = props.opacity
	// }
});
</script>

<template>
	<primitive :object="props.model.model.clone()">
	</primitive>
</template>