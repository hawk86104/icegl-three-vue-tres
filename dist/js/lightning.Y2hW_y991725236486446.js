import{p as n,$ as t,d as o}from"./@tresjs.DDzpLB7Q1725236486446.js";import{j as e,bX as i,bV as r,c5 as a}from"./three.0IuNGJsA1725236486446.js";import{d as c,e as u,o as s,f,g as l,J as p,j as v,u as d,al as h,m as g}from"./@vue.9bHx4gg21725236486446.js";import"./tweakpane.yHWGBmom1725236486446.js";import"./@vueuse.XXpXaOwX1725236486446.js";const x=m;function m(n,t){const o=b();return(m=function(n,t){return o[n-=369]})(n,t)}!function(n,t){const o=m,e=b();for(;;)try{if(122e3===parseInt(o(375))/1*(-parseInt(o(374))/2)+-parseInt(o(383))/3*(parseInt(o(404))/4)+parseInt(o(408))/5*(parseInt(o(370))/6)+parseInt(o(401))/7+parseInt(o(390))/8+-parseInt(o(371))/9*(parseInt(o(397))/10)+parseInt(o(394))/11*(-parseInt(o(369))/12))break;e.push(e.shift())}catch(i){e.push(e.shift())}}();const w=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[m(382)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();!function(){w(this,(function(){const n=m,t=new RegExp("function *\\( *\\)"),o=new RegExp(n(381),"i"),e=k(n(387));t[n(388)](e+n(411))&&o[n(388)](e+n(406))?k():e("0")}))()}();const y=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o.apply(t,arguments);return o=null,n}}:function(){};return n=!1,e}}();function b(){const n=["debu","length","bind","uniforms","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","apply","1011KIKruI",'{}.constructor("return this")( )',"counter","table","init","test","console","147144UTOrQW","error","innerWidth","string","2629DrQSWi","return (function() ","lightEffect","10iNOPwZ","iTime","constructor","addPass","840980wLVnAx","call","toString","424IppDLV","stateObject","input","render","10QoYUso","exception","innerHeight","chain","1356oqnGjN","702510atjLCD","196245QpekbL","gger","prototype","2zDDQEv","166169OdourT","value"];return(b=function(){return n})()}y(void 0,(function(){const n=m;let t;try{t=Function(n(395)+n(384)+");")()}catch(i){t=window}const o=t[n(389)]=t.console||{},e=["log","warn","info",n(391),n(409),n(386),"trace"];for(let r=0;r<e[n(378)];r++){const t=y[n(399)][n(373)][n(379)](y),i=e[r],a=o[i]||t;t.__proto__=y[n(379)](y),t.toString=a[n(403)][n(379)](a),o[i]=t}}))();const I=c({__name:x(396),setup(o){const c=x,{camera:u,renderer:s,scene:f,sizes:l}=n(),{onLoop:p,onAfterLoop:v}=t(),d={uniforms:{iResolution:{type:"v2",value:new e(window[c(392)],window[c(410)])},iTime:{type:"f",value:null},tDiffuse:{value:null}},vertexShader:"varying vec2 vUv;\nvoid main(){\n\tvec4 mvPosition=modelViewMatrix*vec4(position,1.);\n\tgl_Position=projectionMatrix*mvPosition;\n\tvUv=uv;\n}",fragmentShader:"uniform vec2 iResolution;\nuniform float iTime;\nvarying vec2 vUv;\nuniform sampler2D tDiffuse;\nfloat rand(float x)\n{\n\treturn fract(sin(x)*75154.32912);\n}\n\nfloat rand3d(vec3 x)\n{\n\treturn fract(375.10297*sin(dot(x,vec3(103.0139,227.0595,31.05914))));\n}\n\nfloat noise(float x)\n{\n\tfloat i=floor(x);\n\tfloat a=rand(i),b=rand(i+1.);\n\tfloat f=x-i;\n\treturn mix(a,b,f);\n}\n\nfloat perlin(float x)\n{\n\tfloat r=0.,s=1.,w=1.;\n\tfor(int i=0;i<6;i++){\n\t\ts*=2.;\n\t\tw*=.5;\n\t\tr+=w*noise(s*x);\n\t}\n\treturn r;\n}\n\nfloat noise3d(vec3 x)\n{\n\tvec3 i=floor(x);\n\tfloat i000=rand3d(i+vec3(0.,0.,0.)),i001=rand3d(i+vec3(0.,0.,1.));\n\tfloat i010=rand3d(i+vec3(0.,1.,0.)),i011=rand3d(i+vec3(0.,1.,1.));\n\tfloat i100=rand3d(i+vec3(1.,0.,0.)),i101=rand3d(i+vec3(1.,0.,1.));\n\tfloat i110=rand3d(i+vec3(1.,1.,0.)),i111=rand3d(i+vec3(1.,1.,1.));\n\tvec3 f=x-i;\n\treturn mix(mix(mix(i000,i001,f.z),mix(i010,i011,f.z),f.y),\n\tmix(mix(i100,i101,f.z),mix(i110,i111,f.z),f.y),f.x);\n}\n\nfloat perlin3d(vec3 x)\n{\n\tfloat r=0.;\n\tfloat w=1.,s=1.;\n\tfor(int i=0;i<5;i++){\n\t\tw*=.5;\n\t\ts*=2.;\n\t\tr+=w*noise3d(s*x);\n\t}\n\treturn r;\n}\n\nfloat f(float y)\n{\n\tfloat w=.4;// width of strike\n\treturn w*(perlin(2.*y)-.5);\n}\n\nfloat plot(vec2 p,float d,bool thicker)\n{\n\tif(thicker)d+=5.*abs(f(p.y+.001)-f(p.y));\n\treturn smoothstep(d,0.,abs(f(p.y)-p.x));\n}\n\nfloat cloud(vec2 uv,float speed,float scale,float cover)\n{\n\tfloat c=perlin3d(vec3(uv*scale,iTime*speed*2.));\n\treturn max(0.,c-(1.-cover));\n}\n\nfloat mountain(vec2 uv,float scale,float offset,float h1,float h2)\n{\n\tfloat h=h1+perlin(scale*uv.x+offset)*(h2-h1);\n\treturn smoothstep(h,h+.01,uv.y);\n}\n\nvec3 render(vec2 uv)\n{\n\tfloat x=iTime+.1;\n\t\n\tfloat m=.25;// max duration of strike\n\tfloat i=floor(x/m);\n\tfloat f=x/m-i;\n\tfloat k=.4;// frequency of strikes\n\tfloat n=noise(i);\n\tfloat t=ceil(n-k);// occurrence\n\tfloat d=max(0.,n-k)/(1.-k);// duration\n\tfloat o=ceil(t-f-(1.-d));// occurrence with duration\n\tfloat gt=.1;// glare duration\n\tfloat go=ceil(t-f-(1.-gt));// glare occurrence\n\t\n\tfloat lightning=0.;\n\tfloat light=0.;\n\tfloat glare=0.;\n\t\n\tif(o==1.){\n\t\tvec2 uv2=uv;\n\t\tuv2.y+=i*2.;// select type of lightning\n\t\tfloat p=(noise(i+10.)-.5)*2.;// position of lightning\n\t\tuv2.x-=p;\n\t\t\n\t\tfloat strike=plot(uv2,.01,true);\n\t\tfloat glow=plot(uv2,.04,false);\n\t\tfloat glow2=plot(uv2,1.5,false);\n\t\t\n\t\tlightning=strike*.4+glow*.15;\n\t\t\n\t\tfloat h=noise(i+5.);// height\n\t\tlightning*=smoothstep(h,h+.05,uv.y+perlin(1.2*uv.x+4.*h)*.03);\n\t\tlightning+=glow2*.3;\n\t\tlight=smoothstep(5.,0.,abs(uv.x-p));\n\t\tglare=go*light;\n\t}\n\t\n\tvec3 clouds=\n\tvec3(.5,.7,1.)*mix(.6,.9,cloud(uv,.2,.1,1.))+\n\tvec3(.7,.8,1.)*.6*cloud(uv*vec2(.5,1.),.06,.8,.8)+\n\tvec3(.9,.9,1.)*.3*cloud(uv*vec2(.1,1.),.08,5.5,.6)+\n\tvec3(1.,1.,1.)*.4*cloud(uv*vec2(.1,1.),.07,10.,.5);\n\t\n\tfloat horizon=mountain(uv,.8,9.,.3,.6);\n\tvec3 terrain=mix(vec3(.25,.3,.3)*.5,1.5*vec3(.15,.2,.3),\n\t1.-(1.-mountain(uv,.8,3.,.2,.4))*.5-\n\t(1.-mountain(uv,.8,17.5,.05,.25))*.5);\n\t\n\tvec3 background=mix(terrain,clouds,horizon);\n\tbackground*=(.2+light*.5);\n\tvec4 previousPassColor=texture2D(tDiffuse,vUv);\n\treturn vec3(background+lightning+previousPassColor.xyz);\n}\n\nvoid main()\n{\n\tvec2 uv=vUv;\n\tuv.x=2.*uv.x-1.;\n\tuv.x*=iResolution.x/iResolution.y;\n\t\n\tgl_FragColor=vec4(render(uv),1.);\n}"},h=new i(s[c(376)]);h[c(400)](new r(f[c(376)],u.value));const g=new a(d);return h.addPass(g),p((({elapsed:n})=>{const t=c;g[t(380)][t(398)][t(376)]=.3*n})),v((()=>{h[c(407)]()})),(n,t)=>null}});function k(n){function t(n){const o=m;if(typeof n===o(393))return function(n){}.constructor("while (true) {}").apply(o(385));1!==(""+n/n)[o(378)]||n%20==0?function(){return!0}[o(399)](o(377)+o(372))[o(402)]("action"):function(){return!1}[o(399)]("debu"+o(372)).apply(o(405)),t(++n)}try{if(n)return t;t(0)}catch(o){}}function _(n,t){const o=z();return(_=function(n,t){return o[n-=464]})(n,t)}const j=_;function z(){const n=["TresDirectionalLight","2637978xgFabN","return (function() ","call","3901108ajskAY","debu","#ffffff","test","__proto__","764652WNEPjY","init","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","apply","exception","lightning","string","log","red","while (true) {}","stateObject","2167197yxicGH","info","chain","warn","function *\\( *\\)","199720xFbiib","toString","constructor","gger","trace","TresAmbientLight","#000000","144DTnICb","error","TresCanvas","6DlZtrV","TresPerspectiveCamera",'{}.constructor("return this")( )',"length","console","2218440oevGNc","table","5xsxcXg","466068GeUWiM","counter"];return(z=function(){return n})()}!function(n,t){const o=_,e=z();for(;;)try{if(546822===parseInt(o(478))/1+parseInt(o(489))/2+-parseInt(o(500))/3+-parseInt(o(484))/4*(-parseInt(o(477))/5)+-parseInt(o(470))/6*(parseInt(o(481))/7)+-parseInt(o(505))/8*(parseInt(o(467))/9)+parseInt(o(475))/10)break;e.push(e.shift())}catch(i){e.push(e.shift())}}();const D=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[_(492)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();!function(){D(this,(function(){const n=_,t=new RegExp(n(504)),o=new RegExp(n(491),"i"),e=A(n(490));t[n(487)](e+n(502))&&o[n(487)](e+"input")?A():e("0")}))()}();const T=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[_(492)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();T(void 0,(function(){const n=_,t=function(){const n=_;let t;try{t=Function(n(482)+n(472)+");")()}catch(o){t=window}return t}(),o=t[n(474)]=t[n(474)]||{},e=[n(496),n(503),n(501),n(468),n(493),n(476),n(464)];for(let i=0;i<e[n(473)];i++){const t=T[n(507)].prototype.bind(T),r=e[i],a=o[r]||t;t[n(488)]=T.bind(T),t[n(506)]=a[n(506)].bind(a),o[r]=t}}))();const L={ref:"perspectiveCameraRef",position:[600,750,-1221],fov:45,near:1,far:1e4},P=p(j(465),{color:j(486)},null,-1),C=p(j(480),{position:[400,400,400],intensity:1,color:j(497)},null,-1),R=c({__name:j(494),setup(n){const t=j,e={clearColor:t(466),shadows:!0,alpha:!1,useLegacyLights:!0};return(n,i)=>{const r=t,a=u(r(469));return s(),f(a,g(e,{"window-size":""}),{default:l((()=>[p(r(471),L,null,512),v(d(o)),P,C,(s(),f(h,null,{default:l((()=>[v(I)])),_:1}))])),_:1},16)}}});function A(n){function t(n){const o=_;if(typeof n===o(495))return function(n){}[o(507)](o(498))[o(492)](o(479));1!==(""+n/n)[o(473)]||n%20==0?function(){return!0}[o(507)](o(485)+"gger")[o(483)]("action"):function(){return!1}[o(507)](o(485)+o(508)).apply(o(499)),t(++n)}try{if(n)return t;t(0)}catch(o){}}export{R as default};
