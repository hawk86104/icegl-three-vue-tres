import{a0 as v,k as t,a5 as h,r as g,o as C,c as S,a as o,D as p,a7 as x,E as R,a3 as k,a4 as w,a8 as I,ag as T,ah as V,X as e,K as n,aZ as y,aI as B,aY as E,a_ as N,_ as b}from"./vendor.aZqsjRbH1712633233249.js";const r=s=>(T("data-v-58764a55"),s=s(),V(),s),F=r(()=>e("TresPerspectiveCamera",{position:[0,2,5]},null,-1)),G=r(()=>e("TresGridHelper",{args:[10,10]},null,-1)),M=r(()=>e("main",null,[e("section",null,[e("h1",null,"First section")]),e("section",null,[e("h2",null,"Second section")])],-1)),P=v({__name:"scrollControls",setup(s){const u=t(),i=t(),l=t(),a=t(0);h(()=>{console.log("jaime ~ progress:",a.value)});const _={clearColor:"#333",alpha:!0,outputColorSpace:k,toneMapping:w},{onLoop:d}=I();return d(()=>{l.value&&(l.value.value.rotation.x=a.value*10,l.value.value.rotation.y=a.value*2)}),(j,c)=>{const f=g("TresCanvas");return C(),S(R,null,[o(f,x(_,{"window-size":"",class:"canvas-class"}),{default:p(()=>[F,o(n(y),{radius:1}),G,o(n(B),{ref_key:"scRef",ref:u,modelValue:a.value,"onUpdate:modelValue":c[0]||(c[0]=m=>a.value=m),distance:10,"smooth-scroll":.1,"html-scroll":""},{default:p(()=>[o(n(E),{ref_key:"sphereRef",ref:i,scale:.1,position:[1,2,0]},null,512),o(n(N),{ref_key:"boxRef",ref:l,scale:.5,color:16711935,position:[-1,1,0]},null,512)]),_:1},8,["modelValue"])]),_:1},16),M],64)}}}),D=b(P,[["__scopeId","data-v-58764a55"]]);export{D as default};