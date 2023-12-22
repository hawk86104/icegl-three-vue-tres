package com.element.oimo.physics.constraint.joint.base {
	import com.element.oimo.math.Mat33;
	import com.element.oimo.math.Vec3;
	import com.element.oimo.physics.constraint.joint.Joint;
	import com.element.oimo.physics.constraint.joint.LimitMotor;
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * A three-axis translational constraint for various joints.
	 * @author saharan
	 */
	public class Translational3Constraint {
		public var limitMotor1:LimitMotor;
		public var limitMotor2:LimitMotor;
		public var limitMotor3:LimitMotor;
		public var weight:Number;
		
		private var cfm1:Number; // Constraint Force Mixing
		private var cfm2:Number;
		private var cfm3:Number;
		
		private var b1:RigidBody;
		private var b2:RigidBody;
		private var p1:Vec3;
		private var p2:Vec3;
		private var r1:Vec3;
		private var r2:Vec3;
		private var l1:Vec3;
		private var l2:Vec3;
		private var a1:Vec3;
		private var a2:Vec3;
		private var i1:Mat33;
		private var i2:Mat33;
		
		private var m1:Number;
		private var m2:Number;
		private var i1e00:Number;
		private var i1e01:Number;
		private var i1e02:Number;
		private var i1e10:Number;
		private var i1e11:Number;
		private var i1e12:Number;
		private var i1e20:Number;
		private var i1e21:Number;
		private var i1e22:Number;
		private var i2e00:Number;
		private var i2e01:Number;
		private var i2e02:Number;
		private var i2e10:Number;
		private var i2e11:Number;
		private var i2e12:Number;
		private var i2e20:Number;
		private var i2e21:Number;
		private var i2e22:Number;
		private var ax1:Number;
		private var ay1:Number;
		private var az1:Number;
		private var ax2:Number;
		private var ay2:Number;
		private var az2:Number;
		private var ax3:Number;
		private var ay3:Number;
		private var az3:Number;
		private var r1x:Number;
		private var r1y:Number;
		private var r1z:Number;
		private var r2x:Number;
		private var r2y:Number;
		private var r2z:Number;
		
		private var t1x1:Number; // jacobians
		private var t1y1:Number;
		private var t1z1:Number;
		private var t2x1:Number;
		private var t2y1:Number;
		private var t2z1:Number;
		private var l1x1:Number;
		private var l1y1:Number;
		private var l1z1:Number;
		private var l2x1:Number;
		private var l2y1:Number;
		private var l2z1:Number;
		private var a1x1:Number;
		private var a1y1:Number;
		private var a1z1:Number;
		private var a2x1:Number;
		private var a2y1:Number;
		private var a2z1:Number;
		
		private var t1x2:Number;
		private var t1y2:Number;
		private var t1z2:Number;
		private var t2x2:Number;
		private var t2y2:Number;
		private var t2z2:Number;
		private var l1x2:Number;
		private var l1y2:Number;
		private var l1z2:Number;
		private var l2x2:Number;
		private var l2y2:Number;
		private var l2z2:Number;
		private var a1x2:Number;
		private var a1y2:Number;
		private var a1z2:Number;
		private var a2x2:Number;
		private var a2y2:Number;
		private var a2z2:Number;
		
		private var t1x3:Number;
		private var t1y3:Number;
		private var t1z3:Number;
		private var t2x3:Number;
		private var t2y3:Number;
		private var t2z3:Number;
		private var l1x3:Number;
		private var l1y3:Number;
		private var l1z3:Number;
		private var l2x3:Number;
		private var l2y3:Number;
		private var l2z3:Number;
		private var a1x3:Number;
		private var a1y3:Number;
		private var a1z3:Number;
		private var a2x3:Number;
		private var a2y3:Number;
		private var a2z3:Number;
		
		private var lowerLimit1:Number;
		private var upperLimit1:Number;
		private var limitVelocity1:Number;
		private var limitImpulse1:Number;
		private var limitState1:int; // -1: at lower, 0: locked, 1: at upper, 2: unlimited
		
		private var enableMotor1:Boolean;
		private var motorSpeed1:Number;
		private var maxMotorForce1:Number;
		private var maxMotorImpulse1:Number;
		private var motorImpulse1:Number;
		
		private var lowerLimit2:Number;
		private var upperLimit2:Number;
		private var limitVelocity2:Number;
		private var limitImpulse2:Number;
		private var limitState2:int; // -1: at lower, 0: locked, 1: at upper, 2: unlimited
		
		private var enableMotor2:Boolean;
		private var motorSpeed2:Number;
		private var maxMotorForce2:Number;
		private var maxMotorImpulse2:Number;
		private var motorImpulse2:Number;
		
		private var lowerLimit3:Number;
		private var upperLimit3:Number;
		private var limitVelocity3:Number;
		private var limitImpulse3:Number;
		private var limitState3:int; // -1: at lower, 0: locked, 1: at upper, 2: unlimited
		
		private var enableMotor3:Boolean;
		private var motorSpeed3:Number;
		private var maxMotorForce3:Number;
		private var maxMotorImpulse3:Number;
		private var motorImpulse3:Number;
		
		private var k00:Number; // K = J*M*JT
		private var k01:Number;
		private var k02:Number;
		private var k10:Number;
		private var k11:Number;
		private var k12:Number;
		private var k20:Number;
		private var k21:Number;
		private var k22:Number;
		
		private var kv00:Number; // diagonals without CFMs
		private var kv11:Number;
		private var kv22:Number;
		
		private var dv00:Number; // ...inverted
		private var dv11:Number;
		private var dv22:Number;
		
		private var d00:Number; // K^-1
		private var d01:Number;
		private var d02:Number;
		private var d10:Number;
		private var d11:Number;
		private var d12:Number;
		private var d20:Number;
		private var d21:Number;
		private var d22:Number;
		
		public function Translational3Constraint(joint:Joint, limitMotor1:LimitMotor, limitMotor2:LimitMotor, limitMotor3:LimitMotor) {
			this.limitMotor1 = limitMotor1;
			this.limitMotor2 = limitMotor2;
			this.limitMotor3 = limitMotor3;
			b1 = joint.body1;
			b2 = joint.body2;
			p1 = joint.anchorPoint1;
			p2 = joint.anchorPoint2;
			r1 = joint.relativeAnchorPoint1;
			r2 = joint.relativeAnchorPoint2;
			l1 = b1.linearVelocity;
			l2 = b2.linearVelocity;
			a1 = b1.angularVelocity;
			a2 = b2.angularVelocity;
			i1 = b1.inverseInertia;
			i2 = b2.inverseInertia;
			limitImpulse1 = 0;
			motorImpulse1 = 0;
			limitImpulse2 = 0;
			motorImpulse2 = 0;
			limitImpulse3 = 0;
			motorImpulse3 = 0;
			cfm1 = 0;
			cfm2 = 0;
			cfm3 = 0;
			weight = -1;
		}
		
		public function preSolve(timeStep:Number, invTimeStep:Number):void {
			ax1 = limitMotor1.axis.x;
			ay1 = limitMotor1.axis.y;
			az1 = limitMotor1.axis.z;
			ax2 = limitMotor2.axis.x;
			ay2 = limitMotor2.axis.y;
			az2 = limitMotor2.axis.z;
			ax3 = limitMotor3.axis.x;
			ay3 = limitMotor3.axis.y;
			az3 = limitMotor3.axis.z;
			lowerLimit1 = limitMotor1.lowerLimit;
			upperLimit1 = limitMotor1.upperLimit;
			motorSpeed1 = limitMotor1.motorSpeed;
			maxMotorForce1 = limitMotor1.maxMotorForce;
			enableMotor1 = maxMotorForce1 > 0;
			lowerLimit2 = limitMotor2.lowerLimit;
			upperLimit2 = limitMotor2.upperLimit;
			motorSpeed2 = limitMotor2.motorSpeed;
			maxMotorForce2 = limitMotor2.maxMotorForce;
			enableMotor2 = maxMotorForce2 > 0;
			lowerLimit3 = limitMotor3.lowerLimit;
			upperLimit3 = limitMotor3.upperLimit;
			motorSpeed3 = limitMotor3.motorSpeed;
			maxMotorForce3 = limitMotor3.maxMotorForce;
			enableMotor3 = maxMotorForce3 > 0;
			m1 = b1.inverseMass;
			m2 = b2.inverseMass;
			i1e00 = i1.e00;
			i1e01 = i1.e01;
			i1e02 = i1.e02;
			i1e10 = i1.e10;
			i1e11 = i1.e11;
			i1e12 = i1.e12;
			i1e20 = i1.e20;
			i1e21 = i1.e21;
			i1e22 = i1.e22;
			i2e00 = i2.e00;
			i2e01 = i2.e01;
			i2e02 = i2.e02;
			i2e10 = i2.e10;
			i2e11 = i2.e11;
			i2e12 = i2.e12;
			i2e20 = i2.e20;
			i2e21 = i2.e21;
			i2e22 = i2.e22;
			
			var dx:Number = p2.x - p1.x;
			var dy:Number = p2.y - p1.y;
			var dz:Number = p2.z - p1.z;
			var d1:Number = dx * ax1 + dy * ay1 + dz * az1;
			var d2:Number = dx * ax2 + dy * ay2 + dz * az2;
			var d3:Number = dx * ax3 + dy * ay3 + dz * az3;
			
			var frequency1:Number = limitMotor1.frequency;
			var frequency2:Number = limitMotor2.frequency;
			var frequency3:Number = limitMotor3.frequency;
			var enableSpring1:Boolean = frequency1 > 0;
			var enableSpring2:Boolean = frequency2 > 0;
			var enableSpring3:Boolean = frequency3 > 0;
			var enableLimit1:Boolean = lowerLimit1 <= upperLimit1;
			var enableLimit2:Boolean = lowerLimit2 <= upperLimit2;
			var enableLimit3:Boolean = lowerLimit3 <= upperLimit3;
			
			// for stability
			if (enableSpring1 && d1 > 20 || d1 < -20) {
				enableSpring1 = false;
			}
			if (enableSpring2 && d2 > 20 || d2 < -20) {
				enableSpring2 = false;
			}
			if (enableSpring3 && d3 > 20 || d3 < -20) {
				enableSpring3 = false;
			}
			
			if (enableLimit1) {
				if (lowerLimit1 == upperLimit1) {
					if (limitState1 != 0) {
						limitState1 = 0;
						limitImpulse1 = 0;
					}
					limitVelocity1 = lowerLimit1 - d1;
					if (!enableSpring1) d1 = lowerLimit1;
				} else if (d1 < lowerLimit1) {
					if (limitState1 != -1) {
						limitState1 = -1;
						limitImpulse1 = 0;
					}
					limitVelocity1 = lowerLimit1 - d1;
					if (!enableSpring1) d1 = lowerLimit1;
				} else if (d1 > upperLimit1) {
					if (limitState1 != 1) {
						limitState1 = 1;
						limitImpulse1 = 0;
					}
					limitVelocity1 = upperLimit1 - d1;
					if (!enableSpring1) d1 = upperLimit1;
				} else {
					limitState1 = 2;
					limitImpulse1 = 0;
					limitVelocity1 = 0;
				}
				if (!enableSpring1) {
					if (limitVelocity1 > 0.005) limitVelocity1 -= 0.005;
					else if (limitVelocity1 < -0.005) limitVelocity1 += 0.005;
					else limitVelocity1 = 0;
				}
			} else {
				limitState1 = 2;
				limitImpulse1 = 0;
			}
			
			if (enableLimit2) {
				if (lowerLimit2 == upperLimit2) {
					if (limitState2 != 0) {
						limitState2 = 0;
						limitImpulse2 = 0;
					}
					limitVelocity2 = lowerLimit2 - d2;
					if (!enableSpring2) d2 = lowerLimit2;
				} else if (d2 < lowerLimit2) {
					if (limitState2 != -1) {
						limitState2 = -1;
						limitImpulse2 = 0;
					}
					limitVelocity2 = lowerLimit2 - d2;
					if (!enableSpring2) d2 = lowerLimit2;
				} else if (d2 > upperLimit2) {
					if (limitState2 != 1) {
						limitState2 = 1;
						limitImpulse2 = 0;
					}
					limitVelocity2 = upperLimit2 - d2;
					if (!enableSpring2) d2 = upperLimit2;
				} else {
					limitState2 = 2;
					limitImpulse2 = 0;
					limitVelocity2 = 0;
				}
				if (!enableSpring2) {
					if (limitVelocity2 > 0.005) limitVelocity2 -= 0.005;
					else if (limitVelocity2 < -0.005) limitVelocity2 += 0.005;
					else limitVelocity2 = 0;
				}
			} else {
				limitState2 = 2;
				limitImpulse2 = 0;
			}
			
			if (enableLimit3) {
				if (lowerLimit3 == upperLimit3) {
					if (limitState3 != 0) {
						limitState3 = 0;
						limitImpulse3 = 0;
					}
					limitVelocity3 = lowerLimit3 - d3;
					if (!enableSpring3) d3 = lowerLimit3;
				} else if (d3 < lowerLimit3) {
					if (limitState3 != -1) {
						limitState3 = -1;
						limitImpulse3 = 0;
					}
					limitVelocity3 = lowerLimit3 - d3;
					if (!enableSpring3) d3 = lowerLimit3;
				} else if (d3 > upperLimit3) {
					if (limitState3 != 1) {
						limitState3 = 1;
						limitImpulse3 = 0;
					}
					limitVelocity3 = upperLimit3 - d3;
					if (!enableSpring3) d3 = upperLimit3;
				} else {
					limitState3 = 2;
					limitImpulse3 = 0;
					limitVelocity3 = 0;
				}
				if (!enableSpring3) {
					if (limitVelocity3 > 0.005) limitVelocity3 -= 0.005;
					else if (limitVelocity3 < -0.005) limitVelocity3 += 0.005;
					else limitVelocity3 = 0;
				}
			} else {
				limitState3 = 2;
				limitImpulse3 = 0;
			}
			
			if (enableMotor1 && (limitState1 != 0 || enableSpring1)) {
				maxMotorImpulse1 = maxMotorForce1 * timeStep;
			} else {
				motorImpulse1 = 0;
				maxMotorImpulse1 = 0;
			}
			
			if (enableMotor2 && (limitState2 != 0 || enableSpring2)) {
				maxMotorImpulse2 = maxMotorForce2 * timeStep;
			} else {
				motorImpulse2 = 0;
				maxMotorImpulse2 = 0;
			}
			
			if (enableMotor3 && (limitState3 != 0 || enableSpring3)) {
				maxMotorImpulse3 = maxMotorForce3 * timeStep;
			} else {
				motorImpulse3 = 0;
				maxMotorImpulse3 = 0;
			}
			
			var rdx:Number = d1 * ax1 + d2 * ax2 + d3 * ax2;
			var rdy:Number = d1 * ay1 + d2 * ay2 + d3 * ay2;
			var rdz:Number = d1 * az1 + d2 * az2 + d3 * az2;
			var w1:Number = m2 / (m1 + m2);
			if (weight >= 0) w1 = weight; // use given weight
			var w2:Number = 1 - w1;
			r1x = r1.x + rdx * w1;
			r1y = r1.y + rdy * w1;
			r1z = r1.z + rdz * w1;
			r2x = r2.x - rdx * w2;
			r2y = r2.y - rdy * w2;
			r2z = r2.z - rdz * w2;
			
			// build jacobians
			t1x1 = r1y * az1 - r1z * ay1;
			t1y1 = r1z * ax1 - r1x * az1;
			t1z1 = r1x * ay1 - r1y * ax1;
			t2x1 = r2y * az1 - r2z * ay1;
			t2y1 = r2z * ax1 - r2x * az1;
			t2z1 = r2x * ay1 - r2y * ax1;
			l1x1 = ax1 * m1;
			l1y1 = ay1 * m1;
			l1z1 = az1 * m1;
			l2x1 = ax1 * m2;
			l2y1 = ay1 * m2;
			l2z1 = az1 * m2;
			a1x1 = t1x1 * i1e00 + t1y1 * i1e01 + t1z1 * i1e02;
			a1y1 = t1x1 * i1e10 + t1y1 * i1e11 + t1z1 * i1e12;
			a1z1 = t1x1 * i1e20 + t1y1 * i1e21 + t1z1 * i1e22;
			a2x1 = t2x1 * i2e00 + t2y1 * i2e01 + t2z1 * i2e02;
			a2y1 = t2x1 * i2e10 + t2y1 * i2e11 + t2z1 * i2e12;
			a2z1 = t2x1 * i2e20 + t2y1 * i2e21 + t2z1 * i2e22;
			
			t1x2 = r1y * az2 - r1z * ay2;
			t1y2 = r1z * ax2 - r1x * az2;
			t1z2 = r1x * ay2 - r1y * ax2;
			t2x2 = r2y * az2 - r2z * ay2;
			t2y2 = r2z * ax2 - r2x * az2;
			t2z2 = r2x * ay2 - r2y * ax2;
			l1x2 = ax2 * m1;
			l1y2 = ay2 * m1;
			l1z2 = az2 * m1;
			l2x2 = ax2 * m2;
			l2y2 = ay2 * m2;
			l2z2 = az2 * m2;
			a1x2 = t1x2 * i1e00 + t1y2 * i1e01 + t1z2 * i1e02;
			a1y2 = t1x2 * i1e10 + t1y2 * i1e11 + t1z2 * i1e12;
			a1z2 = t1x2 * i1e20 + t1y2 * i1e21 + t1z2 * i1e22;
			a2x2 = t2x2 * i2e00 + t2y2 * i2e01 + t2z2 * i2e02;
			a2y2 = t2x2 * i2e10 + t2y2 * i2e11 + t2z2 * i2e12;
			a2z2 = t2x2 * i2e20 + t2y2 * i2e21 + t2z2 * i2e22;
			
			t1x3 = r1y * az3 - r1z * ay3;
			t1y3 = r1z * ax3 - r1x * az3;
			t1z3 = r1x * ay3 - r1y * ax3;
			t2x3 = r2y * az3 - r2z * ay3;
			t2y3 = r2z * ax3 - r2x * az3;
			t2z3 = r2x * ay3 - r2y * ax3;
			l1x3 = ax3 * m1;
			l1y3 = ay3 * m1;
			l1z3 = az3 * m1;
			l2x3 = ax3 * m2;
			l2y3 = ay3 * m2;
			l2z3 = az3 * m2;
			a1x3 = t1x3 * i1e00 + t1y3 * i1e01 + t1z3 * i1e02;
			a1y3 = t1x3 * i1e10 + t1y3 * i1e11 + t1z3 * i1e12;
			a1z3 = t1x3 * i1e20 + t1y3 * i1e21 + t1z3 * i1e22;
			a2x3 = t2x3 * i2e00 + t2y3 * i2e01 + t2z3 * i2e02;
			a2y3 = t2x3 * i2e10 + t2y3 * i2e11 + t2z3 * i2e12;
			a2z3 = t2x3 * i2e20 + t2y3 * i2e21 + t2z3 * i2e22;
			
			// build an impulse matrix
			var m12:Number = m1 + m2;
			k00 = (ax1 * ax1 + ay1 * ay1 + az1 * az1) * m12;
			k01 = (ax1 * ax2 + ay1 * ay2 + az1 * az2) * m12;
			k02 = (ax1 * ax3 + ay1 * ay3 + az1 * az3) * m12;
			k10 = (ax2 * ax1 + ay2 * ay1 + az2 * az1) * m12;
			k11 = (ax2 * ax2 + ay2 * ay2 + az2 * az2) * m12;
			k12 = (ax2 * ax3 + ay2 * ay3 + az2 * az3) * m12;
			k20 = (ax3 * ax1 + ay3 * ay1 + az3 * az1) * m12;
			k21 = (ax3 * ax2 + ay3 * ay2 + az3 * az2) * m12;
			k22 = (ax3 * ax3 + ay3 * ay3 + az3 * az3) * m12;
			
			k00 += t1x1 * a1x1 + t1y1 * a1y1 + t1z1 * a1z1;
			k01 += t1x1 * a1x2 + t1y1 * a1y2 + t1z1 * a1z2;
			k02 += t1x1 * a1x3 + t1y1 * a1y3 + t1z1 * a1z3;
			k10 += t1x2 * a1x1 + t1y2 * a1y1 + t1z2 * a1z1;
			k11 += t1x2 * a1x2 + t1y2 * a1y2 + t1z2 * a1z2;
			k12 += t1x2 * a1x3 + t1y2 * a1y3 + t1z2 * a1z3;
			k20 += t1x3 * a1x1 + t1y3 * a1y1 + t1z3 * a1z1;
			k21 += t1x3 * a1x2 + t1y3 * a1y2 + t1z3 * a1z2;
			k22 += t1x3 * a1x3 + t1y3 * a1y3 + t1z3 * a1z3;
			
			k00 += t2x1 * a2x1 + t2y1 * a2y1 + t2z1 * a2z1;
			k01 += t2x1 * a2x2 + t2y1 * a2y2 + t2z1 * a2z2;
			k02 += t2x1 * a2x3 + t2y1 * a2y3 + t2z1 * a2z3;
			k10 += t2x2 * a2x1 + t2y2 * a2y1 + t2z2 * a2z1;
			k11 += t2x2 * a2x2 + t2y2 * a2y2 + t2z2 * a2z2;
			k12 += t2x2 * a2x3 + t2y2 * a2y3 + t2z2 * a2z3;
			k20 += t2x3 * a2x1 + t2y3 * a2y1 + t2z3 * a2z1;
			k21 += t2x3 * a2x2 + t2y3 * a2y2 + t2z3 * a2z2;
			k22 += t2x3 * a2x3 + t2y3 * a2y3 + t2z3 * a2z3;
			
			kv00 = k00;
			kv11 = k11;
			kv22 = k22;
			dv00 = 1 / kv00;
			dv11 = 1 / kv11;
			dv22 = 1 / kv22;
			
			if (enableSpring1 && limitState1 != 2) {
				var omega:Number = 6.2831853 * frequency1;
				var k:Number = omega * omega * timeStep;
				var dmp:Number = invTimeStep / (k + 2 * limitMotor1.dampingRatio * omega);
				cfm1 = kv00 * dmp;
				limitVelocity1 *= k * dmp;
			} else {
				cfm1 = 0;
				limitVelocity1 *= invTimeStep * 0.05;
			}
			
			if (enableSpring2 && limitState2 != 2) {
				omega = 6.2831853 * frequency2;
				k = omega * omega * timeStep;
				dmp = invTimeStep / (k + 2 * limitMotor2.dampingRatio * omega);
				cfm2 = kv11 * dmp;
				limitVelocity2 *= k * dmp;
			} else {
				cfm2 = 0;
				limitVelocity2 *= invTimeStep * 0.05;
			}
			
			if (enableSpring3 && limitState3 != 2) {
				omega = 6.2831853 * frequency3;
				k = omega * omega * timeStep;
				dmp = invTimeStep / (k + 2 * limitMotor3.dampingRatio * omega);
				cfm3 = kv22 * dmp;
				limitVelocity3 *= k * dmp;
			} else {
				cfm3 = 0;
				limitVelocity3 *= invTimeStep * 0.05;
			}
			
			k00 += cfm1;
			k11 += cfm2;
			k22 += cfm3;
			
			var inv:Number = 1 / (
				k00 * (k11 * k22 - k21 * k12) +
				k10 * (k21 * k02 - k01 * k22) +
				k20 * (k01 * k12 - k11 * k02)
			);
			d00 = (k11 * k22 - k12 * k21) * inv;
			d01 = (k02 * k21 - k01 * k22) * inv;
			d02 = (k01 * k12 - k02 * k11) * inv;
			d10 = (k12 * k20 - k10 * k22) * inv;
			d11 = (k00 * k22 - k02 * k20) * inv;
			d12 = (k02 * k10 - k00 * k12) * inv;
			d20 = (k10 * k21 - k11 * k20) * inv;
			d21 = (k01 * k20 - k00 * k21) * inv;
			d22 = (k00 * k11 - k01 * k10) * inv;
			
			// warm starting
			var totalImpulse1:Number = limitImpulse1 + motorImpulse1;
			var totalImpulse2:Number = limitImpulse2 + motorImpulse2;
			var totalImpulse3:Number = limitImpulse3 + motorImpulse3;
			l1.x += totalImpulse1 * l1x1 + totalImpulse2 * l1x2 + totalImpulse3 * l1x3;
			l1.y += totalImpulse1 * l1y1 + totalImpulse2 * l1y2 + totalImpulse3 * l1y3;
			l1.z += totalImpulse1 * l1z1 + totalImpulse2 * l1z2 + totalImpulse3 * l1z3;
			a1.x += totalImpulse1 * a1x1 + totalImpulse2 * a1x2 + totalImpulse3 * a1x3;
			a1.y += totalImpulse1 * a1y1 + totalImpulse2 * a1y2 + totalImpulse3 * a1y3;
			a1.z += totalImpulse1 * a1z1 + totalImpulse2 * a1z2 + totalImpulse3 * a1z3;
			l2.x -= totalImpulse1 * l2x1 + totalImpulse2 * l2x2 + totalImpulse3 * l2x3;
			l2.y -= totalImpulse1 * l2y1 + totalImpulse2 * l2y2 + totalImpulse3 * l2y3;
			l2.z -= totalImpulse1 * l2z1 + totalImpulse2 * l2z2 + totalImpulse3 * l2z3;
			a2.x -= totalImpulse1 * a2x1 + totalImpulse2 * a2x2 + totalImpulse3 * a2x3;
			a2.y -= totalImpulse1 * a2y1 + totalImpulse2 * a2y2 + totalImpulse3 * a2y3;
			a2.z -= totalImpulse1 * a2z1 + totalImpulse2 * a2z2 + totalImpulse3 * a2z3;
		}
		
		public function solve():void {
			var rvx:Number = l2.x - l1.x + a2.y * r2z - a2.z * r2y - a1.y * r1z + a1.z * r1y;
			var rvy:Number = l2.y - l1.y + a2.z * r2x - a2.x * r2z - a1.z * r1x + a1.x * r1z;
			var rvz:Number = l2.z - l1.z + a2.x * r2y - a2.y * r2x - a1.x * r1y + a1.y * r1x;
			
			var rvn1:Number = rvx * ax1 + rvy * ay1 + rvz * az1;
			var rvn2:Number = rvx * ax2 + rvy * ay2 + rvz * az2;
			var rvn3:Number = rvx * ax3 + rvy * ay3 + rvz * az3;
			
			var oldMotorImpulse1:Number = motorImpulse1;
			var oldMotorImpulse2:Number = motorImpulse2;
			var oldMotorImpulse3:Number = motorImpulse3;
			
			var dMotorImpulse1:Number = 0;
			var dMotorImpulse2:Number = 0;
			var dMotorImpulse3:Number = 0;
			
			if (enableMotor1) {
				dMotorImpulse1 = (rvn1 - motorSpeed1) * dv00;
				motorImpulse1 += dMotorImpulse1;
				if (motorImpulse1 > maxMotorImpulse1) { // clamp motor impulse
					motorImpulse1 = maxMotorImpulse1;
				} else if (motorImpulse1 < -maxMotorImpulse1) {
					motorImpulse1 = -maxMotorImpulse1;
				}
				dMotorImpulse1 = motorImpulse1 - oldMotorImpulse1;
			}
			
			if (enableMotor2) {
				dMotorImpulse2 = (rvn2 - motorSpeed2) * dv11;
				motorImpulse2 += dMotorImpulse2;
				if (motorImpulse2 > maxMotorImpulse2) { // clamp motor impulse
					motorImpulse2 = maxMotorImpulse2;
				} else if (motorImpulse2 < -maxMotorImpulse2) {
					motorImpulse2 = -maxMotorImpulse2;
				}
				dMotorImpulse2 = motorImpulse2 - oldMotorImpulse2;
			}
			
			if (enableMotor3) {
				dMotorImpulse3 = (rvn3 - motorSpeed3) * dv22;
				motorImpulse3 += dMotorImpulse3;
				if (motorImpulse3 > maxMotorImpulse3) { // clamp motor impulse
					motorImpulse3 = maxMotorImpulse3;
				} else if (motorImpulse3 < -maxMotorImpulse3) {
					motorImpulse3 = -maxMotorImpulse3;
				}
				dMotorImpulse3 = motorImpulse3 - oldMotorImpulse3;
			}
			
			// apply motor impulse to relative velocity
			rvn1 += dMotorImpulse1 * kv00 + dMotorImpulse2 * k01 + dMotorImpulse3 * k02;
			rvn2 += dMotorImpulse1 * k10 + dMotorImpulse2 * kv11 + dMotorImpulse3 * k12;
			rvn3 += dMotorImpulse1 * k20 + dMotorImpulse2 * k21 + dMotorImpulse3 * kv22;
			
			// subtract target velocity and applied impulse
			rvn1 -= limitVelocity1 + limitImpulse1 * cfm1;
			rvn2 -= limitVelocity2 + limitImpulse2 * cfm2;
			rvn3 -= limitVelocity3 + limitImpulse3 * cfm3;
			
			var oldLimitImpulse1:Number = limitImpulse1;
			var oldLimitImpulse2:Number = limitImpulse2;
			var oldLimitImpulse3:Number = limitImpulse3;
			
			var dLimitImpulse1:Number = rvn1 * d00 + rvn2 * d01 + rvn3 * d02;
			var dLimitImpulse2:Number = rvn1 * d10 + rvn2 * d11 + rvn3 * d12;
			var dLimitImpulse3:Number = rvn1 * d20 + rvn2 * d21 + rvn3 * d22;
			
			limitImpulse1 += dLimitImpulse1;
			limitImpulse2 += dLimitImpulse2;
			limitImpulse3 += dLimitImpulse3;
			
			// clamp
			var clampState:int = 0;
			if (limitState1 == 2 || limitImpulse1 * limitState1 < 0) {
				dLimitImpulse1 = -oldLimitImpulse1;
				rvn2 += dLimitImpulse1 * k10;
				rvn3 += dLimitImpulse1 * k20;
				clampState |= 1;
			}
			if (limitState2 == 2 || limitImpulse2 * limitState2 < 0) {
				dLimitImpulse2 = -oldLimitImpulse2;
				rvn1 += dLimitImpulse2 * k01;
				rvn3 += dLimitImpulse2 * k21;
				clampState |= 2;
			}
			if (limitState3 == 2 || limitImpulse3 * limitState3 < 0) {
				dLimitImpulse3 = -oldLimitImpulse3;
				rvn1 += dLimitImpulse3 * k02;
				rvn2 += dLimitImpulse3 * k12;
				clampState |= 4;
			}
			
			// update un-clamped impulse
			// TODO: isolate division
			var det:Number;
			switch(clampState) {
			case 1: // update 2 3
				det = 1 / (k11 * k22 - k12 * k21);
				dLimitImpulse2 = (k22 * rvn2 + -k12 * rvn3) * det;
				dLimitImpulse3 = (-k21 * rvn2 + k11 * rvn3) * det;
				break;
			case 2: // update 1 3
				det = 1 / (k00 * k22 - k02 * k20);
				dLimitImpulse1 = (k22 * rvn1 + -k02 * rvn3) * det;
				dLimitImpulse3 = (-k20 * rvn1 + k00 * rvn3) * det;
				break;
			case 3: // update 3
				dLimitImpulse3 = rvn3 / k22;
				break;
			case 4: // update 1 2
				det = 1 / (k00 * k11 - k01 * k10);
				dLimitImpulse1 = (k11 * rvn1 + -k01 * rvn2) * det;
				dLimitImpulse2 = (-k10 * rvn1 + k00 * rvn2) * det;
				break;
			case 5: // update 2
				dLimitImpulse2 = rvn2 / k11;
				break;
			case 6: // update 1
				dLimitImpulse1 = rvn1 / k00;
				break;
			}
			
			limitImpulse1 = oldLimitImpulse1 + dLimitImpulse1;
			limitImpulse2 = oldLimitImpulse2 + dLimitImpulse2;
			limitImpulse3 = oldLimitImpulse3 + dLimitImpulse3;
			
			var dImpulse1:Number = dMotorImpulse1 + dLimitImpulse1;
			var dImpulse2:Number = dMotorImpulse2 + dLimitImpulse2;
			var dImpulse3:Number = dMotorImpulse3 + dLimitImpulse3;
			
			// apply impulse
			l1.x += dImpulse1 * l1x1 + dImpulse2 * l1x2 + dImpulse3 * l1x3;
			l1.y += dImpulse1 * l1y1 + dImpulse2 * l1y2 + dImpulse3 * l1y3;
			l1.z += dImpulse1 * l1z1 + dImpulse2 * l1z2 + dImpulse3 * l1z3;
			a1.x += dImpulse1 * a1x1 + dImpulse2 * a1x2 + dImpulse3 * a1x3;
			a1.y += dImpulse1 * a1y1 + dImpulse2 * a1y2 + dImpulse3 * a1y3;
			a1.z += dImpulse1 * a1z1 + dImpulse2 * a1z2 + dImpulse3 * a1z3;
			l2.x -= dImpulse1 * l2x1 + dImpulse2 * l2x2 + dImpulse3 * l2x3;
			l2.y -= dImpulse1 * l2y1 + dImpulse2 * l2y2 + dImpulse3 * l2y3;
			l2.z -= dImpulse1 * l2z1 + dImpulse2 * l2z2 + dImpulse3 * l2z3;
			a2.x -= dImpulse1 * a2x1 + dImpulse2 * a2x2 + dImpulse3 * a2x3;
			a2.y -= dImpulse1 * a2y1 + dImpulse2 * a2y2 + dImpulse3 * a2y3;
			a2.z -= dImpulse1 * a2z1 + dImpulse2 * a2z2 + dImpulse3 * a2z3;
		}
		
	}

}