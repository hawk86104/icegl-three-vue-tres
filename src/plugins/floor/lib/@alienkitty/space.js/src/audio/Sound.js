/**
 * @author pschroen / https://ufo.ai/
 */

import { WebAudioParam } from './WebAudioParam.js';

export class Sound {
    constructor(parent, id, buffer, bypass) {
        this.parent = parent;
        this.context = parent.context;
        this.id = id;
        this.buffer = buffer;
        this.loop = false;
        this.isPlaying = false;
        this.isStopping = false;

        this.output = this.context.createGain();
        this.output.connect(parent.input);

        if (!bypass) {
            this.stereo = this.context.createStereoPanner();
            this.stereo.connect(this.output);
        }

        this.gain = new WebAudioParam(this, 'output', 'gain', 0);
        this.stereoPan = new WebAudioParam(this, 'stereo', 'pan', 0);
        this.playbackRate = new WebAudioParam(this, 'source', 'playbackRate', 1);

        this.input = this.stereo || this.output;

        if (!navigator.maxTouchPoints || this.context.state === 'running') {
            this.load();
        }
    }

    load() {
        if (this.buffer instanceof ArrayBuffer) {
            const promise = this.context.decodeAudioData(this.buffer.slice()).then(buffer => {
                this.buffer = buffer;
            });

            this.ready = () => promise;
        } else {
            this.ready = () => Promise.resolve();
        }
    }

    play(startTime = this.context.currentTime + 0.01) {
        if (this.element) {
            this.element.loop = this.loop;
            this.element.play();
        }

        if (!this.ready) {
            this.load();
        }

        this.context.resume().then(this.ready).then(() => {
            if (!this.context) {
                return;
            }

            this.output.gain.setTargetAtTime(this.gain.value, startTime, 0.1);

            if (this.stereo) {
                this.stereo.pan.setValueAtTime(this.stereoPan.value, startTime);
            }

            if (!this.element) {
                if (this.isStopping && this.loop) {
                    this.isStopping = false;
                    return;
                }

                this.source = this.context.createBufferSource();
                this.source.buffer = this.buffer;
                this.source.loop = this.loop;
                this.source.playbackRate.setValueAtTime(this.playbackRate.value, startTime);
                this.source.connect(this.input);
                this.source.start(startTime);
            }

            this.isPlaying = true;
        });
    }

    stop() {
        if (this.element) {
            this.element.pause();
        } else if (this.source) {
            this.source.stop();
        }

        this.isPlaying = false;
    }

    destroy() {
        if (this.element) {
            this.element.pause();
            this.element.src = '';
            this.source.disconnect();
        } else if (this.source) {
            this.source.stop();
            this.source.buffer = null;
            this.source.disconnect();
        }

        for (const prop in this) {
            this[prop] = null;
        }

        return null;
    }
}
