<template>
    <loading useResourceManager />
    <pagesShow :showAxesHelper="false">
        <template v-slot:ability>
            <experience v-if="Resource.hasAllFinished.value" :position="[10, 280, 0]" :scale="100" v-bind="experienceState" />
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import { Resource } from 'PLS/resourceManager'
import { yangyangLoading as loading } from 'PLS/UIdemo'
import pagesShow from '../components/pagesShow.vue'
import experience from '../components/weather/stylizedTornado/experience.vue'

Resource.loadResources([
    { functionName: 'GLTFLoader', url: './plugins/digitalCity/model/spiral-middle.glb' },
    { functionName: 'GLTFLoader', url: './plugins/digitalCity/model/tornado.glb' },
    { functionName: 'TextureLoader', url: './plugins/digitalCity/image/noise/noiseVoronoi.png' },
])

const paneControl = new Pane({
    title: '龙卷风参数',
    expanded: true,
})
const experienceState = reactive({
    color0: '#111111',
    color1: '#ff810c',
    color2: '#3a3a3a',
    color3: '#ff821c',
    color4: '#ff1800',
})
paneControl.addBinding(experienceState, 'color0', { label: '颜色0' })
paneControl.addBinding(experienceState, 'color1', { label: '颜色1' })
paneControl.addBinding(experienceState, 'color2', { label: '颜色2' })
paneControl.addBinding(experienceState, 'color3', { label: '颜色3' })
paneControl.addBinding(experienceState, 'color4', { label: '颜色4' })
</script>
