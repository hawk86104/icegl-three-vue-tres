  uniform sampler2D colorTexture;
  // uniform sampler2D alphaTexture;
  uniform sampler2D earthTexture;
  uniform sampler2D starTexture;

  varying vec2 vUv;
  varying float vVisible;
  varying float vAlpha;
  varying float vElevation;

  void main() {
    if (floor(vVisible + 0.1) == 0.0) discard;
    vec2 coord = gl_PointCoord;
    float alpha = texture2D(starTexture, coord).a;
    // 根据 alpha 值来裁剪形状
    if (alpha < 0.1) discard;

    // float alphaLand = 1.0 - texture2D(alphaTexture, vUv).r;
    vec3 color = texture2D(colorTexture, vUv).rgb;
    vec3 earth = texture2D(earthTexture, vUv).rgb;
    color = mix(color, earth, 0.65);
    if(
      vAlpha > 0.5
    ) {
      gl_FragColor = vec4(color, vAlpha);
    }else {
      // 对于海洋部分，根据 vElevation 调整颜色
      float elevationEffect = clamp(vElevation*30.0, -1.0, 1.0); // 将 vElevation 限制在 [-1, 1] 范围内
      vec3 deep_sea_blue = vec3(0.004, 0.227, 0.388);
      vec3 adjustedColor = mix(deep_sea_blue, earth*1.75, (elevationEffect + 1.0) * 0.5); // 根据 vElevation 调整颜色
      gl_FragColor = vec4(adjustedColor, 1.0-vAlpha);
    }
  }
