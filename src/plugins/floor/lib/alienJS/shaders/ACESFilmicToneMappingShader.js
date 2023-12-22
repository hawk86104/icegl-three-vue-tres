// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/ACESFilmicToneMappingShader.js by WestLangley

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
uniform float uExposure;

in vec2 vUv;

out vec4 FragColor;

${encodings}

void main() {
    FragColor = texture(tMap, vUv);

    FragColor.rgb *= uExposure / 0.6; // Pre-exposed, outside of the tone mapping function

    FragColor = vec4(ACESFilmicToneMapping(FragColor.rgb), FragColor.a);
}
`;
