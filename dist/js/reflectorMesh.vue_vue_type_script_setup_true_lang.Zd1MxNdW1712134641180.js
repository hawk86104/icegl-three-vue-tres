import{a0 as d,ak as f,az as s,bt as m,bu as u,a5 as p,o as z,c as h,X as a,K as l}from"./vendor.FpHYsbG41712134641180.js";import{R as w}from"./Reflector.Rfp1YXW01712134641180.js";const _=["object","rotation-x"],S=["object"],r=10,b=d({__name:"reflectorMesh",props:{mirrorSize:{default:10},gridSize:{default:10},mirrorColor:{default:"#ffffff"},divisions:{default:10},colorCenterLine:{default:"#444444"},colorGrid:{default:"#888888"}},setup(n){const e=n,{sizes:t}=f(),c={clipBias:.1,textureWidth:t.width.value*window.devicePixelRatio,textureHeight:t.height.value*window.devicePixelRatio,multisample:0,color:new s(e.mirrorColor)},o=new w(new m(r,r),c),i=new u(r,e.divisions,e.colorCenterLine,e.colorGrid);return p(()=>{e.mirrorColor&&(o.material.uniforms.color.value=new s(e.mirrorColor)),e.mirrorSize&&o.scale.set(e.mirrorSize/r,e.mirrorSize/r,1),e.gridSize&&i&&i.scale.set(e.gridSize/r,e.gridSize/r,e.gridSize/r)}),(g,v)=>(z(),h("TresGroup",null,[a("primitive",{object:l(o),"rotation-x":-Math.PI/2,"position-y":-1e-4},null,8,_),a("primitive",{object:l(i)},null,8,S)]))}});export{b as _};