import{$ as m,aA as b,K as l,o as a,c as n,W as s,E as h,G as f,t as g,X as r,ah as y,ai as v,bt as k,_ as w}from"./vendor.St8dZPm41710511268643.js";/* empty css                                                                                 */const x=e=>(y("data-v-71e323b0"),e=e(),v(),e),B={key:0,class:"absolute bg-grey-600 t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono bg-black"},A={class:"text-white"},C={class:"g-container"},F=x(()=>s("div",{class:"g-circle"},null,-1)),I={class:"g-bubbles"},S={key:0,class:"pspan"},D=m({__name:"bubbleLoading",props:{isDemo:{type:Boolean,default:!1},showProgress:{type:Boolean,default:!0}},async setup(e){let t,c;const p=e,{hasFinishLoading:_,progress:o}=([t,c]=b(()=>k()),t=await t,c(),t),i=()=>{o.value++>100&&(o.value=0),requestAnimationFrame(i)};return p.isDemo&&requestAnimationFrame(i),(d,L)=>l(_)?r("",!0):(a(),n("div",B,[s("div",A,[s("div",C,[F,s("ul",I,[(a(),n(h,null,f(200,u=>s("li",{key:u,class:"g-bubble"})),64))])]),d.showProgress?(a(),n("span",S,g(l(o))+" %",1)):r("",!0)])]))}}),N=w(D,[["__scopeId","data-v-71e323b0"]]);export{N as l};
