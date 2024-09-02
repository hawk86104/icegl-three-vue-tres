import{$ as n,d as t}from"./@tresjs.DDzpLB7Q1725236486446.js";import{Z as e,j as o}from"./three.0IuNGJsA1725236486446.js";import{d as r,a1 as i,o as a,D as s,J as c,aj as u,ak as f,q as p,e as l,f as m,g as d,j as h,u as v,m as x}from"./@vue.9bHx4gg21725236486446.js";import"./tweakpane.yHWGBmom1725236486446.js";import"./@vueuse.XXpXaOwX1725236486446.js";const y=z;!function(n,t){const e=z,o=M();for(;;)try{if(743326===parseInt(e(329))/1+parseInt(e(340))/2+-parseInt(e(314))/3+-parseInt(e(337))/4+parseInt(e(324))/5*(-parseInt(e(328))/6)+parseInt(e(333))/7+-parseInt(e(330))/8*(parseInt(e(344))/9))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const g=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[z(310)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){g(this,(function(){const n=z,t=new RegExp(n(304)),e=new RegExp(n(308),"i"),o=I("init");t[n(327)](o+n(334))&&e[n(327)](o+n(318))?I():o("0")}))()}();const q=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[z(310)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();q(void 0,(function(){const n=z,t=function(){const n=z;let t;try{t=Function(n(323)+n(299)+");")()}catch(e){t=window}return t}(),e=t.console=t[n(339)]||{},o=[n(312),n(317),"info",n(325),"exception",n(326),n(335)];for(let r=0;r<o[n(315)];r++){const t=q[n(307)][n(322)].bind(q),i=o[r],a=e[i]||t;t.__proto__=q.bind(q),t.toString=a[n(298)][n(311)](a),e[i]=t}}))();const _=["rotation"],b={ref:y(321),args:[1e3,1e3]};function z(n,t){const e=M();return(z=function(n,t){return e[n-=298]})(n,t)}const w=r({__name:y(305),setup(t){const r=y,{onLoop:p,onAfterLoop:l}=n(),m={transparent:!0,depthWrite:!0,depthTest:!0,side:e,vertexShader:"varying vec2 vUv;\nvoid main(){\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n\tvUv=uv;\n}",fragmentShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nfloat sphere(vec3 p,float d){\n  return(length(p*2.)-d)/2.;\n}\n\nfloat sdPyramid(vec3 p,float h)\n{\n  float m2=h*h+.25;\n  \n  p.xz=abs(p.xz);\n  p.xz=(p.z>p.x)?p.zx:p.xz;\n  p.xz-=.5;\n  \n  vec3 q=vec3(p.z,h*p.y-.5*p.x,h*p.x+.5*p.y);\n  \n  float s=max(-q.x,0.);\n  float t=clamp((q.y-.5*p.z)/(m2+.25),0.,1.);\n  \n  float a=m2*(q.x+s)*(q.x+s)+q.y*q.y;\n  float b=m2*(q.x+.5*t)*(q.x+.5*t)+(q.y-m2*t)*(q.y-m2*t);\n  \n  float d2=min(q.y,-q.x*m2-q.y*.5)>0.?0.:min(a,b);\n  \n  return sqrt((d2+q.z*q.z)/m2)*sign(max(q.z,-p.y));\n}\nfloat sdBoxFrame(vec3 p,vec3 b,float e)\n{\n  p=abs(p)-b;\n  vec3 q=abs(p+e)-e;\n  return min(min(\n      length(max(vec3(p.x,q.y,q.z),0.))+min(max(p.x,max(q.y,q.z)),0.),\n      length(max(vec3(q.x,p.y,q.z),0.))+min(max(q.x,max(p.y,q.z)),0.)),\n      length(max(vec3(q.x,q.y,p.z),0.))+min(max(q.x,max(q.y,p.z)),0.));\n    }\n    mat2 rot2D(float angle){\n      float s=sin(angle);\n      float c=cos(angle);\n      return mat2(c,-s,s,c);\n    }\n    float map(vec3 p){\n      // p.xy*=rot2D(u_time);\n      vec3 pos=vec3(sin(u_time*10.),0.,0.);\n      float spheresdf=sphere(p,.5);\n      float BoxFramesdf=sdBoxFrame(p,vec3(.5,.3,.5),.025);\n      float entity=min(BoxFramesdf,spheresdf);\n      entity=min(sdPyramid(-p-vec3(1.,0.,0.),1.5),entity);\n      return entity;\n    }\n    \n    void main(){\n      vec3 ro=vec3(0.,0.,-4.);//起始位置\n      vec3 rd=normalize(vec3(vUv-.5,1.));//方向\n      // horizontal camera rotation\n      \n      ro.xz*=rot2D(-u_mouse.x*.001);\n      rd.xz*=rot2D(-u_mouse.x*.001);\n      ro.xy*=rot2D(-u_mouse.y*.001);\n      rd.xy*=rot2D(-u_mouse.y*.001);\n      float t=0.;\n      vec3 color=vec3(0.);\n      for(int i=0;i<80;i++){\n        vec3 p=ro+rd*t;\n        float d=map(p);\n        t+=d;\n        //优化效率\n        if(t>100.||d<.001){\n          break;\n        }\n        \n      }\n      color=vec3(t)*.2;\n      gl_FragColor=vec4(color,1.);\n      \n    }",uniforms:{u_resolution:{value:new o(window[r(302)],window[r(341)])},u_mouse:{value:new o(0,0)},u_time:{value:0}}},d=window[r(302)]/2,h=window[r(341)]/2;let v=0,x=0;return document.addEventListener(r(338),(function(n){const t=r;v=n[t(342)]-d,x=n[t(309)]-h}),!1),i((()=>{})),p((({elapsed:n})=>{const t=r;m[t(320)][t(303)].value+=.001,m[t(320)][t(300)][t(313)]=new o(v,x)})),l((()=>{})),(n,t)=>{const e=r;return a(),s(e(343),{ref:e(332),rotation:[Math.PI/2,0,0]},[c(e(331),b,null,512),c("TresShaderMaterial",u(f(m)),null,16)],8,_)}}});function I(n){function t(n){const e=z;if("string"==typeof n)return function(n){}[e(307)]("while (true) {}")[e(310)]("counter");1!==(""+n/n).length||n%20==0?function(){return!0}[e(307)](e(336)+e(306))[e(316)](e(301)):function(){return!1}[e(307)]("debugger").apply(e(319)),t(++n)}try{if(n)return t;t(0)}catch(e){}}function M(){const n=["log","value","5304FrkmRY","length","call","warn","input","stateObject","uniforms","TresTubeGeometryRef","prototype","return (function() ","5273510MtKEtm","error","table","test","6pMWPKf","1438592gpDfzb","880qGJOfo","TresPlaneGeometry","MeshRef","7140441lZAMJs","chain","trace","debu","3567184eeQzMg","mousemove","console","833934VzaaLC","innerHeight","clientX","TresMesh","15057MwtnLy","toString",'{}.constructor("return this")( )',"u_mouse","action","innerWidth","u_time","function *\\( *\\)","rayMarchingMaterialCombination","gger","constructor","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","clientY","apply","bind"];return(M=function(){return n})()}const L=R;!function(n,t){const e=R,o=A();for(;;)try{if(828201===-parseInt(e(330))/1+-parseInt(e(311))/2*(parseInt(e(332))/3)+-parseInt(e(335))/4*(parseInt(e(333))/5)+-parseInt(e(337))/6*(-parseInt(e(306))/7)+parseInt(e(322))/8+parseInt(e(310))/9+parseInt(e(300))/10*(parseInt(e(323))/11))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const j=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function A(){const n=["TresPerspectiveCamera","TresCanvas","__proto__","call","#000000","1115561qFdYdP","TresAmbientLight","3XAshLm","1890295cCATLs","gger","4BYhybd","input","51954HJvqGa","test","TresDirectionalLight","chain","info","8340nFeMxG","debu","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","toString","while (true) {}","return (function() ","959AaFqol","apply","log","console","7615287EgRCyc","2959262QLEapB","string","init","constructor","length","rayMarchingCombination","function *\\( *\\)","stateObject",'{}.constructor("return this")( )',"#ffffff","bind","4944848fOoAXg","15180BJQMZG","table"];return(A=function(){return n})()}!function(){j(this,(function(){const n=R,t=new RegExp(n(317)),e=new RegExp(n(302),"i"),o=P(n(313));t[n(338)](o+n(340))&&e[n(338)](o+n(336))?P():o("0")}))()}();const F=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[R(307)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();F(void 0,(function(){const n=R,t=function(){const n=R;let t;try{t=Function(n(305)+n(319)+");")()}catch(e){t=window}return t}(),e=t[n(309)]=t[n(309)]||{},o=[n(308),"warn",n(341),"error","exception",n(324),"trace"];for(let r=0;r<o.length;r++){const t=F.constructor.prototype.bind(F),i=o[r],a=e[i]||t;t[n(327)]=F[n(321)](F),t[n(303)]=a[n(303)].bind(a),e[i]=t}}))();const T={ref:"perspectiveCameraRef",position:[0,1500,0],fov:45,near:1,far:1e4},C=c(L(331),{color:L(320)},null,-1),D=c(L(339),{position:[100,100,0],intensity:.5,color:L(320)},null,-1);function R(n,t){const e=A();return(R=function(n,t){return e[n-=300]})(n,t)}const E=r({__name:L(316),setup(e){const o=L,r={clearColor:o(329),shadows:!0,alpha:!1,useLegacyLights:!0},i={autoRotate:!1,enableDamping:!0},{onLoop:s}=n();return s((({delta:n})=>{})),p((()=>{})),(n,e)=>{const s=o,p=l(s(326));return a(),m(p,x(r,{"window-size":""}),{default:d((()=>[c(s(325),T,null,512),h(v(t),u(f(i)),null,16),C,D,h(w)])),_:1},16)}}});function P(n){function t(n){const e=R;if(typeof n===e(312))return function(n){}[e(314)](e(304))[e(307)]("counter");1!==(""+n/n)[e(315)]||n%20==0?function(){return!0}[e(314)](e(301)+"gger")[e(328)]("action"):function(){return!1}.constructor(e(301)+e(334)).apply(e(318)),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{E as default};
