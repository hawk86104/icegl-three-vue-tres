var ft=Object.defineProperty;var K=Object.getOwnPropertySymbols;var ht=Object.prototype.hasOwnProperty,pt=Object.prototype.propertyIsEnumerable;var q=(i,n,o)=>n in i?ft(i,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[n]=o,Y=(i,n)=>{for(var o in n||(n={}))ht.call(n,o)&&q(i,o,n[o]);if(K)for(var o of K(n))pt.call(n,o)&&q(i,o,n[o]);return i};import{aX as mt,aB as dt,bo as vt,a5 as ct,aH as xt,bk as gt,bB as tt,ba as L,aD as et,o as O,c as yt,a1 as H,T as u,at as ot,bp as Q,cv as k,ad as bt,a6 as at,b7 as wt,C as W,J as X,ae as nt,af as st,b8 as _t,a as $,ag as Mt,ak as it}from"./vendor.n5mLuYaN1718275421844.js";import"./vanilla.-sS8aqyU1718275421844.js";import{_ as zt}from"./skyBoxBmesh.vue_vue_type_script_setup_true_lang.lHrcuoxW1718275421844.js";import"./vanilla.esm.5.5.0.YRRwLpko1718275421844.js";import"./index.iuxbrWH61718275421844.js";import"./_commonjsHelpers.5-cIlDoe1718275421844.js";import"./object_hash.DvA9o96b1718275421844.js";import"./_commonjs-dynamic-modules.h-SxKiO41718275421844.js";import"./utils.mKpkoOvv1718275421844.js";import"./RGBELoader.05e4uyEY1718275421844.js";function At(i,n,o,a){const s=class extends dt{constructor(f={}){const b=Object.entries(i);super({uniforms:b.reduce((h,[v,m])=>{const w=vt.clone({[v]:{value:m}});return Y(Y({},h),w)},{}),vertexShader:n,fragmentShader:o}),this.key="",b.forEach(([h])=>Object.defineProperty(this,h,{get:()=>this.uniforms[h].value,set:v=>this.uniforms[h].value=v})),Object.assign(this,f),a&&a(this)}};return s.key=mt.generateUUID(),s}const Ct=.5*(Math.sqrt(3)-1),E=(3-Math.sqrt(3))/6,rt=i=>Math.floor(i)|0,lt=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);function St(i=Math.random){const n=Dt(i),o=new Float64Array(n).map(s=>lt[s%12*2]),a=new Float64Array(n).map(s=>lt[s%12*2+1]);return function(f,b){let h=0,v=0,m=0;const w=(f+b)*Ct,x=rt(f+w),_=rt(b+w),I=(x+_)*E,S=x-I,N=_-I,t=f-S,e=b-N;let l,g;t>e?(l=1,g=0):(l=0,g=1);const y=t-l+E,M=e-g+E,P=t-1+2*E,c=e-1+2*E,z=x&255,A=_&255;let C=.5-t*t-e*e;if(C>=0){const d=z+n[A],R=o[d],T=a[d];C*=C,h=C*C*(R*t+T*e)}let D=.5-y*y-M*M;if(D>=0){const d=z+l+n[A+g],R=o[d],T=a[d];D*=D,v=D*D*(R*y+T*M)}let F=.5-P*P-c*c;if(F>=0){const d=z+1+n[A+1],R=o[d],T=a[d];F*=F,m=F*F*(R*P+T*c)}return 70*(h+v+m)}}function Dt(i){const o=new Uint8Array(512);for(let a=0;a<512/2;a++)o[a]=a;for(let a=0;a<512/2-1;a++){const s=a+~~(i()*(256-a)),f=o[a];o[a]=o[s],o[s]=f}for(let a=256;a<512;a++)o[a]=o[a-256];return o}const Ft=["material"],Rt=["index","attributes-position","attributes-uv","attributes-offset","attributes-orientation","attributes-stretch","attributes-halfRootAngleSin","attributes-halfRootAngleCos"],Tt=["geometry"],Pt=["side"],Gt=ct({__name:"grass",props:{bW:{default:.12},bH:{default:1},joints:{default:5},width:{default:100},instances:{default:5e4}},async setup(i){let n,o;const a=([n,o]=xt(()=>gt({map:"./plugins/floor/image/blade_diffuse.jpg",alphaMap:"./plugins/floor/image/blade_alpha.jpg"})),n=await n,o(),n),s=i,f=St(Math.random);function b(t,e){const l=[],g=[],y=[],M=[],P=[];let c=new Q,z=new Q;const A=-.25,C=.25;for(let V=0;V<t;V++){const J=Math.random()*e-e/2,Z=Math.random()*e-e/2,ut=v(J,Z);l.push(J,ut,Z);let r=Math.PI-Math.random()*(2*Math.PI);M.push(Math.sin(.5*r)),P.push(Math.cos(.5*r));let p=new L(0,1,0),G=p.x*Math.sin(r/2),B=p.y*Math.sin(r/2),U=p.z*Math.sin(r/2),j=Math.cos(r/2);c.set(G,B,U,j).normalize(),r=Math.random()*(C-A)+A,p=new L(1,0,0),G=p.x*Math.sin(r/2),B=p.y*Math.sin(r/2),U=p.z*Math.sin(r/2),j=Math.cos(r/2),z.set(G,B,U,j).normalize(),c=h(c,z),r=Math.random()*(C-A)+A,p=new L(0,0,1),G=p.x*Math.sin(r/2),B=p.y*Math.sin(r/2),U=p.z*Math.sin(r/2),j=Math.cos(r/2),z.set(G,B,U,j).normalize(),c=h(c,z),g.push(c.x,c.y,c.z,c.w),V<t/3?y.push(Math.random()*1.8):y.push(Math.random())}const D=new k(new Float32Array(l),3),F=new k(new Float32Array(g),4),d=new k(new Float32Array(y),1),R=new k(new Float32Array(P),1),T=new k(new Float32Array(M),1);return{offsetsF32:D,orientationsF32:F,stretchesF32:d,halfRootAngleCosF32:R,halfRootAngleSinF32:T}}function h(t,e){const l=t.x*e.w+t.y*e.z-t.z*e.y+t.w*e.x,g=-t.x*e.z+t.y*e.w+t.z*e.x+t.w*e.y,y=t.x*e.y-t.y*e.x+t.z*e.w+t.w*e.z,M=-t.x*e.x-t.y*e.y-t.z*e.z+t.w*e.w;return new Q(l,g,y,M)}function v(t,e){var l=2*f(t/50,e/50);return l+=4*f(t/100,e/100),l+=.2*f(t/10,e/10),l}const m=b(s.instances,s.width),w=new tt(s.bW,s.bH,1,s.joints).translate(0,s.bH/2,0),x=new tt(s.width,s.width,32,32);x.lookAt(new L(0,1,0));const _=x.attributes.position;for(let t=0;t<_.array.length;t+=3)_.array[t+1]=v(_.array[t],_.array[t+2]);x.attributes.position.needsUpdate=!0,x.computeVertexNormals();const I=At({bladeHeight:1,map:null,alphaMap:null,time:0,tipColor:new et(.3,.9,0).convertSRGBToLinear(),bottomColor:new et(0,.2,0).convertSRGBToLinear()},"   precision mediump float;\n      attribute vec3 offset;\n      attribute vec4 orientation;\n      attribute float halfrootanglesin;\n      attribute float halfrootanglecos;\n      attribute float stretch;\n      uniform float time;\n      uniform float bladeHeight;\n      varying vec2 vUv;\n      varying float frc;\n\n      //WEBGL-NOISE FROM https://github.com/stegu/webgl-noise\n      //Description : Array and textureless GLSL 2D simplex noise function. Author : Ian McEwan, Ashima Arts. Maintainer : stegu Lastmod : 20110822 (ijm) License : Copyright (C) 2011 Ashima Arts. All rights reserved. Distributed under the MIT License. See LICENSE file. https://github.com/ashima/webgl-noise https://github.com/stegu/webgl-noise\n      vec3 mod289(vec3 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;} vec2 mod289(vec2 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;} vec3 permute(vec3 x) {return mod289(((x*34.0)+1.0)*x);} float snoise(vec2 v){const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439); vec2 i  = floor(v + dot(v, C.yy) ); vec2 x0 = v -   i + dot(i, C.xx); vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0); vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod289(i); vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 )); vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0); m = m*m ; m = m*m ; vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5); vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h ); vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw; return 130.0 * dot(m, g);}\n      //END NOISE\n\n      //https://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/\n      vec3 rotateVectorByQuaternion( vec3 v, vec4 q){\n        return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;\n      }\n\n      //https://en.wikipedia.org/wiki/Slerp\n      vec4 slerp(vec4 v0, vec4 v1, float t) {\n        // Only unit quaternions are valid rotations.\n        // Normalize to avoid undefined behavior.\n        normalize(v0);\n        normalize(v1);\n\n        // Compute the cosine of the angle between the two vectors.\n        float dot_ = dot(v0, v1);\n\n        // If the dot product is negative, slerp won't take\n        // the shorter path. Note that v1 and -v1 are equivalent when\n        // the negation is applied to all four components. Fix by\n        // reversing one quaternion.\n        if (dot_ < 0.0) {\n          v1 = -v1;\n          dot_ = -dot_;\n        }\n\n        const float DOT_THRESHOLD = 0.9995;\n        if (dot_ > DOT_THRESHOLD) {\n          // If the inputs are too close for comfort, linearly interpolate\n          // and normalize the result.\n          vec4 result = t*(v1 - v0) + v0;\n          normalize(result);\n          return result;\n        }\n\n        // Since dot is in range [0, DOT_THRESHOLD], acos is safe\n        float theta_0 = acos(dot_);       // theta_0 = angle between input vectors\n        float theta = theta_0*t;          // theta = angle between v0 and result\n        float sin_theta = sin(theta);     // compute this value only once\n        float sin_theta_0 = sin(theta_0); // compute this value only once\n        float s0 = cos(theta) - dot_ * sin_theta / sin_theta_0;  // == sin(theta_0 - theta) / sin(theta_0)\n        float s1 = sin_theta / sin_theta_0;\n        return (s0 * v0) + (s1 * v1);\n      }\n\n      void main() {\n        //Relative position of vertex along the mesh Y direction\n        frc = position.y/float(bladeHeight);\n        //Get wind data from simplex noise\n        float noise = 1.0-(snoise(vec2((time-offset.x/50.0), (time-offset.z/50.0))));\n        //Define the direction of an unbent blade of grass rotated around the Y axis\n        vec4 direction = vec4(0.0, halfrootanglesin, 0.0, halfrootanglecos);\n        //Interpolate between the unbent direction and the direction of growth calculated on the CPU.\n        //Using the relative location of the vertex along the Y axis as the weight, we get a smooth bend\n        direction = slerp(direction, orientation, frc);\n        vec3 vPosition = vec3(position.x, position.y + position.y * stretch, position.z);\n        vPosition = rotateVectorByQuaternion(vPosition, direction);\n\n       //Apply wind\n       float halfAngle = noise * 0.15;\n        vPosition = rotateVectorByQuaternion(vPosition, normalize(vec4(sin(halfAngle), 0.0, -sin(halfAngle), cos(halfAngle))));\n        //UV for texture\n        vUv = uv;\n        //Calculate final position of the vertex from the world offset and the above shenanigans\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(offset + vPosition, 1.0 );\n      }","\n      precision mediump float;\n      uniform sampler2D map;\n      uniform sampler2D alphaMap;\n      uniform vec3 tipColor;\n      uniform vec3 bottomColor;\n      varying vec2 vUv;\n      varying float frc;\n\n      void main() {\n        //Get transparency information from alpha map\n        float alpha = texture2D(alphaMap, vUv).r;\n        //If transparent, don't draw\n        if(alpha < 0.15) discard;\n        //Get colour data from texture\n        vec4 col = vec4(texture2D(map, vUv));\n        //Add more green towards root\n        col = mix(vec4(tipColor, 1.0), col, frc);\n        //Add a shadow towards root\n        col = mix(vec4(bottomColor, 1.0), col, frc);\n        gl_FragColor = col;\n\n        #include <tonemapping_fragment>\n	      #include <colorspace_fragment>\n      }",t=>{t.side=ot}),S=new I;S.map=a.map,S.alphaMap=a.alphaMap,S.toneMapped=!1;const{onLoop:N}=bt();return N(({elapsed:t})=>{S.uniforms.time.value=t/4}),(t,e)=>(O(),yt("TresGroup",null,[H("TresMesh",{material:u(S)},[H("TresInstancedBufferGeometry",{index:u(w).index,"attributes-position":u(w).attributes.position,"attributes-uv":u(w).attributes.uv,"attributes-offset":u(m).offsetsF32,"attributes-orientation":u(m).orientationsF32,"attributes-stretch":u(m).stretchesF32,"attributes-halfRootAngleSin":u(m).halfRootAngleSinF32,"attributes-halfRootAngleCos":u(m).halfRootAngleCosF32},null,8,Rt)],8,Ft),H("TresMesh",{position:[0,0,0],geometry:u(x)},[H("TresMeshStandardMaterial",{color:"#000f00",side:ot},null,8,Pt)],8,Tt)]))}}),Bt=H("TresPerspectiveCamera",{position:[15,15,10],fov:45,near:.1,far:1e3},null,-1),Qt=ct({__name:"grass",setup(i){const n=at({alpha:!0,toneMapping:wt,windowSize:!0,clearColor:6710886}),o=at({enableDamping:!0,autoRotate:!1});return(a,s)=>(O(),W(u(_t),nt(st(n)),{default:X(()=>[Bt,$(u(Mt),nt(st(o)),null,16),(O(),W(it,null,{default:X(()=>[$(Gt)]),_:1})),(O(),W(it,null,{default:X(()=>[$(u(zt),{texture:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/desert_1k.hdr"})]),_:1}))]),_:1},16))}});export{Qt as default};
