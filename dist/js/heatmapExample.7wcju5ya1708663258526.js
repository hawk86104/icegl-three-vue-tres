import{$ as c,k as f,a4 as u,a0 as d,aw as h,o as _,v as m,D as g,a7 as n,K as i,a8 as w,a2 as C,c9 as S,a as l,ab as v,W as a}from"./vendor.mx_kdcfJ1708663258526.js";import{_ as y}from"./heatmapJS.vue_vue_type_script_setup_true_lang.pxtKHnZZ1708663258526.js";import"./heatmap.cBQvon4e1708663258526.js";import"./_commonjsHelpers.5-cIlDoe1708663258526.js";const R=a("TresPerspectiveCamera",{position:[21,34,55],fov:60,near:1,far:1e3},null,-1),x=a("TresAmbientLight",{color:"#cccccc",intensity:.4},null,-1),B=a("TresPointLight",{color:"#ffffff",intensity:.8},null,-1),L=a("TresGridHelper",{args:[50,25],position:[0,0,0]},null,-1),G=c({__name:"heatmapExample",setup(P){const p={clearColor:"#030311",shadows:!0,alpha:!1,outputColorSpace:C,shadowMapType:S,useLegacyLights:!0,antialias:!0},t=f();let e=!0;u().onLoop(({elapsed:s})=>{!e&&parseInt(s)%2==1&&(e=!0,t.value&&t.value.setData()),e&&parseInt(s)%2==0&&(e=!1)});const o=d({show2dCanvas:!0,heightRatio:6}),r=new h({title:"参数",expanded:!0});return r.addBinding(o,"show2dCanvas",{label:"显示二维图"}),r.addBinding(o,"heightRatio",{label:"高度",min:1,max:10,step:1}),(s,T)=>(_(),m(i(w),n(p,{"window-size":""}),{default:g(()=>[R,l(i(v),{autoRotate:!0,autoRotateSpeed:2}),x,B,L,l(y,n({ref_key:"heatmapJSRef",ref:t},o),null,16)]),_:1},16))}});export{G as default};
