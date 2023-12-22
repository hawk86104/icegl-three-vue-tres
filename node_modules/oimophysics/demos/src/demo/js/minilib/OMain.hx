package demo.js.minilib;
import js.*;
import js.html.*;
import js.html.webgl.*;

class OMain {
	public var width(get, null):Int;
	public var height(get, null):Int;
	var gl:GL;
	var canvas:CanvasElement;

	var frameCount:Int;

	var __screenWidth:Int;
	var __screenHeight:Int;

	var __state:Int;
	var __width:Int;
	var __height:Int;
	var __timer:OTimer;

	var input:OInput;

	public function new(canvas:CanvasElement) {
		this.canvas = canvas;
		input = new OInput();
		__setup();
	}

	function __setup():Void {
		__state = 0;
		frameCount = 0;
		setup();
		if (__state != 1) throw "call init()";
		__state = 2;
		__addEventListeners();
		__state = 3;
		__timer.run();
	}

	extern inline function __addEventListeners():Void {
		if (__state != 2) throw "invalid call";
		var touchCount:Int = 0;
		var firstTouchId:Int = -1;
		var scalingRatio:Float = Browser.window.devicePixelRatio;
		var elementX:Void -> Float = function():Float {
			return canvas.getBoundingClientRect().left;
		}
		var elementY:Void -> Float = function():Float {
			return canvas.getBoundingClientRect().top;
		}
		var body:Element;
		body = canvas;
		canvas.addEventListener("touchstart", function(e:TouchEvent):Void {
			if (e.cancelable) e.preventDefault();
			if (firstTouchId == -1) firstTouchId = e.changedTouches[0].identifier;
			for (i in 0...e.changedTouches.length) {
				var touch = e.changedTouches[i];
				if (touch .identifier == firstTouchId) {
					input._ntouchX = (touch.clientX - elementX()) * scalingRatio;
					input._ntouchY = (touch.clientY - elementY()) * scalingRatio;
					input._ntouch = true;
				}
			}
			touchCount += e.changedTouches.length;
		});
		body.addEventListener("touchmove", function(e:TouchEvent):Void {
			if (e.cancelable) e.preventDefault();
			for (i in 0...e.touches.length) {
				var touch = e.touches[i];
				if (touch .identifier == firstTouchId) {
					input._ntouchX = (touch.clientX - elementX()) * scalingRatio;
					input._ntouchY = (touch.clientY - elementY()) * scalingRatio;
				}
			}
		});
		var touchend = function(e:TouchEvent):Void {
			if (e.cancelable) e.preventDefault();
			for (i in 0...e.changedTouches.length) {
				var touch = e.changedTouches[i];
				if (touch.identifier == firstTouchId) {
					firstTouchId = -1;
					input._ntouchX = (touch.clientX - elementX()) * scalingRatio;
					input._ntouchY = (touch.clientY - elementY()) * scalingRatio;
					input._ntouch = false;
				}
			}
			touchCount -= e.changedTouches.length;
		};
		body.addEventListener("touchend", touchend);
		body.addEventListener("touchcancel", touchend);
		body.addEventListener("mousedown", function(e:MouseEvent):Void {
			if (e.cancelable) e.preventDefault();
			switch (e.button) {
			case 0:
				input._nmouseL = true;
			case 2:
				input._nmouseR = true;
			}
			input._nmouseX = (e.clientX - elementX()) * scalingRatio;
			input._nmouseY = (e.clientY - elementY()) * scalingRatio;
		});
		body.addEventListener("mouseup", function(e:MouseEvent):Void {
			if (e.cancelable) e.preventDefault();
			switch (e.button) {
			case 0:
				input._nmouseL = false;
			case 2:
				input._nmouseR = false;
			}
			input._nmouseX = (e.clientX - elementX()) * scalingRatio;
			input._nmouseY = (e.clientY - elementY()) * scalingRatio;
		});
		body.addEventListener("mousemove", function(e:MouseEvent):Void {
			if (e.cancelable) e.preventDefault();
			input._nmouseX = (e.clientX - elementX()) * scalingRatio;
			input._nmouseY = (e.clientY - elementY()) * scalingRatio;
		});
		body.oncontextmenu = function(e:ContextEvent):Bool {
			return false;
		};
	}

	function setup():Void {
		throw "override this";
	}

	function __loop():Void {
		if (__state != 3) throw "invalid call";
		frameCount++;
		input._update();
		loop();
	}

	function loop():Void {
		throw "override this";
	}

	extern inline function initFullScreen(frameRate:Int):Void {
		if (__state != 0) throw "invalid call";
		__state = 1;

		var pixelRatio:Float = Browser.window.devicePixelRatio;
		var widthPix:Int = Browser.window.innerWidth;
		var heightPix:Int = Browser.window.innerHeight;

		// fullscreen
		Browser.document.body.style.margin = "0";

		__width = Std.int(widthPix * pixelRatio);
		__height = Std.int(heightPix * pixelRatio);

		__screenWidth = __width;
		__screenHeight = __height;
		canvas.style.width = widthPix + "px";
		canvas.style.height = heightPix + "px";
		canvas.width = __width;
		canvas.height = __height;
		var dom:Element = canvas.parentElement;
		while (dom != null) {
			dom.style.overflow = "hidden";
			dom = dom.parentElement;
		}

		gl = canvas.getContextWebGL();

		__timer = new OTimer(frameRate, __loop);
	}

	extern inline function get_width():Int {
		return __width;
	}

	extern inline function get_height():Int {
		return __height;
	}

	// ----------------------------------------------- utils

	extern public inline function sqrt(a:Float):Float {
		return Math.sqrt(a);
	}

	extern public inline function pow(a:Float, b:Float):Float {
		return Math.pow(a, b);
	}

	extern public inline function round(a:Float):Int {
		return a < 0 ? Std.int(a - 0.5) : Std.int(a + 0.5);
	}

	extern public inline function min(a:Float, b:Float):Float {
		return a < b ? a : b;
	}

	extern public inline function max(a:Float, b:Float):Float {
		return a > b ? a : b;
	}

	extern public inline function abs(a:Float):Float {
		return a > 0 ? a : -a;
	}

	extern public inline function clamp(a:Float, min:Float, max:Float):Float {
		return a > max ? max : a < min ? min : a;
	}

	extern public inline function mini(a:Int, b:Int):Int {
		return a < b ? a : b;
	}

	extern public inline function maxi(a:Int, b:Int):Int {
		return a > b ? a : b;
	}

	extern public inline function absi(a:Int):Int {
		return a > 0 ? a : -a;
	}

	extern public inline function clampi(a:Int, min:Int, max:Int):Int {
		return a > max ? max : a < min ? min : a;
	}

	extern public inline function smoothstep(x:Float, edge0:Float, edge1:Float):Float {
		var t:Float = (x - edge0) / (edge1 - edge0);
		if (t > 1) t = 1;
		else if (t < 0) t = 0;
		return t * t * (3 - 2 * t);
	}

	extern public inline function rand(min:Float, max:Float):Float {
		return Math.random() * (max - min) + min;
	}

	extern public inline function distance(x:Float, y:Float):Float {
		return Math.sqrt(x * x + y * y);
	}
}
