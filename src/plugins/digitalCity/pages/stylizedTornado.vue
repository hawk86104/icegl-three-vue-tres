<template>
    <loading useResourceManager />
    <pagesShow :showAxesHelper="false">
        <template v-slot:ability>
            <experience v-if="Resource.hasAllFinished.value" :position="[10, 300, 0]" :scale="100" />
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { Resource } from 'PLS/resourceManager'
import { yangyangLoading as loading } from 'PLS/UIdemo'
import pagesShow from '../components/pagesShow.vue'
import experience from '../components/weather/stylizedTornado/experience.vue'

Resource.loadResources([
    { functionName: 'GLTFLoader', url: './plugins/digitalCity/model/spiral-middle.glb' },
    { functionName: 'GLTFLoader', url: './plugins/digitalCity/model/tornado.glb' },
    { functionName: 'TextureLoader', url: './plugins/digitalCity/image/noise/noiseVoronoi.png' },
])
</script>
