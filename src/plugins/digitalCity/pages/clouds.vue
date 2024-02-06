<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-28 10:04:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-05 17:35:50
-->
<template>
	<pagesShow ref="pagesShowRef">
		<template v-slot:ability>
			<Suspense>
				<cloudMesh />
			</Suspense>
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import pagesShow from '../components/pagesShow.vue'
import cloudMesh from '../components/weather/cloudMesh.vue'

const pagesShowRef = ref()
watchEffect(() => {
	if (pagesShowRef.value) {
		pagesShowRef.value.$refs.perspectiveCameraRef.position.set(580, 360, 500)
	}
})
</script>
