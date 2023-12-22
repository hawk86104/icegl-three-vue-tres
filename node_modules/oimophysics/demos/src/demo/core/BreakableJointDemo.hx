package demo.core;
import demo.common.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;
import oimo.dynamics.constraint.joint.Joint;

/**
 * Breakable joint demo
 */
class BreakableJointDemo extends DemoBase {
	public function new() {
		super("Breakable Joint");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 7, 9), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		var thickness:Float = 0.5;
		OimoUtil.addBox(world, new Vec3(0, -thickness, 0), new Vec3(7, thickness, 7), true);

		var chain:Array<RigidBody> = [];
		chain.push(OimoUtil.addSphere(world, new Vec3(0, 6, 0), 0.3, true));
		for (i in 0...12) {
			chain.push(
				if (i % 2 == 0) OimoUtil.addSphere(world, new Vec3((i + 1) * 0.4, 6, 0), 0.25, false)
				else OimoUtil.addBox(world, new Vec3((i + 1) * 0.4, 6, 0), new Vec3(0.25, 0.25, 0.25), false)
			);
			chain[i].setLinearVelocity(MathUtil.randVec3().scaleEq(0.05));
		}

		for (i in 1...chain.length) {
			var center:Vec3;

			if (i == 1) {
				center = chain[0].getPosition();
			} else {
				center = chain[i - 1].getPosition().addEq(chain[i].getPosition()).scaleEq(0.5);
			}
			var joint:Joint = OimoUtil.addSphericalJoint(world, chain[i - 1], chain[i], center);
			joint.setBreakForce(100);
		}
	}

	override public function update():Void {
		super.update();
		teleportRigidBodies(-20, 10, 5, 5);
	}
}
