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
package com.element.oimo.physics.collision.narrowphase {
	import com.element.oimo.math.Vec3;
	import com.element.oimo.physics.collision.shape.BoxShape;
	import com.element.oimo.physics.collision.shape.Shape;
	import com.element.oimo.physics.collision.shape.SphereShape;
	import com.element.oimo.physics.constraint.contact.ContactManifold;
	/**
	 * A collision detector which detects collisions between two boxes.
	 * @author saharan
	 */
	public class BoxBoxCollisionDetector extends CollisionDetector {
		private var clipVertices1:Vector.<Number>;
		private var clipVertices2:Vector.<Number>;
		private var used:Vector.<Boolean>;
		private const INF:Number = 1 / 0;
		
		public function BoxBoxCollisionDetector() {
			clipVertices1 = new Vector.<Number>(24, true); // 8 vertices x,y,z
			clipVertices2 = new Vector.<Number>(24, true);
			used = new Vector.<Boolean>(8, true);
		}
		
		/**
		 * @inheritDoc
		 */
		override public function detectCollision(shape1:Shape, shape2:Shape, manifold:ContactManifold):void {
			// -------------------------------
			// やってること
			// ・15個の分離軸を用意する
			//   ・双方の箱のxyz方向の法線ベクトルを3つずつで6個
			//   ・残りは箱1の辺と箱2の辺に垂直なベクトルを3x3で9個
			// ・分離軸に対して深度を計算
			//   ・内積を使って距離を計算し、めり込み量を出す
			//   ・ただし辺と垂直な分離軸は振動を避けるため多少の重みをつける
			//   ・一つでも離れている分離軸があったら終了
			// ・一番めり込みの少ない分離軸を探す
			//   ・最初の6個の分離軸なら面-面衝突
			//   ・それ以外の9個の分離軸なら辺-辺衝突
			// ・辺-辺衝突の場合
			//   ・分離軸を作った2辺上の点を探す
			//   ・求めた点と分離軸からなる直線の最接近点を計算し、衝突点とする
			// ・面-面衝突の場合
			//   ・分離軸を作ったほうの箱を箱A、他を箱Bとする
			//   ・箱Aの分離軸を作った面を面Aとし、分離軸に対して最も逆向きに近い箱Bの面を面Bとする
			//   ・面Aを正面から見たときに、面Bが面Aの領域からはみ出た部分を切り取る
			//   ・面Bは3～8角形になるので、面Bの頂点を衝突点の候補とする
			//   ・5つ以上の候補が存在した場合は、4つまで削る
			//   ・全ての衝突点の候補に対し、面Aとの距離を調べる
			//   ・面Aの内側にあった場合は、衝突点とする
			// -------------------------------
			var b1:BoxShape;
			var b2:BoxShape;
			if (shape1.id < shape2.id) {
				b1 = BoxShape(shape1);
				b2 = BoxShape(shape2);
			} else {
				b1 = BoxShape(shape2);
				b2 = BoxShape(shape1);
			}
			var p1:Vec3 = b1.position;
			var p2:Vec3 = b2.position;
			var p1x:Number = p1.x;
			var p1y:Number = p1.y;
			var p1z:Number = p1.z;
			var p2x:Number = p2.x;
			var p2y:Number = p2.y;
			var p2z:Number = p2.z;
			// diff
			var dx:Number = p2x - p1x;
			var dy:Number = p2y - p1y;
			var dz:Number = p2z - p1z;
			// distance
			var w1:Number = b1.halfWidth;
			var h1:Number = b1.halfHeight;
			var d1:Number = b1.halfDepth;
			var w2:Number = b2.halfWidth;
			var h2:Number = b2.halfHeight;
			var d2:Number = b2.halfDepth;
			// direction
			var d1x:Number = b1.halfDirectionWidth.x;
			var d1y:Number = b1.halfDirectionWidth.y;
			var d1z:Number = b1.halfDirectionWidth.z;
			// b1.y
			var d2x:Number = b1.halfDirectionHeight.x;
			var d2y:Number = b1.halfDirectionHeight.y;
			var d2z:Number = b1.halfDirectionHeight.z;
			// b1.z
			var d3x:Number = b1.halfDirectionDepth.x;
			var d3y:Number = b1.halfDirectionDepth.y;
			var d3z:Number = b1.halfDirectionDepth.z;
			// b2.x
			var d4x:Number = b2.halfDirectionWidth.x;
			var d4y:Number = b2.halfDirectionWidth.y;
			var d4z:Number = b2.halfDirectionWidth.z;
			// b2.y
			var d5x:Number = b2.halfDirectionHeight.x;
			var d5y:Number = b2.halfDirectionHeight.y;
			var d5z:Number = b2.halfDirectionHeight.z;
			// b2.z
			var d6x:Number = b2.halfDirectionDepth.x;
			var d6y:Number = b2.halfDirectionDepth.y;
			var d6z:Number = b2.halfDirectionDepth.z;
			// ----------------------------
			// 15 separating axes
			// 1~6: face
			// 7~f: edge
			// http://marupeke296.com/COL_3D_No13_OBBvsOBB.html
			// ----------------------------
			// b1.x
			var a1x:Number = b1.normalDirectionWidth.x;
			var a1y:Number = b1.normalDirectionWidth.y;
			var a1z:Number = b1.normalDirectionWidth.z;
			// b1.y
			var a2x:Number = b1.normalDirectionHeight.x;
			var a2y:Number = b1.normalDirectionHeight.y;
			var a2z:Number = b1.normalDirectionHeight.z;
			// b1.z
			var a3x:Number = b1.normalDirectionDepth.x;
			var a3y:Number = b1.normalDirectionDepth.y;
			var a3z:Number = b1.normalDirectionDepth.z;
			// b2.x
			var a4x:Number = b2.normalDirectionWidth.x;
			var a4y:Number = b2.normalDirectionWidth.y;
			var a4z:Number = b2.normalDirectionWidth.z;
			// b2.y
			var a5x:Number = b2.normalDirectionHeight.x;
			var a5y:Number = b2.normalDirectionHeight.y;
			var a5z:Number = b2.normalDirectionHeight.z;
			// b2.z
			var a6x:Number = b2.normalDirectionDepth.x;
			var a6y:Number = b2.normalDirectionDepth.y;
			var a6z:Number = b2.normalDirectionDepth.z;
			// b1.x * b2.x
			var a7x:Number = a1y * a4z - a1z * a4y;
			var a7y:Number = a1z * a4x - a1x * a4z;
			var a7z:Number = a1x * a4y - a1y * a4x;
			// b1.x * b2.y
			var a8x:Number = a1y * a5z - a1z * a5y;
			var a8y:Number = a1z * a5x - a1x * a5z;
			var a8z:Number = a1x * a5y - a1y * a5x;
			// b1.x * b2.z
			var a9x:Number = a1y * a6z - a1z * a6y;
			var a9y:Number = a1z * a6x - a1x * a6z;
			var a9z:Number = a1x * a6y - a1y * a6x;
			// b1.y * b2.x
			var aax:Number = a2y * a4z - a2z * a4y;
			var aay:Number = a2z * a4x - a2x * a4z;
			var aaz:Number = a2x * a4y - a2y * a4x;
			// b1.y * b2.y
			var abx:Number = a2y * a5z - a2z * a5y;
			var aby:Number = a2z * a5x - a2x * a5z;
			var abz:Number = a2x * a5y - a2y * a5x;
			// b1.y * b2.z
			var acx:Number = a2y * a6z - a2z * a6y;
			var acy:Number = a2z * a6x - a2x * a6z;
			var acz:Number = a2x * a6y - a2y * a6x;
			// b1.z * b2.x
			var adx:Number = a3y * a4z - a3z * a4y;
			var ady:Number = a3z * a4x - a3x * a4z;
			var adz:Number = a3x * a4y - a3y * a4x;
			// b1.z * b2.y
			var aex:Number = a3y * a5z - a3z * a5y;
			var aey:Number = a3z * a5x - a3x * a5z;
			var aez:Number = a3x * a5y - a3y * a5x;
			// b1.z * b2.z
			var afx:Number = a3y * a6z - a3z * a6y;
			var afy:Number = a3z * a6x - a3x * a6z;
			var afz:Number = a3x * a6y - a3y * a6x;
			// right or left flags
			var right1:Boolean;
			var right2:Boolean;
			var right3:Boolean;
			var right4:Boolean;
			var right5:Boolean;
			var right6:Boolean;
			var right7:Boolean;
			var right8:Boolean;
			var right9:Boolean;
			var righta:Boolean;
			var rightb:Boolean;
			var rightc:Boolean;
			var rightd:Boolean;
			var righte:Boolean;
			var rightf:Boolean;
			// overlapping distances
			var overlap1:Number;
			var overlap2:Number;
			var overlap3:Number;
			var overlap4:Number;
			var overlap5:Number;
			var overlap6:Number;
			var overlap7:Number;
			var overlap8:Number;
			var overlap9:Number;
			var overlapa:Number;
			var overlapb:Number;
			var overlapc:Number;
			var overlapd:Number;
			var overlape:Number;
			var overlapf:Number;
			// invalid flags
			var invalid7:Boolean = false;
			var invalid8:Boolean = false;
			var invalid9:Boolean = false;
			var invalida:Boolean = false;
			var invalidb:Boolean = false;
			var invalidc:Boolean = false;
			var invalidd:Boolean = false;
			var invalide:Boolean = false;
			var invalidf:Boolean = false;
			// temporary variables
			var len:Number;
			var len1:Number;
			var len2:Number;
			var dot1:Number;
			var dot2:Number;
			var dot3:Number;
			// try axis 1
			len = a1x * dx + a1y * dy + a1z * dz;
			right1 = len > 0;
			if (!right1) len = -len;
			len1 = w1;
			dot1 = a1x * a4x + a1y * a4y + a1z * a4z;
			dot2 = a1x * a5x + a1y * a5y + a1z * a5z;
			dot3 = a1x * a6x + a1y * a6y + a1z * a6z;
			if (dot1 < 0) dot1 = -dot1;
			if (dot2 < 0) dot2 = -dot2;
			if (dot3 < 0) dot3 = -dot3;
			len2 = dot1 * w2 + dot2 * h2 + dot3 * d2;
			overlap1 = len - len1 - len2;
			if (overlap1 > 0) return;
			// try axis 2
			len = a2x * dx + a2y * dy + a2z * dz;
			right2 = len > 0;
			if (!right2) len = -len;
			len1 = h1;
			dot1 = a2x * a4x + a2y * a4y + a2z * a4z;
			dot2 = a2x * a5x + a2y * a5y + a2z * a5z;
			dot3 = a2x * a6x + a2y * a6y + a2z * a6z;
			if (dot1 < 0) dot1 = -dot1;
			if (dot2 < 0) dot2 = -dot2;
			if (dot3 < 0) dot3 = -dot3;
			len2 = dot1 * w2 + dot2 * h2 + dot3 * d2;
			overlap2 = len - len1 - len2;
			if (overlap2 > 0) return;
			// try axis 3
			len = a3x * dx + a3y * dy + a3z * dz;
			right3 = len > 0;
			if (!right3) len = -len;
			len1 = d1;
			dot1 = a3x * a4x + a3y * a4y + a3z * a4z;
			dot2 = a3x * a5x + a3y * a5y + a3z * a5z;
			dot3 = a3x * a6x + a3y * a6y + a3z * a6z;
			if (dot1 < 0) dot1 = -dot1;
			if (dot2 < 0) dot2 = -dot2;
			if (dot3 < 0) dot3 = -dot3;
			len2 = dot1 * w2 + dot2 * h2 + dot3 * d2;
			overlap3 = len - len1 - len2;
			if (overlap3 > 0) return;
			// try axis 4
			len = a4x * dx + a4y * dy + a4z * dz;
			right4 = len > 0;
			if (!right4) len = -len;
			dot1 = a4x * a1x + a4y * a1y + a4z * a1z;
			dot2 = a4x * a2x + a4y * a2y + a4z * a2z;
			dot3 = a4x * a3x + a4y * a3y + a4z * a3z;
			if (dot1 < 0) dot1 = -dot1;
			if (dot2 < 0) dot2 = -dot2;
			if (dot3 < 0) dot3 = -dot3;
			len1 = dot1 * w1 + dot2 * h1 + dot3 * d1;
			len2 = w2;
			overlap4 = (len - len1 - len2) * 1.0;
			if (overlap4 > 0) return;
			// try axis 5
			len = a5x * dx + a5y * dy + a5z * dz;
			right5 = len > 0;
			if (!right5) len = -len;
			dot1 = a5x * a1x + a5y * a1y + a5z * a1z;
			dot2 = a5x * a2x + a5y * a2y + a5z * a2z;
			dot3 = a5x * a3x + a5y * a3y + a5z * a3z;
			if (dot1 < 0) dot1 = -dot1;
			if (dot2 < 0) dot2 = -dot2;
			if (dot3 < 0) dot3 = -dot3;
			len1 = dot1 * w1 + dot2 * h1 + dot3 * d1;
			len2 = h2;
			overlap5 = (len - len1 - len2) * 1.0;
			if (overlap5 > 0) return;
			// try axis 6
			len = a6x * dx + a6y * dy + a6z * dz;
			right6 = len > 0;
			if (!right6) len = -len;
			dot1 = a6x * a1x + a6y * a1y + a6z * a1z;
			dot2 = a6x * a2x + a6y * a2y + a6z * a2z;
			dot3 = a6x * a3x + a6y * a3y + a6z * a3z;
			if (dot1 < 0) dot1 = -dot1;
			if (dot2 < 0) dot2 = -dot2;
			if (dot3 < 0) dot3 = -dot3;
			len1 = dot1 * w1 + dot2 * h1 + dot3 * d1;
			len2 = d2;
			overlap6 = (len - len1 - len2) * 1.0;
			if (overlap6 > 0) return;
			// try axis 7
			len = a7x * a7x + a7y * a7y + a7z * a7z;
			if (len > 1e-5) {
				len = 1 / Math.sqrt(len);
				a7x *= len;
				a7y *= len;
				a7z *= len;
				len = a7x * dx + a7y * dy + a7z * dz;
				right7 = len > 0;
				if (!right7) len = -len;
				dot1 = a7x * a2x + a7y * a2y + a7z * a2z;
				dot2 = a7x * a3x + a7y * a3y + a7z * a3z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len1 = dot1 * h1 + dot2 * d1;
				dot1 = a7x * a5x + a7y * a5y + a7z * a5z;
				dot2 = a7x * a6x + a7y * a6y + a7z * a6z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len2 = dot1 * h2 + dot2 * d2;
				overlap7 = len - len1 - len2;
				if (overlap7 > 0) return;
			} else {
				right7 = false;
				overlap7 = 0;
				invalid7 = true;
			}
			// try axis 8
			len = a8x * a8x + a8y * a8y + a8z * a8z;
			if (len > 1e-5) {
				len = 1 / Math.sqrt(len);
				a8x *= len;
				a8y *= len;
				a8z *= len;
				len = a8x * dx + a8y * dy + a8z * dz;
				right8 = len > 0;
				if (!right8) len = -len;
				dot1 = a8x * a2x + a8y * a2y + a8z * a2z;
				dot2 = a8x * a3x + a8y * a3y + a8z * a3z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len1 = dot1 * h1 + dot2 * d1;
				dot1 = a8x * a4x + a8y * a4y + a8z * a4z;
				dot2 = a8x * a6x + a8y * a6y + a8z * a6z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len2 = dot1 * w2 + dot2 * d2;
				overlap8 = len - len1 - len2;
				if (overlap8 > 0) return;
			} else {
				right8 = false;
				overlap8 = 0;
				invalid8 = true;
			}
			// try axis 9
			len = a9x * a9x + a9y * a9y + a9z * a9z;
			if (len > 1e-5) {
				len = 1 / Math.sqrt(len);
				a9x *= len;
				a9y *= len;
				a9z *= len;
				len = a9x * dx + a9y * dy + a9z * dz;
				right9 = len > 0;
				if (!right9) len = -len;
				dot1 = a9x * a2x + a9y * a2y + a9z * a2z;
				dot2 = a9x * a3x + a9y * a3y + a9z * a3z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len1 = dot1 * h1 + dot2 * d1;
				dot1 = a9x * a4x + a9y * a4y + a9z * a4z;
				dot2 = a9x * a5x + a9y * a5y + a9z * a5z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len2 = dot1 * w2 + dot2 * h2;
				overlap9 = len - len1 - len2;
				if (overlap9 > 0) return;
			} else {
				right9 = false;
				overlap9 = 0;
				invalid9 = true;
			}
			// try axis 10
			len = aax * aax + aay * aay + aaz * aaz;
			if (len > 1e-5) {
				len = 1 / Math.sqrt(len);
				aax *= len;
				aay *= len;
				aaz *= len;
				len = aax * dx + aay * dy + aaz * dz;
				righta = len > 0;
				if (!righta) len = -len;
				dot1 = aax * a1x + aay * a1y + aaz * a1z;
				dot2 = aax * a3x + aay * a3y + aaz * a3z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len1 = dot1 * w1 + dot2 * d1;
				dot1 = aax * a5x + aay * a5y + aaz * a5z;
				dot2 = aax * a6x + aay * a6y + aaz * a6z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len2 = dot1 * h2 + dot2 * d2;
				overlapa = len - len1 - len2;
				if (overlapa > 0) return;
			} else {
				righta = false;
				overlapa = 0;
				invalida = true;
			}
			// try axis 11
			len = abx * abx + aby * aby + abz * abz;
			if (len > 1e-5) {
				len = 1 / Math.sqrt(len);
				abx *= len;
				aby *= len;
				abz *= len;
				len = abx * dx + aby * dy + abz * dz;
				rightb = len > 0;
				if (!rightb) len = -len;
				dot1 = abx * a1x + aby * a1y + abz * a1z;
				dot2 = abx * a3x + aby * a3y + abz * a3z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len1 = dot1 * w1 + dot2 * d1;
				dot1 = abx * a4x + aby * a4y + abz * a4z;
				dot2 = abx * a6x + aby * a6y + abz * a6z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len2 = dot1 * w2 + dot2 * d2;
				overlapb = len - len1 - len2;
				if (overlapb > 0) return;
			} else {
				rightb = false;
				overlapb = 0;
				invalidb = true;
			}
			// try axis 12
			len = acx * acx + acy * acy + acz * acz;
			if (len > 1e-5) {
				len = 1 / Math.sqrt(len);
				acx *= len;
				acy *= len;
				acz *= len;
				len = acx * dx + acy * dy + acz * dz;
				rightc = len > 0;
				if (!rightc) len = -len;
				dot1 = acx * a1x + acy * a1y + acz * a1z;
				dot2 = acx * a3x + acy * a3y + acz * a3z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len1 = dot1 * w1 + dot2 * d1;
				dot1 = acx * a4x + acy * a4y + acz * a4z;
				dot2 = acx * a5x + acy * a5y + acz * a5z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len2 = dot1 * w2 + dot2 * h2;
				overlapc = len - len1 - len2;
				if (overlapc > 0) return;
			} else {
				rightc = false;
				overlapc = 0;
				invalidc = true;
			}
			// try axis 13
			len = adx * adx + ady * ady + adz * adz;
			if (len > 1e-5) {
				len = 1 / Math.sqrt(len);
				adx *= len;
				ady *= len;
				adz *= len;
				len = adx * dx + ady * dy + adz * dz;
				rightd = len > 0;
				if (!rightd) len = -len;
				dot1 = adx * a1x + ady * a1y + adz * a1z;
				dot2 = adx * a2x + ady * a2y + adz * a2z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len1 = dot1 * w1 + dot2 * h1;
				dot1 = adx * a5x + ady * a5y + adz * a5z;
				dot2 = adx * a6x + ady * a6y + adz * a6z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len2 = dot1 * h2 + dot2 * d2;
				overlapd = len - len1 - len2;
				if (overlapd > 0) return;
			} else {
				rightd = false;
				overlapd = 0;
				invalidd = true;
			}
			// try axis 14
			len = aex * aex + aey * aey + aez * aez;
			if (len > 1e-5) {
				len = 1 / Math.sqrt(len);
				aex *= len;
				aey *= len;
				aez *= len;
				len = aex * dx + aey * dy + aez * dz;
				righte = len > 0;
				if (!righte) len = -len;
				dot1 = aex * a1x + aey * a1y + aez * a1z;
				dot2 = aex * a2x + aey * a2y + aez * a2z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len1 = dot1 * w1 + dot2 * h1;
				dot1 = aex * a4x + aey * a4y + aez * a4z;
				dot2 = aex * a6x + aey * a6y + aez * a6z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len2 = dot1 * w2 + dot2 * d2;
				overlape = len - len1 - len2;
				if (overlape > 0) return;
			} else {
				righte = false;
				overlape = 0;
				invalide = true;
			}
			// try axis 15
			len = afx * afx + afy * afy + afz * afz;
			if (len > 1e-5) {
				len = 1 / Math.sqrt(len);
				afx *= len;
				afy *= len;
				afz *= len;
				len = afx * dx + afy * dy + afz * dz;
				rightf = len > 0;
				if (!rightf) len = -len;
				dot1 = afx * a1x + afy * a1y + afz * a1z;
				dot2 = afx * a2x + afy * a2y + afz * a2z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len1 = dot1 * w1 + dot2 * h1;
				dot1 = afx * a4x + afy * a4y + afz * a4z;
				dot2 = afx * a5x + afy * a5y + afz * a5z;
				if (dot1 < 0) dot1 = -dot1;
				if (dot2 < 0) dot2 = -dot2;
				len2 = dot1 * w2 + dot2 * h2;
				overlapf = len - len1 - len2;
				if (overlapf > 0) return;
			} else {
				rightf = false;
				overlapf = 0;
				invalidf = true;
			}
			// boxes are overlapping
			var depth:Number = overlap1;
			var depth2:Number = overlap1;
			var minIndex:uint = 0;
			var right:Boolean = right1;
			if (overlap2 > depth2) {
				depth = overlap2;
				depth2 = overlap2;
				minIndex = 1;
				right = right2;
			}
			if (overlap3 > depth2) {
				depth = overlap3;
				depth2 = overlap3;
				minIndex = 2;
				right = right3;
			}
			if (overlap4 > depth2) {
				depth = overlap4;
				depth2 = overlap4;
				minIndex = 3;
				right = right4;
			}
			if (overlap5 > depth2) {
				depth = overlap5;
				depth2 = overlap5;
				minIndex = 4;
				right = right5;
			}
			if (overlap6 > depth2) {
				depth = overlap6;
				depth2 = overlap6;
				minIndex = 5;
				right = right6;
			}
			if (overlap7 - 0.01 > depth2 && !invalid7) {
				depth = overlap7;
				depth2 = overlap7 - 0.01;
				minIndex = 6;
				right = right7;
			}
			if (overlap8 - 0.01 > depth2 && !invalid8) {
				depth = overlap8;
				depth2 = overlap8 - 0.01;
				minIndex = 7;
				right = right8;
			}
			if (overlap9 - 0.01 > depth2 && !invalid9) {
				depth = overlap9;
				depth2 = overlap9 - 0.01;
				minIndex = 8;
				right = right9;
			}
			if (overlapa - 0.01 > depth2 && !invalida) {
				depth = overlapa;
				depth2 = overlapa - 0.01;
				minIndex = 9;
				right = righta;
			}
			if (overlapb - 0.01 > depth2 && !invalidb) {
				depth = overlapb;
				depth2 = overlapb - 0.01;
				minIndex = 10;
				right = rightb;
			}
			if (overlapc - 0.01 > depth2 && !invalidc) {
				depth = overlapc;
				depth2 = overlapc - 0.01;
				minIndex = 11;
				right = rightc;
			}
			if (overlapd - 0.01 > depth2 && !invalidd) {
				depth = overlapd;
				depth2 = overlapd - 0.01;
				minIndex = 12;
				right = rightd;
			}
			if (overlape - 0.01 > depth2 && !invalide) {
				depth = overlape;
				depth2 = overlape - 0.01;
				minIndex = 13;
				right = righte;
			}
			if (overlapf - 0.01 > depth2 && !invalidf) {
				depth = overlapf;
				minIndex = 14;
				right = rightf;
			}
			// normal
			var nx:Number = 0;
			var ny:Number = 0;
			var nz:Number = 0;
			// edge line or face side normal
			var n1x:Number = 0;
			var n1y:Number = 0;
			var n1z:Number = 0;
			var n2x:Number = 0;
			var n2y:Number = 0;
			var n2z:Number = 0;
			// center of current face
			var cx:Number = 0;
			var cy:Number = 0;
			var cz:Number = 0;
			// face side
			var s1x:Number = 0;
			var s1y:Number = 0;
			var s1z:Number = 0;
			var s2x:Number = 0;
			var s2y:Number = 0;
			var s2z:Number = 0;
			// swap b1 b2
			var swap:Boolean = false;
			switch(minIndex) {
			case 0: // b1.x * b2
				if (right) {
					cx = p1x + d1x;
					cy = p1y + d1y;
					cz = p1z + d1z;
					nx = a1x;
					ny = a1y;
					nz = a1z;
				} else {
					cx = p1x - d1x;
					cy = p1y - d1y;
					cz = p1z - d1z;
					nx = -a1x;
					ny = -a1y;
					nz = -a1z;
				}
				s1x = d2x;
				s1y = d2y;
				s1z = d2z;
				n1x = -a2x;
				n1y = -a2y;
				n1z = -a2z;
				s2x = d3x;
				s2y = d3y;
				s2z = d3z;
				n2x = -a3x;
				n2y = -a3y;
				n2z = -a3z;
				break;
			case 1: // b1.y * b2
				if (right) {
					cx = p1x + d2x;
					cy = p1y + d2y;
					cz = p1z + d2z;
					nx = a2x;
					ny = a2y;
					nz = a2z;
				} else {
					cx = p1x - d2x;
					cy = p1y - d2y;
					cz = p1z - d2z;
					nx = -a2x;
					ny = -a2y;
					nz = -a2z;
				}
				s1x = d1x;
				s1y = d1y;
				s1z = d1z;
				n1x = -a1x;
				n1y = -a1y;
				n1z = -a1z;
				s2x = d3x;
				s2y = d3y;
				s2z = d3z;
				n2x = -a3x;
				n2y = -a3y;
				n2z = -a3z;
				break;
			case 2: // b1.z * b2
				if (right) {
					cx = p1x + d3x;
					cy = p1y + d3y;
					cz = p1z + d3z;
					nx = a3x;
					ny = a3y;
					nz = a3z;
				} else {
					cx = p1x - d3x;
					cy = p1y - d3y;
					cz = p1z - d3z;
					nx = -a3x;
					ny = -a3y;
					nz = -a3z;
				}
				s1x = d1x;
				s1y = d1y;
				s1z = d1z;
				n1x = -a1x;
				n1y = -a1y;
				n1z = -a1z;
				s2x = d2x;
				s2y = d2y;
				s2z = d2z;
				n2x = -a2x;
				n2y = -a2y;
				n2z = -a2z;
				break;
			case 3: // b2.x * b1
				swap = true;
				if (!right) {
					cx = p2x + d4x;
					cy = p2y + d4y;
					cz = p2z + d4z;
					nx = a4x;
					ny = a4y;
					nz = a4z;
				} else {
					cx = p2x - d4x;
					cy = p2y - d4y;
					cz = p2z - d4z;
					nx = -a4x;
					ny = -a4y;
					nz = -a4z;
				}
				s1x = d5x;
				s1y = d5y;
				s1z = d5z;
				n1x = -a5x;
				n1y = -a5y;
				n1z = -a5z;
				s2x = d6x;
				s2y = d6y;
				s2z = d6z;
				n2x = -a6x;
				n2y = -a6y;
				n2z = -a6z;
				break;
			case 4: // b2.y * b1
				swap = true;
				if (!right) {
					cx = p2x + d5x;
					cy = p2y + d5y;
					cz = p2z + d5z;
					nx = a5x;
					ny = a5y;
					nz = a5z;
				} else {
					cx = p2x - d5x;
					cy = p2y - d5y;
					cz = p2z - d5z;
					nx = -a5x;
					ny = -a5y;
					nz = -a5z;
				}
				s1x = d4x;
				s1y = d4y;
				s1z = d4z;
				n1x = -a4x;
				n1y = -a4y;
				n1z = -a4z;
				s2x = d6x;
				s2y = d6y;
				s2z = d6z;
				n2x = -a6x;
				n2y = -a6y;
				n2z = -a6z;
				break;
			case 5: // b2.z * b1
				swap = true;
				if (!right) {
					cx = p2x + d6x;
					cy = p2y + d6y;
					cz = p2z + d6z;
					nx = a6x;
					ny = a6y;
					nz = a6z;
				} else {
					cx = p2x - d6x;
					cy = p2y - d6y;
					cz = p2z - d6z;
					nx = -a6x;
					ny = -a6y;
					nz = -a6z;
				}
				s1x = d4x;
				s1y = d4y;
				s1z = d4z;
				n1x = -a4x;
				n1y = -a4y;
				n1z = -a4z;
				s2x = d5x;
				s2y = d5y;
				s2z = d5z;
				n2x = -a5x;
				n2y = -a5y;
				n2z = -a5z;
				break;
			case 6: // b1.x * b2.x
				nx = a7x;
				ny = a7y;
				nz = a7z;
				n1x = a1x;
				n1y = a1y;
				n1z = a1z;
				n2x = a4x;
				n2y = a4y;
				n2z = a4z;
				break;
			case 7: // b1.x * b2.y
				nx = a8x;
				ny = a8y;
				nz = a8z;
				n1x = a1x;
				n1y = a1y;
				n1z = a1z;
				n2x = a5x;
				n2y = a5y;
				n2z = a5z;
				break;
			case 8: // b1.x * b2.z
				nx = a9x;
				ny = a9y;
				nz = a9z;
				n1x = a1x;
				n1y = a1y;
				n1z = a1z;
				n2x = a6x;
				n2y = a6y;
				n2z = a6z;
				break;
			case 9: // b1.y * b2.x
				nx = aax;
				ny = aay;
				nz = aaz;
				n1x = a2x;
				n1y = a2y;
				n1z = a2z;
				n2x = a4x;
				n2y = a4y;
				n2z = a4z;
				break;
			case 10: // b1.y * b2.y
				nx = abx;
				ny = aby;
				nz = abz;
				n1x = a2x;
				n1y = a2y;
				n1z = a2z;
				n2x = a5x;
				n2y = a5y;
				n2z = a5z;
				break;
			case 11: // b1.y * b2.z
				nx = acx;
				ny = acy;
				nz = acz;
				n1x = a2x;
				n1y = a2y;
				n1z = a2z;
				n2x = a6x;
				n2y = a6y;
				n2z = a6z;
				break;
			case 12: // b1.z * b2.x
				nx = adx;
				ny = ady;
				nz = adz;
				n1x = a3x;
				n1y = a3y;
				n1z = a3z;
				n2x = a4x;
				n2y = a4y;
				n2z = a4z;
				break;
			case 13: // b1.z * b2.y
				nx = aex;
				ny = aey;
				nz = aez;
				n1x = a3x;
				n1y = a3y;
				n1z = a3z;
				n2x = a5x;
				n2y = a5y;
				n2z = a5z;
				break;
			case 14: // b1.z * b2.z
				nx = afx;
				ny = afy;
				nz = afz;
				n1x = a3x;
				n1y = a3y;
				n1z = a3z;
				n2x = a6x;
				n2y = a6y;
				n2z = a6z;
				break;
			}
			var v:Vec3;
			if (minIndex > 5) { // edge-edge collision
				if (!right) {
					nx = -nx;
					ny = -ny;
					nz = -nz;
				}
				// temp
				var distance:Number;
				var maxDistance:Number;
				var vx:Number;
				var vy:Number;
				var vz:Number;
				var v1x:Number;
				var v1y:Number;
				var v1z:Number;
				var v2x:Number;
				var v2y:Number;
				var v2z:Number;
				// get support vertex 1
				v = b1.vertex1;
				v1x = v.x;
				v1y = v.y;
				v1z = v.z;
				maxDistance = nx * v1x + ny * v1y + nz * v1z;
				v = b1.vertex2;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance > maxDistance) {
					maxDistance = distance;
					v1x = vx;
					v1y = vy;
					v1z = vz;
				}
				v = b1.vertex3;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance > maxDistance) {
					maxDistance = distance;
					v1x = vx;
					v1y = vy;
					v1z = vz;
				}
				v = b1.vertex4;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance > maxDistance) {
					maxDistance = distance;
					v1x = vx;
					v1y = vy;
					v1z = vz;
				}
				v = b1.vertex5;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance > maxDistance) {
					maxDistance = distance;
					v1x = vx;
					v1y = vy;
					v1z = vz;
				}
				v = b1.vertex6;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance > maxDistance) {
					maxDistance = distance;
					v1x = vx;
					v1y = vy;
					v1z = vz;
				}
				v = b1.vertex7;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance > maxDistance) {
					maxDistance = distance;
					v1x = vx;
					v1y = vy;
					v1z = vz;
				}
				v = b1.vertex8;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance > maxDistance) {
					maxDistance = distance;
					v1x = vx;
					v1y = vy;
					v1z = vz;
				}
				// get support vertex 2
				v = b2.vertex1;
				v2x = v.x;
				v2y = v.y;
				v2z = v.z;
				maxDistance = nx * v2x + ny * v2y + nz * v2z;
				v = b2.vertex2;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance < maxDistance) {
					maxDistance = distance;
					v2x = vx;
					v2y = vy;
					v2z = vz;
				}
				v = b2.vertex3;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance < maxDistance) {
					maxDistance = distance;
					v2x = vx;
					v2y = vy;
					v2z = vz;
				}
				v = b2.vertex4;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance < maxDistance) {
					maxDistance = distance;
					v2x = vx;
					v2y = vy;
					v2z = vz;
				}
				v = b2.vertex5;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance < maxDistance) {
					maxDistance = distance;
					v2x = vx;
					v2y = vy;
					v2z = vz;
				}
				v = b2.vertex6;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance < maxDistance) {
					maxDistance = distance;
					v2x = vx;
					v2y = vy;
					v2z = vz;
				}
				v = b2.vertex7;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance < maxDistance) {
					maxDistance = distance;
					v2x = vx;
					v2y = vy;
					v2z = vz;
				}
				v = b2.vertex8;
				vx = v.x;
				vy = v.y;
				vz = v.z;
				distance = nx * vx + ny * vy + nz * vz;
				if (distance < maxDistance) {
					maxDistance = distance;
					v2x = vx;
					v2y = vy;
					v2z = vz;
				}
				// closest point
				vx = v2x - v1x;
				vy = v2y - v1y;
				vz = v2z - v1z;
				dot1 = n1x * n2x + n1y * n2y + n1z * n2z;
				var t:Number = (vx * (n1x - n2x * dot1) + vy * (n1y - n2y * dot1) + vz * (n1z - n2z * dot1)) / (1 - dot1 * dot1);
				manifold.addPoint(v1x + n1x * t + nx * depth * 0.5, v1y + n1y * t + ny * depth * 0.5, v1z + n1z * t + nz * depth * 0.5, nx, ny, nz, depth, false);
				return;
			}
			// now detect face-face collision...
			// target quad
			var q1x:Number;
			var q1y:Number;
			var q1z:Number;
			var q2x:Number;
			var q2y:Number;
			var q2z:Number;
			var q3x:Number;
			var q3y:Number;
			var q3z:Number;
			var q4x:Number;
			var q4y:Number;
			var q4z:Number;
			// search support face and vertex
			var minDot:Number = 1;
			var dot:Number = 0;
			var minDotIndex:uint = 0;
			if (swap) {
				dot = a1x * nx + a1y * ny + a1z * nz;
				if (dot < minDot) {
					minDot = dot;
					minDotIndex = 0;
				}
				if (-dot < minDot) {
					minDot = -dot;
					minDotIndex = 1;
				}
				dot = a2x * nx + a2y * ny + a2z * nz;
				if (dot < minDot) {
					minDot = dot;
					minDotIndex = 2;
				}
				if (-dot < minDot) {
					minDot = -dot;
					minDotIndex = 3;
				}
				dot = a3x * nx + a3y * ny + a3z * nz;
				if (dot < minDot) {
					minDot = dot;
					minDotIndex = 4;
				}
				if (-dot < minDot) {
					minDot = -dot;
					minDotIndex = 5;
				}
				switch(minDotIndex) {
				case 0: // x+ face
					v = b1.vertex1;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b1.vertex3;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b1.vertex4;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b1.vertex2;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				case 1: // x- face
					v = b1.vertex6;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b1.vertex8;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b1.vertex7;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b1.vertex5;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				case 2: // y+ face
					v = b1.vertex5;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b1.vertex1;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b1.vertex2;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b1.vertex6;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				case 3: // y- face
					v = b1.vertex8;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b1.vertex4;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b1.vertex3;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b1.vertex7;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				case 4: // z+ face
					v = b1.vertex5;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b1.vertex7;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b1.vertex3;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b1.vertex1;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				case 5: // z- face
					v = b1.vertex2;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b1.vertex4;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b1.vertex8;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b1.vertex6;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				}
			} else {
				dot = a4x * nx + a4y * ny + a4z * nz;
				if (dot < minDot) {
					minDot = dot;
					minDotIndex = 0;
				}
				if (-dot < minDot) {
					minDot = -dot;
					minDotIndex = 1;
				}
				dot = a5x * nx + a5y * ny + a5z * nz;
				if (dot < minDot) {
					minDot = dot;
					minDotIndex = 2;
				}
				if (-dot < minDot) {
					minDot = -dot;
					minDotIndex = 3;
				}
				dot = a6x * nx + a6y * ny + a6z * nz;
				if (dot < minDot) {
					minDot = dot;
					minDotIndex = 4;
				}
				if (-dot < minDot) {
					minDot = -dot;
					minDotIndex = 5;
				}
				switch(minDotIndex) {
				case 0: // x+ face
					v = b2.vertex1;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b2.vertex3;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b2.vertex4;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b2.vertex2;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				case 1: // x- face
					v = b2.vertex6;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b2.vertex8;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b2.vertex7;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b2.vertex5;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				case 2: // y+ face
					v = b2.vertex5;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b2.vertex1;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b2.vertex2;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b2.vertex6;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				case 3: // y- face
					v = b2.vertex8;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b2.vertex4;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b2.vertex3;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b2.vertex7;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				case 4: // z+ face
					v = b2.vertex5;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b2.vertex7;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b2.vertex3;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b2.vertex1;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				case 5: // z- face
					v = b2.vertex2;
					q1x = v.x;
					q1y = v.y;
					q1z = v.z;
					v = b2.vertex4;
					q2x = v.x;
					q2y = v.y;
					q2z = v.z;
					v = b2.vertex8;
					q3x = v.x;
					q3y = v.y;
					q3z = v.z;
					v = b2.vertex6;
					q4x = v.x;
					q4y = v.y;
					q4z = v.z;
					break;
				}
			}
			// clip vertices
			var numClipVertices:uint;
			var numAddedClipVertices:uint;
			var index:uint;
			var x1:Number;
			var y1:Number;
			var z1:Number;
			var x2:Number;
			var y2:Number;
			var z2:Number;
			clipVertices1[0] = q1x;
			clipVertices1[1] = q1y;
			clipVertices1[2] = q1z;
			clipVertices1[3] = q2x;
			clipVertices1[4] = q2y;
			clipVertices1[5] = q2z;
			clipVertices1[6] = q3x;
			clipVertices1[7] = q3y;
			clipVertices1[8] = q3z;
			clipVertices1[9] = q4x;
			clipVertices1[10] = q4y;
			clipVertices1[11] = q4z;
			numAddedClipVertices = 0;
			x1 = clipVertices1[9];
			y1 = clipVertices1[10];
			z1 = clipVertices1[11];
			dot1 = (x1 - cx - s1x) * n1x + (y1 - cy - s1y) * n1y + (z1 - cz - s1z) * n1z;
			for (var i:int = 0; i < 4; i++) {
				index = i * 3;
				x2 = clipVertices1[index];
				y2 = clipVertices1[index + 1];
				z2 = clipVertices1[index + 2];
				dot2 = (x2 - cx - s1x) * n1x + (y2 - cy - s1y) * n1y + (z2 - cz - s1z) * n1z;
				if (dot1 > 0) {
					if (dot2 > 0) {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						clipVertices2[index] = x2;
						clipVertices2[index + 1] = y2;
						clipVertices2[index + 2] = z2;
					} else {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						t = dot1 / (dot1 - dot2);
						clipVertices2[index] = x1 + (x2 - x1) * t;
						clipVertices2[index + 1] = y1 + (y2 - y1) * t;
						clipVertices2[index + 2] = z1 + (z2 - z1) * t;
					}
				} else {
					if (dot2 > 0) {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						t = dot1 / (dot1 - dot2);
						clipVertices2[index] = x1 + (x2 - x1) * t;
						clipVertices2[index + 1] = y1 + (y2 - y1) * t;
						clipVertices2[index + 2] = z1 + (z2 - z1) * t;
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						clipVertices2[index] = x2;
						clipVertices2[index + 1] = y2;
						clipVertices2[index + 2] = z2;
					}
				}
				x1 = x2;
				y1 = y2;
				z1 = z2;
				dot1 = dot2;
			}
			numClipVertices = numAddedClipVertices;
			if (numClipVertices == 0) return;
			numAddedClipVertices = 0;
			index = (numClipVertices - 1) * 3;
			x1 = clipVertices2[index];
			y1 = clipVertices2[index + 1];
			z1 = clipVertices2[index + 2];
			dot1 = (x1 - cx - s2x) * n2x + (y1 - cy - s2y) * n2y + (z1 - cz - s2z) * n2z;
			for (i = 0; i < numClipVertices; i++) {
				index = i * 3;
				x2 = clipVertices2[index];
				y2 = clipVertices2[index + 1];
				z2 = clipVertices2[index + 2];
				dot2 = (x2 - cx - s2x) * n2x + (y2 - cy - s2y) * n2y + (z2 - cz - s2z) * n2z;
				if (dot1 > 0) {
					if (dot2 > 0) {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						clipVertices1[index] = x2;
						clipVertices1[index + 1] = y2;
						clipVertices1[index + 2] = z2;
					} else {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						t = dot1 / (dot1 - dot2);
						clipVertices1[index] = x1 + (x2 - x1) * t;
						clipVertices1[index + 1] = y1 + (y2 - y1) * t;
						clipVertices1[index + 2] = z1 + (z2 - z1) * t;
					}
				} else {
					if (dot2 > 0) {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						t = dot1 / (dot1 - dot2);
						clipVertices1[index] = x1 + (x2 - x1) * t;
						clipVertices1[index + 1] = y1 + (y2 - y1) * t;
						clipVertices1[index + 2] = z1 + (z2 - z1) * t;
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						clipVertices1[index] = x2;
						clipVertices1[index + 1] = y2;
						clipVertices1[index + 2] = z2;
					}
				}
				x1 = x2;
				y1 = y2;
				z1 = z2;
				dot1 = dot2;
			}
			numClipVertices = numAddedClipVertices;
			if (numClipVertices == 0) return;
			numAddedClipVertices = 0;
			index = (numClipVertices - 1) * 3;
			x1 = clipVertices1[index];
			y1 = clipVertices1[index + 1];
			z1 = clipVertices1[index + 2];
			dot1 = (x1 - cx + s1x) * -n1x + (y1 - cy + s1y) * -n1y + (z1 - cz + s1z) * -n1z;
			for (i = 0; i < numClipVertices; i++) {
				index = i * 3;
				x2 = clipVertices1[index];
				y2 = clipVertices1[index + 1];
				z2 = clipVertices1[index + 2];
				dot2 = (x2 - cx + s1x) * -n1x + (y2 - cy + s1y) * -n1y + (z2 - cz + s1z) * -n1z;
				if (dot1 > 0) {
					if (dot2 > 0) {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						clipVertices2[index] = x2;
						clipVertices2[index + 1] = y2;
						clipVertices2[index + 2] = z2;
					} else {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						t = dot1 / (dot1 - dot2);
						clipVertices2[index] = x1 + (x2 - x1) * t;
						clipVertices2[index + 1] = y1 + (y2 - y1) * t;
						clipVertices2[index + 2] = z1 + (z2 - z1) * t;
					}
				} else {
					if (dot2 > 0) {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						t = dot1 / (dot1 - dot2);
						clipVertices2[index] = x1 + (x2 - x1) * t;
						clipVertices2[index + 1] = y1 + (y2 - y1) * t;
						clipVertices2[index + 2] = z1 + (z2 - z1) * t;
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						clipVertices2[index] = x2;
						clipVertices2[index + 1] = y2;
						clipVertices2[index + 2] = z2;
					}
				}
				x1 = x2;
				y1 = y2;
				z1 = z2;
				dot1 = dot2;
			}
			numClipVertices = numAddedClipVertices;
			if (numClipVertices == 0) return;
			numAddedClipVertices = 0;
			index = (numClipVertices - 1) * 3;
			x1 = clipVertices2[index];
			y1 = clipVertices2[index + 1];
			z1 = clipVertices2[index + 2];
			dot1 = (x1 - cx + s2x) * -n2x + (y1 - cy + s2y) * -n2y + (z1 - cz + s2z) * -n2z;
			for (i = 0; i < numClipVertices; i++) {
				index = i * 3;
				x2 = clipVertices2[index];
				y2 = clipVertices2[index + 1];
				z2 = clipVertices2[index + 2];
				dot2 = (x2 - cx + s2x) * -n2x + (y2 - cy + s2y) * -n2y + (z2 - cz + s2z) * -n2z;
				if (dot1 > 0) {
					if (dot2 > 0) {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						clipVertices1[index] = x2;
						clipVertices1[index + 1] = y2;
						clipVertices1[index + 2] = z2;
					} else {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						t = dot1 / (dot1 - dot2);
						clipVertices1[index] = x1 + (x2 - x1) * t;
						clipVertices1[index + 1] = y1 + (y2 - y1) * t;
						clipVertices1[index + 2] = z1 + (z2 - z1) * t;
					}
				} else {
					if (dot2 > 0) {
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						t = dot1 / (dot1 - dot2);
						clipVertices1[index] = x1 + (x2 - x1) * t;
						clipVertices1[index + 1] = y1 + (y2 - y1) * t;
						clipVertices1[index + 2] = z1 + (z2 - z1) * t;
						index = numAddedClipVertices * 3;
						numAddedClipVertices++;
						clipVertices1[index] = x2;
						clipVertices1[index + 1] = y2;
						clipVertices1[index + 2] = z2;
					}
				}
				x1 = x2;
				y1 = y2;
				z1 = z2;
				dot1 = dot2;
			}
			numClipVertices = numAddedClipVertices;
			if (swap) {
				var tb:BoxShape = b1;
				b1 = b2;
				b2 = tb;
			}
			if (numClipVertices == 0) return;
			var flipped:Boolean = b1 != shape1;
			if (numClipVertices > 4) {
				// sweep vertices
				x1 = (q1x + q2x + q3x + q4x) * 0.25;
				y1 = (q1y + q2y + q3y + q4y) * 0.25;
				z1 = (q1z + q2z + q3z + q4z) * 0.25;
				n1x = q1x - x1;
				n1y = q1y - y1;
				n1z = q1z - z1;
				n2x = q2x - x1;
				n2y = q2y - y1;
				n2z = q2z - z1;
				var index1:uint = 0;
				var index2:uint = 0;
				var index3:uint = 0;
				var index4:uint = 0;
				var maxDot:Number = -INF;
				minDot = INF;
				for (i = 0; i < numClipVertices; i++) {
					used[i] = false;
					index = i * 3;
					x1 = clipVertices1[index];
					y1 = clipVertices1[index + 1];
					z1 = clipVertices1[index + 2];
					dot = x1 * n1x + y1 * n1y + z1 * n1z;
					if (dot < minDot) {
						minDot = dot;
						index1 = i;
					}
					if (dot > maxDot) {
						maxDot = dot;
						index3 = i;
					}
				}
				used[index1] = true;
				used[index3] = true;
				maxDot = -INF;
				minDot = INF;
				for (i = 0; i < numClipVertices; i++) {
					if (used[i]) continue;
					index = i * 3;
					x1 = clipVertices1[index];
					y1 = clipVertices1[index + 1];
					z1 = clipVertices1[index + 2];
					dot = x1 * n2x + y1 * n2y + z1 * n2z;
					if (dot < minDot) {
						minDot = dot;
						index2 = i;
					}
					if (dot > maxDot) {
						maxDot = dot;
						index4 = i;
					}
				}
				index = index1 * 3;
				x1 = clipVertices1[index];
				y1 = clipVertices1[index + 1];
				z1 = clipVertices1[index + 2];
				dot = (x1 - cx) * nx + (y1 - cy) * ny + (z1 - cz) * nz;
				if (dot < 0) {
					manifold.addPoint(x1, y1, z1, nx, ny, nz, dot, flipped);
				}
				index = index2 * 3;
				x1 = clipVertices1[index];
				y1 = clipVertices1[index + 1];
				z1 = clipVertices1[index + 2];
				dot = (x1 - cx) * nx + (y1 - cy) * ny + (z1 - cz) * nz;
				if (dot < 0) {
					manifold.addPoint(x1, y1, z1, nx, ny, nz, dot, flipped);
				}
				index = index3 * 3;
				x1 = clipVertices1[index];
				y1 = clipVertices1[index + 1];
				z1 = clipVertices1[index + 2];
				dot = (x1 - cx) * nx + (y1 - cy) * ny + (z1 - cz) * nz;
				if (dot < 0) {
					manifold.addPoint(x1, y1, z1, nx, ny, nz, dot, flipped);
				}
				index = index4 * 3;
				x1 = clipVertices1[index];
				y1 = clipVertices1[index + 1];
				z1 = clipVertices1[index + 2];
				dot = (x1 - cx) * nx + (y1 - cy) * ny + (z1 - cz) * nz;
				if (dot < 0) {
					manifold.addPoint(x1, y1, z1, nx, ny, nz, dot, flipped);
				}
			} else {
				for (i = 0; i < numClipVertices; i++) {
					index = i * 3;
					x1 = clipVertices1[index];
					y1 = clipVertices1[index + 1];
					z1 = clipVertices1[index + 2];
					dot = (x1 - cx) * nx + (y1 - cy) * ny + (z1 - cz) * nz;
					if (dot < 0) {
						manifold.addPoint(x1, y1, z1, nx, ny, nz, dot, flipped);
					}
				}
			}
		}
		
	}

}