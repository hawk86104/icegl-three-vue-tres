uniform sampler2D
    uPositions; // RenderTarget containing the transformed positions
uniform float uSize;
uniform float uPixelRatio;
varying vec3 vPos;
varying vec2 vUv;
void main() {
  vec3 pos = texture2D(uPositions, position.xy).xyz;

  float customSize = uSize;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
  gl_PointSize = customSize * uPixelRatio;
  gl_PointSize *= (1.0 / -viewPosition.z);

  vPos = pos;
}
