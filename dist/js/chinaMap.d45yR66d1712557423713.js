import{aC as S,bG as $,k as R,a5 as w,o as c,c as T,E as A,G as N,X as l,at as g,av as z,c8 as D,a8 as M,a0 as F,a1 as x,r as O,v as E,D as b,a7 as V,a as B,a9 as X,aa as I,K as J,ab as K,af as W}from"./vendor.dUBjHEtG1712557423713.js";import{l as Y}from"./utils.viSadMp51712557423713.js";import{c as q,d as H,a as Q}from"./ExtensionUtilities.uqpNeKP11712557423713.js";import{m as U}from"./mercator.a2Hae4Rp1712557423713.js";import"./Water2.cmRJP9J41712557423713.js";import"./Reflector.kB_3xXIK1712557423713.js";const Z=["properties","renderOrder"],ee=["args"],te=l("TresMeshBasicMaterial",{color:"#2defff",transparent:!0,opacity:.6},null,-1),oe={__name:"chinaMapMesh",async setup(C){let o,r;(()=>{g.prototype.computeBoundsTree=q,g.prototype.disposeBoundsTree=H,z.prototype.raycast=Q})();const f=U().center([104,37.5]).translate([0,0]),h=([o,r]=S(()=>Y("./plugins/simpleGIS/json/china.json","features")),o=await o,r(),o),p={depth:10,bevelEnabled:!1},_=[];(()=>{h.forEach(e=>{e.geometry.coordinates.forEach(n=>{n.forEach(s=>{const m=new D;for(let i=0;i<s.length;i++){const[y,v]=f(s[i]);i===0&&m.moveTo(y,-v),m.lineTo(y,-v)}_.push({shape:m,properties:e.properties})})})})})();const k=new $({color:"#3480C4",linewidth:1,linecap:"round"}),d=R();w(()=>{d.value&&d.value.children.forEach(e=>{e.geometry.computeBoundsTree();const t=[e.material,k];e.material=t})});let a=null;(()=>{const e=document.createElement("div");e.className="tooltip",e.style.border="1px solid white",e.style.position="absolute",e.style.color="white",e.style.padding="0px 6px",e.style.whiteSpace="no-wrap",e.style.visibility="hidden",document.body.appendChild(e),a=e})();const P=(e,t)=>{e.object.material[0].color.set(16711680),a.innerText=e.object.properties.name,a.style.visibility="visible"},G=(e,t)=>{console.log("pointer-leave",e,t),e.material[0].color.set(3010559),a.style.visibility="hidden"},L=(e,t)=>{a.style.left="".concat(t.clientX+6,"px"),a.style.top="".concat(t.clientY+6,"px")},{onLoop:j}=M();return j(()=>{}),(e,t)=>(c(),T("TresGroup",{ref_key:"tgRef",ref:d},[(c(),T(A,null,N(_,(n,s)=>l("TresMesh",{key:"".concat(s),properties:n.properties,renderOrder:s,onPointerEnter:P,onPointerLeave:G,onPointerMove:L},[l("TresExtrudeGeometry",{args:[n.shape,p]},null,8,ee),te],40,Z)),64))],512))}},ae=l("TresPerspectiveCamera",{position:[0,0,166],fov:75,near:.1,far:1e3,"look-at":[0,0,0]},null,-1),me=F({__name:"chinaMap",setup(C){const o=x({clearColor:"#201919"}),r=x({enableDamping:!0,dampingFactor:.05}),{onLoop:u}=M();return u(()=>{}),w(()=>{}),(f,h)=>{const p=O("TresCanvas");return c(),E(p,V(o,{"window-size":""}),{default:b(()=>[ae,B(J(K),X(I(r)),null,16),(c(),E(W,null,{default:b(()=>[B(oe)]),_:1}))]),_:1},16)}}});export{me as default};