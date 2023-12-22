package demo.js.minilib;

class OInput {
	public var ptouchX:Float;
	public var ptouchY:Float;
	public var touchX:Float;
	public var touchY:Float;
	public var dtouchX:Float;
	public var dtouchY:Float;
	public var _ntouchX:Float;
	public var _ntouchY:Float;
	public var ptouch:Bool;
	public var touch:Bool;
	public var dtouch:Int;
	public var _ntouch:Bool;
	public var pmouseX:Float;
	public var pmouseY:Float;
	public var mouseX:Float;
	public var mouseY:Float;
	public var dmouseX:Float;
	public var dmouseY:Float;
	public var _nmouseX:Float;
	public var _nmouseY:Float;
	public var pmouseL:Bool;
	public var pmouseR:Bool;
	public var mouseL:Bool;
	public var mouseR:Bool;
	public var dmouseL:Int;
	public var dmouseR:Int;
	public var _nmouseL:Bool;
	public var _nmouseR:Bool;

	public function new() {
		ptouchX = 0;
		ptouchY = 0;
		touchX = 0;
		touchY = 0;
		dtouchX = 0;
		dtouchY = 0;
		_ntouchX = 0;
		_ntouchY = 0;
		ptouch = false;
		touch = false;
		_ntouch = false;
		dtouch = 0;
		pmouseX = 0;
		pmouseY = 0;
		mouseX = 0;
		mouseY = 0;
		dmouseX = 0;
		dmouseY = 0;
		_nmouseX = 0;
		_nmouseY = 0;
		pmouseL = false;
		pmouseR = false;
		mouseL = false;
		mouseR = false;
		dmouseL = 0;
		dmouseR = 0;
		_nmouseL = false;
		_nmouseR = false;
	}

	public function _update():Void {
		ptouchX = touchX;
		ptouchY = touchY;
		touchX = _ntouchX;
		touchY = _ntouchY;
		dtouchX = touchX - ptouchX;
		dtouchY = touchY - ptouchY;
		ptouch = touch;
		touch = _ntouch;
		dtouch = (touch ? 1 : 0) - (ptouch ? 1 : 0);

		if (dtouch == 1) { // avoid position warp
			ptouchX = touchX;
			ptouchY = touchY;
		}

		pmouseX = mouseX;
		pmouseY = mouseY;
		mouseX = _nmouseX;
		mouseY = _nmouseY;
		dmouseX = mouseX - pmouseX;
		dmouseY = mouseY - pmouseY;
		pmouseL = mouseL;
		pmouseR = mouseR;
		mouseL = _nmouseL;
		mouseR = _nmouseR;
		dmouseL = (mouseL ? 1 : 0) - (pmouseL ? 1 : 0);
		dmouseR = (mouseR ? 1 : 0) - (pmouseR ? 1 : 0);
	}

}
