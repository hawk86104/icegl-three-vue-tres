/* Copyright (c) 2012-2013 EL-EMENT saharan
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation  * files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy,  * modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to
 * whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
 * ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package com.element.oimo.physics.dynamics {
	import com.element.oimo.math.Mat33;
	import com.element.oimo.math.Quat;
	import com.element.oimo.math.Vec3;
	import com.element.oimo.physics.collision.shape.MassInfo;
	import com.element.oimo.physics.collision.shape.Shape;
	import com.element.oimo.physics.constraint.contact.ContactLink;
	import com.element.oimo.physics.constraint.joint.JointLink;
	/**
	 * 剛体のクラスです。
	 * 剛体は衝突処理用に単数あるいは複数の形状を持ち、
	 * それぞれ個別にパラメーターを設定できます。
	 * @author saharan
	 */
	public class RigidBody {
		/**
		 * 動的な剛体を表す剛体の種類です。
		 */
		public static const BODY_DYNAMIC:uint = 0x1;
		
		/**
		 * 静的な剛体を表す剛体の種類です。
		 */
		public static const BODY_STATIC:uint = 0x2;
		
		/**
		 * 一つの剛体に追加できる形状の最大数です。
		 */
		public static const MAX_SHAPES:uint = 64;
		
		public var prev:RigidBody;
		public var next:RigidBody;
		
		/**
		 * 剛体の種類を表します。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 * 
		 * 剛体の種類を変更する場合は、必ず
		 * setupMass メソッドの引数に設定したい種類を指定してください。
		 */
		public var type:uint;
		
		/**
		 * この剛体が動的な剛体であるかどうかを示します。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 */
		public var isDynamic:Boolean;
		
		/**
		 * この剛体が静的な剛体であるかどうかを示します。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 */
		public var isStatic:Boolean;
		
		/**
		 * 重心のワールド座標です。
		 */
		public var position:Vec3;
		
		/**
		 * 姿勢を表すクォータニオンです。
		 */
		public var orientation:Quat;
		
		/**
		 * スリープ直前での重心のワールド座標です。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 */
		public var sleepPosition:Vec3;
		
		/**
		 * スリープ直前での姿勢を表すクォータニオンです。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 */
		public var sleepOrientation:Quat;
		
		/**
		 * 並進速度です。
		 */
		public var linearVelocity:Vec3;
		
		/**
		 * 角速度です。
		 */
		public var angularVelocity:Vec3;
		
		/**
		 * 姿勢を表す回転行列です。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 * 
		 * 回転行列は、ステップ毎にクォータニオンから再計算されます。
		 */
		public var rotation:Mat33;
		
		/**
		 * 質量です。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 * 
		 * 質量は setupMass メソッドを呼び出すと、
		 * 含まれている形状から自動で再計算されます。
		 */
		public var mass:Number;
		
		/**
		 * 質量の逆数です。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 * 
		 * 質量は setupMass メソッドを呼び出すと、
		 * 含まれている形状から自動で再計算されます。
		 */
		public var inverseMass:Number;
		
		/**
		 * ワールド系での慣性テンソルの逆行列です。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 * 
		 * ワールド系での慣性テンソルの逆行列は、ステップ毎に
		 * 姿勢と初期状態の慣性テンソルの逆数から再計算されます。
		 */
		public var inverseInertia:Mat33;
		
		/**
		 * 初期状態での慣性テンソルです。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 * 
		 * 慣性テンソルは setupMass メソッドを呼び出すと、
		 * 含まれている形状から自動で再計算されます。
		 */
		public var localInertia:Mat33;
		
		/**
		 * 初期状態での慣性テンソルの逆行列です。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 * 
		 * 慣性テンソルは setupMass メソッドを呼び出すと、
		 * 含まれている形状から自動で再計算されます。
		 */
		public var inverseLocalInertia:Mat33;
		
		/**
		 * 剛体に含まれている形状の配列です。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 */
		public var shapes:Shape;
		
		/**
		 * 剛体に含まれている形状の数です。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 */
		public var numShapes:uint;
		
		/**
		 * 剛体が追加されているワールドです。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 */
		public var parent:World;
		
		public var contactLink:ContactLink;
		public var numContacts:uint;
		
		/**
		 * 剛体に接続されているジョイントのリンク配列です。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 */
		public var jointLink:JointLink;
		
		/**
		 * 剛体に接続されているジョイントの数です。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 */
		public var numJoints:uint;
		
		/**
		 * 剛体がシミュレーションアイランドに追加されたかどうかを示します。
		 * この変数は内部でのみ使用されます。
		 */
		public var addedToIsland:Boolean;
		
		/**
		 * 剛体が静止してからの時間です。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 */
		public var sleepTime:Number;
		
		/**
		 * 剛体がスリープ状態であるかどうかを示します。
		 * <strong>この変数は外部から変更しないでください。</strong>
		 * 剛体をスリープさせる場合は sleep メソッドを、
		 * 剛体のスリープ状態を解除する場合は awake メソッドを呼び出してください。
		 */
		public var sleeping:Boolean;
		
		/**
		 * 剛体をスリープさせるかを示します。
		 * シミュレーションアイランド内の全ての剛体が静止している状態が一定時間続くと、
		 * そのシミュレーションアイランドはスリープ状態に入ります。
		 * スリープしている剛体は awake メソッドが呼び出されるか、
		 * 外部からの干渉を受けるまで、スリープ状態が解除されることはありません。
		 */
		public var allowSleep:Boolean;
		
		private const massInfo:MassInfo = new MassInfo();
		
		/**
		 * 新しく RigidBody オブジェクトを作成します。
		 * 回転成分を指定することもできます。
		 * @param	x
		 * @param	y
		 * @param	z
		 * @param	rad ラジアンでの回転角度
		 * @param	ax 回転軸の x 成分
		 * @param	ay 回転軸の y 成分
		 * @param	az 回転軸の z 成分
		 */
		public function RigidBody(x:Number = 0, y:Number = 0, z:Number = 0, rad:Number = 0, ax:Number = 0, ay:Number = 0, az:Number = 0) {
			position = new Vec3(x, y, z);
			var len:Number = ax * ax + ay * ay + az * az;
			if (len > 0) {
				len = 1 / Math.sqrt(len);
				ax *= len;
				ay *= len;
				az *= len;
			}
			var sin:Number = Math.sin(rad * 0.5);
			var cos:Number = Math.cos(rad * 0.5);
			orientation = new Quat(cos, sin * ax, sin * ay, sin * az);
			linearVelocity = new Vec3();
			angularVelocity = new Vec3();
			sleepPosition = new Vec3();
			sleepOrientation = new Quat();
			rotation = new Mat33();
			inverseInertia = new Mat33();
			localInertia = new Mat33();
			inverseLocalInertia = new Mat33();
			allowSleep = true;
			sleepTime = 0;
		}
		
		/**
		 * 剛体に形状を追加します。
		 * 形状を追加した場合、次のステップ開始までに setupMass メソッドを呼び出してください。
		 * @param	shape 追加する形状
		 */
		public function addShape(shape:Shape):void {
			if (shape.parent) {
				throw new Error("一つの形状を複数剛体に追加することはできません");
			}
			if (shapes != null) (shapes.prev = shape).next = shapes;
			shapes = shape;
			shape.parent = this;
			if (parent) parent.addShape(shape);
			numShapes++;
		}
		
		/**
		 * 剛体から形状を削除します。
		 * 形状を削除した場合、次のステップ開始までに setupMass メソッドを呼び出してください。
		 * @param	shape 削除する形状
		 */
		public function removeShape(shape:Shape):void {
			var remove:Shape = shape;
			if (remove.parent != this) return;
			var prev:Shape = remove.prev;
			var next:Shape = remove.next;
			if (prev != null) prev.next = next;
			if (next != null) next.prev = prev;
			if (shapes == remove) shapes = next;
			remove.prev = null;
			remove.next = null;
			remove.parent = null;
			if (parent) parent.removeShape(remove);
			numShapes--;
		}
		
		/**
		 * Calulates mass datas(center of gravity, mass, moment inertia, etc...).
		 * If the parameter type is set to BODY_STATIC, the rigid body will be fixed to the space.
		 * If the parameter adjustPosition is set to true, the shapes' relative positions and
		 * the rigid body's position will be adjusted to the center of gravity.
		 * @param	type
		 * @param	adjustPosition
		 */
		public function setupMass(type:uint = BODY_DYNAMIC, adjustPosition:Boolean = true):void {
			this.type = type;
			isDynamic = type == BODY_DYNAMIC;
			isStatic = type == BODY_STATIC;
			mass = 0;
			localInertia.init(0, 0, 0, 0, 0, 0, 0, 0, 0);
			var tmpM:Mat33 = new Mat33();
			var tmpV:Vec3 = new Vec3();
			for (var shape:Shape = shapes; shape != null; shape = shape.next) {
				shape.calculateMassInfo(massInfo);
				var shapeMass:Number = massInfo.mass;
				var relX:Number = shape.relativePosition.x;
				var relY:Number = shape.relativePosition.y;
				var relZ:Number = shape.relativePosition.z;
				
				tmpV.x += relX * shapeMass;
				tmpV.y += relY * shapeMass;
				tmpV.z += relZ * shapeMass;
				mass += shapeMass;
				
				rotateInertia(shape.relativeRotation, massInfo.inertia, tmpM);
				localInertia.addEqual(tmpM);
				
				// add offset inertia
				localInertia.e00 += shapeMass * (relY * relY + relZ * relZ);
				localInertia.e11 += shapeMass * (relX * relX + relZ * relZ);
				localInertia.e22 += shapeMass * (relX * relX + relY * relY);
				var xy:Number = shapeMass * relX * relY;
				var yz:Number = shapeMass * relY * relZ;
				var zx:Number = shapeMass * relZ * relX;
				localInertia.e01 -= xy;
				localInertia.e10 -= xy;
				localInertia.e02 -= yz;
				localInertia.e20 -= yz;
				localInertia.e12 -= zx;
				localInertia.e21 -= zx;
			}
			inverseMass = 1 / mass;
			tmpV.scaleEqual(inverseMass);
			
			if (adjustPosition) {
				position.addEqual(tmpV);
				for (shape = shapes; shape != null; shape = shape.next) {
					shape.relativePosition.subEqual(tmpV);
				}
				// subtract offset inertia
				relX = tmpV.x;
				relY = tmpV.y;
				relZ = tmpV.z;
				localInertia.e00 -= mass * (relY * relY + relZ * relZ);
				localInertia.e11 -= mass * (relX * relX + relZ * relZ);
				localInertia.e22 -= mass * (relX * relX + relY * relY);
				xy = mass * relX * relY;
				yz = mass * relY * relZ;
				zx = mass * relZ * relX;
				localInertia.e01 += xy;
				localInertia.e10 += xy;
				localInertia.e02 += yz;
				localInertia.e20 += yz;
				localInertia.e12 += zx;
				localInertia.e21 += zx;
			}
			
			inverseLocalInertia.invert(localInertia);
			
			if (type == BODY_STATIC) {
				inverseMass = 0;
				inverseLocalInertia.init(0, 0, 0, 0, 0, 0, 0, 0, 0);
			}
			
			syncShapes();
			awake();
		}
		
		/**
		 * Awake the rigid body.
		 */
		public function awake():void {
			if (!allowSleep || !sleeping) return;
			sleeping = false;
			sleepTime = 0;
			// awake connected constraints
			var cs:ContactLink = contactLink;
			while (cs != null) {
				cs.body.sleepTime = 0;
				cs.body.sleeping = false;
				cs = cs.next;
			}
			var js:JointLink = jointLink;
			while (js != null) {
				js.body.sleepTime = 0;
				js.body.sleeping = false;
				js = js.next;
			}
			for (var shape:Shape = shapes; shape != null; shape = shape.next) {
				shape.updateProxy();
			}
		}
		
		/**
		 * Sleep the rigid body.
		 */
		public function sleep():void {
			if (!allowSleep || sleeping) return;
			linearVelocity.x = 0;
			linearVelocity.y = 0;
			linearVelocity.z = 0;
			angularVelocity.x = 0;
			angularVelocity.y = 0;
			angularVelocity.z = 0;
			sleepPosition.x = position.x;
			sleepPosition.y = position.y;
			sleepPosition.z = position.z;
			sleepOrientation.s = orientation.s;
			sleepOrientation.x = orientation.x;
			sleepOrientation.y = orientation.y;
			sleepOrientation.z = orientation.z;
			sleepTime = 0;
			sleeping = true;
			for (var shape:Shape = shapes; shape != null; shape = shape.next) {
				shape.updateProxy();
			}
		}
		
		/**
		 * Get whether the rigid body has not any connection with others.
		 * @return
		 */
		public function isLonely():Boolean {
			return numJoints == 0 && numContacts == 0;
		}
		
		/**
		 * 剛体の運動を時間積分し、形状などの情報を更新します。
		 * このメソッドはワールドのステップを呼ぶと自動で呼び出されるので、
		 * 通常は外部から呼ぶ必要はありません。
		 * @param	timeStep 時間刻み幅
		 */
		public function updatePosition(timeStep:Number):void {
			switch(type) {
			case BODY_STATIC:
				linearVelocity.x = 0;
				linearVelocity.y = 0;
				linearVelocity.z = 0;
				angularVelocity.x = 0;
				angularVelocity.y = 0;
				angularVelocity.z = 0;
				break;
			case BODY_DYNAMIC:
				var vx:Number = linearVelocity.x;
				var vy:Number = linearVelocity.y;
				var vz:Number = linearVelocity.z;
				position.x += vx * timeStep;
				position.y += vy * timeStep;
				position.z += vz * timeStep;
				vx = angularVelocity.x;
				vy = angularVelocity.y;
				vz = angularVelocity.z;
				var os:Number = orientation.s;
				var ox:Number = orientation.x;
				var oy:Number = orientation.y;
				var oz:Number = orientation.z;
				timeStep *= 0.5;
				var s:Number = (-vx * ox - vy * oy - vz * oz) * timeStep;
				var x:Number = (vx * os + vy * oz - vz * oy) * timeStep;
				var y:Number = (-vx * oz + vy * os + vz * ox) * timeStep;
				var z:Number = (vx * oy - vy * ox + vz * os) * timeStep;
				os += s;
				ox += x;
				oy += y;
				oz += z;
				s = 1 / Math.sqrt(os * os + ox * ox + oy * oy + oz * oz);
				orientation.s = os * s;
				orientation.x = ox * s;
				orientation.y = oy * s;
				orientation.z = oz * s;
				//var len:Number = Math.sqrt(vx * vx + vy * vy + vz * vz);
				//var theta:Number = len * timeStep;
				//if (len > 0) len = 1 / len;
				//vx *= len;
				//vy *= len;
				//vz *= len;
				//var sin:Number = Math.sin(theta * 0.5);
				//var cos:Number = Math.cos(theta * 0.5);
				//var q:Quat = new Quat(cos, vx * sin, vy * sin, vz * sin);
				//orientation.mul(q, orientation);
				//orientation.normalize(orientation);
				break;
			default:
				throw new Error("Invalid type.");
			}
			syncShapes();
		}
		
		private function rotateInertia(rot:Mat33, inertia:Mat33, out:Mat33):void {
			var r00:Number = rot.e00;
			var r01:Number = rot.e01;
			var r02:Number = rot.e02;
			var r10:Number = rot.e10;
			var r11:Number = rot.e11;
			var r12:Number = rot.e12;
			var r20:Number = rot.e20;
			var r21:Number = rot.e21;
			var r22:Number = rot.e22;
			var i00:Number = inertia.e00;
			var i01:Number = inertia.e01;
			var i02:Number = inertia.e02;
			var i10:Number = inertia.e10;
			var i11:Number = inertia.e11;
			var i12:Number = inertia.e12;
			var i20:Number = inertia.e20;
			var i21:Number = inertia.e21;
			var i22:Number = inertia.e22;
			var e00:Number = r00 * i00 + r01 * i10 + r02 * i20;
			var e01:Number = r00 * i01 + r01 * i11 + r02 * i21;
			var e02:Number = r00 * i02 + r01 * i12 + r02 * i22;
			var e10:Number = r10 * i00 + r11 * i10 + r12 * i20;
			var e11:Number = r10 * i01 + r11 * i11 + r12 * i21;
			var e12:Number = r10 * i02 + r11 * i12 + r12 * i22;
			var e20:Number = r20 * i00 + r21 * i10 + r22 * i20;
			var e21:Number = r20 * i01 + r21 * i11 + r22 * i21;
			var e22:Number = r20 * i02 + r21 * i12 + r22 * i22;
			out.e00 = e00 * r00 + e01 * r01 + e02 * r02;
			out.e01 = e00 * r10 + e01 * r11 + e02 * r12;
			out.e02 = e00 * r20 + e01 * r21 + e02 * r22;
			out.e10 = e10 * r00 + e11 * r01 + e12 * r02;
			out.e11 = e10 * r10 + e11 * r11 + e12 * r12;
			out.e12 = e10 * r20 + e11 * r21 + e12 * r22;
			out.e20 = e20 * r00 + e21 * r01 + e22 * r02;
			out.e21 = e20 * r10 + e21 * r11 + e22 * r12;
			out.e22 = e20 * r20 + e21 * r21 + e22 * r22;
		}
		
		private function syncShapes():void {
			var s:Number = orientation.s;
			var x:Number = orientation.x;
			var y:Number = orientation.y;
			var z:Number = orientation.z;
			var x2:Number = 2 * x;
			var y2:Number = 2 * y;
			var z2:Number = 2 * z;
			var xx:Number = x * x2;
			var yy:Number = y * y2;
			var zz:Number = z * z2;
			var xy:Number = x * y2;
			var yz:Number = y * z2;
			var xz:Number = x * z2;
			var sx:Number = s * x2;
			var sy:Number = s * y2;
			var sz:Number = s * z2;
			rotation.e00 = 1 - yy - zz;
			rotation.e01 = xy - sz;
			rotation.e02 = xz + sy;
			rotation.e10 = xy + sz;
			rotation.e11 = 1 - xx - zz;
			rotation.e12 = yz - sx;
			rotation.e20 = xz - sy;
			rotation.e21 = yz + sx;
			rotation.e22 = 1 - xx - yy;
			var r00:Number = rotation.e00;
			var r01:Number = rotation.e01;
			var r02:Number = rotation.e02;
			var r10:Number = rotation.e10;
			var r11:Number = rotation.e11;
			var r12:Number = rotation.e12;
			var r20:Number = rotation.e20;
			var r21:Number = rotation.e21;
			var r22:Number = rotation.e22;
			rotateInertia(rotation, inverseLocalInertia, inverseInertia);
			for (var shape:Shape = shapes; shape != null; shape = shape.next) {
				var relPos:Vec3 = shape.relativePosition;
				var relRot:Mat33 = shape.relativeRotation;
				var rot:Mat33 = shape.rotation;
				var lx:Number = relPos.x;
				var ly:Number = relPos.y;
				var lz:Number = relPos.z;
				shape.position.x = position.x + lx * r00 + ly * r01 + lz * r02;
				shape.position.y = position.y + lx * r10 + ly * r11 + lz * r12;
				shape.position.z = position.z + lx * r20 + ly * r21 + lz * r22;
				rot.mul(relRot, rotation);
				shape.updateProxy();
			}
		}
		
		public function applyImpulse(position:Vec3, force:Vec3):void {
			linearVelocity.x += force.x * inverseMass;
			linearVelocity.y += force.y * inverseMass;
			linearVelocity.z += force.z * inverseMass;
			var rel:Vec3 = new Vec3();
			rel.sub(position, this.position).cross(rel, force).mulMat(inverseInertia, rel);
			angularVelocity.x += rel.x;
			angularVelocity.y += rel.y;
			angularVelocity.z += rel.z;
		}
		
	}

}