package demo.core;
import demo.common.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;

/**
 * Rotation limit demo
 */
class LimitRotationDemo extends DemoBase {
	var body:RigidBody;

	public function new() {
		super("Rotation Limit");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 7, 9), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		var thickness:Float = 0.5;
		OimoUtil.addBox(world, new Vec3(0, -thickness, 0), new Vec3(7, thickness, 7), true);

		var w:Int = 2;
		var h:Int = 2;
		var sp:Float = 0.61;
		var n:Int = 5;
		var size:Float = 0.3;
		for (i in 0...n) {
			for (j in -w...w + 1) {
				for (k in -h...h + 1) {
					var pos:Vec3 = new Vec3(j * sp, size + i * size * 3, k * sp);
					var box:RigidBody = OimoUtil.addBox(world, pos, new Vec3(size, size, size), false);
					box.setRotationFactor(new Vec3(0, 0, 0));
				}
			}
		}

		var cylinder:RigidBody = OimoUtil.addCylinder(world, new Vec3(0, 8, 0), 1.0, 0.3, false);
		var cylinderShape:Shape = cylinder.getShapeList();

		// modify local transform
		var localTransform:Transform = cylinderShape.getLocalTransform();
		localTransform.rotateXyz(new Vec3(MathUtil.HALF_PI, 0, 0));
		cylinderShape.setLocalTransform(localTransform);

		// limit rotation
		cylinder.setRotationFactor(new Vec3(0, 0, 1));

		body = cylinder;
	}

	override public function update():Void {
		super.update();
		teleportRigidBodies(-20, 10, 5, 5);
	}
}
