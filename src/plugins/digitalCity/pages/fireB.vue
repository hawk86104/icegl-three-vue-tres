<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-06 17:50:33
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-08-20 15:34:30
-->

<template>
	<pagesShow>
		<template v-slot:ability>
			<Suspense>
				<fireB :position="[-130, 26, 20]" />
			</Suspense>
		</template>
	</pagesShow>
</template>

<script setup lang="ts">

import pagesShow from '../components/pagesShow.vue'
import fireB from '../components/fire/fireB.vue'

</script>
