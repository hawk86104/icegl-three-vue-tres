import{Z as m,$ as s,a0 as _,a1 as f,a2 as h,af as g,o,v as n,C as i,a6 as B,J as r,a7 as C,a as l,a8 as p,a9 as d,aa as v,aA as w,V as a}from"./vendor.56c367c31704931946430.js";import{_ as S}from"./device.vue_vue_type_script_setup_true_lang.8866e3871704931946430.js";import"./device.84f716a51704931946430.js";import"./BufferGeometryUtils.dd26a7441704931946430.js";import"./EffectComposer.180bdb2c1704931946430.js";import"./UnrealBloomPass.deb9089a1704931946430.js";const x=a("TresPerspectiveCamera",{position:[5,5,5],fov:45,near:1,far:1e3},null,-1),T=a("TresAmbientLight",{color:"#ffffff",intensity:"40"},null,-1),b=a("TresDirectionalLight",{position:[0,2,-4],intensity:1},null,-1),P=a("TresGridHelper",{position:[0,-1,0]},null,-1),G=m({__name:"deviceLight",setup(y){const c=s({clearColor:"#000",shadows:!0,alpha:!1,shadowMapType:_,outputColorSpace:f,toneMapping:h,disableRender:!0}),u=s({autoRotate:!0}),e=s({threshold:0,strength:.6,radius:.21}),t=new g({title:"参数"});return t.addBinding(e,"threshold",{label:"阈值",min:0,max:1,step:.1}),t.addBinding(e,"strength",{label:"强度",min:0,max:3,step:.2}),t.addBinding(e,"radius",{label:"半径",min:0,max:1,step:.1}),(M,R)=>(o(),n(r(C),B(c,{"window-size":""}),{default:i(()=>[x,l(r(v),p(d(u)),null,16),T,b,(o(),n(w,null,{default:i(()=>[l(S,p(d(e)),null,16)]),_:1})),P]),_:1},16))}});export{G as default};
