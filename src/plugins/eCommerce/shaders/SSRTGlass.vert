varying vec3 vWorldSpaceFragPos;
varying vec3 vWorldSpaceNormal;
// NOTE: we don't need the projViewModel matrix, because vWorldSpaceFragPos is already multiplied by the model matrix
// I'm repeating this comment 5 times because I've lost 2 hours of my life debugging this thing
varying mat4 vProjViewMatrix;
varying mat4 vViewMatrix;

void main(){
	// NOTE: the multiplication with modelMatrix is required otherwise viewDir in the fragment shader would be incorrect
	vWorldSpaceFragPos=(modelMatrix*vec4(position,1.)).xyz;
	vWorldSpaceNormal=normalize((modelMatrix*vec4(normal,0.)).xyz);
	
	gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
	vProjViewMatrix=projectionMatrix*viewMatrix;
	vViewMatrix=viewMatrix;
}