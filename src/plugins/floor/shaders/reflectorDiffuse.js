export const makeVertexShader = (shader) => {
	shader.vertexShader = shader.vertexShader.replace(
		'void main() {',
		/* glsl */ `
		uniform mat4 textureMatrix;
		out vec4 vCoord;
		out vec3 vToEye;

		void main() {
		`
	)

	shader.vertexShader = shader.vertexShader.replace(
		'#include <project_vertex>',
		/* glsl */ `
		#include <project_vertex>

		vCoord = textureMatrix * vec4(transformed, 1.0);
		vToEye = cameraPosition - (modelMatrix * vec4(transformed, 1.0)).xyz;
		`
	)
}

export const makeFragmentShader = (shader) => {
	shader.fragmentShader = shader.fragmentShader.replace(
		'void main() {',
		/* glsl */ `
		uniform sampler2D reflectMap;
		uniform float mirror;
		uniform float mixStrength;
		in vec4 vCoord;
		in vec3 vToEye;

		void main() {
		`
	)

	shader.fragmentShader = shader.fragmentShader.replace(
		'#include <emissivemap_fragment>',
		/* glsl */ `
		#include <emissivemap_fragment>

		vec4 normalColor = texture2D(normalMap, vNormalMapUv * normalScale);
		vec3 reflectNormal = normalize(vec3(normalColor.r * 2.0 - 1.0, normalColor.b, normalColor.g * 2.0 - 1.0));
		vec3 reflectCoord = vCoord.xyz / vCoord.w;
		vec2 reflectUv = reflectCoord.xy + reflectCoord.z * reflectNormal.xz * 0.05;
		vec4 reflectColor = texture2D(reflectMap, reflectUv);

		// Fresnel term
		vec3 toEye = normalize(vToEye);
		float theta = max(dot(toEye, normal), 0.0);
		float reflectance = pow((1.0 - theta), 5.0);

		reflectColor = mix(vec4(0), reflectColor, reflectance);

		diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + reflectColor.rgb * mixStrength);
		`
	)
}
