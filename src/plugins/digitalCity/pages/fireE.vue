<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-03 15:05:59
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-03 15:13:22
-->
<template>
	<pagesShow>
			<template v-slot:ability>
					<Suspense>
							<fireE :position="[30, 50, 0]" :scale="50" :renderOrder="3000" />
					</Suspense>
			</template>
	</pagesShow>
</template>

<script setup lang="ts">
import pagesShow from '../components/pagesShow.vue'
import fireE from '../components/fire/fireE.vue'
</script>
