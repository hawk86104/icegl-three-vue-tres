// Examples of variables passed from vertex to fragment shader
varying vec2 vUv;

void main(){
	// To pass variables to the fragment shader, you assign them here in the
	// main function. Traditionally you name the varying with vAttributeName
	vUv=uv;
	
	// This sets the position of the vertex in 3d space. The correct math is
	// provided below to take into account camera and object data.
	gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}