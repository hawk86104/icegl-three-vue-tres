// 光线追踪实例，想学习每行代码的逻辑，请联系ICE社区-Jsonco
varying vec2 vUv;
uniform float uTime;
#define FAR 50.
float svObjID,svObjID2;
vec3 vObjID;
#define TUN 0.
#define ROD 1.
#define BLT 2.
mat2 rot(float th){vec2 a=sin(vec2(1.5707963,0)+th);return mat2(a,-a.y,a.x);}
vec3 camPath(float t){
  float a=sin(t*3.14159265/16.+1.5707963);
  float b=cos(t*3.14159265/16.);
  return vec3(a,b*a*.5,t);
}

vec3 camPathPL(float t){
  float it=floor(t+1.);
  float ft=t-it;
  float a=sin(it*3.14159265/16.+1.5707963);
  float b=cos(it*3.14159265/16.);
  vec2 p0=vec2(a,b*a*.5);
  a=sin((it+1.)*3.14159265/16.+1.5707963);
  b=cos((it+1.)*3.14159265/16.);
  vec2 p1=vec2(a,b*a*.5);
  vec2 p=mix(p0,p1,ft);
  return vec3(p,t);
}
vec2 objMin(vec2 a,vec2 b){
  return a.x<b.x?a:b;
}

float map(vec3 p){
  const float depth=.25;
  p.xy-=camPath(p.z).xy;
  float tun=(1.+depth)-length(p.xy);
  vec3 q=p;
  vec3 q2=p;
  float a=atan(q.y,q.x)/6.2831853;
  float ia=(floor(a*5.)+.5)/5.*6.2831853;
  float ia2=(floor(a*15.)+.5)/15.*6.2831853;
  q.xy*=rot(ia+sign(mod(q.z+1.,4.)-2.)*3.14159/15.);//
  q2.xy*=rot(ia2);
  q.x=mod(q.x,2.)-1.;
  q.z=mod(q.z,2.)-1.;
  q2.x=mod(q2.x,(2.+.25))-(2.+.25)/2.;
  q=abs(q);
  q2=abs(q2);
  float tunDetail=max(min(q.y,q.z)-.07,-(min(q.y,q.z)-.007));
  tun=min(tun,max(tunDetail,tun-depth));
  float blt=max(max(q2.x*.866025+q2.y*.5,q2.y)-.055,q.z-.16);
  float thread=max(sin(q.z*6.283*64.)*2.,0.)*.002;
  float rod=max(length(q2.xy)-.025+thread,q.z-.19);
  rod=min(rod,max(length(q2.xy)-.075,q.z-.09));
  vObjID=vec3(tun,blt,rod);
  return min(min(tun,blt),rod);
}
float refTrace(vec3 ro,vec3 rd){
  float t=0.;
  for(int i=0;i<12;i++){
    float d=map(ro+rd*t);
    if(abs(d)<.005*(t*.25+1.)||t>FAR)break;
    t+=d;
  }
  return t;
}

float trace(vec3 ro,vec3 rd){
  float t=0.,d;
  for(int i=0;i<96;i++){
    d=map(ro+rd*t);
    if(abs(d)<.001*(t*.125+1.)||t>FAR)break;
    t+=d;
  }
  return min(t,FAR);
}
vec3 nrHyb(vec3 p,inout float crv,float ef){
  vec2 e=vec2(-1.,1.)*.66*ef/450.;
  float d1=map(p+e.yxx),d2=map(p+e.xxy);
  float d3=map(p+e.xyx),d4=map(p+e.yyy);
  float d=map(p);
  float d5,d6;
  crv=clamp((d1+d2+d3+d4-d*4.)*24.+.5,0.,1.);
  e=vec2(.005,0);
  d1=map(p+e.xyy),d2=map(p-e.xyy);
  d3=map(p+e.yxy),d4=map(p-e.yxy);
  d5=map(p+e.yyx),d6=map(p-e.yyx);
  return normalize(vec3(d1-d2,d3-d4,d5-d6));
}
vec3 nrRef(in vec3 p,inout float crv,in float ef){
  vec2 e=vec2(-1.,1.)*.66*ef/450.;
  float d1=map(p+e.yxx),d2=map(p+e.xxy);
  float d3=map(p+e.xyx),d4=map(p+e.yyy);
  float d=map(p);
  crv=clamp((d1+d2+d3+d4-d*4.)*24.+.5,0.,1.);
  e=vec2(-1.,1.)*.002;
  d1=map(p+e.yxx),d2=map(p+e.xxy);
  d3=map(p+e.xyx),d4=map(p+e.yyy);
  return normalize(e.yxx*d1+e.xxy*d2+e.xyx*d3+e.yyy*d4);
}
float cao(in vec3 p,in vec3 n){
  float sca=1.,occ=0.;
  for(float i=0.;i<5.;i++){
    float hr=.01+i*.5/4.;
    float dd=map(n*hr+p);
    occ+=(hr-dd)*sca;
    sca*=.7;
  }
  return clamp(1.-occ,0.,1.);
}
float softShadow(vec3 ro,vec3 lp,float k){
  const int maxIterationsShad=20;
  vec3 rd=(lp-ro);
  float shade=1.;
  float dist=.05;
  float end=max(length(rd),.001);
  rd/=end;
  for(int i=0;i<maxIterationsShad;i++){
    float h=map(ro+rd*dist);
    shade=min(shade,k*h/dist);
    dist+=clamp(h,.01,.25);
    if(h<.001||dist>end)break;
  }
  return min(max(shade,0.)+.2,1.);
}
vec3 palette(float t){
  vec3 a=vec3(.5,.5,.5);
  vec3 b=vec3(.5,.5,.5);
  vec3 c=vec3(1.,1.,1.);
  vec3 d=vec3(sin(uTime*.2)*.5+.5,cos(uTime*.25)*.5+.5,sin(uTime*.3+1.)*.5+.5);
  return a+b*cos(6.28318*(c*t+d));
}
void main(){
  vec2 u=(vUv-vec2(.5))*2.;
  #ifdef THREE_D
  float sg=sign(fragCoord.x-.5*iResolution.x);
  u.x-=sg*.25*iResolution.x/iResolution.y;
  #endif
  float speed=2.;
  vec3 ro=camPath(uTime*speed+.0);
  vec3 lk=camPath(uTime*speed+.5);
  vec3 lp=camPath(uTime*speed+2.);
  lp.y+=.5;
  #ifdef THREE_D
  ro.x-=sg*.15;lk.x-=sg*.15;lp.x-=sg*.15;
  #endif
  float FOV=.75;
  vec3 fwd=normalize(lk-ro);
  vec3 rgt=normalize(vec3(fwd.z,0.,-fwd.x));
  vec3 up=cross(fwd,rgt);
  vec3 rd=fwd+FOV*(u.x*rgt+u.y*up);
  rd=normalize(vec3(rd.xy,(rd.z-length(rd.xy)*.25)*.75));
  float swivel=camPath(lk.z).x;
  rd.xy=rot(swivel/48.)*rd.xy;
  rd.xz=rot(swivel/32.)*rd.xz;
  float t=trace(ro,rd);
  vec2 vObj=objMin(vec2(vObjID.x,TUN),vec2(vObjID.y,BLT));
  vObj=objMin(vObj,vec2(vObjID.z,ROD));
  svObjID=vObj.y;
  vec3 sp=ro+rd*t;
  float crv=1.,ef=8.;
  vec3 sn=nrHyb(sp,crv,ef);
  float sh=softShadow(sp,lp,16.);
  float ao=cao(sp,sn);
  vec3 ld=lp-sp;
  float lDist=max(length(ld),.0001);
  ld/=lDist;
  float atten=1./(1.+lDist*.25+lDist*lDist*.025);
  const float tSize0=1./1.;
  vec3 tx=palette(rd.z+uTime*.4);
  tx=tx*.5+smoothstep(.02,.8,tx)*1.;
  float gr=dot(tx,vec3(.299,.587,.114));
  if(svObjID==TUN)tx*=vec3(1);
  else if(svObjID==ROD)tx=(gr*.5+.5)*vec3(1);
  else if(svObjID==BLT)tx=(tx*.5+.5)*vec3(1.4,.7,.05);
  float dif=max(dot(ld,sn),0.);
  float spe=pow(max(dot(reflect(rd,sn),ld),0.),64.);
  float Schlick=pow(1.-max(dot(rd,normalize(rd+ld)),0.),5.);
  Schlick=mix(.5,1.,Schlick);
  if(svObjID!=TUN)
  dif=(pow(dif,4.)*.5+pow(dif,8.)*.5)*3.;
  vec3 ref=reflect(rd,sn);
  float rt=refTrace(sp+ref*.1,ref);
  vObj=objMin(vec2(vObjID.x,TUN),vec2(vObjID.y,BLT));
  vObj=objMin(vObj,vec2(vObjID.z,ROD));
  svObjID2=vObj.y;
  float crv2=1.;
  vec3 rsp=sp+ref*rt;
  vec3 rsn=nrRef(rsp,crv2,ef);
  vec3 rCol=palette(u.x+uTime*.4);
  rCol=smoothstep(.02,.8,rCol)*2.;
  gr=dot(rCol,vec3(.299,.587,.114));
  if(svObjID2==TUN)rCol*=vec3(1);
  else if(svObjID2==ROD)rCol=(gr*.5+.5)*vec3(1);
  else if(svObjID2==BLT)rCol=(rCol*.5+.5)*vec3(1.4,.7,.05);
  float rDiff=max(dot(rsn,normalize(lp-rsp)),0.);
  float rSpec=pow(max(dot(reflect(ref,rsn),normalize(lp-rsp)),0.),8.);
  float rlDist=length(lp-rsp);
  if(svObjID2!=TUN)rDiff=(pow(rDiff,4.)*.5+pow(rDiff,8.)*.5)*3.;
  rCol=rCol*(rDiff+.25)+vec3(1.,.6,.2)*rSpec*2.;
  rCol*=1./(1.+rlDist*.25+rlDist*rlDist*.025);
  rCol*=min(crv2*1.5,1.);
  vec3 fc=tx*(dif+ao*.3)+vec3(1,.6,.2)*spe*Schlick*2.;
  if(svObjID!=TUN)fc+=rCol*.5;
  else fc+=rCol*.25;
  fc*=atten*sh*ao;
  fc*=clamp(crv*1.5,0.,1.);
  vec3 bg=vec3(1,.7,.4);
  fc=mix(fc,bg*2.,smoothstep(0.,.95,t/FAR));
  gl_FragColor=vec4(pow(clamp(fc,0.,1.),vec3(1./2.)),1.);// 1./2.2, etc.
}
