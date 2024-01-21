
precision mediump float;

varying vec2 texCoords;

uniform sampler2D textureSampler;
uniform float mixParam;
void main()
{
    // float luminance=dot(texture2D(textureSampler,texCoords).rgb,vec3(.3451,.2118,.302));
    vec4 color=mix(texture2D(textureSampler,texCoords),vec4(.1098,.6784,.1843,1.),mixParam);
    gl_FragColor=color;
}