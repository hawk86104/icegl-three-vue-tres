package demo.common;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.constraint.joint.*;
import oimo.dynamics.rigidbody.*;

/**
 * Defines some shortcuts to creating and adding objects to a world.
 */
class OimoUtil {
	public static function addRagdollJoint(w:World, rb1:RigidBody, rb2:RigidBody, anchor:Vec3, twistAxis:Vec3, swingAxis:Vec3, swingSd:SpringDamper = null, maxSwing1Deg:Float = 180, maxSwing2Deg:Float = 180, twistSd:SpringDamper = null, twistLm:RotationalLimitMotor = null):RagdollJoint {
		var jc:RagdollJointConfig = new RagdollJointConfig();
		jc.init(rb1, rb2, anchor, twistAxis, swingAxis);
		if (twistSd != null) jc.twistSpringDamper = twistSd;
		if (twistLm != null) jc.twistLimitMotor = twistLm;
		if (swingSd != null) jc.swingSpringDamper = swingSd;
		jc.maxSwingAngle1 = maxSwing1Deg * MathUtil.TO_RADIANS;
		jc.maxSwingAngle2 = maxSwing2Deg * MathUtil.TO_RADIANS;
		var j:RagdollJoint = new RagdollJoint(jc);
		w.addJoint(j);
		return j;
	}

	public static function addUniversalJoint(w:World, rb1:RigidBody, rb2:RigidBody, anchor:Vec3, axis1:Vec3, axis2:Vec3, sd1:SpringDamper = null, lm1:RotationalLimitMotor = null, sd2:SpringDamper = null, lm2:RotationalLimitMotor = null):UniversalJoint {
		var jc:UniversalJointConfig = new UniversalJointConfig();
		jc.init(rb1, rb2, anchor, axis1, axis2);
		if (sd1 != null) jc.springDamper1 = sd1;
		if (lm1 != null) jc.limitMotor1 = lm1;
		if (sd2 != null) jc.springDamper2 = sd2;
		if (lm2 != null) jc.limitMotor2 = lm2;
		var j:UniversalJoint = new UniversalJoint(jc);
		w.addJoint(j);
		return j;
	}

	public static function addGenericJoint(w:World, rb1:RigidBody, rb2:RigidBody, anchor:Vec3, basis1:Mat3, basis2:Mat3, translSds:Array<SpringDamper> = null, translLms:Array<TranslationalLimitMotor> = null, rotSds:Array<SpringDamper> = null, rotLms:Array<RotationalLimitMotor> = null):GenericJoint {
		var jc:GenericJointConfig = new GenericJointConfig();
		jc.init(rb1, rb2, anchor, basis1, basis2);
		for (i in 0...3) {
			if (translSds != null && translSds[i] != null) jc.translationalSpringDampers[i] = translSds[i];
			if (translLms != null && translLms[i] != null) jc.translationalLimitMotors[i]   = translLms[i];
			if (rotSds != null    && rotSds[i] != null)    jc.rotationalSpringDampers[i]    = rotSds[i];
			if (rotLms != null    && rotLms[i] != null)    jc.rotationalLimitMotors[i]      = rotLms[i];
		}
		var j:GenericJoint = new GenericJoint(jc);
		w.addJoint(j);
		return j;
	}

	public static function addPrismaticJoint(w:World, rb1:RigidBody, rb2:RigidBody, anchor:Vec3, axis:Vec3, sd:SpringDamper = null, lm:TranslationalLimitMotor = null):PrismaticJoint {
		var jc:PrismaticJointConfig = new PrismaticJointConfig();
		jc.init(rb1, rb2, anchor, axis);
		if (sd != null) jc.springDamper = sd;
		if (lm != null) jc.limitMotor = lm;
		var j:PrismaticJoint = new PrismaticJoint(jc);
		w.addJoint(j);
		return j;
	}

	public static function addRevoluteJoint(w:World, rb1:RigidBody, rb2:RigidBody, anchor:Vec3, axis:Vec3, sd:SpringDamper = null, lm:RotationalLimitMotor = null):RevoluteJoint {
		var jc:RevoluteJointConfig = new RevoluteJointConfig();
		jc.init(rb1, rb2, anchor, axis);
		if (sd != null) jc.springDamper = sd;
		if (lm != null) jc.limitMotor = lm;
		var j:RevoluteJoint = new RevoluteJoint(jc);
		w.addJoint(j);
		return j;
	}

	public static function addCylindricalJoint(w:World, rb1:RigidBody, rb2:RigidBody, anchor:Vec3, axis:Vec3, rotSd:SpringDamper = null, rotLm:RotationalLimitMotor = null, traSd:SpringDamper = null, traLm:TranslationalLimitMotor = null):CylindricalJoint {
		var jc:CylindricalJointConfig = new CylindricalJointConfig();
		jc.init(rb1, rb2, anchor, axis);
		if (rotSd != null) jc.rotationalSpringDamper = rotSd;
		if (rotLm != null) jc.rotationalLimitMotor = rotLm;
		if (traSd != null) jc.translationalSpringDamper = traSd;
		if (traLm != null) jc.translationalLimitMotor = traLm;
		var j:CylindricalJoint = new CylindricalJoint(jc);
		w.addJoint(j);
		return j;
	}

	public static function addSphericalJoint(w:World, rb1:RigidBody, rb2:RigidBody, anchor:Vec3):SphericalJoint {
		var jc:SphericalJointConfig = new SphericalJointConfig();
		jc.init(rb1, rb2, anchor);
		var j:SphericalJoint = new SphericalJoint(jc);
		w.addJoint(j);
		return j;
	}

	public static function addSphere(w:World, center:Vec3, radius:Float, wall:Bool):RigidBody {
		return addRigidBody(w, center, new SphereGeometry(radius), wall);
	}

	public static function addBox(w:World, center:Vec3, halfExtents:Vec3, wall:Bool):RigidBody {
		return addRigidBody(w, center, new BoxGeometry(halfExtents), wall);
	}

	public static function addCylinder(w:World, center:Vec3, radius:Float, halfHeight:Float, wall:Bool):RigidBody {
		return addRigidBody(w, center, new CylinderGeometry(radius, halfHeight), wall);
	}

	public static function addCone(w:World, center:Vec3, radius:Float, halfHeight:Float, wall:Bool):RigidBody {
		return addRigidBody(w, center, new ConeGeometry(radius, halfHeight), wall);
	}

	public static function addCapsule(w:World, center:Vec3, radius:Float, halfHeight:Float, wall:Bool):RigidBody {
		return addRigidBody(w, center, new CapsuleGeometry(radius, halfHeight), wall);
	}

	public static function addRigidBody(w:World, center:Vec3, geom:Geometry, wall:Bool):RigidBody {
		var shapec:ShapeConfig = new ShapeConfig();
		shapec.geometry = geom;
		var bodyc:RigidBodyConfig = new RigidBodyConfig();
		bodyc.type = wall ? RigidBodyType.STATIC : RigidBodyType.DYNAMIC;
		bodyc.position = center;
		var body:RigidBody = new RigidBody(bodyc);
		body.addShape(new Shape(shapec));
		w.addRigidBody(body);
		return body;
	}

	// ---------------------------------------------------------------------------

	public static function addRagdoll(w:World, pos:Vec3):RigidBody {
		var head:RigidBody;
		var body1:RigidBody;
		var body2:RigidBody;
		var armL1:RigidBody;
		var armL2:RigidBody;
		var armR1:RigidBody;
		var armR2:RigidBody;
		var legL1:RigidBody;
		var legL2:RigidBody;
		var legR1:RigidBody;
		var legR2:RigidBody;

		var headHeight:Float = 0.3;
		var upperBody:Float = 0.35;
		var lowerBody:Float = 0.35;
		var bodyRadius:Float = 0.2;
		var legRadius:Float = 0.1;
		var legInterval:Float = 0.15;
		var upperLeg:Float = 0.5;
		var lowerLeg:Float = 0.5;
		var armRadius:Float = 0.075;
		var upperArm:Float = 0.35;
		var lowerArm:Float = 0.35;

		head = addCapsule(w, pos.add(new Vec3(0, lowerBody + upperBody + bodyRadius + headHeight / 2, 0)), headHeight / 2 * 0.8, headHeight / 2 * 0.2, false);
		body1 = addCapsule(w, pos.add(new Vec3(0, lowerBody + upperBody / 2, 0)), bodyRadius, upperBody / 2, false);
		body2 = addCapsule(w, pos.add(new Vec3(0, lowerBody / 2, 0)), bodyRadius, lowerBody / 2, false);

		legL1 = addCapsule(w, pos.add(new Vec3(-legInterval, -upperLeg / 2 - legInterval, 0)), legRadius, upperLeg / 2, false);
		legL2 = addCapsule(w, pos.add(new Vec3(-legInterval, -upperLeg - lowerLeg / 2 - legInterval, 0)), legRadius, lowerLeg / 2, false);

		legR1 = addCapsule(w, pos.add(new Vec3(legInterval, -upperLeg / 2 - legInterval, 0)), legRadius, upperLeg / 2, false);
		legR2 = addCapsule(w, pos.add(new Vec3(legInterval, -upperLeg - lowerLeg / 2 - legInterval, 0)), legRadius, lowerLeg / 2, false);

		armL1 = addCapsule(w, pos.add(new Vec3(-bodyRadius - upperArm / 2, lowerBody + upperBody, 0)), armRadius, upperArm / 2, false);
		armL2 = addCapsule(w, pos.add(new Vec3(-bodyRadius - upperArm - lowerArm / 2, lowerBody + upperBody, 0)), armRadius, lowerArm / 2, false);

		armR1 = addCapsule(w, pos.add(new Vec3(bodyRadius + upperArm / 2, lowerBody + upperBody, 0)), armRadius, upperArm / 2, false);
		armR2 = addCapsule(w, pos.add(new Vec3(bodyRadius + upperArm + lowerArm / 2, lowerBody + upperBody, 0)), armRadius, lowerArm / 2, false);

		var rotZ90:Mat3 = new Mat3().appendRotationEq(90 * MathUtil.TO_RADIANS, 0, 0, 1);
		armL1.setRotation(rotZ90);
		armL2.setRotation(rotZ90);
		armR1.setRotation(rotZ90);
		armR2.setRotation(rotZ90);

		var x:Vec3 = new Vec3(1, 0, 0);
		var y:Vec3 = new Vec3(0, 1, 0);
		var z:Vec3 = new Vec3(0, 0, 1);

		var sd:SpringDamper = new SpringDamper();
		sd.setSpring(10, 1);
		var lm180:RotationalLimitMotor = new RotationalLimitMotor().setLimits(-90 * MathUtil.TO_RADIANS, 90 * MathUtil.TO_RADIANS);
		var lm90:RotationalLimitMotor = new RotationalLimitMotor().setLimits(-45 * MathUtil.TO_RADIANS, 45 * MathUtil.TO_RADIANS);
		var lmElbow:RotationalLimitMotor = new RotationalLimitMotor().setLimits(0 * MathUtil.TO_RADIANS, 160 * MathUtil.TO_RADIANS);
		var lmKnee:RotationalLimitMotor = new RotationalLimitMotor().setLimits(0 * MathUtil.TO_RADIANS, 160 * MathUtil.TO_RADIANS);

		addRagdollJoint(w, body1, head, pos.add(new Vec3(0, lowerBody + upperBody + bodyRadius, 0)), y, x, sd, 90, 70, sd, lm180);
		addRagdollJoint(w, body1, body2, pos.add(new Vec3(0, lowerBody, 0)), y, x, sd, 60, 45, sd, lm90);

		addRagdollJoint(w, body1, armL1, pos.add(new Vec3(-bodyRadius, lowerBody + upperBody, 0)), x, z, sd, 90, 90, sd, lm180);
		addRagdollJoint(w, body1, armR1, pos.add(new Vec3(bodyRadius, lowerBody + upperBody, 0)), x.negate(), z, sd, 90, 90, sd, lm180);

		addRevoluteJoint(w, armL1, armL2, pos.add(new Vec3(-bodyRadius - upperArm, lowerBody + upperBody, 0)), y, sd, lmElbow);
		addRevoluteJoint(w, armR1, armR2, pos.add(new Vec3(bodyRadius + upperArm, lowerBody + upperBody, 0)), y.negate(), sd, lmElbow);

		var jc = new RagdollJointConfig();
		jc.swingSpringDamper = sd;
		jc.maxSwingAngle1 = 90 * MathUtil.TO_RADIANS;
		jc.maxSwingAngle2 = 70 * MathUtil.TO_RADIANS;
		jc.twistSpringDamper = sd;
		jc.twistLimitMotor = lm180;

		jc.init(body2, legL1, pos.add(new Vec3(-legInterval, -legInterval, 0)), y, x);
		jc.localTwistAxis1 = z.negate();
		w.addJoint(new RagdollJoint(jc));

		jc.init(body2, legR1, pos.add(new Vec3(legInterval, -legInterval, 0)), y, x);
		jc.localTwistAxis1 = z.negate();
		w.addJoint(new RagdollJoint(jc));

		addRevoluteJoint(w, legL1, legL2, pos.add(new Vec3(-legInterval, -legInterval - upperLeg, 0)), x, sd, lmKnee);
		addRevoluteJoint(w, legR1, legR2, pos.add(new Vec3(legInterval, -legInterval - upperLeg, 0)), x, sd, lmKnee);

		return body1;
	}
}

