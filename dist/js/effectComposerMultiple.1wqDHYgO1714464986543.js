import{aH as A,a1 as P,l as g,a6 as S,ak as U,o as R,c as w,Y as e,G as L,a9 as V,ax as B,r as H,x as Q,E as G,a as I,L as W,ac as k}from"./vendor.JeFZ2T0u1714464986543.js";import{R as Y,E as p,S as y}from"./EffectComposer.fZ7Xm77D1714464986543.js";import{U as X}from"./UnrealBloomPass.tiCDWWK_1714464986543.js";import{F as z}from"./FilmPass.Xq3brwiL1714464986543.js";import{A as $}from"./AfterimagePass.yD97o4wA1714464986543.js";import"./Pass.-mWq9otM1714464986543.js";const j={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new A(1/1024,1/512)}},vertexShader:"\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vUv = uv;\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",fragmentShader:"\n		precision highp float;\n\n		uniform sampler2D tDiffuse;\n\n		uniform vec2 resolution;\n\n		varying vec2 vUv;\n\n		// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)\n\n		//----------------------------------------------------------------------------------\n		// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag\n		// SDK Version: v3.00\n		// Email:       gameworks@nvidia.com\n		// Site:        http://developer.nvidia.com/\n		//\n		// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.\n		//\n		// Redistribution and use in source and binary forms, with or without\n		// modification, are permitted provided that the following conditions\n		// are met:\n		//  * Redistributions of source code must retain the above copyright\n		//    notice, this list of conditions and the following disclaimer.\n		//  * Redistributions in binary form must reproduce the above copyright\n		//    notice, this list of conditions and the following disclaimer in the\n		//    documentation and/or other materials provided with the distribution.\n		//  * Neither the name of NVIDIA CORPORATION nor the names of its\n		//    contributors may be used to endorse or promote products derived\n		//    from this software without specific prior written permission.\n		//\n		// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY\n		// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\n		// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\n		// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR\n		// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n		// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n		// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n		// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY\n		// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n		// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n		// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n		//\n		//----------------------------------------------------------------------------------\n\n		#ifndef FXAA_DISCARD\n			//\n			// Only valid for PC OpenGL currently.\n			// Probably will not work when FXAA_GREEN_AS_LUMA = 1.\n			//\n			// 1 = Use discard on pixels which don't need AA.\n			//     For APIs which enable concurrent TEX+ROP from same surface.\n			// 0 = Return unchanged color on pixels which don't need AA.\n			//\n			#define FXAA_DISCARD 0\n		#endif\n\n		/*--------------------------------------------------------------------------*/\n		#define FxaaTexTop(t, p) texture2D(t, p, -100.0)\n		#define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), -100.0)\n		/*--------------------------------------------------------------------------*/\n\n		#define NUM_SAMPLES 5\n\n		// assumes colors have premultipliedAlpha, so that the calculated color contrast is scaled by alpha\n		float contrast( vec4 a, vec4 b ) {\n			vec4 diff = abs( a - b );\n			return max( max( max( diff.r, diff.g ), diff.b ), diff.a );\n		}\n\n		/*============================================================================\n\n									FXAA3 QUALITY - PC\n\n		============================================================================*/\n\n		/*--------------------------------------------------------------------------*/\n		vec4 FxaaPixelShader(\n			vec2 posM,\n			sampler2D tex,\n			vec2 fxaaQualityRcpFrame,\n			float fxaaQualityEdgeThreshold,\n			float fxaaQualityinvEdgeThreshold\n		) {\n			vec4 rgbaM = FxaaTexTop(tex, posM);\n			vec4 rgbaS = FxaaTexOff(tex, posM, vec2( 0.0, 1.0), fxaaQualityRcpFrame.xy);\n			vec4 rgbaE = FxaaTexOff(tex, posM, vec2( 1.0, 0.0), fxaaQualityRcpFrame.xy);\n			vec4 rgbaN = FxaaTexOff(tex, posM, vec2( 0.0,-1.0), fxaaQualityRcpFrame.xy);\n			vec4 rgbaW = FxaaTexOff(tex, posM, vec2(-1.0, 0.0), fxaaQualityRcpFrame.xy);\n			// . S .\n			// W M E\n			// . N .\n\n			bool earlyExit = max( max( max(\n					contrast( rgbaM, rgbaN ),\n					contrast( rgbaM, rgbaS ) ),\n					contrast( rgbaM, rgbaE ) ),\n					contrast( rgbaM, rgbaW ) )\n					< fxaaQualityEdgeThreshold;\n			// . 0 .\n			// 0 0 0\n			// . 0 .\n\n			#if (FXAA_DISCARD == 1)\n				if(earlyExit) FxaaDiscard;\n			#else\n				if(earlyExit) return rgbaM;\n			#endif\n\n			float contrastN = contrast( rgbaM, rgbaN );\n			float contrastS = contrast( rgbaM, rgbaS );\n			float contrastE = contrast( rgbaM, rgbaE );\n			float contrastW = contrast( rgbaM, rgbaW );\n\n			float relativeVContrast = ( contrastN + contrastS ) - ( contrastE + contrastW );\n			relativeVContrast *= fxaaQualityinvEdgeThreshold;\n\n			bool horzSpan = relativeVContrast > 0.;\n			// . 1 .\n			// 0 0 0\n			// . 1 .\n\n			// 45 deg edge detection and corners of objects, aka V/H contrast is too similar\n			if( abs( relativeVContrast ) < .3 ) {\n				// locate the edge\n				vec2 dirToEdge;\n				dirToEdge.x = contrastE > contrastW ? 1. : -1.;\n				dirToEdge.y = contrastS > contrastN ? 1. : -1.;\n				// . 2 .      . 1 .\n				// 1 0 2  ~=  0 0 1\n				// . 1 .      . 0 .\n\n				// tap 2 pixels and see which ones are \"outside\" the edge, to\n				// determine if the edge is vertical or horizontal\n\n				vec4 rgbaAlongH = FxaaTexOff(tex, posM, vec2( dirToEdge.x, -dirToEdge.y ), fxaaQualityRcpFrame.xy);\n				float matchAlongH = contrast( rgbaM, rgbaAlongH );\n				// . 1 .\n				// 0 0 1\n				// . 0 H\n\n				vec4 rgbaAlongV = FxaaTexOff(tex, posM, vec2( -dirToEdge.x, dirToEdge.y ), fxaaQualityRcpFrame.xy);\n				float matchAlongV = contrast( rgbaM, rgbaAlongV );\n				// V 1 .\n				// 0 0 1\n				// . 0 .\n\n				relativeVContrast = matchAlongV - matchAlongH;\n				relativeVContrast *= fxaaQualityinvEdgeThreshold;\n\n				if( abs( relativeVContrast ) < .3 ) { // 45 deg edge\n					// 1 1 .\n					// 0 0 1\n					// . 0 1\n\n					// do a simple blur\n					return mix(\n						rgbaM,\n						(rgbaN + rgbaS + rgbaE + rgbaW) * .25,\n						.4\n					);\n				}\n\n				horzSpan = relativeVContrast > 0.;\n			}\n\n			if(!horzSpan) rgbaN = rgbaW;\n			if(!horzSpan) rgbaS = rgbaE;\n			// . 0 .      1\n			// 1 0 1  ->  0\n			// . 0 .      1\n\n			bool pairN = contrast( rgbaM, rgbaN ) > contrast( rgbaM, rgbaS );\n			if(!pairN) rgbaN = rgbaS;\n\n			vec2 offNP;\n			offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;\n			offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;\n\n			bool doneN = false;\n			bool doneP = false;\n\n			float nDist = 0.;\n			float pDist = 0.;\n\n			vec2 posN = posM;\n			vec2 posP = posM;\n\n			int iterationsUsed = 0;\n			int iterationsUsedN = 0;\n			int iterationsUsedP = 0;\n			for( int i = 0; i < NUM_SAMPLES; i++ ) {\n				iterationsUsed = i;\n\n				float increment = float(i + 1);\n\n				if(!doneN) {\n					nDist += increment;\n					posN = posM + offNP * nDist;\n					vec4 rgbaEndN = FxaaTexTop(tex, posN.xy);\n					doneN = contrast( rgbaEndN, rgbaM ) > contrast( rgbaEndN, rgbaN );\n					iterationsUsedN = i;\n				}\n\n				if(!doneP) {\n					pDist += increment;\n					posP = posM - offNP * pDist;\n					vec4 rgbaEndP = FxaaTexTop(tex, posP.xy);\n					doneP = contrast( rgbaEndP, rgbaM ) > contrast( rgbaEndP, rgbaN );\n					iterationsUsedP = i;\n				}\n\n				if(doneN || doneP) break;\n			}\n\n\n			if ( !doneP && !doneN ) return rgbaM; // failed to find end of edge\n\n			float dist = min(\n				doneN ? float( iterationsUsedN ) / float( NUM_SAMPLES - 1 ) : 1.,\n				doneP ? float( iterationsUsedP ) / float( NUM_SAMPLES - 1 ) : 1.\n			);\n\n			// hacky way of reduces blurriness of mostly diagonal edges\n			// but reduces AA quality\n			dist = pow(dist, .5);\n\n			dist = 1. - dist;\n\n			return mix(\n				rgbaM,\n				rgbaN,\n				dist * .5\n			);\n		}\n\n		void main() {\n			const float edgeDetectionQuality = .2;\n			const float invEdgeDetectionQuality = 1. / edgeDetectionQuality;\n\n			gl_FragColor = FxaaPixelShader(\n				vUv,\n				tDiffuse,\n				resolution,\n				edgeDetectionQuality, // [0,1] contrast needed, otherwise early discard\n				invEdgeDetectionQuality\n			);\n\n		}\n	"},q=e("TresBoxGeometry",{args:[1,1,1]},null,-1),K=e("TresMeshNormalMaterial",null,null,-1),J=[q,K],Z=e("TresBoxGeometry",{args:[1,1,1]},null,-1),ee=e("TresMeshNormalMaterial",null,null,-1),ae=[Z,ee],te=e("TresBoxGeometry",{args:[1,1,1]},null,-1),re=e("TresMeshNormalMaterial",null,null,-1),oe=[te,re],se=e("TresSphereGeometry",{args:[.8,32,16]},null,-1),ie=e("TresMeshNormalMaterial",null,null,-1),ne=[se,ie],le=P({__name:"ecLayerMultiple",setup(M){const r=g(),i=g(),m=g(),f=g();S(()=>{r.value&&r.value.layers.set(0),i.value&&i.value.layers.set(1),m.value&&m.value.layers.set(2),f.value&&f.value.layers.set(3)});const{camera:o,renderer:n,scene:N,sizes:x}=U(),T={strength:.572,radius:.51,threshold:0};let u=null,s=null;const _=(a,t,v,E,b)=>{u=new Y(a,t),s=new p(v),s.renderToScreen=!1,s.addPass(u);const h=new X(new A(E,b),T.strength,T.radius,T.threshold);s.addPass(h)};let l=null;const D=a=>{l=new p(a),l.renderToScreen=!1,l.addPass(u);const t=new z;l.addPass(t)};let c=null;const O=a=>{c=new p(a),c.renderToScreen=!1,c.addPass(u);const t=new $;c.addPass(t)};let d=null;const F=a=>{d=new p(a),d.addPass(u);const t=new B({uniforms:{baseTexture:{value:null},bloomTexture:{value:s.renderTarget2.texture},filmTexture:{value:l.renderTarget2.texture},glitchTexture:{value:c.renderTarget2.texture}},vertexShader:"\n            varying vec2 vUv;\n            void main() {\n                vUv = uv;\n                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n            }\n        ",fragmentShader:"\n            uniform sampler2D baseTexture;\n            uniform sampler2D bloomTexture;\n						uniform sampler2D filmTexture;\n						uniform sampler2D glitchTexture;\n            varying vec2 vUv;\n            void main() {\n                gl_FragColor = ( \n									vec4( 1.0 ) * texture2D( baseTexture, vUv )  + \n									vec4( 1.0 ) * texture2D( bloomTexture, vUv ) + \n									vec4( 1.0 ) * texture2D( filmTexture, vUv ) + \n									vec4( 1.0 ) * texture2D( glitchTexture, vUv ) \n								);\n            }\n        ",defines:{}}),v=new y(t,"baseTexture");v.needsSwap=!0,d.addPass(v);const{width:E,height:b}=a.getDrawingBufferSize(new A),h=new y(j);h.uniforms.resolution.value.set(1/E,1/b),d.addPass(h)};S(()=>{x.width.value&&(_(N.value,o.value,n.value,x.width.value,x.height.value),O(n.value),D(n.value),F(n.value))});const{onLoop:C}=V();return C(()=>{s&&d&&o.value&&(n.value.clear(),o.value.layers.set(1),s.render(),o.value.layers.set(2),l.render(),o.value.layers.set(3),c.render(),n.value.clearDepth(),o.value.layers.set(0),d.render(N.value,o.value))}),(a,t)=>(R(),w(L,null,[e("TresMesh",{ref_key:"normalBox",ref:r,position:[3,2,1]},J,512),e("TresMesh",{ref_key:"shineBox",ref:i,position:[0,2,-4]},ae,512),e("TresMesh",{ref_key:"filmBox",ref:m,position:[1,2,3]},oe,512),e("TresMesh",{ref_key:"glitchSphere",ref:f,position:[-3,2,0]},ne,512)],64))}}),ce=e("TresPerspectiveCamera",{position:[10,10,10]},null,-1),de=e("TresAmbientLight",{intensity:1},null,-1),fe=e("TresGridHelper",{args:[10,10]},null,-1),xe=P({__name:"effectComposerMultiple",setup(M){const r=g();return S(()=>{if(r.value){let i=r.value.context.renderer.value;i.autoClear=!1}}),(i,m)=>{const f=H("TresCanvas");return R(),Q(f,{disableRender:"","window-size":"",ref_key:"tcRef",ref:r},{default:G(()=>[ce,de,I(W(k)),fe,I(le)]),_:1},512)}}});export{xe as default};