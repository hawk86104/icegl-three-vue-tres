#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
varying vec2 vUv;
vec3 palette(float t){
	vec3 a=vec3(.5,.5,.5);
	vec3 b=vec3(.5,.5,.5);
	vec3 c=vec3(1.,1.,1.);
	vec3 d=vec3(.263,.416,.557);
	
	return a+b*cos(6.28318*(c*t+d));
}

mat2 rot2D(float angle){
	float s=sin(angle);
	float c=cos(angle);
	return mat2(c,-s,s,c);
}

float sdOctahedron(vec3 p,float s){
	p=abs(p);
	return(p.x+p.y+p.z-s)*.57735027;
}

float map(vec3 p){
	p.z+=u_time*.4;
	
	p.xy=fract(p.xy)-.5;
	p.z=mod(p.z,.25)-.125;
	
	float box=sdOctahedron(p,.15);
	
	return box;
}

void main(){
	vec2 uv=vUv-vec2(.5);
	vec2 m=(u_mouse.xy*2.-u_resolution.xy)/u_resolution.y;
	
	// initialization
	vec3 ro=vec3(0.,0.,-3.);
	vec3 rd=normalize(vec3(uv,1.));
	vec3 col=vec3(0);
	
	float t=0.;
	
	// default circular motion if not clicked
	if(u_mouse.z<0.)
	m=vec2(cos(u_time*.2),sin(u_time*.2));
	
	// ray marching
	int i;
	for(i=0;i<80;i++){
		vec3 p=ro+rd*t;
		
		p.xy*=rot2D(t*.2);
		p.y+=sin(t*(1.)*.5)*.35;
		
		float d=map(p);
		
		t+=d;
		
		if(d<.001||t>100.)break;
	}
	
	// coloring
	col=palette(t*.04+float(i)*.005);
	
	gl_FragColor=vec4(col,1.);
}