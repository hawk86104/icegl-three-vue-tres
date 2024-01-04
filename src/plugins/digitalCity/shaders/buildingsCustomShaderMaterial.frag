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
	float lightOffset=rate*(uMax_world.y-uMin_world.y);
	
	if(uMin_world.y+lightOffset<vPosition.y&&uMin_world.y+lightOffset+uBorderWidth>vPosition.y){
		csm_DiffuseColor=vec4(uLightColor,uOpacity);
	}else{
		csm_DiffuseColor=vec4(distColor,uOpacity);
	}
	
	//根据高度计算颜色
	if(uGradient){
		float rateHight=(vPosition.y-uMin_world.y)/(uMax_world.y-uMin_world.y);
		vec3 outColor=mix(csm_DiffuseColor.xyz,uTopColor,rateHight*2.);
		csm_DiffuseColor=vec4(outColor,uOpacity);
	}
}