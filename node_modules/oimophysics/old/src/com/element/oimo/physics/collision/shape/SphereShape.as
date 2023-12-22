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
	/**
	 * A sphere shape.
	 * @author saharan
	 */
	public class SphereShape extends Shape {
		/**
		 * The radius of the shape.
		 */
		public var radius:Number;
		
		public function SphereShape(config:ShapeConfig, radius:Number) {
			super(config);
			this.radius = radius;
			type = SHAPE_SPHERE;
		}
		
		/**
		 * @inheritDoc
		 */
		override public function calculateMassInfo(out:MassInfo):void {
			var mass:Number = 4 / 3 * Math.PI * radius * radius * radius * density;
			out.mass = mass;
			var inertia:Number = mass * radius * radius * 2 / 5;
			out.inertia.init(
				inertia, 0, 0,
				0, inertia, 0,
				0, 0, inertia
			);
		}
		
		/**
		 * @inheritDoc
		 */
		override public function updateProxy():void {
			aabb.init(
				position.x - radius - 0.005, position.x + radius + 0.005,
				position.y - radius - 0.005, position.y + radius + 0.005,
				position.z - radius - 0.005, position.z + radius + 0.005
			);
			if (proxy != null) {
				proxy.update();
			}
		}
		
	}

}