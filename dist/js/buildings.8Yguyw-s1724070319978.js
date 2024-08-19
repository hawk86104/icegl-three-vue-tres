import{u as t,_ as n,a as o}from"./mergeTres.2L2g5ZWA1724070319978.js";import{l as r}from"./utils.2chDn2kt1724070319978.js";import{$ as e}from"./@tresjs.2JnKj_Yj1724070319978.js";import{d as a,r as i,a1 as l,o as c,D as s,F as u,V as f,J as p,m as v,e as d,j as g,g as m,f as h,al as _,am as y,an as C}from"./@vue.Q1VpS3901724070319978.js";import{_ as w}from"./@fesjs.fxXnq-gV1724070319978.js";import"./@amap.PfcO2up21724070319978.js";import"./pinia.yc2Sjh9i1724070319978.js";import"./three.QUrV0R7c1724070319978.js";import"./three-mesh-bvh.4DLdRpxs1724070319978.js";import"./tweakpane.yHWGBmom1724070319978.js";import"./@vueuse.2Yfo77CO1724070319978.js";import"./vue-router.7GyIEHku1724070319978.js";import"./lodash-es.nFpJXAf-1724070319978.js";import"./@qlin.yHhFDldE1724070319978.js";import"./@floating-ui.BPbuo5Gx1724070319978.js";import"./@juggle.7yjBMqoW1724070319978.js";const x=j;function b(){const t=["cameraState","call","positionArray","TresBufferGeometry","24GwRSsM","apply","lngLatToCoord","length","16hWshKP","getZoom","2499296sPmsZw","3006949VvidiX","1888660VCbaQX","error","bind","TresMesh","table","1581633djmlZS","exp","chain","1kYtyPc","TresShaderMaterial","272720OoRdry","test","trace","tbgRef","normalArray","prototype","2746646AEmNXG","near","__proto__","return (function() ","50rpwXwR","https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/json/AMapGIS/latlngbuildings.geojson","uniforms","push","console","u_far","mapHandle","constructor","exception","init","gger","debu","stateObject","u_near","action","geometry","buildings","toString","string","536130FUguqw","warn","input","customCoords","u_zoom","counter","while (true) {}","faceUv","normal","uvArray","value","position","TresGroup"];return(b=function(){return t})()}!function(t,n){const o=j,r=b();for(;;)try{if(647328===parseInt(o(315))/1*(parseInt(o(307))/2)+parseInt(o(346))/3+-parseInt(o(305))/4+parseInt(o(317))/5*(-parseInt(o(363))/6)+-parseInt(o(323))/7*(parseInt(o(303))/8)+parseInt(o(312))/9*(parseInt(o(327))/10)+parseInt(o(306))/11)break;r.push(r.shift())}catch(e){r.push(r.shift())}}();const I=function(){let t=!0;return function(n,o){const r=t?function(){if(o){const t=o[j(364)](n,arguments);return o=null,t}}:function(){};return t=!1,r}}();!function(){I(this,(function(){const t=j,n=new RegExp("function *\\( *\\)"),o=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),r=P(t(336));n[t(318)](r+t(314))&&o.test(r+t(348))?P():r("0")}))()}();const S=function(){let t=!0;return function(n,o){const r=t?function(){if(o){const t=o[j(364)](n,arguments);return o=null,t}}:function(){};return t=!1,r}}();function j(t,n){const o=b();return(j=function(t,n){return o[t-=302]})(t,n)}S(void 0,(function(){const t=j,n=function(){const t=j;let n;try{n=Function(t(326)+'{}.constructor("return this")( ));')()}catch(o){n=window}return n}(),o=n[t(331)]=n[t(331)]||{},r=["log",t(347),"info",t(308),t(335),t(311),t(319)];for(let e=0;e<r.length;e++){const n=S[t(334)][t(322)].bind(S),a=r[e],i=o[a]||n;n[t(325)]=S[t(309)](S),n[t(344)]=i.toString.bind(i),o[a]=n}}))();const z=[x(357),"faceUv",x(354)],R=a({__name:"buildingModels",setup(n){const o=t(),a=t=>{const n=j;for(let r=0;r<t.length;r+=3){const e=[t[r],t[r+1]],a=o[n(333)].customCoords[n(365)](e);t[r]=a[0],t[r+1]=a[1],t[r+2]=.2*t[r+2]}},d=i([]),g={uniforms:{u_opacity:{value:1},u_time:{value:.45},u_color:{value:[.02,.15,.5,1]},u_zoom:{value:1},u_brightColor:{value:[1,1,1,1]},u_windowColor:{value:[.07,.07,.03,1]},u_near:{value:1},u_far:{value:1e3}},vertexShader:"precision highp float;\n#define ambientRatio .5\n#define diffuseRatio .4\n#define specularRatio .1\n\nattribute vec2 faceUv;\nuniform vec4 u_color;\nvarying vec2 v_texCoord;\nvarying vec4 v_color;\nvarying float v_lightWeight;\n\nvoid main(){\n\t\n\tmat4 matModelViewProjection=projectionMatrix*modelViewMatrix;\n\t\n\tv_texCoord=faceUv;\n\t\n\tif(normal==vec3(0.,0.,1.)){\n\t\tv_color=u_color;\n\t\tgl_Position=matModelViewProjection*vec4(position,1.);\n\t\treturn;\n\t}\n\t\n\tvec3 worldPos=vec3(vec4(position,1.)*modelMatrix);\n\tvec3 worldNormal=vec3(vec4(normal,1.)*modelMatrix);// N\n\t// //cal light weight  光亮度的权重\n\tvec3 viewDir=normalize(cameraPosition-worldPos);// V\n\t// 光照的方向， 前上方    Ild = k*I*(N·L)\n\tvec3 lightDir=normalize(vec3(0.,-10.,1.));// L\n\tvec3 halfDir=normalize(viewDir+lightDir);\n\t// //lambert\n\tfloat lambert=dot(worldNormal,lightDir);\n\t//specular  //反射\n\tfloat specular=pow(max(0.,dot(worldNormal,halfDir)),32.);\n\t//sum to light weight  （lambert + 环境光）  Idiff = Iad + Ild = k*Ia + k*Il*（N·L）\n\tfloat lightWeight=ambientRatio+diffuseRatio*lambert+specularRatio*specular;\n\tv_texCoord=faceUv;\n\tv_lightWeight=lightWeight;\n\t\n\t// 根据光照方向，调整光线明暗\n\t\n\t// v_lightWeight =  pow( 0.0 + 1.0 * abs(dot(worldNormal, worldPos)), 2.0);\n\t\n\tv_color=vec4(u_color.rgb*v_lightWeight,u_color.w);\n\t\n\tgl_Position=matModelViewProjection*vec4(position,1.);\n}",fragmentShader:"precision highp float;\nuniform float u_opacity;\nuniform vec4 u_baseColor;\nuniform vec4 u_color;\nuniform vec4 u_brightColor;\nuniform vec4 u_windowColor;\n\nuniform float u_zoom;\nuniform float u_time;\nuniform float u_near;\nuniform float u_far;\nvarying vec2 v_texCoord;\nvarying vec4 v_color;\nvarying float v_lightWeight;\n\nvec3 getWindowColor(float n,float hot,vec3 brightColor,vec3 darkColor){\n\tfloat s=step(hot,n);\n\tvec3 color=mix(brightColor,vec3(1.,1.,1.),n);\n\treturn mix(darkColor,color,s);\n}\n\nfloat random(vec2 st){\n\treturn fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);\n}\n\nfloat LinearizeDepth()\n{\n\tfloat z=gl_FragCoord.z*2.-1.;\n\treturn(2.*u_near*u_far)/(u_far+u_near-z*(u_far-u_near));\n}\n\nvec3 fog(vec3 color,vec3 fogColor,float depth){\n\tfloat fogFactor=clamp(depth,0.,1.);\n\tvec3 output_color=mix(fogColor,color,fogFactor);\n\treturn output_color;\n}\n\nfloat sdRect(vec2 p,vec2 sz){\n\tvec2 d=abs(p)-sz;\n\tfloat outside=length(max(d,0.));\n\tfloat inside=min(max(d.x,d.y),0.);\n\treturn outside+inside;\n}\n\nvoid main(){\n\tif(v_color.w==0.){\n\t\tdiscard;\n\t\treturn;\n\t}\n\tvec3 baseColor=u_color.xyz;\n\tvec3 brightColor=u_brightColor.xyz;\n\tvec3 windowColor=u_windowColor.xyz;\n\tfloat targetColId=5.;\n\tfloat depth=1.-LinearizeDepth()/u_far*u_zoom;// 深度，调节明暗，远的颜色暗，近的颜色亮\n\tvec3 fogColor=vec3(23./255.,31./255.,51./255.);\n\t\n\tif(v_texCoord.x<0.){//顶部颜色\n\t\tvec3 foggedColor=fog(baseColor.xyz+vec3(.12*.9,.2*.9,.3*.9),fogColor,depth);\n\t\tgl_FragColor=vec4(foggedColor,v_color.w*u_opacity);\n\t}else{// 侧面颜色\n\t\t\n\t\tif(u_zoom<14.){\n\t\t\tgl_FragColor=v_color;\n\t\t\treturn;\n\t\t}\n\t\t\n\t\tif(v_texCoord.x<.01||v_texCoord.x>.99||v_texCoord.y<.01){\n\t\t\tgl_FragColor=vec4(1.,.7,.25,.5);\n\t\t\treturn;\n\t\t}\n\t\t\n\t\tvec2 st=v_texCoord;\n\t\tvec2 UvScale=v_texCoord;\n\t\tvec2 tStep=vec2(.05,.125);\n\t\tvec2 tStart=vec2(tStep.x*.25,tStep.y*.25);\n\t\tvec2 tEnd=vec2(tStep.x*.75,tStep.y*.75);\n\t\t\n\t\tfloat u=mod(UvScale.x,tStep.x);\n\t\tfloat v=mod(UvScale.y,tStep.y);\n\t\tfloat ux=floor(UvScale.x/tStep.x);\n\t\tfloat uy=floor(UvScale.y/tStep.y);\n\t\tfloat n=random(vec2(ux,uy));\n\t\tfloat lightP=u_time;\n\t\tfloat head=1.-step(.005,st.y);\n\t\t/*step3*/\n\t\t// 将窗户颜色和墙面颜色区别开来\n\t\tfloat sU=step(tStart.x,u)-step(tEnd.x,u);\n\t\tfloat sV=step(tStart.y,v)-step(tEnd.y,v);\n\t\tvec2 windowSize=vec2(abs(tEnd.x-tStart.x),abs(tEnd.y-tStart.y));\n\t\tfloat dist=sdRect(vec2(u,v),windowSize);\n\t\tfloat s=sU*sV;\n\t\t\n\t\tfloat curColId=ux;// floor(UvScale.x / tStep.x);\n\t\tfloat sCol=step(targetColId-.2,curColId)-step(targetColId+.2,curColId);\n\t\t\n\t\tfloat mLightP=mod(lightP,2.);\n\t\tfloat sRow=step(mLightP-.2,st.y)-step(mLightP,st.y);\n\t\tif(ux==targetColId){\n\t\t\tn=0.;\n\t\t}\n\t\t// float hot = min(1.0, abs (sin(u_time/6.0) ) );\n\t\t// float hot = smoothstep(1.0,0.0,timeP);\n\t\t//hot = clamp(hot,0.2,0.8);\n\t\tvec3 color=mix(baseColor,getWindowColor(n,u_time,brightColor,windowColor),s);\n\t\t\n\t\tfloat sFinal=s*sCol*sRow;\n\t\tcolor+=mix(baseColor,brightColor,sFinal*n);\n\t\t\n\t\tif(head==1.){// 顶部亮线\n\t\t\tcolor=brightColor;\n\t\t}\n\t\tcolor=color*v_lightWeight;\n\t\t\n\t\tvec3 foggedColor=fog(color,fogColor,depth);\n\t\t\n\t\tgl_FragColor=vec4(foggedColor,1.);\n\t}\n\t\n}"};l((()=>{o[j(359)]&&(async()=>{const t=j,n=await r(t(328),t(343));for(let o=0;o<n.length;o++){const r=n[o];a(r.geometry);const e=new Float32Array(r[t(342)]),i=new Float32Array(r[t(353)]),l=new Float32Array(r.geometry[t(302)]);d[t(330)]({positionArray:e,uvArray:i,normalArray:l})}})()}));const{onLoop:m}=e();return m((()=>{const t=j;o[t(359)]&&(g[t(329)][t(350)][t(356)]=o.mapHandle[t(304)](),g.uniforms[t(340)][t(356)]=o[t(359)][t(324)],g.uniforms[t(332)].value=o[t(359)].far)})),(t,n)=>{const o=j;return c(),s(o(358),null,[(c(!0),s(u,null,f(d,((t,n)=>{const r=o;return c(),s(r(310),{key:""+n},[p(r(362),{ref_for:!0,ref:r(320),position:[t[r(361)],3],faceUv:[t[r(355)],2],normal:[t[r(321)],3]},null,8,z),p(r(316),v({ref_for:!0},g),null,16)])})),128))])}}});function P(t){function n(t){const o=j;if(typeof t===o(345))return function(t){}[o(334)](o(352)).apply(o(351));1!==(""+t/t)[o(302)]||t%20==0?function(){return!0}[o(334)](o(338)+o(337))[o(360)](o(341)):function(){return!1}[o(334)](o(338)+o(337))[o(364)](o(339)),n(++t)}try{if(t)return n;n(0)}catch(o){}}const A=L;!function(t,n){const o=L,r=M();for(;;)try{if(599512===parseInt(o(142))/1*(-parseInt(o(169))/2)+-parseInt(o(180))/3*(parseInt(o(147))/4)+parseInt(o(170))/5*(parseInt(o(185))/6)+parseInt(o(158))/7*(parseInt(o(183))/8)+-parseInt(o(174))/9*(-parseInt(o(175))/10)+-parseInt(o(146))/11*(-parseInt(o(178))/12)+-parseInt(o(149))/13)break;r.push(r.shift())}catch(e){r.push(r.shift())}}();const F=function(){let t=!0;return function(n,o){const r=t?function(){if(o){const t=o[L(152)](n,arguments);return o=null,t}}:function(){};return t=!1,r}}();!function(){F(this,(function(){const t=L,n=new RegExp("function *\\( *\\)"),o=new RegExp(t(150),"i"),r=V(t(177));n.test(r+t(172))&&o.test(r+t(166))?V():r("0")}))()}();const U=function(){let t=!0;return function(n,o){const r=t?function(){if(o){const t=o[L(152)](n,arguments);return o=null,t}}:function(){};return t=!1,r}}();function M(){const t=["TresCanvas","call",'{}.constructor("return this")( )',"log","input","return (function() ","warn","2fatmkG","5GSALrI","__proto__","chain","data-v-40288e17","2749266VLcFgO","20WhprhI","table","init","48912McIBqr","constructor","127527ogecRw","error","bind","184tTuovH","length","6861342XMbpOg","tresCanvas","758112MHfjzy","while (true) {}","action","TresPerspectiveCamera","3146AsrJLU","64RbOeqx","TresAmbientLight","24405992cqlpMJ","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","toString","apply","console","info","debu","tcRef","stateObject","302799nexyYZ","gger","counter","buildings"];return(M=function(){return t})()}function L(t,n){const o=M();return(L=function(t,n){return o[t-=142]})(t,n)}U(void 0,(function(){const t=L;let n;try{n=Function(t(167)+t(164)+");")()}catch(e){n=window}const o=n[t(153)]=n.console||{},r=[t(165),t(168),t(154),t(181),"exception",t(176),"trace"];for(let a=0;a<r[t(184)];a++){const n=U[t(179)].prototype[t(182)](U),e=r[a],i=o[e]||n;n[t(171)]=U[t(182)](U),n[t(151)]=i.toString[t(182)](i),o[e]=n}}))();const k=t=>(y(A(173)),t=t(),C(),t),W=k((()=>p(A(145),{fov:60,near:.1,far:2e3},null,-1))),T=k((()=>p(A(148),{intensity:.5},null,-1)));function V(t){function n(t){const o=L;if("string"==typeof t)return function(t){}.constructor(o(143))[o(152)](o(160));1!==(""+t/t)[o(184)]||t%20==0?function(){return!0}[o(179)]("debu"+o(159))[o(163)](o(144)):function(){return!1}[o(179)](o(155)+o(159))[o(152)](o(157)),n(++t)}try{if(t)return n;n(0)}catch(o){}}const D=w(a({__name:A(161),setup(t){const r=[121.407867,31.157717],e=i({alpha:!0,antialias:!0,autoClear:!1,disableRender:!0});return(t,a)=>{const i=L,l=d(i(162));return c(),s(u,null,[g(n,{center:r,zoom:19,pitch:65.59312320916906,mapStyle:"darkblue"}),g(l,v({id:i(186),ref:i(156)},e),{default:m((()=>[W,T,g(o,{center:r}),(c(),h(_,null,{default:m((()=>[g(R)])),_:1}))])),_:1},16)],64)}}}),[["__scopeId","data-v-40288e17"]]);export{D as default};
