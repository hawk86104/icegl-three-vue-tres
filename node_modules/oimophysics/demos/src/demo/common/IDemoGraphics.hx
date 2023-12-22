package demo.common;
import oimo.dynamics.common.DebugDraw;
import oimo.common.Mat4;
import oimo.common.Vec3;
import oimo.physics.debugdraw.*;

/**
 * DebugDraw with transformation matrices. Used to render a demo world.
 */
interface IDemoGraphics {
	/**
	 * Begins rendering with the background `color`.
	 */
	public function begin(color:Vec3):Void;

	/**
	 * Ends rendering.
	 */
	public function end():Void;

	/**
	 * Returns the debug draw instance using.
	 */
	public function getDebugDraw():DebugDraw;

	/**
	 * Sets the view transformation matrix to `matrix`.
	 */
	public function setViewMatrix(matrix:Mat4):Void;

	/**
	 * Sets the projection transformation matrix to `matrix`.
	 */
	public function setProjectionMatrix(matrix:Mat4):Void;
}
