import{a5 as f,q as x,bb as b,B as _,o as p,c as y,a as t,b6 as M,T as a,bc as P,a1 as r,ad as w,a6 as v,b7 as z,C as d,J as l,ac as S,b8 as T,ae as C,af as D,ag as N,ak as B}from"./vendor.iBV-vwSJ1717643756855.js";import{_ as k}from"./component.vue_vue_type_script_setup_true_lang.btOAvQEt1717643756855.js";import{_ as s}from"./vanilla.esm.5.5.0.gmH2wuHU1717643756855.js";import"./object_hash.O7Sw-hlw1717643756855.js";import"./_commonjsHelpers.5-cIlDoe1717643756855.js";import"./_commonjs-dynamic-modules.h-SxKiO41717643756855.js";const R="\n// Precision-adjusted variations of https://www.shadertoy.com/view/4djSRW\nfloat hash(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }\nfloat hash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }\n\nfloat noise(vec3 x) {\n    const vec3 step = vec3(110, 241, 171);\n\n    vec3 i = floor(x);\n    vec3 f = fract(x);\n\n    // For performance, compute the base input to a 1D hash from the integer part of the argument and the\n    // incremental change to the 1D based on the 3D -> 1D wrapping\n    float n = dot(i, step);\n\n    vec3 u = f * f * (3.0 - 2.0 * f);\n    return mix(mix(mix(hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),\n                   mix(hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),\n               mix(mix(hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),\n                   mix(hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);\n}\n",I=r("TresSphereGeometry",{args:[1,64,64]},null,-1),L=f({__name:"instancedMeshCom",setup(u){const n=x(null),i={vertex:"\n    uniform float uTime;\n		varying vec3 vPosition;\n		".concat(R,"\n    vec3 displace(vec3 point) {\n      vec3 instancePosition = (instanceMatrix * vec4(point, 1.)).xyz;\n      return instancePosition + (normal * noise((instancePosition * 3.) + uTime) * 0.8);\n    }  \n\n    vec3 orthogonal(vec3 v) {\n      return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)\n      : vec3(0.0, -v.z, v.y));\n    }\n\n    vec3 recalcNormals(vec3 newPos) {\n      float offset = 0.001;\n      vec3 tangent = orthogonal(normal);\n      vec3 bitangent = normalize(cross(normal, tangent));\n      vec3 neighbour1 = position + tangent * offset;\n      vec3 neighbour2 = position + bitangent * offset;\n\n      vec3 displacedNeighbour1 = displace(neighbour1);\n      vec3 displacedNeighbour2 = displace(neighbour2);\n\n      vec3 displacedTangent = displacedNeighbour1 - newPos;\n      vec3 displacedBitangent = displacedNeighbour2 - newPos;\n\n      return normalize(cross(displacedTangent, displacedBitangent));\n    }\n\n    void main() {\n			vPosition = position;\n      vec3 p = displace(position);\n      csm_PositionRaw = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(p, 1.);\n      csm_Normal = recalcNormals(p);\n    }\n    "),fragment:"\n		varying vec3 vPosition;\n		// 函数将 HSL 转换为 RGB\n		vec3 hsl2rgb(float h, float s, float l) {\n				float c = (1.0 - abs(2.0 * l - 1.0)) * s;\n				float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));\n				float m = l - c / 2.0;\n				vec3 rgb;\n				if (0.0 <= h && h < 1.0 / 6.0) {\n						rgb = vec3(c, x, 0.0);\n				} else if (1.0 / 6.0 <= h && h < 2.0 / 6.0) {\n						rgb = vec3(x, c, 0.0);\n				} else if (2.0 / 6.0 <= h && h < 3.0 / 6.0) {\n						rgb = vec3(0.0, c, x);\n				} else if (3.0 / 6.0 <= h && h < 4.0 / 6.0) {\n						rgb = vec3(0.0, x, c);\n				} else if (4.0 / 6.0 <= h && h < 5.0 / 6.0) {\n						rgb = vec3(x, 0.0, c);\n				} else if (5.0 / 6.0 <= h && h < 6.0 / 6.0) {\n						rgb = vec3(c, 0.0, x);\n				} else {\n						rgb = vec3(0.0, 0.0, 0.0);\n				}\n				rgb += vec3(m);\n				return rgb;\n		}\n    void main() {\n      // csm_DiffuseColor = vec4(1.,1.,1.,1.);\n			float h = mod(vPosition.x + vPosition.y + vPosition.z, 1.0); // 色相 H: [0, 1)\n			float s = 0.9; // 饱和度 S: 固定为 0.8\n			float l = 0.4; // 亮度 L: 固定为 0.5\n			vec3 rgb = hsl2rgb(h, s, l);\n			csm_DiffuseColor = vec4(rgb,1.);\n    }\n    "},c={uTime:{value:0}},e=new b,{onLoop:g}=w();return g(({elapsed:o})=>{c.uTime.value=o}),_(()=>n.value,o=>{if(o){let h=0;for(let m=0;m<88;m++)e.position.set(Math.random(),Math.random(),Math.random()),e.rotation.set(Math.random(),Math.random(),Math.random()),e.position.multiplyScalar(10),e.position.x-=5,e.position.y-=5,e.position.z-=5,e.updateMatrix(),o.setMatrixAt(h++,e.matrix);o.instanceMatrix.needsUpdate=!0}}),(o,h)=>(p(),y("TresInstancedMesh",{ref_key:"tmRef",ref:n,args:[null,null,88]},[I,t(a(P),{baseMaterial:M,vertexShader:i.vertex,fragmentShader:i.fragment,uniforms:c,transparent:""},null,8,["baseMaterial","vertexShader","fragmentShader"])],512))}}),$=r("TresPerspectiveCamera",{position:[15,15,15],fov:45,near:1,far:1e3},null,-1),j=r("TresAmbientLight",{intensity:.5},null,-1),A=r("TresDirectionalLight",{position:[7,10,-5.5],intensity:5},null,-1),O=f({__name:"instancedMeshCustomShaderMaterial",setup(u){const n=v({alpha:!0,toneMapping:z,windowSize:!0,clearColor:0}),i=v({enableDamping:!0});return(c,e)=>(p(),d(a(T),S(n,{"window-size":""}),{default:l(()=>[$,t(a(N),C(D(i)),null,16),j,A,(p(),d(B,null,{default:l(()=>[t(a(k),{intensity:16,resolution:256,background:"",blur:.6},{default:l(()=>[t(a(s),{intensity:2,form:"circle","rotation-x":Math.PI/2,position:[2*4-3*4/2,4,0],scale:[1,5,0]},null,8,["rotation-x"]),t(a(s),{intensity:2,form:"circle","rotation-x":Math.PI/2,position:[-(3*4)/2,4,0],scale:[1,5,0]},null,8,["rotation-x"]),t(a(s),{intensity:1,"rotation-y":-Math.PI/2,position:[-1,0,0],scale:[10,.2,1]},null,8,["rotation-y"]),t(a(s),{intensity:1,"rotation-y":-Math.PI/2,position:[1,0,0],scale:[10,.2,1]},null,8,["rotation-y"])]),_:1})]),_:1})),t(L)]),_:1},16))}});export{O as default};
