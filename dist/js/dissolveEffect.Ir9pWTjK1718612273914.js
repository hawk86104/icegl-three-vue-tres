import{b as e,N as t,r as o,d as r}from"./@tresjs.W42D3qe_1718612273914.js";import{a as s,b as n}from"./index.gLXaRzp41718612273914.js";import{C as i,a3 as a,a5 as l}from"./three.HHcT7YAr1718612273914.js";import{b as u}from"./index.25tNzBRv1718612273914.js";import"./index.X0otXqNI1718612273914.js";import{_ as c}from"./lamboEffect.vue_vue_type_script_setup_true_lang.PNPTGkZW1718612273914.js";import{a3 as p,a2 as d,o as f,D as m,u as g,d as v,r as h,b as _,e as x,j,g as y,aj as C,ak as b,f as S,al as P,m as w,J as M,F as I}from"./@vue.CpOXM7bB1718612273914.js";import{P as T}from"./tweakpane.qqn77PB81718612273914.js";import{_ as k}from"./reflectorDUDV.vue_vue_type_script_setup_true_lang.osLMnVpS1718612273914.js";import"./@vueuse.YjRg4c7n1718612273914.js";import"./three-stdlib.eIANyClj1718612273914.js";import"./@pmndrs.GoGkK4yp1718612273914.js";import"./object-hash.NQGxxEoE1718612273914.js";import"./@amap.zA6BxCQR1718612273914.js";import"./jszip.ceBEBY8K1718612273914.js";import"./default.vue_vue_type_script_setup_true_lang.Uj8aYYMz1718612273914.js";import"./@fesjs.K6L2Ptsw1718612273914.js";import"./vue-router.8CWAXHk21718612273914.js";import"./lodash-es.nFpJXAf-1718612273914.js";import"./@qlin.yHhFDldE1718612273914.js";import"./pinia.Io9o2y5w1718612273914.js";import"./@floating-ui.BPbuo5Gx1718612273914.js";import"./@juggle.7yjBMqoW1718612273914.js";import"./reflectorDiffuse.vue_vue_type_script_setup_true_lang.OKqeqw2C1718612273914.js";import"./all.three.DFxzIr161718612273914.js";import"./oimophysics.x0jH7fze1718612273914.js";import"./reflectorShaderMesh.vue_vue_type_script_setup_true_lang.BLdTGb_61718612273914.js";import"./whiteFloorMesh.vue_vue_type_script_setup_true_lang.ucDlzuKW1718612273914.js";import"./gridPlusCom.vue_vue_type_script_setup_true_lang.Ooxd13TD1718612273914.js";import"./videoFloor.vue_vue_type_script_setup_true_lang.rQ2H2pJI1718612273914.js";const D=["object","rotation"],R={__name:"dissolveEffectModel",props:{edgeColor:{default:1118481},edgeWidth:{default:.03},dissolveSpeed:{default:.003},funRef:{appear:null,disappear:null}},async setup(r,{expose:s}){let n,l;const u=r,{scene:c,nodes:v,materials:h}=([n,l]=p((()=>e("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/lambo.glb",{draco:!0,decoderPath:"./draco/"}))),n=await n,l(),n);Object.values(v).forEach((e=>{e.isMesh&&(e.name.startsWith("glass")&&e.geometry.computeVertexNormals(),"silver_001_BreakDiscs_0"===e.name&&(e.material=h.BreakDiscs.clone(),e.material.color=new i("#ddd")))})),v.glass_003.scale.setScalar(2.7),h.FrameBlack.color=new i("black"),h.FrameBlack.roughness=0,h.FrameBlack.metalness=.75,h.Chrome.color=new i("#333"),h.Chrome.metalness=1,h.Chrome.roughness=0,h.BreakDiscs.color=new i("#555"),h.BreakDiscs.metalness=.2,h.BreakDiscs.roughness=.2,h.TiresGum.color=new i("#181818"),h.TiresGum.metalness=0,h.TiresGum.roughness=.4,h.GreyElements.color=new i("#292929"),h.GreyElements.metalness=0,v.yellow_WhiteCar_0.material=new a({roughness:.3,metalness:.05,color:"#111",envMapIntensity:.75,clearcoatRoughness:0,clearcoat:1});const _=([n,l]=p((()=>t(["./plugins/digitalCity/image/smokeparticle.png","./plugins/industry4/image/dissolve.jpg"]))),n=await n,l(),n);let x=[],j=!1,y={dissolveProgress:0,noiseTexture:_[0],edgeColorTexture:_[1]},C=u.dissolveSpeed;const b=()=>{if(!j){j=!0,C=u.dissolveSpeed;for(let e of x)e.uniforms.dissolveSpeed={value:C},e.uniforms.dissolveProgress={value:0}}},S=()=>{if(!j){j=!0,C=-u.dissolveSpeed;for(let e of x)e.uniforms.dissolveSpeed={value:C},e.uniforms.dissolveProgress={value:1}}};u.funRef.appear=b,u.funRef.disappear=S,s({appear:b,disappear:S}),Object.values(v).forEach((e=>{if(e.isMesh){e.frustumCulled=!1;const t=e.material;t.transparent=!0,t.onBeforeCompile=e=>{x.push(e),e.uniforms.edgeColor={value:new i(u.edgeColor)},e.uniforms.edgeWidth={value:u.edgeWidth},e.uniforms.dissolveSpeed={value:u.dissolveSpeed},e.uniforms.dissolveProgress={value:y.dissolveProgress},e.uniforms.noiseTexture={value:y.noiseTexture},e.uniforms.edgeColorTexture={value:y.edgeColorTexture},e.vertexShader=e.vertexShader.replace("#include <common>",["varying vec2 xUv;","#include <common>"].join("\n")),e.vertexShader=e.vertexShader.replace("#include <uv_vertex>",["xUv = uv;","#include <uv_vertex>"].join("\n")),e.fragmentShader=e.fragmentShader.replace("#include <common>","#include <common>\n             uniform float dissolveProgress;\n             uniform float edgeWidth;\n             uniform vec3 edgeColor;\n             uniform sampler2D noiseTexture;\n             uniform sampler2D edgeColorTexture;\n             varying vec2 xUv;\n            "),e.fragmentShader=e.fragmentShader.replace("#include <dithering_fragment>","#include <dithering_fragment>\n                float noiseValue = texture2D(noiseTexture, xUv).r;\n              \tvec4 finalColor = texture2D(edgeColorTexture, xUv);\n\n\t\t\t\t\t\t\t\tvec3 mixedColor = mix(finalColor.rgb, edgeColor, 0.5);\n\t\t\t\t\t\t\t\tfinalColor.rgb = mixedColor;\n\n                // vec4 finalColor = linearToOutputTexel( vec4(edgeColor, gl_FragColor.a) );\n\t\t\t\t\t\t\t\tfloat alpha = step(noiseValue - edgeWidth, dissolveProgress);\n                gl_FragColor.a = alpha;\n\t\t\t\t\t\t\t\tfloat useOrigin = step(noiseValue, dissolveProgress);\n\t\t\t\t\t\t\t\tgl_FragColor.rgb = mix(finalColor.rgb, gl_FragColor.rgb, useOrigin);")}}}));const{onLoop:P}=o();return P((({dt:e})=>{if(j)for(let t of x){let{dissolveProgress:e,dissolveSpeed:o}=t.uniforms;e.value+=o.value,e.value<0&&(j=!1),e.value>1&&(j=!1)}})),d((()=>{if(u.dissolveSpeed)for(let e of x)e.uniforms.dissolveSpeed.value=u.dissolveSpeed;if(u.edgeColor)for(let e of x)e.uniforms.edgeColor.value=new i(u.edgeColor);if(u.edgeWidth)for(let e of x)e.uniforms.edgeWidth.value=u.edgeWidth})),(e,t)=>(f(),m("primitive",{object:g(c),scale:.015,rotation:[0,Math.PI/1.5,0]},null,8,D))}},B=E;!function(e,t){const o=E,r=L();for(;;)try{if(252446===-parseInt(o(189))/1+-parseInt(o(213))/2+-parseInt(o(199))/3+parseInt(o(219))/4*(parseInt(o(187))/5)+-parseInt(o(196))/6+-parseInt(o(178))/7+parseInt(o(224))/8)break;r.push(r.shift())}catch(s){r.push(r.shift())}}();const W=function(){let e=!0;return function(t,o){const r=e?function(){if(o){const e=o[E(223)](t,arguments);return o=null,e}}:function(){};return e=!1,r}}();function E(e,t){const o=L();return(E=function(e,t){return o[e-=173]})(e,t)}!function(){W(this,(function(){const e=E,t=new RegExp("function *\\( *\\)"),o=new RegExp(e(205),"i"),r=$(e(182));t[e(221)](r+"chain")&&o[e(221)](r+e(177))?$():r("0")}))()}();const F=function(){let e=!0;return function(t,o){const r=e?function(){if(o){const e=o[E(223)](t,arguments);return o=null,e}}:function(){};return e=!1,r}}();F(void 0,(function(){const e=E;let t;try{t=Function(e(173)+e(197)+");")()}catch(s){t=window}const o=t.console=t[e(218)]||{},r=["log",e(180),e(225),e(191),e(229),"table",e(230)];for(let n=0;n<r.length;n++){const t=F[e(183)][e(203)][e(198)](F),s=r[n],i=o[s]||t;t.__proto__=F[e(198)](F),t[e(215)]=i.toString.bind(i),o[s]=t}}))();const G=M(B(202),{position:[0,10,15],fov:25,near:.1,far:1e4},null,-1),U=M("TresHemisphereLight",{intensity:.5},null,-1),V=[B(209)],O=M(B(228),{args:[.9,1,4,1]},null,-1),z=[B(211)],J=[B(209)],Z=M("TresRingGeometry",{args:[.9,1,3,1]},null,-1),H=["side"];function L(){const e=["addBinding","TresMesh","115vDQdJV","funRef","310786WwGJHp","counter","error","white","edgeColor","rotation-x","disappear","1700190hBJSer",'{}.constructor("return this")( )',"bind","1346679BWdrmU","TresCanvas","debu","TresPerspectiveCamera","prototype","gger","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","edgeWidth","click","TresMeshStandardMaterial","rotation","dissolveSpeed","side","ring","697800UWlMaN","red","toString","stateObject","value","console","75220ICVzSV","appear","test","call","apply","11336128EJZPSC","info","dissolveEffect","#15151a","TresRingGeometry","exception","trace","return (function() ","rotation-y","#111111","string","input","1435987baRZZd","DoubleSide","warn","action","init","constructor","addButton"];return(L=function(){return e})()}const N=v({__name:B(226),setup(e){const t=B,o=h({clearColor:t(227),antialias:!1,logarithmicDepthBuffer:!0,disableRender:!0}),i=h({autoRotate:!0}),a=new T({title:"溶解参数",expanded:!0}),p=h({edgeColor:t(175),edgeWidth:.03,dissolveSpeed:.003,funRef:{appear:null,disappear:null}});a[t(185)](p,t(193),{label:"颜色"}),a.addBinding(p,t(206),{label:"宽度",min:0,max:.13,step:.01}),a[t(185)](p,t(210),{label:"速度",min:.001,max:.01,step:.001});const d=a[t(184)]({title:"显示",label:"模型"}),v=_(null);d.on(t(207),(()=>{const e=t;v[e(217)][e(220)]?v.value[e(220)]():v[e(217)].funRef.appear()}));return a[t(184)]({title:"消失",label:"模型"}).on(t(207),(()=>{const e=t;v[e(217)][e(220)]?v[e(217)].disappear():v[e(217)][e(188)][e(195)]()})),(e,a)=>{const d=t,h=x(d(200));return f(),m(I,null,[j(g(u)),j(h,w(o,{"window-size":""}),{default:y((()=>[G,j(g(r),C(b(i)),null,16),U,(f(),S(P,null,{default:y((()=>[j(R,w(p,{ref_key:"dissolveEffectModelRef",ref:v}),null,16)])),_:1})),(f(),S(P,null,{default:y((()=>[j(g(k),{position:[0,-1.562,0],reflectivity:2.6,showGridHelper:!1,scale:1.5})])),_:1})),M(d(186),{scale:4,position:[3,-1.161,-1.5],rotation:[-Math.PI/2,0,Math.PI/2.5]},[O,M(d(208),{color:d(192),roughness:.75,side:l[d(179)]},null,8,z)],8,V),M(d(186),{scale:4,position:[-3,-1.161,-1],rotation:[-Math.PI/2,0,Math.PI/2.5]},[Z,M(d(208),{color:d(192),roughness:.75,side:l[d(179)]},null,8,H)],8,J),(f(),S(P,null,{default:y((()=>[j(g(s),{resolution:512},{default:y((()=>[j(g(n),{intensity:2,position:[0,1,3],scale:[10,1,1]}),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,-6],scale:[10,1,1]},null,8,["rotation-x"]),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,-3],scale:[10,1,1]},null,8,["rotation-x"]),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,0],scale:[10,1,1]},null,8,["rotation-x"]),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,3],scale:[10,1,1]},null,8,[d(194)]),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,6],scale:[10,1,1]},null,8,["rotation-x"]),j(g(n),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,9],scale:[10,1,1]},null,8,[d(194)]),j(g(n),{intensity:2,"rotation-y":Math.PI/2,position:[-50,2,0],scale:[100,2,1]},null,8,[d(174)]),j(g(n),{intensity:2,"rotation-y":-Math.PI/2,position:[50,2,0],scale:[100,2,1]},null,8,[d(174)]),j(g(n),{form:d(212),color:d(214),intensity:10,scale:2,position:[10,5,10]})])),_:1})])),_:1})),j(c)])),_:1},16)],64)}}});function $(e){function t(e){const o=E;if(typeof e===o(176))return function(e){}[o(183)]("while (true) {}")[o(223)](o(190));1!==(""+e/e).length||e%20==0?function(){return!0}[o(183)](o(201)+o(204))[o(222)](o(181)):function(){return!1}[o(183)]("debu"+o(204)).apply(o(216)),t(++e)}try{if(e)return t;t(0)}catch(o){}}export{N as default};
