uniform float c;
uniform float p;
uniform float uTime;
varying float intensity;
varying vec2 vUv;
void main(){
    vUv=uv;
    vec3 vNormal=normalize(normalMatrix*normal);
    intensity=pow(c-abs(dot(vNormal,vec3(0,0,1))),p);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}