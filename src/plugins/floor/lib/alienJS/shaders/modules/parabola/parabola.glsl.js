// From https://www.iquilezles.org/www/articles/functions/functions.htm

export default /* glsl */ `
float parabola(float x, float k) {
    return pow(4.0 * x * (1.0 - x), k);
}

float pcurve(float x, float a, float b) {
    float k = pow(a + b, a + b) / (pow(a, a) * pow(b, b));
    return k * pow(x, a) * pow(1.0 - x, b);
}
`;
