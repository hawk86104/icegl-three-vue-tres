import{a6 as t}from"./three.QUrV0R7c1724070319978.js";import{p as n,$ as e,d as o,x as r}from"./@tresjs.2JnKj_Yj1724070319978.js";import"./index.rnb0_6Mo1724070319978.js";import{d as s,o as A,D as c,a4 as u,q as i,J as a,u as f,j as p,F as g,r as b,b as l,w as d,g as w,f as m,al as v,aj as B,ak as D}from"./@vue.Q1VpS3901724070319978.js";import{l as P,b as y}from"./utils.7VH-cG0Y1724070319978.js";import{a as h}from"./index.U1MpXvu-1724070319978.js";import"./tweakpane.yHWGBmom1724070319978.js";import"./@vueuse.2Yfo77CO1724070319978.js";import"./@fesjs.fxXnq-gV1724070319978.js";import"./vue-router.7GyIEHku1724070319978.js";import"./lodash-es.nFpJXAf-1724070319978.js";import"./@qlin.yHhFDldE1724070319978.js";import"./pinia.yc2Sjh9i1724070319978.js";import"./@floating-ui.BPbuo5Gx1724070319978.js";import"./@juggle.7yjBMqoW1724070319978.js";import"./jszip.ZVB-p0R-1724070319978.js";import"./@amap.PfcO2up21724070319978.js";import"./file-saver.WnxBqmrr1724070319978.js";import"./index.ZDhOvl2-1724070319978.js";import"./chalk.sAH7iSuz1724070319978.js";/* empty css                                 */import"./iconify-icon.l-H2-fnN1724070319978.js";import"./@iconify.9PoCakEb1724070319978.js";import"./utils.Jw7jttt31724070319978.js";import"./default.vue_vue_type_script_setup_true_lang.JWkBbQil1724070319978.js";import"./three-mesh-ui.module.3K99h9w01724070319978.js";const z=N;!function(t,n){const e=N,o=Q();for(;;)try{if(140632===parseInt(e(484))/1*(-parseInt(e(452))/2)+parseInt(e(442))/3*(parseInt(e(449))/4)+parseInt(e(462))/5*(-parseInt(e(457))/6)+-parseInt(e(474))/7+-parseInt(e(493))/8*(-parseInt(e(465))/9)+parseInt(e(489))/10+parseInt(e(468))/11*(parseInt(e(488))/12))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const j=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[N(447)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){j(this,(function(){const t=N,n=new RegExp("function *\\( *\\)"),e=new RegExp(t(453),"i"),o=E(t(491));n[t(496)](o+"chain")&&e[t(496)](o+"input")?E():o("0")}))()}();const Y=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[N(447)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function N(t,n){const e=Q();return(N=function(t,n){return e[t-=422]})(t,n)}Y(void 0,(function(){const t=N;let n;try{n=Function("return (function() "+t(475)+");")()}catch(r){n=window}const e=n[t(431)]=n[t(431)]||{},o=[t(470),t(471),t(443),t(476),"exception",t(469),t(433)];for(let s=0;s<o[t(425)];s++){const n=Y.constructor[t(458)][t(455)](Y),r=o[s],A=e[r]||n;n[t(490)]=Y[t(455)](Y),n[t(459)]=A[t(459)][t(455)](A),e[r]=n}}))(),window[z(460)]=t;const C={scene:null,renderer:null,camera:null,sizes:null},x={get renderer(){var t;const n=z;return null==(t=C.renderer)?void 0:t[n(437)]},loader:new(t[z(426)]),get scene(){var t;const n=z;return null==(t=C[n(422)])?void 0:t[n(437)]},get camera(){var t;const n=z;return null==(t=C[n(494)])?void 0:t[n(437)]},get width(){var t,n;const e=z;return null==(n=null==(t=C[e(427)])?void 0:t[e(480)])?void 0:n[e(437)]},get height(){var t,n;const e=z;return null==(n=null==(t=C.sizes)?void 0:t.height)?void 0:n[e(437)]},get dom(){var t;const n=z;return null==(t=C[n(436)])?void 0:t.value[n(440)][n(456)]},get canvas(){var t;const n=z;return null==(t=C[n(436)])?void 0:t[n(437)][n(440)]},events:{},init(t,n,e,o){const r=z;C[r(422)]=t,C[r(436)]=n,C[r(494)]=e,C[r(427)]=o},load(t){const n=z,e={"b76d97b2-0cef-486d-862b-f83c140c795b":[{name:"forShader",source:n(461)}]};this[n(448)]={init:[],start:[],stop:[],keydown:[],keyup:[],pointerdown:[],pointerup:[],pointermove:[],update:[]};let o="player,renderer,scene,camera";const r={};for(const A in this[n(448)])o+=","+A,r[A]=A;const s=JSON.stringify(r)[n(428)](/\"/g,"");for(const A in e){let r=A;A===t[n(424)]&&(r=this[n(422)][n(424)]);const c=this.scene.getObjectByProperty(n(424),r,!0);if(void 0===c){console[n(471)](n(485),r);continue}const u=e[A];for(let t=0;t<u[n(425)];t++){const e=u[t],r=new Function(o,e[n(463)]+n(450)+s+";").bind(c)(this,this[n(436)],this[n(422)],this[n(494)]);for(const t in r)void 0!==r[t]&&(void 0!==this[n(448)][t]?this.events[t][n(483)](r[t][n(455)](c)):console.warn("player: Event type not supported (",t,")"))}this[n(466)](this[n(448)][n(491)],arguments)}},dispatch(t,n){for(let e=0,o=t[z(425)];e<o;e++)t[e](n)},setCamera(t){const n=z;console.warn(n(441),t)},setScene(t){const n=z;console[n(471)](n(487),t)},setPixelRatio(t){const n=z;console[n(471)](n(486),t)},setSize(t){const n=z;console[n(471)](n(432),t)},dispose(){const t=z;console[t(471)](t(445))},onKeyDown(t){const n=z;x[n(466)](x.events[n(435)],t)},onKeyUp(t){const n=z;x[n(466)](x[n(448)][n(473)],t)},onPointerDown(t){const n=z;x[n(466)](x[n(448)][n(438)],t)},onPointerUp(t){const n=z;x[n(466)](x[n(448)][n(434)],t)},onPointerMove(t){const n=z;x[n(466)](x[n(448)][n(454)],t)},play(){const t=z;document[t(446)]("keydown",this[t(439)]),document.addEventListener(t(473),this.onKeyUp),document[t(446)](t(438),this[t(429)]),document.addEventListener("pointerup",this[t(482)]),document[t(446)]("pointermove",this[t(477)]),this[t(466)](this[t(448)][t(464)],null)},stop(){const t=z;document[t(481)](t(435),this[t(439)]),document[t(481)](t(473),this[t(478)]),document[t(481)](t(438),this.onPointerDown),document[t(481)]("pointerup",this[t(482)]),document.removeEventListener(t(454),this[t(477)]),this[t(466)](this.events[t(467)],arguments)},render(t,n){const e=z;this[e(466)](this[e(448)].update,{time:t,delta:n})}};function Q(){const t=["start","77985uNnzzY","dispatch","stop","107987FklFPG","table","log","warn","debu","keyup","788186ikSHJP",'{}.constructor("return this")( )',"error","onPointerMove","onKeyUp","while (true) {}","width","removeEventListener","onPointerUp","push","1wIKjjX","player: Script without object.","暂时不考虑像素比的设置函数","暂时不考虑场景的设置函数","204XwOhws","1621850ZVmAjs","__proto__","init","constructor","168ZAxJVa","camera","call","test","scene","gger","uuid","length","TextureLoader","sizes","replace","onPointerDown","counter","console","暂时不考虑尺寸的设置函数","trace","pointerup","keydown","renderer","value","pointerdown","onKeyDown","domElement","暂时不考虑摄像机的设置函数","62265sLDoUR","info","action","暂时不考虑释放资源的函数","addEventListener","apply","events","28cKYyEI","\nreturn ","string","335192eKTOzL","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","pointermove","bind","parentElement","19356MiNggq","prototype","toString","THREE","const img = 'data:image/png;base64,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'\nconst textureLoader = new THREE.TextureLoader()\nconst map = textureLoader.load(img)\nmap.wrapS = THREE.RepeatWrapping\nmap.wrapT = THREE.RepeatWrapping\nthis.material.uniforms.uPerlin.value = map\n\nthis.geometry.translate(0, 0.5, 0)\nthis.geometry.scale(1.5, 6, 1.5)\n\nfunction update( event ) {\n\tconst timev = event.time / 500.0\n\tthis.material.uniforms.uTime.value = timev\n}","365hnBJER","source"];return(Q=function(){return t})()}const X=x;function E(t){function n(t){const e=N;if(typeof t===e(451))return function(t){}[e(492)](e(479)).apply(e(430));1!==(""+t/t)[e(425)]||t%20==0?function(){return!0}[e(492)](e(472)+e(423))[e(495)](e(444)):function(){return!1}.constructor("debu"+e(423))[e(447)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}const I=T;!function(t,n){const e=T,o=L();for(;;)try{if(443604===-parseInt(e(509))/1*(parseInt(e(484))/2)+parseInt(e(510))/3+parseInt(e(488))/4+-parseInt(e(513))/5*(parseInt(e(482))/6)+-parseInt(e(494))/7*(parseInt(e(500))/8)+parseInt(e(516))/9*(parseInt(e(502))/10)+parseInt(e(483))/11)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const Z=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function L(){const t=["bind","toString","chain","3236352GoJvyf","while (true) {}","input",'{}.constructor("return this")( )',"firstLevel-42dee480409b","action","25319nqlUjy","return (function() ","gger","apply","debu","object","1312xmkBqq","constructor","3231010HIXzAF","primitive","error","info","prototype","stateObject","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","30025CbsUIU","1476648pMZjYu","init","function *\\( *\\)","200RRwYXu","console","log","18SnxHTN","string","call","length","exception","warn","79374PekLVo","96481jwPfLB","26MmrddP"];return(L=function(){return t})()}!function(){Z(this,(function(){const t=T,n=new RegExp(t(512)),e=new RegExp(t(508),"i"),o=G(t(511));n.test(o+t(487))&&e.test(o+t(490))?G():o("0")}))()}();const H=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[T(497)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();H(void 0,(function(){const t=T,n=function(){const t=T;let n;try{n=Function(t(495)+t(491)+");")()}catch(e){n=window}return n}(),e=n[t(514)]=n[t(514)]||{},o=[t(515),t(481),t(505),t(504),t(480),"table","trace"];for(let r=0;r<o[t(479)];r++){const n=H[t(501)][t(506)].bind(H),s=o[r],A=e[s]||n;n.__proto__=H.bind(H),n[t(486)]=A[t(486)][t(485)](A),e[s]=n}}))();const M=["object"],O=s({__name:I(492),props:{object:{}},setup:t=>(t,n)=>{const e=T;return A(),c(e(503),{object:t[e(499)][0]},null,8,M)}});function T(t,n){const e=L();return(T=function(t,n){return e[t-=477]})(t,n)}function G(t){function n(t){const e=T;if(typeof t===e(477))return function(t){}.constructor(e(489))[e(497)]("counter");1!==(""+t/t)[e(479)]||t%20==0?function(){return!0}[e(501)](e(498)+e(496))[e(478)](e(493)):function(){return!1}[e(501)]("debu"+e(496))[e(497)](e(507)),n(++t)}try{if(t)return n;n(0)}catch(e){}}const W=q;function q(t,n){const e=V();return(q=function(t,n){return e[t-=175]})(t,n)}!function(t,n){const e=q,o=V();for(;;)try{if(359459===-parseInt(e(186))/1+parseInt(e(217))/2*(-parseInt(e(191))/3)+parseInt(e(218))/4*(-parseInt(e(177))/5)+-parseInt(e(193))/6*(parseInt(e(175))/7)+-parseInt(e(179))/8+-parseInt(e(202))/9+parseInt(e(220))/10)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const R=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[q(207)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){R(this,(function(){const t=q,n=new RegExp(t(216)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=_(t(200));n.test(o+t(189))&&e.test(o+"input")?_():o("0")}))()}();const F=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[q(207)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();F(void 0,(function(){const t=q;let n;try{n=Function(t(231)+t(190)+");")()}catch(r){n=window}const e=n[t(182)]=n[t(182)]||{},o=["log",t(223),t(212),t(199),t(227),"table",t(194)];for(let s=0;s<o[t(221)];s++){const n=F[t(208)].prototype.bind(F),r=o[s],A=e[r]||n;n[t(203)]=F.bind(F),n[t(219)]=A[t(219)][t(211)](A),e[r]=n}}))();const U=[W(230)],k=[W(230)],J=[W(230)],S=[W(230)];function V(){const t=["fog","exception","slice","play","object","return (function() ","7zNLWoV","value","14860DJLnuu","string","3235208vYXHZh","children","primitive","console","geometries/","ObjectLoader","scene","124196AqlhZn","debu","data","chain",'{}.constructor("return this")( )',"1086XPoLyq","background","2944212fLJgHQ","trace","startsWith","url:","action","environment","error","init","counter","6310026lnwKgf","__proto__","images/","gger","parse","apply","constructor","geometries","stateObject","bind","info","url","renderer","while (true) {}","function *\\( *\\)","598ntJkWI","128HjKhgs","toString","22832140DTQmRR","length","./plugins/tresEditor/","warn","images","call"];return(V=function(){return t})()}const K=s({__name:W(185),async setup(o){const r=W;let s,b;const{scene:l,renderer:d,camera:w,sizes:m}=n();X[r(200)](l,d,w,m);const v=new(t[r(184)]),B=([s,b]=u((()=>P("./plugins/tresEditor/json/scene.json"))),s=await s,b(),s);if(B[r(209)])for(const t of B[r(209)])if(t.data&&t[r(188)][r(195)](r(196))){let n=t[r(188)][r(228)](4);n[r(195)](r(183))&&(n=r(222)+n),t[r(188)]=([s,b]=u((()=>P(n))),s=await s,b(),s)}if(B.images)for(const t of B[r(224)])if(t[r(213)]&&t.url.startsWith(r(196))){let n=t[r(213)][r(228)](4);n.startsWith(r(204))&&(n=r(222)+n),t[r(213)]=([s,b]=u((()=>y(n))),s=await s,b(),s)}const D=v[r(206)](B);i((()=>{const t=r;l[t(176)][t(192)]=D[t(192)],l[t(176)].environment=D[t(198)],l[t(176)][t(226)]=D[t(226)],X.load(D),X[t(229)]()}));const{onLoop:h}=e();return h((({delta:t,elapsed:n})=>{X[r(214)]&&X.render(1e3*n,1e3*t)})),(t,n)=>{const e=r;return A(),c(g,null,[a(e(181),{object:f(D)[e(180)][0]},null,8,U),a(e(181),{object:f(D)[e(180)][1]},[p(O,{object:f(D)[e(180)][1][e(180)]},null,8,["object"])],8,k),a(e(181),{object:f(D)[e(180)][2]},null,8,J),a(e(181),{object:f(D)[e(180)][3]},null,8,S)],64)}}});function _(t){function n(t){const e=q;if(typeof t===e(178))return function(t){}[e(208)](e(215)).apply(e(201));1!==(""+t/t)[e(221)]||t%20==0?function(){return!0}[e(208)](e(187)+e(205))[e(225)](e(197)):function(){return!1}[e(208)](e(187)+e(205)).apply(e(210)),n(++t)}try{if(t)return n;n(0)}catch(e){}}!function(t,n){const e=et,o=tt();for(;;)try{if(957222===-parseInt(e(121))/1+parseInt(e(136))/2*(-parseInt(e(123))/3)+parseInt(e(144))/4*(-parseInt(e(127))/5)+-parseInt(e(115))/6*(parseInt(e(140))/7)+-parseInt(e(138))/8+parseInt(e(145))/9*(-parseInt(e(137))/10)+parseInt(e(119))/11)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const $=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[et(116)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function tt(){const t=["762950YbMetp","2515192flddUQ","trace","357217VsOBjm","length","ObjectLoader","warn","60sWhwNt","9menqpd","return (function() ","action","while (true) {}","3c19836b-b3b4-4d47-9a85-07c1c09e93e6","Object","Camera","string","init","gger","call","chain","console","test","NoToneMapping",'{}.constructor("return this")( )',"18BqCLgh","apply","debu","exception","30115503UEuuki","value","70617KamLNl","copy","152286thVWjY","bind","function *\\( *\\)","#201919","371795jYtMYd","TresPerspectiveCamera","cameraRef","Object3D.toJSON","__proto__","stateObject","table","constructor","input","2tKWfuE"];return(tt=function(){return t})()}!function(){$(this,(function(){const t=et,n=new RegExp(t(125)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=rt(t(107));n[t(112)](o+t(110))&&e[t(112)](o+t(135))?rt():o("0")}))()}();const nt=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[et(116)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function et(t,n){const e=tt();return(et=function(t,n){return e[t-=100]})(t,n)}nt(void 0,(function(){const t=et,n=function(){const t=et;let n;try{n=Function(t(100)+t(114)+");")()}catch(e){n=window}return n}(),e=n[t(111)]=n.console||{},o=["log",t(143),"info","error",t(118),t(133),t(139)];for(let r=0;r<o[t(141)];r++){const n=nt[t(134)].prototype.bind(nt),s=o[r],A=e[s]||n;n[t(131)]=nt[t(124)](nt),n.toString=A.toString[t(124)](A),e[s]=n}}))();const ot=s({__name:"coffeeDemo",setup(n){const e=et,s=b({clearColor:e(126),windowSize:!0,antialias:!0,shadows:!0,shadowMapType:1,toneMapping:t[e(113)],toneMappingExposure:1}),u={metadata:{version:4.6,type:e(104),generator:e(130)},object:{type:"PerspectiveCamera",name:e(105),layers:1,matrix:[.9952879877508126,-3469446951953614e-33,-.09696299004743172,0,-.04978834565762423,.8581028602432903,-.5110583155364574,0,.08320421909744286,.5134778293580788,.8540594690547612,0,1.885820123940119,8.724172264317321,13.830394181920472,1],up:[0,1,0],fov:45,zoom:1,near:.1,far:1e3,focus:10,aspect:1.24,filmGauge:35,filmOffset:0}},i=(new(t[e(142)])).parse(u),P=l(null);return d((()=>P[e(120)]),(t=>{t[e(122)](i)})),(t,n)=>{const u=e;return A(),c(g,null,[p(f(h)),p(f(r),B(D(s)),{default:w((()=>[p(f(o)),a(u(128),{ref_key:u(129),ref:P,uuid:u(103),name:"Camera"},null,512),(A(),m(v,null,{default:w((()=>[p(K)])),_:1}))])),_:1},16)],64)}}});function rt(t){function n(t){const e=et;if(typeof t===e(106))return function(t){}[e(134)](e(102))[e(116)]("counter");1!==(""+t/t)[e(141)]||t%20==0?function(){return!0}[e(134)](e(117)+e(108))[e(109)](e(101)):function(){return!1}[e(134)](e(117)+e(108)).apply(e(132)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{ot as default};
