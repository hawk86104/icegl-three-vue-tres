import{a as t,o as e}from"./evtd.DtfwxtIl1718612273914.js";import{b as o,d as n,D as r,C as l,a as s}from"./seemly.SjiSeX2v1718612273914.js";import{v as i,F as a,C as c,d as u,B as d,p as f,i as h,b as p,M as m,N as v,_ as g,a as b,Q as y,R as w,q as x,w as S,t as T,G as M,S as R,ac as z,m as E}from"./@vue.CpOXM7bB1718612273914.js";import{u as B}from"./@css-render.PllZa35U1718612273914.js";import{d as F,u as A,o as I,i as L}from"./vooks.u0APJ0L71718612273914.js";import{z as W}from"./vdirs.VUfY7-v01718612273914.js";import{R as k}from"./@juggle.7yjBMqoW1718612273914.js";import{C as N}from"./css-render.fzUsYwTJ1718612273914.js";function C(t,e,o="default"){const n=e[o];if(void 0===n)throw new Error("[vueuc/".concat(t,"]: slot[").concat(o,"] is empty."));return n()}function X(t,e=!0,o=[]){return t.forEach((t=>{if(null!==t)if("object"==typeof t)if(Array.isArray(t))X(t,e,o);else if(t.type===a){if(null===t.children)return;Array.isArray(t.children)&&X(t.children,e,o)}else t.type!==c&&o.push(t);else"string"!=typeof t&&"number"!=typeof t||o.push(i(String(t)))})),o}function Y(t,e,o="default"){const n=e[o];if(void 0===n)throw new Error("[vueuc/".concat(t,"]: slot[").concat(o,"] is empty."));const r=X(n());if(1===r.length)return r[0];throw new Error("[vueuc/".concat(t,"]: slot[").concat(o,"] should have exactly one child."))}let H=null;function j(){if(null===H&&(H=document.getElementById("v-binder-view-measurer"),null===H)){H=document.createElement("div"),H.id="v-binder-view-measurer";const{style:t}=H;t.position="fixed",t.left="0",t.right="0",t.top="0",t.bottom="0",t.pointerEvents="none",t.visibility="hidden",document.body.appendChild(H)}return H.getBoundingClientRect()}function $(t){const e=t.getBoundingClientRect(),o=j();return{left:e.left-o.left,top:e.top-o.top,bottom:o.height+o.top-e.bottom,right:o.width+o.left-e.right,width:e.width,height:e.height}}function O(t){if(null===t)return null;const e=function(t){return 9===t.nodeType?null:t.parentNode}(t);if(null===e)return null;if(9===e.nodeType)return document;if(1===e.nodeType){const{overflow:t,overflowX:o,overflowY:n}=getComputedStyle(e);if(/(auto|scroll|overlay)/.test(t+n+o))return e}return O(e)}const P=u({name:"Binder",props:{syncTargetWithParent:Boolean,syncTarget:{type:Boolean,default:!0}},setup(n){var r;d("VBinder",null===(r=f())||void 0===r?void 0:r.proxy);const l=h("VBinder",null),s=p(null);let i=[];const a=()=>{for(const e of i)t("scroll",e,u,!0);i=[]},c=new Set,u=()=>{o(v)},v=()=>{c.forEach((t=>t()))},g=new Set,b=()=>{g.forEach((t=>t()))};return m((()=>{t("resize",window,b),a()})),{targetRef:s,setTargetRef:t=>{s.value=t,l&&n.syncTargetWithParent&&l.setTargetRef(t)},addScrollListener:t=>{0===c.size&&(()=>{let t=s.value;for(;t=O(t),null!==t;)i.push(t);for(const o of i)e("scroll",o,u,!0)})(),c.has(t)||c.add(t)},removeScrollListener:t=>{c.has(t)&&c.delete(t),0===c.size&&a()},addResizeListener:t=>{0===g.size&&e("resize",window,b),g.has(t)||g.add(t)},removeResizeListener:e=>{g.has(e)&&g.delete(e),0===g.size&&t("resize",window,b)}}},render(){return C("binder",this.$slots)}}),D=u({name:"Target",setup(){const{setTargetRef:t,syncTarget:e}=h("VBinder");return{syncTarget:e,setTargetDirective:{mounted:t,updated:t}}},render(){const{syncTarget:t,setTargetDirective:e}=this;return t?v(Y("follower",this.$slots),[[e]]):Y("follower",this.$slots)}});function V(t,e){console.error("[vueuc/".concat(t,"]: ").concat(e))}const{c:U}=N(),q="vueuc-style";function _(t){return t&-t}class G{constructor(t,e){this.l=t,this.min=e;const o=new Array(t+1);for(let n=0;n<t+1;++n)o[n]=0;this.ft=o}add(t,e){if(0===e)return;const{l:o,ft:n}=this;for(t+=1;t<=o;)n[t]+=e,t+=_(t)}get(t){return this.sum(t+1)-this.sum(t)}sum(t){if(void 0===t&&(t=this.l),t<=0)return 0;const{ft:e,min:o,l:n}=this;if(t>n)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let r=t*o;for(;t>0;)r+=e[t],t-=_(t);return r}getBound(t){let e=0,o=this.l;for(;o>e;){const n=Math.floor((e+o)/2),r=this.sum(n);if(r>t)o=n;else{if(!(r<t))return n;if(e===n)return this.sum(e+1)<=t?e+1:n;e=n}}return e}}function K(t){return"string"==typeof t?document.querySelector(t):t()}const Q=u({name:"LazyTeleport",props:{to:{type:[String,Object],default:void 0},disabled:Boolean,show:{type:Boolean,required:!0}},setup:t=>({showTeleport:F(g(t,"show")),mergedTo:b((()=>{const{to:e}=t;return null!=e?e:"body"}))}),render(){return this.showTeleport?this.disabled?C("lazy-teleport",this.$slots):y(w,{disabled:this.disabled,to:this.mergedTo},C("lazy-teleport",this.$slots)):null}}),J={top:"bottom",bottom:"top",left:"right",right:"left"},Z={start:"end",center:"center",end:"start"},tt={top:"height",bottom:"height",left:"width",right:"width"},et={"bottom-start":"top left",bottom:"top center","bottom-end":"top right","top-start":"bottom left",top:"bottom center","top-end":"bottom right","right-start":"top left",right:"center left","right-end":"bottom left","left-start":"top right",left:"center right","left-end":"bottom right"},ot={"bottom-start":"bottom left",bottom:"bottom center","bottom-end":"bottom right","top-start":"top left",top:"top center","top-end":"top right","right-start":"top right",right:"center right","right-end":"bottom right","left-start":"top left",left:"center left","left-end":"bottom left"},nt={"bottom-start":"right","bottom-end":"left","top-start":"right","top-end":"left","right-start":"bottom","right-end":"top","left-start":"bottom","left-end":"top"},rt={top:!0,bottom:!1,left:!0,right:!1},lt={top:"end",bottom:"start",left:"end",right:"start"};const st=U([U(".v-binder-follower-container",{position:"absolute",left:"0",right:"0",top:"0",height:"0",pointerEvents:"none",zIndex:"auto"}),U(".v-binder-follower-content",{position:"absolute",zIndex:"auto"},[U("> *",{pointerEvents:"all"})])]),it=u({name:"Follower",inheritAttrs:!1,props:{show:Boolean,enabled:{type:Boolean,default:void 0},placement:{type:String,default:"bottom"},syncTrigger:{type:Array,default:["resize","scroll"]},to:[String,Object],flip:{type:Boolean,default:!0},internalShift:Boolean,x:Number,y:Number,width:String,minWidth:String,containerClass:String,teleportDisabled:Boolean,zindexable:{type:Boolean,default:!0},zIndex:Number,overlap:Boolean},setup(t){const e=h("VBinder"),o=A((()=>void 0!==t.enabled?t.enabled:t.show)),n=p(null),r=p(null),l=()=>{const{syncTrigger:o}=t;o.includes("scroll")&&e.addScrollListener(a),o.includes("resize")&&e.addResizeListener(a)},s=()=>{e.removeScrollListener(a),e.removeResizeListener(a)};x((()=>{o.value&&(a(),l())}));const i=B();st.mount({id:"vueuc/binder",head:!0,anchorMetaName:q,ssr:i}),m((()=>{s()})),I((()=>{o.value&&a()}));const a=()=>{if(!o.value)return;const l=n.value;if(null===l)return;const s=e.targetRef,{x:i,y:a,overlap:c}=t,u=void 0!==i&&void 0!==a?function(t,e){const o=j();return{top:e,left:t,height:0,width:0,right:o.width-t,bottom:o.height-e}}(i,a):$(s);l.style.setProperty("--v-target-width","".concat(Math.round(u.width),"px")),l.style.setProperty("--v-target-height","".concat(Math.round(u.height),"px"));const{width:d,minWidth:f,placement:h,internalShift:p,flip:m}=t;l.setAttribute("v-placement",h),c?l.setAttribute("v-overlap",""):l.removeAttribute("v-overlap");const{style:v}=l;v.width="target"===d?"".concat(u.width,"px"):void 0!==d?d:"",v.minWidth="target"===f?"".concat(u.width,"px"):void 0!==f?f:"";const g=$(l),b=$(r.value),{left:y,top:w,placement:x}=function(t,e,o,n,r,l){if(!r||l)return{placement:t,top:0,left:0};const[s,i]=t.split("-");let a=null!=i?i:"center",c={top:0,left:0};const u=(t,r,l)=>{let s=0,i=0;const a=o[t]-e[r]-e[t];return a>0&&n&&(l?i=rt[r]?a:-a:s=rt[r]?a:-a),{left:s,top:i}},d="left"===s||"right"===s;if("center"!==a){const n=nt[t],r=J[n],l=tt[n];if(o[l]>e[l]){if(e[n]+e[l]<o[l]){const t=(o[l]-e[l])/2;e[n]<t||e[r]<t?e[n]<e[r]?(a=Z[i],c=u(l,r,d)):c=u(l,n,d):a="center"}}else o[l]<e[l]&&e[r]<0&&e[n]>e[r]&&(a=Z[i])}else{const t="bottom"===s||"top"===s?"left":"top",n=J[t],r=tt[t],l=(o[r]-e[r])/2;(e[t]<l||e[n]<l)&&(e[t]>e[n]?(a=lt[t],c=u(r,t,d)):(a=lt[n],c=u(r,n,d)))}let f=s;return e[s]<o[tt[s]]&&e[s]<e[J[s]]&&(f=J[s]),{placement:"center"!==a?"".concat(f,"-").concat(a):f,left:c.left,top:c.top}}(h,u,g,p,m,c),S=function(t,e){return e?ot[t]:et[t]}(x,c),{left:T,top:M,transform:R}=function(t,e,o,n,r,l){if(l)switch(t){case"bottom-start":case"left-end":return{top:"".concat(Math.round(o.top-e.top+o.height),"px"),left:"".concat(Math.round(o.left-e.left),"px"),transform:"translateY(-100%)"};case"bottom-end":case"right-end":return{top:"".concat(Math.round(o.top-e.top+o.height),"px"),left:"".concat(Math.round(o.left-e.left+o.width),"px"),transform:"translateX(-100%) translateY(-100%)"};case"top-start":case"left-start":return{top:"".concat(Math.round(o.top-e.top),"px"),left:"".concat(Math.round(o.left-e.left),"px"),transform:""};case"top-end":case"right-start":return{top:"".concat(Math.round(o.top-e.top),"px"),left:"".concat(Math.round(o.left-e.left+o.width),"px"),transform:"translateX(-100%)"};case"top":return{top:"".concat(Math.round(o.top-e.top),"px"),left:"".concat(Math.round(o.left-e.left+o.width/2),"px"),transform:"translateX(-50%)"};case"right":return{top:"".concat(Math.round(o.top-e.top+o.height/2),"px"),left:"".concat(Math.round(o.left-e.left+o.width),"px"),transform:"translateX(-100%) translateY(-50%)"};case"left":return{top:"".concat(Math.round(o.top-e.top+o.height/2),"px"),left:"".concat(Math.round(o.left-e.left),"px"),transform:"translateY(-50%)"};default:return{top:"".concat(Math.round(o.top-e.top+o.height),"px"),left:"".concat(Math.round(o.left-e.left+o.width/2),"px"),transform:"translateX(-50%) translateY(-100%)"}}switch(t){case"bottom-start":return{top:"".concat(Math.round(o.top-e.top+o.height+n),"px"),left:"".concat(Math.round(o.left-e.left+r),"px"),transform:""};case"bottom-end":return{top:"".concat(Math.round(o.top-e.top+o.height+n),"px"),left:"".concat(Math.round(o.left-e.left+o.width+r),"px"),transform:"translateX(-100%)"};case"top-start":return{top:"".concat(Math.round(o.top-e.top+n),"px"),left:"".concat(Math.round(o.left-e.left+r),"px"),transform:"translateY(-100%)"};case"top-end":return{top:"".concat(Math.round(o.top-e.top+n),"px"),left:"".concat(Math.round(o.left-e.left+o.width+r),"px"),transform:"translateX(-100%) translateY(-100%)"};case"right-start":return{top:"".concat(Math.round(o.top-e.top+n),"px"),left:"".concat(Math.round(o.left-e.left+o.width+r),"px"),transform:""};case"right-end":return{top:"".concat(Math.round(o.top-e.top+o.height+n),"px"),left:"".concat(Math.round(o.left-e.left+o.width+r),"px"),transform:"translateY(-100%)"};case"left-start":return{top:"".concat(Math.round(o.top-e.top+n),"px"),left:"".concat(Math.round(o.left-e.left+r),"px"),transform:"translateX(-100%)"};case"left-end":return{top:"".concat(Math.round(o.top-e.top+o.height+n),"px"),left:"".concat(Math.round(o.left-e.left+r),"px"),transform:"translateX(-100%) translateY(-100%)"};case"top":return{top:"".concat(Math.round(o.top-e.top+n),"px"),left:"".concat(Math.round(o.left-e.left+o.width/2+r),"px"),transform:"translateY(-100%) translateX(-50%)"};case"right":return{top:"".concat(Math.round(o.top-e.top+o.height/2+n),"px"),left:"".concat(Math.round(o.left-e.left+o.width+r),"px"),transform:"translateY(-50%)"};case"left":return{top:"".concat(Math.round(o.top-e.top+o.height/2+n),"px"),left:"".concat(Math.round(o.left-e.left+r),"px"),transform:"translateY(-50%) translateX(-100%)"};default:return{top:"".concat(Math.round(o.top-e.top+o.height+n),"px"),left:"".concat(Math.round(o.left-e.left+o.width/2+r),"px"),transform:"translateX(-50%)"}}}(x,b,u,w,y,c);l.setAttribute("v-placement",x),l.style.setProperty("--v-offset-left","".concat(Math.round(y),"px")),l.style.setProperty("--v-offset-top","".concat(Math.round(w),"px")),l.style.transform="translateX(".concat(T,") translateY(").concat(M,") ").concat(R),l.style.setProperty("--v-transform-origin",S),l.style.transformOrigin=S};S(o,(t=>{t?(l(),c()):s()}));const c=()=>{T().then(a).catch((t=>console.error(t)))};["placement","x","y","internalShift","flip","width","overlap","minWidth"].forEach((e=>{S(g(t,e),a)})),["teleportDisabled"].forEach((e=>{S(g(t,e),c)})),S(g(t,"syncTrigger"),(t=>{t.includes("resize")?e.addResizeListener(a):e.removeResizeListener(a),t.includes("scroll")?e.addScrollListener(a):e.removeScrollListener(a)}));const u=L(),d=A((()=>{const{to:e}=t;if(void 0!==e)return e;u.value}));return{VBinder:e,mergedEnabled:o,offsetContainerRef:r,followerRef:n,mergedTo:d,syncPosition:a}},render(){return y(Q,{show:this.show,to:this.mergedTo,disabled:this.teleportDisabled},{default:()=>{var t,e;const o=y("div",{class:["v-binder-follower-container",this.containerClass],ref:"offsetContainerRef"},[y("div",{class:"v-binder-follower-content",ref:"followerRef"},null===(e=(t=this.$slots).default)||void 0===e?void 0:e.call(t))]);return this.zindexable?v(o,[[W,{enabled:this.mergedEnabled,zIndex:this.zIndex}]]):o}})}});const at=new class{constructor(){this.handleResize=this.handleResize.bind(this),this.observer=new("undefined"!=typeof window&&window.ResizeObserver||k)(this.handleResize),this.elHandlersMap=new Map}handleResize(t){for(const e of t){const t=this.elHandlersMap.get(e.target);void 0!==t&&t(e)}}registerHandler(t,e){this.elHandlersMap.set(t,e),this.observer.observe(t)}unregisterHandler(t){this.elHandlersMap.has(t)&&(this.elHandlersMap.delete(t),this.observer.unobserve(t))}},ct=u({name:"ResizeObserver",props:{onResize:Function},setup(t){let e=!1;const o=f().proxy;function n(e){const{onResize:o}=t;void 0!==o&&o(e)}x((()=>{const t=o.$el;void 0!==t?t.nextElementSibling===t.nextSibling||3!==t.nodeType||""===t.nodeValue?null!==t.nextElementSibling&&(at.registerHandler(t.nextElementSibling,n),e=!0):V("resize-observer","$el can not be observed (it may be a text node)."):V("resize-observer","$el does not exist.")})),m((()=>{e&&at.unregisterHandler(o.$el.nextElementSibling)}))},render(){return M(this.$slots,"default")}});let ut,dt;function ft(){return"undefined"==typeof document?1:(void 0===dt&&(dt="chrome"in window?window.devicePixelRatio:1),dt)}const ht=U(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[U("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[U("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),pt=u({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(t){const e=B();ht.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:q,ssr:e}),x((()=>{const{defaultScrollIndex:e,defaultScrollKey:o}=t;null!=e?y({index:e}):null!=o&&y({key:o})}));let l=!1,s=!1;R((()=>{l=!1,s?y({top:m.value,left:h}):s=!0})),z((()=>{l=!0,s||(s=!0)}));const i=b((()=>{const e=new Map,{keyField:o}=t;return t.items.forEach(((t,n)=>{e.set(t[o],n)})),e})),a=p(null),c=p(void 0),u=new Map,d=b((()=>{const{items:e,itemSize:o,keyField:n}=t,r=new G(e.length,o);return e.forEach(((t,e)=>{const o=t[n],l=u.get(o);void 0!==l&&r.add(e,l)})),r})),f=p(0);let h=0;const m=p(0),v=A((()=>Math.max(d.value.getBound(m.value-n(t.paddingTop))-1,0))),g=b((()=>{const{value:e}=c;if(void 0===e)return[];const{items:o,itemSize:n}=t,r=v.value,l=Math.min(r+Math.ceil(e/n+1),o.length-1),s=[];for(let t=r;t<=l;++t)s.push(o[t]);return s})),y=(t,e)=>{if("number"==typeof t)return void M(t,e,"auto");const{left:o,top:n,index:r,key:l,position:s,behavior:a,debounce:c=!0}=t;if(void 0!==o||void 0!==n)M(o,n,a);else if(void 0!==r)T(r,a,c);else if(void 0!==l){const t=i.value.get(l);void 0!==t&&T(t,a,c)}else"bottom"===s?M(0,Number.MAX_SAFE_INTEGER,a):"top"===s&&M(0,0,a)};let w,S=null;function T(e,o,r){const{value:l}=d,s=l.sum(e)+n(t.paddingTop);if(r){w=e,null!==S&&window.clearTimeout(S),S=window.setTimeout((()=>{w=void 0,S=null}),16);const{scrollTop:t,offsetHeight:n}=a.value;if(s>t){const r=l.get(e);s+r<=t+n||a.value.scrollTo({left:0,top:s+r-n,behavior:o})}else a.value.scrollTo({left:0,top:s,behavior:o})}else a.value.scrollTo({left:0,top:s,behavior:o})}function M(t,e,o){a.value.scrollTo({left:t,top:e,behavior:o})}const E=!("undefined"!=typeof document&&(void 0===ut&&(ut="matchMedia"in window&&window.matchMedia("(pointer:coarse)").matches),ut));let F=!1;function I(){const{value:t}=a;null!=t&&(m.value=t.scrollTop,h=t.scrollLeft)}function L(t){let e=t;for(;null!==e;){if("none"===e.style.display)return!0;e=e.parentElement}return!1}return{listHeight:c,listStyle:{overflow:"auto"},keyToIndex:i,itemsStyle:b((()=>{const{itemResizable:e}=t,o=r(d.value.sum());return f.value,[t.itemsStyle,{boxSizing:"content-box",height:e?"":o,minHeight:e?o:"",paddingTop:r(t.paddingTop),paddingBottom:r(t.paddingBottom)}]})),visibleItemsStyle:b((()=>(f.value,{transform:"translateY(".concat(r(d.value.sum(v.value)),")")}))),viewportItems:g,listElRef:a,itemsElRef:p(null),scrollTo:y,handleListResize:function(e){if(l)return;if(L(e.target))return;if(e.contentRect.height===c.value)return;c.value=e.contentRect.height;const{onResize:o}=t;void 0!==o&&o(e)},handleListScroll:function(e){var o;null===(o=t.onScroll)||void 0===o||o.call(t,e),E&&F||I()},handleListWheel:function(e){var n;if(null===(n=t.onWheel)||void 0===n||n.call(t,e),E){const t=a.value;if(null!=t){if(0===e.deltaX){if(0===t.scrollTop&&e.deltaY<=0)return;if(t.scrollTop+t.offsetHeight>=t.scrollHeight&&e.deltaY>=0)return}e.preventDefault(),t.scrollTop+=e.deltaY/ft(),t.scrollLeft+=e.deltaX/ft(),I(),F=!0,o((()=>{F=!1}))}}},handleItemResize:function(e,o){var n,r,s;if(l)return;if(t.ignoreItemResize)return;if(L(o.target))return;const{value:c}=d,h=i.value.get(e),p=c.get(h),m=null!==(s=null===(r=null===(n=o.borderBoxSize)||void 0===n?void 0:n[0])||void 0===r?void 0:r.blockSize)&&void 0!==s?s:o.contentRect.height;if(m===p)return;0===m-t.itemSize?u.delete(e):u.set(e,m-t.itemSize);const v=m-p;if(0===v)return;c.add(h,v);const g=a.value;if(null!=g){if(void 0===w){const t=c.sum(h);g.scrollTop>t&&g.scrollBy(0,v)}else if(h<w)g.scrollBy(0,v);else if(h===w){m+c.sum(h)>g.scrollTop+g.offsetHeight&&g.scrollBy(0,v)}I()}f.value++}}},render(){const{itemResizable:t,keyField:e,keyToIndex:o,visibleItemsTag:n}=this;return y(ct,{onResize:this.handleListResize},{default:()=>{var r,l;return y("div",E(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[0!==this.items.length?y("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[y(n,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>this.viewportItems.map((n=>{const r=n[e],l=o.get(r),s=this.$slots.default({item:n,index:l})[0];return t?y(ct,{key:r,onResize:t=>this.handleItemResize(r,t)},{default:()=>s}):(s.key=r,s)}))})]):null===(l=(r=this.$slots).empty)||void 0===l?void 0:l.call(r)])}})}}),mt=U(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[U("&::-webkit-scrollbar",{width:0,height:0})]),vt=u({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const t=p(null);const e=B();mt.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:q,ssr:e});const o={scrollTo(...e){var o;null===(o=t.value)||void 0===o||o.scrollTo(...e)}};return Object.assign({selfRef:t,handleWheel:function(t){t.currentTarget.offsetWidth<t.currentTarget.scrollWidth&&0!==t.deltaY&&(t.currentTarget.scrollLeft+=t.deltaY+t.deltaX,t.preventDefault())}},o)},render(){return y("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}}),gt="v-hidden",bt=U("[v-hidden]",{display:"none!important"}),yt=u({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(t,{slots:e}){const o=p(null),n=p(null);function r(r){const{value:l}=o,{getCounter:s,getTail:i}=t;let a;if(a=void 0!==s?s():n.value,!l||!a)return;a.hasAttribute(gt)&&a.removeAttribute(gt);const{children:c}=l;if(r.showAllItemsBeforeCalculate)for(const t of c)t.hasAttribute(gt)&&t.removeAttribute(gt);const u=l.offsetWidth,d=[],f=e.tail?null==i?void 0:i():null;let h=f?f.offsetWidth:0,p=!1;const m=l.children.length-(e.tail?1:0);for(let e=0;e<m-1;++e){if(e<0)continue;const o=c[e];if(p){o.hasAttribute(gt)||o.setAttribute(gt,"");continue}o.hasAttribute(gt)&&o.removeAttribute(gt);const n=o.offsetWidth;if(h+=n,d[e]=n,h>u){const{updateCounter:o}=t;for(let n=e;n>=0;--n){const r=m-1-n;void 0!==o?o(r):a.textContent="".concat(r);const l=a.offsetWidth;if(h-=d[n],h+l<=u||0===n){p=!0,e=n-1,f&&(-1===e?(f.style.maxWidth="".concat(u-l,"px"),f.style.boxSizing="border-box"):f.style.maxWidth="");const{onUpdateCount:o}=t;o&&o(r);break}}}}const{onUpdateOverflow:v}=t;p?void 0!==v&&v(!0):(void 0!==v&&v(!1),a.setAttribute(gt,""))}const l=B();return bt.mount({id:"vueuc/overflow",head:!0,anchorMetaName:q,ssr:l}),x((()=>r({showAllItemsBeforeCalculate:!1}))),{selfRef:o,counterRef:n,sync:r}},render(){const{$slots:t}=this;return T((()=>this.sync({showAllItemsBeforeCalculate:!1}))),y("div",{class:"v-overflow",ref:"selfRef"},[M(t,"default"),t.counter?t.counter():y("span",{style:{display:"inline-block"},ref:"counterRef"}),t.tail?t.tail():null])}});function wt(t){return t instanceof HTMLElement}function xt(t){for(let e=0;e<t.childNodes.length;e++){const o=t.childNodes[e];if(wt(o)&&(Tt(o)||xt(o)))return!0}return!1}function St(t){for(let e=t.childNodes.length-1;e>=0;e--){const o=t.childNodes[e];if(wt(o)&&(Tt(o)||St(o)))return!0}return!1}function Tt(t){if(!function(t){if(t.tabIndex>0||0===t.tabIndex&&null!==t.getAttribute("tabIndex"))return!0;if(t.getAttribute("disabled"))return!1;switch(t.nodeName){case"A":return!!t.href&&"ignore"!==t.rel;case"INPUT":return"hidden"!==t.type&&"file"!==t.type;case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}}(t))return!1;try{t.focus({preventScroll:!0})}catch(e){}return document.activeElement===t}let Mt=[];const Rt=u({name:"FocusTrap",props:{disabled:Boolean,active:Boolean,autoFocus:{type:Boolean,default:!0},onEsc:Function,initialFocusTo:String,finalFocusTo:String,returnFocusOnDeactivated:{type:Boolean,default:!0}},setup(o){const n=l(),r=p(null),i=p(null);let a=!1,c=!1;const u="undefined"==typeof document?null:document.activeElement;function d(){return Mt[Mt.length-1]===n}function f(t){var e;"Escape"===t.code&&d()&&(null===(e=o.onEsc)||void 0===e||e.call(o,t))}function h(t){if(!c&&d()){const e=v();if(null===e)return;if(e.contains(s(t)))return;b("first")}}function v(){const t=r.value;if(null===t)return null;let e=t;for(;!(e=e.nextSibling,null===e||e instanceof Element&&"DIV"===e.tagName););return e}function g(){var t;if(o.disabled)return;if(document.removeEventListener("focus",h,!0),Mt=Mt.filter((t=>t!==n)),d())return;const{finalFocusTo:e}=o;void 0!==e?null===(t=K(e))||void 0===t||t.focus({preventScroll:!0}):o.returnFocusOnDeactivated&&u instanceof HTMLElement&&(c=!0,u.focus({preventScroll:!0}),c=!1)}function b(t){if(d()&&o.active){const e=r.value,o=i.value;if(null!==e&&null!==o){const n=v();if(null==n||n===o)return c=!0,e.focus({preventScroll:!0}),void(c=!1);c=!0;const r="first"===t?xt(n):St(n);c=!1,r||(c=!0,e.focus({preventScroll:!0}),c=!1)}}}return x((()=>{S((()=>o.active),(r=>{r?(!function(){var t;if(o.disabled)return;if(Mt.push(n),o.autoFocus){const{initialFocusTo:e}=o;void 0===e?b("first"):null===(t=K(e))||void 0===t||t.focus({preventScroll:!0})}a=!0,document.addEventListener("focus",h,!0)}(),e("keydown",document,f)):(t("keydown",document,f),a&&g())}),{immediate:!0})})),m((()=>{t("keydown",document,f),a&&g()})),{focusableStartRef:r,focusableEndRef:i,focusableStyle:"position: absolute; height: 0; width: 0;",handleStartFocus:function(t){if(c)return;const e=v();null!==e&&(null!==t.relatedTarget&&e.contains(t.relatedTarget)?b("last"):b("first"))},handleEndFocus:function(t){c||(null!==t.relatedTarget&&t.relatedTarget===r.value?b("last"):b("first"))}}},render(){const{default:t}=this.$slots;if(void 0===t)return null;if(this.disabled)return t();const{active:e,focusableStyle:o}=this;return y(a,null,[y("div",{"aria-hidden":"true",tabindex:e?"0":"-1",ref:"focusableStartRef",style:o,onFocus:this.handleStartFocus}),t(),y("div",{"aria-hidden":"true",style:o,ref:"focusableEndRef",tabindex:e?"0":"-1",onFocus:this.handleEndFocus})])}});export{Rt as F,Q as L,ct as V,pt as a,it as b,P as c,D as d,yt as e,vt as f,at as r};
