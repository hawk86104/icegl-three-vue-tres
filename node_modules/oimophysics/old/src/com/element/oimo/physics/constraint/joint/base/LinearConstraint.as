package com.element.oimo.physics.constraint.joint.base {
	import com.element.oimo.math.Mat33;
	import com.element.oimo.math.Vec3;
	import com.element.oimo.physics.constraint.joint.Joint;
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * A linear constraint for all axes for various joints.
	 * @author saharan
	 */
	public class LinearConstraint {
		private var joint:Joint;
		private var b1:RigidBody;
		private var b2:RigidBody;
		private var r1:Vec3;
		private var r2:Vec3;
		private var p1:Vec3;
		private var p2:Vec3;
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
		private var d00:Number;
		private var d01:Number;
		private var d02:Number;
		private var d10:Number;
		private var d11:Number;
		private var d12:Number;
		private var d20:Number;
		private var d21:Number;
		private var d22:Number;
		private var r1x:Number;
		private var r1y:Number;
		private var r1z:Number;
		private var r2x:Number;
		private var r2y:Number;
		private var r2z:Number;
		private var ax1x:Number;
		private var ax1y:Number;
		private var ax1z:Number;
		private var ay1x:Number;
		private var ay1y:Number;
		private var ay1z:Number;
		private var az1x:Number;
		private var az1y:Number;
		private var az1z:Number;
		private var ax2x:Number;
		private var ax2y:Number;
		private var ax2z:Number;
		private var ay2x:Number;
		private var ay2y:Number;
		private var ay2z:Number;
		private var az2x:Number;
		private var az2y:Number;
		private var az2z:Number;
		private var vel:Number;
		private var impx:Number;
		private var impy:Number;
		private var impz:Number;
		private var velx:Number;
		private var vely:Number;
		private var velz:Number;
		
		public function LinearConstraint(joint:Joint) {
			this.joint = joint;
			r1 = joint.relativeAnchorPoint1;
			r2 = joint.relativeAnchorPoint2;
			p1 = joint.anchorPoint1;
			p2 = joint.anchorPoint2;
			b1 = joint.body1;
			b2 = joint.body2;
			l1 = b1.linearVelocity;
			l2 = b2.linearVelocity;
			a1 = b1.angularVelocity;
			a2 = b2.angularVelocity;
			i1 = b1.inverseInertia;
			i2 = b2.inverseInertia;
			impx = 0;
			impy = 0;
			impz = 0;
		}
		
		public function preSolve(timeStep:Number, invTimeStep:Number):void {
			r1x = r1.x;
			r1y = r1.y;
			r1z = r1.z;
			r2x = r2.x;
			r2y = r2.y;
			r2z = r2.z;
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
			ax1x = r1z * i1e01 + -r1y * i1e02;
			ax1y = r1z * i1e11 + -r1y * i1e12;
			ax1z = r1z * i1e21 + -r1y * i1e22;
			ay1x = -r1z * i1e00 + r1x * i1e02;
			ay1y = -r1z * i1e10 + r1x * i1e12;
			ay1z = -r1z * i1e20 + r1x * i1e22;
			az1x = r1y * i1e00 + -r1x * i1e01;
			az1y = r1y * i1e10 + -r1x * i1e11;
			az1z = r1y * i1e20 + -r1x * i1e21;
			ax2x = r2z * i2e01 + -r2y * i2e02;
			ax2y = r2z * i2e11 + -r2y * i2e12;
			ax2z = r2z * i2e21 + -r2y * i2e22;
			ay2x = -r2z * i2e00 + r2x * i2e02;
			ay2y = -r2z * i2e10 + r2x * i2e12;
			ay2z = -r2z * i2e20 + r2x * i2e22;
			az2x = r2y * i2e00 + -r2x * i2e01;
			az2y = r2y * i2e10 + -r2x * i2e11;
			az2z = r2y * i2e20 + -r2x * i2e21;
			
			// calculate point-to-point mass matrix
			// from impulse equation
			// 
			// M = ([/m] - [r^][/I][r^]) ^ -1
			// 
			// where
			// 
			// [/m] = |1/m, 0, 0|
			//        |0, 1/m, 0|
			//        |0, 0, 1/m|
			// 
			// [r^] = |0, -rz, ry|
			//        |rz, 0, -rx|
			//        |-ry, rx, 0|
			// 
			// [/I] = Inverted moment inertia
			
			var k00:Number = m1 + m2;
			var k01:Number = 0;
			var k02:Number = 0;
			var k10:Number = 0;
			var k11:Number = k00;
			var k12:Number = 0;
			var k20:Number = 0;
			var k21:Number = 0;
			var k22:Number = k00;
			
			k00 += i1e11 * r1z * r1z - (i1e21 + i1e12) * r1y * r1z + i1e22 * r1y * r1y;
			k01 += (i1e20 * r1y + i1e12 * r1x) * r1z - i1e10 * r1z * r1z - i1e22 * r1x * r1y;
			k02 += (i1e10 * r1y - i1e11 * r1x) * r1z - i1e20 * r1y * r1y + i1e21 * r1x * r1y;
			k10 += (i1e02 * r1y + i1e21 * r1x) * r1z - i1e01 * r1z * r1z - i1e22 * r1x * r1y;
			k11 += i1e00 * r1z * r1z - (i1e20 + i1e02) * r1x * r1z + i1e22 * r1x * r1x;
			k12 += (i1e01 * r1x - i1e00 * r1y) * r1z - i1e21 * r1x * r1x + i1e20 * r1x * r1y;
			k20 += (i1e01 * r1y - i1e11 * r1x) * r1z - i1e02 * r1y * r1y + i1e12 * r1x * r1y;
			k21 += (i1e10 * r1x - i1e00 * r1y) * r1z - i1e12 * r1x * r1x + i1e02 * r1x * r1y;
			k22 += i1e00 * r1y * r1y - (i1e10 + i1e01) * r1x * r1y + i1e11 * r1x * r1x;
			
			k00 += i2e11 * r2z * r2z - (i2e21 + i2e12) * r2y * r2z + i2e22 * r2y * r2y;
			k01 += (i2e20 * r2y + i2e12 * r2x) * r2z - i2e10 * r2z * r2z - i2e22 * r2x * r2y;
			k02 += (i2e10 * r2y - i2e11 * r2x) * r2z - i2e20 * r2y * r2y + i2e21 * r2x * r2y;
			k10 += (i2e02 * r2y + i2e21 * r2x) * r2z - i2e01 * r2z * r2z - i2e22 * r2x * r2y;
			k11 += i2e00 * r2z * r2z - (i2e20 + i2e02) * r2x * r2z + i2e22 * r2x * r2x;
			k12 += (i2e01 * r2x - i2e00 * r2y) * r2z - i2e21 * r2x * r2x + i2e20 * r2x * r2y;
			k20 += (i2e01 * r2y - i2e11 * r2x) * r2z - i2e02 * r2y * r2y + i2e12 * r2x * r2y;
			k21 += (i2e10 * r2x - i2e00 * r2y) * r2z - i2e12 * r2x * r2x + i2e02 * r2x * r2y;
			k22 += i2e00 * r2y * r2y - (i2e10 + i2e01) * r2x * r2y + i2e11 * r2x * r2x;
			
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
			
			velx = p2.x - p1.x;
			vely = p2.y - p1.y;
			velz = p2.z - p1.z;
			var len:Number = Math.sqrt(velx * velx + vely * vely + velz * velz);
			if (len > 0.005) {
				len = (0.005 - len) / len * invTimeStep * 0.05;
				velx *= len;
				vely *= len;
				velz *= len;
			} else {
				velx = 0;
				vely = 0;
				velz = 0;
			}
			
			impx *= 0.95;
			impy *= 0.95;
			impz *= 0.95;
			
			l1.x += impx * m1;
			l1.y += impy * m1;
			l1.z += impz * m1;
			a1.x += impx * ax1x + impy * ay1x + impz * az1x;
			a1.y += impx * ax1y + impy * ay1y + impz * az1y;
			a1.z += impx * ax1z + impy * ay1z + impz * az1z;
			l2.x -= impx * m2;
			l2.y -= impy * m2;
			l2.z -= impz * m2;
			a2.x -= impx * ax2x + impy * ay2x + impz * az2x;
			a2.y -= impx * ax2y + impy * ay2y + impz * az2y;
			a2.z -= impx * ax2z + impy * ay2z + impz * az2z;
		}
		
		public function solve():void {
			var rvx:Number = l2.x - l1.x + a2.y * r2z - a2.z * r2y - a1.y * r1z + a1.z * r1y - velx;
			var rvy:Number = l2.y - l1.y + a2.z * r2x - a2.x * r2z - a1.z * r1x + a1.x * r1z - vely;
			var rvz:Number = l2.z - l1.z + a2.x * r2y - a2.y * r2x - a1.x * r1y + a1.y * r1x - velz;
			var nimpx:Number = rvx * d00 + rvy * d01 + rvz * d02;
			var nimpy:Number = rvx * d10 + rvy * d11 + rvz * d12;
			var nimpz:Number = rvx * d20 + rvy * d21 + rvz * d22;
			impx += nimpx;
			impy += nimpy;
			impz += nimpz;
			l1.x += nimpx * m1;
			l1.y += nimpy * m1;
			l1.z += nimpz * m1;
			a1.x += nimpx * ax1x + nimpy * ay1x + nimpz * az1x;
			a1.y += nimpx * ax1y + nimpy * ay1y + nimpz * az1y;
			a1.z += nimpx * ax1z + nimpy * ay1z + nimpz * az1z;
			l2.x -= nimpx * m2;
			l2.y -= nimpy * m2;
			l2.z -= nimpz * m2;
			a2.x -= nimpx * ax2x + nimpy * ay2x + nimpz * az2x;
			a2.y -= nimpx * ax2y + nimpy * ay2y + nimpz * az2y;
			a2.z -= nimpx * ax2z + nimpy * ay2z + nimpz * az2z;
		}
		
	}

}