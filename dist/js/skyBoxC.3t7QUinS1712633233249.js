import{a0 as d,aj as f,aC as h,r,o as _,v as l,D as m,a9 as g,aa as x,ck as C,a as o,K as u,ab as M,a_ as T,X as s,af as v}from"./vendor.aZqsjRbH1712633233249.js";import{l as k}from"./utils.yhlpiW2P1712633233249.js";import"./RGBELoader.1dlUMZyR1712633233249.js";const y=d({__name:"skyBoxCmesh",props:{texture:{}},async setup(c){let e,n;const i=c,{scene:a}=f(),t=([e,n]=h(()=>k(i.texture)),e=await e,n(),e);return a.value.environment=t,a.value.background=t,(p,b)=>null}}),B=s("TresPerspectiveCamera",{position:[15,15,15],fov:45,near:.1,far:1e4,"look-at":[0,0,0]},null,-1),w=s("TresMesh",{position:[10,2,-4],"cast-shadow":""},[s("TresBoxGeometry",{args:[2,2,2]}),s("TresMeshNormalMaterial")],-1),S={position:[0,0,0]},N=d({__name:"skyBoxC",setup(c){const e={clearColor:"#201919",windowSize:!0,toneMapping:C,toneMappingExposure:.8};return(n,i)=>{const a=r("TorusKnotGeometry"),t=r("MeshStandardMaterial"),p=r("TresCanvas");return _(),l(p,g(x(e)),{default:m(()=>[B,o(u(M),{enableDamping:""}),o(u(T),{args:[3,3,3],color:"orange",position:[-13,0,1]}),w,s("TresMesh",S,[o(a,{args:[3,1,64,8,2,3]}),o(t,{color:"0xffffff",metalness:1,roughness:.14})]),(_(),l(v,null,{default:m(()=>[o(y,{texture:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/desert_1k.hdr"})]),_:1}))]),_:1},16)}}});export{N as default};