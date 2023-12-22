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
package com.element.oimo.physics.collision.shape {
	import com.element.oimo.math.Vec3;
	/**
	 * A box shape.
	 * @author saharan
	 */
	public class BoxShape extends Shape {
		/**
		 * The width of the box.
		 */
		public var width:Number;
		
		/**
		 * The half-width of the box.
		 */
		public var halfWidth:Number;
		
		/**
		 * The height of the box.
		 */
		public var height:Number;
		
		/**
		 * The half-height of the box.
		 */
		public var halfHeight:Number;
		
		/**
		 * The depth of the box.
		 */
		public var depth:Number;
		
		/**
		 * The half-depth of the box.
		 */
		public var halfDepth:Number;
		
		/**
		 * The normalized direction vector of the width.
		 */
		public var normalDirectionWidth:Vec3;
		
		/**
		 * The normalized direction vector of the height.
		 */
		public var normalDirectionHeight:Vec3;
		
		/**
		 * The normalized direction vector of the depth.
		 */
		public var normalDirectionDepth:Vec3;
		
		/**
		 * The direction vector of the half-width.
		 */
		public var halfDirectionWidth:Vec3;
		
		/**
		 * The direction vector of the half-height.
		 */
		public var halfDirectionHeight:Vec3;
		
		/**
		 * The direction vector of the half-depth.
		 */
		public var halfDirectionDepth:Vec3;
		
		public var vertex1:Vec3;
		public var vertex2:Vec3;
		public var vertex3:Vec3;
		public var vertex4:Vec3;
		public var vertex5:Vec3;
		public var vertex6:Vec3;
		public var vertex7:Vec3;
		public var vertex8:Vec3;
		
		public function BoxShape(config:ShapeConfig, width:Number, height:Number, depth:Number) {
			super(config);
			this.width = width;
			halfWidth = width * 0.5;
			this.height = height;
			halfHeight = height * 0.5;
			this.depth = depth;
			halfDepth = depth * 0.5;
			normalDirectionWidth = new Vec3();
			normalDirectionHeight = new Vec3();
			normalDirectionDepth = new Vec3();
			halfDirectionWidth = new Vec3();
			halfDirectionHeight = new Vec3();
			halfDirectionDepth = new Vec3();
			vertex1 = new Vec3();
			vertex2 = new Vec3();
			vertex3 = new Vec3();
			vertex4 = new Vec3();
			vertex5 = new Vec3();
			vertex6 = new Vec3();
			vertex7 = new Vec3();
			vertex8 = new Vec3();
			type = SHAPE_BOX;
		}
		
		/**
		 * @inheritDoc
		 */
		override public function calculateMassInfo(out:MassInfo):void {
			var mass:Number = width * height * depth * density;
			out.mass = mass;
			out.inertia.init(
				mass * (height * height + depth * depth) / 12, 0, 0,
				0, mass * (width * width + depth * depth) / 12, 0,
				0, 0, mass * (width * width + height * height) / 12
			);
		}
		
		/**
		 * @inheritDoc
		 */
		override public function updateProxy():void {
			normalDirectionWidth.x = rotation.e00;
			normalDirectionWidth.y = rotation.e10;
			normalDirectionWidth.z = rotation.e20;
			normalDirectionHeight.x = rotation.e01;
			normalDirectionHeight.y = rotation.e11;
			normalDirectionHeight.z = rotation.e21;
			normalDirectionDepth.x = rotation.e02;
			normalDirectionDepth.y = rotation.e12;
			normalDirectionDepth.z = rotation.e22;
			halfDirectionWidth.x = rotation.e00 * halfWidth;
			halfDirectionWidth.y = rotation.e10 * halfWidth;
			halfDirectionWidth.z = rotation.e20 * halfWidth;
			halfDirectionHeight.x = rotation.e01 * halfHeight;
			halfDirectionHeight.y = rotation.e11 * halfHeight;
			halfDirectionHeight.z = rotation.e21 * halfHeight;
			halfDirectionDepth.x = rotation.e02 * halfDepth;
			halfDirectionDepth.y = rotation.e12 * halfDepth;
			halfDirectionDepth.z = rotation.e22 * halfDepth;
			var wx:Number = halfDirectionWidth.x;
			var wy:Number = halfDirectionWidth.y;
			var wz:Number = halfDirectionWidth.z;
			var hx:Number = halfDirectionHeight.x;
			var hy:Number = halfDirectionHeight.y;
			var hz:Number = halfDirectionHeight.z;
			var dx:Number = halfDirectionDepth.x;
			var dy:Number = halfDirectionDepth.y;
			var dz:Number = halfDirectionDepth.z;
			var x:Number = position.x;
			var y:Number = position.y;
			var z:Number = position.z;
			vertex1.x = x + wx + hx + dx;
			vertex1.y = y + wy + hy + dy;
			vertex1.z = z + wz + hz + dz;
			vertex2.x = x + wx + hx - dx;
			vertex2.y = y + wy + hy - dy;
			vertex2.z = z + wz + hz - dz;
			vertex3.x = x + wx - hx + dx;
			vertex3.y = y + wy - hy + dy;
			vertex3.z = z + wz - hz + dz;
			vertex4.x = x + wx - hx - dx;
			vertex4.y = y + wy - hy - dy;
			vertex4.z = z + wz - hz - dz;
			vertex5.x = x - wx + hx + dx;
			vertex5.y = y - wy + hy + dy;
			vertex5.z = z - wz + hz + dz;
			vertex6.x = x - wx + hx - dx;
			vertex6.y = y - wy + hy - dy;
			vertex6.z = z - wz + hz - dz;
			vertex7.x = x - wx - hx + dx;
			vertex7.y = y - wy - hy + dy;
			vertex7.z = z - wz - hz + dz;
			vertex8.x = x - wx - hx - dx;
			vertex8.y = y - wy - hy - dy;
			vertex8.z = z - wz - hz - dz;
			var w:Number;
			var h:Number;
			var d:Number;
			if (halfDirectionWidth.x < 0) {
				w = -halfDirectionWidth.x;
			} else {
				w = halfDirectionWidth.x;
			}
			if (halfDirectionWidth.y < 0) {
				h = -halfDirectionWidth.y;
			} else {
				h = halfDirectionWidth.y;
			}
			if (halfDirectionWidth.z < 0) {
				d = -halfDirectionWidth.z;
			} else {
				d = halfDirectionWidth.z;
			}
			if (halfDirectionHeight.x < 0) {
				w -= halfDirectionHeight.x;
			} else {
				w += halfDirectionHeight.x;
			}
			if (halfDirectionHeight.y < 0) {
				h -= halfDirectionHeight.y;
			} else {
				h += halfDirectionHeight.y;
			}
			if (halfDirectionHeight.z < 0) {
				d -= halfDirectionHeight.z;
			} else {
				d += halfDirectionHeight.z;
			}
			if (halfDirectionDepth.x < 0) {
				w -= halfDirectionDepth.x;
			} else {
				w += halfDirectionDepth.x;
			}
			if (halfDirectionDepth.y < 0) {
				h -= halfDirectionDepth.y;
			} else {
				h += halfDirectionDepth.y;
			}
			if (halfDirectionDepth.z < 0) {
				d -= halfDirectionDepth.z;
			} else {
				d += halfDirectionDepth.z;
			}
			aabb.init(
				position.x - w - 0.005, position.x + w + 0.005,
				position.y - h - 0.005, position.y + h + 0.005,
				position.z - d - 0.005, position.z + d + 0.005
			);
			if (proxy != null) {
				proxy.update();
			}
		}
		
	}

}