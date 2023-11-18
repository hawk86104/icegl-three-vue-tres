uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;
varying vec2 vUv;
void main(){
	gl_FragColor=(texture2D(baseTexture,vUv)+vec4(1.)*texture2D(bloomTexture,vUv));
}