import{g as t}from"./@amap.zA6BxCQR1718612273914.js";import{c as r}from"./color-string.MHzk0AzE1718612273914.js";import{c as o}from"./color-convert._yNxXcTe1718612273914.js";const e=r,n=o,s=["keyword","gray","hex"],l={};for(const m of Object.keys(n))l[[...n[m].labels].sort().join("")]=m;const h={};function i(t,r){if(!(this instanceof i))return new i(t,r);if(r&&r in s&&(r=null),r&&!(r in n))throw new Error("Unknown model: "+r);let o,a;if(null==t)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(t instanceof i)this.model=t.model,this.color=[...t.color],this.valpha=t.valpha;else if("string"==typeof t){const r=e.get(t);if(null===r)throw new Error("Unable to parse color from string: "+t);this.model=r.model,a=n[this.model].channels,this.color=r.value.slice(0,a),this.valpha="number"==typeof r.value[a]?r.value[a]:1}else if(t.length>0){this.model=r||"rgb",a=n[this.model].channels;const o=Array.prototype.slice.call(t,0,a);this.color=p(o,a),this.valpha="number"==typeof t[a]?t[a]:1}else if("number"==typeof t)this.model="rgb",this.color=[t>>16&255,t>>8&255,255&t],this.valpha=1;else{this.valpha=1;const r=Object.keys(t);"alpha"in t&&(r.splice(r.indexOf("alpha"),1),this.valpha="number"==typeof t.alpha?t.alpha:0);const e=r.sort().join("");if(!(e in l))throw new Error("Unable to parse color from object: "+JSON.stringify(t));this.model=l[e];const{labels:s}=n[this.model],h=[];for(o=0;o<s.length;o++)h.push(t[s[o]]);this.color=p(h)}if(h[this.model])for(a=n[this.model].channels,o=0;o<a;o++){const t=h[this.model][o];t&&(this.color[o]=t(this.color[o]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}i.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(t){let r=this.model in e.to?this:this.rgb();r=r.round("number"==typeof t?t:1);const o=1===r.valpha?r.color:[...r.color,this.valpha];return e.to[r.model](o)},percentString(t){const r=this.rgb().round("number"==typeof t?t:1),o=1===r.valpha?r.color:[...r.color,this.valpha];return e.to.rgb.percent(o)},array(){return 1===this.valpha?[...this.color]:[...this.color,this.valpha]},object(){const t={},{channels:r}=n[this.model],{labels:o}=n[this.model];for(let e=0;e<r;e++)t[o[e]]=this.color[e];return 1!==this.valpha&&(t.alpha=this.valpha),t},unitArray(){const t=this.rgb().color;return t[0]/=255,t[1]/=255,t[2]/=255,1!==this.valpha&&t.push(this.valpha),t},unitObject(){const t=this.rgb().object();return t.r/=255,t.g/=255,t.b/=255,1!==this.valpha&&(t.alpha=this.valpha),t},round(t){return t=Math.max(t||0,0),new i([...this.color.map(a(t)),this.valpha],this.model)},alpha(t){return void 0!==t?new i([...this.color,Math.max(0,Math.min(1,t))],this.model):this.valpha},red:c("rgb",0,u(255)),green:c("rgb",1,u(255)),blue:c("rgb",2,u(255)),hue:c(["hsl","hsv","hsl","hwb","hcg"],0,(t=>(t%360+360)%360)),saturationl:c("hsl",1,u(100)),lightness:c("hsl",2,u(100)),saturationv:c("hsv",1,u(100)),value:c("hsv",2,u(100)),chroma:c("hcg",1,u(100)),gray:c("hcg",2,u(100)),white:c("hwb",1,u(100)),wblack:c("hwb",2,u(100)),cyan:c("cmyk",0,u(100)),magenta:c("cmyk",1,u(100)),yellow:c("cmyk",2,u(100)),black:c("cmyk",3,u(100)),x:c("xyz",0,u(95.047)),y:c("xyz",1,u(100)),z:c("xyz",2,u(108.833)),l:c("lab",0,u(100)),a:c("lab",1),b:c("lab",2),keyword(t){return void 0!==t?new i(t):n[this.model].keyword(this.color)},hex(t){return void 0!==t?new i(t):e.to.hex(this.rgb().round().color)},hexa(t){if(void 0!==t)return new i(t);const r=this.rgb().round().color;let o=Math.round(255*this.valpha).toString(16).toUpperCase();return 1===o.length&&(o="0"+o),e.to.hex(r)+o},rgbNumber(){const t=this.rgb().color;return(255&t[0])<<16|(255&t[1])<<8|255&t[2]},luminosity(){const t=this.rgb().color,r=[];for(const[o,e]of t.entries()){const t=e/255;r[o]=t<=.04045?t/12.92:((t+.055)/1.055)**2.4}return.2126*r[0]+.7152*r[1]+.0722*r[2]},contrast(t){const r=this.luminosity(),o=t.luminosity();return r>o?(r+.05)/(o+.05):(o+.05)/(r+.05)},level(t){const r=this.contrast(t);return r>=7?"AAA":r>=4.5?"AA":""},isDark(){const t=this.rgb().color;return(2126*t[0]+7152*t[1]+722*t[2])/1e4<128},isLight(){return!this.isDark()},negate(){const t=this.rgb();for(let r=0;r<3;r++)t.color[r]=255-t.color[r];return t},lighten(t){const r=this.hsl();return r.color[2]+=r.color[2]*t,r},darken(t){const r=this.hsl();return r.color[2]-=r.color[2]*t,r},saturate(t){const r=this.hsl();return r.color[1]+=r.color[1]*t,r},desaturate(t){const r=this.hsl();return r.color[1]-=r.color[1]*t,r},whiten(t){const r=this.hwb();return r.color[1]+=r.color[1]*t,r},blacken(t){const r=this.hwb();return r.color[2]+=r.color[2]*t,r},grayscale(){const t=this.rgb().color,r=.3*t[0]+.59*t[1]+.11*t[2];return i.rgb(r,r,r)},fade(t){return this.alpha(this.valpha-this.valpha*t)},opaquer(t){return this.alpha(this.valpha+this.valpha*t)},rotate(t){const r=this.hsl();let o=r.color[0];return o=(o+t)%360,o=o<0?360+o:o,r.color[0]=o,r},mix(t,r){if(!t||!t.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof t);const o=t.rgb(),e=this.rgb(),n=void 0===r?.5:r,s=2*n-1,l=o.alpha()-e.alpha(),h=((s*l==-1?s:(s+l)/(1+s*l))+1)/2,a=1-h;return i.rgb(h*o.red()+a*e.red(),h*o.green()+a*e.green(),h*o.blue()+a*e.blue(),o.alpha()*n+e.alpha()*(1-n))}};for(const m of Object.keys(n)){if(s.includes(m))continue;const{channels:t}=n[m];i.prototype[m]=function(...t){return this.model===m?new i(this):t.length>0?new i(t,m):new i([...(r=n[this.model][m].raw(this.color),Array.isArray(r)?r:[r]),this.valpha],m);var r},i[m]=function(...r){let o=r[0];return"number"==typeof o&&(o=p(r,t)),new i(o,m)}}function a(t){return function(r){return function(t,r){return Number(t.toFixed(r))}(r,t)}}function c(t,r,o){t=Array.isArray(t)?t:[t];for(const e of t)(h[e]||(h[e]=[]))[r]=o;return t=t[0],function(e){let n;return void 0!==e?(o&&(e=o(e)),n=this[t](),n.color[r]=e,n):(n=this[t]().color[r],o&&(n=o(n)),n)}}function u(t){return function(r){return Math.max(0,Math.min(t,r))}}function p(t,r){for(let o=0;o<r;o++)"number"!=typeof t[o]&&(t[o]=0);return t}const b=t(i);export{b as _};
