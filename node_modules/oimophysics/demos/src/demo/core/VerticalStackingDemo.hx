package demo.core;
import demo.common.DemoBase;
import demo.common.DemoRenderer;
import demo.common.OimoUtil;
import demo.common.UserInput;
import demo.common.ViewInfo;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;

/**
 * Vertical stacking demo
 */
class VerticalStackingDemo extends DemoBase {
	public function new() {
		super("Vertical Stacking");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 16, 16), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		var thickness:Float = 0.5;
		OimoUtil.addBox(world, new Vec3(0, -thickness, 0), new Vec3(10, thickness, 6), true);

		var w:Int = 2;
		var sp:Float = 3;
		var n:Int = 6;
		var dn:Int = 2;
		var size:Float = 0.4;

		var tmp = Setting.defaultRestitution;
		Setting.defaultRestitution = 0;

		for (i in -w...w + 1) {
			for (j in 0...n + dn * (i + w)) {
				OimoUtil.addBox(world, new Vec3(i * sp + MathUtil.randIn(-0.01, 0.01), size + j * size * 2.2, MathUtil.randIn(-0.01, 0.01)), new Vec3(size, size, size), false);
			}
		}

		Setting.defaultRestitution = tmp;
	}

	override public function update():Void {
		super.update();
		teleportRigidBodies(-20, 10, 5, 5);
	}
}
