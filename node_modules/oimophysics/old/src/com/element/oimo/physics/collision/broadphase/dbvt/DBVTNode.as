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
	/**
	 * A node of the dynamic bounding volume tree.
	 * @author saharan
	 */
	public class DBVTNode {
		/**
		 * The first child node of this node.
		 */
		public var child1:DBVTNode;
		
		/**
		 * The second child node of this node.
		 */
		public var child2:DBVTNode;
		
		/**
		 * The parent node of this tree.
		 */
		public var parent:DBVTNode;
		
		/**
		 * The proxy of this node. This has no value if this node is not leaf.
		 */
		public var proxy:DBVTProxy;
		
		/**
		 * The maximum distance from leaf nodes.
		 */
		public var height:int;
		
		/**
		 * The AABB of this node.
		 */
		public var aabb:AABB;
		
		public function DBVTNode() {
			aabb = new AABB();
		}
		
	}

}