<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 10:23:43
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-25 11:24:17
-->

<template>
	<TresMesh ref="tmRef" :rotation-x="-Math.PI / 2" receive-shadow>
		<TresPlaneGeometry :args="props.size" />
		<TresShaderMaterial v-bind="tsMaterial" />
	</TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import { watch, reactive, ref } from 'vue'
import { useTexture } from '@tresjs/core'

const props = withDefaults(defineProps<{
	size?: Array<number>
}>(), {
	size: [20, 20]
})

const tmRef = ref()
const { map: pTexture } = await useTexture({ map: './plugins/floor/image/whiteFloor.jpg' })
pTexture.wrapS = pTexture.wrapT = THREE.RepeatWrapping
// ShaderMaterial 下的 纹理参数重复无效 要在着色器中增加
// pTexture.repeat.set(100, 100)
// pTexture.needsUpdate = true
const tsMaterial = {
	uniforms:
		THREE.UniformsUtils.merge([
			THREE.UniformsLib["lights"],
			{
				uTexture: { type: "t", value: pTexture },
			}
		]),
	side: THREE.DoubleSide,
	vertexShader: `
       varying vec2 vUv;
			 	${THREE.ShaderChunk["common"]}
      	${THREE.ShaderChunk["bsdfs"]}
      	${THREE.ShaderChunk["shadowmap_pars_vertex"]}
       void main() {
					${THREE.ShaderChunk['beginnormal_vertex']}
          ${THREE.ShaderChunk['defaultnormal_vertex']}
          ${THREE.ShaderChunk["begin_vertex"]}
          ${THREE.ShaderChunk["project_vertex"]}
          ${THREE.ShaderChunk["worldpos_vertex"]}
          ${THREE.ShaderChunk["shadowmap_vertex"]}

           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);    
           vUv = uv;
       }`,

	fragmentShader: `
       varying vec2 vUv;
       uniform sampler2D uTexture;
			 // ShaderMaterial 下的 纹理参数重复无效 要在着色器中增加
			 float repeatTime = 100.0;

       float smoothsteps(float t) {
           return t * t * (3.0 - 2.0 * t);
       }

				${THREE.ShaderChunk["common"]}
				${THREE.ShaderChunk["packing"]}
				${THREE.ShaderChunk["bsdfs"]}
				${THREE.ShaderChunk["lights_pars_begin"]}
				${THREE.ShaderChunk["shadowmap_pars_fragment"]}
				${THREE.ShaderChunk["shadowmask_pars_fragment"]}

       void main() {
           vec4 col = texture2D(uTexture, vUv * repeatTime);
           // col.rgb *= vec3(1.3, 1.15, 1.0) * 1.2;
           col.rgb *= vec3(0.97, 0.95, 0.9) * 1.2;
           
           float alpha = 1.0;
           float d = length(vUv - vec2(0.5));
           if(d > 0.35) {
               alpha = 1.0 - smoothsteps( clamp( (d - 0.35) / 0.15, 0.0, 1.0) );
           }

					vec3 shadowColor = vec3(0,0,0);
          vec3 addShadow = mix( shadowColor , col.rgb ,getShadowMask());

           gl_FragColor = vec4(addShadow, alpha);  
       }`,
	lights: true,
	transparent: true,
}


</script>