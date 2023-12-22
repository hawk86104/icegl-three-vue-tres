export const vertexShader = /* glsl */ `
in vec3 position;
in vec3 normal;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;

out vec3 vWorldNormal;
out vec3 vViewDirection;

void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
    vViewDirection = normalize(cameraPosition - worldPosition.xyz);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform vec3 uBaseColor;
uniform vec3 uFresnelColor;
uniform float uFresnelPower;

in vec3 vWorldNormal;
in vec3 vViewDirection;

out vec4 FragColor;

void main() {
    float fresnelFactor = abs(dot(vViewDirection, vWorldNormal));
    float inversefresnelFactor = 1.0 - fresnelFactor;

    // Shaping function
    fresnelFactor = pow(fresnelFactor, uFresnelPower);
    inversefresnelFactor = pow(inversefresnelFactor, uFresnelPower);

    FragColor = vec4(fresnelFactor * uBaseColor + inversefresnelFactor * uFresnelColor, 1.0);
}
`;
