package demo.core;
import demo.common.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;

/**
 * Frictions and restitutions demo
 */
class FrictionsAndRestitutions extends DemoBase {
	public function new() {
		super("Frictions and Restitutions");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 7, 9), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		var thickness:Float = 0.5;
		OimoUtil.addBox(world, new Vec3(0, -thickness, 0), new Vec3(7, thickness, 7), true);

		var rotMat:Mat3 = new Mat3().appendRotationEq(20 * MathUtil.TO_RADIANS, 0, 0, 1);
		var tiltedFloor:RigidBody = OimoUtil.addBox(world, new Vec3(0, 2, 0), new Vec3(3, 0.1, 1), true);
		tiltedFloor.rotate(rotMat);
		tiltedFloor.getShapeList().setFriction(0.5);

		for (i in 0...7) {
			var pos:Vec3 = new Vec3((i - 3) * 0.8, 0, 0);
			pos.mulMat3Eq(rotMat);
			pos.y += 2.3;
			var box:RigidBody = OimoUtil.addBox(world, pos, new Vec3(0.2, 0.2, 0.2), false);
			box.getShapeList().setFriction(i / 16);
			box.rotate(rotMat);
		}

		var bouncyFloor:RigidBody = OimoUtil.addBox(world, new Vec3(0, 0.1, 2), new Vec3(3, 0.1, 1), true);
		bouncyFloor.getShapeList().setRestitution(1.0);

		for (i in 0...7) {
			var pos:Vec3 = new Vec3((i - 3) * 0.8, 3, 2);
			OimoUtil.addSphere(world, pos, 0.25, false).getShapeList().setRestitution(i / 6);
		}
	}

	override public function update():Void {
		super.update();
		teleportRigidBodies(-20, 10, 5, 5);
	}
}
