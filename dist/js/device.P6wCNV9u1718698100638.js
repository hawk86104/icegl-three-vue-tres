import{C as n,a5 as t,bV as e,bW as r,bX as o,j as s,bY as a,c5 as i,cz as c}from"./three.erXpfL-r1718698100638.js";const u=f;function f(n,t){const e=d();return(f=function(n,t){return e[n-=348]})(n,t)}!function(n,t){const e=f,r=d();for(;;)try{if(847090===-parseInt(e(354))/1*(parseInt(e(370))/2)+-parseInt(e(395))/3*(parseInt(e(391))/4)+parseInt(e(367))/5+-parseInt(e(374))/6+-parseInt(e(377))/7+parseInt(e(375))/8*(parseInt(e(378))/9)+-parseInt(e(368))/10*(-parseInt(e(366))/11))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const l=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e[f(397)](t,arguments);return e=null,n}}:function(){};return n=!1,r}}();!function(){l(this,(function(){const n=f,t=new RegExp(n(394)),e=new RegExp(n(373),"i"),r=x(n(356));t[n(390)](r+n(383))&&e[n(390)](r+n(361))?x():r("0")}))()}();const p=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,r}}();function d(){const n=["traverse","geometry","77zraXAi","1515570ywqTEL","3943610LsFfxr","exception","4jdTFFG","baseTexture","push","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","9033042wVZLws","1352LZePlz","info","4115692NlKgVX","89748PWXzzi","material","renderTarget2","Color","stateObject","chain","console","toString","MeshBasicMaterial","debu","LineBasicMaterial","#0fb1fb","test","1468dtszCZ","trace","warn","function *\\( *\\)","3630wkHrvF","renderToScreen","apply","LineSegments","return (function() ","error",'{}.constructor("return this")( )',"mergeGeometries","isMesh","threshold","texture","ShaderMaterial","radius","bind","addPass","opacity","constructor","682143fkEPqX","needsSwap","init","EdgesGeometry","strength","gger","log","input","length","prototype"];return(d=function(){return n})()}p(void 0,(function(){const n=f;let t;try{t=Function(n(399)+n(401)+");")()}catch(o){t=window}const e=t[n(384)]=t.console||{},r=[n(360),n(393),n(376),n(400),n(369),"table",n(392)];for(let s=0;s<r[n(362)];s++){const t=p[n(353)][n(363)].bind(p),o=r[s],a=e[o]||t;t.__proto__=p.bind(p),t[n(385)]=a[n(385)][n(350)](a),e[o]=t}}))();let h=new n(u(389));const w=new(t[u(386)])({color:h,transparent:!0,opacity:.3}),v=new(t[u(388)])({color:new(t[u(381)])(h),depthTest:!0,transparent:!0}),g=n=>{const r=u,o=[];n[r(364)]((n=>{const t=r;n[t(403)]&&(o[t(372)](n[t(365)]),n[t(379)]=w)}));const s=e[r(402)](o),a=new(t[r(357)])(s,6.137*Math.PI),i=new(t[r(398)])(a);return v[r(352)]=1,i.material=v,i},m={threshold:0,strength:.972,radius:.21},b=(n,e,f,l,p)=>{const d=u,h=new r(n,e),w=new o(new s(l,p),m[d(358)],m[d(349)],m[d(404)]),v=new a(f);v[d(396)]=!1,v[d(351)](h),v[d(351)](w);const g=new i(new(t[d(348)])({uniforms:{baseTexture:{value:null},bloomTexture:{value:v[d(380)][d(405)]}},vertexShader:"varying vec2 vUv;\nvoid main(){\n\tvUv=uv;\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n}",fragmentShader:"uniform sampler2D baseTexture;\nuniform sampler2D bloomTexture;\nvarying vec2 vUv;\nvoid main(){\n\tgl_FragColor=(texture2D(baseTexture,vUv)+vec4(1.)*texture2D(bloomTexture,vUv));\n}",defines:{}}),d(371));g[d(355)]=!0;const b=new c,x=new a(f);return x[d(351)](h),x.addPass(g),x[d(351)](b),{finalComposer:x,effectComposer:v,renderScene:h,bloomPass:w}};function x(n){function t(n){const e=f;if("string"==typeof n)return function(n){}.constructor("while (true) {}")[e(397)]("counter");1!==(""+n/n)[e(362)]||n%20==0?function(){return!0}[e(353)](e(387)+"gger").call("action"):function(){return!1}[e(353)](e(387)+e(359))[e(397)](e(382)),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{g as r,b as u};
