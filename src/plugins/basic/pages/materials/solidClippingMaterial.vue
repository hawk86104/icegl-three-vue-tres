<!--
 * @Description:  
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-26 09:31:58
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-26 12:08:17
-->
<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import { Plane, Vector3, DoubleSide } from 'three'
import { Pane } from 'tweakpane'
import solidClippingMaterial from '../../components/solidClippingMaterial.vue'

const tcRef = ref()

const clipPlanes = [new Plane(new Vector3(1, 0, 0), 0), new Plane(new Vector3(0, -1, 0), 0), new Plane(new Vector3(0, 0, -1), 0)]
const params = reactive({
    color: '#aaff11',
})

watchEffect(() => {
    if (tcRef.value) {
        const renderer = tcRef.value.context.renderer.value
        renderer.localClippingEnabled = true
    }
})

const paneControl = new Pane({
    title: '裁剪参数',
    expanded: true,
})
paneControl.addBinding(params, 'color', {
    label: '填补颜色',
})
paneControl.addBinding(clipPlanes[0], 'constant', {
    label: 'x',
    min: -1,
    max: 1,
    step: 0.1,
})
paneControl.addBinding(clipPlanes[1], 'constant', {
    label: 'y',
    min: -1,
    max: 1,
    step: 0.1,
})
paneControl.addBinding(clipPlanes[2], 'constant', {
    label: 'z',
    min: -1,
    max: 1,
    step: 0.1,
})
</script>

<template>
    <TresCanvas ref="tcRef" window-size>
        <TresPerspectiveCamera :fov="40" :near="0.1" :far="200" :position="[-1.5, 2.5, 3.0]" />
        <TresGridHelper :args="[2, 10]" :position="[0, -1, 0]" />
        <TresHemisphereLight :args="[0xffffff, 0x080808, 4.5]" :position="[-1.25, 1, 1.25]" />
        <OrbitControls />

        <TresGroup>
            <TresMesh v-for="i in 3" :key="i">
                <TresSphereGeometry :args="[i / 3, 48, 24]" />
                <solidClippingMaterial
                    :cutSectionColor="params.color"
                    :color="[i / 3, i % 3, i % 2]"
                    :side="DoubleSide"
                    :clippingPlanes="clipPlanes"
                    clipIntersection
                />
            </TresMesh>
        </TresGroup>
    </TresCanvas>
</template>
