import{a as t,r as n,d as e}from"./@tresjs.W42D3qe_1718612273914.js";import{bV as r,bX as o,bW as s,a5 as u,c7 as c,c8 as i,c5 as a,c9 as l}from"./three.HHcT7YAr1718612273914.js";import{d as f,b as p,a2 as h,o as d,D as v,J as m,F as g,e as w,f as x,g as y,j as T,u as b}from"./@vue.CpOXM7bB1718612273914.js";import"./@vueuse.YjRg4c7n1718612273914.js";import"./tweakpane.qqn77PB81718612273914.js";const I=S;!function(t,n){const e=S,r=B();for(;;)try{if(955320===parseInt(e(171))/1+parseInt(e(129))/2+parseInt(e(120))/3*(-parseInt(e(132))/4)+parseInt(e(140))/5*(parseInt(e(152))/6)+-parseInt(e(117))/7*(parseInt(e(121))/8)+parseInt(e(170))/9*(-parseInt(e(144))/10)+parseInt(e(135))/11*(-parseInt(e(143))/12))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const _=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[S(126)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();function S(t,n){const e=B();return(S=function(t,n){return e[t-=108]})(t,n)}!function(){_(this,(function(){const t=S,n=new RegExp("function *\\( *\\)"),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),r=U(t(108));n[t(148)](r+t(111))&&e.test(r+t(127))?U():r("0")}))()}();const j=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,r}}();j(void 0,(function(){const t=S,n=function(){const t=S;let n;try{n=Function(t(158)+t(112)+");")()}catch(e){n=window}return n}(),e=n.console=n.console||{},r=[t(154),t(157),t(151),t(128),"exception",t(118),t(166)];for(let o=0;o<r.length;o++){const n=j.constructor[t(137)].bind(j),s=r[o],u=e[s]||n;n[t(122)]=j[t(138)](j),n[t(115)]=u[t(115)].bind(u),e[s]=n}}))();const D=[m(I(142),{args:[1,1,1]},null,-1),m(I(133),null,null,-1)],M=[m(I(142),{args:[1,1,1]},null,-1),m(I(133),null,null,-1)],k=[m(I(142),{args:[1,1,1]},null,-1),m(I(133),null,null,-1)],z=[m(I(134),{args:[.8,32,16]},null,-1),m("TresMeshNormalMaterial",null,null,-1)];function B(){const t=["constructor","62538ouHaHC","2440cOeVXV","__proto__","render","set","counter","apply","input","error","3620940YAYmaS","filmBox","addPass","256CtBmJV","TresMeshNormalMaterial","TresSphereGeometry","30426TxtmSw","gger","prototype","bind","debu","1379300VaczHI","Vector2","TresBoxGeometry","852DmUFRO","3854180aGqXhh","layers","length","action","test","renderTarget2","renderToScreen","info","12EBzMgB","\n            uniform sampler2D baseTexture;\n            uniform sampler2D bloomTexture;\n\t\t\t\t\t\tuniform sampler2D filmTexture;\n\t\t\t\t\t\tuniform sampler2D glitchTexture;\n            varying vec2 vUv;\n            void main() {\n                gl_FragColor = ( \n\t\t\t\t\t\t\t\t\tvec4( 1.0 ) * texture2D( baseTexture, vUv )  + \n\t\t\t\t\t\t\t\t\tvec4( 1.0 ) * texture2D( bloomTexture, vUv ) + \n\t\t\t\t\t\t\t\t\tvec4( 1.0 ) * texture2D( filmTexture, vUv ) + \n\t\t\t\t\t\t\t\t\tvec4( 1.0 ) * texture2D( glitchTexture, vUv ) \n\t\t\t\t\t\t\t\t);\n            }\n        ","log","baseTexture","value","warn","return (function() ","stateObject","shineBox","threshold","width","texture","clear","needsSwap","trace","ShaderMaterial","while (true) {}","getDrawingBufferSize","9aCpuNv","1790688yEptaI","height","init","string","glitchSphere","chain",'{}.constructor("return this")( )',"radius","TresMesh","toString","uniforms","29414uPqiTQ","table"];return(B=function(){return t})()}const C=f({__name:"ecLayerMultiple",setup(e){const f=p(),w=p(),x=p(),y=p();h((()=>{const t=S;f[t(156)]&&f[t(156)][t(145)][t(124)](0),w[t(156)]&&w[t(156)].layers[t(124)](1),x[t(156)]&&x[t(156)].layers[t(124)](2),y[t(156)]&&y[t(156)][t(145)][t(124)](3)}));const{camera:T,renderer:b,scene:I,sizes:_}=t(),j={strength:.572,radius:.51,threshold:0};let B=null,C=null;let U=null;let R=null;let V=null;h((()=>{const t=S;_[t(162)].value&&(((t,n,e,c,i)=>{const a=S;B=new r(t,n),C=new o(e),C.renderToScreen=!1,C.addPass(B);const l=new s(new(u[a(141)])(c,i),j.strength,j[a(113)],j[a(161)]);C[a(131)](l)})(I[t(156)],T[t(156)],b[t(156)],_[t(162)].value,_[t(172)].value),(t=>{const n=S;R=new o(t),R.renderToScreen=!1,R[n(131)](B);const e=new i;R.addPass(e)})(b.value),(t=>{const n=S;U=new o(t),U[n(150)]=!1,U[n(131)](B);const e=new c;U[n(131)](e)})(b[t(156)]),(t=>{const n=S;V=new o(t),V[n(131)](B);const e=new(u[n(167)])({uniforms:{baseTexture:{value:null},bloomTexture:{value:C.renderTarget2[n(163)]},filmTexture:{value:U[n(149)][n(163)]},glitchTexture:{value:R[n(149)][n(163)]}},vertexShader:"\n            varying vec2 vUv;\n            void main() {\n                vUv = uv;\n                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n            }\n        ",fragmentShader:n(153),defines:{}}),r=new a(e,n(155));r[n(165)]=!0,V[n(131)](r);const{width:s,height:c}=t[n(169)](new(u[n(141)])),i=new a(l);i[n(116)].resolution.value[n(124)](1/s,1/c),V[n(131)](i)})(b.value))}));const{onLoop:Z}=n();return Z((()=>{const t=S;C&&V&&T[t(156)]&&(b[t(156)][t(164)](),T[t(156)].layers.set(1),C.render(),T.value[t(145)][t(124)](2),U[t(123)](),T[t(156)].layers[t(124)](3),R[t(123)](),b.value.clearDepth(),T[t(156)][t(145)][t(124)](0),V[t(123)](I[t(156)],T[t(156)]))})),(t,n)=>{const e=S;return d(),v(g,null,[m(e(114),{ref_key:"normalBox",ref:f,position:[3,2,1]},D,512),m(e(114),{ref_key:e(160),ref:w,position:[0,2,-4]},M,512),m("TresMesh",{ref_key:e(130),ref:x,position:[1,2,3]},k,512),m(e(114),{ref_key:e(110),ref:y,position:[-3,2,0]},z,512)],64)}}});function U(t){function n(t){const e=S;if(typeof t===e(109))return function(t){}[e(119)](e(168))[e(126)](e(125));1!==(""+t/t)[e(146)]||t%20==0?function(){return!0}.constructor(e(139)+e(136)).call(e(147)):function(){return!1}[e(119)](e(139)+e(136))[e(126)](e(159)),n(++t)}try{if(t)return n;n(0)}catch(e){}}const R=H;!function(t,n){const e=H,r=O();for(;;)try{if(296400===parseInt(e(191))/1*(parseInt(e(166))/2)+-parseInt(e(170))/3+-parseInt(e(187))/4+parseInt(e(151))/5+-parseInt(e(174))/6*(parseInt(e(160))/7)+-parseInt(e(190))/8*(-parseInt(e(155))/9)+-parseInt(e(156))/10)break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const V=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[H(169)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();!function(){V(this,(function(){const t=H,n=new RegExp("function *\\( *\\)"),e=new RegExp(t(150),"i"),r=N(t(173));n[t(193)](r+t(172))&&e.test(r+t(158))?N():r("0")}))()}();const Z=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[H(169)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();Z(void 0,(function(){const t=H,n=function(){const t=H;let n;try{n=Function(t(159)+'{}.constructor("return this")( ));')()}catch(e){n=window}return n}(),e=n[t(165)]=n.console||{},r=[t(178),t(167),t(161),t(179),"exception",t(168),t(177)];for(let o=0;o<r[t(175)];o++){const n=Z[t(180)][t(163)].bind(Z),s=r[o],u=e[s]||n;n[t(164)]=Z[t(153)](Z),n[t(181)]=u[t(181)][t(153)](u),e[s]=n}}))();const A=m("TresPerspectiveCamera",{position:[10,10,10]},null,-1),E=m(R(157),{intensity:1},null,-1),F=m(R(186),{args:[10,10]},null,-1);function H(t,n){const e=O();return(H=function(t,n){return e[t-=150]})(t,n)}function O(){const t=["1993990YddrZY","TresAmbientLight","input","return (function() ","258741oHcFkX","info","string","prototype","__proto__","console","2yHDNJh","warn","table","apply","624279mNZlve","TresCanvas","chain","init","6dqJRCu","length","value","trace","log","error","constructor","toString","call","renderer","stateObject","effectComposerMultiple","TresGridHelper","2078248sljcWS","while (true) {}","context","1457752plZgdO","385722LiUesB","autoClear","test","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","1640190bkwjOz","debu","bind","gger","27uYVSov"];return(O=function(){return t})()}const P=f({__name:R(185),setup(t){const n=p();return h((()=>{const t=H;if(n.value){n[t(176)][t(189)][t(183)][t(176)][t(192)]=!1}})),(t,r)=>{const o=w(H(171));return d(),x(o,{disableRender:"","window-size":"",ref_key:"tcRef",ref:n},{default:y((()=>[A,E,T(b(e)),F,T(C)])),_:1},512)}}});function N(t){function n(t){const e=H;if(typeof t===e(162))return function(t){}[e(180)](e(188)).apply("counter");1!==(""+t/t)[e(175)]||t%20==0?function(){return!0}[e(180)](e(152)+e(154))[e(182)]("action"):function(){return!1}.constructor("debu"+e(154))[e(169)](e(184)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{P as default};
