import{a6 as t}from"./three.0IuNGJsA1725236486446.js";import{N as n}from"./@tresjs.DDzpLB7Q1725236486446.js";import{d as r,a4 as e,o,D as i,J as a,aj as s,ak as c}from"./@vue.9bHx4gg21725236486446.js";const u=p;function p(t,n){const r=v();return(p=function(t,n){return r[t-=245]})(t,n)}!function(t,n){const r=p,e=v();for(;;)try{if(368259===parseInt(r(250))/1*(parseInt(r(252))/2)+-parseInt(r(269))/3+parseInt(r(293))/4+parseInt(r(284))/5*(-parseInt(r(286))/6)+parseInt(r(255))/7+parseInt(r(266))/8*(parseInt(r(270))/9)+parseInt(r(246))/10)break;e.push(e.shift())}catch(o){e.push(e.shift())}}();const f=function(){let t=!0;return function(n,r){const e=t?function(){if(r){const t=r[p(267)](n,arguments);return r=null,t}}:function(){};return t=!1,e}}();!function(){f(this,(function(){const t=p,n=new RegExp(t(280)),r=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),e=d(t(278));n[t(258)](e+t(282))&&r[t(258)](e+t(283))?d():e("0")}))()}();const l=function(){let t=!0;return function(n,r){const e=t?function(){if(r){const t=r[p(267)](n,arguments);return r=null,t}}:function(){};return t=!1,e}}();l(void 0,(function(){const t=p;let n;try{n=Function("return (function() "+t(276)+");")()}catch(o){n=window}const r=n[t(248)]=n.console||{},e=[t(271),t(257),t(253),t(290),t(264),t(263),t(254)];for(let i=0;i<e[t(274)];i++){const n=l.constructor[t(249)][t(289)](l),o=e[i],a=r[o]||n;n[t(285)]=l[t(289)](l),n.toString=a[t(260)].bind(a),r[o]=n}}))();const m=["args"];function v(){const t=["13746vWxxvN","info","trace","73976TALYEC","\n\t\tvarying vec3 vFragPos;\n\n\t\tvoid main() {\n\t\t\t\tvFragPos = position.xyz;\n\t\t\t\tvec4 viewSpace = vec4(mat3(modelViewMatrix) * position, 0.0);\n\t\t\t\tviewSpace.w = 1.0;\n\t\t\t\tgl_Position = projectionMatrix * viewSpace;    \n\t\t}","warn","test","string","toString","action","TresBoxGeometry","table","exception","TresMesh","453224mukkcj","apply","while (true) {}","1685589OeKORK","36PnFtMv","log","ClampToEdgeWrapping","wrapS","length","BackSide",'{}.constructor("return this")( )',"size","init","constructor","function *\\( *\\)","LinearFilter","chain","input","395aaxSXK","__proto__","23136HqIAIV","call","wrapT","bind","error","debu","gger","1588556omCMhy","skyBoxAmesh","stateObject","4011100eSoUqx","generateMipmaps","console","prototype","29XlpKfS","texture"];return(v=function(){return t})()}const g=r({__name:u(294),props:{texture:{},size:{default:1e3}},async setup(r){const p=u;let f,l;const v=r,{map:g}=([f,l]=e((()=>n({map:v[p(251)]}))),f=await f,l(),f);g[p(273)]=g[p(288)]=t[p(272)],g[p(247)]=!1,g.magFilter=t[p(281)],g.minFilter=t[p(281)];const d={uniforms:{uSkybox:{type:"t",value:g}},side:t[p(275)],vertexShader:p(256),fragmentShader:"\n\t\tuniform sampler2D uSkybox;\n\t\tvarying vec3 vFragPos;\n\t\tconst float PI = 3.14159265359;\n\t\tvoid main() {\n\t\t\t\tvec3 dir = normalize(vFragPos);\n\t\t\t\tfloat v = (asin(dir.y) + PI * 0.5) / (PI); \n\t\t\t\tfloat u = (atan(dir.x, dir.z) + PI) / (PI * 2.0);\n\t\t\t\tgl_FragColor = texture2D(uSkybox, vec2(u, v));\n\t\t}",depthWrite:!1};return(t,n)=>{const r=p;return o(),i(r(265),null,[a(r(262),{args:[v[r(277)],v[r(277)],v[r(277)]]},null,8,m),a("TresShaderMaterial",s(c(d)),null,16)])}}});function d(t){function n(t){const r=p;if(typeof t===r(259))return function(t){}.constructor(r(268))[r(267)]("counter");1!==(""+t/t)[r(274)]||t%20==0?function(){return!0}[r(279)](r(291)+r(292))[r(287)](r(261)):function(){return!1}.constructor(r(291)+r(292)).apply(r(245)),n(++t)}try{if(t)return n;n(0)}catch(r){}}export{g as _};
