<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-28 10:37:46
-->
<template>
	<pagesShow :showAxesHelper="false" :showBuildings="true" :autoRotate="false" :showGridHelper="false">
		<template v-slot:ability>
			<Suspense>
				<roadLight />
			</Suspense>
		</template>
	</pagesShow>
</template>

<script setup lang="ts">

import pagesShow from '../components/pagesShow.vue'

import roadLight from '../components/roads/roadLight.vue'

</script>
