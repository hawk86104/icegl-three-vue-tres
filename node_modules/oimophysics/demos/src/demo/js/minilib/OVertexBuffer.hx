package demo.js.minilib;
import js.html.*;
import js.html.webgl.*;

class OVertexBuffer {
	public var numVertices(default, null):Int;
	var attribs:Array<OVertexAttribute>;
	var indices:Array<Int>;
	var offsets:Array<Int>;
	var stride:Int;
	var gl:GL;
	var buffer:Buffer;
	var dataLength:Int;

	public function new(gl:GL) {
		this.gl = gl;
		buffer = gl.createBuffer();
	}

	public function setData(array:Array<Float>, ?usage:ODrawUsage = StaticDraw) {
		if (attribs == null) throw "set attributes first";
		numVertices = cast array.length / (stride / 4);
		gl.bindBuffer(GL.ARRAY_BUFFER, buffer);
		gl.bufferData(GL.ARRAY_BUFFER, new Float32Array(cast array), usage);
		gl.bindBuffer(GL.ARRAY_BUFFER, null);
	}

	public function updateData(array:Array<Float>) {
		gl.bindBuffer(GL.ARRAY_BUFFER, buffer);
		gl.bufferSubData(GL.ARRAY_BUFFER, 0, new Float32Array(cast array));
		gl.bindBuffer(GL.ARRAY_BUFFER, null);
	}

	public function updateDataFloat32Array(array:Float32Array) {
		gl.bindBuffer(GL.ARRAY_BUFFER, buffer);
		gl.bufferSubData(GL.ARRAY_BUFFER, 0, array);
		gl.bindBuffer(GL.ARRAY_BUFFER, null);
	}

	public function setAttribs(attribs:Array<OVertexAttribute>) {
		this.attribs = attribs;
		offsets = [];
		stride = 0;
		var num = attribs.length;
		for (i in 0...num) {
			offsets.push(stride);
			stride += attribs[i].float32Count * 4; // 32bit float
		}
	}

	public function loadAttribIndices(program:OShader) {
		indices = program.getAttribIndices(attribs);
	}

	public function bindAttribs() {
		if (indices == null) throw "indices are not loaded";
		var num = attribs.length;
		gl.bindBuffer(GL.ARRAY_BUFFER, buffer);
		for (i in 0...num) {
			gl.enableVertexAttribArray(indices[i]);
			gl.vertexAttribPointer(indices[i], attribs[i].float32Count, GL.FLOAT, false, stride, offsets[i]);
		}
		gl.bindBuffer(GL.ARRAY_BUFFER, null);
	}

}
