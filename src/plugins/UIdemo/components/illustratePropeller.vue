<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-11 15:37:56
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-11 15:16:36
-->

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Html } from '@tresjs/cientos'
const state = reactive({
    wrapperClass: 'illustrate1',
    as: 'div',
    transform: true,
    distanceFactor: 120,
})
const currentTime = ref(new Date().toLocaleString())
setInterval(() => {
    currentTime.value = new Date().toLocaleString() // 每秒更新一次时间
}, 1000)
</script>
<template>
    <Html v-bind="state" :position="[20, 150, 260]" :rotation-y="-1">
        <!-- :rotation-y="-1" -->
        <div class="cStyle1 pos-relative text-white"></div>
        <div class="parallelogram">
            <span>🔆 飞机螺旋桨</span>
            <div class="timeDiv">📆: {{ currentTime }}</div>
        </div>
    </Html>
</template>

<!-- scoped -->
<style lang="less">
.illustrate1 > div:first-of-type {
    position: relative !important;
}

.illustrate1 {
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
        top: -134px;
        left: -19px;
        width: 500px;
        height: 6px;
        display: block;
        transform: rotate(328deg);
        background-color: white;
    }

    .parallelogram {
        width: 300px;
        height: 30px;
        color: white;
        position: relative;
        top: -309px;
        left: 456px;
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

        .timeDiv {
            font-size: 26px;
            position: relative;
            top: -23px;
            display: block;
            text-align: left;
        }
    }

    /* 利用伪元素before创建平行四边形 */
    .parallelogram::before {
        content: '';
        transform: skew(-45deg);
        background: linear-gradient(45deg, #ff0000d9, #ffff00d9);
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
}
</style>
