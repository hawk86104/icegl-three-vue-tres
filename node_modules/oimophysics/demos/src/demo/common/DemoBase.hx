package demo.common;
import oimo.collision.geometry.*;
import oimo.collision.raycast.*;
import oimo.common.Mat4;
import oimo.common.MathUtil;
import oimo.common.Vec3;
import oimo.dynamics.*;
import oimo.dynamics.callback.RayCastClosest;
import oimo.dynamics.common.DebugDraw;
import oimo.dynamics.constraint.joint.*;
import oimo.dynamics.rigidbody.*;
import oimo.math.*;
import oimo.physics.debugdraw.*;

/**
 * Base class of demos.
 */
class DemoBase {
	public var demoName:String;
	public var dt:Float;
	var world:World;
	var renderer:DemoRenderer;
	var input:UserInput;
	var count:Int;
	var viewInfo:ViewInfo;
	var grabbingDistance:Float;
	var mouseJointDummyBody:RigidBody;
	var mouseJoint:SphericalJoint;

	public function new(demoName:String) {
		this.demoName = demoName;
		count = 0;
	}

	public function initControls(controls:Array<Control>):Void {
	}

	public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		this.world = world;
		this.renderer = renderer;
		this.input = input;
		this.viewInfo = viewInfo;
		renderer.camera(new Vec3(0, 5, 10), new Vec3(), new Vec3(0, 1, 0));
		var rigidBodyConfig:RigidBodyConfig = new RigidBodyConfig();
		rigidBodyConfig.type = RigidBodyType.STATIC;
		mouseJointDummyBody = new RigidBody(rigidBodyConfig);
		mouseJoint = null;
		dt = 1 / 60;
	}

	public function teleportRigidBodies(thresholdY:Float, toY:Float, rangeX:Float, rangeZ:Float):Void {
		var rb:RigidBody = world.getRigidBodyList();
		var pos:Vec3 = new Vec3();
		var zero:Vec3 = new Vec3();
		while (rb != null) {
			rb.getPositionTo(pos);
			if (pos.y < thresholdY) {
				pos.y = toY;
				pos.x = MathUtil.randIn(-1, 1) * rangeX;
				pos.z = MathUtil.randIn(-1, 1) * rangeZ;
				rb.setPosition(pos);
				rb.setLinearVelocity(zero);
			}
			rb = rb.getNext();
		}
	}

	public function update():Void {
		count++;
		updateMouseJoint();
	}

	public function drawAdditionalObjects(debugDraw:DebugDraw):Void {
	}

	function updateMouseJoint():Void {
		var cameraPos:Vec3 = renderer.getCameraPosition(); // camera

		var screenX:Float = input.mouseX / viewInfo.width - 0.5;
		var screenY:Float = 0.5 - input.mouseY / viewInfo.height;

		var screenPos:Vec3 = new Vec3(screenX * viewInfo.screenWidth, screenY * viewInfo.screenHeight, -viewInfo.screenDistance);

		var viewMat:Mat4 = renderer.getViewMatrix();
		viewMat.transposeEq();
		viewMat.e03 = 0; // remove translations
		viewMat.e13 = 0;
		viewMat.e23 = 0;
		viewMat.e33 = 0;
		screenPos.mulMat4Eq(viewMat).normalize();

		if (mouseJoint != null) {
			if (input.mouseL) {
				//var t:Float = grabbingDistance / screenPos.z;
				mouseJointDummyBody.setPosition(cameraPos.add(screenPos.scale(grabbingDistance)));
				mouseJoint.getRigidBody1().wakeUp();
				mouseJoint.getRigidBody2().wakeUp();
			} else {
				world.removeJoint(mouseJoint);
				mouseJoint = null;
			}
		} else {
			if (input.mouseL && !input.pmouseL) { // clicked
				// ray casting
				var end:Vec3 = cameraPos.add(screenPos.scale(500));

				var closest:RayCastClosest = new RayCastClosest();
				world.rayCast(cameraPos, end, closest);

				if (!closest.hit) return;

				var body:RigidBody = closest.shape.getRigidBody();
				var position:Vec3 = closest.position;

				if (body == null || body.getType() != RigidBodyType.DYNAMIC) return;

				var jc:SphericalJointConfig = new SphericalJointConfig();
				jc.springDamper.frequency = 4.0;
				jc.springDamper.dampingRatio = 1;
				jc.rigidBody1 = body;
				jc.rigidBody2 = mouseJointDummyBody;
				jc.allowCollision = false;
				jc.localAnchor1 = position.sub(body.getPosition());
				jc.localAnchor1.mulMat3Eq(body.getRotation().transposeEq());
				jc.localAnchor2.zero();
				mouseJointDummyBody.setPosition(position);
				mouseJoint = new SphericalJoint(jc);
				world.addJoint(mouseJoint);
				grabbingDistance = position.sub(cameraPos).length();
			}
		}
	}

	public function draw():Void {
		renderer.draw(this);
	}

	public function additionalInfo():String {
		return "";
	}
}
