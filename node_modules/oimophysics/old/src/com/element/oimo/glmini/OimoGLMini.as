/* Copyright (c) 2012-2013 EL-EMENT saharan
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation  * files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy,  * modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to
 * whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
 * ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package com.element.oimo.glmini {
	import com.adobe.utils.AGALMiniAssembler;
	import com.element.oimo.math.Mat44;
	import com.element.oimo.math.Vec3;
	import flash.display3D.Context3D;
	import flash.display3D.IndexBuffer3D;
	import flash.display3D.Program3D;
	import flash.display3D.VertexBuffer3D;
	import flash.utils.ByteArray;
	
	/**
	 * A simple 3d engine.
	 * @author saharan
	 */
	public class OimoGLMini {
		private static const VERTEX_POISITION_INDEX:uint = 0;
		private static const VERTEX_NORMAL_INDEX:uint = 1;
		private static const FRAGMENT_COLOR_INDEX:uint = 0;
		private static const FRAGMENT_AMB_DIF_EMI_INDEX:uint = 1;
		private static const FRAGMENT_SPC_SHN_INDEX:uint = 2;
		private static const FRAGMENT_AMB_LIGHT_COLOR_INDEX:uint = 3;
		private static const FRAGMENT_DIR_LIGHT_COLOR_INDEX:uint = 4;
		private static const FRAGMENT_DIR_LIGHT_DIRECTION_INDEX:uint = 5;
		private static const FRAGMENT_CAMERA_POSITION_INDEX:uint = 6;
		private var c3d:Context3D;
		private var w:uint;
		private var h:uint;
		private var aspect:Number;
		private var worldM:Mat44;
		private var viewM:Mat44;
		private var projM:Mat44;
		private var viewProjM:Mat44;
		private var up:Vector.<Number>;
		private var stackM:Vector.<Mat44>;
		private var numStack:uint;
		private var vertexB:Vector.<VertexBuffer3D>;
		private var numVerticesB:Vector.<uint>;
		private var indexB:Vector.<IndexBuffer3D>;
		private var numIndicesB:Vector.<uint>;
		
		public function OimoGLMini(c3d:Context3D, w:uint, h:uint, antiAlias:uint = 0) {
			this.c3d = c3d;
			c3d.configureBackBuffer(w, h, antiAlias, true);
			c3d.setBlendFactors("sourceAlpha", "oneMinusSourceAlpha");
			c3d.setCulling("front"); // ClockWise
			this.w = w;
			this.h = h;
			aspect = w / h;
			worldM = new Mat44();
			viewM = new Mat44();
			projM = new Mat44();
			viewProjM = new Mat44();
			up = new Vector.<Number>(4, true);
			stackM = new Vector.<Mat44>(256, true);
			vertexB = new Vector.<VertexBuffer3D>(256, true);
			numVerticesB = new Vector.<uint>(256, true);
			indexB = new Vector.<IndexBuffer3D>(256, true);
			numIndicesB = new Vector.<uint>(256, true);
			numStack = 0;
			var program:Program3D = c3d.createProgram();
			var vs:AGALMiniAssembler = new AGALMiniAssembler();
			vs.assemble("vertex", createBasicVertexShaderCode(VERTEX_POISITION_INDEX, VERTEX_NORMAL_INDEX));
			var fs:AGALMiniAssembler = new AGALMiniAssembler();
			fs.assemble("fragment",
				createBasicFragmentShaderCode(
					VERTEX_POISITION_INDEX, VERTEX_NORMAL_INDEX,
					FRAGMENT_COLOR_INDEX, FRAGMENT_AMB_DIF_EMI_INDEX, FRAGMENT_SPC_SHN_INDEX,
					FRAGMENT_AMB_LIGHT_COLOR_INDEX, FRAGMENT_DIR_LIGHT_COLOR_INDEX, FRAGMENT_DIR_LIGHT_DIRECTION_INDEX,
					FRAGMENT_CAMERA_POSITION_INDEX
				)
			);
			program.upload(vs.agalcode, fs.agalcode);
			c3d.setProgram(program);
			material(1, 1, 0, 0, 0);
			color(1, 1, 1);
			ambientLightColor(0.2, 0.2, 0.2);
			directionalLightColor(0.8, 0.8, 0.8);
			directionalLightDirection(0, 0, -1);
			camera(0, 0, 100, 0, 0, 0, 0, 1, 0);
			perspective(Math.PI / 3);
		}
		
		public function material(
			ambient:Number, diffuse:Number, emission:Number,
			specular:Number, shininess:Number
		):void {
			setProgramConstantsNumber("fragment", FRAGMENT_AMB_DIF_EMI_INDEX, ambient, diffuse, emission, 1);
			setProgramConstantsNumber("fragment", FRAGMENT_SPC_SHN_INDEX, specular, shininess, 0, 1);
		}
		
		public function color(r:Number, g:Number, b:Number, a:Number = 1):void {
			setProgramConstantsNumber("fragment", FRAGMENT_COLOR_INDEX, r, g, b, a);
		}
		
		public function ambientLightColor(r:Number, g:Number, b:Number):void {
			setProgramConstantsNumber("fragment", FRAGMENT_AMB_LIGHT_COLOR_INDEX, r, g, b, 1);
		}
		
		public function directionalLightColor(r:Number, g:Number, b:Number):void {
			setProgramConstantsNumber("fragment", FRAGMENT_DIR_LIGHT_COLOR_INDEX, r, g, b, 1);
		}
		
		public function directionalLightDirection(x:Number, y:Number, z:Number):void {
			setProgramConstantsNumber("fragment", FRAGMENT_DIR_LIGHT_DIRECTION_INDEX, x, y, z, 1);
		}
		
		public function camera(
			eyeX:Number, eyeY:Number, eyeZ:Number,
			atX:Number, atY:Number, atZ:Number,
			upX:Number, upY:Number, upZ:Number
		):void {
			setProgramConstantsNumber("fragment", FRAGMENT_CAMERA_POSITION_INDEX, eyeX, eyeY, eyeZ, 1);
			viewM.lookAt(eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ);
		}
		
		public function perspective(fovY:Number, near:Number = 0.5, far:Number = 10000):void {
			projM.perspective(fovY, aspect, near, far);
		}
		
		public function beginScene(r:Number, g:Number, b:Number):void {
			worldM.init();
			c3d.clear(r, g, b);
		}
		
		public function endScene():void {
			c3d.present();
		}
		
		public function registerBox(bufferIndex:uint, width:Number, height:Number, depth:Number):void {
			width *= 0.5;
			height *= 0.5;
			depth *= 0.5;
			registerBuffer(bufferIndex, 24, 36);
			uploadVertexBuffer(bufferIndex, Vector.<Number>([
				-width, height, -depth, // top face
				-width, height, depth,
				width, height, depth,
				width, height, -depth,
				-width, -height, -depth, // bottom face
				width, -height, -depth,
				width, -height, depth,
				-width, -height, depth,
				-width, height, -depth, // left face
				-width, -height, -depth,
				-width, -height, depth,
				-width, height, depth,
				width, height, -depth, // right face
				width, height, depth,
				width, -height, depth,
				width, -height, -depth,
				-width, height, depth, // front face
				-width, -height, depth,
				width, -height, depth,
				width, height, depth,
				-width, height, -depth, // back face
				width, height, -depth,
				width, -height, -depth,
				-width, -height, -depth
			]), Vector.<Number>([
				0, 1, 0, // top face
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, -1, 0, // bottom face
				0, -1, 0,
				0, -1, 0,
				0, -1, 0,
				-1, 0, 0, // left face
				-1, 0, 0,
				-1, 0, 0,
				-1, 0, 0,
				1, 0, 0, // right face
				1, 0, 0,
				1, 0, 0,
				1, 0, 0,
				0, 0, 1, // front face
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, -1, // back face
				0, 0, -1,
				0, 0, -1,
				0, 0, -1
			]));
			uploadIndexBuffer(bufferIndex, Vector.<uint>([
				0, 1, 2, // top face
				0, 2, 3,
				4, 5, 6, // bottom face
				4, 6, 7,
				8, 9, 10, // left face
				8, 10, 11,
				12, 13, 14, // right face
				12, 14, 15,
				16, 17, 18, // front face
				16, 18, 19,
				20, 21, 22, // back face
				20, 22, 23
			]));
		}
		
		public function registerSphere(bufferIndex:uint, radius:Number, divisionH:uint, divisionV:uint):void {
			var count:uint = 0;
			var theta:Number;
			var phi:Number;
			var dTheta:Number = Math.PI * 2 / divisionH;
			var dPhi:Number = Math.PI / divisionV;
			var numVertices:uint = (divisionV + 1) * divisionH - ((divisionH - 1) << 1);
			var numFaces:uint = (divisionV - 1 << 1) * divisionH;
			var vtx:Vector.<Number> = new Vector.<Number>(numVertices * 3, true);
			var nrm:Vector.<Number> = new Vector.<Number>(numVertices * 3, true);
			vtx[count] = 0;
			vtx[count + 1] = radius;
			vtx[count + 2] = 0;
			nrm[count] = 0;
			nrm[count + 1] = 1;
			nrm[count + 2] = 0;
			count += 3;
			phi = dPhi;
			for (var i:int = 1; i < divisionV; i++) {
				theta = 0;
				for (var j:int = 0; j < divisionH; j++) {
					var sp:Number = Math.sin(phi);
					var cp:Number = Math.cos(phi);
					var st:Number = Math.sin(theta);
					var ct:Number = Math.cos(theta);
					vtx[count] = radius * sp * ct;
					vtx[count + 1] = radius * cp;
					vtx[count + 2] = radius * sp * st;
					nrm[count] = sp * ct;
					nrm[count + 1] = cp;
					nrm[count + 2] = sp * st;
					count += 3;
					theta += dTheta;
				}
				phi += dPhi;
			}
			vtx[count] = 0;
			vtx[count + 1] = -radius;
			vtx[count + 2] = 0;
			nrm[count] = 0;
			nrm[count + 1] = -1;
			nrm[count + 2] = 0;
			var idx:Vector.<uint> = new Vector.<uint>(numFaces * 3, true);
			count = 0;
			for (i = 0; i < divisionV; i++) {
				for (j = 0; j < divisionH; j++) {
					if (i == 0) {
						idx[count] = 0;
						idx[count + 1] = (j + 1) % divisionH + 1;
						idx[count + 2] = j + 1;
						count += 3;
					} else if (i == divisionV - 1) {
						idx[count] = numVertices - 1;
						idx[count + 1] = (i - 1) * divisionH + j + 1;
						idx[count + 2] = (i - 1) * divisionH + (j + 1) % divisionH + 1;
						count += 3;
					} else {
						idx[count] = (i - 1) * divisionH + j + 1;
						idx[count + 1] = (i - 1) * divisionH + (j + 1) % divisionH + 1;
						idx[count + 2] = i * divisionH + (j + 1) % divisionH + 1;
						count += 3;
						idx[count] = (i - 1) * divisionH + j + 1;
						idx[count + 1] = i * divisionH + (j + 1) % divisionH + 1;
						idx[count + 2] = i * divisionH + j + 1;
						count += 3;
					}
				}
			}
			registerBuffer(bufferIndex, numVertices, numFaces * 3);
			uploadVertexBuffer(bufferIndex, vtx, nrm);
			uploadIndexBuffer(bufferIndex, idx);
		}
		
		public function registerCylinder(bufferIndex:uint, radius:Number, height:Number, division:uint):void {
			height *= 0.5;
			var count:uint = 0;
			var theta:Number;
			var dTheta:Number = Math.PI * 2 / division;
			var numVertices:uint = (division << 2) + 2;
			var numFaces:uint = division << 2;
			var vtx:Vector.<Number> = new Vector.<Number>(numVertices * 3, true);
			var nrm:Vector.<Number> = new Vector.<Number>(numVertices * 3, true);
			vtx[count] = 0;
			vtx[count + 1] = height;
			vtx[count + 2] = 0;
			nrm[count] = 0;
			nrm[count + 1] = 1;
			nrm[count + 2] = 0;
			count += 3;
			theta = 0;
			for (var i:int = 0; i < division; i++) {
				var st:Number = Math.sin(theta);
				var ct:Number = Math.cos(theta);
				var off:uint = (i + 1) * 3;
				vtx[off] = radius * ct;
				vtx[off + 1] = height;
				vtx[off + 2] = radius * st;
				nrm[off] = 0;
				nrm[off + 1] = 1;
				nrm[off + 2] = 0;
				off += division * 3;
				vtx[off] = radius * ct;
				vtx[off + 1] = height;
				vtx[off + 2] = radius * st;
				nrm[off] = ct;
				nrm[off + 1] = 0;
				nrm[off + 2] = st;
				off += division * 3;
				vtx[off] = radius * ct;
				vtx[off + 1] = -height;
				vtx[off + 2] = radius * st;
				nrm[off] = ct;
				nrm[off + 1] = 0;
				nrm[off + 2] = st;
				off += division * 3;
				vtx[off] = radius * ct;
				vtx[off + 1] = -height;
				vtx[off + 2] = radius * st;
				nrm[off] = 0;
				nrm[off + 1] = -1;
				nrm[off + 2] = 0;
				count += 12;
				theta += dTheta;
			}
			vtx[count] = 0;
			vtx[count + 1] = -height;
			vtx[count + 2] = 0;
			nrm[count] = 0;
			nrm[count + 1] = -1;
			nrm[count + 2] = 0;
			count = 0;
			var idx:Vector.<uint> = new Vector.<uint>(numFaces * 3, true);
			for (i = 0; i < division; i++) {
				idx[count] = 0;
				idx[count + 1] = (i + 1) % division + 1;
				idx[count + 2] = i + 1;
				count += 3;
				off = division + 1;
				idx[count] = off + i;
				idx[count + 1] = off + (i + 1) % division;
				idx[count + 2] = off + (i + 1) % division + division;
				count += 3;
				idx[count] = off + i;
				idx[count + 1] = off + (i + 1) % division + division;
				idx[count + 2] = off + i + division;
				count += 3;
				off = division * 3 + 1;
				idx[count] = off + division;
				idx[count + 1] = off + i;
				idx[count + 2] = off + (i + 1) % division;
				count += 3;
			}
			registerBuffer(bufferIndex, numVertices, numFaces * 3);
			uploadVertexBuffer(bufferIndex, vtx, nrm);
			uploadIndexBuffer(bufferIndex, idx);
		}
		
		public function registerBuffer(bufferIndex:uint, numVertices:uint, numIndices:uint):void {
			if (vertexB[bufferIndex]) {
				vertexB[bufferIndex].dispose();
				indexB[bufferIndex].dispose();
			}
			vertexB[bufferIndex] = c3d.createVertexBuffer(numVertices, 6);
			numVerticesB[bufferIndex] = numVertices;
			indexB[bufferIndex] = c3d.createIndexBuffer(numIndices);
			numIndicesB[bufferIndex] = numIndices;
		}
		
		public function uploadVertexBuffer(bufferIndex:uint, vertices:Vector.<Number>, normals:Vector.<Number>):void {
			var numVertices:uint = numVerticesB[bufferIndex];
			var arrayCount:uint = numVertices * 3;
			var upload:Vector.<Number> = new Vector.<Number>(arrayCount << 1, true);
			var num:uint = 0;
			for (var i:int = 0; i < arrayCount; i += 3) {
				upload[num++] = vertices[i];
				upload[num++] = vertices[i + 1];
				upload[num++] = vertices[i + 2];
				upload[num++] = normals[i];
				upload[num++] = normals[i + 1];
				upload[num++] = normals[i + 2];
			}
			vertexB[bufferIndex].uploadFromVector(upload, 0, numVertices);
		}
		
		public function uploadIndexBuffer(bufferIndex:uint, indices:Vector.<uint>):void {
			indexB[bufferIndex].uploadFromVector(indices, 0, numIndicesB[bufferIndex]);
		}
		
		public function drawTriangles(bufferIndex:uint):void {
			c3d.setVertexBufferAt(0, vertexB[bufferIndex], 0, "float3");
			c3d.setVertexBufferAt(1, vertexB[bufferIndex], 3, "float3");
			setProgramConstantsMatrix("vertex", 0, worldM);
			viewProjM.mul(projM, viewM);
			setProgramConstantsMatrix("vertex", 4, viewProjM);
			c3d.drawTriangles(indexB[bufferIndex]);
		}
		
		public function translate(tx:Number, ty:Number, tz:Number):void {
			worldM.mulTranslate(worldM, tx, ty, tz);
		}
		
		public function scale(sx:Number, sy:Number, sz:Number):void {
			worldM.mulScale(worldM, sx, sy, sz);
		}
		
		public function rotate(rad:Number, ax:Number, ay:Number, az:Number):void {
			worldM.mulRotate(worldM, rad, ax, ay, az);
		}
		
		public function transform(m:Mat44):void {
			worldM.mul(worldM, m);
		}
		
		public function push():void {
			if (numStack < 256) {
				if (!stackM[numStack]) stackM[numStack] = new Mat44();
				stackM[numStack++].copy(worldM);
			} else {
				throw new Error("too many stacks.");
			}
		}
		
		public function pop():void {
			if (numStack > 0) {
				worldM.copy(stackM[--numStack]);
			} else {
				throw new Error("there is no stack.");
			}
		}
		
		public function loadWorldMatrix(m:Mat44):void {
			worldM.copy(m);
		}
		
		public function loadViewMatrix(m:Mat44):void {
			viewM.copy(m);
		}
		
		public function loadProjectionMatrix(m:Mat44):void {
			projM.copy(m);
		}
		
		public function getWorldMatrix(m:Mat44):void {
			m.copy(worldM);
		}
		
		public function getViewMatrix(m:Mat44):void {
			m.copy(viewM);
		}
		
		public function getProjectionMatrix(m:Mat44):void {
			m.copy(projM);
		}
		
		private function setProgramConstantsMatrix(type:String, index:uint, m:Mat44):void {
			up[0] = m.e00; up[1] = m.e01; up[2] = m.e02; up[3] = m.e03;
			c3d.setProgramConstantsFromVector(type, index, up);
			up[0] = m.e10; up[1] = m.e11; up[2] = m.e12; up[3] = m.e13;
			c3d.setProgramConstantsFromVector(type, index + 1, up);
			up[0] = m.e20; up[1] = m.e21; up[2] = m.e22; up[3] = m.e23;
			c3d.setProgramConstantsFromVector(type, index + 2, up);
			up[0] = m.e30; up[1] = m.e31; up[2] = m.e32; up[3] = m.e33;
			c3d.setProgramConstantsFromVector(type, index + 3, up);
		}
		
		private function setProgramConstantsNumber(type:String, index:uint, x:Number, y:Number, z:Number, w:Number):void {
			up[0] = x; up[1] = y; up[2] = z; up[3] = w;
			c3d.setProgramConstantsFromVector(type, index, up);
		}
		
		private function createBasicVertexShaderCode(vertexPositionIndex:uint, vertexNormalIndex:uint):String {
			var pos:String = "v" + vertexPositionIndex;
			var nor:String = "v" + vertexNormalIndex;
			var code:String =
				"m44 vt0, va0, vc0; \n" +
				"mov " + pos + ", vt0; \n" +
				"m44 op, vt0, vc4; \n" +
				"m33 vt0.xyz, va1, vc0; \n" +
				"nrm vt0.xyz, vt0.xyz; \n" +
				"mov " + nor + " vt0; \n"
			;
			return code;
		}
		
		private function createBasicFragmentShaderCode(
			vertexPositionIndex:uint, vertexNormalIndex:uint,
			programColorIndex:uint, programAmbDifEmiIndex:uint, programSpcShnIndex:uint,
			programAmbLightColorIndex:uint, programDirLightColorIndex:uint, programDirLightDirectionIndex:uint,
			programCameraPosIndex:uint
		):String {
			var pos:String = "v" + vertexPositionIndex;
			var nor:String = "v" + vertexNormalIndex;
			var col:String = "fc" + programColorIndex;
			var mat:String = "fc" + programAmbDifEmiIndex;
			var spc:String = "fc" + programSpcShnIndex;
			var alc:String = "fc" + programAmbLightColorIndex;
			var dlc:String = "fc" + programDirLightColorIndex;
			var dld:String = "fc" + programDirLightDirectionIndex;
			var cam:String = "fc" + programCameraPosIndex;
			var code:String =
				"nrm ft1.xyz, " + nor + ".xyz \n" +			// ft1 = normal
				"mov ft2, " + col + " \n" +					// ft2 = col
				"mul ft0, ft2, " + alc + " \n" +			// ft0 = ambColor
				"mul ft0, ft0.xyz, " + mat + ".xxx \n" +	// ft0 = ft0 * ambFactor
				"mul ft3, ft2.xyz, " + mat + ".zzz \n" +	// ft3 = col * emiFactor
				"add ft0, ft0, ft3 \n" +					// ft0 = ft0 + ft3
				"mul ft3, ft2, " + dlc + " \n" +			// ft3 = dirColor
				"mul ft3, ft3.xyz, " + mat + ".yyy \n" +	// ft3 = ft2 * dirFactor
				"mov ft4, " + dld + " \n" +					// ft4 = lightDir
				"neg ft4, ft4 \n" +							// ft4 = -ft4
				"nrm ft4.xyz, ft4.xyz \n" +					// ft4 = nrm(ft4)
				"dp3 ft0.w, ft1.xyz, ft4.xyz \n" +			// dot = normal * lightDir
				"sat ft0.w, ft0.w \n" +						// dot = sat(dot)
				"mul ft3, ft3.xyz, ft0.www \n" +			// ft3 = ft3 * dot
				"add ft0, ft0, ft3 \n" +					// ft0 = ft0 + ft3
				"mul ft3, ft1.xyz, ft0.www \n" +			// ft3 = normal * dot
				"add ft3, ft3, ft3 \n" +					// ft3 = ft3 * 2
				"sub ft3, ft3, ft4 \n" +					// ft3 = ft3 - lightDir
				"nrm ft3.xyz, ft3.xyz \n" +					// ft3 = nrm(ft3)
				"mov ft5, " + cam + " \n" +					// ft5 = cam
				"sub ft5, ft5, " + pos + " \n" +			// ft5 = ft5 - pos
				"nrm ft5.xyz, ft5.xyz \n" +					// ft5 = nrm(ft5)
				"dp3 ft3.w, ft3.xyz, ft5.xyz \n" +			// ref = ft3 * ft5
				"sat ft3.w, ft3.w \n" +						// ref = sat(ref)
				"pow ft3.w, ft3.w, " + spc + ".yyy \n" +	// ref = ref ^ shn
				"mul ft3, ft3.www, " + dlc + ".xyz \n" +	// rfc = ref * dirColor
				"mul ft3, ft3, " + spc + ".xxx \n" +		// rfc = rfc * spc
				"sub ft3.w, ft3.w, ft3.w \n" +				// zer = zer - zer
				"slt ft3.w, ft3.w, ft0.w \n" +				// zer = zer < dot ? 1 : 0
				"mul ft3, ft3, ft3.www \n" +				// rfc = rfc * zer
				"add ft0, ft0, ft3 \n" +					// ft0 = ft0 + rfc
				"mov ft0.w, ft2.w \n" +						// ft0 = alp
				"mov oc, ft0 \n"							// col = ft0
			;
			return code;
		}
		
	}
	
}