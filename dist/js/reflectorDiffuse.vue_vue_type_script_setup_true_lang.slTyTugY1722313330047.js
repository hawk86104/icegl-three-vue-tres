import{b_ as t,a0 as n,C as e,j as r}from"./three.0L1oP_mX1722313330047.js";import{N as o}from"./@tresjs.Q03Md-En1722313330047.js";import{R as c}from"./all.three.yWNOIDhs1722313330047.js";import{d as i,b as a,a4 as s,a1 as u,w as f,o as l,D as p,J as m,m as g,u as d}from"./@vue.Q1VpS3901722313330047.js";function h(){const t=["constructor","replace","action","prototype","input","#include <emissivemap_fragment>","fragmentShader","783135aySMpU","chain","function *\\( *\\)","gger","length","return (function() ","info","trace","810508gkwlAW","log","\n\t\tuniform mat4 textureMatrix;\n\t\tout vec4 vCoord;\n\t\tout vec3 vToEye;\n\n\t\tvoid main() {\n\t\t","\n\t\tuniform sampler2D reflectMap;\n\t\tuniform float mirror;\n\t\tuniform float mixStrength;\n\t\tin vec4 vCoord;\n\t\tin vec3 vToEye;\n\n\t\tvoid main() {\n\t\t","3KyDuBM","#include <project_vertex>","toString","apply","545797VPgdBV","console","1051149YVHuax","2zxyKGg","\n\t\t#include <emissivemap_fragment>\n\n\t\tvec4 normalColor = texture2D(normalMap, vNormalMapUv * normalScale);\n\t\tvec3 reflectNormal = normalize(vec3(normalColor.r * 2.0 - 1.0, normalColor.b, normalColor.g * 2.0 - 1.0));\n\t\tvec3 reflectCoord = vCoord.xyz / vCoord.w;\n\t\tvec2 reflectUv = reflectCoord.xy + reflectCoord.z * reflectNormal.xz * 0.05;\n\t\tvec4 reflectColor = texture2D(reflectMap, reflectUv);\n\n\t\t// Fresnel term\n\t\tvec3 toEye = normalize(vToEye);\n\t\tfloat theta = max(dot(toEye, normal), 0.0);\n\t\tfloat reflectance = pow((1.0 - theta), 5.0);\n\n\t\treflectColor = mix(vec4(0), reflectColor, reflectance);\n\n\t\tdiffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + reflectColor.rgb * mixStrength);\n\t\t","2989124dimofR","counter","error","warn","vertexShader","exception","table","call","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","9560187vqWmTK","debu","test","410zeyOib","while (true) {}","5874636CcxVYp","__proto__","void main() {","string","bind","init","8wpWUbY"];return(h=function(){return t})()}!function(t,n){const e=x,r=h();for(;;)try{if(553379===parseInt(e(397))/1*(-parseInt(e(359))/2)+-parseInt(e(352))/3*(parseInt(e(361))/4)+parseInt(e(389))/5+-parseInt(e(375))/6+-parseInt(e(356))/7*(-parseInt(e(381))/8)+-parseInt(e(370))/9+-parseInt(e(373))/10*(-parseInt(e(358))/11))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const v=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[x(355)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();function x(t,n){const e=h();return(x=function(t,n){return e[t-=351]})(t,n)}!function(){v(this,(function(){const t=x,n=new RegExp(t(391)),e=new RegExp(t(369),"i"),r=_(t(380));n[t(372)](r+t(390))&&e[t(372)](r+t(386))?_():r("0")}))()}();const y=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[x(355)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();y(void 0,(function(){const t=x;let n;try{n=Function(t(394)+'{}.constructor("return this")( ));')()}catch(o){n=window}const e=n[t(357)]=n[t(357)]||{},r=[t(398),t(364),t(395),t(363),t(366),t(367),t(396)];for(let c=0;c<r[t(393)];c++){const n=y[t(382)][t(385)][t(379)](y),o=r[c],i=e[o]||n;n[t(376)]=y[t(379)](y),n[t(354)]=i[t(354)][t(379)](i),e[o]=n}}))();function _(t){function n(t){const e=x;if(typeof t===e(378))return function(t){}.constructor(e(374))[e(355)](e(362));1!==(""+t/t)[e(393)]||t%20==0?function(){return!0}[e(382)](e(371)+"gger")[e(368)](e(384)):function(){return!1}[e(382)](e(371)+e(392))[e(355)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}const w=j;!function(t,n){const e=j,r=C();for(;;)try{if(205690===parseInt(e(191))/1*(-parseInt(e(181))/2)+-parseInt(e(182))/3+parseInt(e(153))/4+parseInt(e(165))/5+-parseInt(e(154))/6+parseInt(e(184))/7*(parseInt(e(170))/8)+-parseInt(e(196))/9)break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const b=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,r}}();!function(){b(this,(function(){const t=j,n=new RegExp(t(164)),e=new RegExp(t(171),"i"),r=T(t(190));n[t(162)](r+"chain")&&e[t(162)](r+t(151))?T():r("0")}))()}();const I=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[j(140)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();function C(){const t=["exception","prototype","channel","stateObject","mixStrength","test","trace","function *\\( *\\)","1009360ExWoxX","visible","textureMatrix","info","assign","24XuhxAR","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","wrapS","object","console","string","showGridHelper","color","tpgRef","return (function() ","TresMesh","13796Hyyomh","13104sPgbNI","tmsmRef","846706DUYiZS","gger","counter","onBeforeRender","tmRef","renderTargetUniform","init","17zGHiHB","update","primitive","length","add","808848puvCfw","#ffffff","bind","textureMatrixUniform","constructor","attributes","set","onBeforeCompile","repeat","aoMap","apply","uniforms","while (true) {}","action","error","mirror","log","call","value","TresGroup","__proto__","input","debu","726748JTjPUQ","1975422gZiBrU",'{}.constructor("return this")( )',"TresPlaneGeometry"];return(C=function(){return t})()}I(void 0,(function(){const t=j,n=function(){const t=j;let n;try{n=Function(t(179)+t(155)+");")()}catch(e){n=window}return n}(),e=n[t(174)]=n.console||{},r=[t(146),"warn",t(168),t(144),t(157),"table",t(163)];for(let o=0;o<r[t(194)];o++){const n=I[t(200)][t(158)][t(198)](I),c=r[o],i=e[c]||n;n[t(150)]=I[t(198)](I),n.toString=i.toString[t(198)](i),e[c]=n}}))();const M=["rotation-x"],S=[w(173)];function j(t,n){const e=C();return(j=function(t,n){return e[t-=136]})(t,n)}const z=i({__name:"reflectorDiffuse",props:{mirror:{default:1},mixStrength:{default:10},showGridHelper:{type:Boolean,default:!0},color:{default:w(197)}},async setup(i){const h=w;let v,y;const _=i,b=new t(9.5,10),I=a(),C=a(),j=a(),z=new c,T={mirror:{value:_[h(145)]},mixStrength:{value:_[h(161)]}},E=([v,y]=s((()=>o(["./plugins/floor/image/polished_concrete_basecolor.jpg","./plugins/floor/image/polished_concrete_normal.jpg","./plugins/floor/image/polished_concrete_orm.jpg"]))),v=await v,y(),v);for(var R=0;R<3;R++)E[R][h(172)]=n,E[R].wrapT=n,E[R][h(138)][h(136)](16,16);const U={color:new e("#444"),metalness:1,roughness:1,map:E[0],metalnessMap:E[2],roughnessMap:E[2],aoMap:E[2],aoMapIntensity:1,normalMap:E[1],normalScale:new r(3,3)},B=t=>{const n=h;t[n(141)].reflectMap=z[n(189)],t[n(141)][n(167)]=z[n(199)],t[n(141)]=Object[n(169)](t[n(141)],T),(t=>{const n=x;t[n(365)]=t[n(365)][n(383)](n(377),n(399)),t.vertexShader=t[n(365)][n(383)](n(353),"\n\t\t#include <project_vertex>\n\n\t\tvCoord = textureMatrix * vec4(transformed, 1.0);\n\t\tvToEye = cameraPosition - (modelMatrix * vec4(transformed, 1.0)).xyz;\n\t\t")})(t),(t=>{const n=x;t[n(388)]=t[n(388)][n(383)](n(377),n(351)),t.fragmentShader=t[n(388)].replace(n(387),n(360))})(t)};return u((()=>{const t=h;I[t(148)]&&(I[t(148)][t(201)].uv1=I[t(148)][t(201)].uv),j[t(148)]&&(j[t(148)][t(139)][t(159)]=1,j[t(148)][t(137)]=B),C[t(148)]&&(C[t(148)][t(195)](z),C[t(148)][t(187)]=(n,e,r)=>{z[t(192)](n,e,r)}),_[t(177)]&&j[t(148)]&&(j[t(148)][t(177)]=new e(_[t(177)]))})),f((()=>_[h(176)]),(t=>{b[h(166)]=t})),(t,n)=>{const e=h;return l(),p(e(149),null,[m(e(180),{ref_key:e(188),ref:C,"rotation-x":-Math.PI/2,"position-y":-.1},[m(e(156),{ref_key:e(178),ref:I,args:[10,10]},null,512),m("TresMeshStandardMaterial",g({ref_key:e(183),ref:j},U),null,16)],8,M),m(e(193),{object:d(b)},null,8,S)])}}});function T(t){function n(t){const e=j;if(typeof t===e(175))return function(t){}[e(200)](e(142))[e(140)](e(186));1!==(""+t/t)[e(194)]||t%20==0?function(){return!0}[e(200)](e(152)+"gger")[e(147)](e(143)):function(){return!1}[e(200)](e(152)+e(185)).apply(e(160)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{z as _};
