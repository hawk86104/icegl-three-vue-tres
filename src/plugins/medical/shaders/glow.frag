precision mediump float;
uniform vec3 glowColor;
varying float intensity;
varying float alpha;
uniform float uOpacity;
void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(.5));
  float pct = 1. - smoothstep(0., .5, distanceToCenter);
  vec3 color = vec3(1.) * gl_FragColor.rgb;
  vec3 glow = glowColor * intensity;
  gl_FragColor = vec4(glow, clamp(alpha, 0., 1.));
  gl_FragColor = vec4(glow, pct * gl_FragColor.a);
  gl_FragColor = vec4(gl_FragColor.rgb, gl_FragColor.a * uOpacity);
  // gl_FragColor=vec4(1.,1.,0.,1.);
}