var C=Object.defineProperty;var B=(o,e,r)=>e in o?C(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r;var s=(o,e,r)=>(B(o,typeof e!="symbol"?e+"":e,r),r);import{ar as g,as as l,$ as b,a0 as x,k as I,ak as Z,a5 as S,a4 as L,o as p,c as R,a as y,a7 as M,K as m,ab as U,W,E as j,a2 as A,a3 as D,v as w,D as k,a8 as E,b1 as V,ag as $}from"./vendor.IllFj73P1710252887904.js";import{U as d,b as F,M as G,P as N,a as O,T as Q}from"./TerrainMeshProvider.JT28kEQb1710252887904.js";function Y(o){return new Worker(""+new URL("../static/MartiniWorker-8mf_OiU3.js",import.meta.url).href,{name:o==null?void 0:o.name})}class K{constructor(){s(this,"maxZoom",12);s(this,"coordType",d);s(this,"utmZone",50);s(this,"_worker");s(this,"_useWorker",!0);s(this,"source","https://api.maptiler.com/tiles/terrain-rgb-v2/[z]/[x]/[y].webp?key=L55MtSxL94Yb4hQeWewp")}set useWorker(e){var r;this._useWorker=e,this._useWorker||((r=this._worker)==null||r.terminate(),this._worker=void 0)}get useWorker(){return this._useWorker}async getTile(e){return this._useWorker?this.getInWorkerThread(e):this.getInMainThread()}async getInMainThread(){return new g}async getInWorkerThread(e){this._worker||(this._worker=new F(Y));const r={tileNo:e,id:this.getId(e),url:this.getUrl(e),maxZ:this.maxZoom,coordType:this.coordType,utmZone:this.utmZone},t=await this._worker.postMessage(r),a=new g;return a.setAttribute("position",new l(t.positions,3)),a.setAttribute("uv",new l(t.uv,2)),a.setIndex(new l(t.triangles,1)),a}async abort(e){var r;this._useWorker&&((r=this._worker)==null||r.postMessage({id:this.getId(e),abort:!0}))}async dispose(e,r){var t;r.dispose(),this._useWorker&&((t=this._worker)==null||t.postMessage({id:this.getId(e),dispose:!0}))}getId(e){return e.join("-")}getUrl(e){const[r,t,a]=e;return this.source.replace("[x]",r+"").replace("[y]",t+"").replace("[z]",a+"")}}const q=["object"],H=b({__name:"tileMapMesh",props:{bbox:{default:[104.955976,20.149765,120.998419,30.528687]},maxZoom:{default:20}},setup(o){const e=o,r=x({enableDamping:!0,dampingFactor:.05}),t=I(),{camera:a,renderer:f,scene:T}=Z(),P=new N;P.coordType=d;const u=new K;u.source="https://api.maptiler.com/tiles/terrain-rgb-v2/[z]/[x]/[y].webp?key=L55MtSxL94Yb4hQeWewp",u.coordType=d;const n=new O;n.source="https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",n.showTileNo=!1,n.useWorker=!0;const c=new Q(u,n);c.showBoundingBox=!1,c.wireframe=!1;const i=new G;i.provider=c,i.bbox=e.bbox,i.maxZoom=e.maxZoom;let h=!1,v=!1;S(()=>{a.value&&!h&&(h=!0,i.camera=a.value),t.value&&!v&&(v=!0,t.value.value.target.x=a.value.position.x,t.value.value.target.y=a.value.position.y,t.value.value.target.z=0)});const{onLoop:z}=L();return z(()=>{if(f.value){const _=Math.abs(a.value.position.z)*50;a.value.far=_+5e3,a.value.updateProjectionMatrix(),t.value&&(t.value.value.target.z=0),i.update(),f.value.render(T.value,a.value)}}),(_,X)=>(p(),R(j,null,[y(m(U),M(r,{ref_key:"orbitControlRef",ref:t}),null,16),W("primitive",{object:m(i)},null,8,q)],64))}}),J=["position","look-at"],ae=b({__name:"tileMap",setup(o){const e=x({clearColor:"#201919",logarithmicDepthBuffer:!0,antialias:!0,disableRender:!0,outputColorSpace:A,toneMapping:D}),r=[958792.6688235556,2771848203330192e-9,1241.0896440063382];return(t,a)=>(p(),w(m(E),M(e,{"window-size":""}),{default:k(()=>[W("TresPerspectiveCamera",{position:new V(r[0],r[1],r[2]),fov:60,near:1,far:1e8,"look-at":[r[0],r[1],0],up:[0,0,1]},null,8,J),(p(),w($,null,{default:k(()=>[y(H,{bbox:[104.955976,20.149765,120.998419,30.528687]})]),_:1}))]),_:1},16))}});export{ae as default};