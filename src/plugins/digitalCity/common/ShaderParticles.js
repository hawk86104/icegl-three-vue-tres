// ShaderParticleGroup 0.5.0
//
// (c) 2013 Luke Moody (http://www.github.com/squarefeet) & Lee Stemkoski (http://www.adelphi.edu/~stemkoski/)
//     Based on Lee Stemkoski's original work (https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/js/ParticleEngine.js).
//
// ShaderParticleGroup may be freely distributed under the MIT license (See LICENSE.txt)
import * as THREE from 'three'

export function ShaderParticleGroup (options) {
	const that = this;

	that.fixedTimeStep = parseFloat(options.fixedTimeStep || 0.016, 10);

	// Uniform properties ( applied to all particles )
	that.maxAge = parseFloat(options.maxAge || 3);
	that.texture = options.texture || null;
	that.hasPerspective = parseInt(typeof options.hasPerspective === 'number' ? options.hasPerspective : 1);
	that.colorize = parseInt(options.colorize || 1);

	// Material properties
	that.blending = typeof options.blending === 'number' ? options.blending : THREE.AdditiveBlending;
	that.transparent = options.transparent || true;
	that.alphaTest = options.alphaTest || 0.5;
	that.depthWrite = options.depthWrite || false;
	that.depthTest = options.depthTest || true;

	// Create uniforms
	that.uniforms = {
		duration: { type: 'f', value: that.maxAge },
		uTexture: { type: 't', value: that.texture },
		hasPerspective: { type: 'i', value: that.hasPerspective },
		colorize: { type: 'i', value: that.colorize }
	};

	// Create a map of attributes that will hold values for each particle in this group.
	that.attributes = {
		acceleration: { type: 'v3', value: [] },
		velocity: { type: 'v3', value: [] },
		alive: { type: 'f', value: [] },
		age: { type: 'f', value: [] },
		size: { type: 'f', value: [] },
		sizeEnd: { type: 'f', value: [] },

		customColor: { type: 'c', value: [] },
		customColorEnd: { type: 'c', value: [] },

		opacity: { type: 'f', value: [] },
		opacityMiddle: { type: 'f', value: [] },
		opacityEnd: { type: 'f', value: [] }
	};

	// Emitters (that aren't static) will be added to this array for 
	// processing during the `tick()` function.
	that.emitters = [];

	// Create properties for use by the emitter pooling functions.
	that._pool = [];
	that._poolCreationSettings = null;
	that._createNewWhenPoolEmpty = 0;
	that.maxAgeMilliseconds = that.maxAge * 1000;

	// Create an empty geometry to hold the particles.
	// Each particle is a vertex pushed into this geometry's
	// vertices array.
	that.geometry = new THREE.BufferGeometry()
	that.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))

	// Create the shader material using the properties we set above.
	that.material = new THREE.ShaderMaterial({
		uniforms: that.uniforms,
		vertexShader: ShaderParticleGroup.shaders.vertex,
		fragmentShader: ShaderParticleGroup.shaders.fragment,
		blending: that.blending,
		transparent: that.transparent,
		alphaTest: that.alphaTest,
		depthWrite: that.depthWrite,
		depthTest: that.depthTest,
	});

	// And finally create the ParticleSystem. It's got its `dynamic` property
	// set so that THREE.js knows to update it on each frame.
	that.mesh = new THREE.Points(that.geometry, that.material);
	// that.mesh.dynamic = true;
}

ShaderParticleGroup.prototype = {

	/**
	 * Given a base vector and a spread range vector, create
	 * a new THREE.Vector3 instance with randomised values.
	 *
	 * @private
	 * 
	 * @param  {THREE.Vector3} base
	 * @param  {THREE.Vector3} spread
	 * @return {THREE.Vector3}
	 */
	_randomVector3 (base, spread) {
		const v = new THREE.Vector3();

		v.copy(base);

		v.x += Math.random() * spread.x - (spread.x / 2);
		v.y += Math.random() * spread.y - (spread.y / 2);
		v.z += Math.random() * spread.z - (spread.z / 2);

		return v;
	},

	/**
	 * Create a new THREE.Color instance and given a base vector and 
	 * spread range vector, assign random values.
	 *
	 * Note that THREE.Color RGB values are in the range of 0 - 1, not 0 - 255.
	 *
	 * @private
	 * 
	 * @param  {THREE.Vector3} base
	 * @param  {THREE.Vector3} spread
	 * @return {THREE.Color}
	 */
	_randomColor (base, spread) {
		const v = new THREE.Color();

		v.copy(base);

		v.r += (Math.random() * spread.x) - (spread.x / 2);
		v.g += (Math.random() * spread.y) - (spread.y / 2);
		v.b += (Math.random() * spread.z) - (spread.z / 2);

		v.r = Math.max(0, Math.min(v.r, 1));
		v.g = Math.max(0, Math.min(v.g, 1));
		v.b = Math.max(0, Math.min(v.b, 1));

		return v;
	},


	/**
	 * Create a random Number value based on an initial value and 
	 * a spread range
	 *
	 * @private
	 * 
	 * @param  {Number} base
	 * @param  {Number} spread
	 * @return {Number}
	 */
	_randomFloat (base, spread) {
		return base + spread * (Math.random() - 0.5);
	},


	/**
	 * Create a new THREE.Vector3 instance and project it onto a random point
	 * on a sphere with radius `radius`.
	 * 
	 * @param  {THREE.Vector3} base
	 * @param  {Number} radius
	 * @param  {THREE.Vector3} scale
	 *
	 * @private
	 * 
	 * @return {THREE.Vector3}
	 */
	_randomVector3OnSphere (base, radius, scale) {
		const z = 2 * Math.random() - 1;
		const t = 6.2832 * Math.random();
		const r = Math.sqrt(1 - z * z);
		const vec = new THREE.Vector3(r * Math.cos(t), r * Math.sin(t), z);

		vec.multiplyScalar(radius);

		if (scale) {
			vec.multiply(scale);
		}

		vec.add(base);

		return vec;
	},


	/**
	 * Create a new THREE.Vector3 instance, and given a base position, and various
	 * other values, project it onto a random point on a sphere with radius `radius`.
	 * 
	 * @param  {THREE.Vector3} base
	 * @param  {THREE.Vector3} position
	 * @param  {Number} speed
	 * @param  {Number} speedSpread
	 * @param  {THREE.Vector3} scale
	 * @param  {Number} radius
	 *
	 * @private
	 * 
	 * @return {THREE.Vector3}
	 */
	_randomVelocityVector3OnSphere (base, position, speed, speedSpread, scale, radius) {
		const direction = new THREE.Vector3().subVectors(base, position);

		direction.normalize().multiplyScalar(this._randomFloat(speed, speedSpread));

		if (scale) {
			direction.multiply(scale);
		}

		return direction;
	},


	/**
	 * Given a base vector and a spread vector, randomise the given vector
	 * accordingly.
	 * 
	 * @param  {THREE.Vector3} vector
	 * @param  {THREE.Vector3} base
	 * @param  {THREE.Vector3} spread
	 *
	 * @private
	 * 
	 * @return {[type]}
	 */
	_randomizeExistingVector3 (vector, base, spread) {
		vector.set(
			Math.random() * base.x - spread.x,
			Math.random() * base.y - spread.y,
			Math.random() * base.z - spread.z
		);
	},


	/**
	 * Tells the age and alive attributes (and the geometry vertices) 
	 * that they need updating by THREE.js's internal tick functions.
	 * 
	 * @private
	 * 
	 * @return {this}
	 */
	_flagUpdate () {
		const that = this;

		// Set flags to update (causes less garbage than
		// ```ParticleSystem.sortParticles = true``` in THREE.r58 at least)
		that.attributes.age.needsUpdate = true;
		that.attributes.alive.needsUpdate = true;
		that.geometry.verticesNeedUpdate = true;

		return that;
	},


	/**
	 * Add an emitter to this particle group. Once added, an emitter will be automatically
	 * updated when ShaderParticleGroup#tick() is called.
	 * 
	 * @param {ShaderParticleEmitter} emitter
	 * @return {this}
	 */
	addEmitter (emitter) {
		const that = this;

		if (emitter.duration) {
			emitter.numParticles = emitter.particlesPerSecond * (that.maxAge < emitter.emitterDuration ? that.maxAge : emitter.emitterDuration) | 0;
		}
		else {
			emitter.numParticles = emitter.particlesPerSecond * that.maxAge | 0;
		}

		emitter.numParticles = Math.ceil(emitter.numParticles);

		const vertices = that.geometry.getAttribute('position'),
			start = vertices.count,
			end = emitter.numParticles + start,
			a = that.attributes,
			acceleration = a.acceleration.value,
			velocity = a.velocity.value,
			alive = a.alive.value,
			age = a.age.value,
			size = a.size.value,
			sizeEnd = a.sizeEnd.value,
			customColor = a.customColor.value,
			customColorEnd = a.customColorEnd.value,
			opacity = a.opacity.value,
			opacityMiddle = a.opacityMiddle.value,
			opacityEnd = a.opacityEnd.value;

		emitter.particleIndex = parseFloat(start, 10);

		// Create the values
		for (let i = start; i < end; ++i) {

			if (emitter.type === 'sphere') {
				vertices[i] = that._randomVector3OnSphere(emitter.position, emitter.radius, emitter.radiusScale);
				velocity[i] = that._randomVelocityVector3OnSphere(vertices[i], emitter.position, emitter.speed, emitter.speedSpread, emitter.radiusScale, emitter.radius);
			}
			else {
				vertices[i] = that._randomVector3(emitter.position, emitter.positionSpread);
				velocity[i] = that._randomVector3(emitter.velocity, emitter.velocitySpread);
			}


			acceleration[i] = that._randomVector3(emitter.acceleration, emitter.accelerationSpread);

			// Fix for bug #1 (https://github.com/squarefeet/ShaderParticleEngine/issues/1)
			// For some stupid reason I was limiting the size value to a minimum of 0.1. Derp.
			size[i] = that._randomFloat(emitter.size, emitter.sizeSpread);
			sizeEnd[i] = emitter.sizeEnd;
			age[i] = 0.0;
			alive[i] = emitter.static ? 1.0 : 0.0;


			customColor[i] = that._randomColor(emitter.colorStart, emitter.colorSpread);
			customColorEnd[i] = emitter.colorEnd;
			opacity[i] = emitter.opacityStart;
			opacityMiddle[i] = emitter.opacityMiddle;
			opacityEnd[i] = emitter.opacityEnd;
		}

		// Cache properties on the emitter so we can access
		// them from its tick function.
		emitter.verticesIndex = parseFloat(start);
		emitter.attributes = that.attributes

		emitter.vertices = that.geometry.getAttribute('position')
		emitter.maxAge = that.maxAge;

		// Save this emitter in an array for processing during this.tick()
		if (!emitter.static) {
			that.emitters.push(emitter);
		}

		return that;
	},


	/**
	 * The main particle group update function. Call this once per frame.
	 * 
	 * @param  {Number} dt
	 * @return {this}
	 */
	tick (dt) {
		const that = this,
			emitters = that.emitters,
			numEmitters = emitters.length;

		dt = dt || that.fixedTimeStep;

		if (numEmitters === 0) return;

		for (let i = 0; i < numEmitters; ++i) {
			emitters[i].tick(dt);
		}

		that._flagUpdate();
		return that;
	},


	/**
	 * Fetch a single emitter instance from the pool.
	 * If there are no objects in the pool, a new emitter will be 
	 * created if specified.
	 * 
	 * @return {ShaderParticleEmitter | null}
	 */
	getFromPool () {
		const that = this,
			pool = that._pool,
			createNew = that._createNewWhenPoolEmpty;

		if (pool.length) {
			return pool.pop();
		}
		if (createNew) {
			return new ShaderParticleEmitter(that._poolCreationSettings);
		}

		return null;
	},


	/**
	 * Release an emitter into the pool.
	 * 
	 * @param  {ShaderParticleEmitter} emitter
	 * @return {this}
	 */
	releaseIntoPool (emitter) {
		if (!(emitter instanceof ShaderParticleEmitter)) {
			console.error('Will not add non-emitter to particle group pool:', emitter);
			return;
		}

		emitter.reset();
		this._pool.unshift(emitter);

		return this;
	},


	/**
	 * Get the pool array
	 * 
	 * @return {Array}
	 */
	getPool () {
		return this._pool;
	},


	/**
	 * Add a pool of emitters to this particle group
	 * 
	 * @param {Number} numEmitters      The number of emitters to add to the pool.
	 * @param {Object} emitterSettings  An object describing the settings to pass to each emitter.
	 * @param {Boolean} createNew       Should a new emitter be created if the pool runs out?
	 * @return {this}
	 */
	addPool (numEmitters, emitterSettings, createNew) {
		let that = this,
			pool = that._pool,
			emitter;

		// Save relevant settings and flags.
		that._poolCreationSettings = emitterSettings;
		that._createNewWhenPoolEmpty = !!createNew;

		// Create the emitters, add them to this group and the pool.
		for (let i = 0; i < numEmitters; ++i) {
			emitter = new ShaderParticleEmitter(emitterSettings);
			that.addEmitter(emitter);
			that.releaseIntoPool(emitter);
		}

		return that;
	},


	/**
	 * Internal method. Sets a single emitter to be alive
	 * 
	 * @private
	 * 
	 * @param  {THREE.Vector3} pos
	 * @return {this}
	 */
	_triggerSingleEmitter (pos) {
		const that = this,
			emitter = that.getFromPool();

		if (emitter === null) {
			console.log('ShaderParticleGroup pool ran out.');
			return;
		}

		// TODO: Should an instanceof check happen here? Or maybe at least a typeof?
		if (pos) {
			emitter.position.copy(pos);
		}

		emitter.enable();

		setTimeout(() => {
			emitter.disable();
			that.releaseIntoPool(emitter);
		}, that.maxAgeMilliseconds);

		return that;
	},


	/**
	 * Set a given number of emitters as alive, with an optional position
	 * vector3 to move them to.
	 * 
	 * @param  {Number} numEmitters
	 * @param  {THREE.Vector3} position
	 * @return {this}
	 */
	triggerPoolEmitter (numEmitters, position) {
		const that = this;

		if (typeof numEmitters === 'number' && numEmitters > 1) {
			for (let i = 0; i < numEmitters; ++i) {
				that._triggerSingleEmitter(position);
			}
		}
		else {
			that._triggerSingleEmitter(position);
		}

		return that;
	}
};



// The all-important shaders
ShaderParticleGroup.shaders = {
	vertex: [
		'uniform float duration;',
		'uniform int hasPerspective;',

		'attribute vec3 customColor;',
		'attribute vec3 customColorEnd;',
		'attribute float opacity;',
		'attribute float opacityMiddle;',
		'attribute float opacityEnd;',

		'attribute vec3 acceleration;',
		'attribute vec3 velocity;',
		'attribute float alive;',
		'attribute float age;',
		'attribute float size;',
		'attribute float sizeEnd;',

		'varying vec4 vColor;',

		// Linearly lerp a float
		'float Lerp( float start, float end, float amount ) {',
		'return (start + ((end - start) * amount));',
		'}',

		// Linearly lerp a vector3
		'vec3 Lerp( vec3 start, vec3 end, float amount ) {',
		'return (start + ((end - start) * amount));',
		'}',

		// Integrate acceleration into velocity and apply it to the particle's position
		'vec4 GetPos() {',
		'vec3 newPos = vec3( position );',

		// Move acceleration & velocity vectors to the value they
		// should be at the current age
		'vec3 a = acceleration * age;',
		'vec3 v = velocity * age;',

		// Move velocity vector to correct values at this age
		'v = v + (a * age);',

		// Add velocity vector to the newPos vector
		'newPos = newPos + v;',

		// Convert the newPos vector into world-space
		'vec4 mvPosition = modelViewMatrix * vec4( newPos, 1.0 );',

		'return mvPosition;',
		'}',


		'void main() {',

		'float positionInTime = (age / duration);',
		'float halfDuration = (duration / 2.0);',

		'if( alive > 0.5 ) {',
		// Integrate color "tween"
		'vec3 color = vec3( customColor );',
		'if( customColor != customColorEnd ) {',
		'color = Lerp( customColor, customColorEnd, positionInTime );',
		'}',

		// Store the color of this particle in the varying vColor,
		// so frag shader can access it.
		'if( opacity == opacityMiddle && opacityMiddle == opacityEnd ) {',
		'vColor = vec4( color, opacity );',
		'}',

		'else if( positionInTime < 0.5 ) {',
		'vColor = vec4( color, Lerp( opacity, opacityMiddle, age / halfDuration ) );',
		'}',

		'else if( positionInTime > 0.5 ) {',
		'vColor = vec4( color, Lerp( opacityMiddle, opacityEnd, (age - halfDuration) / halfDuration ) );',
		'}',

		'else {',
		'vColor = vec4( color, opacityMiddle );',
		'}',

		// Get the position of this particle so we can use it
		// when we calculate any perspective that might be required.
		'vec4 pos = GetPos();',

		// Determine point size .
		'float pointSize = Lerp( size, sizeEnd, positionInTime );',

		'if( hasPerspective == 1 ) {',
		'pointSize = pointSize * ( 300.0 / length( pos.xyz ) );',
		'}',

		// Set particle size and position
		'gl_PointSize = pointSize;',
		'gl_Position = projectionMatrix * pos;',
		'}',

		'else {',
		// Hide particle and set its position to the (maybe) glsl
		// equivalent of Number.POSITIVE_INFINITY
		'vColor = vec4( customColor, 0.0 );',
		'gl_Position = vec4(1e20, 1e20, 1e20, 0);',
		'}',
		'}',
	].join('\n'),

	fragment: [
		'uniform sampler2D uTexture;',
		'uniform int colorize;',

		'varying vec4 vColor;',

		'void main() {',
		'float c = cos(0.0);',
		'float s = sin(0.0);',

		'vec2 rotatedUV = vec2(c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,',
		'c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5);',

		'vec4 rotatedTexture = texture2D( uTexture, rotatedUV );',

		'if( colorize == 1 ) {',
		'gl_FragColor = vColor * rotatedTexture;',
		'}',
		'else {',
		'gl_FragColor = rotatedTexture;',
		'}',
		'}'
	].join('\n')
};
;

// ShaderParticleEmitter 0.5.0
// 
// (c) 2013 Luke Moody (http://www.github.com/squarefeet) & Lee Stemkoski (http://www.adelphi.edu/~stemkoski/)
//     Based on Lee Stemkoski's original work (https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/js/ParticleEngine.js).
//
// ShaderParticleEmitter may be freely distributed under the MIT license (See LICENSE.txt)

export function ShaderParticleEmitter (options) {
	// If no options are provided, fallback to an empty object.
	options = options || {};

	// Helps with minification. Not as easy to read the following code,
	// but should still be readable enough!
	const that = this;


	that.particlesPerSecond = typeof options.particlesPerSecond === 'number' ? options.particlesPerSecond : 100;
	that.type = (options.type === 'cube' || options.type === 'sphere') ? options.type : 'cube';

	that.position = options.position instanceof THREE.Vector3 ? options.position : new THREE.Vector3();
	that.positionSpread = options.positionSpread instanceof THREE.Vector3 ? options.positionSpread : new THREE.Vector3();

	// These two properties are only used when this.type === 'sphere'
	that.radius = typeof options.radius === 'number' ? options.radius : 10;
	that.radiusScale = options.radiusScale instanceof THREE.Vector3 ? options.radiusScale : new THREE.Vector3(1, 1, 1);

	that.acceleration = options.acceleration instanceof THREE.Vector3 ? options.acceleration : new THREE.Vector3();
	that.accelerationSpread = options.accelerationSpread instanceof THREE.Vector3 ? options.accelerationSpread : new THREE.Vector3();

	that.velocity = options.velocity instanceof THREE.Vector3 ? options.velocity : new THREE.Vector3();
	that.velocitySpread = options.velocitySpread instanceof THREE.Vector3 ? options.velocitySpread : new THREE.Vector3();

	// And again here; only used when this.type === 'sphere'
	that.speed = parseFloat(typeof options.speed === 'number' ? options.speed : 0, 10);
	that.speedSpread = parseFloat(typeof options.speedSpread === 'number' ? options.speedSpread : 0, 10);

	that.size = parseFloat(typeof options.size === 'number' ? options.size : 10.0, 10);
	that.sizeSpread = parseFloat(typeof options.sizeSpread === 'number' ? options.sizeSpread : 0, 10);
	that.sizeEnd = parseFloat(typeof options.sizeEnd === 'number' ? options.sizeEnd : 10.0, 10);

	that.colorStart = options.colorStart instanceof THREE.Color ? options.colorStart : new THREE.Color('white');
	that.colorEnd = options.colorEnd instanceof THREE.Color ? options.colorEnd : new THREE.Color('blue');
	that.colorSpread = options.colorSpread instanceof THREE.Vector3 ? options.colorSpread : new THREE.Vector3();

	that.opacityStart = parseFloat(typeof options.opacityStart !== 'undefined' ? options.opacityStart : 1, 10);
	that.opacityEnd = parseFloat(typeof options.opacityEnd === 'number' ? options.opacityEnd : 0, 10);
	that.opacityMiddle = parseFloat(
		typeof options.opacityMiddle !== 'undefined' ?
			options.opacityMiddle :
			Math.abs(that.opacityEnd + that.opacityStart) / 2,
		10);

	that.emitterDuration = typeof options.emitterDuration === 'number' ? options.emitterDuration : null;
	that.alive = parseInt(typeof options.alive === 'number' ? options.alive : 1, 10);

	that.static = typeof options.static === 'number' ? options.static : 0;

	// The following properties are used internally, and mostly set when this emitter
	// is added to a particle group.
	that.numParticles = 0;
	that.attributes = null;
	that.vertices = null;
	that.verticesIndex = 0;
	that.age = 0.0;
	that.maxAge = 0.0;

	that.particleIndex = 0.0;

	that.userData = {};
}


ShaderParticleEmitter.prototype = {

	/**
	 * Reset a particle's position. Accounts for emitter type and spreads.
	 *
	 * @private
	 * 
	 * @param  {THREE.Vector3} p
	 */
	_resetParticle (p) {
		const that = this;
		const spread = that.positionSpread,
			type = that.type;

		// Optimise for no position spread or radius
		if (
			(type === 'cube' && spread.x === 0 && spread.y === 0 && spread.z === 0) ||
			(type === 'sphere' && that.radius === 0)
		) {
			p.copy(that.position);
		}

		// If there is a position spread, then get a new position based on this spread.
		else if (type === 'cube') {
			that._randomizeExistingVector3(p, that.position, spread);
		}

		else if (type === 'sphere') {
			that._randomizeExistingVector3OnSphere(p, that.position, that.radius);
		}
	},


	/**
	 * Given an existing particle vector, randomise it based on base and spread vectors
	 *
	 * @private
	 * 
	 * @param  {THREE.Vector3} v
	 * @param  {THREE.Vector3} base
	 * @param  {THREE.Vector3} spread
	 */
	_randomizeExistingVector3 (v, base, spread) {
		const r = Math.random;

		v.copy(base);

		v.x += r() * spread.x - (spread.x / 2);
		v.y += r() * spread.y - (spread.y / 2);
		v.z += r() * spread.z - (spread.z / 2);
	},


	/**
	 * Given an existing particle vector, project it onto a random point on a 
	 * sphere with radius `radius` and position `base`.
	 *
	 * @private
	 * 
	 * @param  {THREE.Vector3} v
	 * @param  {THREE.Vector3} base
	 * @param  {Number} radius
	 */
	_randomizeExistingVector3OnSphere (v, base, radius) {
		const rand = Math.random;

		var z = 2 * rand() - 1;
		const t = 6.2832 * rand();
		const r = Math.sqrt(1 - z * z);

		const x = ((r * Math.cos(t)) * radius);
		const y = ((r * Math.sin(t)) * radius);
		var z = (z * radius);

		v.set(x, y, z).multiply(this.radiusScale);

		v.add(base);
	},


	// This function is called by the instance of `ShaderParticleEmitter` that 
	// this emitter has been added to.
	/**
	 * Update this emitter's particle's positions. Called by the ShaderParticleGroup
	 * that this emitter belongs to.
	 * 
	 * @param  {Number} dt
	 */
	tick (dt) {

		if (this.static) {
			return;
		}

		// Cache some values for quicker access in loops.
		const that = this,
			a = that.attributes,
			alive = a.alive.value,
			age = a.age.value,
			start = that.verticesIndex,
			numParticles = that.numParticles,
			end = start + numParticles,
			pps = that.particlesPerSecond,
			ppsdt = pps * dt,
			m = that.maxAge,
			emitterAge = that.age,
			duration = that.emitterDuration,
			pIndex = that.particleIndex;

		// Loop through all the particles in this emitter and
		// determine whether they're still alive and need advancing
		// or if they should be dead and therefore marked as such
		// and pushed into the recycled vertices array for reuse.
		for (var i = start; i < end; ++i) {
			if (alive[i] === 1.0) {
				age[i] += dt;
			}

			if (age[i] >= m) {
				age[i] = 0.0;
				alive[i] = 0.0;
			}
		}

		// If the emitter is dead, reset any particles that are in
		// the recycled vertices array and reset the age of the 
		// emitter to zero ready to go again if required, then
		// exit this function.
		if (that.alive === 0) {
			that.age = 0.0;
			return;
		}

		// If the emitter has a specified lifetime and we've exceeded it,
		// mark the emitter as dead and exit this function.
		if (typeof duration === 'number' && emitterAge > duration) {
			that.alive = 0;
			that.age = 0.0;
			return;
		}

		const n = Math.min(end, pIndex + ppsdt);

		for (i = pIndex | 0; i < n; ++i) {
			if (alive[i] !== 1.0) {
				alive[i] = 1.0;
				that._resetParticle(that.vertices[i]);
			}
		}

		that.particleIndex += ppsdt;

		if (pIndex >= start + that.numParticles) {
			that.particleIndex = parseFloat(start, 10);
		}

		// Add the delta time value to the age of the emitter.
		that.age += dt;
	},

	/**
	 * Reset this emitter back to its starting position.
	 * If `force` is truthy, then reset all particles in this
	 * emitter as well, even if they're currently alive.
	 * 
	 * @param  {Boolean} force
	 * @return {this}
	 */
	reset (force) {
		const that = this;

		that.age = 0.0;
		that.alive = 0;

		if (force) {
			const start = that.verticesIndex,
				end = that.verticesIndex + that.numParticles,
				a = that.attributes,
				alive = a.alive.value,
				age = a.age.value;

			for (let i = start; i < end; ++i) {
				alive[i] = 0.0;
				age[i] = 0.0;
			}
		}

		return that;
	},


	/**
	 * Enable this emitter.
	 */
	enable () {
		this.alive = 1;
	},

	/**
	 * Disable this emitter.
	 */
	disable () {
		this.alive = 0;
	}
};
