uniform float uTime;
uniform vec3 uFrontColor;
uniform vec3 uBackColor;
uniform sampler2D uNoise;
uniform float uPowerOffset;
uniform float uNoiseCutOff;
uniform bool uColorBoth;

in vec2 vUv;

#include ../util/clip.glsl
#include ../uv/tileOffset.glsl

void main()
{
    vec2 uv = vUv;

    vec2 timeOffset = vec2( uTime * 0.6, 0.0 );

    //vec2 uvTiled =  mod( ( uv * 1.0 ) + timeOffset, 1.0 );

    // noise from texture sampled at r channel
    vec3 noiseVoronoi = texture( uNoise, uv ).rgb;

    float uvCutOff = uv.y;

    uvCutOff = smoothstep( 0.02, 1.0, uvCutOff + 0.2  );

    // create a cutoff threshold using pow to increase dark
    float noiseCutOff = pow( noiseVoronoi.r, uPowerOffset );

    //noiseCutOff = step( uNoiseCutOff, noiseCutOff );

    // assign colors with noise
    vec3 colorFront = uFrontColor;
    colorFront *= noiseCutOff;

    vec3 colorBack = uBackColor;
    colorBack *= noiseCutOff;

    // assign color based on if that fragment is front or back
    vec3 colorFinal = colorFront;

    if( uColorBoth )
    {
        colorFinal = ( ( gl_FrontFacing ) ? colorFront : colorBack );
    }

    // clip based on noise cutoff
    clip( noiseCutOff, uNoiseCutOff, 0 );

    gl_FragColor = vec4( colorFinal, noiseCutOff * uvCutOff );
    //gl_FragColor = vec4( vec3( uvCutOff ), uvCutOff );

    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}