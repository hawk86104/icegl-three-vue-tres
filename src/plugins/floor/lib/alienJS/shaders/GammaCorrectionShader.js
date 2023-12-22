// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/GammaCorrectionShader.js by WestLangley

import encodings from './modules/encodings/encodings.glsl.js';

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

in vec2 vUv;

out vec4 FragColor;

${encodings}

void main() {
    FragColor = texture(tMap, vUv);

    FragColor = LinearToSRGB(FragColor);
}
`;
