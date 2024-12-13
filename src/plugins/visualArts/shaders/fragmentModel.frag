varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vViewPosition;
uniform sampler2D matcap;
uniform sampler2D matcap2;
uniform float u_progress;
uniform vec3 m1Color;
uniform vec3 m2Color;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
  vec3 y = cross(viewDir, x);
  vec2 uv = vec2(dot(x, vNormal), dot(y, vNormal)) * 0.495 + 0.5;

  float progress = abs(sin(u_progress));

  vec3 matcapColor = texture2D(matcap, uv).rgb;
  matcapColor = mix(matcapColor, m1Color, 0.5);
  vec3 matcap2Color = texture2D(matcap2, uv).rgb;
  matcap2Color = mix(matcap2Color, m2Color, 0.5);

  vec3 color = vec3(matcapColor);
  color = mix(color, matcap2Color, progress);

  gl_FragColor = vec4(color, 1.0);
}