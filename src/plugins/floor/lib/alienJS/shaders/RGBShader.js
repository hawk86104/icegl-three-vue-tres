import rgbshift from './modules/rgbshift/rgbshift.glsl.js';

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
uniform float uAngle;
uniform float uAmount;

in vec2 vUv;

out vec4 FragColor;

${rgbshift}

void main() {
    FragColor = getRGB(tMap, vUv, uAngle, uAmount);
}
`;
