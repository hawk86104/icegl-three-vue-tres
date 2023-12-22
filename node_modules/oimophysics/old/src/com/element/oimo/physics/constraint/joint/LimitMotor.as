package com.element.oimo.physics.constraint.joint {
	import com.element.oimo.math.Vec3;
	/**
	 * An information of limit and motor.
	 * @author saharan
	 */
	public class LimitMotor {
		/**
		 * The current angle for rotational constraints.
		 */
		public var angle:Number;
		
		/**
		 * The axis of the constraint.
		 */
		public var axis:Vec3;
		
		/**
		 * The lower limit. Set lower > upper to disable.
		 */
		public var lowerLimit:Number;
		
		/**
		 * The upper limit. Set lower > upper to disable.
		 */
		public var upperLimit:Number;
		
		/**
		 * The target motor speed.
		 */
		public var motorSpeed:Number;
		
		/**
		 * The maximum motor force or torque. Set 0 to disable.
		 */
		public var maxMotorForce:Number;
		
		/**
		 * The frequency of the spring. Set 0 to disable.
		 */
		public var frequency:Number;
		
		/**
		 * The damping ratio of the spring. Set 0 for no damping, 1 for critical damping.
		 */
		public var dampingRatio:Number;
		
		public function LimitMotor(axis:Vec3, fixed:Boolean) {
			this.axis = axis;
			angle = 0;
			if (fixed) lowerLimit = 0;
			else lowerLimit = 1;
			upperLimit = 0;
			motorSpeed = 0;
			maxMotorForce = 0;
			frequency = 0;
			dampingRatio = 0;
		}
		
		/**
		 * Set limit data into this constraint.
		 * @param	lowerLimit
		 * @param	upperLimit
		 */
		public function setLimit(lowerLimit:Number, upperLimit:Number):void {
			this.lowerLimit = lowerLimit;
			this.upperLimit = upperLimit;
		}
		
		/**
		 * Set motor data into this constraint.
		 * @param	motorSpeed
		 * @param	maxMotorForce
		 */
		public function setMotor(motorSpeed:Number, maxMotorForce:Number):void {
			this.motorSpeed = motorSpeed;
			this.maxMotorForce = maxMotorForce;
		}
		
		/**
		 * Set spring data into this constraint.
		 * @param	frequency
		 * @param	dampingRatio
		 */
		public function setSpring(frequency:Number, dampingRatio:Number):void {
			this.frequency = frequency;
			this.dampingRatio = dampingRatio;
		}
		
	}

}