var n=e;function e(n,o){var a=i();return(e=function(n,e){return a[n-=366]})(n,o)}!function(n,o){for(var a=e,t=i();;)try{if(623688===-parseInt(a(407))/1+-parseInt(a(381))/2*(parseInt(a(405))/3)+-parseInt(a(398))/4*(-parseInt(a(389))/5)+parseInt(a(366))/6+parseInt(a(402))/7+parseInt(a(377))/8+-parseInt(a(390))/9*(parseInt(a(395))/10))break;t.push(t.shift())}catch(r){t.push(t.shift())}}();var o=function(){var n=!0;return function(o,a){var i=n?function(){if(a){var n=a[e(384)](o,arguments);return a=null,n}}:function(){};return n=!1,i}}();!function(){o(this,(function(){var n=e,o=new RegExp(n(371)),a=new RegExp(n(378),"i"),i=p(n(388));o.test(i+n(400))&&a.test(i+n(399))?p():i("0")}))()}();var a=function(){var n=!0;return function(o,a){var i=n?function(){if(a){var n=a[e(384)](o,arguments);return a=null,n}}:function(){};return n=!1,i}}();function i(){var n=["function *\\( *\\)",'{}.constructor("return this")( )',"stateObject","console","while (true) {}","action","8140688VEdhNF","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","length","gger","24nAcvdE","error","undefined","apply","__esModule","getOwnPropertyDescriptor","toString","init","23830kjJshI","9goJctM","log","prototype","info","keys","12711020eOiuKs","counter","__proto__","908qXXLSq","input","chain","call","7387429cBqjmu","get","defineProperty","276825IVsrXA","forEach","617964MpqnRz","table","warn","construct","default","bind","trace","2791434qQPBUy","constructor","hasOwnProperty","string","debu"];return(i=function(){return n})()}a(void 0,(function(){var n,o=e;try{n=Function("return (function() "+o(372)+");")()}catch(l){n=window}for(var i=n[o(374)]=n[o(374)]||{},t=[o(391),o(409),o(393),o(382),"exception",o(408),o(413)],r=0;r<t.length;r++){var p=a[o(367)][o(392)][o(412)](a),s=t[r],c=i[s]||p;p[o(397)]=a[o(412)](a),p[o(387)]=c.toString[o(412)](c),i[s]=p}}))();var t="undefined"!=typeof globalThis?globalThis:typeof window!==n(383)?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function r(e){var o=n;return e&&e[o(385)]&&Object[o(392)][o(368)].call(e,o(411))?e.default:e}function p(n){function o(n){var a=e;if(typeof n===a(369))return function(n){}[a(367)](a(375)).apply(a(396));1!==(""+n/n)[a(379)]||n%20==0?function(){return!0}[a(367)]("debu"+a(380))[a(401)](a(376)):function(){return!1}[a(367)](a(370)+"gger")[a(384)](a(373)),o(++n)}try{if(n)return o;o(0)}catch(a){}}var s={exports:{}};const c=r(s.exports=function(){function n(n){var a=[];return n.AMapUI&&a.push(e(n.AMapUI)),n.Loca&&a.push(o(n.Loca)),Promise.all(a)}function e(n){return new Promise((function(e,o){var i=[];if(n.plugins)for(var s=0;s<n.plugins.length;s+=1)-1==t.AMapUI.plugins.indexOf(n.plugins[s])&&i.push(n.plugins[s]);if(r.AMapUI===a.failed)o("前次请求 AMapUI 失败");else if(r.AMapUI===a.notload){r.AMapUI=a.loading,t.AMapUI.version=n.version||t.AMapUI.version,s=t.AMapUI.version;var c=document.body||document.head,l=document.createElement("script");l.type="text/javascript",l.src="https://webapi.amap.com/ui/"+s+"/main.js",l.onerror=function(n){r.AMapUI=a.failed,o("请求 AMapUI 失败")},l.onload=function(){if(r.AMapUI=a.loaded,i.length)window.AMapUI.loadUI(i,(function(){for(var n=0,o=i.length;n<o;n++){var a=i[n].split("/").slice(-1)[0];window.AMapUI[a]=arguments[n]}for(e();p.AMapUI.length;)p.AMapUI.splice(0,1)[0]()}));else for(e();p.AMapUI.length;)p.AMapUI.splice(0,1)[0]()},c.appendChild(l)}else r.AMapUI===a.loaded?n.version&&n.version!==t.AMapUI.version?o("不允许多个版本 AMapUI 混用"):i.length?window.AMapUI.loadUI(i,(function(){for(var n=0,o=i.length;n<o;n++){var a=i[n].split("/").slice(-1)[0];window.AMapUI[a]=arguments[n]}e()})):e():n.version&&n.version!==t.AMapUI.version?o("不允许多个版本 AMapUI 混用"):p.AMapUI.push((function(n){n?o(n):i.length?window.AMapUI.loadUI(i,(function(){for(var n=0,o=i.length;n<o;n++){var a=i[n].split("/").slice(-1)[0];window.AMapUI[a]=arguments[n]}e()})):e()}))}))}function o(n){return new Promise((function(e,o){if(r.Loca===a.failed)o("前次请求 Loca 失败");else if(r.Loca===a.notload){r.Loca=a.loading,t.Loca.version=n.version||t.Loca.version;var i=t.Loca.version,s=t.AMap.version.startsWith("2"),c=i.startsWith("2");if(s&&!c||!s&&c)o("JSAPI 与 Loca 版本不对应！！");else{s=t.key,c=document.body||document.head;var l=document.createElement("script");l.type="text/javascript",l.src="https://webapi.amap.com/loca?v="+i+"&key="+s,l.onerror=function(n){r.Loca=a.failed,o("请求 AMapUI 失败")},l.onload=function(){for(r.Loca=a.loaded,e();p.Loca.length;)p.Loca.splice(0,1)[0]()},c.appendChild(l)}}else r.Loca===a.loaded?n.version&&n.version!==t.Loca.version?o("不允许多个版本 Loca 混用"):e():n.version&&n.version!==t.Loca.version?o("不允许多个版本 Loca 混用"):p.Loca.push((function(n){n?o(n):o()}))}))}if(!window)throw Error("AMap JSAPI can only be used in Browser.");var a,i;(i=a||(a={})).notload="notload",i.loading="loading",i.loaded="loaded",i.failed="failed";var t={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},r={AMap:a.notload,AMapUI:a.notload,Loca:a.notload},p={AMap:[],AMapUI:[],Loca:[]},s=[],c=function(n){"function"==typeof n&&(r.AMap===a.loaded?n(window.AMap):s.push(n))};return{load:function(e){return new Promise((function(o,i){if(r.AMap==a.failed)i("");else if(r.AMap==a.notload){var p=e.key,l=e.version,u=e.plugins;p?(window.AMap&&"lbs.amap.com"!==location.host&&i("禁止多种API加载方式混用"),t.key=p,t.AMap.version=l||t.AMap.version,t.AMap.plugins=u||t.AMap.plugins,r.AMap=a.loading,l=document.body||document.head,window.___onAPILoaded=function(t){if(delete window.___onAPILoaded,t)r.AMap=a.failed,i(t);else for(r.AMap=a.loaded,n(e).then((function(){o(window.AMap)})).catch(i);s.length;)s.splice(0,1)[0]()},(u=document.createElement("script")).type="text/javascript",u.src="https://webapi.amap.com/maps?callback=___onAPILoaded&v="+t.AMap.version+"&key="+p+"&plugin="+t.AMap.plugins.join(","),u.onerror=function(n){r.AMap=a.failed,i(n)},l.appendChild(u)):i("请填写key")}else if(r.AMap==a.loaded)if(e.key&&e.key!==t.key)i("多个不一致的 key");else if(e.version&&e.version!==t.AMap.version)i("不允许多个版本 JSAPI 混用");else{if(p=[],e.plugins)for(l=0;l<e.plugins.length;l+=1)-1==t.AMap.plugins.indexOf(e.plugins[l])&&p.push(e.plugins[l]);p.length?window.AMap.plugin(p,(function(){n(e).then((function(){o(window.AMap)})).catch(i)})):n(e).then((function(){o(window.AMap)})).catch(i)}else if(e.key&&e.key!==t.key)i("多个不一致的 key");else if(e.version&&e.version!==t.AMap.version)i("不允许多个版本 JSAPI 混用");else{var d=[];if(e.plugins)for(l=0;l<e.plugins.length;l+=1)-1==t.AMap.plugins.indexOf(e.plugins[l])&&d.push(e.plugins[l]);c((function(){d.length?window.AMap.plugin(d,(function(){n(e).then((function(){o(window.AMap)})).catch(i)})):n(e).then((function(){o(window.AMap)})).catch(i)}))}}))},reset:function(){delete window.AMap,delete window.AMapUI,delete window.Loca,t={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},r={AMap:a.notload,AMapUI:a.notload,Loca:a.notload},p={AMap:[],AMapUI:[],Loca:[]}}}}());export{c as _,t as c,r as g};
