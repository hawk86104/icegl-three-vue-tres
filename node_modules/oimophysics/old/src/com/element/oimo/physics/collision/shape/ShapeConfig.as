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
	import com.element.oimo.math.Mat33;
	import com.element.oimo.math.Vec3;
	/**
	 * A shape configuration holds common configuration data for constructing a shape.
	 * Shape configurations can be reused safely.
	 * @author saharan
	 */
	public class ShapeConfig {
		/**
		 * The position of the shape in parent's coordinate system.
		 */
		public var relativePosition:Vec3;
		
		/**
		 * The rotation matrix of the shape in parent's coordinate system.
		 */
		public var relativeRotation:Mat33;
		
		/**
		 * The coefficient of friction of the shape.
		 */
		public var friction:Number;
		
		/**
		 * The coefficient of restitution of the shape.
		 */
		public var restitution:Number;
		
		/**
		 * The density of the shape.
		 */
		public var density:Number;
		
		/**
		 * The bits of the collision groups to which the shape belongs.
		 */
		public var belongsTo:int;
		
		/**
		 * The bits of the collision groups with which the shape collides.
		 */
		public var collidesWith:int;
		
		public function ShapeConfig() {
			relativePosition = new Vec3();
			relativeRotation = new Mat33();
			friction = 0.4;
			restitution = 0.2;
			density = 1;
			belongsTo = 1;
			collidesWith = 0xffffffff;
		}
		
	}

}