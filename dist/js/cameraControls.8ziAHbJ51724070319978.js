import{q as t,_ as n}from"./@tresjs.2JnKj_Yj1724070319978.js";import{bS as e,ab as o,ad as a,h as r}from"./three.QUrV0R7c1724070319978.js";import{d as s,r as l,X as i,e as u,o as c,f as d,g as f,j as p,u as v,m as h,J as m}from"./@vue.Q1VpS3901724070319978.js";import"./tweakpane.yHWGBmom1724070319978.js";import"./@vueuse.2Yfo77CO1724070319978.js";function g(t,n){const e=_();return(g=function(t,n){return e[t-=145]})(t,n)}const b=g;!function(t,n){const e=g,o=_();for(;;)try{if(831050===parseInt(e(178))/1*(-parseInt(e(206))/2)+parseInt(e(175))/3*(parseInt(e(153))/4)+-parseInt(e(209))/5*(parseInt(e(169))/6)+-parseInt(e(154))/7+parseInt(e(185))/8*(-parseInt(e(184))/9)+-parseInt(e(148))/10+-parseInt(e(212))/11*(-parseInt(e(152))/12))break;o.push(o.shift())}catch(a){o.push(o.shift())}}();const y=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[g(208)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){y(this,(function(){const t=g,n=new RegExp(t(158)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=R(t(172));n[t(176)](o+t(147))&&e.test(o+t(145))?R():o("0")}))()}();const x=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[g(208)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();x(void 0,(function(){const t=g;let n;try{n=Function(t(156)+t(182)+");")()}catch(a){n=window}const e=n[t(149)]=n[t(149)]||{},o=[t(195),t(201),t(186),t(202),t(166),t(161),t(196)];for(let r=0;r<o[t(168)];r++){const n=x[t(205)].prototype[t(210)](x),a=o[r],s=e[a]||n;n[t(189)]=x[t(210)](x),n[t(192)]=s[t(192)].bind(s),e[a]=n}}))();const I=m(b(203),{position:[5,5,5]},null,-1),w=m(b(159),{position:[0,-1,0]},null,-1),B=[m(b(188),{args:[2,2,2]},null,-1),m(b(183),{color:"orange",wireframe:""},null,-1)],D=m("TresAmbientLight",{intensity:1},null,-1);function _(){const t=["距离参数","function *\\( *\\)","TresGridHelper","addBinding","table","boxMeshRef","(+1)","TresCanvas","value","exception","DEG2RAD","length","582Krohxo","addFolder","cameraControls","init","controlsRef","rotate","2357763JIheWH","test","call","1057PNSyTL","maxDistance","click","Rotate theta 360°",'{}.constructor("return this")( )',"TresMeshBasicMaterial","333xQgPdO","43184AhvMuv","info","#82DBC5","TresBoxGeometry","__proto__","gger","addButton","toString","dolly","(-1)","log","trace","counter","设置距离","TresMesh","action","warn","error","TresPerspectiveCamera","minDistance","constructor","2906OFHaUP","end","apply","54035ykGYle","bind","对焦到 box of the mesh","11879065AvnnAZ","input","change","chain","10862010qDvzjL","console","while (true) {}","start","60GrjSXE","4vczPFN","10390933ydXeCt","最小距离","return (function() "];return(_=function(){return t})()}const j=s({__name:b(171),setup(s){const g=b,y={clearColor:g(187),shadows:!0,alpha:!1,shadowMapType:e,outputColorSpace:o,toneMapping:a},x=l({distance:5,minDistance:0,maxDistance:100}),_=i(),j=i(),{pane:R}=t(),T=R[g(170)]({title:g(157)});T[g(160)](x,"distance",{label:g(198),step:.01,min:0,max:100}),T.addBinding(x,g(204),{label:g(155),step:.01,min:0,max:10}),T[g(160)](x,g(179),{label:"最大距离",step:.01,min:0,max:100});const k=R[g(170)]({title:"远近"});k.addButton({title:g(163)}).on(g(180),(()=>{var t,n;const e=g;null==(n=null==(t=null==_?void 0:_[e(165)])?void 0:t[e(165)])||n.dolly(1,!0)})),k.addButton({title:g(194)}).on(g(180),(()=>{var t,n;const e=g;null==(n=null==(t=null==_?void 0:_[e(165)])?void 0:t[e(165)])||n[e(193)](-1,!0)}));const A=R.addFolder({title:"旋转"});A[g(191)]({title:"Rotate theta 45°"}).on(g(180),(()=>{var t,n;const e=g;null==(n=null==(t=null==_?void 0:_.value)?void 0:t[e(165)])||n[e(174)](45*r[e(167)],0,!0)})),A.addButton({title:"Rotate theta -90°"}).on("click",(()=>{var t,n;const e=g;null==(n=null==(t=null==_?void 0:_.value)?void 0:t[e(165)])||n[e(174)](-90*r.DEG2RAD,0,!0)})),A.addButton({title:g(181)}).on(g(180),(()=>{var t,n;const e=g;null==(n=null==(t=null==_?void 0:_.value)?void 0:t.value)||n[e(174)](360*r.DEG2RAD,0,!0)})),A.addButton({title:"Rotate phi 20°"}).on(g(180),(()=>{var t,n;const e=g;null==(n=null==(t=null==_?void 0:_.value)?void 0:t[e(165)])||n[e(174)](0,20*r[e(167)],!0)}));function C(){const t=g;console[t(195)](t(146))}function E(){const t=g;console[t(195)](t(151))}function G(){const t=g;console[t(195)](t(207))}return R[g(170)]({title:"移动"})[g(191)]({title:g(211)}).on(g(180),(()=>{var t,n;const e=g;null==(n=null==(t=null==_?void 0:_.value)?void 0:t[e(165)])||n.fitToBox(j[e(165)],!0)})),(t,e)=>{const o=g,a=u(o(164));return c(),d(a,h(y,{"window-size":""}),{default:f((()=>[I,p(v(n),h(x,{ref_key:o(173),ref:_,"make-default":"",onChange:C,onStart:E,onEnd:G}),null,16),w,m(o(199),{ref_key:o(162),ref:j},B,512),D])),_:1},16)}}});function R(t){function n(t){const e=g;if("string"==typeof t)return function(t){}[e(205)](e(150))[e(208)](e(197));1!==(""+t/t).length||t%20==0?function(){return!0}[e(205)]("debu"+e(190))[e(177)](e(200)):function(){return!1}[e(205)]("debu"+e(190))[e(208)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{j as default};
