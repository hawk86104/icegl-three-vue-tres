precision mediump float;

uniform vec3 u_camera;
uniform vec3 u_resolution;
uniform float u_time;

varying vec3 v_hitPos;
varying vec3 v_hitPosWorldSpace;
varying vec3 v_cameraObjectSpace;

void main() {
  vec3 pos = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  v_hitPos = position.xyz;

  v_hitPosWorldSpace = (modelMatrix * vec4(position, 1.0)).xyz;

  v_cameraObjectSpace = (inverse(modelMatrix) * vec4(u_camera, 1.0)).xyz;
}