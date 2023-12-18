uniform float uScale;//最大扩散
uniform float uGradual;//建变系数
uniform float uTime;
uniform vec3 uColor;//扩散颜色
uniform vec3 uSrcColor;//原始颜色
varying vec3 vPosition;

void main(){
	float dis=distance(vPosition.xz,vec2(.0,.0));
	if(dis>uScale){
		discard;
	}
	float opacity=smoothstep(uScale/uGradual*uTime,uScale*uTime,dis);
	opacity*=step(dis,uScale*uTime);
	
	if(opacity<.3){
		gl_FragColor=vec4(uSrcColor,1.-opacity);
	}else{
		gl_FragColor=vec4(uColor,opacity);
	}
	// gl_FragColor=vec4(uColor,opacity);
}
