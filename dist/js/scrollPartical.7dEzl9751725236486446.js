import{b as t}from"./index.7r-tHqVc1725236486446.js";import{$ as n,p as e,a as r,y as o}from"./@tresjs.DDzpLB7Q1725236486446.js";import{a6 as i,aV as s,a,q as c,C as u,W as l,n as f,bT as p,O as m,bU as h,bV as d,bW as g,l as x,ab as v,bX as y}from"./three.0IuNGJsA1725236486446.js";import{P as w}from"./tweakpane.yHWGBmom1725236486446.js";import{l as b}from"./util.1GQIBSfV1725236486446.js";import{d as I,o as _,D as j,u as S,b as P,a4 as z,f as A,a1 as M,r as B,e as C,j as T,g as F,al as D,aj as R,ak as k,F as E,am as Z,an as O,J as Y}from"./@vue.9bHx4gg21725236486446.js";import{_ as L}from"./@fesjs.W9B5RBCy1725236486446.js";import"./index.WAsmbW3C1725236486446.js";import"./chalk.sAH7iSuz1725236486446.js";/* empty css                                 */import"./iconify-icon.l-H2-fnN1725236486446.js";import"./@iconify.9PoCakEb1725236486446.js";import"./vue-router.g5JZ8VPj1725236486446.js";import"./lodash-es.nFpJXAf-1725236486446.js";import"./@vueuse.XXpXaOwX1725236486446.js";import"./@qlin.yHhFDldE1725236486446.js";import"./pinia.OsYF28_k1725236486446.js";import"./@floating-ui.BPbuo5Gx1725236486446.js";import"./@juggle.7yjBMqoW1725236486446.js";import"./utils._61io6Rl1725236486446.js";import"./default.vue_vue_type_script_setup_true_lang.W5nAieq-1725236486446.js";import"./three-mesh-ui.module.cMltuBA21725236486446.js";!function(t,n){const e=$,r=X();for(;;)try{if(513950===parseInt(e(228))/1*(-parseInt(e(214))/2)+parseInt(e(197))/3+-parseInt(e(237))/4*(-parseInt(e(205))/5)+parseInt(e(229))/6*(-parseInt(e(217))/7)+parseInt(e(225))/8+-parseInt(e(227))/9*(parseInt(e(204))/10)+parseInt(e(212))/11*(parseInt(e(202))/12))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const U=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[$(232)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();!function(){U(this,(function(){const t=$,n=new RegExp(t(215)),e=new RegExp(t(200),"i"),r=V(t(203));n.test(r+t(213))&&e[t(209)](r+t(218))?V():r("0")}))()}();const J=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[$(232)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();function $(t,n){const e=X();return($=function(t,n){return e[t-=186]})(t,n)}J(void 0,(function(){const t=$;let n;try{n=Function(t(192)+t(206)+");")()}catch(o){n=window}const e=n.console=n[t(220)]||{},r=[t(236),t(186),"info",t(207),t(195),t(226),"trace"];for(let i=0;i<r.length;i++){const n=J.constructor.prototype[t(210)](J),o=r[i],s=e[o]||n;n.__proto__=J[t(210)](J),n[t(222)]=s[t(222)][t(210)](s),e[o]=n}}))();const q=t=>{const n=$;let e=t[n(230)][n(211)][n(231)],r=Math[n(235)](Math[n(187)](e)),o=Math[n(235)](e/r),a=new Float32Array(r*o*4);!function(t){const e=n;for(let n=Math[e(199)](t[e(189)]/3)-1;n>0;n--){const r=Math[e(199)](Math[e(223)]()*(n+1));for(let e=0;e<3;e++){let o=t[3*n+e];t[3*n+e]=t[3*r+e],t[3*r+e]=o}}}(t[n(230)].position[n(233)]);for(let i=0;i<e;i++){const e=t.attributes[n(211)][n(233)][3*i+0],r=t[n(230)][n(211)][n(233)][3*i+1],o=t[n(230)][n(211)].array[3*i+2],s=0;a[4*i+0]=e,a[4*i+1]=r,a[4*i+2]=o,a[4*i+3]=s}let c=new(i[n(208)])(a,r,o,s,i[n(216)]);return c[n(191)]=!0,c},G=()=>{const t=$,n=new(i[$(201)])({uniforms:{uTextureA:{value:null},uTextureB:{value:null},uTime:{value:0},uScroll:{value:0}},vertexShader:"varying vec2 vUv;\nvoid main() {\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  vUv = uv;\n}",fragmentShader:"uniform sampler2D uTextureA;\nuniform sampler2D uTextureB;\nprecision mediump float; \nuniform float uTime;\nuniform float uScroll;\nvarying vec2 vUv;\n\nmat3 rotationMatrix3(vec3 axis, float angle) {\n  axis = normalize(axis);\n  float s = sin(angle);\n  float c = cos(angle);\n  float oc = 1. - c;\n\n  return mat3(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s,\n              oc * axis.z * axis.x + axis.y * s,\n              oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c,\n              oc * axis.y * axis.z - axis.x * s,\n              oc * axis.z * axis.x - axis.y * s,\n              oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c);\n}\n\nvoid main() {\n  vec3 textureA = rotationMatrix3(vec3(10., 6., 3.), sin(uTime) * .1) *\n                  texture2D(uTextureA, vUv).xyz;\n  \n\n  vec3 textureB = rotationMatrix3(vec3(10., 6., 3.), sin(uTime) * .1) *\n                  texture2D(uTextureB, vUv).xyz;\n  \n\n  float t = uScroll;\n  vec3 pos = mix(textureA, textureB, t);\n\n  gl_FragColor = vec4(pos, 1.);\n}"}),e=new(i[t(190)]);return e[t(234)](t(211),new(i[t(196)])(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,-1,0,1,1,0,-1,1,0]),3)),e[t(234)]("uv",new a(new Float32Array([0,1,1,1,1,0,0,1,1,0,0,0]),2)),new c(e,n)};function V(t){function n(t){const e=$;if(typeof t===e(193))return function(t){}[e(219)]("while (true) {}").apply(e(221));1!==(""+t/t)[e(189)]||t%20==0?function(){return!0}.constructor(e(188)+e(224))[e(194)](e(198)):function(){return!1}[e(219)](e(188)+e(224))[e(232)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}function X(){const t=["3899JDDtWH","input","constructor","console","counter","toString","random","gger","2496648eHOEoW","table","34407voEryD","8JSIJmE","3474chehse","attributes","count","apply","array","setAttribute","ceil","log","2388PkOvip","warn","sqrt","debu","length","BufferGeometry","needsUpdate","return (function() ","string","call","exception","BufferAttribute","512544CGPrZg","action","floor","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","ShaderMaterial","4113852txBZgK","init","2260YDqUUj","1265jwgkSK",'{}.constructor("return this")( )',"error","DataTexture","test","bind","position","55nDxZAb","chain","161906meZlwK","function *\\( *\\)","FloatType"];return(X=function(){return t})()}const H=K;!function(t,n){const e=K,r=Q();for(;;)try{if(903058===-parseInt(e(166))/1+parseInt(e(168))/2+-parseInt(e(161))/3+-parseInt(e(130))/4*(-parseInt(e(138))/5)+-parseInt(e(165))/6+parseInt(e(150))/7*(-parseInt(e(163))/8)+parseInt(e(154))/9*(parseInt(e(135))/10))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const W=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[K(160)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();function K(t,n){const e=Q();return(K=function(t,n){return e[t-=127]})(t,n)}!function(){W(this,(function(){const t=K,n=new RegExp(t(144)),e=new RegExp(t(172),"i"),r=et(t(173));n[t(128)](r+t(134))&&e[t(128)](r+t(167))?et():r("0")}))()}();const N=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[K(160)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();function Q(){const t=["particalMesh","10292388rwQIwx","474258porYTG","input","576400pkCXAH","position","setAttribute","string","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","init","bind","error","test","width","412pTWNJM","while (true) {}","gger","console","chain","690LqqDpS","stateObject","BufferAttribute","370LpkgIq","length","trace","table","debu","prototype","function *\\( *\\)","ShaderMaterial","#ffaa00","__proto__","Points","constructor","25599YDiKLI",'{}.constructor("return this")( )',"object","BufferGeometry","598599RYLsBj","action","devicePixelRatio","toString","log","AdditiveBlending","apply","4795638JUuYmI","return (function() ","424UXeLXp"];return(Q=function(){return t})()}N(void 0,(function(){const t=K;let n;try{n=Function(t(162)+t(151)+");")()}catch(o){n=window}const e=n[t(133)]=n.console||{},r=[t(158),"warn","info",t(127),"exception",t(141),t(140)];for(let i=0;i<r[t(139)];i++){const n=N[t(149)][t(143)][t(174)](N),o=r[i],s=e[o]||n;n[t(147)]=N[t(174)](N),n[t(157)]=s[t(157)][t(174)](s),e[o]=n}}))();const tt=[H(152)],nt=I({__name:H(164),props:{progress:{default:0},width:{default:256},height:{default:256}},setup(t,{expose:n}){const e=t;let r=((t,n)=>{const e=K,r=t*n;let o=new Float32Array(3*r);for(let i=0;i<r;i++){let e=3*i;o[e+0]=i%t/t,o[e+1]=i/t/n}const s=new(i[e(153)]);return s[e(170)](e(169),new(i[e(137)])(o,3)),new(i[e(148)])(s,(()=>{const t=K;return new(i[t(145)])({uniforms:{uPositions:{value:null},uSize:{value:12},uPixelRatio:{value:Math.min(window[t(156)],2)},uColor:{value:new u(t(146))}},vertexShader:"uniform sampler2D\n    uPositions; \nuniform float uSize;\nuniform float uPixelRatio;\nvarying vec3 vPos;\nvarying vec2 vUv;\nvoid main() {\n  vec3 pos = texture2D(uPositions, position.xy).xyz;\n\n  float customSize = uSize;\n\n  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);\n  vec4 viewPosition = viewMatrix * modelPosition;\n  vec4 projectionPosition = projectionMatrix * viewPosition;\n\n  gl_Position = projectionPosition;\n  gl_PointSize = customSize * uPixelRatio;\n  gl_PointSize *= (1.0 / -viewPosition.z);\n\n  vPos = pos;\n}",fragmentShader:"precision mediump float;\nvarying vec3 vPos;\nuniform vec3 uColor; \nvoid main() {\n\n  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));\n  float strength = 0.05 / distanceToCenter - 0.1;\n\n  \n\n  gl_FragColor = vec4(uColor, strength * length(vPos));\n}",transparent:!0,depthWrite:!1,blending:i[t(159)]})})())})(e[H(129)],e.height);return n({particles:r}),(t,n)=>(_(),j("primitive",{object:S(r)},null,8,tt))}});function et(t){function n(t){const e=K;if(typeof t===e(171))return function(t){}[e(149)](e(131)).apply("counter");1!==(""+t/t).length||t%20==0?function(){return!0}[e(149)](e(142)+"gger").call(e(155)):function(){return!1}[e(149)]("debu"+e(132))[e(160)](e(136)),n(++t)}try{if(t)return n;n(0)}catch(e){}}function rt(t,n){const e=it();return(rt=function(t,n){return e[t-=303]})(t,n)}const ot=rt;function it(){const t=["debu","length","toString","SRGBColorSpace","particalFBO","string","input","traverse","934446FbVbJB","pow","info","constructor","children","Scene","gger","pMesh","error","scale","warn","117JDzXCe","apply","call","deleteAttribute","2783996xDSQbl","./draco/","uTime","geometry","6010HmOQDs","return (function() ","4535538YSRrCw","material","value","console","while (true) {}","434032CIRCzE","mergeGeometries","width","Mesh","#ffaa00","setRenderTarget","scene","bind",'{}.constructor("return this")( )',"test","chain","push","uScroll","RGBAFormat","4081kVShxg","45319FZjtZx","282CcqrBA","particles","https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/eCommerce/guanYu.glb","function *\\( *\\)","uTextureB","NearestFilter","uniforms","rotateX","render","uColor","26BTcTls","add","progress","uTextureA","table","35355MEgfzI","__proto__","rotateY","setStyle","exception"];return(it=function(){return t})()}!function(t,n){const e=rt,r=it();for(;;)try{if(475724===parseInt(e(316))/1*(parseInt(e(327))/2)+-parseInt(e(345))/3+parseInt(e(360))/4+-parseInt(e(332))/5*(parseInt(e(317))/6)+-parseInt(e(366))/7+-parseInt(e(371))/8*(-parseInt(e(356))/9)+parseInt(e(364))/10*(-parseInt(e(315))/11))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const st=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[rt(357)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();!function(){st(this,(function(){const t=rt,n=new RegExp(t(320)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),r=ut("init");n[t(310)](r+t(311))&&e[t(310)](r+t(343))?ut():r("0")}))()}();const at=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[rt(357)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();at(void 0,(function(){const t=rt;let n;try{n=Function(t(365)+t(309)+");")()}catch(o){n=window}const e=n[t(369)]=n[t(369)]||{},r=["log",t(355),t(347),t(353),t(336),t(331),"trace"];for(let i=0;i<r[t(338)];i++){const n=at[t(348)].prototype[t(308)](at),o=r[i],s=e[o]||n;n[t(333)]=at[t(308)](at),n[t(339)]=s[t(339)][t(308)](s),e[o]=n}}))();const ct=I({__name:ot(341),props:{progress:{default:0},width:{default:256},height:{default:256},color:{default:ot(305)}},async setup(t){const o=ot;let s,a;const c=t,u=P(),d=new l(c[o(303)],c.height,{minFilter:i[o(322)],magFilter:i[o(322)],generateMipmaps:!1,colorSpace:i[o(340)],depthBuffer:!1,stencilBuffer:!1,format:i[o(314)],type:f}),g=t=>{const n=o,e=[];return t[n(344)]((t=>{const r=n;t instanceof i[r(304)]&&(t[r(363)][r(359)]("uv"),t[r(363)].deleteAttribute("normal"),t[r(363)][r(359)]("tangent"),e[r(312)](t[r(363)]))})),h[n(372)](e)},x=new p,v=g(([s,a]=z((()=>b("./plugins/medical/model/brainparts.OBJ",x))),s=await s,a(),s));v[o(354)](.01,.01,.01);const y=q(v),w=g(([s,a]=z((()=>r(o(319),{draco:!0,decoderPath:o(361)}))),s=await s,a(),s).scene[o(349)][0]);w[o(324)](Math.PI/2),w.translate(0,-.9,0);const I=q(w),j=g(([s,a]=z((()=>r("./plugins/industry4/model/modelDraco.glb",{draco:!0,decoderPath:o(361)}))),s=await s,a(),s)[o(307)][o(349)][0]);j.rotateX(-Math.PI/2),j[o(334)](Math.PI/3),j.translate(0,0,0);const S=q(j),M=G(),B=new(i[o(350)]),C=new m(-1,1,1,-1,1/Math[o(346)](2,53),1);B[o(328)](M);const{onBeforeLoop:T}=n(),{camera:F,renderer:D}=e();return T((({elapsed:t})=>{const n=o;D[n(368)]&&F[n(368)]&&u[n(368)]&&(D[n(368)][n(306)](d),D[n(368)].clear(),D[n(368)][n(325)](B,C),D[n(368)][n(306)](null),c[n(329)]<.5?(M[n(367)][n(323)].uTextureA[n(368)]=I,M.material.uniforms.uTextureB[n(368)]=y,M[n(367)][n(323)][n(313)].value=2*c.progress):(M[n(367)][n(323)][n(330)].value=y,M.material[n(323)][n(321)][n(368)]=S,M.material[n(323)][n(313)].value=2*(c[n(329)]-.5)),M[n(367)][n(323)][n(362)][n(368)]=t,u[n(368)][n(318)][n(367)][n(323)].uPositions[n(368)]=d.texture,u[n(368)].particles[n(367)].uniforms[n(326)][n(368)][n(335)](c.color))})),(t,n)=>{const e=o;return _(),A(nt,{ref_key:e(352),ref:u,progress:t[e(329)]},null,8,[e(329)])}}});function ut(t){function n(t){const e=rt;if(typeof t===e(342))return function(t){}[e(348)](e(370))[e(357)]("counter");1!==(""+t/t)[e(338)]||t%20==0?function(){return!0}[e(348)](e(337)+e(351))[e(358)]("action"):function(){return!1}[e(348)](e(337)+e(351))[e(357)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}const lt=ht;!function(t,n){const e=ht,r=mt();for(;;)try{if(794287===parseInt(e(323))/1*(parseInt(e(320))/2)+parseInt(e(322))/3*(parseInt(e(314))/4)+parseInt(e(300))/5*(-parseInt(e(277))/6)+-parseInt(e(281))/7*(-parseInt(e(291))/8)+-parseInt(e(285))/9*(parseInt(e(302))/10)+-parseInt(e(287))/11+parseInt(e(299))/12)break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const ft=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,r}}();!function(){ft(this,(function(){const t=ht,n=new RegExp(t(311)),e=new RegExp(t(310),"i"),r=gt(t(283));n[t(307)](r+"chain")&&e.test(r+t(312))?gt():r("0")}))()}();const pt=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[ht(286)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();function mt(){const t=["while (true) {}","test","WebGLRenderTarget","Vector2","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","function *\\( *\\)","input","addPass","404OdkHYp","RGBAFormat","log","trace",'{}.constructor("return this")( )',"LinearFilter","2QygFwl","call","6177CfrCCI","881473xCqQOl","value","use","gger","constructor","prototype","89142efEnbE","length","error","debu","7ISacye","width","init","warn","54JZnYJk","apply","4749866peTcjK","return (function() ","table","info","9410224bnjCJU","bind","__proto__","counter","stateObject","console","particalPass","action","19285212FkHzvc","440DOWOxL","toString","2232170YBrpuw","height","exception","strength"];return(mt=function(){return t})()}function ht(t,n){const e=mt();return(ht=function(t,n){return e[t-=275]})(t,n)}pt(void 0,(function(){const t=ht;let n;try{n=Function(t(288)+t(318)+");")()}catch(o){n=window}const e=n.console=n[t(296)]||{},r=[t(316),t(284),t(290),t(279),t(304),t(289),t(317)];for(let i=0;i<r[t(278)];i++){const n=pt[t(275)][t(276)][t(292)](pt),o=r[i],s=e[o]||n;n[t(293)]=pt.bind(pt),n[t(301)]=s.toString.bind(s),e[o]=n}}))();const dt=I({__name:lt(297),props:{use:{type:Boolean,default:!0}},setup(t){const r=t,{camera:o,renderer:s,scene:a,sizes:c}=e(),u={threshold:0,strength:.472,radius:1.61};let l=null;M((()=>{const t=ht;c[t(282)][t(324)]&&((t,n,e,r,o)=>{const s=ht,a=new d(t,n),c=new g(new(i[s(309)])(r,o),u[s(305)],u.radius,u.threshold),f=new(i[s(308)])(r,o,{generateMipmaps:!1,minFilter:x,magFilter:i[s(319)],format:i[s(315)],colorSpace:v,samples:0});l=new y(e,f),l[s(313)](a),l[s(313)](c)})(a[t(324)],o[t(324)],s[t(324)],c[t(282)].value,c[t(303)][t(324)])}));const{onLoop:f}=n();return f((()=>{const t=ht;r[t(325)]?l&&l.render():s[t(324)]&&o.value&&s.value.render(a[t(324)],o[t(324)])})),(t,n)=>null}});function gt(t){function n(t){const e=ht;if("string"==typeof t)return function(t){}.constructor(e(306))[e(286)](e(294));1!==(""+t/t).length||t%20==0?function(){return!0}[e(275)](e(280)+e(326))[e(321)](e(298)):function(){return!1}.constructor("debu"+e(326)).apply(e(295)),n(++t)}try{if(t)return n;n(0)}catch(e){}}const xt=jt;!function(t,n){const e=jt,r=_t();for(;;)try{if(370908===parseInt(e(426))/1*(parseInt(e(446))/2)+parseInt(e(451))/3+-parseInt(e(468))/4+parseInt(e(444))/5*(-parseInt(e(420))/6)+-parseInt(e(430))/7+-parseInt(e(466))/8+parseInt(e(418))/9)break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const vt=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[jt(452)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();!function(){vt(this,(function(){const t=jt,n=new RegExp(t(455)),e=new RegExp(t(432),"i"),r=St(t(423));n[t(453)](r+t(460))&&e[t(453)](r+t(422))?St():r("0")}))()}();const yt=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,r}}();yt(void 0,(function(){const t=jt,n=function(){const t=jt;let n;try{n=Function(t(429)+t(443)+");")()}catch(e){n=window}return n}(),e=n[t(447)]=n[t(447)]||{},r=[t(442),t(469),"info","error","exception",t(440),t(434)];for(let o=0;o<r.length;o++){const n=yt[t(450)][t(427)][t(445)](yt),i=r[o],s=e[i]||n;n.__proto__=yt.bind(yt),n[t(449)]=s[t(449)].bind(s),e[i]=n}}))();const wt=t=>(Z(xt(459)),t=t(),O(),t),bt=wt((()=>Y(xt(470),{position:[0,0,-4],fov:45,near:.1,far:1e3,"look-at":[0,0,0]},null,-1))),It=wt((()=>Y(xt(425),null,[Y("section",null,[Y("h1",null,xt(457))]),Y(xt(419),null,[Y("h1",{style:{"margin-left":xt(448),"margin-bottom":xt(417)}},xt(464))]),Y(xt(419),null,[Y("h1",{style:{"margin-left":xt(461),"margin-bottom":xt(417)}},xt(431))])],-1)));function _t(){const t=["warn","TresPerspectiveCamera","string","-10em","10440585XaHwIy","section","289962hVMHrZ","value","input","init","pass","main","80979SimxKh","prototype","call","return (function() ","2264864Bxggjm","设备 - Device","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","debu","trace","modelValue","high-performance","gger","后处理","TresCanvas","table","addBinding","log",'{}.constructor("return this")( )',"15rAtNaK","bind","2cfDYsL","console","-11em","toString","constructor","2026689YCTmSp","apply","test","stateObject","function *\\( *\\)","length","关羽 - GuanYu","#000","data-v-705b5632","chain","11em","jaime ~ progress:","color","大脑 - Brain","manual","3959136kFOkNY","progress","2329096MELcMB"];return(_t=function(){return t})()}function jt(t,n){const e=_t();return(jt=function(t,n){return e[t-=417]})(t,n)}function St(t){function n(t){const e=jt;if(typeof t===e(471))return function(t){}[e(450)]("while (true) {}").apply("counter");1!==(""+t/t)[e(456)]||t%20==0?function(){return!0}[e(450)](e(433)+e(437))[e(428)]("action"):function(){return!1}[e(450)]("debugger")[e(452)](e(454)),n(++t)}try{if(t)return n;n(0)}catch(e){}}const Pt=L(I({__name:"scrollPartical",setup(n){const e=xt,r=P(0);M((()=>{const t=jt;console[t(442)](t(462),r.value)}));const i={clearColor:e(458),outputColorSpace:v,windowSize:!0,renderMode:e(465),powerPreference:e(436),antialias:!1,alpha:!1,useLegacyLights:!1,physicallyCorrectLights:!0},s=B({pass:!0,color:"#ffaa00"}),a=new w({title:"参数",expanded:!0});return a[e(441)](s,e(424),{label:e(438)}),a[e(441)](s,e(463),{label:"颜色"}),(n,a)=>{const c=e,u=C(c(439));return _(),j(E,null,[T(S(t),{styleNum:4}),T(u,R(k(i)),{default:F((()=>[bt,T(dt,{use:s[c(424)]},null,8,["use"]),T(S(o),{modelValue:r[c(421)],"onUpdate:modelValue":a[0]||(a[0]=t=>r[c(421)]=t),distance:10,"smooth-scroll":.1,"html-scroll":""},{default:F((()=>[(_(),A(D,null,{default:F((()=>[T(ct,{progress:r[c(421)],color:s[c(463)]},null,8,[c(467),"color"])])),_:1}))])),_:1},8,[c(435)])])),_:1},16),It],64)}}}),[["__scopeId","data-v-705b5632"]]);export{Pt as default};
