package com.element.oimo.physics.collision.shape {
	import com.element.oimo.math.Mat33;
	/**
	 * This class holds mass information of a shape.
	 * @author saharan
	 */
	public class MassInfo {
		/**
		 * Mass of the shape.
		 */
		public var mass:Number;
		
		/**
		 * The moment inertia of the shape.
		 */
		public var inertia:Mat33;
		
		public function MassInfo() {
			mass = 0;
			inertia = new Mat33();
		}
		
	}

}