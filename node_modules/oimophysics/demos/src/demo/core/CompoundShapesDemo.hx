package demo.core;
import demo.common.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;

/**
 * Compound shapes demo
 */
class CompoundShapesDemo extends DemoBase {
	public function new() {
		super("Compound Shapes");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 7, 9), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		var thickness:Float = 0.5;
		OimoUtil.addBox(world, new Vec3(0, -thickness, 0), new Vec3(7, thickness, 7), true);

		var n:Int = 32;
		var rc:RigidBodyConfig = new RigidBodyConfig();

		{
			var geom1:Geometry = new BoxGeometry(new Vec3(0.3, 0.1, 0.3));
			var geom2:Geometry = new BoxGeometry(new Vec3(0.1, 0.3, 0.1));

			var sc1:ShapeConfig = new ShapeConfig();
			var sc2:ShapeConfig = new ShapeConfig();
			sc1.geometry = geom1;
			sc2.geometry = geom2;
			sc1.position.init(0, 0.2, 0);
			sc2.position.init(0, -0.2, 0);


			for (i in 0...n) {
				rc.position.init(-2, 1 + i, 0).addEq(MathUtil.randVec3In(-0.01, 0.01));
				var rb:RigidBody = new RigidBody(rc);
				rb.addShape(new Shape(sc1));
				rb.addShape(new Shape(sc2));
				world.addRigidBody(rb);
			}
		}

		{
			var geom1:Geometry = new ConeGeometry(0.275, 0.325);
			var geom2:Geometry = new BoxGeometry(new Vec3(0.3, 0.075, 0.3));

			var sc1:ShapeConfig = new ShapeConfig();
			var sc2:ShapeConfig = new ShapeConfig();
			sc1.geometry = geom1;
			sc2.geometry = geom2;
			sc1.position.init(0, 0.2, 0);
			sc2.position.init(0, -0.2, 0);

			for (i in 0...n) {
				rc.position.init(0, 1 + i, 0).addEq(MathUtil.randVec3In(-0.01, 0.01));
				var rb:RigidBody = new RigidBody(rc);
				rb.addShape(new Shape(sc1));
				rb.addShape(new Shape(sc2));
				world.addRigidBody(rb);
			}
		}

		{
			var geom1:Geometry = new CylinderGeometry(0.25, 0.4);
			var geom2:Geometry = new BoxGeometry(new Vec3(0.075, 0.4, 0.075));

			var sc1:ShapeConfig = new ShapeConfig();
			var sc2:ShapeConfig = new ShapeConfig();
			sc1.geometry = geom1;
			sc2.geometry = geom2;
			sc1.position.init(0, 0, 0);
			sc2.position.init(0, -0.1, 0);
			sc1.rotation.appendRotationEq(90 * MathUtil.TO_RADIANS, 0, 0, 1);

			for (i in 0...n) {
				rc.position.init(2, 1 + i, 0).addEq(MathUtil.randVec3In(-0.01, 0.01));
				var rb:RigidBody = new RigidBody(rc);
				rb.addShape(new Shape(sc1));
				rb.addShape(new Shape(sc2));
				world.addRigidBody(rb);
			}
		}
	}

	override public function update():Void {
		super.update();
		teleportRigidBodies(-20, 10, 5, 5);
	}
}
