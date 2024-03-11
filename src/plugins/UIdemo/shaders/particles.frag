varying vec3 vPos;
uniform float uTime;
uniform float uScroll;
void main() {
  //  if ( vPos == vec3(0.0) )
  //  {
  //    discard;
  //  }

  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.05 / distanceToCenter - 0.1;

  vec3 color = vec3(1.0, 0.5, 0.0);

  if (uScroll < uRange) {
    color = mix(color, vec3(1.0, 0.1, 0.0), uScroll * uTotalModels);
  } else if (uScroll < uRange * 2.0) {
    color = mix(vec3(1.0, 0.1, 0.0), vec3(1.0, 0.5, 0.0),
                (uScroll - uRange) * uTotalModels);
  } else {
    color = vec3(1.0, 0.5, 0.0);
  }

  // set FireFilies orange Color
  gl_FragColor = vec4(color, strength * length(vPos));
}
