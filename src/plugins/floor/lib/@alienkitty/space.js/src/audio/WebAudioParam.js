/**
 * @author pschroen / https://ufo.ai/
 */

export class WebAudioParam {
    constructor(parent, node, param, alpha) {
        this.parent = parent;
        this.node = node;
        this.param = param;
        this.alpha = alpha;

        this.set(this.alpha);
    }

    get value() {
        return this.alpha;
    }

    set value(value) {
        if (this.alpha === value) {
            return;
        }

        if (this.parent[this.node]) {
            const startTime = this.parent.context.currentTime + 0.01;

            this.parent[this.node][this.param].cancelScheduledValues(startTime);
            this.parent[this.node][this.param].setTargetAtTime(value, startTime, 0.1);
        }

        this.alpha = value;
    }

    set(value) {
        if (this.parent[this.node]) {
            const startTime = this.parent.context.currentTime;

            this.parent[this.node][this.param].cancelScheduledValues(startTime);
            this.parent[this.node][this.param].setValueAtTime(value, startTime);
        }

        this.alpha = value;
    }

    fade(value, duration, delay = 0) {
        if (this.parent[this.node]) {
            const startTime = this.parent.context.currentTime + delay;

            this.parent[this.node][this.param].cancelScheduledValues(startTime);
            this.parent[this.node][this.param].setTargetAtTime(value, startTime, duration * 0.001);
        }
    }
}
