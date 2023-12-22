package demo.core;
import demo.common.DemoRenderer;
import demo.common.DemoBase;
import demo.common.OimoUtil;
import demo.common.UserInput;
import demo.common.ViewInfo;
import oimo.collision.geometry.*;
import oimo.common.Mat3;
import oimo.common.MathUtil;
import oimo.common.Setting;
import oimo.common.Vec3;
import oimo.dynamics.*;
import oimo.dynamics.constraint.joint.*;
import oimo.dynamics.rigidbody.*;
import oimo.math.*;

/**
 * Ragdoll demo
 */
class RagdollDemo extends DemoBase {

	public function new() {
		super("Ragdolls");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 5, 6), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		renderer.getGraphics().getDebugDraw().drawJointLimits = false;

		OimoUtil.addBox(world, new Vec3(0, -0.2, 0), new Vec3(6, 0.2, 6), true);

		var tmp = Setting.defaultFriction;
		Setting.defaultFriction = 0.5;

		for (i in 0...10) {
			OimoUtil.addRagdoll(world, new Vec3(0, 2 + i * 2, 0));
		}

		Setting.defaultFriction = tmp;
	}

	override public function update():Void {
		super.update();
	}
}
