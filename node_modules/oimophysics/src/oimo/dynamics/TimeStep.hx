package oimo.dynamics;

/**
 * Information of time-step sizes of the simulation.
 */
class TimeStep {
	/**
	 * The time step of simulation.
	 */
	public var dt:Float;

	/**
	 * The inverse time step of simulation, equivalent to simulation FPS.
	 */
	public var invDt:Float;

	/**
	 * The ratio of time steps. Defined by current time step divided by previous
	 * time step.
	 */
	public var dtRatio:Float;

	@:dox(hide)
	public function new() {
		dt = 0;
		invDt = 0;
		dtRatio = 1;
	}

}
