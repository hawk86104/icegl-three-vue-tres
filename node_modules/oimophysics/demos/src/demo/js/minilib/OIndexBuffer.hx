package demo.js.minilib;
import js.html.*;
import js.html.webgl.*;

class OIndexBuffer {
	var gl:GL;
	var buffer:Buffer;
	var count:Int;

	public function new(gl:GL) {
		this.gl = gl;
		buffer = gl.createBuffer();
	}

	public function setData(array:Array<UInt>, ?usage:ODrawUsage = StaticDraw):Void {
		gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, buffer);
		gl.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Int16Array(array), usage);
		gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
		count = array.length;
	}

	public function updateData(array:Array<UInt>, ?usage:ODrawUsage = StaticDraw):Void {
		gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, buffer);
		gl.bufferSubData(GL.ELEMENT_ARRAY_BUFFER, 0, new Int16Array(array));
		gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
	}

	public function updateDataInt16Array(array:Int16Array):Void {
		gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, buffer);
		gl.bufferSubData(GL.ELEMENT_ARRAY_BUFFER, 0, array);
		gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
	}

	public function draw(?mode:ODrawMode = Triangles, ?count:Int = -1):Void {
		gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, buffer);
		gl.drawElements(mode, count >= 0 ? count : this.count, GL.UNSIGNED_SHORT, 0);
	}

}
