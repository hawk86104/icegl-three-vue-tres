<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-26 08:13:26
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-26 08:26:56
-->
<template>
    <Suspense>
        <Environment
            :intensity="0.1"
            :resolution="256"
            background
            :blur="0.8"
            :files="['pos-x.jpg', 'neg-x.jpg', 'pos-y.jpg', 'neg-y.jpg', 'pos-z.jpg', 'neg-z.jpg']"
            path="https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/"
        >
            <Lightformer :intensity="4" :rotation-x="Math.PI / 2" :position="[0, 5, -9]" :scale="[10, 10, 1]" />
            <Lightformer :intensity="4" :rotation-x="Math.PI / 2" :position="[0, 5, -9]" :scale="[10, 10, 1]" />
            <TresGroup :rotation="[Math.PI / 2, 1, 0]">
                <Lightformer v-for="(x, i) in lightList" :key="i" :intensity="1" :rotation="[Math.PI / 4, 0, 0]" :position="[x, 4, i * 4]" :scale="[4, 1, 1]" />
            </TresGroup>

            <Lightformer :intensity="0.5" :rotation-y="Math.PI / 2" :position="[-5, 1, -1]" :scale="[50, 2, 1]" />
            <Lightformer :intensity="0.5" :rotation-y="Math.PI / 2" :position="[-5, -1, -1]" :scale="[50, 2, 1]" />
            <Lightformer :intensity="0.5" :rotation-y="-Math.PI / 2" :position="[10, 1, 0]" :scale="[50, 2, 1]" />

            <TresGroup ref="refgroup">
                <Lightformer form="ring" color="red" :rotation-y="Math.PI / 2" :intensity="5" :scale="[10, 10, 1]" :position="[-5, 2, -1]" />
            </TresGroup>
        </Environment>
    </Suspense>
</template>
<script setup lang="ts">
import { Environment, Lightformer } from 'PLS/basic'

const lightList = [2, -2, 2, -4, 2, -5, 2, -9]
</script>
