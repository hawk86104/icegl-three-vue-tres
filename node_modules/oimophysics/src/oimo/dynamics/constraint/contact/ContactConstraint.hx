package oimo.dynamics.constraint.contact;
import oimo.collision.narrowphase.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.TimeStep;
import oimo.dynamics.constraint.*;
import oimo.dynamics.constraint.info.*;
import oimo.dynamics.constraint.info.contact.*;
import oimo.dynamics.constraint.solver.*;
import oimo.dynamics.constraint.solver.pgs.*;
import oimo.dynamics.rigidbody.*;
import oimo.m.IMat3;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * A contact constraint provides collision information for a contact constraint solver.
 * This holds a contact manifold, which has some contact points, contact normals, and
 * contact impulses. See `Manifold` for more information.
 */
@:build(oimo.m.B.bu())
class ContactConstraint {
	public var _positionCorrectionAlgorithm:Int;

	public var _manifold:Manifold;

	public var _s1:Shape;
	public var _s2:Shape;
	public var _tf1:Transform;
	public var _tf2:Transform;
	public var _invM1:Float;
	public var _invM2:Float;
	public var _friction:Float;
	public var _restitution:Float;

	public var _invI1:IMat3;
	public var _invI2:IMat3;

	public var _b1:RigidBody;
	public var _b2:RigidBody;

	public var _solver:ConstraintSolver;

	@:dox(hide)
	public function new(manifold:Manifold) {
		_solver = new PgsContactConstraintSolver(this);
		_manifold = manifold;
	}

	// --- internal ---

	extern public inline function _attach(s1:Shape, s2:Shape):Void {
		_s1 = s1;
		_s2 = s2;
		_b1 = _s1._rigidBody;
		_b2 = _s2._rigidBody;
		_tf1 = _b1._transform;
		_tf2 = _b2._transform;
	}

	extern public inline function _detach():Void {
		_s1 = null;
		_s2 = null;
		_b1 = null;
		_b2 = null;
		_tf1 = null;
		_tf2 = null;
	}

	public function _getVelocitySolverInfo(timeStep:TimeStep, info:ContactSolverInfo):Void {
		info.b1 = _b1;
		info.b2 = _b2;

		var normal:IVec3;
		var tangent:IVec3;
		var binormal:IVec3;
		M.vec3_assign(normal, _manifold._normal);
		M.vec3_assign(tangent, _manifold._tangent);
		M.vec3_assign(binormal, _manifold._binormal);

		var friction:Float = MathUtil.sqrt(_s1._friction * _s2._friction);
		var restitution:Float = MathUtil.sqrt(_s1._restitution * _s2._restitution);

		var num:Int = _manifold._numPoints;
		info.numRows = 0;

		var posDiff:IVec3;
		M.vec3_sub(posDiff, _tf1._position, _tf2._position);

		for (i in 0...num) {
			var p:ManifoldPoint = _manifold._points[i];

			if (p._depth < 0) {
				p._disabled = true;

				// clear accumulated impulses
				p._impulse.clear();

				// skip separated points
				continue;
			} else {
				p._disabled = false;
			}

			var row:ContactSolverInfoRow = info.rows[info.numRows++];

			row.friction = friction;
			row.cfm = 0; // TODO: implement APIs for CFM setting?

			// set Jacobian
			var j:JacobianRow;

			j = row.jacobianN;
			M.vec3_assign(j.lin1, normal);
			M.vec3_assign(j.lin2, normal);
			M.vec3_cross(j.ang1, p._relPos1, normal);
			M.vec3_cross(j.ang2, p._relPos2, normal);

			j = row.jacobianT;
			M.vec3_assign(j.lin1, tangent);
			M.vec3_assign(j.lin2, tangent);
			M.vec3_cross(j.ang1, p._relPos1, tangent);
			M.vec3_cross(j.ang2, p._relPos2, tangent);

			j = row.jacobianB;
			M.vec3_assign(j.lin1, binormal);
			M.vec3_assign(j.lin2, binormal);
			M.vec3_cross(j.ang1, p._relPos1, binormal);
			M.vec3_cross(j.ang2, p._relPos2, binormal);

			// compute relative velocity
			j = row.jacobianN;
			var rvn:Float =
				(M.vec3_dot(j.lin1, _b1._vel) + M.vec3_dot(j.ang1, _b1._angVel)) -
				(M.vec3_dot(j.lin2, _b2._vel) + M.vec3_dot(j.ang2, _b2._angVel))
			;

			// disable bounce for warm-started contacts
			if (rvn < -Setting.contactEnableBounceThreshold && !p._warmStarted) {
				row.rhs = -rvn * restitution;
			} else {
				row.rhs = 0;
			}

			// set minimum RHS for baumgarte position correction
			if (_positionCorrectionAlgorithm == PositionCorrectionAlgorithm.BAUMGARTE) {
				if (p._depth > Setting.linearSlop) {
					var minRhs:Float = (p._depth - Setting.linearSlop) * Setting.velocityBaumgarte * timeStep.invDt;
					if (row.rhs < minRhs) row.rhs = minRhs;
				}
			}

			// reset impulses if warm starting is disabled
			if (!p._warmStarted) {
				p._impulse.clear();
			}

			row.impulse = p._impulse;
		}
	}

	public function _getPositionSolverInfo(info:ContactSolverInfo):Void {
		info.b1 = _b1;
		info.b2 = _b2;

		var normal:IVec3;
		M.vec3_assign(normal, _manifold._normal);

		var num:Int = _manifold._numPoints;
		info.numRows = 0;

		for (i in 0...num) {
			var p:ManifoldPoint = _manifold._points[i];

			if (p._disabled) {
				continue; // skip disabled points
			}

			var row:ContactSolverInfoRow = info.rows[info.numRows++];

			// set normal Jacobian
			var j:JacobianRow = row.jacobianN;
			M.vec3_assign(j.lin1, normal);
			M.vec3_assign(j.lin2, normal);
			M.vec3_cross(j.ang1, p._relPos1, normal);
			M.vec3_cross(j.ang2, p._relPos2, normal);

			row.rhs = p._depth - Setting.linearSlop;
			if (row.rhs < 0) {
				row.rhs = 0;
			}

			row.impulse = p._impulse;
		}
	}

	// !! don't forget to call this from constraint solvers !!
	public function _syncManifold():Void {
		_manifold._updateDepthsAndPositions(_tf1, _tf2);
	}

	// --- public ---

	/**
	 * Returns the first shape of the contact.
	 */
	public inline function getShape1():Shape {
		return _s1;
	}

	/**
	 * Returns the second shape of the contact.
	 */
	public inline function getShape2():Shape {
		return _s2;
	}

	/**
	 * Returns the contact manifold.
	 */
	public inline function getManifold():Manifold {
		return _manifold;
	}

	/**
	 * Returns whether the two rigid bodies are touching.
	 */
	public function isTouching():Bool {
		for (i in 0..._manifold._numPoints) {
			if (_manifold._points[i]._depth >= 0) return true;
		}
		return false;
	}

}
