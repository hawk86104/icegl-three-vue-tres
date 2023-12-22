// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/LuminosityHighPassShader.js by bhouston

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
uniform float uThreshold;
uniform float uSmoothing;

in vec2 vUv;

out vec4 FragColor;

void main() {
    vec4 texel = texture(tMap, vUv);
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float v = dot(texel.xyz, luma);
    float alpha = smoothstep(uThreshold, uThreshold + uSmoothing, v);

    FragColor = mix(vec4(0), texel, alpha);
}
`;
