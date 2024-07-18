<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-05 08:42:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-18 09:46:33
-->
<script lang="ts" setup>

import { OrbitControls, Html } from '@tresjs/cientos'
import { ref } from 'vue'
import { Pane } from 'tweakpane';
import { FMessage } from '@fesjs/fes-design';

const log = (text: string) => {
	console.log(text)
	FMessage.info(text);
}

const boxOneBlocksPointerEvents = ref(true)
const pane = new Pane({
	title: '穿透事件',
	expanded: true,
});
pane.addBinding(boxOneBlocksPointerEvents, 'value', { label: 'Box2📦可点' })
</script>

<template>
	<TresCanvas window-size>
		<TresPerspectiveCamera :look-at="[0, 4, 0]" />
		<TresMesh :position="[0, 1, 0]"  @click="
                (event) => {
                    console.log('pointer-down')
                    if (!boxOneBlocksPointerEvents) {
                        event.stopPropagation()
                    }
                }
            ">
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshNormalMaterial />
		</TresMesh>
		<TresMesh :position="[-2, 0, -2]" name="box 2" @click="log('点击了 Box2 📦')">
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshNormalMaterial />
			<Html :center="true" transform>
			<h1 class="bg-white text-xs p-0.5 rounded -mt-10">
				Box2 📦
			</h1>

			</Html>
		</TresMesh>
		<OrbitControls />
		<TresGridHelper />
		<TresAmbientLight :intensity="1" />
	</TresCanvas>
</template>
