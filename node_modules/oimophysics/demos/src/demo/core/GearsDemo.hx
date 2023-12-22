package demo.core;
import demo.common.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;
import oimo.dynamics.constraint.joint.RevoluteJoint;
import oimo.dynamics.constraint.joint.RotationalLimitMotor;

/**
 * Gears demo
 */
class GearsDemo extends DemoBase {
	public function new() {
		super("Gears");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 6, 8), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		var thickness:Float = 0.2;
		OimoUtil.addBox(world, new Vec3(0, -thickness, 0), new Vec3(4, thickness, 1), true);

		createGear(new Vec3(1, 3, 0.5), 1.0, 0.3);
		createGear(new Vec3(3, 3, 0.5), 1.0, 0.3);
		createGear(new Vec3(-0.5, 3, 0), 0.5, 1.6);
		createGear(new Vec3(1.5, 3, -0.5), 1.5, 0.3);
		createGear(new Vec3(-2, 3, 0), 1.0, 0.3, new RotationalLimitMotor().setMotor(MathUtil.PI, 50));
		createGear(new Vec3(-3.5, 3, 0), 0.5, 0.3);

		for (i in 0...20) {
			OimoUtil.addBox(world, MathUtil.randVec3In(-1, 1).scale3Eq(3, 1, 1).addEq(new Vec3(0, 6, 0)), new Vec3(0.2, 0.2, 0.2), false);
		}
		for (i in 0...20) {
			OimoUtil.addSphere(world, MathUtil.randVec3In(-1, 1).scale3Eq(3, 1, 1).addEq(new Vec3(0, 6, 0)), 0.3, false);
		}
	}

	// note the gear is locally y-up
	function createGear(center:Vec3, radius:Float, thickness:Float, lm:RotationalLimitMotor = null):Void {
		var toothInterval:Float = 0.4;
		var toothLength:Float = toothInterval / 1.5;
		var numTeeth:Int = Math.round(MathUtil.TWO_PI * radius / toothInterval) + 1;
		if (numTeeth % 2 == 0) numTeeth--;
		if (numTeeth < 2) numTeeth = 2;

		var toothPos:Vec3 = new Vec3(radius - toothLength / 4, 0, 0);
		var toothRot:Mat3 = new Mat3();
		var dtoothRot:Mat3 = new Mat3().appendRotationEq(MathUtil.TWO_PI / numTeeth, 0, 1, 0);

		var toothGeom:Geometry = createGearTooth(toothLength / 2, thickness * 0.5, toothInterval / 3);
		var toothSc:ShapeConfig = new ShapeConfig();
		toothSc.restitution = 0;
		toothSc.geometry = toothGeom;

		var wheel:RigidBody = OimoUtil.addCylinder(world, center, radius - toothLength / 2, thickness * 0.48, false);
		for (i in 0...numTeeth) {
			toothSc.position = toothPos;
			toothSc.rotation = toothRot;
			wheel.addShape(new Shape(toothSc));

			toothPos.mulMat3Eq(dtoothRot);
			toothRot.mulEq(dtoothRot);
		}

		wheel.rotate(new Mat3().appendRotationEq(90 * MathUtil.TO_RADIANS, 1, 0, 0));

		var fixture:RigidBody = OimoUtil.addCylinder(world, center, toothInterval / 4, thickness * 0.52, true);
		fixture.rotate(new Mat3().appendRotationEq(90 * MathUtil.TO_RADIANS, 1, 0, 0));
		OimoUtil.addRevoluteJoint(world, wheel, fixture, center, new Vec3(0, 0, 1), null, lm);
	}

	function createGearTooth(hw:Float, hh:Float, hd:Float):Geometry {
		var scale:Float = 0.3;
		var vertices:Array<Vec3> = [
			new Vec3(-hw, -hh, -hd),
			new Vec3(-hw, -hh, hd),
			new Vec3(-hw, hh, -hd),
			new Vec3(-hw, hh, hd),
			new Vec3(hw, -hh, -hd * scale),
			new Vec3(hw, -hh, hd * scale),
			new Vec3(hw, hh, -hd * scale),
			new Vec3(hw, hh, hd * scale),
		];
		var geom:ConvexHullGeometry = new ConvexHullGeometry(vertices);
		geom.setGjkMergin(0); // set external margin to 0 (not needed for other geoms)
		return geom;
	}

	override public function update():Void {
		super.update();
		teleportRigidBodies(-20, 10, 3, 1);
	}
}
