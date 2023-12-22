package demo.core;
import demo.common.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;

/**
 * Falling ragdoll demo
 */
class FallingRagdollDemo extends DemoBase {
	var ragdoll:RigidBody;

	public function new() {
		super("Falling Ragdoll");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(2, 7, 9), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		renderer.getGraphics().getDebugDraw().drawJointLimits = false;

		var tmp1 = Setting.defaultRestitution;
		var tmp2 = Setting.defaultFriction;

		Setting.defaultRestitution = 0.3;
		Setting.defaultFriction = 0.2;

		var thickness:Float = 0.5;
		OimoUtil.addBox(world, new Vec3(0, -thickness, 0), new Vec3(7, thickness, 7), true);

		var n:Int; // number of steps
		var height:Float; // height of a step
		var length:Float; // length of a step
		var width:Float; // width of a step
		n = 30;
		width = 4.0;
		height = 0.5;
		length = 0.6;
		var stairCenter:Vec3 = new Vec3(0, 0, 0);

		for (i in 0...n) {
			if (i == n - 1) {
				OimoUtil.addBox(world, stairCenter.add(new Vec3(0, (i + 0.5) * height, -(i + 4 * 0.5) * length)), new Vec3(width * 0.5, height * 0.5, length * 4 * 0.5), true);
			} else {
				OimoUtil.addBox(world, stairCenter.add(new Vec3(0, (i + 0.5) * height, -(i + 0.5) * length)), new Vec3(width * 0.5, height * 0.5, length * 0.5), true);
				OimoUtil.addBox(world, stairCenter.add(new Vec3(-width * 0.5, (i + 2 * 0.5) * height, -(i + 0.5) * length)), new Vec3(0.1, height * 2 * 0.5, length * 0.5), true);
				OimoUtil.addBox(world, stairCenter.add(new Vec3(width * 0.5, (i + 2 * 0.5) * height, -(i + 0.5) * length)), new Vec3(0.1, height * 2 * 0.5, length * 0.5), true);
			}
		}

		var ragdollPos = stairCenter.add(new Vec3(0, (n - 0.5) * height + 1.46, -(n - 0.5) * length));
		ragdoll = OimoUtil.addRagdoll(world, ragdollPos);
		OimoUtil.addBox(world, ragdollPos.add(new Vec3(0, 0, -2)), new Vec3(0.2, 0.2, 0.2), false).setLinearVelocity(new Vec3(0, 3.5, 4));

		Setting.defaultRestitution = tmp1;
		Setting.defaultFriction = tmp2;
	}

	override public function update():Void {
		super.update();

		if (ragdoll != null) {
			renderer.camera(ragdoll.getPosition().add(new Vec3(2, 5, 7)), ragdoll.getPosition(), new Vec3(0, 1, 0));
		}
	}
}
