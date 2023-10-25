<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-24 16:33:55
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-25 11:16:09
-->
<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { ref, watchEffect } from 'vue';
import * as THREE from 'three'
// import { toRaw } from 'vue'
const props = withDefaults(defineProps<{
	model: any
	bulidingsColor?: string
	landColor?: string
	opacity?: number
}>(), {
	bulidingsColor: '#d88de2',
	landColor: '#112233',
	opacity: 0.9
})
const timeDelta = ref(0)
const CITY_UNTRIANGULATED = props.model.city
CITY_UNTRIANGULATED.renderOrder = 1001
const LANDMASS = props.model.land
const setColorMaterial = (type: any, param: string) => {
	let materials
	if (type === 'cu') {
	} else if (type === 'land') {
		// 设置城市地面（mesh物体），材质基本颜色
		materials = Array.isArray(LANDMASS.material) ? LANDMASS.material : [LANDMASS.material]
		materials.forEach((material) => {
			// material.opacity = 0.8;
			// material.transparent = true;
			material[param].setStyle(props.landColor);
			material.side = THREE.DoubleSide //双面渲染
		})
	}
}
const setEffectMaterial = () => {
	const { geometry } = CITY_UNTRIANGULATED;
	geometry.computeBoundingBox()
	geometry.computeBoundingSphere()
	const { max, min } = geometry.boundingBox;

	CITY_UNTRIANGULATED.material.dispose()

	const uniformsConfig =
		THREE.UniformsUtils.merge([
			THREE.UniformsLib["lights"], {
				uMax: { value: max },
				uMin: { value: min },
				uBorderWidth: { value: 5 },
				uCircleTime: { value: 5 },
				// uTime: timeDelta, !! bug 注意 直接这样赋值再 merge 会无法跟踪值的变化
				uColor: {
					value: new THREE.Color(props.bulidingsColor)
				},
				uOpacity: {
					value: props.opacity
				},
				uLightColor: {
					value: new THREE.Color('#ffffff')
				}
			},
		])
	uniformsConfig.uTime = timeDelta//!! 见上
	CITY_UNTRIANGULATED.material = new THREE.ShaderMaterial({
		depthWrite: true,
		depthTest: true,
		transparent: true,
		side: THREE.DoubleSide,//双面渲染
		lights: true,
		uniforms: uniformsConfig,
		vertexShader: `
			varying vec4 vPosition;
			varying vec3 vNormal;
			void main() {
				vec4 worldNormal = modelMatrix * vec4(normal, 0.0);
  			vNormal = normalize(worldNormal.xyz);
				vNormal = vec3(1.0, 1.0, 1.0);

				vPosition = modelMatrix * vec4(position,1.0);
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
`,
		fragmentShader: `	
			#if NUM_DIR_LIGHTS > 0
				struct DirectionalLight {
						vec3 direction;
						vec3 color;
				};
				uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
			#endif	
			uniform vec3 uColor;  
			uniform float uOpacity;  
			uniform float uTime; 
			uniform mat4 modelMatrix;
			varying vec4 vPosition;
			uniform vec3 uMax; 
			uniform vec3 uMin; 
			uniform float uBorderWidth; 
			uniform vec3 uLightColor;
			uniform float uCircleTime; 
			vec4 uMax_world;
			vec4 uMin_world;
			varying vec3 vNormal;
			uniform vec3 ambientLightColor;
			void main() {
				// 转世界坐标
				uMax_world =  modelMatrix * vec4(uMax,1.0);
				uMin_world =  modelMatrix * vec4(uMin,1.0);
				float residue = uTime - floor(uTime / uCircleTime) * uCircleTime;
				float rate = residue / uCircleTime;
				float lightOffset = rate * (uMax_world.y - uMin_world.y);

				if (uMin_world.y + lightOffset < vPosition.y && uMin_world.y + lightOffset + uBorderWidth > vPosition.y) {
					gl_FragColor = vec4(uLightColor, 1.0);
				} else {
					// 计算定向光照强度
					vec3 lightDirection = normalize(directionalLights[0].direction);
					float intensity = dot(vNormal, lightDirection);
					intensity = smoothstep(0.0, 0.1, intensity);
					vec3 outColor = mix(uColor, uColor*intensity, 0.2);
					gl_FragColor = vec4(outColor, uOpacity);
				}
			}
`
	})

}
setEffectMaterial()

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
	timeDelta.value += delta;
})
watchEffect(() => {
	if (props.bulidingsColor) {
		CITY_UNTRIANGULATED.material.uniforms.uColor.value.setStyle(props.bulidingsColor)
	}
	if (props.landColor) {
		setColorMaterial('land', 'color')
	}
	if (props.opacity) {
		CITY_UNTRIANGULATED.material.uniforms.uOpacity.value = props.opacity
	}
});
</script>

<template>
	<primitive :object="props.model.model.clone()">
	</primitive>
</template>