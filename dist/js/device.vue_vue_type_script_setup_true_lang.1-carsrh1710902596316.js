import{$ as y,aD as L,aE as S,ak as E,bb as _,a5 as N,a4 as R,az as z,o as A,c as D,K as G}from"./vendor.TqTi2h0x1710902596316.js";import{r as F,u as H}from"./device.L8yUO7Ez1710902596316.js";const K=["object"],$=y({__name:"device",props:{threshold:{default:0},strength:{default:.972},radius:{default:.21}},async setup(v){let l,u;const t=v,{nodes:r}=([l,u]=L(()=>S("./plugins/industry4/model/modelDraco.glb",{draco:!0,decoderPath:"./draco/"})),l=await l,u(),l),g=F(r.Sketchfab_model),{camera:h,renderer:f,scene:s,sizes:m}=E();let n=null,d=null,a=null;const M=new _({color:"black"});N(()=>{if(h.value){f.value.setPixelRatio(window.devicePixelRatio),s.value.add(g);const{finalComposer:e,effectComposer:o,bloomPass:P}=H(s.value,h.value,f.value,m.width.value,m.height.value);n=e,d=o,a=P,a.threshold=t.threshold,a.strength=t.strength,a.radius=t.radius}t.threshold&&(a.threshold=t.threshold),t.strength&&(a.strength=t.strength),t.radius&&(a.radius=t.radius)});const i={},b=e=>{(e.isMesh||e.type==="GridHelper"||e.name==="reflectorShaderMesh")&&(i[e.uuid]=e.material,e.material=M)},k=e=>{i[e.uuid]&&(e.material=i[e.uuid],delete i[e.uuid])},{onLoop:w,onAfterLoop:B}=R();let p=.03,c=r.Sketchfab_model.getObjectByName("canister_turbine_011_Nickel-Light-PBR_0"),x=c.material.clone(),C=new _({color:new z("red"),transparent:!0,opacity:1});return w(({elapsed:e})=>{r.hull_turbine&&(r.hull_turbine.rotation.x+=p,r.blades_turbine_003.rotation.x+=p),Math.floor(e)%2?c.material=x:c.material=C}),B(({elapsed:e})=>{d&&(s.value.traverse(o=>{b(o)}),d.render(e)),n&&(s.value.traverse(o=>{k(o)}),n.render(e))}),(e,o)=>(A(),D("primitive",{object:G(r).Sketchfab_model},null,8,K))}});export{$ as _};
