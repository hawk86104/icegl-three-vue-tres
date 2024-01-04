varying vec4 vPosition;
void main(){
	vPosition=modelMatrix*vec4(position,1.);
	csm_Position=position*vec3(1.);
}