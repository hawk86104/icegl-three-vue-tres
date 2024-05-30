import{a1 as u,cv as S,ax as y,ap as L,az as r,cw as M,aw as G,a6 as b,o as d,c as P,Y as f,L as h,a2 as U,aq as C,x as B,E as j,a}from"./vendor.Bhln4awG1717067357907.js";import{_ as k}from"./pagesShow.vue_vue_type_script_setup_true_lang.ovkzG9ti1717067357907.js";import{L as E,b as T,a as v}from"./LineSegments2.5efbUp_i1717067357907.js";import{r as V}from"./utils.9Ipa0R2i1717067357907.js";import"./vanilla.YA2K2vt81717067357907.js";import"./object_hash.MnKN4xNn1717067357907.js";import"./_commonjsHelpers.5-cIlDoe1717067357907.js";import"./_commonjs-dynamic-modules.h-SxKiO41717067357907.js";import"./builtins-300es.Tm_BdSQ71717067357907.js";import"./Water2.2RLgZqgH1717067357907.js";import"./Reflector.HzQhW9iS1717067357907.js";import"./ExtensionUtilities.yX0HotEy1717067357907.js";class w extends E{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(o){const n=o.length-3,t=new Float32Array(2*n);for(let e=0;e<n;e+=3)t[2*e]=o[e],t[2*e+1]=o[e+1],t[2*e+2]=o[e+2],t[2*e+3]=o[e+3],t[2*e+4]=o[e+4],t[2*e+5]=o[e+5];return super.setPositions(t),this}setColors(o){const n=o.length-3,t=new Float32Array(2*n);for(let e=0;e<n;e+=3)t[2*e]=o[e],t[2*e+1]=o[e+1],t[2*e+2]=o[e+2],t[2*e+3]=o[e+3],t[2*e+4]=o[e+4],t[2*e+5]=o[e+5];return super.setColors(t),this}fromLine(o){const n=o.geometry;return this.setPositions(n.attributes.position.array),this}}class F extends T{constructor(o=new w,n=new v({color:Math.random()*16777215})){super(o,n),this.isLine2=!0,this.type="Line2"}}const A=["object","rotation-x"],I=["object","rotation-x"],c=u({__name:"regionGlow",props:{positionSrc:{default:[[0,0],[1,1]]},color:{default:"#ffff00"}},setup(s){const o=s,n=new S;o.positionSrc.forEach((i,m)=>{m===0?n.moveTo(i[0],i[1]):n.lineTo(i[0],i[1])});const t=new y({vertexShader:"\n    varying vec2 vUv;\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n  ",fragmentShader:"\n    varying vec2 vUv;\n		uniform vec3 color;\n    void main() {\n			// 计算距离四条边的最小距离\n        float distance = max(max(vUv.x, -vUv.x), max(vUv.y, -vUv.y));\n\n        // 将距离映射到透明度（从边缘到中心逐渐变透明）\n        float alpha = smoothstep(0.1, 0.9, distance*1.1);\n\n        // 设置最终颜色和透明度\n        gl_FragColor = vec4(color, alpha);\n    }\n  ",transparent:!0,side:L,depthWrite:!1,depthTest:!0,uniforms:{color:{type:"uvs",value:new r(o.color)}}});let e=new M(n);V(e,!0);const g=new G(e,t),x=n.getPoints(),l=new w;l.setPositions(x.flatMap(i=>[i.x,i.y,0]));var p=new v({color:new r(o.color),linewidth:.002});const _=new F(l,p);return b(()=>{t.uniforms.color.value=new r(o.color),p.color=new r(o.color)}),(i,m)=>(d(),P("TresGroup",null,[f("primitive",{object:h(g),renderOrder:9999,"rotation-x":Math.PI/2},null,8,A),f("primitive",{object:h(_),renderOrder:9999,"rotation-x":Math.PI/2},null,8,I)]))}}),Q=u({__name:"regionGlow",setup(s){const o=U({color:"#00ffdd",height:26}),n=new C({title:"区域边界发光",expanded:!0});return n.addBinding(o,"color",{label:"颜色"}),n.addBinding(o,"height",{label:"高度",min:0,max:80,step:1}),(t,e)=>(d(),B(k,{ref:"pagesShowRef"},{ability:j(()=>[a(c,{"position-y":26,positionSrc:[[-7.3*40,4.27*40],[-7.4*40,10.05*40],[-4.9*40,10.03*40],[-4.9*40,4.46*40],[-7.3*40,4.27*40]]}),a(c,{"position-y":o.height,color:o.color,positionSrc:[[.27*40,-1.19*40],[.32*40,-5.5*40],[-7.59*40,-5.9*40],[-7.6*40,-1.3*40],[.27*40,-1.19*40]]},null,8,["position-y","color"]),a(c,{position:[500,86,300],color:"#0054ff",positionSrc:[[.27*40,-1.19*40],[.32*40,-5.5*40],[-7.59*40,-5.9*40],[-8.59*40,-3.9*40],[-7.6*40,-1.3*40],[-2.6*40,1.3*40],[2.6*40,-1.3*40],[.27*40,-1.19*40]]})]),_:1},512))}});export{Q as default};
