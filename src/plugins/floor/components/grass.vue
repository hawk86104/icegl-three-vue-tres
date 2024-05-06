<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-25 08:31:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-06 10:54:49
-->
<template>
    <TresGroup>
        <TresMesh :material="gm">
            <TresInstancedBufferGeometry
                :index="baseGeom.index"
                :attributes-position="baseGeom.attributes.position"
                :attributes-uv="baseGeom.attributes.uv"
                :attributes-offset="attributeData.offsetsF32"
                :attributes-orientation="attributeData.orientationsF32"
                :attributes-stretch="attributeData.stretchesF32"
                :attributes-halfRootAngleSin="attributeData.halfRootAngleSinF32"
                :attributes-halfRootAngleCos="attributeData.halfRootAngleCosF32"
            />
        </TresMesh>
        <TresMesh :position="[0, 0, 0]" :geometry="groundGeo">
            <TresMeshStandardMaterial color="#000f00" :side="THREE.DoubleSide" />
        </TresMesh>
    </TresGroup>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'
import { useTexture, useRenderLoop } from '@tresjs/core'
import { CientosShaderMaterial } from 'PLS/basic'

const pbrTexture = await useTexture({
    map: './plugins/floor/image/blade_diffuse.jpg',
    alphaMap: './plugins/floor/image/blade_alpha.jpg',
})

const props = withDefaults(
    defineProps<{
        bW?: number
        bH?: number
        joints?: number
        width?: number
        instances?: number
    }>(),
    {
        bW: 0.12,
        bH: 1,
        joints: 5,
        width: 100,
        instances: 50000,
    },
)

const noise2D = createNoise2D(Math.random)
function getAttributeData(instances, width) {
    const offsets = [] as any
    const orientations = [] as any
    const stretches = [] as any
    const halfRootAngleSin = [] as any
    const halfRootAngleCos = [] as any

    let quaternion_0 = new THREE.Vector4()
    let quaternion_1 = new THREE.Vector4()

    //The min and max angle for the growth direction (in radians)
    const min = -0.25
    const max = 0.25

    //For each instance of the grass blade
    for (let i = 0; i < instances; i++) {
        //Offset of the roots
        const offsetX = Math.random() * width - width / 2
        const offsetZ = Math.random() * width - width / 2
        const offsetY = getYPosition(offsetX, offsetZ)
        offsets.push(offsetX, offsetY, offsetZ)

        //Define random growth directions
        //Rotate around Y
        let angle = Math.PI - Math.random() * (2 * Math.PI)
        halfRootAngleSin.push(Math.sin(0.5 * angle))
        halfRootAngleCos.push(Math.cos(0.5 * angle))

        let RotationAxis = new THREE.Vector3(0, 1, 0)
        let x = RotationAxis.x * Math.sin(angle / 2.0)
        let y = RotationAxis.y * Math.sin(angle / 2.0)
        let z = RotationAxis.z * Math.sin(angle / 2.0)
        let w = Math.cos(angle / 2.0)
        quaternion_0.set(x, y, z, w).normalize()

        //Rotate around X
        angle = Math.random() * (max - min) + min
        RotationAxis = new THREE.Vector3(1, 0, 0)
        x = RotationAxis.x * Math.sin(angle / 2.0)
        y = RotationAxis.y * Math.sin(angle / 2.0)
        z = RotationAxis.z * Math.sin(angle / 2.0)
        w = Math.cos(angle / 2.0)
        quaternion_1.set(x, y, z, w).normalize()

        //Combine rotations to a single quaternion
        quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1)

        //Rotate around Z
        angle = Math.random() * (max - min) + min
        RotationAxis = new THREE.Vector3(0, 0, 1)
        x = RotationAxis.x * Math.sin(angle / 2.0)
        y = RotationAxis.y * Math.sin(angle / 2.0)
        z = RotationAxis.z * Math.sin(angle / 2.0)
        w = Math.cos(angle / 2.0)
        quaternion_1.set(x, y, z, w).normalize()

        //Combine rotations to a single quaternion
        quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1)

        orientations.push(quaternion_0.x, quaternion_0.y, quaternion_0.z, quaternion_0.w)

        //Define variety in height
        if (i < instances / 3) {
            stretches.push(Math.random() * 1.8)
        } else {
            stretches.push(Math.random())
        }
    }
    const offsetsF32 = new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3)
    const orientationsF32 = new THREE.InstancedBufferAttribute(new Float32Array(orientations), 4)
    const stretchesF32 = new THREE.InstancedBufferAttribute(new Float32Array(stretches), 1)
    const halfRootAngleCosF32 = new THREE.InstancedBufferAttribute(new Float32Array(halfRootAngleCos), 1)
    const halfRootAngleSinF32 = new THREE.InstancedBufferAttribute(new Float32Array(halfRootAngleSin), 1)
    return {
        offsetsF32,
        orientationsF32,
        stretchesF32,
        halfRootAngleCosF32,
        halfRootAngleSinF32,
    }
}
function multiplyQuaternions(q1, q2) {
    const x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x
    const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y
    const z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z
    const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w
    return new THREE.Vector4(x, y, z, w)
}
function getYPosition(x, z) {
    var y = 2 * noise2D(x / 50, z / 50)
    y += 4 * noise2D(x / 100, z / 100)
    y += 0.2 * noise2D(x / 10, z / 10)
    return y
}

const attributeData = getAttributeData(props.instances, props.width)
const baseGeom = new THREE.PlaneGeometry(props.bW, props.bH, 1, props.joints).translate(0, props.bH / 2, 0)
const groundGeo = new THREE.PlaneGeometry(props.width, props.width, 32, 32)
groundGeo.lookAt(new THREE.Vector3(0, 1, 0))
const pp = groundGeo.attributes.position
for (let i = 0; i < pp.array.length; i += 3) {
    pp.array[i + 1] = getYPosition(pp.array[i], pp.array[i + 2])
}
groundGeo.attributes.position.needsUpdate = true
groundGeo.computeVertexNormals()

const GrassMaterial = CientosShaderMaterial(
    {
        bladeHeight: 1,
        map: null,
        alphaMap: null,
        time: 0,
        tipColor: new THREE.Color(0.3, 0.9, 0.0).convertSRGBToLinear(),
        bottomColor: new THREE.Color(0.0, 0.2, 0.0).convertSRGBToLinear(),
    },
    `   precision mediump float;
      attribute vec3 offset;
      attribute vec4 orientation;
      attribute float halfrootanglesin;
      attribute float halfrootanglecos;
      attribute float stretch;
      uniform float time;
      uniform float bladeHeight;
      varying vec2 vUv;
      varying float frc;

      //WEBGL-NOISE FROM https://github.com/stegu/webgl-noise
      //Description : Array and textureless GLSL 2D simplex noise function. Author : Ian McEwan, Ashima Arts. Maintainer : stegu Lastmod : 20110822 (ijm) License : Copyright (C) 2011 Ashima Arts. All rights reserved. Distributed under the MIT License. See LICENSE file. https://github.com/ashima/webgl-noise https://github.com/stegu/webgl-noise
      vec3 mod289(vec3 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;} vec2 mod289(vec2 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;} vec3 permute(vec3 x) {return mod289(((x*34.0)+1.0)*x);} float snoise(vec2 v){const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439); vec2 i  = floor(v + dot(v, C.yy) ); vec2 x0 = v -   i + dot(i, C.xx); vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0); vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod289(i); vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 )); vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0); m = m*m ; m = m*m ; vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5); vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h ); vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw; return 130.0 * dot(m, g);}
      //END NOISE

      //https://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/
      vec3 rotateVectorByQuaternion( vec3 v, vec4 q){
        return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
      }

      //https://en.wikipedia.org/wiki/Slerp
      vec4 slerp(vec4 v0, vec4 v1, float t) {
        // Only unit quaternions are valid rotations.
        // Normalize to avoid undefined behavior.
        normalize(v0);
        normalize(v1);

        // Compute the cosine of the angle between the two vectors.
        float dot_ = dot(v0, v1);

        // If the dot product is negative, slerp won't take
        // the shorter path. Note that v1 and -v1 are equivalent when
        // the negation is applied to all four components. Fix by
        // reversing one quaternion.
        if (dot_ < 0.0) {
          v1 = -v1;
          dot_ = -dot_;
        }

        const float DOT_THRESHOLD = 0.9995;
        if (dot_ > DOT_THRESHOLD) {
          // If the inputs are too close for comfort, linearly interpolate
          // and normalize the result.
          vec4 result = t*(v1 - v0) + v0;
          normalize(result);
          return result;
        }

        // Since dot is in range [0, DOT_THRESHOLD], acos is safe
        float theta_0 = acos(dot_);       // theta_0 = angle between input vectors
        float theta = theta_0*t;          // theta = angle between v0 and result
        float sin_theta = sin(theta);     // compute this value only once
        float sin_theta_0 = sin(theta_0); // compute this value only once
        float s0 = cos(theta) - dot_ * sin_theta / sin_theta_0;  // == sin(theta_0 - theta) / sin(theta_0)
        float s1 = sin_theta / sin_theta_0;
        return (s0 * v0) + (s1 * v1);
      }

      void main() {
        //Relative position of vertex along the mesh Y direction
        frc = position.y/float(bladeHeight);
        //Get wind data from simplex noise
        float noise = 1.0-(snoise(vec2((time-offset.x/50.0), (time-offset.z/50.0))));
        //Define the direction of an unbent blade of grass rotated around the Y axis
        vec4 direction = vec4(0.0, halfrootanglesin, 0.0, halfrootanglecos);
        //Interpolate between the unbent direction and the direction of growth calculated on the CPU.
        //Using the relative location of the vertex along the Y axis as the weight, we get a smooth bend
        direction = slerp(direction, orientation, frc);
        vec3 vPosition = vec3(position.x, position.y + position.y * stretch, position.z);
        vPosition = rotateVectorByQuaternion(vPosition, direction);

       //Apply wind
       float halfAngle = noise * 0.15;
        vPosition = rotateVectorByQuaternion(vPosition, normalize(vec4(sin(halfAngle), 0.0, -sin(halfAngle), cos(halfAngle))));
        //UV for texture
        vUv = uv;
        //Calculate final position of the vertex from the world offset and the above shenanigans
        gl_Position = projectionMatrix * modelViewMatrix * vec4(offset + vPosition, 1.0 );
      }`,
    `
      precision mediump float;
      uniform sampler2D map;
      uniform sampler2D alphaMap;
      uniform vec3 tipColor;
      uniform vec3 bottomColor;
      varying vec2 vUv;
      varying float frc;

      void main() {
        //Get transparency information from alpha map
        float alpha = texture2D(alphaMap, vUv).r;
        //If transparent, don't draw
        if(alpha < 0.15) discard;
        //Get colour data from texture
        vec4 col = vec4(texture2D(map, vUv));
        //Add more green towards root
        col = mix(vec4(tipColor, 1.0), col, frc);
        //Add a shadow towards root
        col = mix(vec4(bottomColor, 1.0), col, frc);
        gl_FragColor = col;

        #include <tonemapping_fragment>
	      #include <colorspace_fragment>
      }`,
    (self) => {
        self.side = THREE.DoubleSide
    },
)
const gm = new GrassMaterial()
gm.map = pbrTexture.map
gm.alphaMap = pbrTexture.alphaMap
gm.toneMapped = false

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    gm.uniforms.time.value = elapsed / 4
})
</script>
