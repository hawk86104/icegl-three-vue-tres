// Based on https://oframe.github.io/ogl/examples/?src=mouse-flowmap.html by gordonnl

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
uniform sampler2D tFlow;

in vec2 vUv;

out vec4 FragColor;

void main() {
    // R and G values are velocity in the X and Y direction
    // B value is the velocity length
    vec3 flow = texture(tFlow, vUv).rgb;

    // Use flow to adjust the UV lookup of a texture
    vec2 uv = vUv;
    uv += flow.rg * 0.05;

    FragColor = texture(tMap, uv);
}
`;
