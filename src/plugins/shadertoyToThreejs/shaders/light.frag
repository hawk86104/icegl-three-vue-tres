uniform vec2 iResolution;
uniform float iTime;
varying vec2 vUv;
uniform sampler2D tDiffuse;
float rand(float x)
{
	return fract(sin(x)*75154.32912);
}

float rand3d(vec3 x)
{
	return fract(375.10297*sin(dot(x,vec3(103.0139,227.0595,31.05914))));
}

float noise(float x)
{
	float i=floor(x);
	float a=rand(i),b=rand(i+1.);
	float f=x-i;
	return mix(a,b,f);
}

float perlin(float x)
{
	float r=0.,s=1.,w=1.;
	for(int i=0;i<6;i++){
		s*=2.;
		w*=.5;
		r+=w*noise(s*x);
	}
	return r;
}

float noise3d(vec3 x)
{
	vec3 i=floor(x);
	float i000=rand3d(i+vec3(0.,0.,0.)),i001=rand3d(i+vec3(0.,0.,1.));
	float i010=rand3d(i+vec3(0.,1.,0.)),i011=rand3d(i+vec3(0.,1.,1.));
	float i100=rand3d(i+vec3(1.,0.,0.)),i101=rand3d(i+vec3(1.,0.,1.));
	float i110=rand3d(i+vec3(1.,1.,0.)),i111=rand3d(i+vec3(1.,1.,1.));
	vec3 f=x-i;
	return mix(mix(mix(i000,i001,f.z),mix(i010,i011,f.z),f.y),
	mix(mix(i100,i101,f.z),mix(i110,i111,f.z),f.y),f.x);
}

float perlin3d(vec3 x)
{
	float r=0.;
	float w=1.,s=1.;
	for(int i=0;i<5;i++){
		w*=.5;
		s*=2.;
		r+=w*noise3d(s*x);
	}
	return r;
}

float f(float y)
{
	float w=.4;// width of strike
	return w*(perlin(2.*y)-.5);
}

float plot(vec2 p,float d,bool thicker)
{
	if(thicker)d+=5.*abs(f(p.y+.001)-f(p.y));
	return smoothstep(d,0.,abs(f(p.y)-p.x));
}

float cloud(vec2 uv,float speed,float scale,float cover)
{
	float c=perlin3d(vec3(uv*scale,iTime*speed*2.));
	return max(0.,c-(1.-cover));
}

float mountain(vec2 uv,float scale,float offset,float h1,float h2)
{
	float h=h1+perlin(scale*uv.x+offset)*(h2-h1);
	return smoothstep(h,h+.01,uv.y);
}

vec3 render(vec2 uv)
{
	float x=iTime+.1;
	
	float m=.25;// max duration of strike
	float i=floor(x/m);
	float f=x/m-i;
	float k=.4;// frequency of strikes
	float n=noise(i);
	float t=ceil(n-k);// occurrence
	float d=max(0.,n-k)/(1.-k);// duration
	float o=ceil(t-f-(1.-d));// occurrence with duration
	float gt=.1;// glare duration
	float go=ceil(t-f-(1.-gt));// glare occurrence
	
	float lightning=0.;
	float light=0.;
	float glare=0.;
	
	if(o==1.){
		vec2 uv2=uv;
		uv2.y+=i*2.;// select type of lightning
		float p=(noise(i+10.)-.5)*2.;// position of lightning
		uv2.x-=p;
		
		float strike=plot(uv2,.01,true);
		float glow=plot(uv2,.04,false);
		float glow2=plot(uv2,1.5,false);
		
		lightning=strike*.4+glow*.15;
		
		float h=noise(i+5.);// height
		lightning*=smoothstep(h,h+.05,uv.y+perlin(1.2*uv.x+4.*h)*.03);
		lightning+=glow2*.3;
		light=smoothstep(5.,0.,abs(uv.x-p));
		glare=go*light;
	}
	
	vec3 clouds=
	vec3(.5,.7,1.)*mix(.6,.9,cloud(uv,.2,.1,1.))+
	vec3(.7,.8,1.)*.6*cloud(uv*vec2(.5,1.),.06,.8,.8)+
	vec3(.9,.9,1.)*.3*cloud(uv*vec2(.1,1.),.08,5.5,.6)+
	vec3(1.,1.,1.)*.4*cloud(uv*vec2(.1,1.),.07,10.,.5);
	
	float horizon=mountain(uv,.8,9.,.3,.6);
	vec3 terrain=mix(vec3(.25,.3,.3)*.5,1.5*vec3(.15,.2,.3),
	1.-(1.-mountain(uv,.8,3.,.2,.4))*.5-
	(1.-mountain(uv,.8,17.5,.05,.25))*.5);
	
	vec3 background=mix(terrain,clouds,horizon);
	background*=(.2+light*.5);
	vec4 previousPassColor=texture2D(tDiffuse,vUv);
	return vec3(background+lightning+previousPassColor.xyz);
}

void main()
{
	vec2 uv=vUv;
	uv.x=2.*uv.x-1.;
	uv.x*=iResolution.x/iResolution.y;
	
	gl_FragColor=vec4(render(uv),1.);
}