uniform sampler2D tInput;
uniform float exponent;
uniform float strength;
uniform vec2 resolution;
varying vec2 vUv;

void main(){
	
	vec4 center=texture2D(tInput,vUv);
	vec4 color=vec4(0.);
	float total=0.;
	for(float x=-4.;x<=4.;x+=1.){
		for(float y=-4.;y<=4.;y+=1.){
			vec4 sample1=texture2D(tInput,vUv+vec2(x,y)/resolution.xy);
			float weight=1.-abs(dot(sample1.rgb-center.rgb,vec3(.25)));
			weight=pow(weight,exponent);
			color+=sample1*weight;
			total+=weight;
		}
	}
	gl_FragColor=color/total;
	
}