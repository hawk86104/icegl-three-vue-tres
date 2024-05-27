<template>
    <div class="go-decorates-number" :style="`width:${w}px;height:${h}px;`">
        <div
            :style="`color:${timeColor};font-size:${timeSize}px;line-height:${timeLineHeight}px;
      letter-spacing:${timeTextIndent}px;font-weight:${fontWeight};
      text-shadow: ${boxShadow}`"
        >
            {{ newData }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})
let yearMonthDay = ref('2021-2-3')
let nowData = ref('08:00:00')
let newData = ref('2021-2-3 08:00:00')
let boxShadow = ref('none')
let timer: any = null
const { w, h } = toRefs(props.chartConfig.attr)

let { timeColor, timeSize, timeLineHeight, timeTextIndent, fontWeight, showShadow, hShadow, vShadow, blurShadow, colorShadow } = toRefs(
    props.chartConfig.option,
)

watch(
    props.chartConfig.option,
    () => {
        try {
            if (props.chartConfig.option.showShadow) {
                boxShadow.value = `${props.chartConfig.option.hShadow}px ${props.chartConfig.option.vShadow}px ${props.chartConfig.option.blurShadow}px ${props.chartConfig.option.colorShadow}`
            } else {
                boxShadow.value = 'none'
            }
        } catch (error) {
            console.log(error)
        }
    },
    {
        immediate: true,
    },
)
onMounted(() => {
    timer = setInterval(() => {
        var datetime = new Date()
        var year = datetime.getFullYear()
        var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
        var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
        var hh = datetime.getHours() // 时
        var mm = datetime.getMinutes() // 分
        var ss = datetime.getSeconds() // 分
        let time = ''
        if (hh < 10) time += '0'
        time += hh + ':'
        if (mm < 10) time += '0'
        time += mm + ':'
        if (ss < 10) time += '0'
        time += ss
        yearMonthDay.value = `${year}-${month}-${date}`
        nowData.value = time
        newData.value = yearMonthDay.value + ' ' + nowData.value
    }, 500)
})
onUnmounted(() => {
    clearInterval(timer)
})
useChartDataFetch(props.chartConfig, useChartEditStore)
</script>

<style lang="scss" scoped>
@include go('decorates-number') {
    text-align: center;
}
</style>
