package demo.core;
import demo.common.*;
import oimo.collision.geometry.*;
import oimo.common.*;
import oimo.dynamics.*;
import oimo.dynamics.rigidbody.*;
import oimo.physics.*;

/**
 * Collision filtering demo
 */
class CollisionFilteringDemo extends DemoBase {
	// collision groups
	static inline var G_FLOOR:Int = 1;
	static inline var G_WALL:Int = 2;
	static inline var G_BALL:Int = 4;
	static inline var G_BOX:Int = 8;

	public function new() {
		super("Collision Filtering");
	}

	override public function init(world:World, renderer:DemoRenderer, input:UserInput, viewInfo:ViewInfo):Void {
		super.init(world, renderer, input, viewInfo);
		renderer.camera(new Vec3(0, 7, 9), new Vec3(0, 2, 0), new Vec3(0, 1, 0));

		var thickness:Float = 0.5;
		var floorShape:Shape = OimoUtil.addBox(world, new Vec3(0, -thickness, 0), new Vec3(7, thickness, 7), true).getShapeList();
		floorShape.setCollisionGroup(G_FLOOR); // belongs to group FLOOR
		floorShape.setCollisionMask(G_BOX);    // collides to group BOX

		var wallShape:Shape = OimoUtil.addBox(world, new Vec3(0, 2, 0), new Vec3(3, 0.2, 3), true).getShapeList();
		wallShape.setCollisionGroup(G_WALL); // belongs to group WALL
		wallShape.setCollisionMask(G_BALL);  // collides to group BALL

		var w:Int = 2;
		var h:Int = 2;
		var n:Int = 2;
		var size:Float = 0.3;
		for (i in 0...n) {
			for (j in -w...w + 1) {
				for (k in -h...h + 1) {
					var pos:Vec3 = new Vec3(j * size * 3, 3 + i * size * 3, k * size * 3);
					pos.addEq(MathUtil.randVec3In(-0.01, 0.01));
					var shape:Shape;
					if (i == 0) {
						shape = OimoUtil.addSphere(world, pos, size, false).getShapeList();
						shape.setCollisionGroup(G_BALL);                 // belongs to group BALL
						shape.setCollisionMask(G_WALL | G_BALL | G_BOX); // collides to group WALL, BALL and BOX
					} else {
						shape = OimoUtil.addBox(world, pos, new Vec3(size, size, size), false).getShapeList();
						shape.setCollisionGroup(G_BOX);                   // belongs to group BOX
						shape.setCollisionMask(G_FLOOR | G_BALL | G_BOX); // collides to group FLOOR, BALL and BOX
					}
				}
			}
		}
	}

	override public function update():Void {
		super.update();
		teleportRigidBodies(-20, 10, 5, 5);
	}
}
