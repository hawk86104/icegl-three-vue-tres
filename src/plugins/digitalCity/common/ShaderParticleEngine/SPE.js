/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-06 12:02:53
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-06 12:24:12
 */
/**
 * @typedef {Number} distribution
 * @property {Number} SPE.distributions.BOX Values will be distributed within a box.
 * @property {Number} SPE.distributions.SPHERE Values will be distributed within a sphere.
 * @property {Number} SPE.distributions.DISC Values will be distributed within a 2D disc.
 */

/**
 * Namespace for Shader Particle Engine.
 *
 * All SPE-related code sits under this namespace.
 *
 * @type {Object}
 * @namespace
 */
const SPE = {

    /**
     * A map of supported distribution types used
     * by SPE.Emitter instances.
     *
     * These distribution types can be applied to
     * an emitter globally, which will affect the
     * `position`, `velocity`, and `acceleration`
     * value calculations for an emitter, or they
     * can be applied on a per-property basis.
     *
     * @enum {Number}
     */
    distributions: {
        /**
         * Values will be distributed within a box.
         * @type {Number}
         */
        BOX: 1,

        /**
         * Values will be distributed on a sphere.
         * @type {Number}
         */
        SPHERE: 2,

        /**
         * Values will be distributed on a 2d-disc shape.
         * @type {Number}
         */
        DISC: 3,

        /**
         * Values will be distributed along a line.
         * @type {Number}
         */
        LINE: 4
    },


    /**
     * Set this value to however many 'steps' you
     * want value-over-lifetime properties to have.
     *
     * It's adjustable to fix an interpolation problem:
     *
     * Assuming you specify an opacity value as [0, 1, 0]
     *      and the `valueOverLifetimeLength` is 4, then the
     *      opacity value array will be reinterpolated to
     *      be [0, 0.66, 0.66, 0].
     *   This isn't ideal, as particles would never reach
     *   full opacity.
     *
     * NOTE:
     *     This property affects the length of ALL
     *       value-over-lifetime properties for ALL
     *       emitters and ALL groups.
     *
     *     Only values >= 3 && <= 4 are allowed.
     *
     * @type {Number}
     */
    valueOverLifetimeLength: 4
};

// Module loader support:
if (typeof define === 'function' && define.amd) {
    define('spe', SPE);
}
else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    module.exports = SPE;
}
export { SPE };
