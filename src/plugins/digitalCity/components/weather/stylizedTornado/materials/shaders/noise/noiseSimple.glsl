float randomSimple(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float interpolate( float a, float b, float t )
{
    return ( 1.0 - t ) * a + ( t * b );
}

float valueNoise( vec2 uv )
{
    vec2 i = floor( uv );
    vec2 f = fract( uv );
    f = f * f * ( 3.0 - 2.0 * f );

    uv = abs( fract( uv ) - 0.5 );
    vec2 c0 = i + vec2(0.0, 0.0);
    vec2 c1 = i + vec2(1.0, 0.0);
    vec2 c2 = i + vec2(0.0, 1.0);
    vec2 c3 = i + vec2(1.0, 1.0);
    float r0 = randomSimple(c0);
    float r1 = randomSimple(c1);
    float r2 = randomSimple(c2);
    float r3 = randomSimple(c3);

    float bottomOfGrid = interpolate(r0, r1, f.x);
    float topOfGrid = interpolate(r2, r3, f.x);
    float t = interpolate(bottomOfGrid, topOfGrid, f.y);
    return t;
}

float noiseSimple( vec2 UV, float Scale )
{
    float t = 0.0;

    float freq = pow(2.0, float(0));
    float amp = pow(0.5, float(3-0));
    t += valueNoise(vec2(UV.x*Scale/freq, UV.y*Scale/freq))*amp;

    freq = pow(2.0, float(1));
    amp = pow(0.5, float(3-1));
    t += valueNoise(vec2(UV.x*Scale/freq, UV.y*Scale/freq))*amp;

    freq = pow(2.0, float(2));
    amp = pow(0.5, float(3-2));
    t += valueNoise(vec2(UV.x * Scale / freq, UV.y * Scale / freq ) ) * amp;

    return t;
}