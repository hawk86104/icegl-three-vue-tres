import{a9 as t}from"./three.0IuNGJsA1725236486446.js";import{d as n,x as e}from"./@tresjs.DDzpLB7Q1725236486446.js";import{c as s,a as r}from"./index.ZLp4rBxn1725236486446.js";import"./index.6yyegu7j1725236486446.js";import{P as o}from"./tweakpane.yHWGBmom1725236486446.js";import{_ as i}from"./gridPlusCom.vue_vue_type_script_setup_true_lang.x93By2S41725236486446.js";import{d as a,r as c,o as u,f as p,g as l,j as f,u as m,aj as d,ak as g,J as _,al as h,m as b}from"./@vue.9bHx4gg21725236486446.js";import"./@vueuse.XXpXaOwX1725236486446.js";import"./three-stdlib.qd5YYSA01725236486446.js";import"./@pmndrs.wB6eVnfc1725236486446.js";import"./object-hash.p3nCq7ez1725236486446.js";import"./@amap.YiJorLHg1725236486446.js";import"./jszip.F8iULAGn1725236486446.js";import"./reflectorDiffuse.vue_vue_type_script_setup_true_lang.QLCYtmLs1725236486446.js";import"./all.three.seD8S5dG1725236486446.js";import"./oimophysics.x0jH7fze1725236486446.js";import"./reflectorDUDV.vue_vue_type_script_setup_true_lang.QpLupOG51725236486446.js";import"./reflectorShaderMesh.vue_vue_type_script_setup_true_lang.O0oLZ27t1725236486446.js";import"./whiteFloorMesh.vue_vue_type_script_setup_true_lang.SzCO2ZY31725236486446.js";import"./videoFloor.vue_vue_type_script_setup_true_lang.Ht6D90c31725236486446.js";const j=k;function y(){const t=["toString","2155980FQInXF","anisotropicBlur","while (true) {}","call","chromaticAberration","transmissionMaterial","TresTorusKnotGeometry","96HMiJvo","https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/","1731sEZaCG","log","pos-y.jpg","constructor","debu","thickness","pos-x.jpg","pos-z.jpg",'{}.constructor("return this")( )',"prototype","test","__proto__","TresMeshStandardMaterial","roughness","temporalDistortion","backside","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","#ffffff","console","distortion","apply","146416ooGXnO","3738iuHQRC","neg-x.jpg","stateObject","counter","table","string","action","attenuationColor","exception","length","65gyhSFH","3479SqPBNR","#ff33ff","trace","addBinding","2108241bAtgfl","gger","return (function() ","input","TresMesh","init","cube","neg-z.jpg","info","312464fcNJVs","attenuationDistance","reflectivity","15988DWPDTc","TresAmbientLight","bind","warn","backsideThickness"];return(y=function(){return t})()}!function(t,n){const e=k,s=y();for(;;)try{if(167073===-parseInt(e(225))/1+parseInt(e(202))/2*(-parseInt(e(204))/3)+-parseInt(e(189))/4*(-parseInt(e(236))/5)+-parseInt(e(226))/6*(-parseInt(e(237))/7)+-parseInt(e(186))/8+parseInt(e(241))/9+-parseInt(e(195))/10)break;s.push(s.shift())}catch(r){s.push(s.shift())}}();const v=function(){let t=!0;return function(n,e){const s=t?function(){if(e){const t=e[k(224)](n,arguments);return e=null,t}}:function(){};return t=!1,s}}();!function(){v(this,(function(){const t=k,n=new RegExp("function *\\( *\\)"),e=new RegExp(t(220),"i"),s=z(t(246));n[t(214)](s+"chain")&&e[t(214)](s+t(244))?z():s("0")}))()}();const x=function(){let t=!0;return function(n,e){const s=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,s}}();function k(t,n){const e=y();return(k=function(t,n){return e[t-=185]})(t,n)}x(void 0,(function(){const t=k;let n;try{n=Function(t(243)+t(212)+");")()}catch(r){n=window}const e=n[t(222)]=n[t(222)]||{},s=[t(205),t(192),t(185),"error",t(234),t(230),t(239)];for(let o=0;o<s[t(235)];o++){const n=x[t(207)][t(213)][t(191)](x),r=s[o],i=e[r]||n;n[t(215)]=x[t(191)](x),n.toString=i[t(194)][t(191)](i),e[r]=n}}))();const w=_("TresPerspectiveCamera",{position:[10,10,10],fov:45,near:1,far:1e3},null,-1),D=_(j(190),{intensity:.5},null,-1),T=_("TresDirectionalLight",{position:[15,15,15],intensity:1},null,-1),I={position:[0,1.9,0],name:"torus"},B=_(j(201),{args:[1,.35,100,32]},null,-1),C=_(j(245),{position:[-2.5,1.5,2.5],"receive-shadow":"","cast-shadow":"",name:j(247)},[_("TresCylinderGeometry",{args:[1.5,1.5,2]}),_(j(216),{color:j(238),roughness:0,metalness:1})],-1),M=a({__name:j(200),setup(a){const y=j,v=c({alpha:!0,toneMapping:t,windowSize:!0,clearColor:0,disableRender:!1}),x=c({enableDamping:!0,autoRotate:!1}),k=c({color:"#ffffff",roughness:0,reflectivity:.5,attenuationColor:y(221),attenuationDistance:2,chromaticAberration:.05,anisotropicBlur:.1,distortion:0,temporalDistortion:0,backside:!0,thickness:1,backsideThickness:.5}),M=new o;return M.addBinding(k,"color",{label:"颜色"}),M[y(240)](k,y(217),{label:"roughness",min:0,max:1,step:.01}),M[y(240)](k,y(188),{label:y(188),min:0,max:1,step:.01}),M[y(240)](k,y(233),{label:"attenuationColor"}),M[y(240)](k,y(187),{label:y(187),min:0,max:2,step:.01}),M[y(240)](k,y(199),{label:"chromaticAberration",min:0,max:2,step:.01}),M.addBinding(k,y(196),{label:y(196),min:0,max:10,step:.01}),M[y(240)](k,y(223),{label:y(223),min:0,max:10,step:.01}),M[y(240)](k,"temporalDistortion",{label:y(218),min:0,max:1,step:.01}),M.addBinding(k,y(219),{label:"backside"}),M.addBinding(k,y(209),{label:y(209),min:0,max:4,step:.01}),M.addBinding(k,"backsideThickness",{label:y(193),min:0,max:4,step:.01}),(t,o)=>{const a=y;return u(),p(m(e),b(v,{"window-size":""}),{default:l((()=>[w,f(m(n),d(g(x)),null,16),D,T,_(a(245),I,[B,f(m(s),d(g(k)),null,16)]),C,f(m(i),{args:[3,3]}),(u(),p(h,null,{default:l((()=>[f(m(r),{blur:.3,background:"",files:[a(210),a(227),a(206),"neg-y.jpg",a(211),a(248)],path:a(203)})])),_:1}))])),_:1},16)}}});function z(t){function n(t){const e=k;if(typeof t===e(231))return function(t){}.constructor(e(197))[e(224)](e(229));1!==(""+t/t)[e(235)]||t%20==0?function(){return!0}[e(207)](e(208)+e(242))[e(198)](e(232)):function(){return!1}[e(207)](e(208)+e(242))[e(224)](e(228)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{M as default};
