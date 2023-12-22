package oimo.dynamics;
import haxe.ds.Vector;
import oimo.common.Setting;
import oimo.common.Vec3;
import oimo.dynamics.constraint.*;
import oimo.dynamics.rigidbody.*;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Simulation island.
 */
@:build(oimo.m.B.bu())
@:dox(hide)
class Island {
	var gravity:IVec3;

	var numRigidBodies:Int;
	var rigidBodies:Vector<RigidBody>;

	// all the constraint solvers
	var numSolvers:Int;
	var solvers:Vector<ConstraintSolver>;

	// the constraint solvers use split impulse for position part
	var numSolversSi:Int;
	var solversSi:Vector<ConstraintSolver>;

	// the constraint solvers use nonlinear Gauss-Seidel for position part
	var numSolversNgs:Int;
	var solversNgs:Vector<ConstraintSolver>;

	public function new() {
		rigidBodies = new Vector<RigidBody>(Setting.islandInitialRigidBodyArraySize);
		solvers = new Vector<ConstraintSolver>(Setting.islandInitialConstraintArraySize);
		solversSi = new Vector<ConstraintSolver>(Setting.islandInitialConstraintArraySize);
		solversNgs = new Vector<ConstraintSolver>(Setting.islandInitialConstraintArraySize);
		numRigidBodies = 0;
		numSolvers = 0;
		numSolversSi = 0;
		numSolversNgs = 0;
	}

	// --- private ---

	extern inline function fastInvExp(x:Float):Float {
		var x2:Float = x * x;
		return 1 / (1 + x + x2 * (1 / 2 + x * (1 / 6) + x2 * (1 / 24)));
	}

	extern inline function addConstraintSolverSI(solver:ConstraintSolver):Void {
		if (numSolversSi == solversSi.length) {
			M.array_expand(solversSi, numSolversSi);
		}
		solversSi[numSolversSi++] = solver;
	}

	extern inline function addConstraintSolverNgs(solver:ConstraintSolver):Void {
		if (numSolversNgs == solversNgs.length) {
			M.array_expand(solversNgs, numSolversNgs);
		}
		solversNgs[numSolversNgs++] = solver;
	}

	// --- internal ---

	public function _clear():Void {
		M.array_free(rigidBodies, numRigidBodies);
		M.array_free(solvers, numSolvers);
		M.array_free(solversSi, numSolversSi);
		M.array_free(solversNgs, numSolversNgs);
	}

	extern public inline function _setGravity(gravity:Vec3):Void {
		M.vec3_fromVec3(this.gravity, gravity);
	}

	public function _addRigidBody(rigidBody:RigidBody):Void {
		if (numRigidBodies == rigidBodies.length) {
			M.array_expand(rigidBodies, numRigidBodies);
		}
		rigidBody._addedToIsland = true;
		rigidBodies[numRigidBodies++] = rigidBody;
	}

	public function _addConstraintSolver(solver:ConstraintSolver, positionCorrection:Int):Void {
		if (numSolvers == solvers.length) {
			M.array_expand(solvers, numSolvers);
		}
		solver._addedToIsland = true;
		solvers[numSolvers++] = solver;

		if (positionCorrection == PositionCorrectionAlgorithm.SPLIT_IMPULSE) {
			addConstraintSolverSI(solver);
		}
		if (positionCorrection == PositionCorrectionAlgorithm.NGS) {
			addConstraintSolverNgs(solver);
		}
	}

	// steps the single rigid body
	public function _stepSingleRigidBody(timeStep:TimeStep, rb:RigidBody):Void {
		var dt:Float = timeStep.dt;

		// store previous transform
		M.transform_assign(rb._ptransform, rb._transform);

		// clear linear/angular contact impulse
		M.vec3_zero(rb._linearContactImpulse);
		M.vec3_zero(rb._angularContactImpulse);

		// update sleep time
		if (rb._isSleepy()) {
			rb._sleepTime += dt;
			if (rb._sleepTime > Setting.sleepingTimeThreshold) {
				rb.sleep();
			}
		} else {
			rb._sleepTime = 0;
		}

		if (!rb._sleeping) {
			// the rigid body is awake
			if (rb._type == RigidBodyType._DYNAMIC) {
				// damping
				var linScale:Float = fastInvExp(dt * rb._linearDamping);
				var angScale:Float = fastInvExp(dt * rb._angularDamping);

				// compute accelerations
				var linAcc:IVec3;
				var angAcc:IVec3;
				M.vec3_scale(linAcc, gravity, rb._gravityScale);
				M.vec3_addRhsScaled(linAcc, linAcc, rb._force, rb._invMass);
				M.vec3_mulMat3(angAcc, rb._torque, rb._invInertia);

				// update velocity
				M.vec3_addRhsScaled(rb._vel, rb._vel, linAcc, dt);
				M.vec3_scale(rb._vel, rb._vel, linScale);
				M.vec3_addRhsScaled(rb._angVel, rb._angVel, angAcc, dt);
				M.vec3_scale(rb._angVel, rb._angVel, angScale);
			}
			rb._integrate(dt);
			rb._syncShapes();
		}
	}

	// steps the island with multiple bodies and constraints
	public function _step(timeStep:TimeStep, numVelocityIterations:Int, numPositionIterations:Int):Void {
		var dt:Float = timeStep.dt;

		var sleepIsland:Bool = true;

		// sleep check and apply gravity
		for (i in 0...numRigidBodies) {
			var rb:RigidBody = rigidBodies[i];

			// store previous transform
			M.transform_assign(rb._ptransform, rb._transform);

			// clear linear/angular contact impulse
			M.vec3_zero(rb._linearContactImpulse);
			M.vec3_zero(rb._angularContactImpulse);

			// don't let the rigid body sleep
			rb._sleeping = false;

			// update sleep time
			if (rb._isSleepy()) {
				rb._sleepTime += dt;
			} else {
				rb._sleepTime = 0;
			}

			// check if the rigid body is awaken
			if (rb._sleepTime < Setting.sleepingTimeThreshold) {
				// awaken the whole island
				sleepIsland = false;
			}

			// apply forces
			if (rb._type == RigidBodyType._DYNAMIC) {
				// damping
				var linScale:Float = fastInvExp(dt * rb._linearDamping);
				var angScale:Float = fastInvExp(dt * rb._angularDamping);

				// compute accelerations
				var linAcc:IVec3;
				var angAcc:IVec3;
				M.vec3_scale(linAcc, gravity, rb._gravityScale);
				M.vec3_addRhsScaled(linAcc, linAcc, rb._force, rb._invMass);
				M.vec3_mulMat3(angAcc, rb._torque, rb._invInertia);

				// update velocity
				M.vec3_addRhsScaled(rb._vel, rb._vel, linAcc, dt);
				M.vec3_scale(rb._vel, rb._vel, linScale);
				M.vec3_addRhsScaled(rb._angVel, rb._angVel, angAcc, dt);
				M.vec3_scale(rb._angVel, rb._angVel, angScale);
			}
		}

		if (sleepIsland) {
			// sleep the whole island
			for (i in 0...numRigidBodies) {
				var rb:RigidBody = rigidBodies[i];
				rb.sleep();
			}
			return;
		}


		// -------------- test --------------

		/*
		// randomize constraint order

		for (i in 1...numSolvers) {
			var j = Std.int(Math.random() * (i + 1));
			var tmp = solvers[i];
			solvers[i] = solvers[j];
			solvers[j] = tmp;
		}

		for (i in 1...numSolversSi) {
			var j = Std.int(Math.random() * (i + 1));
			var tmp = solversSi[i];
			solversSi[i] = solversSi[j];
			solversSi[j] = tmp;
		}

		for (i in 1...numSolversNgs) {
			var j = Std.int(Math.random() * (i + 1));
			var tmp = solversNgs[i];
			solversNgs[i] = solversNgs[j];
			solversNgs[j] = tmp;
		}
		*/

		// -------------- test --------------

		// solve velocity
		for (i in 0...numSolvers) {
			var s:ConstraintSolver = solvers[i];
			s.preSolveVelocity(timeStep);
		}
		for (i in 0...numSolvers) {
			var s:ConstraintSolver = solvers[i];
			s.warmStart(timeStep);
		}
		for (t in 0...numVelocityIterations) {
			for (i in 0...numSolvers) {
				var s:ConstraintSolver = solvers[i];
				s.solveVelocity();
			}
		}

		// post-solve (velocity)
		for (i in 0...numSolvers) {
			var s:ConstraintSolver = solvers[i];
			s.postSolveVelocity(timeStep);
		}

		// integrate
		for (i in 0...numRigidBodies) {
			var rb:RigidBody = rigidBodies[i];
			rb._integrate(dt);
		}

		// solve split impulse
		for (i in 0...numSolversSi) {
			var s:ConstraintSolver = solversSi[i];
			s.preSolvePosition(timeStep);
		}
		for (t in 0...numPositionIterations) {
			for (i in 0...numSolversSi) {
				var s:ConstraintSolver = solversSi[i];
				s.solvePositionSplitImpulse();
			}
		}

		// solve integrate pseudo velocity
		for (i in 0...numRigidBodies) {
			var rb:RigidBody = rigidBodies[i];
			rb._integratePseudoVelocity();
		}

		// solve nonlinear Gauss-Seidel
		for (i in 0...numSolversNgs) {
			var s:ConstraintSolver = solversNgs[i];
			s.preSolvePosition(timeStep);
		}
		for (t in 0...numPositionIterations) {
			for (i in 0...numSolversNgs) {
				var s:ConstraintSolver = solversNgs[i];
				s.solvePositionNgs(timeStep);
			}
		}

		// post-solve (some constraints may be removed)
		for (i in 0...numSolvers) {
			var s:ConstraintSolver = solvers[i];
			s.postSolve();
		}

		// synchronize shapes
		for (i in 0...numRigidBodies) {
			var rb:RigidBody = rigidBodies[i];
			rb._syncShapes();
		}
	}

}
