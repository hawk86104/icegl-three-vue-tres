import * as THREE from 'three'

export function transToVertexSnappingMaterial(curMaterial: THREE.Material, snappingResolution: number = 6) {
    const uSnappingResolution = { value: snappingResolution }
    curMaterial.onBeforeCompile = (material) => {
        material.uniforms.uSnappingResolution = uSnappingResolution
        material.vertexShader = material.vertexShader.replace(
            '#include <common>',
            `
				#include <common>
				uniform float uSnappingResolution;
		`,
        )
        material.vertexShader = material.vertexShader.replace(
            '#include <project_vertex>',
            `
				vec4 mvPosition = vec4( transformed, 1.0 );
	
				#ifdef USE_BATCHING
					mvPosition = batchingMatrix * mvPosition;
				#endif
	
				#ifdef USE_INSTANCING
					mvPosition = instanceMatrix * mvPosition;
				#endif
	
				mvPosition = modelMatrix * mvPosition;
	
				mvPosition = vec4(
					round(mvPosition.x * uSnappingResolution) / uSnappingResolution,
					round(mvPosition.y * uSnappingResolution) / uSnappingResolution,
					round(mvPosition.z * uSnappingResolution) / uSnappingResolution,
					1.0);
				mvPosition = viewMatrix * mvPosition;
				gl_Position = projectionMatrix * mvPosition;
		`,
        )
    }
    return uSnappingResolution
}
