uniform vec3 cutSectionColor;
void main() {
    if(!gl_FrontFacing){
        csm_FragColor = vec4( cutSectionColor, csm_DiffuseColor.a );
    }
}