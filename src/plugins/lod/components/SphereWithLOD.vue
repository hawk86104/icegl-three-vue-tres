<template>
    <TresLOD ref="lodRef">
        <TresMesh ref="mesh1Ref">
            <TresSphereGeometry :args="[2, 36, 36]" />
            <TresMeshStandardMaterial color="#ff0000" wireframe />
        </TresMesh>
        <TresMesh ref="mesh2Ref">
            <TresSphereGeometry :args="[2, 12, 12]" />
            <TresMeshStandardMaterial color="#00ff00" wireframe />
        </TresMesh>
        <TresMesh ref="mesh3Ref">
            <TresSphereGeometry :args="[2, 4, 4]" />
            <TresMeshStandardMaterial color="#0000ff" wireframe />
        </TresMesh>
    </TresLOD>
</template>

<script setup lang="ts">
import { LOD, Mesh } from 'three'
import { shallowRef, watch } from 'vue'

const lodRef = shallowRef<LOD>()

const mesh1Ref = shallowRef<InstanceType<typeof Mesh>>()
const mesh2Ref = shallowRef<InstanceType<typeof Mesh>>()
const mesh3Ref = shallowRef<InstanceType<typeof Mesh>>()

	watch([mesh1Ref, mesh2Ref, mesh3Ref], () => {
    if (mesh1Ref.value && mesh2Ref.value && mesh3Ref.value) {
        lodRef.value?.addLevel(mesh1Ref.value, 0)
        lodRef.value?.addLevel(mesh2Ref.value, 10)
        lodRef.value?.addLevel(mesh3Ref.value, 20)
    }
})

</script>
