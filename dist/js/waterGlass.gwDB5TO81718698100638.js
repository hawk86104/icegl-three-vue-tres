import{T as t,r as n,d as e}from"./@tresjs.aawOCoPx1718698100638.js";import{Z as o,a5 as r}from"./three.erXpfL-r1718698100638.js";import{d as i,w as s,o as c,D as a,j as u,m as l,u as p,J as f,r as d,e as v,f as x,g as y,aj as m,ak as h,al as g}from"./@vue.CpOXM7bB1718698100638.js";import{a as b,b as w}from"./index.eYkSz4SJ1718698100638.js";import{P as z}from"./tweakpane.qqn77PB81718698100638.js";import"./@vueuse.TW6-TkVF1718698100638.js";import"./three-stdlib.Jy3o-bPq1718698100638.js";import"./@pmndrs.ZdH7ThqA1718698100638.js";import"./object-hash.SpRbwitp1718698100638.js";import"./@amap.TW6HTmRb1718698100638.js";import"./jszip.KspeudHJ1718698100638.js";const I=_;function _(t,n){const e=S();return(_=function(t,n){return e[t-=392]})(t,n)}!function(t,n){const e=_,o=S();for(;;)try{if(869981===-parseInt(e(400))/1+parseInt(e(416))/2+-parseInt(e(424))/3+-parseInt(e(430))/4+parseInt(e(437))/5*(-parseInt(e(420))/6)+parseInt(e(426))/7*(-parseInt(e(417))/8)+parseInt(e(413))/9)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const j=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[_(406)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){j(this,(function(){const t=_,n=new RegExp(t(434)),e=new RegExp(t(393),"i"),o=k("init");n.test(o+"chain")&&e[t(428)](o+t(414))?k():o("0")}))()}();const q=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,o}}();q(void 0,(function(){const t=_;let n;try{n=Function(t(436)+t(409)+");")()}catch(r){n=window}const e=n.console=n.console||{},o=[t(408),"warn",t(431),t(401),t(433),t(423),"trace"];for(let i=0;i<o[t(411)];i++){const n=q[t(435)][t(398)].bind(q),r=o[i],s=e[r]||n;n.__proto__=q[t(396)](q),n[t(392)]=s[t(392)][t(396)](s),e[r]=n}}))();const P=[I(410)],M=f(I(395),{args:[1,1,64,64]},null,-1);function S(){const t=["prototype","while (true) {}","1527992ZaEgas","error","debu","time","value","TresMesh","apply","Color","log",'{}.constructor("return this")( )',"rotation-x","length","MeshPhysicalMaterial","56198700mOyfJz","input","waterGlass","299988bRweqa","8zYPrHL","action","#fff","6bkVaAY","vertexShader","call","table","4113414xfPEkS","frequency","1777594wkpocX","stateObject","test","gger","4427644vjkPWx","info","counter","exception","function *\\( *\\)","constructor","return (function() ","6321650kgJQpX","string","toString","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","color","TresPlaneGeometry","bind","amplitude"];return(S=function(){return t})()}const T=i({__name:I(415),props:{color:{default:I(419)},amplitude:{default:.066},frequency:{default:5}},setup(e){const i=I,f=e,d={time:{type:"f",value:.1},amplitude:{type:"f",value:f[i(397)]},speed:{type:"f",value:.277},frequency:{type:"f",value:f[i(425)]}},v={side:o,color:new(r[i(407)])(f[i(394)]),metalness:.087,roughness:0,transmission:1,thickness:1.5,refractionRatio:1.5},{onLoop:x}=n();return x((({delta:t})=>{const n=i;d[n(403)][n(404)]+=t})),s((()=>f),(()=>{const t=i;v[t(394)]=new(r[t(407)])(f[t(394)]),d.amplitude.value=f[t(397)],d.frequency[t(404)]=f.frequency}),{deep:!0}),(n,e)=>{const o=i;return c(),a(o(405),{"rotation-x":-Math.PI/2,"position-y":.1},[M,u(p(t),l(v,{baseMaterial:r[o(412)],vertexShader:p("uniform float time;\nuniform float amplitude;\nuniform float speed;\nuniform float frequency;\n\nvec3 mod289(vec3 x){\n\treturn x-floor(x*(1./289.))*289.;\n}\n\nvec4 mod289(vec4 x){\n\treturn x-floor(x*(1./289.))*289.;\n}\n\nvec4 permute(vec4 x){\n\treturn mod289(((x*34.)+1.)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r){\n\treturn 1.79284291400159-.85373472095314*r;\n}\n\nfloat noise(vec3 v){\n\tconst vec2 C=vec2(1./6.,1./3.);\n\tconst vec4 D=vec4(0.,.5,1.,2.);\n\t\n\t\n\tvec3 i=floor(v+dot(v,C.yyy));\n\tvec3 x0=v-i+dot(i,C.xxx);\n\t\n\t\n\tvec3 g=step(x0.yzx,x0.xyz);\n\tvec3 l=1.-g;\n\tvec3 i1=min(g.xyz,l.zxy);\n\tvec3 i2=max(g.xyz,l.zxy);\n\t\n\tvec3 x1=x0-i1+C.xxx;\n\tvec3 x2=x0-i2+C.yyy;\n\tvec3 x3=x0-D.yyy;\n\t\n\t\n\ti=mod289(i);\n\tvec4 p=permute(permute(permute(\n\t\t\t\ti.z+vec4(0.,i1.z,i2.z,1.))\n\t\t\t\t+i.y+vec4(0.,i1.y,i2.y,1.))\n\t\t\t\t+i.x+vec4(0.,i1.x,i2.x,1.));\n\t\t\t\t\n\t\t\t\tfloat n_=.142857142857;\n\t\t\t\tvec3 ns=n_*D.wyz-D.xzx;\n\t\t\t\t\n\t\t\t\tvec4 j=p-49.*floor(p*ns.z*ns.z);\n\t\t\t\t\n\t\t\t\tvec4 x_=floor(j*ns.z);\n\t\t\t\tvec4 y_=floor(j-7.*x_);\n\t\t\t\t\n\t\t\t\tvec4 x=x_*ns.x+ns.yyyy;\n\t\t\t\tvec4 y=y_*ns.x+ns.yyyy;\n\t\t\t\tvec4 h=1.-abs(x)-abs(y);\n\t\t\t\t\n\t\t\t\tvec4 b0=vec4(x.xy,y.xy);\n\t\t\t\tvec4 b1=vec4(x.zw,y.zw);\n\t\t\t\t\n\t\t\t\tvec4 s0=floor(b0)*2.+1.;\n\t\t\t\tvec4 s1=floor(b1)*2.+1.;\n\t\t\t\tvec4 sh=-step(h,vec4(0.));\n\t\t\t\t\n\t\t\t\tvec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;\n\t\t\t\tvec4 a1=b1.xzyw+s1.xzyw*sh.zzww;\n\t\t\t\t\n\t\t\t\tvec3 p0=vec3(a0.xy,h.x);\n\t\t\t\tvec3 p1=vec3(a0.zw,h.y);\n\t\t\t\tvec3 p2=vec3(a1.xy,h.z);\n\t\t\t\tvec3 p3=vec3(a1.zw,h.w);\n\t\t\t\t\n\t\t\t\t\n\t\t\t\tvec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));\n\t\t\t\tp0*=norm.x;\n\t\t\t\tp1*=norm.y;\n\t\t\t\tp2*=norm.z;\n\t\t\t\tp3*=norm.w;\n\t\t\t\t\n\t\t\t\t\n\t\t\t\tvec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);\n\t\t\t\tm=m*m;\n\t\t\t\treturn 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),\n\t\t\t\tdot(p2,x2),dot(p3,x3)));\n\t\t\t}\n\t\t\t\n\t\t\t\n\t\t\tfloat displace(vec3 point){\n\t\t\t\treturn noise(vec3(point.x*frequency,point.y*frequency,time*speed))*amplitude;\n\t\t\t}\n\t\t\t\n\t\t\tvec3 orthogonal(vec3 v){\n\t\t\t\treturn normalize(abs(v.x)>abs(v.z)\n\t\t\t\t?vec3(-v.y,v.x,0.)\n\t\t\t\t:vec3(0.,-v.z,v.y));\n\t\t\t}\n\t\t\t\n\t\t\tvoid main(){\n\t\t\t\tvec3 displacedPosition=position+normal*displace(position);\n\t\t\t\t\n\t\t\t\tfloat offset=.0001;\n\t\t\t\tvec3 tangent=orthogonal(normal);\n\t\t\t\tvec3 bitangent=normalize(cross(normal,tangent));\n\t\t\t\tvec3 neighbour1=position+tangent*offset;\n\t\t\t\tvec3 neighbour2=position+bitangent*offset;\n\t\t\t\tvec3 displacedNeighbour1=neighbour1+normal*displace(neighbour1);\n\t\t\t\tvec3 displacedNeighbour2=neighbour2+normal*displace(neighbour2);\n\t\t\t\t\n\t\t\t\tvec3 displacedTangent=displacedNeighbour1-displacedPosition;\n\t\t\t\tvec3 displacedBitangent=displacedNeighbour2-displacedPosition;\n\t\t\t\t\n\t\t\t\tvec3 displacedNormal=normalize(cross(displacedTangent,displacedBitangent));\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\tcsm_Normal=normalMatrix*displacedNormal;\n\t\t\t\t\n\t\t\t\t\n\t\t\t\tcsm_Position=displacedPosition;\n\t\t\t}"),uniforms:d,silent:""}),null,16,["baseMaterial",o(421)])],8,P)}}});function k(t){function n(t){const e=_;if(typeof t===e(438))return function(t){}[e(435)](e(399)).apply(e(432));1!==(""+t/t)[e(411)]||t%20==0?function(){return!0}[e(435)](e(402)+e(429))[e(422)](e(418)):function(){return!1}[e(435)](e(402)+e(429))[e(406)](e(427)),n(++t)}try{if(t)return n;n(0)}catch(e){}}const N=L;!function(t,n){const e=L,o=D();for(;;)try{if(191957===parseInt(e(253))/1+parseInt(e(252))/2*(parseInt(e(238))/3)+parseInt(e(212))/4*(parseInt(e(242))/5)+-parseInt(e(232))/6*(-parseInt(e(258))/7)+-parseInt(e(229))/8+-parseInt(e(228))/9*(-parseInt(e(234))/10)+-parseInt(e(247))/11*(parseInt(e(245))/12))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const C=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[L(243)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){C(this,(function(){const t=L,n=new RegExp(t(248)),e=new RegExp(t(227),"i"),o=G(t(211));n[t(241)](o+t(240))&&e.test(o+t(207))?G():o("0")}))()}();const R=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[L(243)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();R(void 0,(function(){const t=L;let n;try{n=Function(t(250)+t(209)+");")()}catch(r){n=window}const e=n[t(237)]=n[t(237)]||{},o=[t(208),t(235),t(221),t(251),"exception",t(220),t(246)];for(let i=0;i<o.length;i++){const n=R[t(217)][t(230)][t(233)](R),r=o[i],s=e[r]||n;n[t(257)]=R[t(233)](R),n.toString=s[t(256)][t(233)](s),e[r]=n}}))();const B=f("TresPerspectiveCamera",{position:[1,1,1]},null,-1),Z=f(N(236),{intensity:1},null,-1),A=f(N(215),{args:[1,10]},null,-1);function D(){const t=["info","frequency","NoToneMapping","circle","length","rotation-y","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","104256lQtsSh","1818152wiLvUs","prototype","BasicShadowMap","113754ZRfIjq","bind","20NJOaFx","warn","TresAmbientLight","console","99219besykz","rotation-x","chain","test","407210FqgzpB","apply","color","92436xuVTWt","trace","583wTNJqI","function *\\( *\\)","debu","return (function() ","error","16DQPuSN","338931lUKcIh","string","SRGBColorSpace","toString","__proto__","14nXhqdA","stateObject","while (true) {}","input","log",'{}.constructor("return this")( )',"addBinding","init","8VTqRZX","counter","action","TresGridHelper","gger","constructor","amplitude","TresCanvas","table"];return(D=function(){return t})()}const E=i({__name:"waterGlass",setup(t){const n=N,o={clearColor:"#222",shadows:!0,alpha:!1,shadowMapType:r[n(231)],outputColorSpace:r[n(255)],toneMapping:r[n(223)],useLegacyLights:!0,antialias:!0,logarithmicDepthBuffer:!0},i=d({color:"#b367ff",amplitude:.066,frequency:5}),s=new z({title:"参数",expanded:!0});return s.addBinding(i,n(244),{label:"颜色"}),s[n(210)](i,n(218),{label:n(218),min:.01,max:.2,step:.01}),s[n(210)](i,n(222),{label:n(222),min:.1,max:10,step:.1}),(t,r)=>{const s=n,a=v(s(219));return c(),x(a,l(o,{"window-size":""}),{default:y((()=>[B,Z,u(T,m(h(i)),null,16),u(p(e)),A,(c(),x(g,null,{default:y((()=>[u(p(b),{intensity:16,resolution:256,background:"",blur:.6},{default:y((()=>[u(p(w),{intensity:10,form:s(224),"rotation-x":Math.PI/2,position:[2,4,0],scale:[1,5,0]},null,8,["rotation-x"]),u(p(w),{intensity:10,form:"circle","rotation-x":Math.PI/2,position:[-6,4,0],scale:[1,5,0]},null,8,[s(239)]),u(p(w),{intensity:5,"rotation-y":-Math.PI/2,position:[-1,0,0],scale:[10,.2,1]},null,8,[s(226)]),u(p(w),{intensity:5,"rotation-y":-Math.PI/2,position:[1,0,0],scale:[10,.2,1]},null,8,[s(226)])])),_:1})])),_:1}))])),_:1},16)}}});function L(t,n){const e=D();return(L=function(t,n){return e[t-=205]})(t,n)}function G(t){function n(t){const e=L;if(typeof t===e(254))return function(t){}[e(217)](e(206))[e(243)](e(213));1!==(""+t/t)[e(225)]||t%20==0?function(){return!0}[e(217)](e(249)+e(216)).call(e(214)):function(){return!1}[e(217)](e(249)+e(216))[e(243)](e(205)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{E as default};
