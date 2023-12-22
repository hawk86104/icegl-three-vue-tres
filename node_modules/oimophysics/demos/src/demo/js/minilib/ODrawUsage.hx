package demo.js.minilib;
import js.html.webgl.*;

@:enum
abstract ODrawUsage(Int) to Int {
	var StaticDraw = GL.STATIC_DRAW;
	var DynamicDraw = GL.DYNAMIC_DRAW;
}
