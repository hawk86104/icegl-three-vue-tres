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
	import com.element.oimo.physics.collision.shape.ShapeConfig;
	import com.element.oimo.physics.collision.shape.SphereShape;
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * ...
	 * @author saharan
	 */
	public class RestitutionDemo extends DemoBase {
		
		public function RestitutionDemo() {
			title = "Varying restitution";
		}
		
		override public function reset():void {
			var sc:ShapeConfig = new ShapeConfig();
			var body:RigidBody;
			
			sc.restitution = 0.7; // 弾みやすい床を用意
			body = new RigidBody(0, 0.1, 0);
			body.addShape(new BoxShape(sc, 8, 0.2, 3));
			body.setupMass(RigidBody.BODY_STATIC);
			world.addRigidBody(body);
			
			for (var i:int = 0; i < 6; i++) {
				sc.restitution = i * 0.2; // 反発係数を変更
				body = new RigidBody(i - 2.5, 3, 0);
				body.addShape(new SphereShape(sc, 0.4));
				body.setupMass();
				world.addRigidBody(body);
			}
			
			sc.restitution = 0.2;
			sc.friction = 2;
			sc.density = 10;
			control = new RigidBody(0, 0.75, 6);
			control.addShape(new SphereShape(sc, 0.75));
			control.setupMass();
			world.addRigidBody(control);
		}
		
	}

}