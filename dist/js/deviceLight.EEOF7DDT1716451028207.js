import{a1 as _,a2 as s,a3 as u,a4 as f,a5 as h,aq as g,r as C,o as n,c as v,a,L as r,E as i,a8 as B,G as T,ac as w,aa as l,ab as p,x,ag as S,Y as t}from"./vendor.KwxG0fE31716451028207.js";/* empty css                                                                                 */import{_ as b}from"./randomLoading.vue_vue_type_script_setup_true_lang.tjgHplOO1716451028207.js";import{_ as P}from"./device.vue_vue_type_script_setup_true_lang.Qf-7dXND1716451028207.js";import"./starLoading.LmiQqebo1716451028207.js";import"./cssLoaders.5YXvxKAr1716451028207.js";import"./bubbleLoading.XZVSVYV91716451028207.js";import"./device.yjO5gXlW1716451028207.js";import"./BufferGeometryUtils.YkayGn8D1716451028207.js";import"./EffectComposer.5-JSrvqn1716451028207.js";import"./Pass.IF3sfO8d1716451028207.js";import"./UnrealBloomPass.QVFMJGPd1716451028207.js";import"./OutputPass.uFsln5YU1716451028207.js";const L=t("TresPerspectiveCamera",{position:[5,5,5],fov:45,near:1,far:1e3},null,-1),M=t("TresAmbientLight",{color:"#ffffff",intensity:"40"},null,-1),R=t("TresDirectionalLight",{position:[0,2,-4],intensity:1},null,-1),k=t("TresGridHelper",{position:[0,-1,0]},null,-1),K=_({__name:"deviceLight",setup(y){const c=s({clearColor:"#000",shadows:!0,alpha:!1,shadowMapType:u,outputColorSpace:f,toneMapping:h,disableRender:!0}),m=s({autoRotate:!0}),e=s({threshold:0,strength:.6,radius:.21}),o=new g({title:"参数"});return o.addBinding(e,"threshold",{label:"阈值",min:0,max:1,step:.1}),o.addBinding(e,"strength",{label:"强度",min:0,max:3,step:.2}),o.addBinding(e,"radius",{label:"半径",min:0,max:1,step:.1}),(G,N)=>{const d=C("TresCanvas");return n(),v(T,null,[a(r(b)),a(d,B(c,{"window-size":""}),{default:i(()=>[L,a(r(w),l(p(m)),null,16),M,R,(n(),x(S,null,{default:i(()=>[a(P,l(p(e)),null,16)]),_:1})),k]),_:1},16)],64)}}});export{K as default};