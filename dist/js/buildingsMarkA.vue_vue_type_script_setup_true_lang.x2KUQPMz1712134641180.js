import{a0 as l,aD as f,bc as c,a1 as i,ac as p,a5 as u,o as m,c as d,X as _,a7 as h,K as y}from"./vendor.FpHYsbG41712134641180.js";const g=["position","scale"],k=["map"],w=l({__name:"buildingsMarkA",props:{color:{default:"#fff"},position:{default:[0,0,0]},scale:{default:.1},img:{},offset:{default:[.344,.394]},foremost:{type:Boolean,default:!0},sizeAttenuation:{type:Boolean,default:!1}},async setup(o){let a,s;const e=o,{map:r}=([a,s]=f(()=>c({map:e.img})),a=await a,s(),a),n=i({color:e.color,transparent:!0,depthWrite:!1,sizeAttenuation:e.sizeAttenuation,toneMapped:!1,depthTest:!e.foremost}),t=p(null);return u(()=>{t.value&&(t.value.geometry=t.value.geometry.clone(),t.value.geometry.translate(e.offset[0],e.offset[1],0))}),(v,A)=>(m(),d("TresSprite",{ref_key:"tsRef",ref:t,position:e.position,scale:e.scale,renderOrder:"99999"},[_("TresSpriteMaterial",h(n,{map:y(r)}),null,16,k)],8,g))}});export{w as _};