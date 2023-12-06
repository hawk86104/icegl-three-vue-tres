uniform float time;
uniform float amplitude;
uniform float speed;
uniform float frequency;

vec3 mod289(vec3 x){
	return x-floor(x*(1./289.))*289.;
}

vec4 mod289(vec4 x){
	return x-floor(x*(1./289.))*289.;
}

vec4 permute(vec4 x){
	return mod289(((x*34.)+1.)*x);
}

vec4 taylorInvSqrt(vec4 r){
	return 1.79284291400159-.85373472095314*r;
}

float noise(vec3 v){
	const vec2 C=vec2(1./6.,1./3.);
	const vec4 D=vec4(0.,.5,1.,2.);
	
	// First corner
	vec3 i=floor(v+dot(v,C.yyy));
	vec3 x0=v-i+dot(i,C.xxx);
	
	// Other corners
	vec3 g=step(x0.yzx,x0.xyz);
	vec3 l=1.-g;
	vec3 i1=min(g.xyz,l.zxy);
	vec3 i2=max(g.xyz,l.zxy);
	
	vec3 x1=x0-i1+C.xxx;
	vec3 x2=x0-i2+C.yyy;
	vec3 x3=x0-D.yyy;
	
	// Permutations
	i=mod289(i);
	vec4 p=permute(permute(permute(
				i.z+vec4(0.,i1.z,i2.z,1.))
				+i.y+vec4(0.,i1.y,i2.y,1.))
				+i.x+vec4(0.,i1.x,i2.x,1.));
				
				float n_=.142857142857;// 1.0/7.0
				vec3 ns=n_*D.wyz-D.xzx;
				
				vec4 j=p-49.*floor(p*ns.z*ns.z);//  mod(p,7*7)
				
				vec4 x_=floor(j*ns.z);
				vec4 y_=floor(j-7.*x_);// mod(j,N)
				
				vec4 x=x_*ns.x+ns.yyyy;
				vec4 y=y_*ns.x+ns.yyyy;
				vec4 h=1.-abs(x)-abs(y);
				
				vec4 b0=vec4(x.xy,y.xy);
				vec4 b1=vec4(x.zw,y.zw);
				
				vec4 s0=floor(b0)*2.+1.;
				vec4 s1=floor(b1)*2.+1.;
				vec4 sh=-step(h,vec4(0.));
				
				vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
				vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
				
				vec3 p0=vec3(a0.xy,h.x);
				vec3 p1=vec3(a0.zw,h.y);
				vec3 p2=vec3(a1.xy,h.z);
				vec3 p3=vec3(a1.zw,h.w);
				
				//Normalise gradients
				vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
				p0*=norm.x;
				p1*=norm.y;
				p2*=norm.z;
				p3*=norm.w;
				
				// Mix final noise value
				vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
				m=m*m;
				return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),
				dot(p2,x2),dot(p3,x3)));
			}
			
			// the function which defines the displacement
			float displace(vec3 point){
				return noise(vec3(point.x*frequency,point.y*frequency,time*speed))*amplitude;
			}
			
			vec3 orthogonal(vec3 v){
				return normalize(abs(v.x)>abs(v.z)
				?vec3(-v.y,v.x,0.)
				:vec3(0.,-v.z,v.y));
			}
			
			void main(){
				vec3 displacedPosition=position+normal*displace(position);
				
				float offset=.0001;
				vec3 tangent=orthogonal(normal);
				vec3 bitangent=normalize(cross(normal,tangent));
				vec3 neighbour1=position+tangent*offset;
				vec3 neighbour2=position+bitangent*offset;
				vec3 displacedNeighbour1=neighbour1+normal*displace(neighbour1);
				vec3 displacedNeighbour2=neighbour2+normal*displace(neighbour2);
				
				vec3 displacedTangent=displacedNeighbour1-displacedPosition;
				vec3 displacedBitangent=displacedNeighbour2-displacedPosition;
				
				vec3 displacedNormal=normalize(cross(displacedTangent,displacedBitangent));
				
				// vNormal=normalMatrix*displacedNormal;
				//vNormal = normal;
				csm_Normal=normalMatrix*displacedNormal;
				// csm_Normal=normal;
				// gl_Position=projectionMatrix*modelViewMatrix*vec4(displacedPosition,1.);
				csm_Position=displacedPosition;
			}