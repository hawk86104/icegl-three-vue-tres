<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-10-27 18:17:36
-->
<template>
	<loading></loading>
	<pagesShow ref="pagesShowRef" :autoRotate="false">
		<template v-slot:ability>
			<Suspense>
				<precipitation />
			</Suspense>
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import pagesShow from '../components/pagesShow.vue'
import loading from '../components/loading.vue'
import precipitation from '../components/weather/precipitation.vue';

const pagesShowRef = ref()
watchEffect(() => {
	if (pagesShowRef.value) {
		pagesShowRef.value.$refs.perspectiveCameraRef.position.set(750, 500, 800)
	}
})
</script>
