<script setup lang="ts">
import { defineProps } from 'vue'
import { useTresContext } from '@tresjs/core'
import { ColorProps } from 'lamina/types'
import { Color } from './material'
const props = defineProps<ColorProps>()
const { extend } = useTresContext()
extend({ Color })
</script>
<template>
	<TresColor :args="[props]" :visible="true" />
</template>
