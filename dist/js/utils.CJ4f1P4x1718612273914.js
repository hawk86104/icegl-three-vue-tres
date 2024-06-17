import{a as t,B as n,r as e,bY as o,C as r,j as s,Z as c}from"./three.HHcT7YAr1718612273914.js";import{x as i}from"./@fesjs.K6L2Ptsw1718612273914.js";import{N as a}from"./@tresjs.W42D3qe_1718612273914.js";import{c as u,d as f,a as p}from"./three-mesh-bvh.EwUvM4mC1718612273914.js";!function(t,n){const e=m,o=y();for(;;)try{if(336378===parseInt(e(436))/1+-parseInt(e(470))/2*(parseInt(e(464))/3)+parseInt(e(487))/4*(-parseInt(e(452))/5)+parseInt(e(424))/6+parseInt(e(480))/7+-parseInt(e(456))/8*(parseInt(e(489))/9)+parseInt(e(423))/10)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const l=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[m(453)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function m(t,n){const e=y();return(m=function(t,n){return e[t-=412]})(t,n)}!function(){l(this,(function(){const t=m,n=new RegExp("function *\\( *\\)"),e=new RegExp(t(463),"i"),o=_(t(431));n[t(467)](o+t(421))&&e.test(o+"input")?_():o("0")}))()}();const g=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[m(453)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();g(void 0,(function(){const t=m;let n;try{n=Function(t(490)+'{}.constructor("return this")( ));')()}catch(r){n=window}const e=n.console=n[t(471)]||{},o=[t(442),t(488),t(482),t(426),t(446),"table",t(415)];for(let s=0;s<o[t(475)];s++){const n=g[t(486)][t(462)].bind(g),r=o[s],c=e[r]||n;n[t(474)]=g[t(438)](g),n[t(465)]=c.toString[t(438)](c),e[r]=n}}))();const h=(n,e=!1)=>{const o=m;n[o(476)]();const{max:r,min:s}=n[o(432)];n[o(458)]("uv");const c=r.x-s.x,i=r.y-s.y,a=[];for(let t=0;t<n[o(425)][o(466)][o(483)];t++)e?(a[o(445)]((n.attributes[o(466)][o(479)](t)-(s.x+r.x)/2)/c),a[o(445)]((n[o(425)][o(466)][o(414)](t)-(s.y+r.y)/2)/i)):(a[o(445)]((n[o(425)][o(466)][o(479)](t)-s.x)/c),a[o(445)]((n[o(425)][o(466)].getY(t)-s.y)/i));const u=new Float32Array(a);n[o(451)]("uv",new t(u,2))},d=(t,n)=>new Promise(((e,o)=>{const r=m;i(t,{},{method:r(416)})[r(434)]((t=>{n&&e(t[n]),e(t.features)}))[r(449)]((t=>{console[r(426)](t),o(t)}))}));function y(){const t=["attributes","error","raycast","string","set","reflectivity","init","boundingBox","disposeBoundsTree","then","divideScalar","468240BSqqea","sub","bind","forEach","applyMatrix4","stateObject","log","min","debu","push","exception","expandByObject","depthTest","catch","depthWrite","setAttribute","270YfJJUs","apply","call","random","24vSZkdu","counter","deleteAttribute","children","geometry","copy","prototype","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","3HiVEdY","toString","position","test","Box3","add","1124842yaHxoU","console","Vector3","clone","__proto__","length","computeBoundingBox","negate","while (true) {}","getX","4367468iohCPu","computeBoundsTree","info","count","gger","getSize","constructor","29724msxTuR","warn","1591047cwIZbD","return (function() ","uniforms","material","getY","trace","get","getCenter","transparent","value","max","chain","center","5251920VHTndt","1278396RDHvnn"];return(y=function(){return t})()}const w=t=>{const n=m,e=(new(THREE[n(468)])).setFromObject(t),o=new(THREE[n(472)]);e[n(417)](o),t[n(459)][n(439)]((t=>{const e=n;t.position[e(437)](o)})),t.position.copy(o[n(477)]())},x=()=>{const t=m;n.prototype[t(481)]=u,n[t(462)][t(433)]=f,e[t(462)][t(427)]=p},b=async t=>{const n=m,e=await a(["./plugins/water/images/Water_1_M_Normal.jpg","./plugins/water/images/Water_2_M_Normal.jpg"]),i=t.geometry[n(473)]();h(i),i[n(481)]();const u=new o(i,{color:new r("#fff"),scale:20,flowDirection:new s(1,1),textureWidth:1024,textureHeight:1024,normalMap0:e[0],normalMap1:e[1]});return u[n(413)][n(418)]=!0,u[n(413)][n(450)]=!0,u[n(413)][n(448)]=!0,u[n(413)].side=c,u.material[n(412)].config[n(419)].w=20,u.material[n(412)][n(430)][n(419)]=.46,u};function j(t){const n=m,e=[];for(let r=0;r<t[n(475)];r++)e[n(445)](new s(t[r].x,t[r].y));const o=new s;for(let r=0;r<e[n(475)];r++)o[n(469)](e[r]);o[n(435)](e[n(475)]);for(let r=0;r<e.length;r++)e[r][n(437)](o);return{points:e,centerPoint:o}}function _(t){function n(t){const e=m;if(typeof t===e(428))return function(t){}[e(486)](e(478))[e(453)](e(457));1!==(""+t/t)[e(475)]||t%20==0?function(){return!0}.constructor(e(444)+e(484))[e(454)]("action"):function(){return!1}[e(486)](e(444)+e(484))[e(453)](e(441)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{w as a,j as g,x as i,d as l,h as r,b as s};
