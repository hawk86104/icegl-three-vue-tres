import{$ as T,k as _,aD as g,bd as C,bk as R,b3 as v,bW as x,a5 as B,a4 as E,o as f,c as p,E as G,G as M,W as h,K as d,bq as S,az as L}from"./vendor.Cjb8724R1710847861472.js";import{l as W}from"./utils.peTT1USb1710847861472.js";const J=["position","rotation-y","scale"],V={renderOrder:3e3},Y=["args"],j=["map","side","color"],y=6e4,A=T({__name:"roadLight",props:{geoJson:{},color:{default:"#ffff00"},position:{default:[1837.0641427711184,30,-457.0929823910632]},radius:{default:2},rotationY:{default:-.3866683251512052},scale:{default:1.5083171193254858},speed:{default:1}},async setup(w){let t,a;const e=w,b=_(),r=_(),{map:o}=([t,a]=g(()=>C({map:"./plugins/digitalCity/image/line.png"})),t=await t,a(),t);o.needsUpdate=!0,o.wrapS=o.wrapT=R,o.repeat.set(1,1);const u=([t,a]=g(()=>W(e.geoJson)),t=await t,a(),t),n=[-31.258949,0,-121.465782];let m=[];for(var c=0;c<u.length;c++){const i=u[c],l=[];i.geometry.coordinates.forEach(s=>{l.push(new v((s[1]+n[0])*y,n[1],(s[0]+n[2])*y))}),m.push(new x(l))}B(()=>{e.color&&r.value&&(r.value.color=new L(e.color))});const{onLoop:k}=E();return k(({delta:i})=>{o.offset.x-=Math.random()/20*e.speed}),(i,l)=>(f(),p("TresGroup",{ref_key:"tgRef",ref:b,position:e.position,"rotation-y":e.rotationY,scale:e.scale},[(f(!0),p(G,null,M(d(m),s=>(f(),p("TresMesh",V,[h("TresTubeGeometry",{args:[s,64,e.radius,20,!1]},null,8,Y),h("TresMeshBasicMaterial",{ref_for:!0,ref_key:"tmbmRef",ref:r,map:d(o),side:d(S),transparent:!0,color:e.color},null,8,j)]))),256))],8,J))}});export{A as _};
