package demo.js;
import demo.js.minilib.*;
import js.lib.Float32Array;
import js.html.webgl.GL;
import oimo.dynamics.common.DebugDraw;
import oimo.common.Mat4;
import oimo.common.Vec3;
import oimo.physics.debugdraw.*;
import demo.common.IDemoGraphics;

/**
 * Debug graphics for WebGL.
 */
class WebGLDebugGraphics extends DebugDraw implements IDemoGraphics {
	var gl:GL;

	var pointVBO:OVertexBuffer;
	var pointIBO:OIndexBuffer;

	var lineVBO:OVertexBuffer;
	var lineIBO:OIndexBuffer;

	var triVBO:OVertexBuffer;
	var triIBO:OIndexBuffer;

	var pointBufferSize:Int;
	var pointData:Float32Array;
	var numPointData:Int;

	var lineBufferSize:Int;
	var lineData:Float32Array;
	var numLineData:Int;

	var triBufferSize:Int;
	var triData:Float32Array;
	var numTriData:Int;

	var shader:OShader;

	var cameraPos:Vec3;
	var lightDir:Vec3;
	var viewMat:Mat4;
	var projMat:Mat4;

	var tmpMat:Mat4;

	public function new(gl:GL) {
		super();
		this.gl = gl;
		gl.enable(GL.DEPTH_TEST);
		cameraPos = new Vec3();
		lightDir = new Vec3();
		viewMat = new Mat4();
		projMat = new Mat4();
		tmpMat = new Mat4();
		initShader();
		initBuffers();
	}

	function initBuffers() {
		var attribs:Array<OVertexAttribute> = [new OVertexAttribute(3, "aPosition"), new OVertexAttribute(3, "aNormal"), new OVertexAttribute(3, "aColor")];

		pointVBO = new OVertexBuffer(gl);
		pointIBO = new OIndexBuffer(gl);
		pointVBO.setAttribs(attribs);
		pointVBO.loadAttribIndices(shader);
		lineVBO = new OVertexBuffer(gl);
		lineIBO = new OIndexBuffer(gl);
		lineVBO.setAttribs(attribs);
		lineVBO.loadAttribIndices(shader);
		triVBO = new OVertexBuffer(gl);
		triIBO = new OIndexBuffer(gl);
		triVBO.setAttribs(attribs);
		triVBO.loadAttribIndices(shader);

		pointBufferSize = 4096;
		lineBufferSize = 4096;
		triBufferSize = 4096;
		pointData = new Float32Array(pointBufferSize * 9);
		lineData = new Float32Array(lineBufferSize * 9 * 2);
		triData = new Float32Array(triBufferSize * 9 * 3);

		initFloatArray(pointData);
		initFloatArray(lineData);
		initFloatArray(triData);

		var vbo:Array<Float> = [];
		var ibo:Array<Int> = [];
		for (i in 0...pointBufferSize) {
			vbo.push(0); vbo.push(0); vbo.push(0); // pos1
			vbo.push(0); vbo.push(0); vbo.push(0); // nml1
			vbo.push(0); vbo.push(0); vbo.push(0); // rgb1
			vbo.push(0); vbo.push(0); vbo.push(0); // pos2
			vbo.push(0); vbo.push(0); vbo.push(0); // nml2
			vbo.push(0); vbo.push(0); vbo.push(0); // rgb2
			ibo.push(i);
		}
		pointVBO.setData(vbo, DynamicDraw);
		pointIBO.setData(ibo, DynamicDraw);

		vbo = [];
		ibo = [];
		for (i in 0...lineBufferSize) {
			vbo.push(0); vbo.push(0); vbo.push(0); // pos1
			vbo.push(0); vbo.push(0); vbo.push(0); // nml1
			vbo.push(0); vbo.push(0); vbo.push(0); // rgb1
			vbo.push(0); vbo.push(0); vbo.push(0); // pos2
			vbo.push(0); vbo.push(0); vbo.push(0); // nml2
			vbo.push(0); vbo.push(0); vbo.push(0); // rgb2
			ibo.push(i * 2);
			ibo.push(i * 2 + 1);
		}
		lineVBO.setData(vbo, DynamicDraw);
		lineIBO.setData(ibo, DynamicDraw);

		vbo = [];
		ibo = [];
		for (i in 0...triBufferSize) {
			vbo.push(0); vbo.push(0); vbo.push(0); // pos1
			vbo.push(0); vbo.push(0); vbo.push(0); // nml1
			vbo.push(0); vbo.push(0); vbo.push(0); // rgb1
			vbo.push(0); vbo.push(0); vbo.push(0); // pos2
			vbo.push(0); vbo.push(0); vbo.push(0); // nml2
			vbo.push(0); vbo.push(0); vbo.push(0); // rgb2
			vbo.push(0); vbo.push(0); vbo.push(0); // pos3
			vbo.push(0); vbo.push(0); vbo.push(0); // nml3
			vbo.push(0); vbo.push(0); vbo.push(0); // rgb3
			ibo.push(i * 3);
			ibo.push(i * 3 + 1);
			ibo.push(i * 3 + 2);
		}
		triVBO.setData(vbo, DynamicDraw);
		triIBO.setData(ibo, DynamicDraw);
	}

	function initFloatArray(a:Float32Array):Void {
		var num:Int = a.length;
		for (i in 0...num) {
			a[i] = 0;
		}
	}

	function initShader():Void {
		shader = new OShader(gl);
		shader.compile("
			precision highp float;
			attribute vec3 aPosition;
			attribute vec3 aColor;
			attribute vec3 aNormal;
			varying vec3 vPosition;
			varying vec3 vNormal;
			varying vec3 vColor;
			uniform mat4 worldMat;
			uniform mat4 viewMat;
			uniform mat4 projMat;

			void main() {
				vec4 worldPos = worldMat * vec4(aPosition, 1.0);
				vPosition = worldPos.xyz;
				vColor = aColor;
				vNormal = aNormal;
				gl_Position = projMat * (viewMat * worldPos);
				gl_PointSize = 6.0;
			}
		", "
			precision highp float;
			varying vec3 vPosition;
			varying vec3 vNormal;
			varying vec3 vColor;
			uniform vec3 lightDir;
			uniform vec3 lightCol;
			uniform vec3 cameraPos;
			uniform float ambient;
			uniform float diffuse;
			uniform float specular;
			uniform float shininess;

			void main() {
				vec3 normal = length(vNormal) > 0.0 ? normalize(vNormal) : vec3(0.0, 0.0, 0.0);
				vec3 dir = normalize(lightDir);
				float d = -dot(dir, normal);
				float brightness = max(0.0, d) * diffuse;
				vec3 eye = normalize(vPosition - cameraPos);
				vec3 pixColor = vColor * min(1.0, ambient + diffuse * brightness);
				if (d > 0.0) {
					d = -dot(dir, reflect(eye, normal));
					pixColor += lightCol * specular * pow(max(0.0, d), shininess);
				}
				gl_FragColor = vec4(pixColor, 1.0);
			}
		");
	}

	public function setViewMatrix(matrix:Mat4):Void {
		viewMat.copyFrom(matrix).inverseEq();
		cameraPos.init(
			viewMat.e03,
			viewMat.e13,
			viewMat.e23
		);
		lightDir.init(
			viewMat.e02,
			viewMat.e12,
			viewMat.e22
		).scaleEq(-1);
		viewMat.copyFrom(matrix);
	}

	public function setProjectionMatrix(matrix:Mat4):Void {
		projMat.copyFrom(matrix);
	}

	public function begin(color:Vec3):Void {
		gl.clearColor(color.x, color.y, color.z, 1);
		gl.enable(GL.CULL_FACE);
		gl.clearDepth(1);
		gl.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		gl.lineWidth(2.0);

		shader.use();
		setMat4("viewMat", viewMat);
		setMat4("projMat", projMat);
		setVec3("cameraPos", cameraPos);
		setVec3("lightDir", lightDir);
		setFloat3("lightCol", 1, 1, 1);
		tmpMat.identity();
		setMat4("worldMat", tmpMat);

		numPointData = 0;
		numLineData = 0;
		numTriData = 0;
	}

	public function end():Void {
		colorModeWireframe();

		if (numPointData > 0) {
			pointVBO.updateDataFloat32Array(pointData);
			pointVBO.bindAttribs();
			pointIBO.draw(Points, numPointData);
			numPointData = 0;
		}
		if (numLineData > 0) {
			lineVBO.updateDataFloat32Array(lineData);
			lineVBO.bindAttribs();
			lineIBO.draw(Lines, numLineData * 2);
			numLineData = 0;
		}

		colorModeSolid();

		if (numTriData > 0) {
			triVBO.updateDataFloat32Array(triData);
			triVBO.bindAttribs();
			triIBO.draw(Triangles, numTriData * 3);
			numTriData = 0;
		}

		gl.flush();
	}

	public function getDebugDraw():DebugDraw {
		return this;
	}

	override public function point(v:Vec3, color:Vec3):Void {
		var idx:Int = numPointData * 9;
		var data:Float32Array = pointData;
		data[idx++] = v.x;
		data[idx++] = v.y;
		data[idx++] = v.z;
		data[idx++] = 0;
		data[idx++] = 0;
		data[idx++] = 0;
		data[idx++] = color.x;
		data[idx++] = color.y;
		data[idx++] = color.z;
		numPointData++;

		if (numPointData == pointBufferSize) {
			colorModeWireframe();
			pointVBO.updateDataFloat32Array(pointData);
			pointVBO.bindAttribs();
			pointIBO.draw(Points);
			numPointData = 0;
		}
	}

	override public function line(v1:Vec3, v2:Vec3, color:Vec3):Void {
		var idx:Int = numLineData * 18;
		var data:Float32Array = lineData;
		data[idx++] = v1.x;
		data[idx++] = v1.y;
		data[idx++] = v1.z;
		data[idx++] = 0;
		data[idx++] = 0;
		data[idx++] = 0;
		data[idx++] = color.x;
		data[idx++] = color.y;
		data[idx++] = color.z;
		data[idx++] = v2.x;
		data[idx++] = v2.y;
		data[idx++] = v2.z;
		data[idx++] = 0;
		data[idx++] = 0;
		data[idx++] = 0;
		data[idx++] = color.x;
		data[idx++] = color.y;
		data[idx++] = color.z;
		numLineData++;

		if (numLineData == lineBufferSize) {
			colorModeWireframe();
			lineVBO.updateDataFloat32Array(lineData);
			lineVBO.bindAttribs();
			lineIBO.draw(Lines);
			numLineData = 0;
		}
	}

	override public function triangle(v1:Vec3, v2:Vec3, v3:Vec3, n1:Vec3, n2:Vec3, n3:Vec3, color:Vec3):Void {
		var idx:Int = numTriData * 27;
		var data:Float32Array = triData;
		data[idx++] = v1.x;
		data[idx++] = v1.y;
		data[idx++] = v1.z;
		data[idx++] = n1.x;
		data[idx++] = n1.y;
		data[idx++] = n1.z;
		data[idx++] = color.x;
		data[idx++] = color.y;
		data[idx++] = color.z;
		data[idx++] = v2.x;
		data[idx++] = v2.y;
		data[idx++] = v2.z;
		data[idx++] = n2.x;
		data[idx++] = n2.y;
		data[idx++] = n2.z;
		data[idx++] = color.x;
		data[idx++] = color.y;
		data[idx++] = color.z;
		data[idx++] = v3.x;
		data[idx++] = v3.y;
		data[idx++] = v3.z;
		data[idx++] = n3.x;
		data[idx++] = n3.y;
		data[idx++] = n3.z;
		data[idx++] = color.x;
		data[idx++] = color.y;
		data[idx++] = color.z;
		numTriData++;

		if (numTriData == triBufferSize) {
			colorModeSolid();
			triVBO.updateDataFloat32Array(triData);
			triVBO.bindAttribs();
			triIBO.draw(Triangles);
			numTriData = 0;
		}
	}

	function colorModeSolid():Void {
		setFloat1("ambient", 0.2);
		setFloat1("diffuse", 0.8);
		setFloat1("specular", 0.8);
		setFloat1("shininess", 20);
	}

	function colorModeWireframe():Void {
		setFloat1("ambient", 1);
		setFloat1("diffuse", 0);
		setFloat1("specular", 0);
		setFloat1("shininess", 1);
	}

	extern inline function setMat4(name:String, matrix:Mat4):Void {
		gl.uniformMatrix4fv(shader.getUniformLocation(name), false, matrix.toArray(true));
	}

	extern inline function setFloat3(name:String, x:Float, y:Float, z:Float):Void {
		gl.uniform3f(shader.getUniformLocation(name), x, y, z);
	}

	extern inline function setVec3(name:String, v:Vec3):Void {
		gl.uniform3f(shader.getUniformLocation(name), v.x, v.y, v.z);
	}

	extern inline function setFloat1(name:String, x:Float):Void {
		gl.uniform1f(shader.getUniformLocation(name), x);
	}

}
