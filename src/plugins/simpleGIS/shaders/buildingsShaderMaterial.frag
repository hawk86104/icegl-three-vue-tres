uniform mat4 modelMatrix;
varying vec4 vPosition;
uniform vec3 uMax;
uniform vec3 uMin;
uniform float uOpacity;
uniform float uBorderWidth;
uniform vec3 uLightColor;
uniform vec3 uColor;
uniform float uCircleTime;
uniform float uTime;
uniform vec3 uTopColor;//顶部颜色
uniform bool uGradient;
vec4 uMax_world;
vec4 uMin_world;
void main(){
	// 转世界坐标
	uMax_world=modelMatrix*vec4(uMax,1.);
	uMin_world=modelMatrix*vec4(uMin,1.);
	vec3 distColor=uColor;
	float residue=uTime-floor(uTime/uCircleTime)*uCircleTime;
	float rate=residue/uCircleTime;
	float lightOffset=rate*(uMax_world.z-uMin_world.z);
	
	if(uMin_world.z+lightOffset<vPosition.z&&uMin_world.z+lightOffset+uBorderWidth>vPosition.z){
		csm_DiffuseColor=vec4(uLightColor,uOpacity);
	}else{
		csm_DiffuseColor=vec4(distColor,uOpacity);
	}
	
	//根据高度计算颜色
	if(uGradient){
		float rateHight=(vPosition.z-uMin_world.z)/(uMax_world.z-uMin_world.z);
		// if(rateHight<=.007){
			// 	rateHight=1.;
		// }
		float mixNumber=clamp(rateHight*2.3-1.5,0.,1.);
		vec3 outColor=mix(csm_DiffuseColor.xyz,uTopColor,mixNumber);
		csm_DiffuseColor=vec4(outColor,uOpacity);
	}
}