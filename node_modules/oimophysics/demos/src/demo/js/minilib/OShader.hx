package demo.js.minilib;
import js.*;
import js.html.webgl.*;

class OShader {
	var gl:GL;
	var program:Program;
	var vertexShader:Shader;
	var fragmentShader:Shader;
	var uniformLocationMap:Map<String, UniformLocation>;

	public function new(gl:GL) {
		this.gl = gl;
		program = gl.createProgram();
		vertexShader = gl.createShader(GL.VERTEX_SHADER);
		fragmentShader = gl.createShader(GL.FRAGMENT_SHADER);
	}

	public function compile(vertexSource:String, fragmentSource:String):Void {
		uniformLocationMap = new Map<String, UniformLocation>();
		compileShader(vertexShader, vertexSource);
		compileShader(fragmentShader, fragmentSource);
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, GL.LINK_STATUS)) {
			trace(gl.getProgramInfoLog(program));
		}
	}

	public function getAttribIndex(name:String):Int {
		return gl.getAttribLocation(program, name);
	}

	public function getUniformLocation(name:String):UniformLocation {
		if (uniformLocationMap.exists(name)) return uniformLocationMap.get(name);
		var location:UniformLocation = gl.getUniformLocation(program, name);
		uniformLocationMap.set(name, location);
		return location;
	}

	public function getAttribIndices(attribs:Array<OVertexAttribute>):Array<Int> {
		var indices:Array<Int> = [];
		for (attrib in attribs) {
			indices.push(getAttribIndex(attrib.name));
		}
		return indices;
	}

	public function use():Void {
		gl.useProgram(program);
	}

	function compileShader(shader:Shader, source:String):Void {
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, GL.COMPILE_STATUS)) {
			Browser.alert(gl.getShaderInfoLog(shader));
		}
	}

}
