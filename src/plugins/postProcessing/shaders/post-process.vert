

attribute vec3 aPosition;
attribute vec2 aTexCoords;

varying vec2 texCoords;

void main()
{
    texCoords=aTexCoords;
    gl_Position=vec4(aPosition,1.);
}