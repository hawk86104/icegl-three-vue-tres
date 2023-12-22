/**
 * @author pschroen / https://ufo.ai/
 *
 * Based on https://threejs.org/examples/#webgl_shadowmap_pcss by spidersharma03
 */

import { ShaderChunk } from 'three';

export class SoftShadows {
    static init({
        size = 0.005,
        frustum = 3.75,
        near = 9.5,
        samples = 17,
        rings = 11
    } = {}) {
        let shader = ShaderChunk.shadowmap_pars_fragment;

        shader = shader.replace(
            '#ifdef USE_SHADOWMAP',
            /* glsl */ `
            #ifdef USE_SHADOWMAP

            #define LIGHT_WORLD_SIZE ${size.toFixed(3)}
            #define LIGHT_FRUSTUM_WIDTH ${frustum.toFixed(2)}
            #define LIGHT_SIZE_UV (LIGHT_WORLD_SIZE / LIGHT_FRUSTUM_WIDTH)
            #define NEAR_PLANE ${near.toFixed(1)}

            #define NUM_SAMPLES ${samples.toFixed(0)}
            #define NUM_RINGS ${rings.toFixed(0)}
            #define BLOCKER_SEARCH_NUM_SAMPLES NUM_SAMPLES

            vec2 poissonDisk[NUM_SAMPLES];

            void initPoissonSamples(vec2 randomSeed) {
                float ANGLE_STEP = PI2 * float(NUM_RINGS) / float(NUM_SAMPLES);
                float INV_NUM_SAMPLES = 1.0 / float(NUM_SAMPLES);

                // JSFiddle that shows sample pattern: https://jsfiddle.net/a16ff1p7/
                float angle = rand(randomSeed) * PI2;
                float radius = INV_NUM_SAMPLES;
                float radiusStep = radius;

                for (int i = 0; i < NUM_SAMPLES; i++) {
                    poissonDisk[i] = vec2(cos(angle), sin(angle)) * pow(radius, 0.75);
                    radius += radiusStep;
                    angle += ANGLE_STEP;
                }
            }

            float penumbraSize(float zReceiver, float zBlocker) { // Parallel plane estimation
                return (zReceiver - zBlocker) / zBlocker;
            }

            float findBlocker(sampler2D shadowMap, vec2 uv, float zReceiver) {
                // This uses similar triangles to compute what
                // area of the shadow map we should search
                float searchRadius = LIGHT_SIZE_UV * (zReceiver - NEAR_PLANE) / zReceiver;
                float blockerDepthSum = 0.0;
                int numBlockers = 0;

                for (int i = 0; i < BLOCKER_SEARCH_NUM_SAMPLES; i++) {
                    float shadowMapDepth = unpackRGBAToDepth(texture2D(shadowMap, uv + poissonDisk[i] * searchRadius));
                    if (shadowMapDepth < zReceiver) {
                        blockerDepthSum += shadowMapDepth;
                        numBlockers++;
                    }
                }

                if (numBlockers == 0) return -1.0;

                return blockerDepthSum / float(numBlockers);
            }

            float PCF_Filter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius) {
                float sum = 0.0;
                float depth;
                #pragma unroll_loop_start
                for (int i = 0; i < NUM_SAMPLES; i++) {
                    depth = unpackRGBAToDepth(texture2D(shadowMap, uv + poissonDisk[i] * filterRadius));
                    if (zReceiver <= depth) sum += 1.0;
                }
                #pragma unroll_loop_end
                #pragma unroll_loop_start
                for (int i = 0; i < NUM_SAMPLES; i++) {
                    depth = unpackRGBAToDepth(texture2D(shadowMap, uv + -poissonDisk[i].yx * filterRadius));
                    if (zReceiver <= depth) sum += 1.0;
                }
                #pragma unroll_loop_end
                return sum / (2.0 * float(NUM_SAMPLES));
            }

            float PCSS(sampler2D shadowMap, vec4 coords) {
                vec2 uv = coords.xy;
                float zReceiver = coords.z; // Assumed to be eye-space z in this code

                initPoissonSamples(uv);

                // Blocker search
                float avgBlockerDepth = findBlocker(shadowMap, uv, zReceiver);

                // There are no occluders so early out (this saves filtering)
                if (avgBlockerDepth == -1.0) return 1.0;

                // Penumbra size
                float penumbraRatio = penumbraSize(zReceiver, avgBlockerDepth);
                float filterRadius = penumbraRatio * LIGHT_SIZE_UV * NEAR_PLANE / zReceiver;

                // Filtering
                return PCF_Filter(shadowMap, uv, zReceiver, filterRadius);
            }
            `
        );

        shader = shader.replace(
            '#if defined( SHADOWMAP_TYPE_PCF )',
            /* glsl */ `
            return PCSS(shadowMap, shadowCoord);

            #if defined( SHADOWMAP_TYPE_PCF )
            `
        );

        ShaderChunk.shadowmap_pars_fragment = shader;
    }
}
