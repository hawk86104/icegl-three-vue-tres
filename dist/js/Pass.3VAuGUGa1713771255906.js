import{aG as r,aw as a,au as i,bA as t}from"./vendor.wQOtmNrU1713771255906.js";class l{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const n=new r(-1,1,1,-1,0,1);class o extends i{constructor(){super(),this.setAttribute("position",new t([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new t([0,2,0,0,2,0],2))}}const h=new o;class u{constructor(e){this._mesh=new a(h,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,n)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}export{u as F,l as P};
