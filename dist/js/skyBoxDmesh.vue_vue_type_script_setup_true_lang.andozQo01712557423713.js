import{a0 as o,aj as i,aC as c,bb as m,ci as l,aH as r,co as u}from"./vendor.dUBjHEtG1712557423713.js";const f=o({__name:"skyBoxDmesh",props:{texture:{}},async setup(s){let a,t;const p=s,{scene:n}=i(),{map:e}=([a,t]=c(()=>m({map:p.texture})),a=await a,t(),a);return e.wrapS=e.wrapT=l,e.generateMipmaps=!1,e.magFilter=r,e.minFilter=r,e.mapping=u,n.value.environment=e,n.value.background=e,(_,g)=>null}});export{f as _};