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
	import com.element.oimo.physics.constraint.joint.DistanceJoint;
	import com.element.oimo.physics.constraint.joint.HingeJoint;
	import com.element.oimo.physics.constraint.joint.JointConfig;
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * ...
	 * @author saharan
	 */
	public class BridgeDemo extends DemoBase {
		
		public function BridgeDemo() {
			title = "Bridge demo";
		}
		
		override public function reset():void {
			var sc:ShapeConfig = new ShapeConfig();
			var jc:JointConfig = new JointConfig(); // ジョイントの共通設定
			var body:RigidBody;
			
			var x:Number = 0;
			var y:Number = 4;
			var z:Number = 20;
			var num:int = 40;
			var width:Number = 4;
			var depth:Number = 1;
			
			jc.localAxis1.init(1, 0, 0);
			jc.localAxis2.init(1, 0, 0);
			
			sc.density = 2; // 安定化のため橋を重めにする
			
			body = new RigidBody(x, y, z);
			body.addShape(new BoxShape(sc, width, 0.4, depth));
			body.setupMass(RigidBody.BODY_STATIC);
			world.addRigidBody(body);
			
			for (var i:int = 0; i < num; i++) {
				jc.localAnchorPoint1.init(0, 0, -depth * 0.5);
				jc.localAnchorPoint2.init(0, 0, depth * 0.5);
				jc.body1 = body;
				
				body = new RigidBody(x, y, z - (i + 1) * depth);
				body.addShape(new BoxShape(sc, width, 0.4, depth));
				body.setupMass(i == num - 1 ? RigidBody.BODY_STATIC : RigidBody.BODY_DYNAMIC);
				world.addRigidBody(body);
				jc.body2 = body;
				
				world.addJoint(new HingeJoint(jc));
				
				if ((i + 1) % 10 == 0 && body.isDynamic) { // 適当な間隔で支えを追加する
					var prop:RigidBody = new RigidBody(x, y + 5, z - (i + 1) * depth);
					jc.body1 = body;
					jc.body2 = prop;
					prop.addShape(new SphereShape(sc, 0.2));
					prop.setupMass(RigidBody.BODY_STATIC);
					world.addRigidBody(prop);
					
					var d:DistanceJoint;
					var dist:Number = Math.sqrt(25 + width * width * 0.25);
					jc.localAnchorPoint2.init();
					
					jc.localAnchorPoint1.init(-width * 0.5, 0, 0);
					d = new DistanceJoint(jc, 1, dist);
					d.limitMotor.setSpring(2, 0.5); // ジョイントを柔らかくする
					world.addJoint(d);
					
					jc.localAnchorPoint1.init(width * 0.5, 0, 0);
					d = new DistanceJoint(jc, 1, dist);
					d.limitMotor.setSpring(2, 0.5); // ジョイントを柔らかくする
					world.addJoint(d);
				}
			}
			
			sc.density = 1;
			
			body = new RigidBody(x, y + 2, z - 6);
			body.addShape(new BoxShape(sc, 1.2, 1.2, 1.2));
			body.setupMass();
			world.addRigidBody(body);
			
			sc.friction = 2;
			sc.density = 10;
			control = new RigidBody(x, y + 2, z);
			control.addShape(new SphereShape(sc, 0.75));
			control.setupMass();
			world.addRigidBody(control);
		}
		
	}

}