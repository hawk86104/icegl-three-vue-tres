varying vec2 uvPosition;

uniform float time;

uniform float raisedBottom;
uniform float waveFrequency;
uniform float wavePow;
uniform int direction;

uniform float division;
uniform float divisionScaleX;

uniform bool hasMaskTexture;
uniform sampler2D maskTexture;

uniform bool isReversed;

uniform float gridWeight;

float hexDist(vec2 p) {
  p = abs(p);
  float d = dot(p, normalize(vec2(1.0, 1.73)));
  return max(d, p.x);
}
vec4 hexCoords(vec2 uv) {
  vec2 r = vec2(1.0, 1.73);
  vec2 h = r * 0.5;
  vec2 a = mod(uv, r) - h;
  vec2 b = mod(uv - h, r) - h;

  vec2 gv = length(a) < length(b) ? a : b;
  vec2 id = uv - gv;

  float x = atan(gv.x, gv.y);
  float y = 0.5 - hexDist(gv);

  return vec4(x, y, id);
}

void main() {
  vec2 uv = uvPosition * vec2(division * divisionScaleX, division);
  vec4 hc = hexCoords(uv);
  vec2 id = hc.zw;
  float distance = id.y;
  if (direction == 3) {
    distance = id.x;
  } else if (direction == 5) {
    distance = length(id.xy);
  }
  float wavy = pow(sin((distance * waveFrequency - time)), wavePow) + raisedBottom;

  csm_DiffuseColor.a *= wavy;

  float mask = 1.0;
  if (hasMaskTexture) {
    vec2 uVm = id / vec2(division * divisionScaleX, division);
    mask = texture2D(maskTexture, uVm).g;
  }

  float w = gridWeight + (1.0 - mask);
  w = clamp(w, 0.0, 1.0);

  float margin = clamp(w * 0.33, 0.00, 0.02);
  float stepMax = w + margin;

  float gridLine = smoothstep(w, stepMax, hc.y);
  gridLine = isReversed ? 1.0 - gridLine : gridLine;
  csm_DiffuseColor.a *= gridLine;

  // 重点：将透明度乘以颜色，以保持颜色的亮度 保留原有颜色，且不被 csm_FragColor	 覆盖掉
  csm_DiffuseColor.rgb = vec3(csm_DiffuseColor.a * csm_DiffuseColor.r,
                              csm_DiffuseColor.a * csm_DiffuseColor.g,
                              csm_DiffuseColor.a * csm_DiffuseColor.b);
}