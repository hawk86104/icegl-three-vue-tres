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
	import com.element.oimo.physics.collision.narrowphase.CollisionDetector;
	import com.element.oimo.physics.collision.shape.Shape;
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * A contact is a pair of shapes whose axis-aligned bounding boxes are overlapping.
	 * @author saharan
	 */
	public class Contact {
		private var b1Link:ContactLink;
		private var b2Link:ContactLink;
		private var s1Link:ContactLink;
		private var s2Link:ContactLink;
		
		/**
		 * The first shape.
		 */
		public var shape1:Shape;
		
		/**
		 * The second shape.
		 */
		public var shape2:Shape;
		
		/**
		 * The first rigid body.
		 */
		public var body1:RigidBody;
		
		/**
		 * The second rigid body.
		 */
		public var body2:RigidBody;
		
		/**
		 * The previous contact in the world.
		 */
		public var prev:Contact;
		
		/**
		 * The next contact in the world.
		 */
		public var next:Contact;
		
		/**
		 * Internal
		 */
		public var persisting:Boolean;
		
		/**
		 * Whether both the rigid bodies are sleeping or not.
		 */
		public var sleeping:Boolean;
		
		/**
		 * The collision detector between two shapes.
		 */
		public var detector:CollisionDetector;
		
		/**
		 * The contact manifold of the contact.
		 */
		public var manifold:ContactManifold;
		
		/**
		 * The contact constraint of the contact.
		 */
		public var constraint:ContactConstraint;
		
		/**
		 * Whether the shapes are touching or not.
		 */
		public var touching:Boolean;
		
		private var buffer:Vector.<ImpulseDataBuffer>;
		private var points:Vector.<ManifoldPoint>;
		
		public function Contact() {
			b1Link = new ContactLink(this);
			b2Link = new ContactLink(this);
			s1Link = new ContactLink(this);
			s2Link = new ContactLink(this);
			manifold = new ContactManifold();
			buffer = new Vector.<ImpulseDataBuffer>(4, true);
			buffer[0] = new ImpulseDataBuffer();
			buffer[1] = new ImpulseDataBuffer();
			buffer[2] = new ImpulseDataBuffer();
			buffer[3] = new ImpulseDataBuffer();
			points = manifold.points;
			constraint = new ContactConstraint(manifold);
		}
		
		private function mixRestitution(restitution1:Number, restitution2:Number):Number {
			return Math.sqrt(restitution1 * restitution2);
		}
		
		private function mixFriction(friction1:Number, friction2:Number):Number {
			return Math.sqrt(friction1 * friction2);
		}
		
		/**
		 * Update the contact manifold.
		 */
		public function updateManifold():void {
			constraint.restitution = mixRestitution(shape1.restitution, shape2.restitution);
			constraint.friction = mixFriction(shape1.friction, shape2.friction);
			
			var numBuffers:uint = manifold.numPoints;
			for (var i:int = 0; i < numBuffers; i++) {
				var b:ImpulseDataBuffer = buffer[i];
				var p:ManifoldPoint = points[i];
				b.lp1X = p.localPoint1.x;
				b.lp1Y = p.localPoint1.y;
				b.lp1Z = p.localPoint1.z;
				b.lp2X = p.localPoint2.x;
				b.lp2Y = p.localPoint2.y;
				b.lp2Z = p.localPoint2.z;
				b.impulse = p.normalImpulse;
			}
			manifold.numPoints = 0;
			detector.detectCollision(shape1, shape2, manifold);
			var num:uint = manifold.numPoints;
			if (num == 0) {
				touching = false;
				return;
			}
			touching = true;
			for (i = 0; i < num; i++) {
				p = points[i];
				var lp1x:Number = p.localPoint1.x;
				var lp1y:Number = p.localPoint1.y;
				var lp1z:Number = p.localPoint1.z;
				var lp2x:Number = p.localPoint2.x;
				var lp2y:Number = p.localPoint2.y;
				var lp2z:Number = p.localPoint2.z;
				var index:int = -1;
				var minDistance:Number = 0.0004; // 2cm
				for (var j:int = 0; j < numBuffers; j++) {
					b = buffer[j];
					var dx:Number = b.lp1X - lp1x;
					var dy:Number = b.lp1Y - lp1y;
					var dz:Number = b.lp1Z - lp1z;
					var distance1:Number = dx * dx + dy * dy + dz * dz;
					dx = b.lp2X - lp2x;
					dy = b.lp2Y - lp2y;
					dz = b.lp2Z - lp2z;
					var distance2:Number = dx * dx + dy * dy + dz * dz;
					if (distance1 < distance2) {
						if (distance1 < minDistance) {
							minDistance = distance1;
							index = j;
						}
					} else {
						if (distance2 < minDistance) {
							minDistance = distance2;
							index = j;
						}
					}
				}
				if (index != -1) {
					var tmp:ImpulseDataBuffer = buffer[index];
					buffer[index] = buffer[--numBuffers];
					buffer[numBuffers] = tmp;
					p.normalImpulse = tmp.impulse;
					p.warmStarted = true;
				} else {
					p.normalImpulse = 0;
					p.warmStarted = false;
				}
			}
		}
		
		/**
		 * Attach the contact to the shapes.
		 * @param	shape1
		 * @param	shape2
		 */
		public function attach(shape1:Shape, shape2:Shape):void {
			this.shape1 = shape1;
			this.shape2 = shape2;
			body1 = shape1.parent;
			body2 = shape2.parent;
			
			manifold.body1 = body1;
			manifold.body2 = body2;
			constraint.body1 = body1;
			constraint.body2 = body2;
			constraint.attach();
			
			s1Link.shape = shape2;
			s1Link.body = body2;
			s2Link.shape = shape1;
			s2Link.body = body1;
			
			if (shape1.contactLink != null) (s1Link.next = shape1.contactLink).prev = s1Link;
			else s1Link.next = null;
			shape1.contactLink = s1Link;
			shape1.numContacts++;
			
			if (shape2.contactLink != null) (s2Link.next = shape2.contactLink).prev = s2Link;
			else s2Link.next = null;
			shape2.contactLink = s2Link;
			shape2.numContacts++;
			
			b1Link.shape = shape2;
			b1Link.body = body2;
			b2Link.shape = shape1;
			b2Link.body = body1;
			
			if (body1.contactLink != null) (b1Link.next = body1.contactLink).prev = b1Link;
			else b1Link.next = null;
			body1.contactLink = b1Link;
			body1.numContacts++;
			
			if (body2.contactLink != null) (b2Link.next = body2.contactLink).prev = b2Link;
			else b2Link.next = null;
			body2.contactLink = b2Link;
			body2.numContacts++;
			
			prev = null;
			next = null;
			
			persisting = true;
			sleeping = body1.sleeping && body2.sleeping;
			manifold.numPoints = 0;
		}
		
		/**
		 * Detach the contact from the shapes.
		 */
		public function detach():void {
			var prev:ContactLink = s1Link.prev;
			var next:ContactLink = s1Link.next;
			if (prev != null) prev.next = next;
			if (next != null) next.prev = prev;
			if (shape1.contactLink == s1Link) shape1.contactLink = next;
			s1Link.prev = null;
			s1Link.next = null;
			s1Link.shape = null;
			s1Link.body = null;
			shape1.numContacts--;
			
			prev = s2Link.prev;
			next = s2Link.next;
			if (prev != null) prev.next = next;
			if (next != null) next.prev = prev;
			if (shape2.contactLink == s2Link) shape2.contactLink = next;
			s2Link.prev = null;
			s2Link.next = null;
			s2Link.shape = null;
			s2Link.body = null;
			shape2.numContacts--;
			
			prev = b1Link.prev;
			next = b1Link.next;
			if (prev != null) prev.next = next;
			if (next != null) next.prev = prev;
			if (body1.contactLink == b1Link) body1.contactLink = next;
			b1Link.prev = null;
			b1Link.next = null;
			b1Link.shape = null;
			b1Link.body = null;
			body1.numContacts--;
			
			prev = b2Link.prev;
			next = b2Link.next;
			if (prev != null) prev.next = next;
			if (next != null) next.prev = prev;
			if (body2.contactLink == b2Link) body2.contactLink = next;
			b2Link.prev = null;
			b2Link.next = null;
			b2Link.shape = null;
			b2Link.body = null;
			body2.numContacts--;
			
			manifold.body1 = null;
			manifold.body2 = null;
			constraint.body1 = null;
			constraint.body2 = null;
			constraint.detach();
			
			shape1 = null;
			shape2 = null;
			body1 = null;
			body2 = null;
		}
	}
}