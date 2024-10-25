<template></template>

<script setup lang="js">
import * as THREE from 'three'
import {  defineProps,watchEffect } from 'vue'
import { useTresContext } from '@tresjs/core'
import {gsap } from 'gsap'

const { scene} = useTresContext()
const nbObjects = 800

let spriteMap
const props = defineProps({
    opacity: {
        type: Number,
        default: 0.8,
    },

})

function getRandomVec3() {
    const u = Math.random()
    const v = Math.random()
    const theta = u * 2.0 * Math.PI
    const phi = Math.acos(2.0 * v - 1.0)
    const r = Math.cbrt(Math.random())
    const sinTheta = Math.sin(theta)
    const cosTheta = Math.cos(theta)
    const sinPhi = Math.sin(phi)
    const cosPhi = Math.cos(phi)
    const x = r * sinPhi * cosTheta
    const y = r * sinPhi * sinTheta
    const z = r * cosPhi
    return { x, y, z }
}
function Truc() {
    this.init()
    this.shuffle()
}
function init() {

    spriteMap = new THREE.Texture()
    const bubble = new Image()
    bubble.src =
        'data:image/png;base64,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'
    bubble.onload = function () {
        spriteMap.image = bubble
        spriteMap.needsUpdate = true
    }


    for (let i = 0; i < nbObjects; i++) {
        const object = new Truc()
        scene.value.add(object.sprite)
    }
}

function getRandomHexColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16) // 16777215 = FFFFFF
    return `#${randomColor.padStart(6, '0')}` // 确保颜色长度为6位
}
Truc.prototype.init = function () {
    this.material = new THREE.SpriteMaterial({
        color: getRandomHexColor(),
        map: spriteMap,
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    })
    this.sprite = new THREE.Sprite(this.material)
}

function rnd(max, negative) {
    return negative ? Math.random() * 2 * max - max : Math.random() * max
}
Truc.prototype.shuffle = function () {

    this.scale1 = 0.1
    this.scale2 = 2 + rnd(3)
    this.sprite.scale.set(this.scale1, this.scale1, 1)

    const rndv = getRandomVec3()
    this.sprite.position.set(rndv.x, rndv.y, rndv.z).multiplyScalar(50)
    this.sprite.position.y -= 25

    this.material.opacity = props.opacity

    this.tt = this.scale2
    gsap.to(this.sprite.scale, 1, { x: this.scale2, y: this.scale2, ease:'power1.inOut' })
    gsap.to(this.sprite.position, this.scale2, { y: this.sprite.position.y + 100, ease:'power1.inOut' })


    this.t1 = 1
    gsap.to(this.sprite.position, this.t1, {
        x: this.sprite.position.x + rnd(10, true),
        z: this.sprite.position.z + rnd(10, true),
        ease: 'power1.inOut',
        repeat: Math.floor(this.tt / this.t1 / 2),
        yoyo: true,
    })

    gsap.to(this.material, 1, {
        opacity: 0,
        delay: this.tt - 1,
        ease: 'power1.inOut',
        onCompleteParams: [this],
        onComplete (o) {
            o.shuffle()
        },
    })
}



init()
function setOpacityForScene(scene, opacityValue) {
  scene.traverse((child) => {
    if (child.isMesh) {
      if (Array.isArray(child.material)) {

        child.material.forEach((material) => {
          material.transparent = true
          material.opacity = opacityValue
        })
      } else {
        child.material.transparent = true
        child.material.opacity = opacityValue
      }
    }
  })
}

watchEffect(() => {
    if (props.opacity) {
      setOpacityForScene(scene.value, props.opacity)
    }

})
</script>
