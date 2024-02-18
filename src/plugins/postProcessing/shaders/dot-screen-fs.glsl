/**
* @author alteredq / http://alteredqualia.com/
*
* Dot screen shader
* based on glfx.js sepia shader
* https://github.com/evanw/glfx.js
*/

uniform sampler2D tInput;
uniform vec2 resolution;
varying vec2 vUv;

float angle=1.57;
float scale=1.;

float pattern(){
	vec2 center=resolution.xy*.5;
	float s=sin(angle),c=cos(angle);
	vec2 tex=vUv*resolution-center;
	vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;
	return(sin(point.x)*sin(point.y))*4.;
}

void main(){
	vec4 color=texture2D(tInput,vUv);
	float average=(color.r+color.g+color.b)/3.;
	gl_FragColor=vec4(vec3(average*10.-5.+pattern()),color.a);
}