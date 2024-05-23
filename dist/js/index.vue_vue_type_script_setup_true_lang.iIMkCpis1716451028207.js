import{aB as ve,aI as z,bm as xe,c7 as ge,at as ee,az as te,bl as y,b3 as m,b5 as he,aG as Pe,aF as ye,cB as we,aw as De,bz as Me,cC as Te,cD as be,cE as Se,cF as Re,b2 as Fe,bw as ze,bh as Ie,bx as _e,b6 as We,b9 as je,c4 as Ce,cG as Oe,a1 as Be,ak as ke,ad as Ne,w as U,a6 as Ve,o as Ae,c as Le,Y as G,a0 as Ue,L as J,G as Ge,a9 as Ee}from"./vendor.KwxG0fE31716451028207.js";import{s as re}from"./shaderMaterial.axxkjwz91716451028207.js";import{F as He}from"./Pass.IF3sfO8d1716451028207.js";function O(p=1024,a=1024,f={samples:0,depth:!1}){var o=p,h=a,P=f,n=P.samples||0,I=P.depth,D=Object.assign({},P);delete D.samples,delete D.depth;var M=new ve(o,h,Object.assign({minFilter:z,magFilter:z,type:xe},D));return I&&(M.depthTexture=new ge(o,h,ee)),M.samples=n,M}const Qe=p=>p==null?void 0:p.isVector3;function K(p=_e){const a={value:new y};return Object.assign(new Ie({side:p}),{viewMatrix:a,onBeforeCompile:f=>{f.uniforms.viewMatrix=a,f.fragmentShader="vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n           return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n         }\n"+f.fragmentShader.replace("#include <normal_fragment_maps>","#include <normal_fragment_maps>\n           normal = inverseTransformDirection( normal, viewMatrix );\n")}})}const Ye=re({causticsTexture:null,causticsTextureB:null,color:new te,lightProjMatrix:new y,lightViewMatrix:new y},"varying vec3 vWorldPosition;   \n   void main() {\n     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);\n     vec4 worldPosition = modelMatrix * vec4(position, 1.);\n     vWorldPosition = worldPosition.xyz;\n   }","varying vec3 vWorldPosition;\n  uniform vec3 color;\n  uniform sampler2D causticsTexture; \n  uniform sampler2D causticsTextureB; \n  uniform mat4 lightProjMatrix;\n  uniform mat4 lightViewMatrix;\n   void main() {\n    // Apply caustics  \n    vec4 lightSpacePos = lightProjMatrix * lightViewMatrix * vec4(vWorldPosition, 1.0);\n    lightSpacePos.xyz /= lightSpacePos.w;\n    lightSpacePos.xyz = lightSpacePos.xyz * 0.5 + 0.5; \n    vec3 front = texture2D(causticsTexture, lightSpacePos.xy).rgb;\n    vec3 back = texture2D(causticsTextureB, lightSpacePos.xy).rgb;\n    gl_FragColor = vec4((front + back) * color, 1.0);\n    #include <tonemapping_fragment>\n    #include <".concat(parseInt(je.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment",">\n   }")),$e=re({cameraMatrixWorld:new y,cameraProjectionMatrixInv:new y,normalTexture:null,depthTexture:null,lightDir:new m(0,1,0),lightPlaneNormal:new m(0,1,0),lightPlaneConstant:0,near:.1,far:100,modelMatrix:new y,worldRadius:1/40,ior:1.1,bounces:0,resolution:1024,size:10,intensity:.5},"\n  varying vec2 vUv;\n  void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  }","  \n  uniform mat4 cameraMatrixWorld;\n  uniform mat4 cameraProjectionMatrixInv;\n  uniform vec3 lightDir;\n  uniform vec3 lightPlaneNormal;\n  uniform float lightPlaneConstant;\n  uniform float near;\n  uniform float far;\n  uniform float time;\n  uniform float worldRadius;\n  uniform float resolution;\n  uniform float size;\n  uniform float intensity;\n  uniform float ior;\n  precision highp isampler2D;\n  precision highp usampler2D;\n  uniform sampler2D normalTexture;\n  uniform sampler2D depthTexture;\n  uniform float bounces;\n  varying vec2 vUv;\n  vec3 WorldPosFromDepth(float depth, vec2 coord) {\n    float z = depth * 2.0 - 1.0;\n    vec4 clipSpacePosition = vec4(coord * 2.0 - 1.0, z, 1.0);\n    vec4 viewSpacePosition = cameraProjectionMatrixInv * clipSpacePosition;\n    // Perspective division\n    viewSpacePosition /= viewSpacePosition.w;\n    vec4 worldSpacePosition = cameraMatrixWorld * viewSpacePosition;\n    return worldSpacePosition.xyz;\n  }                  \n  float sdPlane( vec3 p, vec3 n, float h ) {\n    // n must be normalized\n    return dot(p,n) + h;\n  }\n  float planeIntersect( vec3 ro, vec3 rd, vec4 p ) {\n    return -(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz);\n  }\n  vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 pos, vec3 normal, float ior, out vec3 rayOrigin, out vec3 rayDirection) {\n    rayOrigin = ro;\n    rayDirection = rd;\n    rayDirection = refract(rayDirection, normal, 1.0 / ior);\n    rayOrigin = pos + rayDirection * 0.1;\n    return rayDirection;\n  }\n  void main() {\n    // Each sample consists of random offset in the x and y direction\n    float caustic = 0.0;\n    float causticTexelSize = (1.0 / resolution) * size * 2.0;\n    float texelsNeeded = worldRadius / causticTexelSize;\n    float sampleRadius = texelsNeeded / resolution;\n    float sum = 0.0;\n    if (texture2D(depthTexture, vUv).x == 1.0) {\n      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n      return;\n    }\n    vec2 offset1 = vec2(-0.5, -0.5);//vec2(rand() - 0.5, rand() - 0.5);\n    vec2 offset2 = vec2(-0.5, 0.5);//vec2(rand() - 0.5, rand() - 0.5);\n    vec2 offset3 = vec2(0.5, 0.5);//vec2(rand() - 0.5, rand() - 0.5);\n    vec2 offset4 = vec2(0.5, -0.5);//vec2(rand() - 0.5, rand() - 0.5);\n    vec2 uv1 = vUv + offset1 * sampleRadius;\n    vec2 uv2 = vUv + offset2 * sampleRadius;\n    vec2 uv3 = vUv + offset3 * sampleRadius;\n    vec2 uv4 = vUv + offset4 * sampleRadius;\n    vec3 normal1 = texture2D(normalTexture, uv1, -10.0).rgb * 2.0 - 1.0;\n    vec3 normal2 = texture2D(normalTexture, uv2, -10.0).rgb * 2.0 - 1.0;\n    vec3 normal3 = texture2D(normalTexture, uv3, -10.0).rgb * 2.0 - 1.0;\n    vec3 normal4 = texture2D(normalTexture, uv4, -10.0).rgb * 2.0 - 1.0;\n    float depth1 = texture2D(depthTexture, uv1, -10.0).x;\n    float depth2 = texture2D(depthTexture, uv2, -10.0).x;\n    float depth3 = texture2D(depthTexture, uv3, -10.0).x;\n    float depth4 = texture2D(depthTexture, uv4, -10.0).x;\n    // Sanity check the depths\n    if (depth1 == 1.0 || depth2 == 1.0 || depth3 == 1.0 || depth4 == 1.0) {\n      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n      return;\n    }\n    vec3 pos1 = WorldPosFromDepth(depth1, uv1);\n    vec3 pos2 = WorldPosFromDepth(depth2, uv2);\n    vec3 pos3 = WorldPosFromDepth(depth3, uv3);\n    vec3 pos4 = WorldPosFromDepth(depth4, uv4);\n    vec3 originPos1 = WorldPosFromDepth(0.0, uv1);\n    vec3 originPos2 = WorldPosFromDepth(0.0, uv2);\n    vec3 originPos3 = WorldPosFromDepth(0.0, uv3);\n    vec3 originPos4 = WorldPosFromDepth(0.0, uv4);\n    vec3 endPos1, endPos2, endPos3, endPos4;\n    vec3 endDir1, endDir2, endDir3, endDir4;\n    totalInternalReflection(originPos1, lightDir, pos1, normal1, ior, endPos1, endDir1);\n    totalInternalReflection(originPos2, lightDir, pos2, normal2, ior, endPos2, endDir2);\n    totalInternalReflection(originPos3, lightDir, pos3, normal3, ior, endPos3, endDir3);\n    totalInternalReflection(originPos4, lightDir, pos4, normal4, ior, endPos4, endDir4);\n    float lightPosArea = length(cross(originPos2 - originPos1, originPos3 - originPos1)) + length(cross(originPos3 - originPos1, originPos4 - originPos1));\n    float t1 = planeIntersect(endPos1, endDir1, vec4(lightPlaneNormal, lightPlaneConstant));\n    float t2 = planeIntersect(endPos2, endDir2, vec4(lightPlaneNormal, lightPlaneConstant));\n    float t3 = planeIntersect(endPos3, endDir3, vec4(lightPlaneNormal, lightPlaneConstant));\n    float t4 = planeIntersect(endPos4, endDir4, vec4(lightPlaneNormal, lightPlaneConstant));\n    vec3 finalPos1 = endPos1 + endDir1 * t1;\n    vec3 finalPos2 = endPos2 + endDir2 * t2;\n    vec3 finalPos3 = endPos3 + endDir3 * t3;\n    vec3 finalPos4 = endPos4 + endDir4 * t4;\n    float finalArea = length(cross(finalPos2 - finalPos1, finalPos3 - finalPos1)) + length(cross(finalPos3 - finalPos1, finalPos4 - finalPos1));\n    caustic += intensity * (lightPosArea / finalArea);\n    // Calculate the area of the triangle in light spaces\n    gl_FragColor = vec4(vec3(max(caustic, 0.0)), 1.0);\n  }"),X={depth:!0,minFilter:z,magFilter:z,type:Ce},Z={minFilter:Oe,magFilter:z,type:ee,generateMipmaps:!0},qe=(p,{frames:a=1,causticsOnly:f=!1,ior:o=1.1,backside:h=!1,backsideIOR:P=1.1,worldRadius:n=.3125,color:I=new te("white"),intensity:D=.05,resolution:M=2024,lightSource:_=new m(1,1,1),near:ae=.1,far:oe=0}={})=>{const s={frames:a,ior:o,color:I,causticsOnly:f,backside:h,backsideIOR:P,worldRadius:n,intensity:D,resolution:M,lightSource:_,near:ae,far:oe},T=new he;T.name="caustics_group";const ie=T,r=new Pe,c=new ye;c.name="caustics_scene";const d=p,W=new we(r);W.name="caustics_helper";const v=s.resolution,j=O(v,v,X),C=O(v,v,X),B=O(v,v,Z),k=O(v,v,Z),E=K(),H=K(We),i=new $e,Q=new He(i),x=new De(new Me(1,1),new Ye({transparent:!0,color:s.color,causticsTexture:B.texture,causticsTextureB:k.texture,blending:Te,blendSrc:be,blendDst:Se,depthWrite:!1}));x.name="caustics_plane",x.rotation.x=-Math.PI/2,x.renderOrder=2,T.add(c,x),T.updateWorldMatrix(!1,!0);let ne=0;const b=new m,se=new Re,Y=new y,le=new Fe,g=new m,N=new m,t=new ze,S=new m,u=[],V=[],R=[],$=[],ce=new m;for(let F=0;F<8;F++)u.push(new m),V.push(new m),R.push(new m),$.push(new m);return{scene:c,group:T,helper:W,params:s,update:()=>{if(s.frames===1/0||ne++<s.frames){var F;Qe(_)?g.copy(_).normalize():g.copy(ie.worldToLocal(_.getWorldPosition(b)).normalize()),N.copy(g).multiplyScalar(-1),(F=c.parent)==null||F.matrixWorld.identity(),t.setFromObject(c,!0),u[0].set(t.min.x,t.min.y,t.min.z),u[1].set(t.min.x,t.min.y,t.max.z),u[2].set(t.min.x,t.max.y,t.min.z),u[3].set(t.min.x,t.max.y,t.max.z),u[4].set(t.max.x,t.min.y,t.min.z),u[5].set(t.max.x,t.min.y,t.max.z),u[6].set(t.max.x,t.max.y,t.min.z),u[7].set(t.max.x,t.max.y,t.max.z);for(let e=0;e<8;e++)V[e].copy(u[e]);t.getCenter(S),u.map(e=>e.sub(S));const de=le.set(N,0);u.map((e,l)=>de.projectPoint(e,R[l]));const ue=R.reduce((e,l)=>e.add(l),b.set(0,0,0)).divideScalar(R.length),w=R.map(e=>e.distanceTo(ue)).reduce((e,l)=>Math.max(e,l)),me=u.map(e=>e.dot(g)).reduce((e,l)=>Math.max(e,l));r.position.copy(ce.copy(g).multiplyScalar(me).add(S)),r.lookAt(c.localToWorld(S));const pe=Y.lookAt(r.position,S,b.set(0,1,0));if(r.left=-w,r.right=w,r.top=w,r.bottom=-w,r.near=s.near,s.far)r.far=s.far;else{const e=b.set(0,w,0).applyMatrix4(pe),l=(r.position.y+e.y)/g.y;r.far=l}r.updateProjectionMatrix(),r.updateMatrixWorld();const A=V.map((e,l)=>e.add($[l].copy(g).multiplyScalar(-e.y/g.y))),L=A.reduce((e,l)=>e.add(l),b.set(0,0,0)).divideScalar(A.length),fe=2*A.map(e=>Math.hypot(e.x-L.x,e.z-L.z)).reduce((e,l)=>Math.max(e,l));x.scale.setScalar(fe),x.position.copy(L),W.parent&&W.update(),H.viewMatrix.value=E.viewMatrix.value=r.matrixWorldInverse;const q=se.setFromProjectionMatrix(Y.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse)).planes[4];i.cameraMatrixWorld=r.matrixWorld,i.cameraProjectionMatrixInv=r.projectionMatrixInverse,i.lightDir=N,i.lightPlaneNormal=q.normal,i.lightPlaneConstant=q.constant,i.near=r.near,i.far=r.far,i.resolution=s.resolution,i.size=w,i.intensity=s.intensity,i.worldRadius=s.worldRadius,c.visible=!0,d.setRenderTarget(j),d.clear(),c.overrideMaterial=E,d.render(c,r),d.setRenderTarget(C),d.clear(),s.backside&&(c.overrideMaterial=H,d.render(c,r)),c.overrideMaterial=null,i.ior=s.ior,x.material.lightProjMatrix=r.projectionMatrix,x.material.lightViewMatrix=r.matrixWorldInverse,i.normalTexture=j.texture,i.depthTexture=j.depthTexture,d.setRenderTarget(B),d.clear(),Q.render(d),i.ior=s.backsideIOR,i.normalTexture=C.texture,i.depthTexture=C.depthTexture,d.setRenderTarget(k),d.clear(),s.backside&&Q.render(d),d.setRenderTarget(null),s.causticsOnly&&(c.visible=!1)}},normalTarget:j,normalTargetB:C,causticsTarget:B,causticsTargetB:k}},Je=["object"],Ke=["object"],rt=Be({__name:"index",props:{color:{default:"#ffffff"},ior:{default:1.1},backsideIOR:{default:1.1},far:{default:15},worldRadius:{default:.3},intensity:{default:.05},causticsOnly:{type:Boolean,default:!1},lightSource:{default:{x:1,y:1,z:1}},resolution:{default:1024}},setup(p){const a=p,{renderer:f}=ke(),o=qe(f.value,{frames:1/0,resolution:a.resolution,worldRadius:a.worldRadius});o.params.backside=!0;const h=Ne(null);U(h,n=>{n&&o.scene.add(n)});const{onBeforeLoop:P}=Ee();return P(({elapsed:n})=>{o.update()}),Ve(()=>{a.color&&o.params.color.set(a.color),a.ior&&(o.params.ior=a.ior),a.backsideIOR&&(o.params.backsideIOR=a.backsideIOR),a.far&&(o.params.far=a.far),a.worldRadius&&(o.params.worldRadius=a.worldRadius),a.intensity&&(o.params.intensity=a.intensity)}),U(()=>a.causticsOnly,n=>{o.params.causticsOnly=n}),U(()=>a.lightSource,n=>{n&&o.params.lightSource instanceof m&&o.params.lightSource.set(n.x,n.y,n.z)},{deep:!0}),(n,I)=>(Ae(),Le(Ge,null,[G("TresGroup",{ref_key:"group",ref:h},[Ue(n.$slots,"default")],512),G("primitive",{object:J(o).group,position:[0,.003,0]},null,8,Je),G("primitive",{object:J(o).helper,visible:!1},null,8,Ke)],64))}});export{rt as _};