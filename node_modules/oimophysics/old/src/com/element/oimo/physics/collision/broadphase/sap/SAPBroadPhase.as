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
package com.element.oimo.physics.collision.broadphase.sap {
	import com.element.oimo.physics.collision.broadphase.BroadPhase;
	import com.element.oimo.physics.collision.broadphase.Proxy;
	import com.element.oimo.physics.collision.shape.Shape;
	import com.element.oimo.physics.dynamics.RigidBody;
	import com.element.oimo.physics.dynamics.World;
	import flash.utils.getTimer;
	/**
	 * A broad-phase collision detection algorithm using sweep and prune.
	 * @author saharan
	 */
	public class SAPBroadPhase extends BroadPhase {
		private const axesD:Vector.<SAPAxis> = new Vector.<SAPAxis>(3, true); // dynamic proxies
		private const axesS:Vector.<SAPAxis> = new Vector.<SAPAxis>(3, true); // static or sleeping proxies
		private var index1:int;
		private var index2:int;
		private var numElementsD:uint;
		private var numElementsS:uint;
		
		public function SAPBroadPhase() {
			axesD[0] = new SAPAxis();
			axesD[1] = new SAPAxis();
			axesD[2] = new SAPAxis();
			axesS[0] = new SAPAxis();
			axesS[1] = new SAPAxis();
			axesS[2] = new SAPAxis();
			index1 = 0;
			index2 = 1;
		}
		
		override public function createProxy(shape:Shape):Proxy {
			return new SAPProxy(this, shape);
		}
		
		/**
		 * @inheritDoc
		 */
		override public function addProxy(proxy:Proxy):void {
			var p:SAPProxy = SAPProxy(proxy);
			if (p.isDynamic()) {
				axesD[0].addElements(p.min[0], p.max[0]);
				axesD[1].addElements(p.min[1], p.max[1]);
				axesD[2].addElements(p.min[2], p.max[2]);
				p.belongsTo = 1;
				numElementsD += 2;
			} else {
				axesS[0].addElements(p.min[0], p.max[0]);
				axesS[1].addElements(p.min[1], p.max[1]);
				axesS[2].addElements(p.min[2], p.max[2]);
				p.belongsTo = 2;
				numElementsS += 2;
			}
		}
		
		/**
		 * @inheritDoc
		 */
		override public function removeProxy(proxy:Proxy):void {
			var p:SAPProxy = SAPProxy(proxy);
			if (p.belongsTo == 0) return;
			switch(p.belongsTo) {
			case 1:
				axesD[0].removeElements(p.min[0], p.max[0]);
				axesD[1].removeElements(p.min[1], p.max[1]);
				axesD[2].removeElements(p.min[2], p.max[2]);
				numElementsD -= 2;
				break;
			case 2:
				axesS[0].removeElements(p.min[0], p.max[0]);
				axesS[1].removeElements(p.min[1], p.max[1]);
				axesS[2].removeElements(p.min[2], p.max[2]);
				numElementsS -= 2;
				break;
			}
			p.belongsTo = 0;
		}
		
		override protected function collectPairs():void {
			if (numElementsD == 0) return;
			var axis1:SAPAxis = axesD[index1];
			var axis2:SAPAxis = axesD[index2];
			axis1.sort();
			axis2.sort();
			var count1:int = axis1.calculateTestCount();
			var count2:int = axis2.calculateTestCount();
			var elementsD:Vector.<SAPElement>;
			var elementsS:Vector.<SAPElement>;
			if (count1 <= count2) { // select the best axis
				axis2 = axesS[index1];
				axis2.sort();
				elementsD = axis1.elements;
				elementsS = axis2.elements;
			} else {
				axis1 = axesS[index2];
				axis1.sort();
				elementsD = axis2.elements;
				elementsS = axis1.elements;
				index1 ^= index2;
				index2 ^= index1;
				index1 ^= index2;
			}
			var activeD:SAPElement;
			var activeS:SAPElement;
			var p:int = 0;
			var q:int = 0;
			while (p < numElementsD) {
				var e1:SAPElement;
				var dyn:Boolean;
				if (q == numElementsS) {
					e1 = elementsD[p];
					dyn = true;
					p++;
				} else {
					var d:SAPElement = elementsD[p];
					var s:SAPElement = elementsS[q];
					if (d.value < s.value) {
						e1 = d;
						dyn = true;
						p++;
					} else {
						e1 = s;
						dyn = false;
						q++;
					}
				}
				if (!e1.max) {
					var s1:Shape = e1.proxy.shape;
					const min1:Number = e1.min1.value;
					const max1:Number = e1.max1.value;
					const min2:Number = e1.min2.value;
					const max2:Number = e1.max2.value;
					for (var e2:SAPElement = activeD; e2 != null; e2 = e2.pair) { // test for dynamic
						var s2:Shape = e2.proxy.shape;
						numPairChecks++;
						if (
							min1 > e2.max1.value || max1 < e2.min1.value ||
							min2 > e2.max2.value || max2 < e2.min2.value ||
							!isAvailablePair(s1, s2)
						) {
							continue;
						}
						addPair(s1, s2);
					}
					if (dyn) {
						for (e2 = activeS; e2 != null; e2 = e2.pair) { // test for static
							s2 = e2.proxy.shape;
							numPairChecks++;
							if (
								min1 > e2.max1.value || max1 < e2.min1.value ||
								min2 > e2.max2.value || max2 < e2.min2.value ||
								!isAvailablePair(s1, s2)
							) {
								continue;
							}
							addPair(s1, s2);
						}
						e1.pair = activeD;
						activeD = e1;
					} else {
						e1.pair = activeS;
						activeS = e1;
					}
				} else {
					var min:SAPElement = e1.pair;
					if (dyn) {
						if (min == activeD) {
							activeD = activeD.pair;
							continue;
						} else {
							e1 = activeD;
						}
					} else {
						if (min == activeS) {
							activeS = activeS.pair;
							continue;
						} else {
							e1 = activeS;
						}
					}
					do {
						e2 = e1.pair;
						if (e2 == min) {
							e1.pair = e2.pair;
							break;
						}
						e1 = e2;
					} while (e1 != null);
				}
			}
			index2 = (index1 | index2) ^ 3;
		}
		
	}

}