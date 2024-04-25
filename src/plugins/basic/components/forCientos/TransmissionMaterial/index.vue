<script setup lang="ts">
import { shallowRef, nextTick, onMounted, Ref } from 'vue'
import { MeshTransmissionMaterial, MeshDiscardMaterial } from '@pmndrs/vanilla'
import { useFBO } from 'PLS/basic'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { BackSide, DoubleSide } from 'three'
import type { TresObject } from '@tresjs/core'
import type { Camera, Texture, WebGLRenderTarget } from 'three'

const MeshTransmissionMaterialClass = shallowRef()
const { extend, scene, renderer, camera } = useTresContext()
const parent = shallowRef<TresObject>()

const props = withDefaults(
    defineProps<{
        backside?: boolean
        thickness?: number
        backsideThickness?: number
        fboResolution?: number
    }>(),
    {
        backside: true,
        thickness: 1,
        backsideThickness: 0.5,
        fboResolution: 256,
    },
)

const backsideEnvMapIntensity = 0

extend({ MeshTransmissionMaterial })

function findMeshByMaterialUuid(scene: TresObject, materialUuid: string): TresObject {
    let foundMesh
    scene.traverse((object: TresObject) => {
        if (object.isMesh && object.material && object.material.uuid === materialUuid) {
            foundMesh = object
        }
    })
    return foundMesh as unknown as TresObject
}
const discardMaterial = new MeshDiscardMaterial()
const { onBeforeLoop } = useRenderLoop()

const fboBack = useFBO({ width: props.fboResolution, height: props.fboResolution, isLoop: false }) as unknown as Ref<WebGLRenderTarget<Texture>>
const fboMain = useFBO({ width: props.fboResolution, height: props.fboResolution, isLoop: false }) as unknown as Ref<WebGLRenderTarget<Texture>>
onMounted(async () => {
    await nextTick()
    parent.value = findMeshByMaterialUuid(scene.value as unknown as TresObject, MeshTransmissionMaterialClass.value.uuid)
})
let oldBg
let oldEnvMapIntensity
let oldTone
let oldSide
onBeforeLoop(({ elapsed }) => {
    MeshTransmissionMaterialClass.value.time = elapsed
    if (MeshTransmissionMaterialClass.value.buffer === fboMain.value.texture) {
        if (parent.value) {
            oldTone = renderer.value.toneMapping
            oldBg = scene.value.background
            oldEnvMapIntensity = MeshTransmissionMaterialClass.value.envMapIntensity
            oldSide = parent.value.material.side

            parent.value.material = discardMaterial

            if (props.backside) {
                renderer.value.setRenderTarget(fboBack.value)
                renderer.value.render(scene.value, camera.value as Camera)
                parent.value.material = MeshTransmissionMaterialClass.value
                parent.value.material.thickness = props.backsideThickness
                parent.value.material.buffer = fboBack.value.texture
                parent.value.material.side = BackSide
                parent.value.material.envMapIntensity = backsideEnvMapIntensity
            }
            renderer.value.setRenderTarget(fboMain.value)
            renderer.value.render(scene.value, camera.value as Camera)
            parent.value.material.buffer = fboMain.value.texture
            parent.value.material = MeshTransmissionMaterialClass.value
            parent.value.material.thickness = props.thickness
            parent.value.material.side = oldSide
            parent.value.material.envMapIntensity = oldEnvMapIntensity

            scene.value.background = oldBg
            renderer.value.setRenderTarget(null)
            renderer.value.toneMapping = oldTone
        }
    }
})

defineExpose({ root: MeshTransmissionMaterialClass, constructor: MeshTransmissionMaterial })
</script>

<template>
    <TresMeshTransmissionMaterial
        ref="MeshTransmissionMaterialClass"
        :buffer="fboMain.texture"
        :side="DoubleSide"
    />
</template>
