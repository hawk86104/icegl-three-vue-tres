package oimo.dynamics.constraint.joint;
import oimo.dynamics.rigidbody.RigidBody;
import oimo.dynamics.rigidbody.*;

/**
 * A joint link is used to build a constraint graph for clustering rigid bodies.
 * In a constraint graph, rigid bodies are nodes and constraints are edges.
 * See also `ContactLink`.
 */
@:build(oimo.m.B.bu())
class JointLink {
	public var _prev:JointLink;
	public var _next:JointLink;
	public var _joint:Joint;
	public var _other:RigidBody;

	@:dox(hide)
	public function new(joint:Joint) {
		_joint = joint;
	}

	/**
	 * Returns the contact the rigid body is attached to.
	 */
	public function getContact():Joint {
		return _joint;
	}

	/**
	 * Returns the other rigid body attached to the constraint. This provides a quick access
	 * from a rigid body to the other one attached to the constraint.
	 */
	public function getOther():RigidBody {
		return _other;
	}

	/**
	 * Returns the previous joint link in the rigid body.
	 *
	 * If the previous one does not exist, `null` will be returned.
	 */
	public function getPrev():JointLink {
		return _prev;
	}

	/**
	 * Returns the next joint link in the rigid body.
	 *
	 * If the previous one does not exist, `null` will be returned.
	 */
	public function getNext():JointLink {
		return _next;
	}

}
