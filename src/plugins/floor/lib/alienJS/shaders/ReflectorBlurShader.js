// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/HorizontalTiltShiftShader.js by alteredq
// Based on https://github.com/spite/codevember-2016

import smootherstep from './modules/smootherstep/smootherstep.glsl.js';
import blur13 from './modules/blur/blur13.glsl.js';

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
uniform vec2 uDirection;
uniform vec2 uResolution;

in vec2 vUv;

out vec4 FragColor;

${smootherstep}
${blur13}

void main() {
    FragColor = blur13(tMap, vUv, uResolution, smootherstep(1.0, 0.0, vUv.y) * uDirection);
}
`;
