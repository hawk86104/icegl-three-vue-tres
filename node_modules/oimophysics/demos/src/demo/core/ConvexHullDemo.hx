package demo.core;
import demo.common.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;

/**
 * Convex hull demo
 */
class ConvexHullDemo extends DemoBase {
	public function new() {
		super("Convex Hull");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 7, 9), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		var thickness:Float = 0.5;
		OimoUtil.addBox(world, new Vec3(0, -thickness, 0), new Vec3(7, thickness, 7), true);

		var w:Int = 1;
		var h:Int = 1;
		var sp:Float = 0.61;
		var n:Int = 3;
		var wid:Float = 0.6;
		var hei:Float = 0.6;
		var dep:Float = 0.6;
		for (i in 0...n) {
			for (j in -w...w + 1) {
				for (k in -h...h + 1) {
					var center:Vec3 = new Vec3(j * wid * 2, hei + i * hei * 3.0, k * dep * 2);
					var bc:RigidBodyConfig = new RigidBodyConfig();
					var sc:ShapeConfig = new ShapeConfig();
					bc.position = center;
					sc.geometry = new ConvexHullGeometry([
						for (i in 0...8) new Vec3(rand() * wid, rand() * hei, rand() * dep)
					]);
					var b:RigidBody = new RigidBody(bc);
					b.addShape(new Shape(sc));
					world.addRigidBody(b);
				}
			}
		}
	}

	function rand():Float {
		var x:Float = Math.pow(Math.random(), 0.7);
		if (Math.random() < 0.5) x = -x;
		return x;
	}

	override public function update():Void {
		super.update();
		teleportRigidBodies(-20, 10, 5, 5);
	}
}
