import{a6 as t,C as n,al as e,V as o,K as r,a9 as a}from"./three.QUrV0R7c1724070319978.js";import{$ as i,N as s,d as c,x as l}from"./@tresjs.2JnKj_Yj1724070319978.js";import"./index.Ars2XRGN1724070319978.js";import{a as u}from"./simplex-noise.MycypUyu1724070319978.js";import{C as f}from"./index.CwiXkxnG1724070319978.js";import{d as p,a4 as h,o as m,D as d,J as v,u as g,r as x,f as y,g as w,j as b,aj as _,ak as M,al as j}from"./@vue.Q1VpS3901724070319978.js";import{_ as z}from"./skyBoxBmesh.vue_vue_type_script_setup_true_lang.4abyEaUm1724070319978.js";import"./tweakpane.yHWGBmom1724070319978.js";import"./@vueuse.2Yfo77CO1724070319978.js";import"./lamina.voFzBRKU1724070319978.js";import"./glsl-tokenizer.P_7ZdKiw1724070319978.js";import"./@amap.PfcO2up21724070319978.js";import"./glsl-token-descope.2bzpGfgw1724070319978.js";import"./glsl-token-depth.apN6dzkr1724070319978.js";import"./glsl-token-scope.ejO_Ivht1724070319978.js";import"./glsl-token-properties.GZQpvpSW1724070319978.js";import"./glsl-token-assignments.kTLJWgis1724070319978.js";import"./glsl-token-string.l3IeKluQ1724070319978.js";import"./glsl-token-functions.UEj-2zyG1724070319978.js";import"./object-hash.-UynEDWH1724070319978.js";import"./jszip.ZVB-p0R-1724070319978.js";import"./skyBoxAmesh.vue_vue_type_script_setup_true_lang.UY2eETRs1724070319978.js";import"./skyBoxDmesh.vue_vue_type_script_setup_true_lang.-GzI1OTv1724070319978.js";import"./three-stdlib.xC_Fy68c1724070319978.js";import"./@pmndrs.vVECOsOu1724070319978.js";import"./utils.BIr4X0LU1724070319978.js";const A=k;!function(t,n){const e=k,o=E();for(;;)try{if(138132===parseInt(e(247))/1+-parseInt(e(290))/2+-parseInt(e(291))/3*(-parseInt(e(284))/4)+-parseInt(e(264))/5+-parseInt(e(288))/6+parseInt(e(251))/7*(parseInt(e(277))/8)+-parseInt(e(240))/9*(-parseInt(e(230))/10))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const I=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[k(283)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){I(this,(function(){const t=k,n=new RegExp("function *\\( *\\)"),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=L(t(239));n[t(256)](o+"chain")&&e.test(o+t(304))?L():o("0")}))()}();const C=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[k(283)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function k(t,n){const e=E();return(k=function(t,n){return e[t-=230]})(t,n)}C(void 0,(function(){const t=k;let n;try{n=Function(t(235)+t(259)+");")()}catch(r){n=window}const e=n.console=n[t(268)]||{},o=[t(253),t(305),t(254),t(261),t(249),"table",t(266)];for(let a=0;a<o[t(298)];a++){const n=C[t(265)][t(307)].bind(C),r=o[a],i=e[r]||n;n[t(255)]=C[t(242)](C),n[t(302)]=i.toString[t(242)](i),e[r]=n}}))();const S=["material"],R=["index","attributes-position",A(297),A(293),"attributes-orientation","attributes-stretch","attributes-halfRootAngleSin",A(276)],D=[A(250)],F=["side"];function E(){const t=["console","#000f00","normalize","set","translate","value","stretchesF32","   precision mediump float;\n      attribute vec3 offset;\n      attribute vec4 orientation;\n      attribute float halfrootanglesin;\n      attribute float halfrootanglecos;\n      attribute float stretch;\n      uniform float time;\n      uniform float bladeHeight;\n      varying vec2 vUv;\n      varying float frc;\n\n      //WEBGL-NOISE FROM https://github.com/stegu/webgl-noise\n      //Description : Array and textureless GLSL 2D simplex noise function. Author : Ian McEwan, Ashima Arts. Maintainer : stegu Lastmod : 20110822 (ijm) License : Copyright (C) 2011 Ashima Arts. All rights reserved. Distributed under the MIT License. See LICENSE file. https://github.com/ashima/webgl-noise https://github.com/stegu/webgl-noise\n      vec3 mod289(vec3 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;} vec2 mod289(vec2 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;} vec3 permute(vec3 x) {return mod289(((x*34.0)+1.0)*x);} float snoise(vec2 v){const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439); vec2 i  = floor(v + dot(v, C.yy) ); vec2 x0 = v -   i + dot(i, C.xx); vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0); vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod289(i); vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 )); vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0); m = m*m ; m = m*m ; vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5); vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h ); vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw; return 130.0 * dot(m, g);}\n      //END NOISE\n\n      //https://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/\n      vec3 rotateVectorByQuaternion( vec3 v, vec4 q){\n        return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;\n      }\n\n      //https://en.wikipedia.org/wiki/Slerp\n      vec4 slerp(vec4 v0, vec4 v1, float t) {\n        // Only unit quaternions are valid rotations.\n        // Normalize to avoid undefined behavior.\n        normalize(v0);\n        normalize(v1);\n\n        // Compute the cosine of the angle between the two vectors.\n        float dot_ = dot(v0, v1);\n\n        // If the dot product is negative, slerp won't take\n        // the shorter path. Note that v1 and -v1 are equivalent when\n        // the negation is applied to all four components. Fix by\n        // reversing one quaternion.\n        if (dot_ < 0.0) {\n          v1 = -v1;\n          dot_ = -dot_;\n        }\n\n        const float DOT_THRESHOLD = 0.9995;\n        if (dot_ > DOT_THRESHOLD) {\n          // If the inputs are too close for comfort, linearly interpolate\n          // and normalize the result.\n          vec4 result = t*(v1 - v0) + v0;\n          normalize(result);\n          return result;\n        }\n\n        // Since dot is in range [0, DOT_THRESHOLD], acos is safe\n        float theta_0 = acos(dot_);       // theta_0 = angle between input vectors\n        float theta = theta_0*t;          // theta = angle between v0 and result\n        float sin_theta = sin(theta);     // compute this value only once\n        float sin_theta_0 = sin(theta_0); // compute this value only once\n        float s0 = cos(theta) - dot_ * sin_theta / sin_theta_0;  // == sin(theta_0 - theta) / sin(theta_0)\n        float s1 = sin_theta / sin_theta_0;\n        return (s0 * v0) + (s1 * v1);\n      }\n\n      void main() {\n        //Relative position of vertex along the mesh Y direction\n        frc = position.y/float(bladeHeight);\n        //Get wind data from simplex noise\n        float noise = 1.0-(snoise(vec2((time-offset.x/50.0), (time-offset.z/50.0))));\n        //Define the direction of an unbent blade of grass rotated around the Y axis\n        vec4 direction = vec4(0.0, halfrootanglesin, 0.0, halfrootanglecos);\n        //Interpolate between the unbent direction and the direction of growth calculated on the CPU.\n        //Using the relative location of the vertex along the Y axis as the weight, we get a smooth bend\n        direction = slerp(direction, orientation, frc);\n        vec3 vPosition = vec3(position.x, position.y + position.y * stretch, position.z);\n        vPosition = rotateVectorByQuaternion(vPosition, direction);\n\n       //Apply wind\n       float halfAngle = noise * 0.15;\n        vPosition = rotateVectorByQuaternion(vPosition, normalize(vec4(sin(halfAngle), 0.0, -sin(halfAngle), cos(halfAngle))));\n        //UV for texture\n        vUv = uv;\n        //Calculate final position of the vertex from the world offset and the above shenanigans\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(offset + vPosition, 1.0 );\n      }","attributes-halfRootAngleCos","536HMyaCp","computeVertexNormals","PlaneGeometry","call","convertSRGBToLinear","toneMapped","apply","4UsrtOf","TresMesh","side","\n      precision mediump float;\n      uniform sampler2D map;\n      uniform sampler2D alphaMap;\n      uniform vec3 tipColor;\n      uniform vec3 bottomColor;\n      varying vec2 vUv;\n      varying float frc;\n\n      void main() {\n        //Get transparency information from alpha map\n        float alpha = texture2D(alphaMap, vUv).r;\n        //If transparent, don't draw\n        if(alpha < 0.15) discard;\n        //Get colour data from texture\n        vec4 col = vec4(texture2D(map, vUv));\n        //Add more green towards root\n        col = mix(vec4(tipColor, 1.0), col, frc);\n        //Add a shadow towards root\n        col = mix(vec4(bottomColor, 1.0), col, frc);\n        gl_FragColor = col;\n\n        #include <tonemapping_fragment>\n\t      #include <colorspace_fragment>\n      }","1064580QNHQzb","joints","477888dKWfWC","103770bjLRVB","index","attributes-offset","stateObject","width","offsetsF32","attributes-uv","length","Color","action","random","toString","lookAt","input","warn","TresMeshStandardMaterial","prototype","halfRootAngleSinF32","20ITMqMH","debu","string","Vector3","push","return (function() ","array","cos","Vector4","init","1986597LrcXpV","InstancedBufferAttribute","bind","grass","uniforms","gger","halfRootAngleCosF32","4716LrazZx","map","exception","geometry","24283dVMlSh","DoubleSide","log","info","__proto__","test","attributes","needsUpdate",'{}.constructor("return this")( )',"sin","error","position","alphaMap","793445MAAkQh","constructor","trace","orientationsF32"];return(E=function(){return t})()}const H=p({__name:A(243),props:{bW:{default:.12},bH:{default:1},joints:{default:5},width:{default:100},instances:{default:5e4}},async setup(a){const c=A;let l,p;const x=([l,p]=h((()=>s({map:"./plugins/floor/image/blade_diffuse.jpg",alphaMap:"./plugins/floor/image/blade_alpha.jpg"}))),l=await l,p(),l),y=a,w=u(Math.random);function b(n,e){const o=k,r=n.x*e.w+n.y*e.z-n.z*e.y+n.w*e.x,a=-n.x*e.z+n.y*e.w+n.z*e.x+n.w*e.y,i=n.x*e.y-n.y*e.x+n.z*e.w+n.w*e.z,s=-n.x*e.x-n.y*e.y-n.z*e.z+n.w*e.w;return new(t[o(238)])(r,a,i,s)}function _(t,n){var e=2*w(t/50,n/50);return e+=4*w(t/100,n/100),e+=.2*w(t/10,n/10)}const M=function(n,a){const i=k,s=[],c=[],l=[],u=[],f=[];let p=new(t[i(238)]),h=new e;const m=-.25;for(let e=0;e<n;e++){const r=Math[i(301)]()*a-a/2,d=Math[i(301)]()*a-a/2,v=_(r,d);s[i(234)](r,v,d);let g=Math.PI-Math[i(301)]()*(2*Math.PI);u[i(234)](Math[i(260)](.5*g)),f[i(234)](Math[i(237)](.5*g));let x=new o(0,1,0),y=x.x*Math[i(260)](g/2),w=x.y*Math[i(260)](g/2),M=x.z*Math[i(260)](g/2),j=Math.cos(g/2);p[i(271)](y,w,M,j)[i(270)](),g=.5*Math.random()+m,x=new(t[i(233)])(1,0,0),y=x.x*Math[i(260)](g/2),w=x.y*Math.sin(g/2),M=x.z*Math.sin(g/2),j=Math.cos(g/2),h[i(271)](y,w,M,j)[i(270)](),p=b(p,h),g=.5*Math[i(301)]()+m,x=new o(0,0,1),y=x.x*Math[i(260)](g/2),w=x.y*Math[i(260)](g/2),M=x.z*Math.sin(g/2),j=Math[i(237)](g/2),h[i(271)](y,w,M,j)[i(270)](),p=b(p,h),c.push(p.x,p.y,p.z,p.w),e<n/3?l.push(1.8*Math[i(301)]()):l.push(Math[i(301)]())}return{offsetsF32:new(t[i(241)])(new Float32Array(s),3),orientationsF32:new(t[i(241)])(new Float32Array(c),4),stretchesF32:new r(new Float32Array(l),1),halfRootAngleCosF32:new(t[i(241)])(new Float32Array(f),1),halfRootAngleSinF32:new r(new Float32Array(u),1)}}(y.instances,y[c(295)]),j=new(t[c(279)])(y.bW,y.bH,1,y[c(289)])[c(272)](0,y.bH/2,0),z=new(t[c(279)])(y[c(295)],y[c(295)],32,32);z[c(303)](new(t[c(233)])(0,1,0));const I=z[c(257)].position;for(let t=0;t<I[c(236)].length;t+=3)I.array[t+1]=_(I[c(236)][t],I.array[t+2]);z[c(257)][c(262)][c(258)]=!0,z[c(278)]();const C=new(f({bladeHeight:1,map:null,alphaMap:null,time:0,tipColor:new n(.3,.9,0)[c(281)](),bottomColor:new(t[c(299)])(0,.2,0)[c(281)]()},c(275),c(287),(n=>{const e=c;n[e(286)]=t[e(252)]})));C[c(248)]=x[c(248)],C[c(263)]=x.alphaMap,C[c(282)]=!1;const{onLoop:E}=i();return E((({elapsed:t})=>{const n=c;C[n(244)].time[n(273)]=t/4})),(n,e)=>{const o=c;return m(),d("TresGroup",null,[v(o(285),{material:g(C)},[v("TresInstancedBufferGeometry",{index:g(j)[o(292)],"attributes-position":g(j)[o(257)][o(262)],"attributes-uv":g(j)[o(257)].uv,"attributes-offset":g(M)[o(296)],"attributes-orientation":g(M)[o(267)],"attributes-stretch":g(M)[o(274)],"attributes-halfRootAngleSin":g(M)[o(308)],"attributes-halfRootAngleCos":g(M)[o(246)]},null,8,R)],8,S),v(o(285),{position:[0,0,0],geometry:g(z)},[v(o(306),{color:o(269),side:t[o(252)]},null,8,F)],8,D)])}}});function L(t){function n(t){const e=k;if(typeof t===e(232))return function(t){}.constructor("while (true) {}")[e(283)]("counter");1!==(""+t/t)[e(298)]||t%20==0?function(){return!0}[e(265)]("debu"+e(245))[e(280)](e(300)):function(){return!1}[e(265)](e(231)+e(245)).apply(e(294)),n(++t)}try{if(t)return n;n(0)}catch(e){}}function O(t,n){const e=T();return(O=function(t,n){return e[t-=378]})(t,n)}const P=O;function T(){const t=["24YieZMt","console","while (true) {}","33404lDebcn","grass","counter","1592397kamBUo","warn","input","7772206CmsEya","call","gger","8UQKRYA","trace","table","624ayjGzy","1339112UeGCvf","function *\\( *\\)","594wPqDSv","1482624tJeMdb","10bvoEWu","apply","1651362qVhbCl","action","log","prototype","49170jPjrAj","bind","test","constructor","debu","toString","https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/desert_1k.hdr","info","1pkOGsC","TresPerspectiveCamera","error"];return(T=function(){return t})()}!function(t,n){const e=O,o=T();for(;;)try{if(744044===-parseInt(e(393))/1*(-parseInt(e(381))/2)+-parseInt(e(378))/3+-parseInt(e(412))/4*(-parseInt(e(379))/5)+-parseInt(e(411))/6*(-parseInt(e(399))/7)+parseInt(e(408))/8*(parseInt(e(402))/9)+-parseInt(e(385))/10*(-parseInt(e(414))/11)+-parseInt(e(396))/12*(parseInt(e(405))/13))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const B=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[O(380)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){B(this,(function(){const t=O,n=new RegExp(t(413)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=G("init");n[t(387)](o+"chain")&&e[t(387)](o+t(404))?G():o("0")}))()}();const q=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[O(380)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();q(void 0,(function(){const t=O,n=function(){let t;try{t=Function('return (function() {}.constructor("return this")( ));')()}catch(n){t=window}return t}(),e=n[t(397)]=n[t(397)]||{},o=[t(383),t(403),t(392),t(395),"exception",t(410),t(409)];for(let r=0;r<o.length;r++){const n=q.constructor[t(384)].bind(q),a=o[r],i=e[a]||n;n.__proto__=q[t(386)](q),n[t(390)]=i[t(390)][t(386)](i),e[a]=n}}))();const U=v(P(394),{position:[15,15,10],fov:45,near:.1,far:1e3},null,-1),V=p({__name:P(400),setup(t){const n=x({alpha:!0,toneMapping:a,windowSize:!0,clearColor:6710886}),e=x({enableDamping:!0,autoRotate:!1});return(t,o)=>{const r=O;return m(),y(g(l),_(M(n)),{default:w((()=>[U,b(g(c),_(M(e)),null,16),(m(),y(j,null,{default:w((()=>[b(H)])),_:1})),(m(),y(j,null,{default:w((()=>[b(g(z),{texture:r(391)})])),_:1}))])),_:1},16)}}});function G(t){function n(t){const e=O;if("string"==typeof t)return function(t){}[e(388)](e(398))[e(380)](e(401));1!==(""+t/t).length||t%20==0?function(){return!0}.constructor(e(389)+e(407))[e(406)](e(382)):function(){return!1}[e(388)](e(389)+e(407))[e(380)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{V as default};
