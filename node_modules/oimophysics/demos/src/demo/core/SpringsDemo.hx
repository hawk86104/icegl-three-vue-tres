package demo.core;
import demo.common.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;
import oimo.dynamics.constraint.joint.RotationalLimitMotor;
import oimo.dynamics.constraint.joint.SpringDamper;
import oimo.dynamics.constraint.joint.TranslationalLimitMotor;

/**
 * Springs demo
 */
class SpringsDemo extends DemoBase {
	public function new() {
		super("Springs");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 7, 9), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		for (i in 0...5) {
			OimoUtil.addSphere(world, MathUtil.randVec3In(-1, 1).scale3Eq(2, 2, 0.1).addEq(new Vec3(0, 8, 0)), 0.6, false);
		}

		addSpringyBoard(new Vec3(-3, 3, 0), 1, 8);
		addSpringyBoard(new Vec3(3, 3, 0), -1, 8);
		addSpringyBoard(new Vec3(-3, 4, 0), 1, 8);
		addSpringyBoard(new Vec3(3, 4, 0), -1, 8);

		for (i in 0...5) {
			addSpringyFloor(new Vec3(i - 2, 0, 0));
		}
	}

	function addSpringyBoard(at:Vec3, dir:Int, num:Int):Void {
		var bodies:Array<RigidBody> = [];
		for (i in 0...num) {
			bodies.push(OimoUtil.addBox(world, at.add(new Vec3(i * 0.4 * dir, 0, 0)), new Vec3(0.2, 0.1, 0.4), i == 0));
		}
		for (i in 1...num) {
			var b1:RigidBody = bodies[i - 1];
			var b2:RigidBody = bodies[i];
			var anchor:Vec3 = b1.getPosition().addEq(b2.getPosition()).scaleEq(0.5);
			var axis:Vec3 = new Vec3(0, 0, 1);
			var springDamper:SpringDamper = new SpringDamper().setSpring(15, 0.4);
			var limitMotor:RotationalLimitMotor = new RotationalLimitMotor().setLimits(0, 0);
			OimoUtil.addRevoluteJoint(world, b1, b2, anchor, axis, springDamper, limitMotor);
		}
	}

	function addSpringyFloor(at:Vec3):Void {
		var base:RigidBody = OimoUtil.addBox(world, at.add(new Vec3(0, -2, 0)), new Vec3(0.5, 0.1, 0.5), true);
		var floor:RigidBody = OimoUtil.addBox(world, at, new Vec3(0.4, 0.1, 0.4), false);

		var anchor:Vec3 = floor.getPosition();
		var axis:Vec3 = new Vec3(0, 1, 0);
		var springDamper:SpringDamper = new SpringDamper().setSpring(3, 0.2);
		var limitMotor:TranslationalLimitMotor = new TranslationalLimitMotor().setLimits(0, 0);
		OimoUtil.addPrismaticJoint(world, base, floor, anchor, axis, springDamper, limitMotor);
	}

	override public function update():Void {
		super.update();
		teleportRigidBodies(-20, 10, 2, 0.1);
	}
}
