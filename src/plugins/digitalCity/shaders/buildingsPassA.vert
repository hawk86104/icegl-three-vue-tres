varying vec2 vUv;
varying vec3 vPosition;

void main(){
	vUv=uv;
	vPosition=position;
	gl_Position=vec4(position,1.);
}
