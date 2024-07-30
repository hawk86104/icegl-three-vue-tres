import{$ as n,a as e,d as t}from"./@tresjs.Q03Md-En1722313330047.js";import{k as o,ba as r,C as i,a4 as a,aN as s,x as l,Z as c,ca as u,cb as f,cc as p,cd as d}from"./three.0L1oP_mX1722313330047.js";import{C as m}from"./three-custom-shader-material.rXUjQmJB1722313330047.js";import"./object-hash.aoN2vIR61722313330047.js";import"./@amap.cDim55ZW1722313330047.js";import"./glsl-tokenizer.pGV5rb2g1722313330047.js";import{r as v,i as g,s as h}from"./utils.kZzAVceA1722313330047.js";import{d as y,a4 as _,b as w,o as x,D as b,f as C,g as j,J as S,u as I,al as O,j as M,F as k,e as T}from"./@vue.Q1VpS3901722313330047.js";import{_ as z}from"./roadLight.vue_vue_type_script_setup_true_lang.m0xa2squ1722313330047.js";import"./tweakpane.yHWGBmom1722313330047.js";import"./@vueuse.UFv615y21722313330047.js";import"./glsl-token-string.u6gBgKVD1722313330047.js";import"./glsl-token-functions.VQWPL_na1722313330047.js";import"./jszip.49pgsWkw1722313330047.js";import"./@fesjs.Tyv7j4eO1722313330047.js";import"./vue-router.jRikjQi41722313330047.js";import"./lodash-es.nFpJXAf-1722313330047.js";import"./@qlin.yHhFDldE1722313330047.js";import"./pinia.YMTINUAO1722313330047.js";import"./@floating-ui.BPbuo5Gx1722313330047.js";import"./@juggle.7yjBMqoW1722313330047.js";import"./three-mesh-bvh.Q4SF0_jl1722313330047.js";var P=N;!function(n,e){for(var t=N,o=E();;)try{if(124561===-parseInt(t(430))/1+parseInt(t(427))/2*(-parseInt(t(395))/3)+parseInt(t(419))/4*(-parseInt(t(449))/5)+-parseInt(t(398))/6*(-parseInt(t(399))/7)+parseInt(t(404))/8+parseInt(t(446))/9+parseInt(t(440))/10)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();var B=function(){var n=!0;return function(e,t){var o=n?function(){if(t){var n=t.apply(e,arguments);return t=null,n}}:function(){};return n=!1,o}}();!function(){B(this,(function(){var n=N,e=new RegExp(n(396)),t=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=L(n(401));e.test(o+n(426))&&t.test(o+"input")?L():o("0")}))()}();var A=function(){var n=!0;return function(e,t){var o=n?function(){if(t){var n=t[N(422)](e,arguments);return t=null,n}}:function(){};return n=!1,o}}();function E(){var n=["clock","18647VifIkd","warn","exception","\n      #define STANDARD\n      varying vec3 vViewPosition;\n      #ifdef USE_TRANSMISSION\n      varying vec3 vWorldPosition;\n      #endif\n    \n      varying vec2 vUv;\n      varying vec4 vPos;\n      varying vec3 vNormalW;\n      varying vec3 vPositionW;\n\n      #include <common>\n      #include <uv_pars_vertex>\n      #include <envmap_pars_vertex>\n      #include <color_pars_vertex>\n      #include <fog_pars_vertex>\n      #include <morphtarget_pars_vertex>\n      #include <skinning_pars_vertex>\n      #include <logdepthbuf_pars_vertex>\n      #include <clipping_planes_pars_vertex>\n\n      void main() {\n        \n        #include <uv_vertex>\n        #include <color_vertex>\n        #include <morphcolor_vertex>\n      \n        #if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n      \n          #include <beginnormal_vertex>\n          #include <morphnormal_vertex>\n          #include <skinbase_vertex>\n          #include <skinnormal_vertex>\n          #include <defaultnormal_vertex>\n      \n        #endif\n      \n        #include <begin_vertex>\n        #include <morphtarget_vertex>\n        #include <skinning_vertex>\n        #include <project_vertex>\n        #include <logdepthbuf_vertex>\n        #include <clipping_planes_vertex>\n      \n        #include <worldpos_vertex>\n        #include <envmap_vertex>\n        #include <fog_vertex>\n\n        mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;\n\n        vUv = uv;\n        vPos = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );\n        vPositionW = vec3( vec4( transformed, 1.0 ) * modelMatrix);\n        vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ) );\n        \n        gl_Position = modelViewProjectionMatrix * vec4( transformed, 1.0 );\n\n      }","blinkFresnelOnly","gger","uniforms","call","return (function() ","update","741430qHZOrN","__proto__","length","fragmentShader","fresnelOpacity","blending","658593TxaMXy","transparent","toString","65TEKewL","#00d5ff",'{}.constructor("return this")( )',"1842jcPWSO","function *\\( *\\)","while (true) {}","36954udmhgt","119pYyAvS","enableBlinking","init","scanlineSize","hologramOpacity","910768CtpACq","bind","vertexShader","log","constructor","error","console","value","debu","hologramColor","setValues","blendMode","info","depthTest","action","29404LLNueX","counter","signalSpeed","apply","stateObject","table","fresnelAmount","chain","414wCcCDr","side"];return(E=function(){return n})()}function N(n,e){var t=E();return(N=function(n,e){return t[n-=394]})(n,e)}A(void 0,(function(){for(var n=N,e=function(){var n,e=N;try{n=Function(e(438)+e(394)+");")()}catch(t){n=window}return n}(),t=e[n(410)]=e[n(410)]||{},o=[n(407),n(431),n(416),n(409),n(432),n(424),"trace"],r=0;r<o[n(442)];r++){var i=A[n(408)].prototype[n(405)](A),a=o[r],s=t[a]||i;i[n(441)]=A[n(405)](A),i[n(448)]=s[n(448)][n(405)](s),t[a]=i}}))();class W extends o{constructor(n={}){var e=N;super(),this[e(406)]=e(433),this[e(443)]=" \n      varying vec2 vUv;\n      varying vec3 vPositionW;\n      varying vec4 vPos;\n      varying vec3 vNormalW;\n      \n      uniform float time;\n      uniform float fresnelOpacity;\n      uniform float scanlineSize;\n      uniform float fresnelAmount;\n      uniform float signalSpeed;\n      uniform float hologramBrightness;\n      uniform float hologramOpacity;\n      uniform bool blinkFresnelOnly;\n      uniform bool enableBlinking;\n      uniform vec3 hologramColor;\n\n      float flicker( float amt, float time ) {return clamp( fract( cos( time ) * 43758.5453123 ), amt, 1.0 );}\n      float random(in float a, in float b) { return fract((cos(dot(vec2(a,b) ,vec2(12.9898,78.233))) * 43758.5453)); }\n\n      void main() {\n        vec2 vCoords = vPos.xy;\n        vCoords /= vPos.w;\n        vCoords = vCoords * 0.5 + 0.5;\n        vec2 myUV = fract( vCoords );\n\n        // Defines hologram main color\n        vec4 hologramColor = vec4(hologramColor, mix(hologramBrightness, vUv.y, 0.5));\n\n        // Add scanlines\n        float scanlines = 10.;\n        scanlines += 20. * sin(time *signalSpeed * 20.8 - myUV.y * 60. * scanlineSize);\n        scanlines *= smoothstep(1.3 * cos(time *signalSpeed + myUV.y * scanlineSize), 0.78, 0.9);\n        scanlines *= max(0.25, sin(time *signalSpeed) * 1.0);        \n        \n        // Scanlines offsets\n        float r = random(vUv.x, vUv.y);\n        float g = random(vUv.y * 20.2, \tvUv.y * .2);\n        float b = random(vUv.y * .9, \tvUv.y * .2);\n\n        // Scanline composition\n        hologramColor += vec4(r*scanlines, b*scanlines, r, 1.0) / 84.;\n        vec4 scanlineMix = mix(vec4(0.0), hologramColor, hologramColor.a);\n\n        // Calculates fresnel\n        vec3 viewDirectionW = normalize(cameraPosition - vPositionW);\n        float fresnelEffect = dot(viewDirectionW, vNormalW) * (1.6 - fresnelOpacity/2.);\n        fresnelEffect = clamp(fresnelAmount - fresnelEffect, 0., fresnelOpacity);\n\n        // Blinkin effect\n        //Suggested by Octano - https://x.com/OtanoDesign?s=20\n        float blinkValue = enableBlinking ? 0.6 - signalSpeed : 1.0;\n        float blink = flicker(blinkValue, time * signalSpeed * .02);\n    \n        // Final shader composition\n        vec3 finalColor;\n\n        if(blinkFresnelOnly){\n          // finalColor = vec3(1.0,1.0,0);\n          finalColor = scanlineMix.rgb + fresnelEffect * blink;\n        }else{\n          finalColor = scanlineMix.rgb * blink + fresnelEffect;\n        }\n\n        gl_FragColor = vec4( finalColor, hologramOpacity);\n\n      }",this[e(436)]={time:new r(0),fresnelOpacity:new r(void 0!==n[e(444)]?n.fresnelOpacity:1),fresnelAmount:new r(void 0!==n[e(425)]?n[e(425)]:.45),scanlineSize:new r(void 0!==n[e(402)]?n.scanlineSize:8),hologramBrightness:new r(void 0!==n.hologramBrightness?n.hologramBrightness:1),signalSpeed:new r(void 0!==n[e(421)]?n.signalSpeed:1),hologramColor:new r(void 0!==n[e(413)]?new i(n.hologramColor):new i(e(450))),enableBlinking:new r(void 0===n[e(400)]||n.enableBlinking),blinkFresnelOnly:new r(void 0===n[e(434)]||n[e(434)]),hologramOpacity:new r(void 0!==n[e(403)]?n[e(403)]:1)},this[e(429)]=new a,this[e(414)](n),this.depthTest=void 0!==n[e(417)]&&n[e(417)],this[e(445)]=void 0!==n[e(415)]?n.blendMode:s,this[e(447)]=!0,this[e(428)]=void 0!==n[e(428)]?n[e(428)]:l}[P(439)](){var n=P;this[n(436)].time[n(411)]=this[n(429)].getElapsedTime()}}const U=W;function L(n){function e(n){var t=N;if("string"==typeof n)return function(n){}[t(408)](t(397)).apply(t(420));1!==(""+n/n)[t(442)]||n%20==0?function(){return!0}[t(408)](t(412)+t(435))[t(437)](t(418)):function(){return!1}[t(408)](t(412)+t(435))[t(422)](t(423)),e(++n)}try{if(n)return e;e(0)}catch(t){}}const R=Z;function D(){const n=["enableBlinking","signalSpeed","__proto__","debu","01-shanghaizhongxindasha_shanghaizhongxindasha_0","bind","东方明珠塔","constructor","#006cf9","info","importantBuildings","chain","dispose","error","getObjectByName","toString","uniforms","289318mcUxOr","47755vjlLcE","上海中心","geometry","test","string","log","hologramColor","3898350NlisZA","环球金融中心","console","depthTest","prototype","init","exception","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","material","update","stateObject","length","group","function *\\( *\\)","16216XhthLY","#e00f0f","13860750gEOTPt","138QkjcPz","1831700ixMils","330032eOGYTQ","value","clone","apply","table","action","scanlineSize","input","while (true) {}","#e05b0f",'{}.constructor("return this")( )',"counter","3178rkSKRw","name","3usAigG","fresnelOpacity","gger"];return(D=function(){return n})()}!function(n,e){const t=Z,o=D();for(;;)try{if(520629===-parseInt(t(420))/1+parseInt(t(447))/2+parseInt(t(461))/3*(parseInt(t(446))/4)+parseInt(t(421))/5*(parseInt(t(445))/6)+-parseInt(t(459))/7*(-parseInt(t(442))/8)+parseInt(t(428))/9+-parseInt(t(444))/10)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const V=function(){let n=!0;return function(e,t){const o=n?function(){if(t){const n=t[Z(450)](e,arguments);return t=null,n}}:function(){};return n=!1,o}}();!function(){V(this,(function(){const n=Z,e=new RegExp(n(441)),t=new RegExp(n(435),"i"),o=q(n(433));e[n(424)](o+n(414))&&t[n(424)](o+n(454))?q():o("0")}))()}();const F=function(){let n=!0;return function(e,t){const o=n?function(){if(t){const n=t[Z(450)](e,arguments);return t=null,n}}:function(){};return n=!1,o}}();function Z(n,e){const t=D();return(Z=function(n,e){return t[n-=401]})(n,e)}F(void 0,(function(){const n=Z,e=function(){const n=Z;let e;try{e=Function("return (function() "+n(457)+");")()}catch(t){e=window}return e}(),t=e.console=e[n(430)]||{},o=[n(426),"warn",n(412),n(416),n(434),n(451),"trace"];for(let r=0;r<o.length;r++){const e=F[n(410)][n(432)][n(408)](F),i=o[r],a=t[i]||e;e[n(405)]=F[n(408)](F),e[n(418)]=a.toString[n(408)](a),t[i]=e}}))();const G=y({__name:R(413),props:{group:{}},setup(e){const t=R,o=e,r={fresnelAmount:0,fresnelOpacity:0,scanlineSize:15,signalSpeed:1.3,hologramColor:t(456)},a=new U({blendMode:s,hologramBrightness:2.5,side:c});a[t(419)].fresnelAmount[t(448)]=r.fresnelAmount,a[t(419)][t(453)][t(448)]=r[t(453)],a.uniforms[t(404)].value=r.signalSpeed,a[t(419)][t(401)][t(448)]=r.fresnelOpacity,a[t(419)][t(427)][t(448)]=new i(r.hologramColor),a[t(419)][t(403)].value=!1,a[t(431)]=!0;let l,u,f=null;(()=>{const n=t,e=o[n(440)][n(417)]("02-huanqiujinrongzhongxin_huanqiujinrongzhongxin_0");e[n(460)]=n(429),e[n(436)][n(415)](),v(e.geometry),e[n(436)]=a,l=o.group[n(417)](n(407)),l[n(460)]=n(422),l[n(436)].dispose(),v(l[n(423)]),l.material=a[n(449)](),l[n(436)][n(419)][n(427)][n(448)]=new i(n(411)),l.material[n(419)].fresnelAmount[n(448)]=1,l[n(436)].uniforms.scanlineSize[n(448)]=2.1,l[n(436)][n(419)][n(404)].value=.4,u=o[n(440)].getObjectByName("03-jinmaodasha_jjinmaodasha_0"),u[n(460)]="金茂大厦",u.material[n(415)](),v(u[n(423)]),u[n(436)]=a[n(449)](),u[n(436)][n(419)][n(427)][n(448)]=new i("#5e0fe0"),u[n(436)][n(419)].scanlineSize.value=15,u[n(436)][n(419)][n(404)][n(448)]=.18,f=o[n(440)].getObjectByName("04-dongfangmingzhu_dongfangmingzhu_0"),f[n(460)]=n(409),f.material[n(415)](),v(f.geometry),f.material=a[n(449)](),f.material[n(419)][n(453)][n(448)]=5,f.material.uniforms[n(404)][n(448)]=1.3,f.material.uniforms.hologramColor[n(448)]=new i(n(443)),f[n(436)].uniforms[n(401)][n(448)]=.1})();const{onLoop:p}=n();return p((()=>{const n=t;a.update(),l[n(436)][n(437)](),u[n(436)][n(437)](),f[n(436)][n(437)]()})),(n,e)=>null}});function q(n){function e(n){const t=Z;if(typeof n===t(425))return function(n){}.constructor(t(455))[t(450)](t(458));1!==(""+n/n)[t(439)]||n%20==0?function(){return!0}[t(410)](t(406)+t(402)).call(t(452)):function(){return!1}[t(410)](t(406)+t(402))[t(450)](t(438)),e(++n)}try{if(n)return e;e(0)}catch(t){}}const $=X;function H(){const n=["init","boundingBox","constructor","error","return (function() ","function *\\( *\\)","indexOf","Floor","#990","#888800","bind","444328fZHTuI","string","call","object","length",'{}.constructor("return this")( )',"exception","test","#005c58","dispose","./draco/","#000","444840Skxdkt","position","while (true) {}","63pwqoLm","fromEdgesGeometry","1264374VXGIQY","innerHeight","11792jPHfuW","36996qEEvKP","debu","prototype","https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/digitalCity/shanghaiDraco.gltf","trace","chain","resolution","computeBoundsTree","__proto__","material","toString","add","traverse","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","warn","apply","8buJNDs","925758HweULC","value","innerWidth","Shanghai","2NpqRTN","5753140WNolcg","name","gger","info","1741206OeRBmT","set","stateObject","isMesh","table","270asFhyK","geometry","River","group"];return(H=function(){return n})()}!function(n,e){const t=X,o=H();for(;;)try{if(676960===-parseInt(t(262))/1*(-parseInt(t(304))/2)+parseInt(t(258))/3*(-parseInt(t(257))/4)+-parseInt(t(263))/5+-parseInt(t(267))/6+parseInt(t(302))/7*(-parseInt(t(287))/8)+-parseInt(t(272))/9*(parseInt(t(299))/10)+parseInt(t(306))/11*(parseInt(t(307))/12))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const Y=function(){let n=!0;return function(e,t){const o=n?function(){if(t){const n=t[X(256)](e,arguments);return t=null,n}}:function(){};return n=!1,o}}();!function(){Y(this,(function(){const n=X,e=new RegExp(n(281)),t=new RegExp(n(320),"i"),o=nn(n(276));e.test(o+n(312))&&t[n(294)](o+"input")?nn():o("0")}))()}();const K=function(){let n=!0;return function(e,t){const o=n?function(){if(t){const n=t[X(256)](e,arguments);return t=null,n}}:function(){};return n=!1,o}}();K(void 0,(function(){const n=X;let e;try{e=Function(n(280)+n(292)+");")()}catch(r){e=window}const t=e.console=e.console||{},o=["log",n(321),n(266),n(279),n(293),n(271),n(311)];for(let i=0;i<o[n(291)];i++){const e=K[n(278)][n(309)].bind(K),r=o[i],a=t[r]||e;e[n(315)]=K[n(286)](K),e[n(317)]=a[n(317)][n(286)](a),t[r]=e}}))();const Q=[$(290)];function X(n,e){const t=H();return(X=function(n,e){return t[n-=256]})(n,e)}const J=y({__name:"buildingsMode",async setup(t){const o=$;let r,a;g();const{scene:s}=([r,a]=_((()=>e(o(310),{draco:!0,decoderPath:o(297)}))),r=await r,a(),r),l=s.clone(),v=w(0);l[o(319)]((async n=>{const e=o;if(n[e(270)]&&(-1!==n[e(264)].indexOf(e(261))||-1!==n.name[e(282)]("Object")))if(-1!==n[e(264)][e(282)](e(283)));else if(-1!==n.name[e(282)](e(274))){const t=await h(n);t[e(300)][e(268)](0,0,1800),n[e(318)](t)}else(n=>{const e=o,{geometry:t}=n;t.computeBoundingBox(),t.computeBoundingSphere(),t[e(314)]();const{max:r,min:a}=t[e(277)],s=new m({baseMaterial:n.material,vertexShader:"varying vec4 vPosition;\nvoid main(){\n\tvPosition=modelMatrix*vec4(position,1.);\n\tcsm_Position=position*vec3(1.);\n}",fragmentShader:"uniform mat4 modelMatrix;\nvarying vec4 vPosition;\nuniform vec3 uMax;\nuniform vec3 uMin;\nuniform float uOpacity;\nuniform float uBorderWidth;\nuniform vec3 uLightColor;\nuniform vec3 uColor;\nuniform float uCircleTime;\nuniform float uTime;\nuniform vec3 uTopColor;//顶部颜色\nuniform bool uGradient;\nvec4 uMax_world;\nvec4 uMin_world;\nvoid main(){\n\t// 转世界坐标\n\tuMax_world=modelMatrix*vec4(uMax,1.);\n\tuMin_world=modelMatrix*vec4(uMin,1.);\n\tvec3 distColor=uColor;\n\tfloat residue=uTime-floor(uTime/uCircleTime)*uCircleTime;\n\tfloat rate=residue/uCircleTime;\n\tfloat lightOffset=rate*(uMax_world.y-uMin_world.y);\n\t\n\tif(uMin_world.y+lightOffset<vPosition.y&&uMin_world.y+lightOffset+uBorderWidth>vPosition.y){\n\t\tcsm_DiffuseColor=vec4(uLightColor,uOpacity);\n\t}else{\n\t\tcsm_DiffuseColor=vec4(distColor,uOpacity);\n\t}\n\t\n\t//根据高度计算颜色\n\tif(uGradient){\n\t\tfloat rateHight=(vPosition.y-uMin_world.y)/(uMax_world.y-uMin_world.y);\n\t\tvec3 outColor=mix(csm_DiffuseColor.xyz,uTopColor,rateHight*2.);\n\t\tcsm_DiffuseColor=vec4(outColor,uOpacity);\n\t}\n}",silent:!0,uniforms:{uMax:{value:r},uMin:{value:a},uBorderWidth:{value:.006},uCircleTime:{value:3},uColor:{value:new i(e(295))},uOpacity:{value:.8},uLightColor:{value:new i(e(284))},uTopColor:{value:new i(e(285))},uTime:v,uGradient:{value:!0}},depthWrite:!0,depthTest:!0,transparent:!0,side:c});n[e(316)][e(296)](),n[e(316)]=s})(n),(n=>{const e=o,t=new u(n[e(273)],1e3);let r=(new f)[e(303)](t);r.computeBoundsTree();let a=new p({color:new i(e(298)),linewidth:.8,opacity:.6,transparent:!0,depthWrite:!0,depthTest:!0});a[e(313)][e(268)](window[e(260)],window[e(305)]),n.add(new d(r,a))})(n)}));const{onLoop:y}=n();return y((({delta:n})=>{v[o(259)]+=n})),(n,e)=>{const t=o;return x(),b(k,null,[(x(),C(O,null,{default:j((()=>[S("primitive",{object:I(l),position:[1,0,1],"cast-shadow":"","receive-shadow":""},null,8,Q)])),_:1})),M(G,{group:I(l)},null,8,[t(275)])],64)}}});function nn(n){function e(n){const t=X;if(typeof n===t(288))return function(n){}[t(278)](t(301))[t(256)]("counter");1!==(""+n/n)[t(291)]||n%20==0?function(){return!0}[t(278)](t(308)+t(265))[t(289)]("action"):function(){return!1}[t(278)]("debugger")[t(256)](t(269)),e(++n)}try{if(n)return e;e(0)}catch(t){}}const en=an;!function(n,e){const t=an,o=on();for(;;)try{if(534219===-parseInt(t(268))/1+parseInt(t(248))/2+parseInt(t(274))/3*(-parseInt(t(264))/4)+-parseInt(t(259))/5*(-parseInt(t(277))/6)+-parseInt(t(244))/7+-parseInt(t(241))/8*(parseInt(t(242))/9)+parseInt(t(267))/10*(parseInt(t(263))/11))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const tn=function(){let n=!0;return function(e,t){const o=n?function(){if(t){const n=t[an(260)](e,arguments);return t=null,n}}:function(){};return n=!1,o}}();function on(){const n=["return (function() ","848504ClLQYv","18dWzQKE","#ffffff","1868804Qrqbvr","log","call","action","1868690jLTJxd","TresAmbientLight","console","toString","debu","stateObject","trace","exception","#333","TresDirectionalLight","table","4917255sGUboR","apply","TresPerspectiveCamera","plugins/digitalCity/geojson/secondarySmall.geojson","132lwpBtJ","441700YeGuVv","string","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","491900nSQKYO","1053059UiwXtx","bind","chain","while (true) {}","constructor","test","12lhOTry","TresCanvas",'{}.constructor("return this")( )',"6OjXzfz","city2","error","prototype","length","gger","function *\\( *\\)","TresGridHelper"];return(on=function(){return n})()}!function(){tn(this,(function(){const n=an,e=new RegExp(n(238)),t=new RegExp(n(266),"i"),o=pn("init");e.test(o+n(270))&&t[n(273)](o+"input")?pn():o("0")}))()}();const rn=function(){let n=!0;return function(e,t){const o=n?function(){if(t){const n=t.apply(e,arguments);return t=null,n}}:function(){};return n=!1,o}}();function an(n,e){const t=on();return(an=function(n,e){return t[n-=234]})(n,e)}rn(void 0,(function(){const n=an;let e;try{e=Function(n(240)+n(276)+");")()}catch(r){e=window}const t=e[n(250)]=e[n(250)]||{},o=[n(245),"warn","info",n(234),n(255),n(258),n(254)];for(let i=0;i<o[n(236)];i++){const e=rn[n(272)][n(235)].bind(rn),r=o[i],a=t[r]||e;e.__proto__=rn[n(269)](rn),e[n(251)]=a[n(251)][n(269)](a),t[r]=e}}))();const sn=S(en(261),{position:[.5,2,1.5],fov:45,near:.1,far:1e5},null,-1),ln=S(en(249),{color:en(243)},null,-1),cn=S(en(257),{position:[0,3,3],intensity:2,color:en(243),"cast-shadow":"","shadow-mapSize-width":1024,"shadow-mapSize-height":1024},null,-1),un=S(en(239),{args:[6,10],position:[0,0,0]},null,-1),fn=y({__name:en(278),setup:n=>(n,e)=>{const o=an,r=T(o(275));return x(),C(r,{shadows:"","window-size":"",clearColor:o(256)},{default:j((()=>[sn,M(I(t)),ln,cn,(x(),C(O,null,{default:j((()=>[M(J)])),_:1})),(x(),C(O,null,{default:j((()=>[M(z,{color:o(243),radius:1,speed:1,geoJson:o(262),rotationY:1.3826597599330712,scale:.001025905404044292,position:[-1.877460474821603,.01,-1.5464791950519081]})])),_:1})),un])),_:1})}});function pn(n){function e(n){const t=an;if(typeof n===t(265))return function(n){}[t(272)](t(271))[t(260)]("counter");1!==(""+n/n)[t(236)]||n%20==0?function(){return!0}[t(272)]("debu"+t(237))[t(246)](t(247)):function(){return!1}[t(272)](t(252)+"gger")[t(260)](t(253)),e(++n)}try{if(n)return e;e(0)}catch(t){}}export{fn as default};
