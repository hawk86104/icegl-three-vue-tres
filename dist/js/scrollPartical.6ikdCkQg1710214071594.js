import{an as Q,ao as F,ap as j,aq as U,ar as A,as as O,at as V,$ as M,o as y,c as E,K as C,au as Z,av as ee,aw as te,k as I,ax as $,ay as k,a2 as L,az as B,aA as G,aB as ae,aC as oe,a4 as W,ak as q,v as J,a5 as N,aD as re,aE as D,a0 as ne,aF as se,a as P,D as T,a9 as ie,aa as le,a8 as ue,E as ce,ah as me,ai as pe,W as f,aG as de,ag as fe,_ as ve}from"./vendor.8CtyBQ9Q1710214071594.js";import{m as ge}from"./BufferGeometryUtils.HHwgC9B11710214071594.js";import{O as xe,l as he}from"./util.t7yVAtE-1710214071594.js";import{R as _e,E as we}from"./EffectComposer.A39RyLQh1710214071594.js";import{U as Pe}from"./UnrealBloomPass.KERMcbp11710214071594.js";var ye="varying vec2 vUv;\nvoid main() {\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  vUv = uv;\n}",Me="uniform sampler2D uTextureA;\nuniform sampler2D uTextureB;\nprecision mediump float; \nuniform float uTime;\nuniform float uScroll;\nvarying vec2 vUv;\n\nmat3 rotationMatrix3(vec3 axis, float angle) {\n  axis = normalize(axis);\n  float s = sin(angle);\n  float c = cos(angle);\n  float oc = 1. - c;\n\n  return mat3(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s,\n              oc * axis.z * axis.x + axis.y * s,\n              oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c,\n              oc * axis.y * axis.z - axis.x * s,\n              oc * axis.z * axis.x - axis.y * s,\n              oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c);\n}\n\nvoid main() {\n  vec3 textureA = rotationMatrix3(vec3(10., 6., 3.), sin(uTime) * .1) *\n                  texture2D(uTextureA, vUv).xyz;\n  \n\n  vec3 textureB = rotationMatrix3(vec3(10., 6., 3.), sin(uTime) * .1) *\n                  texture2D(uTextureB, vUv).xyz;\n  \n\n  float t = uScroll;\n  vec3 pos = mix(textureA, textureB, t);\n\n  gl_FragColor = vec4(pos, 1.);\n}";const z=o=>{let t=o.attributes.position.count,r=Math.ceil(Math.sqrt(t)),a=Math.ceil(t/r),s=new Float32Array(r*a*4);function c(e){let m=Math.floor(e.length/3);for(let i=m-1;i>0;i--){const l=Math.floor(Math.random()*(i+1));for(let u=0;u<3;u++){let v=e[i*3+u];e[i*3+u]=e[l*3+u],e[l*3+u]=v}}return e}c(o.attributes.position.array);for(let e=0;e<t;e++){const d=o.attributes.position.array[e*3+0],m=o.attributes.position.array[e*3+1],i=o.attributes.position.array[e*3+2],l=0;s[e*4+0]=d,s[e*4+1]=m,s[e*4+2]=i,s[e*4+3]=l}let n=new Q(s,r,a,F,j);return n.needsUpdate=!0,n},be=()=>new V({uniforms:{uTextureA:{value:null},uTextureB:{value:null},uTime:{value:0},uScroll:{value:0}},vertexShader:ye,fragmentShader:Me}),Se=()=>{const o=be(),t=new U;return t.setAttribute("position",new A(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,-1,0,1,1,0,-1,1,0]),3)),t.setAttribute("uv",new A(new Float32Array([0,1,1,1,1,0,0,1,1,0,0,0]),2)),new O(t,o)};var Be="uniform sampler2D\n    uPositions; \nuniform float uSize;\nuniform float uPixelRatio;\nvarying vec3 vPos;\nvarying vec2 vUv;\nvoid main() {\n  vec3 pos = texture2D(uPositions, position.xy).xyz;\n\n  float customSize = uSize;\n\n  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);\n  vec4 viewPosition = viewMatrix * modelPosition;\n  vec4 projectionPosition = projectionMatrix * viewPosition;\n\n  gl_Position = projectionPosition;\n  gl_PointSize = customSize * uPixelRatio;\n  gl_PointSize *= (1.0 / -viewPosition.z);\n\n  vPos = pos;\n}",Te="precision mediump float;\nvarying vec3 vPos;\nuniform vec3 uColor; \nvoid main() {\n\n  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));\n  float strength = 0.05 / distanceToCenter - 0.1;\n\n  \n\n  gl_FragColor = vec4(uColor, strength * length(vPos));\n}";const ze=["object"],Ae=M({__name:"particalMesh",props:{progress:{default:0},width:{default:256},height:{default:256}},setup(o,{expose:t}){const r=o,a=()=>new V({uniforms:{uPositions:{value:null},uSize:{value:12},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uColor:{value:new ee("#ffaa00")}},vertexShader:Be,fragmentShader:Te,transparent:!0,depthWrite:!1,blending:te});let c=((n,e)=>{const d=n*e;let m=new Float32Array(d*3);for(let l=0;l<d;l++){let u=l*3;m[u+0]=l%n/n,m[u+1]=l/n/e}const i=new U;return i.setAttribute("position",new A(m,3)),new Z(i,a())})(r.width,r.height);return t({particles:c}),(n,e)=>(y(),E("primitive",{object:C(c)},null,8,ze))}}),Ce="./plugins/medical/model/brainparts.OBJ",Fe=M({__name:"particalFBO",props:{progress:{default:0},width:{default:256},height:{default:256},color:{default:"#ffaa00"}},async setup(o){let t,r;const a=o,s=I(),c=new $(a.width,a.height,{minFilter:k,magFilter:k,generateMipmaps:!1,colorSpace:L,depthBuffer:!1,stencilBuffer:!1,format:F,type:j}),n=h=>{const S=[];return h.traverse(_=>{_ instanceof O&&(_.geometry.deleteAttribute("uv"),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("tangent"),S.push(_.geometry))}),ge(S)},e=new xe,d=([t,r]=B(()=>he(Ce,e)),t=await t,r(),t),m=n(d);m.scale(.01,.01,.01);const i=z(m),l=([t,r]=B(()=>G("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/eCommerce/guanYu.glb",{draco:!0,decoderPath:"./draco/"})),t=await t,r(),t).scene,u=n(l.children[0]);u.rotateX(Math.PI/2),u.translate(0,-.9,0);const v=z(u),w=([t,r]=B(()=>G("./plugins/industry4/model/modelDraco.glb",{draco:!0,decoderPath:"./draco/"})),t=await t,r(),t).scene,g=n(w.children[0]);g.rotateX(-Math.PI/2),g.rotateY(Math.PI/3),g.translate(0,0,0);const b=z(g),p=Se(),R=new ae,X=new oe(-1,1,1,-1,1/Math.pow(2,53),1);R.add(p);const{onBeforeLoop:H}=W(),{camera:K,renderer:x}=q();return H(({elapsed:h})=>{x.value&&K.value&&s.value&&(x.value.setRenderTarget(c),x.value.clear(),x.value.render(R,X),x.value.setRenderTarget(null),a.progress<1/2?(p.material.uniforms.uTextureA.value=v,p.material.uniforms.uTextureB.value=i,p.material.uniforms.uScroll.value=a.progress*2):(p.material.uniforms.uTextureA.value=i,p.material.uniforms.uTextureB.value=b,p.material.uniforms.uScroll.value=(a.progress-1/2)*2),p.material.uniforms.uTime.value=h,s.value.particles.material.uniforms.uPositions.value=c.texture,s.value.particles.material.uniforms.uColor.value.setStyle(a.color))}),(h,S)=>(y(),J(Ae,{ref_key:"pMesh",ref:s,progress:h.progress},null,8,["progress"]))}}),Le=M({__name:"particalPass",props:{use:{type:Boolean,default:!0}},setup(o){const t=o,{camera:r,renderer:a,scene:s,sizes:c}=q(),n={threshold:0,strength:.472,radius:1.61};let e=null;const d=(i,l,u,v,w)=>{const g=new _e(i,l),b=new Pe(new re(v,w),n.strength,n.radius,n.threshold),p=new $(v,w,{generateMipmaps:!1,minFilter:D,magFilter:D,format:F,colorSpace:L,samples:0});e=new we(u,p),e.addPass(g),e.addPass(b)};N(()=>{c.width.value&&d(s.value,r.value,a.value,c.width.value,c.height.value)});const{onLoop:m}=W();return m(()=>{t.use?e&&e.render():a.value&&r.value&&a.value.render(s.value,r.value)}),(i,l)=>null}}),Y=o=>(me("data-v-2bcb1841"),o=o(),pe(),o),Re=Y(()=>f("TresPerspectiveCamera",{position:[0,0,-4],fov:45,near:.1,far:1e3,"look-at":[0,0,0]},null,-1)),ke=Y(()=>f("main",null,[f("section",null,[f("h1",null,"关羽 - GuanYu")]),f("section",null,[f("h1",{style:{"margin-left":"-11em","margin-bottom":"-10em"}},"大脑 - Brain")]),f("section",null,[f("h1",{style:{"margin-left":"11em","margin-bottom":"-10em"}},"设备 - Device")])],-1)),Ge=M({__name:"scrollPartical",setup(o){const t=I(0);N(()=>{console.log("jaime ~ progress:",t.value)});const r={clearColor:"#000",outputColorSpace:L,windowSize:!0,disableRender:!0,powerPreference:"high-performance",antialias:!1,alpha:!1,useLegacyLights:!1,physicallyCorrectLights:!0},a=ne({pass:!0,color:"#ffaa00"}),s=new se({title:"参数",expanded:!0});return s.addBinding(a,"pass",{label:"后处理"}),s.addBinding(a,"color",{label:"颜色"}),(c,n)=>(y(),E(ce,null,[P(C(ue),ie(le(r)),{default:T(()=>[Re,P(Le,{use:a.pass},null,8,["use"]),P(C(de),{modelValue:t.value,"onUpdate:modelValue":n[0]||(n[0]=e=>t.value=e),distance:10,"smooth-scroll":.1,"html-scroll":""},{default:T(()=>[(y(),J(fe,null,{default:T(()=>[P(Fe,{progress:t.value,color:a.color},null,8,["progress","color"])]),_:1}))]),_:1},8,["modelValue"])]),_:1},16),ke],64))}}),Ee=ve(Ge,[["__scopeId","data-v-2bcb1841"]]);export{Ee as default};
