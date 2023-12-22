package demo.js.minilib;
import js.*;

class OTimer {
	var targetFPS:Int;
	var targetFunction:Void -> Void;
	var expectedNextTime:Float;
	var running:Bool;

	public function new(targetFPS:Int, targetFunction:Void -> Void) {
		this.targetFPS = targetFPS;
		this.targetFunction = targetFunction;
		running = false;
	}

	public inline function run():Void {
		running = true;
		expectedNextTime = time();
		loop();
	}

	public inline function stop():Void {
		running = false;
	}

	function loop():Void {
		targetFunction();
		var en:Float = time();
		var next:Float = expectedNextTime + 1000.0 / targetFPS;
		var sleep:Float = expectedNextTime + 1000.0 / targetFPS - en;
		if (sleep < 3) {
			sleep = 3;
		}
		expectedNextTime = en + sleep;
		if (running) {
			Browser.window.setTimeout(loop, Std.int(sleep + 0.5));
		}
	}

	inline function time():Float {
		return Date.now().getTime();
	}

}
