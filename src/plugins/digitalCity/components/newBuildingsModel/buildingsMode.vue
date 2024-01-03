<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-02 10:55:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-03 10:47:20
-->
<template>
	<Suspense>
		<primitive :object="group" :position="[1, 0, 1]" cast-shadow receive-shadow />
	</Suspense>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { Group, Color, DirectionalLight, DoubleSide, Mesh, EdgesGeometry } from 'three'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import { useGLTF } from '@tresjs/cientos'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
// import { setFloorMesh } from '../../common/utils'
import { setThreeWater2 } from '../../common/utils'
import vertexShader from '../../shaders/buildingsCustomShaderMaterial.vert?raw'
import fragmentShader from '../../shaders/buildingsCustomShaderMaterial.frag?raw'

const { scene }
	= await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/digitalCity/shanghaiDraco.gltf',
		{ draco: true },
	)
console.log(scene)
const group = scene.clone() as Group
// group.scale.set(1, 1, 1)

const timeDelta = ref(0)
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
	timeDelta.value += delta;
})
const setEffectMaterial = (mesh) => {
	const { geometry } = mesh
	geometry.computeBoundingBox()
	geometry.computeBoundingSphere()
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
			// await setFloorMesh(mesh)
			// mesh.material.color = new Color('#ff0')
			// mesh.material = floorMaterial
		} else if (mesh.name.indexOf('River') !== -1) {
			//替换水的材质
			const waterm = await setThreeWater2(mesh)
			waterm.position.set(0, 0, 1800)
			// waterm.position.set(10, 10, 6000)
			// waterm.scale.set(10, 10, 10)
			// waterm.rotation.set(0, -Math.PI / 2, 0)
			// const rtmp = new Group()
			// group.add()
			mesh.add(waterm)
			// waterm.position.set(0, -10, 0)
		} else {
			setEffectMaterial(mesh)
			setBuildsLine(mesh)
			// mesh.castShadow = true
			// mesh.receiveShadow = true
			// mesh.material.color = new Color('#000')
		}
	}
})


</script>