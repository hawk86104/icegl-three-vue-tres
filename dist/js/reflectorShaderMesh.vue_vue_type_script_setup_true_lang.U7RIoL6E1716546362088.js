import{a1 as g,ak as v,aD as x,bf as b,bo as n,az as m,aH as y,bw as S,aw as M,bx as R,a6 as j,w as B,o as G,c as H,Y as p,L as u}from"./vendor.LnRgd2r_1716546362088.js";import{R as T}from"./ReflectorMaterial.uHADTyLV1716546362088.js";import{R as C}from"./Reflector.tVcC2dTC1716546362088.js";import"./OimoPhysicsBuffer.b5DejoFC1716546362088.js";const k=["position","scale"],E=["object"],N=["object"],A=g({__name:"reflectorShaderMesh",props:{reflectivity:{default:.2},mirror:{default:.1},mixStrength:{default:9},showGridHelper:{type:Boolean,default:!0},color:{default:"#ffffff"},position:{default:[0,-1,0]},scale:{default:1}},async setup(d){let i,c;const e=d,{scene:h}=v(),t=([i,c]=x(()=>b(["./plugins/floor/image/concrete_wet_floor_basecolor.jpg","./plugins/floor/image/concrete_wet_floor_normal.jpg"])),i=await i,c(),i);t[0].wrapS=n,t[0].wrapT=n,t[1].wrapS=n,t[1].wrapT=n;const a=new C,o=new T({reflectivity:e.reflectivity,mirror:e.mirror,mixStrength:e.mixStrength,color:new m(e.color),map:t[0],normalMap:t[1],normalScale:new y(5,5),fog:h.fog,dithering:!0});o.uniforms.tReflect=a.renderTargetUniform,o.uniforms.uMatrix=a.textureMatrixUniform;const w=new S(10,10),r=new M(w,o);r.name="reflectorShaderMesh",r.position.y=-.01,r.rotation.x=-Math.PI/2,r.add(a),r.onBeforeRender=(s,f,_)=>{r.visible=!1,a.update(s,f,_),r.visible=!0};const l=new R(9.5,10);return l.visible=e.showGridHelper,j(()=>{e.reflectivity&&(o.uniforms.uReflectivity.value=e.reflectivity),e.mirror&&(o.uniforms.uMirror.value=e.mirror),e.mixStrength&&(o.uniforms.uMixStrength.value=e.mixStrength),e.color&&(o.uniforms.uColor.value=new m(e.color))}),B(()=>e.showGridHelper,s=>{l.visible=s}),(s,f)=>(G(),H("TresGroup",{position:e.position,scale:e.scale},[p("primitive",{object:u(r)},null,8,E),p("primitive",{object:u(l)},null,8,N)],8,k))}});export{A as _};