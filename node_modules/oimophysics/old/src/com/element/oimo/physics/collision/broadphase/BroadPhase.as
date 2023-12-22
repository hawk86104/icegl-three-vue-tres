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
package com.element.oimo.physics.collision.broadphase {
	import com.element.oimo.physics.collision.shape.Shape;
	import com.element.oimo.physics.constraint.joint.Joint;
	import com.element.oimo.physics.constraint.joint.JointLink;
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * The broad-phase is used for collecting all possible pairs for collision.
	 */
	public class BroadPhase {
		/**
		 * Brute force broad-phase algorithm.
		 */
		public static const BROAD_PHASE_BRUTE_FORCE:int = 1;
		
		/**
		 * Sweep and prune broad-phase algorithm.
		 */
		public static const BROAD_PHASE_SWEEP_AND_PRUNE:int = 2;
		
		/**
		 * Dynamic bounding volume tree broad-phase algorithm.
		 */
		public static const BROAD_PHASE_DYNAMIC_BOUNDING_VOLUME_TREE:int = 3;
		
		/**
		 * The pairs whose proxies are overlapping.
		 */
		public var pairs:Vector.<Pair>;
		
		/**
		 * The number of pairs.
		 */
		public var numPairs:uint;
		
		/**
		 * The number of pair checks.
		 */
		public var numPairChecks:uint;
		
		private var bufferSize:uint;
		
		public function BroadPhase() {
			bufferSize = 256;
			pairs = new Vector.<Pair>(bufferSize, true);
			for (var i:int = 0; i < bufferSize; i++) {
				pairs[i] = new Pair();
			}
		}
		
		/**
		 * Create a new proxy.
		 * @param	shape
		 * @return
		 */
		public function createProxy(shape:Shape):Proxy {
			throw new Error("Inheritance error.");
		}
		
		/**
		 * Add the proxy into the broad-phase.
		 * @param	proxy
		 */
		public function addProxy(proxy:Proxy):void {
			throw new Error("Inheritance error.");
		}
		
		/**
		 * Remove the proxy from the broad-phase.
		 * @param	proxy
		 */
		public function removeProxy(proxy:Proxy):void {
			throw new Error("Inheritance error.");
		}
		
		/**
		 * Returns whether the pair is available or not.
		 * @param	s1
		 * @param	s2
		 * @return
		 */
		public function isAvailablePair(s1:Shape, s2:Shape):Boolean {
			var b1:RigidBody = s1.parent;
			var b2:RigidBody = s2.parent;
			if (
				b1 == b2 || // same parents
				(!b1.isDynamic && !b2.isDynamic) || // static or kinematic objects
				(s1.belongsTo & s2.collidesWith) == 0 ||
				(s2.belongsTo & s1.collidesWith) == 0 // collision filtering
			) {
				return false;
			}
			var js:JointLink;
			if (b1.numJoints < b2.numJoints) js = b1.jointLink;
			else js = b2.jointLink;
			while (js != null) {
				var joint:Joint = js.joint;
				if (
					!joint.allowCollision &&
					(joint.body1 == b1 && joint.body2 == b2 ||
					joint.body1 == b2 && joint.body2 == b1)
				) {
					return false;
				}
				js = js.next;
			}
			return true;
		}
		
		/**
		 * Detect overlapping pairs.
		 */
		public function detectPairs():void {
			while (numPairs > 0) {
				var pair:Pair = pairs[--numPairs];
				pair.shape1 = null;
				pair.shape2 = null;
			}
			numPairChecks = 0;
			collectPairs();
		}
		
		protected function collectPairs():void {
			throw new Error("Inheritance error.");
		}
		
		protected function addPair(s1:Shape, s2:Shape):void {
			if (numPairs == bufferSize) { // expand pair buffer
				var newBufferSize:uint = bufferSize << 1;
				var newPairs:Vector.<Pair> = new Vector.<Pair>(newBufferSize, true);
				for (var i:int = 0; i < bufferSize; i++) {
					newPairs[i] = pairs[i];
				}
				for (i = bufferSize; i < newBufferSize; i++) {
					newPairs[i] = new Pair();
				}
				pairs = newPairs;
				bufferSize = newBufferSize;
			}
			var pair:Pair = pairs[numPairs++];
			pair.shape1 = s1;
			pair.shape2 = s2;
		}
		
	}

}