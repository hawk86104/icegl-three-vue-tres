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
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * A contact manifold between two shapes.
	 * @author saharan
	 */
	public class ContactManifold {
		/**
		 * The first rigid body.
		 */
		public var body1:RigidBody;
		
		/**
		 * The second rigid body.
		 */
		public var body2:RigidBody;
		
		/**
		 * The manifold points.
		 */
		public var points:Vector.<ManifoldPoint>;
		
		/**
		 * The number of manifold points.
		 */
		public var numPoints:uint;
		
		public function ContactManifold() {
			points = new Vector.<ManifoldPoint>(4, true);
			points[0] = new ManifoldPoint();
			points[1] = new ManifoldPoint();
			points[2] = new ManifoldPoint();
			points[3] = new ManifoldPoint();
		}
		
		/**
		 * Reset the manifold.
		 * @param	shape1
		 * @param	shape2
		 */
		public function reset(shape1:Shape, shape2:Shape):void {
			body1 = shape1.parent;
			body2 = shape2.parent;
			numPoints = 0;
		}
		
		/**
		 * Add a point into this manifold.
		 * @param	x
		 * @param	y
		 * @param	z
		 * @param	normalX
		 * @param	normalY
		 * @param	normalZ
		 * @param	penetration
		 * @param	flip
		 */
		public function addPoint(x:Number, y:Number, z:Number, normalX:Number, normalY:Number, normalZ:Number, penetration:Number, flip:Boolean):void {
			var p:ManifoldPoint = points[numPoints++];
			p.position.x = x;
			p.position.y = y;
			p.position.z = z;
			var r:Mat33 = body1.rotation;
			var rx:Number = x - body1.position.x;
			var ry:Number = y - body1.position.y;
			var rz:Number = z - body1.position.z;
			p.localPoint1.x = rx * r.e00 + ry * r.e10 + rz * r.e20;
			p.localPoint1.y = rx * r.e01 + ry * r.e11 + rz * r.e21;
			p.localPoint1.z = rx * r.e02 + ry * r.e12 + rz * r.e22;
			r = body2.rotation;
			rx = x - body2.position.x;
			ry = y - body2.position.y;
			rz = z - body2.position.z;
			p.localPoint2.x = rx * r.e00 + ry * r.e10 + rz * r.e20;
			p.localPoint2.y = rx * r.e01 + ry * r.e11 + rz * r.e21;
			p.localPoint2.z = rx * r.e02 + ry * r.e12 + rz * r.e22;
			p.normalImpulse = 0;
			if (flip) {
				p.normal.x = -normalX;
				p.normal.y = -normalY;
				p.normal.z = -normalZ;
			} else {
				p.normal.x = normalX;
				p.normal.y = normalY;
				p.normal.z = normalZ;
			}
			p.penetration = penetration;
			p.warmStarted = false;
		}
		
	}

}