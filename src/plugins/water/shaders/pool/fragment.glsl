precision highp float;
precision highp int;

#include ../utils.glsl

varying vec3 pos;


void main() {
  gl_FragColor = vec4(getWallColor(pos), 1.0);

  vec4 info = texture2D(water, pos.xz * 0.5 + 0.5);

  if (pos.y < info.r) {
    gl_FragColor.rgb *= underwaterColor * 1.2;
  }
}
