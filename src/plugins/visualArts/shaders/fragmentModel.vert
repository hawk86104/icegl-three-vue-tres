varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

attribute vec3 aCenter;
attribute vec3 toPosition;
attribute vec3 toNormal;
attribute float aRandom;

uniform float u_progress;

#include <common>

mat4 rotation3d(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(
      oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s,
      oc * axis.z * axis.x + axis.y * s, 0.0, oc * axis.x * axis.y + axis.z * s,
      oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.0,
      oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s,
      oc * axis.z * axis.z + c, 0.0, 0.0, 0.0, 0.0, 1.0);
}

void main() {
  vUv = uv;

  float progress = u_progress;
  float sinProgress = sin(progress * PI);

  vec3 pos = mix(position, toPosition, progress);
  vec3 nor = mix(normal, toNormal, progress);

  vNormal = normalMatrix * normalize(nor);

  float prog = ((pos.y + 1.) / 2.) * 1.1;

  float locprog = clamp((sinProgress - 0.9 * prog) / 0.2, 0., 1.);

  vec3 transform = pos - aCenter;

  transform += 3. * aRandom * nor * locprog;

  transform *= (1.0 - locprog);

  transform += aCenter;

  mat4 rotation = rotation3d(vec3(0., 1., 0.), aRandom * (locprog)*PI * 3.);

  transform = (rotation * vec4(transform, 1.)).xyz;

  vec4 modelViewPosition = modelViewMatrix * vec4(transform, 1.0);

  gl_Position = projectionMatrix * modelViewPosition;

  vViewPosition = -modelViewPosition.xyz;
}