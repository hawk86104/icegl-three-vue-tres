import{$ as n,d as t}from"./@tresjs.2JnKj_Yj1724070319978.js";import{Z as e,j as o}from"./three.QUrV0R7c1724070319978.js";import{d as r,a1 as i,o as a,D as s,J as c,aj as u,ak as f,q as p,e as l,f as m,g as d,j as v,u as h,m as x}from"./@vue.Q1VpS3901724070319978.js";import"./tweakpane.yHWGBmom1724070319978.js";import"./@vueuse.2Yfo77CO1724070319978.js";const y=w;!function(n,t){const e=w,o=_();for(;;)try{if(865091===parseInt(e(497))/1+parseInt(e(494))/2*(parseInt(e(519))/3)+-parseInt(e(528))/4+-parseInt(e(513))/5*(-parseInt(e(517))/6)+parseInt(e(509))/7*(-parseInt(e(501))/8)+parseInt(e(523))/9+-parseInt(e(522))/10)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const g=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){g(this,(function(){const n=w,t=new RegExp("function *\\( *\\)"),e=new RegExp(n(510),"i"),o=j("init");t[n(526)](o+"chain")&&e[n(526)](o+n(493))?j():o("0")}))()}();const q=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[w(491)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function _(){const n=["toString","length","TresMesh","rayMarchingMaterialCombination","action","TresShaderMaterial","apply","call","input","2566764kKrsvE","MeshRef","return (function() ","876381qYCUbN","error","innerWidth","while (true) {}","760ouSjjS","prototype","gger","u_time","log","uniforms","constructor","value","37891ugSRxo","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","console","table","65GvcqvY","mousemove","stateObject","info","548562zWlvqN","addEventListener","3iHcKmh",'{}.constructor("return this")( )',"rotation","23152970ZtBKxh","14063022upoUHb","__proto__","bind","test","innerHeight","4864996rsYsif","TresTubeGeometryRef"];return(_=function(){return n})()}q(void 0,(function(){const n=w;let t;try{t=Function(n(496)+n(520)+");")()}catch(r){t=window}const e=t.console=t[n(511)]||{},o=[n(505),"warn",n(516),n(498),"exception",n(512),"trace"];for(let i=0;i<o[n(486)];i++){const t=q[n(507)][n(502)].bind(q),r=o[i],a=e[r]||t;t[n(524)]=q.bind(q),t.toString=a[n(485)][n(525)](a),e[r]=t}}))();const b=[y(521)],z={ref:y(529),args:[1e3,1e3]};function w(n,t){const e=_();return(w=function(n,t){return e[n-=485]})(n,t)}const I=r({__name:y(488),setup(t){const r=y,{onLoop:p,onAfterLoop:l}=n(),m={transparent:!0,depthWrite:!0,depthTest:!0,side:e,vertexShader:"varying vec2 vUv;\nvoid main(){\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n\tvUv=uv;\n}",fragmentShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nfloat sphere(vec3 p,float d){\n  return(length(p*2.)-d)/2.;\n}\n\nfloat sdPyramid(vec3 p,float h)\n{\n  float m2=h*h+.25;\n  \n  p.xz=abs(p.xz);\n  p.xz=(p.z>p.x)?p.zx:p.xz;\n  p.xz-=.5;\n  \n  vec3 q=vec3(p.z,h*p.y-.5*p.x,h*p.x+.5*p.y);\n  \n  float s=max(-q.x,0.);\n  float t=clamp((q.y-.5*p.z)/(m2+.25),0.,1.);\n  \n  float a=m2*(q.x+s)*(q.x+s)+q.y*q.y;\n  float b=m2*(q.x+.5*t)*(q.x+.5*t)+(q.y-m2*t)*(q.y-m2*t);\n  \n  float d2=min(q.y,-q.x*m2-q.y*.5)>0.?0.:min(a,b);\n  \n  return sqrt((d2+q.z*q.z)/m2)*sign(max(q.z,-p.y));\n}\nfloat sdBoxFrame(vec3 p,vec3 b,float e)\n{\n  p=abs(p)-b;\n  vec3 q=abs(p+e)-e;\n  return min(min(\n      length(max(vec3(p.x,q.y,q.z),0.))+min(max(p.x,max(q.y,q.z)),0.),\n      length(max(vec3(q.x,p.y,q.z),0.))+min(max(q.x,max(p.y,q.z)),0.)),\n      length(max(vec3(q.x,q.y,p.z),0.))+min(max(q.x,max(q.y,p.z)),0.));\n    }\n    mat2 rot2D(float angle){\n      float s=sin(angle);\n      float c=cos(angle);\n      return mat2(c,-s,s,c);\n    }\n    float map(vec3 p){\n      // p.xy*=rot2D(u_time);\n      vec3 pos=vec3(sin(u_time*10.),0.,0.);\n      float spheresdf=sphere(p,.5);\n      float BoxFramesdf=sdBoxFrame(p,vec3(.5,.3,.5),.025);\n      float entity=min(BoxFramesdf,spheresdf);\n      entity=min(sdPyramid(-p-vec3(1.,0.,0.),1.5),entity);\n      return entity;\n    }\n    \n    void main(){\n      vec3 ro=vec3(0.,0.,-4.);//起始位置\n      vec3 rd=normalize(vec3(vUv-.5,1.));//方向\n      // horizontal camera rotation\n      \n      ro.xz*=rot2D(-u_mouse.x*.001);\n      rd.xz*=rot2D(-u_mouse.x*.001);\n      ro.xy*=rot2D(-u_mouse.y*.001);\n      rd.xy*=rot2D(-u_mouse.y*.001);\n      float t=0.;\n      vec3 color=vec3(0.);\n      for(int i=0;i<80;i++){\n        vec3 p=ro+rd*t;\n        float d=map(p);\n        t+=d;\n        //优化效率\n        if(t>100.||d<.001){\n          break;\n        }\n        \n      }\n      color=vec3(t)*.2;\n      gl_FragColor=vec4(color,1.);\n      \n    }",uniforms:{u_resolution:{value:new o(window[r(499)],window[r(527)])},u_mouse:{value:new o(0,0)},u_time:{value:0}}},d=window[r(499)]/2,v=window[r(527)]/2;let h=0,x=0;return document[r(518)](r(514),(function(n){h=n.clientX-d,x=n.clientY-v}),!1),i((()=>{})),p((({elapsed:n})=>{const t=r;m[t(506)][t(504)].value+=.001,m[t(506)].u_mouse[t(508)]=new o(h,x)})),l((()=>{})),(n,t)=>{const e=r;return a(),s(e(487),{ref:e(495),rotation:[Math.PI/2,0,0]},[c("TresPlaneGeometry",z,null,512),c(e(490),u(f(m)),null,16)],8,b)}}});function j(n){function t(n){const e=w;if("string"==typeof n)return function(n){}[e(507)](e(500)).apply("counter");1!==(""+n/n).length||n%20==0?function(){return!0}[e(507)]("debugger")[e(492)](e(489)):function(){return!1}[e(507)]("debu"+e(503))[e(491)](e(515)),t(++n)}try{if(n)return t;t(0)}catch(e){}}const A=E;!function(n,t){const e=E,o=k();for(;;)try{if(855565===parseInt(e(422))/1*(-parseInt(e(402))/2)+parseInt(e(425))/3*(parseInt(e(432))/4)+parseInt(e(396))/5*(parseInt(e(431))/6)+parseInt(e(436))/7+parseInt(e(406))/8*(parseInt(e(426))/9)+parseInt(e(416))/10+parseInt(e(427))/11*(-parseInt(e(395))/12))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const D=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[E(398)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){D(this,(function(){const n=E,t=new RegExp("function *\\( *\\)"),e=new RegExp(n(411),"i"),o=L(n(418));t[n(412)](o+"chain")&&e[n(412)](o+n(421))?L():o("0")}))()}();const R=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[E(398)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();R(void 0,(function(){const n=E;let t;try{t=Function(n(437)+n(423)+");")()}catch(r){t=window}const e=t[n(401)]=t[n(401)]||{},o=[n(435),n(410),"info",n(407),"exception",n(400),"trace"];for(let i=0;i<o[n(399)];i++){const t=R[n(404)][n(417)][n(420)](R),r=o[i],a=e[r]||t;t.__proto__=R.bind(R),t[n(394)]=a[n(394)].bind(a),e[r]=t}}))();const S={ref:"perspectiveCameraRef",position:[0,1500,0],fov:45,near:1,far:1e4},M=c(A(433),{color:A(424)},null,-1),T=c(A(415),{position:[100,100,0],intensity:.5,color:A(424)},null,-1);function k(){const n=["231408jAPmbE","5195443IhXAHV","stateObject","while (true) {}","TresCanvas","816unaRGM","1066908JDApRU","TresAmbientLight","debu","log","8853845lQqHGd","return (function() ","toString","60CFvlKN","27050fkQtND","counter","apply","length","table","console","573414jrIEzB","action","constructor","TresPerspectiveCamera","200oNSXup","error","rayMarchingCombination","string","warn","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","test","call","gger","TresDirectionalLight","1202010NfiuAz","prototype","init","#000000","bind","input","4gkdJbZ",'{}.constructor("return this")( )',"#ffffff","18VuPaZA"];return(k=function(){return n})()}const C=r({__name:A(408),setup(e){const o=A,r={clearColor:o(419),shadows:!0,alpha:!1,useLegacyLights:!0},i={autoRotate:!1,enableDamping:!0},{onLoop:s}=n();return s((({delta:n})=>{})),p((()=>{})),(n,e)=>{const s=o,p=l(s(430));return a(),m(p,x(r,{"window-size":""}),{default:d((()=>[c(s(405),S,null,512),v(h(t),u(f(i)),null,16),M,T,v(I)])),_:1},16)}}});function E(n,t){const e=k();return(E=function(n,t){return e[n-=394]})(n,t)}function L(n){function t(n){const e=E;if(typeof n===e(409))return function(n){}[e(404)](e(429))[e(398)](e(397));1!==(""+n/n)[e(399)]||n%20==0?function(){return!0}.constructor(e(434)+"gger")[e(413)](e(403)):function(){return!1}[e(404)](e(434)+e(414))[e(398)](e(428)),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{C as default};
