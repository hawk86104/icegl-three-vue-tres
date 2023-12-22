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
package com.element.oimo.physics.constraint {
	import com.element.oimo.physics.dynamics.RigidBody;
	import com.element.oimo.physics.dynamics.World;
	/**
	 * The base class of all type of the constraints.
	 * @author saharan
	 */
	public class Constraint {
		/**
		 * The parent world of the constraint.
		 */
		public var parent:World;
		
		/**
		 * The first body of the constraint.
		 */
		public var body1:RigidBody;
		
		/**
		 * The second body of the constraint.
		 */
		public var body2:RigidBody;
		
		/**
		 * Internal
		 */
		public var addedToIsland:Boolean;
		
		public function Constraint() {
		}
		
		/**
		 * Prepare for solving the constraint.
		 * @param	timeStep
		 * @param	invTimeStep
		 */
		public function preSolve(timeStep:Number, invTimeStep:Number):void {
			throw new Error("Inheritance error.");
		}
		
		/**
		 * Solve the constraint.
		 * This is usually called iteratively.
		 */
		public function solve():void {
			throw new Error("Inheritance error.");
		}
		
		/**
		 * Do the post-processing.
		 */
		public function postSolve():void {
			throw new Error("Inheritance error.");
		}
		
	}

}