/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 15:17:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-25 16:06:29
 */
import * as THREE from "three"

export const getVertexShader = () => {
	return `
       varying vec2 vUv;
			 	${THREE.ShaderChunk["common"]}
      	${THREE.ShaderChunk["bsdfs"]}
      	${THREE.ShaderChunk["shadowmap_pars_vertex"]}
       void main() {
					${THREE.ShaderChunk['beginnormal_vertex']}
          ${THREE.ShaderChunk['defaultnormal_vertex']}
          ${THREE.ShaderChunk["begin_vertex"]}
          ${THREE.ShaderChunk["project_vertex"]}
          ${THREE.ShaderChunk["worldpos_vertex"]}
          ${THREE.ShaderChunk["shadowmap_vertex"]}

           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);    
           vUv = uv;
       }`
}

export const getFragmentShader = () => {
	return `
	varying vec2 vUv;
	uniform sampler2D uTexture;
	uniform vec3 uShadowColor;
	uniform vec3 uColor;
	uniform float fEdge;
	// ShaderMaterial 下的 纹理参数重复无效 要在着色器中增加
	float repeatTime = 100.0;

	float smoothsteps(float t) {
			return t * t * (3.0 - 2.0 * t);
	}

	 ${THREE.ShaderChunk["common"]}
	 ${THREE.ShaderChunk["packing"]}
	 ${THREE.ShaderChunk["bsdfs"]}
	 ${THREE.ShaderChunk["lights_pars_begin"]}
	 ${THREE.ShaderChunk["shadowmap_pars_fragment"]}
	 ${THREE.ShaderChunk["shadowmask_pars_fragment"]}

	void main() {
			vec4 col = texture2D(uTexture, vUv * repeatTime);
			col.rgb = mix( uColor , col.rgb ,0.5);
			
			float alpha = 1.0;
			float d = length(vUv - vec2(0.5));
			if(d > 0.35) {
					alpha = 1.0 - smoothsteps( clamp( (d - 0.35) / (fEdge-0.2), 0.0, 1.0) );
			}

		 vec3 addShadow = mix( uShadowColor , col.rgb ,getShadowMask());

			gl_FragColor = vec4(addShadow, alpha);  
	}`
}
