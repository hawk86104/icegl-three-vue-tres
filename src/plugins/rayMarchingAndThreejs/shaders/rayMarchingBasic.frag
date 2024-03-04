#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
varying vec2 vUv;
float map(vec3 p){
  return length(p)-1.;
}
void main(){
  vec3 ro=vec3(0.,0.,-3.);//起始位置
  vec3 rd=normalize(vec3(vUv-.5,1.));//方向
  float t=0.;
  vec3 color=vec3(0.);
  for(int i=0;i<80;i++){
    vec3 p=ro+rd*t;
    float d=map(p);
    t+=d;
    //优化效率
    if(t>100.||d<.001){
      break;
    }
    
  }
  color=vec3(t)*.2;
  gl_FragColor=vec4(color,1.);
  
}