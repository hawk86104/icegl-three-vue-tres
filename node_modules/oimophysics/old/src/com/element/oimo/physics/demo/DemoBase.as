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
package com.element.oimo.physics.demo {
	import com.element.oimo.physics.dynamics.RigidBody;
	import com.element.oimo.physics.dynamics.World;
	import com.element.oimo.physics.util.DebugDraw;
	/**
	 * ...
	 * @author saharan
	 */
	public class DemoBase {
		public var prev:DemoBase;
		public var next:DemoBase;
		public var world:World;
		public var draw:DebugDraw;
		public var control:RigidBody;
		public var title:String;
		
		public function DemoBase() {
		}
		
		public function reset():void {
		}
		
		public function update():void {
		}
		
		public function cameraControl(pi:Number, theta:Number):void {
			var ps:Number = Math.sin(pi);
			var pc:Number = Math.cos(pi);
			var ts:Number = Math.sin(theta);
			var tc:Number = Math.cos(theta);
			draw.camera(
				control.position.x + ts * pc * 6,
				control.position.y + tc * 12,
				control.position.z + ts * ps * 6,
				control.position.x - pc * 2,
				control.position.y,
				control.position.z - ps * 2
			);
		}
		
		public function userControl(up:Boolean, down:Boolean, left:Boolean, right:Boolean, pi:Number, theta:Number):void {
			if (up) {
				control.linearVelocity.x -= Math.cos(pi) * 0.8;
				control.linearVelocity.z -= Math.sin(pi) * 0.8;
			}
			if (down) {
				control.linearVelocity.x += Math.cos(pi) * 0.8;
				control.linearVelocity.z += Math.sin(pi) * 0.8;
			}
			if (left) {
				control.linearVelocity.x -= Math.cos(pi - Math.PI * 0.5) * 0.8;
				control.linearVelocity.z -= Math.sin(pi - Math.PI * 0.5) * 0.8;
			}
			if (right) {
				control.linearVelocity.x -= Math.cos(pi + Math.PI * 0.5) * 0.8;
				control.linearVelocity.z -= Math.sin(pi + Math.PI * 0.5) * 0.8;
			}
			if (!up && !down && !left && !right) {
				control.angularVelocity.scaleEqual(0.98);
			}
		}
		
	}

}