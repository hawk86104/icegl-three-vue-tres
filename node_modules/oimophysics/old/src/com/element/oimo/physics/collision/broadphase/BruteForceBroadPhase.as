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
	import com.element.oimo.physics.dynamics.RigidBody;
	import com.element.oimo.physics.dynamics.World;
	import flash.utils.getTimer;
	/**
	 * A broad-phase algorithm with brute-force search.
	 * This always checks for all possible pairs.
	 */
	public class BruteForceBroadPhase extends BroadPhase {
		private var proxies:Vector.<Proxy>;
		private var numProxies:int;
		private var maxProxies:int;
		
		public function BruteForceBroadPhase() {
			maxProxies = 256;
			proxies = new Vector.<Proxy>(maxProxies, true);
		}
		
		/**
		 * @inheritDoc
		 */
		override public function createProxy(shape:Shape):Proxy {
			return new BasicProxy(shape);
		}
		
		/**
		 * @inheritDoc
		 */
		override public function addProxy(proxy:Proxy):void {
			if (numProxies == maxProxies) {
				maxProxies <<= 1;
				var newProxies:Vector.<Proxy> = new Vector.<Proxy>(maxProxies, true);
				for (var i:int = 0; i < numProxies; i++) {
					newProxies[i] = proxies[i];
				}
				proxies = newProxies;
			}
			proxies[numProxies++] = proxy;
		}
		
		/**
		 * @inheritDoc
		 */
		override public function removeProxy(proxy:Proxy):void {
			for (var i:int = 0; i < numProxies; i++) {
				if (proxies[i] == proxy) {
					proxies[i] = proxies[--numProxies];
					proxies[numProxies] = null;
					return;
				}
			}
		}
		
		override protected function collectPairs():void {
			numPairChecks = numProxies * (numProxies - 1) >> 1;
			for (var i:int = 0; i < numProxies; i++) {
				var p1:Proxy = proxies[i];
				var b1:AABB = p1.aabb;
				var s1:Shape = p1.shape;
				for (var j:int = i + 1; j < numProxies; j++) {
					var p2:Proxy = proxies[j];
					var b2:AABB = p2.aabb;
					var s2:Shape = p2.shape;
					if (
						b1.maxX < b2.minX || b1.minX > b2.maxX ||
						b1.maxY < b2.minY || b1.minY > b2.maxY ||
						b1.maxZ < b2.minZ || b1.minZ > b2.maxZ ||
						!isAvailablePair(s1, s2)
					) {
						continue;
					}
					addPair(s1, s2);
				}
			}
		}
		
	}

}