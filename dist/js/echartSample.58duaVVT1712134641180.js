import{a0 as m,a as c,an as T,ao as b,o as u,c as x,X as e,ap as w,K as f,a8 as A,r as B,v as N,D,ab as G}from"./vendor.FpHYsbG41712134641180.js";import{i as v,L as p}from"./index.g9mYw8GE1712134641180.js";const I=["scale"],O=["side","map"],C=1024,M=768,E=m({__name:"spriteChart",setup(_){const o=[.006,.005],s=c("canvas",{width:C,height:M,style:{}});T(s,document.createElement("div"));const a=v(s.el,"dark"),t={color:["#80FFA5","#00DDFF","#37A2FF","#FF0087","#FFBF00"],title:{text:"Gradient Stacked Area Chart",padding:20},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},legend:{data:["Line 1","Line 2","Line 3","Line 4","Line 5"],padding:[20,0]},grid:{left:"30",right:"30",bottom:"30",top:"60",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],yAxis:[{type:"value"}],series:[{name:"Line 1",type:"line",stack:"Total",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new p(0,0,0,1,[{offset:0,color:"rgb(128, 255, 165)"},{offset:1,color:"rgb(1, 191, 236)"}])},emphasis:{focus:"series"},data:[140,232,101,264,90,340,250]},{name:"Line 2",type:"line",stack:"Total",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new p(0,0,0,1,[{offset:0,color:"rgb(0, 221, 255)"},{offset:1,color:"rgb(77, 119, 255)"}])},emphasis:{focus:"series"},data:[120,282,111,234,220,340,310]},{name:"Line 3",type:"line",stack:"Total",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new p(0,0,0,1,[{offset:0,color:"rgb(55, 162, 255)"},{offset:1,color:"rgb(116, 21, 219)"}])},emphasis:{focus:"series"},data:[320,132,201,334,190,130,220]},{name:"Line 4",type:"line",stack:"Total",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new p(0,0,0,1,[{offset:0,color:"rgb(255, 0, 135)"},{offset:1,color:"rgb(135, 0, 157)"}])},emphasis:{focus:"series"},data:[220,402,231,134,190,230,120]},{name:"Line 5",type:"line",stack:"Total",smooth:!0,lineStyle:{width:0},showSymbol:!1,label:{show:!0,position:"top"},areaStyle:{opacity:.8,color:new p(0,0,0,1,[{offset:0,color:"rgb(255, 191, 0)"},{offset:1,color:"rgb(224, 62, 76)"}])},emphasis:{focus:"series"},data:[220,302,181,234,210,290,150]}]};a.setOption(t);const r=new b(s.el);return a.on("finished",()=>{r.needsUpdate=!0}),(n,l)=>(u(),x("TresSprite",{scale:[C*o[0],M*o[1],1]},[e("TresSpriteMaterial",{transparent:"",side:w,map:f(r)},null,8,O)],8,I))}}),P=["scale"],U=e("TresPlaneGeometry",{args:[1,1]},null,-1),W=["side","map"],L=1024,$=768,V=m({__name:"meshChart",setup(_){const o=[.006,.006],s=c("canvas",{width:L,height:$,style:{}});T(s,document.createElement("div"));const a=v(s.el,"dark"),t={backgroundColor:"transparent",legend:{top:"bottom",padding:[0,0,30,0]},tooltip:{trigger:"item"},series:[{name:"Nightingale Chart",type:"pie",radius:[50,250],center:["50%","50%"],roseType:"area",itemStyle:{borderRadius:8},data:[{value:40,name:"rose 1"},{value:38,name:"rose 2"},{value:32,name:"rose 3"},{value:30,name:"rose 4"},{value:28,name:"rose 5"},{value:26,name:"rose 6"},{value:22,name:"rose 7"},{value:18,name:"rose 8"}]}]};a.setOption(t);let r=!1;const n=new b(s.el);a.on("finished",()=>{r=!0,n.needsUpdate=!0});const{onLoop:l}=A(),y=t.series[0].data.length;let i=0,d=0;return l(()=>{r&&d++%60===0&&(a.dispatchAction({type:"downplay",seriesIndex:0,dataIndex:i}),i=(i+1)%y,a.dispatchAction({type:"highlight",seriesIndex:0,dataIndex:i}),a.dispatchAction({type:"showTip",seriesIndex:0,dataIndex:i}),n.needsUpdate=!0)}),(g,S)=>(u(),x("TresMesh",{scale:[L*o[0],$*o[1],1]},[U,e("TresMeshBasicMaterial",{transparent:"",side:w,map:f(n),depthWrite:!1},null,8,W)],8,P))}}),z=["scale"],K=e("TresPlaneGeometry",{args:[1,1]},null,-1),R=["side","map"],k=1024,F=768,X=m({__name:"animationChart",setup(_){for(var o=[],s=[],a=[],t=0;t<100;t++)o.push("A"+t),s.push((Math.sin(t/5)*(t/5-10)+t/6)*5),a.push((Math.cos(t/5)*(t/5-10)+t/6)*5);const r=[.006,.006],n=c("canvas",{width:k,height:F,style:{}});T(n,document.createElement("div"));const l=v(n.el,"dark"),y={title:{text:"Bar Animation Delay",padding:20},legend:{data:["bar","bar2"],padding:20},xAxis:{data:o,splitLine:{show:!1}},yAxis:{},series:[{name:"bar",type:"bar",data:s,emphasis:{focus:"series"},animationDelay:function(h){return h*10}},{name:"bar2",type:"bar",data:a,emphasis:{focus:"series"},animationDelay:function(h){return h*10+100}}],animationEasing:"elasticOut"},i=new b(n.el);let d=!1;const g=()=>{d=!1,l.off("finished"),l.clear(),l.on("finished",()=>{d=!0}),l.setOption(y)};g();const{onLoop:S}=A();return S(()=>{d?g():i.needsUpdate=!0}),(h,Q)=>(u(),x("TresMesh",{scale:[k*r[0],F*r[1],1]},[K,e("TresMeshBasicMaterial",{transparent:"",side:w,map:f(i),depthWrite:!1},null,8,R)],8,z))}}),j=e("TresPerspectiveCamera",{position:[2,-6,12]},null,-1),q=e("TresMesh",{position:[-2.5,-1,-1]},[e("TresBoxGeometry"),e("TresMeshNormalMaterial")],-1),H=e("TresMesh",{position:[2.5,-.6,-1]},[e("TresBoxGeometry"),e("TresMeshNormalMaterial")],-1),J=e("TresMesh",{position:[1,-7,-1]},[e("TresBoxGeometry"),e("TresMeshNormalMaterial")],-1),ee=m({__name:"echartSample",setup(_){return(o,s)=>{const a=B("TresCanvas");return u(),N(a,{clearColor:"#000000","window-size":""},{default:D(()=>[j,c(f(G)),q,c(E,{position:[-2.5,1,-1]}),H,c(V,{position:[2.5,2,-1],renderOrder:1}),J,c(X,{position:[1.5,-4,-1],renderOrder:2})]),_:1})}}});export{ee as default};