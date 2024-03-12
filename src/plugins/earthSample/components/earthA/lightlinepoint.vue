<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-01 09:57:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-02 09:35:02
-->
<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue'
import { useTexture } from '@tresjs/core'
import { AdditiveBlending, DoubleSide, Vector3 } from 'three';
import { gsap } from "gsap";

const pTexture = await useTexture(
	['./plugins/earthSample/image/earthA/light_column.png', './plugins/earthSample/image/earthA/label.png']
)

const GZNUM = 30
const gspList = []
let proxy = null
onMounted(() => {
	proxy = getCurrentInstance().proxy
	for (let i = 1; i <= GZNUM; i++) {
		//底座	动画
		gspList.push(gsap.to(proxy.$refs[`meshCircleRef${i}`][0].scale, {
			duration: 1 + Math.random() * 0.5,
			x: 2,
			y: 2,
			z: 2,
			repeat: -1,
			delay: Math.random() * 0.5,
			yoyo: true,
			ease: "power2.inOut",
		}))
		const tmpMesh = proxy.$refs[`meshRef${i}`][0]
		tmpMesh.quaternion.setFromUnitVectors(
			new Vector3(0, 1, 0),
			tmpMesh.position.clone().normalize()
		);
	}
})
const lon2xyz = (R, longitude, latitude) => {
	let lon = (longitude * Math.PI) / 180; // 转弧度值
	const lat = (latitude * Math.PI) / 180; // 转弧度值
	lon = -lon; // js坐标系z坐标轴对应经度-90度，而不是90度
	// 经纬度坐标转球面坐标计算公式
	const x = R * Math.cos(lat) * Math.cos(lon);
	const y = R * Math.sin(lat);
	const z = R * Math.cos(lat) * Math.sin(lon);
	// 返回球面坐标
	return [x, y, z];
}
const positionRandom = () => {
	const lat = Math.random() * 180 - 90;
	const lon = Math.random() * 360 - 180;
	return lon2xyz(60, lon, lat);
}
</script>

<template>
	<TresMesh v-for="i in GZNUM" :ref="`meshRef${i}`" :key="i" :position="positionRandom()">
		<TresPlaneGeometry :args="[3, 20]" />
		<TresMeshBasicMaterial color="#ffffff" :map="pTexture[0]" :alphaMap="pTexture[0]" :blending="AdditiveBlending"
			:side="DoubleSide" :depthWrite="false" :transparent="true" />
		<TresMesh :rotation-y="Math.PI / 2">
			<TresPlaneGeometry :args="[3, 20]" />
			<TresMeshBasicMaterial color="#ffffff" :map="pTexture[0]" :alphaMap="pTexture[0]" :blending="AdditiveBlending"
				:side="DoubleSide" :depthWrite="false" :transparent="true" />
		</TresMesh>
		<TresMesh :ref="`meshCircleRef${i}`" :rotation-x="-Math.PI / 2" :position="[0, -7, 0]">
			<TresPlaneGeometry :args="[6, 6]" />
			<TresMeshBasicMaterial color="#ffffff" :map="pTexture[1]" :blending="AdditiveBlending" :side="DoubleSide"
				:depthWrite="false" :transparent="true" />
		</TresMesh>
	</TresMesh>
</template>
