<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-24 10:36:23
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-03 15:51:51
-->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { CatmullRomCurve3, Vector3, RepeatWrapping, BackSide, Color } from 'three'
import { loadGeojson } from '../../common/utils'
// import transformControlsDebug from '../../components/transformControlsDebug.vue'

const props = withDefaults(
	defineProps<{
		geoJson: string
		color?: string
		position?: Array<number>
		radius?: number
		rotationY?: number
		scale?: number
		speed?: number
	}>(),
	{
		color: '#ffff00',
		position: [1837.0641427711184, 30, -457.0929823910632],
		radius: 2,
		rotationY: -0.3866683251512052,
		scale: 1.5083171193254858,
		speed: 1.0
	},
)

const tgRef = ref()
const tmbmRef = ref()

const { map: pTexture } = await useTexture({
	map: './plugins/digitalCity/image/line.png'
})
pTexture.needsUpdate = true
pTexture.wrapS = pTexture.wrapT = RepeatWrapping
pTexture.repeat.set(1, 1)

const linePrimary = await loadGeojson(props.geoJson)

// 一下两个参数 是城市建筑物模型的大小中心点 以及 实际地理位置的偏移和位置， 需要和 建模的人 进行沟通不对，不能直接用
// 121.511782,31.229849
const geoOffSet = [-31.258949, 0, -121.465782]
const scalegeoScale = 60000

let curve = []
for (var i = 0; i < linePrimary.length; i++) {
	const item = linePrimary[i]
	const points = []
	item.geometry.coordinates.forEach((lineOne) => {
		points.push(new Vector3((lineOne[1] + geoOffSet[0]) * scalegeoScale, geoOffSet[1], (lineOne[0] + geoOffSet[2]) * scalegeoScale))
	})
	curve.push(new CatmullRomCurve3(points))
}

watchEffect(() => {
	if (props.color) {
		if (tmbmRef.value) {
			tmbmRef.value.color = new Color(props.color)
		}
	}
})
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
	pTexture.offset.x -= Math.random() / 20 * props.speed
})

</script>

<template>
	<!-- <transformControlsDebug :model="tgRef" /> -->
	<TresGroup ref="tgRef" :position="props.position" :rotation-y="props.rotationY" :scale="props.scale">
		<TresMesh v-for="(item) in curve" :renderOrder="3000">
			<TresTubeGeometry :args="[item, 64, props.radius, 20/*管道圆润*/, false]" />
			<TresMeshBasicMaterial ref="tmbmRef" :map="pTexture" :side="BackSide" :transparent="true" :color="props.color" />
		</TresMesh>
	</TresGroup>
</template>
