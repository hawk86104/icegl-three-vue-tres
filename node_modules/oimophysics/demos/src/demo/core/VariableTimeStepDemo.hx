package demo.core;
import demo.common.OimoUtil;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;
import demo.common.Control;
import demo.common.DemoRenderer;
import demo.common.DemoBase;
import demo.common.UserInput;
import demo.common.ViewInfo;

/**
 * Variable time step demo
 */
class VariableTimeStepDemo extends DemoBase {
	var bullet:RigidBody;

	public function new() {
		super("Variable Time Step");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(-5, 7, 9), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		var thickness:Float = 0.5;
		OimoUtil.addBox(world, new Vec3(0, -thickness, 0), new Vec3(5, thickness, 5), true);

		var w:Int = 5;
		var h:Int = 1;
		var n:Int = 5;
		var wid:Float = 0.3;
		var hei:Float = 0.3;
		var dep:Float = 0.3;
		for (i in 0...n) {
			for (k in -h...h + 1) {
				for (j in 0...w) {
					if (j + k & 1 == 0) OimoUtil.addBox(world, new Vec3(j * wid * 2 + MathUtil.randIn(-0.01, 0.01), hei + i * hei * 2.2, k * dep * 2 + MathUtil.randIn(-0.01, 0.01)), new Vec3(wid, hei, dep), false);
					else OimoUtil.addCylinder(world, new Vec3(j * wid * 2 + MathUtil.randIn(-0.01, 0.01), hei + i * hei * 2.2, k * dep * 2 + MathUtil.randIn(-0.01, 0.01)), wid, hei, false);
				}
			}
		}

		{
			var b = OimoUtil.addBox(world, new Vec3(-4, 4, -4), new Vec3(0.5, 0.5, 0.5), false);
			b.setLinearVelocity(new Vec3(5, 0, 4));
			b.setAngularVelocity(new Vec3(3, 6, 8));
		}

		var bulletSize:Float = hei;
		bullet = OimoUtil.addCone(world, new Vec3(-150, 3, 0), bulletSize * 1.4, bulletSize * 1.5, false);
		bullet.addShape(new Shape({
			var sc = new ShapeConfig();
			sc.geometry = new BoxGeometry(new Vec3(0.4, 1, 0.4).scale(bulletSize));
			sc.position.y -= bulletSize * 1.5 + bulletSize;
			sc;
		}));
		bullet.rotate(new Mat3().appendRotation(MathUtil.HALF_PI, 0, 0, -1));
		bullet.getShapeList().setDensity(50);
		bullet.setLinearVelocity(new Vec3(300, 0, 0));
		bullet.setAngularVelocity(new Vec3(MathUtil.TWO_PI * 100, 0, 0));
	}

	override public function update():Void {
		var timeStep:Float = MathUtil.abs(0 - bullet.getPosition().x) / 8000;
		if (bullet.getPosition().x > 0) timeStep *= 10;

		var maxTimeStep:Float = 1 / 60;
		if (bullet.getPosition().x < -10) maxTimeStep = 1 / 180;

		if (timeStep < 1 / 10000) timeStep = 1 / 10000;
		if (timeStep > maxTimeStep) timeStep = maxTimeStep;

		this.dt = timeStep;

		super.update();
	}
}
