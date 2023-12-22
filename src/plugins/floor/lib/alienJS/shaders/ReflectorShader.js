// Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/objects/Water2.js by Mugen87

import dither from './modules/dither/dither.glsl.js';

export const vertexShader = /* glsl */ `
in vec3 position;
in vec3 normal;
in vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

uniform mat3 uMapTransform;
uniform mat4 uMatrix;

out vec2 vUv;
out vec4 vCoord;
out vec3 vNormal;
out vec3 vToEye;

void main() {
    vUv = (uMapTransform * vec3(uv, 1.0)).xy;
    vCoord = uMatrix * vec4(position, 1.0);
    vNormal = normalMatrix * normal;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vToEye = cameraPosition - worldPosition.xyz;

    vec4 mvPosition = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D tReflect;
uniform vec3 uColor;
uniform float uReflectivity;
uniform float uMirror;
uniform float uMixStrength;

#ifdef USE_MAP
    uniform sampler2D tMap;
#endif

#ifdef USE_NORMALMAP
    uniform sampler2D tNormalMap;
    uniform vec2 uNormalScale;
#endif

#ifdef USE_FOG
    uniform vec3 uFogColor;
    uniform float uFogNear;
    uniform float uFogFar;
#endif

in vec2 vUv;
in vec4 vCoord;
in vec3 vNormal;
in vec3 vToEye;

out vec4 FragColor;

${dither}

void main() {
    #ifdef USE_MAP
        vec4 color = texture(tMap, vUv);
    #else
        vec4 color = vec4(uColor, 1.0);
    #endif

    #ifdef USE_NORMALMAP
        vec4 normalColor = texture(tNormalMap, vUv * uNormalScale);
        vec3 normal = normalize(vec3(normalColor.r * 2.0 - 1.0, normalColor.b, normalColor.g * 2.0 - 1.0));
        vec3 coord = vCoord.xyz / vCoord.w;
        vec2 uv = coord.xy + coord.z * normal.xz * 0.05;
        vec4 reflectColor = texture(tReflect, uv);
    #else
        vec3 normal = vNormal;
        vec4 reflectColor = textureProj(tReflect, vCoord);
    #endif

    // Fresnel term
    vec3 toEye = normalize(vToEye);
    float theta = max(dot(toEye, normal), 0.0);
    float reflectance = uReflectivity + (1.0 - uReflectivity) * pow((1.0 - theta), 5.0);

    reflectColor = mix(vec4(0), reflectColor, reflectance);

    FragColor.rgb = color.rgb * ((1.0 - min(1.0, uMirror)) + reflectColor.rgb * uMixStrength);

    #ifdef USE_FOG
        float fogDepth = gl_FragCoord.z / gl_FragCoord.w;
        float fogFactor = smoothstep(uFogNear, uFogFar, fogDepth);

        FragColor.rgb = mix(FragColor.rgb, uFogColor, fogFactor);
    #endif

    #ifdef DITHERING
        FragColor.rgb = dither(FragColor.rgb);
    #endif

    FragColor.a = 1.0;
}
`;
