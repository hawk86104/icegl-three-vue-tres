precision mediump float;
varying vec3 vPos;
uniform vec3 uColor; // 颜色
void main() {

  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.05 / distanceToCenter - 0.1;

  // vec3 color = vec3(1.0, 0.502, 0.0);

  gl_FragColor = vec4(uColor, strength * length(vPos));
}
