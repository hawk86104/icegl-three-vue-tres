import{a6 as t,l as n}from"./three.0L1oP_mX1722313330047.js";import{N as r}from"./@tresjs.Q03Md-En1722313330047.js";import{d as e,a4 as o,o as i,D as a,J as s,aj as c,ak as u}from"./@vue.Q1VpS3901722313330047.js";const p=v;!function(t,n){const r=v,e=g();for(;;)try{if(497637===-parseInt(r(547))/1*(-parseInt(r(536))/2)+parseInt(r(543))/3+-parseInt(r(508))/4*(-parseInt(r(499))/5)+-parseInt(r(545))/6+parseInt(r(507))/7+parseInt(r(518))/8*(-parseInt(r(542))/9)+-parseInt(r(534))/10*(parseInt(r(527))/11))break;e.push(e.shift())}catch(o){e.push(e.shift())}}();const f=function(){let t=!0;return function(n,r){const e=t?function(){if(r){const t=r[v(503)](n,arguments);return r=null,t}}:function(){};return t=!1,e}}();!function(){f(this,(function(){const t=v,n=new RegExp(t(515)),r=new RegExp(t(539),"i"),e=h(t(532));n[t(509)](e+t(528))&&r[t(509)](e+"input")?h():e("0")}))()}();const l=function(){let t=!0;return function(n,r){const e=t?function(){if(r){const t=r[v(503)](n,arguments);return r=null,t}}:function(){};return t=!1,e}}();l(void 0,(function(){const t=v,n=function(){const t=v;let n;try{n=Function(t(525)+t(502)+");")()}catch(r){n=window}return n}(),r=n[t(533)]=n[t(533)]||{},e=["log",t(510),"info",t(522),t(520),t(523),t(514)];for(let o=0;o<e.length;o++){const n=l[t(506)][t(530)][t(526)](l),i=e[o],a=r[i]||n;n[t(541)]=l.bind(l),n[t(521)]=a[t(521)][t(526)](a),r[i]=n}}))();const m=[p(519)];function g(){const t=["exception","toString","error","table","size","return (function() ","bind","5610BvWtem","chain","gger","prototype","BackSide","init","console","27410RmMjxt","TresMesh","6aylGhT","\n\t\tuniform sampler2D uSkybox;\n\t\tvarying vec3 vFragPos;\n\t\tconst float PI = 3.14159265359;\n\t\tvoid main() {\n\t\t\t\tvec3 dir = normalize(vFragPos);\n\t\t\t\tfloat v = (asin(dir.y) + PI * 0.5) / (PI); \n\t\t\t\tfloat u = (atan(dir.x, dir.z) + PI) / (PI * 2.0);\n\t\t\t\tgl_FragColor = texture2D(uSkybox, vec2(u, v));\n\t\t}","wrapS","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","stateObject","__proto__","89163UPiBCK","1349262tVBeBg","string","286674sUbRcx","length","305627oyfnLb","2907845tSkWmS","action","TresShaderMaterial",'{}.constructor("return this")( )',"apply","call","ClampToEdgeWrapping","constructor","3225257lfeqIb","4MkijOa","test","warn","TresBoxGeometry","minFilter","wrapT","trace","function *\\( *\\)","debu","LinearFilter","376YHOnNr","args"];return(g=function(){return t})()}function v(t,n){const r=g();return(v=function(t,n){return r[t-=499]})(t,n)}const d=e({__name:"skyBoxAmesh",props:{texture:{},size:{default:1e3}},async setup(e){const f=p;let l,g;const v=e,{map:d}=([l,g]=o((()=>r({map:v.texture}))),l=await l,g(),l);d[f(538)]=d[f(513)]=t[f(505)],d.generateMipmaps=!1,d.magFilter=n,d[f(512)]=t[f(517)];const h={uniforms:{uSkybox:{type:"t",value:d}},side:t[f(531)],vertexShader:"\n\t\tvarying vec3 vFragPos;\n\n\t\tvoid main() {\n\t\t\t\tvFragPos = position.xyz;\n\t\t\t\tvec4 viewSpace = vec4(mat3(modelViewMatrix) * position, 0.0);\n\t\t\t\tviewSpace.w = 1.0;\n\t\t\t\tgl_Position = projectionMatrix * viewSpace;    \n\t\t}",fragmentShader:f(537),depthWrite:!1};return(t,n)=>{const r=f;return i(),a(r(535),null,[s(r(511),{args:[v.size,v[r(524)],v[r(524)]]},null,8,m),s(r(501),c(u(h)),null,16)])}}});function h(t){function n(t){const r=v;if(typeof t===r(544))return function(t){}[r(506)]("while (true) {}").apply("counter");1!==(""+t/t)[r(546)]||t%20==0?function(){return!0}.constructor(r(516)+r(529))[r(504)](r(500)):function(){return!1}[r(506)]("debu"+r(529))[r(503)](r(540)),n(++t)}try{if(t)return n;n(0)}catch(r){}}export{d as _};
