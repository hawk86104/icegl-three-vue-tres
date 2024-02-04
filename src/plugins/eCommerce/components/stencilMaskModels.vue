<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-04 16:02:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-04 17:28:05
-->
<template>
	<TresMesh name="front-face" :position="[0, 0, 0.5]">
		<TresPlaneGeometry :args="[1, 1]" />
		<TresMeshPhongMaterial :color="0xf77007" stencil-write :stencil-ref="1" :stencil-func="AlwaysStencilFunc"
			:stencil-z-pass="ReplaceStencilOp" :depth-write="false" />
	</TresMesh>
	<Levioso :speed="2">
		<primitive :rotation-z="-Math.PI / 2" :object="nodes.Sketchfab_model" :position="[0, -0.35, 0]" :scale="0.5">
		</primitive>
	</Levioso>

	<!-- bottom-face -->
	<TresMesh name="bottom-face" :rotation-x="Math.PI * 0.5" :position="[0, -0.5, 0]">
		<TresPlaneGeometry :args="[1, 1]" />
		<TresMeshPhongMaterial :color="0xf7f7f7" stencil-write :stencil-ref="2" :stencil-func="AlwaysStencilFunc"
			:stencil-z-pass="ReplaceStencilOp" :depth-write="false" />
	</TresMesh>
	<TresMesh name="bottom-face-object" :scale="0.5">
		<TresBoxGeometry :args="[1, 1, 1]" />
		<TresMeshPhongMaterial :color="0xffff00" stencil-write :stencil-ref="2" :stencil-func="EqualStencilFunc" />
	</TresMesh>

	<!-- top-face -->
	<TresMesh name="top-face" :rotation-x="Math.PI * -0.5" :position="[0, 0.5, 0]">
		<TresPlaneGeometry :args="[1, 1]" />
		<TresMeshPhongMaterial :color="0xf7f7f7" stencil-write :stencil-ref="3" :stencil-func="AlwaysStencilFunc"
			:stencil-z-pass="ReplaceStencilOp" :depth-write="false" />
	</TresMesh>
	<TresMesh name="top-face-object" :scale="0.05">
		<TresConeGeometry :args="[5, 10]" />
		<TresMeshPhongMaterial :color="0xff00ff" stencil-write :stencil-ref="3" :stencil-func="EqualStencilFunc" />
	</TresMesh>

	<!-- left-face -->
	<TresMesh name="left-face" :rotation-y="Math.PI * -0.5" :position="[-0.5, 0, 0]">
		<TresPlaneGeometry :args="[1, 1]" />
		<TresMeshPhongMaterial :color="0x241a1a" stencil-write :stencil-ref="4" :stencil-func="AlwaysStencilFunc"
			:stencil-z-pass="ReplaceStencilOp" :depth-write="false" />
	</TresMesh>
	<Levioso :speed="2">
		<primitive :object="macBook" :rotation-y="-Math.PI / 2" :position="[-0.1, -0.2, 0]" :scale="0.02">
		</primitive>
	</Levioso>

	<!-- right-face -->
	<TresMesh name="right-face" :rotation-y="Math.PI * 0.5" :position="[0.5, 0, 0]">
		<TresPlaneGeometry :args="[1, 1]" />
		<TresMeshPhongMaterial :color="0xf7f7f7" stencil-write :stencil-ref="5" :stencil-func="AlwaysStencilFunc"
			:stencil-z-pass="ReplaceStencilOp" :depth-write="false" />
	</TresMesh>
	<TresMesh name="right-face-object" :scale="0.05">
		<TresTorusGeometry :args="[5, 2]" />
		<TresMeshPhongMaterial :color="0x00ff" stencil-write :stencil-ref="5" :stencil-func="EqualStencilFunc" />
	</TresMesh>

	<!-- back-face -->
	<TresMesh name="back-face" :rotation-y="Math.PI" :position="[0, 0, -0.5]">
		<TresPlaneGeometry :args="[1, 1]" />
		<TresMeshPhongMaterial :color="0xf7f7f7" stencil-write :stencil-ref="6" :stencil-func="AlwaysStencilFunc"
			:stencil-z-pass="ReplaceStencilOp" :depth-write="false" />
	</TresMesh>
	<TresMesh name="back-face-object" :scale="0.05">
		<TresDodecahedronGeometry :args="[5, 0]" />
		<TresMeshPhongMaterial :color="0x661133" stencil-write :stencil-ref="6" :stencil-func="EqualStencilFunc" />
	</TresMesh>
</template>

<script setup>
import { AlwaysStencilFunc, EqualStencilFunc, ReplaceStencilOp, Mesh } from 'three'
import { useGLTF, useAnimations, Levioso } from "@tresjs/cientos"

const { nodes, materials, animations } = await useGLTF('https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/eCommerce/eFan/nFan.gltf')

//电风扇的动画
const { actions } = useAnimations(animations, nodes.Sketchfab_model)
const currentAction = actions.Animation
currentAction.play()

//电风扇的材质
materials['Material.001'].stencilWrite = true
materials['Material.001'].stencilRef = 1
materials['Material.001'].stencilFunc = EqualStencilFunc
materials['材质.002'].stencilWrite = true
materials['材质.002'].stencilRef = 1
materials['材质.002'].stencilFunc = EqualStencilFunc

nodes.Sketchfab_model.traverse((child) => {
	if (child instanceof Mesh) {
		child.renderOrder = 1
	}
})

let macBook = await useGLTF('./plugins/basic/htmls/model/model.gltf', { draco: true, decoderPath: './draco/' })
macBook = macBook.nodes.Macbook
macBook.traverse((child) => {
	if (child instanceof Mesh) {
		child.renderOrder = 1
		child.material.stencilWrite = true
		child.material.stencilRef = 4
		child.material.stencilFunc = EqualStencilFunc
	}
})
</script>