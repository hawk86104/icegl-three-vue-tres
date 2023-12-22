package oimo.dynamics.constraint.solver.direct;
import haxe.ds.Vector;

/**
 * Internal Class
 */
@:dox(hide)
class BoundarySelector {
	var n:Int;
	var indices:Vector<Int>;
	var tmpIndices:Vector<Int>;

	public function new(n:Int) {
		this.n = n;
		indices = new Vector<Int>(n);
		tmpIndices = new Vector<Int>(n);
		for (i in 0...n) {
			indices[i] = i;
		}
	}

	public inline function getIndex(i:Int):Int {
		return indices[i];
	}

	public inline function select(index:Int):Void {
		var i:Int = 0;
		while (indices[i] != index) {
			i++;
		}
		while (i > 0) {
			var tmp:Int = indices[i];
			indices[i] = indices[i - 1];
			indices[i - 1] = tmp;
			i--;
		}
		// validate();
	}

	/**
	 * Makes first n elements the permutation of {0, 1, ... , n-1}
	 */
	public inline function setSize(size:Int):Void {
		var numSmaller:Int = 0;
		var numGreater:Int = 0;
		for (i in 0...n) {
			var idx:Int = indices[i];
			if (idx < size) {
				tmpIndices[numSmaller] = idx;
				numSmaller++;
			} else {
				tmpIndices[size + numGreater] = idx;
				numGreater++;
			}
		}
		var tmp:Vector<Int> = indices;
		indices = tmpIndices;
		tmpIndices = tmp;
		// validate();
	}

	/*
	public function validate():Void {
		var po = new Vector<Bool>(n);
		for (i in 0...n) {
			if (po[indices[i]]) {
				throw M.error("???"));
			} else {
				po[indices[i]] = true;
			}
		}
		for (i in 0...9) {
			if (!po[i]) {
				throw M.error("???"));
			}
		}
	}
	*/

}
