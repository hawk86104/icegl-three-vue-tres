varying vec2 uvPosition;

// #include <time_animation_uniform_chunk>
uniform float time;
uniform bool isAnimate;
// #include <wavy_animation_uniform_chunk>
uniform float raisedBottom;
uniform float waveFrequency;
uniform float wavePow;
uniform int direction;
// #include <repeat_pattern_uniform_chunk>
uniform float division;
uniform float divisionScaleX;
// #include <mask_map_uniform_chunk>
uniform bool hasMaskTexture;
uniform sampler2D maskTexture;
// #include <reversible_uniform_chunk>
uniform bool isReversed;

uniform float gridWeight;

// #include <hex_grid_function_chunk>
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
  // if( direction == ${Directions.horizontal}){
  //   distance = id.x;
  // }else if( direction == ${Directions.radial} ){
  //   distance = length(id.xy);
  // }
  float wavy =
      isAnimate
          ? pow(sin((distance * waveFrequency - time)), wavePow) + raisedBottom
          : 1.0;

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
}