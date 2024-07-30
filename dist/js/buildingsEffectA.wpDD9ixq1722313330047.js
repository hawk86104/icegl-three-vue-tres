import{b as t,l as n}from"./pagesShow.vue_vue_type_script_setup_true_lang.W9U2B9L51722313330047.js";import{$ as o}from"./@tresjs.Q03Md-En1722313330047.js";import{C as e}from"./three-custom-shader-material.rXUjQmJB1722313330047.js";import"./object-hash.aoN2vIR61722313330047.js";import{Y as r,Z as i,a6 as u,C as c,ca as a,k as s,b0 as l}from"./three.0L1oP_mX1722313330047.js";import"./@amap.cDim55ZW1722313330047.js";import"./glsl-tokenizer.pGV5rb2g1722313330047.js";import{d as f,a1 as p,w as d,o as m,D as v,u as g,a4 as h,r as y,f as w,g as C,j as _,m as b}from"./@vue.Q1VpS3901722313330047.js";import{P as x}from"./tweakpane.yHWGBmom1722313330047.js";import"./@vueuse.UFv615y21722313330047.js";import"./glsl-token-string.u6gBgKVD1722313330047.js";import"./glsl-token-functions.VQWPL_na1722313330047.js";import"./jszip.49pgsWkw1722313330047.js";const I=S;!function(t,n){const o=S,e=O();for(;;)try{if(563775===-parseInt(o(534))/1+parseInt(o(533))/2*(parseInt(o(518))/3)+-parseInt(o(485))/4+-parseInt(o(491))/5*(parseInt(o(527))/6)+-parseInt(o(482))/7*(parseInt(o(528))/8)+parseInt(o(492))/9+parseInt(o(487))/10)break;e.push(e.shift())}catch(r){e.push(e.shift())}}();const M=function(){let t=!0;return function(n,o){const e=t?function(){if(o){const t=o[S(498)](n,arguments);return o=null,t}}:function(){};return t=!1,e}}();!function(){M(this,(function(){const t=S,n=new RegExp(t(531)),o=new RegExp(t(545),"i"),e=P(t(522));n[t(503)](e+t(486))&&o[t(503)](e+t(532))?P():e("0")}))()}();const j=function(){let t=!0;return function(n,o){const e=t?function(){if(o){const t=o[S(498)](n,arguments);return o=null,t}}:function(){};return t=!1,e}}();function S(t,n){const o=O();return(S=function(t,n){return o[t-=481]})(t,n)}j(void 0,(function(){const t=S;let n;try{n=Function(t(497)+t(483)+");")()}catch(r){n=window}const o=n[t(547)]=n[t(547)]||{},e=[t(515),t(504),t(546),t(507),t(511),t(544),t(541)];for(let i=0;i<e[t(525)];i++){const n=j[t(490)][t(550)][t(526)](j),r=e[i],u=o[r]||n;n.__proto__=j[t(526)](j),n.toString=u[t(539)].bind(u),o[r]=n}}))();const T=[I(494)];function O(){const t=["exception","value","computeBoundingBox","land","log","dispose","landColor","12885XqKIah","color","while (true) {}","gradient","init","#ffff00","gger","length","bind","12WuhVqN","536LfnmIh","uOpacity","counter","function *\\( *\\)","input","46IzrohL","281069lNlXOg","setStyle","city","uGradient","stateObject","toString","opacity","trace","boundingBox","isArray","table","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","info","console","clone","side","prototype","#112233","computeBoundingSphere","60067fWJqyO",'{}.constructor("return this")( )',"children","1139352IcxcMq","chain","16821540bJqtZQ","uniforms","model","constructor","1531960tOLYkn","4828086zTsgPL","\n\t\tuniform mat4 modelMatrix;\n\t\tvarying vec4 vPosition;\n\t\tuniform vec3 uMax; \n\t\tuniform vec3 uMin; \n\t\tuniform float uOpacity;  \n\t\tuniform float uBorderWidth; \n\t\tuniform vec3 uLightColor;\n\t\tuniform vec3 uColor;\n\t\tuniform float uCircleTime; \n\t\tuniform float uTime; \n\t\tuniform vec3 uTopColor;\t\t\t\t\t//顶部颜色\n\t\tuniform bool uGradient;\n\t\tvec4 uMax_world;\n\t\tvec4 uMin_world;\n\t\tvoid main() {\n\t\t\t// 转世界坐标\n\t\t\tuMax_world =  modelMatrix * vec4(uMax,1.0);\n\t\t\tuMin_world =  modelMatrix * vec4(uMin,1.0);\n\t\t\tvec3 distColor = uColor;\n\t\t\tfloat residue = uTime - floor(uTime / uCircleTime) * uCircleTime;\n\t\t\tfloat rate = residue / uCircleTime;\n\t\t\tfloat lightOffset = rate * (uMax_world.y - uMin_world.y);\n\n\t\t\tif (uMin_world.y + lightOffset < vPosition.y && uMin_world.y + lightOffset + uBorderWidth > vPosition.y) {\n\t\t\t\tcsm_DiffuseColor = vec4(uLightColor, uOpacity);\n\t\t\t} else {\n\t\t\t\tcsm_DiffuseColor = vec4(distColor, uOpacity);\n\t\t\t}\n\n\t\t\t//根据高度计算颜色\n\t\t\tif(uGradient){\n\t\t\t\tfloat rateHight = (vPosition.y - uMin_world.y) / (uMax_world.y - uMin_world.y); \n\t\t\t\tvec3 outColor = mix(csm_DiffuseColor.xyz, uTopColor, rateHight*2.0);\n\t\t\t\tcsm_DiffuseColor = vec4(outColor, uOpacity);\n\t\t\t}\n    }\n\t\t","object","forEach","bModel","return (function() ","apply","material","Color","string","__csm","test","warn","debu","#e523ff","error","uTime","bulidingsColor","uColor"];return(O=function(){return t})()}const F=f({__name:I(496),props:{model:{},bulidingsColor:{default:I(506)},landColor:{default:I(551)},topColor:{default:"#ffff00"},opacity:{default:.9},gradient:{type:Boolean,default:!0}},setup(t){const n=I,c=t,a=c[n(489)][n(536)];c[n(489)][n(489)][n(484)][0][n(499)]=new r({color:n(523)}),a.renderOrder=1001;const s=c[n(489)][n(514)];(()=>{const t=n,{geometry:o}=a;o[t(513)](),o[t(481)]();const{max:r,min:s}=o[t(542)];if(a[t(499)][t(502)])return;const l=new e({baseMaterial:a[t(499)],vertexShader:"\n\t\tvarying vec4 vPosition;\n\t\tvoid main() {\n\t\t\tvPosition = modelMatrix * vec4(position,1.0);\n\t\t\tcsm_Position = position * vec3(1.0);\n\t\t}\n\t\t",fragmentShader:t(493),silent:!0,uniforms:{uMax:{value:r},uMin:{value:s},uBorderWidth:{value:5},uCircleTime:{value:5},uColor:{value:new(u[t(500)])(c[t(509)])},uOpacity:{value:c[t(540)]},uLightColor:{value:new(u[t(500)])("#ffffff")},uTopColor:{value:new(u[t(500)])(c.topColor)},uTime:{value:0},uGradient:{value:c[t(521)]}},depthWrite:!0,depthTest:!0,transparent:!0,side:i});a[t(499)][t(516)](),a[t(499)]=l})();const{onLoop:l}=o();l((({delta:t})=>{const o=n;a[o(499)][o(488)][o(508)][o(512)]+=t})),p((()=>{const t=n;c[t(509)]&&a[t(499)][t(488)][t(510)].value[t(535)](c[t(509)]),c[t(517)]&&((t,o)=>{const e=n;let r;"cu"===t||t===e(514)&&(r=Array[e(543)](s[e(499)])?s.material:[s[e(499)]],r[e(495)]((t=>{const n=e;t[o][n(535)](c[n(517)]),t[n(549)]=i})))})("land",t(519)),c[t(540)]&&(a.material[t(488)][t(529)][t(512)]=c[t(540)])})),d(c,((t,o)=>{const e=n;a[e(499)].uniforms[e(537)][e(512)]=t[e(521)]}));const f=c[n(489)][n(489)][n(548)]();return(t,n)=>(m(),v("primitive",{object:g(f)},null,8,T))}});function P(t){function n(t){const o=S;if(typeof t===o(501))return function(t){}.constructor(o(520))[o(498)](o(530));1!==(""+t/t)[o(525)]||t%20==0?function(){return!0}[o(490)](o(505)+o(524)).call("action"):function(){return!1}.constructor(o(505)+o(524)).apply(o(538)),n(++t)}try{if(t)return n;n(0)}catch(o){}}function B(t,n){const o=Z();return(B=function(t,n){return o[t-=354]})(t,n)}const L=B;!function(t,n){const o=B,e=Z();for(;;)try{if(898331===-parseInt(o(390))/1+-parseInt(o(395))/2+parseInt(o(397))/3*(-parseInt(o(402))/4)+-parseInt(o(396))/5*(-parseInt(o(404))/6)+-parseInt(o(394))/7+-parseInt(o(370))/8*(-parseInt(o(357))/9)+parseInt(o(363))/10)break;e.push(e.shift())}catch(r){e.push(e.shift())}}();const k=function(){let t=!0;return function(n,o){const e=t?function(){if(o){const t=o.apply(n,arguments);return o=null,t}}:function(){};return t=!1,e}}();!function(){k(this,(function(){const t=B,n=new RegExp(t(391)),o=new RegExp(t(355),"i"),e=G(t(364));n[t(375)](e+t(376))&&o.test(e+t(373))?G():e("0")}))()}();const z=function(){let t=!0;return function(n,o){const e=t?function(){if(o){const t=o.apply(n,arguments);return o=null,t}}:function(){};return t=!1,e}}();z(void 0,(function(){const t=B,n=function(){const t=B;let n;try{n=Function(t(366)+t(406)+");")()}catch(o){n=window}return n}(),o=n.console=n.console||{},e=[t(387),t(382),t(371),t(381),t(386),t(377),t(384)];for(let r=0;r<e.length;r++){const n=z[t(399)][t(407)][t(385)](z),i=e[r],u=o[i]||n;n[t(401)]=z[t(385)](z),n.toString=u[t(368)][t(385)](u),o[i]=n}}))();const A=[L(380)],E=f({__name:L(405),props:{builds:{},color:{default:L(374)},srcColor:{default:"#000"},scale:{default:2e3},gradual:{default:10},speed:{default:.5}},setup(t){const n=L,e=t;let r=null;const i={transparent:!0,uniforms:{uColor:{value:new c(e[n(389)])},uSrcColor:{value:new c(e[n(379)])},uScale:{value:e[n(372)]},uTime:{value:0},uGradual:{value:e[n(360)]}},vertexShader:"varying vec3 vPosition;\nvoid main(){\n\tvPosition=position;\n\tvec4 viewPosition=modelViewMatrix*vec4(position,1.);\n\tgl_Position=projectionMatrix*viewPosition;\n}",fragmentShader:"uniform float uScale;//最大扩散\nuniform float uGradual;//建变系数\nuniform float uTime;\nuniform vec3 uColor;//扩散颜色\nuniform vec3 uSrcColor;//原始颜色\nvarying vec3 vPosition;\n\nvoid main(){\n\tfloat dis=distance(vPosition.xz,vec2(.0,.0));\n\tif(dis>uScale){\n\t\tdiscard;\n\t}\n\tfloat opacity=smoothstep(uScale/uGradual*uTime,uScale*uTime,dis);\n\topacity*=step(dis,uScale*uTime);\n\t\n\tif(opacity<.3){\n\t\tgl_FragColor=vec4(uSrcColor,1.-opacity);\n\t}else{\n\t\tgl_FragColor=vec4(uColor,opacity);\n\t}\n\t// gl_FragColor=vec4(uColor,opacity);\n}\n"};let u=new a(e[n(408)][n(378)])[n(393)]();u=u[n(414)](e[n(408)][n(383)]);const f=new s(i);r=new l(u,f),r.material[n(388)]=e[n(412)],r.renderOrder=1e3,p((()=>{const t=n;e.color&&(i.uniforms[t(413)].value=new c(e[t(389)])),e.srcColor&&(i.uniforms.uSrcColor[t(411)]=new c(e[t(379)])),e[t(372)]&&(i[t(369)][t(410)][t(411)]=e.scale),e[t(360)]&&(i[t(369)][t(354)][t(411)]=e[t(360)])}));const{onLoop:d}=o();return d((({delta:t})=>{const o=n;i[o(369)][o(361)][o(411)]+=t*e[o(398)],i[o(369)][o(361)].value%=1})),(t,o)=>{const e=n;return m(),v(e(392),{object:g(r)},null,8,A)}}});function G(t){function n(t){const o=B;if(typeof t===o(362))return function(t){}[o(399)]("while (true) {}")[o(403)](o(359));1!==(""+t/t)[o(409)]||t%20==0?function(){return!0}[o(399)](o(365)+o(358))[o(367)](o(356)):function(){return!1}[o(399)](o(365)+"gger")[o(403)](o(400)),n(++t)}try{if(t)return n;n(0)}catch(o){}}function Z(){const t=["speed","constructor","stateObject","__proto__","4vrDPGc","apply","12FYutEe","bLine",'{}.constructor("return this")( )',"prototype","builds","length","uScale","value","width","uColor","applyMatrix4","uGradual","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","action","9OyCtDO","gger","counter","gradual","uTime","string","13645290nqDLGQ","init","debu","return (function() ","call","toString","uniforms","9450440WunOuq","info","scale","input","#FFF","test","chain","table","geometry","srcColor","object","error","warn","matrix","trace","bind","exception","log","linewidth","color","393395dwcAFu","function *\\( *\\)","primitive","clone","683900xvxFkA","2939266FrNFBj","1280405LjoUZC","596811QUOnlw"];return(Z=function(){return t})()}const D=Q;!function(t,n){const o=Q,e=q();for(;;)try{if(329803===parseInt(o(484))/1*(parseInt(o(491))/2)+-parseInt(o(509))/3+-parseInt(o(476))/4+parseInt(o(500))/5+parseInt(o(485))/6*(parseInt(o(494))/7)+-parseInt(o(504))/8+parseInt(o(475))/9)break;e.push(e.shift())}catch(r){e.push(e.shift())}}();const W=function(){let t=!0;return function(n,o){const e=t?function(){if(o){const t=o.apply(n,arguments);return o=null,t}}:function(){};return t=!1,e}}();function q(){const t=["exception","#FFF","chain","#000","1420308WPKrIF","#000000","color","string","stateObject","info","return (function() ","gradual","test","addBinding","error","builds","bind","console","table","action","counter","#999","5129208uNtQcJ","1062832cLvEyQ","buildingsEffectA","warn","最大扩散","call","线原颜色","while (true) {}","__proto__","495169QlDmpB","18NJcqpM","function *\\( *\\)","speed","gger",'{}.constructor("return this")( )',"init","2lePeGt","#112233","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","253757WFEEZk","length","apply","prototype","debu","srcColor","2369860uhMTyG","constructor","扩散系数","toString","4630872pVuvFJ"];return(q=function(){return t})()}!function(){W(this,(function(){const t=Q,n=new RegExp(t(486)),o=new RegExp(t(493),"i"),e=J(t(490));n[t(465)](e+t(507))&&o[t(465)](e+"input")?J():e("0")}))()}();const R=function(){let t=!0;return function(n,o){const e=t?function(){if(o){const t=o[Q(496)](n,arguments);return o=null,t}}:function(){};return t=!1,e}}();R(void 0,(function(){const t=Q,n=function(){const t=Q;let n;try{n=Function(t(463)+t(489)+");")()}catch(o){n=window}return n}(),o=n[t(470)]=n[t(470)]||{},e=["log",t(478),t(514),t(467),t(505),t(471),"trace"];for(let r=0;r<e[t(495)];r++){const n=R[t(501)][t(497)][t(469)](R),i=e[r],u=o[i]||n;n[t(483)]=R[t(469)](R),n[t(503)]=u.toString.bind(u),o[i]=n}}))();const $=f({__name:D(477),async setup(o){const e=D;let r,i;const u=([r,i]=h((()=>n())),r=await r,i(),r),c=y({color:e(506),srcColor:e(508),scale:2e3,gradual:6.6,speed:.3}),a=new x({title:"效果参数",expanded:!0});return a.addBinding(c,e(499),{label:e(481)}),a[e(466)](c,e(511),{label:"线扫颜色"}),a[e(466)](c,e(487),{label:"速度",min:.1,max:1,step:.1}),a[e(466)](c,"scale",{label:e(479),min:10,max:2e3,step:10}),a[e(466)](c,e(464),{label:e(502),min:1.1,max:10,step:.1}),(n,o)=>{const r=e;return m(),w(t,{showAxesHelper:!1,autoRotate:!1,showBuildings:!1},{ability:C((()=>[_(F,{model:g(u),bulidingsColor:r(510),landColor:r(492),topColor:r(474)},null,8,["model"]),_(E,b({builds:g(u).city},c),null,16,[r(468)])])),_:1})}}});function Q(t,n){const o=q();return(Q=function(t,n){return o[t-=463]})(t,n)}function J(t){function n(t){const o=Q;if(typeof t===o(512))return function(t){}[o(501)](o(482))[o(496)](o(473));1!==(""+t/t).length||t%20==0?function(){return!0}[o(501)]("debu"+o(488))[o(480)](o(472)):function(){return!1}[o(501)](o(498)+"gger")[o(496)](o(513)),n(++t)}try{if(t)return n;n(0)}catch(o){}}export{$ as default};
