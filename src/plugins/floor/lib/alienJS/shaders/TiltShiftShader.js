// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/HorizontalTiltShiftShader.js by alteredq
// Based on https://github.com/spite/codevember-2016

import smootherstep from './modules/smootherstep/smootherstep.glsl.js';
import blur from './modules/blur/blur.glsl.js';

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
uniform float uFocus;
uniform float uBluriness;
uniform vec2 uDirection;
uniform vec2 uResolution;

in vec2 vUv;

out vec4 FragColor;

${smootherstep}
${blur}

void main() {
    float d = abs(uFocus - vUv.y);

    FragColor = blur(tMap, vUv, uResolution, uBluriness * smootherstep(0.0, 1.0, d) * uDirection);
}
`;
