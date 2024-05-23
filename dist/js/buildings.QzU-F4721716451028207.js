import{u as w,m as b,_ as S}from"./mergeTres.9KP7-cCh1716451028207.js";import{l as z}from"./utils.YeT2lYJK1716451028207.js";import{a1 as g,a2 as _,a6 as P,o as i,c,G as p,H as I,Y as u,aa as R,ab as U,a9 as F,r as L,a as s,E as m,a8 as M,x as k,ag as A,ah as W,ai as D,_ as N}from"./vendor.KwxG0fE31716451028207.js";import"./_commonjsHelpers.5-cIlDoe1716451028207.js";import"./Water2.Vz1dYfVW1716451028207.js";import"./Reflector.iKqzzvtM1716451028207.js";import"./ExtensionUtilities.CXR_JSZY1716451028207.js";const T="precision highp float;\n#define ambientRatio .5\n#define diffuseRatio .4\n#define specularRatio .1\n\nattribute vec2 faceUv;\nuniform vec4 u_color;\nvarying vec2 v_texCoord;\nvarying vec4 v_color;\nvarying float v_lightWeight;\n\nvoid main(){\n	\n	mat4 matModelViewProjection=projectionMatrix*modelViewMatrix;\n	\n	v_texCoord=faceUv;\n	\n	if(normal==vec3(0.,0.,1.)){\n		v_color=u_color;\n		gl_Position=matModelViewProjection*vec4(position,1.);\n		return;\n	}\n	\n	vec3 worldPos=vec3(vec4(position,1.)*modelMatrix);\n	vec3 worldNormal=vec3(vec4(normal,1.)*modelMatrix);// N\n	// //cal light weight  光亮度的权重\n	vec3 viewDir=normalize(cameraPosition-worldPos);// V\n	// 光照的方向， 前上方    Ild = k*I*(N·L)\n	vec3 lightDir=normalize(vec3(0.,-10.,1.));// L\n	vec3 halfDir=normalize(viewDir+lightDir);\n	// //lambert\n	float lambert=dot(worldNormal,lightDir);\n	//specular  //反射\n	float specular=pow(max(0.,dot(worldNormal,halfDir)),32.);\n	//sum to light weight  （lambert + 环境光）  Idiff = Iad + Ild = k*Ia + k*Il*（N·L）\n	float lightWeight=ambientRatio+diffuseRatio*lambert+specularRatio*specular;\n	v_texCoord=faceUv;\n	v_lightWeight=lightWeight;\n	\n	// 根据光照方向，调整光线明暗\n	\n	// v_lightWeight =  pow( 0.0 + 1.0 * abs(dot(worldNormal, worldPos)), 2.0);\n	\n	v_color=vec4(u_color.rgb*v_lightWeight,u_color.w);\n	\n	gl_Position=matModelViewProjection*vec4(position,1.);\n}",V="precision highp float;\nuniform float u_opacity;\nuniform vec4 u_baseColor;\nuniform vec4 u_color;\nuniform vec4 u_brightColor;\nuniform vec4 u_windowColor;\n\nuniform float u_zoom;\nuniform float u_time;\nuniform float u_near;\nuniform float u_far;\nvarying vec2 v_texCoord;\nvarying vec4 v_color;\nvarying float v_lightWeight;\n\nvec3 getWindowColor(float n,float hot,vec3 brightColor,vec3 darkColor){\n	float s=step(hot,n);\n	vec3 color=mix(brightColor,vec3(1.,1.,1.),n);\n	return mix(darkColor,color,s);\n}\n\nfloat random(vec2 st){\n	return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);\n}\n\nfloat LinearizeDepth()\n{\n	float z=gl_FragCoord.z*2.-1.;\n	return(2.*u_near*u_far)/(u_far+u_near-z*(u_far-u_near));\n}\n\nvec3 fog(vec3 color,vec3 fogColor,float depth){\n	float fogFactor=clamp(depth,0.,1.);\n	vec3 output_color=mix(fogColor,color,fogFactor);\n	return output_color;\n}\n\nfloat sdRect(vec2 p,vec2 sz){\n	vec2 d=abs(p)-sz;\n	float outside=length(max(d,0.));\n	float inside=min(max(d.x,d.y),0.);\n	return outside+inside;\n}\n\nvoid main(){\n	if(v_color.w==0.){\n		discard;\n		return;\n	}\n	vec3 baseColor=u_color.xyz;\n	vec3 brightColor=u_brightColor.xyz;\n	vec3 windowColor=u_windowColor.xyz;\n	float targetColId=5.;\n	float depth=1.-LinearizeDepth()/u_far*u_zoom;// 深度，调节明暗，远的颜色暗，近的颜色亮\n	vec3 fogColor=vec3(23./255.,31./255.,51./255.);\n	\n	if(v_texCoord.x<0.){//顶部颜色\n		vec3 foggedColor=fog(baseColor.xyz+vec3(.12*.9,.2*.9,.3*.9),fogColor,depth);\n		gl_FragColor=vec4(foggedColor,v_color.w*u_opacity);\n	}else{// 侧面颜色\n		\n		if(u_zoom<14.){\n			gl_FragColor=v_color;\n			return;\n		}\n		\n		if(v_texCoord.x<.01||v_texCoord.x>.99||v_texCoord.y<.01){\n			gl_FragColor=vec4(1.,.7,.25,.5);\n			return;\n		}\n		\n		vec2 st=v_texCoord;\n		vec2 UvScale=v_texCoord;\n		vec2 tStep=vec2(.05,.125);\n		vec2 tStart=vec2(tStep.x*.25,tStep.y*.25);\n		vec2 tEnd=vec2(tStep.x*.75,tStep.y*.75);\n		\n		float u=mod(UvScale.x,tStep.x);\n		float v=mod(UvScale.y,tStep.y);\n		float ux=floor(UvScale.x/tStep.x);\n		float uy=floor(UvScale.y/tStep.y);\n		float n=random(vec2(ux,uy));\n		float lightP=u_time;\n		float head=1.-step(.005,st.y);\n		/*step3*/\n		// 将窗户颜色和墙面颜色区别开来\n		float sU=step(tStart.x,u)-step(tEnd.x,u);\n		float sV=step(tStart.y,v)-step(tEnd.y,v);\n		vec2 windowSize=vec2(abs(tEnd.x-tStart.x),abs(tEnd.y-tStart.y));\n		float dist=sdRect(vec2(u,v),windowSize);\n		float s=sU*sV;\n		\n		float curColId=ux;// floor(UvScale.x / tStep.x);\n		float sCol=step(targetColId-.2,curColId)-step(targetColId+.2,curColId);\n		\n		float mLightP=mod(lightP,2.);\n		float sRow=step(mLightP-.2,st.y)-step(mLightP,st.y);\n		if(ux==targetColId){\n			n=0.;\n		}\n		// float hot = min(1.0, abs (sin(u_time/6.0) ) );\n		// float hot = smoothstep(1.0,0.0,timeP);\n		//hot = clamp(hot,0.2,0.8);\n		vec3 color=mix(baseColor,getWindowColor(n,u_time,brightColor,windowColor),s);\n		\n		float sFinal=s*sCol*sRow;\n		color+=mix(baseColor,brightColor,sFinal*n);\n		\n		if(head==1.){// 顶部亮线\n			color=brightColor;\n		}\n		color=color*v_lightWeight;\n		\n		vec3 foggedColor=fog(color,fogColor,depth);\n		\n		gl_FragColor=vec4(foggedColor,1.);\n	}\n	\n}",j=["position","faceUv","normal"],E=g({__name:"buildingModels",setup(l){const n=w(),f=o=>{for(let t=0;t<o.length;t+=3){const e=[o[t],o[t+1]],a=n.mapHandle.customCoords.lngLatToCoord(e);o[t]=a[0],o[t+1]=a[1],o[t+2]=o[t+2]*.2}},v=_([]),d=async()=>{const o=await z("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/json/AMapGIS/latlngbuildings.geojson","buildings");for(let t=0;t<o.length;t++){const e=o[t];f(e.geometry);const a=new Float32Array(e.geometry),x=new Float32Array(e.faceUv),y=new Float32Array(e.geometry.length);v.push({positionArray:a,uvArray:x,normalArray:y})}},r={uniforms:{u_opacity:{value:1},u_time:{value:.45},u_color:{value:[.02,.15,.5,1]},u_zoom:{value:1},u_brightColor:{value:[1,1,1,1]},u_windowColor:{value:[.07,.07,.03,1]},u_near:{value:1},u_far:{value:1e3}},vertexShader:T,fragmentShader:V};P(()=>{n.cameraState&&d()});const{onLoop:C}=F();return C(()=>{n.cameraState&&(r.uniforms.u_zoom.value=n.mapHandle.getZoom(),r.uniforms.u_near.value=n.cameraState.near,r.uniforms.u_far.value=n.cameraState.far)}),(o,t)=>(i(),c("TresGroup",null,[(i(!0),c(p,null,I(v,(e,a)=>(i(),c("TresMesh",{key:"".concat(a)},[u("TresBufferGeometry",{ref_for:!0,ref:"tbgRef",position:[e.positionArray,3],faceUv:[e.uvArray,2],normal:[e.normalArray,3]},null,8,j),u("TresShaderMaterial",R(U(r)),null,16)]))),128))]))}}),h=l=>(W("data-v-40288e17"),l=l(),D(),l),B=h(()=>u("TresPerspectiveCamera",{fov:60,near:.1,far:2e3},null,-1)),G=h(()=>u("TresAmbientLight",{intensity:.5},null,-1)),$=g({__name:"buildings",setup(l){const n=[121.407867,31.157717],f=_({alpha:!0,antialias:!0,autoClear:!1,disableRender:!0});return(v,d)=>{const r=L("TresCanvas");return i(),c(p,null,[s(b,{center:n,zoom:19,pitch:65.59312320916906,mapStyle:"darkblue"}),s(r,M({id:"tresCanvas",ref:"tcRef"},f),{default:m(()=>[B,G,s(S,{center:n}),(i(),k(A,null,{default:m(()=>[s(E)]),_:1}))]),_:1},16)],64)}}}),Q=N($,[["__scopeId","data-v-40288e17"]]);export{Q as default};