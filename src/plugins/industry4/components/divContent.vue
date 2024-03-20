<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-12 08:05:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-20 10:09:41
-->

<script setup lang="ts">
import { reactive } from 'vue'
import { Html } from '@tresjs/cientos'

const state = reactive({
	wrapperClass: 'illustrateTire',
	as: 'div',
	transform: true,
	distanceFactor: 1,
	zIndexRange: [900000, 0],
})

</script>
<template>
	<Html v-bind="state" :position="[1, 0, 2]" :scale="[2, 2, 2]" :rotation="[-Math.PI / 2, 0, -Math.PI / 2]">
	<div class="card pos-relative text-white">
		<div class="card-body">
			<h3><span>⚙️</span> Toyota 2JZ-GTE</h3>
			<div class="flex justify-between flex-wrap">
				<div class="Onec">
					<p>
						输出功率 kW
					</p>
					<h1>
						980 - 1000
					</H1>
				</div>
				<div class="Onec">
					<p>
						排量 升
					</p>
					<h1>
						3.0 - 3.5
					</H1>
				</div>

				<div class="Onec">
					<p>
						最大扭矩 磅-英尺
					</p>
					<h1>
						320 - 330
					</H1>
				</div>
			</div>
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
		background-color: #b8e4ff3b;

		.card-body {
			padding: 8px 22px;
			color: white;
			width: 22em;

			h3 {
				span {
					@keyframes rotate {

						/* 从0度旋转到360度 */
						from {
							transform: rotateZ(0deg);
						}

						to {
							transform: rotateZ(360deg);
						}
					}

					display: inline-block;
					transform-origin: center center;
					animation: rotate 5s linear infinite;
					/* 无限循环 */
				}
			}

			.Onec {

				p {
					font-size: 0.8em;
					margin-bottom: 0;
				}

				h1 {
					margin-top: 0px;
					margin-bottom: 10px;
				}
			}

		}
	}
}
</style>