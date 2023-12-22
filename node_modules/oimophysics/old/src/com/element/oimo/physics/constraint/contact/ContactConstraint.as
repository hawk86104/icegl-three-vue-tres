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
package com.element.oimo.physics.constraint.contact {
	import com.element.oimo.math.Mat33;
	import com.element.oimo.math.Vec3;
	import com.element.oimo.physics.collision.shape.Shape;
	import com.element.oimo.physics.constraint.Constraint;
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * ...
	 * @author saharan
	 */
	public class ContactConstraint extends Constraint {
		/**
		 * The contact manifold of the constraint.
		 */
		public var manifold:ContactManifold;
		
		/**
		 * The coefficient of restitution of the constraint.
		 */
		public var restitution:Number;
		
		/**
		 * The coefficient of friction of the constraint.
		 */
		public var friction:Number;
		
		private var p1:Vec3;
		private var p2:Vec3;
		private var lv1:Vec3;
		private var lv2:Vec3;
		private var av1:Vec3;
		private var av2:Vec3;
		private var i1:Mat33;
		private var i2:Mat33;
		
		private var i1e00:Number;
		private var i1e01:Number;
		private var i1e02:Number;
		private var i1e10:Number;
		private var i1e11:Number;
		private var i1e12:Number;
		private var i1e20:Number;
		private var i1e21:Number;
		private var i1e22:Number;
		private var i2e00:Number;
		private var i2e01:Number;
		private var i2e02:Number;
		private var i2e10:Number;
		private var i2e11:Number;
		private var i2e12:Number;
		private var i2e20:Number;
		private var i2e21:Number;
		private var i2e22:Number;
		
		private var m1:Number;
		private var m2:Number;
		
		private var ps:Vector.<ManifoldPoint>;
		private var cs:ContactPointDataBuffer;
		private var num:uint;
		
		
		public function ContactConstraint(manifold:ContactManifold) {
			this.manifold = manifold;
			ps = manifold.points;
			cs = new ContactPointDataBuffer();
			cs.next = new ContactPointDataBuffer();
			cs.next.next = new ContactPointDataBuffer();
			cs.next.next.next = new ContactPointDataBuffer();
		}
		
		/**
		 * Attach the constraint to the bodies.
		 */
		public function attach():void {
			p1 = body1.position;
			p2 = body2.position;
			lv1 = body1.linearVelocity;
			av1 = body1.angularVelocity;
			lv2 = body2.linearVelocity;
			av2 = body2.angularVelocity;
			i1 = body1.inverseInertia;
			i2 = body2.inverseInertia;
		}
		
		/**
		 * Detach the constraint from the bodies.
		 */
		public function detach():void {
			p1 = null;
			p2 = null;
			lv1 = null;
			lv2 = null;
			av1 = null;
			av2 = null;
			i1 = null;
			i2 = null;
		}
		
		/**
		 * @inheritDoc
		 */
		override public function preSolve(timeStep:Number, invTimeStep:Number):void {
			m1 = body1.inverseMass;
			m2 = body2.inverseMass;
			i1e00 = i1.e00;
			i1e01 = i1.e01;
			i1e02 = i1.e02;
			i1e10 = i1.e10;
			i1e11 = i1.e11;
			i1e12 = i1.e12;
			i1e20 = i1.e20;
			i1e21 = i1.e21;
			i1e22 = i1.e22;
			i2e00 = i2.e00;
			i2e01 = i2.e01;
			i2e02 = i2.e02;
			i2e10 = i2.e10;
			i2e11 = i2.e11;
			i2e12 = i2.e12;
			i2e20 = i2.e20;
			i2e21 = i2.e21;
			i2e22 = i2.e22;
			
			var p1x:Number = p1.x;
			var p1y:Number = p1.y;
			var p1z:Number = p1.z;
			var p2x:Number = p2.x;
			var p2y:Number = p2.y;
			var p2z:Number = p2.z;
			
			var m1m2:Number = m1 + m2;
			
			num = manifold.numPoints;
			var c:ContactPointDataBuffer = cs;
			for (var i:int = 0; i < num; i++) {
				var p:ManifoldPoint = ps[i];
				var tmp1X:Number;
				var tmp1Y:Number;
				var tmp1Z:Number;
				var tmp2X:Number;
				var tmp2Y:Number;
				var tmp2Z:Number;
				
				tmp1X = p.position.x;
				tmp1Y = p.position.y;
				tmp1Z = p.position.z;
				var rp1X:Number = tmp1X - p1x;
				var rp1Y:Number = tmp1Y - p1y;
				var rp1Z:Number = tmp1Z - p1z;
				var rp2X:Number = tmp1X - p2x;
				var rp2Y:Number = tmp1Y - p2y;
				var rp2Z:Number = tmp1Z - p2z;
				c.rp1X = rp1X;
				c.rp1Y = rp1Y;
				c.rp1Z = rp1Z;
				c.rp2X = rp2X;
				c.rp2Y = rp2Y;
				c.rp2Z = rp2Z;
				
				c.norImp = p.normalImpulse;
				c.tanImp = p.tangentImpulse;
				c.binImp = p.binormalImpulse;
				
				var norX:Number = p.normal.x;
				var norY:Number = p.normal.y;
				var norZ:Number = p.normal.z;
				
				var rvX:Number = (lv2.x + av2.y * rp2Z - av2.z * rp2Y) - (lv1.x + av1.y * rp1Z - av1.z * rp1Y);
				var rvY:Number = (lv2.y + av2.z * rp2X - av2.x * rp2Z) - (lv1.y + av1.z * rp1X - av1.x * rp1Z);
				var rvZ:Number = (lv2.z + av2.x * rp2Y - av2.y * rp2X) - (lv1.z + av1.x * rp1Y - av1.y * rp1X);
				var rvn:Number = norX * rvX + norY * rvY + norZ * rvZ;
				
				var tanX:Number = rvX - rvn * norX;
				var tanY:Number = rvY - rvn * norY;
				var tanZ:Number = rvZ - rvn * norZ;
				var len:Number = tanX * tanX + tanY * tanY + tanZ * tanZ;
				if (len > 0.04) {
					len = 1 / Math.sqrt(len);
				} else {
					tanX = norY * norX - norZ * norZ;
					tanY = -norZ * norY - norX * norX;
					tanZ = norX * norZ + norY * norY;
					len = 1 / Math.sqrt(tanX * tanX + tanY * tanY + tanZ * tanZ);
				}
				tanX *= len;
				tanY *= len;
				tanZ *= len;
				var binX:Number = norY * tanZ - norZ * tanY;
				var binY:Number = norZ * tanX - norX * tanZ;
				var binZ:Number = norX * tanY - norY * tanX;
				c.norX = norX;
				c.norY = norY;
				c.norZ = norZ;
				c.tanX = tanX;
				c.tanY = tanY;
				c.tanZ = tanZ;
				c.binX = binX;
				c.binY = binY;
				c.binZ = binZ;
				
				c.norU1X = norX * m1;
				c.norU1Y = norY * m1;
				c.norU1Z = norZ * m1;
				c.norU2X = norX * m2;
				c.norU2Y = norY * m2;
				c.norU2Z = norZ * m2;
				
				c.tanU1X = tanX * m1;
				c.tanU1Y = tanY * m1;
				c.tanU1Z = tanZ * m1;
				c.tanU2X = tanX * m2;
				c.tanU2Y = tanY * m2;
				c.tanU2Z = tanZ * m2;
				
				c.binU1X = binX * m1;
				c.binU1Y = binY * m1;
				c.binU1Z = binZ * m1;
				c.binU2X = binX * m2;
				c.binU2Y = binY * m2;
				c.binU2Z = binZ * m2;
				
				var norT1X:Number = rp1Y * norZ - rp1Z * norY;
				var norT1Y:Number = rp1Z * norX - rp1X * norZ;
				var norT1Z:Number = rp1X * norY - rp1Y * norX;
				var norT2X:Number = rp2Y * norZ - rp2Z * norY;
				var norT2Y:Number = rp2Z * norX - rp2X * norZ;
				var norT2Z:Number = rp2X * norY - rp2Y * norX;
				
				var tanT1X:Number = rp1Y * tanZ - rp1Z * tanY;
				var tanT1Y:Number = rp1Z * tanX - rp1X * tanZ;
				var tanT1Z:Number = rp1X * tanY - rp1Y * tanX;
				var tanT2X:Number = rp2Y * tanZ - rp2Z * tanY;
				var tanT2Y:Number = rp2Z * tanX - rp2X * tanZ;
				var tanT2Z:Number = rp2X * tanY - rp2Y * tanX;
				
				var binT1X:Number = rp1Y * binZ - rp1Z * binY;
				var binT1Y:Number = rp1Z * binX - rp1X * binZ;
				var binT1Z:Number = rp1X * binY - rp1Y * binX;
				var binT2X:Number = rp2Y * binZ - rp2Z * binY;
				var binT2Y:Number = rp2Z * binX - rp2X * binZ;
				var binT2Z:Number = rp2X * binY - rp2Y * binX;
				
				var norTU1X:Number = norT1X * i1e00 + norT1Y * i1e01 + norT1Z * i1e02;
				var norTU1Y:Number = norT1X * i1e10 + norT1Y * i1e11 + norT1Z * i1e12;
				var norTU1Z:Number = norT1X * i1e20 + norT1Y * i1e21 + norT1Z * i1e22;
				var norTU2X:Number = norT2X * i2e00 + norT2Y * i2e01 + norT2Z * i2e02;
				var norTU2Y:Number = norT2X * i2e10 + norT2Y * i2e11 + norT2Z * i2e12;
				var norTU2Z:Number = norT2X * i2e20 + norT2Y * i2e21 + norT2Z * i2e22;
				
				var tanTU1X:Number = tanT1X * i1e00 + tanT1Y * i1e01 + tanT1Z * i1e02;
				var tanTU1Y:Number = tanT1X * i1e10 + tanT1Y * i1e11 + tanT1Z * i1e12;
				var tanTU1Z:Number = tanT1X * i1e20 + tanT1Y * i1e21 + tanT1Z * i1e22;
				var tanTU2X:Number = tanT2X * i2e00 + tanT2Y * i2e01 + tanT2Z * i2e02;
				var tanTU2Y:Number = tanT2X * i2e10 + tanT2Y * i2e11 + tanT2Z * i2e12;
				var tanTU2Z:Number = tanT2X * i2e20 + tanT2Y * i2e21 + tanT2Z * i2e22;
				
				var binTU1X:Number = binT1X * i1e00 + binT1Y * i1e01 + binT1Z * i1e02;
				var binTU1Y:Number = binT1X * i1e10 + binT1Y * i1e11 + binT1Z * i1e12;
				var binTU1Z:Number = binT1X * i1e20 + binT1Y * i1e21 + binT1Z * i1e22;
				var binTU2X:Number = binT2X * i2e00 + binT2Y * i2e01 + binT2Z * i2e02;
				var binTU2Y:Number = binT2X * i2e10 + binT2Y * i2e11 + binT2Z * i2e12;
				var binTU2Z:Number = binT2X * i2e20 + binT2Y * i2e21 + binT2Z * i2e22;
				
				c.norT1X = norT1X;
				c.norT1Y = norT1Y;
				c.norT1Z = norT1Z;
				c.tanT1X = tanT1X;
				c.tanT1Y = tanT1Y;
				c.tanT1Z = tanT1Z;
				c.binT1X = binT1X;
				c.binT1Y = binT1Y;
				c.binT1Z = binT1Z;
				c.norT2X = norT2X;
				c.norT2Y = norT2Y;
				c.norT2Z = norT2Z;
				c.tanT2X = tanT2X;
				c.tanT2Y = tanT2Y;
				c.tanT2Z = tanT2Z;
				c.binT2X = binT2X;
				c.binT2Y = binT2Y;
				c.binT2Z = binT2Z;
				
				c.norTU1X = norTU1X;
				c.norTU1Y = norTU1Y;
				c.norTU1Z = norTU1Z;
				c.tanTU1X = tanTU1X;
				c.tanTU1Y = tanTU1Y;
				c.tanTU1Z = tanTU1Z;
				c.binTU1X = binTU1X;
				c.binTU1Y = binTU1Y;
				c.binTU1Z = binTU1Z;
				c.norTU2X = norTU2X;
				c.norTU2Y = norTU2Y;
				c.norTU2Z = norTU2Z;
				c.tanTU2X = tanTU2X;
				c.tanTU2Y = tanTU2Y;
				c.tanTU2Z = tanTU2Z;
				c.binTU2X = binTU2X;
				c.binTU2Y = binTU2Y;
				c.binTU2Z = binTU2Z;
				
				tmp1X = norT1X * i1e00 + norT1Y * i1e01 + norT1Z * i1e02;
				tmp1Y = norT1X * i1e10 + norT1Y * i1e11 + norT1Z * i1e12;
				tmp1Z = norT1X * i1e20 + norT1Y * i1e21 + norT1Z * i1e22;
				tmp2X = tmp1Y * rp1Z - tmp1Z * rp1Y;
				tmp2Y = tmp1Z * rp1X - tmp1X * rp1Z;
				tmp2Z = tmp1X * rp1Y - tmp1Y * rp1X;
				tmp1X = norT2X * i2e00 + norT2Y * i2e01 + norT2Z * i2e02;
				tmp1Y = norT2X * i2e10 + norT2Y * i2e11 + norT2Z * i2e12;
				tmp1Z = norT2X * i2e20 + norT2Y * i2e21 + norT2Z * i2e22;
				tmp2X += tmp1Y * rp2Z - tmp1Z * rp2Y;
				tmp2Y += tmp1Z * rp2X - tmp1X * rp2Z;
				tmp2Z += tmp1X * rp2Y - tmp1Y * rp2X;
				var norDen:Number = 1 / (m1m2 + norX * tmp2X + norY * tmp2Y + norZ * tmp2Z);
				
				tmp1X = tanT1X * i1e00 + tanT1Y * i1e01 + tanT1Z * i1e02;
				tmp1Y = tanT1X * i1e10 + tanT1Y * i1e11 + tanT1Z * i1e12;
				tmp1Z = tanT1X * i1e20 + tanT1Y * i1e21 + tanT1Z * i1e22;
				tmp2X = tmp1Y * rp1Z - tmp1Z * rp1Y;
				tmp2Y = tmp1Z * rp1X - tmp1X * rp1Z;
				tmp2Z = tmp1X * rp1Y - tmp1Y * rp1X;
				tmp1X = tanT2X * i2e00 + tanT2Y * i2e01 + tanT2Z * i2e02;
				tmp1Y = tanT2X * i2e10 + tanT2Y * i2e11 + tanT2Z * i2e12;
				tmp1Z = tanT2X * i2e20 + tanT2Y * i2e21 + tanT2Z * i2e22;
				tmp2X += tmp1Y * rp2Z - tmp1Z * rp2Y;
				tmp2Y += tmp1Z * rp2X - tmp1X * rp2Z;
				tmp2Z += tmp1X * rp2Y - tmp1Y * rp2X;
				var tanDen:Number = 1 / (m1m2 + tanX * tmp2X + tanY * tmp2Y + tanZ * tmp2Z);
				
				tmp1X = binT1X * i1e00 + binT1Y * i1e01 + binT1Z * i1e02;
				tmp1Y = binT1X * i1e10 + binT1Y * i1e11 + binT1Z * i1e12;
				tmp1Z = binT1X * i1e20 + binT1Y * i1e21 + binT1Z * i1e22;
				tmp2X = tmp1Y * rp1Z - tmp1Z * rp1Y;
				tmp2Y = tmp1Z * rp1X - tmp1X * rp1Z;
				tmp2Z = tmp1X * rp1Y - tmp1Y * rp1X;
				tmp1X = binT2X * i2e00 + binT2Y * i2e01 + binT2Z * i2e02;
				tmp1Y = binT2X * i2e10 + binT2Y * i2e11 + binT2Z * i2e12;
				tmp1Z = binT2X * i2e20 + binT2Y * i2e21 + binT2Z * i2e22;
				tmp2X += tmp1Y * rp2Z - tmp1Z * rp2Y;
				tmp2Y += tmp1Z * rp2X - tmp1X * rp2Z;
				tmp2Z += tmp1X * rp2Y - tmp1Y * rp2X;
				var binDen:Number = 1 / (m1m2 + binX * tmp2X + binY * tmp2Y + binZ * tmp2Z);
				
				c.norDen = norDen;
				c.tanDen = tanDen;
				c.binDen = binDen;
				
				if (p.warmStarted) {
					var norImp:Number = p.normalImpulse;
					lv1.x += c.norU1X * norImp;
					lv1.y += c.norU1Y * norImp;
					lv1.z += c.norU1Z * norImp;
					av1.x += norTU1X * norImp;
					av1.y += norTU1Y * norImp;
					av1.z += norTU1Z * norImp;
					lv2.x -= c.norU2X * norImp;
					lv2.y -= c.norU2Y * norImp;
					lv2.z -= c.norU2Z * norImp;
					av2.x -= norTU2X * norImp;
					av2.y -= norTU2Y * norImp;
					av2.z -= norTU2Z * norImp;
					c.norImp = norImp;
					c.tanImp = 0;
					c.binImp = 0;
					rvn = 0; // disable bouncing
				} else {
					c.norImp = 0;
					c.tanImp = 0;
					c.binImp = 0;
				}
				
				if (rvn > -1) {
					rvn = 0; // disable bouncing
				}
				var norTar:Number = restitution * -rvn;
				var sepV:Number = -(p.penetration + 0.005) * invTimeStep * 0.05; // allow 0.5cm error
				if (norTar < sepV) norTar = sepV;
				c.norTar = norTar;
				
				c.last = i == num - 1;
				c = c.next;
			}
		}
		
		/**
		 * @inheritDoc
		 */
		override public function solve():void {
			var lv1x:Number = lv1.x;
			var lv1y:Number = lv1.y;
			var lv1z:Number = lv1.z;
			var lv2x:Number = lv2.x;
			var lv2y:Number = lv2.y;
			var lv2z:Number = lv2.z;
			var av1x:Number = av1.x;
			var av1y:Number = av1.y;
			var av1z:Number = av1.z;
			var av2x:Number = av2.x;
			var av2y:Number = av2.y;
			var av2z:Number = av2.z;
			var c:ContactPointDataBuffer = cs;
			while (true) {
				var oldImp1:Number;
				var newImp1:Number;
				var oldImp2:Number;
				var newImp2:Number;
				var rvn:Number;
				var norImp:Number = c.norImp;
				var tanImp:Number = c.tanImp;
				var binImp:Number = c.binImp;
				
				// friction part
				var max:Number = -norImp * friction;
				var rvX:Number = lv2x - lv1x;
				var rvY:Number = lv2y - lv1y;
				var rvZ:Number = lv2z - lv1z;
				rvn =
					rvX * c.tanX + rvY * c.tanY + rvZ * c.tanZ +
					av2x * c.tanT2X + av2y * c.tanT2Y + av2z * c.tanT2Z -
					av1x * c.tanT1X - av1y * c.tanT1Y - av1z * c.tanT1Z
				;
				oldImp1 = tanImp;
				newImp1 = rvn * c.tanDen;
				tanImp += newImp1;
				
				rvn =
					rvX * c.binX + rvY * c.binY + rvZ * c.binZ +
					av2x * c.binT2X + av2y * c.binT2Y + av2z * c.binT2Z -
					av1x * c.binT1X - av1y * c.binT1Y - av1z * c.binT1Z
				;
				oldImp2 = binImp;
				newImp2 = rvn * c.binDen;
				binImp += newImp2;
				
				// cone friction clamp
				var len:Number = tanImp * tanImp + binImp * binImp;
				if (len > max * max) {
					len = max / Math.sqrt(len);
					tanImp *= len;
					binImp *= len;
				}
				newImp1 = tanImp - oldImp1;
				newImp2 = binImp - oldImp2;
				
				lv1x += c.tanU1X * newImp1 + c.binU1X * newImp2;
				lv1y += c.tanU1Y * newImp1 + c.binU1Y * newImp2;
				lv1z += c.tanU1Z * newImp1 + c.binU1Z * newImp2;
				av1x += c.tanTU1X * newImp1 + c.binTU1X * newImp2;
				av1y += c.tanTU1Y * newImp1 + c.binTU1Y * newImp2;
				av1z += c.tanTU1Z * newImp1 + c.binTU1Z * newImp2;
				lv2x -= c.tanU2X * newImp1 + c.binU2X * newImp2;
				lv2y -= c.tanU2Y * newImp1 + c.binU2Y * newImp2;
				lv2z -= c.tanU2Z * newImp1 + c.binU2Z * newImp2;
				av2x -= c.tanTU2X * newImp1 + c.binTU2X * newImp2;
				av2y -= c.tanTU2Y * newImp1 + c.binTU2Y * newImp2;
				av2z -= c.tanTU2Z * newImp1 + c.binTU2Z * newImp2;
				
				// restitution part
				rvn = 
					(lv2x - lv1x) * c.norX + (lv2y - lv1y) * c.norY + (lv2z - lv1z) * c.norZ +
					av2x * c.norT2X + av2y * c.norT2Y + av2z * c.norT2Z -
					av1x * c.norT1X - av1y * c.norT1Y - av1z * c.norT1Z
				;
				oldImp1 = norImp;
				newImp1 = (rvn - c.norTar) * c.norDen;
				norImp += newImp1;
				if (norImp > 0) norImp = 0;
				newImp1 = norImp - oldImp1;
				lv1x += c.norU1X * newImp1;
				lv1y += c.norU1Y * newImp1;
				lv1z += c.norU1Z * newImp1;
				av1x += c.norTU1X * newImp1;
				av1y += c.norTU1Y * newImp1;
				av1z += c.norTU1Z * newImp1;
				lv2x -= c.norU2X * newImp1;
				lv2y -= c.norU2Y * newImp1;
				lv2z -= c.norU2Z * newImp1;
				av2x -= c.norTU2X * newImp1;
				av2y -= c.norTU2Y * newImp1;
				av2z -= c.norTU2Z * newImp1;
				
				c.norImp = norImp;
				c.tanImp = tanImp;
				c.binImp = binImp;
				
				if (c.last) break;
				c = c.next;
			}
			lv1.x = lv1x;
			lv1.y = lv1y;
			lv1.z = lv1z;
			lv2.x = lv2x;
			lv2.y = lv2y;
			lv2.z = lv2z;
			av1.x = av1x;
			av1.y = av1y;
			av1.z = av1z;
			av2.x = av2x;
			av2.y = av2y;
			av2.z = av2z;
		}
		
		/**
		 * @inheritDoc
		 */
		override public function postSolve():void {
			var c:ContactPointDataBuffer = cs;
			for (var i:int = 0; i < num; i++) {
				var p:ManifoldPoint = ps[i];
				p.normal.x = c.norX;
				p.normal.y = c.norY;
				p.normal.z = c.norZ;
				p.tangent.x = c.tanX;
				p.tangent.y = c.tanY;
				p.tangent.z = c.tanZ;
				p.binormal.x = c.binX;
				p.binormal.y = c.binY;
				p.binormal.z = c.binZ;
				p.normalImpulse = c.norImp;
				p.tangentImpulse = c.tanImp;
				p.binormalImpulse = c.binImp;
				p.normalDenominator = c.norDen;
				p.tangentDenominator = c.tanDen;
				p.binormalDenominator = c.binDen;
				c = c.next;
			}
		}
		
	}

}