package oimo.dynamics.constraint;
import oimo.dynamics.TimeStep;
import oimo.dynamics.rigidbody.RigidBody;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;

/**
 * The base class of all constarint solvers.
 */
@:build(oimo.m.B.bu())
class ConstraintSolver {
	public var _b1:RigidBody;
	public var _b2:RigidBody;
	public var _addedToIsland:Bool;

	@:dox(hide)
	public function new() {
		_b1 = null;
		_b2 = null;
		_addedToIsland = false;
	}

	/**
	 * Prepares for velocity iteration. Time step information `timeStep` is given for
	 * computing time-depending data.
	 */
	public function preSolveVelocity(timeStep:TimeStep):Void {
	}

	/**
	 * Applies initial impulses.
	 */
	public function warmStart(timeStep:TimeStep):Void {
	}

	/**
	 * Performs single velocity iteration.
	 */
	public function solveVelocity():Void {
	}

	/**
	 * Performs post-processes of velocity part. Time step information `timeStep` is given
	 * for computing time-depending data.
	 */
	public function postSolveVelocity(timeStep:TimeStep):Void {
	}

	/**
	 * Prepares for position iteration (split impulse or nonlinear Gauss-Seidel). Time step
	 * information `timeStep` is given for computing time-depending data.
	 *
	 * This may not be called depending on position correction algorithm.
	 */
	public function preSolvePosition(timeStep:TimeStep):Void {
	}

	/**
	 * Performs single position iteration (split impulse)
	 */
	public function solvePositionSplitImpulse():Void {
	}

	/**
	 * Performs single position iteration (nonlinear Gauss-Seidel)
	 */
	public function solvePositionNgs(timeStep:TimeStep):Void {
	}

	/**
	 * Performs post-processes.
	 */
	public function postSolve():Void {
	}
}
