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
package com.element.oimo.physics.constraint.joint {
	import com.element.oimo.math.Mat33;
	import com.element.oimo.math.Vec3;
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * A joint configuration holds all configuration data for constructing a joint.
	 * Joint configurations can be reused safely.
	 * @author saharan
	 */
	public class JointConfig {
		/**
		 * The first rigid body of the joint.
		 */
		public var body1:RigidBody;
		
		/**
		 * The second rigid body of the joint.
		 */
		public var body2:RigidBody;
		
		/**
		 * The anchor point on the first rigid body in local coordinate system.
		 */
		public var localAnchorPoint1:Vec3;
		
		/**
		 * The anchor point on the second rigid body in local coordinate system.
		 */
		public var localAnchorPoint2:Vec3;
		
		/**
		 * The axis in the first body's coordinate system.
		 * This property is available in some joints.
		 */
		public var localAxis1:Vec3;
		
		/**
		 * The axis in the second body's coordinate system.
		 * This property is available in some joints.
		 */
		public var localAxis2:Vec3;
		
		/**
		 * Whether allow collision between connected rigid bodies or not.
		 */
		public var allowCollision:Boolean;
		
		public function JointConfig() {
			localAnchorPoint1 = new Vec3();
			localAnchorPoint2 = new Vec3();
			localAxis1 = new Vec3();
			localAxis2 = new Vec3();
			allowCollision = false;
		}
		
	}

}