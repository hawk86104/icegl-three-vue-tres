<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-17 14:45:37
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-17 16:11:21
-->
<template>
    <TresGroup>
        <primitive :object="muzzle1.emitter" />
        <primitive :object="batchSystem" />
    </TresGroup>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import * as TQK from 'three.quarks'
import { useRenderLoop, useTexture } from '@tresjs/core'

const props = withDefaults(
    defineProps<{
        color?: string
        size?: number
    }>(),
    {
        color: '#b0ffff',
        size: 1,
    },
)

const batchSystem = new TQK.BatchedRenderer()
const texture = await useTexture(['./plugins/basic/shine/image/round.png'])

const muzzle = {
    duration: 100,
    looping: true,
    startLife: new TQK.IntervalValue(0.1, 20),
    startSpeed: new TQK.ConstantValue(20),
    startSize: new TQK.IntervalValue(6, 20),
    startColor: new TQK.ConstantColor(new THREE.Vector4(1, 1, 1, 1)),
    worldSpace: false,

    maxParticle: 5000,
    emissionOverTime: new TQK.ConstantValue(20),
    emissionBursts: [
        {
            time: 10,
            count: new TQK.ConstantValue(100),
            cycle: 10,
            interval: 1,
            probability: 1,
        },
    ],

    shape: new TQK.GridEmitter({ width: 1500, height: 1500, column: 70, row: 70 }),
    material: new THREE.MeshBasicMaterial({ map: texture, blending: THREE.AdditiveBlending, transparent: true }),
    startTileIndex: new TQK.ConstantValue(91),
    uTileCount: 0,
    vTileCount: 0,
    renderOrder: 9999,
    renderMode: TQK.RenderMode.BillBoard,
}

const muzzle1 = new TQK.ParticleSystem(muzzle)
muzzle1.addBehavior(new TQK.ColorOverLife(new TQK.ColorRange(new THREE.Vector4(1, 0.3882312, 0.125, 1), new THREE.Vector4(0, 0.826827, 0.3014706, 1))))
muzzle1.addBehavior(new TQK.SizeOverLife(new TQK.PiecewiseBezier([[new TQK.Bezier(1, 0.95, 0.75, 0), 0]])))

muzzle1.addBehavior(new TQK.FrameOverLife(new TQK.PiecewiseBezier([[new TQK.Bezier(91, 94, 97, 100), 0]])))

// muzzle1.addBehavior(new TQK.SpeedOverLife(new TQK.PiecewiseBezier([[new TQK.Bezier(1, 7.5, 5, 0), 0]])))
muzzle1.emitter.name = 'muzzle1'

batchSystem.addSystem(muzzle1)

batchSystem.rotateX(-Math.PI / 2)

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    batchSystem.update(delta)
})
</script>
