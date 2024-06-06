import{aD as v,bS as w,bO as x,ck as g,bR as b,aL as h,aB as P}from"./vendor.iBV-vwSJ1717643756855.js";import{m as M}from"./BufferGeometryUtils.0qcmfQC61717643756855.js";import{R as S,E as u,S as T}from"./EffectComposer.UpFHrxdP1717643756855.js";import{U as y}from"./UnrealBloomPass.Zmq39QRJ1717643756855.js";import{O as U}from"./OutputPass.6xYth6AW1717643756855.js";const B="varying vec2 vUv;\nvoid main(){\n	vUv=uv;\n	gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n}",C="uniform sampler2D baseTexture;\nuniform sampler2D bloomTexture;\nvarying vec2 vUv;\nvoid main(){\n	gl_FragColor=(texture2D(baseTexture,vUv)+vec4(1.)*texture2D(bloomTexture,vUv));\n}";let p=new v("#0fb1fb");const D=new w({color:p,transparent:!0,opacity:.3}),d=new x({color:new v(p),depthTest:!0,transparent:!0}),V=o=>{const s=[];o.traverse(e=>{e.isMesh&&(s.push(e.geometry),e.material=D)});const t=M(s),i=new g(t,Math.PI*6.137),a=new b(i);return d.opacity=1,a.material=d,a},m={threshold:0,strength:.972,radius:.21},F=(o,s,t,i,a)=>{const e=new S(o,s),c=new y(new h(i,a),m.strength,m.radius,m.threshold),r=new u(t);r.renderToScreen=!1,r.addPass(e),r.addPass(c);const l=new T(new P({uniforms:{baseTexture:{value:null},bloomTexture:{value:r.renderTarget2.texture}},vertexShader:B,fragmentShader:C,defines:{}}),"baseTexture");l.needsSwap=!0;const f=new U,n=new u(t);return n.addPass(e),n.addPass(l),n.addPass(f),{finalComposer:n,effectComposer:r,renderScene:e,bloomPass:c}};export{V as r,F as u};
