<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-18 14:32:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-18 16:01:41
-->
<template>
    <TresGroup>
        <primitive :object="emitters" />
        <primitive :object="batchSystem" />
    </TresGroup>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import * as TQK from 'three.quarks'
import { useRenderLoop } from '@tresjs/core'
import { watch } from 'vue'

const props = withDefaults(
    defineProps<{
        color?: string
    }>(),
    {
        color: '#00ffff',
    },
)

const getPropsColor = (a) => {
    const colorThree = new THREE.Color(props.color)
    const tv4color = new THREE.Vector4(colorThree.r, colorThree.g, colorThree.b, a)
    const colorRange = new TQK.ConstantColor(tv4color)
    return colorRange
}

const batchSystem = new TQK.BatchedRenderer()
const loader = new TQK.QuarksLoader()
loader.setCrossOrigin('')

const emitters = new THREE.Group()
loader.load('./plugins/floor/json/CartoonMagicZone.json', (obj) => {
    obj.traverse((child) => {
        if (child.type === 'ParticleEmitter') {
            // child.scale.setScalar(0.5)
            //@ts-ignore
            const childSystem = child.system
            if (childSystem.startSpeed.value === -0.25) {
                childSystem.startSpeed = new TQK.ConstantValue(-0.5)
            }
            childSystem.startColor = getPropsColor(childSystem.startColor.color.w)
            batchSystem.addSystem(childSystem)
        }
    })
    if (obj.type === 'ParticleEmitter') {
        //@ts-ignore
        batchSystem.addSystem(obj.system)
    }
    emitters.add(obj)
})

const { onLoop } = useRenderLoop()
onLoop(({ delta, elapsed }) => {
    batchSystem.update(delta)
})

watch(
    () => [props.color],
    ([color]) => {
        batchSystem.systemToBatchIndex.forEach((value, ps) => {
					(ps as any).startColor = getPropsColor((ps as any).startColor.color.w)
        })
    },
)
</script>
