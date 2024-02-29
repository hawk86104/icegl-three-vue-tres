var C=Object.defineProperty;var m=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var _=(s,a,e)=>a in s?C(s,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[a]=e,c=(s,a)=>{for(var e in a||(a={}))R.call(a,e)&&_(s,e,a[e]);if(m)for(var e of m(a))B.call(a,e)&&_(s,e,a[e]);return s};import{$ as v,a0 as p,an as z,ba as g,k as h,a5 as x,w as k,o as u,v as b,K as Y,bY as S,bZ as w,aw as Z,c as $,a as d,D as y,E as X,a9 as E,aa as F,ag as P}from"./vendor.95vlMDac1709203884683.js";import{_ as M}from"./pagesShow.vue_vue_type_script_setup_true_lang.t72Vzxzy1709203884683.js";import{_ as A}from"./loading.vue_vue_type_script_setup_true_lang.OVEWS_nb1709203884683.js";import"./vanilla-307d3a93.esm.XN_GIGd91709203884683.js";import"./_commonjsHelpers.5-cIlDoe1709203884683.js";import"./buildingsCustomShaderMaterial.zR756inN1709203884683.js";import"./LineSegments2.gj77ZEZs1709203884683.js";const D=v({__name:"precipitation",props:{speed:{default:12},randomness:{default:0},count:{default:6e3},size:{default:7},areaX:{default:1500},areaY:{default:1e3},areaZ:{default:1500},type:{default:"snow"},color:{default:"#fff"}},async setup(s){let a,e;const t=s,n={snow:"./plugins/digitalCity/image/snow.png",rain:"./plugins/digitalCity/image/rain.png",cilcle:"./plugins/digitalCity/image/cilcle.png"},i=p({});n[t.type]&&(i.value=([a,e]=z(()=>g({map:n[t.type]})),a=await a,e(),a));const o=h();return x(async()=>{}),k(()=>t.type,async(r,l)=>{var f;r!=l&&((f=i.value)!=null&&f.map&&i.value.map.dispose(),i.value=await g({map:n[r]?n[r]:n.cilcle}))}),(r,l)=>(u(),b(Y(S),{ref_key:"precipitationRef",ref:o,position:[0,t.areaY/2,0],speed:t.speed,color:t.color,alphaTest:.5,area:[t.areaX,t.areaY,t.areaZ],count:t.count,depthWrite:!0,randomness:t.randomness,size:t.size,opacity:1,map:i.value.map,alphaMap:i.value.map},null,8,["position","speed","color","area","count","randomness","size","map","alphaMap"]))}}),G=v({__name:"weather",setup(s){const a=h();x(()=>{a.value&&a.value.$refs.perspectiveCameraRef.position.set(750,500,800)});const e=p({speed:12,size:10,count:6e3,color:"#fff",type:"snow"}),t=p({areaX:1500,areaY:1e3,areaZ:1500}),n=p(c(c({},w(e)),w(t))),o=new Z({title:"天气",expanded:!0}).addFolder({title:"下落物"});return o.addBinding(e,"speed",{label:"速度",min:0,max:30,step:1}),o.addBinding(e,"color",{label:"颜色"}),o.addBinding(e,"size",{label:"大小",min:0,max:26,step:1}),o.addBinding(e,"count",{label:"数量",min:1e3,max:1e4,step:100}),o.addBinding(e,"type",{view:"list",label:"类型",options:[{text:"雪",value:"snow"},{text:"雨",value:"rain"},{text:"点",value:"point"}]}),(r,l)=>(u(),$(X,null,[d(A),d(M,{ref_key:"pagesShowRef",ref:a,autoRotate:!1},{ability:y(()=>[(u(),b(P,null,{default:y(()=>[d(D,E(F(n)),null,16)]),_:1}))]),_:1},512)],64))}});export{G as default};