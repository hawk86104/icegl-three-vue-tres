import{b as n}from"./pagesShow.vue_vue_type_script_setup_true_lang.flNBAz211718698100638.js";import{bY as t,m as e,bW as o,c5 as r,k as i,a5 as u,cf as s,C as c}from"./three.erXpfL-r1718698100638.js";import{a,r as l}from"./@tresjs.aawOCoPx1718698100638.js";import{d as p,a2 as f,r as d,o as m,f as v,g as h,j as w,aj as x,ak as P}from"./@vue.CpOXM7bB1718698100638.js";import{P as g}from"./tweakpane.qqn77PB81718698100638.js";import"./three-custom-shader-material.tCYfd9sl1718698100638.js";import"./object-hash.SpRbwitp1718698100638.js";import"./@amap.TW6HTmRb1718698100638.js";import"./jszip.KspeudHJ1718698100638.js";import"./glsl-tokenizer.RLlRtTA81718698100638.js";import"./glsl-token-string.IbwI77yI1718698100638.js";import"./glsl-token-functions.LDKY2qLw1718698100638.js";import"./@vueuse.TW6-TkVF1718698100638.js";!function(n,t){const e=y,o=_();for(;;)try{if(929364===parseInt(e(208))/1+-parseInt(e(175))/2+parseInt(e(179))/3+parseInt(e(173))/4*(-parseInt(e(212))/5)+-parseInt(e(190))/6+parseInt(e(174))/7*(-parseInt(e(192))/8)+parseInt(e(207))/9)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const S=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[y(216)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function y(n,t){const e=_();return(y=function(n,t){return e[n-=172]})(n,t)}!function(){S(this,(function(){const n=y,t=new RegExp("function *\\( *\\)"),e=new RegExp(n(200),"i"),o=I("init");t[n(196)](o+"chain")&&e[n(196)](o+"input")?I():o("0")}))()}();const b=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[y(216)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();b(void 0,(function(){const n=y,t=function(){const n=y;let t;try{t=Function("return (function() "+n(191)+");")()}catch(e){t=window}return t}(),e=t[n(198)]=t.console||{},o=[n(188),n(209),n(177),"error",n(214),"table","trace"];for(let r=0;r<o[n(185)];r++){const t=b[n(202)][n(182)].bind(b),i=o[r],u=e[i]||t;t[n(184)]=b[n(217)](b),t.toString=u[n(181)].bind(u),e[i]=t}}))();const j=p({__name:"buildingsPassA",props:{color:{default:"#FFF"},uScalenum:{default:150},uScaleone:{default:24},uWidth:{default:1},speed:{default:1},uPosition:{default:{x:0,y:0}}},setup(n){const p=n,{renderer:d,scene:m,camera:v,sizes:h}=a();let w,x=0,P=null,g=null;f((()=>{const n=y;h[n(176)][n(194)]&&(w=h[n(176)][n(194)],x=h[n(211)][n(194)],(()=>{const n=y;P=new t(d.value);const c=new e(w,x);P.readBuffer.depthBuffer=!0,P[n(197)][n(193)]=c;const a=new o(m.value,v[n(194)]);P[n(215)](a),g=new r(new i({uniforms:{time:{value:0},tDiffuse:{value:null},depthTexture:{value:c},uProjectionInverse:{value:v[n(194)][n(205)]},uMatrixWorld:{value:v[n(194)][n(186)]},uColor:{value:new(u[n(180)])(p[n(183)])},uScalenum:{value:p.uScalenum},uScaleone:{value:p[n(218)]},uWidth:{value:p[n(206)]},uPosition:{value:new(u[n(204)])(p.uPosition.x,p.uPosition.y)}},vertexShader:"varying vec2 vUv;\nvarying vec3 vPosition;\n\nvoid main(){\n\tvUv=uv;\n\tvPosition=position;\n\tgl_Position=vec4(position,1.);\n}\n",fragmentShader:"varying vec2 vUv;\nvarying vec3 vPosition;\nuniform sampler2D tDiffuse;\nuniform sampler2D depthTexture;\n\nuniform mat4 uProjectionInverse;\nuniform mat4 uMatrixWorld;\n\nuniform float time;\nuniform vec3 uColor;\nuniform float uScalenum;//最大范围\nuniform float uScaleone;//单条圈间距\nuniform float uWidth;//单条厚度\nuniform vec2 uPosition;//位置\n\nvec3 WorldPosFromDepth(float depth){\n\tfloat z=(depth-.5)*2.;\n\tvec4 clipSpacePosition=vec4(vPosition.xy,z,1.);\n\tvec4 viewSpacePosition=uProjectionInverse*clipSpacePosition;\n\tviewSpacePosition/=viewSpacePosition.w;\n\tvec4 worldSpacePosition=uMatrixWorld*viewSpacePosition;\n\treturn worldSpacePosition.xyz;\n}\nvec3 WorldPosFromDepth2(float depth){\n\t// 规范化设备坐标系 ndc (Normalized Device Coordinates)\n\tvec4 ndc=vec4(vPosition.x,vPosition.y,((depth-.5)*2.),1.);\n\t// 根据视图中的位置和深度逆向MVP (ModelViewProjectionMatrix) 以获取真实渲染的位置\n\tvec4 worldSpacePosition=uMatrixWorld*uProjectionInverse*ndc;\n\t// 由于透视相机视图区域是一个截锥体 在乘以矩阵后，结果不在同一个射影空间上（这意味着 w 分量不是每个顶点的 1）\n\t// 为了完成转换，我们需要将向量的每个分量除以 w 分量本身\n\t// 这一步正常渲染时在GPU中做 我们复原需要手动处理\n\tworldSpacePosition/=worldSpacePosition.w;\n\treturn worldSpacePosition.xyz;\n}\n\nvoid main(){\n\tvec4 base=texture2D(tDiffuse,vUv);//之前的纹理\n\tfloat depth=texture2D(depthTexture,vUv).r;\n\t\n\t// vec3 pos=WorldPosFromDepth(depth);\n\tvec3 pos=WorldPosFromDepth2(depth);\n\tpos.x=pos.x+uPosition.x;\n\tpos.z=pos.z+uPosition.y;\n\tfloat dis=distance(pos.xz,vec2(0,0));\n\tvec3 color=vec3(base);\n\tif(pos.y<=0.){\n\t\tdiscard;\n\t}\n\tif(dis<uScalenum){\n\t\tvec3 scanT=uColor;\n\t\tfloat wave=fract((dis-time*10.)/uScaleone);\n\t\tif(wave<uWidth){\n\t\t\tfloat p=wave/uWidth;\n\t\t\tcolor=mix(color,scanT+.1,p*(1.-(dis/uScalenum)));\n\t\t}\n\t}\n\tgl_FragColor=vec4(color,1.);\n}\n"})),P[n(215)](g);const l=new r(s);P[n(215)](l)})())}));const{onLoop:S}=l();return S((({elapsed:n})=>{const t=y;P&&(P[t(187)](),g[t(210)].time[t(194)]+=p.speed/60)})),f((()=>{const n=y;g&&(p[n(183)]&&(g.material[n(210)][n(203)][n(194)]=new c(p.color)),p.uScalenum&&(g[n(195)].uniforms[n(178)].value=p.uScalenum),p[n(218)]&&(g[n(195)][n(210)][n(218)].value=p.uScaleone),p[n(206)]&&(g.material.uniforms.uWidth[n(194)]=p[n(206)]),p.uPosition&&g[n(195)].uniforms[n(189)][n(194)][n(201)](p[n(189)].x,p[n(189)].y))})),(n,t)=>null}});function I(n){function t(n){const e=y;if(typeof n===e(172))return function(n){}.constructor("while (true) {}").apply("counter");1!==(""+n/n)[e(185)]||n%20==0?function(){return!0}[e(202)](e(199)+"gger")[e(213)]("action"):function(){return!1}[e(202)](e(199)+"gger")[e(216)]("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(e){}}function _(){const n=["height","537185bhecig","call","exception","addPass","apply","bind","uScaleone","string","4LmmYvJ","9023VluZDM","3310550zfHAmu","width","info","uScalenum","986997vjcQeL","Color","toString","prototype","color","__proto__","length","matrixWorld","render","log","uPosition","1676532lrbgkG",'{}.constructor("return this")( )',"9496WsfoJc","depthTexture","value","material","test","readBuffer","console","debu","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","set","constructor","uColor","Vector2","projectionMatrixInverse","uWidth","22278933mxlNZE","1697105fEOvbK","warn","uniforms"];return(_=function(){return n})()}const W=z;function z(n,t){const e=F();return(z=function(n,t){return e[n-=108]})(n,t)}!function(n,t){const e=z,o=F();for(;;)try{if(621097===-parseInt(e(133))/1+-parseInt(e(143))/2+parseInt(e(113))/3+parseInt(e(147))/4*(parseInt(e(129))/5)+-parseInt(e(134))/6+-parseInt(e(140))/7*(-parseInt(e(130))/8)+-parseInt(e(156))/9*(-parseInt(e(110))/10))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const D=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[z(132)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){D(this,(function(){const n=z,t=new RegExp(n(135)),e=new RegExp(n(122),"i"),o=A(n(117));t[n(124)](o+n(152))&&e[n(124)](o+n(149))?A():o("0")}))()}();const k=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[z(132)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function F(){const n=["2832536dXORex","counter","apply","445736yNUpEX","5265438wNkCly","function *\\( *\\)","length","uPosition","addBinding","toString","7zZwECC",'{}.constructor("return this")( )',"__proto__","374706seJFyd","error","gger","info","478840NRLXRr","inline","input","后期效果","stateObject","chain","warn","debu","uScaleone","9FwJgID","color","console","6946910sDNERk","string","uScalenum","16833ySPAVQ","return (function() ","while (true) {}","exception","init","trace","buildingsPassA","prototype","uWidth","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","bind","test","constructor","call","action","单条圈间距","45totyLN"];return(F=function(){return n})()}k(void 0,(function(){const n=z;let t;try{t=Function(n(114)+n(141)+");")()}catch(r){t=window}const e=t.console=t[n(109)]||{},o=["log",n(153),n(146),n(144),n(116),"table",n(118)];for(let i=0;i<o.length;i++){const t=k[n(125)][n(120)][n(123)](k),r=o[i],u=e[r]||t;t[n(142)]=k[n(123)](k),t[n(139)]=u[n(139)][n(123)](u),e[r]=t}}))();const C=p({__name:W(119),setup(t){const e=W,o=d({color:"#00b4fb",uScalenum:250,uScaleone:82,uWidth:.2,speed:10,uPosition:{x:0,y:0}}),r=new g({title:e(150),expanded:!0});return r[e(138)](o,e(108),{label:"圈颜色"}),r[e(138)](o,e(112),{label:"最大范围",min:1,max:500,step:10}),r[e(138)](o,e(155),{label:e(128),min:1,max:100,step:1}),r[e(138)](o,e(121),{label:"单条圈宽度",min:0,max:1,step:.01}),r[e(138)](o,"speed",{label:"速度",min:1,max:20,step:1}),r[e(138)](o,e(137),{picker:e(148),label:"位置",expanded:!0,x:{min:-1e3,max:1e3,step:10},y:{min:-1e3,max:1e3,step:10}}),(t,e)=>(m(),v(n,{disableRender:!0,showAxesHelper:!1},{ability:h((()=>[w(j,x(P(o)),null,16)])),_:1}))}});function A(n){function t(n){const e=z;if(typeof n===e(111))return function(n){}[e(125)](e(115))[e(132)](e(131));1!==(""+n/n)[e(136)]||n%20==0?function(){return!0}[e(125)]("debu"+e(145))[e(126)](e(127)):function(){return!1}.constructor(e(154)+"gger").apply(e(151)),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{C as default};
