import{a as e,N as t,r as n,t as o,d as r}from"./@tresjs.W42D3qe_1718612273914.js";import{B as s,r as i,C as a,f as p,V as c,ca as l,Z as u,cG as f}from"./three.HHcT7YAr1718612273914.js";import{l as m}from"./utils.CJ4f1P4x1718612273914.js";import{u as d}from"./@tweenjs.wviryjfq1718612273914.js";import{f as h}from"./utils.gUj1Glde1718612273914.js";import{c as y,d as g,a as j}from"./three-mesh-bvh.EwUvM4mC1718612273914.js";import{a3 as T,b as w,a2 as b,o as v,D as I,F as M,V as _,f as k,g as z,J as x,H as C,m as S,u as G,I as L,d as E,r as B,e as O,j as P,aj as D,ak as F,al as A}from"./@vue.CpOXM7bB1718612273914.js";import{m as H}from"./d3-geo.hgdnqE0g1718612273914.js";import"./@vueuse.YjRg4c7n1718612273914.js";import"./tweakpane.qqn77PB81718612273914.js";import"./@fesjs.K6L2Ptsw1718612273914.js";import"./vue-router.8CWAXHk21718612273914.js";import"./lodash-es.nFpJXAf-1718612273914.js";import"./@qlin.yHhFDldE1718612273914.js";import"./pinia.Io9o2y5w1718612273914.js";import"./@floating-ui.BPbuo5Gx1718612273914.js";import"./@juggle.7yjBMqoW1718612273914.js";import"./d3-array.E5C1cfJ61718612273914.js";const Z=["position"],R=["blending","map"],V=["name","renderOrder","pCenter"],q=["args"],$=["color","side"],J=["renderOrder","position-z"],K=["position"],N=x("TresLineBasicMaterial",{color:16777215,linewidth:.5},null,-1),Q=["renderOrder"],U=["position"],W=x("TresLineBasicMaterial",{color:0,linewidth:.5},null,-1),X={__name:"jiangSuMapMesh",async setup(r){let E,B;s.prototype.computeBoundsTree=y,s.prototype.disposeBoundsTree=g,i.prototype.raycast=j;const O=([E,B]=T((()=>m("./plugins/simpleGIS/json/320000_full.json","features"))),E=await E,B(),E),{map:P}=([E,B]=T((()=>t({map:"./plugins/simpleGIS/image/icon.png"}))),E=await E,B(),E),D=O[0].properties.centroid,F=H();F.center(D).translate([0,0]);const A=[];O.forEach((e=>{const t=new a("hsl( ".concat(16,", ").concat(30*Math.random()+55,"%, ").concat(30*Math.random()+55,"%)")).getHex(),n=.3*Math.random()+.3,{centroid:o,oneCenter:r,center:s,name:i}=e.properties,{coordinates:p,type:c}=e.geometry,l=o||r||s||[0,0],u=F(l);u[1]=-u[1],u[2]=n,A.push({type:"Html",position:u,name:i});const m=F(l);m[1]=.2-m[1],m[2]=n+.22,A.push({type:"Sprite",position:m}),p.forEach((e=>{function o(e){const o=new f;e.forEach(((e,t)=>{const[n,r]=F(e);0===t?o.moveTo(n,-r):o.lineTo(n,-r)})),A.push({type:"Shape",shape:o,name:i,color:t,depth:n,pCenter:m});const r=[];e.forEach((e=>{const[t,n]=F(e);r.push(t,-n,0)})),A.push({type:"Line",points:new Float32Array(r),depth:n})}"MultiPolygon"===c&&e.forEach((e=>o(e))),"Polygon"===c&&o(e)}))}));const X=w();b((()=>{X.value&&((e=>{e.rotation.x=-Math.PI/2;const t=(new p).setFromObject(e).getCenter(new c),n=[0,0];e.position.x=e.position.x-t.x-n[0],e.position.z=e.position.z-t.z-n[1]})(X.value),X.value.children.forEach((e=>{"Mesh"===e.type&&e.geometry.computeBoundsTree()})))}));const Y=e=>{e.object.material.opacity=.4},ee=e=>{e.material.opacity=1},{camera:te,controls:ne}=e(),oe=(e,t)=>{console.log("click",e,t);const n=new c;n.x=e.point.x,n.y=e.point.y+10,n.z=e.point.z,h(te,n,ne)},{onBeforeLoop:re}=n();re((()=>{d()}));const se={wrapperClass:"wrapper",as:"div",center:!0,sprite:!0,prepend:!0,transform:!0};return(e,t)=>(v(),I("TresGroup",{ref_key:"tgRef",ref:X},[(v(),I(M,null,_(A,((e,t)=>(v(),I(M,{key:"".concat(t)},["Html"===e.type?(v(),k(G(o),S({key:0},se,{position:e.position}),{default:z((()=>[x("span",null,C(e.name),1)])),_:2},1040,["position"])):L("",!0),"Sprite"===e.type?(v(),I("TresSprite",{key:1,position:e.position,scale:.3,renderOrder:1e3},[x("TresSpriteMaterial",{color:16711680,blending:l,map:G(P)},null,8,R)],8,Z)):L("",!0),"Shape"===e.type?(v(),I("TresMesh",{key:2,name:e.name,renderOrder:t,pCenter:e.pCenter,onPointerEnter:Y,onPointerLeave:ee,onClick:oe},[x("TresExtrudeGeometry",{args:[e.shape,{depth:e.depth,bevelEnabled:!1}]},null,8,q),x("TresMeshStandardMaterial",{color:e.color,emissive:0,roughness:.45,metalness:.8,transparent:!0,side:u},null,8,$)],40,V)):L("",!0),"Line"===e.type?(v(),I(M,{key:3},[x("TresLine",{renderOrder:t,"position-z":e.depth+1e-4},[x("TresBufferGeometry",{position:[e.points,3]},null,8,K),N],8,J),x("TresLine",{renderOrder:t,"position-z":-1e-4},[x("TresBufferGeometry",{position:[e.points,3]},null,8,U),W],8,Q)],64)):L("",!0)],64)))),64))],512))}},Y=le;!function(e,t){const n=le,o=ne();for(;;)try{if(815487===-parseInt(n(222))/1+parseInt(n(251))/2+parseInt(n(242))/3*(parseInt(n(254))/4)+-parseInt(n(259))/5*(parseInt(n(241))/6)+parseInt(n(226))/7*(parseInt(n(234))/8)+parseInt(n(225))/9+-parseInt(n(237))/10)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const ee=function(){let e=!0;return function(t,n){const o=e?function(){if(n){const e=n[le(221)](t,arguments);return n=null,e}}:function(){};return e=!1,o}}();!function(){ee(this,(function(){const e=le,t=new RegExp(e(227)),n=new RegExp(e(228),"i"),o=fe(e(233));t[e(257)](o+e(247))&&n[e(257)](o+e(249))?fe():o("0")}))()}();const te=function(){let e=!0;return function(t,n){const o=e?function(){if(n){const e=n[le(221)](t,arguments);return n=null,e}}:function(){};return e=!1,o}}();function ne(){const e=["string","2253850rDFurd","exception","log","4LapGIG","toString","table","test","return (function() ","15SAPuhG","warn","apply","917486Zjafgq","error","console","10094553UTixfz","7byalfs","function *\\( *\\)","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","while (true) {}","trace","#ffdbd1","stateObject","init","7944064QvmmTG","gger","jiangSuMap","13057850zywVgw","__proto__","length","bind","2580114KPkfvW","3261795ggCcTy",'{}.constructor("return this")( )',"TresPerspectiveCamera","counter","TresDirectionalLight","chain","constructor","input"];return(ne=function(){return e})()}te(void 0,(function(){const e=le;let t;try{t=Function(e(258)+e(243)+");")()}catch(r){t=window}const n=t[e(224)]=t.console||{},o=[e(253),e(220),"info",e(223),e(252),e(256),e(230)];for(let s=0;s<o[e(239)];s++){const t=te[e(248)].prototype[e(240)](te),r=o[s],i=n[r]||t;t[e(238)]=te.bind(te),t[e(255)]=i[e(255)][e(240)](i),n[r]=t}}))();const oe=x(Y(244),{position:[0,12,0],fov:75,near:.1,far:1e3,up:[0,0,-1]},null,-1),re=x("TresAmbientLight",{intensity:8.8},null,-1),se=x(Y(246),{position:[0,10,5],intensity:.2},null,-1),ie=x(Y(246),{position:[0,10,-5],intensity:.2},null,-1),ae=x(Y(246),{position:[5,10,0],intensity:.2},null,-1),pe=x("TresDirectionalLight",{position:[-5,10,0],intensity:.2},null,-1),ce=x("TresGridHelper",{args:[20,10]},null,-1);function le(e,t){const n=ne();return(le=function(e,t){return n[e-=220]})(e,t)}const ue=E({__name:Y(236),setup(e){const t=B({clearColor:Y(231),alpha:!0,antialias:!0}),n=B({enableDamping:!0,dampingFactor:.05,makeDefault:!0});return(e,o)=>{const s=O("TresCanvas");return v(),k(s,S(t,{"window-size":""}),{default:z((()=>[oe,P(G(r),D(F(n)),null,16),re,se,ie,ae,pe,ce,(v(),k(A,null,{default:z((()=>[P(X)])),_:1}))])),_:1},16)}}});function fe(e){function t(e){const n=le;if(typeof e===n(250))return function(e){}[n(248)](n(229))[n(221)](n(245));1!==(""+e/e)[n(239)]||e%20==0?function(){return!0}.constructor("debu"+n(235)).call("action"):function(){return!1}[n(248)]("debu"+n(235))[n(221)](n(232)),t(++e)}try{if(e)return t;t(0)}catch(n){}}export{ue as default};
