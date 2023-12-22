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
	import com.element.oimo.physics.collision.shape.Shape;
	import com.element.oimo.physics.collision.shape.SphereShape;
	import com.element.oimo.physics.constraint.contact.ContactManifold;
	/**
	 * A collision detector which detects collisions between two spheres.
	 * @author saharan
	 */
	public class SphereSphereCollisionDetector extends CollisionDetector {
		public function SphereSphereCollisionDetector() {
		}
		
		/**
		 * @inheritDoc
		 */
		override public function detectCollision(shape1:Shape, shape2:Shape, manifold:ContactManifold):void {
			var s1:SphereShape = SphereShape(shape1);
			var s2:SphereShape = SphereShape(shape2);
			var p1:Vec3 = s1.position;
			var p2:Vec3 = s2.position;
			var dx:Number = p2.x - p1.x;
			var dy:Number = p2.y - p1.y;
			var dz:Number = p2.z - p1.z;
			var len:Number = dx * dx + dy * dy + dz * dz;
			var r1:Number = s1.radius;
			var r2:Number = s2.radius;
			var rad:Number = r1 + r2;
			if (len > 0 && len < rad * rad) {
				len = Math.sqrt(len);
				var invLen:Number = 1 / len;
				dx *= invLen;
				dy *= invLen;
				dz *= invLen;
				manifold.addPoint(p1.x + dx * r1, p1.y + dy * r1, p1.z + dz * r1, dx, dy, dz, len - rad, false);
			}
		}
		
	}

}