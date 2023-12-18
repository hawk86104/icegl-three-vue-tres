varying vec3 vPosition;
void main(){
	vPosition=position;
	vec4 viewPosition=modelViewMatrix*vec4(position,1.);
	gl_Position=projectionMatrix*viewPosition;
}