<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-02 10:00:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-20 18:06:34
-->
<template>
	<pagesShow ref="pagesShowRef">
		<template v-slot:ability>
			<regionGlow :position-y="86"
				:positionSrc="[[-7.3 * 40, 4.27 * 40], [-7.4 * 40, 10.05 * 40], [-4.9 * 40, 10.03 * 40], [-4.9 * 40, 4.46 * 40], [-7.3 * 40, 4.27 * 40]]" />

			<regionGlow :position-y="86" color="#00ffdd" :positionSrc="[[0.27 * 40, -1.19 * 40], [0.32 * 40, -5.5 * 40], [-7.59 * 40, -5.9 * 40], [-8.59 * 40, -3.9 * 40],
			[-7.6 * 40, -1.3 * 40], [0.27 * 40, -1.19 * 40]]" />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">

import pagesShow from '../components/pagesShow.vue'
import regionGlow from '../components/fence/regionGlow.vue'

</script>
