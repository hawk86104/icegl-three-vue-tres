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
	import com.element.oimo.physics.collision.broadphase.AABB;
	import com.element.oimo.physics.collision.broadphase.Proxy;
	import com.element.oimo.physics.constraint.contact.ContactLink;
	import com.element.oimo.physics.dynamics.RigidBody;
	import com.element.oimo.math.Mat33;
	import com.element.oimo.math.Vec3;
	/**
	 * A shape is used to detect collisions of rigid bodies.
	 * @author saharan
	 */
	public class Shape {
		/**
		 * Global identification of next shape.
		 * This will be incremented every time a shape is created.
		 */
		public static var nextID:uint = 0;
		
		/**
		 * Sphere shape.
		 */
		public static const SHAPE_SPHERE:uint = 0x1;
		
		/**
		 * Box shape.
		 */
		public static const SHAPE_BOX:uint = 0x2;
		
		// TODO: Capsule shape
		
		/**
		 * The previous shape in parent rigid body.
		 */
		public var prev:Shape;
		
		/**
		 * The next shape in parent rigid body.
		 */
		public var next:Shape;
		
		/**
		 * The global identification of the shape.
		 * This value should be unique to the shape.
		 */
		public var id:uint;
		
		/**
		 * The type of the shape.
		 */
		public var type:uint;
		
		/**
		 * The center of gravity of the shape in world coordinate system.
		 */
		public var position:Vec3;
		
		/**
		 * The rotation matrix of the shape in world coordinate system.
		 */
		public var rotation:Mat33;
		
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
		 * The axis-aligned bounding box of the shape.
		 */
		public var aabb:AABB;
		
		/**
		 * The proxy of the shape.
		 * This is used for broad-phase collision detection.
		 */
		public var proxy:Proxy;
		
		/**
		 * The parent rigid body of the shape.
		 */
		public var parent:RigidBody;
		
		/**
		 * The linked list of the contacts with the shape.
		 */
		public var contactLink:ContactLink;
		
		/**
		 * The number of the contacts with the shape.
		 */
		public var numContacts:uint;
		
		/**
		 * The bits of the collision groups to which the shape belongs.
		 */
		public var belongsTo:int;
		
		/**
		 * The bits of the collision groups with which the shape collides.
		 */
		public var collidesWith:int;
		
		public function Shape(config:ShapeConfig) {
			id = ++nextID;
			position = new Vec3();
			relativePosition = new Vec3().copy(config.relativePosition);
			rotation = new Mat33();
			relativeRotation = new Mat33().copy(config.relativeRotation);
			aabb = new AABB();
			density = config.density;
			friction = config.friction;
			restitution = config.restitution;
			belongsTo = config.belongsTo;
			collidesWith = config.collidesWith;
		}
		
		/**
		 * Calculate the mass information of the shape.
		 * @param	out
		 */
		public function calculateMassInfo(out:MassInfo):void {
			throw new Error("Inheritance error.");
		}
		
		/**
		 * Update the proxy of the shape.
		 */
		public function updateProxy():void {
			throw new Error("Inheritance error.");
		}
		
	}

}