import{bM as ee,bN as te,ay as I,aD as se,az as k,ba as q,bI as P,ep as ne,a5 as J,aH as re,bX as oe,c5 as ae,ct as le,q as D,aL as ie,ao as ce,aa as ue,bm as pe,bx as de,au as fe,o as H,c as K,a1 as U,T as V,K as Q,aA as me,ad as ge,a6 as Y,r as he,a as j,J as O,ac as G,ag as ye,C as $,ak as Z}from"./vendor.iBV-vwSJ1717643756855.js";/* empty css                                                                                 */import{_ as ve}from"./randomLoading.vue_vue_type_script_setup_true_lang.Tc-f9qNn1717643756855.js";import{_ as we}from"./component.vue_vue_type_script_setup_true_lang.btOAvQEt1717643756855.js";import"./vanilla.esm.5.5.0.gmH2wuHU1717643756855.js";import{c as xe,d as _e,a as be,I as W,C as Te,N as Ce}from"./ExtensionUtilities.HqCly3-61717643756855.js";import"./starLoading.dWV4fsEh1717643756855.js";import"./cssLoaders.eivDI6V11717643756855.js";import"./bubbleLoading.SfumyIEd1717643756855.js";import"./object_hash.O7Sw-hlw1717643756855.js";import"./_commonjsHelpers.5-cIlDoe1717643756855.js";import"./_commonjs-dynamic-modules.h-SxKiO41717643756855.js";class Fe extends ee{constructor(i){super(i)}load(i,F,g,L){const l=this,r=new te(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(i,function(A){try{F(l.parse(A))}catch(c){L?L(c):console.error(c),l.manager.itemError(i)}},g,L)}parse(i){function F(t){const e=new DataView(t),u=32/8*3+32/8*3*3+16/8,d=e.getUint32(80,!0);if(80+32/8+d*u===e.byteLength)return!0;const w=[115,111,108,105,100];for(let p=0;p<5;p++)if(g(w,e,p))return!1;return!0}function g(t,e,u){for(let d=0,_=t.length;d<_;d++)if(t[d]!==e.getUint8(u+d))return!1;return!0}function L(t){const e=new DataView(t),u=e.getUint32(80,!0);let d,_,w,p=!1,b,T,B,z,N;for(let a=0;a<70;a++)e.getUint32(a,!1)==1129270351&&e.getUint8(a+4)==82&&e.getUint8(a+5)==61&&(p=!0,b=new Float32Array(u*3*3),T=e.getUint8(a+6)/255,B=e.getUint8(a+7)/255,z=e.getUint8(a+8)/255,N=e.getUint8(a+9)/255);const M=84,o=12*4+2,m=new I,h=new Float32Array(u*3*3),y=new Float32Array(u*3*3),s=new se;for(let a=0;a<u;a++){const S=M+a*o,C=e.getFloat32(S,!0),x=e.getFloat32(S+4,!0),v=e.getFloat32(S+8,!0);if(p){const n=e.getUint16(S+48,!0);n&32768?(d=T,_=B,w=z):(d=(n&31)/31,_=(n>>5&31)/31,w=(n>>10&31)/31)}for(let n=1;n<=3;n++){const R=S+n*12,f=a*3*3+(n-1)*3;h[f]=e.getFloat32(R,!0),h[f+1]=e.getFloat32(R+4,!0),h[f+2]=e.getFloat32(R+8,!0),y[f]=C,y[f+1]=x,y[f+2]=v,p&&(s.set(d,_,w).convertSRGBToLinear(),b[f]=s.r,b[f+1]=s.g,b[f+2]=s.b)}}return m.setAttribute("position",new k(h,3)),m.setAttribute("normal",new k(y,3)),p&&(m.setAttribute("color",new k(b,3)),m.hasColors=!0,m.alpha=N),m}function l(t){const e=new I,u=/solid([\s\S]*?)endsolid/g,d=/facet([\s\S]*?)endfacet/g,_=/solid\s(.+)/;let w=0;const p=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,b=new RegExp("vertex"+p+p+p,"g"),T=new RegExp("normal"+p+p+p,"g"),B=[],z=[],N=[],M=new q;let o,m=0,h=0,y=0;for(;(o=u.exec(t))!==null;){h=y;const s=o[0],a=(o=_.exec(s))!==null?o[1]:"";for(N.push(a);(o=d.exec(s))!==null;){let x=0,v=0;const n=o[0];for(;(o=T.exec(n))!==null;)M.x=parseFloat(o[1]),M.y=parseFloat(o[2]),M.z=parseFloat(o[3]),v++;for(;(o=b.exec(n))!==null;)B.push(parseFloat(o[1]),parseFloat(o[2]),parseFloat(o[3])),z.push(M.x,M.y,M.z),x++,y++;v!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+w),x!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+w),w++}const S=h,C=y-h;e.userData.groupNames=N,e.addGroup(S,C,m),m++}return e.setAttribute("position",new P(B,3)),e.setAttribute("normal",new P(z,3)),e}function r(t){return typeof t!="string"?new TextDecoder().decode(t):t}function A(t){if(typeof t=="string"){const e=new Uint8Array(t.length);for(let u=0;u<t.length;u++)e[u]=t.charCodeAt(u)&255;return e.buffer||e}else return t}const c=A(i);return F(c)?L(c):l(r(i))}}const Ae=(E,i,F,g,L,l)=>{window.addEventListener("pointermove",r=>{E.x=r.clientX/window.innerWidth*2-1,E.y=-(r.clientY/window.innerHeight)*2+1,i.value=!0}),window.addEventListener("pointerdown",r=>{E.x=r.clientX/window.innerWidth*2-1,E.y=-(r.clientY/window.innerHeight)*2+1,g.value=r.button;const A=new ne;A.setFromCamera(E,F.value),A.firstHitOnly=!0;const c=A.intersectObject(L.value,!0);i.value=!0,l.enabled=c.length===0},!0),window.addEventListener("pointerup",r=>{g.value=-1,r.pointerType==="touch"&&(i.value=!1)},!0)},Be=["geometry","material"],Me=U("TresSphereGeometry",{args:[1,40,40]},null,-1),Se=U("TresMeshStandardMaterial",{color:15483002,roughness:.75,metalness:0,transparent:!0,opacity:.5,premultipliedAlpha:!0,emissive:15483002,emissiveIntensity:.5},null,-1),Ee=[Me,Se],Le=["geometry"],Re=U("TresMeshStandardMaterial",{color:"#023249",roughness:.2,metalness:0,envMapIntensity:.2},null,-1),Ue=[Re],ze=J({__name:"model",props:{controls:{}},async setup(E){let i,F;const g=E;(()=>{I.prototype.computeBoundsTree=xe,I.prototype.disposeBoundsTree=_e,me.prototype.raycast=be})();const l=([i,F]=re(()=>oe(Fe,"./plugins/industry4/model/TR12J_OCC.stl")),i=await i,F(),i),r=new ae({color:16777215,roughness:.2,metalness:1,vertexColors:!0}),A=new Uint8Array(l.attributes.position.count*3);A.fill(255);const c=new k(A,3,!0);c.setUsage(le),l.setAttribute("color",c);const t=D(null),e=D(null),u=D(!1),d=D(-1),_=D(.2),w=new ie,{camera:p,raycaster:b}=ce(),T={x:15/255,y:78/255,z:85/255};let B=null;ue(()=>{t.value&&(console.log("targetMesh.value init",t.value),t.value.geometry.computeBoundsTree(),B=l.boundsTree,Ae(w,u,p,d,t,g.controls.value))});const{onLoop:z}=ge();z(()=>{const m=l.index;if(e.value)if(g.controls.value.active||!u.value)e.value.visible=!1;else{e.value.scale.setScalar(_.value),b.value.setFromCamera(w,p.value),b.value.firstHitOnly=!0;const h=b.value.intersectObject(t.value,!0);if(h.length){e.value.position.copy(h[0].point),g.controls.value.enabled=!1,e.value.visible=!0;const y=new pe;y.copy(t.value.matrixWorld).invert();const s=new de;s.center.copy(e.value.position).applyMatrix4(y),s.radius=_.value*100;const a=[],S=new q;if(B==null||B.shapecast({intersectsBounds:C=>{const x=s.intersectsBox(C),{min:v,max:n}=C;if(x){for(let R=0;R<=1;R++)for(let f=0;f<=1;f++)for(let X=0;X<=1;X++)if(S.set(R===0?v.x:n.x,f===0?v.y:n.y,X===0?v.z:n.z),!s.containsPoint(S))return W;return Te}return x?W:Ce},intersectsTriangle:(C,x,v)=>{if(v||C.intersectsSphere(s)){const n=3*x;a.push(n,n+1,n+2)}return!1}}),d.value===0||d.value===2){let C=1,x=1,v=1;d.value===0&&(C=T.x,x=T.y,v=T.z);for(let n=0,R=a.length;n<R;n++){const f=m.getX(a[n]);c.setX(f,C),c.setY(f,x),c.setZ(f,v)}c.needsUpdate=!0}}else e.value.visible=!1,g.controls.value.enabled=!0}});const M=new fe().addButton({title:"点击按钮",label:"生成模型"}),o=new I;return M.on("click",()=>{const m=[],h=[];for(let s=0;s<c.count;s++)c.getX(s)===T.x&&c.getY(s)===T.y&&c.getZ(s)===T.z&&(m.push(l.attributes.position.getX(s),l.attributes.position.getY(s),l.attributes.position.getZ(s)),h.push(l.attributes.normal.getX(s),l.attributes.normal.getY(s),l.attributes.normal.getZ(s)));const y=new Float32Array(m);o.setAttribute("position",new k(y,3)),o.setAttribute("normal",new k(y,3))}),(m,h)=>(H(),K(Q,null,[U("TresMesh",{ref_key:"targetMesh",ref:t,geometry:V(l),scale:.005,material:V(r)},null,8,Be),U("TresMesh",{ref_key:"brushMesh",ref:e,visible:!1},Ee,512),U("TresMesh",{geometry:V(o),position:[-2,-2,2],scale:.005},Ue,8,Le)],64))}}),Ne=U("TresPerspectiveCamera",{position:[5,1,15],fov:30,near:.1,far:1e3},null,-1),De=U("TresAmbientLight",{intensity:1},null,-1),We=J({__name:"collectTriangles",setup(E){const i=Y({clearColor:"#999999",antialias:!0}),F=Y({autoRotate:!1}),g=D(null);return(L,l)=>{const r=he("TresCanvas");return H(),K(Q,null,[j(V(ve)),j(r,G(i,{"window-size":""}),{default:O(()=>[Ne,j(V(ye),G({ref_key:"controlsRef",ref:g},F),null,16),De,(H(),$(Z,null,{default:O(()=>[j(ze,{controls:g.value},null,8,["controls"])]),_:1})),(H(),$(Z,null,{default:O(()=>[j(V(we),{background:!1,files:["pos-x.jpg","neg-x.jpg","pos-y.jpg","neg-y.jpg","pos-z.jpg","neg-z.jpg"],path:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/"},null,8,["files"])]),_:1}))]),_:1},16)],64)}}});export{We as default};
