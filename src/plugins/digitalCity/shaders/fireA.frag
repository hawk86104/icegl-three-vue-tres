uniform vec3 color;
uniform float time;
uniform float seed;
uniform mat4 invModelMatrix;
uniform vec3 scale;

uniform vec4 noiseScale;
uniform float magnitude;
uniform float lacunarity;
uniform float gain;

uniform sampler2D fireTex;

varying vec3 vWorldPos;
varying vec3 vUnCameraPosition;

// GLSL simplex noise function by ashima / https://github.com/ashima/webgl-noise/blob/master/src/noise3D.glsl
// -------- simplex noise
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

float snoise(vec3 v){
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
    
    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
    //   x1 = x0 - i1  + 1.0 * C.xxx;
    //   x2 = x0 - i2  + 2.0 * C.xxx;
    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;// 2.0*C.x = 1/3 = C.y
    vec3 x3=x0-D.yyy;// -1.0+3.0*C.x = -0.5 = -D.y
    
    // Permutations
    i=mod289(i);
    vec4 p=permute(permute(permute(
                i.z+vec4(0.,i1.z,i2.z,1.))
                +i.y+vec4(0.,i1.y,i2.y,1.))
                +i.x+vec4(0.,i1.x,i2.x,1.));
                
                // Gradients: 7x7 points over a square, mapped onto an octahedron.
                // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
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
                
                //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
                //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
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
                return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
            }
            // simplex noise --------
            
            float turbulence(vec3 p){
                float sum=0.;
                float freq=1.;
                float amp=1.;
                
                for(int i=0;i<OCTIVES;i++){
                    sum+=abs(snoise(p*freq))*amp;
                    freq*=lacunarity;
                    amp*=gain;
                }
                
                return sum;
            }
            
            vec4 samplerFire(vec3 p,vec4 scale){
                vec2 st=vec2(sqrt(dot(p.xz,p.xz)),p.y);
                
                if(st.x<=0.||st.x>=1.||st.y<=0.||st.y>=1.)return vec4(0.);
                
                p.y-=(seed+time)*scale.w;
                p*=scale.xyz;
                
                st.y+=sqrt(st.y)*magnitude*turbulence(p);
                
                if(st.y<=0.||st.y>=1.)return vec4(0.);
                
                return texture2D(fireTex,st);
            }
            
            vec3 localize(vec3 p){
                return(invModelMatrix*vec4(p,1.)).xyz;
            }
            
            void main(){
                vec3 rayPos=vWorldPos;
                vec3 rayDir=normalize(rayPos-vUnCameraPosition);
                float rayLen=.0288*length(scale.xyz);
                
                vec4 col=vec4(0.);
                
                for(int i=0;i<ITERATIONS;i++){
                    rayPos+=rayDir*rayLen;
                    
                    vec3 lp=localize(rayPos);
                    
                    lp.y+=.5;
                    lp.xz*=2.;
                    col+=samplerFire(lp,noiseScale);
                }
                if(col.x<.12&&col.y<.12&&col.z<.12){
                    gl_FragColor=vec4(0,0,0,0);
                    // gl_FragColor=col;
                }else{
                    gl_FragColor=col;
                    // gl_FragColor=vec4(mix(color,col.xyz,.1),1.);
                }
                // gl_FragColor=vec4(1.,.0,1.,1.);
            }
            