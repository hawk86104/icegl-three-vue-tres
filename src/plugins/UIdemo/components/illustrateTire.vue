<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-12 08:05:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-12 09:22:06
-->

<script setup lang="ts">
import { reactive } from 'vue'
import { Html } from '@tresjs/cientos'

const state = reactive({
	wrapperClass: 'illustrateTire',
	as: 'div',
	transform: true,
	distanceFactor: 120,
})

</script>
<template>
	<Html v-bind="state" :position="[-120, 130, 150]">
	<div class="card pos-relative text-white">
		<div class="glass"></div>
		<div class="card-body">
			<h1>🚀 WJ5E涡桨发动机</h1>
			<p>
				中功率涡浆，功率2000千瓦，1992年已批量生产。
			</p>
		</div>
	</div>

	</Html>
</template>

<!-- scoped -->
<style lang="less">
.illustrateTire>div:first-of-type {
	position: relative !important;
}

.illustrateTire {
	user-select: none;
	pointer-events: none !important;

	#inner {
		user-select: none;
		pointer-events: none !important;
	}

	.card {
		color: white;
		width: 22em;

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
			color: white;

			p {
				text-indent: 2em;
			}
		}
	}

	.card::before,
	.card::after {
		position: absolute;
		content: "";
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
	}

	.card::before {
		z-index: -1;
		background: #3b0002;
	}

	.card::after {
		--gradientColor1: #fffa80;
		--gradientColor2: #040c27;
		--gradientColor3: #ffffff;
		z-index: -2;
		background: linear-gradient(235deg, var(--gradientColor1), var(--gradientColor2), var(--gradientColor3));
		filter: blur(40px);
		animation: glow 4s linear infinite;
	}


}
</style>