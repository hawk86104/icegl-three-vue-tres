// Based on https://github.com/blaze33/droneWorld

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

uniform vec3 cameraPosition;

uniform sampler2D tMap;
uniform sampler2D tDepth;
uniform float uVelocityFactor;
uniform float uDelta;
uniform mat4 uClipToWorldMatrix;
uniform mat4 uWorldToClipMatrix;
uniform mat4 uPreviousWorldToClipMatrix;
uniform vec3 uCameraMove;

in vec2 vUv;

out vec4 FragColor;

const int samples = 20;

void main() {
    float fragCoordZ = texture(tDepth, vUv).x;

    // Viewport position at this pixel in the range -1 to 1
    vec4 clipPosition = vec4(vUv.x * 2.0 - 1.0, vUv.y * 2.0 - 1.0, fragCoordZ * 2.0 - 1.0, 1.0);

    vec4 worldPosition = uClipToWorldMatrix * clipPosition;
    worldPosition /= worldPosition.w;

    vec4 previousWorldPosition = worldPosition;
    previousWorldPosition.xyz -= uCameraMove;

    vec4 previousClipPosition = uPreviousWorldToClipMatrix * worldPosition;
    previousClipPosition /= previousClipPosition.w;
    vec4 translatedClipPosition = uWorldToClipMatrix * previousWorldPosition;
    translatedClipPosition /= translatedClipPosition.w;

    vec2 velocity = uVelocityFactor * (clipPosition - previousClipPosition).xy / uDelta * 16.67;
    velocity *= clamp(length(worldPosition.xyz - cameraPosition) / 1000.0, 0.0, 1.0);
    velocity += uVelocityFactor * (clipPosition - translatedClipPosition).xy / uDelta * 16.67;

    vec4 color = vec4(0);
    vec2 offset = vec2(0);

    for (int i = 0; i < samples; i++) {
        offset = velocity * (float(i) / (float(samples) - 1.0) - 0.5);
        color += texture(tMap, vUv + offset);
    }

    color /= float(samples);

    FragColor = vec4(color.rgb, 1.0);
}
`;
