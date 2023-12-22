// From https://oframe.github.io/ogl/examples/?src=mouse-flowmap.html by gordonnl

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

uniform float uFalloff;
uniform float uAlpha;
uniform float uDissipation;

uniform float uAspect;
uniform vec2 uMouse;
uniform vec2 uVelocity;

in vec2 vUv;

out vec4 FragColor;

void main() {
    vec4 color = texture(tMap, vUv) * uDissipation;

    vec2 cursor = vUv - uMouse;
    cursor.x *= uAspect;

    vec3 stamp = vec3(uVelocity * vec2(1, -1), 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));
    float falloff = smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha;

    color.rgb = mix(color.rgb, stamp, falloff);

    FragColor = color;
}
`;
