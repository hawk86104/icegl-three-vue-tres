import{a6 as t,l as n,A as r}from"./three.QUrV0R7c1724070319978.js";import{l as e}from"./utils.BIr4X0LU1724070319978.js";import{d as o,a4 as i,o as a,D as s,J as c,aj as u,ak as f}from"./@vue.Q1VpS3901724070319978.js";const p=v;!function(t,n){const r=v,e=m();for(;;)try{if(456434===-parseInt(r(320))/1+-parseInt(r(318))/2+-parseInt(r(307))/3*(parseInt(r(296))/4)+parseInt(r(310))/5+-parseInt(r(291))/6+parseInt(r(284))/7+parseInt(r(324))/8)break;e.push(e.shift())}catch(o){e.push(e.shift())}}();const l=function(){let t=!0;return function(n,r){const e=t?function(){if(r){const t=r[v(292)](n,arguments);return r=null,t}}:function(){};return t=!1,e}}();!function(){l(this,(function(){const t=v,n=new RegExp("function *\\( *\\)"),r=new RegExp(t(282),"i"),e=w(t(290));n[t(322)](e+t(295))&&r[t(322)](e+"input")?w():e("0")}))()}();const g=function(){let t=!0;return function(n,r){const e=t?function(){if(r){const t=r.apply(n,arguments);return r=null,t}}:function(){};return t=!1,e}}();function v(t,n){const r=m();return(v=function(t,n){return r[t-=282]})(t,n)}function m(){const t=["13987856NAwnhD","gger","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","console","741825rwHtXS","__proto__","call","info","size","toString","init","1632444JyHvpj","apply","debu","ClampToEdgeWrapping","chain","99548YRwVOH","action","wrapT","prototype","TresMesh","counter","exception","return (function() ","trace","TresBoxGeometry","LinearFilter","39GrBPvf","table","wrapS","2316255wdwyTe","TresShaderMaterial","length","minFilter","error",'{}.constructor("return this")( )',"skyBoxBmesh","constructor","829274AtKAxG","bind","851032fXEswC","log","test","\n\t\tuniform sampler2D uSkybox;\n\t\tvarying vec3 vFragPos;\n\t\tconst float PI = 3.14159265359;\n\t\tvoid main() {\n\t\t\t\tvec3 dir = normalize(vFragPos);\n\t\t\t\tfloat v = (asin(dir.y) + PI * 0.5) / (PI); \n\t\t\t\tfloat u = (atan(dir.x, dir.z) + PI) / (PI * 2.0);\n\t\t\t\tgl_FragColor = texture2D(uSkybox, vec2(u, v));\n\t\t}"];return(m=function(){return t})()}g(void 0,(function(){const t=v;let n;try{n=Function(t(303)+t(315)+");")()}catch(o){n=window}const r=n[t(283)]=n.console||{},e=[t(321),"warn",t(287),t(314),t(302),t(308),t(304)];for(let i=0;i<e[t(312)];i++){const n=g[t(317)][t(299)][t(319)](g),o=e[i],a=r[o]||n;n[t(285)]=g[t(319)](g),n[t(289)]=a[t(289)][t(319)](a),r[o]=n}}))();const h=["args"],d=o({__name:p(316),props:{texture:{},size:{default:1e3}},async setup(o){const l=p;let g,v;const m=o,d=([g,v]=i((()=>e(m.texture))),g=await g,v(),g);d[l(309)]=d[l(298)]=t[l(294)],d.generateMipmaps=!1,d.magFilter=t[l(306)],d[l(313)]=n;const w={uniforms:{uSkybox:{type:"t",value:d}},side:r,vertexShader:"\n\t\tvarying vec3 vFragPos;\n\n\t\tvoid main() {\n\t\t\t\tvFragPos = position.xyz;\n\t\t\t\tvec4 viewSpace = vec4(mat3(modelViewMatrix) * position, 0.0);\n\t\t\t\tviewSpace.w = 1.0;\n\t\t\t\tgl_Position = projectionMatrix * viewSpace;    \n\t\t}",fragmentShader:l(323),depthWrite:!0};return(t,n)=>{const r=l;return a(),s(r(300),null,[c(r(305),{args:[m[r(288)],m[r(288)],m[r(288)]]},null,8,h),c(r(311),u(f(w)),null,16)])}}});function w(t){function n(t){const r=v;if("string"==typeof t)return function(t){}[r(317)]("while (true) {}")[r(292)](r(301));1!==(""+t/t).length||t%20==0?function(){return!0}[r(317)](r(293)+r(325))[r(286)](r(297)):function(){return!1}[r(317)](r(293)+r(325))[r(292)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(r){}}export{d as _};
