import{T as t,Z as n}from"./three.HHcT7YAr1718612273914.js";import{_ as e}from"./heatmap.js-fix.Ix1ytkvC1718612273914.js";import{d as o,a2 as r,o as a,D as i,J as s,aj as c,ak as u}from"./@vue.CpOXM7bB1718612273914.js";const l=p;!function(t,n){const e=p,o=g();for(;;)try{if(208637===parseInt(e(508))/1+parseInt(e(478))/2*(-parseInt(e(493))/3)+-parseInt(e(492))/4+parseInt(e(480))/5*(parseInt(e(486))/6)+parseInt(e(523))/7+-parseInt(e(474))/8*(-parseInt(e(509))/9)+parseInt(e(522))/10*(-parseInt(e(482))/11))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const h=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[p(481)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function p(t,n){const e=g();return(p=function(t,n){return e[t-=465]})(t,n)}!function(){h(this,(function(){const t=p,n=new RegExp(t(502)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=y(t(514));n.test(o+t(503))&&e[t(470)](o+"input")?y():o("0")}))()}();const f=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[p(481)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();f(void 0,(function(){const t=p,n=function(){const t=p;let n;try{n=Function(t(519)+t(491)+");")()}catch(e){n=window}return n}(),e=n.console=n[t(467)]||{},o=[t(520),t(483),t(517),t(501),t(511),t(518),"trace"];for(let r=0;r<o.length;r++){const n=f[t(495)][t(489)].bind(f),a=o[r],i=e[a]||n;n.__proto__=f.bind(f),n[t(506)]=i[t(506)].bind(i),e[a]=n}}))();const v=[l(497)],d=[l(485),"rotate-x"];function g(){const t=["absolute","prototype","TresMesh",'{}.constructor("return this")( )',"604576FJRMWi","791139FLlvGj","while (true) {}","constructor","string","position","setData","uniforms","width","error","function *\\( *\\)","chain","left","push","toString","heightRatio","193103nYVXXs","549vQzHyA","show2dCanvas","exception","appendChild","\n\tvarying float hValue;\n\tvarying vec3 cl;\n\tvoid main() {\n\t\tfloat v = abs(hValue - 1.);\n\t\tgl_FragColor = vec4(cl, .8 - v * v*1.1) ; \n\t}","init","TresPlaneGeometry","style","info","table","return (function() ","log","heatmap-canvas","20eCiIWe","1134560QEbjrY","body","debu","gger","canvas","display","console","_renderer","top","test","action","value","length","25624YwQhDU","call","none","Plane","2ZeikQj","block","10vcCIvc","apply","63943WkmtDt","warn","height","args","253662vcHHVJ","TresShaderMaterial"];return(g=function(){return t})()}const m=o({__name:"heatmapJS",props:{position:{default:[0,0,0]},Plane:{default:[50,50,1e3,1e3]},show2dCanvas:{type:Boolean,default:!0},heightRatio:{default:6}},setup(o,{expose:h}){const f=l,g=o;let m=null;const y=(t,n)=>Math.round(10*(Math.random()*(t-n+1)+n))/10;let x=null;const b=t=>{const n=p;if(t);else{let e=0;for(t=[];e<2e3;)t[n(505)]({x:y(1,256),y:y(1,256),value:y(1,6)}),e++}m[n(498)]({max:12,data:t}),I.needsUpdate=!0},I=new t((()=>{const t=p;return x=document.createElement(t(521)),x[t(500)]=100,x[t(484)]=100,x[t(516)][t(497)]=t(488),x[t(516)][t(469)]="0",x[t(516)][t(504)]="0",document[t(524)][t(512)](x),m=e.create({container:x,width:256,height:256,blur:".8",radius:10}),m})()[f(468)][f(465)]);b();const w={transparent:!0,side:n,vertexShader:"\n\tuniform sampler2D heightMap;\n\tuniform float heightRatio;\n\tvarying vec2 vUv;\n\tvarying float hValue;\n\tvarying vec3 cl;\n\tvoid main() {\n\t  vUv = uv;\n\t  vec3 pos = position;\n\t  cl = texture2D(heightMap, vUv).rgb;\n\t  hValue = texture2D(heightMap, vUv).r;\n\t  pos.y = hValue * heightRatio;\n\t  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);\n\t}",fragmentShader:f(513),uniforms:{heightMap:{type:"t",value:I},heightRatio:{value:g.heightRatio}}};return r((()=>{const t=f;x[t(516)][t(466)]=""+(g[t(510)]?t(479):t(476)),g[t(507)]&&(w[t(499)].heightRatio[t(472)]=g.heightRatio)})),h({setData:b}),(t,n)=>{const e=f;return a(),i(e(490),{position:g[e(497)]},[s(e(515),{args:g[e(477)],"rotate-x":.5*-Math.PI},null,8,d),s(e(487),c(u(w)),null,16)],8,v)}}});function y(t){function n(t){const e=p;if(typeof t===e(496))return function(t){}.constructor(e(494))[e(481)]("counter");1!==(""+t/t)[e(473)]||t%20==0?function(){return!0}[e(495)](e(525)+e(526))[e(475)](e(471)):function(){return!1}.constructor(e(525)+e(526))[e(481)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{m as _};
