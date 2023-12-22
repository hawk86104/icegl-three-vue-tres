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
package com.element.oimo.math {
	/**
	 * A 3D vector. This supports three-dimansional vector operations.
	 * @author saharan
	 */
	public class Vec3 {
		public var x:Number;
		public var y:Number;
		public var z:Number;
		
		/**
		 * Constructor.
		 * If the parameters are empty, the vector will be set to the zero vector.
		 * @param	x
		 * @param	y
		 * @param	z
		 */
		public function Vec3(x:Number = 0, y:Number = 0, z:Number = 0) {
			this.x = x;
			this.y = y;
			this.z = z;
		}
		
		/**
		 * Initialize the vector.
		 * If the parameters are empty, the vector will be set to the zero vector.
		 * @param	x
		 * @param	y
		 * @param	z
		 * @return
		 */
		public function init(x:Number = 0, y:Number = 0, z:Number = 0):Vec3 {
			this.x = x;
			this.y = y;
			this.z = z;
			return this;
		}
		
		/**
		 * this = v1 + v2
		 * @param	v1
		 * @param	v2
		 * @return
		 */
		public function add(v1:Vec3, v2:Vec3):Vec3 {
			x = v1.x + v2.x;
			y = v1.y + v2.y;
			z = v1.z + v2.z;
			return this;
		}
		
		/**
		 * this = this + v
		 * @param	v
		 * @return
		 */
		public function addEqual(v:Vec3):Vec3 {
			x += v.x;
			y += v.y;
			z += v.z;
			return this;
		}
		
		/**
		 * this = v1 - v2
		 * @param	v1
		 * @param	v2
		 * @return
		 */
		public function sub(v1:Vec3, v2:Vec3):Vec3 {
			x = v1.x - v2.x;
			y = v1.y - v2.y;
			z = v1.z - v2.z;
			return this;
		}
		
		/**
		 * this = this - v
		 * @param	v
		 * @return
		 */
		public function subEqual(v:Vec3):Vec3 {
			x -= v.x;
			y -= v.y;
			z -= v.z;
			return this;
		}
		
		/**
		 * this = v * s
		 * @param	v
		 * @param	s
		 * @return
		 */
		public function scale(v:Vec3, s:Number):Vec3 {
			x = v.x * s;
			y = v.y * s;
			z = v.z * s;
			return this;
		}
		
		/**
		 * this = this * s
		 * @param	s
		 * @return
		 */
		public function scaleEqual(s:Number):Vec3 {
			x *= s;
			y *= s;
			z *= s;
			return this;
		}
		
		/**
		 * Get the dot production of this vector and v.
		 * @param	v
		 * @return
		 */
		public function dot(v:Vec3):Number {
			return x * v.x + y * v.y + z * v.z;
		}
		
		/**
		 * Set this vector to the cross product of v1 and v2.
		 * @param	v1
		 * @param	v2
		 * @return
		 */
		public function cross(v1:Vec3, v2:Vec3):Vec3 {
			var x:Number = v1.y * v2.z - v1.z * v2.y;
			var y:Number = v1.z * v2.x - v1.x * v2.z;
			var z:Number = v1.x * v2.y - v1.y * v2.x;
			this.x = x;
			this.y = y;
			this.z = z;
			return this;
		}
		
		/**
		 * this = m * v
		 * @param	m
		 * @param	v
		 * @return
		 */
		public function mulMat(m:Mat33, v:Vec3):Vec3 {
			var x:Number = m.e00 * v.x + m.e01 * v.y + m.e02 * v.z;
			var y:Number = m.e10 * v.x + m.e11 * v.y + m.e12 * v.z;
			var z:Number = m.e20 * v.x + m.e21 * v.y + m.e22 * v.z;
			this.x = x;
			this.y = y;
			this.z = z;
			return this;
		}
		
		/**
		 * Set this vector to the normalized vector of v.
		 * @param	v
		 * @return
		 */
		public function normalize(v:Vec3):Vec3 {
			var length:Number = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
			if (length > 0) length = 1 / length;
			x = v.x * length;
			y = v.y * length;
			z = v.z * length;
			return this;
		}
		
		/**
		 * this = -v
		 * @param	v
		 * @return
		 */
		public function invert(v:Vec3):Vec3 {
			x = -v.x;
			y = -v.y;
			z = -v.z;
			return this;
		}
		
		/**
		 * Get the length of the vector.
		 * @return
		 */
		public function length():Number {
			return Math.sqrt(x * x + y * y + z * z);
		}
		
		/**
		 * this = v
		 * @param	v
		 * @return
		 */
		public function copy(v:Vec3):Vec3 {
			x = v.x;
			y = v.y;
			z = v.z;
			return this;
		}
		
		/**
		 * Get the clone of the vector.
		 * @return
		 */
		public function clone():Vec3 {
			return new Vec3(x, y, z);
		}
		
		/**
		 * Get the string of the vector.
		 * @return
		 */
		public function toString():String {
			return "Vec3[" + x.toFixed(4) + ", " + y.toFixed(4) + ", " + z.toFixed(4) + "]";
		}
		
	}

}