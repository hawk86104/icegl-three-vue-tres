import{_ as Ae}from"./pagesShow.vue_vue_type_script_setup_true_lang.005FY98B1718275421844.js";import{c6 as ge,cx as _e,bS as xe,at as ze,cy as ve,aA as be,bB as Ce,be as Fe,ba as Me,br as U,bt as ke,a5 as te,aH as De,a8 as Pe,o as O,c as Ve,T as Be,ad as He,C as N,J as ee,ak as Oe,a as Re}from"./vendor.n5mLuYaN1718275421844.js";import"./vanilla-307d3a93.esm.LKieLikZ1718275421844.js";import"./object_hash.DvA9o96b1718275421844.js";import"./_commonjsHelpers.5-cIlDoe1718275421844.js";import"./_commonjs-dynamic-modules.h-SxKiO41718275421844.js";import"./index.iuxbrWH61718275421844.js";import"./LineSegments2.hFvgehsZ1718275421844.js";const We=({startFrame:p,endFrame:d,fps:h,frameName:r,textureDataURL:S,textureImageURL:w,loop:A,numberOfFrames:v,autoPlay:se,animationNames:re,onStart:R,onEnd:W,onLoopEnd:Y,onFrame:L,play:X,pause:b,flipX:ae,alphaTest:m,asSprite:C})=>{let l={frames:[],meta:{version:"1.0",size:{w:1,h:1},scale:"1"}},j=!1,F=new ge;const M=new _e({toneMapped:!1,transparent:!0,map:F,alphaTest:m!=null?m:0}),G=new xe({toneMapped:!1,side:ze,map:F,transparent:!0,alphaTest:m!=null?m:0}),g=new ve(M),k=new be(new Ce(1,1),G);let o=M,y=g;const u=new Fe;u.add(y);let I=window.performance.now(),f=p||0,D=r||"";const J=1e3/(h||30),ne=e=>{F=e,o&&(o.map=e)},oe=new Me(1,1,1),ie=e=>{oe.copy(e)},$=ae?-1:1;let P=C!=null?C:!0;(e=>{P=e,P?(o=M,y=g,u.add(g),u.remove(k)):(o=G,y=k,u.remove(g),u.add(k))})(P);async function ce(e,t,a){const s=new U,i=fetch(e).then(n=>n.json()),c=new Promise(n=>{s.load(t,n)});await Promise.all([i,c]).then(n=>{a(n[0],n[1])})}const E=(e,t)=>{const a=t/e;return y.scale.set(1,a,1),y.scale},le=async()=>{if(S&&w)await ce(S,w,K);else if(w){const t=await new U().loadAsync(w);K(null,t)}},fe=e=>{r=e,D!==r&&r&&(f=0,D=r)},pe=()=>{b=!0},me=()=>{X=!0,b=!1},K=(e,t)=>{if(e===null){if(t&&v){const a=t.image.width,s=t.image.height,i=a/v,c=s;if(l={frames:[],meta:{version:"1.0",size:{w:a,h:s},scale:"1"}},parseInt(i.toString(),10)===i)for(let n=0;n<v;n++)l.frames.push({frame:{x:n*i,y:0,w:i,h:c},rotated:!1,trimmed:!1,spriteSourceSize:{x:0,y:0,w:i,h:c},sourceSize:{w:i,h:s}})}}else if(t){l=e,l.frames=Array.isArray(e.frames)?e.frames:ue();const{w:a,h:s}=q(e.frames).sourceSize,i=E(a,s);ie(i),o&&(o.map=t)}t.premultiplyAlpha=!1,ne(t),de()},ue=()=>{const e={},t=l,a=re;if(a)for(let s=0;s<a.length;s++){e[a[s]]=[];for(const i in t.frames){const c=t.frames[i],n=c.frame,_=n.x,x=n.y,V=n.w,B=n.h,H=c.sourceSize.w,z=c.sourceSize.h;typeof i=="string"&&i.toLowerCase().indexOf(a[s].toLowerCase())!==-1&&e[a[s]].push({x:_,y:x,w:V,h:B,frame:n,sourceSize:{w:H,h:z}})}}return e},de=()=>{if(!(l&&o.map))return;const{meta:{size:e},frames:t}=l,{w:a,h:s}=Array.isArray(t)?t[0].sourceSize:r?t[r]?t[r][0].sourceSize:{w:0,h:0}:{w:0,h:0};o.map.wrapS=o.map.wrapT=ke,o.map.center.set(0,0),o.map.repeat.set(1*$/(e.w/a),1/(e.h/s));const c=1/((e.h-1)/s);o.map.offset.x=0,o.map.offset.y=1-c,R&&R({currentFrameName:r,currentFrame:f})},he=()=>{if(!(l&&o.map))return;const e=window.performance.now(),t=e-I,{meta:{size:a},frames:s}=l,{w:i,h:c}=q(s).sourceSize,n=Array.isArray(s)?s:r?s[r]:[];let _=0,x=0;const V=d||n.length-1;if(f>V&&(f=A&&p!=null?p:0,A?Y==null||Y({currentFrameName:r,currentFrame:f}):(W==null||W({currentFrameName:r,currentFrame:f}),j=!0),!A)||t<=J)return;I=e-t%J,E(i,c);const B=(a.w-1)/i,H=(a.h-1)/c,{frame:{x:z,y:ye},sourceSize:{w:Q,h:Se}}=n[f],Z=1/B,T=1/H;_=$>0?Z*(z/Q):Z*(z/Q)-o.map.repeat.x,x=Math.abs(1-T)-T*(ye/Se),o.map.offset.x=_,o.map.offset.y=x,f+=1},we=()=>{var e,t;!((e=l)!=null&&e.frames)||!((t=o)!=null&&t.map)||b||!j&&(se||X)&&(he(),L&&L({currentFrameName:D,currentFrame:f}))},q=e=>{if(Array.isArray(e))return e[0];if(typeof e=="object"&&e!==null){const t=Object.keys(e);return e[t[0]][0]}else return{w:0,h:0}};return{group:u,init:le,update:we,playAnimation:me,pauseAnimation:pe,setFrameName:fe}},Ye=["object"],Le=te({__name:"fireC",async setup(p){let d,h;const r=We({startFrame:0,fps:40,autoPlay:!0,loop:!0,textureImageURL:"./plugins/digitalCity/image/spriteAnimator/flame.png",textureDataURL:"./plugins/digitalCity/image/spriteAnimator/flame.json",alphaTest:.101,asSprite:!0});[d,h]=De(()=>r.init()),await d,h(),r.group.children[0].material.map.colorSpace=Pe,r.group.children[0].geometry.translate(0,.344,0);const{onLoop:S}=He();return S(()=>{r.update()}),(w,A)=>(O(),Ve("primitive",{object:Be(r).group,renderOrder:9999},null,8,Ye))}}),Qe=te({__name:"fireC",setup(p){return(d,h)=>(O(),N(Ae,null,{ability:ee(()=>[(O(),N(Oe,null,{default:ee(()=>[Re(Le,{position:[10,30,0],scale:100})]),_:1}))]),_:1}))}});export{Qe as default};
