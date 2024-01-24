uniform sampler2D tDiffuse;
uniform sampler2D tNoise;
uniform float iTime;

varying vec2 vUv;

#define EdgeColor vec4(.2,.2,.15,1.)
#define BackgroundColor vec4(1,.95,.85,1)
#define NoiseAmount .01
#define ErrorPeriod 30.
#define ErrorRange .003

// Reference: https://www.shadertoy.com/view/MsSGD1
float triangle(float x)
{
	return abs(1.-mod(abs(x),2.))*2.-1.;
}

float rand(float x)
{
	return fract(sin(x)*43758.5453);
}

void main()
{
	float time=floor(iTime*16.)/16.;
	vec2 uv=vUv;
	uv+=vec2(triangle(uv.y*rand(time)*1.)*rand(time*1.9)*.005,
	triangle(uv.x*rand(time*3.4)*1.)*rand(time*2.1)*.005);
	
	float noise=(texture2D(tNoise,uv*.5).r-.5)*NoiseAmount;
	vec2 uvs[3];
	uvs[0]=uv+vec2(ErrorRange*sin(ErrorPeriod*uv.y+0.)+noise,ErrorRange*sin(ErrorPeriod*uv.x+0.)+noise);
	uvs[1]=uv+vec2(ErrorRange*sin(ErrorPeriod*uv.y+1.047)+noise,ErrorRange*sin(ErrorPeriod*uv.x+3.142)+noise);
	uvs[2]=uv+vec2(ErrorRange*sin(ErrorPeriod*uv.y+2.094)+noise,ErrorRange*sin(ErrorPeriod*uv.x+1.571)+noise);
	
	float edge=texture2D(tDiffuse,uvs[0]).r*texture2D(tDiffuse,uvs[1]).r*texture2D(tDiffuse,uvs[2]).r;
	float diffuse=texture2D(tDiffuse,uv).g;
	
	float w=fwidth(diffuse)*2.;
	vec4 mCol=mix(BackgroundColor*.5,BackgroundColor,mix(0.,1.,smoothstep(-w,w,diffuse-.3)));
	gl_FragColor=mix(EdgeColor,mCol,edge);
}