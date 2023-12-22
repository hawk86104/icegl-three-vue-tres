// Based on https://github.com/pmndrs/drei/blob/master/src/materials/DiscardMaterial.tsx

export const vertexShader = /* glsl */ `
in vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

out vec4 FragColor;

void main() {
    FragColor = vec4(0);
    discard;
}
`;
