import{$ as _,ar as v,as as f,at as m,au as g,av as M,ak as T,a4 as w,a0 as i,a1 as S,a2 as y,a3 as b,k as x,a5 as C,o as k,v as B,D as L,a7 as P,K as c,a8 as R,a as u,a9 as G,aa as A,ab as D,W as e}from"./vendor.mx_kdcfJ1708663258526.js";const N=_({__name:"otherScene",setup(p){var r=new v(1,1,1),n=new f({color:16711935}),a=new m(r,n);a.position.set(-3,2,3);var t=new g,l=new M(16777215);t.add(l),t.add(a);const{camera:o,renderer:s,scene:d}=T();o.value&&t.add(o.value);const{onLoop:h}=w();return h(()=>{a.rotation.x+=.05,a.rotation.y+=.02,s.value&&o.value&&(s.value.clear(),s.value.render(t,o.value),s.value.render(d.value,o.value))}),(O,Q)=>null}}),z=e("TresPerspectiveCamera",{position:[15,15,15],fov:45,near:.1,far:1e3,"look-at":[0,0,0]},null,-1),I=e("TresAmbientLight",{intensity:1},null,-1),V=e("TresDirectionalLight",{position:[10,8,4],intensity:1},null,-1),$={ref:"sphereRef",position:[3,3,0]},E=e("TresSphereGeometry",{args:[1,32,32]},null,-1),F=e("TresMeshToonMaterial",{color:"#006060"},null,-1),H=[E,F],K=["rotation"],W=e("TresPlaneGeometry",{args:[20,20,20,20]},null,-1),j=e("TresMeshToonMaterial",null,null,-1),q=[W,j],J=e("TresGridHelper",null,null,-1),X=_({__name:"multipleScenes",setup(p){const r=i({clearColor:"#201919",alpha:!1,shadowMapType:S,outputColorSpace:y,toneMapping:b,disableRender:!0,windowSize:!0}),n=i({enableDamping:!0,dampingFactor:.05}),a=x();return C(()=>{if(a.value){let t=a.value.context.renderer.value;t.autoClear=!1}}),(t,l)=>(k(),B(c(R),P(r,{ref_key:"tcRef",ref:a}),{default:L(()=>[z,u(c(D),G(A(n)),null,16),I,V,e("TresMesh",$,H,512),e("TresMesh",{rotation:[-Math.PI/2,0,0]},q,8,K),J,u(N)]),_:1},16))}});export{X as default};
