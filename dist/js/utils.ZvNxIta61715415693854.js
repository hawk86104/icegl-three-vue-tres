import{av as l,bi as m,au as c,aw as f,bj as d,az as h,aH as i,ap as w}from"./vendor.bbi2JiG-1715415693854.js";import{W as g}from"./Water2.-QM5wDhX1715415693854.js";import{c as b,d as x,a as B}from"./ExtensionUtilities.uSEH3D8k1715415693854.js";const v=(e,s=!1)=>{e.computeBoundingBox();const{max:o,min:t}=e.boundingBox;e.deleteAttribute("uv");const a=o.x-t.x,u=o.y-t.y,n=[];for(let r=0;r<e.attributes.position.count;r++)s?(n.push((e.attributes.position.getX(r)-(t.x+o.x)/2)/a),n.push((e.attributes.position.getY(r)-(t.y+o.y)/2)/u)):(n.push((e.attributes.position.getX(r)-t.x)/a),n.push((e.attributes.position.getY(r)-t.y)/u));const p=new Float32Array(n);e.setAttribute("uv",new l(p,2))},M=(e,s)=>new Promise((o,t)=>{m(e,{},{method:"get"}).then(a=>{s&&o(a[s]),o(a.features)}).catch(a=>{console.error(a),t(a)})}),_=()=>{c.prototype.computeBoundsTree=b,c.prototype.disposeBoundsTree=x,f.prototype.raycast=B},P=async e=>{const s=await d(["./plugins/water/images/Water_1_M_Normal.jpg","./plugins/water/images/Water_2_M_Normal.jpg"]),o=e.geometry.clone();v(o),o.computeBoundsTree();const t=new g(o,{color:new h("#fff"),scale:20,flowDirection:new i(1,1),textureWidth:1024,textureHeight:1024,normalMap0:s[0],normalMap1:s[1]});return t.material.transparent=!0,t.material.depthWrite=!0,t.material.depthTest=!0,t.material.side=w,t.material.uniforms.config.value.w=20,t.material.uniforms.reflectivity.value=.46,t};function j(e){const s=[];for(let t=0;t<e.length;t++)s.push(new i(e[t].x,e[t].y));const o=new i;for(let t=0;t<s.length;t++)o.add(s[t]);o.divideScalar(s.length);for(let t=0;t<s.length;t++)s[t].sub(o);return{points:s,centerPoint:o}}export{j as g,_ as i,M as l,v as r,P as s};