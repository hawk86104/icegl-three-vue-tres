<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-11 11:20:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-11 16:24:51
-->
<template>
	<pagesShow :showAxesHelper="false" :showGridHelper="false" :showBuildings="true">
		<template v-slot:ability>
			<Suspense>
				<cityRiver />
			</Suspense>
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import pagesShow from '../components/pagesShow.vue'
import cityRiver from '../components/cityRiver/indexBackup.vue'

// import { Pane } from 'tweakpane'

// const modelp = reactive({
// 	ty: true
// })
// const paneControl = new Pane({
// 	title: 'SZzz',
// 	expanded: true,
// });
// paneControl.addBinding(modelp, 'ty');

</script>
