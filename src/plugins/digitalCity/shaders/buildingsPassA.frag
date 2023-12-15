varying vec2 vUv;
varying vec3 vPosition;
uniform sampler2D tDiffuse;
uniform sampler2D depthTexture;

uniform mat4 uProjectionInverse;
uniform mat4 uMatrixWorld;

uniform float time;
uniform vec3 uColor;
uniform float uScalenum;//最大范围
uniform float uScaleone;//单条圈间距
uniform float uWidth;//单条厚度
uniform vec2 uPosition;//位置

vec3 WorldPosFromDepth(float depth){
	float z=(depth-.5)*2.;
	vec4 clipSpacePosition=vec4(vPosition.xy,z,1.);
	vec4 viewSpacePosition=uProjectionInverse*clipSpacePosition;
	viewSpacePosition/=viewSpacePosition.w;
	vec4 worldSpacePosition=uMatrixWorld*viewSpacePosition;
	return worldSpacePosition.xyz;
}
vec3 WorldPosFromDepth2(float depth){
	// 规范化设备坐标系 ndc (Normalized Device Coordinates)
	vec4 ndc=vec4(vPosition.x,vPosition.y,((depth-.5)*2.),1.);
	// 根据视图中的位置和深度逆向MVP (ModelViewProjectionMatrix) 以获取真实渲染的位置
	vec4 worldSpacePosition=uMatrixWorld*uProjectionInverse*ndc;
	// 由于透视相机视图区域是一个截锥体 在乘以矩阵后，结果不在同一个射影空间上（这意味着 w 分量不是每个顶点的 1）
	// 为了完成转换，我们需要将向量的每个分量除以 w 分量本身
	// 这一步正常渲染时在GPU中做 我们复原需要手动处理
	worldSpacePosition/=worldSpacePosition.w;
	return worldSpacePosition.xyz;
}

void main(){
	vec4 base=texture2D(tDiffuse,vUv);//之前的纹理
	float depth=texture2D(depthTexture,vUv).r;
	
	// vec3 pos=WorldPosFromDepth(depth);
	vec3 pos=WorldPosFromDepth2(depth);
	pos.x=pos.x+uPosition.x;
	pos.z=pos.z+uPosition.y;
	float dis=distance(pos.xz,vec2(0,0));
	vec3 color=vec3(base);
	if(pos.y<=0.){
		discard;
	}
	if(dis<uScalenum){
		vec3 scanT=uColor;
		float wave=fract((dis-time*10.)/uScaleone);
		if(wave<uWidth){
			float p=wave/uWidth;
			color=mix(color,scanT+.1,p*(1.-(dis/uScalenum)));
		}
	}
	gl_FragColor=vec4(color,1.);
}
