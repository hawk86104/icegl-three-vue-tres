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
	import com.element.oimo.physics.collision.shape.BoxShape;
	import com.element.oimo.physics.collision.shape.Shape;
	import com.element.oimo.physics.collision.shape.ShapeConfig;
	import com.element.oimo.physics.collision.shape.SphereShape;
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * ...
	 * @author saharan
	 */
	public class BasicDemo extends DemoBase {
		
		public function BasicDemo() {
			title = "Basic demo";
		}
		
		override public function reset():void {
			var sc:ShapeConfig = new ShapeConfig();
			var body:RigidBody;
			var width:uint = 6;
			var height:uint = 6;
			var depth:uint = 6;
			var bWidth:Number = 0.5;
			var bHeight:Number = 0.5;
			var bDepth:Number = 0.5;
			for (var i:int = 0; i < width; i++) {
				for (var j:int = 0; j < height; j++) {
					for (var k:int = 0; k < depth; k++) {
						body = new RigidBody(
							(i - (width - 1) * 0.5) * bWidth, // 剛体を作成
							j * (bHeight * 1.01) + bHeight * 0.5,
							(k - (depth - 1) * 0.5) * bDepth
						);
						body.addShape(new BoxShape(sc, bWidth, bHeight, bDepth)); // 形状を追加
						body.setupMass(); // 質量情報を計算
						world.addRigidBody(body); // ワールドに追加
					}
					Shape.nextID++; // 色の調整
				}
				Shape.nextID++;
			}
			
			sc.friction = 2;
			sc.density = 10;
			control = new RigidBody(0, 0.75, 6);
			control.addShape(new SphereShape(sc, 0.75));
			control.setupMass();
			world.addRigidBody(control);
		}
		
	}

}