import{b_ as t,a0 as n,C as e,j as r}from"./three.QUrV0R7c1724070319978.js";import{N as o}from"./@tresjs.2JnKj_Yj1724070319978.js";import{R as c}from"./all.three.mO32oPaM1724070319978.js";import{d as i,b as a,a4 as s,a1 as u,w as f,o as l,D as p,J as m,m as h,u as d}from"./@vue.Q1VpS3901724070319978.js";!function(t,n){const e=y,r=x();for(;;)try{if(807060===-parseInt(e(407))/1*(parseInt(e(382))/2)+-parseInt(e(395))/3+parseInt(e(384))/4+-parseInt(e(380))/5+-parseInt(e(396))/6+-parseInt(e(405))/7+parseInt(e(392))/8)break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const g=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[y(394)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();!function(){g(this,(function(){const t=y,n=new RegExp("function *\\( *\\)"),e=new RegExp(t(373),"i"),r=b(t(403));n[t(369)](r+t(402))&&e[t(369)](r+t(411))?b():r("0")}))()}();const v=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,r}}();v(void 0,(function(){const t=y;let n;try{n=Function(t(374)+'{}.constructor("return this")( ));')()}catch(o){n=window}const e=n.console=n[t(383)]||{},r=[t(398),t(401),t(376),t(399),t(386),t(368),t(379)];for(let c=0;c<r.length;c++){const n=v[t(387)][t(410)].bind(v),o=r[c],i=e[o]||n;n[t(397)]=v[t(372)](v),n.toString=i[t(409)][t(372)](i),e[o]=n}}))();function x(){const t=["7314560zcAyOM","counter","6Enafhh","console","1320840uOfWTB","vertexShader","exception","constructor","replace","#include <emissivemap_fragment>","call","void main() {","40308512jizPRV","action","apply","4572225TLtnKI","3517794LJNQwh","__proto__","log","error","\n\t\tuniform sampler2D reflectMap;\n\t\tuniform float mirror;\n\t\tuniform float mixStrength;\n\t\tin vec4 vCoord;\n\t\tin vec3 vToEye;\n\n\t\tvoid main() {\n\t\t","warn","chain","init","\n\t\t#include <project_vertex>\n\n\t\tvCoord = textureMatrix * vec4(transformed, 1.0);\n\t\tvToEye = cameraPosition - (modelMatrix * vec4(transformed, 1.0)).xyz;\n\t\t","2170833AcnOkq","gger","226103cqsREB","debu","toString","prototype","input","table","test","\n\t\t#include <emissivemap_fragment>\n\n\t\tvec4 normalColor = texture2D(normalMap, vNormalMapUv * normalScale);\n\t\tvec3 reflectNormal = normalize(vec3(normalColor.r * 2.0 - 1.0, normalColor.b, normalColor.g * 2.0 - 1.0));\n\t\tvec3 reflectCoord = vCoord.xyz / vCoord.w;\n\t\tvec2 reflectUv = reflectCoord.xy + reflectCoord.z * reflectNormal.xz * 0.05;\n\t\tvec4 reflectColor = texture2D(reflectMap, reflectUv);\n\n\t\t// Fresnel term\n\t\tvec3 toEye = normalize(vToEye);\n\t\tfloat theta = max(dot(toEye, normal), 0.0);\n\t\tfloat reflectance = pow((1.0 - theta), 5.0);\n\n\t\treflectColor = mix(vec4(0), reflectColor, reflectance);\n\n\t\tdiffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + reflectColor.rgb * mixStrength);\n\t\t","fragmentShader","bind","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","return (function() ","#include <project_vertex>","info","string","stateObject","trace"];return(x=function(){return t})()}function y(t,n){const e=x();return(y=function(t,n){return e[t-=368]})(t,n)}function b(t){function n(t){const e=y;if(typeof t===e(377))return function(t){}[e(387)]("while (true) {}")[e(394)](e(381));1!==(""+t/t).length||t%20==0?function(){return!0}[e(387)](e(408)+e(406))[e(390)](e(393)):function(){return!1}[e(387)](e(408)+e(406))[e(394)](e(378)),n(++t)}try{if(t)return n;n(0)}catch(e){}}const _=S;!function(t,n){const e=S,r=I();for(;;)try{if(372025===-parseInt(e(407))/1*(-parseInt(e(399))/2)+parseInt(e(400))/3+-parseInt(e(362))/4+-parseInt(e(396))/5+parseInt(e(411))/6+parseInt(e(385))/7*(-parseInt(e(415))/8)+-parseInt(e(408))/9*(-parseInt(e(351))/10))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const w=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[S(380)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();function I(){const t=["reflectorDiffuse","tmsmRef","TresMesh","warn","gger","aoMap","1437265AZVkGg","rotation-x","bind","80470SGuIps","1631271YbgWtq","primitive","counter","TresPlaneGeometry","wrapT","mixStrength","mirror","2kwLJvM","1335015jIxZsc","call","value","3252666Vgrvfg","color","constructor","console","7096zpLSIc","stateObject","tpgRef","attributes","trace","renderTargetUniform","10OJjGhX","update","#ffffff","assign","chain","table","onBeforeCompile","textureMatrixUniform","log","prototype","__proto__","2468216wQVbbf","reflectMap","error","uniforms","visible","#444","tmRef","set","length","function *\\( *\\)","action","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","string","test","input","info","while (true) {}","toString","apply","exception","TresGroup","wrapS","object","301SIrqKW","uv1","channel","return (function() ","add"];return(I=function(){return t})()}!function(){w(this,(function(){const t=S,n=new RegExp(t(371)),e=new RegExp(t(373),"i"),r=E("init");n[t(375)](r+t(355))&&e[t(375)](r+t(376))?E():r("0")}))()}();const M=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[S(380)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();M(void 0,(function(){const t=S,n=function(){const t=S;let n;try{n=Function(t(388)+'{}.constructor("return this")( ));')()}catch(e){n=window}return n}(),e=n[t(414)]=n[t(414)]||{},r=[t(359),t(393),t(377),t(364),t(381),t(356),t(349)];for(let o=0;o<r.length;o++){const n=M[t(413)][t(360)][t(398)](M),c=r[o],i=e[c]||n;n[t(361)]=M.bind(M),n.toString=i[t(379)][t(398)](i),e[c]=n}}))();const j=[_(397)],C=[_(384)];function S(t,n){const e=I();return(S=function(t,n){return e[t-=349]})(t,n)}const z=i({__name:_(390),props:{mirror:{default:1},mixStrength:{default:10},showGridHelper:{type:Boolean,default:!0},color:{default:_(353)}},async setup(i){const g=_;let v,x;const b=i,w=new t(9.5,10),I=a(),M=a(),S=a(),z=new c,E={mirror:{value:b[g(406)]},mixStrength:{value:b[g(405)]}},T=([v,x]=s((()=>o(["./plugins/floor/image/polished_concrete_basecolor.jpg","./plugins/floor/image/polished_concrete_normal.jpg","./plugins/floor/image/polished_concrete_orm.jpg"]))),v=await v,x(),v);for(var R=0;R<3;R++)T[R][g(383)]=n,T[R][g(404)]=n,T[R].repeat[g(369)](16,16);const k={color:new e(g(367)),metalness:1,roughness:1,map:T[0],metalnessMap:T[2],roughnessMap:T[2],aoMap:T[2],aoMapIntensity:1,normalMap:T[1],normalScale:new r(3,3)},A=t=>{const n=g;t.uniforms[n(363)]=z[n(350)],t.uniforms.textureMatrix=z[n(358)],t[n(365)]=Object[n(354)](t[n(365)],E),(t=>{const n=y;t[n(385)]=t[n(385)][n(388)](n(391),"\n\t\tuniform mat4 textureMatrix;\n\t\tout vec4 vCoord;\n\t\tout vec3 vToEye;\n\n\t\tvoid main() {\n\t\t"),t[n(385)]=t.vertexShader[n(388)](n(375),n(404))})(t),(t=>{const n=y;t[n(371)]=t[n(371)][n(388)](n(391),n(400)),t[n(371)]=t.fragmentShader[n(388)](n(389),n(370))})(t)};return u((()=>{const t=g;I[t(410)]&&(I[t(410)][t(418)][t(386)]=I[t(410)].attributes.uv),S[t(410)]&&(S[t(410)][t(395)][t(387)]=1,S[t(410)][t(357)]=A),M[t(410)]&&(M[t(410)][t(389)](z),M[t(410)].onBeforeRender=(n,e,r)=>{z[t(352)](n,e,r)}),b[t(412)]&&S[t(410)]&&(S[t(410)][t(412)]=new e(b[t(412)]))})),f((()=>b.showGridHelper),(t=>{w[g(366)]=t})),(t,n)=>{const e=g;return l(),p(e(382),null,[m(e(392),{ref_key:e(368),ref:M,"rotation-x":-Math.PI/2,"position-y":-.1},[m(e(403),{ref_key:e(417),ref:I,args:[10,10]},null,512),m("TresMeshStandardMaterial",h({ref_key:e(391),ref:S},k),null,16)],8,j),m(e(401),{object:d(w)},null,8,C)])}}});function E(t){function n(t){const e=S;if(typeof t===e(374))return function(t){}[e(413)](e(378)).apply(e(402));1!==(""+t/t)[e(370)]||t%20==0?function(){return!0}[e(413)]("debu"+e(394))[e(409)](e(372)):function(){return!1}[e(413)]("debu"+e(394))[e(380)](e(416)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{z as _};
