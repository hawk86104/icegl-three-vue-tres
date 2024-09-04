<template>
    <Suspense>
        <template v-if="envSetup.isLightFormer">
            <Environment :blur="envSetup.blur" :background="!backgroundSetup.useBackImg" :far="100000">
                <TresGroup
                    :position="[envSetup.pos.x, envSetup.pos.y, envSetup.pos.z]"
                    :rotation="[envSetup.rotate.x, envSetup.rotate.y, envSetup.rotate.z]"
                    :scale="[envSetup.scale.x, envSetup.scale.y, envSetup.scale.z]"
                >
                    <Lightformer :intensity="0.75" :rotation-x="Math.PI / 2" :position="[0, 5, -9]" :scale="[10, 10, 1]" />
                    <Lightformer :intensity="4" :rotation-y="Math.PI / 2" :position="[-5, 1, -1]" :scale="[20, 0.1, 1]" />
                    <Lightformer :rotation-y="Math.PI / 2" :position="[-5, -1, -1]" :scale="[20, 0.5, 1]" />
                    <Lightformer :rotation-y="-Math.PI / 2" :position="[10, 1, 0]" :scale="[20, 11, 1]" />
                    <Levioso :speed="5" :floatFactor="2" :rotationFactor="2">
                        <Lightformer form="ring" :color="envSetup.colorA" :intensity="1" :scale="10" :position="[-15, 4, -18]" />
                    </Levioso>
                    <TresGroup :rotation="[0, 0.5, 0]">
                        <TresGroup ref="group">
                            <Lightformer
                                v-for="(i, x) in lightFormerPositions"
                                :key="i"
                                form="circle"
                                :intensity="2"
                                :rotation="[Math.PI / 2, 0, 0]"
                                :position="[x, 4, i * 4]"
                                :scale="[3, 1, 1]"
                            />
                        </TresGroup>
                    </TresGroup>
                    <TresMesh :scale="[100, 100, 100]">
                        <TresSphereGeometry :args="[1, 64, 64]" />
                        <LayerMaterial :side="THREE.BackSide">
                            <Color color="#444" :alpha="1.0" mode="normal" />
                            <Depth
                                :colorA="envSetup.colorB"
                                colorB="black"
                                :alpha="0.5"
                                mode="normal"
                                :near="0"
                                :far="300"
                                :origin="new THREE.Vector3(100, 100, 100)"
                            />
                        </LayerMaterial>
                    </TresMesh>
                </TresGroup>
            </Environment>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import * as THREE from 'three'
import { useTresContext, useTexture, useRenderLoop } from '@tresjs/core'
import { LayerMaterial, Color, Depth } from 'PLS/basic/components/forCientos/LayerMaterial'
import { Environment, Lightformer } from 'PLS/basic'
import { Levioso } from '@tresjs/cientos'

import { useBackgroundSetupStore } from 'PLS/tvtSceneCreator/stores/backgroundSetup'
import { useEnvSetupStore } from 'PLS/tvtSceneCreator/stores/envSetup'

const lightFormerPositions = [2, 0, 2, 0, 2, 0, 2, 0]

const { scene } = useTresContext()
const backgroundSetup = useBackgroundSetupStore()
const envSetup = useEnvSetupStore()

const setupEnvBackground = async () => {
    // 格式化 环境
    if (envSetup.isLightFormer) {
        //
    } else {
        scene.value.environment = envSetup.envHDR.src
    }

    // 格式化 背景
    if (backgroundSetup.useBackImg) {
        if (backgroundSetup.img.name === '') {
            scene.value.background = new THREE.Color(backgroundSetup.color)
        } else {
            const pTexture = await useTexture([backgroundSetup.img.src])
            scene.value.background = pTexture
        }
    } else {
        scene.value.background = scene.value.environment
    }
    scene.value.backgroundBlurriness = envSetup.blur
}

// @ts-ignore
backgroundSetup.setupEnvBackground = setupEnvBackground

watch(
    () => backgroundSetup.color,
    () => {
        backgroundSetup.img = {
            name: '',
            src: '',
        }
        setupEnvBackground()
    },
    { immediate: true },
)
watch(
    () => backgroundSetup.img,
    async (img) => {
        if (img.name) {
            setupEnvBackground()
        }
    },
    { immediate: true, deep: true },
)
watch(
    () => envSetup.envHDR,
    () => {
        setupEnvBackground()
    },
    { immediate: true, deep: true },
)
watch(
    () => envSetup.isLightFormer,
    () => {
        setupEnvBackground()
    },
)
watch(
    () => backgroundSetup.useBackImg,
    () => {
        setupEnvBackground()
    },
)
watch(
    () => envSetup.blur,
    () => {
        setupEnvBackground()
    },
)

const group = ref(null)
const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ delta }) => {
    if (group.value) {
        // @ts-ignore
        ;(group.value.position.z += delta * 10) > 20 && (group.value.position.z = -60)
    }
})
</script>
