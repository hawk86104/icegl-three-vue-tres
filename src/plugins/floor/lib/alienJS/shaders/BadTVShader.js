import badtv from './modules/badtv/badtv.glsl.js';

export const vertexShader = /* glsl */ `
in vec3 position;
in vec2 uv;

out vec2 vUv;

void main() {
    vUv = uv;

    gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D tMap;
uniform float uDistortion;
uniform float uDistortion2;
uniform float uSpeed;
uniform float uRollSpeed;
uniform float uTime;

in vec2 vUv;

out vec4 FragColor;

${badtv}

void main() {
    FragColor = getBadTV(tMap, vUv, uTime, uDistortion, uDistortion2, uSpeed, uRollSpeed);
}
`;
