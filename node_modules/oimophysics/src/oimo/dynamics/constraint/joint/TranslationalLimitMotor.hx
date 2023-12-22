package oimo.dynamics.constraint.joint;

/**
 * Translational limits and motor settings of a joint.
 */
class TranslationalLimitMotor {
	/**
	 * The lower bound of the limit in usually meters.
	 *
	 * The limit is disabled if `lowerLimit > upperLimit`.
	 */
	public var lowerLimit:Float;

	/**
	 * The upper bound of the limit in usually meters.
	 *
	 * The limit is disabled if `lowerLimit > upperLimit`.
	 */
	public var upperLimit:Float;

	/**
	 * The target speed of the motor in usually meters per second.
	 */
	public var motorSpeed:Float;

	/**
	 * The maximum force of the motor in usually newtons.
	 *
	 * The motor is disabled if `motorForce <= 0`.
	 */
	public var motorForce:Float;

	/**
	 * Default constructor.
	 */
	public function new() {
		lowerLimit = 1;
		upperLimit = 0;
		motorForce = 0;
	}

	/**
	 * Sets limit properties at once and returns `this`.
	 * `this.lowerLimit` is set to `lower`, and `this.upperLimit` is set to `upper`.
	 */
	public function setLimits(lower:Float, upper:Float):TranslationalLimitMotor {
		lowerLimit = lower;
		upperLimit = upper;
		return this;
	}

	/**
	 * Sets motor properties at once and returns `this`.
	 * `this.motorSpeed` is set to `speed`, and `this.motorForce` is set to `force`.
	 */
	public function setMotor(speed:Float, force:Float):TranslationalLimitMotor {
		motorSpeed = speed;
		motorForce = force;
		return this;
	}

	/**
	 * Returns a clone of the object.
	 */
	public function clone():TranslationalLimitMotor {
		var lm:TranslationalLimitMotor = new TranslationalLimitMotor();
		lm.lowerLimit = lowerLimit;
		lm.upperLimit = upperLimit;
		lm.motorSpeed = motorSpeed;
		lm.motorForce = motorForce;
		return lm;
	}
}
