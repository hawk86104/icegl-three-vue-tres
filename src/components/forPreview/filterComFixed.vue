<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-03 16:02:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-26 11:23:40
-->
<template>
	<div class="filterFixed">
		<FInput v-model="inputValue" class="FInput-input" placeholder="查找的功能，如：城市" clearable>
			<template #prepend> 检索 </template>
			<template #suffix>
				<SearchOutlined />
			</template>
		</FInput>

		<FCheckboxGroup v-model="menuSetupFilter">
			<FCheckbox value="hot">
				热
			</FCheckbox>
			<FCheckbox value="new">
				新
			</FCheckbox>
			<FCheckbox value="recommend">
				荐
			</FCheckbox>
		</FCheckboxGroup>

		<a target="_black" href="https://gitee.com/ice-gl/icegl-three-vue-tres">
			<img src="https://gitee.com/ice-gl/icegl-three-vue-tres/badge/star.svg?theme=dark" alt="gitee-starts">
		</a>
		<a target="_black" href="https://space.bilibili.com/410503457" style="top: -1px;">
			<img alt="bilibili"
				src="https://img.shields.io/badge/dynamic/json?url=https://api.bilibili.com/x/relation/stat?vmid=410503457&amp;query=data.follower&amp;color=282c34&amp;label=B%E7%AB%99&amp;labelColor=FE7398&amp;logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAD7ElEQVR4nO2dW9WrMBCFK6ESkFAJSKiESqgEHCABCZWAhEpAAhL2ecik5dDc%2FpXLBDLfWnlqy0xmJ5BMQnq5CIIgCIIgCIIgCIIgCEIBAHQAemYfrgCunD6wAKAHsEKxALgx+bCQD8%2FS9tmgVqeDr1lLigDgZvDhXso+K9TyTBQRwRJ8AHjntl0Flh5QRAQK%2FmKxPeayWx2OXpBNBKiHvi34b7T2MC4pAvW6twR%2FRwkRKPizBN8CgEcuESj4Lwm+BwBjahEk+H8EwJRKhOaCDzW8e1JLfkUUH1NgmR3XmHffHR1l+72BSs8d7w8U+JDAnZERQMcV+CtUi7dNqFqibB4J7vtrq7xKCuAasbTMXCL4T+5aVk6+2xHUrWdhruAR6HIJcOeu2UHI8zyAe2ytWfEdWz9PVvQ8YAmIQ5dDAB9LFsMVAv8oMO2zAGrC5WNIarRiAuKR9jYEd9pY08aa6uUzIHGRdkgKd8pY0yc1WjEBAqypDYoAG0QAZkQAZkQAZkQAZk4vANQenjsSzS3I%2FwcSbXU5jQBUkRtdf4Rar90v8kSv3+I3ffCCSpk8I%2Fw+lgDkdI%2Fv2rEp2CaiWm1AsDQLlDAD+dlFXLMeAaCSeLZdaSFE5VUQNot38cKuEeBgAsSuG0flVZBmEanbXfNQAsS0fgBYIn2fIu3%2FBBMHEyBmDXlFfA8IzeHb+Ems4WAChKykrVA9ZfsQTL57jXzRg4A5wC%2FA8N4ADiZAZwm2XjW75Qh2KOTfA0p4kygPw28OJcCVgn3nDnYo2EwEYRgGH0qAMyICMCMCMCMCMCMCMCMCMCMCfP3qwHDOQ4AAUekTk8FaBRihJnZdYbvtCGC7LvmkM63GjVDINPFrQgCq5ETXfmMzI90FXzPvfqt7x4rEu%2FZaEcCUxFvgz2zO+BUn6UkoaEEAsptiMSX5e8FoRYCN7cVgb4Vq7U%2FH50Pq4JNP7Qiw8UFnJwcK+tXy+Wj6PLEvPgHSHv5UgwA1IQIwwyFAyLJin9RoxYgAzAQIkPwNmf26busC+OIx5TDqo5nDT+F%2FSS%2F9CYzwb+No49zNy2evkYv0LywGGAXUvp6eSneycqOic0w20k7CNgKE7jJunSGLACTCxF27ylmQc98T5MQUH49swd+I0HPXslLKnT0N+wnkrTKi9JZL%2FL9i1SorMmdeQ4TQQ7OFMxIMzGD45w8nUL1im7efENZLJpgPSw0pfz0cdt4U3230Td%2FTvx2R6d2FrHhEWLkq5PELOMsRPHCPnAZGv1xJteL7jbJiaW3sB2nDvPC%2FosSYvjRQz4cJ6n7KO3rYQL7M+L6nVtfDVRAEQRAEQRAEQRAEIZ5%2FSAXmdfXaoQsAAAAASUVORK5CYII%3D&amp;cacheSeconds=3600">
		</a>
	</div>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { FInput, FCheckbox, FCheckboxGroup } from '@fesjs/fes-design'
import { SearchOutlined } from '@fesjs/fes-design/icon'

const inputValue = inject('filterFixedInputValue')
const menuSetupFilter = inject('menuSetupFilter')

</script>

<style lang="less" scoped>
.filterFixed {
	position: fixed;
	top: 50px;
	background-color: #fff;
	padding: 8px 10px 6px;
	z-index: 999;
	box-shadow: -1px 3px 10px rgba(0, 0, 0, 0.2);
	width: calc(100% - 200px);
	display: flex;
	align-items: flex-end;

	.FInput-input {
		scale: 0.9;
		position: relative;
		width: 20em;
	}

	a {
		margin-left: 10px;
		position: relative;
	}
}
</style>