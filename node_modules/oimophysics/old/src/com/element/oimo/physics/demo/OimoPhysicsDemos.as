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
	import com.element.oimo.physics.dynamics.RigidBody;
	import com.element.oimo.physics.dynamics.World;
	import com.element.oimo.physics.util.DebugDraw;
	import flash.display.Sprite;
	import flash.display.Stage3D;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.ui.Keyboard;
	import net.hires.debug.Stats;
	/**
	 * OimoPhysics demos.
	 * @author saharan
	 */
	[SWF(width = "640", height = "480", frameRate = "60")]
	public class OimoPhysicsDemos extends Sprite {
		private var s3d:Stage3D;
		private var world:World;
		private var draw:DebugDraw;
		private var rigid:RigidBody;
		private var count:uint;
		private var tf:TextField;
		private var fps:Number;
		private var left:int;
		private var right:int;
		private var up:int;
		private var down:int;
		private var rotX:Number;
		private var rotY:Number;
		private var pmouseX:Number;
		private var pmouseY:Number;
		private var press:Boolean;
		private var control:RigidBody;
		private var demo:DemoBase;
		
		public function OimoPhysicsDemos() {
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void {
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			var debug:Stats = new Stats();
			debug.x = 570;
			addChild(debug);
			tf = new TextField();
			tf.selectable = false;
			tf.defaultTextFormat = new TextFormat("courier new", 12, 0xffffff);
			tf.x = 4;
			tf.y = 4;
			tf.width = 400;
			tf.height = 400;
			addChild(tf);
			fps = 0;
			pmouseX = 0;
			pmouseY = 0;
			
			s3d = stage.stage3Ds[0];
			s3d.addEventListener(Event.CONTEXT3D_CREATE, onContext3DCreated);
			s3d.requestContext3D();
			stage.addEventListener(MouseEvent.MOUSE_DOWN, function(e:MouseEvent):void {
				press = true;
			});
			stage.addEventListener(MouseEvent.MOUSE_UP, function(e:MouseEvent):void {
				press = false;
			});
			stage.addEventListener(KeyboardEvent.KEY_DOWN, function(e:KeyboardEvent):void {
				var code:uint = e.keyCode;
				if (code == Keyboard.Q) {
					prevDemo();
				}
				if (code == Keyboard.E) {
					nextDemo();
				}
				if (code == Keyboard.W) {
					up |= 1;
				}
				if (code == Keyboard.S) {
					down |= 1;
				}
				if (code == Keyboard.A) {
					left |= 1;
				}
				if (code == Keyboard.D) {
					right |= 1;
				}
				if (code == Keyboard.UP) {
					up |= 3;
				}
				if (code == Keyboard.DOWN) {
					down |= 3;
				}
				if (code == Keyboard.LEFT) {
					left |= 3;
				}
				if (code == Keyboard.RIGHT) {
					right |= 3;
				}
				if (code == Keyboard.SPACE) {
					reset();
				}
			});
			stage.addEventListener(KeyboardEvent.KEY_UP, function(e:KeyboardEvent):void {
				var code:uint = e.keyCode;
				if (code == Keyboard.W) {
					up &= ~1;
				}
				if (code == Keyboard.S) {
					down &= ~1;
				}
				if (code == Keyboard.A) {
					left &= ~1;
				}
				if (code == Keyboard.D) {
					right &= ~1;
				}
				if (code == Keyboard.UP) {
					up &= ~3;
				}
				if (code == Keyboard.DOWN) {
					down &= ~3;
				}
				if (code == Keyboard.LEFT) {
					left &= ~3;
				}
				if (code == Keyboard.RIGHT) {
					right &= ~3;
				}
			});
			
			world = new World();
			draw = new DebugDraw(640, 480);
			draw.setWorld(world);
			draw.drawJoints = true;
			
			registerDemos(
				new BasicDemo(),
				new ShapesDemo(),
				new FrictionDemo(),
				new RestitutionDemo(),
				new CollisionFilteringDemo(),
				new DistanceJointDemo(),
				new BallAndSocketJointDemo(),
				new HingeJointDemo(),
				new PyramidDemo(),
				new BridgeDemo(),
				new VehicleDemo()
			);
			
			reset();
			addEventListener(Event.ENTER_FRAME, frame);
		}
		
		private function registerDemos(...demos:Array):void {
			var len:int = demos.length;
			for (var i:int = 0; i < len; i++) {
				var demo:DemoBase = DemoBase(demos[i]);
				demo.world = world;
				demo.draw = draw;
				demo.prev = DemoBase(demos[(i - 1 + len) % len]);
				demo.next = DemoBase(demos[(i + 1) % len]);
			}
			this.demo = DemoBase(demos[0]);
		}
		
		private function prevDemo():void {
			demo = demo.prev;
			reset();
		}
		
		private function nextDemo():void {
			demo = demo.next;
			reset();
		}
		
		private function reset():void {
			rotX = Math.PI * 0.5;
			rotY = Math.PI * 0.42;
			world.clear();
			draw.clearIgnoredShapes();
			var sc:ShapeConfig = new ShapeConfig();
			var ground:RigidBody = new RigidBody(0, -0.5, 0);
			ground.addShape(new BoxShape(sc, 128, 1, 128));
			sc.relativePosition.init(0, 1, 64);
			ground.addShape(new BoxShape(sc, 128, 2, 1));
			sc.relativePosition.init(0, 1, -64);
			ground.addShape(new BoxShape(sc, 128, 2, 1));
			sc.relativePosition.init(64, 1, 0);
			ground.addShape(new BoxShape(sc, 1, 2, 128));
			sc.relativePosition.init(-64, 1, 0);
			ground.addShape(new BoxShape(sc, 1, 2, 128));
			ground.setupMass(RigidBody.BODY_STATIC);
			world.addRigidBody(ground);
			demo.reset();
			control = demo.control;
			control.allowSleep = false;
		}
		
		private function onContext3DCreated(e:Event = null):void {
			draw.setContext3D(s3d.context3D);
			draw.camera(0, 2, 4);
		}
		
		private function frame(e:Event = null):void {
			count++;
			if (press) {
				rotX -= (mouseX - pmouseX) * 0.01;
				rotY += (mouseY - pmouseY) * 0.005;
				if (rotY < 0.1) rotY = 0.1;
				else if (rotY > Math.PI * 0.5 - 0.1) rotY = Math.PI * 0.5 - 0.1;
			}
			demo.update();
			pmouseX = mouseX;
			pmouseY = mouseY;
			world.step();
			demo.cameraControl(rotX, rotY);
			demo.userControl(up != 0, down != 0, left != 0, right != 0, rotX, rotY);
			fps += (1000 / world.performance.totalTime - fps) * 0.5;
			if (fps > 1000 || fps != fps) {
				fps = 1000;
			}
			tf.text =
				" --- " + demo.title + " --- \n\n" +
				"  [Q]: previous demo\n" +
				"  [E]: next demo\n" +
				"  [WASD or Arrows]: move around\n" +
				"  [SPACE]: reset\n\n" +
				"Rigid Body Count: " + world.numRigidBodies + "\n" +
				"Contact Count: " + world.numContacts + "\n" +
				"Pair Check Count: " + world.broadPhase.numPairChecks + "\n" +
				"Contact Point Count: " + world.numContactPoints + "\n" +
				"Island Count: " + world.numIslands + "\n\n" +
				"Broad-Phase Time: " + world.performance.broadPhaseTime + "ms\n" +
				"Narrow-Phase Time: " + world.performance.narrowPhaseTime + "ms\n" +
				"Solving Time: " + world.performance.solvingTime + "ms\n" +
				"Updating Time: " + world.performance.updatingTime + "ms\n" +
				"Total Time: " + world.performance.totalTime + "ms\n" +
				"Physics FPS: " + fps.toFixed(2) + "\n"
			;
			draw.render();
			var body:RigidBody = world.rigidBodies;
			while (body != null) {
				if (body.position.y < -12) {
					body.position.init(Math.random() * 8 - 4, Math.random() * 4 + 8, Math.random() * 8 - 4);
					body.linearVelocity.x *= 0.75;
					body.linearVelocity.y *= 0.75;
					body.linearVelocity.z *= 0.75;
				}
				body = body.next;
			}
		}
		
	}

}