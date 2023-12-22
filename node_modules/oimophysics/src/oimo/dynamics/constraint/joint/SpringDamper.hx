package oimo.dynamics.constraint.joint;

/**
 * Spring and damper settings of a joint.
 */
class SpringDamper {
	/**
	 * The frequency of the spring in Hz.
	 * Set `0.0` to disable the spring and make the constraint totally rigid.
	 */
	public var frequency:Float;

	/**
	 * The damping ratio of the constraint.
	 * Set `1.0` to make the constraint critically dumped.
	 */
	public var dampingRatio:Float;

	/**
	 * Whether to use symplectic Euler method instead of implicit Euler method, to numarically integrate the constraint.
	 * Note that symplectic Euler method conserves energy better than implicit Euler method does, but the constraint will be
	 * unstable under the high frequency.
	 */
	public var useSymplecticEuler:Bool;

	/**
	 * Default constructor.
	 */
	public function new() {
		frequency = 0;
		dampingRatio = 0;
		useSymplecticEuler = false;
	}

	/**
	 * Sets spring and damper parameters at once and returns `this`.
	 * `this.frequency` is set to `frequency`, and `this.dampingRatio` is set to `dampingRatio`.
	 */
	public function setSpring(frequency:Float, dampingRatio:Float):SpringDamper {
		this.frequency = frequency;
		this.dampingRatio = dampingRatio;
		return this;
	}

	public function setSymplecticEuler(useSymplecticEuler:Bool):SpringDamper {
		this.useSymplecticEuler = useSymplecticEuler;
		return this;
	}

	/**
	 * Returns a clone of the object.
	 */
	public function clone():SpringDamper {
		var sd = new SpringDamper();
		sd.frequency = frequency;
		sd.dampingRatio = dampingRatio;
		sd.useSymplecticEuler = useSymplecticEuler;
		return sd;
	}

}
