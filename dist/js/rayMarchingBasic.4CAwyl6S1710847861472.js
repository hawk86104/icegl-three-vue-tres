import{$ as d,a4 as p,ap as w,aH as s,a5 as M,o as m,c as T,W as e,a9 as v,aa as _,a6 as x,v as y,D as L,a7 as H,K as u,a8 as P,a as f,ab as b}from"./vendor.Cjb8724R1710847861472.js";const B="varying vec2 vUv;\nvoid main(){\n	gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n	vUv=uv;\n}",C="#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nfloat map(vec3 p){\n  return length(p)-1.;\n}\nvoid main(){\n  vec3 ro=vec3(0.,0.,-3.);//起始位置\n  vec3 rd=normalize(vec3(vUv-.5,1.));//方向\n  float t=0.;\n  vec3 color=vec3(0.);\n  for(int i=0;i<80;i++){\n    vec3 p=ro+rd*t;\n    float d=map(p);\n    t+=d;\n    //优化效率\n    if(t>100.||d<.001){\n      break;\n    }\n    \n  }\n  color=vec3(t)*.2;\n  gl_FragColor=vec4(color,1.);\n  \n}",S=["rotation"],R={ref:"TresTubeGeometryRef",args:[1e3,1e3]},V=d({__name:"rayMarchingMaterialBasic",setup(h){const{onLoop:t,onAfterLoop:a}=p(),n={transparent:!0,depthWrite:!0,depthTest:!0,side:w,vertexShader:B,fragmentShader:C,uniforms:{u_resolution:{value:new s(window.innerWidth,window.innerHeight)},u_mouse:{value:new s(0,0)},u_time:{value:0}}},r=window.innerWidth/2,i=window.innerHeight/2;let c=0,l=0;function g(o){c=o.clientX-r,l=o.clientY-i}return document.addEventListener("mousemove",g,!1),M(()=>{}),t(({elapsed:o})=>{n.uniforms.u_time.value+=.001,n.uniforms.u_mouse.value=new s(c,l)}),a(()=>{}),(o,W)=>(m(),T("TresMesh",{ref:"MeshRef",rotation:[Math.PI/2,0,0]},[e("TresPlaneGeometry",R,null,512),e("TresShaderMaterial",v(_(n)),null,16)],8,S))}}),k={ref:"perspectiveCameraRef",position:[0,800,0],fov:45,near:1,far:1e4},D=e("TresAmbientLight",{color:"#ffffff"},null,-1),E=e("TresDirectionalLight",{position:[100,100,0],intensity:.5,color:"#ffffff"},null,-1),G=e("TresAxesHelper",{args:[1e3],position:[0,19,0]},null,-1),U=e("TresGridHelper",{args:[6e3,100],position:[0,19,0]},null,-1),z=d({__name:"rayMarchingBasic",setup(h){const t={clearColor:"#000000",shadows:!0,alpha:!1,useLegacyLights:!0},a={autoRotate:!0,enableDamping:!0},{onLoop:n}=p();return n(({delta:r})=>{}),x(()=>{}),(r,i)=>(m(),y(u(P),H(t,{"window-size":""}),{default:L(()=>[e("TresPerspectiveCamera",k,null,512),f(u(b),v(_(a)),null,16),D,E,f(V),G,U]),_:1},16))}});export{z as default};
