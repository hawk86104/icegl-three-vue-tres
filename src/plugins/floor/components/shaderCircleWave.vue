<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-06 15:54:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-07 08:20:36
-->
<template>
    <TresMesh ref="tmRef" :rotation-x="-Math.PI / 2" :scale="scale">
        <TresPlaneGeometry :args="[1, 1]" />
        <TresShaderMaterial v-bind="tmsMaterial" />
    </TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { reactive, ref, watchEffect } from 'vue'
import { useRenderLoop, useTexture } from '@tresjs/core'

const props = withDefaults(
    defineProps<{
        color?: string
        colorDark?: string
        speed?: number
        scale?: number
    }>(),
    {
        color: '#ffffff',
        colorDark: '#000000',
        speed: 1,
        scale: 2,
    },
)

const tmRef = ref()
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    if (tmRef.value) {
        tmRef.value.material.uniforms.uTime.value += delta * props.speed
    }
})
const texture = await useTexture(['./plugins/floor/image/scan.png'])
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
const tmsMaterial = reactive({
    side: THREE.DoubleSide,
    transparent: true,
    blending: THREE.AdditiveBlending,
    flatShading: true,
    depthTest: false,
    uniforms: {
        uTime: { type: 'f', value: 0.0 },
        uScanTex: {
            type: 't',
            value: texture,
        },
        uScanColor: {
            type: 'v3',
            value: new THREE.Color(props.color),
        },
        uScanColorDark: {
            type: 'v3',
            value: new THREE.Color(props.colorDark),
        },
    },
    vertexShader: `
varying vec2 vUv;
varying vec3 vPosition;
void main(){
	vUv=uv;
	vPosition=position;
	gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}
`,
    fragmentShader: `
#define uScanOrigin vec3(0.,0.,0.)
#define uScanWaveRatio1 3.2
#define uScanWaveRatio2 2.8

uniform float uTime;
uniform sampler2D uScanTex;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec3 uScanColor;
uniform vec3 uScanColorDark;

float circleWave(vec3 p,vec3 origin,float distRatio){
    float t=uTime;
    float dist=distance(p,origin)*distRatio;
    float radialMove=fract(dist-t);
    float fadeOutMask=1.-smoothstep(1.,3.,dist);
    radialMove*=fadeOutMask;
    float cutInitialMask=1.-step(t,dist);
    radialMove*=cutInitialMask;
    return radialMove;
}

vec3 getScanColor(vec3 worldPos,vec2 uv,vec3 col){
    // mask
    float scanMask=texture(uScanTex,uv).r;
    // waves
    float cw=circleWave(worldPos,uScanOrigin,uScanWaveRatio1);
    float cw2=circleWave(worldPos,uScanOrigin,uScanWaveRatio2);
    // scan
    float mask1=smoothstep(.3,0.,1.-cw);
    mask1*=(1.+scanMask*.7);
    
    float mask2=smoothstep(.07,0.,1.-cw2)*.8;
    mask1+=mask2;
    
    float mask3=smoothstep(.09,0.,1.-cw)*1.5;
    mask1+=mask3;

    // color
    vec3 scanCol=mix(uScanColorDark,uScanColor,mask1);
    col=mix(col,scanCol,mask1);
    
    return col;
		// return vec3(cw);
		// return vec3(scanMask);
		// return worldPos;
		// return vec3(mask1);
		// return scanCol;
}

void main()
{
    vec3 col=vec3(0.);
    col=getScanColor(vPosition,vUv*10.0,col);
    gl_FragColor=vec4(col,1.);
}
`,
})

watchEffect(() => {
    if (tmRef.value) {
        tmRef.value.material.uniforms.uScanColor.value = new THREE.Color(props.color)
        tmRef.value.material.uniforms.uScanColorDark.value = new THREE.Color(props.colorDark)
    }
})
</script>
