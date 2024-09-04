<template></template>

<script setup lang="ts">
import { useTresContext, useRenderLoop } from '@tresjs/core'
// @ts-ignore
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js'
import { onMounted } from 'vue'

const { camera, renderer } = useTresContext()
let panel = null as any
const createDiv = () => {
    panel = document.createElement('div')
    panel.id = 'viewHelper'
    panel.style.position = 'absolute'
    // panel.style.right = '0px'
    panel.style.bottom = '0px'
    panel.style.height = '128px'
    panel.style.width = '128px'
    panel.style.pointerEvents = 'all'
    document.getElementById('app')?.appendChild(panel)
}
let viewHelper = null as any
onMounted(() => {
    createDiv()
    viewHelper = new ViewHelper(camera.value, panel)
    panel.addEventListener('pointerup', (event: any) => {
        event.stopPropagation()
        event.preventDefault()
        viewHelper.handleClick(event)
    })

    panel.addEventListener('pointerdown', function (event: any) {
        event.stopPropagation()
    })
})

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ delta }) => {
    if (!viewHelper)
        return
    
    if (viewHelper.animating === true) {
        viewHelper.update(delta)
    }
    renderer.value.autoClear = false
    viewHelper?.render(renderer.value)
    renderer.value.autoClear = true
})
</script>

<style lang="scss" scoped>
</style>
