<template>
    <TresPerspectiveCamera :position="[20, 15, -20]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
    <OrbitControls enableDamping :makeDefault="true" />
    <TresAmbientLight :intensity="0.5" />

    <TresMesh :position="[3, 2, 1]" cast-shadow>
        <TresBoxGeometry :args="[10, 10, 10]" />
        <TresMeshStandardMaterial color="#ffffff" :metalness="1" :roughness="0.14" />
    </TresMesh>

    <TresMesh :position="[0, 2, -4]" cast-shadow>
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshNormalMaterial />
    </TresMesh>
    <Suspense>
        <Environment :blur="1" background :far="10000" preset="city">
            <TresGroup v-if="true">
                <Lightformer :intensity="0.75" :rotation-x="Math.PI / 2" :position="[0, 5, -9]" :scale="[10, 10, 1]" />
                <Lightformer :intensity="4" :rotation-y="Math.PI / 2" :position="[-5, 1, -1]" :scale="[20, 0.1, 1]" />
                <Lightformer :rotation-y="Math.PI / 2" :position="[-5, -1, -1]" :scale="[20, 0.5, 1]" />
                <Lightformer :rotation-y="-Math.PI / 2" :position="[10, 1, 0]" :scale="[20, 11, 1]" />
                <Levioso :speed="5" :floatFactor="2" :rotationFactor="2">
                    <Lightformer form="ring" color="red" :intensity="1" :scale="10" :position="[-15, 4, -18]" />
                </Levioso>
                <TresMesh :scale="[100, 100, 100]">
                    <TresSphereGeometry :args="[1, 64, 64]" />
                    <LayerMaterial :side="THREE.BackSide">
                        <Color color="#444" :alpha="1.0" mode="normal" />
                        <Depth colorA="blue" colorB="black" :alpha="0.5" mode="normal" :near="0" :far="300" :origin="new THREE.Vector3(100, 100, 100)" />
                    </LayerMaterial>
                </TresMesh>
            </TresGroup>
        </Environment>
    </Suspense>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { LayerMaterial, Color, Depth } from 'PLS/basic/components/forCientos/LayerMaterial'
import { OrbitControls, Levioso } from '@tresjs/cientos'
import { Environment, Lightformer } from 'PLS/basic'
</script>
