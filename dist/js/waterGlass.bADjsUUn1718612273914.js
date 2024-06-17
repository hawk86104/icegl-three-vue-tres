import{T as t,r as n,d as e}from"./@tresjs.W42D3qe_1718612273914.js";import{a5 as o,bR as r,bS as i}from"./three.HHcT7YAr1718612273914.js";import{d as c,w as s,o as a,D as u,j as l,m as p,u as f,J as d,r as v,e as x,f as y,g as m,aj as h,ak as g,al as b}from"./@vue.CpOXM7bB1718612273914.js";import{a as w,b as z}from"./index.gLXaRzp41718612273914.js";import{P as I}from"./tweakpane.qqn77PB81718612273914.js";import"./@vueuse.YjRg4c7n1718612273914.js";import"./three-stdlib.eIANyClj1718612273914.js";import"./@pmndrs.GoGkK4yp1718612273914.js";import"./object-hash.NQGxxEoE1718612273914.js";import"./@amap.zA6BxCQR1718612273914.js";import"./jszip.ceBEBY8K1718612273914.js";const _=j;function j(t,n){const e=q();return(j=function(t,n){return e[t-=347]})(t,n)}!function(t,n){const e=j,o=q();for(;;)try{if(838913===parseInt(e(367))/1*(-parseInt(e(359))/2)+-parseInt(e(395))/3*(parseInt(e(363))/4)+-parseInt(e(358))/5+parseInt(e(370))/6+parseInt(e(368))/7+-parseInt(e(352))/8*(parseInt(e(350))/9)+parseInt(e(347))/10*(parseInt(e(357))/11))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const P=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[j(356)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){P(this,(function(){const t=j,n=new RegExp("function *\\( *\\)"),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=R(t(365));n.test(o+"chain")&&e[t(380)](o+t(369))?R():o("0")}))()}();const S=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[j(356)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();S(void 0,(function(){const t=j,n=function(){const t=j;let n;try{n=Function(t(361)+t(360)+");")()}catch(e){n=window}return n}(),e=n[t(385)]=n[t(385)]||{},o=["log",t(387),t(364),t(376),t(348),t(391),t(355)];for(let r=0;r<o[t(374)];r++){const n=S[t(353)][t(366)][t(390)](S),i=o[r],c=e[i]||n;n[t(382)]=S.bind(S),n.toString=c[t(389)][t(390)](c),e[i]=n}}))();const C=[_(388)],M=d(_(393),{args:[1,1,64,64]},null,-1),T=c({__name:_(386),props:{color:{default:_(349)},amplitude:{default:.066},frequency:{default:5}},setup(e){const r=_,i=e,c={time:{type:"f",value:.1},amplitude:{type:"f",value:i[r(354)]},speed:{type:"f",value:.277},frequency:{type:"f",value:i[r(392)]}},d={side:o[r(377)],color:new(o[r(381)])(i[r(379)]),metalness:.087,roughness:0,transmission:1,thickness:1.5,refractionRatio:1.5},{onLoop:v}=n();return v((({delta:t})=>{const n=r;c[n(351)][n(378)]+=t})),s((()=>i),(()=>{const t=r;d.color=new(o[t(381)])(i[t(379)]),c[t(354)][t(378)]=i[t(354)],c[t(392)][t(378)]=i[t(392)]}),{deep:!0}),(n,e)=>{const i=r;return a(),u(i(383),{"rotation-x":-Math.PI/2,"position-y":.1},[M,l(f(t),p(d,{baseMaterial:o[i(394)],vertexShader:f("uniform float time;\nuniform float amplitude;\nuniform float speed;\nuniform float frequency;\n\nvec3 mod289(vec3 x){\n\treturn x-floor(x*(1./289.))*289.;\n}\n\nvec4 mod289(vec4 x){\n\treturn x-floor(x*(1./289.))*289.;\n}\n\nvec4 permute(vec4 x){\n\treturn mod289(((x*34.)+1.)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r){\n\treturn 1.79284291400159-.85373472095314*r;\n}\n\nfloat noise(vec3 v){\n\tconst vec2 C=vec2(1./6.,1./3.);\n\tconst vec4 D=vec4(0.,.5,1.,2.);\n\t\n\t\n\tvec3 i=floor(v+dot(v,C.yyy));\n\tvec3 x0=v-i+dot(i,C.xxx);\n\t\n\t\n\tvec3 g=step(x0.yzx,x0.xyz);\n\tvec3 l=1.-g;\n\tvec3 i1=min(g.xyz,l.zxy);\n\tvec3 i2=max(g.xyz,l.zxy);\n\t\n\tvec3 x1=x0-i1+C.xxx;\n\tvec3 x2=x0-i2+C.yyy;\n\tvec3 x3=x0-D.yyy;\n\t\n\t\n\ti=mod289(i);\n\tvec4 p=permute(permute(permute(\n\t\t\t\ti.z+vec4(0.,i1.z,i2.z,1.))\n\t\t\t\t+i.y+vec4(0.,i1.y,i2.y,1.))\n\t\t\t\t+i.x+vec4(0.,i1.x,i2.x,1.));\n\t\t\t\t\n\t\t\t\tfloat n_=.142857142857;\n\t\t\t\tvec3 ns=n_*D.wyz-D.xzx;\n\t\t\t\t\n\t\t\t\tvec4 j=p-49.*floor(p*ns.z*ns.z);\n\t\t\t\t\n\t\t\t\tvec4 x_=floor(j*ns.z);\n\t\t\t\tvec4 y_=floor(j-7.*x_);\n\t\t\t\t\n\t\t\t\tvec4 x=x_*ns.x+ns.yyyy;\n\t\t\t\tvec4 y=y_*ns.x+ns.yyyy;\n\t\t\t\tvec4 h=1.-abs(x)-abs(y);\n\t\t\t\t\n\t\t\t\tvec4 b0=vec4(x.xy,y.xy);\n\t\t\t\tvec4 b1=vec4(x.zw,y.zw);\n\t\t\t\t\n\t\t\t\tvec4 s0=floor(b0)*2.+1.;\n\t\t\t\tvec4 s1=floor(b1)*2.+1.;\n\t\t\t\tvec4 sh=-step(h,vec4(0.));\n\t\t\t\t\n\t\t\t\tvec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;\n\t\t\t\tvec4 a1=b1.xzyw+s1.xzyw*sh.zzww;\n\t\t\t\t\n\t\t\t\tvec3 p0=vec3(a0.xy,h.x);\n\t\t\t\tvec3 p1=vec3(a0.zw,h.y);\n\t\t\t\tvec3 p2=vec3(a1.xy,h.z);\n\t\t\t\tvec3 p3=vec3(a1.zw,h.w);\n\t\t\t\t\n\t\t\t\t\n\t\t\t\tvec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));\n\t\t\t\tp0*=norm.x;\n\t\t\t\tp1*=norm.y;\n\t\t\t\tp2*=norm.z;\n\t\t\t\tp3*=norm.w;\n\t\t\t\t\n\t\t\t\t\n\t\t\t\tvec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);\n\t\t\t\tm=m*m;\n\t\t\t\treturn 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),\n\t\t\t\tdot(p2,x2),dot(p3,x3)));\n\t\t\t}\n\t\t\t\n\t\t\t\n\t\t\tfloat displace(vec3 point){\n\t\t\t\treturn noise(vec3(point.x*frequency,point.y*frequency,time*speed))*amplitude;\n\t\t\t}\n\t\t\t\n\t\t\tvec3 orthogonal(vec3 v){\n\t\t\t\treturn normalize(abs(v.x)>abs(v.z)\n\t\t\t\t?vec3(-v.y,v.x,0.)\n\t\t\t\t:vec3(0.,-v.z,v.y));\n\t\t\t}\n\t\t\t\n\t\t\tvoid main(){\n\t\t\t\tvec3 displacedPosition=position+normal*displace(position);\n\t\t\t\t\n\t\t\t\tfloat offset=.0001;\n\t\t\t\tvec3 tangent=orthogonal(normal);\n\t\t\t\tvec3 bitangent=normalize(cross(normal,tangent));\n\t\t\t\tvec3 neighbour1=position+tangent*offset;\n\t\t\t\tvec3 neighbour2=position+bitangent*offset;\n\t\t\t\tvec3 displacedNeighbour1=neighbour1+normal*displace(neighbour1);\n\t\t\t\tvec3 displacedNeighbour2=neighbour2+normal*displace(neighbour2);\n\t\t\t\t\n\t\t\t\tvec3 displacedTangent=displacedNeighbour1-displacedPosition;\n\t\t\t\tvec3 displacedBitangent=displacedNeighbour2-displacedPosition;\n\t\t\t\t\n\t\t\t\tvec3 displacedNormal=normalize(cross(displacedTangent,displacedBitangent));\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n\t\t\t\tcsm_Normal=normalMatrix*displacedNormal;\n\t\t\t\t\n\t\t\t\t\n\t\t\t\tcsm_Position=displacedPosition;\n\t\t\t}"),uniforms:c,silent:""}),null,16,[i(372),i(373)])],8,C)}}});function q(){const t=["__proto__","TresMesh","string","console","waterGlass","warn","rotation-x","toString","bind","table","frequency","TresPlaneGeometry","MeshPhysicalMaterial","2134578Sjhywi","4730tRWMSW","exception","#fff","166149PQmixX","time","552WtBbKm","constructor","amplitude","trace","apply","61336hshmts","5126390zbDCoG","2TjYEtl",'{}.constructor("return this")( )',"return (function() ","call","4jwEICd","info","init","prototype","719839zNLZQX","7909937KAHzlv","input","4811556LpECPv","gger","baseMaterial","vertexShader","length","counter","error","DoubleSide","value","color","test","Color"];return(q=function(){return t})()}function R(t){function n(t){const e=j;if(typeof t===e(384))return function(t){}[e(353)]("while (true) {}")[e(356)](e(375));1!==(""+t/t)[e(374)]||t%20==0?function(){return!0}.constructor("debu"+e(371))[e(362)]("action"):function(){return!1}[e(353)]("debu"+e(371)).apply("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}const N=G;!function(t,n){const e=G,o=D();for(;;)try{if(914944===parseInt(e(265))/1*(parseInt(e(252))/2)+-parseInt(e(238))/3+-parseInt(e(242))/4+parseInt(e(268))/5+parseInt(e(254))/6*(parseInt(e(262))/7)+parseInt(e(255))/8*(-parseInt(e(230))/9)+parseInt(e(225))/10*(parseInt(e(253))/11))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const k=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[G(226)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function D(){const t=["prototype","constructor","TresCanvas","27KFAqQq","test","bind","#222","stateObject","input","frequency","trace","3350985FMPJCn","addBinding","__proto__","init","2736360CYdJIk","toString",'{}.constructor("return this")( )',"warn","chain","return (function() ","exception","color","while (true) {}","debu","404902tcThKI","979RbIXSi","12930dHPpuw","3955960epmSPx","string","circle","TresPerspectiveCamera","TresAmbientLight","length","waterGlass","3199FONWVP","console","log","1wrgtLj","gger","TresGridHelper","236410JSZTYn","counter","amplitude","error","SRGBColorSpace","333140XoojJR","apply"];return(D=function(){return t})()}!function(){k(this,(function(){const t=G,n=new RegExp("function *\\( *\\)"),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=F(t(241));n.test(o+t(246))&&e[t(231)](o+t(235))?F():o("0")}))()}();const A=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[G(226)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();A(void 0,(function(){const t=G;let n;try{n=Function(t(247)+t(244)+");")()}catch(r){n=window}const e=n.console=n[t(263)]||{},o=[t(264),t(245),"info",t(223),t(248),"table",t(237)];for(let i=0;i<o.length;i++){const n=A.constructor[t(227)][t(232)](A),r=o[i],c=e[r]||n;n[t(240)]=A.bind(A),n[t(243)]=c.toString[t(232)](c),e[r]=n}}))();const B=d(N(258),{position:[1,1,1]},null,-1),E=d(N(259),{intensity:1},null,-1),L=d(N(267),{args:[1,10]},null,-1);function G(t,n){const e=D();return(G=function(t,n){return e[t-=222]})(t,n)}const Z=c({__name:N(261),setup(t){const n=N,c={clearColor:n(233),shadows:!0,alpha:!1,shadowMapType:r,outputColorSpace:o[n(224)],toneMapping:i,useLegacyLights:!0,antialias:!0,logarithmicDepthBuffer:!0},s=v({color:"#b367ff",amplitude:.066,frequency:5}),u=new I({title:"参数",expanded:!0});return u[n(239)](s,n(249),{label:"颜色"}),u.addBinding(s,n(222),{label:n(222),min:.01,max:.2,step:.01}),u[n(239)](s,n(236),{label:n(236),min:.1,max:10,step:.1}),(t,o)=>{const r=n,i=x(r(229));return a(),y(i,p(c,{"window-size":""}),{default:m((()=>[B,E,l(T,h(g(s)),null,16),l(f(e)),L,(a(),y(b,null,{default:m((()=>[l(f(w),{intensity:16,resolution:256,background:"",blur:.6},{default:m((()=>[l(f(z),{intensity:10,form:"circle","rotation-x":Math.PI/2,position:[2,4,0],scale:[1,5,0]},null,8,["rotation-x"]),l(f(z),{intensity:10,form:r(257),"rotation-x":Math.PI/2,position:[-6,4,0],scale:[1,5,0]},null,8,["rotation-x"]),l(f(z),{intensity:5,"rotation-y":-Math.PI/2,position:[-1,0,0],scale:[10,.2,1]},null,8,["rotation-y"]),l(f(z),{intensity:5,"rotation-y":-Math.PI/2,position:[1,0,0],scale:[10,.2,1]},null,8,["rotation-y"])])),_:1})])),_:1}))])),_:1},16)}}});function F(t){function n(t){const e=G;if(typeof t===e(256))return function(t){}[e(228)](e(250)).apply(e(269));1!==(""+t/t)[e(260)]||t%20==0?function(){return!0}[e(228)](e(251)+e(266)).call("action"):function(){return!1}[e(228)](e(251)+e(266))[e(226)](e(234)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{Z as default};
