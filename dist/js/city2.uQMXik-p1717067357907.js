import{ax as T,ca as r,az as s,bp as k,aA as M,bu as z,a1 as C,ap as O,a9 as B,aD as P,aE as j,l as A,o as u,c as U,x as p,E as h,Y as d,L as x,ag as w,a as _,G as W,cf as E,r as N,ac as D}from"./vendor.Bhln4awG1717067357907.js";import{L as V,a as L,b as F}from"./LineSegments2.5efbUp_i1717067357907.js";import{C as G}from"./vanilla.YA2K2vt81717067357907.js";import{r as g,i as I,s as H}from"./utils.9Ipa0R2i1717067357907.js";import{_ as q}from"./roadLight.vue_vue_type_script_setup_true_lang.3AX8THzW1717067357907.js";import"./object_hash.MnKN4xNn1717067357907.js";import"./_commonjsHelpers.5-cIlDoe1717067357907.js";import"./_commonjs-dynamic-modules.h-SxKiO41717067357907.js";import"./builtins-300es.Tm_BdSQ71717067357907.js";import"./Water2.2RLgZqgH1717067357907.js";import"./Reflector.HzQhW9iS1717067357907.js";import"./ExtensionUtilities.yX0HotEy1717067357907.js";const R="varying vec4 vPosition;\nvoid main(){\n	vPosition=modelMatrix*vec4(position,1.);\n	csm_Position=position*vec3(1.);\n}",$="uniform mat4 modelMatrix;\nvarying vec4 vPosition;\nuniform vec3 uMax;\nuniform vec3 uMin;\nuniform float uOpacity;\nuniform float uBorderWidth;\nuniform vec3 uLightColor;\nuniform vec3 uColor;\nuniform float uCircleTime;\nuniform float uTime;\nuniform vec3 uTopColor;//顶部颜色\nuniform bool uGradient;\nvec4 uMax_world;\nvec4 uMin_world;\nvoid main(){\n	// 转世界坐标\n	uMax_world=modelMatrix*vec4(uMax,1.);\n	uMin_world=modelMatrix*vec4(uMin,1.);\n	vec3 distColor=uColor;\n	float residue=uTime-floor(uTime/uCircleTime)*uCircleTime;\n	float rate=residue/uCircleTime;\n	float lightOffset=rate*(uMax_world.y-uMin_world.y);\n	\n	if(uMin_world.y+lightOffset<vPosition.y&&uMin_world.y+lightOffset+uBorderWidth>vPosition.y){\n		csm_DiffuseColor=vec4(uLightColor,uOpacity);\n	}else{\n		csm_DiffuseColor=vec4(distColor,uOpacity);\n	}\n	\n	//根据高度计算颜色\n	if(uGradient){\n		float rateHight=(vPosition.y-uMin_world.y)/(uMax_world.y-uMin_world.y);\n		vec3 outColor=mix(csm_DiffuseColor.xyz,uTopColor,rateHight*2.);\n		csm_DiffuseColor=vec4(outColor,uOpacity);\n	}\n}";class Y extends T{constructor(e={}){super(),this.vertexShader="\n      #define STANDARD\n      varying vec3 vViewPosition;\n      #ifdef USE_TRANSMISSION\n      varying vec3 vWorldPosition;\n      #endif\n    \n      varying vec2 vUv;\n      varying vec4 vPos;\n      varying vec3 vNormalW;\n      varying vec3 vPositionW;\n\n      #include <common>\n      #include <uv_pars_vertex>\n      #include <envmap_pars_vertex>\n      #include <color_pars_vertex>\n      #include <fog_pars_vertex>\n      #include <morphtarget_pars_vertex>\n      #include <skinning_pars_vertex>\n      #include <logdepthbuf_pars_vertex>\n      #include <clipping_planes_pars_vertex>\n\n      void main() {\n        \n        #include <uv_vertex>\n        #include <color_vertex>\n        #include <morphcolor_vertex>\n      \n        #if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n      \n          #include <beginnormal_vertex>\n          #include <morphnormal_vertex>\n          #include <skinbase_vertex>\n          #include <skinnormal_vertex>\n          #include <defaultnormal_vertex>\n      \n        #endif\n      \n        #include <begin_vertex>\n        #include <morphtarget_vertex>\n        #include <skinning_vertex>\n        #include <project_vertex>\n        #include <logdepthbuf_vertex>\n        #include <clipping_planes_vertex>\n      \n        #include <worldpos_vertex>\n        #include <envmap_vertex>\n        #include <fog_vertex>\n\n        mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;\n\n        vUv = uv;\n        vPos = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );\n        vPositionW = vec3( vec4( transformed, 1.0 ) * modelMatrix);\n        vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ) );\n        \n        gl_Position = modelViewProjectionMatrix * vec4( transformed, 1.0 );\n\n      }",this.fragmentShader=" \n      varying vec2 vUv;\n      varying vec3 vPositionW;\n      varying vec4 vPos;\n      varying vec3 vNormalW;\n      \n      uniform float time;\n      uniform float fresnelOpacity;\n      uniform float scanlineSize;\n      uniform float fresnelAmount;\n      uniform float signalSpeed;\n      uniform float hologramBrightness;\n      uniform float hologramOpacity;\n      uniform bool blinkFresnelOnly;\n      uniform bool enableBlinking;\n      uniform vec3 hologramColor;\n\n      float flicker( float amt, float time ) {return clamp( fract( cos( time ) * 43758.5453123 ), amt, 1.0 );}\n      float random(in float a, in float b) { return fract((cos(dot(vec2(a,b) ,vec2(12.9898,78.233))) * 43758.5453)); }\n\n      void main() {\n        vec2 vCoords = vPos.xy;\n        vCoords /= vPos.w;\n        vCoords = vCoords * 0.5 + 0.5;\n        vec2 myUV = fract( vCoords );\n\n        // Defines hologram main color\n        vec4 hologramColor = vec4(hologramColor, mix(hologramBrightness, vUv.y, 0.5));\n\n        // Add scanlines\n        float scanlines = 10.;\n        scanlines += 20. * sin(time *signalSpeed * 20.8 - myUV.y * 60. * scanlineSize);\n        scanlines *= smoothstep(1.3 * cos(time *signalSpeed + myUV.y * scanlineSize), 0.78, 0.9);\n        scanlines *= max(0.25, sin(time *signalSpeed) * 1.0);        \n        \n        // Scanlines offsets\n        float r = random(vUv.x, vUv.y);\n        float g = random(vUv.y * 20.2, 	vUv.y * .2);\n        float b = random(vUv.y * .9, 	vUv.y * .2);\n\n        // Scanline composition\n        hologramColor += vec4(r*scanlines, b*scanlines, r, 1.0) / 84.;\n        vec4 scanlineMix = mix(vec4(0.0), hologramColor, hologramColor.a);\n\n        // Calculates fresnel\n        vec3 viewDirectionW = normalize(cameraPosition - vPositionW);\n        float fresnelEffect = dot(viewDirectionW, vNormalW) * (1.6 - fresnelOpacity/2.);\n        fresnelEffect = clamp(fresnelAmount - fresnelEffect, 0., fresnelOpacity);\n\n        // Blinkin effect\n        //Suggested by Octano - https://x.com/OtanoDesign?s=20\n        float blinkValue = enableBlinking ? 0.6 - signalSpeed : 1.0;\n        float blink = flicker(blinkValue, time * signalSpeed * .02);\n    \n        // Final shader composition\n        vec3 finalColor;\n\n        if(blinkFresnelOnly){\n          // finalColor = vec3(1.0,1.0,0);\n          finalColor = scanlineMix.rgb + fresnelEffect * blink;\n        }else{\n          finalColor = scanlineMix.rgb * blink + fresnelEffect;\n        }\n\n        gl_FragColor = vec4( finalColor, hologramOpacity);\n\n      }",this.uniforms={time:new r(0),fresnelOpacity:new r(e.fresnelOpacity!==void 0?e.fresnelOpacity:1),fresnelAmount:new r(e.fresnelAmount!==void 0?e.fresnelAmount:.45),scanlineSize:new r(e.scanlineSize!==void 0?e.scanlineSize:8),hologramBrightness:new r(e.hologramBrightness!==void 0?e.hologramBrightness:1),signalSpeed:new r(e.signalSpeed!==void 0?e.signalSpeed:1),hologramColor:new r(e.hologramColor!==void 0?new s(e.hologramColor):new s("#00d5ff")),enableBlinking:new r(e.enableBlinking!==void 0?e.enableBlinking:!0),blinkFresnelOnly:new r(e.blinkFresnelOnly!==void 0?e.blinkFresnelOnly:!0),hologramOpacity:new r(e.hologramOpacity!==void 0?e.hologramOpacity:1)},this.clock=new k,this.setValues(e),this.depthTest=e.depthTest!==void 0?e.depthTest:!1,this.blending=e.blendMode!==void 0?e.blendMode:M,this.transparent=!0,this.side=e.side!==void 0?e.side:z}update(){this.uniforms.time.value=this.clock.getElapsedTime()}}const J=C({__name:"importantBuildings",props:{group:{}},setup(m){const e=m,c={fresnelAmount:0,fresnelOpacity:0,scanlineSize:15,signalSpeed:1.3,hologramColor:"#e05b0f"},o=new Y({blendMode:M,hologramBrightness:2.5,side:O});o.uniforms.fresnelAmount.value=c.fresnelAmount,o.uniforms.scanlineSize.value=c.scanlineSize,o.uniforms.signalSpeed.value=c.signalSpeed,o.uniforms.fresnelOpacity.value=c.fresnelOpacity,o.uniforms.hologramColor.value=new s(c.hologramColor),o.uniforms.enableBlinking.value=!1,o.depthTest=!0;let i,t,a=null;(()=>{const n=e.group.getObjectByName("02-huanqiujinrongzhongxin_huanqiujinrongzhongxin_0");n.name="环球金融中心",n.material.dispose(),g(n.geometry),n.material=o,i=e.group.getObjectByName("01-shanghaizhongxindasha_shanghaizhongxindasha_0"),i.name="上海中心",i.material.dispose(),g(i.geometry),i.material=o.clone(),i.material.uniforms.hologramColor.value=new s("#006cf9"),i.material.uniforms.fresnelAmount.value=1,i.material.uniforms.scanlineSize.value=2.1,i.material.uniforms.signalSpeed.value=.4,t=e.group.getObjectByName("03-jinmaodasha_jjinmaodasha_0"),t.name="金茂大厦",t.material.dispose(),g(t.geometry),t.material=o.clone(),t.material.uniforms.hologramColor.value=new s("#5e0fe0"),t.material.uniforms.scanlineSize.value=15,t.material.uniforms.signalSpeed.value=.18,a=e.group.getObjectByName("04-dongfangmingzhu_dongfangmingzhu_0"),a.name="东方明珠塔",a.material.dispose(),g(a.geometry),a.material=o.clone(),a.material.uniforms.scanlineSize.value=5,a.material.uniforms.signalSpeed.value=1.3,a.material.uniforms.hologramColor.value=new s("#e00f0f"),a.material.uniforms.fresnelOpacity.value=.1})();const{onLoop:y}=B();return y(()=>{o.update(),i.material.update(),t.material.update(),a.material.update()}),(n,l)=>null}}),K=["object"],Q=C({__name:"buildingsMode",async setup(m){let e,c;I();const{scene:o}=([e,c]=P(()=>j("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/digitalCity/shanghaiDraco.gltf",{draco:!0,decoderPath:"./draco/"})),e=await e,c(),e),i=o.clone(),t=A(0),a=n=>{const{geometry:l}=n;l.computeBoundingBox(),l.computeBoundingSphere(),l.computeBoundsTree();const{max:b,min:f}=l.boundingBox,v=new G({baseMaterial:n.material,vertexShader:R,fragmentShader:$,silent:!0,uniforms:{uMax:{value:b},uMin:{value:f},uBorderWidth:{value:.006},uCircleTime:{value:3},uColor:{value:new s("#005c58")},uOpacity:{value:.8},uLightColor:{value:new s("#990")},uTopColor:{value:new s("#888800")},uTime:t,uGradient:{value:!0}},depthWrite:!0,depthTest:!0,transparent:!0,side:O});n.material.dispose(),n.material=v},S=n=>{const l=new E(n.geometry,1e3);let f=new V().fromEdgesGeometry(l);f.computeBoundsTree();let v=new L({color:new s("#000"),linewidth:.8,opacity:.6,transparent:!0,depthWrite:!0,depthTest:!0});v.resolution.set(window.innerWidth,window.innerHeight),n.add(new F(f,v))};i.traverse(async n=>{if(n.isMesh&&(n.name.indexOf("Shanghai")!==-1||n.name.indexOf("Object")!==-1)&&n.name.indexOf("Floor")===-1)if(n.name.indexOf("River")!==-1){const l=await H(n);l.position.set(0,0,1800),n.add(l)}else a(n),S(n)});const{onLoop:y}=B();return y(({delta:n})=>{t.value+=n}),(n,l)=>(u(),U(W,null,[(u(),p(w,null,{default:h(()=>[d("primitive",{object:x(i),position:[1,0,1],"cast-shadow":"","receive-shadow":""},null,8,K)]),_:1})),_(J,{group:x(i)},null,8,["group"])],64))}}),X=d("TresPerspectiveCamera",{position:[.5,2,1.5],fov:45,near:.1,far:1e5},null,-1),Z=d("TresAmbientLight",{color:"#ffffff"},null,-1),ee=d("TresDirectionalLight",{position:[0,3,3],intensity:2,color:"#ffffff","cast-shadow":"","shadow-mapSize-width":1024,"shadow-mapSize-height":1024},null,-1),ne=d("TresGridHelper",{args:[6,10],position:[0,0,0]},null,-1),ve=C({__name:"city2",setup(m){return(e,c)=>{const o=N("TresCanvas");return u(),p(o,{shadows:"","window-size":"",clearColor:"#333"},{default:h(()=>[X,_(x(D)),Z,ee,(u(),p(w,null,{default:h(()=>[_(Q)]),_:1})),(u(),p(w,null,{default:h(()=>[_(q,{color:"#ffffff",radius:1,speed:1,geoJson:"plugins/digitalCity/geojson/secondarySmall.geojson",rotationY:1.3826597599330712,scale:.001025905404044292,position:[-1.877460474821603,.01,-1.5464791950519081]})]),_:1})),ne]),_:1})}}});export{ve as default};
