import{a1 as b,a2 as s,aq as y,aD as C,a3 as S,a4 as x,a5 as T,r as k,o as n,c as v,a as m,L as l,E as f,a8 as i,G as P,ac as R,aa as G,ab as M,Y as d,x as c,Z as _,ag as N}from"./vendor.KwxG0fE31716451028207.js";import{O,l as $}from"./util.BuHM_k0q1716451028207.js";/* empty css                                                                                 */import{_ as J}from"./randomLoading.vue_vue_type_script_setup_true_lang.tjgHplOO1716451028207.js";import{_ as L}from"./cloudPoints.vue_vue_type_script_setup_true_lang.f_o0Zp5J1716451028207.js";import{_ as V,a as z}from"./bubblesEffect.vue_vue_type_script_setup_true_lang.snbip8Dk1716451028207.js";import"./starLoading.LmiQqebo1716451028207.js";import"./cssLoaders.5YXvxKAr1716451028207.js";import"./bubbleLoading.XZVSVYV91716451028207.js";import"./BufferGeometryUtils.YkayGn8D1716451028207.js";const A=d("TresPerspectiveCamera",{position:[100,400,500],fov:45,near:.1,far:1e4,"look-at":[0,0,0]},null,-1),E=d("TresAmbientLight",{intensity:.5},null,-1),q={position:[0,120,0]},D=d("TresGridHelper",{args:[400,10]},null,-1),F="./plugins/medical/model/brainparts.OBJ",ta=b({__name:"digitalBrain",async setup(H){let r,u;const e=s({color:"#fff",show:!0,opacity:1}),a=new y({title:"参数"});a.addBinding(e,"show",{label:"点云显示"}),a.addBinding(e,"color",{label:"点云颜色"}),a.addBinding(e,"opacity",{label:"点云透明度",min:0,max:1,step:.1});const o=s({color:"#84ccff",show:!0,opacity:1});a.addBinding(o,"show",{label:"脑轮廓显示"}),a.addBinding(o,"color",{label:"脑轮廓颜色"}),a.addBinding(o,"opacity",{label:"脑轮廓透明度",min:0,max:1,step:.1});const t=s({color:"#9e00af",show:!0,opacity:1});a.addBinding(t,"show",{label:"脑组织显示"}),a.addBinding(t,"color",{label:"脑组织颜色"}),a.addBinding(t,"opacity",{label:"脑组织透明度",min:0,max:1,step:.1});const h=new O,p=([r,u]=C(()=>$(F,h)),r=await r,u(),r),g=s({clearColor:"#000",shadows:!0,alpha:!1,shadowMapType:S,outputColorSpace:x,toneMapping:T}),w=s({autoRotate:!0,autoRotateSpeed:2});return(Y,Z)=>{const B=k("TresCanvas");return n(),v(P,null,[m(l(J)),m(B,i(g,{"window-size":""}),{default:f(()=>[A,m(l(R),G(M(w)),null,16),E,d("TresGroup",q,[e.show?(n(),c(L,i({key:0,model:l(p)},e),null,16,["model"])):_("",!0),(n(),c(N,null,{default:f(()=>[o.show?(n(),c(V,i({key:0,model:l(p)},o),null,16,["model"])):_("",!0)]),_:1})),t.show?(n(),c(z,i({key:1,model:l(p)},t),null,16,["model"])):_("",!0)]),D]),_:1},16)],64)}}});export{ta as default};