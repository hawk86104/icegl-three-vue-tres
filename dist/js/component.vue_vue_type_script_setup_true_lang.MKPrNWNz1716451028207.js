import{bV as K,aF as ee,aw as ae,bW as re,bm as I,at as V,bX as C,aI as $,ak as Q,bY as te,l as U,v as z,bZ as ne,w as A,b_ as O,L as D,b$ as oe,c0 as Y,a1 as se,aQ as ie,aD as le,o as ue,c as ce,a0 as de,Z as _e,a9 as me,c1 as W,c2 as X,c3 as pe,c4 as Z,aC as j,c5 as he}from"./vendor.KwxG0fE31716451028207.js";class ve extends K{constructor(){super(),this.virtualScene=null,this.virtualScene=new ee}add(...i){return this.virtualScene.add(...i),this}destructor(){this.virtualScene.traverse(i=>{i instanceof ae&&(i.geometry.dispose(),i.material.dispose(),i.material.map&&i.material.map.dispose(),this.virtualScene.remove(i))}),this.virtualScene=null}}class q extends re{constructor(i){super(i),this.type=I}parse(i){const h=function(e,t){switch(e){case 1:console.error("THREE.RGBELoader Read Error: "+(t||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(t||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(t||""));break;default:case 4:console.error("THREE.RGBELoader: Error: "+(t||""))}return-1},f="\n",l=function(e,t,c){t=t||1024;let u=e.pos,o=-1,a=0,d="",r=String.fromCharCode.apply(null,new Uint16Array(e.subarray(u,u+128)));for(;0>(o=r.indexOf(f))&&a<t&&u<e.byteLength;)d+=r,a+=r.length,u+=128,r+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(u,u+128)));return-1<o?(c!==!1&&(e.pos+=a+o+1),d+r.slice(0,o)):!1},b=function(e){const t=/^#\?(\S+)/,c=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,s=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,u=/^\s*FORMAT=(\S+)\s*$/,o=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,a={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let d,r;if(e.pos>=e.byteLength||!(d=l(e)))return h(1,"no header found");if(!(r=d.match(t)))return h(3,"bad initial token");for(a.valid|=1,a.programtype=r[1],a.string+=d+"\n";d=l(e),d!==!1;){if(a.string+=d+"\n",d.charAt(0)==="#"){a.comments+=d+"\n";continue}if((r=d.match(c))&&(a.gamma=parseFloat(r[1])),(r=d.match(s))&&(a.exposure=parseFloat(r[1])),(r=d.match(u))&&(a.valid|=2,a.format=r[1]),(r=d.match(o))&&(a.valid|=4,a.height=parseInt(r[1],10),a.width=parseInt(r[2],10)),a.valid&2&&a.valid&4)break}return a.valid&2?a.valid&4?a:h(3,"missing image size specifier"):h(3,"missing format specifier")},R=function(e,t,c){const s=t;if(s<8||s>32767||e[0]!==2||e[1]!==2||e[2]&128)return new Uint8Array(e);if(s!==(e[2]<<8|e[3]))return h(3,"wrong scanline width");const u=new Uint8Array(4*t*c);if(!u.length)return h(4,"unable to allocate buffer space");let o=0,a=0;const d=4*s,r=new Uint8Array(4),L=new Uint8Array(d);let H=c;for(;H>0&&a<e.byteLength;){if(a+4>e.byteLength)return h(1);if(r[0]=e[a++],r[1]=e[a++],r[2]=e[a++],r[3]=e[a++],r[0]!=2||r[1]!=2||(r[2]<<8|r[3])!=s)return h(3,"bad rgbe scanline format");let M=0,k;for(;M<d&&a<e.byteLength;){k=e[a++];const S=k>128;if(S&&(k-=128),k===0||M+k>d)return h(3,"bad scanline data");if(S){const B=e[a++];for(let P=0;P<k;P++)L[M++]=B}else L.set(e.subarray(a,a+k),M),M+=k,a+=k}const J=s;for(let S=0;S<J;S++){let B=0;u[o]=L[S+B],B+=s,u[o+1]=L[S+B],B+=s,u[o+2]=L[S+B],B+=s,u[o+3]=L[S+B],o+=4}H--}return u},v=function(e,t,c,s){const u=e[t+3],o=Math.pow(2,u-128)/255;c[s+0]=e[t+0]*o,c[s+1]=e[t+1]*o,c[s+2]=e[t+2]*o,c[s+3]=1},F=function(e,t,c,s){const u=e[t+3],o=Math.pow(2,u-128)/255;c[s+0]=C.toHalfFloat(Math.min(e[t+0]*o,65504)),c[s+1]=C.toHalfFloat(Math.min(e[t+1]*o,65504)),c[s+2]=C.toHalfFloat(Math.min(e[t+2]*o,65504)),c[s+3]=C.toHalfFloat(1)},m=new Uint8Array(i);m.pos=0;const g=b(m);if(g!==-1){const e=g.width,t=g.height,c=R(m.subarray(m.pos),e,t);if(c!==-1){let s,u,o;switch(this.type){case V:o=c.length/4;const a=new Float32Array(o*4);for(let r=0;r<o;r++)v(c,r*4,a,r*4);s=a,u=V;break;case I:o=c.length/4;const d=new Uint16Array(o*4);for(let r=0;r<o;r++)F(c,r*4,d,r*4);s=d,u=I;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type);break}return{width:e,height:t,data:s,header:g.string,gamma:g.gamma,exposure:g.exposure,type:u}}}return null}setDataType(i){return this.type=i,this}load(i,p,G,_){function T(E,h){switch(E.type){case V:case I:"colorSpace"in E?E.colorSpace="srgb-linear":E.encoding=3e3,E.minFilter=$,E.magFilter=$,E.generateMipmaps=!1,E.flipY=!0;break}p&&p(E,h)}return super.load(i,T,G,_)}}const N={sunset:"venice/venice_sunset_1k.hdr",studio:"studio/poly_haven_studio_1k.hdr",city:"city/canary_wharf_1k.hdr",umbrellas:"outdoor/outdoor_umbrellas_1k.hdr",night:"outdoor/satara_night_1k.hdr",forest:"outood/mossy_forest_1k.hdr",snow:"outdoor/snowy_forest_path_01_1k.hdr",dawn:"kiara/kiara_1_dawn_1k.hdr",hangar:"indoor/small_hangar_01_1k.hdr",urban:"indoor/abandoned_games_room_02_1k.hdr",modern:"city/modern_buildings_2_1k.hdr",shangai:"city/shanghai_bund_1k.hdr"},ge="https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/";async function fe(x,i){const{scene:p}=Q(),{preset:G,blur:_,files:T=[],path:E="",background:h}=te(x),y=U(),w=z(()=>Array.isArray(T.value)),n=z(()=>w.value?ne:q),f=U(null);return A(()=>[T,E],async([l,b])=>{if(l.value.length>0&&!G.value){try{f.value=await O(D(n),w.value?[D(l)]:D(l),R=>{b.value&&R.setPath(D(b))})}catch(R){throw new Error("Failed to load environment map: ".concat(R))}f.value&&(y.value=w.value?f.value[0]:f.value,y.value.mapping=w.value?oe:Y)}},{immediate:!0}),A(()=>y.value,l=>{p.value&&(p.value.environment=l)},{immediate:!0}),A(()=>[h.value,y.value],([l,b])=>{if(p.value){let R=i!=null&&i.value?i.value.texture:b,v=p.value.background;v!=null&&v.isColor||(v=void 0),p.value.background=l?R:v}},{immediate:!0}),A(()=>_==null?void 0:_.value,l=>{p.value&&(p.value.backgroundBlurriness=l)},{immediate:!0}),A(G,async l=>{if(l&&l in N){const b=ge,R=N[l];try{f.value=await O(q,R,v=>{b&&v.setPath(b)})}catch(v){throw new Error("Failed to load environment map: ".concat(v))}f.value&&(y.value=f.value,y.value.mapping=Y)}else if(l&&!(l in N))throw new Error("Preset must be one of: ".concat(Object.keys(N).join(", ")))},{immediate:!0}),{texture:y}}const ye=se({__name:"component",props:{background:{type:[Boolean,String],default:!1},blur:{default:0},files:{default:[]},path:{default:""},preset:{default:void 0},resolution:{default:256},near:{default:1},far:{default:1e3},frames:{default:1/0},useDefaultScene:{type:Boolean,default:!1}},async setup(x,{expose:i}){let p,G;const _=x,T=U(null);i({texture:T});const{extend:E,renderer:h,scene:y}=Q();let w=null,n=U(null),f=null;const l=U(null);ie(()=>{var m,g;(m=l.value)==null||m.destructor(),(g=n.value)==null||g.dispose()});const{onBeforeLoop:b}=me();let R=1;b(()=>{f&&l.value&&n.value&&(_.frames===1/0||R<_.frames)&&(_.useDefaultScene?f.update(h.value,y.value):f.update(h.value,he(l.value.virtualScene)),R++)});const v=([p,G]=le(()=>fe(_,n)),p=await p,G(),p).texture,F=m=>{m?(y.value.environment=m.texture,_.background&&(y.value.background=m.texture)):(y.value.environment=v.value,_.background&&(y.value.background=v.value))};return A(v,m=>{n.value&&F(n.value)},{immediate:!0,deep:!0}),E({EnvSence:ve}),A(()=>pe().default,m=>{var g,e,t;if(m&&(!n.value||n.value.texture.type!==I)&&(w=m(),Array.isArray(w)&&w.length>0&&typeof((g=w[0])==null?void 0:g.type)!="symbol")){(e=n.value)==null||e.dispose(),n.value=new W(_.resolution),n.value.texture.type=I,f=new X(_.near,_.far,n.value),F(n.value);return}(t=n.value)==null||t.dispose(),n.value=null,F(null)},{immediate:!0,deep:!0}),T.value=v,A(()=>_.useDefaultScene,m=>{var g;m&&(!n.value||n.value.texture.type!==Z)&&((g=n.value)==null||g.dispose(),n.value=new W(_.resolution),f=new X(_.near,_.far,n.value),n.value.texture.type=Z,n.value.texture.generateMipmaps=!1,n.value.texture.minFilter=j,n.value.texture.magFilter=j,F(n.value))},{immediate:!0}),(m,g)=>D(n)?(ue(),ce("TresEnvSence",{key:0,ref_key:"envSence",ref:l},[de(m.$slots,"default")],512)):_e("",!0)}});export{ye as _};