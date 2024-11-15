vec2 twirl(vec2 uv, vec2 center, float strength, vec2 offset)
{
    vec2 delta = uv - center;
    float angle = strength * length(delta);
    float x = cos(angle) * delta.x - sin(angle) * delta.y;
    float y = sin(angle) * delta.x + cos(angle) * delta.y;
    return vec2(x + center.x + offset.x, y + center.y + offset.y);
}