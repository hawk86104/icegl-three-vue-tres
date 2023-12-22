package demo.core;
import demo.common.*;
import oimo.collision.broadphase.BroadPhase;
import oimo.collision.broadphase.bvh.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;

/**
 * Broad-phase stress demo
 */
class BroadPhaseStressDemo extends DemoBase {
	static inline var RIGID_BODIES_STEP:Int = 100;
	static inline var FIELD_W:Int = 50;
	static inline var FIELD_H:Int = 50;
	static inline var FIELD_D:Int = 50;

	var pairTestCount:Int;
	var treeBalance:Int;
	var speed:Int = 4;

	public function new() {
		super("Broad-Phase Stress Test");
	}

	override public function initControls(controls:Array<Control>):Void {
		controls.push(new Control("↑", function():String {
			return "increase shapes";
		}, UserInput.KEYCODE_UP, function():Void {
			increaseRigidBodies();
		}));
		controls.push(new Control("↓", function():String {
			return "decrease shapes";
		}, UserInput.KEYCODE_DOWN, function():Void {
			decreaseRigidBodies();
		}));
		controls.push(new Control("→", function():String {
			return "increase speed";
		}, UserInput.KEYCODE_RIGHT, function():Void {
			speed += 2;
			if (speed > 20) speed = 20;
		}));
		controls.push(new Control("←", function():String {
			return "decrease speed";
		}, UserInput.KEYCODE_LEFT, function():Void {
			speed -= 2;
			if (speed < 0) speed = 0;
		}));
	}

	function max(a:Float, b:Float):Float {
		return a > b ? a : b;
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 0, max(FIELD_W, max(FIELD_H, FIELD_D)) * 3), new Vec3(), new Vec3(0, 1, 0));
		world.setGravity(new Vec3());
		for (i in 0...5) {
			increaseRigidBodies();
		}
	}

	override public function update():Void {
		super.update();
		var bp:BroadPhase = world.getBroadPhase();
		pairTestCount = bp.getTestCount();
		if (Std.is(bp, BvhBroadPhase)) {
			treeBalance = cast(bp, BvhBroadPhase).getTreeBalance();
		} else {
			treeBalance = 0;
		}
		reflectRigidBodies();
	}

	override public function additionalInfo():String {
		return
			'  broad-phase test count: $pairTestCount\n' +
			'  tree balance          : $treeBalance\n'
		;
	}

	function increaseRigidBodies():Void {
		var scale:Float = 0.7;
		var num:Int = RIGID_BODIES_STEP;
		var shapes = [
			new BoxGeometry(new Vec3(0.4, 0.5, 0.6).scaleEq(scale)),
			new SphereGeometry(0.5 * scale)
		];
		var compc = new ShapeConfig();
		var rigidc = new RigidBodyConfig();
		for (i in 0...num) {
			compc.geometry = shapes[Std.int(Math.random() * 2)];
			compc.position.init(MathUtil.randIn(-1, 1), MathUtil.randIn(-1, 1), MathUtil.randIn(-1, 1));
			compc.position.scaleEq(0);
			rigidc.position.init(MathUtil.randIn(-1, 1), MathUtil.randIn(-1, 1), MathUtil.randIn(-1, 1));
			rigidc.position.x *= FIELD_W;
			rigidc.position.y *= FIELD_H;
			rigidc.position.z *= FIELD_D;
			var body = new RigidBody(rigidc);
			body.addShape(new Shape(compc));
			moveRigidBody(body);
			world.addRigidBody(body);
		}
	}

	function moveRigidBody(b:RigidBody):Void {
		var speed:Float = this.speed;
		var v = new Vec3().init(MathUtil.randIn(-1, 1), MathUtil.randIn(-1, 1), MathUtil.randIn(-1, 1)).normalize().scaleEq(speed);
		var av = new Vec3().init(MathUtil.randIn(-1, 1), MathUtil.randIn(-1, 1), MathUtil.randIn(-1, 1)).scaleEq(5);
		b.setLinearVelocity(v);
		b.setAngularVelocity(av);
	}

	function decreaseRigidBodies():Void {
		var num:Int = RIGID_BODIES_STEP;
		if (num > world.getNumRigidBodies()) {
			return;
		}
		var rb = world.getRigidBodyList();
		while (rb.getNext() != null) {
			rb = rb.getNext();
		}
		for (i in 0...num) {
			var prev = rb.getPrev();
			world.removeRigidBody(rb);
			rb = prev;
		}
	}

	function reflectRigidBodies():Void {
		var rb:RigidBody = world.getRigidBodyList();
		var pos:Vec3 = new Vec3();
		while (rb != null) {
			rb.getPositionTo(pos);
			var lv = rb.getLinearVelocity();
			if (pos.x < -FIELD_W || pos.x > FIELD_W) lv.x *= -1;
			if (pos.y < -FIELD_H || pos.y > FIELD_H) lv.y *= -1;
			if (pos.z < -FIELD_D || pos.z > FIELD_D) lv.z *= -1;
			rb.setLinearVelocity(lv);
			rb = rb.getNext();
		}
	}

}
