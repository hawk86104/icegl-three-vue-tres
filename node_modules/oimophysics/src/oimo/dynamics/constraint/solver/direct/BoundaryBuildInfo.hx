package oimo.dynamics.constraint.solver.direct;
import haxe.ds.Vector;

/**
 * Internal class
 */
@:dox(hide)
class BoundaryBuildInfo {
	public var size:Int; // dimension

	public var numBounded:Int;
	public var iBounded:Vector<Int>;   // indices
	public var signs:Vector<Int>;      // signs

	public var numUnbounded:Int;
	public var iUnbounded:Vector<Int>; // indices

	// numBounded + numUnbounded <= n

	public function new(size:Int) {
		this.size = size;
		numBounded = 0;
		iBounded = new Vector<Int>(size);
		signs = new Vector<Int>(size);
		numUnbounded = 0;
		iUnbounded = new Vector<Int>(size);
	}

	extern public inline function clear():Void {
		numBounded = 0;
		numUnbounded = 0;
	}

	extern public inline function pushBounded(idx:Int, sign:Int):Void {
		iBounded[numBounded] = idx;
		signs[numBounded] = sign;
		numBounded++;
	}

	extern public inline function pushUnbounded(idx:Int):Void {
		iUnbounded[numUnbounded] = idx;
		numUnbounded++;
	}

	extern public inline function popBounded():Void {
		numBounded--;
	}

	extern public inline function popUnbounded():Void {
		numUnbounded--;
	}

}
