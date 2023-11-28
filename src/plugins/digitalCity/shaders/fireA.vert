varying vec3 vWorldPos;
uniform float fireScale;
uniform vec3 offsetPositin;
varying vec3 vUnCameraPosition;
void main(){
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
    vWorldPos=(modelMatrix*vec4(position,1.)).xyz;
    vUnCameraPosition=cameraPosition-offsetPositin;
    vWorldPos.x=vWorldPos.x-offsetPositin.x;
    vWorldPos.y=vWorldPos.y-offsetPositin.y-.46*fireScale;
    vWorldPos.z=vWorldPos.z-offsetPositin.z;
    vWorldPos=vWorldPos/fireScale;
}