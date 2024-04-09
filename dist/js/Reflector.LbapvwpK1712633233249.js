import{av as V,bc as k,ay as R,b1 as z,b2 as c,bd as W,bf as P,aA as B,be as H,aw as I,b5 as q}from"./vendor.aZqsjRbH1712633233249.js";class w extends V{constructor(S,o={}){super(S),this.isReflector=!0,this.type="Reflector",this.camera=new k;const l=this,U=o.color!==void 0?new R(o.color):new R(8355711),_=o.textureWidth||512,F=o.textureHeight||512,T=o.clipBias||0,d=o.shader||w.ReflectorShader,j=o.multisample!==void 0?o.multisample:4,s=new z,n=new c,i=new c,M=new c,u=new W,v=new c(0,0,-1),r=new P,m=new c,b=new c,f=new P,p=new W,t=this.camera,h=new B(_,F,{samples:j,type:H}),g=new I({name:d.name!==void 0?d.name:"unspecified",uniforms:q.clone(d.uniforms),fragmentShader:d.fragmentShader,vertexShader:d.vertexShader});g.uniforms.tDiffuse.value=h.texture,g.uniforms.color.value=U,g.uniforms.textureMatrix.value=p,this.material=g,this.onBeforeRender=function(e,C,x){if(i.setFromMatrixPosition(l.matrixWorld),M.setFromMatrixPosition(x.matrixWorld),u.extractRotation(l.matrixWorld),n.set(0,0,1),n.applyMatrix4(u),m.subVectors(i,M),m.dot(n)>0)return;m.reflect(n).negate(),m.add(i),u.extractRotation(x.matrixWorld),v.set(0,0,-1),v.applyMatrix4(u),v.add(M),b.subVectors(i,v),b.reflect(n).negate(),b.add(i),t.position.copy(m),t.up.set(0,1,0),t.up.applyMatrix4(u),t.up.reflect(n),t.lookAt(b),t.far=x.far,t.updateMatrixWorld(),t.projectionMatrix.copy(x.projectionMatrix),p.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),p.multiply(t.projectionMatrix),p.multiply(t.matrixWorldInverse),p.multiply(l.matrixWorld),s.setFromNormalAndCoplanarPoint(n,i),s.applyMatrix4(t.matrixWorldInverse),r.set(s.normal.x,s.normal.y,s.normal.z,s.constant);const a=t.projectionMatrix;f.x=(Math.sign(r.x)+a.elements[8])/a.elements[0],f.y=(Math.sign(r.y)+a.elements[9])/a.elements[5],f.z=-1,f.w=(1+a.elements[10])/a.elements[14],r.multiplyScalar(2/r.dot(f)),a.elements[2]=r.x,a.elements[6]=r.y,a.elements[10]=r.z+1-T,a.elements[14]=r.w,l.visible=!1;const D=e.getRenderTarget(),O=e.xr.enabled,A=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(h),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(C,t),e.xr.enabled=O,e.shadowMap.autoUpdate=A,e.setRenderTarget(D);const y=x.viewport;y!==void 0&&e.state.viewport(y),l.visible=!0},this.getRenderTarget=function(){return h},this.dispose=function(){h.dispose(),l.material.dispose()}}}w.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:"\n		uniform mat4 textureMatrix;\n		varying vec4 vUv;\n\n		#include <common>\n		#include <logdepthbuf_pars_vertex>\n\n		void main() {\n\n			vUv = textureMatrix * vec4( position, 1.0 );\n\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n			#include <logdepthbuf_vertex>\n\n		}",fragmentShader:"\n		uniform vec3 color;\n		uniform sampler2D tDiffuse;\n		varying vec4 vUv;\n\n		#include <logdepthbuf_pars_fragment>\n\n		float blendOverlay( float base, float blend ) {\n\n			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );\n\n		}\n\n		vec3 blendOverlay( vec3 base, vec3 blend ) {\n\n			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );\n\n		}\n\n		void main() {\n\n			#include <logdepthbuf_fragment>\n\n			vec4 base = texture2DProj( tDiffuse, vUv );\n			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );\n\n			#include <tonemapping_fragment>\n			#include <colorspace_fragment>\n\n		}"};export{w as R};