import{$ as y,k as x,a4 as P,cj as S,bm as u,a0 as p,aR as w,ay as z,w as m,o as d,c as b,W as c,a9 as B,aa as R,aq as T,aw as V,v as h,D as _,K as v,a8 as j,a as t,ab as q,a7 as g,ag as C}from"./vendor.mx_kdcfJ1708663258526.js";import{_ as M}from"./reflectorDUDV.vue_vue_type_script_setup_true_lang.GfB0nRXA1708663258526.js";import"./dither.glsl.y2WXw1t-1708663258526.js";import"./OimoPhysicsBuffer.3JPrXtpZ1708663258526.js";const Z=["rotation-x"],k=["args"],n=y({__name:"videoFloor",props:{size:{default:[10,10]},vSrcPath:{},loop:{type:Boolean,default:!0},color:{default:"#fff"},opacity:{default:.95},rotationZ:{default:.01},textureRepeat:{default:[1,1]}},setup(f){const r=x(),{onLoop:a}=P();a(()=>{r.value&&(r.value.rotation.z+=o.rotationZ)});const o=f;let e=document.createElement("video");e.src=o.vSrcPath,e.loop=o.loop,e.muted=!0,e.crossOrigin="",e.play();let s=new S(e);s.wrapS=u,s.wrapT=u,s.repeat.set(o.textureRepeat[0],o.textureRepeat[1]);const l=p({color:o.color,alphaMap:s,side:w,transparent:!0,opacity:o.opacity,blending:z,flatShading:!0,depthTest:!1});return m(()=>o.color,i=>{l.color=new T(i)}),m(()=>o.opacity,i=>{l.opacity=i}),(i,L)=>(d(),b("TresMesh",{ref_key:"tmRef",ref:r,"rotation-x":-Math.PI/2},[c("TresPlaneGeometry",{args:o.size},null,8,k),c("TresMeshStandardMaterial",B(R(l)),null,16)],8,Z))}}),$=c("TresPerspectiveCamera",{position:[15,20,0],fov:45,near:.1,far:1e4},null,-1),D=c("TresAmbientLight",{intensity:6},null,-1),I=y({__name:"videoFloor",setup(f){const r=p({reflectivity:2.6,showGridHelper:!1,scale:4}),a=p({color:"#fff",opacity:.95,rotationZ:.01}),o=new V({title:"video地面",expanded:!0});return o.addBinding(a,"color",{label:"颜色"}),o.addBinding(a,"opacity",{label:"透明度",min:0,max:1,step:.01}),o.addBinding(a,"rotationZ",{label:"自转速度",min:-.1,max:.1,step:.01}),(e,s)=>(d(),h(v(j),{clearColor:"#201919","window-size":""},{default:_(()=>[$,t(v(q),{enableDamping:""}),D,t(n,g(a,{position:[0,0,10],size:[10,10],vSrcPath:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/video/floor/floorV1.mp4"}),null,16),t(n,{color:"#02a7ff",position:[0,-1,10],size:[13,13],vSrcPath:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/video/floor/floorV2.mp4"}),t(n,{color:"#7300a8",opacity:.6,position:[0,0,-10],size:[10,10],vSrcPath:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/video/floor/floorV3.mp4"}),t(n,{color:"#f605ff",rotationZ:-.01,position:[0,-1,-10],size:[13,13],vSrcPath:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/video/floor/floorV3.mp4"}),t(n,{color:"#02a7ff",rotationZ:0,position:[0,-1.99,0],opacity:.06,textureRepeat:[3,2],size:[40,40],vSrcPath:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/video/floor/grid.mp4"}),(d(),h(C,null,{default:_(()=>[t(M,g({position:[0,-2,0]},r),null,16)]),_:1}))]),_:1}))}});export{I as default};
