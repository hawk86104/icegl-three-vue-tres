<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-05 16:39:29
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-05 17:35:47
-->
<template>
    <TresInstancedMesh ref="tmRef" :args="[null!, null!,88]">
        <TresSphereGeometry :args="[1, 64, 64]" />
        <CustomShaderMaterial
            :baseMaterial="THREE.MeshPhysicalMaterial"
            :vertexShader="shader.vertex"
            :fragmentShader="shader.fragment"
            :uniforms="uniforms"
            transparent
        />
    </TresInstancedMesh>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { CustomShaderMaterial } from '@tresjs/cientos'
import * as THREE from 'three'

import gln_perlin from 'PLS/floor/lib/alienJS/shaders/modules/noise/noise3d.glsl.js'

const tmRef = ref(null as any)

const shader = {
    vertex: `
    uniform float uTime;
		varying vec3 vPosition;
		${gln_perlin}
    vec3 displace(vec3 point) {
      vec3 instancePosition = (instanceMatrix * vec4(point, 1.)).xyz;
      return instancePosition + (normal * noise((instancePosition * 3.) + uTime) * 0.8);
    }  

    vec3 orthogonal(vec3 v) {
      return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
      : vec3(0.0, -v.z, v.y));
    }

    vec3 recalcNormals(vec3 newPos) {
      float offset = 0.001;
      vec3 tangent = orthogonal(normal);
      vec3 bitangent = normalize(cross(normal, tangent));
      vec3 neighbour1 = position + tangent * offset;
      vec3 neighbour2 = position + bitangent * offset;

      vec3 displacedNeighbour1 = displace(neighbour1);
      vec3 displacedNeighbour2 = displace(neighbour2);

      vec3 displacedTangent = displacedNeighbour1 - newPos;
      vec3 displacedBitangent = displacedNeighbour2 - newPos;

      return normalize(cross(displacedTangent, displacedBitangent));
    }

    void main() {
			vPosition = position;
      vec3 p = displace(position);
      csm_PositionRaw = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(p, 1.);
      csm_Normal = recalcNormals(p);
    }
    `,
    fragment: `
		varying vec3 vPosition;
		// 函数将 HSL 转换为 RGB
		vec3 hsl2rgb(float h, float s, float l) {
				float c = (1.0 - abs(2.0 * l - 1.0)) * s;
				float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));
				float m = l - c / 2.0;
				vec3 rgb;
				if (0.0 <= h && h < 1.0 / 6.0) {
						rgb = vec3(c, x, 0.0);
				} else if (1.0 / 6.0 <= h && h < 2.0 / 6.0) {
						rgb = vec3(x, c, 0.0);
				} else if (2.0 / 6.0 <= h && h < 3.0 / 6.0) {
						rgb = vec3(0.0, c, x);
				} else if (3.0 / 6.0 <= h && h < 4.0 / 6.0) {
						rgb = vec3(0.0, x, c);
				} else if (4.0 / 6.0 <= h && h < 5.0 / 6.0) {
						rgb = vec3(x, 0.0, c);
				} else if (5.0 / 6.0 <= h && h < 6.0 / 6.0) {
						rgb = vec3(c, 0.0, x);
				} else {
						rgb = vec3(0.0, 0.0, 0.0);
				}
				rgb += vec3(m);
				return rgb;
		}
    void main() {
      // csm_DiffuseColor = vec4(1.,1.,1.,1.);
			float h = mod(vPosition.x + vPosition.y + vPosition.z, 1.0); // 色相 H: [0, 1)
			float s = 0.9; // 饱和度 S: 固定为 0.8
			float l = 0.4; // 亮度 L: 固定为 0.5
			vec3 rgb = hsl2rgb(h, s, l);
			csm_DiffuseColor = vec4(rgb,1.);
    }
    `,
}
const uniforms = {
    uTime: {
        value: 0,
    },
}
const dummy = new THREE.Object3D()

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    uniforms.uTime.value = elapsed
})
watch(
    () => tmRef.value,
    (newVal) => {
        if (newVal) {
            let i = 0
            for (let x = 0; x < 88; x++) {
                dummy.position.set(Math.random(), Math.random(), Math.random())
                dummy.rotation.set(Math.random(), Math.random(), Math.random())
                dummy.position.multiplyScalar(10)

                dummy.position.x -= 5
                dummy.position.y -= 5
                dummy.position.z -= 5

                dummy.updateMatrix()
                newVal.setMatrixAt(i++, dummy.matrix)
            }
            newVal.instanceMatrix.needsUpdate = true
        }
    },
)
</script>
