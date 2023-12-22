package demo.common;
import oimo.math.*;
import oimo.common.Mat4;
import oimo.common.Vec3;
import oimo.dynamics.World;
import oimo.collision.broadphase.bvh.*;
import oimo.dynamics.*;
import oimo.dynamics.constraint.contact.*;
import oimo.dynamics.constraint.joint.*;
import oimo.dynamics.rigidbody.*;

/**
 * DemoRenderer renders a demo world using an instance of IDemoGraphics.
 */
class DemoRenderer {
	var g:IDemoGraphics;
	var w:World;
	var bgColor:Vec3;

	var viewMat:Mat4;
	var projMat:Mat4;

	public function new(world:World, graphics:IDemoGraphics) {
		w = world;
		g = graphics;

		bgColor = new Vec3(0.1, 0.1, 0.1);
		viewMat = new Mat4();
		projMat = new Mat4();
	}

	// --- public ---

	public inline function setWorld(world:World):Void {
		w = world;
	}

	public inline function setGraphics(graphics:IDemoGraphics):Void {
		g = graphics;
	}

	public inline function getGraphics():IDemoGraphics {
		return g;
	}

	public function draw(test:DemoBase):Void {
		g.setViewMatrix(viewMat);
		g.setProjectionMatrix(projMat);

		g.begin(bgColor);

		w.setDebugDraw(g.getDebugDraw());
		w.debugDraw();

		test.drawAdditionalObjects(g.getDebugDraw());

		g.end();
	}

	public inline function camera(eye:Vec3, at:Vec3, up:Vec3):Void {
		viewMat.lookAt(eye.x, eye.y, eye.z, at.x, at.y, at.z, up.x, up.y, up.z);
	}

	public inline function getViewMatrix():Mat4 {
		return viewMat.clone();
	}

	public inline function getCameraPosition():Vec3 {
		return new Vec3(
			-(viewMat.e00 * viewMat.e03 + viewMat.e10 * viewMat.e13 + viewMat.e20 * viewMat.e23),
			-(viewMat.e01 * viewMat.e03 + viewMat.e11 * viewMat.e13 + viewMat.e21 * viewMat.e23),
			-(viewMat.e02 * viewMat.e03 + viewMat.e12 * viewMat.e13 + viewMat.e22 * viewMat.e23)
		);
	}

	public inline function perspective(fovY:Float, aspect:Float):Void {
		projMat.perspective(fovY, aspect, 0.1, 1000);
	}

	public inline function getProjectionMatrix():Mat4 {
		return projMat.clone();
	}

}
