var t=Object.defineProperty,e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,r=(e,n,i)=>n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i,a=(t,a)=>{for(var o in a||(a={}))n.call(a,o)&&r(t,o,a[o]);if(e)for(var o of e(a))i.call(a,o)&&r(t,o,a[o]);return t};import"./reflectorDiffuse.vue_vue_type_script_setup_true_lang.QLCYtmLs1725236486446.js";import"./reflectorDUDV.vue_vue_type_script_setup_true_lang.QpLupOG51725236486446.js";import"./reflectorShaderMesh.vue_vue_type_script_setup_true_lang.O0oLZ27t1725236486446.js";import{j as o,U as s,C as l,k as c,W as u,bb as p,h as f,a6 as x,V as v}from"./three.0IuNGJsA1725236486446.js";import{p as m,$ as w}from"./@tresjs.DDzpLB7Q1725236486446.js";import{u as h}from"./index.ZLp4rBxn1725236486446.js";import{F as g,C as d}from"./three-stdlib.qd5YYSA01725236486446.js";import{d as y}from"./@vue.9bHx4gg21725236486446.js";import"./whiteFloorMesh.vue_vue_type_script_setup_true_lang.SzCO2ZY31725236486446.js";import"./gridPlusCom.vue_vue_type_script_setup_true_lang.x93By2S41725236486446.js";import"./videoFloor.vue_vue_type_script_setup_true_lang.Ht6D90c31725236486446.js";const S=P;function P(t,e){const n=_();return(P=function(t,e){return n[t-=377]})(t,e)}function _(){const t=["init","1912DCfMXa","info","gger","exception","bind","error","test",'{}.constructor("return this")( )',"chain","stateObject","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","call","log","865220SHREDO","input","3438UrVPBh","15021zhCUSL","1466184qfhVNj","prototype","__proto__","28dwbmsu","979656FOqXOZ","4918575LRBihV","function *\\( *\\)","counter",'\n\n\t// Without original size argument for power of two targets\n\tvec4 packedTexture2DLOD( sampler2D tex, vec2 uv, int level ) {\n\n\t\t// the fraction of the uv space used by the target mip\n\t\tfloat targetSubview = 1.0 / pow( 2.0, float( level ) );\n\t\tfloat widthRatio = 2.0 / 3.0;\n\t\tvec2 scaledDimensions = vec2( targetSubview * widthRatio, targetSubview );\n\n\t\t// all levels > 0 are on the right third of the texture\n\t\t// y is offset from the bottom\n\t\tvec2 offset = vec2(\n\t\t\tlevel > 0 ? widthRatio : 0.0,\n\t\t\tlevel > 0 ? targetSubview : 0.0\n\t\t);\n\n\t\tvec2 samplePoint = mix( offset, offset + scaledDimensions, uv );\n\t\treturn texture2D( tex, samplePoint );\n\n\t}\n\n\tvec4 packedTexture2DLOD( sampler2D tex, vec2 uv, float level ) {\n\n\t\tfloat ratio = mod( level, 1.0 );\n\t\tint minLevel = int( floor( level ) );\n\t\tint maxLevel = int( ceil( level ) );\n\n\t\tvec4 minValue = packedTexture2DLOD( tex, uv, minLevel );\n\t\tvec4 maxValue = packedTexture2DLOD( tex, uv, maxLevel );\n\n\t\treturn mix( minValue, maxValue, ratio );\n\n\t}\n\n\t// With original size argument\n\tvec4 packedTexture2DLOD( sampler2D tex, vec2 uv, int level, vec2 originalPixelSize ) {\n\n\t\tfloat floatLevel = float( level );\n\t\tvec2 atlasSize;\n\t\tatlasSize.x = floor( originalPixelSize.x * 1.5 );\n\t\tatlasSize.y = originalPixelSize.y;\n\n\t\t// we stop making mip maps when one dimension == 1\n\t\tfloat maxLevel = min( floor( log2( originalPixelSize.x ) ), floor( log2( originalPixelSize.y ) ) );\n\t\tfloatLevel = min( floatLevel, maxLevel );\n\n\t\t// use inverse pow of 2 to simulate right bit shift operator\n\t\tvec2 currentPixelDimensions = floor( originalPixelSize / pow( 2.0, floatLevel ) );\n\t\tvec2 pixelOffset = vec2(\n\t\t\tfloatLevel > 0.0 ? originalPixelSize.x : 0.0,\n\t\t\tfloatLevel > 0.0 ? currentPixelDimensions.y : 0.0\n\t\t);\n\n\t\t// "minPixel / atlasSize" samples the top left piece of the first pixel\n\t\t// "maxPixel / atlasSize" samples the bottom right piece of the last pixel\n\t\tvec2 minPixel = pixelOffset;\n\t\tvec2 maxPixel = pixelOffset + currentPixelDimensions;\n\t\tvec2 samplePoint = mix( minPixel, maxPixel, uv );\n\t\tsamplePoint /= atlasSize;\n\n\t\tvec2 halfPixelSize = 1.0 / ( 2.0 * atlasSize );\n\t\tsamplePoint = min( samplePoint, maxPixel / atlasSize - halfPixelSize );\n\t\tsamplePoint = max( samplePoint, minPixel / atlasSize + halfPixelSize );\n\n\t\treturn texture2D( tex, samplePoint );\n\n\t}\n\n\tvec4 packedTexture2DLOD( sampler2D tex, vec2 uv, float level, vec2 originalPixelSize ) {\n\n\t\tfloat ratio = mod( level, 1.0 );\n\t\tint minLevel = int( floor( level ) );\n\t\tint maxLevel = int( ceil( level ) );\n\n\t\tvec4 minValue = packedTexture2DLOD( tex, uv, minLevel, originalPixelSize );\n\t\tvec4 maxValue = packedTexture2DLOD( tex, uv, maxLevel, originalPixelSize );\n\n\t\treturn mix( minValue, maxValue, ratio );\n\n\t}\n\n',"79872hDQVWa","warn","constructor","100dNHmTv","toString","string","table","action","while (true) {}","apply","debu","length"];return(_=function(){return t})()}!function(t,e){const n=P,i=_();for(;;)try{if(921498===parseInt(n(394))/1+-parseInt(n(381))/2+parseInt(n(383))/3*(-parseInt(n(407))/4)+parseInt(n(390))/5+parseInt(n(385))/6*(parseInt(n(388))/7)+-parseInt(n(389))/8+-parseInt(n(384))/9*(parseInt(n(397))/10))break;i.push(i.shift())}catch(r){i.push(i.shift())}}();const z=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[P(403)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();!function(){z(this,(function(){const t=P,e=new RegExp(t(391)),n=new RegExp(t(378),"i"),i=A(t(406));e[t(413)](i+t(415))&&n.test(i+t(382))?A():i("0")}))()}();const b=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[P(403)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();b(void 0,(function(){const t=P;let e;try{e=Function("return (function() "+t(414)+");")()}catch(r){e=window}const n=e.console=e.console||{},i=[t(380),t(395),t(408),t(412),t(410),t(400),"trace"];for(let a=0;a<i[t(405)];a++){const e=b[t(396)][t(386)][t(411)](b),r=i[a],o=n[r]||e;e[t(387)]=b.bind(b),e[t(398)]=o[t(398)][t(411)](o),n[r]=e}}))();const I=S(393);function A(t){function e(t){const n=P;if(typeof t===n(399))return function(t){}[n(396)](n(402))[n(403)](n(392));1!==(""+t/t)[n(405)]||t%20==0?function(){return!0}[n(396)]("debugger")[n(379)](n(401)):function(){return!1}[n(396)](n(404)+n(409)).apply(n(377)),e(++t)}try{if(t)return e;e(0)}catch(n){}}function E(t,e){const n=L();return(E=function(t,e){return n[t-=194]})(t,e)}const M=E;!function(t,e){const n=E,i=L();for(;;)try{if(519132===parseInt(n(229))/1*(parseInt(n(235))/2)+parseInt(n(226))/3*(parseInt(n(207))/4)+parseInt(n(196))/5*(-parseInt(n(234))/6)+parseInt(n(200))/7*(parseInt(n(211))/8)+parseInt(n(213))/9+parseInt(n(212))/10+parseInt(n(230))/11*(-parseInt(n(201))/12))break;i.push(i.shift())}catch(r){i.push(i.shift())}}();const D=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[E(208)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();function L(){const t=["return (function() ","\n\n\t\t#if X_IS_EVEN && Y_IS_EVEN\n\n\t\t#define SAMPLES 4\n\t\t#define WIDTH 2\n\t\t#define HEIGHT 2\n\n\t\t#elif X_IS_EVEN\n\n\t\t#define SAMPLES 6\n\t\t#define WIDTH 2\n\t\t#define HEIGHT 3\n\n\t\t#elif Y_IS_EVEN\n\n\t\t#define SAMPLES 6\n\t\t#define WIDTH 3\n\t\t#define HEIGHT 2\n\n\t\t#else\n\n\t\t#define SAMPLES 9\n\t\t#define WIDTH 3\n\t\t#define HEIGHT 3\n\n\t\t#endif\n\n\t\tvec4 sampleAt( vec2 uv ) {\n\n\t\t\treturn packedTexture2DLOD( map, uv, parentLevel, originalMapSize );\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvec2 childMapSize = parentMapSize / 2.0;\n\t\t\t// vec2 childPixelSize = 1.0 / childMapSize;\n\t\t\t// vec2 halfChildPixelSize = childPixelSize / 2.0;\n\t\t\tvec2 childPixelPos = floor( vUv * childMapSize );\n\n\t\t\tvec2 parentPixelSize = 1.0 / parentMapSize;\n\t\t\tvec2 halfParentPixelSize = parentPixelSize / 2.0;\n\t\t\tvec2 parentPixelPos = childPixelPos * 2.0;\n\n\t\t\tvec2 baseUv = ( parentPixelPos / parentMapSize ) + halfParentPixelSize;\n\n\t\t\tvec4 samples[ SAMPLES ];\n\t\t\tfloat weights[ SAMPLES ];\n\n\t\t\t#if X_IS_EVEN && Y_IS_EVEN\n\n\t\t\tsamples[ 0 ] = sampleAt( baseUv );\n\t\t\tsamples[ 1 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 0.0 ) );\n\t\t\tsamples[ 2 ] = sampleAt( baseUv + vec2( 0.0, parentPixelSize.y ) );\n\t\t\tsamples[ 3 ] = sampleAt( baseUv + vec2( parentPixelSize.x, parentPixelSize.y ) );\n\n\t\t\tweights[ 0 ] = 0.25;\n\t\t\tweights[ 1 ] = 0.25;\n\t\t\tweights[ 2 ] = 0.25;\n\t\t\tweights[ 3 ] = 0.25;\n\n\t\t\t#elif X_IS_EVEN\n\n\t\t\tfloat wx0 = 0.5;\n\t\t\tfloat wx1 = 0.5;\n\n\t\t\tfloat yden = 2.0 * parentMapSize.y + 1.0;\n\t\t\tfloat wy0 = ( parentMapSize.y - parentPixelPos.y ) / yden;\n\t\t\tfloat wy1 = ( parentMapSize.y ) / yden;\n\t\t\tfloat wy2 = ( parentPixelPos.y + 1.0 ) / yden;\n\n\t\t\tsamples[ 0 ] = sampleAt( baseUv );\n\t\t\tsamples[ 1 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 0.0 ) );\n\n\t\t\tsamples[ 2 ] = sampleAt( baseUv + vec2( 0.0, parentPixelSize.y ) );\n\t\t\tsamples[ 3 ] = sampleAt( baseUv + vec2( parentPixelSize.x, parentPixelSize.y ) );\n\n\t\t\tsamples[ 4 ] = sampleAt( baseUv + vec2( 0.0, 2.0 * parentPixelSize.y ) );\n\t\t\tsamples[ 5 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 2.0 * parentPixelSize.y ) );\n\n\t\t\tweights[ 0 ] = wx0 * wy0;\n\t\t\tweights[ 1 ] = wx1 * wy0;\n\n\t\t\tweights[ 2 ] = wx0 * wy1;\n\t\t\tweights[ 3 ] = wx1 * wy1;\n\n\t\t\tweights[ 4 ] = wx0 * wy2;\n\t\t\tweights[ 5 ] = wx1 * wy2;\n\n\t\t\t#elif Y_IS_EVEN\n\n\t\t\tfloat xden = 2.0 * parentMapSize.x + 1.0;\n\t\t\tfloat wx0 = ( parentMapSize.x - parentPixelPos.x ) / xden;\n\t\t\tfloat wx1 = ( parentMapSize.x ) / xden;\n\t\t\tfloat wx2 = ( parentPixelPos.x + 1.0 ) / xden;\n\n\t\t\tfloat wy0 = 0.5;\n\t\t\tfloat wy1 = 0.5;\n\n\t\t\tsamples[ 0 ] = sampleAt( baseUv );\n\t\t\tsamples[ 1 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 0.0 ) );\n\t\t\tsamples[ 2 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, 0.0 ) );\n\n\t\t\tsamples[ 3 ] = sampleAt( baseUv + vec2( 0.0, parentPixelSize.y ) );\n\t\t\tsamples[ 4 ] = sampleAt( baseUv + vec2( parentPixelSize.x, parentPixelSize.y ) );\n\t\t\tsamples[ 5 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, parentPixelSize.y ) );\n\n\t\t\tweights[ 0 ] = wx0 * wy0;\n\t\t\tweights[ 1 ] = wx1 * wy0;\n\t\t\tweights[ 2 ] = wx2 * wy0;\n\n\t\t\tweights[ 3 ] = wx0 * wy1;\n\t\t\tweights[ 4 ] = wx1 * wy1;\n\t\t\tweights[ 5 ] = wx2 * wy1;\n\n\t\t\t#else\n\n\t\t\tfloat xden = 2.0 * parentMapSize.x + 1.0;\n\t\t\tfloat wx0 = ( parentMapSize.x - parentPixelPos.x ) / xden;\n\t\t\tfloat wx1 = ( parentMapSize.x ) / xden;\n\t\t\tfloat wx2 = ( parentPixelPos.x + 1.0 ) / xden;\n\n\t\t\tfloat yden = 2.0 * parentMapSize.y + 1.0;\n\t\t\tfloat wy0 = ( parentMapSize.y - parentPixelPos.y ) / yden;\n\t\t\tfloat wy1 = ( parentMapSize.y ) / yden;\n\t\t\tfloat wy2 = ( parentPixelPos.y + 1.0 ) / yden;\n\n\t\t\tsamples[ 0 ] = sampleAt( baseUv );\n\t\t\tsamples[ 1 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 0.0 ) );\n\t\t\tsamples[ 2 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, 0.0 ) );\n\n\t\t\tsamples[ 3 ] = sampleAt( baseUv + vec2( 0.0, parentPixelSize.y ) );\n\t\t\tsamples[ 4 ] = sampleAt( baseUv + vec2( parentPixelSize.x, parentPixelSize.y ) );\n\t\t\tsamples[ 5 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, parentPixelSize.y ) );\n\n\t\t\tsamples[ 6 ] = sampleAt( baseUv + vec2( 0.0, 2.0 * parentPixelSize.y ) );\n\t\t\tsamples[ 7 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 2.0 * parentPixelSize.y ) );\n\t\t\tsamples[ 8 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, 2.0 * parentPixelSize.y ) );\n\n\t\t\tweights[ 0 ] = wx0 * wy0;\n\t\t\tweights[ 1 ] = wx1 * wy0;\n\t\t\tweights[ 2 ] = wx2 * wy0;\n\n\t\t\tweights[ 3 ] = wx0 * wy1;\n\t\t\tweights[ 4 ] = wx1 * wy1;\n\t\t\tweights[ 5 ] = wx2 * wy1;\n\n\t\t\tweights[ 6 ] = wx0 * wy2;\n\t\t\tweights[ 7 ] = wx1 * wy2;\n\t\t\tweights[ 8 ] = wx2 * wy2;\n\n\t\t\t#endif\n\n\t\t\t<mipmap_logic>\n\n\t\t}\n\t","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","uniforms","warn","input","1573326LzBaYj","log","function *\\( *\\)","2538AvFCff","11wvwkoS","prototype",'{}.constructor("return this")( )',"\n\t\tvarying vec2 vUv;\n\t\tvoid main() {\n\n\t\t\t#include <begin_vertex>\n\t\t\t#include <project_vertex>\n\t\t\tvUv = uv;\n\n\t\t}\n\t","726kEMnUZ","714vLFjtg","length","info","test","995YEusEZ","clone","\n\t\tvarying vec2 vUv;\n\t\tuniform sampler2D map;\n\t\tuniform int parentLevel;\n\t\tuniform vec2 parentMapSize;\n\t\tuniform vec2 originalMapSize;\n\n\t\t","gger","79051pgajAB","25886304YTQIPc","__proto__","counter","console","init","constructor","4DQvcaD","apply","exception","defines","280LyBriN","7955000lUvUOy","712260wnhZIT","error","trace","chain","call","table","debu"];return(L=function(){return t})()}!function(){D(this,(function(){const t=E,e=new RegExp(t(228)),n=new RegExp(t(222),"i"),i=T(t(205));e[t(195)](i+t(216))&&n.test(i+t(225))?T():i("0")}))()}();const U=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[E(208)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();function j(t){const e=E,n=a({},t);return e(210)in t&&(n[e(210)]=a({},t.defines)),e(223)in t&&(n.uniforms=s[e(197)](t[e(223)])),n}U(void 0,(function(){const t=E;let e;try{e=Function(t(220)+t(232)+");")()}catch(r){e=window}const n=e[t(204)]=e[t(204)]||{},i=[t(227),t(224),t(194),t(214),t(209),t(218),t(215)];for(let a=0;a<i[t(236)];a++){const e=U[t(206)][t(231)].bind(U),r=i[a],o=n[r]||e;e[t(202)]=U.bind(U),e.toString=o.toString.bind(o),n[r]=e}}))();const O={defines:{X_IS_EVEN:1,Y_IS_EVEN:1},uniforms:{map:{value:null},originalMapSize:{value:new o},parentMapSize:{value:new o},parentLevel:{value:0}},vertexShader:M(233),fragmentShader:M(198)+I+M(221)};function T(t){function e(t){const n=E;if("string"==typeof t)return function(t){}[n(206)]("while (true) {}")[n(208)](n(203));1!==(""+t/t)[n(236)]||t%20==0?function(){return!0}[n(206)](n(219)+n(199))[n(217)]("action"):function(){return!1}[n(206)](n(219)+n(199))[n(208)]("stateObject"),e(++t)}try{if(t)return e;e(0)}catch(n){}}const V=k;!function(t,e){const n=k,i=W();for(;;)try{if(840695===-parseInt(n(326))/1+parseInt(n(317))/2+-parseInt(n(309))/3+-parseInt(n(351))/4+parseInt(n(342))/5*(parseInt(n(368))/6)+-parseInt(n(301))/7*(parseInt(n(354))/8)+parseInt(n(310))/9)break;i.push(i.shift())}catch(r){i.push(i.shift())}}();const R=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n.apply(e,arguments);return n=null,t}}:function(){};return t=!1,i}}();!function(){R(this,(function(){const t=k,e=new RegExp(t(337)),n=new RegExp(t(313),"i"),i=F(t(350));e[t(304)](i+t(373))&&n[t(304)](i+"input")?F():i("0")}))()}();const C=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[k(347)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();function k(t,e){const n=W();return(k=function(t,e){return n[t-=301]})(t,e)}C(void 0,(function(){const t=k,e=function(){const t=k;let e;try{e=Function("return (function() "+t(316)+");")()}catch(n){e=window}return e}(),n=e[t(358)]=e[t(358)]||{},i=["log",t(333),t(332),t(325),t(307),t(366),t(335)];for(let r=0;r<i.length;r++){const e=C[t(371)][t(374)][t(369)](C),a=i[r],o=n[a]||e;e[t(343)]=C[t(369)](C),e[t(303)]=o[t(303)][t(369)](o),n[a]=e}}))();const Z=new l;class N{constructor(t){const e=k;!t&&(t=e(320));const n=j(O);n[e(312)]=n[e(312)].replace(/<mipmap_logic>/g,t);const i=new Array(4);i[0]=new c(j(n)),i[0][e(364)][e(321)]=0,i[0][e(364)][e(348)]=0,i[1]=new c(j(n)),i[1].defines[e(321)]=1,i[1][e(364)][e(348)]=0,i[2]=new c(j(n)),i[2].defines[e(321)]=0,i[2][e(364)][e(348)]=1,i[3]=new c(j(n)),i[3].defines.X_IS_EVEN=1,i[3][e(364)][e(348)]=1;const r=new u;r.texture.minFilter=p,r.texture.magFilter=p,this[e(330)]=r,this[e(341)]=new g(new c(d)),this[e(331)]=new g(null),this[e(370)]=i}[V(361)](t,e,n,i=!1){const r=V;t[r(302)]&&(t=t[r(365)]);const o=n.autoClear,s=n[r(308)](),l=n[r(338)]();n[r(322)](Z);const c=this._copyQuad,u=this[r(331)],p=this._swapTarget,x=this[r(370)];let v,m;i?(v=f[r(356)](t[r(346)][r(352)]),m=f.floorPowerOfTwo(t.image[r(360)])):(v=Math[r(324)](t[r(346)][r(352)]),m=Math[r(324)](t[r(346)][r(360)]));const w=Math[r(324)](1.5*v),h=Math[r(324)](m);e[r(345)](w,h),p[r(365)][r(319)]!==e.texture[r(319)]?(p[r(306)](),p.copy(e),p[r(365)][r(346)]=a({},p[r(365)][r(346)])):p.setSize(w,h),n[r(359)]=!1,n[r(363)](0),n.setClearAlpha(),c[r(344)][r(355)][r(329)][r(328)]=t,c[r(362)][r(323)](v,m,0,0,w,h),n[r(315)](e),n[r(349)](),c[r(336)](n),n.setRenderTarget(p),n[r(349)](),c[r(336)](n);let g=v,d=m,y=0;for(;g>1&&d>1;){const t=x[(g%2==0?1:0)|(d%2==0?2:0)];t[r(355)][r(305)][r(328)]=p[r(365)],t[r(355)].parentLevel.value=y,t.uniforms[r(314)][r(328)][r(353)](g,d),t[r(355)][r(340)].value[r(353)](v,m),u[r(344)]=t,g=Math[r(324)](g/2),d=Math[r(324)](d/2);const i=h-2*d;n[r(315)](e),u.camera.setViewOffset(g,d,-v,-i,w,h),u[r(336)](n),n.setRenderTarget(p),t.uniforms[r(305)][r(328)]=e.texture,u[r(336)](n),y++}return n[r(315)](l),n[r(311)](s),n.setClearColor(Z),n[r(359)]=o,y+1}[V(306)](){const t=V;this[t(330)][t(306)](),this._mipQuad[t(306)](),this[t(341)][t(306)](),this[t(370)].forEach((e=>e[t(306)]()))}}function W(){const t=["\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","parentMapSize","setRenderTarget",'{}.constructor("return this")( )',"2461622dVXPZa","gger","type","\n\n\t\t\t\t#pragma unroll_loop\n\t\t\t\tfor ( int i = 0; i < SAMPLES; i ++ ) {\n\n\t\t\t\t\tgl_FragColor += samples[ i ] * weights[ i ];\n\n\t\t\t\t}\n\n\t\t\t","X_IS_EVEN","getClearColor","setViewOffset","floor","error","102206AvRxvj","action","value","tDiffuse","_swapTarget","_mipQuad","info","warn","string","trace","render","function *\\( *\\)","getRenderTarget","counter","originalMapSize","_copyQuad","2264620FxylwU","__proto__","material","setSize","image","apply","Y_IS_EVEN","clear","init","2590848Uflmbe","width","set","1081800AZcbdt","uniforms","floorPowerOfTwo","debu","console","autoClear","height","update","camera","setClearColor","defines","texture","table","length","12jtchTu","bind","_mipMaterials","constructor","stateObject","chain","prototype","28TYwxUg","isWebGLRenderTarget","toString","test","map","dispose","exception","getClearAlpha","1832865iqoPtp","5452281yTYwRx","setClearAlpha","fragmentShader"];return(W=function(){return t})()}function F(t){function e(t){const n=k;if(typeof t===n(334))return function(t){}[n(371)]("while (true) {}")[n(347)](n(339));1!==(""+t/t)[n(367)]||t%20==0?function(){return!0}.constructor(n(357)+n(318)).call(n(327)):function(){return!1}[n(371)](n(357)+n(318))[n(347)](n(372)),e(++t)}try{if(t)return e;e(0)}catch(n){}}const H=X;!function(t,e){const n=X,i=G();for(;;)try{if(258740===-parseInt(n(394))/1*(-parseInt(n(411))/2)+parseInt(n(408))/3*(parseInt(n(445))/4)+-parseInt(n(406))/5*(parseInt(n(401))/6)+-parseInt(n(399))/7+parseInt(n(423))/8+parseInt(n(389))/9*(parseInt(n(379))/10)+parseInt(n(397))/11*(parseInt(n(384))/12))break;i.push(i.shift())}catch(r){i.push(i.shift())}}();const Q=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[X(367)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();!function(){Q(this,(function(){const t=X,e=new RegExp(t(380)),n=new RegExp(t(395),"i"),i=$("init");e[t(382)](i+t(403))&&n[t(382)](i+"input")?$():i("0")}))()}();const Y=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n.apply(e,arguments);return n=null,t}}:function(){};return t=!1,i}}();function X(t,e){const n=G();return(X=function(t,e){return n[t-=365]})(t,e)}Y(void 0,(function(){const t=X;let e;try{e=Function("return (function() "+t(442)+");")()}catch(r){e=window}const n=e.console=e[t(409)]||{},i=["log",t(441),t(368),t(375),t(432),t(426),t(392)];for(let a=0;a<i[t(402)];a++){const e=Y.constructor[t(376)][t(396)](Y),r=i[a],o=n[r]||e;e.__proto__=Y.bind(Y),e[t(391)]=o.toString[t(396)](o),n[r]=e}}))();const B=y({__name:H(390),props:{parent:{},resolution:{default:512},ignoreObjects:{default:[]}},setup(t,{expose:e}){const n=H,i=t,r=new(x[n(400)]),a=new(x[n(398)]),o=new(x[n(437)]),s=new N,l=h({width:i.resolution,height:i.resolution,settings:{type:x[n(386)]}}),c=h({width:i[n(430)],height:i[n(430)],settings:{type:x[n(386)]}}),{camera:u,renderer:p,scene:f}=m(),{onBeforeLoop:g}=w();return g((()=>{const t=n;(()=>{const t=n;if(!u[t(383)])return;r[t(443)](new v(0,1,0),0),r[t(371)](i[t(422)][t(421)]),o[t(407)](u[t(383)]);const e=new(x[t(440)])(0,0,1)[t(381)]()[t(374)](),s=u[t(383)][t(373)](new(x[t(440)]));e[t(428)](r[t(372)]);const c=new(x[t(440)]);r[t(365)](s,c);const m=c[t(381)]();m[t(438)](s),m[t(434)](c),o[t(369)].copy(m);const w=new(x[t(440)])(0,0,-1);w.applyQuaternion(u.value[t(444)](new(x[t(425)]))),w.add(s);const h=new(x[t(440)]);i[t(422)][t(373)](h),h[t(438)](w),h[t(428)](r[t(372)])[t(374)](),h[t(434)](i[t(422)][t(373)](new(x[t(440)]))),o.up[t(443)](0,1,0),o[t(385)](u[t(383)].getWorldQuaternion(new(x[t(425)]))),o.up[t(428)](r[t(372)]),o[t(377)](h),o[t(433)]();const g=new(x[t(398)]);g[t(443)](.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),g[t(427)](o[t(370)]),g.multiply(o[t(436)]),a[t(407)](g),r[t(371)](o.matrixWorldInverse);const d=new(x[t(415)])(r.normal.x,r.normal.y,r[t(372)].z,r[t(387)]),y=o[t(370)],S=new(x[t(415)]);S.x=(Math[t(417)](d.x)+y[t(420)][8])/y.elements[0],S.y=(Math[t(417)](d.y)+y[t(420)][9])/y.elements[5],S.z=-1,S.w=(1+y[t(420)][10])/y.elements[14],d.multiplyScalar(2/d.dot(S)),y.elements[2]=d.x,y[t(420)][6]=d.y,y[t(420)][10]=d.z+1,y.elements[14]=d.w;const P=p[t(383)].getRenderTarget();p[t(383)][t(429)](l[t(383)]),p[t(383)][t(439)][t(393)][t(416)][t(388)](!0),!1===p[t(383)][t(366)]&&p[t(383)][t(413)](),i[t(378)].forEach((e=>e[t(419)]=!1)),p[t(383)][t(418)](f[t(383)],o),i[t(378)][t(410)]((t=>t.visible=!0)),p[t(383)][t(429)](P)})(),l[t(383)]&&c[t(383)]&&p[t(383)]&&s.update(l[t(383)][t(414)],c.value,p[t(383)])})),e({matrix:a,renderTarget:c}),(t,e)=>null}});function $(t){function e(t){const n=X;if(typeof t===n(435))return function(t){}[n(405)](n(431))[n(367)]("counter");1!==(""+t/t)[n(402)]||t%20==0?function(){return!0}[n(405)](n(424)+"gger")[n(412)](n(404)):function(){return!1}.constructor(n(424)+"gger")[n(367)]("stateObject"),e(++t)}try{if(t)return e;e(0)}catch(n){}}function G(){const t=["setRenderTarget","resolution","while (true) {}","exception","updateMatrixWorld","add","string","matrixWorldInverse","PerspectiveCamera","sub","state","Vector3","warn",'{}.constructor("return this")( )',"set","getWorldQuaternion","61604nnLGEc","projectPoint","autoClear","apply","info","position","projectionMatrix","applyMatrix4","normal","getWorldPosition","negate","error","prototype","lookAt","ignoreObjects","74510VkbxcR","function *\\( *\\)","clone","test","value","2866296XHXJrh","applyQuaternion","UnsignedByteType","constant","setMask","45nyQjDs","reflectorMipMap","toString","trace","buffers","1roVmIH","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","bind","11BeyKfo","Matrix4","3377864rODRFh","Plane","2502WClRFK","length","chain","action","constructor","1655BbDceV","copy","21KfYtOs","console","forEach","44606Msbfjn","call","clear","texture","Vector4","depth","sign","render","visible","elements","matrixWorld","parent","3784768trNmUY","debu","Quaternion","table","multiply","reflect"];return(G=function(){return t})()}!function(t,e){for(var n=J,i=tt();;)try{if(894361===parseInt(n(491))/1*(parseInt(n(465))/2)+-parseInt(n(494))/3+parseInt(n(468))/4+parseInt(n(490))/5*(parseInt(n(472))/6)+parseInt(n(470))/7*(-parseInt(n(464))/8)+parseInt(n(478))/9*(parseInt(n(487))/10)+-parseInt(n(482))/11)break;i.push(i.shift())}catch(r){i.push(i.shift())}}();var K=function(){var t=!0;return function(e,n){var i=t?function(){if(n){var t=n[J(480)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();!function(){K(this,(function(){var t=J,e=new RegExp(t(473)),n=new RegExp(t(479),"i"),i=et(t(493));e[t(476)](i+t(486))&&n[t(476)](i+t(496))?et():i("0")}))()}();var q=function(){var t=!0;return function(e,n){var i=t?function(){if(n){var t=n[J(480)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();function J(t,e){var n=tt();return(J=function(t,e){return n[t-=464]})(t,e)}function tt(){var t=["gger","46608ieAAGA","1248568RlbaCS","action","while (true) {}","2794356bmQcrH","length","210feOPtk","console","2214IWwfSX","function *\\( *\\)","constructor","error","test","__proto__","875115oZUZGz","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","apply",'{}.constructor("return this")( )',"10169621CTzKpG","debu","string","table","chain","40nARauo","log","return (function() ","8445YOUIwG","2gjBhzy","info","init","2897058ycNRBP","exception","input","toString","bind"];return(tt=function(){return t})()}function et(t){function e(t){var n=J;if(typeof t===n(484))return function(t){}[n(474)](n(467))[n(480)]("counter");1!==(""+t/t)[n(469)]||t%20==0?function(){return!0}[n(474)](n(483)+"gger").call(n(466)):function(){return!1}[n(474)](n(483)+n(499)).apply("stateObject"),e(++t)}try{if(t)return e;e(0)}catch(n){}}q(void 0,(function(){for(var t=J,e=function(){var t,e=J;try{t=Function(e(489)+e(481)+");")()}catch(n){t=window}return t}(),n=e[t(471)]=e[t(471)]||{},i=[t(488),"warn",t(492),t(475),t(495),t(485),"trace"],r=0;r<i[t(469)];r++){var a=q.constructor.prototype[t(498)](q),o=i[r],s=n[o]||a;a[t(477)]=q[t(498)](q),a.toString=s[t(497)].bind(s),n[o]=a}}))();export{B as _};
