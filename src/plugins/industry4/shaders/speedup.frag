#include "../../../../node_modules/lygia/generative/random.glsl
#include "../../../../node_modules/lygia/math/map.glsl
#include "./simplexNosie.glsl
#include "../../../../node_modules/lygia/generative/snoise.glsl"
varying vec2 vUv;
uniform float uTime;
uniform float uSpeedFactor;

vec3 getColor(vec2 uv) {
  uv += vec2(9., 0.);
  float r = random(uv + vec2(12., 2.));
  float g = random(uv + vec2(7., 5.));
  float b = random(uv);
  vec3 col = vec3(r, g, b);
  return col;
}

vec3 colorNoise(vec2 uv) {
  vec2 newUV = floor(uv);
  vec2 size = vec2(1.);
  vec3 v1 = getColor((newUV + vec2(0.)) / size);
  vec3 v2 = getColor((newUV + vec2(0., 1.)) / size);
  vec3 v3 = getColor((newUV + vec2(1., 0.)) / size);
  vec3 v4 = getColor((newUV + vec2(1.)) / size);
  vec2 factor = smoothstep(0., 1., fract(uv));
  vec3 v1Tov2 = mix(v1, v2, factor.y);
  vec3 v3Tov4 = mix(v3, v4, factor.y);
  vec3 mixColor = mix(v1Tov2, v3Tov4, factor.x);
  return mixColor;
}

void main() {
  vec2 newUV = vUv;
  newUV.x += uTime * .5;
  float alpha = snoise(newUV * vec2(3., 100.));
  alpha = map(alpha, -1., 1., 0., 1.);
  alpha = pow(clamp(alpha - .05, 0., 1.), 13.);
  alpha = smoothstep(0., .04, alpha);
  vec3 col = vec3(1.);
  col = colorNoise(newUV * vec2(10., 100.));
  col *= vec3(1.5, 1., 400.);
  alpha *= smoothstep(.02, .5, vUv.x) * smoothstep(.02, .5, 1. - vUv.x);
  alpha *= smoothstep(.01, .1, vUv.y) * smoothstep(.01, .1, 1. - vUv.y);
  alpha *= smoothstep(0., 1., uSpeedFactor) * 5.;
  csm_FragColor = vec4(col, alpha);
}