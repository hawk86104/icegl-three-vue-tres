<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-12 08:05:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-12 09:17:45
-->

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Html, MeshGlassMaterial } from '@tresjs/cientos';

const state = reactive({
    wrapperClass: 'illustrateTireMesh',
    as: 'div',
    transform: true,
    distanceFactor: 120,
});
const glassRef = ref(null);
</script>
<template>
    <Html v-bind="state" :position="[180, 30, 150]">
        <div class="card pos-relative text-white">
            <div class="glass"></div>
            <div class="card-body">
                <h1>🛞 飞机轮胎</h1>
                <p>良好平衡的轮胎和机轮组件有助于提供无摆振操作，并减少刹车和起落架部件(如扭矩连杆)的磨损。</p>
            </div>
        </div>
    </Html>
    <TresMesh :position="[180, 31, 150]" ref="glassRef">
        <TresBoxGeometry :args="[106, 58, 6]" />
        <MeshGlassMaterial />
    </TresMesh>
</template>

<!-- scoped -->
<style lang="less">
.illustrateTireMesh > div:first-of-type {
    position: relative !important;
}

.illustrateTireMesh {
    user-select: none;
    pointer-events: none !important;

    #inner {
        user-select: none;
        pointer-events: none !important;
    }

    .card {
        color: white;
        width: 20em;

        .glass {
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
        }

        .card-body {
            padding: 2px 18px;
            color: #fff1ae;

            p {
                text-indent: 2em;
            }
        }
    }

    .card::before,
    .card::after {
        position: absolute;
        content: '';
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
    }

    .card::before {
        z-index: -1;
        background: #000;
    }

    .card::after {
        --gradientColor1: #f31d1e;
        --gradientColor2: #ffffff;
        --gradientColor3: #ffffa2;
        z-index: -2;
        background: linear-gradient(235deg, var(--gradientColor1), var(--gradientColor2), var(--gradientColor3));
        filter: blur(40px);
        animation: glow 4s linear infinite;
    }
}
</style>