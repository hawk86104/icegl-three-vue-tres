<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-03 15:24:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-03 16:03:22
-->
<template></template>

<script lang="ts" setup>
import * as THREE from 'three'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import * as Photons from '../../common/photons.module.js'

const props = withDefaults(defineProps<{
	position: any
	scale?: number
}>(), {
	position: [0, 0, 0],
	scale: 1
})

const PhotonsManager = new Photons.Manager()
const jsonTypeStore = new Photons.JSONTypeStore()
jsonTypeStore.addNamespace('THREE', THREE)
jsonTypeStore.addNamespace('Photons', Photons)

const { renderer, camera, scene } = useTresContext()
const setupEmbers = (scale: number, position: THREE.Vector3) => {
    const embersRoot = new THREE.Object3D()
    embersRoot.position.copy(position)

    const texturePath = './plugins/digitalCity/image/fireF/ember.png'
    const embersTexture = new THREE.TextureLoader().load(texturePath)
    const embersAtlas = new Photons.Atlas(embersTexture, texturePath)
    embersAtlas.addFrameSet(1, 0.0, 0.0, 1.0, 1.0)
    const embersRenderer = new Photons.AnimatedSpriteRenderer(true, embersAtlas, true, THREE.AdditiveBlending)

    const embersParticleSystem = new Photons.ParticleSystem(embersRoot, embersRenderer, renderer.value)
    embersParticleSystem.init(150)

    embersParticleSystem.setEmitter(new Photons.ConstantParticleEmitter(6))

    const sizeInitializerGenerator = new Photons.RandomGenerator(
        THREE.Vector2,
        new THREE.Vector2(0.0, 0.0),
        new THREE.Vector2(scale * 0.15, scale * 0.15),
        0.0,
        0.0,
        false,
    )
    embersParticleSystem.addParticleStateInitializer(new Photons.LifetimeInitializer(3.0, 1.0, 0.0, 0.0, false))
    embersParticleSystem.addParticleStateInitializer(new Photons.SizeInitializer(sizeInitializerGenerator))
    embersParticleSystem.addParticleStateInitializer(
        new Photons.BoxPositionInitializer(new THREE.Vector3(0.05 * scale, 0.0, 0.05 * scale), new THREE.Vector3(-0.025 * scale, 0.0, -0.025 * scale)),
    )
    embersParticleSystem.addParticleStateInitializer(
        new Photons.RandomVelocityInitializer(
            new THREE.Vector3(0.4 * scale, 0.5 * scale, 0.4 * scale),
            new THREE.Vector3(-0.2 * scale, 0.8 * scale, -0.2 * scale),
            0.6 * scale,
            0.8 * scale,
            false,
        ),
    )

    const embersOpacityOperator = embersParticleSystem.addParticleStateOperator(new Photons.OpacityInterpolatorOperator())
    embersOpacityOperator.addElements([
        [0.0, 0.0],
        [0.7, 0.25],
        [0.9, 0.75],
        [0.0, 1.0],
    ])

    const embersColorOperator = embersParticleSystem.addParticleStateOperator(new Photons.ColorInterpolatorOperator(true))
    embersColorOperator.addElementsFromParameters([
        [[1.0, 0.7, 0.0], 0.0],
        [[1.0, 0.6, 0.0], 0.5],
        [[1.0, 0.4, 0.0], 1.0],
    ])

    const acceleratorOperatorGenerator = new Photons.SphereRandomGenerator(
        Math.PI * 2.0,
        0.0,
        Math.PI,
        -Math.PI / 2,
        20.0,
        -8,
        scale,
        scale,
        scale,
        0.0,
        0.0,
        0.0,
    )

    embersParticleSystem.addParticleStateOperator(new Photons.AccelerationOperator(acceleratorOperatorGenerator))

    embersParticleSystem.setSimulateInWorldSpace(true)
    embersParticleSystem.start()

    return embersParticleSystem
}
const setupBaseFlame = (scale: number, position: THREE.Vector3) => {
    const baseFlameRoot = new THREE.Object3D()
    baseFlameRoot.position.copy(position)

    const texturePath = './plugins/digitalCity/image/fireF/base_flame.png'
    const baseFlameTexture = new THREE.TextureLoader().load(texturePath)
    const baseFlameAtlas = new Photons.Atlas(baseFlameTexture, texturePath)
    baseFlameAtlas.addFrameSet(18, 0.0, 0.0, 128.0 / 1024.0, 128.0 / 512.0)
    const baseFlameRenderer = new Photons.AnimatedSpriteRenderer(true, baseFlameAtlas, true)

    const baseFlameParticleSystem = new Photons.ParticleSystem(baseFlameRoot, baseFlameRenderer, renderer.value)
    baseFlameParticleSystem.init(50)

    baseFlameParticleSystem.setEmitter(new Photons.ConstantParticleEmitter(10))

    baseFlameParticleSystem.addParticleSequence(0, 18)
    const baseFlameParticleSequences = baseFlameParticleSystem.getParticleSequences()

    baseFlameParticleSystem.addParticleStateInitializer(new Photons.LifetimeInitializer(0.0, 0.0, 0.0, 0.0, false))
    baseFlameParticleSystem.addParticleStateInitializer(
        new Photons.RotationInitializer(new Photons.RandomGenerator(0, Math.PI / 2.0, -Math.PI / 2.0, 0.0, 0.0, false)),
    )
    baseFlameParticleSystem.addParticleStateInitializer(new Photons.RotationalSpeedInitializer(1.0, -1.0, 0.0, 0.0, false))
    baseFlameParticleSystem.addParticleStateInitializer(
        new Photons.SizeInitializer(
            new Photons.RandomGenerator(
                THREE.Vector2,
                new THREE.Vector2(0.25 * scale, 0.25 * scale),
                new THREE.Vector2(0.5 * scale, 0.5 * scale),
                0.0,
                0.0,
                false,
            ),
        ),
    )

    baseFlameParticleSystem.addParticleStateInitializer(
        new Photons.BoxPositionInitializer(new THREE.Vector3(0.05 * scale, 0.0, 0.05 * scale), new THREE.Vector3(-0.025 * scale, 0.0, -0.025 * scale)),
    )
    baseFlameParticleSystem.addParticleStateInitializer(
        new Photons.RandomVelocityInitializer(
            new THREE.Vector3(0.05 * scale, 0.4 * scale, 0.05 * scale),
            new THREE.Vector3(-0.025 * scale, 0.8 * scale, -0.025 * scale),
            0.35 * scale,
            0.5 * scale,
            false,
        ),
    )
    baseFlameParticleSystem.addParticleStateInitializer(new Photons.SequenceInitializer(baseFlameParticleSequences))

    baseFlameParticleSystem.addParticleStateOperator(new Photons.SequenceOperator(baseFlameParticleSequences, 0.07, false))

    const baseFlameOpacityOperator = baseFlameParticleSystem.addParticleStateOperator(new Photons.OpacityInterpolatorOperator())
    baseFlameOpacityOperator.addElements([
        [0.0, 0.0],
        [0.3, 0.25],
        [0.3, 0.5],
        [0.0, 1.0],
    ])

    const baseFlameSizeOperator = baseFlameParticleSystem.addParticleStateOperator(new Photons.SizeInterpolatorOperator(true))
    baseFlameSizeOperator.addElementsFromParameters([
        [[0.6, 0.6], 0.0],
        [[1.0, 1.0], 0.4],
        [[1.0, 1.0], 1.0],
    ])

    const baseFlameColorOperator = baseFlameParticleSystem.addParticleStateOperator(new Photons.ColorInterpolatorOperator(true))
    baseFlameColorOperator.addElementsFromParameters([
        [[1.0, 1.0, 1.0], 0.0],
        [[1.5, 1.5, 1.5], 0.5],
        [[1.0, 1.0, 1.0], 1.0],
    ])

    baseFlameParticleSystem.addParticleStateOperator(
        new Photons.AccelerationOperator(
            new Photons.RandomGenerator(THREE.Vector3, new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(0.0, 1.5 * scale, 0.0), 0.0, 0.0, false),
        ),
    )

    baseFlameParticleSystem.setSimulateInWorldSpace(true)
    baseFlameParticleSystem.start()

    return baseFlameParticleSystem
}
const setupBrightFLame = (scale: number, position: THREE.Vector3) => {
    const brightFlameRoot = new THREE.Object3D()
    brightFlameRoot.position.copy(position)

    const texturePath = './plugins/digitalCity/image/fireF/bright_flame.png'
    const brightFlameTexture = new THREE.TextureLoader().load(texturePath)
    const brightFlameAtlas = new Photons.Atlas(brightFlameTexture, texturePath)
    brightFlameAtlas.addFrameSet(16, 0.0, 0.0, 212.0 / 1024.0, 256.0 / 1024.0)
    const brightFlameRenderer = new Photons.AnimatedSpriteRenderer(true, brightFlameAtlas, true)

    const brightFlameParticleSystem = new Photons.ParticleSystem(brightFlameRoot, brightFlameRenderer, renderer.value)
    brightFlameParticleSystem.init(20)

    brightFlameParticleSystem.setEmitter(new Photons.ConstantParticleEmitter(5))

    brightFlameParticleSystem.addParticleSequence(0, 16)
    const brightFlameParticleSequences = brightFlameParticleSystem.getParticleSequences()

    brightFlameParticleSystem.addParticleStateInitializer(new Photons.LifetimeInitializer(0.0, 0.0, 0.0, 0.0, false))
    brightFlameParticleSystem.addParticleStateInitializer(
        new Photons.RotationInitializer(new Photons.RandomGenerator(0, Math.PI, -Math.PI / 2.0, 0.0, 0.0, false)),
    )
    brightFlameParticleSystem.addParticleStateInitializer(new Photons.RotationalSpeedInitializer(Math.PI / 2.0, -Math.PI / 4.0, 0.0, 0.0, false))
    brightFlameParticleSystem.addParticleStateInitializer(
        new Photons.SizeInitializer(
            new Photons.RandomGenerator(THREE.Vector2, new THREE.Vector2(0.0, 0.0), new THREE.Vector2(0.0, 0.0), 0.2 * scale, 0.65 * scale, false),
        ),
    )
    brightFlameParticleSystem.addParticleStateInitializer(
        new Photons.BoxPositionInitializer(new THREE.Vector3(0.1 * scale, 0.0, 0.1 * scale), new THREE.Vector3(-0.05 * scale, 0.0, -0.05 * scale)),
    )
    brightFlameParticleSystem.addParticleStateInitializer(
        new Photons.RandomVelocityInitializer(
            new THREE.Vector3(0.02 * scale, 0.4 * scale, 0.02 * scale),
            new THREE.Vector3(-0.01 * scale, 0.4 * scale, -0.01 * scale),
            0.1 * scale,
            0.2 * scale,
            false,
        ),
    )
    brightFlameParticleSystem.addParticleStateInitializer(new Photons.SequenceInitializer(brightFlameParticleSequences))

    brightFlameParticleSystem.addParticleStateOperator(new Photons.SequenceOperator(brightFlameParticleSequences, 0.1, false))

    const brightFlameOpacityOperator = brightFlameParticleSystem.addParticleStateOperator(new Photons.OpacityInterpolatorOperator())
    brightFlameOpacityOperator.addElements([
        [0.0, 0.0],
        [0.6, 0.2],
        [0.5, 0.75],
        [0.0, 1.0],
    ])

    const brightFlameSizeOperator = brightFlameParticleSystem.addParticleStateOperator(new Photons.SizeInterpolatorOperator(true))
    brightFlameSizeOperator.addElementsFromParameters([
        [[0.3, 0.3], 0.0],
        [[1.0, 1.0], 0.4],
        [[1.0, 1.0], 0.55],
        [[0.65, 0.65], 0.75],
        [[0.1, 0.1], 1.0],
    ])

    const brightFlameColorOperator = brightFlameParticleSystem.addParticleStateOperator(new Photons.ColorInterpolatorOperator(true))
    brightFlameColorOperator.addElementsFromParameters([
        [[1.0, 1.0, 1.0], 0.0],
        [[2.0, 2.0, 2.0], 0.3],
        [[2.0, 2.0, 2.0], 0.4],
        [[0.9, 0.6, 0.3], 0.65],
        [[0.75, 0.0, 0.0], 1.0],
    ])

    brightFlameParticleSystem.addParticleStateOperator(
        new Photons.AccelerationOperator(
            new Photons.RandomGenerator(THREE.Vector3, new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(0.0, 1.5 * scale, 0.0), 0.0, 0.0, false),
        ),
    )

    brightFlameParticleSystem.setSimulateInWorldSpace(true)

    brightFlameParticleSystem.start()
    return brightFlameParticleSystem
}

const setupLights = (position: THREE.Vector3, intensity = 10) => {
    const lightParent = new THREE.Object3D()
    scene.value.add(lightParent)
    lightParent.position.copy(position)

    const flickerLightShadows = {
        mapSize: 1024,
        cameraNear: 0.1,
        cameraFar: 5000,
        bias: 0.000009,
        edgeRadius: 3,
    } as any
    return new Photons.FlickerLight(lightParent, intensity, 2, new THREE.Color().setRGB(1, 0.8, 0.4), 0, 1.0, flickerLightShadows)
}

const flamePosition2 = new THREE.Vector3(...props.position)
PhotonsManager.addParticleSystem(setupEmbers(props.scale, flamePosition2))
PhotonsManager.addParticleSystem(setupBaseFlame(props.scale, flamePosition2))
PhotonsManager.addParticleSystem(setupBrightFLame(props.scale, flamePosition2))
PhotonsManager.addComponent(setupLights(flamePosition2, 100))

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(() => {
    PhotonsManager.update()
    PhotonsManager.render(renderer.value, camera.value)
})
</script>