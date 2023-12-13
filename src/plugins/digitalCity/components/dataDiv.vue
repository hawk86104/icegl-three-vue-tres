<template>
	<div class="title" :style="mousePosition" v-show="buildingsHeatmap.showDiv">温度：{{ buildingsHeatmap.temperature }}℃
	</div>
</template>

<script setup>
import { useDigitalCityStore } from 'PLS/digitalCity/stores/digitalCity'
const buildingsHeatmap = useDigitalCityStore()
import { ref, onMounted, onUnmounted } from 'vue'

// 创建响应式的鼠标位置对象
const mousePosition = ref({ top: 0, left: 0 })
// 更新鼠标位置的函数
function updateMousePosition (event) {
	mousePosition.value.left = event.clientX + 5 + 'px'
	mousePosition.value.top = event.clientY - 20 + 'px'
}
// 组件挂载时添加监听器
onMounted(() => {
	window.addEventListener('mousemove', updateMousePosition);
});

// 组件销毁时移除监听器
onUnmounted(() => {
	window.removeEventListener('mousemove', updateMousePosition);
});
</script>

<style lang="less" scoped>
.title {
	color: white;
	font-size: 15px;
	position: absolute;
	z-index: 99999;
	background-color: #0000009e;
	padding: 2px 5px;
	border-radius: 6px;
}
</style>