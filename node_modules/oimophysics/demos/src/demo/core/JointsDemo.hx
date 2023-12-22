package demo.core;
import demo.common.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.constraint.joint.*;
import oimo.dynamics.rigidbody.*;

/**
 * Joints demo
 */
class JointsDemo extends DemoBase {

	public function new() {
		super("Joints");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);

		renderer.camera(new Vec3(0, 7, 9), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		OimoUtil.addBox(world, new Vec3(0, -0.2, 0), new Vec3(6, 0.2, 6), true);

		renderer.getGraphics().getDebugDraw().drawJointLimits = true;

		createBallChain(new Vec3(-2, 5, -2), 0.4, 7);
		createHingeChain(new Vec3(2, 5, -2), 0.3, 7, new Vec3(0, 0, 1));

		createBoard(0, 4, 0, new RotationalLimitMotor().setLimits(-45 * MathUtil.TO_RADIANS, 45 * MathUtil.TO_RADIANS), new SpringDamper().setSpring(2, 0.3));
		createBoard(0, 6, 0, new RotationalLimitMotor().setMotor(MathUtil.TWO_PI, MathUtil.TWO_PI * 4), new SpringDamper());

		{
			var x:Float = 2;
			var y:Float = 5;
			var z:Float = 1;
			var b1:RigidBody = OimoUtil.addSphere(world, new Vec3(x, y, z), 0.1, true);
			var b2:RigidBody = OimoUtil.addBox(world, new Vec3(x, y, z), new Vec3(0.3, 0.5, 0.5), false);
			OimoUtil.addPrismaticJoint(world, b1, b2, new Vec3(x, y, z), new Vec3(1, 1, 0), new SpringDamper(), new TranslationalLimitMotor().setLimits(-1, 1));
		}

		{
			var x:Float = -2;
			var y:Float = 5;
			var z:Float = 1;
			var b1:RigidBody = OimoUtil.addSphere(world, new Vec3(x, y, z), 0.1, true);
			var b2:RigidBody = OimoUtil.addBox(world, new Vec3(x - 0.31, y, z), new Vec3(0.3, 0.5, 0.5), false);
			OimoUtil.addCylindricalJoint(world, b1, b2, new Vec3(x, y, z), new Vec3(1, 0, 0), new SpringDamper(), new RotationalLimitMotor().setLimits(-2, 2), new SpringDamper().setSpring(4, 0.7), new TranslationalLimitMotor().setLimits(-1, 1));
		}

		{
			var x:Float = -2;
			var y:Float = 3;
			var z:Float = 3;
			var length:Float = 1.0;

			var b1:RigidBody = OimoUtil.addBox(world, new Vec3(x, y + length, z), new Vec3(0.2, 0.2, 0.2), true);
			b1.setType(RigidBodyType.KINEMATIC);
			b1.setAngularVelocity(new Vec3(0, 1.5, 0));
			var b2:RigidBody = OimoUtil.addBox(world, new Vec3(x, y - length, z), new Vec3(0.2, 0.5, 0.2), false);
			OimoUtil.addRagdollJoint(world, b1, b2, new Vec3(x, y, z), new Vec3(0, 1, 0), new Vec3(0, 0, 1), new SpringDamper(), 40, 80, new SpringDamper(), new RotationalLimitMotor().setLimits(-MathUtil.HALF_PI, MathUtil.HALF_PI));
		}

		{
			var x:Float = 2;
			var y:Float = 3;
			var z:Float = 3;
			var length:Float = 1.0;
			var hingeLimit1 = new RotationalLimitMotor().setLimits(-MathUtil.HALF_PI * 0.5, MathUtil.HALF_PI * 0.5);
			var hingeLimit2 = new RotationalLimitMotor().setLimits(-MathUtil.HALF_PI * 0.8, MathUtil.HALF_PI * 0.8);

			var b1:RigidBody = OimoUtil.addBox(world, new Vec3(x, y + length, z), new Vec3(0.2, 0.2, 0.2), true);
			b1.setType(RigidBodyType.KINEMATIC);
			b1.setAngularVelocity(new Vec3(0, 1.5, 0));
			var b2:RigidBody = OimoUtil.addBox(world, new Vec3(x, y - length, z), new Vec3(0.2, 0.5, 0.2), false);
			OimoUtil.addUniversalJoint(world, b1, b2, new Vec3(x, y, z), new Vec3(1, 0, 0), new Vec3(0, 0, 1), new SpringDamper(), hingeLimit1, new SpringDamper(), hingeLimit2);
		}

		{
			var x:Float = 0;
			var y:Float = 3;
			var z:Float = 3;
			var length:Float = 1.0;
			var rotXLimit = new RotationalLimitMotor().setLimits(-MathUtil.HALF_PI * 0.4, MathUtil.HALF_PI * 0.4);
			var rotYLimit = new RotationalLimitMotor().setLimits(-MathUtil.HALF_PI * 0.2, MathUtil.HALF_PI * 0.2);
			var rotZLimit = new RotationalLimitMotor().setLimits(-MathUtil.HALF_PI * 0.8, MathUtil.HALF_PI * 0.8);
			var translXLimit = new TranslationalLimitMotor().setLimits(-0.2, 0.2);
			var translYLimit = new TranslationalLimitMotor().setLimits(-0.3, 0);
			var translZLimit = new TranslationalLimitMotor().setLimits(-0.2, 0.8);

			var b1:RigidBody = OimoUtil.addBox(world, new Vec3(x, y + length, z), new Vec3(0.2, 0.2, 0.2), true);
			b1.setType(RigidBodyType.KINEMATIC);
			b1.setAngularVelocity(new Vec3(0, 1.5, 0));
			var b2:RigidBody = OimoUtil.addBox(world, new Vec3(x, y - length, z), new Vec3(0.2, 0.5, 0.2), false);
			OimoUtil.addGenericJoint(world, b1, b2, new Vec3(x, y, z), new Mat3(), new Mat3(), null, [translXLimit, translYLimit, translZLimit], null, [rotXLimit, rotYLimit, rotZLimit]);
		}
	}

	function createBoard(x:Float, y:Float, z:Float, lm:RotationalLimitMotor, sd:SpringDamper) {
		var b1:RigidBody = OimoUtil.addBox(world, new Vec3(x, y, z), new Vec3(0.1, 0.1, 0.1), true);
		var b2:RigidBody = OimoUtil.addBox(world, new Vec3(x + 0.5, y, z), new Vec3(0.5, 0.2, 0.4), false);
		OimoUtil.addRevoluteJoint(world, b1, b2, new Vec3(x, y, z), new Vec3(0, 0, 1), sd, lm);
	}

	function createBallChain(from:Vec3, radius:Float, num:Int):Void {
		var bc:RigidBodyConfig = new RigidBodyConfig();
		bc.position.copyFrom(from);
		bc.type = RigidBodyType.STATIC;

		var sc:ShapeConfig = new ShapeConfig();
		sc.geometry = new SphereGeometry(radius * 0.9);

		var b1:RigidBody;
		var b2:RigidBody;
		b1 = new RigidBody(bc);
		b1.addShape(new Shape(sc));
		world.addRigidBody(b1);

		var jc:SphericalJointConfig = new SphericalJointConfig();
		jc.localAnchor1.init(0, 0, 0);
		jc.localAnchor2.init(0, -radius * 2, 0);

		bc.type = RigidBodyType.DYNAMIC;
		for (i in 0...num) {
			if (i == num - 1) {
				bc.position.x += MathUtil.randIn(-0.001, 0.001);
				bc.position.z += MathUtil.randIn(-0.001, 0.001);
			}
			bc.position.y += radius * 2;
			b2 = new RigidBody(bc);
			b2.addShape(new Shape(sc));
			world.addRigidBody(b2);

			jc.rigidBody1 = b1;
			jc.rigidBody2 = b2;
			world.addJoint(new SphericalJoint(jc));

			b1 = b2;
			jc.localAnchor1.init(0, radius, 0);
			jc.localAnchor2.init(0, -radius, 0);
		}
	}

	function createHingeChain(from:Vec3, radius:Float, num:Int, axis:Vec3):Void {
		var bc:RigidBodyConfig = new RigidBodyConfig();
		bc.position.copyFrom(from);
		bc.type = RigidBodyType.STATIC;

		var cc:ShapeConfig = new ShapeConfig();
		cc.geometry = new BoxGeometry(new Vec3(radius, radius, radius));

		var b1:RigidBody;
		var b2:RigidBody;
		b1 = new RigidBody(bc);
		b1.addShape(new Shape(cc));
		world.addRigidBody(b1);

		cc.geometry = new BoxGeometry(new Vec3(radius * 0.5, radius * 0.9, radius * 0.9));

		var jc:RevoluteJointConfig = new RevoluteJointConfig();
		jc.localAnchor1.init(0, 0, 0);
		jc.localAnchor2.init(0, -radius * 2, 0);

		bc.type = RigidBodyType.DYNAMIC;
		for (i in 0...num) {
			jc.localAxis1 = axis;
			jc.localAxis2 = axis;
			if (i == num - 1) {
				bc.position.x += MathUtil.randIn(-0.001, 0.001);
				bc.position.z += MathUtil.randIn(-0.001, 0.001);
			}
			bc.position.y += radius * 2;
			b2 = new RigidBody(bc);
			b2.addShape(new Shape(cc));
			world.addRigidBody(b2);

			jc.rigidBody1 = b1;
			jc.rigidBody2 = b2;
			world.addJoint(new RevoluteJoint(jc));

			b1 = b2;
			jc.localAnchor1.init(0, radius, 0);
			jc.localAnchor2.init(0, -radius, 0);
		}
	}

	override public function update():Void {
		super.update();
	}
}
