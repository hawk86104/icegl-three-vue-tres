export class PhysicsController {
    static init(physics) {
        this.physics = physics;

        this.enabled = false;
    }

    // Public methods

    static update = () => {
        if (!this.enabled) {
            return;
        }

        this.physics.step();
    };
}
