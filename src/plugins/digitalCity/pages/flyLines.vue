<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-10-12 08:12:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-10-12 11:19:43
-->
<template>
    <pagesShow>
        <template v-slot:ability>
            <Suspense>
                <arrowFlyLine v-bind="lineState" :linePoints="[[500, 20, 500],[0, 20, 0],]" />
            </Suspense>

            <Suspense>
                <arrowFlyLine :style="0" :linePoints="[[-500, 20, -500],[0, 20, 0],]" />
            </Suspense>

            <Suspense>
                <arrowFlyLine :style="2" :linePoints="[[500, 20, -500],[0, 20, 0],]" />
            </Suspense>

            <Suspense>
                <arrowFlyLine :style="3" :linePoints="[[-500, 20, 500],[0, 20, 0],]" :opacity="0.8" :lineWidth="10" />
            </Suspense>

						<Suspense>
                <arrowFlyLine :style="4" :linePoints="[[200, 60, 600],[0, 20, 0],]" />
            </Suspense>
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import pagesShow from '../components/pagesShow.vue'
import arrowFlyLine from '../components/flyLines/arrowFlyLine.vue'

const lineState = reactive({
    color: '#FFF',
    speed: 0.01,
    opacity: 1,
		lineWidth: 40,
})
const paneControl = new Pane({
    title: '效果参数',
    expanded: true,
})
paneControl.addBinding(lineState, 'color', { label: '线颜色' })
paneControl.addBinding(lineState, 'speed', {
    label: '速度',
    min: 0.001,
    max: 0.05,
    step: 0.001,
})
paneControl.addBinding(lineState, 'opacity', {
    label: '透明度',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(lineState, 'lineWidth', {
    label: '线宽度',
    min: 10,
    max: 200,
    step: 1,
})
</script>
