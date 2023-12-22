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
package com.element.oimo.physics.collision.broadphase.dbvt {
	import com.element.oimo.physics.collision.broadphase.AABB;
	import com.element.oimo.physics.collision.broadphase.BroadPhase;
	import com.element.oimo.physics.collision.broadphase.Proxy;
	import com.element.oimo.physics.collision.shape.Shape;
	/**
	 * A broad-phase algorithm using dynamic bounding volume tree.
	 * @author saharan
	 */
	public class DBVTBroadPhase extends BroadPhase {
		public var tree:DBVT;
		private var stack:Vector.<DBVTNode>;
		private var maxStack:int;
		private var leaves:Vector.<DBVTNode>;
		private var numLeaves:int;
		private var maxLeaves:int;
		
		public function DBVTBroadPhase() {
			tree = new DBVT();
			maxStack = 256;
			stack = new Vector.<DBVTNode>(maxStack, true);
			maxLeaves = 256;
			leaves = new Vector.<DBVTNode>(maxLeaves, true);
		}
		
		override public function createProxy(shape:Shape):Proxy {
			return new DBVTProxy(shape);
		}
		
		override public function addProxy(proxy:Proxy):void {
			var p:DBVTProxy = DBVTProxy(proxy);
			tree.insertLeaf(p.leaf);
			if (numLeaves == maxLeaves) {
				maxLeaves <<= 1;
				var newLeaves:Vector.<DBVTNode> = new Vector.<DBVTNode>(maxLeaves, true);
				for (var i:int = 0; i < numLeaves; i++) {
					newLeaves[i] = leaves[i];
				}
				leaves = newLeaves;
			}
			leaves[numLeaves++] = p.leaf;
		}
		
		override public function removeProxy(proxy:Proxy):void {
			var p:DBVTProxy = DBVTProxy(proxy);
			tree.deleteLeaf(p.leaf);
			for (var i:int = 0; i < numLeaves; i++) {
				if (leaves[i] == p.leaf) {
					leaves[i] = leaves[--numLeaves];
					leaves[numLeaves] = null;
					return;
				}
			}
		}
		
		override protected function collectPairs():void {
			if (numLeaves < 2) return;
			for (var i:int = 0; i < numLeaves; i++) {
				var leaf:DBVTNode = leaves[i];
				var trueB:AABB = leaf.proxy.aabb;
				var leafB:AABB = leaf.aabb;
				if (
					trueB.minX < leafB.minX || trueB.maxX > leafB.maxX ||
					trueB.minY < leafB.minY || trueB.maxY > leafB.maxY ||
					trueB.minZ < leafB.minZ || trueB.maxZ > leafB.maxZ
				) { // the leaf needs correcting
					var margin:Number = 0.1;
					tree.deleteLeaf(leaf);
					leafB.minX = trueB.minX - margin;
					leafB.maxX = trueB.maxX + margin;
					leafB.minY = trueB.minY - margin;
					leafB.maxY = trueB.maxY + margin;
					leafB.minZ = trueB.minZ - margin;
					leafB.maxZ = trueB.maxZ + margin;
					tree.insertLeaf(leaf);
					collide(leaf, tree.root);
				}
			}
		}
		
		private function collide(node1:DBVTNode, node2:DBVTNode):void {
			var stackCount:int = 2;
			stack[0] = node1;
			stack[1] = node2;
			while (stackCount > 0) {
				var n1:DBVTNode = stack[--stackCount];
				var n2:DBVTNode = stack[--stackCount];
				var l1:Boolean = n1.proxy != null;
				var l2:Boolean = n2.proxy != null;
				numPairChecks++;
				if (l1 && l2) {
					var s1:Shape = n1.proxy.shape;
					var s2:Shape = n2.proxy.shape;
					var b1:AABB = s1.aabb;
					var b2:AABB = s2.aabb;
					if (
						s1 == s2 ||
						b1.maxX < b2.minX || b1.minX > b2.maxX ||
						b1.maxY < b2.minY || b1.minY > b2.maxY ||
						b1.maxZ < b2.minZ || b1.minZ > b2.maxZ ||
						!isAvailablePair(s1, s2)
					) {
						continue;
					}
					addPair(s1, s2);
				} else {
					b1 = n1.aabb;
					b2 = n2.aabb;
					if (
						b1.maxX < b2.minX || b1.minX > b2.maxX ||
						b1.maxY < b2.minY || b1.minY > b2.maxY ||
						b1.maxZ < b2.minZ || b1.minZ > b2.maxZ
					) {
						continue;
					}
					if (stackCount + 4 >= maxStack) { // expand the stack
						maxStack <<= 1;
						var newStack:Vector.<DBVTNode> = new Vector.<DBVTNode>(maxStack, true);
						for (var i:int = 0; i < stackCount; i++) {
							newStack[i] = stack[i];
						}
						stack = newStack;
					}
					if (l2 || !l1 && (n1.aabb.surfaceArea() > n2.aabb.surfaceArea())) {
						stack[stackCount++] = n1.child1;
						stack[stackCount++] = n2;
						stack[stackCount++] = n1.child2;
						stack[stackCount++] = n2;
					} else {
						stack[stackCount++] = n1;
						stack[stackCount++] = n2.child1;
						stack[stackCount++] = n1;
						stack[stackCount++] = n2.child2;
					}
				}
			}
		}
		
	}

}