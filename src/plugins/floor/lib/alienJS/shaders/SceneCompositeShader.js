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

uniform sampler2D tScene;
uniform sampler2D tBloom;

in vec2 vUv;

out vec4 FragColor;

void main() {
    FragColor = texture(tScene, vUv);

    FragColor.rgb += texture(tBloom, vUv).rgb;
}
`;
