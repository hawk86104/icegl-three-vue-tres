package com.element.oimo.physics.constraint.joint.base {
	import com.element.oimo.math.Mat33;
	import com.element.oimo.math.Quat;
	import com.element.oimo.math.Vec3;
	import com.element.oimo.physics.constraint.joint.Joint;
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * An angular constraint for all axes for various joints.
	 * @author saharan
	 */
	public class AngularConstraint {
		private var joint:Joint;
		private var b1:RigidBody;
		private var b2:RigidBody;
		private var a1:Vec3;
		private var a2:Vec3;
		private var i1:Mat33;
		private var i2:Mat33;
		
		private var targetOrientation:Quat;
		private var relativeOrientation:Quat;
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
		private var ax:Number;
		private var ay:Number;
		private var az:Number;
		private var impx:Number;
		private var impy:Number;
		private var impz:Number;
		private var velx:Number;
		private var vely:Number;
		private var velz:Number;
		
		public function AngularConstraint(joint:Joint, targetOrientation:Quat) {
			this.joint = joint;
			this.targetOrientation = new Quat().invert(targetOrientation);
			relativeOrientation = new Quat();
			b1 = joint.body1;
			b2 = joint.body2;
			a1 = b1.angularVelocity;
			a2 = b2.angularVelocity;
			i1 = b1.inverseInertia;
			i2 = b2.inverseInertia;
			impx = 0;
			impy = 0;
			impz = 0;
		}
		
		public function preSolve(timeStep:Number, invTimeStep:Number):void {
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
			var v00:Number = i1e00 + i2e00;
			var v01:Number = i1e01 + i2e01;
			var v02:Number = i1e02 + i2e02;
			var v10:Number = i1e10 + i2e10;
			var v11:Number = i1e11 + i2e11;
			var v12:Number = i1e12 + i2e12;
			var v20:Number = i1e20 + i2e20;
			var v21:Number = i1e21 + i2e21;
			var v22:Number = i1e22 + i2e22;
			var inv:Number = 1 / (
				v00 * (v11 * v22 - v21 * v12) +
				v10 * (v21 * v02 - v01 * v22) +
				v20 * (v01 * v12 - v11 * v02)
			);
			d00 = (v11 * v22 - v12 * v21) * inv;
			d01 = (v02 * v21 - v01 * v22) * inv;
			d02 = (v01 * v12 - v02 * v11) * inv;
			d10 = (v12 * v20 - v10 * v22) * inv;
			d11 = (v00 * v22 - v02 * v20) * inv;
			d12 = (v02 * v10 - v00 * v12) * inv;
			d20 = (v10 * v21 - v11 * v20) * inv;
			d21 = (v01 * v20 - v00 * v21) * inv;
			d22 = (v00 * v11 - v01 * v10) * inv;
			
			relativeOrientation.invert(b1.orientation); // error = b2 - b1 - target
			relativeOrientation.mul(targetOrientation, relativeOrientation);
			relativeOrientation.mul(b2.orientation, relativeOrientation);
			inv = relativeOrientation.s * 2;
			velx = relativeOrientation.x * inv;
			vely = relativeOrientation.y * inv;
			velz = relativeOrientation.z * inv;
			var len:Number = Math.sqrt(velx * velx + vely * vely + velz * velz);
			if (len > 0.02) {
				len = (0.02 - len) / len * invTimeStep * 0.05;
				velx *= len;
				vely *= len;
				velz *= len;
			} else {
				velx = 0;
				vely = 0;
				velz = 0;
			}
			a1.x += impx * i1e00 + impy * i1e01 + impz * i1e02;
			a1.y += impx * i1e10 + impy * i1e11 + impz * i1e12;
			a1.z += impx * i1e20 + impy * i1e21 + impz * i1e22;
			a2.x -= impx * i2e00 + impy * i2e01 + impz * i2e02;
			a2.y -= impx * i2e10 + impy * i2e11 + impz * i2e12;
			a2.z -= impx * i2e20 + impy * i2e21 + impz * i2e22;
		}
		
		public function solve():void {
			var rvx:Number = a2.x - a1.x - velx;
			var rvy:Number = a2.y - a1.y - vely;
			var rvz:Number = a2.z - a1.z - velz;
			var nimpx:Number = rvx * d00 + rvy * d01 + rvz * d02;
			var nimpy:Number = rvx * d10 + rvy * d11 + rvz * d12;
			var nimpz:Number = rvx * d20 + rvy * d21 + rvz * d22;
			impx += nimpx;
			impy += nimpy;
			impz += nimpz;
			a1.x += nimpx * i1e00 + nimpy * i1e01 + nimpz * i1e02;
			a1.y += nimpx * i1e10 + nimpy * i1e11 + nimpz * i1e12;
			a1.z += nimpx * i1e20 + nimpy * i1e21 + nimpz * i1e22;
			a2.x -= nimpx * i2e00 + nimpy * i2e01 + nimpz * i2e02;
			a2.y -= nimpx * i2e10 + nimpy * i2e11 + nimpz * i2e12;
			a2.z -= nimpx * i2e20 + nimpy * i2e21 + nimpz * i2e22;
		}
		
	}

}