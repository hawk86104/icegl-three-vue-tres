package demo.core;
import demo.common.DemoRenderer;
import demo.common.DemoBase;
import demo.common.OimoUtil;
import demo.common.UserInput;
import demo.common.ViewInfo;
import oimo.collision.geometry.*;
import oimo.common.Mat3;
import oimo.common.MathUtil;
import oimo.common.Vec3;
import oimo.dynamics.*;
import oimo.dynamics.constraint.joint.*;
import oimo.dynamics.rigidbody.*;
import oimo.math.*;

/**
 * Bridge demo
 */
class BridgeDemo extends DemoBase {

	public function new() {
		super("Bridge");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);

		renderer.camera(new Vec3(0, 8, 12), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		for (i in 0...5) {
			OimoUtil.addSphere(world, new Vec3(MathUtil.randIn(-4, 4), MathUtil.randIn(2, 3), MathUtil.randIn(-1, 1)), 0.8, false).getShapeList().setDensity(0.3);
			OimoUtil.addBox(world, new Vec3(MathUtil.randIn(-4, 4), MathUtil.randIn(2, 3), MathUtil.randIn(-1, 1)), new Vec3(0.5, 0.5, 0.5), false).getShapeList().setDensity(0.3);
			OimoUtil.addCone(world, new Vec3(MathUtil.randIn(-4, 4), MathUtil.randIn(2, 3), MathUtil.randIn(-1, 1)), 0.6, 0.6, false).getShapeList().setDensity(0.3);
		}

		var num = 20;
		var width = 3.0;
		var length = 0.7;
		var gap = 0.05;
		var height = 0.3;
		var dir = new Vec3(width, 0, 0);

		var bodies:Array<RigidBody> = [];
		for (i in 0...num) {
			var x = (i - (num - 1) * 0.5) * (length + gap);
			bodies.push(OimoUtil.addBox(world, new Vec3(x, 0, 0), new Vec3(length * 0.5, height * 0.5, width * 0.5), i == 0 || i == num - 1));
		}

		for (i in 0...num - 1) {
			OimoUtil.addRevoluteJoint(world, bodies[i], bodies[i + 1], bodies[i].getPosition().add(bodies[i + 1].getPosition()).scale(0.5), new Vec3(0, 0, 1));
		}

		for (i in 0...num) {
			var newPos = bodies[i].getPosition();
			newPos.x *= 0.95;
			bodies[i].setPosition(newPos);
		}
	}

	override public function update():Void {
		super.update();
		teleportRigidBodies(-20, 10, 5, 0);
	}
}
