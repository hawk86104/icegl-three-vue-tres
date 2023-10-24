<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-17 08:30:49
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-24 09:55:15
-->
<template>
	<pagesShow>
		<template v-slot:ability>
			<radraA :position="[10, 30, 0]" />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">

import pagesShow from '../components/pagesShow.vue'
import radraA from '../components/radras/radraA.vue';

</script>
