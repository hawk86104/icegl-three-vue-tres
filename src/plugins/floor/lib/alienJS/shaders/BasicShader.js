export const vertexShader = /* glsl */ `
in vec3 position;
in vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec2 vUv;

void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D tMap;
uniform float uAlpha;

in vec2 vUv;

out vec4 FragColor;

void main() {
    FragColor = texture(tMap, vUv);
    FragColor.a *= uAlpha;
}
`;
