package demo.common;
import haxe.ds.Vector;

/**
 * ...
 */
class UserInput {
	public var mouseX:Float;
	public var mouseY:Float;
	public var pmouseX:Float;
	public var pmouseY:Float;
	public var mouseL:Bool;
	public var mouseR:Bool;
	public var pmouseL:Bool;
	public var pmouseR:Bool;

	public var keyboard:Vector<Bool>;
	public var pkeyboard:Vector<Bool>;
	public static var KEYBOARD_LENGTH	(default, never):Int = 256;
	public static var KEYCODE_LEFT		(default, never):Int = 37;
	public static var KEYCODE_UP		(default, never):Int = 38;
	public static var KEYCODE_RIGHT		(default, never):Int = 39;
	public static var KEYCODE_DOWN		(default, never):Int = 40;
	public static var KEYCODE_ENTER		(default, never):Int = 13;
	public static var KEYCODE_RETURN	(default, never):Int = 13;

	public function new() {
		pmouseX = 0;
		pmouseY = 0;
		pmouseL = false;
		pmouseR = false;
		mouseX = 0;
		mouseY = 0;
		mouseL = false;
		mouseR = false;
		pkeyboard = new Vector<Bool>(KEYBOARD_LENGTH);
		keyboard = new Vector<Bool>(KEYBOARD_LENGTH);
		for (i in 0...KEYBOARD_LENGTH) {
			pkeyboard[i] = false;
			keyboard[i] = false;
		}
	}

	public function isKeyPressed(?char:String = null, ?code:Int = -1):Bool {
		if (char != null) {
			code = char.charCodeAt(0);
		}
		if (code < 0 || code >= KEYBOARD_LENGTH) return false;
		return !pkeyboard[code] && keyboard[code];
	}
}
