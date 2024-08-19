var t=Object.defineProperty,e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,o=(e,n,r)=>n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,s=(t,s)=>{for(var i in s||(s={}))n.call(s,i)&&o(t,i,s[i]);if(e)for(var i of e(s))r.call(s,i)&&o(t,i,s[i]);return t};import{P as i}from"./tweakpane.yHWGBmom1724070319978.js";import{_ as a}from"./default.vue_vue_type_script_setup_true_lang.JWkBbQil1724070319978.js";import{b as u}from"./pagesShow.vue_vue_type_script_setup_true_lang.ctRTIs-d1724070319978.js";import{_ as p}from"./precipitation.vue_vue_type_script_setup_true_lang.3Y8qnI3u1724070319978.js";import{d as c,b as l,a1 as f,r as m,Z as j,o as d,D as _,j as g,g as b,f as h,al as y,aj as v,ak as w,F as I}from"./@vue.Q1VpS3901724070319978.js";import"./@tresjs.2JnKj_Yj1724070319978.js";import"./three.QUrV0R7c1724070319978.js";import"./@vueuse.2Yfo77CO1724070319978.js";import"./@fesjs.fxXnq-gV1724070319978.js";import"./vue-router.7GyIEHku1724070319978.js";import"./lodash-es.nFpJXAf-1724070319978.js";import"./@qlin.yHhFDldE1724070319978.js";import"./pinia.yc2Sjh9i1724070319978.js";import"./@floating-ui.BPbuo5Gx1724070319978.js";import"./@juggle.7yjBMqoW1724070319978.js";import"./three-custom-shader-material.JQ_xA23o1724070319978.js";import"./object-hash.-UynEDWH1724070319978.js";import"./@amap.PfcO2up21724070319978.js";import"./jszip.ZVB-p0R-1724070319978.js";import"./glsl-tokenizer.P_7ZdKiw1724070319978.js";import"./glsl-token-string.l3IeKluQ1724070319978.js";import"./glsl-token-functions.UEj-2zyG1724070319978.js";const x=k;function k(t,e){const n=R();return(k=function(t,e){return n[t-=357]})(t,e)}!function(t,e){const n=k,r=R();for(;;)try{if(784324===parseInt(n(393))/1*(parseInt(n(382))/2)+parseInt(n(373))/3*(parseInt(n(383))/4)+parseInt(n(397))/5*(-parseInt(n(405))/6)+parseInt(n(371))/7*(-parseInt(n(400))/8)+parseInt(n(372))/9*(-parseInt(n(404))/10)+parseInt(n(361))/11+parseInt(n(386))/12)break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const z=function(){let t=!0;return function(e,n){const r=t?function(){if(n){const t=n.apply(e,arguments);return n=null,t}}:function(){};return t=!1,r}}();!function(){z(this,(function(){const t=k,e=new RegExp(t(387)),n=new RegExp(t(407),"i"),r=S(t(370));e.test(r+"chain")&&n[t(365)](r+t(375))?S():r("0")}))()}();const O=function(){let t=!0;return function(e,n){const r=t?function(){if(n){const t=n[k(369)](e,arguments);return n=null,t}}:function(){};return t=!1,r}}();function R(){const t=["10155096AGPujV","function *\\( *\\)","下落物","$refs","point","type","length","1059251uAsZpZ","prototype","weather","addBinding","1390jOimSi","constructor","while (true) {}","1073544qfzsLr","set","debu","call","10encllz","4050EIlmkI","speed","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","counter","string","value","bind","snow","5801191QJcJrK","#fff","position","count","test",'{}.constructor("return this")( )',"warn","rain","apply","init","35KdtLNW","8719551xRqfhe","67083BLMDfY","console","input","perspectiveCameraRef","log","__proto__","toString","trace","error","2QdUVxc","32iXaRhF","stateObject","pagesShowRef"];return(R=function(){return t})()}O(void 0,(function(){const t=k,e=function(){const t=k;let e;try{e=Function("return (function() "+t(366)+");")()}catch(n){e=window}return e}(),n=e[t(374)]=e[t(374)]||{},r=[t(377),t(367),"info",t(381),"exception","table",t(380)];for(let o=0;o<r[t(392)];o++){const e=O[t(398)][t(394)].bind(O),s=r[o],i=n[s]||e;e[t(378)]=O[t(359)](O),e[t(379)]=i[t(379)].bind(i),n[s]=e}}))();const Z=c({__name:x(395),setup(t){const e=x,n=l();f((()=>{const t=k;n[t(358)]&&n[t(358)][t(389)][t(376)][t(363)][t(401)](750,500,800)}));const r=m({speed:12,size:10,count:6e3,color:e(362),type:e(360)}),o=m({areaX:1500,areaY:1e3,areaZ:1500}),c=m(s(s({},j(r)),j(o))),z=new i({title:"天气",expanded:!0}).addFolder({title:e(388)});return z[e(396)](r,e(406),{label:"速度",min:0,max:30,step:1}),z.addBinding(r,"color",{label:"颜色"}),z.addBinding(r,"size",{label:"大小",min:0,max:26,step:1}),z[e(396)](r,e(364),{label:"数量",min:1e3,max:1e4,step:100}),z[e(396)](r,e(391),{view:"list",label:"类型",options:[{text:"雪",value:e(360)},{text:"雨",value:e(368)},{text:"点",value:e(390)}]}),(t,r)=>{const o=e;return d(),_(I,null,[g(a),g(u,{ref_key:o(385),ref:n,autoRotate:!1},{ability:b((()=>[(d(),h(y,null,{default:b((()=>[g(p,v(w(c)),null,16)])),_:1}))])),_:1},512)],64)}}});function S(t){function e(t){const n=k;if(typeof t===n(357))return function(t){}[n(398)](n(399))[n(369)](n(408));1!==(""+t/t)[n(392)]||t%20==0?function(){return!0}[n(398)](n(402)+"gger")[n(403)]("action"):function(){return!1}.constructor(n(402)+"gger").apply(n(384)),e(++t)}try{if(t)return e;e(0)}catch(n){}}export{Z as default};
