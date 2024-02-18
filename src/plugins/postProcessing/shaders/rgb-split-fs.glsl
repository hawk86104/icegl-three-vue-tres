varying vec2 vUv;
uniform sampler2D tInput;
uniform float x;
uniform float y;
uniform vec2 resolution;

void main(){
	
	vec2 dir=vUv-vec2(.5);
	float d=.7*length(dir);
	normalize(dir);
	vec2 value=d*dir*vec2(x,y);
	
	vec4 c1=texture2D(tInput,vUv-value/resolution.x);
	vec4 c2=texture2D(tInput,vUv);
	vec4 c3=texture2D(tInput,vUv+value/resolution.y);
	
	gl_FragColor=vec4(c1.r,c2.g,c3.b,c1.a+c2.a+c3.b);
	
}
