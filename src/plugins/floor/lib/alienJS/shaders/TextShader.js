// Based on https://oframe.github.io/ogl/examples/?src=msdf-text.html by gordonnl

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
uniform vec3 uColor;
uniform float uAlpha;

in vec2 vUv;

out vec4 FragColor;

void main() {
    vec3 tex = texture(tMap, vUv).rgb;
    float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
    float d = fwidth(signedDist);
    float alpha = smoothstep(-d, d, signedDist);

    alpha *= uAlpha;

    if (alpha < 0.01) {
        discard;
    }

    FragColor.rgb = uColor;
    FragColor.a = alpha;
}
`;
