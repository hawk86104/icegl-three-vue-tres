attribute vec3 position;
varying vec2 coord;


void main() {
  coord = position.xy * 0.5 + 0.5;

  gl_Position = vec4(position.xyz, 1.0);
}
