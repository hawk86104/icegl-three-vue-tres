<script setup lang="ts">
import { defineProps } from 'vue'
import { useTresContext } from '@tresjs/core'
import { NormalProps } from 'lamina/types'
import { Normal } from './material'
const props = defineProps<NormalProps>()
const { extend } = useTresContext()
extend({ Normal })
</script>
<template>
	<TresNormal :args="[props]" :visible="true" />
</template>
