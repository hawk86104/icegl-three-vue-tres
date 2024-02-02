/**
 * @author pschroen / https://ufo.ai/
 */

import { ShaderChunk } from 'three';

export const PhongMaterialPatches = {
    // Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/SubsurfaceScatteringShader.js by daoshengmu
    subsurface(shader, mesh) {
        shader.uniforms = Object.assign(shader.uniforms, mesh.userData.subsurfaceUniforms);

        shader.fragmentShader = shader.fragmentShader.replace(
            'void main() {',
            /* glsl */ `
            uniform float thicknessDistortion;
            uniform float thicknessAmbient;
            uniform float thicknessAttenuation;
            uniform float thicknessPower;
            uniform float thicknessScale;

            void RE_Direct_Scattering(IncidentLight directLight, vec3 geometryPosition, vec3 geometryNormal, vec3 geometryViewDir, vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
                vec3 thickness = directLight.color * 0.8;
                vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
                float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
                vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * thickness;
                reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
            }

            void main() {
            `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <lights_fragment_begin>',
            ShaderChunk.lights_fragment_begin.replaceAll(
                'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
                /* glsl */ `
                RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
                RE_Direct_Scattering(directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
                `
            )
        );
    }
};

export const StandardMaterialPatches = {
    // Based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/shaders/SubsurfaceScatteringShader.js by daoshengmu
    // Based on https://gist.github.com/mattdesl/2ee82157a86962347dedb6572142df7c
    subsurface(shader, mesh) {
        shader.uniforms = Object.assign(shader.uniforms, mesh.userData.subsurfaceUniforms);

        shader.fragmentShader = shader.fragmentShader.replace(
            'void main() {',
            /* glsl */ `
            uniform float thicknessDistortion;
            uniform float thicknessAmbient;
            uniform float thicknessAttenuation;
            uniform float thicknessPower;
            uniform float thicknessScale;

            void RE_Direct_Scattering(IncidentLight directLight, vec3 geometryPosition, vec3 geometryNormal, vec3 geometryViewDir, vec3 geometryClearcoatNormal, PhysicalMaterial material, inout ReflectedLight reflectedLight) {
                vec3 thickness = directLight.color * 0.8;
                vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
                float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
                vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * thickness;
                reflectedLight.directDiffuse += material.diffuseColor * directLight.color * scatteringIllu * thicknessAttenuation;
            }

            void main() {
            `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <lights_fragment_begin>',
            ShaderChunk.lights_fragment_begin.replaceAll(
                'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
                /* glsl */ `
                RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
                RE_Direct_Scattering(directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight);
                `
            )
        );
    }
};
