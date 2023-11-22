varying vec2 vUv;
uniform float uTime;
struct VoronoiData{
	float dist;
	float edgedist;
	vec2 edgenormal;
	vec2 point;
};

vec2 hash22(vec2 p)
{
	vec3 p3=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973));
	p3+=dot(p3,p3.yzx+33.33);
	return fract((p3.xx+p3.yz)*p3.zy);
}
VoronoiData voronoi2dedges(vec2 uv){
	vec2 n=floor(uv);
	vec2 f=fract(uv);
	
	vec2 mg,mr;
	
	float md=8.;
	for(int j=-1;j<=1;j++)
	for(int i=-1;i<=1;i++){
		vec2 g=vec2(i,j);
		vec2 o=hash22(n+g);
		vec2 r=g+o-f;
		float d=dot(r,r);
		
		if(d<md){
			md=d;
			mr=g+o;
		}
	}
	
	float med=8.;
	vec2 men=vec2(0);
	for(int j=-2;j<=2;j++)
	for(int i=-2;i<=2;i++){
		vec2 g=vec2(i,j);
		g+=hash22(n+g);
		vec2 k=g-mr;
		
		float d=dot(k,k);
		if(d>0.){
			float l=dot(g+mr-2.*f,k)*.5/sqrt(d);
			if(l<med){
				men=k;
				med=l;
			}
		}
	}
	return VoronoiData(md,med,normalize(men),mr+n);
}

void main(){
	vec2 uv=vUv*10.+vec2(0.,uTime);
	vec2 p=voronoi2dedges(uv).point;
	VoronoiData v;
	for(int i=0;i<32;i++){
		VoronoiData v=voronoi2dedges(p);
		p+=-v.edgenormal*.2/float(i+1);
	}
	gl_FragColor=vec4(
		smoothstep(0.,.1,distance(uv,p))*
		smoothstep(0.,.01,voronoi2dedges(uv).edgedist)*
		smoothstep(0.,.01,abs(distance(uv,p)-voronoi2dedges(p).edgedist))
	);
}