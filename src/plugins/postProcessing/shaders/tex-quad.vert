

attribute vec3 aPosition;
attribute vec2 aTexCoords;

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;

varying vec2 texCoords;

void main()
{
    texCoords=aTexCoords;
    gl_Position=uProjection*uView*uModel*vec4(aPosition,1.);
}