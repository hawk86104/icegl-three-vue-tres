package oimo.dynamics.common;
import oimo.common.Vec3;

/**
 * Style settings of the debug draw.
 */
class DebugDrawStyle {
	public var shapeColor1:Vec3 = new Vec3(0.7, 0.2, 0.4);
	public var shapeColor2:Vec3 = new Vec3(1.0, 0.8, 0.1);
	public var sleepyShapeColor1:Vec3 = new Vec3(0.5, 0.25, 0.6);
	public var sleepyShapeColor2:Vec3 = new Vec3(0.6, 0.8, 0.3);
	public var sleepingShapeColor1:Vec3 = new Vec3(0.3, 0.3, 0.8);
	public var sleepingShapeColor2:Vec3 = new Vec3(0.2, 0.8, 0.5);
	public var staticShapeColor:Vec3 = new Vec3(0.7, 0.7, 0.7);
	public var kinematicShapeColor:Vec3 = new Vec3(1.0, 0.5, 0.1);

	public var aabbColor:Vec3 = new Vec3(1.0, 0.1, 0.1);
	public var bvhNodeColor:Vec3 = new Vec3(0.4, 0.4, 0.4);

	public var pairColor:Vec3 = new Vec3(1.0, 1.0, 0.1);

	public var contactColor:Vec3 = new Vec3(1.0, 0.1, 0.1);
	public var contactColor2:Vec3 = new Vec3(1.0, 0.6, 0.1);
	public var contactColor3:Vec3 = new Vec3(0.1, 0.8, 0.6);
	public var contactColor4:Vec3 = new Vec3(0.8, 0.1, 1.0);
	public var newContactColor:Vec3 = new Vec3(1.0, 1.0, 0.1);
	public var disabledContactColor:Vec3 = new Vec3(0.5, 0.1, 0.1);

	public var contactNormalColor:Vec3 = new Vec3(1.0, 0.1, 0.1);
	public var contactTangentColor:Vec3 = new Vec3(0.1, 0.8, 0.1);
	public var contactBinormalColor:Vec3 = new Vec3(0.2, 0.2, 1.0);
	public var contactNormalLength:Float = 0.5;
	public var contactTangentLength:Float = 0.5;
	public var contactBinormalLength:Float = 0.5;

	public var jointLineColor:Vec3 = new Vec3(0.8, 0.8, 0.8);
	public var jointErrorColor:Vec3 = new Vec3(1.0, 0.1, 0.1);
	public var jointRotationalConstraintRadius:Float = 0.3;

	public var basisLength:Float = 0.5;
	public var basisColorX:Vec3 = new Vec3(1.0, 0.0, 0.0);
	public var basisColorY:Vec3 = new Vec3(0.0, 1.0, 0.0);
	public var basisColorZ:Vec3 = new Vec3(0.0, 0.0, 1.0);

	/**
	 * Default constructor.
	 */
	public function new() {
	}

}
