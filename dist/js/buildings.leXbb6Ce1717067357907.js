import{a1 as _,l as p,aD as f,a7 as w,aq as y,a2 as u,o as d,x as s,E as h,L as m,Z as g}from"./vendor.Bhln4awG1717067357907.js";import{_ as C,l as B,a as x,b as k}from"./pagesShow.vue_vue_type_script_setup_true_lang.ovkzG9ti1717067357907.js";import"./vanilla.YA2K2vt81717067357907.js";import"./object_hash.MnKN4xNn1717067357907.js";import"./_commonjsHelpers.5-cIlDoe1717067357907.js";import"./_commonjs-dynamic-modules.h-SxKiO41717067357907.js";import"./builtins-300es.Tm_BdSQ71717067357907.js";import"./LineSegments2.5efbUp_i1717067357907.js";const D=_({__name:"buildings",async setup(v){let e,r;const b=p(),n=p(!1),c=([e,r]=f(()=>B()),e=await e,r(),e);n.value=!0,w(()=>{const l=new y({title:"建筑效果",expanded:!0}),o=l.addFolder({title:"线条"});o.addBinding(i,"show",{label:"显示"}),o.addBinding(i,"color",{label:"颜色"}),o.addBinding(i,"width",{label:"宽度",min:0,max:10,step:1}),o.addBinding(i,"opacity",{label:"透明度",min:0,max:1,step:.1});const t=l.addFolder({title:"建筑物"});t.addBinding(a,"show",{label:"显示"}),t.addBinding(a,"bulidingsColor",{label:"楼宇颜色"}),t.addBinding(a,"gradient",{label:"渐变"}),t.addBinding(a,"opacity",{label:"透明度",min:0,max:1,step:.1}),t.addBinding(a,"landColor",{label:"地面颜色"})});const i=u({width:1,color:"#000",opacity:1,show:!0}),a=u({bulidingsColor:"#e523ff",landColor:"#112233",opacity:.9,show:!0,gradient:!0});return(l,o)=>(d(),s(C,{ref_key:"pagesShowRef",ref:b,showBuildings:!1},{ability:h(()=>[a.show&&n.value?(d(),s(x,{key:0,model:m(c),bulidingsColor:a.bulidingsColor,landColor:a.landColor,gradient:a.gradient,opacity:a.opacity},null,8,["model","bulidingsColor","landColor","gradient","opacity"])):g("",!0),i.show&&n.value?(d(),s(k,{key:1,builds:m(c).city,width:i.width,color:i.color,opacity:i.opacity},null,8,["builds","width","color","opacity"])):g("",!0)]),_:1},512))}});export{D as default};
