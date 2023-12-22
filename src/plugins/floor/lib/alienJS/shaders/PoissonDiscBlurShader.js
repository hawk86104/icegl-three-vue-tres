import blur from './modules/blur/poisson-disc-blur12.glsl.js';
import blueNoise from './modules/noise/blue-noise.glsl.js';

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
uniform sampler2D tBlueNoise;
uniform vec2 uBlueNoiseResolution;
uniform float uRadius;
uniform vec2 uResolution;
uniform float uTime;

in vec2 vUv;

out vec4 FragColor;

vec2 rot2d(vec2 p, float a) {
    vec2 sc = vec2(sin(a), cos(a));
    return vec2(dot(p, vec2(sc.y, -sc.x)), dot(p, sc.xy));
}

${blur}
${blueNoise}

void main() {
    float rnd = getBlueNoise(tBlueNoise, gl_FragCoord.xy, uBlueNoiseResolution, vec2(fract(uTime)));
    vec4 basis = vec4(rot2d(vec2(1, 0), rnd), rot2d(vec2(0, 1), rnd));

    FragColor = poissonSample(tMap, vUv, uResolution, uRadius, basis);
}
`;
