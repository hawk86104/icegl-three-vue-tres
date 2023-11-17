uniform float p;
uniform float uTime;
uniform float uSlowTime;
uniform float uBubblesUp;
varying float intensity;
attribute vec2 aDelayDuration;
attribute float size;
attribute vec4 bubbles;
varying float alpha;

float easeExpoInOut(float p){
    return((p*=2.)<1.)?.5*pow(2.,10.*(p-1.)):.5*(2.-pow(2.,-10.*(p-1.)));
}

void main()
{
    intensity=.9;
    vec4 mvPosition=modelViewMatrix*vec4(position,1.);
    gl_PointSize=size*(300./-mvPosition.z);
    float m=mod(size,sin(uSlowTime*.12+size));
    
    alpha=step(.5,abs(m));
    if(m>.5&&m<.7){
        gl_PointSize=.9*size;
    }
    if(m>.8){
        gl_PointSize=.9*size;
    }
    
    gl_Position=projectionMatrix*mvPosition;
    
    if(bubbles.w>0.&&bubbles.w<2.&&bubbles.x!=0.&&bubbles.y!=0.){
        gl_PointSize=size+15.;
        alpha=clamp(abs(sin(uTime-bubbles.y)),.3,1.);
        
        float tProgress=smoothstep(0.,aDelayDuration.x,uBubblesUp);
        vec3 tranlated=mix(position,bubbles.xyz,tProgress);
        vec4 bPosition=modelViewMatrix*vec4(tranlated,1.);
        
        gl_PointSize=uBubblesUp*gl_PointSize;
        gl_Position+=projectionMatrix*bPosition;
        alpha=5.;
    }
    
    if(bubbles.w==2.){
        alpha=clamp(abs(sin(uTime-bubbles.y)),.3,.6);
        gl_PointSize=size+60.;
        
        gl_PointSize=uBubblesUp*gl_PointSize;
        float normalized=clamp(uBubblesUp,0.,2.)*2.;
        vec3 tranlated=mix(position,bubbles.xyz,normalized);
        vec4 bPosition=modelViewMatrix*vec4(tranlated,1.);
        gl_Position+=projectionMatrix*bPosition;
    }
    if(bubbles.w==3.){
        alpha=clamp(abs(sin(uTime-bubbles.y)),.3,1.);
        gl_PointSize=size+90.;
        
        gl_PointSize=uBubblesUp*gl_PointSize;
        float normalized=clamp(uBubblesUp,0.,2.)*2.;
        vec3 tranlated=mix(position,bubbles.xyz,normalized);
        vec4 bPosition=modelViewMatrix*vec4(tranlated,1.);
        gl_Position+=projectionMatrix*bPosition;
    }
}