package com.element.oimo.physics.constraint.joint {
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * A link list of joints.
	 * @author saharan
	 */
	public class JointLink {
		/**
		 * The previous joint link.
		 */
		public var prev:JointLink;
		
		/**
		 * The next joint link.
		 */
		public var next:JointLink;
		
		/**
		 * The other rigid body connected to the joint.
		 */
		public var body:RigidBody;
		
		/**
		 * The joint of the link.
		 */
		public var joint:Joint;
		
		public function JointLink(joint:Joint) {
			this.joint = joint;
		}
		
	}

}