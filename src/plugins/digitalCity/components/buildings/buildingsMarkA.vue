<template>
	<TresSprite ref="tsRef" :position="props.position" :scale="props.scale" renderOrder="99999">
		<TresSpriteMaterial v-bind="smState" :map="pTexture" />
	</TresSprite>
</template>

<script setup lang="ts">
import { reactive, shallowRef, watchEffect } from 'vue'
import { useTexture } from '@tresjs/core'
const props = withDefaults(
	defineProps<{
		color?: string
		position: Array<number>
		scale?: number
		img: string
		offset?: Array<number>
		foremost?: boolean
		sizeAttenuation?: boolean
	}>(),
	{
		color: '#fff',
		position: [0, 0, 0],	//位置
		scale: 0.1,
		offset: [0.344, 0.394],	//图片偏移量
		foremost: true,	//是否在最前
		sizeAttenuation: false
	},
)

const { map: pTexture } = await useTexture({ map: props.img })
const smState = reactive({
	color: props.color,
	transparent: true,
	depthWrite: false,
	sizeAttenuation: props.sizeAttenuation, //自动缩放
	toneMapped: false,
	depthTest: !props.foremost,//深度检测， 就是 是否遮挡
})

const tsRef: ShallowRef<TresInstance | null> = shallowRef(null)
watchEffect(() => {
	if (tsRef.value) {
		// tsRef.value.center.set(-props.offset[0], -props.offset[1]) // 用于精灵本身的自旋转
		// tsRef.value.geometry.computeBoundingBox()
		// tsRef.value.geometry.center()
		tsRef.value.geometry = tsRef.value.geometry.clone() //解决多个精灵公用geometry问题
		tsRef.value.geometry.translate(props.offset[0], props.offset[1], 0) // 根据图片中心点设置偏移量 ,按照百分比来
	}
})
</script>