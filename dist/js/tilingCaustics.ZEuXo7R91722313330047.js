var n=Object.defineProperty,t=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,r=(t,e,o)=>e in t?n(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,i=(n,i)=>{for(var s in i||(i={}))e.call(i,s)&&r(n,s,i[s]);if(t)for(var s of t(i))o.call(i,s)&&r(n,s,i[s]);return n};import{$ as s,d as c}from"./@tresjs.Q03Md-En1722313330047.js";import{a6 as a}from"./three.0L1oP_mX1722313330047.js";import{d as u,w as f,o as l,D as p,J as d,aj as g,ak as v,r as h,e as m,f as b,g as y,j as w,u as x,m as I}from"./@vue.Q1VpS3901722313330047.js";import{P as _}from"./tweakpane.yHWGBmom1722313330047.js";import"./@vueuse.UFv615y21722313330047.js";const T=k;!function(n,t){const e=k,o=P();for(;;)try{if(802110===parseInt(e(242))/1*(parseInt(e(254))/2)+-parseInt(e(260))/3+parseInt(e(262))/4*(-parseInt(e(245))/5)+-parseInt(e(233))/6+parseInt(e(259))/7+parseInt(e(240))/8+-parseInt(e(263))/9)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const j=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[k(232)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){j(this,(function(){const n=k,t=new RegExp(n(266)),e=new RegExp(n(268),"i"),o=E(n(231));t[n(237)](o+n(235))&&e.test(o+"input")?E():o("0")}))()}();const S=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function k(n,t){const e=P();return(k=function(n,t){return e[n-=231]})(n,t)}S(void 0,(function(){const n=k,t=function(){const n=k;let t;try{t=Function(n(249)+n(238)+");")()}catch(e){t=window}return t}(),e=t[n(261)]=t[n(261)]||{},o=[n(239),"warn",n(257),n(264),n(256),"table","trace"];for(let r=0;r<o[n(250)];r++){const t=S[n(273)][n(258)][n(243)](S),i=o[r],s=e[i]||t;t[n(270)]=S[n(243)](S),t.toString=s.toString.bind(s),e[i]=t}}))();const C=[T(252)],A=d(T(265),{args:[10,10]},null,-1);function P(){const n=["exception","info","prototype","8748712qQaJSR","3255768NuXknx","console","46412aiIcas","9511002gyzsaR","error","TresPlaneGeometry","function *\\( *\\)","flowSpeed","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","Color","__proto__","TresMesh","brightness","constructor","DoubleSide","init","apply","1354362HSnsjh","debu","chain","call","test",'{}.constructor("return this")( )',"log","6559920sVbbIk","color","122107brLMCL","bind","string","210sdgPXC","value","TresShaderMaterial","gger","return (function() ","length","while (true) {}","rotation-x","speed","26gQRTGL","#fff"];return(P=function(){return n})()}const R=u({__name:"tilingCaustics",props:{speed:{default:.478},backgroundColor:{},color:{default:T(255)},flowSpeed:{default:{x:.01,y:.01}},brightness:{default:1.5}},setup(n){const t=T,e=n,o={uniforms:{resolution:{type:"v2",value:{x:1,y:1}},backgroundColor:{type:"c",value:new(a[t(269)])(e[t(241)])},color:{type:"c",value:new(a[t(269)])(t(255))},speed:{type:"f",value:e[t(253)]},flowSpeed:{type:"v2",value:e[t(267)]},brightness:{type:"f",value:e[t(272)]},time:{type:"f",value:.1}},vertexShader:"// Examples of variables passed from vertex to fragment shader\nvarying vec2 vUv;\n\nvoid main(){\n\t// To pass variables to the fragment shader, you assign them here in the\n\t// main function. Traditionally you name the varying with vAttributeName\n\tvUv=uv;\n\t\n\t// This sets the position of the vertex in 3d space. The correct math is\n\t// provided below to take into account camera and object data.\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n}",fragmentShader:"#define TAU 6.28318530718\n#define MAX_ITER 5\n\nuniform vec2 resolution;\nuniform vec3 backgroundColor;\nuniform vec3 color;\nuniform float speed;\nuniform vec2 flowSpeed;\nuniform float brightness;\nuniform float time;\n\nvarying vec2 vUv;\n\nvoid main(){\n\tvec2 uv=(vUv.xy+(time*flowSpeed))*resolution;\n\t\n\tvec2 p=mod(uv*TAU,TAU)-250.;\n\tvec2 i=vec2(p);\n\t\n\tfloat c=1.;\n\tfloat inten=.005;\n\t\n\tfor(int n=0;n<MAX_ITER;n++){\n\t\tfloat t=time*speed*(1.-(3.5/float(n+1)));\n\t\ti=p+vec2(cos(t-i.x)+sin(t+i.y),sin(t-i.y)+cos(t+i.x));\n\t\tc+=1./length(vec2(p.x/(sin(i.x+t)/inten),p.y/(cos(i.y+t)/inten)));\n\t}\n\t\n\tc/=float(MAX_ITER);\n\tc=1.17-pow(c,brightness);\n\t\n\tvec3 rgb=vec3(pow(abs(c),8.));\n\t\n\tgl_FragColor=vec4(rgb*color+backgroundColor,length(rgb)+.1);\n}",side:a[t(274)],transparent:!0,depthWrite:!1,depthTest:!0},{onLoop:r}=s();return r((({delta:n})=>{const e=t;o.uniforms.time[e(246)]+=n})),f((()=>e),(()=>{const n=t;o.uniforms.speed[n(246)]=e.speed,o.uniforms.brightness.value=e[n(272)],o.uniforms.backgroundColor[n(246)]=new(a[n(269)])(e[n(241)])}),{deep:!0}),(n,e)=>{const r=t;return l(),p(r(271),{"rotation-x":-Math.PI/2,"position-y":1},[A,d(r(247),g(v(o)),null,16)],8,C)}}});function E(n){function t(n){const e=k;if(typeof n===e(244))return function(n){}.constructor(e(251))[e(232)]("counter");1!==(""+n/n)[e(250)]||n%20==0?function(){return!0}[e(273)](e(234)+e(248))[e(236)]("action"):function(){return!1}[e(273)](e(234)+e(248))[e(232)]("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(e){}}const M=z;function U(){const n=["length","gger","constructor","inline","TresCanvas","2760520PygmwW","flowSpeed","action","12vmDgnc","tilingCaustics","speed","table",'{}.constructor("return this")( )',"console","bind","apply","info","trace","toString","180374ZsSLPg","893868dfUuTs","91095Eyitaj","stateObject","463024kuevfi","prototype","TresGridHelper","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","TresPerspectiveCamera","22220ykVfKG","chain","string","#fff","log","144782UZqnFk","return (function() ","63suaXhh","while (true) {}","init","call","function *\\( *\\)","color","102gxoRGV","__proto__","test","8228bKfwpQ","addBinding"];return(U=function(){return n})()}!function(n,t){const e=z,o=U();for(;;)try{if(220170===parseInt(e(373))/1+parseInt(e(341))/2*(-parseInt(e(362))/3)+-parseInt(e(374))/4+parseInt(e(375))/5*(-parseInt(e(349))/6)+-parseInt(e(359))/7+-parseInt(e(331))/8*(parseInt(e(343))/9)+parseInt(e(336))/10*(parseInt(e(352))/11))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const O=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function z(n,t){const e=U();return(z=function(n,t){return e[n-=330]})(n,t)}!function(){O(this,(function(){const n=z,t=new RegExp(n(347)),e=new RegExp(n(334),"i"),o=F(n(345));t[n(351)](o+n(337))&&e.test(o+"input")?F():o("0")}))()}();const L=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[z(369)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();L(void 0,(function(){const n=z,t=function(){const n=z;let t;try{t=Function(n(342)+n(366)+");")()}catch(e){t=window}return t}(),e=t[n(367)]=t[n(367)]||{},o=[n(340),"warn",n(370),"error","exception",n(365),n(371)];for(let r=0;r<o.length;r++){const t=L[n(356)][n(332)].bind(L),i=o[r],s=e[i]||t;t[n(350)]=L.bind(L),t[n(372)]=s[n(372)][n(368)](s),e[i]=t}}))();const X=d(M(335),{position:[10,10,10]},null,-1),Z=d("TresAmbientLight",{intensity:1},null,-1),G=d(M(333),{args:[10,10]},null,-1),$=u({__name:M(363),setup(n){const t=M,e={clearColor:"#222"},o=h({color:t(339),speed:.1,brightness:1.5,flowSpeed:{x:.01,y:.01}}),r=new _({title:"参数",expanded:!0});return r.addBinding(o,t(348),{label:"颜色"}),r.addBinding(o,t(364),{label:"速度",min:.1,max:1,step:.1}),r[t(353)](o,"brightness",{label:"亮度",min:.1,max:2,step:.1}),r[t(353)](o,t(360),{label:"流动速度",picker:t(357),expanded:!0,x:{min:.01,step:.02,max:.6,inverted:!0},y:{min:.01,step:.02,max:.6,inverted:!0}}),(n,r)=>{const s=m(t(358));return l(),b(s,I(e,{"window-size":""}),{default:y((()=>[X,Z,w(x(c)),G,w(R,g(v(i({},o))),null,16)])),_:1},16)}}});function F(n){function t(n){const e=z;if(typeof n===e(338))return function(n){}[e(356)](e(344))[e(369)]("counter");1!==(""+n/n)[e(354)]||n%20==0?function(){return!0}.constructor("debu"+e(355))[e(346)](e(361)):function(){return!1}.constructor("debugger")[e(369)](e(330)),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{$ as default};
