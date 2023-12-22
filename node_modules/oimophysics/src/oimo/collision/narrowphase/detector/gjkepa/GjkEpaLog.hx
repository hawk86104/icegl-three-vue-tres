package oimo.collision.narrowphase.detector.gjkepa;
import haxe.macro.Expr;

@:extern
@:dox(hide)
class GjkEpaLog {
	public static macro function log(text:Expr):Expr {
		#if OIMO_GJK_EPA_DEBUG
		return macro trace("[GjkEpa log] " + $text);
		#else
		return macro {};
		#end
	}

	public static macro function run(runOnlyInDebug:Expr):Expr {
		#if OIMO_GJK_EPA_DEBUG
		return runOnlyInDebug;
		#else
		return macro {};
		#end
	}
}
