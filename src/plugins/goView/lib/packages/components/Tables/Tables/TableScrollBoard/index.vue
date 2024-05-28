<template>
    <div class="dv-scroll-board">
        <div class="header" v-if="status.header.length && status.mergedConfig" :style="`background-color: ${status.mergedConfig.headerBGC};`">
            <div
                class="header-item"
                v-for="(headerItem, i) in status.header"
                :key="`${headerItem}${i}`"
                :style="`
        height: ${status.mergedConfig.headerHeight}px;
        line-height: ${status.mergedConfig.headerHeight}px;
        width: ${status.widths[i]}px;
      `"
                :align="status.aligns[i]"
                v-html="headerItem"
            />
        </div>

        <div v-if="status.mergedConfig" class="rows" :style="`height: ${h - (status.header.length ? status.mergedConfig.headerHeight : 0)}px;`">
            <div
                class="row-item"
                v-for="(row, ri) in status.rows"
                :key="`${row.toString()}${row.scroll}`"
                :style="`
        height: ${status.heights[ri]}px;
        line-height: ${status.heights[ri]}px;
        background-color: ${status.mergedConfig[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']};
      `"
            >
                <div
                    class="ceil"
                    v-for="(ceil, ci) in row.ceils"
                    :key="`${ceil}${ri}${ci}`"
                    :style="`width: ${status.widths[ci]}px;`"
                    :align="status.aligns[ci]"
                    v-html="ceil"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, onUnmounted, reactive, toRefs, watch, onMounted } from 'vue'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<CreateComponentType>,
        required: true,
    },
})

// 这里能拿到图表宽高等
const { w, h } = toRefs(props.chartConfig.attr)
// 这里能拿到上面 config.ts 里的 option 数据
// const { rowNum, headerHeight, index, backgroundColor } = toRefs(props.chartConfig.option)

const status = reactive({
    defaultConfig: {
        /**
         * @description Board header
         * @type {Array<String>}
         * @default header = []
         * @example header = ['column1', 'column2', 'column3']
         */
        header: [],
        /**
         * @description Board dataset
         * @type {Array<Array>}
         * @default dataset = []
         */
        dataset: [],
        /**
         * @description Row num
         * @type {Number}
         * @default rowNum = 5
         */
        rowNum: 5,
        /**
         * @description Header background color
         * @type {String}
         * @default headerBGC = '#00BAFF'
         */
        headerBGC: '#00BAFF',
        /**
         * @description Odd row background color
         * @type {String}
         * @default oddRowBGC = '#003B51'
         */
        oddRowBGC: '#003B51',
        /**
         * @description Even row background color
         * @type {String}
         * @default evenRowBGC = '#003B51'
         */
        evenRowBGC: '#0A2732',
        /**
         * @description Scroll wait time
         * @type {Number}
         * @default waitTime = 2
         */
        waitTime: 2,
        /**
         * @description Header height
         * @type {Number}
         * @default headerHeight = 35
         */
        headerHeight: 35,
        /**
         * @description Column width
         * @type {Array<Number>}
         * @default columnWidth = []
         */
        columnWidth: [],
        /**
         * @description Column align
         * @type {Array<String>}
         * @default align = []
         * @example align = ['left', 'center', 'right']
         */
        align: [],
        /**
         * @description Show index
         * @type {Boolean}
         * @default index = false
         */
        index: false,
        /**
         * @description index Header
         * @type {String}
         * @default indexHeader = '#'
         */
        indexHeader: '#',
        /**
         * @description Carousel type
         * @type {String}
         * @default carousel = 'single'
         * @example carousel = 'single' | 'page'
         */
        carousel: 'single',
        /**
         * @description Pause scroll when mouse hovered
         * @type {Boolean}
         * @default hoverPause = true
         * @example hoverPause = true | false
         */
        hoverPause: true,
    },
    mergedConfig: props.chartConfig.option,
    header: [],
    rowsData: [],
    rows: [
        {
            ceils: [],
            rowIndex: 0,
            scroll: 0,
        },
    ],
    widths: [],
    heights: [0],
    avgHeight: 0,
    aligns: [],
    animationIndex: 0,
    animationHandler: 0,
    updater: 0,
    needCalc: false,
})

const calcData = () => {
    mergeConfig()
    calcHeaderData()
    calcRowsData()
    calcWidths()
    calcHeights()
    calcAligns()
    animation(true)
}

onMounted(() => {
    calcData()
})

const mergeConfig = () => {
    status.mergedConfig = merge(cloneDeep(status.defaultConfig), props.chartConfig.option)
}

const calcHeaderData = () => {
    let { header, index, indexHeader } = status.mergedConfig
    if (!header.length) {
        status.header = []
        return
    }
    header = [...header]
    if (index) header.unshift(indexHeader)
    status.header = header
}

const calcRowsData = () => {
    let { dataset, index, headerBGC, rowNum } = status.mergedConfig
    if (index) {
        dataset = dataset.map((row: any, i: number) => {
            row = [...row]
            const indexTag = `<span class="index" style="background-color: ${headerBGC};border-radius: 3px;padding: 0px 3px;">${i + 1}</span>`
            row.unshift(indexTag)
            return row
        })
    }
    dataset = dataset.map((ceils: any, i: number) => ({ ceils, rowIndex: i }))
    const rowLength = dataset.length
    if (rowLength > rowNum && rowLength < 2 * rowNum) {
        dataset = [...dataset, ...dataset]
    }
    dataset = dataset.map((d: any, i: number) => ({ ...d, scroll: i }))

    status.rowsData = dataset
    status.rows = dataset
}

const calcWidths = () => {
    const { mergedConfig, rowsData } = status
    const { columnWidth, header } = mergedConfig
    const usedWidth = columnWidth.reduce((all: any, ws: number) => all + ws, 0)
    let columnNum = 0
    if (rowsData[0]) {
        columnNum = (rowsData[0] as any).ceils.length
    } else if (header.length) {
        columnNum = header.length
    }
    const avgWidth = (w.value - usedWidth) / (columnNum - columnWidth.length)
    const widths = new Array(columnNum).fill(avgWidth)
    status.widths = merge(widths, columnWidth)
}

const calcHeights = (onresize = false) => {
    const { mergedConfig, header } = status
    const { headerHeight, rowNum, dataset } = mergedConfig
    let allHeight = h.value
    if (header.length) allHeight -= headerHeight
    const avgHeight = allHeight / rowNum
    status.avgHeight = avgHeight
    if (!onresize) status.heights = new Array(dataset.length).fill(avgHeight)
}

const calcAligns = () => {
    const { header, mergedConfig } = status

    const columnNum = header.length

    let aligns = new Array(columnNum).fill('left')

    const { align } = mergedConfig

    status.aligns = merge(aligns, align)
}

const animation = async (start = false) => {
    const { needCalc } = status

    if (needCalc) {
        calcRowsData()
        calcHeights()
        status.needCalc = false
    }
    let { avgHeight, animationIndex, mergedConfig, rowsData, updater } = status
    const { waitTime, carousel, rowNum } = mergedConfig

    const rowLength = rowsData.length
    if (rowNum >= rowLength) return
    if (start) {
        await new Promise((resolve) => setTimeout(resolve, waitTime * 1000))
        if (updater !== status.updater) return
    }
    const animationNum = carousel === 'single' ? 1 : rowNum
    let rows = rowsData.slice(animationIndex)
    rows.push(...rowsData.slice(0, animationIndex))
    status.rows = rows.slice(0, carousel === 'page' ? rowNum * 2 : rowNum + 1)
    status.heights = new Array(rowLength).fill(avgHeight)
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (updater !== status.updater) return
    status.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))
    animationIndex += animationNum
    const back = animationIndex - rowLength
    if (back >= 0) animationIndex = back
    status.animationIndex = animationIndex
    status.animationHandler = setTimeout(animation, waitTime * 1000 - 300) as any
}

const stopAnimation = () => {
    status.updater = (status.updater + 1) % 999999
    if (!status.animationHandler) return
    clearTimeout(status.animationHandler)
}

const onRestart = async () => {
    try {
        if (!status.mergedConfig) return
        stopAnimation()
        calcData()
    } catch (error) {
        console.log(error)
    }
}

watch(
    () => w.value,
    () => {
        onRestart()
    },
)

watch(
    () => h.value,
    () => {
        onRestart()
    },
)

// 数据更新
watch(
    () => props.chartConfig.option,
    () => {
        onRestart()
    },
    { deep: true },
)

// 数据更新 (默认更新 dataset，若更新之后有其它操作，可添加回调函数)
useChartDataFetch(props.chartConfig, useChartEditStore, (resData: any[]) => {
    props.chartConfig.option.dataset = resData
    onRestart()
})

onUnmounted(() => {
    stopAnimation()
})
</script>

<style lang="scss" scoped>
.dv-scroll-board {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;

    .text {
        padding: 0 10px;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .header {
        display: flex;
        flex-direction: row;
        font-size: 15px;

        .header-item {
            transition: all 0.3s;
        }
    }

    .rows {
        overflow: hidden;

        .row-item {
            display: flex;
            font-size: 14px;
            transition: all 0.3s;
            overflow: hidden;
        }
    }
}
</style>
