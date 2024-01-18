<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-02 10:55:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-04 08:52:36
-->
<template>
	<Suspense>
		<primitive :object="group" :position="[1, 0, 1]" cast-shadow receive-shadow />
	</Suspense>
	<importantBuildings :group="group" />
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
import { setThreeWater2, initMeshBvh } from '../../common/utils'
import vertexShader from '../../shaders/buildingsCustomShaderMaterial.vert?raw'
import fragmentShader from '../../shaders/buildingsCustomShaderMaterial.frag?raw'
import importantBuildings from './importantBuildings.vue'

initMeshBvh()
const { scene }
	= await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/digitalCity/shanghaiDraco.gltf',
		{ draco: true, decoderPath: './draco/' },
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
			// mesh.material.color = new Color('#ff0')
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
		}
	}
})

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
	timeDelta.value += delta
})

</script>