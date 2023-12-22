package oimo.dynamics.constraint.joint;
import haxe.macro.Expr;
import haxe.macro.Expr.ExprOf;
import oimo.common.MathUtil;
import oimo.common.Setting;

@:dox(hide)
@:extern
class JointMacro {
	// computes CFM_factor and ERP
	// note:
	//     CFM = CFM_factor / mass
	//     deltaImpulse = (1 / (1 / mass + CFM)) * (posError * ERP - velocity - totalImpulse * CFM)
	//                  = mass / (1 + CFM_factor) * (posError * ERP - velocity) - totalImpulse * CFM_factor / (1 + CFM_factor)
	public static macro function computeSoftConstraintParameters(frequency:ExprOf<Float>, dampingRatio:ExprOf<Float>, dt:ExprOf<Float>, useSymplecticEuler:ExprOf<Bool>, outCfmFactor:ExprOf<Float>, outErp:ExprOf<Float>):Expr {
		return macro {
			var omega:Float = 2 * oimo.common.MathUtil.PI * $frequency;
			var zeta:Float = $dampingRatio;
			if (zeta < oimo.common.Setting.minSpringDamperDampingRatio) {
				// limit minimum damping ratio
				zeta = oimo.common.Setting.minSpringDamperDampingRatio;
			}
			var h:Float = $dt;
			var c:Float = 2 * zeta * omega;
			var k:Float = omega * omega;

			if ($useSymplecticEuler) {
				// symplectic Euler (conserves energy well but unstable under high frequency)
				$outCfmFactor = 1 / (h * c);
				$outErp = k / c;
			} else {
				// implicit Euler (tends to lose energy but unconditionally stable)
				$outCfmFactor = 1 / (h * (h * k + c));
				$outErp = k / (h * k + c);
			}
		};
	}
}
