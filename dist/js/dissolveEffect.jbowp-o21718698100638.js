import{b as e,N as t,r as o,d as r}from"./@tresjs.aawOCoPx1718698100638.js";import{a as s,b as n}from"./index.eYkSz4SJ1718698100638.js";import{C as i,a3 as a,a5 as l}from"./three.erXpfL-r1718698100638.js";import{b as u}from"./index.zufnDZCk1718698100638.js";import"./index.3kkg0GDh1718698100638.js";import{_ as c}from"./lamboEffect.vue_vue_type_script_setup_true_lang.XXLhCTpK1718698100638.js";import{a3 as p,a2 as d,o as f,D as m,u as g,d as v,r as h,b as _,e as x,j,g as y,aj as C,ak as b,f as S,al as I,m as P,J as w,F as M}from"./@vue.CpOXM7bB1718698100638.js";import{P as T}from"./tweakpane.qqn77PB81718698100638.js";import{_ as k}from"./reflectorDUDV.vue_vue_type_script_setup_true_lang.sS7BPjbz1718698100638.js";import"./@vueuse.TW6-TkVF1718698100638.js";import"./three-stdlib.Jy3o-bPq1718698100638.js";import"./@pmndrs.ZdH7ThqA1718698100638.js";import"./object-hash.SpRbwitp1718698100638.js";import"./@amap.TW6HTmRb1718698100638.js";import"./jszip.KspeudHJ1718698100638.js";import"./default.vue_vue_type_script_setup_true_lang.VZrRZxph1718698100638.js";import"./@fesjs.IcRnDBLi1718698100638.js";import"./vue-router.hw3iClIt1718698100638.js";import"./lodash-es.nFpJXAf-1718698100638.js";import"./@qlin.yHhFDldE1718698100638.js";import"./pinia.3_1_BhfV1718698100638.js";import"./@floating-ui.BPbuo5Gx1718698100638.js";import"./@juggle.7yjBMqoW1718698100638.js";import"./reflectorDiffuse.vue_vue_type_script_setup_true_lang.5Mxe9wyc1718698100638.js";import"./all.three.Qw9uPAR91718698100638.js";import"./oimophysics.x0jH7fze1718698100638.js";import"./reflectorShaderMesh.vue_vue_type_script_setup_true_lang.q9lKgk461718698100638.js";import"./whiteFloorMesh.vue_vue_type_script_setup_true_lang.Cm8BYm5T1718698100638.js";import"./gridPlusCom.vue_vue_type_script_setup_true_lang.qDBlx9GX1718698100638.js";import"./videoFloor.vue_vue_type_script_setup_true_lang.lgnn57Ui1718698100638.js";const R=["object","rotation"],D={__name:"dissolveEffectModel",props:{edgeColor:{default:1118481},edgeWidth:{default:.03},dissolveSpeed:{default:.003},funRef:{appear:null,disappear:null}},async setup(r,{expose:s}){let n,l;const u=r,{scene:c,nodes:v,materials:h}=([n,l]=p((()=>e("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/lambo.glb",{draco:!0,decoderPath:"./draco/"}))),n=await n,l(),n);Object.values(v).forEach((e=>{e.isMesh&&(e.name.startsWith("glass")&&e.geometry.computeVertexNormals(),"silver_001_BreakDiscs_0"===e.name&&(e.material=h.BreakDiscs.clone(),e.material.color=new i("#ddd")))})),v.glass_003.scale.setScalar(2.7),h.FrameBlack.color=new i("black"),h.FrameBlack.roughness=0,h.FrameBlack.metalness=.75,h.Chrome.color=new i("#333"),h.Chrome.metalness=1,h.Chrome.roughness=0,h.BreakDiscs.color=new i("#555"),h.BreakDiscs.metalness=.2,h.BreakDiscs.roughness=.2,h.TiresGum.color=new i("#181818"),h.TiresGum.metalness=0,h.TiresGum.roughness=.4,h.GreyElements.color=new i("#292929"),h.GreyElements.metalness=0,v.yellow_WhiteCar_0.material=new a({roughness:.3,metalness:.05,color:"#111",envMapIntensity:.75,clearcoatRoughness:0,clearcoat:1});const _=([n,l]=p((()=>t(["./plugins/digitalCity/image/smokeparticle.png","./plugins/industry4/image/dissolve.jpg"]))),n=await n,l(),n);let x=[],j=!1,y={dissolveProgress:0,noiseTexture:_[0],edgeColorTexture:_[1]},C=u.dissolveSpeed;const b=()=>{if(!j){j=!0,C=u.dissolveSpeed;for(let e of x)e.uniforms.dissolveSpeed={value:C},e.uniforms.dissolveProgress={value:0}}},S=()=>{if(!j){j=!0,C=-u.dissolveSpeed;for(let e of x)e.uniforms.dissolveSpeed={value:C},e.uniforms.dissolveProgress={value:1}}};u.funRef.appear=b,u.funRef.disappear=S,s({appear:b,disappear:S}),Object.values(v).forEach((e=>{if(e.isMesh){e.frustumCulled=!1;const t=e.material;t.transparent=!0,t.onBeforeCompile=e=>{x.push(e),e.uniforms.edgeColor={value:new i(u.edgeColor)},e.uniforms.edgeWidth={value:u.edgeWidth},e.uniforms.dissolveSpeed={value:u.dissolveSpeed},e.uniforms.dissolveProgress={value:y.dissolveProgress},e.uniforms.noiseTexture={value:y.noiseTexture},e.uniforms.edgeColorTexture={value:y.edgeColorTexture},e.vertexShader=e.vertexShader.replace("#include <common>",["varying vec2 xUv;","#include <common>"].join("\n")),e.vertexShader=e.vertexShader.replace("#include <uv_vertex>",["xUv = uv;","#include <uv_vertex>"].join("\n")),e.fragmentShader=e.fragmentShader.replace("#include <common>","#include <common>\n             uniform float dissolveProgress;\n             uniform float edgeWidth;\n             uniform vec3 edgeColor;\n             uniform sampler2D noiseTexture;\n             uniform sampler2D edgeColorTexture;\n             varying vec2 xUv;\n            "),e.fragmentShader=e.fragmentShader.replace("#include <dithering_fragment>","#include <dithering_fragment>\n                float noiseValue = texture2D(noiseTexture, xUv).r;\n              \tvec4 finalColor = texture2D(edgeColorTexture, xUv);\n\n\t\t\t\t\t\t\t\tvec3 mixedColor = mix(finalColor.rgb, edgeColor, 0.5);\n\t\t\t\t\t\t\t\tfinalColor.rgb = mixedColor;\n\n                // vec4 finalColor = linearToOutputTexel( vec4(edgeColor, gl_FragColor.a) );\n\t\t\t\t\t\t\t\tfloat alpha = step(noiseValue - edgeWidth, dissolveProgress);\n                gl_FragColor.a = alpha;\n\t\t\t\t\t\t\t\tfloat useOrigin = step(noiseValue, dissolveProgress);\n\t\t\t\t\t\t\t\tgl_FragColor.rgb = mix(finalColor.rgb, gl_FragColor.rgb, useOrigin);")}}}));const{onLoop:I}=o();return I((({dt:e})=>{if(j)for(let t of x){let{dissolveProgress:e,dissolveSpeed:o}=t.uniforms;e.value+=o.value,e.value<0&&(j=!1),e.value>1&&(j=!1)}})),d((()=>{if(u.dissolveSpeed)for(let e of x)e.uniforms.dissolveSpeed.value=u.dissolveSpeed;if(u.edgeColor)for(let e of x)e.uniforms.edgeColor.value=new i(u.edgeColor);if(u.edgeWidth)for(let e of x)e.uniforms.edgeWidth.value=u.edgeWidth})),(e,t)=>(f(),m("primitive",{object:g(c),scale:.015,rotation:[0,Math.PI/1.5,0]},null,8,R))}};function B(){const e=["toString","1269tfkxUq","rotation","rotation-x","stateObject","#111111","bind","2LcdxKT","click","red","side","call","apply","dissolveEffectModelRef","gger","string","return (function() ","test","1489077tGWRQB","addBinding","343086LtHmlu","prototype","TresPerspectiveCamera","trace","21LyXARS","TresHemisphereLight","edgeWidth","42372bQoqax","debu","TresMeshStandardMaterial","35100hHiVFN","constructor","disappear","error","console","white","value","init","8CjOkck","length","warn","TresCanvas","table","184818GhHJLg","#15151a","addButton","TresRingGeometry","DoubleSide","exception","565505NQYcuc","info","function *\\( *\\)","__proto__","TresMesh","4230616eXelbh","funRef","rotation-y","appear","1397dhexsL"];return(B=function(){return e})()}const F=E;!function(e,t){const o=E,r=B();for(;;)try{if(318418===parseInt(o(222))/1+-parseInt(o(186))/2*(parseInt(o(197))/3)+-parseInt(o(217))/4*(-parseInt(o(228))/5)+parseInt(o(199))/6*(-parseInt(o(203))/7)+parseInt(o(233))/8+-parseInt(o(180))/9*(-parseInt(o(209))/10)+-parseInt(o(178))/11*(parseInt(o(206))/12))break;r.push(r.shift())}catch(s){r.push(r.shift())}}();const W=function(){let e=!0;return function(t,o){const r=e?function(){if(o){const e=o[E(191)](t,arguments);return o=null,e}}:function(){};return e=!1,r}}();!function(){W(this,(function(){const e=E,t=new RegExp(e(230)),o=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),r=A(e(216));t[e(196)](r+"chain")&&o[e(196)](r+"input")?A():r("0")}))()}();const G=function(){let e=!0;return function(t,o){const r=e?function(){if(o){const e=o[E(191)](t,arguments);return o=null,e}}:function(){};return e=!1,r}}();function E(e,t){const o=B();return(E=function(e,t){return o[e-=176]})(e,t)}G(void 0,(function(){const e=E,t=function(){const e=E;let t;try{t=Function(e(195)+'{}.constructor("return this")( ));')()}catch(o){t=window}return t}(),o=t[e(213)]=t[e(213)]||{},r=["log",e(219),e(229),e(212),e(227),e(221),e(202)];for(let s=0;s<r[e(218)];s++){const t=G[e(210)][e(200)][e(185)](G),n=r[s],i=o[n]||t;t[e(231)]=G.bind(G),t[e(179)]=i[e(179)].bind(i),o[n]=t}}))();const L=w(F(201),{position:[0,10,15],fov:25,near:.1,far:1e4},null,-1),O=w(F(204),{intensity:.5},null,-1),U=[F(181)],V=w(F(225),{args:[.9,1,4,1]},null,-1),H=[F(189)],N=[F(181)],q=w("TresRingGeometry",{args:[.9,1,3,1]},null,-1),z=[F(189)],Q=v({__name:"dissolveEffect",setup(e){const t=F,o=h({clearColor:t(223),antialias:!1,logarithmicDepthBuffer:!0,disableRender:!0}),i=h({autoRotate:!0}),a=new T({title:"溶解参数",expanded:!0}),p=h({edgeColor:t(184),edgeWidth:.03,dissolveSpeed:.003,funRef:{appear:null,disappear:null}});a[t(198)](p,"edgeColor",{label:"颜色"}),a[t(198)](p,t(205),{label:"宽度",min:0,max:.13,step:.01}),a.addBinding(p,"dissolveSpeed",{label:"速度",min:.001,max:.01,step:.001});const d=a[t(224)]({title:"显示",label:"模型"}),v=_(null);d.on("click",(()=>{const e=t;v[e(215)][e(177)]?v[e(215)][e(177)]():v[e(215)][e(234)][e(177)]()}));return a[t(224)]({title:"消失",label:"模型"}).on(t(187),(()=>{const e=t;v[e(215)][e(177)]?v[e(215)][e(211)]():v[e(215)][e(234)][e(211)]()})),(e,a)=>{const d=t,h=x(d(220));return f(),m(M,null,[j(g(u)),j(h,P(o,{"window-size":""}),{default:y((()=>[L,j(g(r),C(b(i)),null,16),O,(f(),S(I,null,{default:y((()=>[j(D,P(p,{ref_key:d(192),ref:v}),null,16)])),_:1})),(f(),S(I,null,{default:y((()=>[j(g(k),{position:[0,-1.562,0],reflectivity:2.6,showGridHelper:!1,scale:1.5})])),_:1})),w(d(232),{scale:4,position:[3,-1.161,-1.5],rotation:[-Math.PI/2,0,Math.PI/2.5]},[V,w(d(208),{color:"white",roughness:.75,side:l[d(226)]},null,8,H)],8,U),w(d(232),{scale:4,position:[-3,-1.161,-1],rotation:[-Math.PI/2,0,Math.PI/2.5]},[q,w("TresMeshStandardMaterial",{color:d(214),roughness:.75,side:l[d(226)]},null,8,z)],8,N),(f(),S(I,null,{default:y((()=>[j(g(s),{resolution:512},{default:y((()=>[j(g(n),{intensity:2,position:[0,1,3],scale:[10,1,1]}),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,-6],scale:[10,1,1]},null,8,[d(182)]),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,-3],scale:[10,1,1]},null,8,[d(182)]),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,0],scale:[10,1,1]},null,8,["rotation-x"]),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,3],scale:[10,1,1]},null,8,[d(182)]),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,6],scale:[10,1,1]},null,8,[d(182)]),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,9],scale:[10,1,1]},null,8,[d(182)]),j(g(n),{intensity:2,"rotation-y":Math.PI/2,position:[-50,2,0],scale:[100,2,1]},null,8,[d(176)]),j(g(n),{intensity:2,"rotation-y":-Math.PI/2,position:[50,2,0],scale:[100,2,1]},null,8,[d(176)]),j(g(n),{form:"ring",color:d(188),intensity:10,scale:2,position:[10,5,10]})])),_:1})])),_:1})),j(c)])),_:1},16)],64)}}});function A(e){function t(e){const o=E;if(typeof e===o(194))return function(e){}[o(210)]("while (true) {}").apply("counter");1!==(""+e/e).length||e%20==0?function(){return!0}[o(210)](o(207)+o(193))[o(190)]("action"):function(){return!1}[o(210)](o(207)+o(193))[o(191)](o(183)),t(++e)}try{if(e)return t;t(0)}catch(o){}}export{Q as default};
