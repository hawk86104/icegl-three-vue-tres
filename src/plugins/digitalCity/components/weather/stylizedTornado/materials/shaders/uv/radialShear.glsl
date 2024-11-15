vec2 radialShear( vec2 uv, vec2 center, float strength, vec2 offset )
{
    vec2 delta = uv - center;
    float delta2 = dot( delta.xy, delta.xy );

    float deltaOffset = delta2 * strength;

    return uv + vec2( delta.y, -delta.x) * deltaOffset + offset;
}

vec2 radialShear( vec2 uv, vec2 center, vec2 strength, vec2 offset )
{
    vec2 delta = uv - center;
    vec2 delta2 =  vec2( dot( delta.xy, delta.xy ) );

    vec2 deltaOffset = delta2 * strength;

    return uv + vec2( delta.y, -delta.x) * deltaOffset + offset;
}