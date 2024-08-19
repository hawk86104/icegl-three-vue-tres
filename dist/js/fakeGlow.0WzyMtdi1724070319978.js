import{d as n,H as t}from"./@tresjs.2JnKj_Yj1724070319978.js";import{k as o,ba as e,C as r,aN as i,Z as a,a6 as s,q as l}from"./three.QUrV0R7c1724070319978.js";import{P as c}from"./tweakpane.yHWGBmom1724070319978.js";import{d as u,r as f,a1 as p,e as g,o as d,f as m,g as v,j as w,u as h,J as y,al as I}from"./@vue.Q1VpS3901724070319978.js";import"./@vueuse.2Yfo77CO1724070319978.js";function b(){var n=["1243616OSbksv","35190142drEWlK","opacity","apply","input","debu","log","action","__proto__","\n      varying vec3 vPosition;\n      varying vec3 vNormal;\n\n      void main() {\n        vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n        gl_Position = projectionMatrix * viewMatrix * modelPosition;\n        vec4 modelNormal = modelMatrix * vec4(normal, 0.0);\n        vPosition = modelPosition.xyz;\n        vNormal = modelNormal.xyz;\n\n      }\n    ","8616180VqtIFY","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","vertexShader","trace","test","warn","console","glowSharpness","error","352GiVsVV","glowColor","transparent","14gZHead","74vszmNG","blending","string","init","toString","15909NzPKGG","2761VQugDb","gger","side","exception","info","#00d5ff","blendMode","return (function() ","call","uniforms","46086UznjIB","24xfnXsX","bind","prototype","stateObject","length","depthTest","counter","setValues","8903961igewvP","constructor","5sLREEw","falloff","46820hYOBix",'{}.constructor("return this")( )'];return(b=function(){return n})()}!function(n,t){for(var o=S,e=b();;)try{if(885713===-parseInt(o(309))/1*(parseInt(o(293))/2)+parseInt(o(298))/3*(parseInt(o(289))/4)+parseInt(o(266))/5*(-parseInt(o(280))/6)+parseInt(o(292))/7*(parseInt(o(270))/8)+-parseInt(o(264))/9+-parseInt(o(268))/10*(parseInt(o(299))/11)+-parseInt(o(310))/12*(-parseInt(o(271))/13))break;e.push(e.shift())}catch(r){e.push(e.shift())}}();var x=function(){var n=!0;return function(t,o){var e=n?function(){if(o){var n=o[S(273)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();!function(){x(this,(function(){var n=S,t=new RegExp("function *\\( *\\)"),o=new RegExp(n(281),"i"),e=k(n(296));t[n(284)](e+"chain")&&o[n(284)](e+n(274))?k():e("0")}))()}();var j=function(){var n=!0;return function(t,o){var e=n?function(){if(o){var n=o[S(273)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();function S(n,t){var o=b();return(S=function(n,t){return o[n-=260]})(n,t)}j(void 0,(function(){var n,t=S;try{n=Function(t(306)+t(269)+");")()}catch(l){n=window}for(var o=n[t(286)]=n[t(286)]||{},e=[t(276),t(285),t(303),t(288),t(302),"table",t(283)],r=0;r<e[t(260)];r++){var i=j[t(265)][t(312)].bind(j),a=e[r],s=o[a]||i;i[t(278)]=j[t(311)](j),i[t(297)]=s.toString[t(311)](s),o[a]=i}}))();const _=class extends o{constructor(n={}){var t=S;super(),this[t(282)]=t(279),this.fragmentShader="\n      uniform vec3 glowColor;\n      uniform float falloff;\n      uniform float glowSharpness;\n      uniform float glowInternalRadius;\n      uniform float opacity;\n\n      varying vec3 vPosition;\n      varying vec3 vNormal;\n\n      void main()\n      {\n        // Normal\n        vec3 normal = normalize(vNormal);\n        if(!gl_FrontFacing)\n            normal *= - 1.0;\n        vec3 viewDirection = normalize(cameraPosition - vPosition);\n        float fresnel = dot(viewDirection, normal);\n        fresnel = pow(fresnel, glowInternalRadius + 0.1);\n        float falloff = smoothstep(0., falloff, fresnel);\n        float fakeGlow = fresnel;\n        fakeGlow += fresnel * glowSharpness;\n        fakeGlow *= falloff;\n        gl_FragColor = vec4(clamp(glowColor * fresnel, 0., 1.0), clamp(fakeGlow, 0., opacity));\n\n        #include <tonemapping_fragment>\n        #include <colorspace_fragment>\n      } \n      ",this[t(308)]={opacity:new e(void 0!==n[t(272)]?n.opacity:1),glowInternalRadius:new e(void 0!==n.glowInternalRadius?n.glowInternalRadius:6),glowSharpness:new e(void 0!==n[t(287)]?n[t(287)]:.5),falloff:new e(void 0!==n[t(267)]?n[t(267)]:.1),glowColor:new e(void 0!==n[t(290)]?new r(n[t(290)]):new r(t(304)))},this[t(263)](n),this[t(261)]=void 0!==n[t(261)]&&n.depthTest,this[t(294)]=void 0!==n[t(305)]?n[t(305)]:i,this[t(291)]=!0,this[t(301)]=void 0!==n[t(301)]?n[t(301)]:a}};function k(n){function t(n){var o=S;if(typeof n===o(295))return function(n){}.constructor("while (true) {}")[o(273)](o(262));1!==(""+n/n)[o(260)]||n%20==0?function(){return!0}[o(265)]("debu"+o(300))[o(307)](o(277)):function(){return!1}[o(265)](o(275)+o(300))[o(273)](o(313)),t(++n)}try{if(n)return t;t(0)}catch(o){}}const R=z;!function(n,t){const o=z,e=L();for(;;)try{if(859660===-parseInt(o(498))/1+-parseInt(o(523))/2+parseInt(o(506))/3*(-parseInt(o(527))/4)+parseInt(o(512))/5*(-parseInt(o(495))/6)+parseInt(o(481))/7*(parseInt(o(478))/8)+parseInt(o(517))/9+parseInt(o(522))/10*(parseInt(o(533))/11))break;e.push(e.shift())}catch(r){e.push(e.shift())}}();const T=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[z(505)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();function z(n,t){const o=L();return(z=function(n,t){return o[n-=476]})(n,t)}!function(){T(this,(function(){const n=z,t=new RegExp(n(479)),o=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),e=V(n(514));t[n(530)](e+n(532))&&o.test(e+"input")?V():e("0")}))()}();const G=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[z(505)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();G(void 0,(function(){const n=z;let t;try{t=Function(n(536)+n(503)+");")()}catch(r){t=window}const o=t[n(483)]=t[n(483)]||{},e=[n(502),"warn",n(539),"error","exception","table",n(519)];for(let i=0;i<e[n(534)];i++){const t=G.constructor[n(476)][n(525)](G),r=e[i],a=o[r]||t;t.__proto__=G[n(525)](G),t.toString=a[n(518)][n(525)](a),o[r]=t}}))();const P=y(R(499),{position:[0,25,25],near:.1,fov:65},null,-1),C=y(R(521),{intensity:1.5},null,-1),N=y("TresDirectionalLight",{position:[100,100,60],intensity:20},null,-1),E=y(R(510),{args:[20,10]},null,-1),F={position:[0,6,0]},B=y(R(500),null,[y(R(528),{args:[4,.5,128,128]}),y(R(542),{color:R(488),roughness:.2,clearcoat:1})],-1),D=[R(540)];function L(){const n=["length","fakeGlow","return (function() ","action","pos-x.jpg","info","object","pos-z.jpg","TresMeshPhysicalMaterial","gger","opacity","prototype","glowInternalRadius","1481920eomIeO","function *\\( *\\)","Color","56xgkNCk","debu","console","DoubleSide","neg-y.jpg","BackSide","glowSharpness","blue","counter","neg-x.jpg","清晰度","addBinding","内半径","side","2214GLNHFY","https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/","glowColor","1023161VwmvRY","TresPerspectiveCamera","TresMesh","TresCanvas","log",'{}.constructor("return this")( )',"primitive","apply","2675469EITSLt","neg-z.jpg","value","FrontSide","TresGridHelper","#a058c1","2400qlLZwB","falloff","init","TorusKnotGeometry","string","8396748uDzych","toString","trace","材质面","TresAmbientLight","160aiHroD","2716080EuLxKe","uniforms","bind","pos-y.jpg","4cInSyA","TresTorusKnotGeometry","constructor","test","辉光参数","chain","1302752mvRTLw"];return(L=function(){return n})()}const M=u({__name:R(535),setup(o){const e=R,r=new c({title:e(531),expanded:!0}),i=f({glowColor:e(511),falloff:1.4,glowInternalRadius:3.7,glowSharpness:0,opacity:1,side:s[e(509)],depthTest:!1}),a=new _,u=new l(new(s[e(515)])(4,3.8,128,128),a);return r[e(492)](i,e(497),{label:"颜色"}),r[e(492)](i,"falloff",{label:"衰减",min:0,max:10,step:.1}),r[e(492)](i,e(477),{label:e(493),min:-5,max:5,step:.1}),r[e(492)](i,e(487),{label:e(491),min:0,max:10,step:.1}),r[e(492)](i,e(544),{label:"透明",min:0,max:1,step:.1}),r.addBinding(i,"side",{label:e(520),options:{FrontSide:s[e(509)],BackSide:s[e(486)],DoubleSide:s[e(484)]}}),p((()=>{const n=e;a.uniforms[n(513)][n(508)]=i[n(513)],a[n(524)].glowColor[n(508)]=new(s[n(480)])(i[n(497)]),a[n(524)][n(477)][n(508)]=i.glowInternalRadius,a.uniforms[n(487)][n(508)]=i[n(487)],a[n(524)].opacity[n(508)]=i[n(544)],a[n(494)]=i[n(494)]})),(o,r)=>{const i=e,a=g(i(501));return d(),m(a,{"window-size":""},{default:v((()=>[P,C,N,w(h(n),{autoRotate:""}),E,y("TresGroup",F,[B,y(i(504),{object:h(u)},null,8,D)]),(d(),m(I,null,{default:v((()=>[w(h(t),{files:[i(538),i(490),i(526),i(485),i(541),i(507)],path:i(496)})])),_:1}))])),_:1})}}});function V(n){function t(n){const o=z;if(typeof n===o(516))return function(n){}[o(529)]("while (true) {}").apply(o(489));1!==(""+n/n)[o(534)]||n%20==0?function(){return!0}[o(529)](o(482)+o(543)).call(o(537)):function(){return!1}.constructor(o(482)+o(543)).apply("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(o){}}export{M as default};
