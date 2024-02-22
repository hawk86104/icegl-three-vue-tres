precision highp float;
#define ambientRatio .5
#define diffuseRatio .4
#define specularRatio .1

attribute vec2 faceUv;
uniform vec4 u_color;
varying vec2 v_texCoord;
varying vec4 v_color;
varying float v_lightWeight;

void main(){
	
	mat4 matModelViewProjection=projectionMatrix*modelViewMatrix;
	
	v_texCoord=faceUv;
	
	if(normal==vec3(0.,0.,1.)){
		v_color=u_color;
		gl_Position=matModelViewProjection*vec4(position,1.);
		return;
	}
	
	vec3 worldPos=vec3(vec4(position,1.)*modelMatrix);
	vec3 worldNormal=vec3(vec4(normal,1.)*modelMatrix);// N
	// //cal light weight  光亮度的权重
	vec3 viewDir=normalize(cameraPosition-worldPos);// V
	// 光照的方向， 前上方    Ild = k*I*(N·L)
	vec3 lightDir=normalize(vec3(0.,-10.,1.));// L
	vec3 halfDir=normalize(viewDir+lightDir);
	// //lambert
	float lambert=dot(worldNormal,lightDir);
	//specular  //反射
	float specular=pow(max(0.,dot(worldNormal,halfDir)),32.);
	//sum to light weight  （lambert + 环境光）  Idiff = Iad + Ild = k*Ia + k*Il*（N·L）
	float lightWeight=ambientRatio+diffuseRatio*lambert+specularRatio*specular;
	v_texCoord=faceUv;
	v_lightWeight=lightWeight;
	
	// 根据光照方向，调整光线明暗
	
	// v_lightWeight =  pow( 0.0 + 1.0 * abs(dot(worldNormal, worldPos)), 2.0);
	
	v_color=vec4(u_color.rgb*v_lightWeight,u_color.w);
	
	gl_Position=matModelViewProjection*vec4(position,1.);
}