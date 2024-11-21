<script setup lang="ts">
import { ref, reactive } from 'vue'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls, Html } from '@tresjs/cientos'

import { FButton } from '@fesjs/fes-design'
import { NButton } from 'naive-ui'

const gl = {
    clearColor: '#82DBC5',
    shadows: true,
    alpha: false,
    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
}

const sphereRef = ref(null)

const state = reactive({
    wrapperClass: 'wrapper',
    as: 'div',
    center: true,
})
</script>

<template>
    <TresCanvas v-bind="gl" window-size>
        <TresPerspectiveCamera :position="[3, 0, 8]" />
        <OrbitControls />
        <TresMesh :position="[-3, 1, 1]">
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
						<Html v-bind="state" transform>
                <FButton type="primary" size="small"> fes-design按钮 </FButton>
            </Html>
        </TresMesh>
        <TresMesh ref="sphereRef" :position="[1, 1, 1]">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
            <Html v-bind="state" transform>
							<n-button type="primary" dashed>
								naiveui按钮
							</n-button>
            </Html>
        </TresMesh>

        <TresAmbientLight :intensity="1" />
    </TresCanvas>
</template>

<!-- scoped -->
<style lang="less">
.wrapper {
    #inner {
        user-select: none;
        pointer-events: none !important;
    }
}
</style>
