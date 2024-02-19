<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-19 15:02:15
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-19 15:18:34
-->

<template>
	<pagesShow>
		<template v-slot:ability>
			<Suspense>
				<smokeA />
			</Suspense>
		</template>
	</pagesShow>
</template>

<script setup lang="ts">

import pagesShow from '../components/pagesShow.vue'
import smokeA from '../components/smoke/smokeA.vue'

</script>
