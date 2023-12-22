package oimo.dynamics.constraint.contact;
import oimo.m.IVec3;
import oimo.m.M;
import oimo.dynamics.constraint.contact.ContactImpulse;

/**
 * Internal class.
 */
@:dox(hide)
@:build(oimo.m.B.bu())
class ContactImpulse {
	// normal impulse
	public var impulseN:Float;

	// tangent impulse
	public var impulseT:Float;

	// binomal impulse
	public var impulseB:Float;

	// position impulse
	public var impulseP:Float;

	// lateral impulse
	public var impulseL:IVec3;

	public function new() {
		clear();
	}

	extern public inline function clear():Void {
		impulseN = 0;
		impulseT = 0;
		impulseB = 0;
		impulseP = 0;
		M.vec3_zero(impulseL);
	}

	public function copyFrom(imp:ContactImpulse):Void {
		impulseN = imp.impulseN;
		impulseT = imp.impulseT;
		impulseB = imp.impulseB;
		M.vec3_assign(impulseL, imp.impulseL);
	}

}
