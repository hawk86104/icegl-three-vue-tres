<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-28 10:04:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-06 16:49:13
-->
<template>
	<pagesShow>
		<template v-slot:ability>
			<Suspense>
				<cloudMesh />
			</Suspense>
		</template>
	</pagesShow>
</template>

<script setup lang="ts">

import pagesShow from '../components/pagesShow.vue'
import cloudMesh from '../components/weather/cloudMesh.vue'

</script>
