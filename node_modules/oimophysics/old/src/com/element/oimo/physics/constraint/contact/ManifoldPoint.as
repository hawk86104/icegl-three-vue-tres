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
	import com.element.oimo.math.Vec3;
	/**
	 * The class holds details of the contact point.
	 * @author saharan
	 */
	public class ManifoldPoint {
		/**
		 * The position of this manifold point.
		 */
		public var position:Vec3;
		
		/**
		 * The position in the first shape's coordinate.
		 */
		public var localPoint1:Vec3;
		
		/**
		 * The position in the second shape's coordinate.
		 */
		public var localPoint2:Vec3;
		
		/**
		 * The normal vector of this manifold point.
		 */
		public var normal:Vec3;
		
		/**
		 * The tangent vector of this manifold point.
		 */
		public var tangent:Vec3;
		
		/**
		 * The binormal vector of this manifold point.
		 */
		public var binormal:Vec3;
		
		/**
		 * The impulse in normal direction.
		 */
		public var normalImpulse:Number;
		
		/**
		 * The impulse in tangent direction.
		 */
		public var tangentImpulse:Number;
		
		/**
		 * The impulse in binormal direction.
		 */
		public var binormalImpulse:Number;
		
		/**
		 * The denominator in normal direction.
		 */
		public var normalDenominator:Number;
		
		/**
		 * The denominator in tangent direction.
		 */
		public var tangentDenominator:Number;
		
		/**
		 * The denominator in binormal direction.
		 */
		public var binormalDenominator:Number;
		
		/**
		 * Whether this manifold point is persisting or not.
		 */
		public var warmStarted:Boolean;
		
		/**
		 * The depth of penetration.
		 */
		public var penetration:Number;
		
		public function ManifoldPoint() {
			position = new Vec3();
			localPoint1 = new Vec3();
			localPoint2 = new Vec3();
			normal = new Vec3();
			tangent = new Vec3();
			binormal = new Vec3();
			normalImpulse = 0;
			tangentImpulse = 0;
			binormalImpulse = 0;
			normalDenominator = 0;
			tangentDenominator = 0;
			binormalDenominator = 0;
			penetration = 0;
		}
		
	}

}