import{$ as u,ak as v,aA as C,aB as S,a$ as d,b0 as f,an as y,o as l,c as h,W as s,K as n,a as o,E as g,a0 as B,ac as k,a5 as P,D as _,a8 as x,ab as j,v as $,ag as N,a9 as z,aa as A}from"./vendor.St8dZPm41710511268643.js";import{_ as L}from"./reflectorMesh.vue_vue_type_script_setup_true_lang.bA91CF-51710511268643.js";/* empty css                                                                                 */import{_ as T}from"./randomLoading.vue_vue_type_script_setup_true_lang.EC8dr3K21710511268643.js";import{_ as D}from"./cloudPoints.vue_vue_type_script_setup_true_lang.qeB0novI1710511268643.js";import"./Reflector.ssChIAG91710511268643.js";import"./starLoading.w4MBeZIE1710511268643.js";import"./bubbleLoading.TJYHbPB51710511268643.js";const E=["object"],O=u({__name:"planeClipping",async setup(b){let t,e;const{renderer:i}=v();i.value.localClippingEnabled=!0;const{nodes:a}=([t,e]=C(()=>S("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/plane/scene.gltf",{draco:!0,decoderPath:"./draco/"})),t=await t,e(),t);console.log(a),a.Sketchfab_model.getObjectByName("Floor").removeFromParent();const c=a.Sketchfab_model.getObjectByName("Cube006_Avion_0");c.castShadow=!0;const r=[new d(new f(1,0,0),0),new d(new f(0,0,-1),0)];c.material.clipIntersection=!0,c.material.clippingPlanes=r;const m=a.Sketchfab_model.getObjectByName("Cube006_M_Moteur_0");m.material.clipIntersection=!0,m.material.clippingPlanes=r;const w=a.Sketchfab_model.getObjectByName("CS_Black_0"),p=new y({title:"裁剪参数",expanded:!0});return p.addBinding(r[0],"constant",{label:"x",min:-200,max:200,step:1}),p.addBinding(r[1],"constant",{label:"y",min:-200,max:250,step:1}),(R,V)=>(l(),h(g,null,[s("primitive",{object:n(a).Sketchfab_model},null,8,E),o(D,{isRemoveSrc:"",model:n(w),color:"#fff"},null,8,["model"])],64))}}),F=s("TresPerspectiveCamera",{position:[500,330,500],fov:50,near:.1,far:1e4},null,-1),I=s("TresAmbientLight",{color:"#ffffff",intensity:"1"},null,-1),X=u({__name:"planeClipping",setup(b){const t=B({mirrorSize:900,gridSize:880,mirrorColor:"#efefef",divisions:10,colorCenterLine:"#444444",colorGrid:"#888888"}),e=k();return P(()=>{e.value&&(e.value.shadow.mapSize.set(1e3,1e3),e.value.shadow.camera.near=.1,e.value.shadow.camera.far=5e3,e.value.shadow.camera.top=200,e.value.shadow.camera.right=200,e.value.shadow.camera.left=-200,e.value.shadow.camera.bottom=-200,e.value.shadow.radius=10)}),(i,a)=>(l(),h(g,null,[o(n(T)),o(n(x),{clearColor:"#333",shadows:"","window-size":""},{default:_(()=>[F,o(n(j)),I,s("TresDirectionalLight",{ref_key:"TDirectionalLight",ref:e,color:"#ffffff",position:[300,300,350],intensity:6,"cast-shadow":""},null,512),(l(),$(N,null,{default:_(()=>[o(O)]),_:1})),o(L,z(A(t)),null,16)]),_:1})],64))}});export{X as default};
