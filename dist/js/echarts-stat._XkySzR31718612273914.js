import{c as n,g as r}from"./@amap.zA6BxCQR1718612273914.js";var t={exports:{}};const e=r(t.exports=function(){return function(n){var r={};function t(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return n[e].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}return t.m=n,t.c=r,t.p="",t(0)}([function(n,r,t){var e;void 0===(e=function(n){return{clustering:t(1),regression:t(5),statistics:t(6),histogram:t(15),transform:{regression:t(18),histogram:t(21),clustering:t(22)}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(2),e=r.dataPreprocess,o=r.normalizeDimensions,i=t(3),a=t(4),u=i.size,s=i.sumOfColumn,l=i.sum,f=i.zeros,c=(a=t(4)).isNumber,h=Math.pow,p={SINGLE:"single",MULTIPLE:"multiple"};function v(n,r,t){for(var e,o,i,a,u=f(n.length,2),s=function(n,r){for(var t=f(n,r.length),e=0;e<r.length;e++)for(var o=r[e],i=0;i<n;i++)t[i][e]=o.min+o.span*Math.random();return t}(r,x(n,t.dimensions)),l=!0;l;){l=!1;for(var c=0;c<n.length;c++){e=1/0,o=-1;for(var h=0;h<r;h++)(i=g(n[c],s[h],t))<e&&(e=i,o=h);u[c][0]!==o&&(l=!0),u[c][0]=o,u[c][1]=e}for(c=0;c<r;c++){for(a=[],h=0;h<u.length;h++)u[h][0]===c&&a.push(n[h]);s[c]=d(a,t)}}return{centroids:s,clusterAssigned:u}}function d(n,r){for(var t,e,o=[],i=0;i<r.dimensions.length;i++){var a=r.dimensions[i];t=0;for(var u=0;u<n.length;u++)t+=n[u][a];e=t/n.length,o.push(e)}return o}function m(n,r){var t=r.outputCentroidDimensions;if(r.outputType===p.SINGLE&&null!=t)for(var e=n.data,o=n.centroids,i=0;i<e.length;i++)for(var a=e[i],u=o[a[r.outputClusterIndexDimension]],s=Math.min(u.length,t.length),l=0;l<s;l++)a[t[l]]=u[l]}function g(n,r,t){for(var e=0,o=t.dimensions,i=t.rawExtents,a=0;a<o.length;a++){var u=i[a].span;if(u){var s=(n[o[a]]-r[a])/u;e+=h(s,2)}}return e}function x(n,r){for(var t=[],e=r.length,o=0;o<e;o++)t.push({min:1/0,max:-1/0});for(o=0;o<n.length;o++)for(var i=n[o],a=0;a<e;a++){var u=t[a],s=i[r[a]];u.min>s&&(u.min=s),u.max<s&&(u.max=s)}for(o=0;o<e;o++)t[o].span=t[o].max-t[o].min;return t}return{OutputType:p,hierarchicalKMeans:function(n,r,t){var i=(c(r)?{clusterCount:r,stepByStep:t}:r)||{clusterCount:2},h=i.clusterCount;if(!(h<2)){var M,y,w,D=function(n,r){var t=u(n);if(t.length<1)throw new Error("The input data of clustering should be two-dimension array.");for(var e=t[1],i=[],s=0;s<e;s++)i.push(s);var l=o(r.dimensions,i),f=r.outputType||p.MULTIPLE,c=r.outputClusterIndexDimension;if(f===p.SINGLE&&!a.isNumber(c))throw new Error("outputClusterIndexDimension is required as a number.");var h=x(n,l);return{dimensions:l,rawExtents:h,outputType:f,outputClusterIndexDimension:c,outputCentroidDimensions:r.outputCentroidDimensions}}(n,i),b=D.outputType===p.SINGLE,E=e(n,{dimensions:D.dimensions}),N=f(E.length,2);if(b){M=[];var C=D.outputClusterIndexDimension;y=function(n,r){M[n][C]=r},w=function(n){return M[n][C]};for(var I=0;I<E.length;I++)M.push(E[I].slice()),V(I,0),y(I,0)}else y=function(n,r){N[n][0]=r},w=function(n){return N[n][0]};var A,O,z,S,q,P,L=d(E,D),T=[L];for(I=0;I<E.length;I++)V(I,g(E[I],L,D));var F=1,j={data:M,centroids:T,isEnd:!1};if(b||(j.clusterAssment=N),i.stepByStep)j.next=function(){return G(),m(j,D),j};else for(;G(),!j.isEnd;);return m(j,D),j}function V(n,r){N[n][1]=r}function G(){if(F<h){var n,r,t;A=1/0;for(var e=0;e<T.length;e++){O=[],z=[];for(var o=0;o<E.length;o++)w(o)===e?O.push(E[o]):z.push(N[o][1]);S=v(O,2,D),q=s(S.clusterAssigned,1),P=l(z),q+P<A&&(A=P+q,n=e,r=S.centroids,t=S.clusterAssigned)}for(o=0;o<t.length;o++)0===t[o][0]?t[o][0]=n:1===t[o][0]&&(t[o][0]=T.length);for(T[n]=r[0],T.push(r[1]),o=0,e=0;o<E.length&&e<t.length;o++)w(o)===n&&(y(o,t[e][0]),V(o,t[e++][1]));var i=[];if(!b){for(o=0;o<T.length;o++)for(i[o]=[],e=0;e<E.length;e++)w(e)===o&&i[o].push(E[e]);j.pointsInCluster=i}F++}else j.isEnd=!0}}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(3),e=r.isArray,o=r.size,i=t(4).isNumber;return{normalizeDimensions:function(n,r){return"number"==typeof n?[n]:null==n?r:n},dataPreprocess:function(n,r){var t=(r=r||{}).dimensions,a={};if(null!=t)for(var u=0;u<t.length;u++)a[t[u]]=!0;var s=r.toOneDimensionArray?t?t[0]:0:null;if(!e(n))throw new Error("Invalid data type, you should input an array");var l,f=[],c=o(n);if(1===c.length)for(u=0;u<c[0];u++){var h=n[u];i(h)&&f.push(h)}else if(2===c.length)for(u=0;u<c[0];u++){for(var p=!0,v=(h=n[u],0);v<c[1];v++)l=v,t&&!a.hasOwnProperty(l)||i(h[v])||(p=!1);p&&f.push(null!=s?h[s]:h)}return f},getPrecision:function(n){var r=n.toString(),t=r.indexOf(".");return t<0?0:r.length-1-t}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=Object.prototype.toString,t=Array.prototype.map;function e(n){return"[object Array]"===r.call(n)}function o(n,r){return n>r?1:n<r?-1:n===r?0:NaN}return{size:function(n){for(var r=[];e(n);)r.push(n.length),n=n[0];return r},isArray:e,zeros:function(n,r){for(var t=[],e=0;e<n;e++){t[e]=[];for(var o=0;o<r;o++)t[e][o]=0}return t},sum:function(n){for(var r=0,t=0;t<n.length;t++)r+=n[t];return r},sumOfColumn:function(n,r){for(var t=0,e=0;e<n.length;e++)t+=n[e][r];return t},ascending:o,bisect:function(n,r,t,e){for(null==t&&(t=0),null==e&&(e=n.length);t<e;){var i=Math.floor((t+e)/2),a=o(n[i],r);if(a>0)e=i;else{if(!(a<0))return i+1;t=i+1}}return t},map:function(n,r,e){if(n&&r){if(n.map&&n.map===t)return n.map(r,e);for(var o=[],i=0,a=n.length;i<a;i++)o.push(r.call(e,n[i],i,n));return o}}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){return{isNumber:function(n){return"number"==typeof(n=null===n?NaN:+n)&&!isNaN(n)},isInteger:function(n){return isFinite(n)&&n===Math.round(n)},quantityExponent:function(n){if(0===n)return 0;var r=Math.floor(Math.log(n)/Math.LN10);return n/Math.pow(10,r)>=10&&r++,r}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(2),e=r.dataPreprocess,o=r.normalizeDimensions,i={linear:function(n,r){for(var t=r.dimensions[0],e=r.dimensions[1],o=0,i=0,a=0,u=0,s=n.length,l=0;l<s;l++)o+=(v=n[l])[t],i+=v[e],a+=v[t]*v[e],u+=v[t]*v[t];for(var f=(s*a-o*i)/(s*u-o*o),c=i/s-f*o/s,h=[],p=0;p<n.length;p++){var v,d=(v=n[p]).slice();d[t]=v[t],d[e]=f*v[t]+c,h.push(d)}return{points:h,parameter:{gradient:f,intercept:c},expression:"y = "+Math.round(100*f)/100+"x + "+Math.round(100*c)/100}},linearThroughOrigin:function(n,r){for(var t=r.dimensions[0],e=r.dimensions[1],o=0,i=0,a=0;a<n.length;a++)o+=(f=n[a])[t]*f[t],i+=f[t]*f[e];for(var u=i/o,s=[],l=0;l<n.length;l++){var f,c=(f=n[l]).slice();c[t]=f[t],c[e]=f[t]*u,s.push(c)}return{points:s,parameter:{gradient:u},expression:"y = "+Math.round(100*u)/100+"x"}},exponential:function(n,r){for(var t=r.dimensions[0],e=r.dimensions[1],o=0,i=0,a=0,u=0,s=0,l=0;l<n.length;l++)(d=n[l])[t],o+=d[e],s+=d[t]*d[e],i+=d[t]*d[t]*d[e],a+=d[e]*Math.log(d[e]),u+=d[t]*d[e]*Math.log(d[e]);for(var f=o*i-s*s,c=Math.pow(Math.E,(i*a-s*u)/f),h=(o*u-s*a)/f,p=[],v=0;v<n.length;v++){var d,m=(d=n[v]).slice();m[t]=d[t],m[e]=c*Math.pow(Math.E,h*d[t]),p.push(m)}return{points:p,parameter:{coefficient:c,index:h},expression:"y = "+Math.round(100*c)/100+"e^("+Math.round(100*h)/100+"x)"}},logarithmic:function(n,r){for(var t=r.dimensions[0],e=r.dimensions[1],o=0,i=0,a=0,u=0,s=0;s<n.length;s++){var l=n[s];o+=Math.log(l[t]),i+=l[e]*Math.log(l[t]),a+=l[e],u+=Math.pow(Math.log(l[t]),2)}for(var f=(s*i-a*o)/(s*u-o*o),c=(a-f*o)/s,h=[],p=0;p<n.length;p++){var v=(l=n[p]).slice();v[t]=l[t],v[e]=f*Math.log(l[t])+c,h.push(v)}return{points:h,parameter:{gradient:f,intercept:c},expression:"y = "+Math.round(100*c)/100+" + "+Math.round(100*f)/100+"ln(x)"}},polynomial:function(n,r){var t=r.dimensions[0],e=r.dimensions[1],o=r.order;null==o&&(o=2);for(var i=[],a=[],u=o+1,s=0;s<u;s++){for(var l=0,f=0;f<n.length;f++)l+=(x=n[f])[e]*Math.pow(x[t],s);a.push(l);for(var c=[],h=0;h<u;h++){for(var p=0,v=0;v<n.length;v++)p+=Math.pow(n[v][t],s+h);c.push(p)}i.push(c)}i.push(a);var d=function(n,r){for(var t=0;t<n.length-1;t++){for(var e=t,o=t+1;o<n.length-1;o++)Math.abs(n[t][o])>Math.abs(n[t][e])&&(e=o);for(var i=t;i<n.length;i++){var a=n[i][t];n[i][t]=n[i][e],n[i][e]=a}for(var u=t+1;u<n.length-1;u++)for(var s=n.length-1;s>=t;s--)n[s][u]-=n[s][t]/n[t][t]*n[t][u]}var l=new Array(r),f=n.length-1;for(o=n.length-2;o>=0;o--){for(a=0,t=o+1;t<n.length-1;t++)a+=n[t][o]*l[t];l[o]=(n[f][o]-a)/n[o][o]}return l}(i,u),m=[];for(s=0;s<n.length;s++){var g=0,x=n[s];for(f=0;f<d.length;f++)g+=d[f]*Math.pow(x[t],f);var M=x.slice();M[t]=x[t],M[e]=g,m.push(M)}var y="y = ";for(s=d.length-1;s>=0;s--)y+=s>1?Math.round(d[s]*Math.pow(10,s+1))/Math.pow(10,s+1)+"x^"+s+" + ":1===s?Math.round(100*d[s])/100+"x + ":Math.round(100*d[s])/100;return{points:m,parameter:d,expression:y}}};return function(n,r,t){var a="number"==typeof t?{order:t}:t||{},u=o(a.dimensions,[0,1]),s=e(r,{dimensions:u}),l=i[n](s,{order:a.order,dimensions:u}),f=u[0];return l.points.sort((function(n,r){return n[f]-r[f]})),l}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r={};return r.max=t(7),r.deviation=t(8),r.mean=t(10),r.median=t(12),r.min=t(14),r.quantile=t(13),r.sampleVariance=t(9),r.sum=t(11),r}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(4).isNumber;return function(n){for(var t=-1/0,e=0;e<n.length;e++)r(n[e])&&n[e]>t&&(t=n[e]);return t}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(9);return function(n){var t=r(n);return t?Math.sqrt(t):t}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(4).isNumber,e=t(10);return function(n){var t=n.length;if(!t||t<2)return 0;if(n.length>=2){for(var o,i=e(n),a=0,u=0;u<n.length;u++)r(n[u])&&(a+=(o=n[u]-i)*o);return a/(n.length-1)}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(11);return function(n){return n.length?r(n)/n.length:0}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(4).isNumber;return function(n){var t=n.length;if(!t)return 0;for(var e=0,o=0;o<t;o++)r(n[o])&&(e+=n[o]);return e}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(13);return function(n){return r(n,.5)}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){return function(n,r){var t=n.length;if(!t)return 0;if(r<=0||t<2)return n[0];if(r>=1)return n[t-1];var e=(t-1)*r,o=Math.floor(e),i=n[o];return i+(n[o+1]-i)*(e-o)}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(4).isNumber;return function(n){for(var t=1/0,e=0;e<n.length;e++)r(n[e])&&n[e]<t&&(t=n[e]);return t}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(7),e=t(14),o=t(13),i=t(8),a=t(2),u=a.dataPreprocess,s=a.normalizeDimensions,l=t(3),f=l.ascending,c=l.map,h=t(16),p=l.bisect,v=t(17),d={squareRoot:function(n){var r=Math.ceil(Math.sqrt(n.length));return r>50?50:r},scott:function(n,r,t){return Math.ceil((t-r)/(3.5*i(n)*Math.pow(n.length,-1/3)))},freedmanDiaconis:function(n,r,t){return n.sort(f),Math.ceil((t-r)/(2*(o(n,.75)-o(n,.25))*Math.pow(n.length,-1/3)))},sturges:function(n){return Math.ceil(Math.log(n.length)/Math.LN2)+1}};return function(n,t){for(var o="string"==typeof t?{method:t}:t||{},i=null==o.method?d.squareRoot:d[o.method],a=s(o.dimensions),l=u(n,{dimensions:a,toOneDimensionArray:!0}),f=r(l),m=e(l),g=i(l,m,f),x=v(m,f,g),M=x.step,y=x.toFixedPrecision,w=h(+(Math.ceil(m/M)*M).toFixed(y),+(Math.floor(f/M)*M).toFixed(y),M,y),D=w.length,b=new Array(D+1),E=0;E<=D;E++)b[E]={},b[E].sample=[],b[E].x0=E>0?w[E-1]:w[E]-m===M?m:w[E]-M,b[E].x1=E<D?w[E]:f-w[E-1]===M?f:w[E-1]+M;for(E=0;E<l.length;E++)m<=l[E]&&l[E]<=f&&b[p(w,l[E],0,D)].sample.push(l[E]);return{bins:b,data:n=c(b,(function(n){return[+((n.x0+n.x1)/2).toFixed(y),n.sample.length,n.x0,n.x1,n.x0+" - "+n.x1]})),customData:c(b,(function(n){return[n.x0,n.x1,n.sample.length]}))}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;e=function(n){var r=t(2).getPrecision;return function(n,t,e,o){var i=arguments.length;i<2?(t=n,n=0,e=1):i<3?e=1:o=i<4?r(e=+e):+o;for(var a=Math.ceil(((t-n)/e).toFixed(o)),u=new Array(a+1),s=0;s<a+1;s++)u[s]=+(n+s*e).toFixed(o);return u}}.call(r,t,r,n),void 0===e||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(4);return function(n,t,e){var o=Math.abs(t-n)/e,i=r.quantityExponent(o),a=Math.pow(10,i),u=o/a;u>=Math.sqrt(50)?a*=10:u>=Math.sqrt(10)?a*=5:u>=Math.sqrt(2)&&(a*=2);var s=i<0?-i:0;return{step:+(t>=n?a:-a).toFixed(s),toFixedPrecision:s}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(5),e=t(19);return{type:"ecStat:regression",transform:function(n){var t,o=n.upstream,i=n.config||{},a=i.method||"linear",u=r(a,o.cloneRawData(),{order:i.order,dimensions:e.normalizeExistingDimensions(n,i.dimensions)}),s=u.points,l=i.formulaOn;if(null==l&&(l="end"),"none"!==l){for(var f=0;f<s.length;f++)s[f][2]="start"===l&&0===f||"all"===l||"end"===l&&f===s.length-1?u.expression:"";(t=o.cloneAllDimensionInfo())[2]={}}return[{dimensions:t,data:s}]}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(3),e=t(4),o=t(20);return{normalizeExistingDimensions:function(n,t){if(null!=t){var e=n.upstream;if(r.isArray(t)){for(var o=[],i=0;i<t.length;i++){var a;u(a=e.getDimensionInfo(t[i]),t[i]),o[i]=a.index}return o}return u(a=e.getDimensionInfo(t),t),a.index}function u(n,r){if(!n)throw new Error("Can not find dimension by "+r)}},normalizeNewDimensions:function(n){if(r.isArray(n)){for(var t=[],i=[],a=0;a<n.length;a++){var u=s(n[a]);t.push(u.name),i.push(u.index)}return{name:t,index:i}}if(null!=n)return s(n);function s(n){if(e.isNumber(n))return{index:n};if(o.isObject(n)&&e.isNumber(n.index))return n;throw new Error("Illegle new dimensions config. Expect `{ name: string, index: number }`.")}}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){return{extend:function(n,r){if(Object.assign)Object.assign(n,r);else for(var t in r)r.hasOwnProperty(t)&&(n[t]=r[t]);return n},isObject:function(n){const r=typeof n;return"function"===r||!!n&&"object"===r}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(15),e=t(19);return{type:"ecStat:histogram",transform:function(n){var t=n.upstream,o=n.config||{},i=r(t.cloneRawData(),{method:o.method,dimensions:e.normalizeExistingDimensions(n,o.dimensions)});return[{dimensions:["MeanOfV0V1","VCount","V0","V1","DisplayableName"],data:i.data},{data:i.customData}]}}}.call(r,t,r,n))||(n.exports=e)},function(n,r,t){var e;void 0===(e=function(n){var r=t(1),e=t(4),o=t(19),i=e.isNumber;return{type:"ecStat:clustering",transform:function(n){var t=n.upstream,e=n.config||{},a=e.clusterCount;if(!i(a)||a<=0)throw new Error('config param "clusterCount" need to be specified as an interger greater than 1.');if(1===a)return[{},{data:[]}];var u=o.normalizeNewDimensions(e.outputClusterIndexDimension),s=o.normalizeNewDimensions(e.outputCentroidDimensions);if(null==u)throw new Error("outputClusterIndexDimension is required as a number.");for(var l=r.hierarchicalKMeans(t.cloneRawData(),{clusterCount:a,stepByStep:!1,dimensions:o.normalizeExistingDimensions(n,e.dimensions),outputType:r.OutputType.SINGLE,outputClusterIndexDimension:u.index,outputCentroidDimensions:(s||{}).index}),f=t.cloneAllDimensionInfo(),c=[],h=0;h<f.length;h++){var p=f[h];c.push(p.name)}if(c[u.index]=u.name,s)for(h=0;h<s.index.length;h++)null!=s.name[h]&&(c[s.index[h]]=s.name[h]);return[{dimensions:c,data:l.data},{data:l.centroids}]}}}.call(r,t,r,n))||(n.exports=e)}])}());export{e as _};
