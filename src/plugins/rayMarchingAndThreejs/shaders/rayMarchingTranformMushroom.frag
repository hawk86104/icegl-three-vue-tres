#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
varying vec2 vUv;

mat2 rot2D(float angle){
  float s=sin(angle);
  float c=cos(angle);
  return mat2(c,-s,s,c);
}
float sdCutSphere(vec3 p,float r,float h)
{
  // sampling independent computations (only depend on shape)
  float w=sqrt(r*r-h*h);
  
  // sampling dependant computations
  vec2 q=vec2(length(p.xz),p.y);
  float s=max((h-r)*q.x*q.x+w*w*(h+r-2.*q.y),h*q.x-w*q.y);
  return(s<0.)?length(q)-r:
  (q.x<w)?h-q.y:
  length(q-vec2(w,h));
}

float sdCappedCone(vec3 p,vec3 a,vec3 b,float ra,float rb)
{
  float rba=rb-ra;
  float baba=dot(b-a,b-a);
  float papa=dot(p-a,p-a);
  float paba=dot(p-a,b-a)/baba;
  float x=sqrt(papa-paba*paba*baba);
  float cax=max(0.,x-((paba<.5)?ra:rb));
  float cay=abs(paba-.5)-.5;
  float k=rba*rba+baba;
  float f=clamp((rba*(x-ra)+paba*baba)/k,0.,1.);
  float cbx=x-ra-f*rba;
  float cby=paba-f;
  float s=(cbx<0.&&cay<0.)?-1.:1.;
  return s*sqrt(min(cax*cax+cay*cay*baba,
    cbx*cbx+cby*cby*baba));
  }
  float smin(float d1,float d2,float k){
    float h=clamp(.5+.5*(d2-d1)/k,0.,1.);
    return mix(d2,d1,h)-k*h*(1.-h);
  }
  //模糊摆动，y的值越大，摆动频率越大
  vec3 bendPoint(vec3 p,float k)
  {
    float c=cos(k*p.y);
    float s=sin(k*p.y);
    mat2 m=mat2(c,-s,s,c);
    vec3 q=vec3(m*p.xy,p.z);
    return q;
  }
  float map(vec3 p){
    vec3 q=p;
    p=bendPoint(p,sin(u_time*5.));
    // p.xy*=rot2D(sin(u_time)*.1);
    vec3 pp2=vec3(0.,.8,0.);
    vec3 pp1=vec3(0.,-.2,0.);
    float CappedConesdf=sdCappedCone(-p,pp1,pp2,.2,.1);
    float CutSpheresdf=sdCutSphere(-p-vec3(0.,.4,0.),.5,.2)-.1;
    float entity=smin(CappedConesdf,CutSpheresdf,.1);
    entity=smin(entity,-q.y+.1,.2);
    return entity;
  }
  
  void main(){
    vec3 ro=vec3(0.,0.,-4.);//起始位置
    vec3 rd=normalize(vec3(vUv-.5,1.));//方向
    // horizontal camera rotation
    
    // ro.xz*=rot2D(-u_mouse.x*.001);
    // rd.xz*=rot2D(-u_mouse.x*.001);
    // ro.xy*=rot2D(-u_mouse.y*.001);
    // rd.xy*=rot2D(-u_mouse.y*.001);
    float t=0.;
    vec3 color=vec3(0.);
    for(int i=0;i<80;i++){
      vec3 p=ro+rd*t;
      float d=map(p);
      t+=d;
      //优化效率
      if(t>100.||d<.001){
        break;
      }
      
    }
    color=vec3(t)*.2;
    gl_FragColor=vec4(color,1.);
    
  }