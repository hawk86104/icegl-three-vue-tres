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
uniform sampler2D tDepth1;
uniform sampler2D tDepth2;

in vec2 vUv;

out vec4 FragColor;

void main() {
    float d1 = texture(tDepth1, vUv).r;
    float d2 = texture(tDepth2, vUv).r;

    if (d1 < d2) {
        discard;
    }

    FragColor = texture(tMap, vUv);
}
`;
