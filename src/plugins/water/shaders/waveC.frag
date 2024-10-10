precision mediump float;

varying vec2 vUv;
varying float vElevation;
varying vec3 vPeakColor;
varying vec3 vValleyColor;

uniform float uTime;

void main()
{
  gl_FragColor = vec4(mix(vValleyColor, vPeakColor, vElevation), 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
