varying vec2 vUv;
varying vec4 vWorldPosition;

void main() {
  vec3 p = position;

  csm_Position = p;

  vUv = uv;
  vWorldPosition = modelMatrix * vec4(p, 1);
}