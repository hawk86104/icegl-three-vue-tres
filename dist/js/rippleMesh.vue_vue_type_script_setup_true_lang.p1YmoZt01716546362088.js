import{a1 as S,l as U,ap as P,b$ as y,az as g,a6 as b,o as k,c as A,Y as h,L as x,aa as B,ab as R,a9 as T}from"./vendor.LnRgd2r_1716546362088.js";import{g as F}from"./utils.419h9bTI1716546362088.js";const V=["position","uv"],z=S({__name:"rippleMesh",props:{positionSrc:{default:[{x:0,y:0},{x:10,y:10}]},color:{default:"#ffff00"},opacity:{default:.8},height:{default:100},num:{default:8},speed:{default:.15}},setup(_){const r=_,f=U(),a={side:P,transparent:!0,depthWrite:!1,depthTest:!0,vertexShader:"\nprecision lowp float;\nprecision lowp int;\n".concat(y.fog_pars_vertex,"\nvarying vec2 vUv;\nvoid main() {\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    ").concat(y.fog_vertex,"\n}\n"),fragmentShader:"\n  precision lowp float;\n  precision lowp int;\n  uniform float time;\n  uniform float opacity;\n  uniform vec3 color;\n  uniform float num;\n  uniform float speed;\n  varying vec2 vUv;\n  void main() {\n    vec4 fragColor = vec4(0.);\n    float sin = sin((vUv.y - time * speed) * 10. * num);\n    float high = 0.92;\n    float medium = 0.4;\n    if (sin > high) {\n      fragColor = vec4(mix(vec3(.8, 1., 1.), color, (1. - sin) / (1. - high)), 1.);\n    } else if(sin > medium) {\n      fragColor = vec4(color, mix(1., 0., 1.-(sin - medium) / (high - medium)));\n    } else {\n      fragColor = vec4(color, 0.);\n    }\n    vec3 fade = mix(color, vec3(0., 0., 0.), vUv.y);\n    fragColor = mix(fragColor, vec4(fade, 1.), 0.85);\n    gl_FragColor = vec4(fragColor.rgb, fragColor.a * opacity * (1. - vUv.y));\n  }\n	",uniforms:{time:{type:"pv2",value:0},color:{type:"uvs",value:new g(r.color)},opacity:{type:"pv2",value:r.opacity},num:{type:"pv2",value:r.num},speed:{type:"pv2",value:r.speed}}};let v=null,m=null;function C(l=[],p){const e=[],i=[];for(let c=0,o=e.length,t=i.length;c<l.length-1;c++){let u=1,n=l[c],s=l[c+1];e[o++]=n.x,e[o++]=0,e[o++]=n.y,i[t++]=0,i[t++]=0,e[o++]=s.x,e[o++]=0,e[o++]=s.y,i[t++]=1,i[t++]=0,e[o++]=n.x,e[o++]=p,e[o++]=n.y,i[t++]=0,i[t++]=u,e[o++]=n.x,e[o++]=p,e[o++]=n.y,i[t++]=0,i[t++]=u,e[o++]=s.x,e[o++]=0,e[o++]=s.y,i[t++]=1,i[t++]=0,e[o++]=s.x,e[o++]=p,e[o++]=s.y,i[t++]=1,i[t++]=u}v=new Float32Array(e),m=new Float32Array(i)}const{centerPoint:d,points:w}=F(r.positionSrc);C(w,r.height);const{onLoop:M}=T();return M(({delta:l})=>{a.uniforms.time.value+=l}),b(()=>{r.color&&(a.uniforms.color.value=new g(r.color)),r.opacity&&(a.uniforms.opacity.value=r.opacity),r.num&&(a.uniforms.num.value=r.num),r.speed&&(a.uniforms.speed.value=r.speed),f.value&&f.value.position.set(d.x,f.value.position.y,d.y)}),(l,p)=>(k(),A("TresMesh",{renderOrder:2200,ref_key:"tresMeshRef",ref:f},[h("TresBufferGeometry",{position:[x(v),3],uv:[x(m),2]},null,8,V),h("TresShaderMaterial",B(R(a)),null,16)],512))}});export{z as _};