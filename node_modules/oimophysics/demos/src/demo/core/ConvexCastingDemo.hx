package demo.core;
import demo.common.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.callback.*;
import oimo.dynamics.common.*;
import oimo.dynamics.constraint.joint.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;

/**
 * Convex casting demo
 */
class ConvexCastingDemo extends DemoBase {
	var lps:Array<LaserPointer>;

	public function new() {
		super("Convex Casting");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 7, 7), new Vec3(0, 0, 0), new Vec3(0, 1, 0));

		var thickness:Float = 0.5;
		OimoUtil.addBox(world, new Vec3(0, -thickness, 0), new Vec3(5, thickness, 5), true);
		var w:Int = 2;
		var h:Int = 2;
		var sp:Float = 0.8;
		var n:Int = 3;
		var wid:Float = 0.3;
		var hei:Float = 0.3;
		var spH:Float = hei * 2;
		for (i in 0...n) {
			for (j in -w...w + 1) {
				for (k in -h...h + 1) {
					Setting.defaultDensity = i == n - 1 ? 1 : 1;

					wid = MathUtil.randIn(0.2, 0.4);
					hei = MathUtil.randIn(0.2, 0.4);

					switch (Std.int(5 * Math.random())) {
					case 0:
						OimoUtil.addCylinder(world, new Vec3(j * sp + MathUtil.randIn(-0.01, 0.01), spH + i * spH * 2 * 1.002, k * sp + MathUtil.randIn(-0.01, 0.01)), wid, hei, false);
					case 1:
						OimoUtil.addCone(world, new Vec3(j * sp + MathUtil.randIn(-0.01, 0.01), spH + i * spH * 2 * 1.002, k * sp + MathUtil.randIn(-0.01, 0.01)), wid, hei, false);
					case 2:
						OimoUtil.addCapsule(world, new Vec3(j * sp + MathUtil.randIn(-0.01, 0.01), spH + i * spH * 2 * 1.002, k * sp + MathUtil.randIn(-0.01, 0.01)), wid, hei, false);
					case 3:
						OimoUtil.addBox(world, new Vec3(j * sp + MathUtil.randIn(-0.01, 0.01), spH + i * spH * 2 * 0.9998, k * sp + MathUtil.randIn(-0.01, 0.01)), new Vec3(wid, hei, wid), false);
					case 4:
						OimoUtil.addSphere(world, new Vec3(j * sp + MathUtil.randIn(-0.01, 0.01), spH + i * spH * 2 * 0.9998, k * sp + MathUtil.randIn(-0.01, 0.01)), wid, false);
					}
				}
			}
		}

		lps = [];
		lps.push(new LaserPointer(new Vec3(-2, 4, 0), world, new Vec3(0, 1, 0)));
		lps.push(new LaserPointer(new Vec3(0, 4, 0), world, new Vec3(0, 1, 0)));
		lps.push(new LaserPointer(new Vec3(2, 4, 0), world, new Vec3(0, 1, 0)));
	}

	override public function update():Void {
		super.update();
		teleportRigidBodies(-20, 10, 5, 5);
	}

	override public function drawAdditionalObjects(debugDraw:DebugDraw):Void {
		var w = debugDraw.wireframe;
		debugDraw.wireframe = true;

		for (lp in lps) lp.draw(debugDraw);

		debugDraw.wireframe = w;
	}
}

private class LaserPointer {
	var rb:RigidBody;
	var cb:RayCastClosest;
	var world:World;
	var color:Vec3;
	var length:Float;

	public function new(pos:Vec3, world:World, color:Vec3) {
		this.world = world;
		this.color = color;
		cb = new RayCastClosest();

		length = 0.4;

		var rc = new RigidBodyConfig();
		rc.autoSleep = false;
		rc.angularDamping = 4.0;

		rc.position.copyFrom(pos);
		rb = new RigidBody(rc);
		var sc = new ShapeConfig();
		sc.geometry = new CylinderGeometry(0.4, length);
		rb.addShape(new Shape(sc));
		world.addRigidBody(rb);

		rc.position.addEq(new Vec3(0, length, 0));
		rc.type = RigidBodyType.STATIC;
		var fix:RigidBody = new RigidBody(rc);
		sc.geometry = new SphereGeometry(0.1);
		fix.addShape(new Shape(sc));
		world.addRigidBody(fix);

		var jc:RagdollJointConfig = new RagdollJointConfig();
		jc.init(rb, fix, rb.getPosition().addEq(new Vec3(0, length, 0)), new Vec3(0, 1, 0), new Vec3(1, 0, 0));
		jc.twistLimitMotor.setLimits(0, 0);
		jc.maxSwingAngle1 = MathUtil.TO_RADIANS * 90;
		jc.maxSwingAngle2 = MathUtil.TO_RADIANS * 90;

		world.addJoint(new RagdollJoint(jc));
	}

	public function draw(debugDraw:DebugDraw):Void {
		var tf:Transform = rb.getTransform();
		var begin:Vec3 = new Vec3(0, -length, 0).mulTransform(tf);
		var end:Vec3 = new Vec3(0, -length - 20, 0).mulTransform(tf);
		var depth:Int = 3;
		var r:Vec3 = end.sub(begin);
		var convex:CylinderGeometry = cast rb.getShapeList().getGeometry();
		cb.clear();

		var green:Vec3 = new Vec3(0, 1, 0);
		world.convexCast(convex, tf, r, cb);
		if (cb.hit) {
			var lineEnd:Vec3 = begin.addScaled(r, cb.fraction);

			debugDraw.line(begin, begin.addScaled(r, cb.fraction), green);
			tf.setPosition(tf.getPosition().addScaledEq(r, cb.fraction));
			debugDraw.cylinder(tf, convex.getRadius(), convex.getHalfHeight(), green);
			debugDraw.point(cb.position, green);
		}
	}
}
