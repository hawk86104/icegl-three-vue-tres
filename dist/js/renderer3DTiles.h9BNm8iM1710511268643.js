import{$ as _,ak as w,a5 as f,a4 as h,o as g,c as T,W as a,K as l,be as x,bc as y,a0 as d,ac as B,v as S,D as b,a7 as L,a8 as D,a as m,a9 as C,aa as k,ab as M}from"./vendor.St8dZPm41710511268643.js";import{T as R}from"./TilesRenderer.8fGVh1oq1710511268643.js";import"./BufferGeometryUtils.FQtqKwMn1710511268643.js";const j=["object"],P=_({__name:"tilesMesh",setup(v){const e=new R("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/3Dtiles/simpleGIS/data/tileset.json");e.errorTarget=0;const r=p=>{p.traverse(s=>{s.isMesh&&(s.material.side=2,s.receiveShadow=!1,s.castShadow=!1)});const i=new x,u=new y;e.getBoundingBox(i)?(i.getCenter(e.group.position),e.group.position.multiplyScalar(-1)):e.getBoundingSphere(u)&&(e.group.position.copy(u.center),e.group.position.multiplyScalar(-1))};e.onLoadModel=r;const{camera:t,renderer:o,sizes:n}=w();f(()=>{n.width.value&&(e.setCamera(t.value),e.setResolutionFromRenderer(t.value,o.value))});const{onBeforeLoop:c}=h();return c(()=>{t.value&&n.width.value&&(t.value.updateMatrixWorld(),e.update())}),(p,i)=>(g(),T("TresGroup",null,[a("primitive",{object:l(e).group},null,8,j)]))}}),z=a("TresPerspectiveCamera",{position:[400,400,400],fov:60,near:.1,far:4e3},null,-1),$=a("TresAmbientLight",{intensity:.5},null,-1),A=a("TresAxesHelper",{args:[100]},null,-1),I=_({__name:"renderer3DTiles",setup(v){const e=d({clearColor:"#201919"}),r=d({enableDamping:!0,dampingFactor:.05}),{onLoop:t}=h();t(()=>{});const o=B();return f(()=>{o.value&&o.value.position.set(1,2,3).multiplyScalar(40)}),(n,c)=>(g(),S(l(D),L(e,{"window-size":""}),{default:b(()=>[z,m(l(M),C(k(r)),null,16),$,a("TresDirectionalLight",{ref_key:"TDirectionalLight",ref:o,position:[1,2,3],intensity:1.25},null,512),m(P),A]),_:1},16))}});export{I as default};
