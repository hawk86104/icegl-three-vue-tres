import{$ as i,bv as p,at as l,cg as m,bQ as r,a5 as f,o as u,c as y,K as d,aq as _}from"./vendor.mx_kdcfJ1708663258526.js";const v=["object"],w=i({__name:"cloudPoints",props:{model:{},color:{default:"#FFF"},opacity:{default:1},isRemoveSrc:{type:Boolean,default:!1}},setup(n){const o=n,t=new p;return o.model.traverse(e=>{if(e instanceof l){const s=e.geometry.clone();e.geometry.dispose(),e.material.dispose();const a=new m({color:o.color});a.opacity=o.opacity,a.transparent=!0;const c=new r(s,a);t.add(c),o.model.parent&&t.applyMatrix4(o.model.parent.matrix),o.isRemoveSrc&&e.removeFromParent()}}),f(()=>{o.color&&t.traverse(e=>{e instanceof r&&(e.material.color=new _(o.color))}),o.opacity&&t.traverse(e=>{e instanceof r&&(e.material.opacity=o.opacity)})}),(e,s)=>(u(),y("primitive",{object:d(t)},null,8,v))}});export{w as _};
