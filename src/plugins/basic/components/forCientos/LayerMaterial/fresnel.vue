<script setup lang="ts">
import { defineProps } from 'vue'
import { useTresContext } from '@tresjs/core'
import { FresnelProps } from 'lamina/types'
import { Fresnel } from './material'
const props = defineProps<FresnelProps>()
const { extend } = useTresContext()
extend({ Fresnel })
</script>
<template>
	<TresFresnel :args="[props]" :visible="true" />
</template>
