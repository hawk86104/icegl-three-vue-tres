<template>
	<TresGroup :scale="[1, tgHeight, 1]">
			<TresMesh :geometry="mesh.geometry" v-for="(mesh, index) in meshList" :key="index" :position="[0, mesh.y, 0]">
					<TresMeshStandardMaterial :color="mesh.data.color" transparent />
			</TresMesh>

			<TresGroup v-for="(mesh, index) in meshList" :key="index" :rotation="[0, mesh.titleRotate, 0]">
					<stackedBarText
							:position="[0, mesh.y + mesh.height / 2, mesh.titleOffset]"
							:rotation="[mesh.titleTilt, 0, 0]"
							:textContent="`${mesh.data.value}${mesh.data.title}`"
							:fontSize="mesh.titleSize"
					/>
			</TresGroup>
	</TresGroup>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as THREE from 'three'
import stackedBarText from './text.vue'
import { gsap } from 'gsap'

const props = withDefaults(
	defineProps<{
			data?: Array<{ value: number; title: string; color: string }>
			bottomRadius?: number
			height?: number
			segments?: number
			spacing?: number
			heightDistribution?: string
			showStyle?: string
			delay?: number
	}>(),
	{
			data: [
					//#3aa274  #fe8256 #9962b2 #f8285b
					{ value: 42, title: '%', color: '#5072c4' },
					{ value: 20, title: '%', color: '#92cb79' },
					{ value: 18, title: '%', color: '#fcc660' },
					{ value: 12, title: '%', color: '#ef6467' },
					{ value: 10, title: '%', color: '#70c1dd' },
			], // 数据
			bottomRadius: 1.6, // 底部半径
			height: 6, // 总高度
			segments: 4, // 段数
			spacing: 0.1, // 间距
			heightDistribution: 'uniform', // 高度分布: uniform 统一、 proportional 等比例
			showStyle: 'Cone', // 样式: Cone 圆锥  Cylinder 圆柱
			delay: 0.1, // 延迟时间
	},
)
const meshList: Array<any> = []

const calcHeightDistribution = () => {
	let result: Array<number> = []
	if (props.heightDistribution === 'uniform') {
			const barheight = props.height / props.data.length
			result = new Array(props.data.length).fill(barheight)
	} else {
			const total = props.data.map((x) => x.value).reduce((a, v) => a + v)
			props.data.forEach((item) => {
					result.push((item.value / total) * props.height)
			})
	}
	return result
}

const reCalcMeshList = () => {
	meshList.splice(0, meshList.length)
	const heightList = calcHeightDistribution()
	let bottomRadius = props.bottomRadius
	let curRadius = props.bottomRadius
	let titleRotate = -THREE.MathUtils.degToRad(180 / props.segments)
	let titleTilt = 0
	let y = 0

	if (props.showStyle === 'Cone') {
			const facedistance = props.bottomRadius * Math.cos(Math.PI / props.segments)
			titleTilt = Math.atan(props.height / facedistance) - Math.PI / 2
	}
	props.data.forEach((data, index) => {
			const height = heightList[index]
			if (props.showStyle === 'Cone') {
					const radius = (height / props.height) * props.bottomRadius
					const geometry = new THREE.CylinderGeometry(curRadius - radius, bottomRadius, height, props.segments)
					geometry.translate(0, height / 2, 0)
					const titleOffset = (curRadius - radius / 3) * Math.cos(Math.PI / props.segments)
					const titleSize = THREE.MathUtils.mapLinear(index, 0, props.data.length, 0.05 * props.height, 0.005 * props.height)
					meshList.push({ geometry, y, height, titleOffset, titleTilt, titleRotate, titleSize, data })
					curRadius -= radius
					bottomRadius = curRadius
			} else {
					const geometry = new THREE.CylinderGeometry(curRadius, bottomRadius, height, props.segments)
					geometry.translate(0, height / 2, 0)
					const titleOffset = curRadius * Math.cos(Math.PI / props.segments)
					meshList.push({ geometry, y, height, titleOffset, titleTilt, titleRotate, titleSize: 0.05 * props.height, data })
			}
			y += height + props.spacing
	})
}
reCalcMeshList()
watch(
	() => [props.height, props.bottomRadius, props.segments, props.spacing, props.heightDistribution, props.showStyle],
	() => {
			reCalcMeshList()
	},
)

const tgHeight = ref(0.1)
onMounted(() => {
	playFunc()
})
const playFunc = () => {
	tgHeight.value = 0.1
	gsap.to(tgHeight, {
			value: 1,
			duration: 1,
			delay: props.delay,
			ease: 'circ.out',
	})
}
defineExpose({
	playFunc: playFunc,
})
</script>
