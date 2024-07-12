<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-11 18:32:03
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-07-12 10:20:34
-->
<template>
    <TresGroup>
        <primitive :object="hmps.emitter" />
        <primitive :object="yanps.emitter" />
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
//@ts-ignore
const texture = await useTexture(['./plugins/digitalCity/image/smoke1.png'])

// 火苗
const hmConfig = {
    duration: 1,
    looping: true,
    startLife: new TQK.IntervalValue(1, 5),
    startSpeed: new TQK.ConstantValue(6),
    startSize: new TQK.IntervalValue(10, 20),
    startColor: new TQK.ConstantColor(new TQK.Vector4(255 / 255, 180 / 255, 88 / 255, 1)),
    worldSpace: true,
    emissionOverTime: new TQK.ConstantValue(100),
    shape: new TQK.ConeEmitter({ radius: 5.5, angle: 0.5 }),
    material: new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: true,
    }),
    renderMode: TQK.RenderMode.BillBoard,
    renderOrder: 9999,
}
const hmps = new TQK.ParticleSystem(hmConfig)
hmps.addBehavior(
    new TQK.ColorOverLife(new TQK.ColorRange(new TQK.Vector4(255 / 255, 180 / 255, 88 / 255, 1), new TQK.Vector4(255 / 255, 180 / 255, 88 / 255, 0.1))),
)
hmps.emitter.name = 'hmps'
hmps.emitter.rotation.x = -Math.PI / 2
batchSystem.addSystem(hmps)

const muzzle = {
    duration: 1,
    looping: true,
    startLife: new TQK.IntervalValue(0.1, 6),
    startSpeed: new TQK.ConstantValue(20),
    startSize: new TQK.IntervalValue(20, 50),
    startColor: new TQK.ConstantColor(new THREE.Vector4(255 / 255, 170 / 255, 120 / 255, 0.7)),
    worldSpace: true,

    emissionOverTime: new TQK.ConstantValue(80),
    shape: new TQK.ConeEmitter({ radius: 10.5, angle: 0.5 }),
    material: new THREE.MeshBasicMaterial({
        map: texture,
        // blending: THREE.AdditiveBlending,
        transparent: true,
        side: THREE.DoubleSide,
        // color: '#ff0000',
        depthWrite: true,
        // depthTest: false,
    }),
    renderMode: TQK.RenderMode.BillBoard,
    startTileIndex: new TQK.ConstantValue(0),
    uTileCount: 0, //如果 图片材质包含集合贴图，则需要设置
    vTileCount: 0,
    renderOrder: 9998,
}
const muzzle1 = new TQK.ParticleSystem(muzzle)
// muzzle1.addBehavior(new TQK.ColorOverLife(new TQK.ColorRange(new THREE.Vector4(1, 0.3882312, 0.125, 1), new THREE.Vector4(1, 0.826827, 0.3014706, 1))))
muzzle1.addBehavior(new TQK.Noise(new TQK.ConstantValue(1), new TQK.ConstantValue(2)))
muzzle1.emitter.rotation.x = -Math.PI / 2
// muzzle1.emitter.position.y = -8
muzzle1.addBehavior(
    new TQK.ColorOverLife(new TQK.ColorRange(new THREE.Vector4(255 / 255, 170 / 255, 75 / 255, 0.9), new THREE.Vector4(145 / 255, 32 / 255, 20 / 255, 0.0))),
)
// muzzle1.addBehavior(
//     new TQK.ColorOverLife(new TQK.ColorRange(new THREE.Vector4(255 / 255, 170 / 255, 75 / 255, 1.1), new THREE.Vector4(145 / 255, 32 / 255, 20 / 255, 0.8))),
// )
muzzle1.addBehavior(new TQK.SizeOverLife(new TQK.PiecewiseBezier([[new TQK.Bezier(1, 0.95, 0.75, 1), 0]])))
muzzle1.addBehavior(new TQK.ForceOverLife(new TQK.ConstantValue(0), new TQK.ConstantValue(1), new TQK.ConstantValue(1)))
// muzzle1.addBehavior(new TQK.FrameOverLife(new TQK.PiecewiseBezier([[new TQK.Bezier(91, 94, 97, 100), 0]])))
// muzzle1.addBehavior(new TQK.SpeedOverLife(new TQK.PiecewiseBezier([[new TQK.Bezier(1, 7.5, 5, 0), 0]])))
muzzle1.emitter.name = 'ps'

batchSystem.addSystem(muzzle1)

//烟雾
const yanConfig = {
    duration: 1,
    looping: true,
    startLife: new TQK.IntervalValue(1, 10),
    startSpeed: new TQK.ConstantValue(20),
    startSize: new TQK.IntervalValue(40, 70),
    startColor: new TQK.ConstantColor(new TQK.Vector4(100 / 255, 60 / 255, 70 / 255, 0.9)),
    worldSpace: true,
    emissionOverTime: new TQK.ConstantValue(80),
    shape: new TQK.ConeEmitter({ radius: 10.5, angle: 0.5 }),
    material: new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: true,
    }),
    renderMode: TQK.RenderMode.BillBoard,
    renderOrder: 9997,
}
const yanps = new TQK.ParticleSystem(yanConfig)
yanps.addBehavior(new TQK.Noise(new TQK.ConstantValue(2), new TQK.ConstantValue(3)))
yanps.addBehavior(
    new TQK.ColorOverLife(new TQK.ColorRange(new TQK.Vector4(100 / 255, 60 / 255, 70 / 255, 0.9), new TQK.Vector4(100 / 255, 60 / 255, 70 / 255, 0))),
)
yanps.addBehavior(new TQK.SizeOverLife(new TQK.PiecewiseBezier([[new TQK.Bezier(1 * 1.5, 0.95 * 1.5, 0.75 * 1.5, 1), 0]])))
yanps.addBehavior(new TQK.ForceOverLife(new TQK.ConstantValue(1), new TQK.ConstantValue(2), new TQK.ConstantValue(1)))

yanps.emitter.rotation.x = -Math.PI / 2
yanps.emitter.name = 'yanps'
yanps.emitter.position.y = 6
batchSystem.addSystem(yanps)

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    batchSystem.update(delta)
})
</script>
