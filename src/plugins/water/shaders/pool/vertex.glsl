#include ../utils.glsl

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 position;

varying vec3 pos;


void main() {
  pos = position.xyz;
  pos.y = ((1.0 - pos.y) * (7.0 / 12.0) - 1.0) * poolHeight;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
