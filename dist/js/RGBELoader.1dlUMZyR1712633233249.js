import{cG as z,be as G,as as S,cH as B,cX as Y,aH as V}from"./vendor.aZqsjRbH1712633233249.js";class O extends z{constructor(g){super(g),this.type=G}parse(g){const _=function(r,a){switch(r){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(a||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(a||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(a||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(a||""))}},u="\n",D=function(r,a,t){a=a||1024;let s=r.pos,i=-1,e=0,l="",o=String.fromCharCode.apply(null,new Uint16Array(r.subarray(s,s+128)));for(;0>(i=o.indexOf(u))&&e<a&&s<r.byteLength;)l+=o,e+=o.length,s+=128,o+=String.fromCharCode.apply(null,new Uint16Array(r.subarray(s,s+128)));return-1<i?(t!==!1&&(r.pos+=e+i+1),l+o.slice(0,i)):!1},N=function(r){const a=/^#\?(\S+)/,t=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,n=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,s=/^\s*FORMAT=(\S+)\s*$/,i=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,e={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let l,o;for((r.pos>=r.byteLength||!(l=D(r)))&&_(1,"no header found"),(o=l.match(a))||_(3,"bad initial token"),e.valid|=1,e.programtype=o[1],e.string+=l+"\n";l=D(r),l!==!1;){if(e.string+=l+"\n",l.charAt(0)==="#"){e.comments+=l+"\n";continue}if((o=l.match(t))&&(e.gamma=parseFloat(o[1])),(o=l.match(n))&&(e.exposure=parseFloat(o[1])),(o=l.match(s))&&(e.valid|=2,e.format=o[1]),(o=l.match(i))&&(e.valid|=4,e.height=parseInt(o[1],10),e.width=parseInt(o[2],10)),e.valid&2&&e.valid&4)break}return e.valid&2||_(3,"missing format specifier"),e.valid&4||_(3,"missing image size specifier"),e},v=function(r,a,t){const n=a;if(n<8||n>32767||r[0]!==2||r[1]!==2||r[2]&128)return new Uint8Array(r);n!==(r[2]<<8|r[3])&&_(3,"wrong scanline width");const s=new Uint8Array(4*a*t);s.length||_(4,"unable to allocate buffer space");let i=0,e=0;const l=4*n,o=new Uint8Array(4),E=new Uint8Array(l);let k=t;for(;k>0&&e<r.byteLength;){e+4>r.byteLength&&_(1),o[0]=r[e++],o[1]=r[e++],o[2]=r[e++],o[3]=r[e++],(o[0]!=2||o[1]!=2||(o[2]<<8|o[3])!=n)&&_(3,"bad rgbe scanline format");let R=0,c;for(;R<l&&e<r.byteLength;){c=r[e++];const h=c>128;if(h&&(c-=128),(c===0||R+c>l)&&_(3,"bad scanline data"),h){const m=r[e++];for(let U=0;U<c;U++)E[R++]=m}else E.set(r.subarray(e,e+c),R),R+=c,e+=c}const P=n;for(let h=0;h<P;h++){let m=0;s[i]=E[h+m],m+=n,s[i+1]=E[h+m],m+=n,s[i+2]=E[h+m],m+=n,s[i+3]=E[h+m],i+=4}k--}return s},x=function(r,a,t,n){const s=r[a+3],i=Math.pow(2,s-128)/255;t[n+0]=r[a+0]*i,t[n+1]=r[a+1]*i,t[n+2]=r[a+2]*i,t[n+3]=1},C=function(r,a,t,n){const s=r[a+3],i=Math.pow(2,s-128)/255;t[n+0]=B.toHalfFloat(Math.min(r[a+0]*i,65504)),t[n+1]=B.toHalfFloat(Math.min(r[a+1]*i,65504)),t[n+2]=B.toHalfFloat(Math.min(r[a+2]*i,65504)),t[n+3]=B.toHalfFloat(1)},w=new Uint8Array(g);w.pos=0;const d=N(w),H=d.width,f=d.height,y=v(w.subarray(w.pos),H,f);let L,I,p;switch(this.type){case S:p=y.length/4;const r=new Float32Array(p*4);for(let t=0;t<p;t++)x(y,t*4,r,t*4);L=r,I=S;break;case G:p=y.length/4;const a=new Uint16Array(p*4);for(let t=0;t<p;t++)C(y,t*4,a,t*4);L=a,I=G;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:H,height:f,data:L,header:d.string,gamma:d.gamma,exposure:d.exposure,type:I}}setDataType(g){return this.type=g,this}load(g,b,A,F){function M(_,T){switch(_.type){case S:case G:_.colorSpace=Y,_.minFilter=V,_.magFilter=V,_.generateMipmaps=!1,_.flipY=!0;break}b&&b(_,T)}return super.load(g,M,A,F)}}export{O as R};