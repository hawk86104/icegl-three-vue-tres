<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-11 15:37:56
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-11 15:17:16
-->

<script setup lang="ts">
import { reactive } from 'vue'

import { Html } from '@tresjs/cientos'

const state = reactive({
    wrapperClass: 'illustrate2',
    as: 'div',
    sprite: true,
    transform: true,
    distanceFactor: 120,
    center: true,
})
</script>
<template>
    <Html v-bind="state" :position="[-110, 180, 60]">
        <div class="cStyle1 pos-relative text-white"></div>
        <div class="parallelogram">
            <span>🪃 飞机机翼</span>
            <div class="contentDiv">改善飞行的稳定性和操纵性</div>
        </div>
    </Html>
</template>

<!-- scoped -->
<style lang="less">
.illustrate2 > div:first-of-type {
    position: relative !important;
}

.illustrate2 {
    user-select: none;
    pointer-events: none !important;

    #inner {
        user-select: none;
        pointer-events: none !important;
    }

    .cStyle1 {
        width: 15px;
        height: 15px;
        background-color: #ffffff00;
        border-radius: 50%;
        border: 5px solid white;
    }

    /* 添加斜线效果 */
    .cStyle1::before {
        content: ' ';
        position: relative;
        top: -155px;
        left: -446px;
        width: 500px;
        height: 6px;
        display: block;
        transform: rotate(218deg);
        background-color: white;
    }

    .parallelogram {
        width: 360px;
        height: 30px;
        color: white;
        position: relative;
        top: -329px;
        left: -760px;
        text-align: right;
        font-size: 38px;

        span {
            position: relative;
            right: 18px;
            top: -30px;
            font-weight: bolder;
            // -webkit-text-stroke: 1px #424242;
            // text-stroke: 1px #424242;
        }

        .contentDiv {
            text-align: left;
            font-size: 26px;
            display: block;
            margin-top: -19px;
        }
    }

    /* 利用伪元素before创建平行四边形 */
    .parallelogram::before {
        content: '';
        transform: skew(-45deg);
        background: linear-gradient(45deg, #5a65fc, #ff00f6);
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
}
</style>
