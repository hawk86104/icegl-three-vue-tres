package oimo.m;
import haxe.ds.Vector;
import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;
using oimo.m.M;
using oimo.m.U;
using haxe.macro.ExprTools;
using haxe.macro.TypeTools;

/**
 * Expression Macro
 */
class M {
	// ---------------------------------------------------------------------
	// Util
	// ---------------------------------------------------------------------

	public static macro function profile(main:Expr) {
		return macro {
			#if js
				var st:Float = js.Browser.window.performance.now() / 1000;
			#else
				var st:Float = haxe.Timer.stamp();
			#end
			$main;
			#if js
				var en:Float = js.Browser.window.performance.now() / 1000;
			#else
				var en:Float = haxe.Timer.stamp();
			#end
			(en - st) * 1000; // in ms
		};
	}

	extern public static inline function error(msg:String) {
		return
			#if js
				new js.lib.Error(msg)
			#elseif flash
				new flash.errors.Error(msg)
			#elseif java
				new java.lang.Exception(msg)
			#else
				msg
			#end
		;
	}

	public static macro function compare3min(a:ExprOf<Float>, b:ExprOf<Float>, c:ExprOf<Float>, doA:Expr, doB:Expr, doC:Expr) {
		return macro {
			if ($a < $b) {
				if ($a < $c) {
					// a < b, c
					$doA;
				} else {
					// c < a < b
					$doC;
				}
			} else {
				if ($b < $c) {
					// b < a, c
					$doB;
				} else {
					// c < b < a
					$doC;
				}
			}
		};
	}

	public static macro function compare3max(a:ExprOf<Float>, b:ExprOf<Float>, c:ExprOf<Float>, doA:Expr, doB:Expr, doC:Expr) {
		return macro {
			if ($a > $b) {
				if ($a > $c) {
					// a > b, c
					$doA;
				} else {
					// c > a > b
					$doC;
				}
			} else {
				if ($b > $c) {
					// b > a, c
					$doB;
				} else {
					// c > b > a
					$doC;
				}
			}
		};
	}

	public static macro function trace(expr:Expr) {
		var names = U.namesE(expr);
		var es = [];
		for (name in names) {
			if (es.length == 0) {
				es.push(macro s += $v{name} + " = " + M.toFixed8(${name.f()}));
			} else {
				es.push(macro s += ", " + $v{name} + " = " + M.toFixed8(${name.f()}));
			}
		}
		return macro {
			var s:String = "";
			$b{es};
			trace(s);
		};
	}

	// ---------------------------------------------------------------------
	// Float
	// ---------------------------------------------------------------------

	public static macro function toFixed4(x:ExprOf<Float>) {
		return macro $x > 0 ? Std.int($x * 1000 + 0.5) / 1000 : Std.int($x * 1000 - 0.5) / 1000;
	}

	public static macro function toFixed8(x:ExprOf<Float>) {
		return macro $x > 0 ? Std.int($x * 10000000 + 0.5) / 10000000 : Std.int($x * 10000000 - 0.5) / 10000000;
	}

	// ---------------------------------------------------------------------
	// List
	// ---------------------------------------------------------------------

	public static macro function array_expand<T>(oldArray:ExprOf<Vector<T>>, oldLength:ExprOf<Int>) {
		var tp:TypePath = oldArray.t().toComplexType().getParameters()[0];
		return macro {
			var newLength:Int = $oldLength << 1;
			var newArray = new $tp(newLength);
			for (i in 0...$oldLength) {
				newArray[i] = $oldArray[i];
				$oldArray[i] = null;
			}
			$oldArray = newArray;
		}
	}

	public static macro function array_free<T>(array:ExprOf<Vector<T>>, num:ExprOf<Int>) {
		return macro {
			while ($num > 0) {
				$array[--$num] = null;
			}
		}
	}

	public static macro function list_foreach(base:Expr, next:Expr, loop:Expr) {
		var n:String = next.s();
		return macro {
			while ($base != null) {
				var n = $base.$n;
				$loop;
				$base = n;
			}
		}
	}

	public static macro function list_push(first:Expr, last:Expr, prev:Expr, next:Expr, e:Expr) {
		var p:String = prev.s();
		var n:String = next.s();
		return macro {
			if ($first == null) {
				$first = $e;
				$last = $e;
			} else {
				$last.$n = $e;
				$e.$p = $last;
				$last = $e;
			}
		}
	}

	public static macro function list_addFirst(first:Expr, last:Expr, prev:Expr, next:Expr, e:Expr) {
		var p:String = prev.s();
		var n:String = next.s();
		return macro {
			if ($first == null) {
				$first = $e;
				$last = $e;
			} else {
				$first.$p = $e;
				$e.$n = $first;
				$first = $e;
			}
		}
	}

	public static macro function list_remove(first:Expr, last:Expr, prev:Expr, next:Expr, e:Expr) {
		var p:String = prev.s();
		var n:String = next.s();
		return macro {
			var prev = $e.$p;
			var next = $e.$n;
			if (prev != null) {
				prev.$n = next;
			}
			if (next != null) {
				next.$p = prev;
			}
			if ($e == $first) {
				$first = $first.$n;
			}
			if ($e == $last) {
				$last = $last.$p;
			}
			$e.$n = null;
			$e.$p = null;
		}
	}

	public static macro function singleList_addFirst(first:Expr, next:Expr, e:Expr) {
		var n:String = next.s();
		return macro {
			if ($first == null) {
				$first = $e;
			} else {
				$e.$n = $first;
				$first = $e;
			}
		}
	}

	public static macro function singleList_pick(first:Expr, next:Expr, newInstance:Expr) {
		var n:String = next.s();
		return macro {
			var first = $first;
			if (first != null) {
				$first = first.$n;
				first.$n = null;
			} else {
				first = $newInstance;
			}
			first;
		}
	}

	public static macro function singleList_pool(first:Expr, next:Expr, e:Expr) {
		var n:String = next.s();
		return macro {
			$e.$n = $first;
			$first = $e;
		}
	}

	// ---------------------------------------------------------------------
	// Assertion
	// ---------------------------------------------------------------------

	public static macro function assert(expectedToBeTrue:ExprOf<Bool>) {
		#if OIMO_ASSERT
		return macro if (!$expectedToBeTrue) throw M.error("assertion error: " + $v{expectedToBeTrue.s()} + " is false");
		#else
		return macro {};
		#end
	}

	// ---------------------------------------------------------------------
	// Vec3
	// ---------------------------------------------------------------------

	public static macro function vec3_fromVec3(dst:Expr, src:ExprOf<oimo.common.Vec3>) {
		return macro {
			var v:oimo.common.Vec3 = cast $src;
			${assignVars(dst.s().vec3Names(), [
				macro v.x,
				macro v.y,
				macro v.z
			])};
		}
	}

	public static macro function vec3_toVec3(dst:ExprOf<oimo.common.Vec3>, src:Expr) {
		return macro {
			var v:oimo.common.Vec3 = cast $dst;
			${assignVars([
				macro v.x,
				macro v.y,
				macro v.z
			], src.s().vec3Names())};
		}
	}

	public static macro function vec3_fromQuat(dst:Expr, src:Expr) {
		return assignVars(dst.s().vec3Names(), src.s().quatVecNames());
	}

	public static macro function vec3_mulMat3(dst:Expr, src1:Expr, src2:Expr) {
		var tmps = "__tmp__".vec3Names();
		var v = src1.s().vec3Names();
		var m = src2.s().mat3Names();
		return macro {
			var __tmp__X:Float, __tmp__Y:Float, __tmp__Z:Float;
			${assignVars(tmps, [
				macro ${m[0].f()} * ${v[0].f()} + ${m[1].f()} * ${v[1].f()} + ${m[2].f()} * ${v[2].f()},
				macro ${m[3].f()} * ${v[0].f()} + ${m[4].f()} * ${v[1].f()} + ${m[5].f()} * ${v[2].f()},
				macro ${m[6].f()} * ${v[0].f()} + ${m[7].f()} * ${v[1].f()} + ${m[8].f()} * ${v[2].f()}
			])};
			${assignVars(dst.s().vec3Names(), tmps)};
		};
	}

	public static macro function vec3_mulMat3Transposed(dst:Expr, src1:Expr, src2:Expr) {
		var tmps = "__tmp__".vec3Names();
		var v = src1.s().vec3Names();
		var m = src2.s().mat3Names();
		return macro {
			var __tmp__X:Float, __tmp__Y:Float, __tmp__Z:Float;
			${assignVars(tmps, [
				macro ${m[0].f()} * ${v[0].f()} + ${m[3].f()} * ${v[1].f()} + ${m[6].f()} * ${v[2].f()},
				macro ${m[1].f()} * ${v[0].f()} + ${m[4].f()} * ${v[1].f()} + ${m[7].f()} * ${v[2].f()},
				macro ${m[2].f()} * ${v[0].f()} + ${m[5].f()} * ${v[1].f()} + ${m[8].f()} * ${v[2].f()}
			])};
			${assignVars(dst.s().vec3Names(), tmps)};
		};
	}

	public static macro function vec3_zero(dst:Expr) {
		return assignVars(dst.s().vec3Names(), [macro 0, macro 0, macro 0]);
	}

	public static macro function vec3_set(dst:Expr, x:ExprOf<Float>, y:ExprOf<Float>, z:ExprOf<Float>) {
		return assignVars(dst.s().vec3Names(), [x, y, z]);
	}

	public static macro function vec3_assign(dst:Expr, src:Expr) {
		return assignVars(dst.s().vec3Names(), src.s().vec3Names());
	}

	public static macro function vec3_add(dst:Expr, src1:Expr, src2:Expr) {
		return binOpVars(dst.s().vec3Names(), src1.s().vec3Names(), src2.s().vec3Names(), OpAdd);
	}

	public static macro function vec3_addRhsScaled(dst:Expr, src1:Expr, src2:Expr, src3:ExprOf<Float>) {
		return binOp2RLVars(dst.s().vec3Names(), src1.s().vec3Names(), src2.s().vec3Names(), [src3, src3, src3], OpAdd, OpMult);
	}

	public static macro function vec3_sub(dst:Expr, src1:Expr, src2:Expr) {
		return binOpVars(dst.s().vec3Names(), src1.s().vec3Names(), src2.s().vec3Names(), OpSub);
	}

	public static macro function vec3_scale(dst:Expr, src1:Expr, src2:ExprOf<Float>) {
		return binOpVars(dst.s().vec3Names(), src1.s().vec3Names(), [src2, src2, src2], OpMult);
	}

	public static macro function vec3_negate(dst:Expr, src:Expr) {
		return unOpVars(dst.s().vec3Names(), src.s().vec3Names(), OpNeg);
	}

	public static macro function vec3_abs(dst:Expr, src:Expr) {
		return assignVars(dst.s().vec3Names(), src.s().vec3Names().map(f).map(function(e1) {
			return macro $e1 < 0 ? -$e1 : $e1;
		}));
	}

	public static macro function vec3_clamp(dst:Expr, src:Expr, min:Expr, max:Expr) {
		return macro {
			M.vec3_min($dst, $src, $max);
			M.vec3_max($dst, $dst, $min);
		};
	}

	public static macro function vec3_min(dst:Expr, src1:Expr, src2:Expr) {
		var as = src1.s().vec3Names().map(f);
		var bs = src2.s().vec3Names().map(f);
		return assignVars(dst.s().vec3Names(), zip(as, bs, function(e1, e2) {
			return macro $e1 < $e2 ? $e1 : $e2;
		}));
	}

	public static macro function vec3_max(dst:Expr, src1:Expr, src2:Expr) {
		var as = src1.s().vec3Names().map(f);
		var bs = src2.s().vec3Names().map(f);
		return assignVars(dst.s().vec3Names(), zip(as, bs, function(e1, e2) {
			return macro $e1 > $e2 ? $e1 : $e2;
		}));
	}

	public static macro function vec3_dot(src1:Expr, src2:Expr) {
		var as = src1.s().vec3Names();
		var bs = src2.s().vec3Names();
		return macro ${as[0].f()} * ${bs[0].f()} + ${as[1].f()} * ${bs[1].f()} + ${as[2].f()} * ${bs[2].f()};
	}

	public static macro function vec3_isZero(src:Expr) {
		var as = src.s().vec3Names();
		return macro ${as[0].f()} == 0 && ${as[1].f()} == 0 && ${as[2].f()} == 0;
	}

	public static macro function vec3_compWiseMul(dst:Expr, src1:Expr, src2:Expr) {
		return binOpVars(dst.s().vec3Names(), src1.s().vec3Names(), src2.s().vec3Names(), OpMult);
	}

	public static macro function vec3_addHorizontal(src:Expr) {
		var as = src.s().vec3Names();
		return macro ${as[0].f()} + ${as[1].f()} + ${as[2].f()};
	}

	public static macro function vec3_mulHorizontal(src:Expr) {
		var as = src.s().vec3Names();
		return macro ${as[0].f()} * ${as[1].f()} * ${as[2].f()};
	}

	public static macro function vec3_get(src:Expr, index:ExprOf<Int>) {
		var as = src.s().vec3Names();
		var i = 0;
		switch (index.expr) {
		case EConst(CInt(v)):
			i = Std.parseInt(v);
		case _:
			Context.error("invalid index: " + index.expr, U.pos());
		}
		return macro ${as[i].f()};
	}

	public static macro function vec3_length(src:Expr) {
		return macro oimo.common.MathUtil.sqrt(M.vec3_dot($src, $src));
	}

	public static macro function vec3_normalize(dst:Expr, src:Expr) {
		var as = src.s().vec3Names();
		return macro {
			var l:Float = M.vec3_dot($src, $src);
			if (l > 0) l = 1 / oimo.common.MathUtil.sqrt(l);
			M.vec3_scale($dst, $src, l);
		}
	}

	public static macro function vec3_cross(dst:Expr, src1:Expr, src2:Expr) {
		var as = src1.s().vec3Names();
		var bs = src2.s().vec3Names();
		return assignVars(dst.s().vec3Names(), [
			macro ${as[1].f()} * ${bs[2].f()} - ${as[2].f()} * ${bs[1].f()},
			macro ${as[2].f()} * ${bs[0].f()} - ${as[0].f()} * ${bs[2].f()},
			macro ${as[0].f()} * ${bs[1].f()} - ${as[1].f()} * ${bs[0].f()}
		]);
	}

	public static macro function vec3_toCrossMatrix(dst:Expr, src:Expr) {
		var as = src.s().vec3Names();
		return assignVars(dst.s().mat3Names(), [
			macro 0, macro -${as[2].f()}, macro ${as[1].f()},
			macro ${as[2].f()}, macro 0, macro -${as[0].f()},
			macro -${as[1].f()}, macro ${as[0].f()}, macro 0
		]);
	}

	/**
	 * computes a normalized vector perpendicular to the src
	 */
	public static macro function vec3_perp(dst:Expr, src:Expr) {
		var as = src.s().vec3Names();
		return macro {
			var x1:Float = ${as[0].f()};
			var y1:Float = ${as[1].f()};
			var z1:Float = ${as[2].f()};
			var x2:Float = x1 * x1;
			var y2:Float = y1 * y1;
			var z2:Float = z1 * z1;
			var d:Float;
			M.compare3min(x2, y2, z2, {
				// |x1| is the smallest, use x-axis as the RHS of the cross product
				d = 1 / oimo.common.MathUtil.sqrt(y2 + z2);
				M.vec3_set($dst, 0, z1 * d, -y1 * d);
			}, {
				// |y1| is the smallest, use y-axis as the RHS of the cross product
				d = 1 / oimo.common.MathUtil.sqrt(z2 + x2);
				M.vec3_set($dst, -z1 * d, 0, x1 * d);
			}, {
				// |z1| is the smallest, use z-axis as the RHS of the cross product
				d = 1 / oimo.common.MathUtil.sqrt(x2 + y2);
				M.vec3_set($dst, y1 * d, -x1 * d, 0);
			});
		};
	}

	// ---------------------------------------------------------------------
	// Mat3
	// ---------------------------------------------------------------------

	public static macro function mat3_fromMat3(dst:Expr, src:ExprOf<oimo.common.Mat3>) {
		return macro {
			var m:oimo.common.Mat3 = cast $src;
			${assignVars(dst.s().mat3Names(), [
				macro m.e00,
				macro m.e01,
				macro m.e02,
				macro m.e10,
				macro m.e11,
				macro m.e12,
				macro m.e20,
				macro m.e21,
				macro m.e22
			])};
		}
	}

	public static macro function mat3_fromRows(dst:Expr, src1:Expr, src2:Expr, src3:Expr) {
		var as:Array<String> = src1.s().vec3Names();
		var bs:Array<String> = src2.s().vec3Names();
		var cs:Array<String> = src3.s().vec3Names();
		return assignVars(dst.s().mat3Names(), [
			as[0], as[1], as[2],
			bs[0], bs[1], bs[2],
			cs[0], cs[1], cs[2]
		]);
	}

	public static macro function mat3_fromCols(dst:Expr, src1:Expr, src2:Expr, src3:Expr) {
		var as:Array<String> = src1.s().vec3Names();
		var bs:Array<String> = src2.s().vec3Names();
		var cs:Array<String> = src3.s().vec3Names();
		return assignVars(dst.s().mat3Names(), [
			as[0], bs[0], cs[0],
			as[1], bs[1], cs[1],
			as[2], bs[2], cs[2]
		]);
	}

	public static macro function mat3_getCol(dst:Expr, src:Expr, index:ExprOf<Int>) {
		var as:Array<String> = src.s().mat3Names();
		var i = 0;
		switch (index.expr) {
		case EConst(CInt(v)):
			i = Std.parseInt(v);
		case _:
			Context.error("invalid index: " + index.expr, U.pos());
		}
		return assignVars(dst.s().vec3Names(), [as[i], as[3 + i], as[6 + i]]);
	}

	public static macro function mat3_getRow(dst:Expr, src:Expr, index:ExprOf<Int>) {
		var as:Array<String> = src.s().mat3Names();
		var i = 0;
		switch (index.expr) {
		case EConst(CInt(v)):
			i = Std.parseInt(v);
		case _:
			Context.error("invalid index: " + index.expr, U.pos());
		}
		return assignVars(dst.s().vec3Names(), [as[i * 3], as[1 + i * 3], as[2 + i * 3]]);
	}

	public static macro function mat3_get(src:Expr, row:ExprOf<Int>, col:ExprOf<Int>) {
		var as = src.s().mat3Names();
		var i = 0;
		var j = 0;
		switch ([row.expr, col.expr]) {
		case [EConst(CInt(v1)), EConst(CInt(v2))]:
			i = Std.parseInt(v1);
			j = Std.parseInt(v2);
		case _:
			Context.error("invalid index: " + row.expr + ", " + col.expr, U.pos());
		}
		return macro ${as[i * 3 + j].f()};
	}

	public static macro function mat3_set(dst:Expr,
		e00:ExprOf<Float>, e01:ExprOf<Float>, e02:ExprOf<Float>,
		e10:ExprOf<Float>, e11:ExprOf<Float>, e12:ExprOf<Float>,
		e20:ExprOf<Float>, e21:ExprOf<Float>, e22:ExprOf<Float>
	) {
		return assignVars(dst.s().mat3Names(), [e00, e01, e02, e10, e11, e12, e20, e21, e22]);
	}

	public static macro function mat3_toMat3(dst:ExprOf<oimo.common.Mat3>, src:Expr) {
		return macro {
			var m:oimo.common.Mat3 = cast $dst;
			${assignVars([
				macro m.e00,
				macro m.e01,
				macro m.e02,
				macro m.e10,
				macro m.e11,
				macro m.e12,
				macro m.e20,
				macro m.e21,
				macro m.e22
			], src.s().mat3Names())};
		}
	}

	public static macro function mat3_fromQuat(dst:Expr, src:Expr) {
		var as = src.s().quatNames();
		return macro {
			var x:Float = ${as[0].f()};
			var y:Float = ${as[1].f()};
			var z:Float = ${as[2].f()};
			var w:Float = ${as[3].f()};
			var x2:Float = 2 * x;
			var y2:Float = 2 * y;
			var z2:Float = 2 * z;
			var xx:Float = x * x2;
			var yy:Float = y * y2;
			var zz:Float = z * z2;
			var xy:Float = x * y2;
			var yz:Float = y * z2;
			var xz:Float = x * z2;
			var wx:Float = w * x2;
			var wy:Float = w * y2;
			var wz:Float = w * z2;
			${assignVars(dst.s().mat3Names(), [
				macro 1 - yy - zz,
				macro xy - wz,
				macro xz + wy,
				macro xy + wz,
				macro 1 - xx - zz,
				macro yz - wx,
				macro xz - wy,
				macro yz + wx,
				macro 1 - xx - yy
			])};
		}
	}

	public static macro function mat3_fromEulerXyz(dst:Expr, src:Expr) {
		var as = src.s().vec3Names();
		return macro {
			var sx:Float = oimo.common.MathUtil.sin(${as[0].f()});
			var sy:Float = oimo.common.MathUtil.sin(${as[1].f()});
			var sz:Float = oimo.common.MathUtil.sin(${as[2].f()});
			var cx:Float = oimo.common.MathUtil.cos(${as[0].f()});
			var cy:Float = oimo.common.MathUtil.cos(${as[1].f()});
			var cz:Float = oimo.common.MathUtil.cos(${as[2].f()});
			${assignVars(dst.s().mat3Names(), [
				macro cy * cz,
				macro -cy * sz,
				macro sy,
				macro cx * sz + cz * sx * sy,
				macro cx * cz - sx * sy * sz,
				macro -cy * sx,
				macro sx * sz - cx * cz * sy,
				macro cz * sx + cx * sy * sz,
				macro cx * cy
			])};
		}
	}

	public static macro function mat3_id(dst:Expr) {
		return assignVars(dst.s().mat3Names(), [
			macro 1, macro 0, macro 0,
			macro 0, macro 1, macro 0,
			macro 0, macro 0, macro 1
		]);
	}

	public static macro function mat3_zero(dst:Expr) {
		return assignVars(dst.s().mat3Names(), [
			macro 0, macro 0, macro 0,
			macro 0, macro 0, macro 0,
			macro 0, macro 0, macro 0
		]);
	}

	public static macro function mat3_diagonal(dst:Expr, x:ExprOf<Float>, y:ExprOf<Float>, z:ExprOf<Float>) {
		return assignVars(dst.s().mat3Names(), [
			x, macro 0, macro 0,
			macro 0, y, macro 0,
			macro 0, macro 0, z
		]);
	}

	public static macro function mat3_assign(dst:Expr, src:Expr) {
		return assignVars(dst.s().mat3Names(), src.s().mat3Names());
	}

	public static macro function mat3_transpose(dst:Expr, src:Expr) {
		var as = src.s().mat3Names();
		return assignVars(dst.s().mat3Names(), [
			as[0], as[3], as[6],
			as[1], as[4], as[7],
			as[2], as[5], as[8]
		]);
	}

	public static macro function mat3_add(dst:Expr, src1:Expr, src2:Expr) {
		return binOpVars(dst.s().mat3Names(), src1.s().mat3Names(), src2.s().mat3Names(), OpAdd);
	}

	public static macro function mat3_addDiag(dst:Expr, src:Expr, x:ExprOf<Float>, y:ExprOf<Float>, z:ExprOf<Float>) {
		return binOpVars(dst.s().mat3NamesDiag(), src.s().mat3NamesDiag(), [x, y, z], OpAdd);
	}

	public static macro function mat3_addDiagVec3(dst:Expr, src:Expr, src2:Expr) {
		return binOpVars(dst.s().mat3NamesDiag(), src.s().mat3NamesDiag(), src2.s().vec3Names(), OpAdd);
	}

	public static macro function mat3_addRhsScaled(dst:Expr, src1:Expr, src2:Expr, src3:ExprOf<Float>) {
		return binOp2RLVars(dst.s().mat3Names(), src1.s().mat3Names(), src2.s().mat3Names(), [
			src3, src3, src3,
			src3, src3, src3,
			src3, src3, src3
		], OpAdd, OpMult);
	}

	public static macro function mat3_addAll(dst:Expr, src1:Expr, src2:Expr,
		e00:ExprOf<Float>, e01:ExprOf<Float>, e02:ExprOf<Float>,
		e10:ExprOf<Float>, e11:ExprOf<Float>, e12:ExprOf<Float>,
		e20:ExprOf<Float>, e21:ExprOf<Float>, e22:ExprOf<Float>
	) {
		return binOpVars(dst.s().mat3Names(), src1.s().mat3Names(), [
			e00, e01, e02,
			e10, e11, e12,
			e20, e21, e22
		], OpAdd);
	}

	public static macro function mat3_sub(dst:Expr, src1:Expr, src2:Expr) {
		return binOpVars(dst.s().mat3Names(), src1.s().mat3Names(), src2.s().mat3Names(), OpSub);
	}

	public static macro function mat3_scale(dst:Expr, src1:Expr, src2:ExprOf<Float>) {
		return binOpVars(dst.s().mat3Names(), src1.s().mat3Names(), [
			src2, src2, src2,
			src2, src2, src2,
			src2, src2, src2
		], OpMult);
	}

	public static macro function mat3_negate(dst:Expr, src:Expr) {
		return unOpVars(dst.s().mat3Names(), src.s().mat3Names(), OpNeg);
	}

	public static macro function mat3_scaleDiag(dst:Expr, src:Expr, x:ExprOf<Float>, y:ExprOf<Float>, z:ExprOf<Float>) {
		return binOpVars(dst.s().mat3NamesDiag(), src.s().mat3NamesDiag(), [x, y, z], OpMult);
	}

	public static macro function mat3_getDiag(dst:Expr, src:Expr) {
		return assignVars(dst.s().vec3Names(), src.s().mat3NamesDiag());
	}

	public static macro function mat3_scaleRows(dst:Expr, src:Expr, x:ExprOf<Float>, y:ExprOf<Float>, z:ExprOf<Float>) {
		return binOpVars(dst.s().mat3Names(), src.s().mat3Names(), [
			x, x, x,
			y, y, y,
			z, z, z
		], OpMult);
	}

	public static macro function mat3_scaleRowsVec3(dst:Expr, src1:Expr, src2:Expr) {
		var v:Array<String> = src2.s().vec3Names();
		return binOpVars(dst.s().mat3Names(), src1.s().mat3Names(), [
			v[0], v[0], v[0],
			v[1], v[1], v[1],
			v[2], v[2], v[2]
		], OpMult);
	}

	public static macro function mat3_scaleCols(dst:Expr, src:Expr, x:ExprOf<Float>, y:ExprOf<Float>, z:ExprOf<Float>) {
		return binOpVars(dst.s().mat3Names(), src.s().mat3Names(), [
			x, y, z,
			x, y, z,
			x, y, z
		], OpMult);
	}

	public static macro function mat3_scaleColsVec3(dst:Expr, src1:Expr, src2:Expr) {
		var v:Array<String> = src2.s().vec3Names();
		return binOpVars(dst.s().mat3Names(), src1.s().mat3Names(), [
			v[0], v[1], v[2],
			v[0], v[1], v[2],
			v[0], v[1], v[2]
		], OpMult);
	}

	public static macro function mat3_mul(dst:Expr, src1:Expr, src2:Expr) {
		var tmps = "__tmp__".mat3Names();
		var as = src1.s().mat3Names();
		var bs = src2.s().mat3Names();
		return macro {
			var __tmp__00:Float, __tmp__01:Float, __tmp__02:Float;
			var __tmp__10:Float, __tmp__11:Float, __tmp__12:Float;
			var __tmp__20:Float, __tmp__21:Float, __tmp__22:Float;
			${assignVars(tmps, [
				macro ${as[0].f()} * ${bs[0].f()} + ${as[1].f()} * ${bs[3].f()} + ${as[2].f()} * ${bs[6].f()},
				macro ${as[0].f()} * ${bs[1].f()} + ${as[1].f()} * ${bs[4].f()} + ${as[2].f()} * ${bs[7].f()},
				macro ${as[0].f()} * ${bs[2].f()} + ${as[1].f()} * ${bs[5].f()} + ${as[2].f()} * ${bs[8].f()},
				macro ${as[3].f()} * ${bs[0].f()} + ${as[4].f()} * ${bs[3].f()} + ${as[5].f()} * ${bs[6].f()},
				macro ${as[3].f()} * ${bs[1].f()} + ${as[4].f()} * ${bs[4].f()} + ${as[5].f()} * ${bs[7].f()},
				macro ${as[3].f()} * ${bs[2].f()} + ${as[4].f()} * ${bs[5].f()} + ${as[5].f()} * ${bs[8].f()},
				macro ${as[6].f()} * ${bs[0].f()} + ${as[7].f()} * ${bs[3].f()} + ${as[8].f()} * ${bs[6].f()},
				macro ${as[6].f()} * ${bs[1].f()} + ${as[7].f()} * ${bs[4].f()} + ${as[8].f()} * ${bs[7].f()},
				macro ${as[6].f()} * ${bs[2].f()} + ${as[7].f()} * ${bs[5].f()} + ${as[8].f()} * ${bs[8].f()}
			])};
			${assignVars(dst.s().mat3Names(), tmps)};
		};
	}

	public static macro function mat3_mulLhsTransposed(dst:Expr, src1:Expr, src2:Expr) {
		var tmps = "__tmp__".mat3Names();
		var as = src1.s().mat3Names();
		var bs = src2.s().mat3Names();
		return macro {
			var __tmp__00:Float, __tmp__01:Float, __tmp__02:Float;
			var __tmp__10:Float, __tmp__11:Float, __tmp__12:Float;
			var __tmp__20:Float, __tmp__21:Float, __tmp__22:Float;
			${assignVars(tmps, [
				macro ${as[0].f()} * ${bs[0].f()} + ${as[3].f()} * ${bs[3].f()} + ${as[6].f()} * ${bs[6].f()},
				macro ${as[0].f()} * ${bs[1].f()} + ${as[3].f()} * ${bs[4].f()} + ${as[6].f()} * ${bs[7].f()},
				macro ${as[0].f()} * ${bs[2].f()} + ${as[3].f()} * ${bs[5].f()} + ${as[6].f()} * ${bs[8].f()},
				macro ${as[1].f()} * ${bs[0].f()} + ${as[4].f()} * ${bs[3].f()} + ${as[7].f()} * ${bs[6].f()},
				macro ${as[1].f()} * ${bs[1].f()} + ${as[4].f()} * ${bs[4].f()} + ${as[7].f()} * ${bs[7].f()},
				macro ${as[1].f()} * ${bs[2].f()} + ${as[4].f()} * ${bs[5].f()} + ${as[7].f()} * ${bs[8].f()},
				macro ${as[2].f()} * ${bs[0].f()} + ${as[5].f()} * ${bs[3].f()} + ${as[8].f()} * ${bs[6].f()},
				macro ${as[2].f()} * ${bs[1].f()} + ${as[5].f()} * ${bs[4].f()} + ${as[8].f()} * ${bs[7].f()},
				macro ${as[2].f()} * ${bs[2].f()} + ${as[5].f()} * ${bs[5].f()} + ${as[8].f()} * ${bs[8].f()}
			])};
			${assignVars(dst.s().mat3Names(), tmps)};
		};
	}

	public static macro function mat3_mulRhsTransposed(dst:Expr, src1:Expr, src2:Expr) {
		var tmps = "__tmp__".mat3Names();
		var as = src1.s().mat3Names();
		var bs = src2.s().mat3Names();
		return macro {
			var __tmp__00:Float, __tmp__01:Float, __tmp__02:Float;
			var __tmp__10:Float, __tmp__11:Float, __tmp__12:Float;
			var __tmp__20:Float, __tmp__21:Float, __tmp__22:Float;
			${assignVars(tmps, [
				macro ${as[0].f()} * ${bs[0].f()} + ${as[1].f()} * ${bs[1].f()} + ${as[2].f()} * ${bs[2].f()},
				macro ${as[0].f()} * ${bs[3].f()} + ${as[1].f()} * ${bs[4].f()} + ${as[2].f()} * ${bs[5].f()},
				macro ${as[0].f()} * ${bs[6].f()} + ${as[1].f()} * ${bs[7].f()} + ${as[2].f()} * ${bs[8].f()},
				macro ${as[3].f()} * ${bs[0].f()} + ${as[4].f()} * ${bs[1].f()} + ${as[5].f()} * ${bs[2].f()},
				macro ${as[3].f()} * ${bs[3].f()} + ${as[4].f()} * ${bs[4].f()} + ${as[5].f()} * ${bs[5].f()},
				macro ${as[3].f()} * ${bs[6].f()} + ${as[4].f()} * ${bs[7].f()} + ${as[5].f()} * ${bs[8].f()},
				macro ${as[6].f()} * ${bs[0].f()} + ${as[7].f()} * ${bs[1].f()} + ${as[8].f()} * ${bs[2].f()},
				macro ${as[6].f()} * ${bs[3].f()} + ${as[7].f()} * ${bs[4].f()} + ${as[8].f()} * ${bs[5].f()},
				macro ${as[6].f()} * ${bs[6].f()} + ${as[7].f()} * ${bs[7].f()} + ${as[8].f()} * ${bs[8].f()}
			])};
			${assignVars(dst.s().mat3Names(), tmps)};
		};
	}

	public static macro function mat3_mulResultTransposed(dst:Expr, src1:Expr, src2:Expr) {
		var tmps = "__tmp__".mat3Names();
		var as = src1.s().mat3Names();
		var bs = src2.s().mat3Names();
		return macro {
			var __tmp__00:Float, __tmp__01:Float, __tmp__02:Float;
			var __tmp__10:Float, __tmp__11:Float, __tmp__12:Float;
			var __tmp__20:Float, __tmp__21:Float, __tmp__22:Float;
			${assignVars(tmps, [
				macro ${as[0].f()} * ${bs[0].f()} + ${as[1].f()} * ${bs[3].f()} + ${as[2].f()} * ${bs[6].f()},
				macro ${as[3].f()} * ${bs[0].f()} + ${as[4].f()} * ${bs[3].f()} + ${as[5].f()} * ${bs[6].f()},
				macro ${as[6].f()} * ${bs[0].f()} + ${as[7].f()} * ${bs[3].f()} + ${as[8].f()} * ${bs[6].f()},
				macro ${as[0].f()} * ${bs[1].f()} + ${as[1].f()} * ${bs[4].f()} + ${as[2].f()} * ${bs[7].f()},
				macro ${as[3].f()} * ${bs[1].f()} + ${as[4].f()} * ${bs[4].f()} + ${as[5].f()} * ${bs[7].f()},
				macro ${as[6].f()} * ${bs[1].f()} + ${as[7].f()} * ${bs[4].f()} + ${as[8].f()} * ${bs[7].f()},
				macro ${as[0].f()} * ${bs[2].f()} + ${as[1].f()} * ${bs[5].f()} + ${as[2].f()} * ${bs[8].f()},
				macro ${as[3].f()} * ${bs[2].f()} + ${as[4].f()} * ${bs[5].f()} + ${as[5].f()} * ${bs[8].f()},
				macro ${as[6].f()} * ${bs[2].f()} + ${as[7].f()} * ${bs[5].f()} + ${as[8].f()} * ${bs[8].f()}
			])};
			${assignVars(dst.s().mat3Names(), tmps)};
		};
	}

	public static macro function mat3_inertiaFromCOG(dst:Expr, src:Expr) {
		var as = src.s().vec3Names();
		return macro {
			var xx:Float = ${as[0].f()} * ${as[0].f()};
			var yy:Float = ${as[1].f()} * ${as[1].f()};
			var zz:Float = ${as[2].f()} * ${as[2].f()};
			var xy:Float = -${as[0].f()} * ${as[1].f()};
			var yz:Float = -${as[1].f()} * ${as[2].f()};
			var zx:Float = -${as[2].f()} * ${as[0].f()};
			${assignVars(dst.s().mat3Names(), [
				macro yy + zz, macro xy, macro zx,
				macro xy, macro xx + zz, macro yz,
				macro zx, macro yz, macro xx + yy
			])};
		}
	}

	public static macro function mat3_transformInertia(dst:Expr, inertia:Expr, rotation:Expr) {
		return macro {
			M.mat3_mul($dst, $rotation, $inertia);
			M.mat3_mulRhsTransposed($dst, $dst, $rotation);
		};
	}

	public static macro function mat3_toEulerXyz(dst:Expr, src:Expr) {
		var as = src.s().mat3Names();
		return macro {
			var sy:Float = ${as[2].f()};

			if (sy <= -1) { // y = -PI / 2
				// |  0           0          -1 |
				// | -sin(x - z)  cos(x - z)  0 |
				// |  cos(x - z)  sin(x - z)  0 |

				var xSubZ:Float = oimo.common.MathUtil.atan2(${as[7].f()}, ${as[4].f()});

				// not unique, minimize x^2 + z^2
				//   x =  xSubZ/2
				//   z = -xSubZ/2
				${assignVars(dst.s().vec3Names(), [
					macro xSubZ * 0.5, macro -oimo.common.MathUtil.HALF_PI, macro -xSubZ * 0.5
				])};
			} else if (sy >= 1) { // y = PI / 2
				// |  0           0           1 |
				// |  sin(x + z)  cos(x + z)  0 |
				// | -cos(x + z)  sin(x + z)  0 |

				var xAddZ:Float = oimo.common.MathUtil.atan2(${as[7].f()}, ${as[4].f()});

				// not unique, minimize x^2 + z^2
				//   x = xAddZ/2
				//   z = xAddZ/2
				${assignVars(dst.s().vec3Names(), [
					macro xAddZ * 0.5, macro oimo.common.MathUtil.HALF_PI, macro xAddZ * 0.5
				])};
			} else {
				var y:Float = oimo.common.MathUtil.asin(sy);
				var x:Float = oimo.common.MathUtil.atan2(-${as[5].f()}, ${as[8].f()});
				var z:Float = oimo.common.MathUtil.atan2(-${as[1].f()}, ${as[0].f()});
				${assignVars(dst.s().vec3Names(), [
					macro x, macro y, macro z
				])};
			}
		};
	}

	public static macro function mat3_inv(dst:Expr, src:Expr) {
		var as = src.s().mat3Names();
		return macro {
			var d00:Float = ${as[4].f()} * ${as[8].f()} - ${as[5].f()} * ${as[7].f()};
			var d01:Float = ${as[3].f()} * ${as[8].f()} - ${as[5].f()} * ${as[6].f()};
			var d02:Float = ${as[3].f()} * ${as[7].f()} - ${as[4].f()} * ${as[6].f()};
			var d10:Float = ${as[1].f()} * ${as[8].f()} - ${as[2].f()} * ${as[7].f()};
			var d11:Float = ${as[0].f()} * ${as[8].f()} - ${as[2].f()} * ${as[6].f()};
			var d12:Float = ${as[0].f()} * ${as[7].f()} - ${as[1].f()} * ${as[6].f()};
			var d20:Float = ${as[1].f()} * ${as[5].f()} - ${as[2].f()} * ${as[4].f()};
			var d21:Float = ${as[0].f()} * ${as[5].f()} - ${as[2].f()} * ${as[3].f()};
			var d22:Float = ${as[0].f()} * ${as[4].f()} - ${as[1].f()} * ${as[3].f()};
			var d:Float = ${as[0].f()} * d00 - ${as[1].f()} * d01 + ${as[2].f()} * d02;
			if (d < -1e-32 || d > 1e-32) d = 1 / d;
			${assignVars(dst.s().mat3Names(), [
				macro d00 * d,
				macro -d10 * d,
				macro d20 * d,
				macro -d01 * d,
				macro d11 * d,
				macro -d21 * d,
				macro d02 * d,
				macro -d12 * d,
				macro d22 * d
			])};
		}
	}

	public static macro function mat3_det(src:Expr) {
		var as = src.s().mat3Names();
		return macro {
			var d00:Float = ${as[4].f()} * ${as[8].f()} - ${as[5].f()} * ${as[7].f()};
			var d01:Float = ${as[3].f()} * ${as[8].f()} - ${as[5].f()} * ${as[6].f()};
			var d02:Float = ${as[3].f()} * ${as[7].f()} - ${as[4].f()} * ${as[6].f()};
			${as[0].f()} * d00 - ${as[1].f()} * d01 + ${as[2].f()} * d02;
		}
	}

	// ---------------------------------------------------------------------
	// Transform
	// ---------------------------------------------------------------------

	public static macro function transform_assign(dst:ExprOf<oimo.common.Transform>, src:ExprOf<oimo.common.Transform>) {
		return macro {
			var dst:oimo.common.Transform = cast $dst;
			var src:oimo.common.Transform = cast $src;
			M.vec3_assign(dst._position, src._position);
			M.mat3_assign(dst._rotation, src._rotation);
		}
	}

	public static macro function transform_id(dst:Expr) {
		return macro {
			var dst:oimo.common.Transform = cast $dst;
			M.vec3_zero(dst._position);
			M.mat3_id(dst._rotation);
		}
	}

	public static macro function transform_toMat4(dst:Expr, srcOrigin:Expr, srcRotation:Expr) {
		return macro {
			var m:oimo.common.Mat4 = cast $dst;
			${assignVars([
				macro m.e00, macro m.e01, macro m.e02,
				macro m.e10, macro m.e11, macro m.e12,
				macro m.e20, macro m.e21, macro m.e22
			], srcRotation.s().mat3Names())};
			${assignVars([
				macro m.e03, macro m.e13, macro m.e23
			], srcOrigin.s().vec3Names())};
			${assignVars([macro m.e30, macro m.e31, macro m.e32, macro m.e33], [macro 0, macro 0, macro 0, macro 1])};
		}
	}

	public static macro function transform_mul(dst:ExprOf<oimo.common.Transform>, src1:ExprOf<oimo.common.Transform>, src2:ExprOf<oimo.common.Transform>) {
		return macro {
			var dst:oimo.common.Transform = $dst;
			var src1:oimo.common.Transform = $src1;
			var src2:oimo.common.Transform = $src2;
			M.mat3_mul(dst._rotation, src2._rotation, src1._rotation);
			M.vec3_mulMat3(dst._position, src1._position, src2._rotation);
			M.vec3_add(dst._position, dst._position, src2._position);
		};
	}

	// ---------------------------------------------------------------------
	// Quat
	// ---------------------------------------------------------------------

	public static macro function quat_id(dst:Expr) {
		return assignVars(dst.s().quatNames(), [macro 0, macro 0, macro 0, macro 1]);
	}

	public static macro function quat_getReal(src:Expr) {
		return macro ${src.s().quatRealName().f()};
	}

	public static macro function quat_fromVec3AndFloat(dst:Expr, src1:Expr, src2:ExprOf<Float>) {
		return assignVars(dst.s().quatNames(), src1.s().vec3Names().map(f).concat([src2]));
	}

	public static macro function quat_fromQuat(dst:Expr, src:ExprOf<oimo.common.Quat>) {
		return macro {
			var q:oimo.common.Quat = cast $src;
			${assignVars(dst.s().quatNames(), [
				macro q.x,
				macro q.y,
				macro q.z,
				macro q.w
			])};
		}
	}

	public static macro function quat_toQuat(dst:ExprOf<oimo.common.Quat>, src:Expr) {
		return macro {
			var q:oimo.common.Quat = cast $dst;
			${assignVars([
				macro q.x,
				macro q.y,
				macro q.z,
				macro q.w
			], src.s().quatNames())};
		}
	}

	public static macro function quat_fromMat3(dst:Expr, src:Expr) {
		var ds = dst.s().quatNames();
		var as = src.s().mat3Names();
		return macro {
			var e00:Float = ${as[0].f()};
			var e11:Float = ${as[4].f()};
			var e22:Float = ${as[8].f()};
			var t:Float = e00 + e11 + e22;
			var s:Float;
			if (t > 0) {
				s = oimo.common.MathUtil.sqrt(t + 1);
				${ds[3].f()} = 0.5 * s;
				s = 0.5 / s;
				${ds[0].f()} = (${as[7].f()} - ${as[5].f()}) * s;
				${ds[1].f()} = (${as[2].f()} - ${as[6].f()}) * s;
				${ds[2].f()} = (${as[3].f()} - ${as[1].f()}) * s;
			} else {
				M.compare3max(e00, e11, e22, { // e00 is the largest
					s = oimo.common.MathUtil.sqrt(e00 - e11 - e22 + 1);
					${ds[0].f()} = 0.5 * s;
					s = 0.5 / s;
					${ds[1].f()} = (${as[1].f()} + ${as[3].f()}) * s;
					${ds[2].f()} = (${as[2].f()} + ${as[6].f()}) * s;
					${ds[3].f()} = (${as[7].f()} - ${as[5].f()}) * s;
				}, { // e11 is the largest
					s = oimo.common.MathUtil.sqrt(e11 - e22 - e00 + 1);
					${ds[1].f()} = 0.5 * s;
					s = 0.5 / s;
					${ds[0].f()} = (${as[1].f()} + ${as[3].f()}) * s;
					${ds[2].f()} = (${as[5].f()} + ${as[7].f()}) * s;
					${ds[3].f()} = (${as[2].f()} - ${as[6].f()}) * s;
				}, { // e22 is the largest
					s = oimo.common.MathUtil.sqrt(e22 - e00 - e11 + 1);
					${ds[2].f()} = 0.5 * s;
					s = 0.5 / s;
					${ds[0].f()} = (${as[2].f()} + ${as[6].f()}) * s;
					${ds[1].f()} = (${as[5].f()} + ${as[7].f()}) * s;
					${ds[3].f()} = (${as[3].f()} - ${as[1].f()}) * s;
				});
			}
		}
	}

	public static macro function quat_add(dst:Expr, src1:Expr, src2:Expr) {
		return binOpVars(dst.s().quatNames(), src1.s().quatNames(), src2.s().quatNames(), OpAdd);
	}

	public static macro function quat_addRhsScaled(dst:Expr, src1:Expr, src2:Expr, src3:ExprOf<Float>) {
		return binOp2RLVars(dst.s().quatNames(), src1.s().quatNames(), src2.s().quatNames(), [src3, src3, src3, src3], OpAdd, OpMult);
	}

	public static macro function quat_sub(dst:Expr, src1:Expr, src2:Expr) {
		return binOpVars(dst.s().quatNames(), src1.s().quatNames(), src2.s().quatNames(), OpSub);
	}

	public static macro function quat_scale(dst:Expr, src1:Expr, src2:ExprOf<Float>) {
		return binOpVars(dst.s().quatNames(), src1.s().quatNames(), [src2, src2, src2, src2], OpMult);
	}

	public static macro function quat_assign(dst:Expr, src:Expr) {
		return assignVars(dst.s().quatNames(), src.s().quatNames());
	}

	public static macro function quat_negate(dst:Expr, src:Expr) {
		return unOpVars(dst.s().quatNames(), src.s().quatNames(), OpNeg);
	}

	public static macro function quat_lengthSq(src:Expr) {
		var as = src.s().quatNames();
		return macro ${as[0].f()} * ${as[0].f()} + ${as[1].f()} * ${as[1].f()} + ${as[2].f()} * ${as[2].f()} + ${as[3].f()} * ${as[3].f()};
	}

	public static macro function quat_normalize(dst:Expr, src:Expr) {
		var as = src.s().quatNames();
		return macro {
			var l:Float = M.quat_lengthSq($src);
			if (l > 1e-32) l = 1 / oimo.common.MathUtil.sqrt(l);
			M.quat_scale($dst, $src, l);
		};
	}

	public static macro function quat_mul(dst:Expr, src1:Expr, src2:Expr) {
		var as = src1.s().quatNames();
		var bs = src2.s().quatNames();
		return assignVars(dst.s().quatNames(), [
			macro ${as[3].f()} * ${bs[0].f()} + ${as[0].f()} * ${bs[3].f()} + ${as[1].f()} * ${bs[2].f()} - ${as[2].f()} * ${bs[1].f()},
			macro ${as[3].f()} * ${bs[1].f()} - ${as[0].f()} * ${bs[2].f()} + ${as[1].f()} * ${bs[3].f()} + ${as[2].f()} * ${bs[0].f()},
			macro ${as[3].f()} * ${bs[2].f()} + ${as[0].f()} * ${bs[1].f()} - ${as[1].f()} * ${bs[0].f()} + ${as[2].f()} * ${bs[3].f()},
			macro ${as[3].f()} * ${bs[3].f()} - ${as[0].f()} * ${bs[0].f()} - ${as[1].f()} * ${bs[1].f()} - ${as[2].f()} * ${bs[2].f()}
		]);
	}

	public static macro function quat_arc(dst:Expr, v1:Expr, v2:Expr) {
		var as = v1.s().vec3Names();
		var bs = v2.s().vec3Names();
		return macro {
			var d:Float = M.vec3_dot($v1, $v2);
			if (d < -1 + 1e-9) { // PI rotation, ignore v2 and set a vector perpendicular to v1
				var vX:Float, vY:Float, vZ:Float;
				M.vec3_perp(v, $v1);
				M.quat_fromVec3AndFloat($dst, v, 0);
			} else {
				var cX:Float, cY:Float, cZ:Float;
				M.vec3_cross(c, $v1, $v2);

				// cos(theta/2) = sqrt((1 + cos(theta)) / 2)
				var w:Float = oimo.common.MathUtil.sqrt((1 + d) * 0.5);

				// sin(theta/2) / sin(theta) = sin(theta/2) / (2 * sin(theta/2) * cos(theta/2))
				//                           = 1 / (2 * cos(theta/2))
				d = 0.5 / w;
				// x^2 + y^2 + z^2 = sin(theta/2)
				M.vec3_scale(c, c, d);
				M.quat_fromVec3AndFloat($dst, c, w);
			}
		}
	}

	public static macro function quat_dot(src1:Expr, src2:Expr) {
		var as = src1.s().quatNames();
		var bs = src2.s().quatNames();
		return macro ${as[0].f()} * ${bs[0].f()} + ${as[1].f()} * ${bs[1].f()} + ${as[2].f()} * ${bs[2].f()} + ${as[3].f()} * ${bs[3].f()};
	}

	public static macro function quat_slerp(dst:Expr, src1:Expr, src2:Expr, t:ExprOf<Float>) {
		var as = src1.s().quatNames();
		var bs = src2.s().quatNames();
		return macro {
			var qx:Float;
			var qy:Float;
			var qz:Float;
			var qw:Float;
			var q1X:Float, q1Y:Float, q1Z:Float, q1W:Float;
			var q2X:Float, q2Y:Float, q2Z:Float, q2W:Float;
			M.quat_assign(q1, $src1);
			M.quat_assign(q2, $src2);
			var d:Float = M.quat_dot(q1, q2);
			if (d < 0) {
				d = -d;
				M.quat_negate(q2, q2);
			}
			if (d > 1 - 1e-6) {
				// two quaternions are too close, returns lerp instead
				var dqX:Float, dqY:Float, dqZ:Float, dqW:Float;
				M.quat_sub(dq, q2, q1);
				M.quat_addRhsScaled(q2, q1, dq, $t);
				M.quat_normalize($dst, q2);
			} else {
				// target angle
				var theta:Float = $t * oimo.common.MathUtil.acos(d);

				// make q2 orthogonal to this
				M.quat_addRhsScaled(q2, q2, q1, -d);
				M.quat_normalize(q2, q2);

				// mix them
				var sin:Float = oimo.common.MathUtil.sin(theta);
				var cos:Float = oimo.common.MathUtil.cos(theta);
				M.quat_scale(q1, q1, cos);
				M.quat_addRhsScaled($dst, q1, q2, sin);
			}
		};
	}

	// ---------------------------------------------------------------------
	// AABB
	// ---------------------------------------------------------------------

	public static macro function aabb_overlap(min1:Expr, max1:Expr, min2:Expr, max2:Expr) {
		var mi1:Array<String> = min1.s().vec3Names();
		var ma1:Array<String> = max1.s().vec3Names();
		var mi2:Array<String> = min2.s().vec3Names();
		var ma2:Array<String> = max2.s().vec3Names();
		return macro
			${mi1[0].f()} < ${ma2[0].f()} && ${ma1[0].f()} > ${mi2[0].f()} &&
			${mi1[1].f()} < ${ma2[1].f()} && ${ma1[1].f()} > ${mi2[1].f()} &&
			${mi1[2].f()} < ${ma2[2].f()} && ${ma1[2].f()} > ${mi2[2].f()}
		;
	}

	public static macro function aabb_contains(min1:Expr, max1:Expr, min2:Expr, max2:Expr) {
		var mi1:Array<String> = min1.s().vec3Names();
		var ma1:Array<String> = max1.s().vec3Names();
		var mi2:Array<String> = min2.s().vec3Names();
		var ma2:Array<String> = max2.s().vec3Names();
		return macro
			${mi1[0].f()} <= ${mi2[0].f()} && ${ma1[0].f()} >= ${ma2[0].f()} &&
			${mi1[1].f()} <= ${mi2[1].f()} && ${ma1[1].f()} >= ${ma2[1].f()} &&
			${mi1[2].f()} <= ${mi2[2].f()} && ${ma1[2].f()} >= ${ma2[2].f()}
		;
	}

	public static macro function aabb_surfaceArea(min:Expr, max:Expr) {
		var mi:Array<String> = min.s().vec3Names();
		var ma:Array<String> = max.s().vec3Names();
		return macro {
			var ex:Float = ${ma[0].f()} - ${mi[0].f()};
			var ey:Float = ${ma[1].f()} - ${mi[1].f()};
			var ez:Float = ${ma[2].f()} - ${mi[2].f()};
			(ex * (ey + ez) + ey * ez) * 2;
		};
	}

	public static macro function aabb_volume(min:Expr, max:Expr) {
		var mi:Array<String> = min.s().vec3Names();
		var ma:Array<String> = max.s().vec3Names();
		return macro {
			var ex:Float = ${ma[0].f()} - ${mi[0].f()};
			var ey:Float = ${ma[1].f()} - ${mi[1].f()};
			var ez:Float = ${ma[2].f()} - ${mi[2].f()};
			ex * ey * ez;
		};
	}

	public static macro function aabb_combine(dstMin:Expr, dstMax:Expr, src1Min:Expr, src1Max:Expr, src2Min:Expr, src2Max:Expr) {
		return macro {
			M.vec3_min($dstMin, $src1Min, $src2Min);
			M.vec3_max($dstMax, $src1Max, $src2Max);
		}
	}

	// ---------------------------------------------------------------------
	// Call
	// ---------------------------------------------------------------------

	public static macro function call(e:Expr) {
		switch(e.expr) {
		case ECall(func, params):
			var newParams:Array<Expr> = [];
			for (param in params) {
				var names:Array<String> = U.namesE(param);
				if (names != null) {
					for (name in names) {
						newParams.push(name.e());
					}
				} else {
					newParams.push(param);
				}
			}
			e.expr = ECall(func, newParams);
			return macro $e;
		case _:
			Context.error("invalid call", U.pos());
			return macro $e;
		}
	}

#if macro

	// ---------------------------------------------------------------------
	// local
	// ---------------------------------------------------------------------

	static function zip<A1, A2, A3>(a1:Array<A1>, a2:Array<A2>, f:A1 -> A2 -> A3):Array<A3> {
		var res:Array<A3> = [];
		var num:Int = a1.length;
		for (i in 0...num) {
			res.push(f(a1[i], a2[i]));
		}
		return res;
	}

	/**
	 * expr to type
	 */
	static function t(e:Expr):Type {
		return Context.typeof(e);
	}

	/**
	 * expr to str
	 */
	static function s(e:Expr):String {
		return e.toString();
	}

	/**
	 * str to field access
	 */
	static inline function f(s:String):Expr {
		return macro $p{s.split(".")};
	}

	/**
	 * float to literal float
	 */
	static inline function lf(f:Float):Expr {
		return macro $v{f};
	}

	static function defineVars(names:Array<String>, type:ComplexType) {
		var es:Array<Expr> = [];
		for (name in names) {
			es.push(macro var $name);
		}
		var vs:Array<Var> = [];
		for (e in es) {
			switch(e.expr) {
			case EVars(vars):
				vs = vs.concat(vars.map(function(v) { v.type = type; return v; }));
			case _:
			}
		}
		return EVars(vs).toExpr();
	}

	static function assignVars(lhs:Array<Dynamic>, rhs:Array<Dynamic>) {
		return assignVarsExpr(lhs.toExprArray(), rhs.toExprArray());
	}

	/**
	 * lhs = rhs
	 */
	static function assignVarsExpr(lhs:Array<Expr>, rhs:Array<Expr>) {
		var es:Array<Expr> = [];
		var num:Int = lhs.length;
		for (i in 0...num) {
			es.push(macro ${lhs[i]} = ${rhs[i]});

#if OIMO_VERBOSE_NAN_CHECK
			// NaN checking
			es.push(macro if (${lhs[i]} != ${lhs[i]}) throw M.error("NaN"));
#end

		}
		return macro $b{es};
	}

	static function unOpVars(dst:Array<Dynamic>, src:Array<Dynamic>, op:Unop) {
		return unOpVarsExpr(dst.toExprArray(), src.toExprArray(), op);
	}

	/**
	 * dst = op src
	 */
	static function unOpVarsExpr(dst:Array<Expr>, src:Array<Expr>, op:Unop) {
		var es:Array<Expr> = [];
		var num:Int = dst.length;
		for (i in 0...num) {
			es.push(macro ${dst[i]} = ${EUnop(op, false, src[i]).toExpr()});

#if OIMO_VERBOSE_NAN_CHECK
			// NaN checking
			es.push(macro if (${dst[i]} != ${dst[i]}) throw M.error("NaN"));
#end

		}
		return macro $b{es};
	}

	static function binOpVars(dst:Array<Dynamic>, src1:Array<Dynamic>, src2:Array<Dynamic>, op:Binop) {
		return binOpVarsExpr(dst.toExprArray(), src1.toExprArray(), src2.toExprArray(), op);
	}

	/**
	 * dst = src1 op src2
	 */
	static function binOpVarsExpr(dst:Array<Expr>, src1:Array<Expr>, src2:Array<Expr>, op:Binop) {
		var es:Array<Expr> = [];
		var num:Int = dst.length;
		for (i in 0...num) {
			es.push(macro ${dst[i]} = ${EBinop(op, src1[i], src2[i]).toExpr()});

#if OIMO_VERBOSE_NAN_CHECK
			// NaN checking
			es.push(macro if (${dst[i]} != ${dst[i]}) throw M.error("NaN"));
#end

		}
		return macro $b{es};
	}

	static function binOp2RLVars(dst:Array<Dynamic>, src1:Array<Dynamic>, src2:Array<Dynamic>, src3:Array<Dynamic>, op:Binop, op2:Binop) {
		return binOp2VarsRLExpr(dst.toExprArray(), src1.toExprArray(), src2.toExprArray(), src3.toExprArray(), op, op2);
	}

	/**
	 * dst = src1 op (src2 op2 src3)
	 */
	static function binOp2VarsRLExpr(dst:Array<Expr>, src1:Array<Expr>, src2:Array<Expr>, src3:Array<Expr>, op:Binop, op2:Binop) {
		var es:Array<Expr> = [];
		var num:Int = dst.length;
		for (i in 0...num) {
			es.push(macro ${dst[i]} = ${EBinop(op, src1[i], EBinop(op2, src2[i], src3[i]).toExpr()).toExpr()});

#if OIMO_VERBOSE_NAN_CHECK
			// NaN checking
			es.push(macro if (${dst[i]} != ${dst[i]}) throw M.error("NaN"));
#end

		}
		return macro $b{es};
	}

	static function toExprArray(a:Array<Dynamic>):Array<Expr> {
		return cast (Std.is(a[0], String) ? a.map(f) : a);
	}

	static function toExpr(def:ExprDef):Expr {
		return {
			expr: def,
			pos: U.pos()
		}
	}

#end

}
