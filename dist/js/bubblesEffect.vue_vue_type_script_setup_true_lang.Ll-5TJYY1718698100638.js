import{a5 as n,bV as t,ch as e,Z as o,C as i,aA as r}from"./three.erXpfL-r1718698100638.js";import{a,r as s,N as l}from"./@tresjs.aawOCoPx1718698100638.js";import{d as u,b as c,a3 as f,a2 as p,o as m,D as b,J as g,aj as v,ak as y,u as d}from"./@vue.CpOXM7bB1718698100638.js";function h(){const n=["table","test","input","80790lDlsFH","prototype","uniforms","8064qCehnK","gger","225RrFQjE","exception","DoubleSide","verticesNeedUpdate","337092PiQzYB","47ePwQUl","action","counter","TresBufferGeometry","push","console","uOpacity","sin","traverse","debu","#84ccff","15698kxtMWR","value","return (function() ","48WRgWNq","model","AdditiveBlending","9gwsHEP","Color","color","6vmbapd","mergeGeometries","string","1403665FHrtvM","404646kvNeop","constructor","1068244hEalpc","chain","opacity","error","50557TrbQVI","toString","bind",'{}.constructor("return this")( )',"108GYbCGa","apply","Mesh","warn","__proto__","geometry","length","stateObject"];return(h=function(){return n})()}const w=S;!function(n,t){const e=S,o=h();for(;;)try{if(545132===parseInt(e(385))/1*(-parseInt(e(396))/2)+parseInt(e(402))/3*(-parseInt(e(411))/4)+-parseInt(e(408))/5*(parseInt(e(405))/6)+-parseInt(e(384))/7*(-parseInt(e(399))/8)+-parseInt(e(380))/9*(parseInt(e(375))/10)+parseInt(e(409))/11*(-parseInt(e(419))/12)+-parseInt(e(415))/13*(-parseInt(e(378))/14))break;o.push(o.shift())}catch(i){o.push(o.shift())}}();const _=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[S(420)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){_(this,(function(){const n=S,t=new RegExp("function *\\( *\\)"),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=T("init");t[n(373)](o+n(412))&&e[n(373)](o+n(374))?T():o("0")}))()}();const z=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[S(420)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();z(void 0,(function(){const n=S;let t;try{t=Function(n(398)+n(418)+");")()}catch(i){t=window}const e=t[n(390)]=t.console||{},o=["log",n(422),"info",n(414),n(381),n(427),"trace"];for(let r=0;r<o[n(425)];r++){const t=z[n(410)][n(376)].bind(z),i=o[r],a=e[i]||t;t[n(423)]=z[n(417)](z),t[n(416)]=a.toString[n(417)](a),e[i]=t}}))();const x=g(w(388),null,null,-1),P=u({__name:"xRayEffect",props:{model:{},color:{default:w(395)},opacity:{default:1}},async setup(e){const o=w;let i,r;const u=e,d=c(),h=[];u[o(400)][o(393)]((t=>{const e=o;t instanceof n[e(421)]&&(t[e(424)][e(383)]=!0,h[e(389)](t[e(424)]))}));const _=([i,r]=f((()=>l({map:"./plugins/medical/image/brainXRayLight.png"}))),i=await i,r(),i),z={uniforms:{c:{type:"f",value:1.11},p:{type:"f",value:1},glowColor:{type:"c",value:new(n[o(403)])(u[o(404)])},lightningTexture:{type:"t",value:_.map},offsetY:{type:"f",value:.1},uTime:{type:"f",value:0},uOpacity:{type:"f",value:u[o(413)]}},vertexShader:"uniform float c;\nuniform float p;\nuniform float uTime;\nvarying float intensity;\nvarying vec2 vUv;\nvoid main(){\n    vUv=uv;\n    vec3 vNormal=normalize(normalMatrix*normal);\n    intensity=pow(c-abs(dot(vNormal,vec3(0,0,1))),p);\n    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n}",fragmentShader:"uniform vec3 glowColor;\nuniform sampler2D lightningTexture;\nvarying float intensity;\nvarying vec2 vUv;\nuniform float offsetY;\nuniform float uTime;\nuniform float uOpacity;\n\nvoid main(){\n  vec2 uv=vUv;\n  uv.y+=offsetY;\n  vec3 glow=glowColor*intensity;\n  vec3 color=vec3(step(.1,uv.y)-step(.2,uv.y))-vec3(texture2D(lightningTexture,uv));\n  float alpha=clamp(cos(uTime*3.),.5,1.);\n  gl_FragColor=vec4(glow+color,alpha*uOpacity);\n}",side:n[o(382)],blending:n[o(401)],depthWrite:!1};z[o(377)].offsetY[o(397)]=Math[o(392)](5);const{camera:P}=a(),{onLoop:S}=s();return S((({delta:n})=>{const t=o;P[t(397)].position&&d[t(397)]&&(z[t(377)].uTime[t(397)]+=n)})),p((()=>{const e=o;d.value&&(d[e(397)][e(424)].dispose(),d[e(397)][e(424)]=t[e(406)](h)),u[e(404)]&&(z[e(377)].glowColor[e(397)]=new(n[e(403)])(u[e(404)])),u[e(413)]&&(z[e(377)][e(391)].value=u.opacity)})),(n,t)=>(m(),b("TresMesh",{ref_key:"TresMeshRef",ref:d},[x,g("TresShaderMaterial",v(y(z)),null,16)],512))}});function S(n,t){const e=h();return(S=function(n,t){return e[n-=373]})(n,t)}function T(n){function t(n){const e=S;if(typeof n===e(407))return function(n){}[e(410)]("while (true) {}")[e(420)](e(387));1!==(""+n/n)[e(425)]||n%20==0?function(){return!0}[e(410)](e(394)+e(379)).call(e(386)):function(){return!1}[e(410)](e(394)+e(379)).apply(e(426)),t(++n)}try{if(n)return t;t(0)}catch(e){}}const I=F;!function(n,t){const e=F,o=B();for(;;)try{if(908681===-parseInt(e(376))/1+parseInt(e(368))/2+-parseInt(e(372))/3*(-parseInt(e(402))/4)+parseInt(e(367))/5+-parseInt(e(360))/6+-parseInt(e(393))/7*(-parseInt(e(394))/8)+-parseInt(e(390))/9*(parseInt(e(346))/10))break;o.push(o.shift())}catch(i){o.push(o.shift())}}();const C=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[F(349)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){C(this,(function(){const n=F,t=new RegExp(n(386)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=j(n(405));t[n(403)](o+n(358))&&e[n(403)](o+n(357))?j():o("0")}))()}();const M=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function F(n,t){const e=B();return(F=function(n,t){return e[n-=339]})(n,t)}function B(){const n=["3494260GMidSB","afective","call","traverse","3DtFYAB","gger","bridge","trace","1616410iuDwqk","amigdala","while (true) {}","stateObject","bubblesEffect","randInt","action","episodic","value","info","function *\\( *\\)","cerebellum","brainstem","array","59193ILsQUo","size","TresBufferGeometry","445669iHOopD","144OiwgYu",'{}.constructor("return this")( )',"debu","warn","glowColor","analitic","includes","toString","6464308UuHcSf","test","Float32BufferAttribute","init","console","bind","position","color","model","MathUtils","randFloat","#FFF","BufferGeometryRef","string","TresMeshRef","uSlowTime","process","setAttribute","AdditiveBlending","1750WMbosk","TresShaderMaterial","length","apply","table","attributes","push","Mesh","prototype","Color","computeBoundingSphere","input","chain","ShaderMaterial","8448798BPrKbN","TresPoints","material","opacity","uniforms","counter","constructor","2874930ZogBVz"];return(B=function(){return n})()}M(void 0,(function(){const n=F,t=function(){const n=F;let t;try{t=Function("return (function() "+n(395)+");")()}catch(e){t=window}return t}(),e=t[n(406)]=t[n(406)]||{},o=["log",n(397),n(385),"error","exception",n(350),n(375)];for(let i=0;i<o[n(348)];i++){const t=M[n(366)][n(354)][n(407)](M),r=o[i],a=e[r]||t;t.__proto__=M[n(407)](M),t[n(401)]=a[n(401)][n(407)](a),e[r]=t}}))();const U=u({__name:I(380),props:{model:{},color:{default:I(413)},opacity:{default:1}},setup(t){const a=I,l=t,u=[a(369),"semantic",a(383),a(343),a(377),a(388),a(374),a(387),a(399)],f={};l[a(410)][a(371)]((t=>{const o=a;t instanceof n[o(353)]&&u.map((n=>{const i=o;if(t.name[i(400)](n)){if(f[n]){const o=[f[n],t.geometry];return f[n]=e(o),f}return f[n]=t.geometry}return[]}))}));const h=c(),w=new(n[a(359)])({uniforms:{glowColor:{type:"c",value:new(n[a(355)])(l[a(409)])},uTime:{type:"f",value:0},uSlowTime:{type:"f",value:0},uBubblesUp:{type:"f",value:1},uOpacity:{type:"f",value:l[a(363)]}},vertexShader:"uniform float p;\nuniform float uTime;\nuniform float uSlowTime;\nuniform float uBubblesUp;\nvarying float intensity;\nattribute vec2 aDelayDuration;\nattribute float size;\nattribute vec4 bubbles;\nvarying float alpha;\n\nfloat easeExpoInOut(float p){\n    return((p*=2.)<1.)?.5*pow(2.,10.*(p-1.)):.5*(2.-pow(2.,-10.*(p-1.)));\n}\n\nvoid main()\n{\n    intensity=.9;\n    vec4 mvPosition=modelViewMatrix*vec4(position,1.);\n    gl_PointSize=size*(300./-mvPosition.z);\n    float m=mod(size,sin(uSlowTime*.12+size));\n    \n    alpha=step(.5,abs(m));\n    if(m>.5&&m<.7){\n        gl_PointSize=.9*size;\n    }\n    if(m>.8){\n        gl_PointSize=.9*size;\n    }\n    \n    gl_Position=projectionMatrix*mvPosition;\n    \n    if(bubbles.w>0.&&bubbles.w<2.&&bubbles.x!=0.&&bubbles.y!=0.){\n        gl_PointSize=size+15.;\n        alpha=clamp(abs(sin(uTime-bubbles.y)),.3,1.);\n        \n        float tProgress=smoothstep(0.,aDelayDuration.x,uBubblesUp);\n        vec3 tranlated=mix(position,bubbles.xyz,tProgress);\n        vec4 bPosition=modelViewMatrix*vec4(tranlated,1.);\n        \n        gl_PointSize=uBubblesUp*gl_PointSize;\n        gl_Position+=projectionMatrix*bPosition;\n        alpha=5.;\n    }\n    \n    if(bubbles.w==2.){\n        alpha=clamp(abs(sin(uTime-bubbles.y)),.3,.6);\n        gl_PointSize=size+60.;\n        \n        gl_PointSize=uBubblesUp*gl_PointSize;\n        float normalized=clamp(uBubblesUp,0.,2.)*2.;\n        vec3 tranlated=mix(position,bubbles.xyz,normalized);\n        vec4 bPosition=modelViewMatrix*vec4(tranlated,1.);\n        gl_Position+=projectionMatrix*bPosition;\n    }\n    if(bubbles.w==3.){\n        alpha=clamp(abs(sin(uTime-bubbles.y)),.3,1.);\n        gl_PointSize=size+90.;\n        \n        gl_PointSize=uBubblesUp*gl_PointSize;\n        float normalized=clamp(uBubblesUp,0.,2.)*2.;\n        vec3 tranlated=mix(position,bubbles.xyz,normalized);\n        vec4 bPosition=modelViewMatrix*vec4(tranlated,1.);\n        gl_Position+=projectionMatrix*bPosition;\n    }\n}",fragmentShader:"precision mediump float;\nuniform vec3 glowColor;\nvarying float intensity;\nvarying float alpha;\nuniform float uOpacity;\nvoid main() {\n  float distanceToCenter = distance(gl_PointCoord, vec2(.5));\n  float pct = 1. - smoothstep(0., .5, distanceToCenter);\n  vec3 color = vec3(1.) * gl_FragColor.rgb;\n  vec3 glow = glowColor * intensity;\n  gl_FragColor = vec4(glow, clamp(alpha, 0., 1.));\n  gl_FragColor = vec4(glow, pct * gl_FragColor.a);\n  gl_FragColor = vec4(gl_FragColor.rgb, gl_FragColor.a * uOpacity);\n  // gl_FragColor=vec4(1.,1.,0.,1.);\n}",blending:n[a(345)],side:o,depthTest:!1,vertexColors:!1,transparent:!0});p((()=>{h[a(384)]&&(()=>{const t=a,e=[],o=[],i=[],s=[];for(let r=0;r<2e4-3*u[t(348)];r+=1){const a=n[t(411)].randInt(0,u[t(348)]-1),l=u[a],c=f[l][t(351)][t(408)][t(389)][3*r+0]||0,p=f[l].attributes[t(408)][t(389)][3*r+1]||0,m=f[l][t(351)].position[t(389)][3*r+2]||0;if(o[t(352)](c,p,m),e[r]=n[t(411)][t(412)](10,20),r%100==0){const e=n[t(411)][t(381)](100,250)+p;s[t(352)](c,e,m,1)}else s[t(352)](c,p,m,0);i[2*r+0]=n[t(411)].randFloat(.5,1.5),i[2*r+1]=2.5}h[t(384)][t(344)]("aDelayDuration",new(n[t(404)])(i,2)),h[t(384)][t(344)]("bubbles",new(n[t(404)])(s,4)),h[t(384)][t(344)](t(408),new(n[t(404)])(o,3)),h[t(384)][t(344)]("color",new r([],3)),h.value.setAttribute(t(391),new(n[t(404)])(e,1)),h.value[t(356)]()})()}));const _=c(),{onLoop:z}=s();return z((({delta:n})=>{const t=a;_[t(384)]&&(_[t(384)].material[t(364)].uTime[t(384)]+=.05,_.value[t(362)][t(364)][t(342)][t(384)]+=1/400),l[t(409)]&&(w[t(364)][t(398)][t(384)]=new i(l[t(409)])),l.opacity&&(w.uniforms.uOpacity[t(384)]=l.opacity)})),(n,t)=>{const e=a;return m(),b(e(361),{ref_key:e(341),ref:_},[g(e(392),{ref_key:e(339),ref:h},null,512),g(e(347),v(y(d(w))),null,16)],512)}}});function j(n){function t(n){const e=F;if(typeof n===e(340))return function(n){}.constructor(e(378))[e(349)](e(365));1!==(""+n/n)[e(348)]||n%20==0?function(){return!0}[e(366)](e(396)+e(373))[e(370)](e(382)):function(){return!1}.constructor(e(396)+e(373))[e(349)](e(379)),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{P as _,U as a};
