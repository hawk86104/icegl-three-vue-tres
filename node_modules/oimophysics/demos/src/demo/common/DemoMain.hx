package demo.common;
import demo.core.*;
import haxe.*;
import haxe.ds.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.common.*;
import oimo.math.*;
import oimo.physics.*;
import oimo.physics.debugdraw.*;

/**
 * OimoPhysics demo box.
 */
class DemoMain {
	/**
	 * Information text to be drawn.
	 */
	public var text:String;

	var nmouseX:Float;
	var nmouseY:Float;
	var nmouseL:Bool;
	var nmouseR:Bool;

	var nkeyboard:Vector<Bool>;

	var currentDemo:DemoBase;
	var currentDemoIndex:Int;

	var world:World;
	var renderer:DemoRenderer;
	var g:IDemoGraphics;

	var input:UserInput;
	var viewInfo:ViewInfo;

	var width:Int;
	var height:Int;

	var demos:Array<DemoBase>;

	var count:Int;

	var pause:Bool;
	var singleStep:Bool;

	var controls:Array<Control>;

	var fpsCount:Int;
	var fpsTime:Float;
	var fps:Int;

	public function new(width:Int, height:Int) {
		this.width = width;
		this.height = height;
		input = new UserInput();
		viewInfo = new ViewInfo();

		nmouseX = 0;
		nmouseY = 0;
		fpsTime = Timer.stamp();
		fpsCount = 0;
		fps = 0;
		pause = false;
		singleStep = false;
		nkeyboard = new Vector<Bool>(UserInput.KEYBOARD_LENGTH);
		for (i in 0...UserInput.KEYBOARD_LENGTH) {
			nkeyboard[i] = false;
		}

		text = "";

		createDemos();
	}

	function createDemos():Void {
		demos = [
			new BasicDemo(),
			new CompoundShapesDemo(),
			new FrictionsAndRestitutions(),
			new CollisionFilteringDemo(),
			new ConvexHullDemo(),
			new VerticalStackingDemo(),
			new LimitRotationDemo(),
			new BroadPhaseStressDemo(),
			new BridgeDemo(),
			new SpringsDemo(),
			new JointsDemo(),
			new BreakableJointDemo(),
			new RagdollDemo(),
			new FallingRagdollDemo(),
			new VariableTimeStepDemo(),
			new GearsDemo(),
			new RayCastingDemo(),
			new ConvexCastingDemo(),
		];
		currentDemoIndex = 0;
		currentDemo = demos[0];
	}

	public function init(graphics:IDemoGraphics):Void {
		g = graphics;
		renderer = new DemoRenderer(null, g);

		var aspectRatio:Float = width / height;

		var fov:Float = 60 * MathUtil.TO_RADIANS;
		var fovY:Float = Math.max(fov, Math.atan(Math.tan(fov / 2) / aspectRatio) * 2);

		renderer.perspective(fovY, aspectRatio);

		// set viewport infomation for ray casting
		viewInfo.width = width;
		viewInfo.height = height;
		viewInfo.screenDistance = 1;
		viewInfo.screenHeight = 2 * MathUtil.tan(fovY * 0.5);
		viewInfo.screenWidth = viewInfo.screenHeight * aspectRatio;

		initDemo();
	}

	function initDemo():Void {
		world = new World();
		renderer.setWorld(world);
		renderer.getGraphics().getDebugDraw().style = new DebugDrawStyle(); // reset style
		initControls();
		currentDemo.init(world, renderer, input, viewInfo);
		count = 0;
	}

	function initControls():Void {
		var dd:DebugDraw = g.getDebugDraw();

		controls = [];
		controls = controls.concat([
			new Control(
				"Q",
				() -> "previous demo",
				"Q".charCodeAt(0),
				() -> changeDemo(-1)
			),
			new Control(
				"E",
				() -> "next demo",
				"E".charCodeAt(0),
				() -> changeDemo(1)
			),
			new Control(
				"ENTER",
				() -> pause ? "resume" : "pause",
				UserInput.KEYCODE_ENTER,
				() -> pause = !pause
			),
			new Control(
				"P",
				() -> pause ? "compute single step" : "---",
				"P".charCodeAt(0),
				() -> if (pause) singleStep = true
			),
			new Control(
				"W",
				() -> (dd.wireframe ? "solid" : "wireframe") + " mode",
				"W".charCodeAt(0),
				() -> dd.wireframe = !dd.wireframe
			),
			new Control(
				"L",
				() -> (Setting.disableSleeping ? "enable" : "disable") + " sleeping",
				"L".charCodeAt(0),
				() -> Setting.disableSleeping = !Setting.disableSleeping
			),
			new Control(
				"R",
				() -> (dd.drawPairs ? "hide" : "draw") + " pairs",
				"R".charCodeAt(0),
				() -> dd.drawPairs = !dd.drawPairs
			),
			new Control(
				"V",
				() -> (dd.drawAabbs ? "hide" : "draw") + " AABBs",
				"V".charCodeAt(0),
				() -> dd.drawAabbs = !dd.drawAabbs
			),
			new Control(
				"B",
				() -> (dd.drawBases ? "hide" : "draw") + " bases",
				"B".charCodeAt(0),
				() -> dd.drawBases = !dd.drawBases
			),
			new Control(
				"C",
				() -> (dd.drawContacts ? "hide" : "draw") + " contacts",
				"C".charCodeAt(0),
				() -> dd.drawContacts = !dd.drawContacts
			),
			new Control(
				"J",
				() -> (dd.drawJoints ? "hide" : "draw") + " joints",
				"J".charCodeAt(0),
				() -> dd.drawJoints = !dd.drawJoints
			),
			new Control(
				"K",
				() -> (dd.drawJointLimits ? "hide" : "draw") + " joint limits",
				"K".charCodeAt(0),
				() -> dd.drawJointLimits = !dd.drawJointLimits
			),
			new Control(
				"A",
				() -> (dd.drawContactBases ? "hide" : "draw") + " contact bases",
				"A".charCodeAt(0),
				() -> dd.drawContactBases = !dd.drawContactBases
			),
			new Control(
				"T",
				() -> (dd.drawBvh ? "hide" : "draw") + " AABB tree",
				"T".charCodeAt(0),
				() -> dd.drawBvh = !dd.drawBvh
			),
			new Control(
				"S",
				() -> (dd.drawShapes ? "hide" : "draw") + " shapes",
				"S".charCodeAt(0),
				() -> dd.drawShapes = !dd.drawShapes
			)
		]);
		currentDemo.initControls(controls);
	}

	/**
	 * Main loop, steps simulation.
	 */
	public function loop():Void {
		count++;
		input.pmouseX = input.mouseX;
		input.pmouseY = input.mouseY;
		input.pmouseL = input.mouseL;
		input.pmouseR = input.mouseR;
		input.mouseX = nmouseX;
		input.mouseY = nmouseY;
		input.mouseL = nmouseL;
		input.mouseR = nmouseR;
		for (i in 0...UserInput.KEYBOARD_LENGTH) {
			input.pkeyboard[i] = input.keyboard[i];
			input.keyboard[i] = nkeyboard[i];
		}

		control();
		currentDemo.update();
		if (!pause || singleStep) {
			world.step(currentDemo.dt);
			singleStep = false;
		}
		var drawBegin:Float = Timer.stamp();
		currentDemo.draw();
		var drawEnd:Float = Timer.stamp();
		var drawTime:Float = (drawEnd - drawBegin) * 1000;

		var currentTime:Float = Timer.stamp();
		fpsCount++;
		if (fpsTime + 1 < currentTime) {
			fps = fpsCount;
			fpsTime += 1;
			fpsCount = 0;
		}

		text =
			'${currentDemo.demoName} - ${pause ? "Paused" : "Running"}\n' +
			'------------\n' +
			'Profile\n' +
			'  Rigid Bodies  : ${world.getNumRigidBodies()}\n' +
			'  Joints        : ${world.getNumJoints()}\n' +
			'  Shapes        : ${world.getNumShapes()}\n' +
			'  Pairs         : ${world.getContactManager().getNumContacts()}\n' +
			'------------\n' +
			'Performance\n' +
			'  Broad Phase  : ${Math.round(Performance.broadPhaseCollisionTime)}ms\n' +
			'  Narrow Phase : ${Math.round(Performance.narrowPhaseCollisionTime)}ms\n' +
			'  Dynamics     : ${Math.round(Performance.dynamicsTime)}ms\n' +
			'  Physics Total: ${Math.round(Performance.totalTime)}ms\n' +
			'  Rendering    : ${Math.round(drawTime)}ms\n' +
			'  Actual FPS   : $fps\n' +
			'------------\n' +
			'Control\n' +
			'${createKeyDescriptions("  ")}' +
			'------------\n' +
			'Misc. Info\n' +
			'${additionalInfo()}' +
			'\n'
		;
		Vec3.numCreations = 0;
		Mat3.numCreations = 0;
		Quat.numCreations = 0;
	}

	function createKeyDescriptions(prefix:String):String {
		var res:String = "";
		for (control in controls) {
			res += '$prefix${control.keyText}: ${control.description()}\n';
		}
		return res;
	}

	function additionalInfo():String {
		return currentDemo.additionalInfo();
	}

	function control():Void {
		for (control in controls) {
			if (input.isKeyPressed(control.keyCode)) {
				control.onAction();
			}
		}
	}

	public function changeDemo(offset:Int):Void {
		var num:Int = demos.length;
		currentDemoIndex = ((currentDemoIndex + offset) % num + num) % num;
		currentDemo = demos[currentDemoIndex];
		initDemo();
	}

	public function mouseMoved(x:Float, y:Float):Void {
		nmouseX = x;
		nmouseY = y;
	}

	public function mouseLPressed():Void {
		nmouseL = true;
	}

	public function mouseRPressed():Void {
		nmouseR = true;
	}

	public function mouseLReleased():Void {
		nmouseL = false;
	}

	public function mouseRReleased():Void {
		nmouseR = false;
	}

	public function keyPressed(keyCode:Int):Void {
		if (keyCode < 0 || keyCode >= UserInput.KEYBOARD_LENGTH) return;
		nkeyboard[keyCode] = true;
	}

	public function keyReleased(keyCode:Int):Void {
		if (keyCode < 0 || keyCode >= UserInput.KEYBOARD_LENGTH) return;
		nkeyboard[keyCode] = false;
	}

	public function action(index:Int):Void {
		if (index >= 0 && index < controls.length) {
			controls[index].onAction();
		}
	}
}
