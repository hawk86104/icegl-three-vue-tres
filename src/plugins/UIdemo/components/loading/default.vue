<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-27 16:19:37
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-12 19:57:41
-->
<template>
    <!-- <Transition name="fade-overlay" enter-active-class="opacity-1 transition-opacity duration-100"
		leave-active-class="opacity-0 transition-opacity duration-200"> -->
    <div v-if="!hasFinishLoading" class="absolute bg-grey-600 t-0 l-0 w-full h-full z-99999999 flex justify-center items-center text-black font-mono bg-black">
        <div class="w-200px text-white">
            载入中... {{ progress }} %
            <LoadingOutlined class="text-yellow" />
        </div>
    </div>
    <!-- </Transition> -->
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useProgress } from '@tresjs/cientos'
import { LoadingOutlined } from '@fesjs/fes-design/icon'

const { hasFinishLoading, progress } = await useProgress()
// const hasFinishLoading = false
// const progress = 80
watch(
    () => progress.value,
    async (nv, ov) => {
        console.log(nv, ov)
    },
)
</script>
