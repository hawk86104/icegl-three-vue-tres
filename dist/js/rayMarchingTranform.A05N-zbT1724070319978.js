import{$ as n,d as t}from"./@tresjs.2JnKj_Yj1724070319978.js";import{Z as e,j as r}from"./three.QUrV0R7c1724070319978.js";import{d as o,a1 as i,o as s,D as c,J as u,aj as a,ak as f,q as l,e as p,f as h,g as m,j as v,u as d,m as g}from"./@vue.Q1VpS3901724070319978.js";import"./tweakpane.yHWGBmom1724070319978.js";import"./@vueuse.2Yfo77CO1724070319978.js";const _=j;!function(n,t){const e=j,r=T();for(;;)try{if(659611===parseInt(e(341))/1*(parseInt(e(340))/2)+-parseInt(e(343))/3+-parseInt(e(359))/4+parseInt(e(363))/5*(parseInt(e(381))/6)+parseInt(e(374))/7*(-parseInt(e(373))/8)+parseInt(e(364))/9+-parseInt(e(383))/10)break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const w=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,r}}();!function(){w(this,(function(){const n=j,t=new RegExp(n(352)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),r=M(n(345));t[n(337)](r+n(379))&&e[n(337)](r+n(380))?M():r("0")}))()}();const y=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,r}}();y(void 0,(function(){const n=j,t=function(){const n=j;let t;try{t=Function("return (function() "+n(367)+");")()}catch(e){t=window}return t}(),e=t.console=t[n(360)]||{},r=[n(344),n(338),n(346),n(354),n(350),"table",n(382)];for(let o=0;o<r[n(370)];o++){const t=y[n(384)][n(369)][n(355)](y),i=r[o],s=e[i]||t;t[n(342)]=y[n(355)](y),t.toString=s[n(378)][n(355)](s),e[i]=t}}))();const b=[_(351)],I={ref:_(372),args:[1e3,1e3]};function j(n,t){const e=T();return(j=function(n,t){return e[n-=336]})(n,t)}const x=o({__name:"rayMarchingMaterialTranform",setup(t){const o=_,{onLoop:l,onAfterLoop:p}=n(),h={transparent:!0,depthWrite:!0,depthTest:!0,side:e,vertexShader:"varying vec2 vUv;\nvoid main(){\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n\tvUv=uv;\n}",fragmentShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nfloat sphere(vec3 p,float d){\n  return(length(p*abs(sin(u_time))*2.)-d)/abs(sin(u_time))/2.;\n}\nmat2 rot2D(float angle){\n  float s=sin(angle);\n  float c=cos(angle);\n  return mat2(c,-s,s,c);\n}\nfloat map(vec3 p){\n  p.xy*=rot2D(u_time);\n  vec3 pos=vec3(sin(u_time*10.),0.,0.);\n  float spheresdf=sphere(p-pos,.5);\n  return spheresdf;\n}\n\nvoid main(){\n  vec3 ro=vec3(0.,0.,-3.);//起始位置\n  vec3 rd=normalize(vec3(vUv-.5,1.));//方向\n  float t=0.;\n  vec3 color=vec3(0.);\n  for(int i=0;i<80;i++){\n    vec3 p=ro+rd*t;\n    float d=map(p);\n    t+=d;\n    //优化效率\n    if(t>100.||d<.001){\n      break;\n    }\n    \n  }\n  color=vec3(t)*.2;\n  gl_FragColor=vec4(color,1.);\n  \n}",uniforms:{u_resolution:{value:new r(window[o(348)],window[o(349)])},u_mouse:{value:new r(0,0)},u_time:{value:0}}},m=window.innerWidth/2,v=window[o(349)]/2;let d=0,g=0;return document[o(366)]("mousemove",(function(n){const t=o;d=n[t(371)]-m,g=n[t(356)]-v}),!1),i((()=>{})),l((({elapsed:n})=>{const t=o;h[t(376)][t(385)][t(362)]+=.001,h[t(376)].u_mouse[t(362)]=new r(d,g)})),p((()=>{})),(n,t)=>{const e=o;return s(),c("TresMesh",{ref:"MeshRef",rotation:[Math.PI/2,0,0]},[u(e(339),I,null,512),u(e(347),a(f(h)),null,16)],8,b)}}});function T(){const n=["action","value","49705vUZNqg","10682145KbJPva","while (true) {}","addEventListener",'{}.constructor("return this")( )',"apply","prototype","length","clientX","TresTubeGeometryRef","1604104sRyjjH","7IIkccs","stateObject","uniforms","gger","toString","chain","input","714jCGSgO","trace","13763320OPncgX","constructor","u_time","call","test","warn","TresPlaneGeometry","36PvbFwZ","63067lmVsuC","__proto__","2236392brxoyD","log","init","info","TresShaderMaterial","innerWidth","innerHeight","exception","rotation","function *\\( *\\)","debu","error","bind","clientY","counter","string","2092680YXSbQt","console"];return(T=function(){return n})()}function M(n){function t(n){const e=j;if(typeof n===e(358))return function(n){}[e(384)](e(365))[e(368)](e(357));1!==(""+n/n)[e(370)]||n%20==0?function(){return!0}[e(384)](e(353)+e(377))[e(336)](e(361)):function(){return!1}.constructor(e(353)+"gger")[e(368)](e(375)),t(++n)}try{if(n)return t;t(0)}catch(e){}}const S=A;function A(n,t){const e=R();return(A=function(n,t){return e[n-=168]})(n,t)}!function(n,t){const e=A,r=R();for(;;)try{if(214913===parseInt(e(182))/1+parseInt(e(208))/2*(-parseInt(e(201))/3)+-parseInt(e(187))/4*(parseInt(e(206))/5)+-parseInt(e(196))/6*(parseInt(e(172))/7)+parseInt(e(189))/8+-parseInt(e(188))/9*(parseInt(e(195))/10)+parseInt(e(168))/11*(parseInt(e(180))/12))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const D=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e[A(175)](t,arguments);return e=null,n}}:function(){};return n=!1,r}}();!function(){D(this,(function(){const n=A,t=new RegExp(n(203)),e=new RegExp(n(174),"i"),r=E("init");t.test(r+n(194))&&e[n(193)](r+n(177))?E():r("0")}))()}();const L=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e[A(175)](t,arguments);return e=null,n}}:function(){};return n=!1,r}}();function R(){const n=["\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","apply","TresCanvas","input","warn","perspectiveCameraRef","12sljwKk","#000000","384252GfxVCi","gger","console","#ffffff","constructor","4fAqpiX","612KyXMVU","1252112ztphpN","length","call","error","test","chain","61430OKqmUD","175176HzajDb","toString","log","counter",'{}.constructor("return this")( )',"3tFbVWb","rayMarchingTranform","function *\\( *\\)","action","exception","1208035xHgnti","bind","560534eXAwDx","8035819pgZcYS","info","TresPerspectiveCamera","trace","28sMjYTy","TresDirectionalLight"];return(R=function(){return n})()}L(void 0,(function(){const n=A,t=function(){const n=A;let t;try{t=Function("return (function() "+n(200)+");")()}catch(e){t=window}return t}(),e=t.console=t[n(184)]||{},r=[n(198),n(178),n(169),n(192),n(205),"table",n(171)];for(let o=0;o<r[n(190)];o++){const t=L[n(186)].prototype[n(207)](L),i=r[o],s=e[i]||t;t.__proto__=L[n(207)](L),t[n(197)]=s[n(197)][n(207)](s),e[i]=t}}))();const k={ref:S(179),position:[0,1500,0],fov:45,near:1,far:1e4},z=u("TresAmbientLight",{color:S(185)},null,-1),C=u(S(173),{position:[100,100,0],intensity:.5,color:S(185)},null,-1),Z=u("TresAxesHelper",{args:[1e3],position:[0,19,0]},null,-1),P=u("TresGridHelper",{args:[6e3,100],position:[0,19,0]},null,-1),U=o({__name:S(202),setup(e){const r=S,o={clearColor:r(181),shadows:!0,alpha:!1,useLegacyLights:!0},i={autoRotate:!1,enableDamping:!0},{onLoop:c}=n();return c((({delta:n})=>{})),l((()=>{})),(n,e)=>{const c=r,l=p(c(176));return s(),h(l,g(o,{"window-size":""}),{default:m((()=>[u(c(170),k,null,512),v(d(t),a(f(i)),null,16),z,C,v(x),Z,P])),_:1},16)}}});function E(n){function t(n){const e=A;if("string"==typeof n)return function(n){}[e(186)]("while (true) {}")[e(175)](e(199));1!==(""+n/n).length||n%20==0?function(){return!0}[e(186)]("debu"+e(183))[e(191)](e(204)):function(){return!1}[e(186)]("debu"+e(183))[e(175)]("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{U as default};
