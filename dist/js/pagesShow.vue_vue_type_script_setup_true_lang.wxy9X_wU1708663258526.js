import{bx as x,$ as C,k as _,a4 as T,a5 as M,w as A,o as d,c as f,K as s,aq as p,aR as b,by as S,aU as L,a0 as B,a1 as R,a2 as N,a3 as D,an as E,v as G,D as O,a7 as k,a8 as F,W as v,a as g,a9 as W,aa as H,ab as I,E as U,X as w,Z as j}from"./vendor.mx_kdcfJ1708663258526.js";import{C as $}from"./vanilla-307d3a93.esm.cwKCswf41708663258526.js";import{v as P,f as V,L as X,a as Y,b as z}from"./LineSegments2.D060BLwM1708663258526.js";const q=async()=>{const e=await x("./plugins/digitalCity/model/shanghai.FBX");let a=null,t=null,r=null;return e.traverse(o=>{o.name==="CITY_UNTRIANGULATED"&&(a=o),o.name==="LANDMASS"&&(t=o),o.name==="ROADS"&&(r=o)}),{model:e,city:a,land:t,roads:r}},K=["object"],Z=C({__name:"buildingsModelCustomShader",props:{model:{},bulidingsColor:{default:"#e523ff"},landColor:{default:"#112233"},topColor:{default:"#ffff00"},opacity:{default:.9},gradient:{type:Boolean,default:!0}},setup(n){const e=n,a=_(0),t=e.model.city;t.renderOrder=1001;const r=e.model.land,o=(i,c)=>{let m;i==="cu"||i==="land"&&(m=Array.isArray(r.material)?r.material:[r.material],m.forEach(y=>{y[c].setStyle(e.landColor),y.side=b}))};(()=>{const{geometry:i}=t;i.computeBoundingBox(),i.computeBoundingSphere();const{max:c,min:m}=i.boundingBox;if(t.material.__csm)return;const y=new $({baseMaterial:t.material,vertexShader:P,fragmentShader:V,silent:!0,uniforms:{uMax:{value:c},uMin:{value:m},uBorderWidth:{value:5},uCircleTime:{value:5},uColor:{value:new p(e.bulidingsColor)},uOpacity:{value:e.opacity},uLightColor:{value:new p("#ffffff")},uTopColor:{value:new p(e.topColor)},uTime:a,uGradient:{value:e.gradient}},depthWrite:!0,depthTest:!0,transparent:!0,side:b});t.material.dispose(),t.material=y})();const{onLoop:u}=T();u(({delta:i})=>{a.value+=i}),M(()=>{e.bulidingsColor&&t.material.uniforms.uColor.value.setStyle(e.bulidingsColor),e.landColor&&o("land","color"),e.opacity&&(t.material.uniforms.uOpacity.value=e.opacity)}),A(e,(i,c)=>{t.material.uniforms.uGradient.value=i.gradient});const h=e.model.model.clone();return(i,c)=>(d(),f("primitive",{object:s(h)},null,8,K))}}),J=["object"],Q=C({__name:"buildingsLines",props:{builds:{},width:{default:1},color:{default:"#FFF"},opacity:{default:1},style:{default:"Wireframe"}},setup(n){const e=n;let a=null,t=null;if(e.style==="Wireframe"){const r=new S(e.builds.geometry);let l=new X().fromEdgesGeometry(r),u=new Y({color:e.color,linewidth:e.width,opacity:e.opacity,transparent:!0,depthWrite:!0,depthTest:!0});u.resolution.set(window.innerWidth,window.innerHeight),a=new z(l,u),a.applyMatrix4(e.builds.matrix.clone())}else{t={transparent:!0,uniforms:{uColor:{value:new p(e.color)},uOpacity:{value:e.opacity}},vertexShader:"\n       void main() {\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",fragmentShader:" \n        uniform vec3 uColor;\n				uniform float uOpacity;\n        void main() {\n          gl_FragColor = vec4(uColor, uOpacity);\n        }\n      "};const r=new S(e.builds.geometry),o=new L(t);a=new LineSegments(r,o),a.applyMatrix4(e.builds.matrix.clone()),a.material.linewidth=e.width,a.renderOrder=1e3}return M(()=>{e.style==="Shader"&&(e.color&&(t.uniforms.uColor.value=new p(e.color)),e.opacity&&(t.uniforms.uOpacity.value=e.opacity)),e.style==="Wireframe"&&(e.color&&(a.material.color=new p(e.color)),e.opacity&&(a.material.opacity=e.opacity)),e.width&&(a.material.linewidth=e.width)}),(r,o)=>(d(),f("primitive",{object:s(a)},null,8,J))}}),ee=v("TresAmbientLight",{color:"#ffffff"},null,-1),te=v("TresDirectionalLight",{position:[100,100,0],intensity:.5,color:"#ffffff"},null,-1),ae={key:1,args:[1e3],position:[0,19,0]},oe={key:2,args:[6e3,100],position:[0,19,0]},se=C({__name:"pagesShow",props:{showBuildings:{type:Boolean,default:!0},autoRotate:{type:Boolean,default:!0},showAxesHelper:{type:Boolean,default:!0},showGridHelper:{type:Boolean,default:!0},disableRender:{type:Boolean,default:!1}},async setup(n){let e,a;const t=n,r=B({clearColor:"#000000",shadows:!0,alpha:!1,useLegacyLights:!0,shadowMapType:R,outputColorSpace:N,toneMapping:D,disableRender:t.disableRender}),o=B({autoRotate:t.autoRotate,enableDamping:!0});let l=null;t.showBuildings&&(l=([e,a]=E(()=>q()),e=await e,a(),e));const u=_(),h=_();return(i,c)=>(d(),G(s(F),k({ref_key:"tcRef",ref:h},r,{"window-size":""}),{default:O(()=>[v("TresPerspectiveCamera",{ref_key:"perspectiveCameraRef",ref:u,position:[600,750,-1221],fov:45,near:1,far:1e5},null,512),g(s(I),W(H(o)),null,16),ee,te,t.showBuildings&&s(l)?(d(),f(U,{key:0},[g(Z,{model:s(l)},null,8,["model"]),g(Q,{builds:s(l).city,color:"#000"},null,8,["builds"])],64)):w("",!0),j(i.$slots,"ability"),t.showAxesHelper?(d(),f("TresAxesHelper",ae)):w("",!0),t.showGridHelper?(d(),f("TresGridHelper",oe)):w("",!0)]),_:3},16))}});export{se as _,Z as a,Q as b,q as l};
