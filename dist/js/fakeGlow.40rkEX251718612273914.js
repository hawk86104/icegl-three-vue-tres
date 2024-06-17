import{d as n,H as t}from"./@tresjs.W42D3qe_1718612273914.js";import{k as o,b9 as e,C as r,aM as i,Z as a,a5 as s,x as l}from"./three.HHcT7YAr1718612273914.js";import{P as c}from"./tweakpane.qqn77PB81718612273914.js";import{d as u,r as f,a2 as p,e as g,o as d,f as v,g as m,j as h,u as w,J as y,al as b}from"./@vue.CpOXM7bB1718612273914.js";import"./@vueuse.YjRg4c7n1718612273914.js";!function(n,t){for(var o=_,e=j();;)try{if(981794===parseInt(o(376))/1+-parseInt(o(375))/2+-parseInt(o(400))/3*(-parseInt(o(404))/4)+-parseInt(o(399))/5+parseInt(o(397))/6*(-parseInt(o(377))/7)+-parseInt(o(378))/8*(parseInt(o(367))/9)+parseInt(o(387))/10*(parseInt(o(390))/11))break;e.push(e.shift())}catch(r){e.push(e.shift())}}();var I=function(){var n=!0;return function(t,o){var e=n?function(){if(o){var n=o[_(388)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();!function(){I(this,(function(){var n=_,t=new RegExp(n(374)),o=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),e=R(n(389));t[n(371)](e+n(407))&&o.test(e+"input")?R():e("0")}))()}();var x=function(){var n=!0;return function(t,o){var e=n?function(){if(o){var n=o[_(388)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();function j(){var n=["vertexShader","glowSharpness","trace","fragmentShader","blendMode","gger","counter","uniforms","17377530GnRJUx","apply","init","33dMVEZo","while (true) {}","bind","constructor","exception","__proto__","setValues","9454344VDauBP","side","8968545FdgnFW","3txfOot","action","blending","transparent","594856Fzvzqy","opacity","depthTest","chain","warn","glowColor","falloff","error","2902608JhFCHi","info","string","call","test","console","\n      varying vec3 vPosition;\n      varying vec3 vNormal;\n\n      void main() {\n        vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n        gl_Position = projectionMatrix * viewMatrix * modelPosition;\n        vec4 modelNormal = modelMatrix * vec4(normal, 0.0);\n        vPosition = modelPosition.xyz;\n        vNormal = modelNormal.xyz;\n\n      }\n    ","function *\\( *\\)","2145050VqjexH","706803bpgRHI","7tyhVnC","16pJMaPi"];return(j=function(){return n})()}function _(n,t){var o=j();return(_=function(n,t){return o[n-=364]})(n,t)}x(void 0,(function(){for(var n=_,t=function(){var n;try{n=Function('return (function() {}.constructor("return this")( ));')()}catch(t){n=window}return n}(),o=t.console=t[n(372)]||{},e=["log",n(408),n(368),n(366),n(394),"table",n(381)],r=0;r<e.length;r++){var i=x[n(393)].prototype.bind(x),a=e[r],s=o[a]||i;i[n(395)]=x[n(392)](x),i.toString=s.toString[n(392)](s),o[a]=i}}))();const S=class extends o{constructor(n={}){var t=_;super(),this[t(379)]=t(373),this[t(382)]="\n      uniform vec3 glowColor;\n      uniform float falloff;\n      uniform float glowSharpness;\n      uniform float glowInternalRadius;\n      uniform float opacity;\n\n      varying vec3 vPosition;\n      varying vec3 vNormal;\n\n      void main()\n      {\n        // Normal\n        vec3 normal = normalize(vNormal);\n        if(!gl_FrontFacing)\n            normal *= - 1.0;\n        vec3 viewDirection = normalize(cameraPosition - vPosition);\n        float fresnel = dot(viewDirection, normal);\n        fresnel = pow(fresnel, glowInternalRadius + 0.1);\n        float falloff = smoothstep(0., falloff, fresnel);\n        float fakeGlow = fresnel;\n        fakeGlow += fresnel * glowSharpness;\n        fakeGlow *= falloff;\n        gl_FragColor = vec4(clamp(glowColor * fresnel, 0., 1.0), clamp(fakeGlow, 0., opacity));\n\n        #include <tonemapping_fragment>\n        #include <colorspace_fragment>\n      } \n      ",this[t(386)]={opacity:new e(void 0!==n[t(405)]?n[t(405)]:1),glowInternalRadius:new e(void 0!==n.glowInternalRadius?n.glowInternalRadius:6),glowSharpness:new e(void 0!==n[t(380)]?n[t(380)]:.5),falloff:new e(void 0!==n[t(365)]?n[t(365)]:.1),glowColor:new e(void 0!==n[t(364)]?new r(n[t(364)]):new r("#00d5ff"))},this[t(396)](n),this[t(406)]=void 0!==n[t(406)]&&n[t(406)],this[t(402)]=void 0!==n[t(383)]?n[t(383)]:i,this[t(403)]=!0,this[t(398)]=void 0!==n[t(398)]?n.side:a}};function R(n){function t(n){var o=_;if(typeof n===o(369))return function(n){}[o(393)](o(391)).apply(o(385));1!==(""+n/n).length||n%20==0?function(){return!0}[o(393)]("debugger")[o(370)](o(401)):function(){return!1}.constructor("debu"+o(384))[o(388)]("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(o){}}const k=P;!function(n,t){const o=P,e=N();for(;;)try{if(940762===-parseInt(o(298))/1*(-parseInt(o(333))/2)+parseInt(o(323))/3*(parseInt(o(290))/4)+parseInt(o(299))/5+parseInt(o(318))/6+parseInt(o(339))/7+parseInt(o(328))/8*(-parseInt(o(280))/9)+-parseInt(o(274))/10)break;e.push(e.shift())}catch(r){e.push(e.shift())}}();const z=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[P(316)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();!function(){z(this,(function(){const n=P,t=new RegExp(n(283)),o=new RegExp(n(303),"i"),e=Z("init");t[n(282)](e+n(306))&&o.test(e+"input")?Z():e("0")}))()}();const C=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o.apply(t,arguments);return o=null,n}}:function(){};return n=!1,e}}();function P(n,t){const o=N();return(P=function(n,t){return o[n-=270]})(n,t)}C(void 0,(function(){const n=P;let t;try{t=Function("return (function() "+n(295)+");")()}catch(r){t=window}const o=t[n(334)]=t[n(334)]||{},e=[n(313),n(307),"info",n(271),n(337),n(336),n(291)];for(let i=0;i<e.length;i++){const t=C[n(294)][n(297)][n(304)](C),r=e[i],a=o[r]||t;t[n(315)]=C[n(304)](C),t.toString=a[n(322)][n(304)](a),o[r]=t}}))();const T=y(k(272),{position:[0,25,25],near:.1,fov:65},null,-1),M=y(k(335),{intensity:1.5},null,-1),B=y(k(329),{position:[100,100,60],intensity:20},null,-1),F=y(k(324),{args:[20,10]},null,-1),G={position:[0,6,0]},D=y("TresMesh",null,[y(k(311),{args:[4,.5,128,128]}),y("TresMeshPhysicalMaterial",{color:"blue",roughness:.2,clearcoat:1})],-1),V=[k(319)],A=u({__name:k(293),setup(o){const e=k,r=new c({title:e(273),expanded:!0}),i=f({glowColor:e(296),falloff:1.4,glowInternalRadius:3.7,glowSharpness:0,opacity:1,side:s[e(338)],depthTest:!1}),a=new S,u=new(s[e(321)])(new(s[e(289)])(4,3.8,128,128),a);return r[e(309)](i,e(279),{label:"颜色"}),r[e(309)](i,e(285),{label:"衰减",min:0,max:10,step:.1}),r[e(309)](i,e(292),{label:"内半径",min:-5,max:5,step:.1}),r[e(309)](i,"glowSharpness",{label:"清晰度",min:0,max:10,step:.1}),r.addBinding(i,e(312),{label:"透明",min:0,max:1,step:.1}),r.addBinding(i,e(281),{label:e(270),options:{FrontSide:l,BackSide:s[e(340)],DoubleSide:s[e(317)]}}),p((()=>{const n=e;a[n(275)].falloff.value=i[n(285)],a[n(275)].glowColor[n(325)]=new(s[n(326)])(i[n(279)]),a[n(275)][n(292)][n(325)]=i[n(292)],a[n(275)][n(278)][n(325)]=i[n(278)],a[n(275)][n(312)][n(325)]=i[n(312)],a.side=i[n(281)]})),(o,r)=>{const i=e,a=g(i(305));return d(),v(a,{"window-size":""},{default:m((()=>[T,M,B,h(w(n),{autoRotate:""}),F,y(i(288),G,[D,y(i(300),{object:w(u)},null,8,V)]),(d(),v(b,null,{default:m((()=>[h(w(t),{files:[i(314),i(330),i(286),i(327),i(308),i(320)],path:i(287)},null,8,[i(331)])])),_:1}))])),_:1})}}});function N(){const n=["pos-z.jpg","addBinding","debu","TresTorusKnotGeometry","opacity","log","pos-x.jpg","__proto__","apply","DoubleSide","10090134JjXVBP","object","neg-z.jpg","Mesh","toString","9kaBVBl","TresGridHelper","value","Color","neg-y.jpg","2728fYRTWr","TresDirectionalLight","neg-x.jpg","files","gger","2yDjucA","console","TresAmbientLight","table","exception","FrontSide","6654515ATmDRs","BackSide","材质面","error","TresPerspectiveCamera","辉光参数","18551080Ikevem","uniforms","string","length","glowSharpness","glowColor","47484CMxwaz","side","test","function *\\( *\\)","action","falloff","pos-y.jpg","https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/","TresGroup","TorusKnotGeometry","1547012kaWzWc","trace","glowInternalRadius","fakeGlow","constructor",'{}.constructor("return this")( )',"#a058c1","prototype","367079fRBgUv","2176570xVDvsb","primitive","counter","call","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","bind","TresCanvas","chain","warn"];return(N=function(){return n})()}function Z(n){function t(n){const o=P;if(typeof n===o(276))return function(n){}[o(294)]("while (true) {}").apply(o(301));1!==(""+n/n)[o(277)]||n%20==0?function(){return!0}.constructor(o(310)+o(332))[o(302)](o(284)):function(){return!1}[o(294)]("debu"+o(332)).apply("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(o){}}export{A as default};
