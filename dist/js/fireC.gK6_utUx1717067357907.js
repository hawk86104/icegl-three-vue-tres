import{_ as Ae}from"./pagesShow.vue_vue_type_script_setup_true_lang.ovkzG9ti1717067357907.js";import{c2 as ge,cs as _e,bN as xe,ap as ze,ct as ve,aw as be,bw as Ce,b8 as Fe,b6 as Me,bm as U,bo as De,a1 as te,aD as Pe,a4 as Ve,o as H,c as ke,L as Oe,a9 as Be,x as N,E as ee,ag as He,a as Le}from"./vendor.Bhln4awG1717067357907.js";import"./vanilla.YA2K2vt81717067357907.js";import"./object_hash.MnKN4xNn1717067357907.js";import"./_commonjsHelpers.5-cIlDoe1717067357907.js";import"./_commonjs-dynamic-modules.h-SxKiO41717067357907.js";import"./builtins-300es.Tm_BdSQ71717067357907.js";import"./LineSegments2.5efbUp_i1717067357907.js";const Re=({startFrame:p,endFrame:d,fps:w,frameName:n,textureDataURL:S,textureImageURL:h,loop:A,numberOfFrames:v,autoPlay:se,animationNames:re,onStart:L,onEnd:R,onLoopEnd:W,onFrame:Y,play:X,pause:b,flipX:ae,alphaTest:m,asSprite:C})=>{let l={frames:[],meta:{version:"1.0",size:{w:1,h:1},scale:"1"}},j=!1,F=new ge;const M=new _e({toneMapped:!1,transparent:!0,map:F,alphaTest:m!=null?m:0}),G=new xe({toneMapped:!1,side:ze,map:F,transparent:!0,alphaTest:m!=null?m:0}),g=new ve(M),D=new be(new Ce(1,1),G);let o=M,y=g;const u=new Fe;u.add(y);let I=window.performance.now(),f=p||0,P=n||"";const E=1e3/(w||30),ne=e=>{F=e,o&&(o.map=e)},oe=new Me(1,1,1),ie=e=>{oe.copy(e)},$=ae?-1:1;let V=C!=null?C:!0;(e=>{V=e,V?(o=M,y=g,u.add(g),u.remove(D)):(o=G,y=D,u.remove(g),u.add(D))})(V);async function ce(e,t,r){const s=new U,i=fetch(e).then(a=>a.json()),c=new Promise(a=>{s.load(t,a)});await Promise.all([i,c]).then(a=>{r(a[0],a[1])})}const J=(e,t)=>{const r=t/e;return y.scale.set(1,r,1),y.scale},le=async()=>{if(S&&h)await ce(S,h,K);else if(h){const t=await new U().loadAsync(h);K(null,t)}},fe=e=>{n=e,P!==n&&n&&(f=0,P=n)},pe=()=>{b=!0},me=()=>{X=!0,b=!1},K=(e,t)=>{if(e===null){if(t&&v){const r=t.image.width,s=t.image.height,i=r/v,c=s;if(l={frames:[],meta:{version:"1.0",size:{w:r,h:s},scale:"1"}},parseInt(i.toString(),10)===i)for(let a=0;a<v;a++)l.frames.push({frame:{x:a*i,y:0,w:i,h:c},rotated:!1,trimmed:!1,spriteSourceSize:{x:0,y:0,w:i,h:c},sourceSize:{w:i,h:s}})}}else if(t){l=e,l.frames=Array.isArray(e.frames)?e.frames:ue();const{w:r,h:s}=q(e.frames).sourceSize,i=J(r,s);ie(i),o&&(o.map=t)}t.premultiplyAlpha=!1,ne(t),de()},ue=()=>{const e={},t=l,r=re;if(r)for(let s=0;s<r.length;s++){e[r[s]]=[];for(const i in t.frames){const c=t.frames[i],a=c.frame,_=a.x,x=a.y,k=a.w,O=a.h,B=c.sourceSize.w,z=c.sourceSize.h;typeof i=="string"&&i.toLowerCase().indexOf(r[s].toLowerCase())!==-1&&e[r[s]].push({x:_,y:x,w:k,h:O,frame:a,sourceSize:{w:B,h:z}})}}return e},de=()=>{if(!(l&&o.map))return;const{meta:{size:e},frames:t}=l,{w:r,h:s}=Array.isArray(t)?t[0].sourceSize:n?t[n]?t[n][0].sourceSize:{w:0,h:0}:{w:0,h:0};o.map.wrapS=o.map.wrapT=De,o.map.center.set(0,0),o.map.repeat.set(1*$/(e.w/r),1/(e.h/s));const c=1/((e.h-1)/s);o.map.offset.x=0,o.map.offset.y=1-c,L&&L({currentFrameName:n,currentFrame:f})},we=()=>{if(!(l&&o.map))return;const e=window.performance.now(),t=e-I,{meta:{size:r},frames:s}=l,{w:i,h:c}=q(s).sourceSize,a=Array.isArray(s)?s:n?s[n]:[];let _=0,x=0;const k=d||a.length-1;if(f>k&&(f=A&&p!=null?p:0,A?W==null||W({currentFrameName:n,currentFrame:f}):(R==null||R({currentFrameName:n,currentFrame:f}),j=!0),!A)||t<=E)return;I=e-t%E,J(i,c);const O=(r.w-1)/i,B=(r.h-1)/c,{frame:{x:z,y:ye},sourceSize:{w:Q,h:Se}}=a[f],Z=1/O,T=1/B;_=$>0?Z*(z/Q):Z*(z/Q)-o.map.repeat.x,x=Math.abs(1-T)-T*(ye/Se),o.map.offset.x=_,o.map.offset.y=x,f+=1},he=()=>{var e,t;!((e=l)!=null&&e.frames)||!((t=o)!=null&&t.map)||b||!j&&(se||X)&&(we(),Y&&Y({currentFrameName:P,currentFrame:f}))},q=e=>{if(Array.isArray(e))return e[0];if(typeof e=="object"&&e!==null){const t=Object.keys(e);return e[t[0]][0]}else return{w:0,h:0}};return{group:u,init:le,update:he,playAnimation:me,pauseAnimation:pe,setFrameName:fe}},We=["object"],Ye=te({__name:"fireC",async setup(p){let d,w;const n=Re({startFrame:0,fps:40,autoPlay:!0,loop:!0,textureImageURL:"./plugins/digitalCity/image/spriteAnimator/flame.png",textureDataURL:"./plugins/digitalCity/image/spriteAnimator/flame.json",alphaTest:.101,asSprite:!0});[d,w]=Pe(()=>n.init()),await d,w(),n.group.children[0].material.map.colorSpace=Ve;const{onLoop:S}=Be();return S(()=>{n.update()}),(h,A)=>(H(),ke("primitive",{object:Oe(n).group,renderOrder:9999},null,8,We))}}),Qe=te({__name:"fireC",setup(p){return(d,w)=>(H(),N(Ae,null,{ability:ee(()=>[(H(),N(He,null,{default:ee(()=>[Le(Ye,{position:[0,70,0],scale:100})]),_:1}))]),_:1}))}});export{Qe as default};
