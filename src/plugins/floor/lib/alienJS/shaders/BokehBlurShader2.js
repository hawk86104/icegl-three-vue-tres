// Based on https://www.shadertoy.com/view/4lVfDt by battlebottle

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

#define PI          3.14
#define TWO_PI      6.28
#define MAX_SAMPLES 20.0

uniform sampler2D tMap;
uniform float uScale;
uniform vec2 uResolution;

in vec2 vUv;

out vec4 FragColor;

const float blurRadMax = 0.08;
const float blurCircles = 3.0;

void main() {
    float blurRadius = blurRadMax * uScale * 0.3;

    float totalSamples = 0.0;
    vec3 colAcum = vec3(0.0);

    for (float currentCircle = 0.0; currentCircle < blurCircles; currentCircle++) {
        float samplesForCurrentCircle = (pow(currentCircle + 1.0, 2.0) - pow(currentCircle, 2.0)) * 4.0;
        float currentRadius = (blurRadius / blurCircles) * (currentCircle + 0.5);

        for (float currentSample = 0.0; currentSample < MAX_SAMPLES; currentSample++) {
            if (currentSample >= samplesForCurrentCircle) break;

            vec2 samplePoint = vec2(0.0, currentRadius);
            float angle = TWO_PI * ((currentSample + 0.5) / samplesForCurrentCircle);

            float s = sin(angle);
            float c = cos(angle);
            mat2 m = mat2(c, -s, s, c);
            samplePoint = m * samplePoint;

            samplePoint *= vec2(uResolution.y / uResolution.x, 1.0);

            totalSamples++;
            colAcum = max(colAcum, texture(tMap, vUv + samplePoint).rgb);
        }
    }

    FragColor = vec4(colAcum, 1.0);
}
`;
