import{$ as t,d as n}from"./@tresjs.DDzpLB7Q1725236486446.js";import{Z as e,j as o}from"./three.0IuNGJsA1725236486446.js";import{d as r,a1 as i,o as c,D as s,J as a,aj as u,ak as f,e as p,f as l,g as m,j as v,u as x,m as d}from"./@vue.9bHx4gg21725236486446.js";import"./tweakpane.yHWGBmom1725236486446.js";import"./@vueuse.XXpXaOwX1725236486446.js";const h=y;function y(t,n){const e=_();return(y=function(t,n){return e[t-=205]})(t,n)}!function(t,n){const e=y,o=_();for(;;)try{if(407368===-parseInt(e(250))/1*(-parseInt(e(214))/2)+-parseInt(e(233))/3*(-parseInt(e(219))/4)+parseInt(e(245))/5*(parseInt(e(223))/6)+parseInt(e(253))/7+parseInt(e(209))/8*(-parseInt(e(212))/9)+parseInt(e(232))/10*(parseInt(e(252))/11)+-parseInt(e(248))/12*(parseInt(e(244))/13))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const g=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[y(210)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){g(this,(function(){const t=y,n=new RegExp(t(251)),e=new RegExp(t(206),"i"),o=I("init");n[t(237)](o+t(243))&&e[t(237)](o+t(211))?I():o("0")}))()}();const q=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[y(210)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function _(){const t=["946508FSuFpG","rayMarchingMaterial","innerHeight","length","4210170eZPtRF","table","clientX",'{}.constructor("return this")( )',"TresTubeGeometryRef","mousemove","debu","action","toString","80XpYrmu","9taGnWT","TresMesh","uniforms","gger","test","trace","__proto__","prototype","info","stateObject","chain","377DuZKEA","5ohKwmX","u_mouse","clientY","608784UyOoME","string","1QAEslm","function *\\( *\\)","637076UhgSIA","2229486ocmMxc","log","error","MeshRef","console","value","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","while (true) {}","constructor","5665096qIqgEB","apply","input","9CEziOD","bind","786662ElyOOJ","call","TresPlaneGeometry","innerWidth","rotation"];return(_=function(){return t})()}q(void 0,(function(){const t=y,n=function(){const t=y;let n;try{n=Function("return (function() "+t(226)+");")()}catch(e){n=window}return n}(),e=n.console=n[t(257)]||{},o=[t(254),"warn",t(241),t(255),"exception",t(224),t(238)];for(let r=0;r<o[t(222)];r++){const n=q[t(208)][t(240)][t(213)](q),i=o[r],c=e[i]||n;n[t(239)]=q[t(213)](q),n[t(231)]=c.toString[t(213)](c),e[i]=n}}))();const b=[h(218)],z={ref:h(227),args:[1e3,1e3]},w=r({__name:h(220),setup(n){const r=h,{onLoop:p,onAfterLoop:l}=t(),m={transparent:!0,depthWrite:!0,depthTest:!0,side:e,vertexShader:"varying vec2 vUv;\nvoid main(){\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n\tvUv=uv;\n}",fragmentShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nvec3 palette(float t){\n\tvec3 a=vec3(.5,.5,.5);\n\tvec3 b=vec3(.5,.5,.5);\n\tvec3 c=vec3(1.,1.,1.);\n\tvec3 d=vec3(.263,.416,.557);\n\t\n\treturn a+b*cos(6.28318*(c*t+d));\n}\n\nmat2 rot2D(float angle){\n\tfloat s=sin(angle);\n\tfloat c=cos(angle);\n\treturn mat2(c,-s,s,c);\n}\n\nfloat sdPyramid(vec3 p,float h)\n{\n\tfloat m2=h*h+.25;\n\t\n\tp.xz=abs(p.xz);\n\tp.xz=(p.z>p.x)?p.zx:p.xz;\n\tp.xz-=.5;\n\t\n\tvec3 q=vec3(p.z,h*p.y-.5*p.x,h*p.x+.5*p.y);\n\t\n\tfloat s=max(-q.x,0.);\n\tfloat t=clamp((q.y-.5*p.z)/(m2+.25),0.,1.);\n\t\n\tfloat a=m2*(q.x+s)*(q.x+s)+q.y*q.y;\n\tfloat b=m2*(q.x+.5*t)*(q.x+.5*t)+(q.y-m2*t)*(q.y-m2*t);\n\t\n\tfloat d2=min(q.y,-q.x*m2-q.y*.5)>0.?0.:min(a,b);\n\t\n\treturn sqrt((d2+q.z*q.z)/m2)*sign(max(q.z,-p.y));\n}\nfloat sdBoxFrame(vec3 p,vec3 b,float e)\n{\n\tp=abs(p)-b;\n\tvec3 q=abs(p+e)-e;\n\treturn min(min(\n\t\t\tlength(max(vec3(p.x,q.y,q.z),0.))+min(max(p.x,max(q.y,q.z)),0.),\n\t\t\tlength(max(vec3(q.x,p.y,q.z),0.))+min(max(q.x,max(p.y,q.z)),0.)),\n\t\t\tlength(max(vec3(q.x,q.y,p.z),0.))+min(max(q.x,max(q.y,p.z)),0.));\n\t\t}\n\t\tfloat map(vec3 p){\n\t\t\tp.z+=u_time*.4;\n\t\t\t\n\t\t\tp.xy=fract(p.xy)-.5;\n\t\t\tp.z=mod(p.z,.25)-.125;\n\t\t\tfloat box=sdBoxFrame(p*8.,vec3(.5,.3,.5),.025)/8.;\n\t\t\t// box=min(sdPyramid(p*15.,1.5)/15.,box);\n\t\t\treturn box;\n\t\t}\n\t\t\n\t\tvoid main(){\n\t\t\tvec2 uv=vUv-vec2(.5);\n\t\t\tvec2 m=(u_mouse.xy*2.-u_resolution.xy)/u_resolution.y;\n\t\t\t\n\t\t\t//变量初始化\n\t\t\tvec3 ro=vec3(0.,0.,-3.);\n\t\t\tvec3 rd=normalize(vec3(uv,1.));\n\t\t\tvec3 col=vec3(0);\n\t\t\t\n\t\t\tfloat t=0.;\n\t\t\t\n\t\t\t// 鼠标控制\n\t\t\t// if(u_mouse.z<0.)\n\t\t\t// m=vec2(cos(u_time*.2),sin(u_time*.2));\n\t\t\t\n\t\t\t// 光追\n\t\t\tint i;\n\t\t\tfor(i=0;i<80;i++){\n\t\t\t\tvec3 p=ro+rd*t;\n\t\t\t\t\n\t\t\t\tp.xy*=rot2D(t*.2);\n\t\t\t\tp.y+=sin(t*(1.)*.5)*.35;\n\t\t\t\t\n\t\t\t\tfloat d=map(p);\n\t\t\t\t\n\t\t\t\tt+=d;\n\t\t\t\t\n\t\t\t\tif(d<.001||t>100.)break;\n\t\t\t}\n\t\t\t\n\t\t\t// coloring\n\t\t\tcol=palette(t*.04+float(i)*.005);\n\t\t\t\n\t\t\tgl_FragColor=vec4(col,1.);\n\t\t}",uniforms:{u_resolution:{value:new o(window[r(217)],window[r(221)])},u_mouse:{value:new o(0,0)},u_time:{value:0}}},v=window[r(217)]/2,x=window.innerHeight/2;let d=0,y=0;return document.addEventListener(r(228),(function(t){const n=r;d=t[n(225)]-v,y=t[n(247)]-x}),!1),i((()=>{})),p((()=>{const t=r;m[t(235)].u_time[t(205)]+=.01,m[t(235)][t(246)][t(205)]=new o(d,y)})),l((()=>{})),(t,n)=>{const e=r;return c(),s(e(234),{ref:e(256),rotation:[Math.PI/2,0,0]},[a(e(216),z,null,512),a("TresShaderMaterial",u(f(m)),null,16)],8,b)}}});function I(t){function n(t){const e=y;if(typeof t===e(249))return function(t){}.constructor(e(207)).apply("counter");1!==(""+t/t)[e(222)]||t%20==0?function(){return!0}[e(208)](e(229)+e(236))[e(215)](e(230)):function(){return!1}[e(208)](e(229)+"gger")[e(210)](e(242)),n(++t)}try{if(t)return n;n(0)}catch(e){}}const j=M;!function(t,n){const e=M,o=R();for(;;)try{if(960405===parseInt(e(202))/1+-parseInt(e(209))/2+-parseInt(e(189))/3*(-parseInt(e(196))/4)+-parseInt(e(197))/5+parseInt(e(201))/6+parseInt(e(222))/7*(-parseInt(e(215))/8)+parseInt(e(190))/9*(parseInt(e(204))/10))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const E=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){E(this,(function(){const t=M,n=new RegExp(t(228)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=O(t(206));n[t(208)](o+t(213))&&e[t(208)](o+t(193))?O():o("0")}))()}();const T=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[M(210)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function M(t,n){const e=R();return(M=function(t,n){return e[t-=187]})(t,n)}function R(){const t=["3077616zWCPns","34429cysvRb","TresDirectionalLight","446270zjqYGw","__proto__","init","string","test","568736XVOObz","apply","info","warn","chain","console","65368WixYWv","constructor","stateObject","call","action","rayMarchingVIew","gger","553dgDBqo","toString","prototype","return (function() ","counter","#ffffff","function *\\( *\\)","debu","trace","3ssXuCD","297sUENlo","TresCanvas","perspectiveCameraRef","input",'{}.constructor("return this")( )',"TresAmbientLight","1332436hiRaaq","2314415cxknSV","exception","length","bind"];return(R=function(){return t})()}T(void 0,(function(){const t=M,n=function(){const t=M;let n;try{n=Function(t(225)+t(194)+");")()}catch(e){n=window}return n}(),e=n.console=n[t(214)]||{},o=["log",t(212),t(211),"error",t(198),"table",t(188)];for(let r=0;r<o[t(199)];r++){const n=T[t(216)][t(224)][t(200)](T),i=o[r],c=e[i]||n;n[t(205)]=T.bind(T),n[t(223)]=c[t(223)].bind(c),e[i]=n}}))();const A={ref:j(192),position:[0,500,0],fov:45,near:1,far:1e4},S=a(j(195),{color:"#ffffff"},null,-1),D=a(j(203),{position:[100,100,0],intensity:.5,color:j(227)},null,-1),C=a("TresAxesHelper",{args:[1e3],position:[0,19,0]},null,-1),F=a("TresGridHelper",{args:[6e3,100],position:[0,19,0]},null,-1),L=r({__name:j(220),setup(t){const e={clearColor:"#000000",shadows:!0,alpha:!1,useLegacyLights:!0},o={autoRotate:!1,enableDamping:!0};return(t,r)=>{const i=p(M(191));return c(),l(i,d(e,{"window-size":""}),{default:m((()=>[a("TresPerspectiveCamera",A,null,512),v(x(n),u(f(o)),null,16),S,D,v(w),C,F])),_:1},16)}}});function O(t){function n(t){const e=M;if(typeof t===e(207))return function(t){}[e(216)]("while (true) {}").apply(e(226));1!==(""+t/t)[e(199)]||t%20==0?function(){return!0}.constructor(e(187)+e(221))[e(218)](e(219)):function(){return!1}.constructor(e(187)+e(221))[e(210)](e(217)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{L as default};
