<template>
    <svg @click="toggleFullscreen" v-if="!isFullscreen" viewBox="0 0 1024 1024">
        <path
            d="M665.6 1017.6c-19.2 0-38.4-19.2-38.4-38.4s19.2-38.4 38.4-38.4h268.8l6.4-268.8c0-19.2 19.2-38.4 38.4-38.4s38.4 19.2 38.4 38.4v294.4c0 32-25.6 51.2-51.2 51.2h-300.8zM51.2 396.8c-19.2 0-38.4-19.2-38.4-38.4V64C12.8 32 38.4 12.8 64 12.8h294.4c19.2 0 38.4 19.2 38.4 38.4s-19.2 38.4-38.4 38.4H89.6v268.8c0 19.2-19.2 38.4-38.4 38.4zM64 1017.6c-32 0-51.2-25.6-51.2-51.2v-294.4c0-19.2 19.2-38.4 38.4-38.4s38.4 19.2 38.4 38.4v217.6l198.4-198.4c6.4-6.4 19.2-12.8 25.6-12.8s19.2 6.4 25.6 12.8c6.4 6.4 12.8 19.2 12.8 25.6 0 12.8-6.4 19.2-12.8 25.6l-198.4 198.4h217.6c19.2 0 38.4 19.2 38.4 38.4s-19.2 38.4-38.4 38.4H64z m915.2-620.8c-19.2 0-38.4-19.2-38.4-38.4V140.8l-198.4 198.4c-6.4 6.4-19.2 12.8-25.6 12.8-12.8 0-19.2-6.4-25.6-12.8-12.8-12.8-12.8-38.4 0-51.2l198.4-198.4h-217.6c-19.2 0-38.4-19.2-38.4-38.4s19.2-38.4 38.4-38.4h294.4c32 0 51.2 25.6 51.2 51.2v294.4c0 19.2-19.2 38.4-38.4 38.4z"
            class="fullScreen-border"
        ></path>
    </svg>
    <svg @click="toggleFullscreen" v-else viewBox="0 0 1024 1024">
        <path
            d="M379.336 697.237L153.362 921.55c-14.11 14.007-36.905 13.922-50.912-0.188-14.007-14.11-13.922-36.905 0.188-50.912l227.6-225.927H138.645c-18.99 0-34.385-15.446-34.385-34.5 0-19.053 15.395-34.5 34.385-34.5H413.72c18.99 0 34.384 15.447 34.384 34.5v276c0 9.15-3.622 17.926-10.07 24.396a34.326 34.326 0 0 1-24.314 10.104 34.326 34.326 0 0 1-24.314-10.104 34.559 34.559 0 0 1-10.071-24.396V697.237z m263.395-366.88l227.813-227.813c14.059-14.059 36.853-14.059 50.912 0 14.059 14.059 14.059 36.853 0 50.912l-225.18 225.18h187.147c18.99 0 34.385 15.445 34.385 34.5 0 19.053-15.395 34.5-34.385 34.5H608.346c-18.99 0-34.384-15.447-34.384-34.5v-276c0-9.15 3.622-17.926 10.07-24.396a34.326 34.326 0 0 1 24.314-10.105c9.12 0 17.865 3.635 24.314 10.105a34.559 34.559 0 0 1 10.07 24.395v193.223zM99.385 410a34.326 34.326 0 0 1-24.314-10.105A34.559 34.559 0 0 1 65 375.5v-276C65 80.446 80.395 65 99.385 65h275.077c18.99 0 34.384 15.446 34.384 34.5 0 19.054-15.394 34.5-34.384 34.5H133.769v241.5c0 9.15-3.622 17.925-10.07 24.395A34.326 34.326 0 0 1 99.384 410z m825.23 552H649.538c-18.99 0-34.384-15.446-34.384-34.5 0-19.054 15.394-34.5 34.384-34.5h240.693V651.5c0-19.054 15.394-34.5 34.384-34.5 18.99 0 34.385 15.446 34.385 34.5v276c0 19.054-15.395 34.5-34.385 34.5z"
            class="fullScreen-border"
        ></path>
    </svg>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, onMounted, onUnmounted } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { option } from './config'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType & typeof option>,
        required: true,
    },
})

let { border, bgColor, borderColor } = toRefs(props.chartConfig.option)
const isFullscreen = ref(false)
const checkFullscreen = () => {
    isFullscreen.value = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
    )
}
checkFullscreen()

const requestFullscreen = (element: Element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if ((document as any).mozRequestFullScreen) {
        /* Firefox */
        ;(document as any).mozRequestFullScreen()
    } else if ((document as any).webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        ;(document as any).webkitRequestFullscreen()
    } else if ((document as any).msRequestFullscreen) {
        /* IE/Edge */
        ;(document as any).msRequestFullscreen()
    }
}

const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen()
    } else if ((document as any).mozFullScreenElement && (document as any).mozCancelFullScreen) {
        /* Firefox */
        ;(document as any).mozCancelFullScreen()
    } else if ((document as any).webkitFullscreenElement && (document as any).webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        ;(document as any).webkitExitFullscreen()
    } else if ((document as any).msFullscreenElement && (document as any).msExitFullscreen) {
        /* IE/Edge */
        ;(document as any).msExitFullscreen()
    }
}

const toggleFullscreen = () => {
    if (!isFullscreen.value) {
        requestFullscreen(document.documentElement)
    } else {
        exitFullscreen()
    }
    isFullscreen.value = !isFullscreen.value
    // 由于全屏状态的改变不会立即生效，所以需要延迟一段时间再去获取全屏状态
    setTimeout(() => {
        checkFullscreen()
    }, 1000)
}

// 监听全屏状态的改变，保证多个全屏组件的状态一致
onMounted(() => {
    document.addEventListener('fullscreenchange', checkFullscreen)
    document.addEventListener('webkitfullscreenchange', checkFullscreen)
    document.addEventListener('mozfullscreenchange', checkFullscreen)
    document.addEventListener('MSFullscreenChange', checkFullscreen)
})

onUnmounted(() => {
    document.removeEventListener('fullscreenchange', checkFullscreen)
    document.removeEventListener('webkitfullscreenchange', checkFullscreen)
    document.removeEventListener('mozfullscreenchange', checkFullscreen)
    document.removeEventListener('MSFullscreenChange', checkFullscreen)
})
</script>

<style lang="scss" scoped>
svg {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.fullScreen-border {
    stroke: v-bind('borderColor');
    stroke-width: v-bind('border+"px"');
    fill: v-bind('bgColor');
}
</style>
