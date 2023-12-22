package oimo.collision.narrowphase.detector;
import haxe.macro.Context;
import haxe.macro.Expr.ExprOf;
import oimo.m.M;

@:dox(hide)
@:extern
class BoxBoxDetectorMacro {
	/**
	 * Performs SAT check and minimum depth update for an axis.
	 */
	public static macro function satCheck(minDepth, minDepthId, minDepthSign, minDepthAxis, proj1, proj2, projC12, axis, id, biasMult) {
		return macro {
			var sum:Float = $proj1 + $proj2;
			var neg:Bool = $projC12 < 0;
			var abs:Float = neg ? -$projC12 : $projC12;
			if (abs < sum) {
				var depth:Float = sum - abs;
				if (depth * $biasMult < $minDepth) { // giving some bias to edge-edge separating axes
					$minDepth = depth * $biasMult;
					$minDepthId = $id;
					oimo.m.M.vec3_assign($minDepthAxis, $axis);
					$minDepthSign = neg ? -1 : 1;
				}
			} else {
				//trace("SA found: id=" + $id + " proj1=" + $proj1 + " proj2=" + $proj2 + " projC12=" + $projC12);
				return;
			}
		};
	}

	public static macro function supportingVertexRect(out, halfExtX, halfExtY, axis) {
		return macro {
			var signX:Bool = M.vec3_dot($halfExtX, $axis) > 0;
			var signY:Bool = M.vec3_dot($halfExtY, $axis) > 0;
			if (signX) {
				if (signY) {
					BoxBoxDetectorMacro.mix2($out, $halfExtX, $halfExtY, 1, 1);
				} else {
					BoxBoxDetectorMacro.mix2($out, $halfExtX, $halfExtY, 1, -1);
				}
			} else {
				if (signY) {
					BoxBoxDetectorMacro.mix2($out, $halfExtX, $halfExtY, -1, 1);
				} else {
					BoxBoxDetectorMacro.mix2($out, $halfExtX, $halfExtY, -1, -1);
				}
			}
		}
	}

	public static macro function getBoxFace(v1, v2, v3, v4, basisX, basisY, basisZ, face:ExprOf<String>) {
		switch (face.expr) {
		case EConst(CString("x+")):
			return macro {
				BoxBoxDetectorMacro.mix3($v1, $basisX, $basisY, $basisZ,  1,  1,  1);
				BoxBoxDetectorMacro.mix3($v2, $basisX, $basisY, $basisZ,  1, -1,  1);
				BoxBoxDetectorMacro.mix3($v3, $basisX, $basisY, $basisZ,  1, -1, -1);
				BoxBoxDetectorMacro.mix3($v4, $basisX, $basisY, $basisZ,  1,  1, -1);
			};
		case EConst(CString("x-")):
			return macro {
				BoxBoxDetectorMacro.mix3($v1, $basisX, $basisY, $basisZ, -1,  1,  1);
				BoxBoxDetectorMacro.mix3($v2, $basisX, $basisY, $basisZ, -1,  1, -1);
				BoxBoxDetectorMacro.mix3($v3, $basisX, $basisY, $basisZ, -1, -1, -1);
				BoxBoxDetectorMacro.mix3($v4, $basisX, $basisY, $basisZ, -1, -1,  1);
			};
		case EConst(CString("y+")):
			return macro {
				BoxBoxDetectorMacro.mix3($v1, $basisX, $basisY, $basisZ,  1,  1,  1);
				BoxBoxDetectorMacro.mix3($v2, $basisX, $basisY, $basisZ,  1,  1, -1);
				BoxBoxDetectorMacro.mix3($v3, $basisX, $basisY, $basisZ, -1,  1, -1);
				BoxBoxDetectorMacro.mix3($v4, $basisX, $basisY, $basisZ, -1,  1,  1);
			};
		case EConst(CString("y-")):
			return macro {
				BoxBoxDetectorMacro.mix3($v1, $basisX, $basisY, $basisZ,  1, -1,  1);
				BoxBoxDetectorMacro.mix3($v2, $basisX, $basisY, $basisZ, -1, -1,  1);
				BoxBoxDetectorMacro.mix3($v3, $basisX, $basisY, $basisZ, -1, -1, -1);
				BoxBoxDetectorMacro.mix3($v4, $basisX, $basisY, $basisZ,  1, -1, -1);
			};
		case EConst(CString("z+")):
			return macro {
				BoxBoxDetectorMacro.mix3($v1, $basisX, $basisY, $basisZ,  1,  1,  1);
				BoxBoxDetectorMacro.mix3($v2, $basisX, $basisY, $basisZ, -1,  1,  1);
				BoxBoxDetectorMacro.mix3($v3, $basisX, $basisY, $basisZ, -1, -1,  1);
				BoxBoxDetectorMacro.mix3($v4, $basisX, $basisY, $basisZ,  1, -1,  1);
			};
		case EConst(CString("z-")):
			return macro {
				BoxBoxDetectorMacro.mix3($v1, $basisX, $basisY, $basisZ,  1,  1, -1);
				BoxBoxDetectorMacro.mix3($v2, $basisX, $basisY, $basisZ,  1, -1, -1);
				BoxBoxDetectorMacro.mix3($v3, $basisX, $basisY, $basisZ, -1, -1, -1);
				BoxBoxDetectorMacro.mix3($v4, $basisX, $basisY, $basisZ, -1,  1, -1);
			};
		case _:
			Context.error("invalid face: " + face.expr, Context.currentPos());
			return null;
		}
	}

	public static macro function mix(dst, v, sign:ExprOf<Int>) {
		switch (sign.expr) {
		case EConst(CInt("1")):
			return macro M.vec3_assign($dst, $v);
		case EConst(CInt("-1")):
			return macro M.vec3_negate($dst, $v);
		case _:
			Context.error("invalid sign: " + sign.expr, Context.currentPos());
			return null;
		}
	}

	public static macro function mix2(dst, v1, v2, sign1:ExprOf<Int>, sign2:ExprOf<Int>) {
		switch ([sign1.expr, sign2.expr]) {
		case [EConst(CInt("1")), EConst(CInt("1"))]:
			return macro M.vec3_add($dst, $v1, $v2);
		case [EConst(CInt("1")), EConst(CInt("-1"))]:
			return macro M.vec3_sub($dst, $v1, $v2);
		case [EConst(CInt("-1")), EConst(CInt("1"))]:
			return macro M.vec3_sub($dst, $v2, $v1);
		case [EConst(CInt("-1")), EConst(CInt("-1"))]:
			return macro {
				M.vec3_add($dst, $v1, $v2);
				M.vec3_negate($dst, $dst);
			};
		case _:
			Context.error("invalid sign: (" + sign1.expr + " " + sign2.expr + ")", Context.currentPos());
			return null;
		}
	}

	public static macro function mix3(dst, v1, v2, v3, sign1:ExprOf<Int>, sign2:ExprOf<Int>, sign3:ExprOf<Int>) {
		switch (sign3.expr) {
		case EConst(CInt("1")):
			return macro {
				BoxBoxDetectorMacro.mix2($dst, $v1, $v2, $sign1, $sign2);
				M.vec3_add($dst, $dst, $v3);
			};
		case EConst(CInt("-1")):
			return macro {
				BoxBoxDetectorMacro.mix2($dst, $v1, $v2, $sign1, $sign2);
				M.vec3_sub($dst, $dst, $v3);
			};
		case _:
			Context.error("invalid sign: (" + sign1.expr + " " + sign2.expr + " " + sign3.expr + ")", Context.currentPos());
			return null;
		}
	}

	public static macro function swapV(tmp, v1, v2) {
		return macro {
			M.vec3_assign($tmp, $v1);
			M.vec3_assign($v1, $v2);
			M.vec3_assign($v2, $tmp);
		};
	}

	public static macro function swap(f1, f2) {
		return macro {
			var tmp = $f1;
			$f1 = $f2;
			$f2 = tmp;
		};
	}
}
