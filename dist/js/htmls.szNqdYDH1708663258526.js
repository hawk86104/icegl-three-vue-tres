import{$ as p,k as i,a0 as _,o as h,v as d,D as t,a7 as o,K as s,a8 as f,a1 as m,a2 as x,a3 as T,a,ab as M,W as e,al as n}from"./vendor.mx_kdcfJ1708663258526.js";const g=e("TresPerspectiveCamera",{position:[3,0,8]},null,-1),w={position:[1,1,1]},y=e("TresBoxGeometry",null,null,-1),B=e("TresMeshNormalMaterial",null,null,-1),C=e("h1",{class:"bg-white text-xs p-0.5 rounded"}," I'm a Box 📦 ",-1),b=e("TresSphereGeometry",null,null,-1),S=e("TresMeshNormalMaterial",null,null,-1),v=e("h1",{class:"bg-white text-xs p-0.5 rounded"}," I'm a Sphere ⭕️ ",-1),N=e("TresTorusGeometry",null,null,-1),k=e("TresMeshNormalMaterial",null,null,-1),I=e("h1",{class:"bg-white text-xs p-0.5 text-fuchsia-500"}," I'm a Sprite 👻 ",-1),R=e("h1",{class:"bg-blue-gray-900 text-xs rounded p-0.5 text-green-100"}," I'm just a Div 🔖 ",-1),G=e("TresAmbientLight",{intensity:1},null,-1),j=p({__name:"htmls",setup(D){const c={clearColor:"#82DBC5",shadows:!0,alpha:!1,shadowMapType:m,outputColorSpace:x,toneMapping:T},l=i(null),u=i(null),r=_({wrapperClass:"wrapper",as:"div",center:!0});return(L,P)=>(h(),d(s(f),o(c,{"window-size":""}),{default:t(()=>[g,a(s(M)),e("TresMesh",w,[y,B,a(s(n),o(r,{transform:"",occlude:[l.value]}),{default:t(()=>[C]),_:1},16,["occlude"])]),e("TresMesh",{ref_key:"sphereRef",ref:l,position:[4,1,1]},[b,S,a(s(n),o(r,{transform:""}),{default:t(()=>[v]),_:1},16)],512),e("TresMesh",{ref_key:"torusRef",ref:u,position:[7,1,1]},[N,k,a(s(n),o(r,{transform:"",sprite:""}),{default:t(()=>[I]),_:1},16)],512),a(s(n),o({position:[2,-1,1]},r,{transform:"",sprite:""}),{default:t(()=>[R]),_:1},16),G]),_:1},16))}});export{j as default};
