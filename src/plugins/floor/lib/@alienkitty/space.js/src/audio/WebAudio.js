/**
 * @author pschroen / https://ufo.ai/
 */

import { WebAudioParam } from './WebAudioParam.js';
import { Sound } from './Sound.js';

import { tween } from '../tween/Tween.js';
import { basename } from '../utils/Utils.js';

export class WebAudio {
    static path = '';
    static crossOrigin = 'anonymous';

    static init(options) {
        this.context = new AudioContext(options);
        this.sounds = {};

        this.output = this.context.createGain();
        this.output.connect(this.context.destination);

        this.gain = new WebAudioParam(this, 'output', 'gain', 1);

        this.input = this.output;
    }

    static get enabled() {
        return this.context.state === 'running';
    }

    static load(files = {}) {
        for (const path in files) {
            this.add(this, basename(path), files[path]);
        }
    }

    static add(parent, id, buffer, bypass) {
        if (typeof parent === 'string') {
            bypass = buffer;
            buffer = id;
            id = parent;
            parent = this;
        }

        let sound;

        if (typeof buffer === 'string') {
            sound = new Sound(parent, id, null, bypass);

            const audio = new Audio();
            audio.crossOrigin = this.crossOrigin;
            audio.autoplay = false;
            audio.loop = sound.loop;
            audio.src = this.getPath(buffer);

            sound.source = this.context.createMediaElementSource(audio);
            sound.source.connect(sound.input);
            sound.element = audio;
        } else {
            sound = new Sound(parent, id, buffer, bypass);
        }

        this.sounds[id] = sound;

        return sound;
    }

    static get(id) {
        return this.sounds[id];
    }

    static remove(id) {
        const sound = this.sounds[id];

        if (sound) {
            sound.destroy();
        }

        delete this.sounds[id];
    }

    static clone(parent, from, to, bypass) {
        if (typeof parent === 'string') {
            bypass = to;
            to = from;
            from = parent;
            parent = this;
        }

        const sound = this.sounds[from];

        if (sound) {
            return this.add(parent, to, sound.buffer, bypass);
        }

        return sound;
    }

    static trigger(id) {
        const sound = this.sounds[id];

        if (sound) {
            sound.play();
        }

        return sound;
    }

    static play(id, volume = 1, loop) {
        if (typeof volume !== 'number') {
            loop = volume;
            volume = 1;
        }

        const sound = this.sounds[id];

        if (sound) {
            sound.gain.set(volume);
            sound.loop = loop;

            this.trigger(id);
        }

        return sound;
    }

    static fadeInAndPlay(id, volume, loop, duration, ease, delay = 0, complete, update) {
        if (typeof delay !== 'number') {
            update = complete;
            complete = delay;
            delay = 0;
        }

        const sound = this.sounds[id];

        if (sound) {
            sound.gain.set(0);
            sound.loop = loop;

            this.trigger(id);

            sound.ready().then(() => {
                tween(sound.gain, { value: volume }, duration, ease, delay, complete, update);
            });
        }

        return sound;
    }

    static fadeOutAndStop(id, duration, ease, delay = 0, complete, update) {
        if (typeof delay !== 'number') {
            update = complete;
            complete = delay;
            delay = 0;
        }

        const sound = this.sounds[id];

        if (sound) {
            sound.ready().then(() => {
                tween(sound.gain, { value: 0 }, duration, ease, delay, () => {
                    if (!sound.isStopping) {
                        return;
                    }

                    sound.isStopping = false;
                    sound.stop();

                    if (complete) {
                        complete();
                    }
                }, update);
            });

            sound.isStopping = true;
        }

        return sound;
    }

    static mute(instant) {
        if (instant) {
            this.gain.set(0);
        } else {
            this.gain.fade(0, 300);
        }
    }

    static unmute(instant) {
        if (instant) {
            this.gain.set(1);
        } else {
            this.gain.fade(1, 500);
        }
    }

    static resume() {
        this.context.resume();
    }

    static getPath(path) {
        return this.path + path;
    }

    static setPath(path) {
        this.path = path;

        return this;
    }

    static setCrossOrigin(crossOrigin) {
        this.crossOrigin = crossOrigin;

        return this;
    }

    static destroy() {
        for (const id in this.sounds) {
            if (this.sounds[id] && this.sounds[id].destroy) {
                this.sounds[id].destroy();
            }
        }

        this.context.close();

        for (const prop in this) {
            this[prop] = null;
        }

        return null;
    }
}
