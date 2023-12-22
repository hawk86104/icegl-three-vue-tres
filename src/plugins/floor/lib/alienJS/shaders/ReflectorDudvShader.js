// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/objects/Water2.js by Mugen87

import dither from './modules/dither/dither.glsl.js';

export const vertexShader = /* glsl */ `
in vec3 position;
in vec3 normal;
in vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

uniform mat3 uMapTransform;
uniform mat4 uMatrix;

out vec2 vUv;
out vec4 vCoord;
out vec3 vNormal;
out vec3 vToEye;

void main() {
    vUv = (uMapTransform * vec3(uv, 1.0)).xy;
    vCoord = uMatrix * vec4(position, 1.0);
    vNormal = normalMatrix * normal;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vToEye = cameraPosition - worldPosition.xyz;

    vec4 mvPosition = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D tMap;
uniform sampler2D tReflect;
uniform sampler2D tReflectBlur;
uniform float uReflectivity;

in vec2 vUv;
in vec4 vCoord;
in vec3 vNormal;
in vec3 vToEye;

out vec4 FragColor;

${dither}

void main() {
    vec2 reflectionUv = vCoord.xy / vCoord.w;

    vec4 dudv = texture(tMap, vUv);
    vec4 color = texture(tReflect, reflectionUv);

    vec4 blur;

    blur = texture(tReflectBlur, reflectionUv + dudv.rg / 256.0);
    color = mix(color, blur, smoothstep(1.0, 0.1, dudv.g));

    blur = texture(tReflectBlur, reflectionUv);
    color = mix(color, blur, smoothstep(0.5, 1.0, dudv.r));

    FragColor = color * mix(0.6, 0.75, dudv.g);

    // Fresnel term
    vec3 toEye = normalize(vToEye);
    float theta = max(dot(toEye, vNormal), 0.0);
    float reflectance = uReflectivity + (1.0 - uReflectivity) * pow((1.0 - theta), 5.0);

    FragColor = mix(vec4(0), FragColor, reflectance);

    #ifdef DITHERING
        FragColor.rgb = dither(FragColor.rgb);
    #endif

    FragColor.a = 1.0;
}
`;
