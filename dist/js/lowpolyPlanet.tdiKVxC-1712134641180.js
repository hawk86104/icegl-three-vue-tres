import{a0 as M,aD as S,aE as b,w as z,o as _,c as f,K as u,a8 as y,ac as P,X as g,a as p,E as x,G as L,r as B,D as v,a7 as k,a3 as T,cq as $,ab as j,v as W,ag as A,a_ as F}from"./vendor.FpHYsbG41712134641180.js";import{_ as I}from"./default.vue_vue_type_script_setup_true_lang.SvGWRb0K1712134641180.js";const E=["object"],D=.2,N=M({__name:"airplane",props:{planet:{}},async setup(h){let e,i;const n=h,{scene:a}=([e,i]=S(()=>b("./plugins/earthSample/model/lowpolyPlanet/airplane.gltf")),e=await e,i(),e),t=a;t.rotation.set(0,Math.PI,0),a.traverse(s=>{s.isMesh&&(s.castShadow=!0)}),t.updateMatrixWorld();const{onLoop:c}=y();z(()=>n.planet,s=>{var d;if(!s)return;s.geometry.computeBoundingSphere();const r=Math.abs(((d=s.geometry.boundingSphere)==null?void 0:d.radius)|1);t.position.set(r,0,0),t.lookAt(s.position)});let o=0;return c(({delta:s})=>{if(!t||!n.planet)return;const r=Math.abs(n.planet.geometry.boundingSphere.radius)+.5;o+=s*D;const d=r*Math.cos(o),l=r*Math.sin(o);t.position.x=d,t.position.z=l,t.rotation.z=-Math.PI/2,t.rotation.y=-o,t.updateMatrixWorld()}),(s,r)=>(_(),f("primitive",{object:u(t)},null,8,E))}}),R=["object"],G=M({__name:"cloud",props:{planet:{}},async setup(h){let e,i;const n=h,{scene:a}=([e,i]=S(()=>b("./plugins/earthSample/model/lowpolyPlanet/cloud.gltf")),e=await e,i(),e);P();const t=a.children[0];t.castShadow=!0;function c(l,m){const w=Math.random()*(m-l)+l;return Math.random()<.5?-w:w}t.position.set(c(-8,8),c(.5,1),c(-8,8));const o=c(.5,1);t.scale.set(o,o,o),t.updateMatrixWorld(),z(()=>n.planet,l=>{l&&(t.lookAt(l.position),t.updateMatrixWorld())});const{onLoop:s}=y();let r=c(-1,1)*Math.PI;const d=Math.random()/10;return s(({delta:l})=>{if(!t)return;const m=Math.abs(n.planet.geometry.boundingSphere.radius-.5);r+=l*d;const w=m*Math.cos(r),C=m*Math.sin(r);t.position.x=w,t.position.z=C,t.rotation.y=-r,t.lookAt(n.planet.position),t.updateMatrixWorld()}),(l,m)=>(_(),f("primitive",{object:u(a),"cast-shadow":""},null,8,R))}}),V=["object"],q=M({__name:"planet",async setup(h){let e,i;const{nodes:n}=([e,i]=S(()=>b("./plugins/earthSample/model/lowpolyPlanet/planet.gltf")),e=await e,i(),e),a=n.Planet,t=n.Icosphere;a.traverse(o=>{o.isMesh&&(o.receiveShadow=!0)});const{onLoop:c}=y();return c(({delta:o})=>{a&&(a.rotation.y+=o*.04,a.rotation.z+=o*.02,a.rotation.x+=o*.05,a.updateMatrixWorld())}),(o,s)=>(_(),f(x,null,[g("primitive",{object:u(a)},null,8,V),p(N,{planet:u(t)},null,8,["planet"]),(_(),f(x,null,L([1,2,3,4,5,6,7,8,9],r=>p(G,{key:r,planet:u(t)},null,8,["planet"])),64))],64))}}),K=g("TresPerspectiveCamera",{position:[0,1,5],fov:75,near:.1,far:1e3},null,-1),X=g("TresAmbientLight",{color:"#484068",intensity:1},null,-1),H=g("TresPointLight",{color:"#1BFFEF",position:[0,0,-8],intensity:80,"cast-shadow":""},null,-1),J=g("TresDirectionalLight",{position:[0,2,4],intensity:3,"cast-shadow":"","shadow-mapSize-width":2048,"shadow-mapSize-height":2048},null,-1),U=M({__name:"lowpolyPlanet",setup(h){const e={clearColor:"#11101B",shadows:!0,alpha:!1,outputColorSpace:T,shadowMapType:$,useLegacyLights:!0},i=P(0);return y().onLoop(({delta:n})=>{i.value+=.02*n}),(n,a)=>{const t=B("TresCanvas");return _(),f(x,null,[p(I),p(t,k(e,{"window-size":""}),{default:v(()=>[K,p(u(j)),X,(_(),W(A,null,{default:v(()=>[p(q)]),_:1})),p(u(F),{rotation:[0,i.value,0],radius:50,depth:50,count:5e3,size:.3,"size-attenuation":!0},null,8,["rotation"]),H,J]),_:1},16)],64)}}});export{U as default};