uniform vec3 glowColor;
uniform sampler2D lightningTexture;
varying float intensity;
varying vec2 vUv;
uniform float offsetY;
uniform float uTime;
uniform float uOpacity;

void main(){
  vec2 uv=vUv;
  uv.y+=offsetY;
  vec3 glow=glowColor*intensity;
  vec3 color=vec3(step(.1,uv.y)-step(.2,uv.y))-vec3(texture2D(lightningTexture,uv));
  float alpha=clamp(cos(uTime*3.),.5,1.);
  gl_FragColor=vec4(glow+color,alpha*uOpacity);
}