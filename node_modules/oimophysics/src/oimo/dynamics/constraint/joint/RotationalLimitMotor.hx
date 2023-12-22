package oimo.dynamics.constraint.joint;

/**
 * Rotational limits and motor settings of a joint.
 */
class RotationalLimitMotor {
	/**
	 * The lower bound of the limit in radians.
	 *
	 * The limit is disabled if `lowerLimit > upperLimit`.
	 */
	public var lowerLimit:Float;

	/**
	 * The upper bound of the limit in radians.
	 *
	 * The limit is disabled if `lowerLimit > upperLimit`.
	 */
	public var upperLimit:Float;

	/**
	 * The target speed of the motor in usually radians per second.
	 */
	public var motorSpeed:Float;

	/**
	 * The maximum torque of the motor in usually newton meters.
	 *
	 * The motor is disabled if `motorTorque <= 0`.
	 */
	public var motorTorque:Float;

	/**
	 * Default constructor.
	 */
	public function new() {
		lowerLimit = 1;
		upperLimit = 0;
		motorTorque = 0;
	}

	/**
	 * Sets limit properties at once and returns `this`.
	 * `this.lowerLimit` is set to `lower`, and `this.upperLimit` is set to `upper`.
	 */
	public function setLimits(lower:Float, upper:Float):RotationalLimitMotor {
		lowerLimit = lower;
		upperLimit = upper;
		return this;
	}

	/**
	 * Sets motor properties at once and returns `this`.
	 * `this.motorSpeed` is set to `speed`, and `this.motorTorque` is set to `torque`.
	 */
	public function setMotor(speed:Float, torque:Float):RotationalLimitMotor {
		motorSpeed = speed;
		motorTorque = torque;
		return this;
	}

	/**
	 * Returns a clone of the object.
	 */
	public function clone():RotationalLimitMotor {
		var lm:RotationalLimitMotor = new RotationalLimitMotor();
		lm.lowerLimit = lowerLimit;
		lm.upperLimit = upperLimit;
		lm.motorSpeed = motorSpeed;
		lm.motorTorque = motorTorque;
		return lm;
	}

}
