/**
 * @author pschroen / https://ufo.ai/
 *
 * Based on https://github.com/mrdoob/three.js/blob/dev/src/math/Vector2.js
 */

export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;

        this.isVector2 = true;
    }

    set(x, y) {
        this.x = x;
        this.y = y;

        return this;
    }

    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;

        return this;
    }

    setX(x) {
        this.x = x;

        return this;
    }

    setY(y) {
        this.y = y;

        return this;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    copy(v) {
        this.x = v.x;
        this.y = v.y;

        return this;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;

        return this;
    }

    addScalar(scalar) {
        this.x += scalar;
        this.y += scalar;

        return this;
    }

    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;
    }

    addScaledVector(v, scalar) {
        this.x += v.x * scalar;
        this.y += v.y * scalar;

        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    }

    subScalar(scalar) {
        this.x -= scalar;
        this.y -= scalar;

        return this;
    }

    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;
    }

    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;

        return this;
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    divide(v) {
        this.x /= v.x;
        this.y /= v.y;

        return this;
    }

    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    cross(v) {
        return this.x * v.y - this.y * v.x;
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        return this.divideScalar(this.length() || 1);
    }

    angle() {
        return Math.atan2(-this.y, -this.x) + Math.PI;
    }

    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;

        return dx * dx + dy * dy;
    }

    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }

    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;

        return this;
    }

    lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;

        return this;
    }

    equals(v) {
        return v.x === this.x && v.y === this.y;
    }

    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];

        return this;
    }

    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;

        return array;
    }
}
