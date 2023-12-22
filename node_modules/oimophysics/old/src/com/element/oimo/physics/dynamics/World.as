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
	import com.element.oimo.math.Quat;
	import com.element.oimo.math.Vec3;
	import com.element.oimo.physics.collision.broadphase.AABB;
	import com.element.oimo.physics.collision.broadphase.BroadPhase;
	import com.element.oimo.physics.collision.broadphase.BruteForceBroadPhase;
	import com.element.oimo.physics.collision.broadphase.dbvt.DBVTBroadPhase;
	import com.element.oimo.physics.collision.broadphase.Pair;
	import com.element.oimo.physics.collision.broadphase.sap.SAPBroadPhase;
	import com.element.oimo.physics.collision.narrowphase.BoxBoxCollisionDetector;
	import com.element.oimo.physics.collision.narrowphase.CollisionDetector;
	import com.element.oimo.physics.collision.narrowphase.SphereBoxCollisionDetector;
	import com.element.oimo.physics.collision.narrowphase.SphereSphereCollisionDetector;
	import com.element.oimo.physics.collision.shape.Shape;
	import com.element.oimo.physics.constraint.Constraint;
	import com.element.oimo.physics.constraint.contact.Contact;
	import com.element.oimo.physics.constraint.contact.ContactLink;
	import com.element.oimo.physics.constraint.joint.Joint;
	import com.element.oimo.physics.constraint.joint.JointLink;
	import com.element.oimo.physics.OimoPhysics;
	import com.element.oimo.physics.util.Performance;
	import flash.utils.getTimer;
	/**
	 * 物理演算ワールドのクラスです。
	 * 全ての物理演算オブジェクトはワールドに追加する必要があります。
	 * @author saharan
	 */
	public class World {
		/**
		 * The rigid body list.
		 */
		public var rigidBodies:RigidBody;
		
		/**
		 * The number of rigid bodies.
		 */
		public var numRigidBodies:uint;
		
		/**
		 * The contact list.
		 */
		public var contacts:Contact;
		private var unusedContacts:Contact;
		
		/**
		 * The number of contacts.
		 */
		public var numContacts:uint;
		
		/**
		 * The number of contact points.
		 */
		public var numContactPoints:uint;
		
		/**
		 * The joint list.
		 */
		public var joints:Joint;
		
		/**
		 * The number of joints.
		 */
		public var numJoints:uint;
		
		/**
		 * The number of simulation islands.
		 */
		public var numIslands:uint;
		
		/**
		 * 1回のステップで進む時間の長さです。
		 */
		public var timeStep:Number;
		
		/**
		 * The gravity in the world.
		 */
		public var gravity:Vec3;
		
		/**
		 * The number of iterations for constraint solvers.
		 */
		public var numIterations:int;
		
		/**
		 * Whether the constraints randomizer is enabled or not.
		 */
		public var enableRandomizer:Boolean;
		
		/**
		 * パフォーマンスの詳細情報です。
		 * 計算に要した時間などが記録されています。
		 */
		public var performance:Performance;
		
		/**
		 * 詳細な衝突判定をできるだけ削減するために使用される広域衝突判定です。
		 */
		public var broadPhase:BroadPhase;
		
		private var detectors:Vector.<Vector.<CollisionDetector>>;
		
		private var islandStack:Vector.<RigidBody>;
		private var islandRigidBodies:Vector.<RigidBody>;
		private var maxIslandRigidBodies:int;
		private var islandConstraints:Vector.<Constraint>;
		private var maxIslandConstraints:int;
		
		private var randX:uint;
		private var randA:uint;
		private var randB:uint;
		
		public function World(stepPerSecond:Number = 60, broadPhaseType:int = BroadPhase.BROAD_PHASE_SWEEP_AND_PRUNE) {
			trace("OimoPhysics " + OimoPhysics.VERSION + " Copyright (c) 2012-2013 EL-EMENT saharan");
			timeStep = 1 / stepPerSecond;
			switch(broadPhaseType) {
			case BroadPhase.BROAD_PHASE_BRUTE_FORCE:
				broadPhase = new BruteForceBroadPhase();
				break;
			case BroadPhase.BROAD_PHASE_SWEEP_AND_PRUNE:
				broadPhase = new SAPBroadPhase();
				break;
			case BroadPhase.BROAD_PHASE_DYNAMIC_BOUNDING_VOLUME_TREE:
				broadPhase = new DBVTBroadPhase();
				break;
			default:
				throw new Error("Invalid type.");
			}
			numIterations = 8;
			gravity = new Vec3(0, -9.80665, 0);
			performance = new Performance();
			var numShapeTypes:uint = 3;
			detectors = new Vector.<Vector.<CollisionDetector>>(numShapeTypes, true);
			for (var i:int = 0; i < numShapeTypes; i++) {
				detectors[i] = new Vector.<CollisionDetector>(numShapeTypes, true);
			}
			detectors[Shape.SHAPE_SPHERE][Shape.SHAPE_SPHERE] = new SphereSphereCollisionDetector();
			detectors[Shape.SHAPE_SPHERE][Shape.SHAPE_BOX] = new SphereBoxCollisionDetector(false);
			detectors[Shape.SHAPE_BOX][Shape.SHAPE_SPHERE] = new SphereBoxCollisionDetector(true);
			detectors[Shape.SHAPE_BOX][Shape.SHAPE_BOX] = new BoxBoxCollisionDetector();
			randX = 65535;
			randA = 98765;
			randB = 123456789;
			maxIslandRigidBodies = 64;
			islandRigidBodies = new Vector.<RigidBody>(maxIslandRigidBodies, true);
			islandStack = new Vector.<RigidBody>(maxIslandRigidBodies, true);
			maxIslandConstraints = 128;
			islandConstraints = new Vector.<Constraint>(maxIslandConstraints, true);
			enableRandomizer = true;
		}
		
		/**
		 * Reset the randomizer and remove all rigid bodies, shapes, joints and any object from the world.
		 */
		public function clear():void {
			randX = 65535;
			while (joints != null) {
				removeJoint(joints);
			}
			while (contacts != null) {
				removeContact(contacts);
			}
			while (rigidBodies != null) {
				removeRigidBody(rigidBodies);
			}
		}
		
		/**
		 * ワールドに剛体を追加します。
		 * 追加された剛体はステップ毎の演算対象になります。
		 * @param	rigidBody 追加する剛体
		 */
		public function addRigidBody(rigidBody:RigidBody):void {
			if (rigidBody.parent) {
				throw new Error("一つの剛体を複数ワールドに追加することはできません");
			}
			rigidBody.parent = this;
			rigidBody.awake();
			for (var shape:Shape = rigidBody.shapes; shape != null; shape = shape.next) {
				addShape(shape);
			}
			if (rigidBodies != null) (rigidBodies.prev = rigidBody).next = rigidBodies;
			rigidBodies = rigidBody;
			numRigidBodies++;
		}
		
		/**
		 * ワールドから剛体を削除します。
		 * 削除された剛体はステップ毎の演算対象から外されます。
		 * @param	rigidBody 削除する剛体
		 */
		public function removeRigidBody(rigidBody:RigidBody):void {
			var remove:RigidBody = rigidBody;
			if (remove.parent != this) return;
			remove.awake();
			var js:JointLink = remove.jointLink;
			while (js != null) {
				var joint:Joint = js.joint;
				js = js.next;
				removeJoint(joint);
			}
			for (var shape:Shape = rigidBody.shapes; shape != null; shape = shape.next) {
				removeShape(shape);
			}
			var prev:RigidBody = remove.prev;
			var next:RigidBody = remove.next;
			if (prev != null) prev.next = next;
			if (next != null) next.prev = prev;
			if (rigidBodies == remove) rigidBodies = next;
			remove.prev = null;
			remove.next = null;
			remove.parent = null;
			numRigidBodies--;
		}
		
		/**
		 * ワールドに形状を追加します。
		 * <strong>剛体をワールドに追加、およびワールドに追加されている剛体に形状を追加すると、
		 * 自動で形状もワールドに追加されるので、このメソッドは外部から呼ばないでください。</strong>
		 * @param	shape 追加する形状
		 */
		public function addShape(shape:Shape):void {
			if (!shape.parent || !shape.parent.parent) {
				throw new Error("ワールドに形状を単体で追加することはできません");
			}
			shape.proxy = broadPhase.createProxy(shape);
			shape.updateProxy();
			broadPhase.addProxy(shape.proxy);
		}
		
		/**
		 * ワールドから形状を削除します。
		 * <strong>剛体をワールドから削除、およびワールドに追加されている剛体から形状を削除すると、
		 * 自動で形状もワールドから削除されるので、このメソッドは外部から呼ばないでください。</strong>
		 * @param	shape 削除する形状
		 */
		public function removeShape(shape:Shape):void {
			broadPhase.removeProxy(shape.proxy);
			shape.proxy = null;
		}
		
		/**
		 * ワールドにジョイントを追加します。
		 * 追加されたジョイントはステップ毎の演算対象になります。
		 * @param	joint 追加するジョイント
		 */
		public function addJoint(joint:Joint):void {
			if (joint.parent) {
				throw new Error("一つのジョイントを複数ワールドに追加することはできません");
			}
			if (joints != null) (joints.prev = joint).next = joints;
			joints = joint;
			joint.parent = this;
			numJoints++;
			joint.awake();
			joint.attach();
		}
		
		/**
		 * ワールドからジョイントを削除します。
		 * 削除されたジョイントはステップ毎の演算対象から外されます。
		 * @param	joint 削除するジョイント
		 */
		public function removeJoint(joint:Joint):void {
			var remove:Joint = joint;
			var prev:Joint = remove.prev;
			var next:Joint = remove.next;
			if (prev != null) prev.next = next;
			if (next != null) next.prev = prev;
			if (joints == remove) joints = next;
			remove.prev = null;
			remove.next = null;
			numJoints--;
			remove.awake();
			remove.detach();
			remove.parent = null;
		}
		
		/**
		 * ワールドの時間をタイムステップ秒だけ進めます。
		 */
		public function step():void {
			var time1:int = getTimer();
			var body:RigidBody = rigidBodies;
			while (body != null) {
				body.addedToIsland = false;
				if (body.sleeping) {
					var lv:Vec3 = body.linearVelocity;
					var av:Vec3 = body.angularVelocity;
					var p:Vec3 = body.position;
					var sp:Vec3 = body.sleepPosition;
					var o:Quat = body.orientation;
					var so:Quat = body.sleepOrientation;
					if (
						lv.x != 0 || lv.y != 0 || lv.z != 0 ||
						av.x != 0 || av.y != 0 || av.z != 0 ||
						p.x != sp.x || p.y != sp.y || p.z != sp.z ||
						o.s != so.s || o.x != so.x || o.y != so.y || o.z != so.z
					){ // awake the body
						body.awake();
					}
				}
				body = body.next;
			}
			updateContacts();
			solveIslands();
			var time2:int = getTimer();
			performance.totalTime = time2 - time1;
			performance.updatingTime = performance.totalTime - (performance.broadPhaseTime + performance.narrowPhaseTime + performance.solvingTime);
		}
		
		private function updateContacts():void {
			// broad phase
			var time1:int = getTimer();
			broadPhase.detectPairs();
			var pairs:Vector.<Pair> = broadPhase.pairs;
			var numPairs:uint = broadPhase.numPairs;
			for (var i:int = 0; i < numPairs; i++) {
				var pair:Pair = pairs[i];
				var s1:Shape;
				var s2:Shape;
				if (pair.shape1.id < pair.shape2.id) {
					s1 = pair.shape1;
					s2 = pair.shape2;
				} else {
					s1 = pair.shape2;
					s2 = pair.shape1;
				}
				var link:ContactLink;
				if (s1.numContacts < s2.numContacts) {
					link = s1.contactLink;
				} else {
					link = s2.contactLink;
				}
				var exists:Boolean = false;
				while (link) {
					var contact:Contact = link.contact;
					if (contact.shape1 == s1 && contact.shape2 == s2) {
						contact.persisting = true;
						exists = true; // contact already exists
						break;
					}
					link = link.next;
				}
				if (!exists) {
					addContact(s1, s2);
				}
			}
			
			var time2:int = getTimer();
			performance.broadPhaseTime = time2 - time1;
			
			// update & narrow phase
			numContactPoints = 0;
			contact = contacts;
			while (contact != null) {
				if (!contact.persisting) {
					var aabb1:AABB = contact.shape1.aabb;
					var aabb2:AABB = contact.shape2.aabb;
					if (
						aabb1.minX > aabb2.maxX || aabb1.maxX < aabb2.minX ||
						aabb1.minY > aabb2.maxY || aabb1.maxY < aabb2.minY ||
						aabb1.minZ > aabb2.maxZ || aabb1.maxZ < aabb2.minZ
					) {
						var next:Contact = contact.next;
						removeContact(contact);
						contact = next;
						continue;
					}
				}
				var b1:RigidBody = contact.body1;
				var b2:RigidBody = contact.body2;
				if (b1.isDynamic && !b1.sleeping || b2.isDynamic && !b2.sleeping) {
					contact.updateManifold();
				}
				numContactPoints += contact.manifold.numPoints;
				contact.persisting = false;
				contact.constraint.addedToIsland = false;
				contact = contact.next;
			}
			
			var time3:int = getTimer();
			performance.narrowPhaseTime = time3 - time2;
		}
		
		private function addContact(s1:Shape, s2:Shape):void {
			var newContact:Contact;
			if (unusedContacts != null) {
				newContact = unusedContacts;
				unusedContacts = unusedContacts.next;
			} else {
				newContact = new Contact();
			}
			newContact.attach(s1, s2);
			newContact.detector = detectors[s1.type][s2.type];
			if (contacts) (contacts.prev = newContact).next = contacts;
			contacts = newContact;
			numContacts++;
		}
		
		private function removeContact(contact:Contact):void {
			var prev:Contact = contact.prev;
			var next:Contact = contact.next;
			if (next) next.prev = prev;
			if (prev) prev.next = next;
			if (contacts == contact) contacts = next;
			contact.prev = null;
			contact.next = null;
			contact.detach();
			contact.next = unusedContacts;
			unusedContacts = contact;
			numContacts--;
		}
		
		private function calSleep(body:RigidBody):Boolean {
			if (!body.allowSleep) return false;
			var v:Vec3 = body.linearVelocity;
			if (v.x * v.x + v.y * v.y + v.z * v.z > 0.04) return false;
			v = body.angularVelocity;
			if (v.x * v.x + v.y * v.y + v.z * v.z > 0.25) return false;
			return true;
		}
		
		private function solveIslands():void {
			var invTimeStep:Number = 1 / timeStep;
			var body:RigidBody;
			var joint:Joint;
			var constraint:Constraint;
			var num:uint;
			
			for (joint = joints; joint != null; joint = joint.next) {
				joint.addedToIsland = false;
			}
			
			// expand island buffers
			if (maxIslandRigidBodies < numRigidBodies) {
				maxIslandRigidBodies = numRigidBodies << 1;
				islandRigidBodies = new Vector.<RigidBody>(maxIslandRigidBodies, true);
				islandStack = new Vector.<RigidBody>(maxIslandRigidBodies, true);
			}
			var numConstraints:uint = numJoints + numContacts;
			if (maxIslandConstraints < numConstraints) {
				maxIslandConstraints = numConstraints << 1;
				islandConstraints = new Vector.<Constraint>(maxIslandConstraints, true);
			}
			
			var time1:int = getTimer();
			numIslands = 0;
			// build and solve simulation islands
			for (var base:RigidBody = rigidBodies; base != null; base = base.next) {
				if (base.addedToIsland || base.isStatic || base.sleeping) {
					continue; // ignore
				}
				if (base.isLonely()) { // update single body
					if (base.isDynamic) {
						base.linearVelocity.x += gravity.x * timeStep;
						base.linearVelocity.y += gravity.y * timeStep;
						base.linearVelocity.z += gravity.z * timeStep;
					}
					if (calSleep(base)) {
						base.sleepTime += timeStep;
						if (base.sleepTime > 0.5) {
							base.sleep();
						} else {
							base.updatePosition(timeStep);
						}
					} else {
						base.sleepTime = 0;
						base.updatePosition(timeStep);
					}
					numIslands++;
					continue;
				}
				var islandNumRigidBodies:uint = 0;
				var islandNumConstraints:uint = 0;
				var stackCount:uint = 1;
				// add rigid body to stack
				islandStack[0] = base;
				base.addedToIsland = true;
				// build an island
				do {
					// get rigid body from stack
					body = islandStack[--stackCount];
					islandStack[stackCount] = null; // gc
					body.sleeping = false;
					// add rigid body to the island
					islandRigidBodies[islandNumRigidBodies++] = body;
					if (body.isStatic) {
						continue;
					}
					// search connections
					for (var cs:ContactLink = body.contactLink; cs != null; cs = cs.next) {
						var contact:Contact = cs.contact;
						constraint = contact.constraint;
						if (constraint.addedToIsland || !contact.touching) {
							continue; // ignore
						}
						// add constraint to the island
						islandConstraints[islandNumConstraints++] = constraint;
						constraint.addedToIsland = true;
						var next:RigidBody = cs.body;
						if (next.addedToIsland) {
							continue;
						}
						// add rigid body to stack
						islandStack[stackCount++] = next;
						next.addedToIsland = true;
					}
					for (var js:JointLink = body.jointLink; js != null; js = js.next) {
						constraint = js.joint;
						if (constraint.addedToIsland) {
							continue; // ignore
						}
						// add constraint to the island
						islandConstraints[islandNumConstraints++] = constraint;
						constraint.addedToIsland = true;
						next = js.body;
						if (next.addedToIsland || !next.isDynamic) {
							continue;
						}
						// add rigid body to stack
						islandStack[stackCount++] = next;
						next.addedToIsland = true;
					}
				} while (stackCount != 0);
				
				// update velocities
				var gx:Number = gravity.x * timeStep;
				var gy:Number = gravity.y * timeStep;
				var gz:Number = gravity.z * timeStep;
				for (var j:int = 0; j < islandNumRigidBodies; j++) {
					body = islandRigidBodies[j];
					if (body.isDynamic) {
						body.linearVelocity.x += gx;
						body.linearVelocity.y += gy;
						body.linearVelocity.z += gz;
					}
				}
				
				// randomizing order
				if (enableRandomizer) {
					for (j = 1; j < islandNumConstraints; j++) {
						var swap:uint = (randX = (randX * randA + randB & 0x7fffffff)) / 2147483648.0 * j | 0;
						constraint = islandConstraints[j];
						islandConstraints[j] = islandConstraints[swap];
						islandConstraints[swap] = constraint;
					}
				}
				
				// solve contraints
				for (j = 0; j < islandNumConstraints; j++) {
					islandConstraints[j].preSolve(timeStep, invTimeStep); // pre-solve
				}
				for (var k:int = 0; k < numIterations; k++) {
					for (j = 0; j < islandNumConstraints; j++) {
						islandConstraints[j].solve(); // main-solve
					}
				}
				for (j = 0; j < islandNumConstraints; j++) {
					islandConstraints[j].postSolve(); // post-solve
					islandConstraints[j] = null; // gc
				}
				
				// sleeping check
				var sleepTime:Number = 10;
				for (j = 0; j < islandNumRigidBodies; j++) {
					body = islandRigidBodies[j];
					if (calSleep(body)) {
						body.sleepTime += timeStep;
						if (body.sleepTime < sleepTime) sleepTime = body.sleepTime;
					} else {
						body.sleepTime = 0;
						sleepTime = 0;
						continue;
					}
				}
				if (sleepTime > 0.5) {
					// sleep the island
					for (j = 0; j < islandNumRigidBodies; j++) {
						islandRigidBodies[j].sleep();
						islandRigidBodies[j] = null; // gc
					}
				} else {
					// update positions
					for (j = 0; j < islandNumRigidBodies; j++) {
						islandRigidBodies[j].updatePosition(timeStep);
						islandRigidBodies[j] = null; // gc
					}
				}
				numIslands++;
			}
			var time2:int = getTimer();
			performance.solvingTime = time2 - time1;
		}
		
	}

}