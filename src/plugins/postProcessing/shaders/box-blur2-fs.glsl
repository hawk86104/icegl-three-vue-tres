varying vec2 vUv;
uniform sampler2D tInput;
uniform float deltax;
uniform float deltay;
uniform float taps;

uniform vec2 resolution;

void main(){
	
	vec4 sum=vec4(0.);
	vec2 inc=vec2(deltax,deltay)/resolution;
	
	sum+=texture2D(tInput,(vUv-inc*4.))*.051;
	sum+=texture2D(tInput,(vUv-inc*3.))*.0918;
	sum+=texture2D(tInput,(vUv-inc*2.))*.12245;
	sum+=texture2D(tInput,(vUv-inc*1.))*.1531;
	sum+=texture2D(tInput,(vUv+inc*0.))*.1633;
	sum+=texture2D(tInput,(vUv+inc*1.))*.1531;
	sum+=texture2D(tInput,(vUv+inc*2.))*.12245;
	sum+=texture2D(tInput,(vUv+inc*3.))*.0918;
	sum+=texture2D(tInput,(vUv+inc*4.))*.051;
	
	gl_FragColor=sum;
	
}