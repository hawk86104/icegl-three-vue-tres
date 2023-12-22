package oimo.dynamics.constraint.info.joint;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.common.MathUtil;
import oimo.dynamics.constraint.info.JacobianRow;
import oimo.dynamics.constraint.joint.JointImpulse;

/**
 * Internal class.
 */
@:dox(hide)
@:build(oimo.m.B.bu())
class JointSolverInfoRow {
	/** Used for both velocity and position solver. */
	public var jacobian:JacobianRow;

	/** Used for both velocity and position solver. */
	public var rhs:Float;

	/** Used for velocity solver. */
	public var cfm:Float;

	/** Used for both velocity and position solver. */
	public var minImpulse:Float;
	/** Used for both velocity and position solver. */
	public var maxImpulse:Float;

	/** Used for velocity solver. */
	public var motorSpeed:Float;
	/** Used for velocity solver. */
	public var motorMaxImpulse:Float;

	/** Used for both velocity and position solver. */
	public var impulse:JointImpulse;

	public function new() {
		jacobian = new JacobianRow();
		rhs = 0;
		cfm = 0;
		minImpulse = 0;
		maxImpulse = 0;
		motorSpeed = 0;
		motorMaxImpulse = 0;
		impulse = null;
	}

	extern public inline function clear():Void {
		jacobian.clear();
		rhs = 0;
		cfm = 0;
		minImpulse = 0;
		maxImpulse = 0;
		motorSpeed = 0;
		motorMaxImpulse = 0;
		impulse = null;
	}

	extern public inline function equalLimit(rhs:Float, cfm:Float):Void {
		this.rhs = rhs;
		this.cfm = cfm;
		minImpulse = MathUtil.NEGATIVE_INFINITY;
		maxImpulse = MathUtil.POSITIVE_INFINITY;
	}

	extern public inline function motor(speed:Float, maxImpulse:Float):Void {
		motorSpeed = speed;
		motorMaxImpulse = maxImpulse;
	}
}
