<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-02 10:55:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-03 18:39:44
-->
<template>
	<Suspense>
		<primitive :object="group" :position="[1, 0, 1]" cast-shadow receive-shadow />
	</Suspense>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { Group, Color, DoubleSide, Mesh, EdgesGeometry, AdditiveBlending } from 'three'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import { useGLTF } from '@tresjs/cientos'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { setThreeWater2, initMeshBvh, resetUV } from '../../common/utils'
import vertexShader from '../../shaders/buildingsCustomShaderMaterial.vert?raw'
import fragmentShader from '../../shaders/buildingsCustomShaderMaterial.frag?raw'
import HolographicMaterial from '../../common/HolographicMaterial'

initMeshBvh()
const { scene }
	= await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/digitalCity/shanghaiDraco.gltf',
		{ draco: true },
	)
// console.log(scene)
const group = scene.clone() as Group
const timeDelta = ref(0)
const setEffectMaterial = (mesh) => {
	const { geometry } = mesh
	geometry.computeBoundingBox()
	geometry.computeBoundingSphere()
	geometry.computeBoundsTree()
	const { max, min } = geometry.boundingBox
	const material = new CustomShaderMaterial({
		baseMaterial: mesh.material,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		silent: true,
		uniforms: {
			uMax: { value: max },
			uMin: { value: min },
			uBorderWidth: { value: 0.006 },
			uCircleTime: { value: 3 },
			uColor: {
				value: new Color('#005c58')
			},
			uOpacity: {
				value: 0.8
			},
			uLightColor: {
				value: new Color('#990')
			},
			uTopColor: {
				value: new Color('#888800')
			},
			uTime: timeDelta,
			uGradient: {
				value: true
			}
		},
		depthWrite: true,
		depthTest: true,
		transparent: true,			//如果材质透明，那么楼宇就被渲染到后面了
		side: DoubleSide,//双面渲染
	})
	mesh.material.dispose()
	mesh.material = material
}
const setBuildsLine = (mesh) => {
	const edges = new EdgesGeometry(mesh.geometry, 1000) // WireframeGeometry
	let geometry = new LineSegmentsGeometry()
	let wideEdges = geometry.fromEdgesGeometry(edges)
	wideEdges.computeBoundsTree()
	let edgesmaterial = new LineMaterial({
		color: new Color('#000'),
		linewidth: 0.8,
		opacity: 0.6,
		transparent: true,
		depthWrite: true,
		depthTest: true,
	})
	edgesmaterial.resolution.set(window.innerWidth, window.innerHeight)
	mesh.add(new LineSegments2(wideEdges, edgesmaterial))
}
group.traverse(async (mesh: any) => {
	mesh as Mesh
	if (mesh.isMesh && (mesh.name.indexOf('Shanghai') !== -1 || mesh.name.indexOf('Object') !== -1)) {
		if (mesh.name.indexOf('Floor') !== -1) {
			//设置成地板材质
			// mesh.receiveShadow = true
			// mesh.material.color = new Color('#ff0')
			// mesh.material = floorMaterial
		} else if (mesh.name.indexOf('River') !== -1) {
			//替换水的材质
			const waterm = await setThreeWater2(mesh)
			waterm.position.set(0, 0, 1800)
			mesh.add(waterm)
		} else {
			setEffectMaterial(mesh)
			setBuildsLine(mesh)
			// mesh.castShadow = true
			// mesh.receiveShadow = true
			// mesh.material.color = new Color('#000')
		}
	}
})
const PARAMS = {
	fresnelAmount: 5,
	scanlineSize: 15,
	signalSpeed: 1.3,
	fresnelOpacity: 0.01,
	hologramColor: "#e05b0f",
}
const holoMaterial = new HolographicMaterial({ blendMode: AdditiveBlending, hologramBrightness: 2.5, side: DoubleSide })
holoMaterial.uniforms.fresnelAmount.value = PARAMS.fresnelAmount
holoMaterial.uniforms.scanlineSize.value = PARAMS.scanlineSize
holoMaterial.uniforms.signalSpeed.value = PARAMS.signalSpeed
holoMaterial.uniforms.fresnelOpacity.value = PARAMS.fresnelOpacity
holoMaterial.uniforms.hologramColor.value = new Color(PARAMS.hologramColor)
holoMaterial.uniforms.enableBlinking.value = false
holoMaterial.depthTest = true
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
	timeDelta.value += delta;
	holoMaterial.update()
})

//关键建筑物
const setImportantBuilds = () => {
	// 环球金融中心
	const hqjrzx = group.getObjectByName('02-huanqiujinrongzhongxin_huanqiujinrongzhongxin_0')
	hqjrzx.name = 'hqjrzx'
	hqjrzx.material.dispose()
	resetUV(hqjrzx.geometry)
	hqjrzx.material = holoMaterial

	const shzx = group.getObjectByName('01-shanghaizhongxindasha_shanghaizhongxindasha_0')
	shzx.name = 'shzx'
	shzx.material.dispose()
	resetUV(shzx.geometry)
	shzx.material = holoMaterial
}
setImportantBuilds()


import { Pane } from 'tweakpane'
const paneControl = new Pane({
	title: '效果参数',
	expanded: true,
})
paneControl.addBinding(PARAMS, 'fresnelAmount', {
	min: 0,
	max: 5,
	step: 0.1,
}).on('change', (ev) => {
	holoMaterial.uniforms.fresnelAmount.value = ev.value
})
paneControl.addBinding(PARAMS, 'scanlineSize', {
	min: 1,
	max: 15,
	step: 0.1,
}).on('change', (ev) => {
	holoMaterial.uniforms.scanlineSize.value = ev.value
})
paneControl.addBinding(PARAMS, 'signalSpeed', {
	min: 0,
	max: 1,
	step: 0.01,
}).on('change', (ev) => {
	holoMaterial.uniforms.signalSpeed.value = ev.value
})
paneControl.addBinding(PARAMS, 'fresnelOpacity', {
	min: 0,
	max: 1,
	step: 0.1,
}).on('change', (ev) => {
	holoMaterial.uniforms.fresnelOpacity.value = ev.value
})
paneControl.addBinding(PARAMS, 'hologramColor', { label: '圈颜色' }).on('change', (ev) => {
	holoMaterial.uniforms.hologramColor.value = new Color(ev.value)
})
</script>