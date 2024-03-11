precision mediump float;
varying vec3 vPos;
void main() {

  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.05 / distanceToCenter - 0.1;

  vec3 color = vec3(1.0, 0.5, 0.0);

  gl_FragColor = vec4(color, strength * length(vPos));
}
