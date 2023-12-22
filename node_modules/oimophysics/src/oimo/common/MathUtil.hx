package oimo.common;
import oimo.common.Vec3;

/**
 * This class provides mathematical operations for internal purposes.
 */
class MathUtil {
	/**
	 * Positive infinity.
	 */
	public static inline var POSITIVE_INFINITY:Float = 1e65536;

	/**
	 * Negative infinity.
	 */
	public static inline var NEGATIVE_INFINITY:Float = -1e65536;

	/**
	 * The ratio of the circumference of a circle to its diameter.
	 */
	public static inline var PI:Float = 3.14159265358979;

	/**
	 * Shorthand for `PI * 2`.
	 */
	public static inline var TWO_PI:Float = PI * 2;

	/**
	 * Shorthand for `PI / 2`.
	 */
	public static inline var HALF_PI:Float = PI / 2;

	/**
	 * Shorthand for `PI / 180`.
	 */
	public static inline var TO_RADIANS:Float = PI / 180;

	/**
	 * Shorthand for `180 / PI`.
	 */
	public static inline var TO_DEGREES:Float = 180 / PI;

	/**
	 * Returns the absolute value of `x`.
	 */
	public static inline function abs(x:Float):Float {
		return x > 0 ? x : -x;
	}

	/**
	 * Returns `Math.sin(x)`.
	 */
	public static inline function sin(x:Float):Float {
		return Math.sin(x);
	}

	/**
	 * Returns `Math.cos(x)`.
	 */
	public static inline function cos(x:Float):Float {
		return Math.cos(x);
	}

	/**
	 * Returns `Math.tan(x)`.
	 */
	public static inline function tan(x:Float):Float {
		return Math.tan(x);
	}

	/**
	 * Returns `Math.asin(x)`.
	 */
	public static inline function asin(x:Float):Float {
		return Math.asin(x);
	}

	/**
	 * Returns `Math.acos(x)`.
	 */
	public static inline function acos(x:Float):Float {
		return Math.acos(x);
	}

	/**
	 * Returns `Math.atan(x)`.
	 */
	public static inline function atan(x:Float):Float {
		return Math.atan(x);
	}

	/**
	 * Returns `Math.asin(clamp(-1, x, 1))`.
	 * This never returns `NaN` as long as `x` is not `NaN`.
	 */
	public static inline function safeAsin(x:Float):Float {
		if (x <= -1) return -HALF_PI;
		if (x >= 1) return HALF_PI;
		return Math.asin(x);
	}

	/**
	 * Returns `Math.acos(clamp(-1, x, 1))`.
	 * This never returns `NaN` as long as `x` is not `NaN`.
	 */
	public static inline function safeAcos(x:Float):Float {
		if (x <= -1) return PI;
		if (x >= 1) return 0;
		return Math.acos(x);
	}

	/**
	 * Returns `Math.atan2(y, x)`
	 */
	public static inline function atan2(y:Float, x:Float):Float {
		return Math.atan2(y, x);
	}

	/**
	 * Returns `Math.sqrt(x)`.
	 */
	public static inline function sqrt(x:Float):Float {
		return Math.sqrt(x);
	}

	/**
	 * Returns a clamped value of `x` from `min` to `max`.
	 */
	public static inline function clamp(x:Float, min:Float, max:Float):Float {
		return x < min ? min : x > max ? max : x;
	}

	/**
	 * Returns `Math.random()`.
	 */
	public static inline function rand():Float {
		return Math.random();
	}

	/**
	 * Returns a random value from `min` inclusive to `max` exclusive.
	 */
	public static inline function randIn(min:Float, max:Float):Float {
		return min + rand() * (max - min);
	}

	/**
	 * Returns a random `Vec3` from `(min, min, min)` inclusive to `(max, max, max)` exclusive.
	 */
	public static inline function randVec3In(min:Float, max:Float):Vec3 {
		return new Vec3(min + rand() * (max - min), min + rand() * (max - min), min + rand() * (max - min));
	}

	/**
	 * Returns a random `Vec3` from `(-1.0, -1.0, -1.0)` inclusive to `(1.0, 1.0, 1.0)` exclusive.
	 */
	public static inline function randVec3():Vec3 {
		return randVec3In(-1, 1);
	}
}
