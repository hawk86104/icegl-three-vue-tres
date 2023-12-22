// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/AfterimageShader.js by HypnosNova

import when_gt from './modules/conditionals/when_gt.glsl.js';

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

uniform sampler2D tOld;
uniform sampler2D tNew;
uniform float uDamping;

in vec2 vUv;

out vec4 FragColor;

${when_gt}

void main() {
    vec4 texelOld = texture(tOld, vUv);
    vec4 texelNew = texture(tNew, vUv);

    texelOld *= uDamping * when_gt(texelOld, vec4(0.1));

    FragColor = max(texelNew, texelOld);
}
`;
