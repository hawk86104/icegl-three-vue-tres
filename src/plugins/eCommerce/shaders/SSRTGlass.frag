uniform sampler2D uSkybox;
uniform sampler2D uBackFaceBuffer;
uniform sampler2D uFrontFaceBuffer;

uniform vec3 uExtintionColor1;
uniform vec3 uExtintionColor2;
uniform float uExtintionFactor;
uniform float uExposure;
uniform float uReflectionFactor;
uniform vec4 uExtinctionFX1;

uniform float uTime;

uniform vec3 uCameraPos;
uniform vec2 uScreenSizeInv;
uniform float uCameraFarInverse;

varying vec3 vWorldSpaceFragPos;
varying vec3 vWorldSpaceNormal;
varying mat4 vProjViewMatrix;
varying mat4 vViewMatrix;

const float PI=3.14159265359;
const float e=2.7182818284590;

const float planeSize=3.;
const vec3 planeColor=pow(vec3(202./255.,205./255.,185./255.),vec3(3.));

float mod289(float x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 perm(vec4 x){return mod289(((x*34.)+1.)*x);}

float noise(vec3 p){
	vec3 a=floor(p);
	vec3 d=p-a;
	d=d*d*(3.-2.*d);
	
	vec4 b=a.xxyy+vec4(0.,1.,0.,1.);
	vec4 k1=perm(b.xyxy);
	vec4 k2=perm(k1.xyxy+b.zzww);
	
	vec4 c=k2+a.zzzz;
	vec4 k3=perm(c);
	vec4 k4=perm(c+1.);
	
	vec4 o1=fract(k3*(1./41.));
	vec4 o2=fract(k4*(1./41.));
	
	vec4 o3=o2*d.z+o1*(1.-d.z);
	vec2 o4=o3.yw*d.x+o3.xz*(1.-d.x);
	
	return o4.y*d.y+o4.x*(1.-d.y);
}

vec3 acesFilm(const vec3 x){
	const float a=2.51;
	const float b=.03;
	const float c=2.43;
	const float d=.59;
	const float e=.14;
	return clamp((x*(a*x+b))/(x*(c*x+d)+e),0.,1.);
}

// gets the skybox color from a given view direction
vec3 getSkyboxColor(vec3 viewDir){
	// skybox coordinates
	vec2 skyboxUV=vec2(
		(atan(viewDir.x,viewDir.z)+PI)/(PI*2.),
		(asin(viewDir.y)+PI*.5)/(PI)
	);
	
	vec3 col=texture2D(uSkybox,skyboxUV).xyz;
	col=pow(col,vec3(2.2));
	return col;
}

bool refract2(vec3 v,vec3 n,float ni_over_nt,inout vec3 refracted){
	vec3 uv=normalize(v);
	float dt=dot(uv,n);
	float discriminant=1.-ni_over_nt*ni_over_nt*(1.-dt*dt);
	if(discriminant>0.){
		refracted=ni_over_nt*(v-n*dt)-n*sqrt(discriminant);
		return true;
	}
	
	return false;
}

vec3 binarySearchHitPoint(vec3 lastP,vec3 hitP,vec3 rayDir){
	
	for(int i=0;i<10;i++){
		vec3 midP=(lastP+hitP)*.5;
		
		// project midP in uv space
		vec4 projCoord=vProjViewMatrix*vec4(midP,1.);
		projCoord.xyz/=projCoord.w;
		
		vec2 midpNDC=projCoord.xy;
		vec2 midpUV=midpNDC*.5+.5;
		
		// get depth at point
		vec4 backBuffer=texture2D(uBackFaceBuffer,midpUV);
		float depth=backBuffer.w;
		
		float midpDepth=abs((vViewMatrix*vec4(midP,1.)).z)*uCameraFarInverse;
		if(midpDepth>depth){
			hitP=midP;
		}else{
			lastP=midP;
		}
	}
	
	return hitP;
}

vec3 getRefractedColor(vec3 refractionDir,vec3 hitPoint,float refractionIndex){
	// move the hitpoint inside the mesh with epsilon
	hitPoint+=refractionDir*.0001;
	
	// raymarch!
	float stepSize=.02;
	float stepMult=1.5;
	
	vec3 lastP=hitPoint;
	vec3 p=hitPoint;
	vec3 hitPNormal;
	float currStepSize=stepSize;
	float transmissionDistance=0.;
	for(int i=0;i<20;i++){
		p+=currStepSize*refractionDir;
		
		// project p in uv space
		vec4 projCoord=vProjViewMatrix*vec4(p,1.);
		projCoord.xyz/=projCoord.w;
		
		vec2 pNDC=projCoord.xy;
		vec2 pUV=pNDC*.5+.5;
		
		// get depth at point
		vec4 backBuffer=texture2D(uBackFaceBuffer,pUV);
		float depth=backBuffer.w;
		vec3 norm=backBuffer.xyz;
		
		// get p depth
		float pDepth=abs((vViewMatrix*vec4(p,1.)).z)*uCameraFarInverse;
		
		if(pDepth>depth){
			
			vec3 hitp=binarySearchHitPoint(lastP,p,refractionDir);
			p=hitp;
			
			// ************ get the hitpoint normal
			vec4 projCoord=vProjViewMatrix*vec4(p,1.);
			projCoord.xyz/=projCoord.w;
			
			vec2 pNDC=projCoord.xy;
			vec2 pUV=pNDC*.5+.5;
			
			// get depth at point
			hitPNormal=texture2D(uBackFaceBuffer,pUV).xyz;
			// ************ get the hitpoint normal - END
			
			break;
		}
		
		lastP=p;
		currStepSize*=stepMult;
	}
	
	transmissionDistance=length(hitPoint-p);
	
	// ******************** recalc directions
	vec3 outward_normal;
	vec3 reflected=reflect(refractionDir,hitPNormal);
	float ni_over_nt;
	vec3 refr;
	// vec3 refracted;
	float reflect_prob;
	float cosine;
	
	if(dot(refractionDir,hitPNormal)>0.){
		outward_normal=-hitPNormal;
		ni_over_nt=refractionIndex;
		cosine=refractionIndex*dot(refractionDir,hitPNormal);
	}else{
		outward_normal=hitPNormal;
		ni_over_nt=1./refractionIndex;
		cosine=-dot(refractionDir,hitPNormal);
	}
	
	// if (refract2(refractionDir, outward_normal, ni_over_nt, refracted)) {
		if(refract2(refractionDir,outward_normal,ni_over_nt,refr)){
			float r0=(1.-refractionIndex)/(1.+refractionIndex);
			r0*=r0;
			reflect_prob=r0+(1.-r0)*pow((1.-cosine),5.);
		}else{
			reflect_prob=1.;
		}
		// ******************** recalc directions - END
		
		// ******************** get colors
		vec3 col;
		vec3 colrefl;
		vec3 colrefr;
		// if(refracted.y < 0.0) {
			if(refr.y<0.){
				// float t = p.y / abs(refracted.y);
				// vec3 planeHitP = p + refracted * t;
				float t=p.y/abs(refr.y);
				vec3 planeHitP=p+refr*t;
				if(abs(planeHitP.x)<planeSize&&abs(planeHitP.z)<planeSize){
					colrefr=planeColor;
				}else{
					// colrefr = getSkyboxColor(refracted);
					colrefr=getSkyboxColor(refr);
				}
			}else{
				// colrefr = getSkyboxColor(refracted);
				colrefr=getSkyboxColor(refr);
			}
			
			if(reflected.y<0.){
				float t=p.y/abs(reflected.y);
				vec3 planeHitP=p+reflected*t;
				if(abs(planeHitP.x)<planeSize&&abs(planeHitP.z)<planeSize){
					colrefl=planeColor;
				}else{
					colrefl=getSkyboxColor(reflected);
				}
			}else{
				colrefl=getSkyboxColor(reflected);
			}
			
			col=colrefl*(reflect_prob*uReflectionFactor)+colrefr*(1.-reflect_prob);
			// ******************** get colors
			
			vec3 transm=vec3(1.);
			// const int steps = 8;
			const int steps=15;
			float step=transmissionDistance/float(steps);
			float fc=uExtintionFactor*.07;
			
			// raymarching transmission color
			
			// float noiseStrength = 0.8;
			float noiseSpeed=.5;
			float noiseTimeSpeed=.5;
			
			for(int i=0;i<steps;i++){
				vec3 np=hitPoint+refractionDir*float(i)*step;
				
				vec3 nnp=np;
				vec3 w=normalize(np-vec3(.75,1.5,0.));
				vec3 u=vec3(0.,0.,1.);
				// vec3 timeOffset = uTime * normalize(np - vec3(0.75, 1.5, 0.0));
				vec3 timeOffset=cos(uTime)*w+sin(uTime)*u;
				float colorNoiseX=noise(np*noiseSpeed+timeOffset*noiseTimeSpeed);
				float colorNoiseY=noise(np*noiseSpeed+timeOffset*noiseTimeSpeed+vec3(15.3278,125.19879,0.));
				float colorNoiseZ=noise(np*noiseSpeed+timeOffset*noiseTimeSpeed+vec3(2.6008,78.19879,543.12993));
				
				float targ=length(nnp*.8*uExtinctionFX1.w-vec3(.75,1.5,0.));
				float targAperture=.25;
				
				// wave raymarch
				if(uExtinctionFX1.z>.5){
					nnp=np+sin(np.x*2.5+uTime*1.5)*.3;
					targ=nnp.y-.85*uExtinctionFX1.w;
				}else{
					nnp=np+vec3(colorNoiseX,colorNoiseY,colorNoiseZ)*1.05;
					vec3 diff=nnp-vec3(3.3,4.5,0.);
					float angle=(atan(diff.x,diff.y)+PI)/(PI*2.);
					targ=length(diff)+sin(angle*32.*PI+uTime*1.5)*.4;
					targ*=.475;
					targAperture=.5+colorNoiseX*.75;
				}
				
				// what's the color at np?
				vec3 col1=uExtintionColor1;
				vec3 col2=uExtintionColor2;
				if(uExtinctionFX1.x>.5){
					col1=vec3(colorNoiseX,colorNoiseY,colorNoiseZ)*.85;
				}
				if(uExtinctionFX1.y>.5){
					col2=vec3(colorNoiseX,colorNoiseY,colorNoiseZ)*.85;
				}
				
				if(targ<1.){
					
					transm*=exp(-step*col2*fc);
					
				}else if(targ>1.&&targ<1.+targAperture){
					float t=(targ-1.)/targAperture;
					
					transm*=exp(-step*(col1*t+col2*(1.-t))*fc);
					
				}else if(targ<(1.+targAperture)*1.85){
					transm*=exp(-step*col1*fc);
					
				}else{
					// transm = (col1) * targAperture;
					// transm *= exp(-step * col1 * uExtintionFactor);
					
				}
			}
			
			// return col * uExtintionColor2 * transm;
			col*=transm;
			
			return col;
		}
		
		void main(){
			vec2 screenUV=gl_FragCoord.xy*uScreenSizeInv;
			
			vec3 viewDir=normalize(vWorldSpaceFragPos-uCameraPos);
			vec3 normal=vWorldSpaceNormal;
			float refractionIndex=1.5;
			
			vec3 outward_normal;
			vec3 reflected=reflect(viewDir,normal);
			float ni_over_nt;
			vec3 refracted;
			float reflect_prob;
			float cosine;
			
			if(dot(viewDir,normal)>0.){
				outward_normal=-normal;
				ni_over_nt=refractionIndex;
				cosine=refractionIndex*dot(viewDir,normal);
			}else{
				outward_normal=normal;
				ni_over_nt=1./refractionIndex;
				cosine=-dot(viewDir,normal);
			}
			
			if(refract2(viewDir,outward_normal,ni_over_nt,refracted)){
				float r0=(1.-refractionIndex)/(1.+refractionIndex);
				r0*=r0;
				reflect_prob=r0+(1.-r0)*pow((1.-cosine),5.);
			}else{
				reflect_prob=1.;
			}
			
			vec3 reflectedCol;
			if(reflected.y<0.){
				float t=vWorldSpaceFragPos.y/abs(reflected.y);
				vec3 planeHitP=vWorldSpaceFragPos+reflected*t;
				if(abs(planeHitP.x)<planeSize&&abs(planeHitP.z)<planeSize){
					reflectedCol=planeColor;
				}else{
					reflectedCol=getSkyboxColor(reflected);
				}
			}else{
				reflectedCol=getSkyboxColor(reflected);
			}
			
			vec3 col=reflectedCol*reflect_prob*uReflectionFactor+getRefractedColor(refracted,vWorldSpaceFragPos,refractionIndex)*(1.-reflect_prob);
			// getRefractedColor(normalize(refracted + vec3(0.0, 0.0, 0.0)), vWorldSpaceFragPos) * (1.0 - reflect_prob) * 0.333 +
			// getRefractedColor(normalize(refracted + vec3(0.0, 0.15, 0.0)), vWorldSpaceFragPos) * (1.0 - reflect_prob) * 0.333 +
			// getRefractedColor(normalize(refracted + vec3(0.0, 0.35, 0.0)), vWorldSpaceFragPos) * (1.0 - reflect_prob) * 0.333;
			
			// col = getRefractedColor(refracted, vWorldSpaceFragPos) * (1.0 - reflect_prob);
			// vec3 col = getRefractedColor(refracted, vWorldSpaceFragPos);
			// col = getSkyboxColor(reflected) * reflect_prob * 1.0;
			
			// vec3 col = viewDir;
			// gl_FragColor = vec4(col, 1.0);
			// return;
			
			col*=pow(2.,uExposure);
			col=acesFilm(col);
			col=pow(col,vec3(1./2.2));
			
			gl_FragColor=vec4(col,1.);
			// gl_FragColor = vec4(getSkyboxColor(viewDir), 1.0) * 0.5 + vec4(viewDir * 0.5 + 0.5, 1.0);
		}