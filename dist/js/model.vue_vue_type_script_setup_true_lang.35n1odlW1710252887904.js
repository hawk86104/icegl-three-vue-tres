import{$ as a,aA as n,aB as s,o as r,c as _,K as l}from"./vendor.IllFj73P1710252887904.js";const m=["object"],h=a({__name:"model",async setup(d){let e,t;const{nodes:o}=([e,t]=n(()=>s("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/plane/scene.gltf",{draco:!0,decoderPath:"./draco/"})),e=await e,t(),e);console.log(o),o.Sketchfab_model.getObjectByName("Floor").removeFromParent();const c=o.Sketchfab_model.getObjectByName("Cube006_Avion_0");return c.castShadow=!0,(p,u)=>(r(),_("primitive",{object:l(o).Sketchfab_model},null,8,m))}});export{h as _};