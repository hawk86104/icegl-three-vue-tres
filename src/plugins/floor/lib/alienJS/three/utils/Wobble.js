/**
 * @author pschroen / https://ufo.ai/
 */

import { Vector3 } from 'three';

import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';

export class Wobble {
    constructor(position) {
        this.position = position;
        this.origin = new Vector3();
        this.target = new Vector3();
        this.perlin = new ImprovedNoise();
        this.frequency = new Vector3(1, 1, 1);
        this.amplitude = new Vector3(1, 1, 1);
        this.scale = 1;
        this.lerpSpeed = 0.02;

        if (this.position) {
            this.origin.copy(this.position);
        }
    }

    update(time) {
        this.target.x = this.perlin.noise(time * this.frequency.x, 1, 1) * this.amplitude.x;
        this.target.y = this.perlin.noise(1, time * this.frequency.y, 1) * this.amplitude.y;
        this.target.z = this.perlin.noise(1, 1, time * this.frequency.z) * this.amplitude.z;

        this.target.multiplyScalar(this.scale);
        this.target.add(this.origin);

        if (this.position) {
            this.position.lerp(this.target, this.lerpSpeed);
        }
    }
}
