import{$ as t,d as n}from"./@tresjs.Q03Md-En1722313330047.js";import{Z as e,j as o}from"./three.0L1oP_mX1722313330047.js";import{d as r,a1 as i,o as c,D as s,J as a,aj as u,ak as f,e as p,f as l,g as m,j as v,u as x,m as h}from"./@vue.Q1VpS3901722313330047.js";import"./tweakpane.yHWGBmom1722313330047.js";import"./@vueuse.UFv615y21722313330047.js";const d=q;!function(t,n){const e=q,o=_();for(;;)try{if(797409===-parseInt(e(129))/1+parseInt(e(157))/2+-parseInt(e(159))/3*(parseInt(e(127))/4)+-parseInt(e(134))/5*(-parseInt(e(152))/6)+-parseInt(e(135))/7*(-parseInt(e(168))/8)+parseInt(e(148))/9+-parseInt(e(156))/10)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const g=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[q(128)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){g(this,(function(){const t=q,n=new RegExp(t(151)),e=new RegExp(t(169),"i"),o=I(t(170));n[t(161)](o+t(155))&&e[t(161)](o+"input")?I():o("0")}))()}();const y=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function _(){const t=["while (true) {}","length","action","__proto__","trace","debu","u_time","constructor","info","warn","addEventListener","TresShaderMaterial","9729306sGCJjZ","return (function() ","clientY","function *\\( *\\)","711078WzHNyi","gger","rayMarchingMaterial","chain","6256330bMMHFs","1189392unbSZN","console","125013VZfMNE","toString","test","TresTubeGeometryRef","string","call","innerHeight","uniforms","bind","768808EjAvJz","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","init","prototype",'{}.constructor("return this")( )',"error","132zDGusP","apply","572045kPbtSU","innerWidth","u_mouse","mousemove","counter","35IhNVij","63kTEpya"];return(_=function(){return t})()}y(void 0,(function(){const t=q;let n;try{n=Function(t(149)+t(172)+");")()}catch(r){n=window}const e=n[t(158)]=n[t(158)]||{},o=["log",t(145),t(144),t(126),"exception","table",t(140)];for(let i=0;i<o.length;i++){const n=y.constructor[t(171)].bind(y),r=o[i],c=e[r]||n;n[t(139)]=y[t(167)](y),n[t(160)]=c.toString[t(167)](c),e[r]=n}}))();const z=["rotation"],b={ref:d(162),args:[1e3,1e3]};function q(t,n){const e=_();return(q=function(t,n){return e[t-=126]})(t,n)}const w=r({__name:d(154),setup(n){const r=d,{onLoop:p,onAfterLoop:l}=t(),m={transparent:!0,depthWrite:!0,depthTest:!0,side:e,vertexShader:"varying vec2 vUv;\nvoid main(){\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n\tvUv=uv;\n}",fragmentShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nvec3 palette(float t){\n\tvec3 a=vec3(.5,.5,.5);\n\tvec3 b=vec3(.5,.5,.5);\n\tvec3 c=vec3(1.,1.,1.);\n\tvec3 d=vec3(.263,.416,.557);\n\t\n\treturn a+b*cos(6.28318*(c*t+d));\n}\n\nmat2 rot2D(float angle){\n\tfloat s=sin(angle);\n\tfloat c=cos(angle);\n\treturn mat2(c,-s,s,c);\n}\n\nfloat sdPyramid(vec3 p,float h)\n{\n\tfloat m2=h*h+.25;\n\t\n\tp.xz=abs(p.xz);\n\tp.xz=(p.z>p.x)?p.zx:p.xz;\n\tp.xz-=.5;\n\t\n\tvec3 q=vec3(p.z,h*p.y-.5*p.x,h*p.x+.5*p.y);\n\t\n\tfloat s=max(-q.x,0.);\n\tfloat t=clamp((q.y-.5*p.z)/(m2+.25),0.,1.);\n\t\n\tfloat a=m2*(q.x+s)*(q.x+s)+q.y*q.y;\n\tfloat b=m2*(q.x+.5*t)*(q.x+.5*t)+(q.y-m2*t)*(q.y-m2*t);\n\t\n\tfloat d2=min(q.y,-q.x*m2-q.y*.5)>0.?0.:min(a,b);\n\t\n\treturn sqrt((d2+q.z*q.z)/m2)*sign(max(q.z,-p.y));\n}\nfloat sdBoxFrame(vec3 p,vec3 b,float e)\n{\n\tp=abs(p)-b;\n\tvec3 q=abs(p+e)-e;\n\treturn min(min(\n\t\t\tlength(max(vec3(p.x,q.y,q.z),0.))+min(max(p.x,max(q.y,q.z)),0.),\n\t\t\tlength(max(vec3(q.x,p.y,q.z),0.))+min(max(q.x,max(p.y,q.z)),0.)),\n\t\t\tlength(max(vec3(q.x,q.y,p.z),0.))+min(max(q.x,max(q.y,p.z)),0.));\n\t\t}\n\t\tfloat map(vec3 p){\n\t\t\tp.z+=u_time*.4;\n\t\t\t\n\t\t\tp.xy=fract(p.xy)-.5;\n\t\t\tp.z=mod(p.z,.25)-.125;\n\t\t\tfloat box=sdBoxFrame(p*8.,vec3(.5,.3,.5),.025)/8.;\n\t\t\t// box=min(sdPyramid(p*15.,1.5)/15.,box);\n\t\t\treturn box;\n\t\t}\n\t\t\n\t\tvoid main(){\n\t\t\tvec2 uv=vUv-vec2(.5);\n\t\t\tvec2 m=(u_mouse.xy*2.-u_resolution.xy)/u_resolution.y;\n\t\t\t\n\t\t\t//变量初始化\n\t\t\tvec3 ro=vec3(0.,0.,-3.);\n\t\t\tvec3 rd=normalize(vec3(uv,1.));\n\t\t\tvec3 col=vec3(0);\n\t\t\t\n\t\t\tfloat t=0.;\n\t\t\t\n\t\t\t// 鼠标控制\n\t\t\t// if(u_mouse.z<0.)\n\t\t\t// m=vec2(cos(u_time*.2),sin(u_time*.2));\n\t\t\t\n\t\t\t// 光追\n\t\t\tint i;\n\t\t\tfor(i=0;i<80;i++){\n\t\t\t\tvec3 p=ro+rd*t;\n\t\t\t\t\n\t\t\t\tp.xy*=rot2D(t*.2);\n\t\t\t\tp.y+=sin(t*(1.)*.5)*.35;\n\t\t\t\t\n\t\t\t\tfloat d=map(p);\n\t\t\t\t\n\t\t\t\tt+=d;\n\t\t\t\t\n\t\t\t\tif(d<.001||t>100.)break;\n\t\t\t}\n\t\t\t\n\t\t\t// coloring\n\t\t\tcol=palette(t*.04+float(i)*.005);\n\t\t\t\n\t\t\tgl_FragColor=vec4(col,1.);\n\t\t}",uniforms:{u_resolution:{value:new o(window[r(130)],window[r(165)])},u_mouse:{value:new o(0,0)},u_time:{value:0}}},v=window[r(130)]/2,x=window[r(165)]/2;let h=0,g=0;return document[r(146)](r(132),(function(t){const n=r;h=t.clientX-v,g=t[n(150)]-x}),!1),i((()=>{})),p((()=>{const t=r;m[t(166)][t(142)].value+=.01,m[t(166)][t(131)].value=new o(h,g)})),l((()=>{})),(t,n)=>{const e=r;return c(),s("TresMesh",{ref:"MeshRef",rotation:[Math.PI/2,0,0]},[a("TresPlaneGeometry",b,null,512),a(e(147),u(f(m)),null,16)],8,z)}}});function I(t){function n(t){const e=q;if(typeof t===e(163))return function(t){}[e(143)](e(136))[e(128)](e(133));1!==(""+t/t)[e(137)]||t%20==0?function(){return!0}.constructor("debugger")[e(164)](e(138)):function(){return!1}[e(143)](e(141)+e(153))[e(128)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}const j=S;!function(t,n){const e=S,o=U();for(;;)try{if(894409===-parseInt(e(256))/1*(-parseInt(e(268))/2)+-parseInt(e(275))/3+-parseInt(e(257))/4+-parseInt(e(244))/5+parseInt(e(240))/6+-parseInt(e(251))/7*(-parseInt(e(235))/8)+parseInt(e(272))/9*(parseInt(e(250))/10))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const M=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){M(this,(function(){const t=S,n=new RegExp(t(271)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=P(t(238));n[t(266)](o+t(252))&&e.test(o+t(247))?P():o("0")}))()}();const T=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[S(279)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function S(t,n){const e=U();return(S=function(t,n){return e[t-=233]})(t,n)}T(void 0,(function(){const t=S;let n;try{n=Function(t(264)+t(233)+");")()}catch(r){n=window}const e=n[t(249)]=n[t(249)]||{},o=[t(280),t(274),t(277),t(246),t(260),t(234),t(273)];for(let i=0;i<o.length;i++){const n=T.constructor[t(248)][t(254)](T),r=o[i],c=e[r]||n;n[t(267)]=T[t(254)](T),n.toString=c[t(239)][t(254)](c),e[r]=n}}))();const L={ref:j(253),position:[0,500,0],fov:45,near:1,far:1e4},k=a(j(245),{color:j(237)},null,-1),D=a(j(236),{position:[100,100,0],intensity:.5,color:j(237)},null,-1),E=a(j(255),{args:[1e3],position:[0,19,0]},null,-1),R=a(j(241),{args:[6e3,100],position:[0,19,0]},null,-1);function U(){const t=["warn","1402764DNUuVo","call","info","TresPerspectiveCamera","apply","log","while (true) {}",'{}.constructor("return this")( )',"table","2878840whXLNL","TresDirectionalLight","#ffffff","init","toString","9356058Smfktz","TresGridHelper","gger","constructor","3197195QghfyD","TresAmbientLight","error","input","prototype","console","309040xJzlcU","7XVOJNR","chain","perspectiveCameraRef","bind","TresAxesHelper","35580YdDULS","345240DWzgMU","rayMarchingVIew","TresCanvas","exception","counter","string","action","return (function() ","debu","test","__proto__","6XwMpyg","length","#000000","function *\\( *\\)","18YjxpkX","trace"];return(U=function(){return t})()}const A=r({__name:j(258),setup(t){const e=j,o={clearColor:e(270),shadows:!0,alpha:!1,useLegacyLights:!0},r={autoRotate:!1,enableDamping:!0};return(t,i)=>{const s=e,d=p(s(259));return c(),l(d,h(o,{"window-size":""}),{default:m((()=>[a(s(278),L,null,512),v(x(n),u(f(r)),null,16),k,D,v(w),E,R])),_:1},16)}}});function P(t){function n(t){const e=S;if(typeof t===e(262))return function(t){}[e(243)](e(281))[e(279)](e(261));1!==(""+t/t)[e(269)]||t%20==0?function(){return!0}.constructor(e(265)+"gger")[e(276)](e(263)):function(){return!1}.constructor(e(265)+e(242)).apply("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{A as default};
