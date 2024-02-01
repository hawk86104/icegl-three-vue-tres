/**
 * @author pschroen / https://ufo.ai/
 *
 * Based on https://github.com/mrdoob/three.js/blob/dev/src/math/Color.js
 */

import { clamp, euclideanModulo, lerp } from '../utils/Utils.js';

export class Color {
    constructor(r, g, b) {
        this.r = 1;
        this.g = 1;
        this.b = 1;

        this.isColor = true;

        this.hslA = { h: 0, s: 0, l: 0 };
        this.hslB = { h: 0, s: 0, l: 0 };

        if (g === undefined && b === undefined) {
            this.set(r);
        } else {
            this.setRGB(r, g, b);
        }
    }

    hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
        return p;
    }

    set(value) {
        if (value && value.isColor) {
            this.copy(value);
        } else if (typeof value === 'number') {
            this.setHex(value);
        } else if (typeof value === 'string') {
            this.setStyle(value);
        }

        return this;
    }

    setScalar(scalar) {
        this.r = scalar;
        this.g = scalar;
        this.b = scalar;

        return this;
    }

    setHex(hex) {
        hex = Math.floor(hex);

        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;

        return this;
    }

    setRGB(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;

        return this;
    }

    setHSL(h, s, l) {
        h = euclideanModulo(h, 1);
        s = clamp(s, 0, 1);
        l = clamp(l, 0, 1);

        if (s === 0) {
            this.r = this.g = this.b = l;
        } else {
            const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
            const q = 2 * l - p;

            this.r = this.hue2rgb(q, p, h + 1 / 3);
            this.g = this.hue2rgb(q, p, h);
            this.b = this.hue2rgb(q, p, h - 1 / 3);
        }

        return this;
    }

    setStyle(style) {
        const match = /^#([A-Fa-f\d]+)$/.exec(style);

        if (match) {
            const str = match[1];
            const size = str.length;

            if (size === 3) {
                this.r = parseInt(str.charAt(0) + str.charAt(0), 16) / 255;
                this.g = parseInt(str.charAt(1) + str.charAt(1), 16) / 255;
                this.b = parseInt(str.charAt(2) + str.charAt(2), 16) / 255;
            } else if (size === 6) {
                this.r = parseInt(str.charAt(0) + str.charAt(1), 16) / 255;
                this.g = parseInt(str.charAt(2) + str.charAt(3), 16) / 255;
                this.b = parseInt(str.charAt(4) + str.charAt(5), 16) / 255;
            }
        }

        return this;
    }

    clone() {
        return new Color(this.r, this.g, this.b);
    }

    copy(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;

        return this;
    }

    getHex() {
        return this.r * 255 << 16 ^ this.g * 255 << 8 ^ this.b * 255 << 0;
    }

    getHexString() {
        return ('000000' + this.getHex().toString(16)).slice(-6);
    }

    getHSL(target) {
        const r = this.r;
        const g = this.g;
        const b = this.b;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let hue, saturation;
        const lightness = (min + max) / 2;

        if (min === max) {
            hue = 0;
            saturation = 0;
        } else {
            const delta = max - min;

            saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);

            switch (max) {
                case r: hue = (g - b) / delta + (g < b ? 6 : 0); break;
                case g: hue = (b - r) / delta + 2; break;
                case b: hue = (r - g) / delta + 4; break;
            }

            hue /= 6;
        }

        target.h = hue;
        target.s = saturation;
        target.l = lightness;

        return target;
    }

    offsetHSL(h, s, l) {
        this.getHSL(this.hslA);

        this.hslA.h += h;
        this.hslA.s += s;
        this.hslA.l += l;

        this.setHSL(this.hslA.h, this.hslA.s, this.hslA.l);

        return this;
    }

    add(color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;

        return this;
    }

    addColors(color1, color2) {
        this.r = color1.r + color2.r;
        this.g = color1.g + color2.g;
        this.b = color1.b + color2.b;

        return this;
    }

    addScalar(scalar) {
        this.r += scalar;
        this.g += scalar;
        this.b += scalar;

        return this;
    }

    sub(color) {
        this.r = Math.max(0, this.r - color.r);
        this.g = Math.max(0, this.g - color.g);
        this.b = Math.max(0, this.b - color.b);

        return this;
    }

    multiply(color) {
        this.r *= color.r;
        this.g *= color.g;
        this.b *= color.b;

        return this;
    }

    multiplyScalar(scalar) {
        this.r *= scalar;
        this.g *= scalar;
        this.b *= scalar;

        return this;
    }

    lerp(color, alpha) {
        this.r += (color.r - this.r) * alpha;
        this.g += (color.g - this.g) * alpha;
        this.b += (color.b - this.b) * alpha;

        return this;
    }

    lerpColors(color1, color2, alpha) {
        this.r = color1.r + (color2.r - color1.r) * alpha;
        this.g = color1.g + (color2.g - color1.g) * alpha;
        this.b = color1.b + (color2.b - color1.b) * alpha;

        return this;
    }

    lerpHSL(color, alpha) {
        this.getHSL(this.hslA);
        color.getHSL(this.hslB);

        const h = lerp(this.hslA.h, this.hslB.h, alpha);
        const s = lerp(this.hslA.s, this.hslB.s, alpha);
        const l = lerp(this.hslA.l, this.hslB.l, alpha);

        this.setHSL(h, s, l);

        return this;
    }

    equals(color) {
        return color.r === this.r && color.g === this.g && color.b === this.b;
    }

    fromArray(array, offset = 0) {
        this.r = array[offset];
        this.g = array[offset + 1];
        this.b = array[offset + 2];

        return this;
    }

    toArray(array = [], offset = 0) {
        array[offset] = this.r;
        array[offset + 1] = this.g;
        array[offset + 2] = this.b;

        return array;
    }
}
