import{$ as h,ak as b,an as v,ao as C,aP as f,aQ as p,aw as S,o as l,c as k,W as s,K as r,a as n,E as y,a0 as B,ac as P,a5 as x,v as u,D as _,a8 as j,ab as L,ag as N,a9 as z,aa as T}from"./vendor.mx_kdcfJ1708663258526.js";import{_ as $}from"./cloudPoints.vue_vue_type_script_setup_true_lang.0Of9HD_k1708663258526.js";import{_ as A}from"./reflectorMesh.vue_vue_type_script_setup_true_lang.OVXaXdgE1708663258526.js";import"./Reflector.qkiz6CC81708663258526.js";const D=["object"],E=h({__name:"planeClipping",async setup(g){let o,e;const{renderer:i}=b();i.value.localClippingEnabled=!0;const{nodes:a}=([o,e]=v(()=>C("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/plane/scene.gltf",{draco:!0,decoderPath:"./draco/"})),o=await o,e(),o);console.log(a),a.Sketchfab_model.getObjectByName("Floor").removeFromParent();const c=a.Sketchfab_model.getObjectByName("Cube006_Avion_0");c.castShadow=!0;const t=[new f(new p(1,0,0),0),new f(new p(0,0,-1),0)];c.material.clipIntersection=!0,c.material.clippingPlanes=t;const m=a.Sketchfab_model.getObjectByName("Cube006_M_Moteur_0");m.material.clipIntersection=!0,m.material.clippingPlanes=t;const w=a.Sketchfab_model.getObjectByName("CS_Black_0"),d=new S({title:"裁剪参数",expanded:!0});return d.addBinding(t[0],"constant",{label:"x",min:-200,max:200,step:1}),d.addBinding(t[1],"constant",{label:"y",min:-200,max:250,step:1}),(M,R)=>(l(),k(y,null,[s("primitive",{object:r(a).Sketchfab_model},null,8,D),n($,{isRemoveSrc:"",model:r(w),color:"#fff"},null,8,["model"])],64))}}),O=s("TresPerspectiveCamera",{position:[500,330,500],fov:50,near:.1,far:1e4},null,-1),F=s("TresAmbientLight",{color:"#ffffff",intensity:"1"},null,-1),Q=h({__name:"planeClipping",setup(g){const o=B({mirrorSize:900,gridSize:880,mirrorColor:"#efefef",divisions:10,colorCenterLine:"#444444",colorGrid:"#888888"}),e=P();return x(()=>{e.value&&(e.value.shadow.mapSize.set(1e3,1e3),e.value.shadow.camera.near=.1,e.value.shadow.camera.far=5e3,e.value.shadow.camera.top=200,e.value.shadow.camera.right=200,e.value.shadow.camera.left=-200,e.value.shadow.camera.bottom=-200,e.value.shadow.radius=10)}),(i,a)=>(l(),u(r(j),{clearColor:"#333",shadows:"","window-size":""},{default:_(()=>[O,n(r(L)),F,s("TresDirectionalLight",{ref_key:"TDirectionalLight",ref:e,color:"#ffffff",position:[300,300,350],intensity:6,"cast-shadow":""},null,512),(l(),u(N,null,{default:_(()=>[n(E)]),_:1})),n(A,z(T(o)),null,16)]),_:1}))}});export{Q as default};
