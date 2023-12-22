package oimo.dynamics.constraint.joint;

/**
 * Internal class.
 */
@:dox(hide)
class JointImpulse {
	// constraint impulse
	public var impulse:Float;
	// motor impulse
	public var impulseM:Float;
	// position impulse
	public var impulseP:Float;

	public function new() {
		clear();
	}

	extern public inline function clear():Void {
		impulse = 0;
		impulseM = 0;
		impulseP = 0;
	}
}
