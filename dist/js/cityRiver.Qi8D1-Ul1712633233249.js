import{_ as u}from"./pagesShow.vue_vue_type_script_setup_true_lang.xdbsUyWN1712633233249.js";import{_ as h}from"./threeWater2.vue_vue_type_script_setup_true_lang.LESHqW0R1712633233249.js";import{a0 as m,aC as w,aD as g,a1 as v,ap as y,o,c as b,X as x,K as p,v as n,D as l,a as _,a7 as B,af as f,ac as C,a5 as R,a8 as $}from"./vendor.aZqsjRbH1712633233249.js";import"./vanilla.Kwpd81ex1712633233249.js";import"./_commonjsHelpers.5-cIlDoe1712633233249.js";import"./LineSegments2.0fh8hmNk1712633233249.js";import"./Water2.LXOlbmSW1712633233249.js";import"./Reflector.LbapvwpK1712633233249.js";const k={position:[0,0,-2]},G=["object"],S=m({__name:"index",async setup(d){let e,t;const{scene:r,nodes:a}=([e,t]=w(()=>g("https://a.amap.com/jsapi_demos/static/gltf-online/shanghai/scene.gltf")),e=await e,t(),e);r.renderOrder=9999,a.mesh_0.material.transparent=!0,a.mesh_0.material.depthWrite=!0,a.mesh_0.material.depthTest=!0,a.mesh_0.material.opacity=.7;const s=v({color:"#f857cc",scale:3.1,modelVisible:!0}),i=new y({title:"河流参数",expanded:!0});return i.addBinding(s,"modelVisible",{label:"模型显示"}).on("change",c=>{a.mesh_0.visible=c.value}),i.addBinding(s,"scale",{label:"分辨率",min:.1,max:10,step:.1}),i.addBinding(s,"color",{label:"河水颜色"}),(c,V)=>(o(),b("TresGroup",k,[x("primitive",{object:p(r)},null,8,G),(o(),n(f,null,{default:l(()=>[_(h,B({"position-y":1e-4,waterGeometry:p(a).mesh_0.geometry},s),null,16,["waterGeometry"])]),_:1}))]))}}),K=m({__name:"cityRiver",setup(d){const e=C(null);R(()=>{e.value&&e.value.$refs.perspectiveCameraRef.position.set(4,2.15,3.6)});const{onLoop:t}=$();return t(()=>{e.value&&console.log(e.value.$refs.perspectiveCameraRef)}),(r,a)=>(o(),n(u,{showAxesHelper:!1,showGridHelper:!1,showBuildings:!1,ref_key:"pagesShowRef",ref:e,autoRotate:!1},{ability:l(()=>[(o(),n(f,null,{default:l(()=>[_(S)]),_:1}))]),_:1},512))}});export{K as default};