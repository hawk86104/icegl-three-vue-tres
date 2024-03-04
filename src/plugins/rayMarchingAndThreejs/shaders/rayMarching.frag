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

float sdPyramid(vec3 p,float h)
{
	float m2=h*h+.25;
	
	p.xz=abs(p.xz);
	p.xz=(p.z>p.x)?p.zx:p.xz;
	p.xz-=.5;
	
	vec3 q=vec3(p.z,h*p.y-.5*p.x,h*p.x+.5*p.y);
	
	float s=max(-q.x,0.);
	float t=clamp((q.y-.5*p.z)/(m2+.25),0.,1.);
	
	float a=m2*(q.x+s)*(q.x+s)+q.y*q.y;
	float b=m2*(q.x+.5*t)*(q.x+.5*t)+(q.y-m2*t)*(q.y-m2*t);
	
	float d2=min(q.y,-q.x*m2-q.y*.5)>0.?0.:min(a,b);
	
	return sqrt((d2+q.z*q.z)/m2)*sign(max(q.z,-p.y));
}
float sdBoxFrame(vec3 p,vec3 b,float e)
{
	p=abs(p)-b;
	vec3 q=abs(p+e)-e;
	return min(min(
			length(max(vec3(p.x,q.y,q.z),0.))+min(max(p.x,max(q.y,q.z)),0.),
			length(max(vec3(q.x,p.y,q.z),0.))+min(max(q.x,max(p.y,q.z)),0.)),
			length(max(vec3(q.x,q.y,p.z),0.))+min(max(q.x,max(q.y,p.z)),0.));
		}
		float map(vec3 p){
			p.z+=u_time*.4;
			
			p.xy=fract(p.xy)-.5;
			p.z=mod(p.z,.25)-.125;
			float box=sdBoxFrame(p*8.,vec3(.5,.3,.5),.025)/8.;
			// box=min(sdPyramid(p*15.,1.5)/15.,box);
			return box;
		}
		
		void main(){
			vec2 uv=vUv-vec2(.5);
			vec2 m=(u_mouse.xy*2.-u_resolution.xy)/u_resolution.y;
			
			//变量初始化
			vec3 ro=vec3(0.,0.,-3.);
			vec3 rd=normalize(vec3(uv,1.));
			vec3 col=vec3(0);
			
			float t=0.;
			
			// 鼠标控制
			// if(u_mouse.z<0.)
			// m=vec2(cos(u_time*.2),sin(u_time*.2));
			
			// 光追
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