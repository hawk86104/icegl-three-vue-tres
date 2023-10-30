<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-30 08:45:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-10-30 09:30:16
-->
<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { useTexture } from '@tresjs/core'
import { Smoke } from '@tresjs/cientos'
import smokeA from './smokeA.vue'

watchEffect(() => {

})
</script>
<template>
	<Suspense>
		<smokeA :position="[0, 100, 0]" texture="./plugins/digitalCity/image/defaultCloud.png" :segments="20" color="#ffffff"
			:opacity="1.0" />
	</Suspense>
	<Suspense>
		<Smoke texture="./plugins/digitalCity/image/defaultCloud.png" :speed="0.8" :segments="12" color="#ffffff" />
	</Suspense>
</template>
