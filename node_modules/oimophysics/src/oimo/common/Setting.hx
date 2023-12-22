package oimo.common;
import oimo.collision.*;
import oimo.collision.broadphase.*;
import oimo.collision.broadphase.bruteforce.*;
import oimo.collision.narrowphase.*;
import oimo.dynamics.*;
import oimo.dynamics.constraint.*;
import oimo.dynamics.constraint.contact.*;
import oimo.dynamics.constraint.solver.*;
import oimo.dynamics.rigidbody.*;
import oimo.math.*;

/**
 * Setting provides advenced parameters used by the physics simulation.
 */
class Setting {
	// default shape parameters
	public static var defaultFriction:Float = 0.2;
	public static var defaultRestitution:Float = 0.2;
	public static var defaultDensity:Float = 1;
	public static var defaultCollisionGroup:Int = 1;
	public static var defaultCollisionMask:Int = 1;

	// velocity limitations
	public static var maxTranslationPerStep:Float = 20;
	public static var maxRotationPerStep:Float = MathUtil.PI;

	// dynamic BVH
	public static var bvhProxyPadding:Float = 0.1;
	public static var bvhIncrementalCollisionThreshold:Float = 0.45;

	// GJK/EPA
	public static var defaultGJKMargin:Float = 0.05;
	public static var enableGJKCaching:Bool = true;
	public static var maxEPAVertices:Int = 128;
	public static var maxEPAPolyhedronFaces:Int = 128;

	// general constraints
	public static var contactEnableBounceThreshold:Float = 0.5;
	public static var velocityBaumgarte:Float = 0.2;
	public static var positionSplitImpulseBaumgarte:Float = 0.4;
	public static var positionNgsBaumgarte:Float = 1.0;

	// contacts
	public static var contactUseAlternativePositionCorrectionAlgorithmDepthThreshold:Float = 0.05;
	public static var defaultContactPositionCorrectionAlgorithm:Int = PositionCorrectionAlgorithm._BAUMGARTE;
	public static var alternativeContactPositionCorrectionAlgorithm:Int = PositionCorrectionAlgorithm._SPLIT_IMPULSE;
	public static var contactPersistenceThreshold:Float = 0.05;
	public static var maxManifoldPoints:Int = 4;

	// joints
	public static var defaultJointConstraintSolverType:Int = ConstraintSolverType._ITERATIVE;
	public static var defaultJointPositionCorrectionAlgorithm:Int = PositionCorrectionAlgorithm._BAUMGARTE;
	public static var jointWarmStartingFactorForBaungarte:Float = 0.8;
	public static var jointWarmStartingFactor:Float = 0.95;
	public static var minSpringDamperDampingRatio:Float = 1e-6;
	public static var minRagdollMaxSwingAngle:Float = 1e-6;
	public static var maxJacobianRows:Int = 6;

	// direct MLCP solver
	public static var directMlcpSolverEps:Float = 1e-9;

	// islands
	public static var islandInitialRigidBodyArraySize:Int = 128;
	public static var islandInitialConstraintArraySize:Int = 128;

	// sleeping
	public static var sleepingVelocityThreshold:Float = 0.2;
	public static var sleepingAngularVelocityThreshold:Float = 0.5;
	public static var sleepingTimeThreshold:Float = 1.0;
	public static var disableSleeping:Bool = false;

	// slops
	public static var linearSlop:Float = 0.005;
	public static var angularSlop:Float = 1 * MathUtil.TO_RADIANS;
}
