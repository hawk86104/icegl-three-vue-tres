// Based on https://www.shadertoy.com/view/ltKBDd by battlebottle

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
uniform float uRedOffset;
uniform float uGreenOffset;
uniform float uBlueOffset;
uniform float uIntensity;

in vec2 vUv;

out vec4 FragColor;

void main() {
    float ro = 0.001 * uRedOffset * uIntensity;
    float go = 0.001 * uGreenOffset * uIntensity;
    float bo = 0.001 * uBlueOffset * uIntensity;

    float r = texture(tMap, vUv * (1.0 + ro) - (ro / 2.0)).r;
    float g = texture(tMap, vUv * (1.0 + go) - (go / 2.0)).g;
    float b = texture(tMap, vUv * (1.0 + bo) - (bo / 2.0)).b;

    FragColor = vec4(r, g, b, 1.0);
}
`;
