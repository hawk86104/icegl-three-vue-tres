<template></template>

<script setup lang="js">
import * as THREE from 'three'
import { shallowRef, defineProps,watchEffect,watch } from 'vue'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import {gsap } from 'gsap'
const { scene, sizes, controls } = useTresContext()
const props = defineProps({
    opacity: {
        type: Number,
        default: 0.8,
    },
  
})
init()
watchEffect(() => {
    if (props.opacity) {
 
    }

})

</script>
