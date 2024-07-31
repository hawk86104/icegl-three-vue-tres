import * as __WEBPACK_EXTERNAL_MODULE_three__ from "three";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ti: () => (/* reexport */ BaseProperty),
  nS: () => (/* reexport */ Behavior),
  eB: () => (/* reexport */ BlockElement),
  Yp: () => (/* reexport */ DefaultValues_namespaceObject),
  VB: () => (/* reexport */ font_FontLibrary),
  BC: () => (/* reexport */ font_FontVariant),
  zN: () => (/* reexport */ InheritableProperty),
  cV: () => (/* reexport */ InlineElement),
  hW: () => (/* reexport */ InlineBlockElement),
  k2: () => (/* reexport */ InlineGlyph),
  K6: () => (/* reexport */ MSDFFontMaterialUtils),
  M7: () => (/* reexport */ MaterialTransformers_namespaceObject),
  ls: () => (/* reexport */ MeshUIBaseElement),
  Hi: () => (/* reexport */ ShaderChunkUI),
  EY: () => (/* reexport */ TextElement),
  ME: () => (/* reexport */ TextContentProperty),
  MR: () => (/* reexport */ TypographicFont),
  zf: () => (/* reexport */ TypographicGlyph),
  Ay: () => (/* binding */ three_mesh_ui),
  yo: () => (/* binding */ update)
});

// NAMESPACE OBJECT: ./src/core/DefaultValues.js
var DefaultValues_namespaceObject = {};
__webpack_require__.r(DefaultValues_namespaceObject);
__webpack_require__.d(DefaultValues_namespaceObject, {
  get: () => (get),
  set: () => (set)
});

// NAMESPACE OBJECT: ./src/utils/mediator/transformers/MaterialTransformers.js
var MaterialTransformers_namespaceObject = {};
__webpack_require__.r(MaterialTransformers_namespaceObject);
__webpack_require__.d(MaterialTransformers_namespaceObject, {
  alphaTestTransformer: () => (alphaTestTransformer),
  asPreprocessorValueTransformer: () => (asPreprocessorValueTransformer),
  toPreprocessorTriggerTransformer: () => (toPreprocessorTriggerTransformer),
  toUserDataTransformer: () => (toUserDataTransformer),
  uniformOrUserDataTransformer: () => (uniformOrUserDataTransformer)
});

;// CONCATENATED MODULE: ./src/core/DefaultValues.js
/** List the default values of the lib components */
const _values = {
	fog: false,
	fontFamily: null,
	fontSize: 0.05,
	fontKerning: 'auto',
	fontStyle: 'normal',
	fontWeight : 'normal',
	offset: 0.005,
	lineHeight: 1.2,
	lineBreak: '- ,.:?!\n',// added '\n' to also acts as friendly breaks when white-space:normal
	whiteSpace: 'pre-line',
	flexDirection : 'column',
	justifyContent : 'start',
	alignItems : 'start',
	backgroundImage: null,
	textAlign : 'left',
	boxSizing: 'content-box',
	position: 'static',
	color: 0xffffff,
	fontColor: 0xffffff,
	fontOpacity: 1,
	opacity: 1,
	fontPXRange: 4,
	fontSupersampling: true,
	fontSmooth: 'antialiased',
	borderRadius: 0,
	borderWidth: 0,
	borderColor: 'black',
	borderOpacity: 1,
	backgroundSize: "cover",
	backgroundColor: 0x000000,
	backgroundOpacity: 0,
	overflow: 'visible',
	letterSpacing: 0,
	invertAlpha : false,
	segments: 1
};

/**
 * @param {import('./../core/elements/MeshUIBaseElement').Options} overrideProperties
 */
const set = function ( overrideProperties ) {

	for ( const property in overrideProperties ) {

		_values[property] = overrideProperties[property];

	}

}

/**
 *
 * @param {string} property
 * @return {any}
 */
const get = function ( property ) {

	if( !Object.prototype.hasOwnProperty.call( _values, property) ) {

		console.warn( `ThreeMeshUI::DefaultValues is trying to retrieve non-existing property '${property}'`);

	}

	return _values[property];

}

;// CONCATENATED MODULE: ./src/core/properties/BaseProperty.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 * @param primitive
	 */
	constructor( propertyId, value = null, primitive = true ) {

		/**
		 *
		 * @type {string}
		 * @internal
		 */
		this._id = propertyId;

		/**
		 *
		 * @type {any}
		 * @internal
		 */
		this._value = value;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._needsUpdate = true;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._needsProcess = false;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._needsRender = false;

		/**
		 *
		 * @type {boolean}
		 * @protected
		 */
		this._isPrimitive = primitive;

	}

	/**
	 *
	 * @return {string}
	 */
	get id() { return this._id; }

	/**
	 *
	 * @return {any}
	 */
	get value() { return this._value; }

	/**
	 *
	 * @param {any} value
	 */
	set value( value ) {

		if ( !this.isValid( value ) ) return;

		if ( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @param {Object.<string,any>} out
	 */
	update( element, out ) { 	/* eslint-enable no-unused-vars */

		// the value has been updated from setter
		// if there is no additional logic
		// then just output it
		// => out[this._id] = this._value;
		this.output( out );


		// ??
		//this.computeOutputValue( element );
		// if( this._isPrimitive ) this.output( out );

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Output this property in a dictionnary
	 * @param {Object.<string,any>} out
	 */
	output( out ) { 	/* eslint-enable no-unused-vars */

		// ie:
		// out['borderRadius'] = this;
		// out[this._id] = this._value;

	}


	/**
	 *
	 * @param {Out} out
	 */
	_outputValue( out ) {

		out[ this._id ] = this._value;

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Execute additional process after all properties have been updated
	 * @param {MeshUIBaseElement} element
	 */
	process( element ) { /* eslint-enable no-unused-vars */ }

	/* eslint-disable no-unused-vars */
	/**
	 * Execute additional process after all properties have been updated
	 * @param {MeshUIBaseElement} element
	 */
	render( element ) { /* eslint-enable no-unused-vars */ }

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	getInheritedInput( element ) {

		if ( this._value !== 'inherit' ) return this._value;

		const parent = element._parent._value;
		if ( parent && parent[ `_${this._id}` ] ) {

			return parent[ `_${this._id}` ].getInheritedInput( parent )

		}

		return this.getDefaultValue();

	}

	/**
	 *
	 * @return {any}
	 */
	getDefaultValue() {

		return get( this._id );

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {any} value
	 * @return {boolean}
	 */
	isValid( value ) { 	/* eslint-enable no-unused-vars */

		return true;

	}

	/**
	 *
	 */
	emptyStrategyLogic() {

		throw new Error( `ThreeMeshUI::${this.constructor.name} has empty strategy. Update has not been processed.` );

	}

	requestUpdate() {
		this._needsUpdate = true;
	}

	requestProcess() {
		this._needsProcess = false;
	}

	requestRender() {
		this._needsRender = false;
	}

}


/**
 * @typedef Out
 * @type {Object & Object.<string,any>}
 */

;// CONCATENATED MODULE: ./src/core/properties/RenderOrderProperty.js


class RenderOrderProperty extends BaseProperty{

	constructor() {

		super( 'renderOrder', 'auto', true);

		this.output = this._outputValue;

		this._actualValue = 0;
	}

	/**
	 *
	 * @param {number} value
	 */
	set value( value ) {

		if( ! this.isValid( value) ) return;

		this._value = value;

		this._needsUpdate = true;

	}

	update( element, out ) {

		if( this._value !== 'auto' ) {

			this._actualValue = this._value;

		} else {

			const parent = element._parent._value;
			if( parent !== null ) {

				const parentIndex = parent._renderOrder._actualValue;
				const positionInParent = 1 + parent._children._uis.indexOf( element );

				this._actualValue = parentIndex + positionInParent;

			}

		}

		// update any children
		for ( const childUIElement of element._children._uis ) {

			const property = childUIElement[`_renderOrder`];
			if( property._value === 'auto' ) childUIElement[`_renderOrder`]._needsUpdate = true;

		}

		this._outputValue( out );

	}

	_outputValue( out ) {

		out[this._id] = this._actualValue;

	}


	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/InheritableProperty.js


class InheritableProperty extends BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 * @param primitive
	 */
	constructor( propertyId, value = null, primitive = true ) {

		super( propertyId, value, primitive );

		// @TODO : I would like to remove this rules ( here )
		this.output = this._outputValue;

		this._notInheritedValue = null;
	}

	update( element , out ) { 	/* eslint-enable no-unused-vars */

		this._notInheritedValue = this._value;

		if( this._notInheritedValue === 'inherit' )
		{
			this._notInheritedValue = this.getInheritedInput( element );
		}
		// else
		// {
		// 	this.propagate( element );
		// }

		// @TODO: Evaluate. This might be too much
		this.propagate( element );

		this._outputValue( out );

	}

	propagate( element ) {

		// rebuild same properties on children 'inheritance'
		for ( const childUIElement of element._children._uis ) {

			const property = childUIElement[`_${this._id}`];
			if( property !== undefined && property._value === 'inherit' ) {
				childUIElement[`_${this._id}`]._needsUpdate = true;
			}

		}
	}

	/**
	 * Output this property in a dictionnary
	 * @override
	 */
	_outputValue( out ) { 	/* eslint-enable no-unused-vars */

		out[this._id] = this._notInheritedValue;

	}

	set value ( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}
	/**
	 *
	 * @override
	 * @return {any|"inherit"}
	 */
	get value() {

		if( this._value === 'inherit' ) return this._notInheritedValue;

		return this._value;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/OffsetProperty.js


class OffsetProperty extends InheritableProperty {

	constructor( ) {

		super( 'offset', 'inherit', false );

	}


	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		super.update( element, out);

		// only process if element has ui parent
		if( element._parent._value !== null ) element.position.z = this._notInheritedValue;

	}


}

;// CONCATENATED MODULE: ./src/core/properties/FontSmoothProperty.js


class FontSmoothProperty extends InheritableProperty{

	constructor() {

		super( 'fontSmooth', 'inherit', true);

		// configure
		this._needsUpdate = false;
		this.isValid = _isValid;
		this.output = this._outputValue;
	}

}

const AVAILABLE_VALUES = ['inherit','none','antialiased'];

/**
 *
 * @param {string} value
 * @return {boolean}
 * @private
 */
function _isValid( value ) {

	if(  AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn(`.fontSmoothing value '${value}' is not valid. Aborted`);
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: external "three"
var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
const external_three_namespaceObject = x({ ["BackSide"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.BackSide), ["BufferAttribute"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.BufferAttribute), ["BufferGeometry"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.BufferGeometry), ["Color"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.Color), ["DoubleSide"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.DoubleSide), ["EventDispatcher"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.EventDispatcher), ["FileLoader"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.FileLoader), ["FrontSide"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.FrontSide), ["LinearFilter"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.LinearFilter), ["Mesh"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.Mesh), ["MeshBasicMaterial"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.MeshBasicMaterial), ["Object3D"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.Object3D), ["Plane"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.Plane), ["PlaneGeometry"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.PlaneGeometry), ["ShaderMaterial"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.ShaderMaterial), ["Texture"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.Texture), ["TextureLoader"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.TextureLoader), ["UniformsLib"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.UniformsLib), ["Vector2"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.Vector2), ["Vector3"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.Vector3), ["Vector4"]: () => (__WEBPACK_EXTERNAL_MODULE_three__.Vector4) });
;// CONCATENATED MODULE: ./src/core/properties/style-properties/SubStyleProperty.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
class SubStyleProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {boolean} [primitive=true]
	 * @param {any} defaultValue
	 */
	constructor( propertyId, defaultValue, primitive = true) {

		super( propertyId, 'unset', primitive );

		/**
		 * @type {any}
		 * @internal
		 */
		this._input = 'inherit';

		/**
		 *
		 * @type {boolean}
		 * @protected
		 */
		this._allowsInherit = true;

		/**
		 * The input value that won't be 'inherit'
		 * @type {any}
		 * @protected
		 */
		this._inheritedInput = undefined;

		/**
		 *
		 * @type {any}
		 * @internal
		 */
		this._inline = undefined;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 * @param {Object.<string,any> } out
	 */
	update( element, out ) {

		if( !this._allowsInherit ) {

			this._inheritedInput = this.getInheritedInput( element );

		}

		this.computeOutputValue( element );

		// rebuild same properties on children 'inheritance'
		for ( const childUIElement of element._children._uis ) {

			const property = childUIElement[`_${this._id}`];
			const target = property._input ? property._input : property._value;

			if( target === 'inherit' ) childUIElement[`_${this._id}`]._needsUpdate = true;

		}

		this.output( out );

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) {

		this._value = this._input;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	_computeFromInherited( element ) {

		this._value = this._inheritedInput;

	}


	/**
	 * @override
	 * @deprecated
	 * @param {any} v
	 */
	set value( v ) {

		console.warn(".(style) sub-property cannot be directly set. It must comes from inline or computed setter.")

	}

	/**
	 *
	 * @param {any} value
	 */
	set inline( value ) {

		if( ! this.isValidValue( value ) ) return;

		if( value === this._inline ) {

			// do nothing no update, the value hasn't changed
			return;

		}

		this._input = this._inline = value;

		this._needsUpdate = true;

	}

	/**
	 *
	 * @return {any}
	 */
	get inline() { return this._inline; }

	/**
	 *
	 * @param {any} value
	 * @return {boolean}
	 */
	isValidValue( value ) {

		return true;

	}

	/**
	 * @param {MeshUIBaseElement} element
	 */
	getInheritedInput ( element ) {

		if( this._input !== 'inherit' ) return this._input;

		const parent = element._parent._value;
		if( parent ) {

			return parent[`_${this._id}`].getInheritedInput( parent )

		}

		return this.getDefaultValue();

	}

}
/* eslint-enable no-unused-vars */

;// CONCATENATED MODULE: ./src/core/properties/style-properties/StyleVector4Property.js



class StyleVector4Property extends SubStyleProperty {

	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue, false );

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._input = new external_three_namespaceObject.Vector4(0,0,0,0);

		/**
		 *
		 * @type {any}
		 * @internal
		 */
		this._inline = null;

		/**
		 * @override
		 * @type {Vector4}
		 * @protected
		 */
		this._value = new external_three_namespaceObject.Vector4(0,0,0,0);

	}

	/**
	 * @override
	 * @return {Vector4}
	 */
	get value(){

		return this._value;

	}

	/* eslint-disable no-unused-vars */
	/**
	 * @override
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._vector4ValueSetter( this._value, this._input );

	}

	set inline( value ) {

		this._vector4ValueSetter( this._input, value );

		if( this._input.equals( this._value) ) return;

		this._needsUpdate = true;

	}

	/**
	 *
	 * @param {Number} v
	 */
	set top( v ) {

		if( this._input.x === v ) return;

		this._input.x = v;
		this._needsUpdate = true;

	}


	/**
	 *
	 * @returns {number}
	 */
	get top() { return this._input.x; }

	/**
	 *
	 * @param {Number} v
	 */
	set right( v ) {

		if( this._input.y === v ) return;

		this._input.y = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get right() { return this._input.y; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottom( v ) {
		if( this._input.z === v ) return;

		this._input.z = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottom() { return this._input.z; }

	/**
	 *
	 * @param {Number} v
	 */
	set left( v ) {

		if( this._input.w === v ) return;

		this._input.w = v;
		this._needsUpdate = true;
	}


	/**
	 *
	 * @returns {number}
	 */
	get left() { return this._input.w; }

	dispose(){

		this._computed = null;
		this._inline = null;
		this._input = null;
		this._output = null;

	}

	/**
	 *
	 * @param {Vector4} vector4
	 * @param {Vector4|Array.<Number>|Number|String} value
	 * @protected
	 */
	_vector4ValueSetter( vector4, value ) {

		if ( value instanceof external_three_namespaceObject.Vector4 ) {

			vector4.copy( value );
			return;

		}

		if ( typeof value === 'string' || value instanceof String ) {

			value = value.split( ' ' );

		}

		if ( Array.isArray( value ) ) {

			value = value.map( v => parseFloat( v ) );

			switch ( value.length ) {

				case 1:
					vector4.setScalar( value[ 0 ] );
					return;

				case 2:
					vector4.x = vector4.z = value[ 0 ];
					vector4.y = vector4.w = value[ 1 ];
					return;

				case 3:
					vector4.x = value[ 0 ];
					vector4.y = value[ 1 ];
					vector4.z = value[ 2 ];
					return;

				case 4:
					vector4.x = value[ 0 ];
					vector4.y = value[ 1 ];
					vector4.z = value[ 2 ];
					vector4.w = value[ 3 ];
					return;

				default:
					console.error( 'StyleVector4Property::set() Four Dimension property had more than four values' );
					return;

			}

		}

		if ( !isNaN( value ) ) {

			vector4.setScalar( value );

		}

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/PaddingProperty.js



class PaddingProperty extends StyleVector4Property {

	constructor() {

		super('padding', new external_three_namespaceObject.Vector4(0,0,0,0) )

	}

	computeOutputValue( element ) {

		super.computeOutputValue( element );

		element._bounds._needsUpdate = true;
		element._bounds._needsRender = true;
		element._layouter._needsProcess = true;
		element._renderer._needsRender = true;

		if( element._parent._value ){
			element._parent._value._layouter._needsProcess = true;
		}
	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/MarginProperty.js



class MarginProperty extends StyleVector4Property {

	constructor() {

		super('margin', new external_three_namespaceObject.Vector4(0,0,0,0) )

	}

	computeOutputValue( element ) {

		super.computeOutputValue( element );

		element._renderer._needsRender = true;

		if( element._parent._value ){
			element._parent._value._flexDirection._needsProcess = true;
		}
	}

}

;// CONCATENATED MODULE: ./src/utils/mediator/transformers/CommonTransformers.js
/**
 * Transfer the alphaTest value from MeshUIComponent to material
 * @type {import('../Mediator').MediationTransformer}
 */
const directTransfer = function ( target, targetProperty, value ) {

	target[targetProperty] = value;

}

const directTransferNotNull = function( target, targetProperty, value ) {

	if( value === null ) return;

	target[targetProperty] = value;

}

;// CONCATENATED MODULE: ./src/utils/mediator/Mediator.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
/**
 * An option function to transform value from subject to target
 * @typedef {(target:any, targetProperty:string, value:any) => void} MediationTransformer
 *
 */

/**
 * @typedef {Object.<{subjectProperty:string, trans?:MediationTransformer}>} MediationDefinition
 *
 */

class Mediator{

	/**
	 * @constructor
	 * @param {MediationDefinition} definition
	 */
	constructor( definition ) {

		/**
		 *
		 * @type {MediationDefinition}
		 * @private
		 */
		this._definition = definition;

	}

	/**
	 *
	 * @param {MediationDefinition} value
	 */
	set definition( value ) {

		this._definition = value;

	}


	/**
	 *
	 * @param {MeshUIBaseElement} subject
	 * @param {any} target
	 * @param {Object.<(string|number), any>} options
	 * @param {any} [secondTarget=null]
	 */
	mediate( subject, target, options, secondTarget = null ) {

		// Mediate each subject properties to material
		for ( const subjectProperty in this._definition ) {
			const mediationDefinition = this._definition[subjectProperty];

			if ( options[subjectProperty] !== undefined ) {

				// retrieve the mediation transformer to use for this property
				const mediationTransformer = mediationDefinition.t ? mediationDefinition.t : directTransfer;
				mediationTransformer( target, mediationDefinition.m, options[subjectProperty] );

				// Also transfert to second target is isset
				if( secondTarget ) {

					mediationTransformer( secondTarget, mediationDefinition.m, options[subjectProperty] );

				}

			}

		}

	}


	/***********************************************************************************************************************
	 * STATIC
	 **********************************************************************************************************************/

	/**
	 *
	 * @param {MeshUIComponent} subject
	 * @param {any} target
	 * @param {Object.<(string|number), any>} options
	 * @param {Object.<{subjectProperty:string, t?:(target:any, targetProperty:string, value:any) => void}>} mediationDefinitions
	 * @param {any} [secondTarget=null]
	 */
	static mediate( subject, target, options, mediationDefinitions, secondTarget = null ) {

		// Cannot mediate if target not defined
		if( !target ) return;

		// Mediate each subject properties to material
		for ( const subjectProperty in mediationDefinitions ) {
			const definition = mediationDefinitions[subjectProperty];

			if ( options[subjectProperty] !== undefined ) {

				// retrieve the mediation transformer to use for this property
				const mediationTransformer = definition.t ? definition.t : directTransfer;
				mediationTransformer( target, definition.m, options[subjectProperty] );

				// Also transfert to second target is isset
				if( secondTarget ) {

					mediationTransformer( secondTarget, definition.m, options[subjectProperty] );

				}

			}

		}

	}


}

;// CONCATENATED MODULE: ./src/core/properties/hierarchy/ParentProperty.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class ParentProperty extends BaseProperty {

	constructor() {

		super('parent', null, false);

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Update when :
	 * 		- element has been added
	 * 		- element has been removed
	 *
	 * @param element
	 * @param out
	 */
	update( element, out ) {
		/* eslint-enable no-unused-vars */

		if ( element.parent && element.parent.isUI ) {

			this._value = element.parent;
			// this.position.z = this.getOffset();

		} else {

			this._value = null;

		}

		// @TODO : parentElement
		// // set elements as root
		// if ( element.isBlock && !this._value ) {
		//
		// 	ThreeMeshUI.addRoot( element );
		// 	element.pseudoClassList.add('root');
		//
		// } else {
		//
		// 	ThreeMeshUI.removeRoot( element );
		// 	element.pseudoClassList.remove('root');
		//
		// }


	}

	set value( value ) {

		console.warn('ParentProperty is readonly');

	}

	/**
	 *
	 * @return {MeshUIBaseElement}
	 */
	get value() { return this._value; }


	/**
	 *
	 * @param {(p:Object3D)=>boolean } conditionCallback
	 */
	find( conditionCallback ) {

		if( this._value ) {

			if( conditionCallback( this._value) ) {

				return this._value;

			}

			return this._value._parent.find( conditionCallback );

		}

		return null;

	}


	/**
	 *
	 */
	dispose() {

		this._value = null;

	}


}

;// CONCATENATED MODULE: ./src/utils/NumberUtils.js
/**
 * Get rid of the precision issue
 * @param numA
 * @param numB
 * @param precision
 * @return {boolean}
 */
const numberEquals = function ( numA, numB, precision = 6 ) {

	return numA.toFixed(precision) === numB.toFixed(precision)

}

/**
 *
 * @param unprecisedNumber
 * @param precision
 * @return {number}
 */
const numberPrecise = function ( unprecisedNumber, precision = 6 ) {

	return parseFloat( unprecisedNumber.toFixed( precision ) );

}

;// CONCATENATED MODULE: ./src/core/properties/NumberProperty.js



class NumberProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {number} [value]
	 */
	constructor( propertyId, value ) {

		super( propertyId, value, true);

		this.output = this._outputValue;
	}

	/**
	 *
	 * @param {number} value
	 */
	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( numberEquals(this._value, value) ) return;

		this._value = value;

		this._needsUpdate = true;

	}



	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/SideProperty.js



/**
 * @property {number|"inherit"} value
 */
class SideProperty extends InheritableProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId ) {

		super( propertyId, 'inherit', true);

		this.isValid = SideProperty_isValid;

	}

}

const SideProperty_AVAILABLE_VALUES = [ external_three_namespaceObject.FrontSide, external_three_namespaceObject.BackSide, external_three_namespaceObject.DoubleSide ];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function SideProperty_isValid( value ) {

	if( SideProperty_AVAILABLE_VALUES.indexOf( value) === -1 ){

		console.warn(`SideProperty value '${value}' is not valid. Abort`);
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/elements/glyphs/Inline.js
/**
 * This is the abstract/base class / interface of any inline
 * Inline can be positioned according to text rules
 */
class Inline {

	constructor() {

		/** @protected */ this._offsetX = 0;
		/** @protected */ this._offsetY = 0;

		/** @protected */ this._lineBreak = null;

		/** @protected */ this._kerning = 0;

		/** @protected */ this._fontFactor = 1;
		/** @protected */ this._fontSize = 0;

		/** @protected */ this._cumulativeWidth = 0;

		/** @protected */ this._paddingLeft = 0;
		/** @protected */ this._paddingRight = 0;

		/** @protected */ this._marginLeft = 0;
		/** @protected */ this._marginRight = 0;

	}

	/**
	 * @returns {void}
	 */
	resetOffsets() {

		this._offsetX = this._offsetY = 0;
		this._cumulativeWidth = 0;

	}

	/**
	 * The horizontal distance this inline fills
	 * @returns {number}
	 */
	get xadvance() { return 0 }

	/**
	 * The offset x of this inline in a line
	 * @returns {number}
	 */
	get xoffset() { return 0 }

	/**
	 * The offset y of this inline in a line
	 * @returns {number}
	 */
	get yoffset() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get width() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get height() { return 0 }

	/**
	 *
	 * @param {string|null} value
	 */
	set lineBreak( value ) {

		this._lineBreak = value;

	}

	/**
	 *
	 * @returns {string|null}
	 */
	get lineBreak() { return this._lineBreak; }

	/**
	 *
	 * @returns {number}
	 */
	get anchor() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get kerning() { return this._kerning * this._fontFactor; }

	/**
	 *
	 * @param {number} value
	 */
	set kerning( value ) {

		this._kerning = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get fontSize() { return this._fontSize }

	/**
	 *
	 * @param {number} value
	 */
	set fontSize( value ) {

		this._fontSize = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get lineHeight() { return 0 }

	/**
	 *
	 * @returns {number}
	 */
	get offsetX() { return this._offsetX; }

	/**
	 *
	 * @param value
	 */
	set offsetX( value ){

		this._offsetX = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get offsetY() { return this._offsetY; }

	/**
	 *
	 * @param {number} value
	 */
	set offsetY( value ){

		this._offsetY = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get cumulativeWidth() { return this._cumulativeWidth; }

	/**
	 *
	 * @param {number} value
	 */
	set cumulativeWidth( value ) {

		this._cumulativeWidth = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginLeft() { return this._marginLeft; }

	/**
	 *
	 * @param {number} value
	 */
	set marginLeft( value ) {

		this._marginLeft = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get marginRight() { return this._marginRight; }

	/**
	 *
	 * @param {number} value
	 */
	set marginRight( value ) {

		this._marginRight = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingLeft() { return this._paddingLeft; }

	/**
	 *
	 * @param {number} value
	 */
	set paddingLeft( value ) {

		this._paddingLeft = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get paddingRight() { return this._paddingRight; }

	/**
	 *
	 * @param {number} value
	 */
	set paddingRight( value ) {

		this._paddingRight = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get lineBase() { return 0 }

	/**
	 *
	 * @param {number} value
	 */
	set fontFactor( value ){

		this._fontFactor = value;

	}

	/**
	 *
	 * @returns {number}
	 */
	get fontFactor() { return this._fontFactor }
}

;// CONCATENATED MODULE: ./src/font/TypographicGlyph.js
//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

/**
 * @class
 * @abstract
 */
class TypographicGlyph {

	/**
	 *
	 * @param {TypographicFont} typographicFont
	 */
	constructor( typographicFont ) {

		/** @protected */ this._char = "";
		/** @protected */ this._width = 1;
		/** @protected */ this._heigth = 1;
		/** @protected */ this._xadvance = 1;
		/** @protected */ this._xoffset = 0;
		/** @protected */ this._yoffset = 0;

		/**
		 *
		 * @type {TypographicFont}
		 * @protected
		 */
		this._font = typographicFont;

	}

	/**
	 *
	 * @returns {TypographicFont}
	 */
	get font() {

		return this._font;

	}

	/**
	 *
	 * @return {string}
	 */
	get char() {

		return this._char;

	}

	/**
	 *
	 * @returns {number}
	 */
	get width() {

		return this._width;

	}

	/**
	 *
	 * @returns {number}
	 */
	get height() {

		return this._heigth;

	}

	/**
	 *
	 * @returns {number}
	 */
	get xadvance() {

		return this._xadvance;

	}

	/**
	 *
	 * @returns {number}
	 */
	get xoffset() {

		return this._xoffset;

	}

	/**
	 *
	 * @returns {number}
	 */
	get yoffset() {

		return this._yoffset;

	}

	/**
	 *
	 * @param value
	 */
	set yoffset( value ) {

		this._yoffset = value;

	}

	/**
	 *
	 * @abstract
	 * @param {string} otherChar
	 * @returns {TypographicGlyph}
	 */
	/* eslint-disable no-unused-vars */ clone( otherChar ) { /* eslint-enable no-unused-vars */

		throw new Error("Abstract... Need to be implemented");

	}

	/**
	 *
	 * @abstract
	 * @returns {InlineGlyph}
	 */
	asInlineGlyph() {

		throw new Error("Abstract... Need to be implemented")

	}

}

;// CONCATENATED MODULE: ./src/font/InlineGlyph.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class InlineGlyph extends Inline {

	/**
	 *
	 * @param {TypographicGlyph} characterDesc
	 */
	constructor( characterDesc ) {

		super();

		/** @protected */ this._typographic = characterDesc;

	}

	/**
	 *
	 * @returns {TypographicGlyph}
	 */
	get typographic(){

		return this._typographic;

	}

	/*********************************************************************************************************************
	 * GETTERS FROM CHARACTER DESCRIPTION
	 ********************************************************************************************************************/

	/**
	 * @override
	 * @returns {number}
	 */
	get xadvance() { return this._typographic.xadvance * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get xoffset() { return this._typographic.xoffset * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get yoffset() { return this._typographic.yoffset * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get width() { return this._typographic.width * this._fontFactor ; }

	/**
	 * @override
	 * @returns {number}
	 */
	get height() { return this._typographic.height * this._fontFactor; }

	/**
	 *
	 * @return {string}
	 */
	get char() { return this._typographic.char; }

	/**
	 * @override
	 * @returns {number}
	 */
	get anchor() {

		// const lineHeight = this._typographic.font.lineHeight;
		// const lineBase = this._typographic.font.lineBase;
		//
		// return ( ( this._typographic.yoffset + this._typographic.height - lineBase ) * this._fontSize ) / lineHeight;

		return this.yoffset;

	}

	/**
	 * @override
	 * @returns {number}
	 */
	get lineHeight() { return this._typographic.font.lineHeight * this._fontFactor; }

	/**
	 * @override
	 * @returns {number}
	 */
	get lineBase() { return this._typographic.font.lineBase * this._fontFactor; }


}

;// CONCATENATED MODULE: ./src/font/utils/FontUtils.js
const FONT_WEIGHT_LOOK_UP_TABLE = {
	'light'		: '100',
	'normal'	: '400',
	'bold' 		: '700',
	'bolder' 	: '900'
}

/**
 *
 * @param weight
 * @return {string}
 */
function uniformizeFontWeight( weight ) {

	if( !isNaN(weight) ) return weight.toString();

	const converted = FONT_WEIGHT_LOOK_UP_TABLE[weight];

	if( converted ) return converted;

	return weight;

}

;// CONCATENATED MODULE: ./src/font/FontVariant.js



// JSDoc related imports
/* eslint-disable no-unused-vars */






/* eslint-enable no-unused-vars */


/**
 * @abstract
 */
class FontVariant extends external_three_namespaceObject.EventDispatcher {

	/**
	 *
	 * @param {import('./../core/elements/MeshUIBaseElement').FontWeightFormat} weight
	 * @param {"normal"|"italic"} style
	 */
	constructor( weight, style ) {

		super();

		/** @private */ this._isReady = false;

		/** @protected */ this._weight = uniformizeFontWeight( weight );
		/** @protected */ this._style = style;

		/** @protected */ this._size = 42;
		/** @protected */ this._lineHeight = 42;
		/** @protected */ this._lineBase = 42;

		/**
		 *
		 * @type {TypographicFont}
		 * @protected
		 */
		this._font = null;

	}

	/**
	 *
	 * @returns {TypographicFont}
	 */
	get typographic() { return this._font; }

	/**
	 *
	 * @returns {boolean}
	 */
	get isReady() {

		return this._isReady;

	}

	/**
	 *
	 * @returns {string}
	 */
	get weight() {

		return this._weight;

	}

	/**
	 *
	 * @returns {string}
	 */
	get style() {

		return this._style;

	}

	/**
	 *
	 * @returns {Texture}
	 */
	get texture() {

		return this._texture;

	}

	/**
	 * @param {Function.<ShaderMaterial|Material>} v
	 * @abstract
	 */
	set fontMaterial( v ) {
		throw Error( `FontVariant('${this.id}')::fontMaterial - is abstract.` );
	}

	/**
	 * @return {Function.<ShaderMaterial|Material>}
	 * @abstract
	 */
	get fontMaterial() {
		throw Error( `FontVariant('${this.id}')::fontMaterial - is abstract.` );
	}

	/**
	 *
	 * @returns {string}
	 */
	get id(){
		return `${this._name}(w:${this.weight},s:${this.style})`;
	}

	/**
	 *
	 * @param {string} character
	 * @returns {TypographicGlyph}
	 */
	getTypographicGlyph( character ) {

		let typographicGlyph = this._chars[ character ];
		if ( typographicGlyph ) return typographicGlyph;

		// Auto generate whitespace chars
		if ( character.match( /\s/ ) ) return this._chars[ " " ];

		const fallbackCharacter = this._getFallbackCharacter( character );
		if( fallbackCharacter ) {

			typographicGlyph = this._chars[ fallbackCharacter ];
			if ( typographicGlyph ) return typographicGlyph;

		}

		throw Error( `FontVariant('${this.id}')::getTypographicGlyph() - character('${character}') and/or fallback character were not found in provided msdf charset.` );
	}


	/* eslint-disable no-unused-vars */
	/**
	 * @abstract
	 * @protected
	 * @param {string} missingChar
	 * @returns {string|null}
	 */
	_getFallbackCharacter( missingChar ) {  /* eslint-enable no-unused-vars */
		throw new Error(`FontVariant(${typeof this})::_getFallbackCharacter() is abstract and should therefore be overridden.`);
	}

	/* eslint-disable no-unused-vars */
	/**
	 * Convert an InlineCharacter to a geometry
	 *
	 * @abstract
	 * @param {InlineGlyph} inline
	 * @param {MeshUIBaseElement} element
	 * @returns {BufferGeometry|Array.<BufferGeometry>}
	 */
	getGeometricGlyph( inline, element ) {

		throw new Error(`FontVariant(${typeof this})::getGeometryCharacter() is abstract and should therefore be overridden.`);

	}

	/* eslint-enable no-unused-vars */


	/**
	 * Obtain the kerning amount of a glyphPair
	 * @param {string} glyphPair
	 * @returns {number}
	 */
	getKerningAmount( glyphPair ){

		//or zero offset if kerning glyphPais is not defined
		return this._kernings[ glyphPair ] ? this._kernings[ glyphPair ] : 0;

	}


	/**
	 * Perform some changes on the character description of this font
	 * @param {Object.<string,Object.<string,number|string>>} adjustmentObject
	 */
	adjustTypographicGlyphs( adjustmentObject ){

		for ( const char in adjustmentObject ) {

			const typographicGlyph = this.getTypographicGlyph( char );
			const glyphAdjustment = adjustmentObject[ char ];
			for ( const propertyToAdjust in glyphAdjustment ) {

				typographicGlyph["_"+propertyToAdjust] = adjustmentObject[char][propertyToAdjust];

			}

		}

	}

	/**
	 *
	 * @private
	 */
	_checkReadiness() {

		if ( this._readyCondition() ) {

			_setReady( this );

		}

	}

	/* eslint-disable no-unused-vars */
	/**
	 * @abstract
	 * @param element
	 * @internal
	 */
	_alterElementProperties( element ) {  /* eslint-enable no-unused-vars */

		throw new Error(`FontVariant(${typeof this})::_alterElementProperties() is abstract and should therefore be overridden.`);

	}

	/**
	 *
	 * @abstract
	 * @returns {boolean}
	 * @protected
	 */
	_readyCondition () {

		// ie: MSDFFontVariant
		// Must have chars and a texture
		// return this._chars && this._texture

		throw new Error(`FontVariant(${typeof this})::_readyCondition() is abstract and should therefore be overridden.`);
	}

}

/***********************************************************************************************************************
 * INTERNAL STUFF
 **********************************************************************************************************************/


const _readyEvent = { type: 'ready' };

/**
 * Set the ready status of a fontVariant
 * @param {FontVariant} fontVariant
 * @private
 */
function _setReady( fontVariant ) {

	fontVariant._isReady = true;
	fontVariant.dispatchEvent( _readyEvent );

}

/**
 * @typedef {Object.<string,number>} KerningPairs
 *
 */

/* harmony default export */ const font_FontVariant = (FontVariant);

;// CONCATENATED MODULE: ./src/core/properties/FontProperty.js



class FontProperty extends BaseProperty{

	/**
	 *
	 * @param {FontVariant} [value=null]
	 */
	constructor( value = null ) {

		super( 'font', value, false);

		this._needsUpdate = false;

		/**
		 *
		 * @type {FontVariant|null}
		 * @internal
		 */
		this._fontVariant = null;


		/**
		 * @typedef ReadyClosure
		 * @type { ()=> void|null }
		 */

		/**
		 *
		 * @type {ReadyClosure}
		 * @private
		 */
		this._handleFontReadyClosure = null;

		/**
		 * @override
		 */
		this.isValid = FontProperty_isValid;

	}

	output( out ) {

		out[this._id] = this._fontVariant;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	update( element, out ) { 	/* eslint-enable no-unused-vars */

		// if a previous font isset, be sure no event remains
		if ( this._fontVariant && !this._fontVariant.isReady ) {

			this._fontVariant.removeEventListener( 'ready', this._handleFontReadyClosure );

		}

		// obtain font from value or from style combinaison
		if( this._value && this._value instanceof font_FontVariant ) {

			this._fontVariant = this._value;

		} else {


			const fontFamily = element._fontFamily._value;
			if( fontFamily ) {

				this._fontVariant = fontFamily.getVariant(
					element._fontWeight._value,
					element._fontStyle._value,
				);

			}

		}

		if( !this._fontVariant ) return;

		this._fontVariant._alterElementProperties( element );

		this._handleFontReadyClosure = _readyClosure( element, this );

		// new font, means rebuild inlines, now or soon
		if ( !this._fontVariant.isReady ) {

			// @TODO : clear inlines components
			// this.inlines = null;

			this._fontVariant.addEventListener( 'ready', this._handleFontReadyClosure );

		} else {

			this._handleFontReadyClosure();

		}

		// Set the default material
		if( !element._fontMaterial._defaultMaterial || !(element._fontMaterial._defaultMaterial instanceof this._fontVariant.fontMaterial) ) {

			element._fontMaterial._defaultMaterial = new this._fontVariant.fontMaterial();
			element._fontMaterial._needsUpdate = true;

		}

	}

	/**
	 * @override
	 * @param {FontVariant} value
	 */
	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @return {FontVariant}
	 */
	get value() { return this._value; }


	/**
	 *
	 * @return {FontVariant|null}
	 */
	get fontVariant() { return this._fontVariant; }

	/**
	 *
	 */
	dispose () {

		if( this._handleFontReadyClosure ) {

			this._fontVariant.removeEventListener( 'ready', this._handleFontReadyClosure );
			this._handleFontReadyClosure = null;

		}

		this._value = null;
		this._fontVariant = null;

	}

}


/**
 *
 * @param {number} value
 * @return {boolean}
 * @private
 */
function FontProperty_isValid( value ) {

	if( ! ( value instanceof font_FontVariant )  ) {

		console.warn(`.font value '${value}' is not valid. It requires a FontVariant instance. Aborted`);
		return false;

	}

	return true;

}

/**
 *
 * @param {MeshUIBaseElement} element
 * @param {FontProperty} fontProperty
 * @return {() => void}
 * @private
 */
function _readyClosure( element, fontProperty ) {
	return function () {

		fontProperty._needsUpdate = true;// ? update itself?
		element._glyphs._needsProcess = true;

		// this._transferToMaterial();

		// request parse update and parent layout
		// this.update( true, true, false );
		// this.getHighestParent().update( false, true, false );

		// remove the listener
		fontProperty._fontVariant.removeEventListener( 'ready', fontProperty._handleFontReadyClosure );
		fontProperty._handleFontReadyClosure = null;

	}
}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/visibility/Display.js



class Display extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'display', defaultValue );

		// configure
		this._value = 'flex';
		this._allowsInherit = false;
		this._needsUpdate = false;


		this.isValidValue = Display_isValid;

	}

	computeOutputValue( element ) {

		element._visible._value = this._output !== 'none';

	}
}

const Display_AVAILABLE_VALUES = ['none','flex'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function Display_isValid( value ) {

	if( Display_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) display value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/BoxSizing.js



class BoxSizing extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'boxSizing', defaultValue );

		// Configure
		this._allowsInherit = false;

		this.isValidValue = BoxSizing_isValid;

	}

	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		element._bounds._needsUpdate = true;

	}

}


/**
 *
 * @type {Array.<string>}
 */
const BoxSizing_AVAILABLE_VALUES = ['border-box', 'content-box'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function BoxSizing_isValid( value ) {

	if( BoxSizing_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) boxSizing value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/StyleColorProperty.js



//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

class StyleColorProperty extends SubStyleProperty {

	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue, false );

		/**
		 * @type {Color}
		 * @protected
		 */
		this._value = new external_three_namespaceObject.Color();

		this.output = this._outputValue;
	}

	/* eslint-disable no-unused-vars */
	/**
	 * @override
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input !== 'inherit' ) {

			this._value.set(this._input);

		}

	}

	set inline( value ) {

		// Colors are too wide to perform validation checks each time
		// if( ! this.isValidValue( value ) ) return;

		this._input = this._inline = value;

		this._needsUpdate = true;

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/StyleFactorProperty.js


class StyleFactorProperty extends SubStyleProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} defaultValue
	 */
	constructor( propertyId, defaultValue ) {

		super( propertyId, defaultValue, true );

		this.isValidValue = StyleFactorProperty_isValid;

		this._allowsInherit = false;

		this._input = defaultValue;

		this._value = defaultValue;

		this.output = this._outputValue;

		this.computeOutputValue = this._computeFromInherited;

	}


	_outputValue( out ) {

		out[this._id] = this._inheritedInput;

	}



}

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function StyleFactorProperty_isValid( value ) {

	if ( value < 0 && value > 1.0 ) {

		console.warn( `(.style) styleFactorProperty('${this.id}') value '${value}' is not valid)` );
		return false;

	}

	return true;

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/background/BackgroundImage.js

//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


class BackgroundImage extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'backgroundImage', defaultValue, true );


		this._input = null;

		// configure
		this._allowsInherit = false;

		/**
		 *
		 * @type {Vector2}
		 * @internal
		 */
		this._textureSize = new external_three_namespaceObject.Vector2( 1,1 );

		this.isValidValue = BackgroundImage_isValid;

	}

	/**
	 * @override
	 * @return {any|Texture|null}
	 */
	get value() {

		return this._value;

	}

	output( out ) {

		out[this._id] = this._value;

		out['tSize'] = this._textureSize;

	}


	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		// @TODO : URL
		this._value = this._inheritedInput;

		// ?
		// out[this.id] = this._value;

		if( this._value instanceof external_three_namespaceObject.Texture && !this._value.image ) {
			console.warn( `ThreeMeshUI - .backgroundImage :: Please provide preloaded texture in order to have accurate sizing.`);
			return;
		}

		this._needsProcess = true;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 */
	process( element ) { /* eslint-enable no-unused-vars */

		if( this._value ) {

			this._textureSize.set( this._value.image.width, this._value.image.height );

		} else {

			this._textureSize.set( 1 , 1 );

		}

	}

}

/* eslint-disable no-unused-vars */
/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function BackgroundImage_isValid( value ) { /* eslint-enable no-unused-vars */

	// @TODO : Texture or URL() or String or ID ?
	//console.log( "todo, validate image value", value);

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/background/BackgroundSize.js



/**
 * @property {"cover"|"contain"|"stretch"} value
 */
class BackgroundSize extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'backgroundSize', defaultValue, true );

		this.isValidValue = BackgroundSize_isValid;

		this.output = this._outputValue;
	}

}

const BackgroundSize_AVAILABLE_VALUES = ['cover','contain','stretch'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function BackgroundSize_isValid( value ) {

	if( BackgroundSize_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) backgroundSize value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/visibility/Overflow.js




class Overflow extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'overflow', defaultValue, true );

		this.isValidValue = Overflow_isValid;

		/**
		 *
		 * @type {Array.<Plane>|null}
		 * @internal
		 */
		this._clippingPlanes = null;

		this._renderStrategy = this._emptyRender;
	}

	/**
	 * Update of overflow is a bit different, as parent may trigger changes on it
	 * @override
	 */
	update( element, out ) {

		// in any case, it will compute value. It doesn't have updateRequire evaluation
		// let updateRequired = true;

		// Inline has priority if set
		if ( this._inline !== undefined && this._inline !== 'unset' ) {

			this._input = this._inline;

		}
		// or fallback on computed
		else if ( this._computed !== undefined ) {

			this._input = this._computed;

		}

		if ( !this._allowsInherit ) {

			this._inheritedInput = this.getInheritedInput( element );

		}

		this.computeOutputValue( element );

		// rebuild same properties on children 'inheritance'
		for ( const childUIElement of element._children._uis ) {
			childUIElement[ `_overflow` ]._needsUpdate = true;
		}

		this.output( out );

	}

	output( out ) {

		out['clippingPlanes'] = this._clippingPlanes;

	}

	computeOutputValue( element ) {

		// update self --------------------
		super.computeOutputValue( element );

		if( this._value === 'hidden' ) {

			this._renderStrategy = this._propagateRender;

		}else{

			this._renderStrategy = this._emptyRender;
			this._clippingPlanes = null;
		}


		const parent = element._parent._value;
		if( parent !== null ) {

			// Check that parent is hiddenOverflow or has clippingPlanes
			const overflowParent = parent._overflow;
			if ( ( overflowParent._value === 'hidden' || overflowParent._clippingPlanes !== null ) && !this._clippingPlanes ) {

				// add planes and render
				this._clippingPlanes =  [
					// top
					new external_three_namespaceObject.Plane( new external_three_namespaceObject.Vector3( 0, -1, 0 ), 1 ),
					// right
					new external_three_namespaceObject.Plane( new external_three_namespaceObject.Vector3( -1, 0, 0 ), 1 ),
					// bottom
					new external_three_namespaceObject.Plane( new external_three_namespaceObject.Vector3( 0, 1, 0 ), 1 ),
					// left
					new external_three_namespaceObject.Plane( new external_three_namespaceObject.Vector3( 1, 0, 0 ), 1 ),
				];

				// bind the parent to the clipping plane in a custom property
				for ( let i = 0; i < this._clippingPlanes.length; i++ ) {
					this._clippingPlanes[ i ].parent = parent;
				}

				// Also add parent clipping planes if isset
				if( overflowParent._clippingPlanes !== null ) {
					this._clippingPlanes.push( ...overflowParent._clippingPlanes );
				}

				this._renderStrategy = this._hiddenRender;
				this._needsRender = true;

			} else if ( ( overflowParent._value === 'visible' || overflowParent._clippingPlanes === null ) && this._clippingPlanes !== null ){

				// remove planes and render
				this._clippingPlanes = null;
				this._renderStrategy = this._emptyRender;
				this._needsRender = true;

			}

		}

	}

	render( element) {

		this._renderStrategy( element );

	}

	/* eslint-disable no-unused-vars */	_emptyRender( element ) { /* eslint-enable no-unused-vars */ }

	_hiddenRender( element ) {


		const parentUI = element._parent._value;

		const yLimit = parentUI._bounds._offsetHeight;
		const xLimit = parentUI._bounds._offsetWidth;
		const padding = parentUI._padding._value;
		const border = parentUI._borderWidth._value;

		for ( let i = 0; i < 4 && i < this._clippingPlanes.length ; i++ ) {
			const clippingPlane = this._clippingPlanes[ i ];

			switch ( i % 4 ) {
				// top
				case 0:
					clippingPlane.constant = yLimit / 2 - ( padding.x + border.x );
					break;

				// right
				case 1:
					clippingPlane.constant = xLimit / 2 - ( padding.y + border.y );
					break;

				// bottom
				case 2:
					clippingPlane.constant = yLimit / 2 - ( padding.z + border.z );
					break;

				// left
				case 3:
					clippingPlane.constant = xLimit / 2 - ( padding.w + border.w );
					break;
			}

			clippingPlane.applyMatrix4( parentUI.matrixWorld )

		}

		for ( let i = 0; i < element._children._uis.length; i++ ) {
			const ui = element._children._uis[ i ];
			ui._overflow._needsRender = true;
		}

	}

	_propagateRender( element ) {

		for ( let i = 0; i < element._children._uis.length; i++ ) {
			const ui = element._children._uis[ i ];
			ui._overflow._needsRender = true;
		}

	}

}

const Overflow_AVAILABLE_VALUES = ['visible', 'hidden'];
function Overflow_isValid( value ) {

	if( Overflow_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) overflow value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/utils/Units.js
const WORLD_UNITS = 'rem';

//
const CENTIMETERS = 'cm';
const MILLIMETERS = 'mm';
const INCHES = 'in';

const UV = 'em';
const PERCENT = '%';

const availableUnits = [ WORLD_UNITS, UV, PERCENT ];


/**
 * Obtain a valid unit
 * @param {string} requestedUnits
 * @returns {string}
 */
const validateUnits = function( requestedUnits ) {

	// Sent default units if requested units not available
	if( availableUnits.indexOf( requestedUnits) === -1 ) return WORLD_UNITS;

	return requestedUnits;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/border/BorderRadius.js




//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class BorderRadius extends StyleVector4Property {

	/**
	 *
	 * @param {Vector4} defaultValue
	 */
	constructor( defaultValue ) {

		super( 'borderRadius', defaultValue );

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._valueUV = this._value.clone();

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._input = new external_three_namespaceObject.Vector4(0,0,0,0);
		/**
		 *
		 * @type {boolean}
		 * @private
		 */
		this._mediation = true;

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerTL = new external_three_namespaceObject.Vector2(0, 1);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerTR = new external_three_namespaceObject.Vector2(1, 1);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerBR = new external_three_namespaceObject.Vector2(1, 0);

		/**
		 *
		 * @type {Vector2}
		 * @private
		 */
		this._cornerBL = new external_three_namespaceObject.Vector2(0, 0);

		const mediationTop = new BorderRadiusMediator( this._valueUV, [ 'x', 'y' ] ); // bottom
		const mediationBottom = new BorderRadiusMediator( this._valueUV, [ 'z', 'w'] ); // top
		const mediationLeft = new BorderRadiusMediator( this._valueUV, [ 'x', 'w'] ); // right
		const mediationRight = new BorderRadiusMediator( this._valueUV, [ 'y', 'z'] ); // left

		mediationTop.complementaryMediation = mediationBottom;
		mediationBottom.complementaryMediation = mediationTop;
		mediationLeft.complementaryMediation = mediationRight;
		mediationRight.complementaryMediation = mediationLeft;

		/**
		 *
		 * @type {Array.<BorderRadiusMediator>}
		 * @private
		 */
		this._sideMediators = [ mediationTop, mediationBottom, mediationLeft, mediationRight ];

		this._units = WORLD_UNITS;

	}

	/**
	 *
	 * @param {string} units
	 */
	set units( units ) {

		this._units = validateUnits( units );

		this._needsProcess = true;

	}

	/**
	 *
	 * @returns {string}
	 */
	get units() { return this._units; }

	/**
	 *
	 * @param {boolean} v
	 */
	set mediation ( v) {

		if( v !== this._mediation ){

			this._mediation = v;

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @returns {boolean}
	 */
	get mediation () { return this._mediation; }


	/**
	 *
	 * @param {Object.<string,any>} out
	 */

	output( out ) {

		out["cornerTL"] = this._cornerTL;
		out["cornerTR"] = this._cornerTR;
		out["cornerBR"] = this._cornerBR;
		out["cornerBL"] = this._cornerBL;

	}

	/**
	 *
	 * @override
	 */
	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._vector4ValueSetter( this._value, this._input );

		this._needsProcess = true;

	}


	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	process( element ){ /* eslint-enable no-unused-vars */

		this._needsRender = true;

	}

	/**
	 *
	 * @override
	 */
	render( element ){

		this._valueUV.copy( this._value );

		const elementWidth = element._bounds._offsetWidth;
		const elementHeight = element._bounds._offsetHeight;

		// @TODO: Units process could be strategies
		if( this._units === PERCENT ) {
			this._valueUV.divideScalar(100);
		}

		// @TODO: Units process could be strategies
		if( this._units === WORLD_UNITS ) {
			this._valueUV.divideScalar( Math.min(elementWidth , elementHeight) );
		}



		/**
		 * mediate
		 * Be sure no side is greater than 1 (uv units)
		 */
		if( this._mediation ) {

			do {

				this._sideMediators.forEach( srm => srm.computeValue() );
				this._sideMediators.sort( ( a, b ) => {
					return a.value < b.value ? 1 : -1
				} );

				if ( this._sideMediators[ 0 ].value > 1.0 ) {
					this._sideMediators[ 0 ].mediate();
				}

			} while ( this._sideMediators[ 0 ].value > 1.0 );

		}


		let sX = elementWidth > elementHeight ? elementHeight/elementWidth : 1;
		let sY = elementWidth < elementHeight ? elementWidth/elementHeight : 1;

		// Do not scale pourcentages, allowing ovals
		if( this._units === PERCENT ){
			sX = sY = 1.0;
		}

		this._cornerTL.x = this._valueUV.x * sX;
		this._cornerTL.y = 1 - (this._valueUV.x * sY );

		this._cornerTR.x = 1 - (this._valueUV.y * sX );
		this._cornerTR.y = 1 - (this._valueUV.y * sY );

		this._cornerBR.x = 1 - (this._valueUV.z * sX );
		this._cornerBR.y = this._valueUV.z * sY;

		this._cornerBL.x = this._valueUV.w * sX;
		this._cornerBL.y = this._valueUV.w * sY;

	}

	/**
	 *
	 */
	dispose() {

		for ( const sideMediator of this._sideMediators ) {

			sideMediator.dispose();

		}

		this._sideMediators = null;

		this._cornerTL = null;
		this._cornerTR = null;
		this._cornerBR = null;
		this._cornerBL = null;

		super.dispose();

	}

	/**
	 *
	 * @param {Number} v
	 */
	set topLeft( v ) {

		if( this._input.x === v ) return;

		this._input.x = v;
		this._needsUpdate = true;

	}

	/**
	 *
	 * @returns {number}
	 */
	get topLeft() { return this._input.x; }

	/**
	 *
	 * @param {Number} v
	 */
	set topRight( v ) {

		if( this._input.y === v ) return;

		this._input.y = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get topRight() { return this._input.y; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottomRight( v ) {
		if( this._input.z === v ) return;

		this._input.z = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottomRight() { return this._input.z; }

	/**
	 *
	 * @param {Number} v
	 */
	set bottomLeft( v ) {

		if( this._input.w === v ) return;

		this._input.w = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @returns {number}
	 */
	get bottomLeft() { return this._input.w; }


	/**
	 * @override
	 * @param {Number} v
	 */
	set top( v ) {

		if( this._input.x === v && this._input.y === v ) return;

		this._input.x = this._input.y = v;
		this._needsUpdate = true;

	}

	/**
	 * @override
	 * @returns {number}
	 */
	get top() { return (this._input.x + this._input.y) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set right( v ) {

		if( this._input.y === v && this._input.z === v ) return;

		this._input.y = this._input.z = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get right() { return (this._input.y + this._input.z) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set bottom( v ) {
		if( this._input.z === v && this._input.w === v ) return;

		this._input.z = this._input.w = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get bottom() { return (this._input.z + this._input.w) / 2; }

	/**
	 * @override
	 * @param {Number} v
	 */
	set left( v ) {

		if( this._input.w === v && this._input.x === v ) return;

		this._input.w = this._input.x = v;
		this._needsUpdate = true;
	}

	/**
	 * @override
	 * @returns {number}
	 */
	get left() { return (this._input.w + this._input.x) / 2; }

}

/**
 * Job: Contains two border radiuses values of the same side
 * 			If their sums is greater than 1 (uv units) mediation could occurs
 */
class BorderRadiusMediator {

	/**
	 *
	 * @param {Vector4} borderRadiuses
	 * @param {Array.<string>} sideProperties
	 */
	constructor( borderRadiuses, sideProperties ) {

		/**
		 *
		 * @type {Vector4}
		 * @private
		 */
		this._borderRadiuses = borderRadiuses;

		/**
		 *
		 * @type {Array<string>}
		 * @private
		 */
		this._sideProperties = sideProperties;

		/**
		 *
		 * @type {BorderRadiusMediator|null}
		 * @private
		 */
		this._complementaryMediation = null;

		/**
		 *
		 * @type {number}
		 * @private
		 */
		this._value = 0;
	}

	/**
	 * The sum of the border radius of that side
	 * @returns {number}
	 */
	get value(){ return this._value; }

	/**
	 * A complementary side mediation ie: For top, complementary is bottom
	 * @param {BorderRadiusMediator} brm
	 */
	set complementaryMediation( brm ){

		this._complementaryMediation = brm;

	}

	/**
	 * Adds all side property to compute the value of that side
	 */
	computeValue(){

		let totalRadius = 0;

		for ( const radius of this._sideProperties ) {

			totalRadius += this._borderRadiuses[radius];

		}

		this._value = totalRadius;
	}

	/**
	 *
	 * @param {boolean} [mediateOpposite=true]
	 */
	mediate( mediateOpposite = true ){

		// Mediation only occurs when sum of radius are greater than 1 (uv units)
		if( this._value < 1.0 ) return;

		// Simply divide each component by the sum
		for ( const radius of this._sideProperties ) {

			this._borderRadiuses[radius] /= this._value;

		}

		if( mediateOpposite ) {

			// and also mediate the complementary
			this._complementaryMediation.mediate( false );

		}

	}

	/**
	 *
	 */
	dispose() {

		this._complementaryMediation = null;
		this._borderRadiuses = null;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/border/BorderWidth.js



class BorderWidth extends StyleVector4Property{

	/**
	 *
	 * @param defaultValue
	 */
	constructor( defaultValue ) {

		super ( 'borderWidth', defaultValue, false );


		this._valueUV = this._value.clone();

		// configure
		this.output = this._outputValue;

		this._units = WORLD_UNITS;

	}

	/**
	 *
	 * @param {string} units
	 */
	set units( units ) {

		this._units = validateUnits( units );

		this._needsUpdate = true;

	}

	/**
	 *
	 * @returns {string}
	 */
	get units() { return this._units; }

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	computeOutputValue( element) { /* eslint-enable no-unused-vars */

		this._vector4ValueSetter( this._value, this._input );

		this._needsProcess = true;

		element._bounds._needsUpdate = true;
		element._layouter._needsUpdate = true;

		// for ( let i = 0; i < element._children._uis.length; i++ ) {
		// 	const child = element._children._uis[ i ];
		// 	element._bounds._needsUpdate = true;
		// }

	}

	_outputValue( out ) {
		out[this._id] = this._valueUV;
	}

	/**
	 *
	 * @override
	 */
	process( element ) {
		this._needsRender = true;
		element._borderRadius._needsRender = true;
	}

	/**
	 * @override
	 */
	render( element ) {

		this._valueUV.copy( this._value );

		const offsetWidth = element._bounds._offsetWidth;
		const offsetHeight = element._bounds._offsetHeight;

		// @TODO: Units process could be strategies
		if( this._units === PERCENT ){

			console.log( "Percent" );
			// this._valueUV.divideScalar( 100 );
			console.log( this._valueUV );

		}

		// @TODO: Units process could be strategies
		if( this._units === WORLD_UNITS ) {

			if( offsetWidth !== 0) {
				this._valueUV.w /= offsetWidth;
				this._valueUV.y /= offsetWidth;
			}


			if( offsetHeight !== 0 ) {
				this._valueUV.x /= offsetHeight;
				this._valueUV.z /= offsetHeight;
			}


		} else if( this._units === UV ) {

			// @TODO: Units process could be strategies

			if( offsetWidth !== 0 ) {
				const sX = offsetWidth > offsetHeight ? offsetHeight/offsetWidth : 1;
				this._valueUV.y *= sX;
				this._valueUV.w *= sX;
			}

			if( offsetHeight !== 0 ) {
				const sY = offsetWidth < offsetHeight ? offsetWidth/offsetHeight : 1;

				this._valueUV.x *= sY;
				this._valueUV.z *= sY;
			}

		}

	}

}

;// CONCATENATED MODULE: ./src/core/properties/VisibleProperty.js


class VisibleProperty extends BaseProperty{

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 */
	constructor( propertyId, value = true ) {

		super( 'visible', value, true );

		this._needsUpdate = false;

	}

	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */

		element.visible = this._value;

		if( element._parent._value ) {

			element._parent._value._children._needsUpdate = true;

		}

	}

	set value( value ) {

		if( ! this.isValid( value) ) return;

		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/**
	 *
	 * @return {boolean}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/background/BackgroundColorProperty.js



class BackgroundColorProperty extends StyleColorProperty {

	constructor( defaultValue ) {

		super( 'backgroundColor', defaultValue, false );

		this._input = 'transparent';

		this._allowsInherit = false;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */


		element._backgroundMesh.visible = !(this._input === 'none' || this._input === 'transparent');

		if( this._input === 'inherit' ) {

			// @TODO: Background should not be inheritable
			this._value.set(this.getInheritedInput( element ));

		} else if( !(this._input === 'transparent' || this._input === 'none') ) {
			this._value.set( this._input );
		}

	}

}



;// CONCATENATED MODULE: ./src/core/properties/EmptyProperty.js


class EmptyProperty extends BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId = 'untitled' ) {

		super( propertyId, undefined, false );

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @param {Object.<string,any>} out
	 */
	update( element , out ) { /* eslint-enable no-unused-vars */ }

	/* eslint-disable no-unused-vars */
	/**
	 * Output this property in a dictionnary
	 * @param {Object.<string,any>} out
	 */
	output( out ) { /* eslint-enable no-unused-vars */ }

}

;// CONCATENATED MODULE: ./src/core/properties/InlineJustificator.js


class InlineJustificator extends BaseProperty {

	constructor() {
		super( 'inlineJustificator', null, false );

		/**
		 *
		 * @type {Lines}
		 * @private
		 */
		this._value = null;
	}


	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */ }

	/**
	 *
	 * @override
	 */
	process( element ) {

		const INNER_HEIGHT = element._bounds._innerHeight;
		const lines = element._layouter._value;

		const textHeight = Math.abs( lines.height );


		// Line vertical positioning
		let justificationOffset = ( () => {

			switch ( element._alignItems._value ) {

				case 'inherit':
				case 'start':
					return INNER_HEIGHT / 2 ;

				case 'end':
					return textHeight - ( INNER_HEIGHT / 2 );


				case 'stretch': // @TODO : Stretch should trigger an error in own property
				case 'center':
					return textHeight/2;

			}
		} )();

		//console.log( justificationOffset );

		// Apply padding
		const padding = element._padding._value;
		const border = element._borderWidth._value;

		justificationOffset += ( - padding.x + padding.z ) / 2 + ( - border.x + border.z ) / 2;

		//

		lines.forEach( ( line ) => {

			line.y += justificationOffset;

			line.forEach( ( inline ) => {

				inline.offsetY += justificationOffset;

			} );

		} );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/AlignItemsProperty.js


/**
 *
 * @type {Array.<string>}
 */
const AlignItemsProperty_AVAILABLE_VALUES = ['start', 'center', 'end', 'stretch'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
const AlignItemsProperty_isValid = function ( value ) {

	if( AlignItemsProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) alignItems value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

class AlignItemsProperty extends SubStyleProperty {

	constructor() {

		super( 'alignItems', 'inherit', true );

		this.isValidValue = AlignItemsProperty_isValid;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/TextAlignProperty.js



class TextAlignProperty extends SubStyleProperty {

	constructor() {

		super( 'textAlign', 'inherit', true );

		this.isValidValue = TextAlignProperty_isValid;

	}

}

/**
 *
 * @type {Array.<string>}
 */
const TextAlignProperty_AVAILABLE_VALUES = ['left', 'right', 'center', 'justify', 'justify-left', 'justify-right','justify-center'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
const TextAlignProperty_isValid = function ( value ) {

	if( TextAlignProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) textAlign value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/FlexDirectionProperty.js



//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class FlexDirectionProperty extends SubStyleProperty {

	constructor() {

		super( 'flexDirection', 'inherit', true );

		// configure

		this.isValid = FlexDirectionProperty_isValid;

	}

}

const FlexDirectionProperty_AVAILABLE_VALUES = ['row','row-reverse', 'column', 'column-reverse'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function FlexDirectionProperty_isValid( value ) {

	if( FlexDirectionProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) flexDirection value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/JustifyContentProperty.js


class JustifyContentProperty extends SubStyleProperty {

	constructor() {

		super( 'justifyContent', 'inherit', true );

		/**
		 *
		 * @override
		 */
		this.isValidValue = JustifyContentProperty_isValid;

	}

}

/**
 *
 * @type {Array.<string>}
 */
const JustifyContentProperty_AVAILABLE_VALUES = [ 'start', 'center', 'end', 'space-between', 'space-around', 'space-evenly' ];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function JustifyContentProperty_isValid( value ) {

	if ( JustifyContentProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) justifyContent value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}


;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/OrderProperty.js


class OrderProperty extends SubStyleProperty {

	constructor( ) {

		super( 'order', 0, true );

		this._value = 0;

		this._input = 0;

		// configure
		this._allowsInherit = false;
	}

	/* eslint-disable no-unused-vars */computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._value = this._inheritedInput;

		// require parent children (order) update, which will require layout update
		if( element._parent._value ) {

			element._parent._value._children._needsProcess = true;

		}

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/PositionProperty.js



class PositionProperty extends SubStyleProperty {

	constructor( ) {

		super( 'position', 'static', true );

		// configure
		this._allowsInherit = false;

		this._value = 'static';
		this._needsUpdate = false;

		this.computeOutputValue = this._computeFromInherited;

		this.isValidValue = PositionProperty_isValid;

	}

	_computeFromInherited( element ) {
		super._computeFromInherited( element );

		//console.log( "Position update")
		// require parent to compute children -> bounds -> etc...
		if( element._parent._value ) element._parent._value._children._needsProcess = true;
	}

}

const PositionProperty_AVAILABLE_VALUES = ['static', 'absolute'];

function PositionProperty_isValid( value ) {

	if( PositionProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) position value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/StyleSideProperty.js


class StyleSideProperty extends SubStyleProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {number} defaultValue
	 */
	constructor( propertyId, defaultValue = null ) {

		super( propertyId, defaultValue, true );

		/**
		 * @type {any}
		 * @internal
		 */
		this._input = 'auto';

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._auto = true;

		/**
		 *
		 * @type {boolean}
		 * @internal
		 */
		this._relative = false;

		this._updateRequired = true;



	}

	/**
	 *
	 * @param {any} value
	 */
	set inline( value ) {

		if( ! this.isValidValue( value ) ) return;

		if( value === this._inline ) {

			// do nothing no update, the value hasn't changed
			return;

		}

		this._inline = value;

		if( this._input === this._inline ) return;

		this._parseInput();

	}

	get inline() { return this._inline; }

	_parseInput() {

		let updateRequired = true;

		// Inline has priority if set
		if( this._inline !== undefined && this._inline !== 'unset' ) {

			this._input = this._inline;

		}
		// or fallback on computed
		else if( this._computed !== undefined ) {

			// do not require an update if the value remains
			if( this._computed === this._input ) updateRequired = false;
			this._input = this._computed;

		}
		// or fallback on default value
		else {

			updateRequired = this._input === 'inherit';

		}

		if( updateRequired ) {

			this._auto = !this._input || this._input === 'auto';


			if ( !this._auto ) {

				// string can be percentages
				// console.log( this._input, typeof this._input, this._input.endsWith('%'))
				if ( ( typeof this._input === 'string' || this._input instanceof String ) && this._input.endsWith( '%' ) ) {


					this._relative = true;
					this._value = 0;


					const floatValue = parseFloat( this._input.replace( '%', '' ).trim() );
					if ( !isNaN( floatValue ) ) {

						this._value = floatValue / 100;

					}

				} else {

					this._relative = false;
					this._value = this._input;

				}

			} else {


				this._relative = false;

			}

			this._needsUpdate = this._updateRequired = updateRequired;

		}

	}

	update( element, out ) {

		if( this._updateRequired ) {

			this._updateRequired = false;

			if( !this._allowsInherit ) {

				this._inheritedInput = this.getInheritedInput( element );

			}

			this.computeOutputValue( element );

			// rebuild same properties on children 'inheritance'
			for ( const childUIElement of element._children._uis ) {

				childUIElement[`_${this._id}`]._needsUpdate = true;

			}

			this.output( out );

			if( element._parent._value ) element._parent._value._layouter._needsProcess = true;

		}

	}

	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		element._bounds._needsUpdate = true;
		element._renderer._needsRender = true;
		// element._autoSize._needsProcess = true;

	}

	getInheritedInput ( element ) {

		if( this._input !== 'inherit' && !this._auto ) return this._input;

		const parent = element._parent._value;
		if( parent ) {

			return parent[`_${this._id}`].getInheritedInput( parent )

		}

		return this.getDefaultValue();

	}

	getDefaultValue() {

		return 0;

	}

	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/WidthProperty.js


class WidthProperty extends StyleSideProperty {

	constructor() {

		super( 'width' );

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/bounds/HeightProperty.js


class HeightProperty extends StyleSideProperty {

	constructor() {

		super( 'height' );

	}

	computeOutputValue( element ) {

		super.computeOutputValue( element );

	}

}



;// CONCATENATED MODULE: ./src/core/properties/TextContentDefault.js


class TextContentDefault extends EmptyProperty{

	constructor() {

		super( "textContent" );

		this._needsUpdate = false;

	}


	/* eslint-disable no-unused-vars */ set value( v ) { 	/* eslint-enable no-unused-vars */ }


	/* eslint-disable no-unused-vars */ process( element ) { /* eslint-enable no-unused-vars */

		let content = "";
		for ( let i = 0; i < element.children.length; i++ ) {
			const child = element.children[i];

			if( child.isUI ) {

				content += child.textContent;

			}

		}

		this._value = content;

	}


}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontStyleProperty.js



class FontStyleProperty extends SubStyleProperty {

	constructor( defaultValue ) {

		super( 'fontStyle', defaultValue, true );

		this.isValidValue = FontStyleProperty_isValid;

	}

}


const FontStyleProperty_AVAILABLE_VALUES = ['normal', 'italic'];
function FontStyleProperty_isValid( value ) {

	if( FontStyleProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) fontStyle value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontWeightProperty.js



class FontWeightProperty extends SubStyleProperty {

	constructor( ) {

		super( 'fontWeight', 'inherit', true );

		this.isValid = FontWeightProperty_isValid;
	}

}

const FontWeightProperty_AVAILABLE_VALUES = ['100','200','300','400','500','600','700','800','900','light','normal','bold','bolder'];
function FontWeightProperty_isValid( value ) {

	if( FontWeightProperty_AVAILABLE_VALUES.indexOf( value.toString() ) === -1 ) {

		console.warn( `(.style) fontWeight value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/font/TypographicFont.js
class TypographicFont {

	constructor() {

		/** @protected */ this._size = 42;
		/** @protected */ this._lineHeight = 42;
		/** @protected */ this._lineBase = 38;
		/** @protected */ this._name = "-";
		/** @protected */ this._charset = "";

	}

	/**
	 *
	 * @returns {number}
	 */
	get size() { return this._size; }

	/**
	 *
	 * @returns {number}
	 */
	get lineHeight() { return this._lineHeight; }

	/**
	 *
	 * @returns {number}
	 */
	get lineBase() { return this._lineBase; }

	/**
	 *
	 * @returns {string}
	 */
	get name() { return this._name; }

	/**
	 *
	 * @returns {string}
	 */
	get charset() { return this._charset; }

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFTypographicFont.js


class MSDFTypographicFont extends TypographicFont{

	/**
	 *
	 * @param {import('./MSDFFontVariant').MSDFJson} json
	 */
	constructor( json ) {

		super();

		// base description
		this._size = json.info.size;
		this._lineHeight = json.common.lineHeight;
		this._lineBase = json.common.base;

		this._name = json.info.face;

		// MSDF
		this._textureWidth = json.common.scaleW;
		this._textureHeight = json.common.scaleH;

		this._charset = json.chars.map( char => char.char ).join("");

	}

	/**
	 *
	 * @returns {number}
	 */
	get textureWidth() { return this._textureWidth; }

	/**
	 *
	 * @returns {number}
	 */
	get textureHeight() { return this._textureHeight; }

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFInlineGlyph.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @extends InlineGlyph
 */
class MSDFInlineGlyph extends InlineGlyph{

	/**
	 *
	 * @param {MSDFTypographicGlyph} characterDesc
	 */
	constructor( characterDesc ) {

		super( characterDesc );

	}

	/**
	 *
	 * @returns {{left:number, right:number, top:number, bottom:number}|null}
	 */
	get uv() { return this.typographic.uv; }

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFTypographicGlyph.js



//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


/**
 * @property {MSDFTypographicFont} _font
 */
class MSDFTypographicGlyph extends TypographicGlyph {

	/**
	 * @param {MSDFTypographicFont} fontDescription
	 * @param {import('./MSDFFontVariant').MSDFJsonChar} characterData
	 */
	constructor( fontDescription, characterData ) {

		super( fontDescription );

		this._char = characterData.char;
		this._width = characterData.width;
		this._heigth = characterData.height;

		this._xadvance = characterData.xadvance ? characterData.xadvance : this._width;
		this._xoffset = characterData.xoffset ? characterData.xoffset : 0;
		this._yoffset = characterData.yoffset ? characterData.yoffset : 0;

		// Msdf requires uvs
		this._uv = characterData.uv ? characterData.uv : null;

		if ( !isNaN( characterData.x ) ) {
			// transform absolute pixel values into uv values [0,1]
			this._uv = {
				left: characterData.x / fontDescription.textureWidth,
				right: ( characterData.x + characterData.width ) / fontDescription.textureWidth,
				top: 1 - ( ( characterData.y + characterData.height ) / fontDescription.textureHeight ),
				bottom: 1 - ( characterData.y / fontDescription.textureHeight )
			};
		}
	}


	/**
	 *
	 * @returns {{left: number, right: number, top: number, bottom: number}|null}
	 */
	get uv() {

		return this._uv;

	}

	/**
	 * @override
	 * @param {string} otherChar
	 * @returns {MSDFTypographicGlyph}
	 */
	clone( otherChar ) {

		return new MSDFTypographicGlyph( this._font, {
			char: otherChar,
			width: this._width,
			height: this._heigth,
			xadvance: this._xadvance,
			xoffset: this._xoffset,
			yoffset: this._yoffset,

			// Msdf requires uvs
			uv: null
		} );

	}


	/**
	 * @override
	 * @returns {MSDFInlineGlyph}
	 */
	asInlineGlyph() {

		return new MSDFInlineGlyph( this );

	}

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFGeometricGlyph.js


//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

class MSDFGeometricGlyph extends external_three_namespaceObject.PlaneGeometry {

	/**
	 *
	 * @param {MSDFInlineGlyph} inline
	 * @param {MeshUIBaseElement} element
	 */
	constructor( inline, element ) {


		// default w & h segments
		let wS = 1, hS=1;

		// If charOBJ, try to distribute segments proportionally
		const typographicFontSize = inline.typographic.font.size;

		const segments = element._segments.value;

		wS = Math.ceil((inline.typographic.width / typographicFontSize) * segments );
		hS = Math.ceil((inline.typographic.height / typographicFontSize) * segments );

		super( inline.width, inline.height, wS, hS );

		// If inline has UVs
		if ( inline.uv ) {

			this._mapUVs( inline );

			this._transformGeometry( inline );

			// White spaces (we don't want our plane geometry to have a visual width nor a height)
		} else {

			this._nullifyUVs();

			this.scale( 0, 0, 1 );

			this.translate( 0, inline.fontSize / 2, 0 );

		}

		this.name = "GlyphGeometry";
		// Demo alter geometry
		// const maxOffset = inline.fontSize / 10;
		// this.translate(0 , -maxOffset + Math.random() * maxOffset*2, 0 )
		// this.rotateZ(-0.1 + 0.2 * Math.random() )

	}

	/**
	 * Compute the right UVs that will map the MSDF texture so that the passed character
	 * will appear centered in full size
	 * @param {MSDFInlineGlyph} inline
	 * @private
	 */
	_mapUVs( inline ) {


		const width = inline.uv.right - inline.uv.left;
		const height = inline.uv.bottom - inline.uv.top;

		const originalUvArray = this.getAttribute('uv').array.slice()

		const uvGlyph = [];
		for (let i = 0; i < originalUvArray.length; i += 2) {
			const u = originalUvArray[i];
			const v = originalUvArray[i + 1];

			uvGlyph.push(inline.uv.left + width * u);
			uvGlyph.push(inline.uv.top + height * v);
		}
		this.setAttribute('uvG', new external_three_namespaceObject.BufferAttribute(new Float32Array(uvGlyph), 2));

	}

	/**
	 * Set all UVs to 0, so that none of the glyphs on the texture will appear
	 * @private
	 * */
	_nullifyUVs() {

		// const uvAttribute = this.attributes.uv;
		//
		// for ( let i = 0; i < uvAttribute.count; i++ ) {
		//
		// 	uvAttribute.setXY( i, 0, 0 );
		//
		// }

		const uvGlyph = [];
		const length = this.getAttribute('uv').array.length;
		for ( let i = 0; i < length; i++ ) {
			uvGlyph.push(0);
		}
		this.setAttribute('uvG', new external_three_namespaceObject.BufferAttribute(new Float32Array(uvGlyph), 2));

	}

	/**
	 *
	 * @TODO: Apply pivot properties when splitText isset
	 * Gives the previously computed scale and offset to the geometry
	 * @param {MSDFInlineGlyph} inline
	 * @private
	 */
	_transformGeometry( inline ) {

		//

		// @TODO : Evaluate this as being a property. It can wait until splitGeometry
		this.translate(
			inline.width / 2,
			-inline.height/2,
			0
		);

	}

}

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.vertex.glsl.js
/**
 *
 * @type {string}
 */
const program = /* glsl */`
attribute vec2 uvG;
varying vec2 vUvG;
`;

/* harmony default export */ const msdf_alphaglyph_pars_vertex_glsl = (program);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.vertex.glsl.js
/**
 *
 * @type {string}
 */
const msdf_alphaglyph_vertex_glsl_program = /* glsl */ `
vUvG = uvG;
`;

/* harmony default export */ const msdf_alphaglyph_vertex_glsl = (msdf_alphaglyph_vertex_glsl_program);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-offsetglyph.vertex.glsl.js
/**
 *
 * @type {string}
 */
const msdf_offsetglyph_vertex_glsl_program = /* glsl */`
gl_Position.z -= 0.00001;
`;

/* harmony default export */ const msdf_offsetglyph_vertex_glsl = (msdf_offsetglyph_vertex_glsl_program);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.pars.fragment.glsl.js
/**
 *
 * @type {string}
 */
const msdf_alphaglyph_pars_fragment_glsl_program = /* glsl */`
varying vec2 vUvG;
uniform sampler2D glyphMap;
uniform vec2 unitRange;
// functions from the original msdf repo:
// https://github.com/Chlumsky/msdfgen#using-a-multi-channel-distance-field
float median(float r, float g, float b) {
	return max(min(r, g), min(max(r, g), b));
}
float screenPxRange() {

	// precomputed unitRange as recommended by Chlumsky
	// vec2 unitRange = vec2(pxRange)/vec2(textureSize(glyphMap, 0));
	vec2 screenTexSize = vec2(1.0)/fwidth(vUvG);
	return max(0.5*dot(unitRange, screenTexSize), 1.0);
}
float tap(vec2 offsetUV) {
	vec3 msd = texture( glyphMap, offsetUV ).rgb;
	float sd = median(msd.r, msd.g, msd.b);
	float screenPxDistance = screenPxRange() * (sd - 0.5);
	float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
	return alpha;
}
`;

/* harmony default export */ const msdf_alphaglyph_pars_fragment_glsl = (msdf_alphaglyph_pars_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderChunks/msdf-alphaglyph.fragment.glsl.js
/**
 *
 * @type {string}
 */
const msdf_alphaglyph_fragment_glsl_program = /* glsl */`
	float alpha;
#ifdef NO_RGSS

	alpha = tap( vUvG );

#else

	// shader-based supersampling based on https://bgolus.medium.com/sharper-mipmapping-using-shader-based-supersampling-ed7aadb47bec
	// per pixel partial derivatives
	vec2 dx = dFdx(vUvG);
	vec2 dy = dFdy(vUvG);
	// rotated grid uv offsets
	vec2 uvOffsets = vec2(0.125, 0.375);
	vec2 offsetUV = vec2(0.0, 0.0);
	// supersampled using 2x2 rotated grid
	alpha = 0.0;
	offsetUV.xy = vUvG + uvOffsets.x * dx + uvOffsets.y * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG - uvOffsets.x * dx - uvOffsets.y * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG + uvOffsets.y * dx - uvOffsets.x * dy;
	alpha += tap(offsetUV);
	offsetUV.xy = vUvG - uvOffsets.y * dx + uvOffsets.x * dy;
	alpha += tap(offsetUV);
	alpha *= 0.25;

#endif

	alpha = clamp( alpha, 0.0, 1.0 );

#ifdef INVERT_ALPHA

	alpha = 1.0 - alpha;

#endif

	diffuseColor.a *= alpha;
`;

/* harmony default export */ const msdf_alphaglyph_fragment_glsl = (msdf_alphaglyph_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/utils/mediator/transformers/MaterialTransformers.js

/**
 * Transfer the alphaTest value from MeshUIComponent to material
 * @type {import('../Mediator').MediationTransformer}
 */
const alphaTestTransformer = function ( target, targetProperty, value) {

	// set the value in the material
	target.alphaTest = value;

	toPreprocessorTriggerTransformer(target, 'USE_ALPHATEST', value > 0 );

}

/**
 * Transform a value as a preprocessor trigger
 * @type {import('../Mediator').MediationTransformer}
 */
const toPreprocessorTriggerTransformer = function ( target, targetProperty, value) {

	if( !target.defines ) return;

	if ( value ) {

		if( target.defines[targetProperty] === undefined ) {

			target.defines[targetProperty] = '';
			target.needsUpdate = true;

		}

	} else if( target.defines[targetProperty] !== undefined ) {

		delete target.defines[targetProperty];
		target.needsUpdate = true;

	}

}

/**
 * Transform a value as a preprocessor value
 * @type {import('../Mediator').MediationTransformer}
 */
const asPreprocessorValueTransformer = function ( target, targetProperty, value) {

	// abort if nothing to update, same value
	if( target.defines[targetProperty] && target.defines[targetProperty] === value ) return;

	// or change the preprocessor and update
	target.defines[targetProperty] = value;
	target.needsUpdate = true;

}

/**
 * Transform a value as a uniform or userData value
 * Non primitive values are bounds
 * @type {import('../Mediator').MediationTransformer}
 */
const uniformOrUserDataTransformer = function( material, property, value ) {

	if( material.userData[property] ) {

		material.userData[property].value = value;

	}else{

		material.uniforms[property].value = value;

	}

}

const toUserDataTransformer = function( material, property, value ) {

	material.userData[property].value = value;

}

;// CONCATENATED MODULE: ./src/font/msdf/utils/MSDFFontMaterialUtils.js







/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

/**
 * MSDFFontMaterialUtils provides utilities
 * for customizing other threejs or custom materials
 * into a three-mesh-ui MSDFFontMaterial
 */
class MSDFFontMaterialUtils {

	/**
	 * Alter a material options with required fontMaterial options and or default values
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureMaterialOptions( materialOptions ) {
		materialOptions.transparent = true;
		materialOptions.alphaTest = materialOptions.alphaTest || 0.02;
	}

	/**
	 * As three-mesh-ui FontMaterial relies on webgl preprocessors,
	 * lets force the material to have a proper defines object
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static ensureDefines( threeMaterial ) {
		if ( !threeMaterial.defines ) {
			threeMaterial.defines = {};
		}
	}

	/**
	 *
	 * @param {Material|ShaderMaterial} threeMaterial
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureUserData( threeMaterial, materialOptions ) {
		threeMaterial.userData.glyphMap = { value: materialOptions.glyphMap };
		threeMaterial.userData.unitRange = { value: new external_three_namespaceObject.Vector2() };
	}

	/**
	 *
	 * @param {any} shader
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static bindUniformsWithUserData( shader, threeMaterial ) {

		shader.uniforms.glyphMap = threeMaterial.userData.glyphMap;
		shader.uniforms.unitRange = threeMaterial.userData.unitRange;
	}

	/**
	 *
	 * @param shader
	 */
	static injectShaderChunks( shader ) {
		MSDFFontMaterialUtils.injectVertexShaderChunks( shader );
		MSDFFontMaterialUtils.injectFragmentShaderChunks( shader );
	}

	/**
	 *
	 * @param shader
	 */
	static injectVertexShaderChunks( shader ) {
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_pars_vertex>',
			'#include <uv_pars_vertex>\n' + msdf_alphaglyph_pars_vertex_glsl
		);

		// vertex chunks
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_vertex>',
			'#include <uv_vertex>\n' + msdf_alphaglyph_vertex_glsl
		)

		shader.vertexShader = shader.vertexShader.replace(
			'#include <project_vertex>',
			'#include <project_vertex>\n' + msdf_offsetglyph_vertex_glsl
		)
	}

	/**
	 *
	 * @param shader
	 */
	static injectFragmentShaderChunks( shader ) {
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <uv_pars_fragment>',
			'#include <uv_pars_fragment>\n' + msdf_alphaglyph_pars_fragment_glsl
		)

		// fragment chunks
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <alphamap_fragment>',
			'#include <alphamap_fragment>\n' + msdf_alphaglyph_fragment_glsl
		)
	}



	/**
	 * Mix a threejs Material into a three-mesh-ui FontMaterial
	 * @param {typeof Material|ShaderMaterial} materialClass
	 * @returns {typeof Material|ShaderMaterial}
	 */
	static from( materialClass ) {

		return class extends materialClass {

			/**
			 *
			 * @abstract
			 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
			 */
			static get fontMaterialProperties() {
				return MSDFFontMaterialUtils.mediation;
			}

			constructor( options = {} ) {

				// same as FontMaterial extension
				MSDFFontMaterialUtils.ensureMaterialOptions( options );
				super( options );
				MSDFFontMaterialUtils.ensureDefines( this );
				MSDFFontMaterialUtils.ensureUserData( this, options );

				// defines two internal properties in order to kept
				// user allowed to use onBeforeCompile for its own stuff
				// 1- store an callback for user
				/* eslint-disable no-unused-vars */
				this._userDefinedOnBeforeCompile = (shader) => {};
				/* eslint-enable no-unused-vars */
				// 2- store the cumulative callback
				this._onBeforeCompile = this._cumulativeOnBeforeCompile;
			}

			////////////////////////////
			// OnBeforeCompile Override
			///////////////////////////

			/**
			 * Override the setter of onBeforeCompile in order to never overwrite
			 * the three-mesh-ui fontMaterial onBeforeCompile
			 * @param { (shader:any) => void }fct
			 */
			set onBeforeCompile( fct ) {
				// only store it as userDefinedCallback
				this._userDefinedOnBeforeCompile = fct;
			}

			/**
			 * Override the getter of onBeforeCompile in order to
			 * always deliver the cumulativeCallbacks to threejs
			 * @returns { (shader:any) => void }
			 */
			get onBeforeCompile() {
				return this._onBeforeCompile;
			}

			/**
			 *
			 * On before compile that first run three-mesh-ui fontMaterial
			 * then user defined onBeforeCompile
			 * @param shader
			 * @private
			 */
			_cumulativeOnBeforeCompile = ( shader ) => {
				// bind uniforms
				MSDFFontMaterialUtils.bindUniformsWithUserData( shader, this );

				// inject both vertex and fragment shaders
				MSDFFontMaterialUtils.injectShaderChunks( shader );

				// user defined additional onBeforeCompile
				this._userDefinedOnBeforeCompile( shader );
			}
		}
	}

	/**
	 *
	 * @returns {Object<{m: string, t?: (function((Material|ShaderMaterial), string, *): void)}>}
	 */
	static get mediation() {

		return mediationDefinitions;

	}

}

/**
 * Convert a fontVariant to a material glyphMap texture
 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
 * @private
 */
const _fontToGlyphMapTransformer = function( fontMaterial, materialProperty, value) {

	const texture = value ? value.texture : null;
	const unitRange = value ? value.unitRange : new external_three_namespaceObject.Vector2();

	if( fontMaterial[materialProperty] !== undefined ) {

		fontMaterial.glyphMap = texture;
		fontMaterial.unitRange = unitRange;
		return;
	}

	if( fontMaterial.userData && fontMaterial.userData.glyphMap ) {

		fontMaterial.userData.glyphMap.value = texture;
		fontMaterial.userData.unitRange.value = unitRange;

	}

}

/**
 *
 * @type {(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void }
 * @private
 */
const _RGSSTransformer = function( fontMaterial, materialProperty, value){

	if ( value && value !== 'antialiased' ) {

		fontMaterial.defines['NO_RGSS'] = '';

	} else {

		delete fontMaterial.defines['NO_RGSS'];

	}

	fontMaterial.needsUpdate = true;

}


/**
 *
 * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
 */
const mediationDefinitions = {
	clippingPlanes: { m: 'clippingPlanes' },
	color: { m: 'color' },
	fog: { m: 'fog' },
	font: { m: "glyphMap", t: _fontToGlyphMapTransformer },
	fontAlphaTest: { m: 'alphaTest', t: alphaTestTransformer },
	fontSide: { m: 'side' },
	fontOpacity: { m: 'opacity' },
	fontSmooth: { m: 'NO_RGSS', t: _RGSSTransformer },
	invertAlpha: { m: 'INVERT_ALPHA', t: toPreprocessorTriggerTransformer },
}

;// CONCATENATED MODULE: ./src/font/msdf/renderers/ShaderLib/msdf-fontmaterial.glsl.js






/**
 *
 * @type {string}
 */
const vertexShader = /* glsl */`
${msdf_alphaglyph_pars_vertex_glsl}

#include <fog_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {
	${msdf_alphaglyph_vertex_glsl}
	#include <begin_vertex>
	#include <project_vertex>
	${msdf_offsetglyph_vertex_glsl}
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}
`

/**
 *
 * @type {string}
 */
const fragmentShader = /* glsl */`
uniform vec3 diffuse;
uniform float opacity;
${msdf_alphaglyph_pars_fragment_glsl}
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	// instead of <color_fragment> : vec4 diffuseColor
	vec4 diffuseColor = vec4( diffuse, opacity );
	${msdf_alphaglyph_fragment_glsl}
	#include <alphatest_fragment>
	// instead of <output_fragment>
	gl_FragColor = diffuseColor;


	#include <clipping_planes_fragment>
	#include <fog_fragment>
}
`

;// CONCATENATED MODULE: ./src/font/msdf/materials/MSDFFontMaterial.js




// JSDoc related import
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

const ALPHA_TEST = 0.02;


/**
 * This material implements the msdf rendering shader
 */
class MSDFFontMaterial extends external_three_namespaceObject.ShaderMaterial {

	/**
	 * This static method is mandatory for extending ThreeMeshUI.MSDFFontMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {MSDFFontMaterialUtils.mediation}
	 * @returns {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return MSDFFontMaterialUtils.mediation;

	}

	constructor( materialOptions = {} ) {

		super( {

			uniforms: {
				'glyphMap': { value: null }, // texture
				'diffuse': { value: null }, // vec3
				'opacity': { value: 1 },
				'unitRange': { value: new external_three_namespaceObject.Vector2(0,0) }, // vec2
				'alphaTest': { value: ALPHA_TEST },

				...external_three_namespaceObject.UniformsLib.fog,
			},
			transparent: true,
			clipping: true,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			extensions: {
				derivatives: true
			},
		} );

		// webgl preprocessor AlphaTest set by default
		this.defines[ 'USE_ALPHATEST' ] = '';
		this.needsUpdate = true;

		// initiate additional properties
		this.noRGSS = materialOptions.noRGSS || false;

		// Set fog as default
		this.fog = false;
	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {Color}
	 */
	get color() {

		return this.uniforms.diffuse.value;

	}

	/**
	 *
	 * @param {Color} v
	 */
	set color( v ) {

		this.uniforms.diffuse.value = v;

	}

	/**
	 *
	 * @param {number} v
	 */
	set opacity( v ) {

		if( this.uniforms )
			this.uniforms.opacity.value = v;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {number}
	 */
	get opacity() {

		return this.uniforms.opacity.value;

	}




	/**
	 * The color will be the diffuse uniform
	 * @returns {Vector2}
	 */
	get unitRange() {

		return this.uniforms.unitRange.value;

	}

	/**
	 *
	 * @param {Vector2} v
	 */
	set unitRange( v ) {

		this.uniforms.unitRange.value.copy( v );

	}

	/**
	 *
	 * @returns {Texture}
	 */
	get glyphMap() {

		return this.uniforms.glyphMap.value;

	}

	/**
	 *
	 * @param {Texture} v
	 */
	set glyphMap( v ) {

		this.uniforms.glyphMap.value = v;

	}

	/**
	 * Is this a default fontMaterial instance
	 * @returns {boolean}
	 */
	get isDefault() {

		return this.constructor === MSDFFontMaterial;

	}

	/**
	 *
	 * @returns {number}
	 */
	get alphaTest() {
		return this.uniforms.alphaTest.value;
	}

	/**
	 *
	 * @param {number} v
	 */
	set alphaTest( v ) {
		this.uniforms.alphaTest.value = v;
	}

}

;// CONCATENATED MODULE: ./src/font/msdf/MSDFFontVariant.js







//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

/**
 * @extends {FontVariant}
 */
class MSDFFontVariant extends font_FontVariant {

	constructor( weight, style, json, texture ) {

		super(weight, style);

		// provide default values
		this._unitRange = new external_three_namespaceObject.Vector2( 1, 1 );

		if ( json.pages ) {

			this._buildData( json );

		} else {

			_loadJson( this, json );

		}

		if ( texture instanceof external_three_namespaceObject.Texture ) {

			this._texture = texture;
			this._buildTexture( texture );

		} else if( typeof(texture) === 'string' || texture instanceof String ){

			_loadTexture( this, texture );

		} else {

			throw new Error(`ThreeMeshUI::MSDFVariant provided 'texture' parameter is '${typeof texture}'. Only Texture and String allowed.`)

		}

		this._defaultMaterialClass = MSDFFontMaterial;


		this._checkReadiness();

	}


	get texture() {

		return this._texture;

	}

	get unitRange() {

		return this._unitRange;

	}

	/**
	 * @param {Function.<Material|ShaderMaterial>} v
	 * @override
	 */
	set fontMaterial( v ) {

		this._defaultMaterialClass = v;

	}

	/**
	 *
	 * @override
	 * @returns {Function.<Material|ShaderMaterial>}
	 */
	get fontMaterial() {

		return this._defaultMaterialClass;

	}

	/**
	 *
	 * @param {MSDFJson} json
	 * @private
	 */
	_buildData( json ) {

		this._font = new MSDFTypographicFont( json );

		/**
		 *
		 * @type {import('../FontVariant').KerningPairs}
		 * @private
		 */
		this._kernings = this._buildKerningPairs( json );
		this._chars = this._buildCharacters( json );

		this._chars[ " " ] = this._buildCharacterWhite( json );
		this._chars[ "\n" ] = this._buildCharacterWhite( json, '\n' , 0.001, 1);
		this._chars[ "\t" ] = this._buildCharacterWhite( json, '\t' , 4, 1);

		this._size = json.info.size;
		this._lineHeight = json.common.lineHeight;
		this._lineBase = json.common.base;

		this._distanceRange = json.distanceField.distanceRange;

		// precompute the unit range as recommended by chlumsky
		// @see https://github.com/Chlumsky/msdfgen
		// "I would suggest precomputing unitRange as a uniform variable instead of pxRange for better performance."
		this._unitRange = new external_three_namespaceObject.Vector2(this._distanceRange, this._distanceRange)
			.divide( new external_three_namespaceObject.Vector2( json.common.scaleW, json.common.scaleH ) );

	}

	/**
	 *
	 * @param texture
	 * @private
	 */
	_buildTexture( texture ) {

		texture.generateMipmaps = false;
		texture.minFilter = external_three_namespaceObject.LinearFilter;
		texture.magFilter = external_three_namespaceObject.LinearFilter;

		texture.needsUpdate = true;

	}

	/**
	 * @abstract
	 * @protected
	 * @param {string} missingChar
	 * @returns {string|null}
	 */
	_getFallbackCharacter( missingChar ) {
		return font_FontLibrary.missingCharacter( this, missingChar );
	}

	/**
	 *
	 * @override
	 * @param {import('./../InlineGlyph').default|import('./MSDFInlineGlyph').default} inline
	 * @param {import('./../../core/elements/MeshUIBaseElement').default} element
	 * @returns {MSDFGeometricGlyph}
	 */
	getGeometricGlyph( inline, element ) {

		return new MSDFGeometricGlyph( inline, element );

	}

	/**
	 * Abstraction implementation
	 *
	 * @returns {boolean}
	 * @private
	 */
	_readyCondition() {

		return this._chars && this._texture && this._texture.image;

	}

	/**
	 * Ensure that each font variant has its kerning dictionary
	 * @see src/font/msdf/FontVariantMSDF.js for an implementation
	 *
	 * @param {MSDFJson} json
	 * @returns {import('../FontVariant').KerningPairs}
	 * @private
	 */
	_buildKerningPairs( json ) {

		const friendlyKernings = {};

		// Loop through each kernings pairs defined in msdf json
		for ( let i = 0; i < json.kernings.length; i++ ) {

			const kerning = json.kernings[ i ];

			// ignore zero kerned glyph pair
			if ( kerning.amount === 0 ) continue;

			// Build and store the glyph paired characters "ij","WA", ... as keys, referecing their kerning amount
			const glyphPair = String.fromCharCode( kerning.first, kerning.second );

			// This would then be available for fast access
			friendlyKernings[ glyphPair ] = kerning.amount;

		}

		// update the font to keep it
		return friendlyKernings;

	}


	/**
	 *
	 * @param {MSDFJson} json
	 * @private
	 */
	_buildCharacters( json ) {

		const friendlyChars = {};

		for ( let i = 0; i < json.chars.length; i++ ) {
			const charOBJ = json.chars[ i ];

			friendlyChars[ charOBJ.char ] = new MSDFTypographicGlyph( this._font, charOBJ );

		}

		return friendlyChars;

	}

	/**
	 *
	 * @param {MSDFJson} json
	 * @param char
	 * @param scaleX
	 * @param scaleY
	 * @private
	 */
	_buildCharacterWhite( json, char = " ", scaleX = 1, scaleY = 1 ) {
		return new MSDFTypographicGlyph( this._font,
			{
				char,
				width: (json.info.size / 3)*scaleX,
				height: (json.info.size * 0.7)*scaleY,
			});
	}


	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @private
	 */
	_alterElementProperties( element ) { /* eslint-enable no-unused-vars */ }
}

/***********************************************************************************************************************
 * INTERNAL STUFF
 **********************************************************************************************************************/


/**
 * Load a msdf json then build fontVariant data
 *
 * @param {FontVariant} fontVariant
 * @param {string} jsonUrl
 * @private
 */
function _loadJson( fontVariant, jsonUrl ) {

	new external_three_namespaceObject.FileLoader().setResponseType( 'json' ) .load( jsonUrl, ( response ) => {

		fontVariant._buildData( response );
		fontVariant._checkReadiness();

	} );

}

/**
 * Load a msdf texture then build texture
 *
 * @param {FontVariant} fontVariant
 * @param {string} textureUrl
 * @private
 */
function _loadTexture( fontVariant, textureUrl ) {

	fontVariant._texture = new external_three_namespaceObject.TextureLoader().load( textureUrl, ( texture ) => {

		fontVariant._buildTexture( texture );
		fontVariant._checkReadiness();

	} );

}

/***********************************************************************************************************************
 * MSDF FILE FORMAT DESCRIPTION
 * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
 **********************************************************************************************************************/

/**
 * @typedef {Object} MSDFJson
 *
 * @property {MSDFJsonInfo} info
 * @property {MSDFJsonCommon} common
 * @property {Array.<MSDFJsonPage>} pages
 * @property {Array.<MSDFJsonChar>} chars
 * @property {{fieldType:string, distanceRange:number}} distanceField
 * @property {Array.<MSDFJsonKerning>} kernings
 */

/**
 *
 * @typedef {Object} MSDFJsonInfo
 *
 * @property {string} face This is the name of the true type font.
 * @property {number} size The size of the true type font.
 * @property {boolean} bold The font is bold.
 * @property {boolean} italic The font is italic.
 * @property {string[]} charset The name of the OEM charset used (when not unicode).
 * @property {boolean} unicode 	Set to 1 if it is the unicode charset.
 * @property {number} stretchH The font height stretch in percentage. 100% means no stretch.
 * @property {number} smooth Set to 1 if smoothing was turned on.
 * @property {number} aa The supersampling level used. 1 means no supersampling was used.
 * @property {Array.<number>} padding TThe padding for each character (up, right, down, left).
 * @property {Array.<number>} spacing The spacing for each character (horizontal, vertical).
 * @property {number} outline (not found) The outline thickness for the characters.
 */

/**
 *
 * @typedef {Object} MSDFJsonCommon
 *
 * @property {number} lineHeight This is the distance in pixels between each line of text.
 * @property {number} base The number of pixels from the absolute top of the line to the base of the characters.
 * @property {number} scaleW The width of the texture, normally used to scale the x pos of the character image.
 * @property {number} scaleH The height of the texture, normally used to scale the y pos of the character image.
 * @property {number} pages The number of texture pages included in the font.
 * @property {boolean} packed
 * @property {number} alphaChnl
 * @property {number} redChnl
 * @property {number} greenChnl
 * @property {number[]} blueChnl
 */

/**
 * @typedef {Object} MSDFJsonPage
 *
 * @property {string} id The page id.
 * @property {string} file The texture file name.
 */

/**
 *
 * @typedef {Object} MSDFJsonChar
 *
 * @property {number} id The character id.
 * @property {number} index The character index.
 * @property {string} char The character.
 * @property {number} x The left position of the character image in the texture.
 * @property {number} y The top position of the character image in the texture.
 * @property {number} width The width of the character image in the texture.
 * @property {number} height The height of the character image in the texture.
 * @property {number} xoffset How much the current position should be offset when copying the image from the texture to the screen.
 * @property {number} yoffset How much the current position should be offset when copying the image from the texture to the screen.
 * @property {number} xadvance How much the current position should be advanced after drawing the character.
 * @property {string} page The texture page where the character image is found.
 * @property {number} chnl The texture channel where the character image is found (1 = blue, 2 = green, 4 = red, 8 = alpha, 15 = all channels).
 * @property {Object} [uv]
 * /



/**
 *
 * @typedef {Object} MSDFJsonKerning
 *
 * @property {number} first The first character id.
 * @property {number} second The second character id.
 * @property {number} amount How much the x position should be adjusted when drawing the second character immediately following the first.
 *
 */

;// CONCATENATED MODULE: ./src/font/FontFamily.js


//JSDoc related imports

/* eslint-disable no-unused-vars */



/* eslint-enable no-unused-vars */

class FontFamily extends external_three_namespaceObject.EventDispatcher {

	/**
	 *
	 * @param {string} name
	 */
	constructor( name ) {

		super();

		/**
		 *
		 * @type {string}
		 * @private
		 */
		this._name = name;

		/**
		 *
		 * @type {Array.<FontVariant>}
		 * @private
		 */
		this._variants = [];

		/**
		 *
		 * @type {boolean}
		 * @private
		 */
		this._isReady = false;

	}

	get isReady() { return this._isReady; }

	/**
	 *
	 * @param {string|number} weight
	 * @param {string} style
	 * @param {string|Object} json
	 * @param {string|Texture} texture
	 * @param {boolean} [override=false]
	 */
	addVariant( weight, style, json, texture, override = false){

		if( override || !this.getVariant( weight, style) ){

			this._isReady = false;

			const newVariant = new MSDFFontVariant( weight, style, json, texture);

			this._variants.push( newVariant );

			if( !newVariant.isReady ){

				newVariant.addEventListener( "ready", this._checkReadiness )

			} else {

				this._checkReadiness();

			}

		} else {

			console.warn(`FontFamily('${this._name}')::addVariant() - Variant(${weight}, ${style}) already exists.`);

		}

		return this;

	}

	/**
	 *
	 * @param {FontVariant} variantImplementation
	 * @param {boolean} [override=false]
	 */
	addCustomImplementationVariant( variantImplementation, override = false){

		if( override || !this.getVariant( variantImplementation.weight, variantImplementation.style) ){

			this._isReady = false;

			this._variants.push( variantImplementation );

			if( !variantImplementation.isReady ){

				variantImplementation.addEventListener( "ready", this._checkReadiness )

			} else {

				this._checkReadiness();

			}

		} else {

			console.warn(`FontFamily('${this._name}')::addCustomImplementationVariant() - Variant(${variantImplementation.weight}, ${variantImplementation.style}) already exists.`);

		}

		return this;

	}

	/**
	 *
	 * @param {string|number} weight
	 * @param {string} style
	 * @returns {FontVariant|null}
	 */
	getVariant( weight, style ){

		weight = uniformizeFontWeight(weight);

		return this._variants.find( fontVariant => fontVariant.weight === weight && fontVariant.style === style );

	}

	/**
	 *
	 * @return {string}
	 */
	get name(){ return this._name; }

	_checkReadiness = () => {

		if( this._variants.every( v => v.isReady ) ) {

			FontFamily_setReady( this );

		}

	}

}

const FontFamily_readyEvent = { type: 'ready' };

/**
 * Set the ready status of a fontVariant
 * @param {FontFamily} fontFamily
 * @private
 */
function FontFamily_setReady( fontFamily ) {

	fontFamily._isReady = true;
	fontFamily.dispatchEvent( FontFamily_readyEvent );

}



;// CONCATENATED MODULE: ./src/font/FontLibrary.js


// JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


const _fontFamilies = {};

/* eslint-disable no-unused-vars */

/**
 *
 * @param {FontFamily} fontFamily
 * @returns {Promise<unknown>}
 */
const prepare = function ( fontFamily ) {

	/**
	 *
	 * @type {FontFamily[]}
	 */
	const families = [ ...arguments ];

	// Check all family are right instance
	families.forEach( f => {

		if( !(f instanceof FontFamily) ) {

			throw new Error(`FontLibrary::prepare() - One of the provided parameter is not a FontFamily. Instead ${typeof f} given.`);

		}

	})

	/**
	 * Check that all provided families are loaded
	 * @returns {boolean}
	 */
	const areAllLoaded = function() {

		return families.every( f => f.isReady );

	}

	// @TODO: Should handle possible rejection
	return new Promise((resolve,reject)=>{

		// Direct resolve if all loaded
		if ( areAllLoaded() ){

			resolve();

		} else {

			// Add listener on each family not ready
			for ( let i = 0; i < families.length; i++ ) {

				const family = families[ i ];
				if( !family.isReady ){

					family.addEventListener( "ready" , ()=> {

						// Resolve if all other families are loaded
						if( areAllLoaded() ) {

							resolve();

						}

					});

				}

			}

		}

	});

}

/* eslint-enable no-unused-vars */


/**
 *
 * @param {string} name
 * @returns {FontFamily}
 */
const addFontFamily = function ( name ) {

	if ( _fontFamilies[ name ] ) {
		console.error( `FontLibrary::addFontFamily - Font('${name}') is already registered` );
	}

	_fontFamilies[ name ] = new FontFamily( name );

	return _fontFamilies[ name ];

}

/**
 *
 * @param {string} name
 * @returns {FontFamily}
 */
const getFontFamily = function( name ) {

	return _fontFamilies[ name ];

}


/**
 *
 * @param { (fontVariant:FontVariant, character:string ) => string|null } handler
 */
const setMissingCharacterHandler = function ( handler ) {

	_missingCharacterHandler = handler;

}

/**
 *
 * @type { (fontVariant:FontVariant, character:string ) => string|null }
 * @private
 */
let _missingCharacterHandler = function ( fontVariant, character ) {

	console.error( `The character '${character}' is not included in the font characters set.` );

	// return a glyph has fallback
	return " ";

};

/**
 *
 * @param {FontVariant} fontVariant
 * @param {string} character
 *
 * @returns {string}
 */
function missingCharacter( fontVariant, character ) {

	// Execute the user defined handled
	return _missingCharacterHandler( fontVariant, character );

}


//

const FontLibrary = {
	addFontFamily,
	getFontFamily,
	prepare,
	setMissingCharacterHandler,
	missingCharacter
};

/* harmony default export */ const font_FontLibrary = (FontLibrary);

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontFamilyProperty.js





class FontFamilyProperty extends SubStyleProperty {

	constructor( ) {

		super( 'fontFamily', 'inherit' , true );

	}


	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input instanceof FontFamily ) {

			this._value = this._input;

		} else if ( this._input === 'inherit' ) {

			// do nothing

		} else if ( typeof this._input === 'string' ) {

			// string - family
			const fontFamily = font_FontLibrary.getFontFamily( this._input );

			if( fontFamily ) {

				this._value = fontFamily;

			} else {

				console.warn( `(.style) fontFamily, the font '${this._input}' is not registered. Aborted.`)

			}

		} else {

			console.warn( `(.style) fontFamily requires a registered fontFamily instance, or the id of a registered fontFamily.`);
			console.warn( `If you want to set a specific font, please use .font property instead.`);

		}

	}

	/**
	 * @override
	 * @return {any|FontFamily|null}
	 */
	get value() { return this._value; }

	getInheritedInput ( element ) {

		if( this._input !== 'inherit' ) return this._input;

		const parent = element._parent._value;
		if( parent ) {

			return parent[`_${this._id}`].getInheritedInput( parent )

		}

		return this.getDefaultValue();

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/LineHeightProperty.js


class LineHeightProperty extends SubStyleProperty {

	/**
	 *
	 */
	constructor() {

		super( 'lineHeight', 'inherit', true );

	}

	update( element, out ) {
		super.update( element, out );

		element._layouter._needsProcess = true;
	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/WhiteSpaceProperty.js



class WhiteSpaceProperty extends SubStyleProperty {

	constructor() {

		super( 'whiteSpace', 'inherit' );

		this.isValidValue = WhiteSpaceProperty_isValid;

	}

}

/**
 *
 * @type {Array.<string>}
 */
const WhiteSpaceProperty_AVAILABLE_VALUES = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'];

/**
 *
 * @param {any} value
 * @return {boolean}
 * @private
 */
function WhiteSpaceProperty_isValid( value ) {

	if( WhiteSpaceProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) whiteSpace value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/LetterSpacingProperty.js


class LetterSpacingProperty extends SubStyleProperty {

	constructor() {

		super( 'letterSpacing', 'inherit', true );

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontSizeProperty.js


class FontSizeProperty extends SubStyleProperty {

	constructor() {

		super( 'fontSize', 'inherit', true );

	}

}



;// CONCATENATED MODULE: ./src/core/properties/geometry/SegmentsProperty.js


class SegmentsProperty extends BaseProperty {

	constructor() {

		super( 'segments', 1, false );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/InvertAlphaProperty.js


/**
 * Class definition
 * @property {boolean|"inherit"} value - propriety description
 *
 */
class InvertAlphaProperty extends InheritableProperty {

	constructor() {

		super( 'invertAlpha', 'inherit' );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontKerningProperty.js



class FontKerningProperty extends SubStyleProperty {

	constructor() {

		super( 'fontKerning', 'inherit' );

		this.isValidValue = FontKerningProperty_isValid;

	}

}


const FontKerningProperty_AVAILABLE_VALUES = ['normal', 'none', 'inherit'];

function FontKerningProperty_isValid( value ) {

	if( FontKerningProperty_AVAILABLE_VALUES.indexOf( value ) === -1 ) {

		console.warn( `(.style) fontKerning value '${value}' is not valid. Aborted` );
		return false;

	}

	return true;

}

;// CONCATENATED MODULE: ./src/core/properties/InheritableBooleanProperty.js


/**
 * @property {boolean|"inherit"} value
 */
class InheritableBooleanProperty extends InheritableProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId) {

		super( propertyId, 'inherit', true );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/InheritableMaterialProperty.js



/**
 * @property {Material|null|"inherit"} value
 */
class InheritableMaterialProperty extends InheritableProperty {

	/**
	 *
	 * @param {string} propertyId
	 */
	constructor( propertyId ) {

		super( propertyId, 'inherit', false );

		/**
		 *
		 * @type {Object.<{m:string, t?:(target:any, targetProperty:string, value:any) => void}>}
		 * @internal
		 */
		this._mediation = {};

		/**
		 *
		 * @type {null}
		 * @internal
		 */
		this._defaultMaterial = null;

	}

	update( element, out ) { 	/* eslint-enable no-unused-vars */

		this._notInheritedValue = this._value;

		if ( this._notInheritedValue === 'inherit' ) {
			this._notInheritedValue = this.getInheritedInput( element );
		} else {
			this.propagate( element );
		}

		// no material
		if ( !this._notInheritedValue ) {

			// reset mediation
			this._mediation = {};

		} else if ( this._notInheritedValue.constructor.mediation ) {

			this._mediation = { ...this._notInheritedValue.constructor.mediation };

		} else {

			this._mediation = {
				clippingPlanes: { m: 'clippingPlanes' },
				fontAlphaTest: { m: 'alphaTest', t: alphaTestTransformer },
				fontSide: { m: 'side' },
				color: { m: 'color' },
				fontOpacity: { m: 'opacity' }
			};

		}

		element._transferToFontMaterial();

		// dispatch to children


		this._outputValue( out );

	}

	/**
	 * @override
	 */
	getInheritedInput( element ) {

		if ( this._value !== 'inherit' ) return this._value;

		let recursiveParent = element;
		let inheritedValue = null;
		while ( recursiveParent._parent._value ) {

			recursiveParent = recursiveParent._parent._value;
			if ( recursiveParent[ `_${this._id}` ]._value !== 'inherit' ) {

				inheritedValue = recursiveParent[ `_${this._id}` ]._value;
				break;
			}

		}

		if ( inheritedValue !== null ) {
			return inheritedValue;
		}

		return this.getDefaultValue();

	}

	getDefaultValue() {
		return this._defaultMaterial;
	}


}

;// CONCATENATED MODULE: ./node_modules/acorn/dist/acorn.mjs
// This file was generated. Do not modify manually!
var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];

// This file was generated. Do not modify manually!
var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];

// This file was generated. Do not modify manually!
var nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0898-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0cf3\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ece\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\u30fb\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f\uff65";

// This file was generated. Do not modify manually!
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ca\ua7d0\ua7d1\ua7d3\ua7d5-\ua7d9\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";

// These are a run-length and offset encoded representation of the
// >0xffff code points that are a valid part of identifiers. The
// offset starts at 0x10000, and each pair of numbers represents an
// offset to the next range, and then a size of the range.

// Reserved word lists for various dialects of the language

var reservedWords = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
};

// And the keywords

var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

var keywords$1 = {
  5: ecma5AndLessKeywords,
  "5module": ecma5AndLessKeywords + " export import",
  6: ecma5AndLessKeywords + " const class extends export import super"
};

var keywordRelationalOperator = /^in(stanceof)?$/;

// ## Character categories

var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

// This has a complexity linear to the value of the code. The
// assumption is that looking up astral identifier characters is
// rare.
function isInAstralSet(code, set) {
  var pos = 0x10000;
  for (var i = 0; i < set.length; i += 2) {
    pos += set[i];
    if (pos > code) { return false }
    pos += set[i + 1];
    if (pos >= code) { return true }
  }
  return false
}

// Test whether a given character code starts an identifier.

function isIdentifierStart(code, astral) {
  if (code < 65) { return code === 36 }
  if (code < 91) { return true }
  if (code < 97) { return code === 95 }
  if (code < 123) { return true }
  if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code)) }
  if (astral === false) { return false }
  return isInAstralSet(code, astralIdentifierStartCodes)
}

// Test whether a given character is part of an identifier.

function isIdentifierChar(code, astral) {
  if (code < 48) { return code === 36 }
  if (code < 58) { return true }
  if (code < 65) { return false }
  if (code < 91) { return true }
  if (code < 97) { return code === 95 }
  if (code < 123) { return true }
  if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code)) }
  if (astral === false) { return false }
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes)
}

// ## Token types

// The assignment of fine-grained, information-carrying type objects
// allows the tokenizer to store the information it has about a
// token in a way that is very cheap for the parser to look up.

// All token type variables start with an underscore, to make them
// easy to recognize.

// The `beforeExpr` property is used to disambiguate between regular
// expressions and divisions. It is set on all token types that can
// be followed by an expression (thus, a slash after them would be a
// regular expression).
//
// The `startsExpr` property is used to check if the token ends a
// `yield` expression. It is set on all token types that either can
// directly start an expression (like a quotation mark) or can
// continue an expression (like the body of a string).
//
// `isLoop` marks a keyword as starting a loop, which is important
// to know when parsing a label, in order to allow or disallow
// continue jumps to that label.

var TokenType = function TokenType(label, conf) {
  if ( conf === void 0 ) conf = {};

  this.label = label;
  this.keyword = conf.keyword;
  this.beforeExpr = !!conf.beforeExpr;
  this.startsExpr = !!conf.startsExpr;
  this.isLoop = !!conf.isLoop;
  this.isAssign = !!conf.isAssign;
  this.prefix = !!conf.prefix;
  this.postfix = !!conf.postfix;
  this.binop = conf.binop || null;
  this.updateContext = null;
};

function binop(name, prec) {
  return new TokenType(name, {beforeExpr: true, binop: prec})
}
var beforeExpr = {beforeExpr: true}, startsExpr = {startsExpr: true};

// Map keyword names to token types.

var keywords = {};

// Succinct definitions of keyword token types
function kw(name, options) {
  if ( options === void 0 ) options = {};

  options.keyword = name;
  return keywords[name] = new TokenType(name, options)
}

var types$1 = {
  num: new TokenType("num", startsExpr),
  regexp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  privateId: new TokenType("privateId", startsExpr),
  eof: new TokenType("eof"),

  // Punctuation token types.
  bracketL: new TokenType("[", {beforeExpr: true, startsExpr: true}),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", {beforeExpr: true, startsExpr: true}),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", {beforeExpr: true, startsExpr: true}),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  dot: new TokenType("."),
  question: new TokenType("?", beforeExpr),
  questionDot: new TokenType("?."),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  invalidTemplate: new TokenType("invalidTemplate"),
  ellipsis: new TokenType("...", beforeExpr),
  backQuote: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", {beforeExpr: true, startsExpr: true}),

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  eq: new TokenType("=", {beforeExpr: true, isAssign: true}),
  assign: new TokenType("_=", {beforeExpr: true, isAssign: true}),
  incDec: new TokenType("++/--", {prefix: true, postfix: true, startsExpr: true}),
  prefix: new TokenType("!/~", {beforeExpr: true, prefix: true, startsExpr: true}),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=/===/!==", 6),
  relational: binop("</>/<=/>=", 7),
  bitShift: binop("<</>>/>>>", 8),
  plusMin: new TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true}),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10),
  starstar: new TokenType("**", {beforeExpr: true}),
  coalesce: binop("??", 1),

  // Keyword token types.
  _break: kw("break"),
  _case: kw("case", beforeExpr),
  _catch: kw("catch"),
  _continue: kw("continue"),
  _debugger: kw("debugger"),
  _default: kw("default", beforeExpr),
  _do: kw("do", {isLoop: true, beforeExpr: true}),
  _else: kw("else", beforeExpr),
  _finally: kw("finally"),
  _for: kw("for", {isLoop: true}),
  _function: kw("function", startsExpr),
  _if: kw("if"),
  _return: kw("return", beforeExpr),
  _switch: kw("switch"),
  _throw: kw("throw", beforeExpr),
  _try: kw("try"),
  _var: kw("var"),
  _const: kw("const"),
  _while: kw("while", {isLoop: true}),
  _with: kw("with"),
  _new: kw("new", {beforeExpr: true, startsExpr: true}),
  _this: kw("this", startsExpr),
  _super: kw("super", startsExpr),
  _class: kw("class", startsExpr),
  _extends: kw("extends", beforeExpr),
  _export: kw("export"),
  _import: kw("import", startsExpr),
  _null: kw("null", startsExpr),
  _true: kw("true", startsExpr),
  _false: kw("false", startsExpr),
  _in: kw("in", {beforeExpr: true, binop: 7}),
  _instanceof: kw("instanceof", {beforeExpr: true, binop: 7}),
  _typeof: kw("typeof", {beforeExpr: true, prefix: true, startsExpr: true}),
  _void: kw("void", {beforeExpr: true, prefix: true, startsExpr: true}),
  _delete: kw("delete", {beforeExpr: true, prefix: true, startsExpr: true})
};

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

var lineBreak = /\r\n?|\n|\u2028|\u2029/;
var lineBreakG = new RegExp(lineBreak.source, "g");

function isNewLine(code) {
  return code === 10 || code === 13 || code === 0x2028 || code === 0x2029
}

function nextLineBreak(code, from, end) {
  if ( end === void 0 ) end = code.length;

  for (var i = from; i < end; i++) {
    var next = code.charCodeAt(i);
    if (isNewLine(next))
      { return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1 }
  }
  return -1
}

var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

var ref = Object.prototype;
var acorn_hasOwnProperty = ref.hasOwnProperty;
var acorn_toString = ref.toString;

var hasOwn = Object.hasOwn || (function (obj, propName) { return (
  acorn_hasOwnProperty.call(obj, propName)
); });

var isArray = Array.isArray || (function (obj) { return (
  acorn_toString.call(obj) === "[object Array]"
); });

var regexpCache = Object.create(null);

function wordsRegexp(words) {
  return regexpCache[words] || (regexpCache[words] = new RegExp("^(?:" + words.replace(/ /g, "|") + ")$"))
}

function codePointToString(code) {
  // UTF-16 Decoding
  if (code <= 0xFFFF) { return String.fromCharCode(code) }
  code -= 0x10000;
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
}

var loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

var Position = function Position(line, col) {
  this.line = line;
  this.column = col;
};

Position.prototype.offset = function offset (n) {
  return new Position(this.line, this.column + n)
};

var SourceLocation = function SourceLocation(p, start, end) {
  this.start = start;
  this.end = end;
  if (p.sourceFile !== null) { this.source = p.sourceFile; }
};

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

function getLineInfo(input, offset) {
  for (var line = 1, cur = 0;;) {
    var nextBreak = nextLineBreak(input, cur, offset);
    if (nextBreak < 0) { return new Position(line, offset - cur) }
    ++line;
    cur = nextBreak;
  }
}

// A second argument must be given to configure the parser process.
// These options are recognized (only `ecmaVersion` is required):

var defaultOptions = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must be
  // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
  // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
  // (the latest version the library supports). This influences
  // support for strict mode, the set of reserved words, and support
  // for new syntax features.
  ecmaVersion: null,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"` or `"module"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called when
  // a semicolon is automatically inserted. It will be passed the
  // position of the inserted semicolon as an offset, and if
  // `locations` is enabled, it is given the location as a `{line,
  // column}` object as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program, and an import.meta expression
  // in a script isn't considered an error.
  allowImportExportEverywhere: false,
  // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
  // When enabled, await identifiers are allowed to appear at the top-level scope,
  // but they are still not allowed in non-async functions.
  allowAwaitOutsideFunction: null,
  // When enabled, super identifiers are not constrained to
  // appearing in methods and do not raise an error when they appear elsewhere.
  allowSuperOutsideMethod: null,
  // When enabled, hashbang directive in the beginning of file is
  // allowed and treated as a line comment. Enabled by default when
  // `ecmaVersion` >= 2023.
  allowHashBang: false,
  // By default, the parser will verify that private properties are
  // only used in places where they are valid and have been declared.
  // Set this to false to turn such checks off.
  checkPrivateFields: true,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: false,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  // When this option has an array as value, objects representing the
  // comments are pushed to it.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: false,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: false
};

// Interpret and default an options object

var warnedAboutEcmaVersion = false;

function getOptions(opts) {
  var options = {};

  for (var opt in defaultOptions)
    { options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt]; }

  if (options.ecmaVersion === "latest") {
    options.ecmaVersion = 1e8;
  } else if (options.ecmaVersion == null) {
    if (!warnedAboutEcmaVersion && typeof console === "object" && console.warn) {
      warnedAboutEcmaVersion = true;
      console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.");
    }
    options.ecmaVersion = 11;
  } else if (options.ecmaVersion >= 2015) {
    options.ecmaVersion -= 2009;
  }

  if (options.allowReserved == null)
    { options.allowReserved = options.ecmaVersion < 5; }

  if (!opts || opts.allowHashBang == null)
    { options.allowHashBang = options.ecmaVersion >= 14; }

  if (isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = function (token) { return tokens.push(token); };
  }
  if (isArray(options.onComment))
    { options.onComment = pushComment(options, options.onComment); }

  return options
}

function pushComment(options, array) {
  return function(block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text,
      start: start,
      end: end
    };
    if (options.locations)
      { comment.loc = new SourceLocation(this, startLoc, endLoc); }
    if (options.ranges)
      { comment.range = [start, end]; }
    array.push(comment);
  }
}

// Each scope gets a bitset that may contain these flags
var
    SCOPE_TOP = 1,
    SCOPE_FUNCTION = 2,
    SCOPE_ASYNC = 4,
    SCOPE_GENERATOR = 8,
    SCOPE_ARROW = 16,
    SCOPE_SIMPLE_CATCH = 32,
    SCOPE_SUPER = 64,
    SCOPE_DIRECT_SUPER = 128,
    SCOPE_CLASS_STATIC_BLOCK = 256,
    SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;

function functionFlags(async, generator) {
  return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0)
}

// Used in checkLVal* and declareName to determine the type of a binding
var
    BIND_NONE = 0, // Not a binding
    BIND_VAR = 1, // Var-style binding
    BIND_LEXICAL = 2, // Let- or const-style binding
    BIND_FUNCTION = 3, // Function declaration
    BIND_SIMPLE_CATCH = 4, // Simple (identifier pattern) catch binding
    BIND_OUTSIDE = 5; // Special case for function names as bound inside the function

var Parser = function Parser(options, input, startPos) {
  this.options = options = getOptions(options);
  this.sourceFile = options.sourceFile;
  this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
  var reserved = "";
  if (options.allowReserved !== true) {
    reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
    if (options.sourceType === "module") { reserved += " await"; }
  }
  this.reservedWords = wordsRegexp(reserved);
  var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
  this.reservedWordsStrict = wordsRegexp(reservedStrict);
  this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
  this.input = String(input);

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.
  this.containsEsc = false;

  // Set up token state

  // The current position of the tokenizer in the input.
  if (startPos) {
    this.pos = startPos;
    this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
    this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
  } else {
    this.pos = this.lineStart = 0;
    this.curLine = 1;
  }

  // Properties of the current token:
  // Its type
  this.type = types$1.eof;
  // For tokens that include more information than their type, the value
  this.value = null;
  // Its start and end offset
  this.start = this.end = this.pos;
  // And, if locations are used, the {line, column} object
  // corresponding to those offsets
  this.startLoc = this.endLoc = this.curPosition();

  // Position information for the previous token
  this.lastTokEndLoc = this.lastTokStartLoc = null;
  this.lastTokStart = this.lastTokEnd = this.pos;

  // The context stack is used to superficially track syntactic
  // context to predict whether a regular expression is allowed in a
  // given position.
  this.context = this.initialContext();
  this.exprAllowed = true;

  // Figure out if it's a module code.
  this.inModule = options.sourceType === "module";
  this.strict = this.inModule || this.strictDirective(this.pos);

  // Used to signify the start of a potential arrow function
  this.potentialArrowAt = -1;
  this.potentialArrowInForAwait = false;

  // Positions to delayed-check that yield/await does not exist in default parameters.
  this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
  // Labels in scope.
  this.labels = [];
  // Thus-far undefined exports.
  this.undefinedExports = Object.create(null);

  // If enabled, skip leading hashbang line.
  if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!")
    { this.skipLineComment(2); }

  // Scope tracking for duplicate variable names (see scope.js)
  this.scopeStack = [];
  this.enterScope(SCOPE_TOP);

  // For RegExp validation
  this.regexpState = null;

  // The stack of private names.
  // Each element has two properties: 'declared' and 'used'.
  // When it exited from the outermost class definition, all used private names must be declared.
  this.privateNameStack = [];
};

var prototypeAccessors = { inFunction: { configurable: true },inGenerator: { configurable: true },inAsync: { configurable: true },canAwait: { configurable: true },allowSuper: { configurable: true },allowDirectSuper: { configurable: true },treatFunctionsAsVar: { configurable: true },allowNewDotTarget: { configurable: true },inClassStaticBlock: { configurable: true } };

Parser.prototype.parse = function parse () {
  var node = this.options.program || this.startNode();
  this.nextToken();
  return this.parseTopLevel(node)
};

prototypeAccessors.inFunction.get = function () { return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0 };

prototypeAccessors.inGenerator.get = function () { return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0 && !this.currentVarScope().inClassFieldInit };

prototypeAccessors.inAsync.get = function () { return (this.currentVarScope().flags & SCOPE_ASYNC) > 0 && !this.currentVarScope().inClassFieldInit };

prototypeAccessors.canAwait.get = function () {
  for (var i = this.scopeStack.length - 1; i >= 0; i--) {
    var scope = this.scopeStack[i];
    if (scope.inClassFieldInit || scope.flags & SCOPE_CLASS_STATIC_BLOCK) { return false }
    if (scope.flags & SCOPE_FUNCTION) { return (scope.flags & SCOPE_ASYNC) > 0 }
  }
  return (this.inModule && this.options.ecmaVersion >= 13) || this.options.allowAwaitOutsideFunction
};

prototypeAccessors.allowSuper.get = function () {
  var ref = this.currentThisScope();
    var flags = ref.flags;
    var inClassFieldInit = ref.inClassFieldInit;
  return (flags & SCOPE_SUPER) > 0 || inClassFieldInit || this.options.allowSuperOutsideMethod
};

prototypeAccessors.allowDirectSuper.get = function () { return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0 };

prototypeAccessors.treatFunctionsAsVar.get = function () { return this.treatFunctionsAsVarInScope(this.currentScope()) };

prototypeAccessors.allowNewDotTarget.get = function () {
  var ref = this.currentThisScope();
    var flags = ref.flags;
    var inClassFieldInit = ref.inClassFieldInit;
  return (flags & (SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK)) > 0 || inClassFieldInit
};

prototypeAccessors.inClassStaticBlock.get = function () {
  return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0
};

Parser.extend = function extend () {
    var plugins = [], len = arguments.length;
    while ( len-- ) plugins[ len ] = arguments[ len ];

  var cls = this;
  for (var i = 0; i < plugins.length; i++) { cls = plugins[i](cls); }
  return cls
};

Parser.parse = function parse (input, options) {
  return new this(options, input).parse()
};

Parser.parseExpressionAt = function parseExpressionAt (input, pos, options) {
  var parser = new this(options, input, pos);
  parser.nextToken();
  return parser.parseExpression()
};

Parser.tokenizer = function tokenizer (input, options) {
  return new this(options, input)
};

Object.defineProperties( Parser.prototype, prototypeAccessors );

var pp$9 = Parser.prototype;

// ## Parser utilities

var literal = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
pp$9.strictDirective = function(start) {
  if (this.options.ecmaVersion < 5) { return false }
  for (;;) {
    // Try to find string literal.
    skipWhiteSpace.lastIndex = start;
    start += skipWhiteSpace.exec(this.input)[0].length;
    var match = literal.exec(this.input.slice(start));
    if (!match) { return false }
    if ((match[1] || match[2]) === "use strict") {
      skipWhiteSpace.lastIndex = start + match[0].length;
      var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length;
      var next = this.input.charAt(end);
      return next === ";" || next === "}" ||
        (lineBreak.test(spaceAfter[0]) &&
         !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "="))
    }
    start += match[0].length;

    // Skip semicolon, if any.
    skipWhiteSpace.lastIndex = start;
    start += skipWhiteSpace.exec(this.input)[0].length;
    if (this.input[start] === ";")
      { start++; }
  }
};

// Predicate that tests whether the next token is of the given
// type, and if yes, consumes it as a side effect.

pp$9.eat = function(type) {
  if (this.type === type) {
    this.next();
    return true
  } else {
    return false
  }
};

// Tests whether parsed token is a contextual keyword.

pp$9.isContextual = function(name) {
  return this.type === types$1.name && this.value === name && !this.containsEsc
};

// Consumes contextual keyword if possible.

pp$9.eatContextual = function(name) {
  if (!this.isContextual(name)) { return false }
  this.next();
  return true
};

// Asserts that following token is given contextual keyword.

pp$9.expectContextual = function(name) {
  if (!this.eatContextual(name)) { this.unexpected(); }
};

// Test whether a semicolon can be inserted at the current position.

pp$9.canInsertSemicolon = function() {
  return this.type === types$1.eof ||
    this.type === types$1.braceR ||
    lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
};

pp$9.insertSemicolon = function() {
  if (this.canInsertSemicolon()) {
    if (this.options.onInsertedSemicolon)
      { this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc); }
    return true
  }
};

// Consume a semicolon, or, failing that, see if we are allowed to
// pretend that there is a semicolon at this position.

pp$9.semicolon = function() {
  if (!this.eat(types$1.semi) && !this.insertSemicolon()) { this.unexpected(); }
};

pp$9.afterTrailingComma = function(tokType, notNext) {
  if (this.type === tokType) {
    if (this.options.onTrailingComma)
      { this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc); }
    if (!notNext)
      { this.next(); }
    return true
  }
};

// Expect a token of a given type. If found, consume it, otherwise,
// raise an unexpected token error.

pp$9.expect = function(type) {
  this.eat(type) || this.unexpected();
};

// Raise an unexpected token error.

pp$9.unexpected = function(pos) {
  this.raise(pos != null ? pos : this.start, "Unexpected token");
};

var DestructuringErrors = function DestructuringErrors() {
  this.shorthandAssign =
  this.trailingComma =
  this.parenthesizedAssign =
  this.parenthesizedBind =
  this.doubleProto =
    -1;
};

pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
  if (!refDestructuringErrors) { return }
  if (refDestructuringErrors.trailingComma > -1)
    { this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element"); }
  var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
  if (parens > -1) { this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern"); }
};

pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
  if (!refDestructuringErrors) { return false }
  var shorthandAssign = refDestructuringErrors.shorthandAssign;
  var doubleProto = refDestructuringErrors.doubleProto;
  if (!andThrow) { return shorthandAssign >= 0 || doubleProto >= 0 }
  if (shorthandAssign >= 0)
    { this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns"); }
  if (doubleProto >= 0)
    { this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property"); }
};

pp$9.checkYieldAwaitInDefaultParams = function() {
  if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos))
    { this.raise(this.yieldPos, "Yield expression cannot be a default value"); }
  if (this.awaitPos)
    { this.raise(this.awaitPos, "Await expression cannot be a default value"); }
};

pp$9.isSimpleAssignTarget = function(expr) {
  if (expr.type === "ParenthesizedExpression")
    { return this.isSimpleAssignTarget(expr.expression) }
  return expr.type === "Identifier" || expr.type === "MemberExpression"
};

var pp$8 = Parser.prototype;

// ### Statement parsing

// Parse a program. Initializes the parser, reads any number of
// statements, and wraps them in a Program node.  Optionally takes a
// `program` argument.  If present, the statements will be appended
// to its body instead of creating a new node.

pp$8.parseTopLevel = function(node) {
  var exports = Object.create(null);
  if (!node.body) { node.body = []; }
  while (this.type !== types$1.eof) {
    var stmt = this.parseStatement(null, true, exports);
    node.body.push(stmt);
  }
  if (this.inModule)
    { for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1)
      {
        var name = list[i];

        this.raiseRecoverable(this.undefinedExports[name].start, ("Export '" + name + "' is not defined"));
      } }
  this.adaptDirectivePrologue(node.body);
  this.next();
  node.sourceType = this.options.sourceType;
  return this.finishNode(node, "Program")
};

var loopLabel = {kind: "loop"}, switchLabel = {kind: "switch"};

pp$8.isLet = function(context) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let")) { return false }
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
  // For ambiguous cases, determine if a LexicalDeclaration (or only a
  // Statement) is allowed here. If context is not empty then only a Statement
  // is allowed. However, `let [` is an explicit negative lookahead for
  // ExpressionStatement, so special-case it first.
  if (nextCh === 91 || nextCh === 92) { return true } // '[', '\'
  if (context) { return false }

  if (nextCh === 123 || nextCh > 0xd7ff && nextCh < 0xdc00) { return true } // '{', astral
  if (isIdentifierStart(nextCh, true)) {
    var pos = next + 1;
    while (isIdentifierChar(nextCh = this.input.charCodeAt(pos), true)) { ++pos; }
    if (nextCh === 92 || nextCh > 0xd7ff && nextCh < 0xdc00) { return true }
    var ident = this.input.slice(next, pos);
    if (!keywordRelationalOperator.test(ident)) { return true }
  }
  return false
};

// check 'async [no LineTerminator here] function'
// - 'async /*foo*/ function' is OK.
// - 'async /*\n*/ function' is invalid.
pp$8.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    { return false }

  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length, after;
  return !lineBreak.test(this.input.slice(this.pos, next)) &&
    this.input.slice(next, next + 8) === "function" &&
    (next + 8 === this.input.length ||
     !(isIdentifierChar(after = this.input.charCodeAt(next + 8)) || after > 0xd7ff && after < 0xdc00))
};

// Parse a single statement.
//
// If expecting a statement and finding a slash operator, parse a
// regular expression literal. This is to handle cases like
// `if (foo) /blah/.exec(foo)`, where looking at the previous token
// does not help.

pp$8.parseStatement = function(context, topLevel, exports) {
  var starttype = this.type, node = this.startNode(), kind;

  if (this.isLet(context)) {
    starttype = types$1._var;
    kind = "let";
  }

  // Most types of statements are recognized by the keyword they
  // start with. Many are trivial to parse, some require a bit of
  // complexity.

  switch (starttype) {
  case types$1._break: case types$1._continue: return this.parseBreakContinueStatement(node, starttype.keyword)
  case types$1._debugger: return this.parseDebuggerStatement(node)
  case types$1._do: return this.parseDoStatement(node)
  case types$1._for: return this.parseForStatement(node)
  case types$1._function:
    // Function as sole body of either an if statement or a labeled statement
    // works, but not when it is part of a labeled statement that is the sole
    // body of an if statement.
    if ((context && (this.strict || context !== "if" && context !== "label")) && this.options.ecmaVersion >= 6) { this.unexpected(); }
    return this.parseFunctionStatement(node, false, !context)
  case types$1._class:
    if (context) { this.unexpected(); }
    return this.parseClass(node, true)
  case types$1._if: return this.parseIfStatement(node)
  case types$1._return: return this.parseReturnStatement(node)
  case types$1._switch: return this.parseSwitchStatement(node)
  case types$1._throw: return this.parseThrowStatement(node)
  case types$1._try: return this.parseTryStatement(node)
  case types$1._const: case types$1._var:
    kind = kind || this.value;
    if (context && kind !== "var") { this.unexpected(); }
    return this.parseVarStatement(node, kind)
  case types$1._while: return this.parseWhileStatement(node)
  case types$1._with: return this.parseWithStatement(node)
  case types$1.braceL: return this.parseBlock(true, node)
  case types$1.semi: return this.parseEmptyStatement(node)
  case types$1._export:
  case types$1._import:
    if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
      skipWhiteSpace.lastIndex = this.pos;
      var skip = skipWhiteSpace.exec(this.input);
      var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
      if (nextCh === 40 || nextCh === 46) // '(' or '.'
        { return this.parseExpressionStatement(node, this.parseExpression()) }
    }

    if (!this.options.allowImportExportEverywhere) {
      if (!topLevel)
        { this.raise(this.start, "'import' and 'export' may only appear at the top level"); }
      if (!this.inModule)
        { this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'"); }
    }
    return starttype === types$1._import ? this.parseImport(node) : this.parseExport(node, exports)

    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
  default:
    if (this.isAsyncFunction()) {
      if (context) { this.unexpected(); }
      this.next();
      return this.parseFunctionStatement(node, true, !context)
    }

    var maybeName = this.value, expr = this.parseExpression();
    if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon))
      { return this.parseLabeledStatement(node, maybeName, expr, context) }
    else { return this.parseExpressionStatement(node, expr) }
  }
};

pp$8.parseBreakContinueStatement = function(node, keyword) {
  var isBreak = keyword === "break";
  this.next();
  if (this.eat(types$1.semi) || this.insertSemicolon()) { node.label = null; }
  else if (this.type !== types$1.name) { this.unexpected(); }
  else {
    node.label = this.parseIdent();
    this.semicolon();
  }

  // Verify that there is an actual destination to break or
  // continue to.
  var i = 0;
  for (; i < this.labels.length; ++i) {
    var lab = this.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) { break }
      if (node.label && isBreak) { break }
    }
  }
  if (i === this.labels.length) { this.raise(node.start, "Unsyntactic " + keyword); }
  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement")
};

pp$8.parseDebuggerStatement = function(node) {
  this.next();
  this.semicolon();
  return this.finishNode(node, "DebuggerStatement")
};

pp$8.parseDoStatement = function(node) {
  this.next();
  this.labels.push(loopLabel);
  node.body = this.parseStatement("do");
  this.labels.pop();
  this.expect(types$1._while);
  node.test = this.parseParenExpression();
  if (this.options.ecmaVersion >= 6)
    { this.eat(types$1.semi); }
  else
    { this.semicolon(); }
  return this.finishNode(node, "DoWhileStatement")
};

// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
// loop is non-trivial. Basically, we have to parse the init `var`
// statement or expression, disallowing the `in` operator (see
// the second parameter to `parseExpression`), and then check
// whether the next token is `in` or `of`. When there is no init
// part (semicolon immediately after the opening parenthesis), it
// is a regular `for` loop.

pp$8.parseForStatement = function(node) {
  this.next();
  var awaitAt = (this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await")) ? this.lastTokStart : -1;
  this.labels.push(loopLabel);
  this.enterScope(0);
  this.expect(types$1.parenL);
  if (this.type === types$1.semi) {
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, null)
  }
  var isLet = this.isLet();
  if (this.type === types$1._var || this.type === types$1._const || isLet) {
    var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
    this.next();
    this.parseVar(init$1, true, kind);
    this.finishNode(init$1, "VariableDeclaration");
    if ((this.type === types$1._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) && init$1.declarations.length === 1) {
      if (this.options.ecmaVersion >= 9) {
        if (this.type === types$1._in) {
          if (awaitAt > -1) { this.unexpected(awaitAt); }
        } else { node.await = awaitAt > -1; }
      }
      return this.parseForIn(node, init$1)
    }
    if (awaitAt > -1) { this.unexpected(awaitAt); }
    return this.parseFor(node, init$1)
  }
  var startsWithLet = this.isContextual("let"), isForOf = false;
  var containsEsc = this.containsEsc;
  var refDestructuringErrors = new DestructuringErrors;
  var initPos = this.start;
  var init = awaitAt > -1
    ? this.parseExprSubscripts(refDestructuringErrors, "await")
    : this.parseExpression(true, refDestructuringErrors);
  if (this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
    if (awaitAt > -1) { // implies `ecmaVersion >= 9` (see declaration of awaitAt)
      if (this.type === types$1._in) { this.unexpected(awaitAt); }
      node.await = true;
    } else if (isForOf && this.options.ecmaVersion >= 8) {
      if (init.start === initPos && !containsEsc && init.type === "Identifier" && init.name === "async") { this.unexpected(); }
      else if (this.options.ecmaVersion >= 9) { node.await = false; }
    }
    if (startsWithLet && isForOf) { this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'."); }
    this.toAssignable(init, false, refDestructuringErrors);
    this.checkLValPattern(init);
    return this.parseForIn(node, init)
  } else {
    this.checkExpressionErrors(refDestructuringErrors, true);
  }
  if (awaitAt > -1) { this.unexpected(awaitAt); }
  return this.parseFor(node, init)
};

pp$8.parseFunctionStatement = function(node, isAsync, declarationPosition) {
  this.next();
  return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync)
};

pp$8.parseIfStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  // allow function declarations in branches, but only in non-strict mode
  node.consequent = this.parseStatement("if");
  node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
  return this.finishNode(node, "IfStatement")
};

pp$8.parseReturnStatement = function(node) {
  if (!this.inFunction && !this.options.allowReturnOutsideFunction)
    { this.raise(this.start, "'return' outside of function"); }
  this.next();

  // In `return` (and `break`/`continue`), the keywords with
  // optional arguments, we eagerly look for a semicolon or the
  // possibility to insert one.

  if (this.eat(types$1.semi) || this.insertSemicolon()) { node.argument = null; }
  else { node.argument = this.parseExpression(); this.semicolon(); }
  return this.finishNode(node, "ReturnStatement")
};

pp$8.parseSwitchStatement = function(node) {
  this.next();
  node.discriminant = this.parseParenExpression();
  node.cases = [];
  this.expect(types$1.braceL);
  this.labels.push(switchLabel);
  this.enterScope(0);

  // Statements under must be grouped (by label) in SwitchCase
  // nodes. `cur` is used to keep the node that we are currently
  // adding statements to.

  var cur;
  for (var sawDefault = false; this.type !== types$1.braceR;) {
    if (this.type === types$1._case || this.type === types$1._default) {
      var isCase = this.type === types$1._case;
      if (cur) { this.finishNode(cur, "SwitchCase"); }
      node.cases.push(cur = this.startNode());
      cur.consequent = [];
      this.next();
      if (isCase) {
        cur.test = this.parseExpression();
      } else {
        if (sawDefault) { this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"); }
        sawDefault = true;
        cur.test = null;
      }
      this.expect(types$1.colon);
    } else {
      if (!cur) { this.unexpected(); }
      cur.consequent.push(this.parseStatement(null));
    }
  }
  this.exitScope();
  if (cur) { this.finishNode(cur, "SwitchCase"); }
  this.next(); // Closing brace
  this.labels.pop();
  return this.finishNode(node, "SwitchStatement")
};

pp$8.parseThrowStatement = function(node) {
  this.next();
  if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start)))
    { this.raise(this.lastTokEnd, "Illegal newline after throw"); }
  node.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node, "ThrowStatement")
};

// Reused empty array added for node fields that are always empty.

var empty$1 = [];

pp$8.parseCatchClauseParam = function() {
  var param = this.parseBindingAtom();
  var simple = param.type === "Identifier";
  this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
  this.checkLValPattern(param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
  this.expect(types$1.parenR);

  return param
};

pp$8.parseTryStatement = function(node) {
  this.next();
  node.block = this.parseBlock();
  node.handler = null;
  if (this.type === types$1._catch) {
    var clause = this.startNode();
    this.next();
    if (this.eat(types$1.parenL)) {
      clause.param = this.parseCatchClauseParam();
    } else {
      if (this.options.ecmaVersion < 10) { this.unexpected(); }
      clause.param = null;
      this.enterScope(0);
    }
    clause.body = this.parseBlock(false);
    this.exitScope();
    node.handler = this.finishNode(clause, "CatchClause");
  }
  node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
  if (!node.handler && !node.finalizer)
    { this.raise(node.start, "Missing catch or finally clause"); }
  return this.finishNode(node, "TryStatement")
};

pp$8.parseVarStatement = function(node, kind, allowMissingInitializer) {
  this.next();
  this.parseVar(node, false, kind, allowMissingInitializer);
  this.semicolon();
  return this.finishNode(node, "VariableDeclaration")
};

pp$8.parseWhileStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  this.labels.push(loopLabel);
  node.body = this.parseStatement("while");
  this.labels.pop();
  return this.finishNode(node, "WhileStatement")
};

pp$8.parseWithStatement = function(node) {
  if (this.strict) { this.raise(this.start, "'with' in strict mode"); }
  this.next();
  node.object = this.parseParenExpression();
  node.body = this.parseStatement("with");
  return this.finishNode(node, "WithStatement")
};

pp$8.parseEmptyStatement = function(node) {
  this.next();
  return this.finishNode(node, "EmptyStatement")
};

pp$8.parseLabeledStatement = function(node, maybeName, expr, context) {
  for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1)
    {
    var label = list[i$1];

    if (label.name === maybeName)
      { this.raise(expr.start, "Label '" + maybeName + "' is already declared");
  } }
  var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
  for (var i = this.labels.length - 1; i >= 0; i--) {
    var label$1 = this.labels[i];
    if (label$1.statementStart === node.start) {
      // Update information about previous labels on this node
      label$1.statementStart = this.start;
      label$1.kind = kind;
    } else { break }
  }
  this.labels.push({name: maybeName, kind: kind, statementStart: this.start});
  node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
  this.labels.pop();
  node.label = expr;
  return this.finishNode(node, "LabeledStatement")
};

pp$8.parseExpressionStatement = function(node, expr) {
  node.expression = expr;
  this.semicolon();
  return this.finishNode(node, "ExpressionStatement")
};

// Parse a semicolon-enclosed block of statements, handling `"use
// strict"` declarations when `allowStrict` is true (used for
// function bodies).

pp$8.parseBlock = function(createNewLexicalScope, node, exitStrict) {
  if ( createNewLexicalScope === void 0 ) createNewLexicalScope = true;
  if ( node === void 0 ) node = this.startNode();

  node.body = [];
  this.expect(types$1.braceL);
  if (createNewLexicalScope) { this.enterScope(0); }
  while (this.type !== types$1.braceR) {
    var stmt = this.parseStatement(null);
    node.body.push(stmt);
  }
  if (exitStrict) { this.strict = false; }
  this.next();
  if (createNewLexicalScope) { this.exitScope(); }
  return this.finishNode(node, "BlockStatement")
};

// Parse a regular `for` loop. The disambiguation code in
// `parseStatement` will already have parsed the init statement or
// expression.

pp$8.parseFor = function(node, init) {
  node.init = init;
  this.expect(types$1.semi);
  node.test = this.type === types$1.semi ? null : this.parseExpression();
  this.expect(types$1.semi);
  node.update = this.type === types$1.parenR ? null : this.parseExpression();
  this.expect(types$1.parenR);
  node.body = this.parseStatement("for");
  this.exitScope();
  this.labels.pop();
  return this.finishNode(node, "ForStatement")
};

// Parse a `for`/`in` and `for`/`of` loop, which are almost
// same from parser's perspective.

pp$8.parseForIn = function(node, init) {
  var isForIn = this.type === types$1._in;
  this.next();

  if (
    init.type === "VariableDeclaration" &&
    init.declarations[0].init != null &&
    (
      !isForIn ||
      this.options.ecmaVersion < 8 ||
      this.strict ||
      init.kind !== "var" ||
      init.declarations[0].id.type !== "Identifier"
    )
  ) {
    this.raise(
      init.start,
      ((isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer")
    );
  }
  node.left = init;
  node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
  this.expect(types$1.parenR);
  node.body = this.parseStatement("for");
  this.exitScope();
  this.labels.pop();
  return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement")
};

// Parse a list of variable declarations.

pp$8.parseVar = function(node, isFor, kind, allowMissingInitializer) {
  node.declarations = [];
  node.kind = kind;
  for (;;) {
    var decl = this.startNode();
    this.parseVarId(decl, kind);
    if (this.eat(types$1.eq)) {
      decl.init = this.parseMaybeAssign(isFor);
    } else if (!allowMissingInitializer && kind === "const" && !(this.type === types$1._in || (this.options.ecmaVersion >= 6 && this.isContextual("of")))) {
      this.unexpected();
    } else if (!allowMissingInitializer && decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of")))) {
      this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
    } else {
      decl.init = null;
    }
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
    if (!this.eat(types$1.comma)) { break }
  }
  return node
};

pp$8.parseVarId = function(decl, kind) {
  decl.id = this.parseBindingAtom();
  this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
};

var FUNC_STATEMENT = 1, FUNC_HANGING_STATEMENT = 2, FUNC_NULLABLE_ID = 4;

// Parse a function declaration or literal (depending on the
// `statement & FUNC_STATEMENT`).

// Remove `allowExpressionBody` for 7.0.0, as it is only called with false
pp$8.parseFunction = function(node, statement, allowExpressionBody, isAsync, forInit) {
  this.initFunction(node);
  if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
    if (this.type === types$1.star && (statement & FUNC_HANGING_STATEMENT))
      { this.unexpected(); }
    node.generator = this.eat(types$1.star);
  }
  if (this.options.ecmaVersion >= 8)
    { node.async = !!isAsync; }

  if (statement & FUNC_STATEMENT) {
    node.id = (statement & FUNC_NULLABLE_ID) && this.type !== types$1.name ? null : this.parseIdent();
    if (node.id && !(statement & FUNC_HANGING_STATEMENT))
      // If it is a regular function declaration in sloppy mode, then it is
      // subject to Annex B semantics (BIND_FUNCTION). Otherwise, the binding
      // mode depends on properties of the current scope (see
      // treatFunctionsAsVar).
      { this.checkLValSimple(node.id, (this.strict || node.generator || node.async) ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION); }
  }

  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  this.enterScope(functionFlags(node.async, node.generator));

  if (!(statement & FUNC_STATEMENT))
    { node.id = this.type === types$1.name ? this.parseIdent() : null; }

  this.parseFunctionParams(node);
  this.parseFunctionBody(node, allowExpressionBody, false, forInit);

  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, (statement & FUNC_STATEMENT) ? "FunctionDeclaration" : "FunctionExpression")
};

pp$8.parseFunctionParams = function(node) {
  this.expect(types$1.parenL);
  node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
};

// Parse a class declaration or literal (depending on the
// `isStatement` parameter).

pp$8.parseClass = function(node, isStatement) {
  this.next();

  // ecma-262 14.6 Class Definitions
  // A class definition is always strict mode code.
  var oldStrict = this.strict;
  this.strict = true;

  this.parseClassId(node, isStatement);
  this.parseClassSuper(node);
  var privateNameMap = this.enterClassBody();
  var classBody = this.startNode();
  var hadConstructor = false;
  classBody.body = [];
  this.expect(types$1.braceL);
  while (this.type !== types$1.braceR) {
    var element = this.parseClassElement(node.superClass !== null);
    if (element) {
      classBody.body.push(element);
      if (element.type === "MethodDefinition" && element.kind === "constructor") {
        if (hadConstructor) { this.raiseRecoverable(element.start, "Duplicate constructor in the same class"); }
        hadConstructor = true;
      } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element)) {
        this.raiseRecoverable(element.key.start, ("Identifier '#" + (element.key.name) + "' has already been declared"));
      }
    }
  }
  this.strict = oldStrict;
  this.next();
  node.body = this.finishNode(classBody, "ClassBody");
  this.exitClassBody();
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression")
};

pp$8.parseClassElement = function(constructorAllowsSuper) {
  if (this.eat(types$1.semi)) { return null }

  var ecmaVersion = this.options.ecmaVersion;
  var node = this.startNode();
  var keyName = "";
  var isGenerator = false;
  var isAsync = false;
  var kind = "method";
  var isStatic = false;

  if (this.eatContextual("static")) {
    // Parse static init block
    if (ecmaVersion >= 13 && this.eat(types$1.braceL)) {
      this.parseClassStaticBlock(node);
      return node
    }
    if (this.isClassElementNameStart() || this.type === types$1.star) {
      isStatic = true;
    } else {
      keyName = "static";
    }
  }
  node.static = isStatic;
  if (!keyName && ecmaVersion >= 8 && this.eatContextual("async")) {
    if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon()) {
      isAsync = true;
    } else {
      keyName = "async";
    }
  }
  if (!keyName && (ecmaVersion >= 9 || !isAsync) && this.eat(types$1.star)) {
    isGenerator = true;
  }
  if (!keyName && !isAsync && !isGenerator) {
    var lastValue = this.value;
    if (this.eatContextual("get") || this.eatContextual("set")) {
      if (this.isClassElementNameStart()) {
        kind = lastValue;
      } else {
        keyName = lastValue;
      }
    }
  }

  // Parse element name
  if (keyName) {
    // 'async', 'get', 'set', or 'static' were not a keyword contextually.
    // The last token is any of those. Make it the element name.
    node.computed = false;
    node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
    node.key.name = keyName;
    this.finishNode(node.key, "Identifier");
  } else {
    this.parseClassElementName(node);
  }

  // Parse element value
  if (ecmaVersion < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
    var isConstructor = !node.static && checkKeyName(node, "constructor");
    var allowsDirectSuper = isConstructor && constructorAllowsSuper;
    // Couldn't move this check into the 'parseClassMethod' method for backward compatibility.
    if (isConstructor && kind !== "method") { this.raise(node.key.start, "Constructor can't have get/set modifier"); }
    node.kind = isConstructor ? "constructor" : kind;
    this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
  } else {
    this.parseClassField(node);
  }

  return node
};

pp$8.isClassElementNameStart = function() {
  return (
    this.type === types$1.name ||
    this.type === types$1.privateId ||
    this.type === types$1.num ||
    this.type === types$1.string ||
    this.type === types$1.bracketL ||
    this.type.keyword
  )
};

pp$8.parseClassElementName = function(element) {
  if (this.type === types$1.privateId) {
    if (this.value === "constructor") {
      this.raise(this.start, "Classes can't have an element named '#constructor'");
    }
    element.computed = false;
    element.key = this.parsePrivateIdent();
  } else {
    this.parsePropertyName(element);
  }
};

pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
  // Check key and flags
  var key = method.key;
  if (method.kind === "constructor") {
    if (isGenerator) { this.raise(key.start, "Constructor can't be a generator"); }
    if (isAsync) { this.raise(key.start, "Constructor can't be an async method"); }
  } else if (method.static && checkKeyName(method, "prototype")) {
    this.raise(key.start, "Classes may not have a static property named prototype");
  }

  // Parse value
  var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);

  // Check value
  if (method.kind === "get" && value.params.length !== 0)
    { this.raiseRecoverable(value.start, "getter should have no params"); }
  if (method.kind === "set" && value.params.length !== 1)
    { this.raiseRecoverable(value.start, "setter should have exactly one param"); }
  if (method.kind === "set" && value.params[0].type === "RestElement")
    { this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params"); }

  return this.finishNode(method, "MethodDefinition")
};

pp$8.parseClassField = function(field) {
  if (checkKeyName(field, "constructor")) {
    this.raise(field.key.start, "Classes can't have a field named 'constructor'");
  } else if (field.static && checkKeyName(field, "prototype")) {
    this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
  }

  if (this.eat(types$1.eq)) {
    // To raise SyntaxError if 'arguments' exists in the initializer.
    var scope = this.currentThisScope();
    var inClassFieldInit = scope.inClassFieldInit;
    scope.inClassFieldInit = true;
    field.value = this.parseMaybeAssign();
    scope.inClassFieldInit = inClassFieldInit;
  } else {
    field.value = null;
  }
  this.semicolon();

  return this.finishNode(field, "PropertyDefinition")
};

pp$8.parseClassStaticBlock = function(node) {
  node.body = [];

  var oldLabels = this.labels;
  this.labels = [];
  this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER);
  while (this.type !== types$1.braceR) {
    var stmt = this.parseStatement(null);
    node.body.push(stmt);
  }
  this.next();
  this.exitScope();
  this.labels = oldLabels;

  return this.finishNode(node, "StaticBlock")
};

pp$8.parseClassId = function(node, isStatement) {
  if (this.type === types$1.name) {
    node.id = this.parseIdent();
    if (isStatement)
      { this.checkLValSimple(node.id, BIND_LEXICAL, false); }
  } else {
    if (isStatement === true)
      { this.unexpected(); }
    node.id = null;
  }
};

pp$8.parseClassSuper = function(node) {
  node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, false) : null;
};

pp$8.enterClassBody = function() {
  var element = {declared: Object.create(null), used: []};
  this.privateNameStack.push(element);
  return element.declared
};

pp$8.exitClassBody = function() {
  var ref = this.privateNameStack.pop();
  var declared = ref.declared;
  var used = ref.used;
  if (!this.options.checkPrivateFields) { return }
  var len = this.privateNameStack.length;
  var parent = len === 0 ? null : this.privateNameStack[len - 1];
  for (var i = 0; i < used.length; ++i) {
    var id = used[i];
    if (!hasOwn(declared, id.name)) {
      if (parent) {
        parent.used.push(id);
      } else {
        this.raiseRecoverable(id.start, ("Private field '#" + (id.name) + "' must be declared in an enclosing class"));
      }
    }
  }
};

function isPrivateNameConflicted(privateNameMap, element) {
  var name = element.key.name;
  var curr = privateNameMap[name];

  var next = "true";
  if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
    next = (element.static ? "s" : "i") + element.kind;
  }

  // `class { get #a(){}; static set #a(_){} }` is also conflict.
  if (
    curr === "iget" && next === "iset" ||
    curr === "iset" && next === "iget" ||
    curr === "sget" && next === "sset" ||
    curr === "sset" && next === "sget"
  ) {
    privateNameMap[name] = "true";
    return false
  } else if (!curr) {
    privateNameMap[name] = next;
    return false
  } else {
    return true
  }
}

function checkKeyName(node, name) {
  var computed = node.computed;
  var key = node.key;
  return !computed && (
    key.type === "Identifier" && key.name === name ||
    key.type === "Literal" && key.value === name
  )
}

// Parses module export declaration.

pp$8.parseExportAllDeclaration = function(node, exports) {
  if (this.options.ecmaVersion >= 11) {
    if (this.eatContextual("as")) {
      node.exported = this.parseModuleExportName();
      this.checkExport(exports, node.exported, this.lastTokStart);
    } else {
      node.exported = null;
    }
  }
  this.expectContextual("from");
  if (this.type !== types$1.string) { this.unexpected(); }
  node.source = this.parseExprAtom();
  this.semicolon();
  return this.finishNode(node, "ExportAllDeclaration")
};

pp$8.parseExport = function(node, exports) {
  this.next();
  // export * from '...'
  if (this.eat(types$1.star)) {
    return this.parseExportAllDeclaration(node, exports)
  }
  if (this.eat(types$1._default)) { // export default ...
    this.checkExport(exports, "default", this.lastTokStart);
    node.declaration = this.parseExportDefaultDeclaration();
    return this.finishNode(node, "ExportDefaultDeclaration")
  }
  // export var|const|let|function|class ...
  if (this.shouldParseExportStatement()) {
    node.declaration = this.parseExportDeclaration(node);
    if (node.declaration.type === "VariableDeclaration")
      { this.checkVariableExport(exports, node.declaration.declarations); }
    else
      { this.checkExport(exports, node.declaration.id, node.declaration.id.start); }
    node.specifiers = [];
    node.source = null;
  } else { // export { x, y as z } [from '...']
    node.declaration = null;
    node.specifiers = this.parseExportSpecifiers(exports);
    if (this.eatContextual("from")) {
      if (this.type !== types$1.string) { this.unexpected(); }
      node.source = this.parseExprAtom();
    } else {
      for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
        // check for keywords used as local names
        var spec = list[i];

        this.checkUnreserved(spec.local);
        // check if export is defined
        this.checkLocalExport(spec.local);

        if (spec.local.type === "Literal") {
          this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
        }
      }

      node.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(node, "ExportNamedDeclaration")
};

pp$8.parseExportDeclaration = function(node) {
  return this.parseStatement(null)
};

pp$8.parseExportDefaultDeclaration = function() {
  var isAsync;
  if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
    var fNode = this.startNode();
    this.next();
    if (isAsync) { this.next(); }
    return this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync)
  } else if (this.type === types$1._class) {
    var cNode = this.startNode();
    return this.parseClass(cNode, "nullableID")
  } else {
    var declaration = this.parseMaybeAssign();
    this.semicolon();
    return declaration
  }
};

pp$8.checkExport = function(exports, name, pos) {
  if (!exports) { return }
  if (typeof name !== "string")
    { name = name.type === "Identifier" ? name.name : name.value; }
  if (hasOwn(exports, name))
    { this.raiseRecoverable(pos, "Duplicate export '" + name + "'"); }
  exports[name] = true;
};

pp$8.checkPatternExport = function(exports, pat) {
  var type = pat.type;
  if (type === "Identifier")
    { this.checkExport(exports, pat, pat.start); }
  else if (type === "ObjectPattern")
    { for (var i = 0, list = pat.properties; i < list.length; i += 1)
      {
        var prop = list[i];

        this.checkPatternExport(exports, prop);
      } }
  else if (type === "ArrayPattern")
    { for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
      var elt = list$1[i$1];

        if (elt) { this.checkPatternExport(exports, elt); }
    } }
  else if (type === "Property")
    { this.checkPatternExport(exports, pat.value); }
  else if (type === "AssignmentPattern")
    { this.checkPatternExport(exports, pat.left); }
  else if (type === "RestElement")
    { this.checkPatternExport(exports, pat.argument); }
};

pp$8.checkVariableExport = function(exports, decls) {
  if (!exports) { return }
  for (var i = 0, list = decls; i < list.length; i += 1)
    {
    var decl = list[i];

    this.checkPatternExport(exports, decl.id);
  }
};

pp$8.shouldParseExportStatement = function() {
  return this.type.keyword === "var" ||
    this.type.keyword === "const" ||
    this.type.keyword === "class" ||
    this.type.keyword === "function" ||
    this.isLet() ||
    this.isAsyncFunction()
};

// Parses a comma-separated list of module exports.

pp$8.parseExportSpecifier = function(exports) {
  var node = this.startNode();
  node.local = this.parseModuleExportName();

  node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local;
  this.checkExport(
    exports,
    node.exported,
    node.exported.start
  );

  return this.finishNode(node, "ExportSpecifier")
};

pp$8.parseExportSpecifiers = function(exports) {
  var nodes = [], first = true;
  // export { x, y as z } [from '...']
  this.expect(types$1.braceL);
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.afterTrailingComma(types$1.braceR)) { break }
    } else { first = false; }

    nodes.push(this.parseExportSpecifier(exports));
  }
  return nodes
};

// Parses import declaration.

pp$8.parseImport = function(node) {
  this.next();

  // import '...'
  if (this.type === types$1.string) {
    node.specifiers = empty$1;
    node.source = this.parseExprAtom();
  } else {
    node.specifiers = this.parseImportSpecifiers();
    this.expectContextual("from");
    node.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration")
};

// Parses a comma-separated list of module imports.

pp$8.parseImportSpecifier = function() {
  var node = this.startNode();
  node.imported = this.parseModuleExportName();

  if (this.eatContextual("as")) {
    node.local = this.parseIdent();
  } else {
    this.checkUnreserved(node.imported);
    node.local = node.imported;
  }
  this.checkLValSimple(node.local, BIND_LEXICAL);

  return this.finishNode(node, "ImportSpecifier")
};

pp$8.parseImportDefaultSpecifier = function() {
  // import defaultObj, { x, y as z } from '...'
  var node = this.startNode();
  node.local = this.parseIdent();
  this.checkLValSimple(node.local, BIND_LEXICAL);
  return this.finishNode(node, "ImportDefaultSpecifier")
};

pp$8.parseImportNamespaceSpecifier = function() {
  var node = this.startNode();
  this.next();
  this.expectContextual("as");
  node.local = this.parseIdent();
  this.checkLValSimple(node.local, BIND_LEXICAL);
  return this.finishNode(node, "ImportNamespaceSpecifier")
};

pp$8.parseImportSpecifiers = function() {
  var nodes = [], first = true;
  if (this.type === types$1.name) {
    nodes.push(this.parseImportDefaultSpecifier());
    if (!this.eat(types$1.comma)) { return nodes }
  }
  if (this.type === types$1.star) {
    nodes.push(this.parseImportNamespaceSpecifier());
    return nodes
  }
  this.expect(types$1.braceL);
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.afterTrailingComma(types$1.braceR)) { break }
    } else { first = false; }

    nodes.push(this.parseImportSpecifier());
  }
  return nodes
};

pp$8.parseModuleExportName = function() {
  if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
    var stringLiteral = this.parseLiteral(this.value);
    if (loneSurrogate.test(stringLiteral.value)) {
      this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
    }
    return stringLiteral
  }
  return this.parseIdent(true)
};

// Set `ExpressionStatement#directive` property for directive prologues.
pp$8.adaptDirectivePrologue = function(statements) {
  for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
    statements[i].directive = statements[i].expression.raw.slice(1, -1);
  }
};
pp$8.isDirectiveCandidate = function(statement) {
  return (
    this.options.ecmaVersion >= 5 &&
    statement.type === "ExpressionStatement" &&
    statement.expression.type === "Literal" &&
    typeof statement.expression.value === "string" &&
    // Reject parenthesized strings.
    (this.input[statement.start] === "\"" || this.input[statement.start] === "'")
  )
};

var pp$7 = Parser.prototype;

// Convert existing expression atom to assignable pattern
// if possible.

pp$7.toAssignable = function(node, isBinding, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 6 && node) {
    switch (node.type) {
    case "Identifier":
      if (this.inAsync && node.name === "await")
        { this.raise(node.start, "Cannot use 'await' as identifier inside an async function"); }
      break

    case "ObjectPattern":
    case "ArrayPattern":
    case "AssignmentPattern":
    case "RestElement":
      break

    case "ObjectExpression":
      node.type = "ObjectPattern";
      if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
      for (var i = 0, list = node.properties; i < list.length; i += 1) {
        var prop = list[i];

      this.toAssignable(prop, isBinding);
        // Early error:
        //   AssignmentRestProperty[Yield, Await] :
        //     `...` DestructuringAssignmentTarget[Yield, Await]
        //
        //   It is a Syntax Error if |DestructuringAssignmentTarget| is an |ArrayLiteral| or an |ObjectLiteral|.
        if (
          prop.type === "RestElement" &&
          (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")
        ) {
          this.raise(prop.argument.start, "Unexpected token");
        }
      }
      break

    case "Property":
      // AssignmentProperty has type === "Property"
      if (node.kind !== "init") { this.raise(node.key.start, "Object pattern can't contain getter or setter"); }
      this.toAssignable(node.value, isBinding);
      break

    case "ArrayExpression":
      node.type = "ArrayPattern";
      if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
      this.toAssignableList(node.elements, isBinding);
      break

    case "SpreadElement":
      node.type = "RestElement";
      this.toAssignable(node.argument, isBinding);
      if (node.argument.type === "AssignmentPattern")
        { this.raise(node.argument.start, "Rest elements cannot have a default value"); }
      break

    case "AssignmentExpression":
      if (node.operator !== "=") { this.raise(node.left.end, "Only '=' operator can be used for specifying default value."); }
      node.type = "AssignmentPattern";
      delete node.operator;
      this.toAssignable(node.left, isBinding);
      break

    case "ParenthesizedExpression":
      this.toAssignable(node.expression, isBinding, refDestructuringErrors);
      break

    case "ChainExpression":
      this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
      break

    case "MemberExpression":
      if (!isBinding) { break }

    default:
      this.raise(node.start, "Assigning to rvalue");
    }
  } else if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
  return node
};

// Convert list of expression atoms to binding list.

pp$7.toAssignableList = function(exprList, isBinding) {
  var end = exprList.length;
  for (var i = 0; i < end; i++) {
    var elt = exprList[i];
    if (elt) { this.toAssignable(elt, isBinding); }
  }
  if (end) {
    var last = exprList[end - 1];
    if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier")
      { this.unexpected(last.argument.start); }
  }
  return exprList
};

// Parses spread element.

pp$7.parseSpread = function(refDestructuringErrors) {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
  return this.finishNode(node, "SpreadElement")
};

pp$7.parseRestBinding = function() {
  var node = this.startNode();
  this.next();

  // RestElement inside of a function parameter must be an identifier
  if (this.options.ecmaVersion === 6 && this.type !== types$1.name)
    { this.unexpected(); }

  node.argument = this.parseBindingAtom();

  return this.finishNode(node, "RestElement")
};

// Parses lvalue (assignable) atom.

pp$7.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6) {
    switch (this.type) {
    case types$1.bracketL:
      var node = this.startNode();
      this.next();
      node.elements = this.parseBindingList(types$1.bracketR, true, true);
      return this.finishNode(node, "ArrayPattern")

    case types$1.braceL:
      return this.parseObj(true)
    }
  }
  return this.parseIdent()
};

pp$7.parseBindingList = function(close, allowEmpty, allowTrailingComma, allowModifiers) {
  var elts = [], first = true;
  while (!this.eat(close)) {
    if (first) { first = false; }
    else { this.expect(types$1.comma); }
    if (allowEmpty && this.type === types$1.comma) {
      elts.push(null);
    } else if (allowTrailingComma && this.afterTrailingComma(close)) {
      break
    } else if (this.type === types$1.ellipsis) {
      var rest = this.parseRestBinding();
      this.parseBindingListItem(rest);
      elts.push(rest);
      if (this.type === types$1.comma) { this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"); }
      this.expect(close);
      break
    } else {
      elts.push(this.parseAssignableListItem(allowModifiers));
    }
  }
  return elts
};

pp$7.parseAssignableListItem = function(allowModifiers) {
  var elem = this.parseMaybeDefault(this.start, this.startLoc);
  this.parseBindingListItem(elem);
  return elem
};

pp$7.parseBindingListItem = function(param) {
  return param
};

// Parses assignment pattern around given atom if possible.

pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
  left = left || this.parseBindingAtom();
  if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) { return left }
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern")
};

// The following three functions all verify that a node is an lvalue —
// something that can be bound, or assigned to. In order to do so, they perform
// a variety of checks:
//
// - Check that none of the bound/assigned-to identifiers are reserved words.
// - Record name declarations for bindings in the appropriate scope.
// - Check duplicate argument names, if checkClashes is set.
//
// If a complex binding pattern is encountered (e.g., object and array
// destructuring), the entire pattern is recursively checked.
//
// There are three versions of checkLVal*() appropriate for different
// circumstances:
//
// - checkLValSimple() shall be used if the syntactic construct supports
//   nothing other than identifiers and member expressions. Parenthesized
//   expressions are also correctly handled. This is generally appropriate for
//   constructs for which the spec says
//
//   > It is a Syntax Error if AssignmentTargetType of [the production] is not
//   > simple.
//
//   It is also appropriate for checking if an identifier is valid and not
//   defined elsewhere, like import declarations or function/class identifiers.
//
//   Examples where this is used include:
//     a += …;
//     import a from '…';
//   where a is the node to be checked.
//
// - checkLValPattern() shall be used if the syntactic construct supports
//   anything checkLValSimple() supports, as well as object and array
//   destructuring patterns. This is generally appropriate for constructs for
//   which the spec says
//
//   > It is a Syntax Error if [the production] is neither an ObjectLiteral nor
//   > an ArrayLiteral and AssignmentTargetType of [the production] is not
//   > simple.
//
//   Examples where this is used include:
//     (a = …);
//     const a = …;
//     try { … } catch (a) { … }
//   where a is the node to be checked.
//
// - checkLValInnerPattern() shall be used if the syntactic construct supports
//   anything checkLValPattern() supports, as well as default assignment
//   patterns, rest elements, and other constructs that may appear within an
//   object or array destructuring pattern.
//
//   As a special case, function parameters also use checkLValInnerPattern(),
//   as they also support defaults and rest constructs.
//
// These functions deliberately support both assignment and binding constructs,
// as the logic for both is exceedingly similar. If the node is the target of
// an assignment, then bindingType should be set to BIND_NONE. Otherwise, it
// should be set to the appropriate BIND_* constant, like BIND_VAR or
// BIND_LEXICAL.
//
// If the function is called with a non-BIND_NONE bindingType, then
// additionally a checkClashes object may be specified to allow checking for
// duplicate argument names. checkClashes is ignored if the provided construct
// is an assignment (i.e., bindingType is BIND_NONE).

pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
  if ( bindingType === void 0 ) bindingType = BIND_NONE;

  var isBind = bindingType !== BIND_NONE;

  switch (expr.type) {
  case "Identifier":
    if (this.strict && this.reservedWordsStrictBind.test(expr.name))
      { this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode"); }
    if (isBind) {
      if (bindingType === BIND_LEXICAL && expr.name === "let")
        { this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name"); }
      if (checkClashes) {
        if (hasOwn(checkClashes, expr.name))
          { this.raiseRecoverable(expr.start, "Argument name clash"); }
        checkClashes[expr.name] = true;
      }
      if (bindingType !== BIND_OUTSIDE) { this.declareName(expr.name, bindingType, expr.start); }
    }
    break

  case "ChainExpression":
    this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
    break

  case "MemberExpression":
    if (isBind) { this.raiseRecoverable(expr.start, "Binding member expression"); }
    break

  case "ParenthesizedExpression":
    if (isBind) { this.raiseRecoverable(expr.start, "Binding parenthesized expression"); }
    return this.checkLValSimple(expr.expression, bindingType, checkClashes)

  default:
    this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
  }
};

pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
  if ( bindingType === void 0 ) bindingType = BIND_NONE;

  switch (expr.type) {
  case "ObjectPattern":
    for (var i = 0, list = expr.properties; i < list.length; i += 1) {
      var prop = list[i];

    this.checkLValInnerPattern(prop, bindingType, checkClashes);
    }
    break

  case "ArrayPattern":
    for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
      var elem = list$1[i$1];

    if (elem) { this.checkLValInnerPattern(elem, bindingType, checkClashes); }
    }
    break

  default:
    this.checkLValSimple(expr, bindingType, checkClashes);
  }
};

pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
  if ( bindingType === void 0 ) bindingType = BIND_NONE;

  switch (expr.type) {
  case "Property":
    // AssignmentProperty has type === "Property"
    this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
    break

  case "AssignmentPattern":
    this.checkLValPattern(expr.left, bindingType, checkClashes);
    break

  case "RestElement":
    this.checkLValPattern(expr.argument, bindingType, checkClashes);
    break

  default:
    this.checkLValPattern(expr, bindingType, checkClashes);
  }
};

// The algorithm used to determine whether a regexp can appear at a
// given point in the program is loosely based on sweet.js' approach.
// See https://github.com/mozilla/sweet.js/wiki/design


var TokContext = function TokContext(token, isExpr, preserveSpace, override, generator) {
  this.token = token;
  this.isExpr = !!isExpr;
  this.preserveSpace = !!preserveSpace;
  this.override = override;
  this.generator = !!generator;
};

var types = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", false),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, function (p) { return p.tryReadTemplateToken(); }),
  f_stat: new TokContext("function", false),
  f_expr: new TokContext("function", true),
  f_expr_gen: new TokContext("function", true, false, null, true),
  f_gen: new TokContext("function", false, false, null, true)
};

var pp$6 = Parser.prototype;

pp$6.initialContext = function() {
  return [types.b_stat]
};

pp$6.curContext = function() {
  return this.context[this.context.length - 1]
};

pp$6.braceIsBlock = function(prevType) {
  var parent = this.curContext();
  if (parent === types.f_expr || parent === types.f_stat)
    { return true }
  if (prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr))
    { return !parent.isExpr }

  // The check for `tt.name && exprAllowed` detects whether we are
  // after a `yield` or `of` construct. See the `updateContext` for
  // `tt.name`.
  if (prevType === types$1._return || prevType === types$1.name && this.exprAllowed)
    { return lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) }
  if (prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow)
    { return true }
  if (prevType === types$1.braceL)
    { return parent === types.b_stat }
  if (prevType === types$1._var || prevType === types$1._const || prevType === types$1.name)
    { return false }
  return !this.exprAllowed
};

pp$6.inGeneratorContext = function() {
  for (var i = this.context.length - 1; i >= 1; i--) {
    var context = this.context[i];
    if (context.token === "function")
      { return context.generator }
  }
  return false
};

pp$6.updateContext = function(prevType) {
  var update, type = this.type;
  if (type.keyword && prevType === types$1.dot)
    { this.exprAllowed = false; }
  else if (update = type.updateContext)
    { update.call(this, prevType); }
  else
    { this.exprAllowed = type.beforeExpr; }
};

// Used to handle edge cases when token context could not be inferred correctly during tokenization phase

pp$6.overrideContext = function(tokenCtx) {
  if (this.curContext() !== tokenCtx) {
    this.context[this.context.length - 1] = tokenCtx;
  }
};

// Token-specific context update code

types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = true;
    return
  }
  var out = this.context.pop();
  if (out === types.b_stat && this.curContext().token === "function") {
    out = this.context.pop();
  }
  this.exprAllowed = !out.isExpr;
};

types$1.braceL.updateContext = function(prevType) {
  this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
  this.exprAllowed = true;
};

types$1.dollarBraceL.updateContext = function() {
  this.context.push(types.b_tmpl);
  this.exprAllowed = true;
};

types$1.parenL.updateContext = function(prevType) {
  var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
  this.context.push(statementParens ? types.p_stat : types.p_expr);
  this.exprAllowed = true;
};

types$1.incDec.updateContext = function() {
  // tokExprAllowed stays unchanged
};

types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
  if (prevType.beforeExpr && prevType !== types$1._else &&
      !(prevType === types$1.semi && this.curContext() !== types.p_stat) &&
      !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) &&
      !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat))
    { this.context.push(types.f_expr); }
  else
    { this.context.push(types.f_stat); }
  this.exprAllowed = false;
};

types$1.colon.updateContext = function() {
  if (this.curContext().token === "function") { this.context.pop(); }
  this.exprAllowed = true;
};

types$1.backQuote.updateContext = function() {
  if (this.curContext() === types.q_tmpl)
    { this.context.pop(); }
  else
    { this.context.push(types.q_tmpl); }
  this.exprAllowed = false;
};

types$1.star.updateContext = function(prevType) {
  if (prevType === types$1._function) {
    var index = this.context.length - 1;
    if (this.context[index] === types.f_expr)
      { this.context[index] = types.f_expr_gen; }
    else
      { this.context[index] = types.f_gen; }
  }
  this.exprAllowed = true;
};

types$1.name.updateContext = function(prevType) {
  var allowed = false;
  if (this.options.ecmaVersion >= 6 && prevType !== types$1.dot) {
    if (this.value === "of" && !this.exprAllowed ||
        this.value === "yield" && this.inGeneratorContext())
      { allowed = true; }
  }
  this.exprAllowed = allowed;
};

// A recursive descent parser operates by defining functions for all
// syntactic elements, and recursively calling those, each function
// advancing the input stream and returning an AST node. Precedence
// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
// instead of `(!x)[1]` is handled by the fact that the parser
// function that parses unary prefix operators is called first, and
// in turn calls the function that parses `[]` subscripts — that
// way, it'll receive the node for `x[1]` already parsed, and wraps
// *that* in the unary operator node.
//
// Acorn uses an [operator precedence parser][opp] to handle binary
// operator precedence, because it is much more compact than using
// the technique outlined above, which uses different, nesting
// functions to specify precedence, for all of the ten binary
// precedence levels that JavaScript defines.
//
// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser


var pp$5 = Parser.prototype;

// Check if property name clashes with already added.
// Object/class getters and setters are not allowed to clash —
// either with each other or with an init property — and in
// strict mode, init properties are also not allowed to be repeated.

pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement")
    { return }
  if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))
    { return }
  var key = prop.key;
  var name;
  switch (key.type) {
  case "Identifier": name = key.name; break
  case "Literal": name = String(key.value); break
  default: return
  }
  var kind = prop.kind;
  if (this.options.ecmaVersion >= 6) {
    if (name === "__proto__" && kind === "init") {
      if (propHash.proto) {
        if (refDestructuringErrors) {
          if (refDestructuringErrors.doubleProto < 0) {
            refDestructuringErrors.doubleProto = key.start;
          }
        } else {
          this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
        }
      }
      propHash.proto = true;
    }
    return
  }
  name = "$" + name;
  var other = propHash[name];
  if (other) {
    var redefinition;
    if (kind === "init") {
      redefinition = this.strict && other.init || other.get || other.set;
    } else {
      redefinition = other.init || other[kind];
    }
    if (redefinition)
      { this.raiseRecoverable(key.start, "Redefinition of property"); }
  } else {
    other = propHash[name] = {
      init: false,
      get: false,
      set: false
    };
  }
  other[kind] = true;
};

// ### Expression parsing

// These nest, from the most general expression type at the top to
// 'atomic', nondivisible expression types at the bottom. Most of
// the functions will simply let the function(s) below them parse,
// and, *if* the syntactic construct they handle is present, wrap
// the AST node that the inner parser gave them in another node.

// Parse a full expression. The optional arguments are used to
// forbid the `in` operator (in for loops initalization expressions)
// and provide reference for storing '=' operator inside shorthand
// property assignment in contexts where both object expression
// and object pattern might appear (so it's possible to raise
// delayed syntax error at correct position).

pp$5.parseExpression = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
  if (this.type === types$1.comma) {
    var node = this.startNodeAt(startPos, startLoc);
    node.expressions = [expr];
    while (this.eat(types$1.comma)) { node.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors)); }
    return this.finishNode(node, "SequenceExpression")
  }
  return expr
};

// Parse an assignment expression. This includes applications of
// operators like `+=`.

pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
  if (this.isContextual("yield")) {
    if (this.inGenerator) { return this.parseYield(forInit) }
    // The tokenizer will assume an expression is allowed after
    // `yield`, but this isn't that kind of yield
    else { this.exprAllowed = false; }
  }

  var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
  if (refDestructuringErrors) {
    oldParenAssign = refDestructuringErrors.parenthesizedAssign;
    oldTrailingComma = refDestructuringErrors.trailingComma;
    oldDoubleProto = refDestructuringErrors.doubleProto;
    refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
  } else {
    refDestructuringErrors = new DestructuringErrors;
    ownDestructuringErrors = true;
  }

  var startPos = this.start, startLoc = this.startLoc;
  if (this.type === types$1.parenL || this.type === types$1.name) {
    this.potentialArrowAt = this.start;
    this.potentialArrowInForAwait = forInit === "await";
  }
  var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
  if (afterLeftParse) { left = afterLeftParse.call(this, left, startPos, startLoc); }
  if (this.type.isAssign) {
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.value;
    if (this.type === types$1.eq)
      { left = this.toAssignable(left, false, refDestructuringErrors); }
    if (!ownDestructuringErrors) {
      refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
    }
    if (refDestructuringErrors.shorthandAssign >= left.start)
      { refDestructuringErrors.shorthandAssign = -1; } // reset because shorthand default was used correctly
    if (this.type === types$1.eq)
      { this.checkLValPattern(left); }
    else
      { this.checkLValSimple(left); }
    node.left = left;
    this.next();
    node.right = this.parseMaybeAssign(forInit);
    if (oldDoubleProto > -1) { refDestructuringErrors.doubleProto = oldDoubleProto; }
    return this.finishNode(node, "AssignmentExpression")
  } else {
    if (ownDestructuringErrors) { this.checkExpressionErrors(refDestructuringErrors, true); }
  }
  if (oldParenAssign > -1) { refDestructuringErrors.parenthesizedAssign = oldParenAssign; }
  if (oldTrailingComma > -1) { refDestructuringErrors.trailingComma = oldTrailingComma; }
  return left
};

// Parse a ternary conditional (`?:`) operator.

pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprOps(forInit, refDestructuringErrors);
  if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
  if (this.eat(types$1.question)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    this.expect(types$1.colon);
    node.alternate = this.parseMaybeAssign(forInit);
    return this.finishNode(node, "ConditionalExpression")
  }
  return expr
};

// Start the precedence parser.

pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
  if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
  return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit)
};

// Parse binary operators with the operator precedence parsing
// algorithm. `left` is the left-hand side of the operator.
// `minPrec` provides context that allows the function to stop and
// defer further parser to one of its callers when it encounters an
// operator that has a lower precedence than the set it is parsing.

pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
  var prec = this.type.binop;
  if (prec != null && (!forInit || this.type !== types$1._in)) {
    if (prec > minPrec) {
      var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
      var coalesce = this.type === types$1.coalesce;
      if (coalesce) {
        // Handle the precedence of `tt.coalesce` as equal to the range of logical expressions.
        // In other words, `node.right` shouldn't contain logical expressions in order to check the mixed error.
        prec = types$1.logicalAND.binop;
      }
      var op = this.value;
      this.next();
      var startPos = this.start, startLoc = this.startLoc;
      var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
      var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
      if ((logical && this.type === types$1.coalesce) || (coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND))) {
        this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
      }
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit)
    }
  }
  return left
};

pp$5.buildBinary = function(startPos, startLoc, left, right, op, logical) {
  if (right.type === "PrivateIdentifier") { this.raise(right.start, "Private identifier can only be left side of binary expression"); }
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.operator = op;
  node.right = right;
  return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression")
};

// Parse unary operators, both prefix and postfix.

pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
  var startPos = this.start, startLoc = this.startLoc, expr;
  if (this.isContextual("await") && this.canAwait) {
    expr = this.parseAwait(forInit);
    sawUnary = true;
  } else if (this.type.prefix) {
    var node = this.startNode(), update = this.type === types$1.incDec;
    node.operator = this.value;
    node.prefix = true;
    this.next();
    node.argument = this.parseMaybeUnary(null, true, update, forInit);
    this.checkExpressionErrors(refDestructuringErrors, true);
    if (update) { this.checkLValSimple(node.argument); }
    else if (this.strict && node.operator === "delete" && isLocalVariableAccess(node.argument))
      { this.raiseRecoverable(node.start, "Deleting local variable in strict mode"); }
    else if (node.operator === "delete" && isPrivateFieldAccess(node.argument))
      { this.raiseRecoverable(node.start, "Private fields can not be deleted"); }
    else { sawUnary = true; }
    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  } else if (!sawUnary && this.type === types$1.privateId) {
    if ((forInit || this.privateNameStack.length === 0) && this.options.checkPrivateFields) { this.unexpected(); }
    expr = this.parsePrivateIdent();
    // only could be private fields in 'in', such as #x in obj
    if (this.type !== types$1._in) { this.unexpected(); }
  } else {
    expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
    if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
    while (this.type.postfix && !this.canInsertSemicolon()) {
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.operator = this.value;
      node$1.prefix = false;
      node$1.argument = expr;
      this.checkLValSimple(expr);
      this.next();
      expr = this.finishNode(node$1, "UpdateExpression");
    }
  }

  if (!incDec && this.eat(types$1.starstar)) {
    if (sawUnary)
      { this.unexpected(this.lastTokStart); }
    else
      { return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false) }
  } else {
    return expr
  }
};

function isLocalVariableAccess(node) {
  return (
    node.type === "Identifier" ||
    node.type === "ParenthesizedExpression" && isLocalVariableAccess(node.expression)
  )
}

function isPrivateFieldAccess(node) {
  return (
    node.type === "MemberExpression" && node.property.type === "PrivateIdentifier" ||
    node.type === "ChainExpression" && isPrivateFieldAccess(node.expression) ||
    node.type === "ParenthesizedExpression" && isPrivateFieldAccess(node.expression)
  )
}

// Parse call, dot, and `[]`-subscript expressions.

pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprAtom(refDestructuringErrors, forInit);
  if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
    { return expr }
  var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
  if (refDestructuringErrors && result.type === "MemberExpression") {
    if (refDestructuringErrors.parenthesizedAssign >= result.start) { refDestructuringErrors.parenthesizedAssign = -1; }
    if (refDestructuringErrors.parenthesizedBind >= result.start) { refDestructuringErrors.parenthesizedBind = -1; }
    if (refDestructuringErrors.trailingComma >= result.start) { refDestructuringErrors.trailingComma = -1; }
  }
  return result
};

pp$5.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
  var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" &&
      this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 &&
      this.potentialArrowAt === base.start;
  var optionalChained = false;

  while (true) {
    var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);

    if (element.optional) { optionalChained = true; }
    if (element === base || element.type === "ArrowFunctionExpression") {
      if (optionalChained) {
        var chainNode = this.startNodeAt(startPos, startLoc);
        chainNode.expression = element;
        element = this.finishNode(chainNode, "ChainExpression");
      }
      return element
    }

    base = element;
  }
};

pp$5.shouldParseAsyncArrow = function() {
  return !this.canInsertSemicolon() && this.eat(types$1.arrow)
};

pp$5.parseSubscriptAsyncArrow = function(startPos, startLoc, exprList, forInit) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit)
};

pp$5.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
  var optionalSupported = this.options.ecmaVersion >= 11;
  var optional = optionalSupported && this.eat(types$1.questionDot);
  if (noCalls && optional) { this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions"); }

  var computed = this.eat(types$1.bracketL);
  if (computed || (optional && this.type !== types$1.parenL && this.type !== types$1.backQuote) || this.eat(types$1.dot)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.object = base;
    if (computed) {
      node.property = this.parseExpression();
      this.expect(types$1.bracketR);
    } else if (this.type === types$1.privateId && base.type !== "Super") {
      node.property = this.parsePrivateIdent();
    } else {
      node.property = this.parseIdent(this.options.allowReserved !== "never");
    }
    node.computed = !!computed;
    if (optionalSupported) {
      node.optional = optional;
    }
    base = this.finishNode(node, "MemberExpression");
  } else if (!noCalls && this.eat(types$1.parenL)) {
    var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
    if (maybeAsyncArrow && !optional && this.shouldParseAsyncArrow()) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      if (this.awaitIdentPos > 0)
        { this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"); }
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      this.awaitIdentPos = oldAwaitIdentPos;
      return this.parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit)
    }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;
    this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
    var node$1 = this.startNodeAt(startPos, startLoc);
    node$1.callee = base;
    node$1.arguments = exprList;
    if (optionalSupported) {
      node$1.optional = optional;
    }
    base = this.finishNode(node$1, "CallExpression");
  } else if (this.type === types$1.backQuote) {
    if (optional || optionalChained) {
      this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    }
    var node$2 = this.startNodeAt(startPos, startLoc);
    node$2.tag = base;
    node$2.quasi = this.parseTemplate({isTagged: true});
    base = this.finishNode(node$2, "TaggedTemplateExpression");
  }
  return base
};

// Parse an atomic expression — either a single token that is an
// expression, an expression started by a keyword like `function` or
// `new`, or an expression wrapped in punctuation like `()`, `[]`,
// or `{}`.

pp$5.parseExprAtom = function(refDestructuringErrors, forInit, forNew) {
  // If a division operator appears in an expression position, the
  // tokenizer got confused, and we force it to read a regexp instead.
  if (this.type === types$1.slash) { this.readRegexp(); }

  var node, canBeArrow = this.potentialArrowAt === this.start;
  switch (this.type) {
  case types$1._super:
    if (!this.allowSuper)
      { this.raise(this.start, "'super' keyword outside a method"); }
    node = this.startNode();
    this.next();
    if (this.type === types$1.parenL && !this.allowDirectSuper)
      { this.raise(node.start, "super() call outside constructor of a subclass"); }
    // The `super` keyword can appear at below:
    // SuperProperty:
    //     super [ Expression ]
    //     super . IdentifierName
    // SuperCall:
    //     super ( Arguments )
    if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL)
      { this.unexpected(); }
    return this.finishNode(node, "Super")

  case types$1._this:
    node = this.startNode();
    this.next();
    return this.finishNode(node, "ThisExpression")

  case types$1.name:
    var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
    var id = this.parseIdent(false);
    if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) {
      this.overrideContext(types.f_expr);
      return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit)
    }
    if (canBeArrow && !this.canInsertSemicolon()) {
      if (this.eat(types$1.arrow))
        { return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit) }
      if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc &&
          (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
        id = this.parseIdent(false);
        if (this.canInsertSemicolon() || !this.eat(types$1.arrow))
          { this.unexpected(); }
        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit)
      }
    }
    return id

  case types$1.regexp:
    var value = this.value;
    node = this.parseLiteral(value.value);
    node.regex = {pattern: value.pattern, flags: value.flags};
    return node

  case types$1.num: case types$1.string:
    return this.parseLiteral(this.value)

  case types$1._null: case types$1._true: case types$1._false:
    node = this.startNode();
    node.value = this.type === types$1._null ? null : this.type === types$1._true;
    node.raw = this.type.keyword;
    this.next();
    return this.finishNode(node, "Literal")

  case types$1.parenL:
    var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
    if (refDestructuringErrors) {
      if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr))
        { refDestructuringErrors.parenthesizedAssign = start; }
      if (refDestructuringErrors.parenthesizedBind < 0)
        { refDestructuringErrors.parenthesizedBind = start; }
    }
    return expr

  case types$1.bracketL:
    node = this.startNode();
    this.next();
    node.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors);
    return this.finishNode(node, "ArrayExpression")

  case types$1.braceL:
    this.overrideContext(types.b_expr);
    return this.parseObj(false, refDestructuringErrors)

  case types$1._function:
    node = this.startNode();
    this.next();
    return this.parseFunction(node, 0)

  case types$1._class:
    return this.parseClass(this.startNode(), false)

  case types$1._new:
    return this.parseNew()

  case types$1.backQuote:
    return this.parseTemplate()

  case types$1._import:
    if (this.options.ecmaVersion >= 11) {
      return this.parseExprImport(forNew)
    } else {
      return this.unexpected()
    }

  default:
    return this.parseExprAtomDefault()
  }
};

pp$5.parseExprAtomDefault = function() {
  this.unexpected();
};

pp$5.parseExprImport = function(forNew) {
  var node = this.startNode();

  // Consume `import` as an identifier for `import.meta`.
  // Because `this.parseIdent(true)` doesn't check escape sequences, it needs the check of `this.containsEsc`.
  if (this.containsEsc) { this.raiseRecoverable(this.start, "Escape sequence in keyword import"); }
  this.next();

  if (this.type === types$1.parenL && !forNew) {
    return this.parseDynamicImport(node)
  } else if (this.type === types$1.dot) {
    var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
    meta.name = "import";
    node.meta = this.finishNode(meta, "Identifier");
    return this.parseImportMeta(node)
  } else {
    this.unexpected();
  }
};

pp$5.parseDynamicImport = function(node) {
  this.next(); // skip `(`

  // Parse node.source.
  node.source = this.parseMaybeAssign();

  // Verify ending.
  if (!this.eat(types$1.parenR)) {
    var errorPos = this.start;
    if (this.eat(types$1.comma) && this.eat(types$1.parenR)) {
      this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
    } else {
      this.unexpected(errorPos);
    }
  }

  return this.finishNode(node, "ImportExpression")
};

pp$5.parseImportMeta = function(node) {
  this.next(); // skip `.`

  var containsEsc = this.containsEsc;
  node.property = this.parseIdent(true);

  if (node.property.name !== "meta")
    { this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'"); }
  if (containsEsc)
    { this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters"); }
  if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere)
    { this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module"); }

  return this.finishNode(node, "MetaProperty")
};

pp$5.parseLiteral = function(value) {
  var node = this.startNode();
  node.value = value;
  node.raw = this.input.slice(this.start, this.end);
  if (node.raw.charCodeAt(node.raw.length - 1) === 110) { node.bigint = node.raw.slice(0, -1).replace(/_/g, ""); }
  this.next();
  return this.finishNode(node, "Literal")
};

pp$5.parseParenExpression = function() {
  this.expect(types$1.parenL);
  var val = this.parseExpression();
  this.expect(types$1.parenR);
  return val
};

pp$5.shouldParseArrow = function(exprList) {
  return !this.canInsertSemicolon()
};

pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
  var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();

    var innerStartPos = this.start, innerStartLoc = this.startLoc;
    var exprList = [], first = true, lastIsComma = false;
    var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
    this.yieldPos = 0;
    this.awaitPos = 0;
    // Do not save awaitIdentPos to allow checking awaits nested in parameters
    while (this.type !== types$1.parenR) {
      first ? first = false : this.expect(types$1.comma);
      if (allowTrailingComma && this.afterTrailingComma(types$1.parenR, true)) {
        lastIsComma = true;
        break
      } else if (this.type === types$1.ellipsis) {
        spreadStart = this.start;
        exprList.push(this.parseParenItem(this.parseRestBinding()));
        if (this.type === types$1.comma) {
          this.raiseRecoverable(
            this.start,
            "Comma is not permitted after the rest element"
          );
        }
        break
      } else {
        exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
      }
    }
    var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
    this.expect(types$1.parenR);

    if (canBeArrow && this.shouldParseArrow(exprList) && this.eat(types$1.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      return this.parseParenArrowList(startPos, startLoc, exprList, forInit)
    }

    if (!exprList.length || lastIsComma) { this.unexpected(this.lastTokStart); }
    if (spreadStart) { this.unexpected(spreadStart); }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;

    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc);
      val.expressions = exprList;
      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
    } else {
      val = exprList[0];
    }
  } else {
    val = this.parseParenExpression();
  }

  if (this.options.preserveParens) {
    var par = this.startNodeAt(startPos, startLoc);
    par.expression = val;
    return this.finishNode(par, "ParenthesizedExpression")
  } else {
    return val
  }
};

pp$5.parseParenItem = function(item) {
  return item
};

pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit)
};

// New's precedence is slightly tricky. It must allow its argument to
// be a `[]` or dot subscript expression, but not a call — at least,
// not without wrapping it in parentheses. Thus, it uses the noCalls
// argument to parseSubscripts to prevent it from consuming the
// argument list.

var empty = [];

pp$5.parseNew = function() {
  if (this.containsEsc) { this.raiseRecoverable(this.start, "Escape sequence in keyword new"); }
  var node = this.startNode();
  this.next();
  if (this.options.ecmaVersion >= 6 && this.type === types$1.dot) {
    var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
    meta.name = "new";
    node.meta = this.finishNode(meta, "Identifier");
    this.next();
    var containsEsc = this.containsEsc;
    node.property = this.parseIdent(true);
    if (node.property.name !== "target")
      { this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'"); }
    if (containsEsc)
      { this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters"); }
    if (!this.allowNewDotTarget)
      { this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block"); }
    return this.finishNode(node, "MetaProperty")
  }
  var startPos = this.start, startLoc = this.startLoc;
  node.callee = this.parseSubscripts(this.parseExprAtom(null, false, true), startPos, startLoc, true, false);
  if (this.eat(types$1.parenL)) { node.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false); }
  else { node.arguments = empty; }
  return this.finishNode(node, "NewExpression")
};

// Parse template expression.

pp$5.parseTemplateElement = function(ref) {
  var isTagged = ref.isTagged;

  var elem = this.startNode();
  if (this.type === types$1.invalidTemplate) {
    if (!isTagged) {
      this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
    }
    elem.value = {
      raw: this.value.replace(/\r\n?/g, "\n"),
      cooked: null
    };
  } else {
    elem.value = {
      raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
      cooked: this.value
    };
  }
  this.next();
  elem.tail = this.type === types$1.backQuote;
  return this.finishNode(elem, "TemplateElement")
};

pp$5.parseTemplate = function(ref) {
  if ( ref === void 0 ) ref = {};
  var isTagged = ref.isTagged; if ( isTagged === void 0 ) isTagged = false;

  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement({isTagged: isTagged});
  node.quasis = [curElt];
  while (!curElt.tail) {
    if (this.type === types$1.eof) { this.raise(this.pos, "Unterminated template literal"); }
    this.expect(types$1.dollarBraceL);
    node.expressions.push(this.parseExpression());
    this.expect(types$1.braceR);
    node.quasis.push(curElt = this.parseTemplateElement({isTagged: isTagged}));
  }
  this.next();
  return this.finishNode(node, "TemplateLiteral")
};

pp$5.isAsyncProp = function(prop) {
  return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" &&
    (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || (this.options.ecmaVersion >= 9 && this.type === types$1.star)) &&
    !lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
};

// Parse an object literal or binding pattern.

pp$5.parseObj = function(isPattern, refDestructuringErrors) {
  var node = this.startNode(), first = true, propHash = {};
  node.properties = [];
  this.next();
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) { break }
    } else { first = false; }

    var prop = this.parseProperty(isPattern, refDestructuringErrors);
    if (!isPattern) { this.checkPropClash(prop, propHash, refDestructuringErrors); }
    node.properties.push(prop);
  }
  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression")
};

pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
  var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
  if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
    if (isPattern) {
      prop.argument = this.parseIdent(false);
      if (this.type === types$1.comma) {
        this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
      }
      return this.finishNode(prop, "RestElement")
    }
    // Parse argument.
    prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    // To disallow trailing comma via `this.toAssignable()`.
    if (this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
      refDestructuringErrors.trailingComma = this.start;
    }
    // Finish
    return this.finishNode(prop, "SpreadElement")
  }
  if (this.options.ecmaVersion >= 6) {
    prop.method = false;
    prop.shorthand = false;
    if (isPattern || refDestructuringErrors) {
      startPos = this.start;
      startLoc = this.startLoc;
    }
    if (!isPattern)
      { isGenerator = this.eat(types$1.star); }
  }
  var containsEsc = this.containsEsc;
  this.parsePropertyName(prop);
  if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
    isAsync = true;
    isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
    this.parsePropertyName(prop);
  } else {
    isAsync = false;
  }
  this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
  return this.finishNode(prop, "Property")
};

pp$5.parseGetterSetter = function(prop) {
  prop.kind = prop.key.name;
  this.parsePropertyName(prop);
  prop.value = this.parseMethod(false);
  var paramCount = prop.kind === "get" ? 0 : 1;
  if (prop.value.params.length !== paramCount) {
    var start = prop.value.start;
    if (prop.kind === "get")
      { this.raiseRecoverable(start, "getter should have no params"); }
    else
      { this.raiseRecoverable(start, "setter should have exactly one param"); }
  } else {
    if (prop.kind === "set" && prop.value.params[0].type === "RestElement")
      { this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params"); }
  }
};

pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
  if ((isGenerator || isAsync) && this.type === types$1.colon)
    { this.unexpected(); }

  if (this.eat(types$1.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
    prop.kind = "init";
  } else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL) {
    if (isPattern) { this.unexpected(); }
    prop.kind = "init";
    prop.method = true;
    prop.value = this.parseMethod(isGenerator, isAsync);
  } else if (!isPattern && !containsEsc &&
             this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
             (prop.key.name === "get" || prop.key.name === "set") &&
             (this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq)) {
    if (isGenerator || isAsync) { this.unexpected(); }
    this.parseGetterSetter(prop);
  } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
    if (isGenerator || isAsync) { this.unexpected(); }
    this.checkUnreserved(prop.key);
    if (prop.key.name === "await" && !this.awaitIdentPos)
      { this.awaitIdentPos = startPos; }
    prop.kind = "init";
    if (isPattern) {
      prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
    } else if (this.type === types$1.eq && refDestructuringErrors) {
      if (refDestructuringErrors.shorthandAssign < 0)
        { refDestructuringErrors.shorthandAssign = this.start; }
      prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
    } else {
      prop.value = this.copyNode(prop.key);
    }
    prop.shorthand = true;
  } else { this.unexpected(); }
};

pp$5.parsePropertyName = function(prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(types$1.bracketL)) {
      prop.computed = true;
      prop.key = this.parseMaybeAssign();
      this.expect(types$1.bracketR);
      return prop.key
    } else {
      prop.computed = false;
    }
  }
  return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never")
};

// Initialize empty function node.

pp$5.initFunction = function(node) {
  node.id = null;
  if (this.options.ecmaVersion >= 6) { node.generator = node.expression = false; }
  if (this.options.ecmaVersion >= 8) { node.async = false; }
};

// Parse object or class method.

pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
  var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;

  this.initFunction(node);
  if (this.options.ecmaVersion >= 6)
    { node.generator = isGenerator; }
  if (this.options.ecmaVersion >= 8)
    { node.async = !!isAsync; }

  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));

  this.expect(types$1.parenL);
  node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
  this.parseFunctionBody(node, false, true, false);

  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, "FunctionExpression")
};

// Parse arrow function expression with given parameters.

pp$5.parseArrowExpression = function(node, params, isAsync, forInit) {
  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;

  this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
  this.initFunction(node);
  if (this.options.ecmaVersion >= 8) { node.async = !!isAsync; }

  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;

  node.params = this.toAssignableList(params, true);
  this.parseFunctionBody(node, true, false, forInit);

  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, "ArrowFunctionExpression")
};

// Parse function body and check parameters.

pp$5.parseFunctionBody = function(node, isArrowFunction, isMethod, forInit) {
  var isExpression = isArrowFunction && this.type !== types$1.braceL;
  var oldStrict = this.strict, useStrict = false;

  if (isExpression) {
    node.body = this.parseMaybeAssign(forInit);
    node.expression = true;
    this.checkParams(node, false);
  } else {
    var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
    if (!oldStrict || nonSimple) {
      useStrict = this.strictDirective(this.end);
      // If this is a strict mode function, verify that argument names
      // are not repeated, and it does not try to bind the words `eval`
      // or `arguments`.
      if (useStrict && nonSimple)
        { this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list"); }
    }
    // Start a new scope with regard to labels and the `inFunction`
    // flag (restore them to their old value afterwards).
    var oldLabels = this.labels;
    this.labels = [];
    if (useStrict) { this.strict = true; }

    // Add the params to varDeclaredNames to ensure that an error is thrown
    // if a let/const declaration in the function clashes with one of the params.
    this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
    // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
    if (this.strict && node.id) { this.checkLValSimple(node.id, BIND_OUTSIDE); }
    node.body = this.parseBlock(false, undefined, useStrict && !oldStrict);
    node.expression = false;
    this.adaptDirectivePrologue(node.body.body);
    this.labels = oldLabels;
  }
  this.exitScope();
};

pp$5.isSimpleParamList = function(params) {
  for (var i = 0, list = params; i < list.length; i += 1)
    {
    var param = list[i];

    if (param.type !== "Identifier") { return false
  } }
  return true
};

// Checks function params for various disallowed patterns such as using "eval"
// or "arguments" and duplicate parameters.

pp$5.checkParams = function(node, allowDuplicates) {
  var nameHash = Object.create(null);
  for (var i = 0, list = node.params; i < list.length; i += 1)
    {
    var param = list[i];

    this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
  }
};

// Parses a comma-separated list of expressions, and returns them as
// an array. `close` is the token type that ends the list, and
// `allowEmpty` can be turned on to allow subsequent commas with
// nothing in between them to be parsed as `null` (which is needed
// for array literals).

pp$5.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
  var elts = [], first = true;
  while (!this.eat(close)) {
    if (!first) {
      this.expect(types$1.comma);
      if (allowTrailingComma && this.afterTrailingComma(close)) { break }
    } else { first = false; }

    var elt = (void 0);
    if (allowEmpty && this.type === types$1.comma)
      { elt = null; }
    else if (this.type === types$1.ellipsis) {
      elt = this.parseSpread(refDestructuringErrors);
      if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0)
        { refDestructuringErrors.trailingComma = this.start; }
    } else {
      elt = this.parseMaybeAssign(false, refDestructuringErrors);
    }
    elts.push(elt);
  }
  return elts
};

pp$5.checkUnreserved = function(ref) {
  var start = ref.start;
  var end = ref.end;
  var name = ref.name;

  if (this.inGenerator && name === "yield")
    { this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator"); }
  if (this.inAsync && name === "await")
    { this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function"); }
  if (this.currentThisScope().inClassFieldInit && name === "arguments")
    { this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer"); }
  if (this.inClassStaticBlock && (name === "arguments" || name === "await"))
    { this.raise(start, ("Cannot use " + name + " in class static initialization block")); }
  if (this.keywords.test(name))
    { this.raise(start, ("Unexpected keyword '" + name + "'")); }
  if (this.options.ecmaVersion < 6 &&
    this.input.slice(start, end).indexOf("\\") !== -1) { return }
  var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
  if (re.test(name)) {
    if (!this.inAsync && name === "await")
      { this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function"); }
    this.raiseRecoverable(start, ("The keyword '" + name + "' is reserved"));
  }
};

// Parse the next token as an identifier. If `liberal` is true (used
// when parsing properties), it will also convert keywords into
// identifiers.

pp$5.parseIdent = function(liberal) {
  var node = this.parseIdentNode();
  this.next(!!liberal);
  this.finishNode(node, "Identifier");
  if (!liberal) {
    this.checkUnreserved(node);
    if (node.name === "await" && !this.awaitIdentPos)
      { this.awaitIdentPos = node.start; }
  }
  return node
};

pp$5.parseIdentNode = function() {
  var node = this.startNode();
  if (this.type === types$1.name) {
    node.name = this.value;
  } else if (this.type.keyword) {
    node.name = this.type.keyword;

    // To fix https://github.com/acornjs/acorn/issues/575
    // `class` and `function` keywords push new context into this.context.
    // But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
    // If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword
    if ((node.name === "class" || node.name === "function") &&
      (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
      this.context.pop();
    }
    this.type = types$1.name;
  } else {
    this.unexpected();
  }
  return node
};

pp$5.parsePrivateIdent = function() {
  var node = this.startNode();
  if (this.type === types$1.privateId) {
    node.name = this.value;
  } else {
    this.unexpected();
  }
  this.next();
  this.finishNode(node, "PrivateIdentifier");

  // For validating existence
  if (this.options.checkPrivateFields) {
    if (this.privateNameStack.length === 0) {
      this.raise(node.start, ("Private field '#" + (node.name) + "' must be declared in an enclosing class"));
    } else {
      this.privateNameStack[this.privateNameStack.length - 1].used.push(node);
    }
  }

  return node
};

// Parses yield expression inside generator.

pp$5.parseYield = function(forInit) {
  if (!this.yieldPos) { this.yieldPos = this.start; }

  var node = this.startNode();
  this.next();
  if (this.type === types$1.semi || this.canInsertSemicolon() || (this.type !== types$1.star && !this.type.startsExpr)) {
    node.delegate = false;
    node.argument = null;
  } else {
    node.delegate = this.eat(types$1.star);
    node.argument = this.parseMaybeAssign(forInit);
  }
  return this.finishNode(node, "YieldExpression")
};

pp$5.parseAwait = function(forInit) {
  if (!this.awaitPos) { this.awaitPos = this.start; }

  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeUnary(null, true, false, forInit);
  return this.finishNode(node, "AwaitExpression")
};

var pp$4 = Parser.prototype;

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

pp$4.raise = function(pos, message) {
  var loc = getLineInfo(this.input, pos);
  message += " (" + loc.line + ":" + loc.column + ")";
  var err = new SyntaxError(message);
  err.pos = pos; err.loc = loc; err.raisedAt = this.pos;
  throw err
};

pp$4.raiseRecoverable = pp$4.raise;

pp$4.curPosition = function() {
  if (this.options.locations) {
    return new Position(this.curLine, this.pos - this.lineStart)
  }
};

var pp$3 = Parser.prototype;

var Scope = function Scope(flags) {
  this.flags = flags;
  // A list of var-declared names in the current lexical scope
  this.var = [];
  // A list of lexically-declared names in the current lexical scope
  this.lexical = [];
  // A list of lexically-declared FunctionDeclaration names in the current lexical scope
  this.functions = [];
  // A switch to disallow the identifier reference 'arguments'
  this.inClassFieldInit = false;
};

// The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

pp$3.enterScope = function(flags) {
  this.scopeStack.push(new Scope(flags));
};

pp$3.exitScope = function() {
  this.scopeStack.pop();
};

// The spec says:
// > At the top level of a function, or script, function declarations are
// > treated like var declarations rather than like lexical declarations.
pp$3.treatFunctionsAsVarInScope = function(scope) {
  return (scope.flags & SCOPE_FUNCTION) || !this.inModule && (scope.flags & SCOPE_TOP)
};

pp$3.declareName = function(name, bindingType, pos) {
  var redeclared = false;
  if (bindingType === BIND_LEXICAL) {
    var scope = this.currentScope();
    redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
    scope.lexical.push(name);
    if (this.inModule && (scope.flags & SCOPE_TOP))
      { delete this.undefinedExports[name]; }
  } else if (bindingType === BIND_SIMPLE_CATCH) {
    var scope$1 = this.currentScope();
    scope$1.lexical.push(name);
  } else if (bindingType === BIND_FUNCTION) {
    var scope$2 = this.currentScope();
    if (this.treatFunctionsAsVar)
      { redeclared = scope$2.lexical.indexOf(name) > -1; }
    else
      { redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1; }
    scope$2.functions.push(name);
  } else {
    for (var i = this.scopeStack.length - 1; i >= 0; --i) {
      var scope$3 = this.scopeStack[i];
      if (scope$3.lexical.indexOf(name) > -1 && !((scope$3.flags & SCOPE_SIMPLE_CATCH) && scope$3.lexical[0] === name) ||
          !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
        redeclared = true;
        break
      }
      scope$3.var.push(name);
      if (this.inModule && (scope$3.flags & SCOPE_TOP))
        { delete this.undefinedExports[name]; }
      if (scope$3.flags & SCOPE_VAR) { break }
    }
  }
  if (redeclared) { this.raiseRecoverable(pos, ("Identifier '" + name + "' has already been declared")); }
};

pp$3.checkLocalExport = function(id) {
  // scope.functions must be empty as Module code is always strict.
  if (this.scopeStack[0].lexical.indexOf(id.name) === -1 &&
      this.scopeStack[0].var.indexOf(id.name) === -1) {
    this.undefinedExports[id.name] = id;
  }
};

pp$3.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1]
};

pp$3.currentVarScope = function() {
  for (var i = this.scopeStack.length - 1;; i--) {
    var scope = this.scopeStack[i];
    if (scope.flags & SCOPE_VAR) { return scope }
  }
};

// Could be useful for `this`, `new.target`, `super()`, `super.property`, and `super[property]`.
pp$3.currentThisScope = function() {
  for (var i = this.scopeStack.length - 1;; i--) {
    var scope = this.scopeStack[i];
    if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW)) { return scope }
  }
};

var Node = function Node(parser, pos, loc) {
  this.type = "";
  this.start = pos;
  this.end = 0;
  if (parser.options.locations)
    { this.loc = new SourceLocation(parser, loc); }
  if (parser.options.directSourceFile)
    { this.sourceFile = parser.options.directSourceFile; }
  if (parser.options.ranges)
    { this.range = [pos, 0]; }
};

// Start an AST node, attaching a start offset.

var pp$2 = Parser.prototype;

pp$2.startNode = function() {
  return new Node(this, this.start, this.startLoc)
};

pp$2.startNodeAt = function(pos, loc) {
  return new Node(this, pos, loc)
};

// Finish an AST node, adding `type` and `end` properties.

function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  if (this.options.locations)
    { node.loc.end = loc; }
  if (this.options.ranges)
    { node.range[1] = pos; }
  return node
}

pp$2.finishNode = function(node, type) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc)
};

// Finish node at given position

pp$2.finishNodeAt = function(node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc)
};

pp$2.copyNode = function(node) {
  var newNode = new Node(this, node.start, this.startLoc);
  for (var prop in node) { newNode[prop] = node[prop]; }
  return newNode
};

// This file contains Unicode properties extracted from the ECMAScript specification.
// The lists are extracted like so:
// $$('#table-binary-unicode-properties > figure > table > tbody > tr > td:nth-child(1) code').map(el => el.innerText)

// #table-binary-unicode-properties
var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
var ecma11BinaryProperties = ecma10BinaryProperties;
var ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict";
var ecma13BinaryProperties = ecma12BinaryProperties;
var ecma14BinaryProperties = ecma13BinaryProperties;

var unicodeBinaryProperties = {
  9: ecma9BinaryProperties,
  10: ecma10BinaryProperties,
  11: ecma11BinaryProperties,
  12: ecma12BinaryProperties,
  13: ecma13BinaryProperties,
  14: ecma14BinaryProperties
};

// #table-binary-unicode-properties-of-strings
var ecma14BinaryPropertiesOfStrings = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji";

var unicodeBinaryPropertiesOfStrings = {
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: ecma14BinaryPropertiesOfStrings
};

// #table-unicode-general-category-values
var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";

// #table-unicode-script-values
var ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
var ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
var ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
var ecma14ScriptValues = ecma13ScriptValues + " Hrkt Katakana_Or_Hiragana Kawi Nag_Mundari Nagm Unknown Zzzz";

var unicodeScriptValues = {
  9: ecma9ScriptValues,
  10: ecma10ScriptValues,
  11: ecma11ScriptValues,
  12: ecma12ScriptValues,
  13: ecma13ScriptValues,
  14: ecma14ScriptValues
};

var data = {};
function buildUnicodeData(ecmaVersion) {
  var d = data[ecmaVersion] = {
    binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
    binaryOfStrings: wordsRegexp(unicodeBinaryPropertiesOfStrings[ecmaVersion]),
    nonBinary: {
      General_Category: wordsRegexp(unicodeGeneralCategoryValues),
      Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
    }
  };
  d.nonBinary.Script_Extensions = d.nonBinary.Script;

  d.nonBinary.gc = d.nonBinary.General_Category;
  d.nonBinary.sc = d.nonBinary.Script;
  d.nonBinary.scx = d.nonBinary.Script_Extensions;
}

for (var i = 0, list = [9, 10, 11, 12, 13, 14]; i < list.length; i += 1) {
  var ecmaVersion = list[i];

  buildUnicodeData(ecmaVersion);
}

var pp$1 = Parser.prototype;

// Track disjunction structure to determine whether a duplicate
// capture group name is allowed because it is in a separate branch.
var BranchID = function BranchID(parent, base) {
  // Parent disjunction branch
  this.parent = parent;
  // Identifies this set of sibling branches
  this.base = base || this;
};

BranchID.prototype.separatedFrom = function separatedFrom (alt) {
  // A branch is separate from another branch if they or any of
  // their parents are siblings in a given disjunction
  for (var self = this; self; self = self.parent) {
    for (var other = alt; other; other = other.parent) {
      if (self.base === other.base && self !== other) { return true }
    }
  }
  return false
};

BranchID.prototype.sibling = function sibling () {
  return new BranchID(this.parent, this.base)
};

var RegExpValidationState = function RegExpValidationState(parser) {
  this.parser = parser;
  this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "") + (parser.options.ecmaVersion >= 15 ? "v" : "");
  this.unicodeProperties = data[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion];
  this.source = "";
  this.flags = "";
  this.start = 0;
  this.switchU = false;
  this.switchV = false;
  this.switchN = false;
  this.pos = 0;
  this.lastIntValue = 0;
  this.lastStringValue = "";
  this.lastAssertionIsQuantifiable = false;
  this.numCapturingParens = 0;
  this.maxBackReference = 0;
  this.groupNames = Object.create(null);
  this.backReferenceNames = [];
  this.branchID = null;
};

RegExpValidationState.prototype.reset = function reset (start, pattern, flags) {
  var unicodeSets = flags.indexOf("v") !== -1;
  var unicode = flags.indexOf("u") !== -1;
  this.start = start | 0;
  this.source = pattern + "";
  this.flags = flags;
  if (unicodeSets && this.parser.options.ecmaVersion >= 15) {
    this.switchU = true;
    this.switchV = true;
    this.switchN = true;
  } else {
    this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
    this.switchV = false;
    this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
  }
};

RegExpValidationState.prototype.raise = function raise (message) {
  this.parser.raiseRecoverable(this.start, ("Invalid regular expression: /" + (this.source) + "/: " + message));
};

// If u flag is given, this returns the code point at the index (it combines a surrogate pair).
// Otherwise, this returns the code unit of the index (can be a part of a surrogate pair).
RegExpValidationState.prototype.at = function at (i, forceU) {
    if ( forceU === void 0 ) forceU = false;

  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return -1
  }
  var c = s.charCodeAt(i);
  if (!(forceU || this.switchU) || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
    return c
  }
  var next = s.charCodeAt(i + 1);
  return next >= 0xDC00 && next <= 0xDFFF ? (c << 10) + next - 0x35FDC00 : c
};

RegExpValidationState.prototype.nextIndex = function nextIndex (i, forceU) {
    if ( forceU === void 0 ) forceU = false;

  var s = this.source;
  var l = s.length;
  if (i >= l) {
    return l
  }
  var c = s.charCodeAt(i), next;
  if (!(forceU || this.switchU) || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l ||
      (next = s.charCodeAt(i + 1)) < 0xDC00 || next > 0xDFFF) {
    return i + 1
  }
  return i + 2
};

RegExpValidationState.prototype.current = function current (forceU) {
    if ( forceU === void 0 ) forceU = false;

  return this.at(this.pos, forceU)
};

RegExpValidationState.prototype.lookahead = function lookahead (forceU) {
    if ( forceU === void 0 ) forceU = false;

  return this.at(this.nextIndex(this.pos, forceU), forceU)
};

RegExpValidationState.prototype.advance = function advance (forceU) {
    if ( forceU === void 0 ) forceU = false;

  this.pos = this.nextIndex(this.pos, forceU);
};

RegExpValidationState.prototype.eat = function eat (ch, forceU) {
    if ( forceU === void 0 ) forceU = false;

  if (this.current(forceU) === ch) {
    this.advance(forceU);
    return true
  }
  return false
};

RegExpValidationState.prototype.eatChars = function eatChars (chs, forceU) {
    if ( forceU === void 0 ) forceU = false;

  var pos = this.pos;
  for (var i = 0, list = chs; i < list.length; i += 1) {
    var ch = list[i];

      var current = this.at(pos, forceU);
    if (current === -1 || current !== ch) {
      return false
    }
    pos = this.nextIndex(pos, forceU);
  }
  this.pos = pos;
  return true
};

/**
 * Validate the flags part of a given RegExpLiteral.
 *
 * @param {RegExpValidationState} state The state to validate RegExp.
 * @returns {void}
 */
pp$1.validateRegExpFlags = function(state) {
  var validFlags = state.validFlags;
  var flags = state.flags;

  var u = false;
  var v = false;

  for (var i = 0; i < flags.length; i++) {
    var flag = flags.charAt(i);
    if (validFlags.indexOf(flag) === -1) {
      this.raise(state.start, "Invalid regular expression flag");
    }
    if (flags.indexOf(flag, i + 1) > -1) {
      this.raise(state.start, "Duplicate regular expression flag");
    }
    if (flag === "u") { u = true; }
    if (flag === "v") { v = true; }
  }
  if (this.options.ecmaVersion >= 15 && u && v) {
    this.raise(state.start, "Invalid regular expression flag");
  }
};

function hasProp(obj) {
  for (var _ in obj) { return true }
  return false
}

/**
 * Validate the pattern part of a given RegExpLiteral.
 *
 * @param {RegExpValidationState} state The state to validate RegExp.
 * @returns {void}
 */
pp$1.validateRegExpPattern = function(state) {
  this.regexp_pattern(state);

  // The goal symbol for the parse is |Pattern[~U, ~N]|. If the result of
  // parsing contains a |GroupName|, reparse with the goal symbol
  // |Pattern[~U, +N]| and use this result instead. Throw a *SyntaxError*
  // exception if _P_ did not conform to the grammar, if any elements of _P_
  // were not matched by the parse, or if any Early Error conditions exist.
  if (!state.switchN && this.options.ecmaVersion >= 9 && hasProp(state.groupNames)) {
    state.switchN = true;
    this.regexp_pattern(state);
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
pp$1.regexp_pattern = function(state) {
  state.pos = 0;
  state.lastIntValue = 0;
  state.lastStringValue = "";
  state.lastAssertionIsQuantifiable = false;
  state.numCapturingParens = 0;
  state.maxBackReference = 0;
  state.groupNames = Object.create(null);
  state.backReferenceNames.length = 0;
  state.branchID = null;

  this.regexp_disjunction(state);

  if (state.pos !== state.source.length) {
    // Make the same messages as V8.
    if (state.eat(0x29 /* ) */)) {
      state.raise("Unmatched ')'");
    }
    if (state.eat(0x5D /* ] */) || state.eat(0x7D /* } */)) {
      state.raise("Lone quantifier brackets");
    }
  }
  if (state.maxBackReference > state.numCapturingParens) {
    state.raise("Invalid escape");
  }
  for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
    var name = list[i];

    if (!state.groupNames[name]) {
      state.raise("Invalid named capture referenced");
    }
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
pp$1.regexp_disjunction = function(state) {
  var trackDisjunction = this.options.ecmaVersion >= 16;
  if (trackDisjunction) { state.branchID = new BranchID(state.branchID, null); }
  this.regexp_alternative(state);
  while (state.eat(0x7C /* | */)) {
    if (trackDisjunction) { state.branchID = state.branchID.sibling(); }
    this.regexp_alternative(state);
  }
  if (trackDisjunction) { state.branchID = state.branchID.parent; }

  // Make the same message as V8.
  if (this.regexp_eatQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  if (state.eat(0x7B /* { */)) {
    state.raise("Lone quantifier brackets");
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
pp$1.regexp_alternative = function(state) {
  while (state.pos < state.source.length && this.regexp_eatTerm(state)) {}
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term
pp$1.regexp_eatTerm = function(state) {
  if (this.regexp_eatAssertion(state)) {
    // Handle `QuantifiableAssertion Quantifier` alternative.
    // `state.lastAssertionIsQuantifiable` is true if the last eaten Assertion
    // is a QuantifiableAssertion.
    if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
      // Make the same message as V8.
      if (state.switchU) {
        state.raise("Invalid quantifier");
      }
    }
    return true
  }

  if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
    this.regexp_eatQuantifier(state);
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion
pp$1.regexp_eatAssertion = function(state) {
  var start = state.pos;
  state.lastAssertionIsQuantifiable = false;

  // ^, $
  if (state.eat(0x5E /* ^ */) || state.eat(0x24 /* $ */)) {
    return true
  }

  // \b \B
  if (state.eat(0x5C /* \ */)) {
    if (state.eat(0x42 /* B */) || state.eat(0x62 /* b */)) {
      return true
    }
    state.pos = start;
  }

  // Lookahead / Lookbehind
  if (state.eat(0x28 /* ( */) && state.eat(0x3F /* ? */)) {
    var lookbehind = false;
    if (this.options.ecmaVersion >= 9) {
      lookbehind = state.eat(0x3C /* < */);
    }
    if (state.eat(0x3D /* = */) || state.eat(0x21 /* ! */)) {
      this.regexp_disjunction(state);
      if (!state.eat(0x29 /* ) */)) {
        state.raise("Unterminated group");
      }
      state.lastAssertionIsQuantifiable = !lookbehind;
      return true
    }
  }

  state.pos = start;
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
pp$1.regexp_eatQuantifier = function(state, noError) {
  if ( noError === void 0 ) noError = false;

  if (this.regexp_eatQuantifierPrefix(state, noError)) {
    state.eat(0x3F /* ? */);
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
  return (
    state.eat(0x2A /* * */) ||
    state.eat(0x2B /* + */) ||
    state.eat(0x3F /* ? */) ||
    this.regexp_eatBracedQuantifier(state, noError)
  )
};
pp$1.regexp_eatBracedQuantifier = function(state, noError) {
  var start = state.pos;
  if (state.eat(0x7B /* { */)) {
    var min = 0, max = -1;
    if (this.regexp_eatDecimalDigits(state)) {
      min = state.lastIntValue;
      if (state.eat(0x2C /* , */) && this.regexp_eatDecimalDigits(state)) {
        max = state.lastIntValue;
      }
      if (state.eat(0x7D /* } */)) {
        // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-term
        if (max !== -1 && max < min && !noError) {
          state.raise("numbers out of order in {} quantifier");
        }
        return true
      }
    }
    if (state.switchU && !noError) {
      state.raise("Incomplete quantifier");
    }
    state.pos = start;
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
pp$1.regexp_eatAtom = function(state) {
  return (
    this.regexp_eatPatternCharacters(state) ||
    state.eat(0x2E /* . */) ||
    this.regexp_eatReverseSolidusAtomEscape(state) ||
    this.regexp_eatCharacterClass(state) ||
    this.regexp_eatUncapturingGroup(state) ||
    this.regexp_eatCapturingGroup(state)
  )
};
pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
  var start = state.pos;
  if (state.eat(0x5C /* \ */)) {
    if (this.regexp_eatAtomEscape(state)) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$1.regexp_eatUncapturingGroup = function(state) {
  var start = state.pos;
  if (state.eat(0x28 /* ( */)) {
    if (state.eat(0x3F /* ? */) && state.eat(0x3A /* : */)) {
      this.regexp_disjunction(state);
      if (state.eat(0x29 /* ) */)) {
        return true
      }
      state.raise("Unterminated group");
    }
    state.pos = start;
  }
  return false
};
pp$1.regexp_eatCapturingGroup = function(state) {
  if (state.eat(0x28 /* ( */)) {
    if (this.options.ecmaVersion >= 9) {
      this.regexp_groupSpecifier(state);
    } else if (state.current() === 0x3F /* ? */) {
      state.raise("Invalid group");
    }
    this.regexp_disjunction(state);
    if (state.eat(0x29 /* ) */)) {
      state.numCapturingParens += 1;
      return true
    }
    state.raise("Unterminated group");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom
pp$1.regexp_eatExtendedAtom = function(state) {
  return (
    state.eat(0x2E /* . */) ||
    this.regexp_eatReverseSolidusAtomEscape(state) ||
    this.regexp_eatCharacterClass(state) ||
    this.regexp_eatUncapturingGroup(state) ||
    this.regexp_eatCapturingGroup(state) ||
    this.regexp_eatInvalidBracedQuantifier(state) ||
    this.regexp_eatExtendedPatternCharacter(state)
  )
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier
pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
  if (this.regexp_eatBracedQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
pp$1.regexp_eatSyntaxCharacter = function(state) {
  var ch = state.current();
  if (isSyntaxCharacter(ch)) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }
  return false
};
function isSyntaxCharacter(ch) {
  return (
    ch === 0x24 /* $ */ ||
    ch >= 0x28 /* ( */ && ch <= 0x2B /* + */ ||
    ch === 0x2E /* . */ ||
    ch === 0x3F /* ? */ ||
    ch >= 0x5B /* [ */ && ch <= 0x5E /* ^ */ ||
    ch >= 0x7B /* { */ && ch <= 0x7D /* } */
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
// But eat eager.
pp$1.regexp_eatPatternCharacters = function(state) {
  var start = state.pos;
  var ch = 0;
  while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
    state.advance();
  }
  return state.pos !== start
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedPatternCharacter
pp$1.regexp_eatExtendedPatternCharacter = function(state) {
  var ch = state.current();
  if (
    ch !== -1 &&
    ch !== 0x24 /* $ */ &&
    !(ch >= 0x28 /* ( */ && ch <= 0x2B /* + */) &&
    ch !== 0x2E /* . */ &&
    ch !== 0x3F /* ? */ &&
    ch !== 0x5B /* [ */ &&
    ch !== 0x5E /* ^ */ &&
    ch !== 0x7C /* | */
  ) {
    state.advance();
    return true
  }
  return false
};

// GroupSpecifier ::
//   [empty]
//   `?` GroupName
pp$1.regexp_groupSpecifier = function(state) {
  if (state.eat(0x3F /* ? */)) {
    if (!this.regexp_eatGroupName(state)) { state.raise("Invalid group"); }
    var trackDisjunction = this.options.ecmaVersion >= 16;
    var known = state.groupNames[state.lastStringValue];
    if (known) {
      if (trackDisjunction) {
        for (var i = 0, list = known; i < list.length; i += 1) {
          var altID = list[i];

          if (!altID.separatedFrom(state.branchID))
            { state.raise("Duplicate capture group name"); }
        }
      } else {
        state.raise("Duplicate capture group name");
      }
    }
    if (trackDisjunction) {
      (known || (state.groupNames[state.lastStringValue] = [])).push(state.branchID);
    } else {
      state.groupNames[state.lastStringValue] = true;
    }
  }
};

// GroupName ::
//   `<` RegExpIdentifierName `>`
// Note: this updates `state.lastStringValue` property with the eaten name.
pp$1.regexp_eatGroupName = function(state) {
  state.lastStringValue = "";
  if (state.eat(0x3C /* < */)) {
    if (this.regexp_eatRegExpIdentifierName(state) && state.eat(0x3E /* > */)) {
      return true
    }
    state.raise("Invalid capture group name");
  }
  return false
};

// RegExpIdentifierName ::
//   RegExpIdentifierStart
//   RegExpIdentifierName RegExpIdentifierPart
// Note: this updates `state.lastStringValue` property with the eaten name.
pp$1.regexp_eatRegExpIdentifierName = function(state) {
  state.lastStringValue = "";
  if (this.regexp_eatRegExpIdentifierStart(state)) {
    state.lastStringValue += codePointToString(state.lastIntValue);
    while (this.regexp_eatRegExpIdentifierPart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue);
    }
    return true
  }
  return false
};

// RegExpIdentifierStart ::
//   UnicodeIDStart
//   `$`
//   `_`
//   `\` RegExpUnicodeEscapeSequence[+U]
pp$1.regexp_eatRegExpIdentifierStart = function(state) {
  var start = state.pos;
  var forceU = this.options.ecmaVersion >= 11;
  var ch = state.current(forceU);
  state.advance(forceU);

  if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierStart(ch)) {
    state.lastIntValue = ch;
    return true
  }

  state.pos = start;
  return false
};
function isRegExpIdentifierStart(ch) {
  return isIdentifierStart(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */
}

// RegExpIdentifierPart ::
//   UnicodeIDContinue
//   `$`
//   `_`
//   `\` RegExpUnicodeEscapeSequence[+U]
//   <ZWNJ>
//   <ZWJ>
pp$1.regexp_eatRegExpIdentifierPart = function(state) {
  var start = state.pos;
  var forceU = this.options.ecmaVersion >= 11;
  var ch = state.current(forceU);
  state.advance(forceU);

  if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierPart(ch)) {
    state.lastIntValue = ch;
    return true
  }

  state.pos = start;
  return false
};
function isRegExpIdentifierPart(ch) {
  return isIdentifierChar(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */ || ch === 0x200C /* <ZWNJ> */ || ch === 0x200D /* <ZWJ> */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape
pp$1.regexp_eatAtomEscape = function(state) {
  if (
    this.regexp_eatBackReference(state) ||
    this.regexp_eatCharacterClassEscape(state) ||
    this.regexp_eatCharacterEscape(state) ||
    (state.switchN && this.regexp_eatKGroupName(state))
  ) {
    return true
  }
  if (state.switchU) {
    // Make the same message as V8.
    if (state.current() === 0x63 /* c */) {
      state.raise("Invalid unicode escape");
    }
    state.raise("Invalid escape");
  }
  return false
};
pp$1.regexp_eatBackReference = function(state) {
  var start = state.pos;
  if (this.regexp_eatDecimalEscape(state)) {
    var n = state.lastIntValue;
    if (state.switchU) {
      // For SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
      if (n > state.maxBackReference) {
        state.maxBackReference = n;
      }
      return true
    }
    if (n <= state.numCapturingParens) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$1.regexp_eatKGroupName = function(state) {
  if (state.eat(0x6B /* k */)) {
    if (this.regexp_eatGroupName(state)) {
      state.backReferenceNames.push(state.lastStringValue);
      return true
    }
    state.raise("Invalid named reference");
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape
pp$1.regexp_eatCharacterEscape = function(state) {
  return (
    this.regexp_eatControlEscape(state) ||
    this.regexp_eatCControlLetter(state) ||
    this.regexp_eatZero(state) ||
    this.regexp_eatHexEscapeSequence(state) ||
    this.regexp_eatRegExpUnicodeEscapeSequence(state, false) ||
    (!state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state)) ||
    this.regexp_eatIdentityEscape(state)
  )
};
pp$1.regexp_eatCControlLetter = function(state) {
  var start = state.pos;
  if (state.eat(0x63 /* c */)) {
    if (this.regexp_eatControlLetter(state)) {
      return true
    }
    state.pos = start;
  }
  return false
};
pp$1.regexp_eatZero = function(state) {
  if (state.current() === 0x30 /* 0 */ && !isDecimalDigit(state.lookahead())) {
    state.lastIntValue = 0;
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
pp$1.regexp_eatControlEscape = function(state) {
  var ch = state.current();
  if (ch === 0x74 /* t */) {
    state.lastIntValue = 0x09; /* \t */
    state.advance();
    return true
  }
  if (ch === 0x6E /* n */) {
    state.lastIntValue = 0x0A; /* \n */
    state.advance();
    return true
  }
  if (ch === 0x76 /* v */) {
    state.lastIntValue = 0x0B; /* \v */
    state.advance();
    return true
  }
  if (ch === 0x66 /* f */) {
    state.lastIntValue = 0x0C; /* \f */
    state.advance();
    return true
  }
  if (ch === 0x72 /* r */) {
    state.lastIntValue = 0x0D; /* \r */
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
pp$1.regexp_eatControlLetter = function(state) {
  var ch = state.current();
  if (isControlLetter(ch)) {
    state.lastIntValue = ch % 0x20;
    state.advance();
    return true
  }
  return false
};
function isControlLetter(ch) {
  return (
    (ch >= 0x41 /* A */ && ch <= 0x5A /* Z */) ||
    (ch >= 0x61 /* a */ && ch <= 0x7A /* z */)
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
  if ( forceU === void 0 ) forceU = false;

  var start = state.pos;
  var switchU = forceU || state.switchU;

  if (state.eat(0x75 /* u */)) {
    if (this.regexp_eatFixedHexDigits(state, 4)) {
      var lead = state.lastIntValue;
      if (switchU && lead >= 0xD800 && lead <= 0xDBFF) {
        var leadSurrogateEnd = state.pos;
        if (state.eat(0x5C /* \ */) && state.eat(0x75 /* u */) && this.regexp_eatFixedHexDigits(state, 4)) {
          var trail = state.lastIntValue;
          if (trail >= 0xDC00 && trail <= 0xDFFF) {
            state.lastIntValue = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
            return true
          }
        }
        state.pos = leadSurrogateEnd;
        state.lastIntValue = lead;
      }
      return true
    }
    if (
      switchU &&
      state.eat(0x7B /* { */) &&
      this.regexp_eatHexDigits(state) &&
      state.eat(0x7D /* } */) &&
      isValidUnicode(state.lastIntValue)
    ) {
      return true
    }
    if (switchU) {
      state.raise("Invalid unicode escape");
    }
    state.pos = start;
  }

  return false
};
function isValidUnicode(ch) {
  return ch >= 0 && ch <= 0x10FFFF
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape
pp$1.regexp_eatIdentityEscape = function(state) {
  if (state.switchU) {
    if (this.regexp_eatSyntaxCharacter(state)) {
      return true
    }
    if (state.eat(0x2F /* / */)) {
      state.lastIntValue = 0x2F; /* / */
      return true
    }
    return false
  }

  var ch = state.current();
  if (ch !== 0x63 /* c */ && (!state.switchN || ch !== 0x6B /* k */)) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
pp$1.regexp_eatDecimalEscape = function(state) {
  state.lastIntValue = 0;
  var ch = state.current();
  if (ch >= 0x31 /* 1 */ && ch <= 0x39 /* 9 */) {
    do {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
      state.advance();
    } while ((ch = state.current()) >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */)
    return true
  }
  return false
};

// Return values used by character set parsing methods, needed to
// forbid negation of sets that can match strings.
var CharSetNone = 0; // Nothing parsed
var CharSetOk = 1; // Construct parsed, cannot contain strings
var CharSetString = 2; // Construct parsed, can contain strings

// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
pp$1.regexp_eatCharacterClassEscape = function(state) {
  var ch = state.current();

  if (isCharacterClassEscape(ch)) {
    state.lastIntValue = -1;
    state.advance();
    return CharSetOk
  }

  var negate = false;
  if (
    state.switchU &&
    this.options.ecmaVersion >= 9 &&
    ((negate = ch === 0x50 /* P */) || ch === 0x70 /* p */)
  ) {
    state.lastIntValue = -1;
    state.advance();
    var result;
    if (
      state.eat(0x7B /* { */) &&
      (result = this.regexp_eatUnicodePropertyValueExpression(state)) &&
      state.eat(0x7D /* } */)
    ) {
      if (negate && result === CharSetString) { state.raise("Invalid property name"); }
      return result
    }
    state.raise("Invalid property name");
  }

  return CharSetNone
};

function isCharacterClassEscape(ch) {
  return (
    ch === 0x64 /* d */ ||
    ch === 0x44 /* D */ ||
    ch === 0x73 /* s */ ||
    ch === 0x53 /* S */ ||
    ch === 0x77 /* w */ ||
    ch === 0x57 /* W */
  )
}

// UnicodePropertyValueExpression ::
//   UnicodePropertyName `=` UnicodePropertyValue
//   LoneUnicodePropertyNameOrValue
pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
  var start = state.pos;

  // UnicodePropertyName `=` UnicodePropertyValue
  if (this.regexp_eatUnicodePropertyName(state) && state.eat(0x3D /* = */)) {
    var name = state.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(state)) {
      var value = state.lastStringValue;
      this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
      return CharSetOk
    }
  }
  state.pos = start;

  // LoneUnicodePropertyNameOrValue
  if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
    var nameOrValue = state.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue)
  }
  return CharSetNone
};

pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
  if (!hasOwn(state.unicodeProperties.nonBinary, name))
    { state.raise("Invalid property name"); }
  if (!state.unicodeProperties.nonBinary[name].test(value))
    { state.raise("Invalid property value"); }
};

pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
  if (state.unicodeProperties.binary.test(nameOrValue)) { return CharSetOk }
  if (state.switchV && state.unicodeProperties.binaryOfStrings.test(nameOrValue)) { return CharSetString }
  state.raise("Invalid property name");
};

// UnicodePropertyName ::
//   UnicodePropertyNameCharacters
pp$1.regexp_eatUnicodePropertyName = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyNameCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch);
    state.advance();
  }
  return state.lastStringValue !== ""
};

function isUnicodePropertyNameCharacter(ch) {
  return isControlLetter(ch) || ch === 0x5F /* _ */
}

// UnicodePropertyValue ::
//   UnicodePropertyValueCharacters
pp$1.regexp_eatUnicodePropertyValue = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyValueCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch);
    state.advance();
  }
  return state.lastStringValue !== ""
};
function isUnicodePropertyValueCharacter(ch) {
  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch)
}

// LoneUnicodePropertyNameOrValue ::
//   UnicodePropertyValueCharacters
pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
  return this.regexp_eatUnicodePropertyValue(state)
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
pp$1.regexp_eatCharacterClass = function(state) {
  if (state.eat(0x5B /* [ */)) {
    var negate = state.eat(0x5E /* ^ */);
    var result = this.regexp_classContents(state);
    if (!state.eat(0x5D /* ] */))
      { state.raise("Unterminated character class"); }
    if (negate && result === CharSetString)
      { state.raise("Negated character class may contain strings"); }
    return true
  }
  return false
};

// https://tc39.es/ecma262/#prod-ClassContents
// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
pp$1.regexp_classContents = function(state) {
  if (state.current() === 0x5D /* ] */) { return CharSetOk }
  if (state.switchV) { return this.regexp_classSetExpression(state) }
  this.regexp_nonEmptyClassRanges(state);
  return CharSetOk
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
pp$1.regexp_nonEmptyClassRanges = function(state) {
  while (this.regexp_eatClassAtom(state)) {
    var left = state.lastIntValue;
    if (state.eat(0x2D /* - */) && this.regexp_eatClassAtom(state)) {
      var right = state.lastIntValue;
      if (state.switchU && (left === -1 || right === -1)) {
        state.raise("Invalid character class");
      }
      if (left !== -1 && right !== -1 && left > right) {
        state.raise("Range out of order in character class");
      }
    }
  }
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
pp$1.regexp_eatClassAtom = function(state) {
  var start = state.pos;

  if (state.eat(0x5C /* \ */)) {
    if (this.regexp_eatClassEscape(state)) {
      return true
    }
    if (state.switchU) {
      // Make the same message as V8.
      var ch$1 = state.current();
      if (ch$1 === 0x63 /* c */ || isOctalDigit(ch$1)) {
        state.raise("Invalid class escape");
      }
      state.raise("Invalid escape");
    }
    state.pos = start;
  }

  var ch = state.current();
  if (ch !== 0x5D /* ] */) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }

  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassEscape
pp$1.regexp_eatClassEscape = function(state) {
  var start = state.pos;

  if (state.eat(0x62 /* b */)) {
    state.lastIntValue = 0x08; /* <BS> */
    return true
  }

  if (state.switchU && state.eat(0x2D /* - */)) {
    state.lastIntValue = 0x2D; /* - */
    return true
  }

  if (!state.switchU && state.eat(0x63 /* c */)) {
    if (this.regexp_eatClassControlLetter(state)) {
      return true
    }
    state.pos = start;
  }

  return (
    this.regexp_eatCharacterClassEscape(state) ||
    this.regexp_eatCharacterEscape(state)
  )
};

// https://tc39.es/ecma262/#prod-ClassSetExpression
// https://tc39.es/ecma262/#prod-ClassUnion
// https://tc39.es/ecma262/#prod-ClassIntersection
// https://tc39.es/ecma262/#prod-ClassSubtraction
pp$1.regexp_classSetExpression = function(state) {
  var result = CharSetOk, subResult;
  if (this.regexp_eatClassSetRange(state)) ; else if (subResult = this.regexp_eatClassSetOperand(state)) {
    if (subResult === CharSetString) { result = CharSetString; }
    // https://tc39.es/ecma262/#prod-ClassIntersection
    var start = state.pos;
    while (state.eatChars([0x26, 0x26] /* && */)) {
      if (
        state.current() !== 0x26 /* & */ &&
        (subResult = this.regexp_eatClassSetOperand(state))
      ) {
        if (subResult !== CharSetString) { result = CharSetOk; }
        continue
      }
      state.raise("Invalid character in character class");
    }
    if (start !== state.pos) { return result }
    // https://tc39.es/ecma262/#prod-ClassSubtraction
    while (state.eatChars([0x2D, 0x2D] /* -- */)) {
      if (this.regexp_eatClassSetOperand(state)) { continue }
      state.raise("Invalid character in character class");
    }
    if (start !== state.pos) { return result }
  } else {
    state.raise("Invalid character in character class");
  }
  // https://tc39.es/ecma262/#prod-ClassUnion
  for (;;) {
    if (this.regexp_eatClassSetRange(state)) { continue }
    subResult = this.regexp_eatClassSetOperand(state);
    if (!subResult) { return result }
    if (subResult === CharSetString) { result = CharSetString; }
  }
};

// https://tc39.es/ecma262/#prod-ClassSetRange
pp$1.regexp_eatClassSetRange = function(state) {
  var start = state.pos;
  if (this.regexp_eatClassSetCharacter(state)) {
    var left = state.lastIntValue;
    if (state.eat(0x2D /* - */) && this.regexp_eatClassSetCharacter(state)) {
      var right = state.lastIntValue;
      if (left !== -1 && right !== -1 && left > right) {
        state.raise("Range out of order in character class");
      }
      return true
    }
    state.pos = start;
  }
  return false
};

// https://tc39.es/ecma262/#prod-ClassSetOperand
pp$1.regexp_eatClassSetOperand = function(state) {
  if (this.regexp_eatClassSetCharacter(state)) { return CharSetOk }
  return this.regexp_eatClassStringDisjunction(state) || this.regexp_eatNestedClass(state)
};

// https://tc39.es/ecma262/#prod-NestedClass
pp$1.regexp_eatNestedClass = function(state) {
  var start = state.pos;
  if (state.eat(0x5B /* [ */)) {
    var negate = state.eat(0x5E /* ^ */);
    var result = this.regexp_classContents(state);
    if (state.eat(0x5D /* ] */)) {
      if (negate && result === CharSetString) {
        state.raise("Negated character class may contain strings");
      }
      return result
    }
    state.pos = start;
  }
  if (state.eat(0x5C /* \ */)) {
    var result$1 = this.regexp_eatCharacterClassEscape(state);
    if (result$1) {
      return result$1
    }
    state.pos = start;
  }
  return null
};

// https://tc39.es/ecma262/#prod-ClassStringDisjunction
pp$1.regexp_eatClassStringDisjunction = function(state) {
  var start = state.pos;
  if (state.eatChars([0x5C, 0x71] /* \q */)) {
    if (state.eat(0x7B /* { */)) {
      var result = this.regexp_classStringDisjunctionContents(state);
      if (state.eat(0x7D /* } */)) {
        return result
      }
    } else {
      // Make the same message as V8.
      state.raise("Invalid escape");
    }
    state.pos = start;
  }
  return null
};

// https://tc39.es/ecma262/#prod-ClassStringDisjunctionContents
pp$1.regexp_classStringDisjunctionContents = function(state) {
  var result = this.regexp_classString(state);
  while (state.eat(0x7C /* | */)) {
    if (this.regexp_classString(state) === CharSetString) { result = CharSetString; }
  }
  return result
};

// https://tc39.es/ecma262/#prod-ClassString
// https://tc39.es/ecma262/#prod-NonEmptyClassString
pp$1.regexp_classString = function(state) {
  var count = 0;
  while (this.regexp_eatClassSetCharacter(state)) { count++; }
  return count === 1 ? CharSetOk : CharSetString
};

// https://tc39.es/ecma262/#prod-ClassSetCharacter
pp$1.regexp_eatClassSetCharacter = function(state) {
  var start = state.pos;
  if (state.eat(0x5C /* \ */)) {
    if (
      this.regexp_eatCharacterEscape(state) ||
      this.regexp_eatClassSetReservedPunctuator(state)
    ) {
      return true
    }
    if (state.eat(0x62 /* b */)) {
      state.lastIntValue = 0x08; /* <BS> */
      return true
    }
    state.pos = start;
    return false
  }
  var ch = state.current();
  if (ch < 0 || ch === state.lookahead() && isClassSetReservedDoublePunctuatorCharacter(ch)) { return false }
  if (isClassSetSyntaxCharacter(ch)) { return false }
  state.advance();
  state.lastIntValue = ch;
  return true
};

// https://tc39.es/ecma262/#prod-ClassSetReservedDoublePunctuator
function isClassSetReservedDoublePunctuatorCharacter(ch) {
  return (
    ch === 0x21 /* ! */ ||
    ch >= 0x23 /* # */ && ch <= 0x26 /* & */ ||
    ch >= 0x2A /* * */ && ch <= 0x2C /* , */ ||
    ch === 0x2E /* . */ ||
    ch >= 0x3A /* : */ && ch <= 0x40 /* @ */ ||
    ch === 0x5E /* ^ */ ||
    ch === 0x60 /* ` */ ||
    ch === 0x7E /* ~ */
  )
}

// https://tc39.es/ecma262/#prod-ClassSetSyntaxCharacter
function isClassSetSyntaxCharacter(ch) {
  return (
    ch === 0x28 /* ( */ ||
    ch === 0x29 /* ) */ ||
    ch === 0x2D /* - */ ||
    ch === 0x2F /* / */ ||
    ch >= 0x5B /* [ */ && ch <= 0x5D /* ] */ ||
    ch >= 0x7B /* { */ && ch <= 0x7D /* } */
  )
}

// https://tc39.es/ecma262/#prod-ClassSetReservedPunctuator
pp$1.regexp_eatClassSetReservedPunctuator = function(state) {
  var ch = state.current();
  if (isClassSetReservedPunctuator(ch)) {
    state.lastIntValue = ch;
    state.advance();
    return true
  }
  return false
};

// https://tc39.es/ecma262/#prod-ClassSetReservedPunctuator
function isClassSetReservedPunctuator(ch) {
  return (
    ch === 0x21 /* ! */ ||
    ch === 0x23 /* # */ ||
    ch === 0x25 /* % */ ||
    ch === 0x26 /* & */ ||
    ch === 0x2C /* , */ ||
    ch === 0x2D /* - */ ||
    ch >= 0x3A /* : */ && ch <= 0x3E /* > */ ||
    ch === 0x40 /* @ */ ||
    ch === 0x60 /* ` */ ||
    ch === 0x7E /* ~ */
  )
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassControlLetter
pp$1.regexp_eatClassControlLetter = function(state) {
  var ch = state.current();
  if (isDecimalDigit(ch) || ch === 0x5F /* _ */) {
    state.lastIntValue = ch % 0x20;
    state.advance();
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
pp$1.regexp_eatHexEscapeSequence = function(state) {
  var start = state.pos;
  if (state.eat(0x78 /* x */)) {
    if (this.regexp_eatFixedHexDigits(state, 2)) {
      return true
    }
    if (state.switchU) {
      state.raise("Invalid escape");
    }
    state.pos = start;
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
pp$1.regexp_eatDecimalDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isDecimalDigit(ch = state.current())) {
    state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
    state.advance();
  }
  return state.pos !== start
};
function isDecimalDigit(ch) {
  return ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
pp$1.regexp_eatHexDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isHexDigit(ch = state.current())) {
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return state.pos !== start
};
function isHexDigit(ch) {
  return (
    (ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */) ||
    (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) ||
    (ch >= 0x61 /* a */ && ch <= 0x66 /* f */)
  )
}
function hexToInt(ch) {
  if (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) {
    return 10 + (ch - 0x41 /* A */)
  }
  if (ch >= 0x61 /* a */ && ch <= 0x66 /* f */) {
    return 10 + (ch - 0x61 /* a */)
  }
  return ch - 0x30 /* 0 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-LegacyOctalEscapeSequence
// Allows only 0-377(octal) i.e. 0-255(decimal).
pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
  if (this.regexp_eatOctalDigit(state)) {
    var n1 = state.lastIntValue;
    if (this.regexp_eatOctalDigit(state)) {
      var n2 = state.lastIntValue;
      if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
        state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
      } else {
        state.lastIntValue = n1 * 8 + n2;
      }
    } else {
      state.lastIntValue = n1;
    }
    return true
  }
  return false
};

// https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
pp$1.regexp_eatOctalDigit = function(state) {
  var ch = state.current();
  if (isOctalDigit(ch)) {
    state.lastIntValue = ch - 0x30; /* 0 */
    state.advance();
    return true
  }
  state.lastIntValue = 0;
  return false
};
function isOctalDigit(ch) {
  return ch >= 0x30 /* 0 */ && ch <= 0x37 /* 7 */
}

// https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
// And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
pp$1.regexp_eatFixedHexDigits = function(state, length) {
  var start = state.pos;
  state.lastIntValue = 0;
  for (var i = 0; i < length; ++i) {
    var ch = state.current();
    if (!isHexDigit(ch)) {
      state.pos = start;
      return false
    }
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return true
};

// Object type used to represent tokens. Note that normally, tokens
// simply exist as properties on the parser object. This is only
// used for the onToken callback and the external tokenizer.

var Token = function Token(p) {
  this.type = p.type;
  this.value = p.value;
  this.start = p.start;
  this.end = p.end;
  if (p.options.locations)
    { this.loc = new SourceLocation(p, p.startLoc, p.endLoc); }
  if (p.options.ranges)
    { this.range = [p.start, p.end]; }
};

// ## Tokenizer

var pp = Parser.prototype;

// Move to the next token

pp.next = function(ignoreEscapeSequenceInKeyword) {
  if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc)
    { this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword); }
  if (this.options.onToken)
    { this.options.onToken(new Token(this)); }

  this.lastTokEnd = this.end;
  this.lastTokStart = this.start;
  this.lastTokEndLoc = this.endLoc;
  this.lastTokStartLoc = this.startLoc;
  this.nextToken();
};

pp.getToken = function() {
  this.next();
  return new Token(this)
};

// If we're in an ES6 environment, make parsers iterable
if (typeof Symbol !== "undefined")
  { pp[Symbol.iterator] = function() {
    var this$1$1 = this;

    return {
      next: function () {
        var token = this$1$1.getToken();
        return {
          done: token.type === types$1.eof,
          value: token
        }
      }
    }
  }; }

// Toggle strict mode. Re-reads the next number or string to please
// pedantic tests (`"use strict"; 010;` should fail).

// Read a single token, updating the parser object's token-related
// properties.

pp.nextToken = function() {
  var curContext = this.curContext();
  if (!curContext || !curContext.preserveSpace) { this.skipSpace(); }

  this.start = this.pos;
  if (this.options.locations) { this.startLoc = this.curPosition(); }
  if (this.pos >= this.input.length) { return this.finishToken(types$1.eof) }

  if (curContext.override) { return curContext.override(this) }
  else { this.readToken(this.fullCharCodeAtPos()); }
};

pp.readToken = function(code) {
  // Identifier or keyword. '\uXXXX' sequences are allowed in
  // identifiers, so '\' also dispatches to that.
  if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */)
    { return this.readWord() }

  return this.getTokenFromCode(code)
};

pp.fullCharCodeAtPos = function() {
  var code = this.input.charCodeAt(this.pos);
  if (code <= 0xd7ff || code >= 0xdc00) { return code }
  var next = this.input.charCodeAt(this.pos + 1);
  return next <= 0xdbff || next >= 0xe000 ? code : (code << 10) + next - 0x35fdc00
};

pp.skipBlockComment = function() {
  var startLoc = this.options.onComment && this.curPosition();
  var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
  if (end === -1) { this.raise(this.pos - 2, "Unterminated comment"); }
  this.pos = end + 2;
  if (this.options.locations) {
    for (var nextBreak = (void 0), pos = start; (nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1;) {
      ++this.curLine;
      pos = this.lineStart = nextBreak;
    }
  }
  if (this.options.onComment)
    { this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos,
                           startLoc, this.curPosition()); }
};

pp.skipLineComment = function(startSkip) {
  var start = this.pos;
  var startLoc = this.options.onComment && this.curPosition();
  var ch = this.input.charCodeAt(this.pos += startSkip);
  while (this.pos < this.input.length && !isNewLine(ch)) {
    ch = this.input.charCodeAt(++this.pos);
  }
  if (this.options.onComment)
    { this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos,
                           startLoc, this.curPosition()); }
};

// Called at the start of the parse and after every token. Skips
// whitespace and comments, and.

pp.skipSpace = function() {
  loop: while (this.pos < this.input.length) {
    var ch = this.input.charCodeAt(this.pos);
    switch (ch) {
    case 32: case 160: // ' '
      ++this.pos;
      break
    case 13:
      if (this.input.charCodeAt(this.pos + 1) === 10) {
        ++this.pos;
      }
    case 10: case 8232: case 8233:
      ++this.pos;
      if (this.options.locations) {
        ++this.curLine;
        this.lineStart = this.pos;
      }
      break
    case 47: // '/'
      switch (this.input.charCodeAt(this.pos + 1)) {
      case 42: // '*'
        this.skipBlockComment();
        break
      case 47:
        this.skipLineComment(2);
        break
      default:
        break loop
      }
      break
    default:
      if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
        ++this.pos;
      } else {
        break loop
      }
    }
  }
};

// Called at the end of every token. Sets `end`, `val`, and
// maintains `context` and `exprAllowed`, and skips the space after
// the token, so that the next one's `start` will point at the
// right position.

pp.finishToken = function(type, val) {
  this.end = this.pos;
  if (this.options.locations) { this.endLoc = this.curPosition(); }
  var prevType = this.type;
  this.type = type;
  this.value = val;

  this.updateContext(prevType);
};

// ### Token reading

// This is the function that is called to fetch the next token. It
// is somewhat obscure, because it works in character codes rather
// than characters, and because operator parsing has been inlined
// into it.
//
// All in the name of speed.
//
pp.readToken_dot = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next >= 48 && next <= 57) { return this.readNumber(true) }
  var next2 = this.input.charCodeAt(this.pos + 2);
  if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
    this.pos += 3;
    return this.finishToken(types$1.ellipsis)
  } else {
    ++this.pos;
    return this.finishToken(types$1.dot)
  }
};

pp.readToken_slash = function() { // '/'
  var next = this.input.charCodeAt(this.pos + 1);
  if (this.exprAllowed) { ++this.pos; return this.readRegexp() }
  if (next === 61) { return this.finishOp(types$1.assign, 2) }
  return this.finishOp(types$1.slash, 1)
};

pp.readToken_mult_modulo_exp = function(code) { // '%*'
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  var tokentype = code === 42 ? types$1.star : types$1.modulo;

  // exponentiation operator ** and **=
  if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
    ++size;
    tokentype = types$1.starstar;
    next = this.input.charCodeAt(this.pos + 2);
  }

  if (next === 61) { return this.finishOp(types$1.assign, size + 1) }
  return this.finishOp(tokentype, size)
};

pp.readToken_pipe_amp = function(code) { // '|&'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) {
    if (this.options.ecmaVersion >= 12) {
      var next2 = this.input.charCodeAt(this.pos + 2);
      if (next2 === 61) { return this.finishOp(types$1.assign, 3) }
    }
    return this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2)
  }
  if (next === 61) { return this.finishOp(types$1.assign, 2) }
  return this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1)
};

pp.readToken_caret = function() { // '^'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) { return this.finishOp(types$1.assign, 2) }
  return this.finishOp(types$1.bitwiseXOR, 1)
};

pp.readToken_plus_min = function(code) { // '+-'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) {
    if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 &&
        (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
      // A `-->` line comment
      this.skipLineComment(3);
      this.skipSpace();
      return this.nextToken()
    }
    return this.finishOp(types$1.incDec, 2)
  }
  if (next === 61) { return this.finishOp(types$1.assign, 2) }
  return this.finishOp(types$1.plusMin, 1)
};

pp.readToken_lt_gt = function(code) { // '<>'
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  if (next === code) {
    size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
    if (this.input.charCodeAt(this.pos + size) === 61) { return this.finishOp(types$1.assign, size + 1) }
    return this.finishOp(types$1.bitShift, size)
  }
  if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 &&
      this.input.charCodeAt(this.pos + 3) === 45) {
    // `<!--`, an XML-style comment that should be interpreted as a line comment
    this.skipLineComment(4);
    this.skipSpace();
    return this.nextToken()
  }
  if (next === 61) { size = 2; }
  return this.finishOp(types$1.relational, size)
};

pp.readToken_eq_excl = function(code) { // '=!'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) { return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) }
  if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) { // '=>'
    this.pos += 2;
    return this.finishToken(types$1.arrow)
  }
  return this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1)
};

pp.readToken_question = function() { // '?'
  var ecmaVersion = this.options.ecmaVersion;
  if (ecmaVersion >= 11) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 46) {
      var next2 = this.input.charCodeAt(this.pos + 2);
      if (next2 < 48 || next2 > 57) { return this.finishOp(types$1.questionDot, 2) }
    }
    if (next === 63) {
      if (ecmaVersion >= 12) {
        var next2$1 = this.input.charCodeAt(this.pos + 2);
        if (next2$1 === 61) { return this.finishOp(types$1.assign, 3) }
      }
      return this.finishOp(types$1.coalesce, 2)
    }
  }
  return this.finishOp(types$1.question, 1)
};

pp.readToken_numberSign = function() { // '#'
  var ecmaVersion = this.options.ecmaVersion;
  var code = 35; // '#'
  if (ecmaVersion >= 13) {
    ++this.pos;
    code = this.fullCharCodeAtPos();
    if (isIdentifierStart(code, true) || code === 92 /* '\' */) {
      return this.finishToken(types$1.privateId, this.readWord1())
    }
  }

  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
};

pp.getTokenFromCode = function(code) {
  switch (code) {
  // The interpretation of a dot depends on whether it is followed
  // by a digit or another two dots.
  case 46: // '.'
    return this.readToken_dot()

  // Punctuation tokens.
  case 40: ++this.pos; return this.finishToken(types$1.parenL)
  case 41: ++this.pos; return this.finishToken(types$1.parenR)
  case 59: ++this.pos; return this.finishToken(types$1.semi)
  case 44: ++this.pos; return this.finishToken(types$1.comma)
  case 91: ++this.pos; return this.finishToken(types$1.bracketL)
  case 93: ++this.pos; return this.finishToken(types$1.bracketR)
  case 123: ++this.pos; return this.finishToken(types$1.braceL)
  case 125: ++this.pos; return this.finishToken(types$1.braceR)
  case 58: ++this.pos; return this.finishToken(types$1.colon)

  case 96: // '`'
    if (this.options.ecmaVersion < 6) { break }
    ++this.pos;
    return this.finishToken(types$1.backQuote)

  case 48: // '0'
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 120 || next === 88) { return this.readRadixNumber(16) } // '0x', '0X' - hex number
    if (this.options.ecmaVersion >= 6) {
      if (next === 111 || next === 79) { return this.readRadixNumber(8) } // '0o', '0O' - octal number
      if (next === 98 || next === 66) { return this.readRadixNumber(2) } // '0b', '0B' - binary number
    }

  // Anything else beginning with a digit is an integer, octal
  // number, or float.
  case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
    return this.readNumber(false)

  // Quotes produce strings.
  case 34: case 39: // '"', "'"
    return this.readString(code)

  // Operators are parsed inline in tiny state machines. '=' (61) is
  // often referred to. `finishOp` simply skips the amount of
  // characters it is given as second argument, and returns a token
  // of the type given by its first argument.
  case 47: // '/'
    return this.readToken_slash()

  case 37: case 42: // '%*'
    return this.readToken_mult_modulo_exp(code)

  case 124: case 38: // '|&'
    return this.readToken_pipe_amp(code)

  case 94: // '^'
    return this.readToken_caret()

  case 43: case 45: // '+-'
    return this.readToken_plus_min(code)

  case 60: case 62: // '<>'
    return this.readToken_lt_gt(code)

  case 61: case 33: // '=!'
    return this.readToken_eq_excl(code)

  case 63: // '?'
    return this.readToken_question()

  case 126: // '~'
    return this.finishOp(types$1.prefix, 1)

  case 35: // '#'
    return this.readToken_numberSign()
  }

  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
};

pp.finishOp = function(type, size) {
  var str = this.input.slice(this.pos, this.pos + size);
  this.pos += size;
  return this.finishToken(type, str)
};

pp.readRegexp = function() {
  var escaped, inClass, start = this.pos;
  for (;;) {
    if (this.pos >= this.input.length) { this.raise(start, "Unterminated regular expression"); }
    var ch = this.input.charAt(this.pos);
    if (lineBreak.test(ch)) { this.raise(start, "Unterminated regular expression"); }
    if (!escaped) {
      if (ch === "[") { inClass = true; }
      else if (ch === "]" && inClass) { inClass = false; }
      else if (ch === "/" && !inClass) { break }
      escaped = ch === "\\";
    } else { escaped = false; }
    ++this.pos;
  }
  var pattern = this.input.slice(start, this.pos);
  ++this.pos;
  var flagsStart = this.pos;
  var flags = this.readWord1();
  if (this.containsEsc) { this.unexpected(flagsStart); }

  // Validate pattern
  var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
  state.reset(start, pattern, flags);
  this.validateRegExpFlags(state);
  this.validateRegExpPattern(state);

  // Create Literal#value property value.
  var value = null;
  try {
    value = new RegExp(pattern, flags);
  } catch (e) {
    // ESTree requires null if it failed to instantiate RegExp object.
    // https://github.com/estree/estree/blob/a27003adf4fd7bfad44de9cef372a2eacd527b1c/es5.md#regexpliteral
  }

  return this.finishToken(types$1.regexp, {pattern: pattern, flags: flags, value: value})
};

// Read an integer in the given radix. Return null if zero digits
// were read, the integer value otherwise. When `len` is given, this
// will return `null` unless the integer has exactly `len` digits.

pp.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
  // `len` is used for character escape sequences. In that case, disallow separators.
  var allowSeparators = this.options.ecmaVersion >= 12 && len === undefined;

  // `maybeLegacyOctalNumericLiteral` is true if it doesn't have prefix (0x,0o,0b)
  // and isn't fraction part nor exponent part. In that case, if the first digit
  // is zero then disallow separators.
  var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;

  var start = this.pos, total = 0, lastCode = 0;
  for (var i = 0, e = len == null ? Infinity : len; i < e; ++i, ++this.pos) {
    var code = this.input.charCodeAt(this.pos), val = (void 0);

    if (allowSeparators && code === 95) {
      if (isLegacyOctalNumericLiteral) { this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"); }
      if (lastCode === 95) { this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"); }
      if (i === 0) { this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"); }
      lastCode = code;
      continue
    }

    if (code >= 97) { val = code - 97 + 10; } // a
    else if (code >= 65) { val = code - 65 + 10; } // A
    else if (code >= 48 && code <= 57) { val = code - 48; } // 0-9
    else { val = Infinity; }
    if (val >= radix) { break }
    lastCode = code;
    total = total * radix + val;
  }

  if (allowSeparators && lastCode === 95) { this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"); }
  if (this.pos === start || len != null && this.pos - start !== len) { return null }

  return total
};

function stringToNumber(str, isLegacyOctalNumericLiteral) {
  if (isLegacyOctalNumericLiteral) {
    return parseInt(str, 8)
  }

  // `parseFloat(value)` stops parsing at the first numeric separator then returns a wrong value.
  return parseFloat(str.replace(/_/g, ""))
}

function stringToBigInt(str) {
  if (typeof BigInt !== "function") {
    return null
  }

  // `BigInt(value)` throws syntax error if the string contains numeric separators.
  return BigInt(str.replace(/_/g, ""))
}

pp.readRadixNumber = function(radix) {
  var start = this.pos;
  this.pos += 2; // 0x
  var val = this.readInt(radix);
  if (val == null) { this.raise(this.start + 2, "Expected number in radix " + radix); }
  if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
    val = stringToBigInt(this.input.slice(start, this.pos));
    ++this.pos;
  } else if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }
  return this.finishToken(types$1.num, val)
};

// Read an integer, octal integer, or floating-point number.

pp.readNumber = function(startsWithDot) {
  var start = this.pos;
  if (!startsWithDot && this.readInt(10, undefined, true) === null) { this.raise(start, "Invalid number"); }
  var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
  if (octal && this.strict) { this.raise(start, "Invalid number"); }
  var next = this.input.charCodeAt(this.pos);
  if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
    var val$1 = stringToBigInt(this.input.slice(start, this.pos));
    ++this.pos;
    if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }
    return this.finishToken(types$1.num, val$1)
  }
  if (octal && /[89]/.test(this.input.slice(start, this.pos))) { octal = false; }
  if (next === 46 && !octal) { // '.'
    ++this.pos;
    this.readInt(10);
    next = this.input.charCodeAt(this.pos);
  }
  if ((next === 69 || next === 101) && !octal) { // 'eE'
    next = this.input.charCodeAt(++this.pos);
    if (next === 43 || next === 45) { ++this.pos; } // '+-'
    if (this.readInt(10) === null) { this.raise(start, "Invalid number"); }
  }
  if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }

  var val = stringToNumber(this.input.slice(start, this.pos), octal);
  return this.finishToken(types$1.num, val)
};

// Read a string value, interpreting backslash-escapes.

pp.readCodePoint = function() {
  var ch = this.input.charCodeAt(this.pos), code;

  if (ch === 123) { // '{'
    if (this.options.ecmaVersion < 6) { this.unexpected(); }
    var codePos = ++this.pos;
    code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
    ++this.pos;
    if (code > 0x10FFFF) { this.invalidStringToken(codePos, "Code point out of bounds"); }
  } else {
    code = this.readHexChar(4);
  }
  return code
};

pp.readString = function(quote) {
  var out = "", chunkStart = ++this.pos;
  for (;;) {
    if (this.pos >= this.input.length) { this.raise(this.start, "Unterminated string constant"); }
    var ch = this.input.charCodeAt(this.pos);
    if (ch === quote) { break }
    if (ch === 92) { // '\'
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(false);
      chunkStart = this.pos;
    } else if (ch === 0x2028 || ch === 0x2029) {
      if (this.options.ecmaVersion < 10) { this.raise(this.start, "Unterminated string constant"); }
      ++this.pos;
      if (this.options.locations) {
        this.curLine++;
        this.lineStart = this.pos;
      }
    } else {
      if (isNewLine(ch)) { this.raise(this.start, "Unterminated string constant"); }
      ++this.pos;
    }
  }
  out += this.input.slice(chunkStart, this.pos++);
  return this.finishToken(types$1.string, out)
};

// Reads template string tokens.

var INVALID_TEMPLATE_ESCAPE_ERROR = {};

pp.tryReadTemplateToken = function() {
  this.inTemplateElement = true;
  try {
    this.readTmplToken();
  } catch (err) {
    if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
      this.readInvalidTemplateToken();
    } else {
      throw err
    }
  }

  this.inTemplateElement = false;
};

pp.invalidStringToken = function(position, message) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
    throw INVALID_TEMPLATE_ESCAPE_ERROR
  } else {
    this.raise(position, message);
  }
};

pp.readTmplToken = function() {
  var out = "", chunkStart = this.pos;
  for (;;) {
    if (this.pos >= this.input.length) { this.raise(this.start, "Unterminated template"); }
    var ch = this.input.charCodeAt(this.pos);
    if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) { // '`', '${'
      if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate)) {
        if (ch === 36) {
          this.pos += 2;
          return this.finishToken(types$1.dollarBraceL)
        } else {
          ++this.pos;
          return this.finishToken(types$1.backQuote)
        }
      }
      out += this.input.slice(chunkStart, this.pos);
      return this.finishToken(types$1.template, out)
    }
    if (ch === 92) { // '\'
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(true);
      chunkStart = this.pos;
    } else if (isNewLine(ch)) {
      out += this.input.slice(chunkStart, this.pos);
      ++this.pos;
      switch (ch) {
      case 13:
        if (this.input.charCodeAt(this.pos) === 10) { ++this.pos; }
      case 10:
        out += "\n";
        break
      default:
        out += String.fromCharCode(ch);
        break
      }
      if (this.options.locations) {
        ++this.curLine;
        this.lineStart = this.pos;
      }
      chunkStart = this.pos;
    } else {
      ++this.pos;
    }
  }
};

// Reads a template token to search for the end, without validating any escape sequences
pp.readInvalidTemplateToken = function() {
  for (; this.pos < this.input.length; this.pos++) {
    switch (this.input[this.pos]) {
    case "\\":
      ++this.pos;
      break

    case "$":
      if (this.input[this.pos + 1] !== "{") { break }
      // fall through
    case "`":
      return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos))

    case "\r":
      if (this.input[this.pos + 1] === "\n") { ++this.pos; }
      // fall through
    case "\n": case "\u2028": case "\u2029":
      ++this.curLine;
      this.lineStart = this.pos + 1;
      break
    }
  }
  this.raise(this.start, "Unterminated template");
};

// Used to read escaped characters

pp.readEscapedChar = function(inTemplate) {
  var ch = this.input.charCodeAt(++this.pos);
  ++this.pos;
  switch (ch) {
  case 110: return "\n" // 'n' -> '\n'
  case 114: return "\r" // 'r' -> '\r'
  case 120: return String.fromCharCode(this.readHexChar(2)) // 'x'
  case 117: return codePointToString(this.readCodePoint()) // 'u'
  case 116: return "\t" // 't' -> '\t'
  case 98: return "\b" // 'b' -> '\b'
  case 118: return "\u000b" // 'v' -> '\u000b'
  case 102: return "\f" // 'f' -> '\f'
  case 13: if (this.input.charCodeAt(this.pos) === 10) { ++this.pos; } // '\r\n'
  case 10: // ' \n'
    if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
    return ""
  case 56:
  case 57:
    if (this.strict) {
      this.invalidStringToken(
        this.pos - 1,
        "Invalid escape sequence"
      );
    }
    if (inTemplate) {
      var codePos = this.pos - 1;

      this.invalidStringToken(
        codePos,
        "Invalid escape sequence in template string"
      );
    }
  default:
    if (ch >= 48 && ch <= 55) {
      var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
      var octal = parseInt(octalStr, 8);
      if (octal > 255) {
        octalStr = octalStr.slice(0, -1);
        octal = parseInt(octalStr, 8);
      }
      this.pos += octalStr.length - 1;
      ch = this.input.charCodeAt(this.pos);
      if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
        this.invalidStringToken(
          this.pos - 1 - octalStr.length,
          inTemplate
            ? "Octal literal in template string"
            : "Octal literal in strict mode"
        );
      }
      return String.fromCharCode(octal)
    }
    if (isNewLine(ch)) {
      // Unicode new line characters after \ get removed from output in both
      // template literals and strings
      if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
      return ""
    }
    return String.fromCharCode(ch)
  }
};

// Used to read character escape sequences ('\x', '\u', '\U').

pp.readHexChar = function(len) {
  var codePos = this.pos;
  var n = this.readInt(16, len);
  if (n === null) { this.invalidStringToken(codePos, "Bad character escape sequence"); }
  return n
};

// Read an identifier, and return it as a string. Sets `this.containsEsc`
// to whether the word contained a '\u' escape.
//
// Incrementally adds only escaped chars, adding other chunks as-is
// as a micro-optimization.

pp.readWord1 = function() {
  this.containsEsc = false;
  var word = "", first = true, chunkStart = this.pos;
  var astral = this.options.ecmaVersion >= 6;
  while (this.pos < this.input.length) {
    var ch = this.fullCharCodeAtPos();
    if (isIdentifierChar(ch, astral)) {
      this.pos += ch <= 0xffff ? 1 : 2;
    } else if (ch === 92) { // "\"
      this.containsEsc = true;
      word += this.input.slice(chunkStart, this.pos);
      var escStart = this.pos;
      if (this.input.charCodeAt(++this.pos) !== 117) // "u"
        { this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"); }
      ++this.pos;
      var esc = this.readCodePoint();
      if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral))
        { this.invalidStringToken(escStart, "Invalid Unicode escape"); }
      word += codePointToString(esc);
      chunkStart = this.pos;
    } else {
      break
    }
    first = false;
  }
  return word + this.input.slice(chunkStart, this.pos)
};

// Read an identifier or keyword token. Will check for reserved
// words when necessary.

pp.readWord = function() {
  var word = this.readWord1();
  var type = types$1.name;
  if (this.keywords.test(word)) {
    type = keywords[word];
  }
  return this.finishToken(type, word)
};

// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
// various contributors and released under an MIT license.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/acornjs/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/acornjs/acorn/issues
//
// [walk]: util/walk.js


var version = "8.12.1";

Parser.acorn = {
  Parser: Parser,
  version: version,
  defaultOptions: defaultOptions,
  Position: Position,
  SourceLocation: SourceLocation,
  getLineInfo: getLineInfo,
  Node: Node,
  TokenType: TokenType,
  tokTypes: types$1,
  keywordTypes: keywords,
  TokContext: TokContext,
  tokContexts: types,
  isIdentifierChar: isIdentifierChar,
  isIdentifierStart: isIdentifierStart,
  Token: Token,
  isNewLine: isNewLine,
  lineBreak: lineBreak,
  lineBreakG: lineBreakG,
  nonASCIIwhitespace: nonASCIIwhitespace
};

// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and returns
// an abstract syntax tree as specified by the [ESTree spec][estree].
//
// [estree]: https://github.com/estree/estree

function parse(input, options) {
  return Parser.parse(input, options)
}

// This function tries to parse a single expression at a given
// offset in a string. Useful for parsing mixed-language formats
// that embed JavaScript expressions.

function parseExpressionAt(input, pos, options) {
  return Parser.parseExpressionAt(input, pos, options)
}

// Acorn is organized as a tokenizer and a recursive-descent parser.
// The `tokenizer` export provides an interface to the tokenizer.

function tokenizer(input, options) {
  return Parser.tokenizer(input, options)
}



;// CONCATENATED MODULE: ./src/utils/mediator/transformers/MeshTransformers.js
const renderOrderTransformer = function ( target, targetProperty, value ) {

	/**
	 * Propagate the render order to each child
	 */
	target.traverse( ( child ) => {

		child.renderOrder = value;

	} );

}

const MeshTransformers_layer = function ( target, targetProperty, value ) {

	/**
	 * Propagate the layer to each child
	 */
	target.parent.traverse( ( child ) => {

		child.layers.set( value );

	} );

}

;// CONCATENATED MODULE: ./src/core/properties/BooleanProperty.js


class BooleanProperty extends BaseProperty {

	/**
	 *
	 * @param {string} propertyId
	 * @param {any} [value=null]
	 */
	constructor( propertyId, value = true ) {

		super( propertyId, value, true );

		/**
		 * @override
		 * @type {boolean}
		 * @private
		 */
		this._value = value;

		this.output = this._outputValue;

	}

	/**
	 *
	 * @param {boolean} value
	 */
	set value( value ) {

		this._value = value;

		this._needsUpdate = true;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/elements/MeshUIBaseElement.js


















































//JSDoc related imports
/* eslint-disable no-unused-vars */






/* eslint-enable no-unused-vars */

class MeshUIBaseElement extends external_three_namespaceObject.Object3D {

	/**
	 *
	 * @param {Properties} properties
	 * @param {Options} values
	 */
	constructor( properties, values) {

		super();

		Object.defineProperties( this, {
				isUI: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

		/**
		 *
		 * @type {Mesh|null}
		 * @internal
		 */
		this._backgroundMesh = null;



		/**
		 *
		 * @type {Material}
		 * @internal
		 */
		this._backgroundMaterial = null;

		/**
		 *
		 * @type {Material}
		 * @protected
		 */
		this._backgroundCustomDepthMaterial = null;

		/**
		 *
		 * @type {Object.<{m:string, t?:(target:any, targetProperty:string, value:any) => void}>}
		 * @protected
		 */
		this._backgroundMaterialMediation = {};

		/**
		 *
		 * @type {Object.<{m:string, t?:(value:any) => any}>}
		 * @private
		 */
		this._backgroundMeshMediation = {
			backgroundCastShadow: { m: 'castShadow' },
			backgroundReceiveShadow: { m: 'receiveShadow' },
			renderOrder: {m: 'renderOrder', t: renderOrderTransformer }
		};


		this._fog = new InheritableBooleanProperty("fog");

		/**
		 *
		 * @type {Mesh|null}
		 * @internal
		 */
		this._fontMesh = null;

		/**
		 *
		 * @type {InheritableMaterialProperty}
		 * @internal
		 */
		this._fontMaterial = new InheritableMaterialProperty('fontMaterial');

		/**
		 *
		 * @type {InheritableMaterialProperty}
		 * @private
		 */
		this._fontCustomDepthMaterial = new InheritableMaterialProperty('fontCustomDepthMaterial');

		/**
		 *
		 * @type {Object.<{m:string, t?:(value:any) => any}>}
		 * @private
		 */
		this._fontMeshMediation = {
			fontMaterial: { m: 'material' },
			fontCustomDepthMaterial: { m : 'customDepthMaterial', t:directTransferNotNull},
			fontCastShadow: { m: 'castShadow' },
			fontReceiveShadow: { m: 'receiveShadow' },
			renderOrder: {m: 'renderOrder' }
		};

		// Children lists

		/**
		 *
		 * @type {EmptyProperty|ChildrenBox|ChildrenText}
		 * @internal
		 */
		this._children = properties.children ? new properties.children : new EmptyProperty("children");
		this._parent = new ParentProperty();

		// update parentUI when this component will be added or removed
		this.addEventListener( 'added', this._rebuildParentUI );
		this.addEventListener( 'removed', this._rebuildParentUI );

		//material properties
		this._backgroundSide = new SideProperty( 'backgroundSide' );
		this._fontSide = new SideProperty( 'fontSide' );
		this._backgroundAlphaTest = new NumberProperty( 'backgroundAlphaTest', 0.02 );
		this._fontAlphaTest = new NumberProperty( 'fontAlphaTest', 0.02 );

		// mesh properties
		this._visible = new VisibleProperty( 'visible', true );

		this._backgroundCastShadow = new InheritableBooleanProperty( 'backgroundCastShadow' );
		this._fontCastShadow = new InheritableBooleanProperty( 'fontCastShadow' );
		this._backgroundReceiveShadow = new InheritableBooleanProperty( 'backgroundReceiveShadow' );
		this._fontReceiveShadow = new InheritableBooleanProperty( 'fontReceiveShadow' );

		// @TODO: RenderOrder for background and fonts
		this._renderOrder = new RenderOrderProperty();

		// @TODO : background & Text
		this._segments = properties.segments ? new properties.segments() : new SegmentsProperty();


		/**
		 *
		 * @type {BoundsBox|BoundsText|EmptyProperty}
		 * @ignore
		 * @internal
		 */
		this._bounds = properties.bounds ? new properties.bounds() : new EmptyProperty("bounds");

		// styles ---;

		this._order = new OrderProperty();

		this._padding = new PaddingProperty();
		this._margin = new MarginProperty();


		this._position = new PositionProperty();

		/**
		 *
		 * @type {FlexDirectionProperty}
		 * @internal
		 */
		this._flexDirection = properties.flexDirection ? new properties.flexDirection() : new FlexDirectionProperty();

		this._justifyContent = properties.justifyContent ? new properties.justifyContent() : new JustifyContentProperty();

		this._alignItems = properties.alignItems ? new properties.alignItems() : new AlignItemsProperty();

		this._display = new Display( 'flex' );

		this._boxSizing = new BoxSizing( 'border-box' );
		this._width = new WidthProperty();
		this._height = new HeightProperty();

		this._backgroundColor = properties.backgroundColor ? new properties.backgroundColor() : new BackgroundColorProperty();
		this._backgroundOpacity = new StyleFactorProperty('backgroundOpacity', 0.5 );
		this._backgroundImage = new BackgroundImage();
		this._backgroundSize = new BackgroundSize( 'cover' );

		this._color = properties.color ? new properties.color() : new StyleColorProperty('color', 'inherit');
		this._fontOpacity = new StyleFactorProperty( 'fontOpacity', 'inherit');

		this._whiteSpace = properties.whiteSpace ? new properties.whiteSpace() : new WhiteSpaceProperty();

		this._fontFamily = properties.fontFamily ? new properties.fontFamily() : new FontFamilyProperty();
		this._fontStyle = properties.fontStyle ? new properties.fontStyle() : new FontStyleProperty( 'normal' );
		this._fontWeight = properties.fontWeight ? new properties.fontWeight() : new FontWeightProperty();
		this._fontSize = properties.fontSize ? new properties.fontSize() : new FontSizeProperty();

		this._lineHeight = properties.lineHeight ? new properties.lineHeight() : new LineHeightProperty();

		this._fontKerning = properties.fontKerning ? new properties.fontKerning() : new FontKerningProperty();
		this._letterSpacing = properties.letterSpacing ? new properties.letterSpacing() : new LetterSpacingProperty();

		this._overflow = new Overflow( 'visible' );

		this._borderRadius = new BorderRadius( 0 );
		this._borderWidth = new BorderWidth( 0 );
		this._borderColor = new StyleColorProperty( 'borderColor', 0xff00ff );
		this._borderOpacity = new StyleFactorProperty( 'borderOpacity', 1);

		// styles ---;

		this._font = new FontProperty();

		this._lineBreak = properties.lineBreak ? new properties.lineBreak() : new EmptyProperty("lineBreak");

		/**
		 *
		 * @type {TextContentDefault|TextContentText|TextContentInline}
		 * @internal
		 */
		this._textContent = properties.textContent ? new properties.textContent() : new TextContentDefault();

		/**
		 *
		 * @type {GlyphsProperty}
		 * @internal
		 */
		this._glyphs = properties.glyphs ? new properties.glyphs() : new EmptyProperty("glyphs");

		this._inlines = properties.inlines ? new properties.inlines() : new EmptyProperty("inlines");


		/**
		 *
		 * @type {BoxLayouter|TextLayouter|EmptyProperty}
		 * @internal
		 */
		this._layouter = properties.layouter ? new properties.layouter() : new EmptyProperty("layouter");

		this._inlineJustificator = new InlineJustificator();

		this._textAlign = properties.textAlign ? new properties.textAlign() : new TextAlignProperty();

		this._autoSize = properties.autoSize ? new properties.autoSize() : new EmptyProperty("autoSize");

		this._renderer = properties.renderer ? new properties.renderer() : new EmptyProperty("renderer");

		this._offset = new OffsetProperty();

		// adds
		this._invertAlpha = new InvertAlphaProperty();
		this._fontSmooth = properties.fontSmooth ? new properties.fontSmooth() : new FontSmoothProperty();

		/**
		 *
		 * @type {Array.<BaseProperty>}
		 * @internal
		 */
		this._components = [

			this._textContent,
			this._children,
			this._parent,


			this._autoSize,


			this._fog,

			this._fontFamily,
			this._fontStyle,
			this._fontWeight,
			this._font,

			this._whiteSpace,


			this._glyphs,

			this._inlines,

			this._visible,

			// Meshes interfaces
			this._backgroundSide,
			this._fontSide,
			this._backgroundAlphaTest,
			this._fontAlphaTest,
			this._backgroundCastShadow,
			this._fontCastShadow,
			this._backgroundReceiveShadow,
			this._fontReceiveShadow,
			this._renderOrder,
			this._segments,
			// styles ---;

			this._padding,
			this._margin,
			this._width,
			this._height,
			this._borderWidth,
			this._boxSizing,

			this._bounds,

			this._position,


			this._flexDirection,
			this._justifyContent,
			this._alignItems,
			this._order,


			this._display,
			this._backgroundColor,
			this._backgroundOpacity,
			this._backgroundImage,
			this._backgroundSize,
			this._fontOpacity,
			this._color,


			// font : update order : WhiteSpace > Glyph > Inlines > Kerning > newlineBreakability > LineBreak > FontSize
			// font : process order : ??
			// this._font,

			this._fontSize,
			this._lineHeight,
			this._fontKerning,
			this._letterSpacing,

			this._borderRadius,
			this._borderColor,
			this._borderOpacity,

			// this._styles,
			// styles ---;
			this._lineBreak,
			this._offset,
			this._layouter,

			this._inlineJustificator,
			this._textAlign,


			// !! this._renderer renderer MUST NOT BE in components !!

			this._invertAlpha,
			this._fontSmooth,

			this._fontMaterial,
			this._fontCustomDepthMaterial,
			this._overflow,
			this._renderer,

		]


		/**
		 *
		 * @type {*[]}
		 * @private
		 */
		this._onAfterUpdates = [];


		// breaks inheritance chains
		// if( !values ) values = {};
		if( !values.backgroundSide ) values.backgroundSide = 0; // FrontSide


		if( values ) this.set( values );

	}


	///////////////
	///  UPDATE
	///////////////

	update( ) {


		// console.log( "Update Element", this.name , this.constructor.name );

		const out = {};
		for ( const component of this._components ) {

			if( component._needsUpdate ) {

				// console.log( '    ', component.id )
				component.update( this, out );
				component._needsUpdate = false;

			}

		}

		this._transferToBackgroundMesh( out );
		this._transferToFontMesh( out );

		this._transferToBackgroundMaterial( out );
		this._transferToFontMaterial( out );


		// update children
		for ( const child of this._children._uis ) {
			child.update();
		}

	}

	process() {

		// process first time : Natural size
		for ( const child of this._children._uis ) {
			child.process();
		}


		// console.log( 'Process ', this.name );
		for ( const component of this._components ) {

			if( component._needsProcess ) {

				// console.log( '    ', component.id );
				component.process( this );
				component._needsProcess = false;

			}

		}

	}

	render() {

		// console.log( 'render ', this.name );
		for ( let i = 0; i < this._components.length; i++ ) {
			const component = this._components[ i ];
			if( component._needsRender ) {
				// console.log( '    ', component.id);
				component.render( this );
				component._needsRender = false;
			}
		}

		// render all children
		for ( const child of this._children._uis ) {
			child.render();
		}

	}


	/**
	 *
	 * @param {Options} options
	 */
	set( options ) {

		// Retro compatibility, when not recommended way
		// 2. < v7.x.x way
		if( options.fontTexture ) {

			if( options.fontFamily ) {

				// Set from old way, check if that family is already registered
				const fontName = options.fontFamily.pages ? options.fontFamily.info.face : options.fontFamily;

				let fontFamily = font_FontLibrary.getFontFamily( fontName );

				if ( !fontFamily ) {

					const fontStyle = options.fontStyle ? options.fontStyle : 'normal';
					const fontWeight = options.fontWeight ? options.fontWeight : '400';

					fontFamily = font_FontLibrary.addFontFamily( fontName )
						.addVariant( fontWeight, fontStyle, options.fontFamily, options.fontTexture );

				}

				options['fontFamily'] = fontFamily;

				delete options['fontTexture'];

			}

		}



		for ( let prop of Object.keys( options ) ) {

			const value = options[prop];

			// 1. replace deprecated properties
			switch ( prop ){
				case 'contentDirection':
					console.warn('ThreeMeshUI v7xx: property `contentDirection` is deprecated and has been renamed as `flexDirection`');
					prop = 'flexDirection';
					break;

				case 'interLine':
					console.warn('ThreeMeshUI v7xx: property `interLine` is deprecated and has been renamed as `lineHeight`');
					prop = 'lineHeight';
					break;

				case 'content':
					console.warn( 'ThreeMeshUI v7xx: property `content` is deprecated and has been renamed as `textContent`');
					prop = 'textContent';
					break;

				case 'fontColor':
					console.warn( 'ThreeMeshUI v7xx: property `fontColor` is deprecated and has been renamed as `color`');
					prop = 'color';
					break;

				case 'hiddenOverflow':
					console.warn( 'ThreeMeshUI v7xx: property `hiddenOverflow` is deprecated and has been renamed as `overflow`');
					prop = 'overflow';
					break;

				case 'backgroundTexture':
					console.warn( 'ThreeMeshUI v7xx: property `backgroundTexture` is deprecated and has been renamed as `backgroundImage`');
					prop = 'backgroundImage';
					break;

				case 'alignContent':
					console.warn( 'ThreeMeshUI v7xx: property `alignContent` is deprecated and has been renamed as `alignItems`');
					prop = 'alignItems';
					break;

				case "borderTopColor":
				case "borderBottomColor":
				case "borderLeftColor":
				case "borderRightColor":
					prop = 'borderColor';
					break;
			}

				switch ( prop ) {

				// properties

				// As textContent property might alter the hierarchy, do not wait until update
				case 'textContent' :
					this.textContent = value;
					break;

					case 'fontSmooth':
					case 'renderOrder':
					case 'segments' :
					case 'visible' :
					case 'offset':
						this[`_${prop}`].value = value;
						break;

					// styles properties
					case 'flexDirection' :
					case 'justifyContent' :
					case 'alignItems' :
					case 'color' :
					case 'fontFamily' :
					case 'fontOpacity' :
					case 'fontKerning' :
					case 'fontSize' :
					case 'fontStyle' :
					case 'fontWeight' :
					case 'textAlign' :
					case 'letterSpacing' :
					case 'lineHeight' :
					case 'whiteSpace':
					case 'breakOn': // Not valid anymore?
					case 'width' :
					case 'height' :
					case 'padding':
					case 'margin' :
					case 'backgroundColor' :
					case 'backgroundOpacity' :
					case 'backgroundImage' :
					case 'backgroundSize' :
					case 'borderColor' :
					case 'borderOpacity' :
					case 'borderRadius' :
					case 'borderWidth':
					case 'overflow' :
					case 'order':
					case 'boxSizing':
						if( this[`_${prop}`] ){
							this[`_${prop}`].inline = value;
						}
						break;

					case 'paddingTop':
						this._padding.top = value;
						break;
					case 'paddingRight':
						this._padding.right = value;
						break;
					case 'paddingBottom':
						this._padding.bottom = value;
						break;
					case 'paddingLeft':
						this._padding.left = value;
						break;

					case 'marginTop':
						this._margin.top = value;
						break;
					case 'marginRight':
						this._margin.right = value;
						break;
					case 'marginBottom':
						this._margin.bottom = value;
						break;
					case 'marginLeft':
						this._margin.left = value;
						break;

					case 'borderTopWidth':
						this._borderWidth.top = value;
						break;
					case 'borderRightWidth':
						this._borderWidth.right = value;
						break;
					case 'borderBottomWidth':
						this._borderWidth.bottom = value;
						break;
					case 'borderLeftWidth':
						this._borderWidth.left = value;
						break;

					case 'borderTopLeftRadius':
						this._borderRadius.topLeft = value;
						break;
					case 'borderTopRightRadius':
						this._borderRadius.topRight = value;
						break;
					case 'borderBottomRightRadius':
						this._borderRadius.bottomRight = value;
						break;
					case 'borderBottomLeftRadius':
						this._borderRadius.bottomLeft = value;
						break;


					// Back & Front linked properties
					case 'side':
					case 'castShadow':
					case 'receiveShadow':
						const upperCamelCaseProperty = prop.charAt(0).toUpperCase()+prop.substr(1);
						this[`_background${upperCamelCaseProperty}`].value = value;
						this[`_font${upperCamelCaseProperty}`].value = value;
						break;


						// Meshes & material properties
					case 'fontSide':
					case 'backgroundSide':
					case 'fontCastShadow':
					case 'backgroundCastShadow':
					case 'fontReceiveShadow':
					case 'backgroundReceiveShadow':
					case 'fontMaterial':
					case 'fontCustomDepthMaterial':
						this[`_${prop}`].value = value;
						break;


					default:

						if( this[`_${prop}`] !== undefined ) {
							this[`_${prop}`].value = value;
						} else {
							this[ prop ] = value
						}
				}

		}

	}

	get ( property ) {

		switch ( property ) {

			case 'overflow':
			case 'width' :
			case 'height' :
				return this[`_${property}`].inline;
		}

	}

	/**
	 * Filters children in order to compute only one times children lists
	 * @private
	 */
	_rebuildChildrenLists() {

		//console.log( this.name, 'child added' );
		this._children._needsUpdate = true;

	}

	/**
	 * Try to retrieve parentUI after each structural change
	 * @protected
	 */
	_rebuildParentUI = () => {

		this._parent._needsUpdate = true;

		// set elements as root
		if ( this.parent && !this.parent.isUI ) {

			UpdateManager.register( this );
			this.activatePseudoState('root');

		} else {

			UpdateManager.remove( this );
			this.deactivatePseudoState('root');
		}


	};

	/**
	 * When the user calls component.add, it registers for updates,
	 * then call THREE.Object3D.add.
	 */

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) {

		let addedUIChildren = false;
		for ( let i = 0; i < arguments.length; i++ ) {

			super.add( arguments[ i ] );

			if( arguments[i].isUI ) {
				addedUIChildren = true;
			}

		}

		if( addedUIChildren ) this._rebuildChildrenLists();

		return this;

	}


	/**
	 * When the user calls component.remove, it registers for updates,
	 * then call THREE.Object3D.remove.
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	remove( object ) {

		for ( const id of Object.keys( arguments ) ) {

			// An inline component relies on its parent for positioning
			if ( arguments[ id ].isInline ) this.update( null, true );

		}

		super.remove( ...arguments );

		this._rebuildChildrenLists();

		return this;

	}

	/**
	 *
	 * @return {Object3D}
	 */
	clear() {

		this.removeFromParent();

		this.traverse( ( obj ) => {

			if ( obj.material ) obj.material.dispose();
			if ( obj.geometry ) obj.geometry.dispose();

		} );

		super.clear();

		// remove properties
		this._backgroundMesh = null;
		this._backgroundMaterial = null;
		this._backgroundMaterialMediation = null;
		this._backgroundMeshMediation = null;

		this._children.dispose();
		this._children = null;

		this._parent.dispose();
		this._parent = null;

		this._backgroundSide = null;
		this._backgroundAlphaTest = null;
		this._visible = null;
		this._backgroundCastShadow = null;
		this._backgroundReceiveShadow = null;
		this._renderOrder = null;
		this._segments = null;
		this._bounds = null;

		// styles properties
		this._boxSizing = null;
		this._padding = null;
		this._margin = null;
		this._position = null;
		this._flexDirection = null;
		this._justifyContent = null;
		this._alignItems = null;
		this._display = null;
		this._backgroundColor = null;
		this._backgroundOpacity = null;
		this._backgroundSize = null;
		this._fontOpacity = null;
		this._color = null;
		this._whiteSpace = null;
		this._fontFamily = null;
		this._fontStyle = null;
		this._fontWeight = null;
		this._lineHeight = null;
		this._fontKerning = null;
		this._letterSpacing = null;
		this._overflow = null;
		this._textAlign = null;

		this._font = null;
		this._lineBreak = null;
		this._layouter = null;

		return this;
	}

	/**
	 *
	 * @return {string}
	 */
	get textContent() {

		this._textContent.process( this );

		return this._textContent._value;

	}

	/***********************************************************************************************************************
	 * TO MATERIAL HOLDER
	 **********************************************************************************************************************/

	/**
	 *
	 * @returns {Material|ShaderMaterial}
	 */
	get backgroundMaterial() { return this._backgroundMaterial; }

	/**
	 *
	 * @param {Material|ShaderMaterial} material
	 */
	set backgroundMaterial( material ) {

		this._backgroundMaterial = material;

		// Update the fontMaterialProperties that need to be transferred to
		this._backgroundMaterialMediation = { ...material.constructor.mediation };

		// transfer all the properties to material
		this._transferToBackgroundMaterial();

		if ( this._backgroundMesh ) {

			this._backgroundMesh.material = this._backgroundMaterial;
			uniformOrUserDataTransformer( material, 'frameSize', this._backgroundMesh.scale );

		}

	}

	/**
	 *
	 * @param {Material|null} material
	 */
	set backgroundCustomDepthMaterial( material ) {

		this._backgroundCustomDepthMaterial = material;

		this._transferToBackgroundMaterial();

		if ( this._backgroundMesh ) {
			// transfer to the main if isset
			this._backgroundMesh.customDepthMaterial = this._backgroundCustomDepthMaterial;

		}

	}

	/**
	 *
	 * @returns {Material|null}
	 */
	get backgroundCustomDepthMaterial() { return this._backgroundCustomDepthMaterial; }

	/**
	 * According to the list of materialProperties
	 * some properties are sent to material
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToBackgroundMaterial( options = null ) {

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}

		}

		Mediator.mediate( this, this._backgroundMaterial, options, this._backgroundMaterialMediation, this._backgroundCustomDepthMaterial );

	}

	/**
	 *
	 * @param {number} value
	 */
	set backgroundSide( value ) {

		this._backgroundSide.value = value;

		if ( this._backgroundMaterial ) this._backgroundMaterial.side = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get backgroundSide() { return this._backgroundSide.value; }

	/**
	 *
	 * @param {number} value
	 */
	set backgroundAlphaTest ( value ) {

		this._backgroundAlphaTest.value = value;

		if( this._backgroundMaterial ) this._backgroundMaterial.alphaTest = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get backgroundAlphaTest () { return this._backgroundAlphaTest.value; }

	/** Font Material ----------------------------------------------------------*/

	/**
	 *
	 * @returns {Material|ShaderMaterial}
	 */
	// get fontMaterial() { return this._fontMaterial__; }
	get fontMaterial() { return this._fontMaterial.value; }

	/**
	 *
	 * @param {Material|ShaderMaterial} material
	 */
	set fontMaterial( material ) {

		this._fontMaterial.value = material;

	}

	/**
	 *
	 * @param {Material|null} material
	 */
	set fontCustomDepthMaterial( material ) {

		this._fontCustomDepthMaterial.value = material;

	}

	/**
	 *
	 * @returns {Material|null}
	 */
	get fontCustomDepthMaterial() { return this._fontCustomDepthMaterial.value; }

	/**
	 * According to the list of materialProperties
	 * some properties are sent to material
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToFontMaterial( options = null ) {

		const fontMat = this._fontMaterial.value;
		if( !fontMat ) return;

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}

		}

		Mediator.mediate( this, fontMat, options, this._fontMaterial._mediation, this._fontCustomDepthMaterial.value );

	}

	/**
	 *
	 * @param {number} value
	 */
	set fontSide( value ) {

		this._fontSide.value = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get fontSide() { return this._fontSide.value; }

	/**
	 *
	 * @param {number} value
	 */
	set fontAlphaTest ( value ) {

		this._fontAlphaTest.value = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get fontAlphaTest () { return this._fontAlphaTest.value; }

	/*********************************************************************************************************************
	 * MESH MEDIATION
	 ********************************************************************************************************************/

	/**
	 * According to the list of meshProperties
	 * some properties are sent to mesh
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToBackgroundMesh( options = null ) {

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}


		}

		Mediator.mediate( this, this._backgroundMesh, options, this._backgroundMeshMediation );

	}

	/**
	 * @internal
	 * @param {Mesh|Array.<Mesh>|null} mesh
	 */
	setBackgroundMesh( mesh ) {

		if( this._backgroundMesh ) {

			this.remove( this._backgroundMesh );
			this.unbindBackgroundMeshProperties();

		}

		this._backgroundMesh = mesh;

		if ( this._backgroundMesh ) {

			this.bindBackgroundMeshProperties();

			if( this._backgroundCustomDepthMaterial ) {
				this._backgroundMesh.customDepthMaterial = this._backgroundCustomDepthMaterial;
			}

			if( this._backgroundMaterial ) {
				uniformOrUserDataTransformer( this._backgroundMaterial, 'frameSize', this._backgroundMesh.scale );
			}

			this._transferToBackgroundMesh();

			this.add( this._backgroundMesh );

		}

	}

	/**
	 *
	 */
	bindBackgroundMeshProperties () { }

	/**
	 *
	 */
	unbindBackgroundMeshProperties () { }


	activatePseudoState ( state ) {

	}

	deactivatePseudoState ( state ) {

	}

	togglePseudoState ( state ) {

	}


	hasPseudoState( state ) {
		return false;
	}

	set borderRadiusMediation ( value ) {
		this._borderRadius.mediation = value;
	}

	/**
	 *
	 * @param {boolean} value
	 */
	set backgroundCastShadow( value ) {

		if( this._backgroundCastShadow ) this._backgroundCastShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get backgroundCastShadow() { return this._backgroundCastShadow; }

	/**
	 *
	 * @param {boolean} value
	 */
	set backgroundReceiveShadow( value ) {

		if( this._backgroundReceiveShadow ) this._backgroundReceiveShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get backgroundReceiveShadow() { return this._backgroundReceiveShadow; }

	/**
	 *
	 * @param {number} value
	 */
	set renderOrder( value ) {

		if( this._renderOrder ) this._renderOrder.value = value;

	}

	/**
	 *
	 * @return {number}
	 */
	get renderOrder() { return this._renderOrder.value; }

	/** Font Mesh --------------------------------------------------------------*/

	/**
	 * According to the list of meshProperties
	 * some properties are sent to mesh
	 * @param {Object} [options=null]
	 * @private
	 */
	_transferToFontMesh( options = null ) {

		if( !this._fontMesh ) return;

		if( !options ) {

			options = {};

			for ( const component of this._components ) {
				component.output( options );
			}

		}

		Mediator.mediate( this, this._fontMesh, options, this._fontMeshMediation );

	}

	/**
	 * @internal
	 * @param {Mesh|Array.<Mesh>|null} mesh
	 */
	setFontMesh( mesh ) {

		if( this._fontMesh ) {

			this.remove( this._fontMesh );

			if ( this._fontMesh.material ) this._fontMesh.material.dispose();
			if ( this._fontMesh.geometry ) this._fontMesh.geometry.dispose();

			this._fontMesh = null;
			// deepDelete( this._fontMesh );

			this.unbindFontMeshProperties();

		}

		this._fontMesh = mesh;

		if ( this._fontMesh ) {

			this._fontMesh.raycast = () => {};

			this.bindFontMeshProperties();

			this._transferToFontMaterial();
			this._transferToFontMesh();

			this.add( this._fontMesh );

		}

	}

	/**
	 *
	 */
	bindFontMeshProperties () { }

	/**
	 *
	 */
	unbindFontMeshProperties () { }


	/**
	 *
	 * @param {boolean} value
	 */
	set fog( value ) {

		this._fog.value = value;
		console.log( this._fog.value )

	}

	/**
	 *
	 * @return {boolean}
	 */
	get fog() {

		if ( this._fog ) return this._fog.value;

		return false;
	}


	/**
	 *
	 * @param {boolean} value
	 */
	set fontCastShadow( value ) {

		if( this._fontCastShadow ) this._fontCastShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get fontCastShadow() { return this._fontCastShadow; }

	/**
	 *
	 * @param {boolean} value
	 */
	set fontReceiveShadow( value ) {

		if( this._fontReceiveShadow ) this._fontReceiveShadow.value = value;

	}

	/**
	 *
	 * @return {boolean}
	 */
	get fontReceiveShadow() { return this._fontReceiveShadow; }

	/***********************************************************************************************************************
	 * GEOMETRY
	 **********************************************************************************************************************/

	/**
	 *
	 * @param {Number} v
	 */
	set segments (v) {

		this._segments.value = v;

		// @TODO : Geometry Update

	}

	/**
	 *
	 * @return {number}
	 */
	get segments () { return this._segments.value; }


	/***********************************************************************************************************************
	 * HOOKS & ALTERS
	 **********************************************************************************************************************/

	/**
	 *
	 * @param {Function} func
	 */
	set onAfterUpdate( func ) {

		console.warn( 'ThreeMeshUI v7xx : `onAfterUpdate()` property has been deprecated, please rely on `addAfterUpdate` instead.' );
		this.addAfterUpdate( func );

	}

	/**
	 *
	 * @param {Function} func
	 */
	addAfterUpdate( func ) {

		this._onAfterUpdates.push( func );

	}

	/**
	 *
	 * @param {Function} func
	 */
	removeAfterUpdate( func ) {

		const index = this._onAfterUpdates.indexOf( func );
		if ( index !== -1 ) {

			this._onAfterUpdates.splice( index, 1 );

		}

	}

	/**
	 * @todo: afterUpdate not called anymore
	 */
	performAfterUpdate() {

		for ( let i = 0; i < this._onAfterUpdates.length; i++ ) {

			this._onAfterUpdates[ i ]();

		}

	}

	/**
	 * Retrieve a property
	 * @param propertyName
	 * @return {BaseProperty|null}
	 */
	getProperty( propertyName ){

		if( this[`_${propertyName}`] ){

			return this[`_${propertyName}`];

		}

		return null;
	}

	/**
	 *
	 * @param {string} name
	 * @param {BaseProperty} instance
	 * @returns {void}
	 */
	appendProperty( name, instance ) {

		this[`_${name}`] = instance;
		this._components.push( instance );

	}

	/**
	 *
	 * @param {string} name
	 * @param {BaseProperty} instance
	 * @returns {BaseProperty}
	 */
	replaceProperty( name, instance ) {

		const oldProperty = this[`_${name}`];

		const index = this._components.indexOf( oldProperty );

		this._components[index] = this[`_${name}`] = instance;
		instance.needsUpdate = true;

		return oldProperty;

	}

}

/**
 * @typedef Properties
 * @type {Object.<string,Function>}
 */

/**
 * @typedef Options
 * @type {DocumentedOptions & Object.<string,any>}
 */

/**
 *
 * @typedef {Object} DocumentedOptions
 *
 * @property [options.name] {string}
 * @property [options.flexDirection] {"row"|"row-reverse"|"column"|"column-reverse"}
 * @property [options.justifyContent] {"start"|"center"|"end"|"space-around"|"space-between"|"space-evenly"}
 * @property [options.alignItems] {"start"|"center"|"end"|"stretch"}
 * @property [options.overflow] {"visible"|"hidden"}
 * @property [options.fontKerning] {"normal"|"none"}
 * @property [options.segments] {number}
 * @property [options.fontFamily] {FontFamily|string}
 * @property [options.fontStyle] {"normal"|"italic"}
 * @property [options.fontWeight] {"light"|"normal"|"bold"|"bolder"|100|200|300|400|500|600|700|800|900|"100"|"200"|"300"|"400"|"500"|"600"|"700"|"800"|"900"}
 *
 * @property [options.color]{Color|number|string} The font color
 *
 * @property [options.backgroundColor]{Color|number|string} The background color
 * @property [options.backgroundOpacity] {number}
 * @property [options.backgroundSize] {"cover"|"contain"|"stretch"}
 * @property [options.backgroundImage] {Texture|string}
 *
 *
 * @property [options.borderColor] {Color|number|string}
 * @property [options.borderOpacity] {number}
 * @property [options.borderRadius] {Vector4|Array.<number>|number|string}
 * @property [options.borderWidth] {Vector4|Array.<number>|number|string}
 *
 * @property [options.boxSizing] {"content-box"|"border-box"}
 * @property [options.width] {number|string|"100%"|"auto"}
 * @property [options.height] {number|string|"100%"|"auto"}
 * @property [options.padding] {Vector4|Array.<number>|number|string}
 * @property [options.margin] {Vector4|Array.<number>|number|string}
 *
 * @property [options.textAlign] {"left"|"right"|"center"|"justify"|"justify-left"|"justify-right"}
 * @property [options.visible] {boolean}
 * @property [options.letterSpacing] {number}
 *
 * @property [options.whiteSpace] {"normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"}
 * @property [options.fontTexture] {Texture|string} @deprecated
 * @property [options.textContent] {string}
 *
 */

/**
 * @typedef {"light"|"normal"|"bold"|"bolder"|100|200|300|400|500|600|700|800|900|"100"|"200"|"300"|"400"|"500"|"600"|"700"|"800"|"900"} FontWeightFormat
 */

;// CONCATENATED MODULE: ./src/components/core/UpdateManager.js
//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * Job:
 * - recording components required updates
 * - trigger those updates when 'update' is called
 *
 * This module is a bit special. It is, with FontLibrary, one of the only modules in the 'component'
 * directory not to be used in component composition (Object.assign).
 *
 * When MeshUIComponent is instanciated, it calls UpdateManager.register().
 *
 * Then when MeshUIComponent receives new attributes, it doesn't update the component right away.
 * Instead, it calls UpdateManager.requestUpdate(), so that the component is updated when the user
 * decides it (usually in the render loop).
 *
 * This is best for performance, because when a UI is created, thousands of componants can
 * potentially be instantiated. If they called updates function on their ancestors right away,
 * a given component could be updated thousands of times in one frame, which is very ineficient.
 *
 * Instead, redundant update request are moot, the component will update once when the use calls
 * update() in their render loop.
 */
class UpdateManager {


	static register( component ) {

		if ( !this.elements.includes( component ) ) {

				this.elements.push( component );

		}

	}

	static remove( component ) {

		const index = this.elements.indexOf( component );
		if ( index !== -1 ) {

			this.elements.splice( index, 1 );

		}

	}


	static update() {

		for ( const UIElement of this.elements ) {
			UIElement.update();

			UIElement.process(); // Natural process
			UIElement.process(); // Actual process (optional) - For auto size and stretch

			UIElement.render();
		}

	}

}

/**
 * @internal
 * @type {Array.<MeshUIBaseElement>}
 */
UpdateManager.elements = [];

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.pars.vertex.glsl.js
/**
 *
 * @type {string}
 */
const frame_border_pars_vertex_glsl_program = /* glsl */`

// FrameBorder vertex pars
attribute vec2 uvB;
varying vec2 vUvB;

`;

/* harmony default export */ const frame_border_pars_vertex_glsl = (frame_border_pars_vertex_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.vertex.glsl.js
/**
 *
 * @type {string}
 */
const frame_border_vertex_glsl_program = /* glsl */`

	// FrameBorder vertex shader
	vUvB = uvB;

`;

/* harmony default export */ const frame_border_vertex_glsl = (frame_border_vertex_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.pars.fragment.glsl.js
/**
 *
 * @type {string}
 */
const frame_border_pars_fragment_glsl_program = /* glsl */`

// borders sequences are : x:TOP, y:RIGHT, z:BOTTOM, w:LEFT
uniform vec4 borderWidth;
uniform vec3 borderColor;
uniform float borderOpacity;
uniform vec4 borderRadius;

uniform vec2 cornerTL;
uniform vec2 cornerTR;
uniform vec2 cornerBR;
uniform vec2 cornerBL;

varying vec2 vUvB;

float getEllipticFactor( vec2 uv, vec2 center, float radiusX, float radiusY )
{

		float edx = uv.x - center.x;
		float edy = uv.y - center.y;

		float ddx = (edx * edx) / (radiusX * radiusX);
		float ddy = (edy * edy) / (radiusY * radiusY);

		return ddx + ddy;

}

`;

/* harmony default export */ const frame_border_pars_fragment_glsl = (frame_border_pars_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-border.fragment.glsl.js
/**
 *
 * @type {string}
 */
const frame_border_fragment_glsl_program = /* glsl */`

vec4 borderColor = vec4( borderColor, borderOpacity );

// This could be tweak to produce more smoothing
float mult = 1.0;

// Step 1 ----------------------------------------------
// Draw the four borders ( top - right - bottom - left )
// Without worrying about radiuses ( Straight boorders )

// Top
float topBorderUVy = 1.0 - borderWidth.x;
if( borderWidth.x > 0.0 && vUvB.y > topBorderUVy )
{

	float w = fwidth( 1.0 - vUvB.y ) * mult;
	float step = smoothstep( topBorderUVy , topBorderUVy + w , vUvB.y );
	diffuseColor = mix( diffuseColor, borderColor, step );

}

// Left
float leftBorderUVx = borderWidth.w;
if( borderWidth.w > 0.0 && vUvB.x < leftBorderUVx )
{

	float w = fwidth( vUvB.x ) * mult ;
	float step = smoothstep( leftBorderUVx , leftBorderUVx - w , vUvB.x );
	diffuseColor = mix( diffuseColor, borderColor, step );

}

// Bottom
float bottomBorderUVy = borderWidth.z;
if( borderWidth.z > 0.0 && vUvB.y < bottomBorderUVy )
{
	float w = fwidth( vUvB.y ) * mult;
	float step = smoothstep( bottomBorderUVy , bottomBorderUVy - w , vUvB.y );
	diffuseColor = mix( diffuseColor, borderColor, step );
}

// Right
float rightBorderUVx = 1.0 - borderWidth.y;
if( borderWidth.y > 0.0 && vUvB.x > rightBorderUVx )
{
	float w = fwidth( 1.0 - vUvB.x ) * mult;
	float step = smoothstep( rightBorderUVx , rightBorderUVx + w , vUvB.x );
	diffuseColor = mix( diffuseColor, borderColor, step );
}


// Step 2 ----------------------------------------------
// Process each corners ( topLeft, topRight, bottomRight, bottomLeft )
// To transparentize outside radiuses
// To draw ellipse border on the corner


// Top Left corner
if( vUvB.x < cornerTL.x && vUvB.y > cornerTL.y ) {

		// Only draw border if width is set
		if( borderWidth.w + borderWidth.x > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerTL, cornerTL.x - borderWidth.w,  ( 1.0 - cornerTL.y ) - borderWidth.x );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}

		// Then then radius
		float radiusFactor = getEllipticFactor( vUvB, cornerTL, cornerTL.x, 1.0 - cornerTL.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}
// Bottom Left
if( vUvB.x < cornerBL.x && vUvB.y < cornerBL.y ) {

		if( borderWidth.w + borderWidth.z > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerBL, cornerBL.x - borderWidth.w,  cornerBL.y - borderWidth.z );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}


		float radiusFactor = getEllipticFactor( vUvB, cornerBL, cornerBL.x, cornerBL.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}
// Top Right
if( vUvB.x > cornerTR.x && vUvB.y > cornerTR.y ) {

		if( borderWidth.y + borderWidth.x > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerTR, ( 1.0 - cornerTR.x ) - borderWidth.y,  ( 1.0 - cornerTR.y ) - borderWidth.x );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}

		float radiusFactor = getEllipticFactor( vUvB, cornerTR, 1.0 - cornerTR.x, 1.0 - cornerTR.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}
// Bottom Right
if( vUvB.x > cornerBR.x && vUvB.y < cornerBR.y ) {

		if( borderWidth.y + borderWidth.z > 0.0 ){

			float borderFactor = getEllipticFactor( vUvB, cornerBR, ( 1.0 - cornerBR.x ) - borderWidth.y,  cornerBR.y - borderWidth.z );
			float step = smoothstep( 1.0, 1.0 + fwidth( borderFactor ) * mult, borderFactor );
			diffuseColor = mix( diffuseColor, borderColor, step );

		}

		float radiusFactor = getEllipticFactor( vUvB, cornerBR, 1.0 - cornerBR.x, cornerBR.y );
		float alphaStep = smoothstep( 1.0 , 1.0 + fwidth(radiusFactor) * mult , radiusFactor );
		diffuseColor.a = mix( diffuseColor.a, 0.0, alphaStep );

}

`;

/* harmony default export */ const frame_border_fragment_glsl = (frame_border_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-common.pars.fragment.glsl.js
/**
 *
 * @type {string}
 */
const frame_common_pars_fragment_glsl_program = /* glsl */`

// To be removed - required for both border and background
uniform vec3 frameSize;
uniform vec2 textureSize;

`;

/* harmony default export */ const frame_common_pars_fragment_glsl = (frame_common_pars_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-background.pars.fragment.glsl.js
/**
 *
 * @type {string}
 */
const frame_background_pars_fragment_glsl_program = /* glsl */`

#ifdef USE_MAP

vec4 sampleTexture() {

	vec2 uv = vUv;

	// default stretch
	#if BACKGROUND_MAPPING != 0

	float textureRatio = textureSize.x / textureSize.y;
	float panelRatio = frameSize.x / frameSize.y;
	float ratio = panelRatio / textureRatio;
	float ratio2 = textureRatio / panelRatio;

		// contain
		#if BACKGROUND_MAPPING == 1
		if ( textureRatio < panelRatio ) { // repeat on X
			float newX = uv.x * ratio;
			newX += 0.5 - 0.5 * ratio;
			uv.x = newX;
		} else { // repeat on Y
			float newY = uv.y * ratio2;
			newY += 0.5 - 0.5 * ratio2;
			uv.y = newY;
		}
		#else
		// cover
		if ( textureRatio < panelRatio ) { // stretch on Y
			float newY = uv.y * ratio2;
			newY += 0.5 - 0.5 * ratio2;
			uv.y = newY;
		} else { // stretch on X
			float newX = uv.x * ratio;
			newX += 0.5 - 0.5 * ratio;
			uv.x = newX;
		}

		#endif

	#endif

	return texture2D( map, uv );

}
#endif
`;

/* harmony default export */ const frame_background_pars_fragment_glsl = (frame_background_pars_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderChunk/frame-background.fragment.glsl.js
/**
 *
 * @type {string}
 */
const frame_background_fragment_glsl_program = /* glsl */`
#ifdef USE_MAP

	vec4 textureSample = sampleTexture();
	diffuseColor *= textureSample;

#endif
`;

/* harmony default export */ const frame_background_fragment_glsl = (frame_background_fragment_glsl_program);

;// CONCATENATED MODULE: ./src/renderers/shaders/ShaderChunkUI.js














/* eslint-disable camelcase */

/**
 * @typedef {Object} ChunksUI
 * @property msdf_alphaglyph_vertex {string}
 * @property frame_border_fragment {string}
 * @property frame_background_pars_fragment {string}
 * @property frame_common_pars {string}
 * @property msdf_alphaglyph_pars_vertex {string}
 * @property frame_border_pars_fragment {string}
 * @property msdf_offset_vertex {string}
 * @property frame_border_pars_vertex {string}
 * @property msdf_alphaglyph_pars_fragment {string}
 * @property frame_border_vertex {string}
 * @property frame_background_fragment {string}
 * @property msdf_alphaglyph_fragment {string}
 */


const ShaderChunkUI = {
	msdfAlphaglyphParsVertexGlsl: msdf_alphaglyph_pars_vertex_glsl,
	msdfAlphaglyphVertexGlsl: msdf_alphaglyph_vertex_glsl,
	msdfOffsetglyphVertexGlsl: msdf_offsetglyph_vertex_glsl,
	msdfAlphaglyphParsFragmentGlsl: msdf_alphaglyph_pars_fragment_glsl,
	msdfAlphaglyphFragmentGlsl: msdf_alphaglyph_fragment_glsl,
	frameBorderParsVertexGlsl: frame_border_pars_vertex_glsl,
	frameBorderVertexGlsl: frame_border_vertex_glsl,
	frameCommonParsFragmentGlsl: frame_common_pars_fragment_glsl,
	frameBorderParsFragmentGlsl: frame_border_pars_fragment_glsl,
	frameBorderFragmentGlsl: frame_border_fragment_glsl,
	frameBackgroundParsFragmentGlsl: frame_background_pars_fragment_glsl,
	frameBackgroundFragmentGlsl: frame_background_fragment_glsl,
};
/* eslint-enable camelcase */

;// CONCATENATED MODULE: ./src/frame/renderers/ShaderLib/framematerial.glsl.js








const framematerial_glsl_vertexShader = /* glsl */`
// Would be automatic on three materials and from USE_UV
#ifdef USE_MAP
varying vec2 vUv;
#endif

${frame_border_pars_vertex_glsl}

#include <fog_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#ifdef USE_MAP
	vUv = uv;
	#endif

	${frame_border_vertex_glsl}

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;

	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`

const framematerial_glsl_fragmentShader = /* glsl */`

// Basic
uniform vec3 diffuse;
uniform float opacity;

#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif

${frame_common_pars_fragment_glsl}

${frame_border_pars_fragment_glsl}


#ifdef USE_MAP
varying vec2 vUv;
uniform sampler2D map;
#endif

${frame_background_pars_fragment_glsl}

#include <fog_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );

	// map
	${frame_background_fragment_glsl}

	${frame_border_fragment_glsl}

	#ifdef USE_ALPHATEST

	if ( diffuseColor.a < alphaTest ) discard;

	#endif

	// output
	gl_FragColor = diffuseColor;


	#include <clipping_planes_fragment>
	#include <fog_fragment>
}
`

;// CONCATENATED MODULE: ./src/frame/utils/FrameMaterialUtils.js


//JSDoc related import
/* eslint-disable no-unused-vars */









/* eslint-enable no-unused-vars */


class FrameMaterialUtils {



	/**
	 *
	 * @returns {Object<{m: string, t?: (function((Material|ShaderMaterial), string, *): void)}>}
	 */
	static get mediation() {

		return _mediationDefinitions;

	}


	/**
	 * Alter a material options with required fontMaterial options and or default values
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureMaterialOptions( materialOptions ) {
		materialOptions.transparent = true;
		materialOptions.alphaTest = materialOptions.alphaTest || 0.02;
	}

	/**
	 * As three-mesh-ui FontMaterial relies on webgl preprocessors,
	 * lets force the material to have a proper defines object
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static ensureDefines( threeMaterial ) {
		if ( !threeMaterial.defines ) {
			threeMaterial.defines = {};
		}
	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {Material|ShaderMaterial} threeMaterial
	 * @param {Object.<string,any>} materialOptions
	 */
	static ensureUserData( threeMaterial, materialOptions ) {
		threeMaterial.userData.borderColor = { value: null };
		threeMaterial.userData.borderRadius = { value: new external_three_namespaceObject.Vector4(0,0,0,0) };
		// Store corners based on borderRadiuses
		threeMaterial.userData.cornerTL = { value : new external_three_namespaceObject.Vector2(0,1) };
		threeMaterial.userData.cornerTR = { value : new external_three_namespaceObject.Vector2(1,1) };
		threeMaterial.userData.cornerBR = { value : new external_three_namespaceObject.Vector2(1,0) };
		threeMaterial.userData.cornerBL = { value : new external_three_namespaceObject.Vector2(0,0) };

		threeMaterial.userData.borderWidth = { value: new external_three_namespaceObject.Vector4(0,0,0,0) };
		threeMaterial.userData.borderOpacity = { value: null };
		threeMaterial.userData.frameSize = { value: new external_three_namespaceObject.Vector3( 1, 1, 1 ) };
		threeMaterial.userData.textureSize = { value: new external_three_namespaceObject.Vector2( 1, 1 ) };

	}
	/* eslint-enable no-unused-vars */

	/**
	 *
	 * @param {any} shader
	 * @param {Material|ShaderMaterial} threeMaterial
	 */
	static bindUniformsWithUserData( shader, threeMaterial ) {

		shader.uniforms.borderColor = threeMaterial.userData.borderColor;
		// Border radiuses and corners
		shader.uniforms.borderRadius = threeMaterial.userData.borderRadius;
		shader.uniforms.cornerTL = threeMaterial.userData.cornerTL;
		shader.uniforms.cornerTR = threeMaterial.userData.cornerTR;
		shader.uniforms.cornerBR = threeMaterial.userData.cornerBR;
		shader.uniforms.cornerBL = threeMaterial.userData.cornerBL;

		shader.uniforms.borderWidth = threeMaterial.userData.borderWidth;
		shader.uniforms.borderOpacity = threeMaterial.userData.borderOpacity;
		shader.uniforms.frameSize = threeMaterial.userData.frameSize;
		shader.uniforms.textureSize = threeMaterial.userData.textureSize;
	}

	/**
	 *
	 * @param shader
	 */
	static injectShaderChunks( shader ) {
		FrameMaterialUtils.injectVertexShaderChunks( shader );
		FrameMaterialUtils.injectFragmentShaderChunks( shader );
	}

	/**
	 *
	 * @param shader
	 */
	static injectVertexShaderChunks( shader ) {
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_pars_vertex>',
			'#include <uv_pars_vertex>\n' + frame_border_pars_vertex_glsl
		);

		// vertex chunks
		shader.vertexShader = shader.vertexShader.replace(
			'#include <uv_vertex>',
			'#include <uv_vertex>\n' + frame_border_vertex_glsl
		)

	}

	/**
	 *
	 * @param shader
	 */
	static injectFragmentShaderChunks( shader ) {
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + frame_background_pars_fragment_glsl
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + frame_border_pars_fragment_glsl
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_pars_fragment>',
			'#include <map_pars_fragment>\n' + frame_common_pars_fragment_glsl
		)

		// fragment chunks
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <map_fragment>',
			frame_background_fragment_glsl
		)

		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <alphamap_fragment>',
			frame_border_fragment_glsl+'\n#include <alphamap_fragment>'
		)

	}

}

/**
 *
 * @param target
 * @param property
 * @param value
 * @private
 */
const _backgroundSizeTransformer = function( target, property, value ) {

	value = ['stretch','contain','cover'].indexOf(value);
	asPreprocessorValueTransformer(target, 'BACKGROUND_MAPPING', value);

}

// /**
//  *
//  * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
//  */
// const _mediationDefinitions = {
// 	alphaTest: { m: 'alphaTest', t: alphaTestTransformer },
// 	backgroundTexture: { m: 'map' },
// 	backgroundColor: { m: 'color' },
// 	backgroundOpacity: { m:'opacity' },
// 	backgroundSize: { m: 'u_backgroundMapping', t: _backgroundSizeTransformer },
// 	_borderWidthComponent: { m: 'borderWidth', t: _linkComponentOutput },
// 	borderColor: { m: 'borderColor', t: uniformOrUserDataTransformer },
// 	_borderRadiusComponent: { m: 'computedCorners', t: _linkCornersOutput },
// 	borderOpacity: { m: 'borderOpacity', t: uniformOrUserDataTransformer },
// 	size: { m: 'frameSize', t: uniformOrUserDataTransformer },
// 	tSize: { m: 'textureSize', t: uniformOrUserDataTransformer }
// }


/**
 * 7xx
 * @type {Object.<{m:string, t?:(fontMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
 */
const _mediationDefinitions = {
	clippingPlanes : {m: 'clippingPlanes'},
	backgroundAlphaTest: { m: 'alphaTest', t: alphaTestTransformer },
	backgroundSide: { m: 'side' },
	// backgroundTexture: { m: 'map' },
	backgroundImage: { m: 'map'},
	backgroundColor: { m: 'color' },
	backgroundOpacity: { m:'opacity' },
	backgroundSize: { m: 'computedBackgroundSize', t: _backgroundSizeTransformer },
	borderWidth: { m: 'borderWidth', t: uniformOrUserDataTransformer },
	borderColor: { m: 'borderColor', t: uniformOrUserDataTransformer },
	cornerTL : { m: 'cornerTL', t: uniformOrUserDataTransformer },
	cornerTR : { m: 'cornerTR', t: uniformOrUserDataTransformer },
	cornerBR : { m: 'cornerBR', t: uniformOrUserDataTransformer },
	cornerBL : { m: 'cornerBL', t: uniformOrUserDataTransformer },
	borderOpacity: { m: 'borderOpacity', t: uniformOrUserDataTransformer },
	fog: {m : "fog"},
	size: { m: 'frameSize', t: uniformOrUserDataTransformer },
	tSize: { m: 'textureSize', t: uniformOrUserDataTransformer }
}

;// CONCATENATED MODULE: ./src/frame/materials/FrameMaterial.js




class FrameMaterial extends external_three_namespaceObject.ShaderMaterial {


	/**
	 * This static method is mandatory for extending ThreeMeshUI.FrameMaterial
	 * It will provide a transfer description for properties from ThreeMeshUI.Text to THREE.Material
	 * @see {FrameMaterialUtils.mediation}
	 * @returns {Object.<{m:string, t?:(frameMaterial:Material|ShaderMaterial, materialProperty:string, value:any) => void}>}
	 */
	static get mediation() {

		return FrameMaterialUtils.mediation;

	}

	constructor() {
		super ( {
			uniforms: {
				alphaTest: { value: 0.02 },
				map: { value: null },
				diffuse: { value: new external_three_namespaceObject.Color(0xffffff) },
				opacity: { value: 1.0 },
				borderColor: { value: new external_three_namespaceObject.Color(0x000000) },
				borderOpacity: { value: 0 },
				borderRadius: { value: new external_three_namespaceObject.Vector4(0,0,0,0) },
				// Corners for customized radius not all starting on center [0.5,0.5];
				// Corners will be generated from borderRadiuses
				cornerTL: { value : new external_three_namespaceObject.Vector2(0,1) },
				cornerTR: { value : new external_three_namespaceObject.Vector2(1,1) },
				cornerBR: { value : new external_three_namespaceObject.Vector2(1,0) },
				cornerBL: { value : new external_three_namespaceObject.Vector2(0,0) },
				borderWidth: { value: new external_three_namespaceObject.Vector4(0,0,0,0) },

				frameSize: { value: new external_three_namespaceObject.Vector3( 1, 1, 1 ) },
				textureSize: { value: new external_three_namespaceObject.Vector2( 1, 1 ) },

				...external_three_namespaceObject.UniformsLib.fog,
			},
			side: external_three_namespaceObject.FrontSide,
			transparent: true,
			clipping: true,
			vertexShader: framematerial_glsl_vertexShader,
			fragmentShader: framematerial_glsl_fragmentShader,
			extensions: {
				derivatives: true
			}
		} );

		// webgl preprocessor AlphaTest set by default
		this.defines[ 'USE_ALPHATEST' ] = '';
		// Set fog as default
		this.fog = false;

		this.needsUpdate = true;
	}

	set map( value ) {

		this.uniforms.map.value = value;
		if( !value ) {

			if( this.defines['USE_UV'] !== undefined ) {

				delete this.defines['USE_UV'];
				this.needsUpdate = true;

			}

		} else if( this.defines['USE_UV'] === undefined ) {

			this.defines['USE_UV'] = '';
			this.needsUpdate = true;

		}

		this.needsUpdate = true;

	}

	get map(){
		return this.uniforms.map.value;
	}

	/**
	 *
	 * @returns {number}
	 */
	get alphaTest() {

		return this.uniforms.alphaTest.value;

	}



	/**
	 *
	 * @param {number} v
	 */
	set alphaTest( v ) {
		this.uniforms.alphaTest.value = v;
	}

	/**
	 *
	 * @param {number} v
	 */
	set opacity( v ) {

		if( this.uniforms )
			this.uniforms.opacity.value = v;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {number}
	 */
	get opacity() {

		return this.uniforms.opacity.value;

	}

	/**
	 * The color will be the diffuse uniform
	 * @returns {Color}
	 */
	get color() {

		return this.uniforms.diffuse.value;

	}

	/**
	 *
	 * @param {Color} v
	 */
	set color( v ) {

		this.uniforms.diffuse.value = v;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/hierarchy/ChildrenBox.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class ChildrenBox extends BaseProperty {

	constructor() {

		super( 'children', null, false );

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @private
		 */
		this._uis = [];

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._boxes = [];

	}


	/* eslint-disable no-unused-vars */
	/**
	 * Update requested when :
	 * 		- New child has been added
	 * 		- Existing child has been removed
	 *
	 * @param element
	 * @param out
	 */
	update( element, out ) { /* eslint-enable no-unused-vars */

		this._compute( element );

		element._layouter._needsUpdate = true;
		element._renderOrder._needsUpdate = true;

	}


	/**
	 * Process when :
	 * 		- Existing child visibility changed
	 *
	 * @param element
	 */
	process( element ) {

		this._compute( element );

		element._flexDirection._needsProcess = true;
		element._layouter._needsProcess = true;

		element._overflow._needsRender = true;

	}

	_compute( element ) {

		// Stores all children that are box
		this._uis = element.children.filter( child => child.visible && child.isUI );
		this._boxes = this._uis.filter( child => child.isBox ).sort( this._sortOrder );

		// @TODO: check if it has changes boxes values? with array join to 'fingerprint'?
		// 				computation to remove computation? Does it worth it? When would it worth it?
		//				// Changed order property of children but doesn't impact the output of boxes => Order have change, okay to have more computation
		//				// Removed the Added the same element, at the same position => Rare case
		// 		Conclusion : Not worth it at the time of writing



	}



	/**
	 *
	 */
	dispose() {

		this._uis = null;
		this._boxes = null;

	}

	/**
	 *
	 * Sort children according to their .style.order property or fallback on children index
	 *
	 * @param {HTMLElementVR} a
	 * @param {HTMLElementVR} b
	 * @return {number}
	 * @private
	 */
	_sortOrder = ( a, b ) => {

		if( a._order._value < b._order._value ) return -1;
		if( a._order._value > b._order._value ) return 1;

		// if both children have the same order value, use their children index to order them
		if( this._uis.indexOf(a) < this._uis.indexOf(b) ) {
			return -1;
		}

		return 1;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/BoundsBox.js




class BoundsBox extends BaseProperty {

	constructor() {

		super( 'bounds', null, false );

		/**
		 *
		 * @type {Vector3}
		 * @internal
		 */
		this._size = new external_three_namespaceObject.Vector3( 1, 1, 1 );

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._offsetWidth = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._offsetHeight = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._innerWidth = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._innerHeight = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._centerX = 0.5;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._centerY = 0.5;


		this._needsProcess = true;

	}

	/**
	 * Set the value of the width 100%
	 * @param element
	 * @param value
	 */
	setReferenceWidth( element, value ) {

		const width = element._width;
		const padding = element._padding._value;
		const borderWidth = element._borderWidth._value;
		const margin = element._margin._value;

		const factor = width._auto ? 1 : width._value;
		// const newOffsetWidth = (value * factor) - (margin.y + margin.w);
		const newOffsetWidth = (value * factor) - (margin.y + margin.w);
		if ( numberEquals( newOffsetWidth, this._offsetWidth ) ) return;

		this._offsetWidth = newOffsetWidth;
		this._innerWidth = this._offsetWidth - ( padding.y + padding.w + borderWidth.y + borderWidth.w );

		this._centerX = _computeCenterX( element );

		this._propagateWidth( element );

		this._triggerCascadingDependencies( element );

	}

	/**
	 * Set the value of the height 100%
	 * @param element
	 * @param value
	 */
	setReferenceHeight( element, value ) {

		const height = element._height;
		const padding = element._padding._value;
		const borderWidth = element._borderWidth._value;
		const margin = element._margin._value;

		const factor = height._auto ? 1 : height._value;

		const newOffsetHeight = (value * factor) - ( margin.x + margin.z );
		if ( numberEquals( newOffsetHeight, this._offsetHeight ) ) return;

		this._offsetHeight = newOffsetHeight;
		this._innerHeight = this._offsetHeight - ( padding.x + padding.z + borderWidth.x + borderWidth.z );
		this._centerY = _computeCenterY( element );

		this._propagateHeight( element );

		this._triggerCascadingDependencies( element );

	}

	setChildrenWidth( element, value ) {

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		this._innerWidth = value;
		this._offsetWidth = this._innerWidth + ( padding.y + padding.w + border.y + border.w )

		this._centerX = _computeCenterX( element );

		this._propagateWidth( element );
		this._triggerCascadingDependencies( element );


	}

	setChildrenHeight( element, value ) {

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		this._innerHeight = value;
		this._offsetHeight = this._innerHeight + ( padding.x + padding.z + border.x + border.z )

		this._centerY = _computeCenterY( element );

		this._propagateHeight( element );
		this._triggerCascadingDependencies( element );

	}


	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		// only compute new width if explicitely defined
		const width = element._width;
		if( !width._auto && !width._relative ) {

			if ( element._boxSizing._value === 'content-box' ) {

				this._innerWidth = width._value;
				this._offsetWidth = this._innerWidth + padding.y + padding.w + border.y + border.w;

			} else {

				this._offsetWidth = width._value;
				this._innerWidth = this._offsetWidth - ( padding.y + padding.w + border.y + border.w );

			}

			this._centerX = _computeCenterX( element );
			this._needsProcess = true;

			// tells children width has changed
			this._propagateWidth( element );
			this._triggerCascadingDependencies( element );

		}

		const height = element._height;
		if( !height._auto && !height._relative ) {

			if ( element._boxSizing._value === 'content-box' ) {

				this._innerHeight = height._value;
				this._offsetHeight = this._innerHeight + padding.x + padding.z + border.x + border.z;

			} else {

				this._offsetHeight = height._value;
				this._innerHeight = this._offsetHeight - ( padding.x + padding.z + border.x + border.z );

			}

			this._centerY = _computeCenterY( element );
			this._needsProcess = true;

			// tells children height has changed
			this._propagateHeight( element );
			this._triggerCascadingDependencies( element );

		}

	}

	/* eslint-disable no-unused-vars */ render( element ) { /* eslint-enable no-unused-vars */

		this._size.x = this._offsetWidth;
		this._size.y = this._offsetHeight;

		if( element._backgroundMesh ){
			element._backgroundMesh.updateScale();
		}

		element._renderer._needsRender = true;

	}

	/**
	 *
	 * @param {Object.<string,any>} out
	 */
	output( out ) {

		out[ 'size' ] = this._size;

	}


	/* eslint-disable no-unused-vars */
	/**
	 * @override
	 */
	process( element ) { /* eslint-enable no-unused-vars */

		// this._triggerCascadingDependencies( element )

		//console.log( 'process bounds box', element.name );

		// update primitives or unbinded values

		// require cascading processes

		element._overflow._needsRender = true;


	}

	/**
	 *
	 * @param element
	 * @internal
	 */
	_computeChildrenSideWidth( element ) {

		return _computeChildrenSideWidth( element );

	}

	/**
	 *
	 * @param element
	 * @internal
	 */
	_computeChildrenSideHeight( element ) {

		return _computeChildrenSideHeight( element );

	}

	_propagateWidth( element ) {

		for ( let i = 0; i < element._children._boxes.length; i++ ) {

			const box = element._children._boxes[ i ];
			const width = box._width;

			if( width._relative ) box._bounds.setReferenceWidth( box, this._innerWidth );

		}

	}

	_propagateHeight( element ) {

		for ( let i = 0; i < element._children._boxes.length; i++ ) {

			const box = element._children._boxes[ i ];
			const height = box._height;

			if( height._relative ) box._bounds.setReferenceHeight( box, this._innerHeight );

		}

	}

	_triggerCascadingDependencies( element ) {

		// also change parent when require
		if ( element._parent._value ) {
			element._parent._value._autoSize._needsProcess = true;
		}

		element._flexDirection._needsProcess = true;
		element._fontSize._needsProcess = true;
		element._layouter._needsProcess = true;

		this._needsRender = true;

		element._borderWidth._needsRender = true;
		element._borderRadius._needsRender = true;

		element._overflow._needsRender = true;

	}

}




/***********************************************************************************************************************
 * INTERNAL FUNCTIONS
 **********************************************************************************************************************/

/**
 * Retrieve the center X according to box sized dimensions
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeCenterX( element ) {

	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	const leftSide = padding.w + borderWidth.w;
	const rightSide = padding.y + borderWidth.y;

	return ( leftSide - rightSide ) / 2;
}

/**
 * Retrieve the center Y according to box sized dimensions
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeCenterY( element ) {


	const padding = element._padding._value;
	const borderWidth = element._borderWidth._value;

	const topSide = padding.x + borderWidth.x;
	const bottomSide = padding.z + borderWidth.z;

	return ( bottomSide - topSide ) / 2;
}

/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeChildrenSideWidth( element ) {

	return element._children._boxes.reduce( ( accu, child ) => {

		// if ( child._bounds._needsProcess ) child._bounds.process( child );

		const margin = child._margin._value;
		const CHILD_SIZE = child._bounds._offsetWidth + margin.y + margin.w;

		return accu + CHILD_SIZE;

	}, 0 );

}

/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeChildrenSideHeight( element ) {

	return element._children._boxes.reduce( ( accu, child ) => {


		// if ( child._bounds._needsProcess ) child._bounds.process( child );

		const margin = child._margin._value;

		const CHILD_SIZE = child._bounds._offsetHeight + margin.x + margin.z;

		return accu + CHILD_SIZE;

	}, 0 );

}


;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/AlignItemsPropertyBox.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class AlignItemsPropertyBox extends AlignItemsProperty {

	constructor( ) {

		super();

		// configure this property
		this._allowsInherit = false;
		this._needsUpdate = true;

		// strategies
		/**
		 *
		 * @type {(element:MeshUIBaseElement, (child:MeshUIBaseElement, parentOffset:number )=> number ) =>  void  }
		 * @private
		 */
		this._process = this.emptyStrategyLogic;

		/**
		 *
		 * @type {(child:MeshUIBaseElement, parentOffset:number )=> number}
		 * @private
		 */
		this._childAlign = this.emptyStrategyLogic;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) {

		// Stretch : Current or previous requires a bounds update of children
		// if( this._value === 'stretch' || this._input === 'stretch' ) {
		//
		// 	for ( let i = 0; i < element._children._boxes.length; i++ ) {
		// 		element._children._boxes[ i ]._bounds._needsProcess = true;
		// 	}
		//
		// }

		this._value = this._inheritedInput;

		switch( element._flexDirection._value ) {

			case 'row':
			case 'row-reverse':
				this._process = _processRow;
				switch ( this._value ) {
					case 'start':
						this._childAlign = _alignChildRowStart;
						break;
					case 'end':
						this._childAlign = _alignChildRowEnd;
						break;

					default:
						this._childAlign = _alignChild;
				}
				break;

			case 'column':
			case 'column-reverse':
				this._process = _processColumn;

				switch ( this._value ) {
					case 'start':
						this._childAlign = _alignChildColumnStart;
						break;
					case 'end':
						this._childAlign = _alignChildColumnEnd;
						break;

					default:
						this._childAlign = _alignChild;
				}

				break;

		}

		this._needsProcess = true;
		// @TODO: Store children here
		element._autoSize._needsProcess = true;

		element._flexDirection._needsProcess = true; //not mandatory
		element._justifyContent._needsProcess = true;

		this._needsProcess = true;
		element._fontSize._needsProcess = true;
		element._layouter._needsProcess = true;

	}

	/**
	 *
	 * @param element
	 */
	process( element ) {

		// return;
		// if( !element._children._boxes.length ) return;

		this._process( element, this._childAlign );

		// @TODO : Could be strategized
		let snap = 'center';
		let snapXon = 'center';
		let snapYon = 'center';

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		if( element._flexDirection._value.indexOf('column') !== -1 ) {

			if( this._value === 'start' ) {
				snap = snapXon = 'left';
			}else if( this._value === 'end' ){
				snap = snapXon ='right';
			}else {
				snap = 'centerX';
			}

		} else {

			/* eslint-disable no-lonely-if */
			if( this._value === 'start' ) {
				snap = snapYon = 'top';
			}else if( this._value === 'end' ){
				snap = snapYon ='bottom';
			}else{
				snap = 'centerY';
			}
			/* eslint-enable no-lonely-if */

		}

		// apply 4 directional padding and borders
		let y = -(padding.x - padding.z) / 2 - (border.x - border.z)  / 2;
		let x = -(padding.y - padding.w) / 2 - ( border.y - border.w ) / 2;


		if( snapXon === 'left' ) {

			x = (padding.w - padding.y) / 2 + (border.w - border.y) / 2;

		} else if( snapXon === 'right' ) {

			x = - ( padding.y - padding.w ) / 2 - ( border.y - border.w ) / 2;

		}

		if( snapYon === 'top' ) {

			y = - (padding.x - padding.z) / 2 - (border.x - border.z)  / 2;

		} else if( snapYon === 'bottom' ) {

			y = (padding.z - padding.x) / 2 + (border.z - border.x)  / 2;

		}


		element._children._boxes.forEach( ( child ) => {

			let marginX = 0;
			let marginY = 0;
			// let marginY = ( -child._margin._value.x + child._margin._value.z ) /2;
			// let marginY = ( -child._margin._value.x + child._margin._value.z ) /2;

			if( snap === 'top' ) {

				marginY = - child._margin._value.x;

			} else if( snap === 'bottom' ) {

				marginY = child._margin._value.z;

			} else if( snap === 'left' ) {

				marginX = child._margin._value.w;

			} else if( snap === 'right' ) {

				marginX = - child._margin._value.y;

			} else if( snap === 'centerX' ) {

				marginX = ( child._margin._value.w - child._margin._value.y ) /2;

			} else if( snap === 'centerY' ) {

				marginY = ( - child._margin._value.x + child._margin._value.z ) /2;

			}

			element._layouter._childrenPos[ child.id ].x += x + marginX;
			element._layouter._childrenPos[ child.id ].y += y + marginY;

		} );

	}

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

function _alignChild() {
	return 0;
}

/**
 *
 * @param child
 * @param parentOffset
 * @return {number}
 * @private
 */
function _alignChildRowEnd( child, parentOffset ) {
	return - parentOffset + ( child._bounds._offsetHeight / 2 );
}

function _alignChildRowStart( child, parentOffset ) {
	return parentOffset - ( child._bounds._offsetHeight / 2 );
}

function _alignChildColumnEnd( child, parentOffset ) {
	return parentOffset - ( child._bounds._offsetWidth / 2 );
}

function _alignChildColumnStart( child, parentOffset ) {
	return - parentOffset + ( child._bounds._offsetWidth / 2 );
}

function _processColumn( element, childAligner ) {

	const AXIS_TARGET = element._bounds._innerWidth / 2;

	element._children._boxes.forEach( ( child ) => {

		element._layouter._childrenPos[ child.id ].x = childAligner( child, AXIS_TARGET );

	} );

}

function _processRow( element, childAligner ) {

	const AXIS_TARGET = element._bounds._innerHeight / 2;

	element._children._boxes.forEach( ( child ) => {

		element._layouter._childrenPos[ child.id ].y = childAligner( child, AXIS_TARGET );

	} );

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/FlexDirectionPropertyBox.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class FlexDirectionPropertyBox extends FlexDirectionProperty {

	constructor( ) {

		super();

		// Configure
		this._allowsInherit = false;
		this._needsUpdate = true;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._offset = 0;

		/**
		 *
		 * @type {number}
		 * @internal
		 */
		this._reverse = 1;

		/**
		 *
		 * @param { (element:MeshUIBaseElement) => void} element
		 * @private
		 */
		this._process = this.emptyStrategyLogic;

	}

	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		switch ( this._value ) {
			case "row":
				this._process = FlexDirectionPropertyBox_processRow;
				// this._offset = - element._bounds._innerWidth / 2;
				break;

			case "row-reverse":
				this._process = _processRowReverse;
				// this._offset = element._bounds._innerWidth / 2;
				break;

			case "column":
				this._process = FlexDirectionPropertyBox_processColumn;
				// this._offset = element._bounds._innerHeight / 2;
				break;

			case "column-reverse":
				this._process = _processColumnReverse;
				// this._offset = - element._bounds._innerHeight / 2;
				break;
		}

		// also update dependencies
		if( !element._justifyContent._needsUpdate ) element._justifyContent.computeOutputValue( element );
		if( !element._alignItems._needsUpdate ) element._alignItems.computeOutputValue( element );

		this._needsProcess = true;

	}

	process( element ) {
		// this will be defined from strategy

		//console.log( element.name, 'flexDirection process');


		switch ( this._value ) {
			case "row":
				this._offset = - element._bounds._innerWidth / 2;
				break;

			case "row-reverse":
				this._offset = element._bounds._innerWidth / 2;
				break;

			case "column":
				this._offset = element._bounds._innerHeight / 2;
				break;

			case "column-reverse":
				this._offset = - element._bounds._innerHeight / 2;
				break;
		}

		this._reverse = -Math.sign( this._offset );
		if( this._reverse === 0 ) {
			this._reverse = 1;
		}


		this._process( element );

		element._justifyContent._needsProcess = true;
		element._layouter._needsProcess = true;

	}

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

function FlexDirectionPropertyBox_processRow( element ) {

	// end to end children
	let accu = element._flexDirection._offset;

	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		/**
		 *
		 * @type {MeshUIBaseElement}
		 */
		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetWidth;

		// increase with the left margin before placing the child
		accu += child._margin._value.w * REVERSE;

		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = accu + ( CHILD_SIZE / 2 ) * REVERSE;
		position.y = 0;


		// increase the next child with this child right margin
		accu += REVERSE * ( CHILD_SIZE + child._margin._value.y ) ;

	}

}

function _processRowReverse( element ) {

	// end to end children
	let accu = element._flexDirection._offset;
	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		/**
		 *
		 * @type {MeshUIBaseElement}
		 */
		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetWidth;

		// decrease with the right margin before placing the child
		accu += child._margin._value.y * REVERSE;


		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = accu + ( CHILD_SIZE / 2 ) * REVERSE;
		position.y = 0;

		// decrease the next child with this child left margin
		accu += (CHILD_SIZE + child._margin._value.w) * REVERSE ;

	}

}

function FlexDirectionPropertyBox_processColumn( element ) {

	// end to end children
	let accu = element._flexDirection._offset;
	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetHeight;

		// increase with the top margin before placing the child
		accu += child._margin._value.x * REVERSE;

		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = 0;
		position.y = accu + ( CHILD_SIZE / 2 ) * REVERSE;

		// increase the next child with this child bottom margin
		accu += (CHILD_SIZE + child._margin._value.z) * REVERSE ;

	}

}

function _processColumnReverse( element ) {

	// end to end children
	let accu = element._flexDirection._offset;
	const REVERSE = element._flexDirection._reverse;

	const boxes = element._children._boxes;

	// Refactor reduce into fori in order to get rid of this keyword
	for ( let i = 0; i < boxes.length; i++ ) {

		const child = boxes[ i ];

		const CHILD_ID = child.id;

		// @TODO : use getter instead of compute function if possible
		const CHILD_SIZE = child._bounds._offsetHeight;

		// decrease with the bottom margin before placing the child
		accu += child._margin._value.z * REVERSE;

		const position = element._layouter._childrenPos[ CHILD_ID ];

		position.x = 0;
		position.y = accu + ( CHILD_SIZE / 2 ) * REVERSE;

		// decrease the next child with this child top margin
		accu += ( CHILD_SIZE + child._margin._value.x ) * REVERSE ;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/JustifyContentPropertyBox.js


class JustifyContentPropertyBox extends JustifyContentProperty {

	constructor( defaultValue ) {

		super( 'justifyContent', defaultValue, true );

		// configure
		this._allowsInherit = false;
		this._needsUpdate = true;

		// strategies
		/**
		 *
		 * @type {(axisOffset:number) => number}
		 * @private
		 */
		this._computeOffset = this.emptyStrategyLogic;

		/**
		 *
		 * @type {(element:MeshUIBaseElement, availableSpace:number, reverse:number) => Array.<number> }
		 * @private
		 */
		this._computeMargin = this.emptyStrategyLogic;

		/**
		 *
		 * @type {(element:MeshUIBaseElement) => void}
		 * @private
		 */
		this._process = this.emptyStrategyLogic;

	}


	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		//console.log( element._flexDirection._value );
		switch ( element._flexDirection._value ) {

			case 'column-reverse':
			case 'column':
				this._process = _column.bind( this );
				break;


			case 'row-reverse':
			case 'row':
				this._process = _row.bind( this );
				break;

		}

		switch ( this._value ) {
			case 'end':
				this._computeOffset = _justificationOffsetEnd;
				this._computeMargin = _justificationMargin;
				break;

			case 'center':
				this._computeOffset = _justificationOffsetCenter;
				this._computeMargin = _justificationMargin;
				break;

			case 'start':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMargin;
				break;

			case 'space-between':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMarginSpaceBetween;
				break;

			case 'space-around':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMarginSpaceAround;
				break;

			case 'space-evenly':
				this._computeOffset = _justificationOffset;
				this._computeMargin = _justificationMarginSpaceEvenly;
				break;
		}

		// @TODO : 	If flexDirection was keeping its children position,
		//  				it won't be necessary to compute the same result again
		//					but it will increase the memory footprint
		element._flexDirection._needsProcess = true;

	}

	process( element ) {

		this._process( element );

		element._alignItems._needsProcess = true; // not mandatory : Layout could sum each

	}

}

function _row( element ) {

	const startPos = element._flexDirection._offset;

	const { usedDirectionSpace, remainingSpace } = _rowRemainingSpace( element );

	// Items Offset
	const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
	const justificationOffset = this._computeOffset( axisOffset );

	// Items margin
	// const justificationMargins = _getJustificationMargin( boxComponent.childrenBoxes, remainingSpace, JUSTIFICATION, REVERSE );
	const justificationMargins = this._computeMargin( element, remainingSpace, element._flexDirection._reverse );


	// Apply
	element._children._boxes.forEach( ( child, childIndex ) => {

		element._layouter._childrenPos[ child.id ].x -= justificationOffset - justificationMargins[ childIndex ];

	} );

}

function _column( element ) {


	const startPos = element._flexDirection._offset;

	const { usedDirectionSpace, remainingSpace } = _columnRemainingSpace( element );

	// Items Offset
	const axisOffset = ( startPos * 2 ) - ( usedDirectionSpace * Math.sign( startPos ) );
	const justificationOffset = this._computeOffset( axisOffset );

	// Items margin
	const justificationMargins = this._computeMargin( element, remainingSpace, element._flexDirection._reverse );

	// Apply
	element._children._boxes.forEach( ( child, childIndex ) => {

		element._layouter._childrenPos[ child.id ].y -= justificationOffset - justificationMargins[ childIndex ];

	} );

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

/**
 *
 * @param {MeshUIBaseElement} element
 * @return {{usedDirectionSpace: *, remainingSpace: number}}
 * @private
 */
function _rowRemainingSpace( element ) {

	const usedDirectionSpace = element._bounds._computeChildrenSideWidth( element );
	return { usedDirectionSpace, remainingSpace: element._bounds._innerWidth - usedDirectionSpace };

}

function _columnRemainingSpace( element ) {

	const usedDirectionSpace = element._bounds._computeChildrenSideHeight( element );
	return { usedDirectionSpace, remainingSpace: element._bounds._innerHeight - usedDirectionSpace };

}


/* eslint-disable no-unused-vars */ function _justificationOffset( axisOffset ) { /* eslint-enable no-unused-vars */

	return 0;

}

function _justificationOffsetEnd( axisOffset ) {

	return axisOffset;

}

function _justificationOffsetCenter( axisOffset ) {

	return axisOffset / 2;

}

/* eslint-disable no-unused-vars */
function _justificationMargin( element, availableSpace = 0, reverse = 1 ) { /* eslint-enable no-unused-vars */

	return Array( element._children._boxes.length ).fill( 0 );

}

function _justificationMarginSpaceBetween( element, availableSpace = 0, reverse = 1 ) {

	const boxes = element._children._boxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {

		// only one children would act as start
		if ( length > 1 ) {

			const margin = availableSpace / ( length - 1 ) * reverse;
			// set this margin for any children

			// except for first child
			justificationMargins[ 0 ] = 0;

			for ( let i = 1; i < length; i++ ) {

				justificationMargins[ i ] = margin * i;

			}

		}

	}

	return justificationMargins;

}

function _justificationMarginSpaceEvenly( element, availableSpace = 0, reverse = 1 ) {

	const boxes = element._children._boxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {

		const margin = availableSpace / ( length + 1 ) * reverse;

		// set this margin for any children
		for ( let i = 0; i < length; i++ ) {

			justificationMargins[ i ] = margin * ( i + 1 );

		}

	}

	return justificationMargins;

}

function _justificationMarginSpaceAround( element, availableSpace = 0, reverse = 1 ) {

	const boxes = element._children._boxes;
	const length = boxes.length;
	const justificationMargins = Array( length ).fill( 0 );

	if ( availableSpace > 0 ) {


		const margin = availableSpace / ( length ) * reverse;

		const start = margin / 2;
		justificationMargins[ 0 ] = start;

		// set this margin for any children
		for ( let i = 1; i < length; i++ ) {

			justificationMargins[ i ] = start + margin * i;

		}


	}

	return justificationMargins;

}

;// CONCATENATED MODULE: ./src/frame/Frame.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

let _hiddenMaterial;

/**
 * Returns a basic plane mesh.
 */
class Frame extends external_three_namespaceObject.Mesh {

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	constructor( element) {

		const slice = element.slice;
		const slices = {};

		let w =1, h=1;

		if( slice ) {
			const segments = 1;

			w = slice.width ? slice.width : 1;
			h = slice.height ? slice.height : 1;

			if ( slice.top ) {
				if ( slice.left ) {
					const topLeftGeometry = new external_three_namespaceObject.PlaneGeometry( slice.left*w, slice.top*h, segments, segments );
					_sliceUV( topLeftGeometry, 0, slice.left, 1 - slice.top, 1 );
					topLeftGeometry.translate( slice.left * w / 2, -slice.top*h / 2, 0 );
					slices.topLeft = topLeftGeometry;
				}

				const topGeometry = new external_three_namespaceObject.PlaneGeometry( 1, slice.top*h, segments, segments );
				_sliceUV( topGeometry, slice.left, 1 - slice.right, 1 - slice.top, 1 );
				topGeometry.translate( 0, -slice.top*h / 2, 0 );
				slices.top = topGeometry;

				if ( slice.right ) {
					const topRightGeometry = new external_three_namespaceObject.PlaneGeometry( slice.right*w, slice.top*h, segments, segments );
					_sliceUV( topRightGeometry, 1 - slice.right, 1, 1 - slice.top, 1 );
					topRightGeometry.translate( -slice.right*w / 2, -slice.top*h / 2, 0 );
					slices.topRight = topRightGeometry;
				}

			}

			if ( slice.left ) {
				const leftGeometry = new external_three_namespaceObject.PlaneGeometry( slice.left*w, 1, segments, segments )
				_sliceUV( leftGeometry, 0, slice.left, slice.bottom, 1 - slice.top );
				leftGeometry.translate( slice.left * w / 2, 0, 0 );
				slices.left = leftGeometry;
			}

			const center = new external_three_namespaceObject.PlaneGeometry( 1, 1, segments, segments );
			_sliceUV( center, slice.left, 1 - slice.right, slice.bottom, 1 - slice.top );
			// center.translate( 0,0,-0.1)
			slices.middle = center;

			if ( slice.right ) {
				const rightGeometry = new external_three_namespaceObject.PlaneGeometry( slice.right*w, 1, segments, segments );
				_sliceUV( rightGeometry, 1 - slice.right, 1, slice.bottom, 1 - slice.top );
				rightGeometry.translate( -slice.right * w/ 2, 0, 0 );
				slices.right = rightGeometry;
			}

			if ( slice.bottom ) {

				if ( slice.left ) {
					const bottomLeftGeometry = new external_three_namespaceObject.PlaneGeometry( slice.left * w, slice.bottom * h, segments, segments );
					_sliceUV( bottomLeftGeometry, 0, slice.left, 0, slice.bottom );
					bottomLeftGeometry.translate( slice.left * w / 2, slice.bottom * h / 2, 0 )
					slices.bottomLeft = bottomLeftGeometry;
				}

				const bottomGeometry = new external_three_namespaceObject.PlaneGeometry( 1, slice.bottom * h, segments, segments );
				_sliceUV( bottomGeometry, slice.left, 1 - slice.right, 0, slice.bottom );
				bottomGeometry.translate( 0, slice.bottom * h / 2, 0 )
				slices.bottom = bottomGeometry;

				if ( slice.right ) {
					const bottomRightGeometry = new external_three_namespaceObject.PlaneGeometry( slice.right * w, slice.bottom * h, segments, segments );
					_sliceUV( bottomRightGeometry, 1 - slice.right, 1, 0, slice.bottom );
					bottomRightGeometry.translate( -slice.right * w / 2, slice.bottom * h / 2, 0 )
					slices.bottomRight = bottomRightGeometry;
				}
			}
		}

		let material = element.backgroundMaterial;
		if( slice ){
			if( !_hiddenMaterial ) _hiddenMaterial = new external_three_namespaceObject.MeshBasicMaterial({alphaTest:1.1});
			material = _hiddenMaterial;
		}


		const geometry = new external_three_namespaceObject.PlaneGeometry( 1, 1, element._segments.value, element._segments.value );

		// Add additional uv for borders computations by copying initial uv
		const uvB = new external_three_namespaceObject.BufferAttribute( new Float32Array( geometry.getAttribute('uv').array ), 2);
		geometry.setAttribute('uvB', uvB ).name = 'uvB';

		super( geometry, material );
		this.name = 'UIBackgroundBox';


		if( slice ) {

			this.slice = slice;
			this.sliceSize = new external_three_namespaceObject.Vector3( 1 - ( slice.left + slice.right ), 1 - ( slice.bottom + slice.top ), 1 )
			this.sliceScale = new external_three_namespaceObject.Vector3(w,h,1);

			// build slice meshes
			for ( const sliceSide in slices ) {

				const slice = new external_three_namespaceObject.Mesh( slices[ sliceSide ], element.backgroundMaterial );
				this.add( slice );
				slices[ sliceSide ] = slice;

			}

			this.updateScale = this.updateScaleSlice;

			this.slices = slices;
		}

	}

	updateScale(){}

	updateScaleSlice(){

		const s = new external_three_namespaceObject.Vector3(1,1,1);
		if( this.scale.x < (this.slice.left+this.slice.right)* this.sliceScale.x ){
			s.x = this.scale.x / ((this.slice.left+this.slice.right) * this.sliceScale.x);
		}

		if( this.scale.y < (this.slice.bottom+this.slice.top)* this.sliceScale.y ){
			s.y = this.scale.y / ((this.slice.bottom+this.slice.top) * this.sliceScale.y);
		}

		for ( const sliceSide in this.slices ) {
			const slice = this.slices[sliceSide];

			// Invert size to have constant
			slice.scale.set( 1/this.scale.x, 1/this.scale.y, this.scale.y )

			const offset = _slicePositions[sliceSide];
			for ( const offsetAxis in offset ) {
				slice.position[offsetAxis] = this.scale[offsetAxis] * offset[offsetAxis] * slice.scale[offsetAxis];
			}

			const scale = _sliceScales[sliceSide];
			if( scale ) {

				// offset
				if( scale.x ){
					slice.position.x = this.sliceScale.x * 0.5 * (this.slice.left - this.slice.right) * (1/this.scale.x);
				}

				if( scale.y ){
					slice.position.y = this.sliceScale.y *0.5 * (this.slice.bottom - this.slice.top) * (1/this.scale.y);
				}

				for ( const scaleAxis in scale ) {

					const natural = this.scale[scaleAxis]-((1-this.sliceSize[scaleAxis])*this.sliceScale[scaleAxis])
					slice.scale[ scaleAxis ] = Math.max(0,natural * (1/this.scale[scaleAxis]) ) ;

				}
			}
		}

		if( s.x !== 1){
			this.slices.left.scale.x *= s.x;
			this.slices.topLeft.scale.x *= s.x;
			this.slices.bottomLeft.scale.x *= s.x;
			this.slices.right.scale.x *= s.x;
			this.slices.topRight.scale.x *= s.x;
			this.slices.bottomRight.scale.x *= s.x;
		}

		if( s.y !== 1){
			this.slices.top.scale.y *= s.y;
			this.slices.topLeft.scale.y *= s.y;
			this.slices.topRight.scale.y *= s.y;
			this.slices.bottom.scale.y *= s.y;
			this.slices.bottomLeft.scale.y *= s.y;
			this.slices.bottomRight.scale.y *= s.y;
		}

	}
}


const _slicePositions = {
	topLeft: {x:-0.5,y:0.5},
	top: {y:0.5},
	topRight: {x:0.5,y:0.5},
	left: {x:-0.5},
	right: {x:0.5},
	bottomLeft: {x:-0.5,y:-0.5},
	bottom: {y:-0.5},
	bottomRight : {x:0.5,y:-0.5}
}

const _sliceScales = {
	top: {x:1},
	left: {y:1},
	right: {y:1},
	bottom: {x:1},
	middle:{x:1,y:1}
}

function _sliceUV( geometry, uMin, uMax, vMin, vMax ){

	const uLength = uMax-uMin;
	const vLength = vMax-vMin;

	const uvAttribute = geometry.attributes.uv;

	for ( let i = 0; i < uvAttribute.count; i ++ ) {

		const u = uvAttribute.getX( i );
		const v = uvAttribute.getY( i );

		uvAttribute.setXY( i, uMin + u*uLength, vMin + v*vLength );

	}

	// Add additional uv for borders computations by copying initial uv
	const uvB = new external_three_namespaceObject.BufferAttribute( new Float32Array( geometry.getAttribute('uv').array ), 2);
	geometry.setAttribute('uvB', uvB ).name = 'uvB';

}

;// CONCATENATED MODULE: ./src/core/properties/rendering/RendererPropertyBox.js



class RendererPropertyBox extends BaseProperty{

	constructor() {

		super( 'renderer' );

	}


	render( element ) {

		if( !element._backgroundMesh ) {

			element.setBackgroundMesh( new Frame(element) );

		}

		element.performAfterUpdate();

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/PositionPropertyBox.js


class PositionPropertyBox extends PositionProperty {

	constructor( ) {

		super( 'position');

	}

	update( element, out ) {

		super.update( element, out );

		this._needsProcess = true;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/AutoSizePropertyBox.js


/**
 * Autosize are only trigger when natural size changed
 */
class AutoSizePropertyBox extends BaseProperty {

	constructor() {

		super( 'autosize' );

		this._needsProcess = true;
	}

	process( element ) {

		// if( parent ) return;


		// has auto size get the height from children
		if ( element._width._auto ) _processAutoWidth( element );
		if ( element._height._auto ) _processAutoHeight( element );

		const stretch = element._alignItems._value === 'stretch';
		const stretchChildrenWidth = stretch && element._flexDirection._value.indexOf( 'column' ) !== -1;
		const stretchChildrenHeight = stretch && !stretchChildrenWidth;

		for ( const box of element._children._boxes ) {

			if ( ( box._width._auto && stretchChildrenWidth ) || box._width._relative ) {

				box._bounds.setReferenceWidth( box, element._bounds._innerWidth );

			}

			if ( ( box._height._auto && stretchChildrenHeight ) || box._height._relative ) {

				box._bounds.setReferenceHeight( box, element._bounds._innerHeight );

			}

		}

		// // justify stretch - Not that easy
		// const stretchD = element._justifyContent._value === 'stretch';
		// const stretchChildrenWidthD = stretchD && element._flexDirection._value.indexOf( 'row' ) !== -1;
		// const stretchChildrenHeightD = stretchD && !stretchChildrenWidthD;
		//
		//
		// if ( stretchChildrenWidthD ) {
		//
		// 	const used = _computeChildrenSideWidth( element );
		// 	const available = element._bounds._innerWidth - used;
		// 	if ( available > 0 ) {
		//
		// 		const autoElement = element._children._uis.filter( c => c._width._auto );
		// 		const distributed = available / autoElement.length;
		//
		// 		for ( const child of autoElement ) {
		//
		// 			const width = child._bounds._offsetWidth + distributed;
		// 			child._bounds.setReferenceWidth( child, width );
		//
		// 		}
		//
		// 		element._layouter._needsProcess = true;
		// 		element._flexDirection._needsProcess = true;
		//
		// 	}
		//
		// } else if ( stretchChildrenHeightD ) {
		//
		// 	const used = _computeChildrenSideHeight( element );
		// 	const available = element._bounds._innerHeight - used;
		// 	if ( available > 0 ) {
		//
		// 		const autoElement = element._children._uis.filter( c => c._height._auto );
		// 		const distributed = available / autoElement.length;
		//
		// 		for ( const child of autoElement ) {
		//
		// 			const height = child._bounds._offsetHeight + distributed;
		// 			child._bounds.setReferenceHeight( child, height );
		//
		// 		}
		//
		// 		element._layouter._needsProcess = true;
		// 		element._flexDirection._needsProcess = true;
		//
		// 	}
		//
		// }


	}

}

function _processAutoWidth( element ) {

	// column : retrieve the biggest child width
	// row : retrieve the sum of children width
	element._bounds.setChildrenWidth( element, _computeAutoWidth( element ) );

}

function _processAutoHeight( element ) {

	// column : retrieve the sum of children height
	// row : retrieve the biggest child height
	element._bounds.setChildrenHeight( element, _computeAutoHeight( element ) );

}

/**
 * Retrieve the automatic height from children boxes
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeAutoHeight( element ) {

	switch ( element._flexDirection._value ) {

		case 'row' :
		case 'row-reverse' :
			return _computeHighestChildHeight( element );


		case 'column' :
		case 'column-reverse' :
			return AutoSizePropertyBox_computeChildrenSideHeight( element );

	}

}

/**
 * @param {MeshUIBaseElement} element
 * @return {number}
 *
 */
function _computeAutoWidth( element ) {

	switch ( element._flexDirection._value ) {

		case 'row' :
		case 'row-reverse' :
			return AutoSizePropertyBox_computeChildrenSideWidth( element );


		case 'column' :
		case 'column-reverse' :
			return _computeHighestChildWidth( element );

	}

}

/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function AutoSizePropertyBox_computeChildrenSideWidth( element ) {

	let sumWidth = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const width = box._bounds._offsetWidth + margin.y + margin.w;

		sumWidth += width;

	}

	return sumWidth;

}

/**
 * Return the sum of all this component's children width
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function AutoSizePropertyBox_computeChildrenSideHeight( element ) {

	let sumHeight = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const height = box._bounds._offsetHeight + margin.x + margin.z;

		sumHeight += height;

	}

	return sumHeight;

}

/**
 * Returns the highest linear dimension among all the children of the passed component
 * MARGIN INCLUDED
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeHighestChildWidth( element ) {

	let maxWidth = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const width = box._bounds._offsetWidth + margin.y + margin.w;

		if ( width > maxWidth ) maxWidth = width;

	}

	return maxWidth;

}

/**
 * Returns the highest linear dimension among all the children of the passed component
 * MARGIN INCLUDED
 * @param {MeshUIBaseElement} element
 * @return {number}
 */
function _computeHighestChildHeight( element ) {

	let maxHeight = 0;
	for ( const box of element._children._boxes ) {

		if ( box._position._value !== 'static' ) continue;

		const margin = box._margin._value;
		const height = box._bounds._offsetHeight + margin.x + margin.z;

		if ( height > maxHeight ) maxHeight = height;

	}

	return maxHeight;

}

;// CONCATENATED MODULE: ./src/elements/basic/BoxElement.js












//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class BoxElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	constructor( properties, values) {

		BoxElement.definePropertiesValues( properties, values );

		super( properties, values );

		BoxElement.init( this );

	}

	/**
	 * When the backgroundMesh has been set, bind properties
	 * @override
	 */
	bindBackgroundMeshProperties () {

		// bind the background scale with bounds
		this._bounds._size = this._backgroundMesh.scale;
		this._bounds._needsProcess = true;

	}

	/**
	 * When the backgroundMesh has been unset, unbind properties
	 * @override
	 */
	unbindBackgroundMeshProperties () {

		// detach bounds size
		this._bounds._size = new external_three_namespaceObject.Vector3(1,1,1);
		this._bounds._needsProcess = true;

	}


	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {

		// customize property
		if( !properties.children ) properties.children = ChildrenBox;
		if( !properties.bounds ) properties.bounds = BoundsBox;
		if( !properties.flexDirection ) properties.flexDirection = FlexDirectionPropertyBox;
		if( !properties.justifyContent ) properties.justifyContent = JustifyContentPropertyBox;
		if( !properties.alignItems ) properties.alignItems = AlignItemsPropertyBox;
		if( !properties.position ) properties.position = PositionPropertyBox;
		if( !properties.autoSize ) properties.autoSize = AutoSizePropertyBox;

		if( !properties.renderer ) properties.renderer = RendererPropertyBox;


		// configure
		// /* ie: * /if ( !values.width ) values.width = '100%';


		// break inheritance chains
		if ( !values.fontSide ) values.fontSide = 0; // FrontSide;
		if ( !values.invertAlpha ) values.invertAlpha = false;
		if ( !values.fontCastShadow ) values.fontCastShadow = false;
		if ( !values.fontReceiveShadow ) values.fontReceiveShadow = false;
		if ( !values.backgroundCastShadow ) values.backgroundCastShadow = false;
		if ( !values.backgroundReceiveShadow ) values.backgroundReceiveShadow = false;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init( element ) {

		Object.defineProperties( element, {
				isBox: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);


		element.backgroundMaterial = new FrameMaterial();
		element._renderer.render( element );

		element._backgroundMesh.visible = false;

	}

}

;// CONCATENATED MODULE: ./src/core/elements/glyphs/Line.js
//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


/**
 * Line represents an horizontal combination of positioned inlines with additional properties
 */
class Line extends Array {

	/**
	 *
	 * @param {Inline[]} items
	 */
	constructor(...items) {
		super(...items);

		/**
		 * The width of this line
		 * @type {number}
		 */
		this.width = 0;

		/**
		 * The maximum lineBase of this line of inlines
		 * @type {number}
		 */
		this.lineBase = 0;

		/**
		 * The maximum lineHeight of this line of inlines
		 * @type {number}
		 */
		this.lineHeight = 0;

		/**
		 * The vertical position of this line
		 * @type {number}
		 */
		this.y = 0;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/BoxLayouter.js


//JSDoc related imports
/* eslint-disable no-unused-vars */



/* eslint-enable no-unused-vars */

class BoxLayouter extends BaseProperty {

	constructor() {

		super( 'layouter', null, false);

		// configure
		this._needsUpdate = true;

		/**
		 * @typedef ChildrenPos
		 * @type {Object & Object.<string,Vector3>}
		 */

		/**
		 *
		 * @type {ChildrenPos}
		 * @internal
		 */
		this._childrenPos = {};

	}


	/* eslint-disable no-unused-vars */
	/**
	 * Updated when :
	 * 	- New child added
	 * 	- Child removed
	 * 	- Child position changed
	 * 	- Child visibility changed
	 * 	- ...?
	 * 	@override
	 */
	update( element, out ) { 	/* eslint-enable no-unused-vars */

		//console.log( "BoxLayouter update", element.name );
		// reset
		this._childrenPos = {};

		for ( const uiBoxElement of element._children._boxes ) {

			//console.log( uiBoxElement._position._value )
			if( uiBoxElement._position._value === 'static' ) {

				// bind position
				this._childrenPos[ uiBoxElement.id ] = uiBoxElement.position;

			}

		}

	}

	/**
	 *
	 * @override
	 */
	/* eslint-disable no-unused-vars */ process( element ) { 	/* eslint-enable no-unused-vars */

		// As _childrenPos are bounds with child.position, this is not required anymore
		//
		// element._position._needsProcess = true;
		//
		// for ( const box of element._children._boxes ) {
		//
		// 	if( this._childrenPos[box.id] ) {
		//
		// 		box.position.x = this._childrenPos[box.id].x;
		// 		box.position.y = this._childrenPos[box.id].y;
		//
		// 	}
		//
		// }

	}

}

;// CONCATENATED MODULE: ./src/elements/basic/BlockElement.js



//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */


class BlockElement extends BoxElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 */
	constructor( values = {} ) {

		const properties = {};
		BlockElement.definePropertiesValues( properties, values );

		super( properties , values );

		BlockElement.init( this );


	}

	/* eslint-disable no-unused-vars */
	/**
	 * A Block Element can only contains box elements
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) {
		/* eslint-enable no-unused-vars */

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI || argument.isBox ) {

				validChildren.push( argument );

			} else {

				console.warn( 'Block element can only contain Box elements.', argument );

			}

		}

		return super.add( ...validChildren );

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {  /* eslint-enable no-unused-vars */

		properties.layouter = BoxLayouter;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init ( element ) {

		Object.defineProperties( element , {
				isBlock: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

	}

}

;// CONCATENATED MODULE: ./src/core/properties/InlinesProperty.js



//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class InlinesProperty extends BaseProperty{

	constructor() {

		super( "inlines", null, false );

		/**
		 *
		 * @type {Array.<Inline>}
		 * @private
		 */
		this._value = null;

		// value

		// 3. Inlines
		// this._textContentInlines = this._textContentGlyphs.map( ( glyphBox ) => glyphBox.asInlineGlyph() );

		// 4. kerning
		// this._buildContentKernings();


		// 5.? Apply margin and padding on first and last inlines
		// if( this._textContentInlines.length ) {
		//
		// 	// First gets left side
		// 	this._textContentInlines[0].paddingLeft = this._padding.w;
		// 	this._textContentInlines[0].marginLeft = this._margin.w;
		//
		// 	// Last gets right side
		// 	const lastIndex = this._textContentInlines.length - 1;
		// 	this._textContentInlines[lastIndex].paddingRight = this._padding.y;
		// 	this._textContentInlines[lastIndex].marginRight = this._margin.y;
		//
		// }

	}

	process( element ) {

		this._value = element._glyphs._value.map( ( glyphBox ) => glyphBox.asInlineGlyph() );

		if( this._value.length ) {

			// First gets left side
			this._value[0].paddingLeft = element._padding._value.w;
			this._value[0].marginLeft = element._margin._value.w;

			// Last gets right side
			const lastIndex = this._value.length - 1;
			this._value[lastIndex].paddingRight = element._padding._value.y;
			this._value[lastIndex].marginRight = element._margin._value.y;

		}


		element._fontSize._needsProcess = true;
		element._lineBreak._needsProcess = true;
		element._fontKerning._needsProcess = true;
		element._layouter._needsProcess = true;

	}

	/**
	 *
	 * @return {Array.<Inline>}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/GlyphsProperty.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class GlyphsProperty extends BaseProperty{

	constructor() {

		super( "glyphs", null, false);

		this._needsUpdate = false;

		/**
		 *
		 * @type {Array.<TypographicGlyph>}
		 * @private
		 */
		this._value = null;

		// value

		// 1. collapsed whiteSpace;
		// this._textContent = Whitespace.collapseWhitespaceOnString( this.content, this.getWhiteSpace() );

		// 2. glyphs
		// this._textContentGlyphs = this._textContent.split( '' ).map( ( char ) => this._font.getTypographicGlyph( char ) );

		// 3. Inlines
		// this._textContentInlines = this._textContentGlyphs.map( ( glyphBox ) => glyphBox.asInlineGlyph() );

		// 4. kerning
		// this._buildContentKernings();


		// 5.? Apply margin and padding on first and last inlines
		// if( this._textContentInlines.length ) {
		//
		// 	// First gets left side
		// 	this._textContentInlines[0].paddingLeft = this._padding.w;
		// 	this._textContentInlines[0].marginLeft = this._margin.w;
		//
		// 	// Last gets right side
		// 	const lastIndex = this._textContentInlines.length - 1;
		// 	this._textContentInlines[lastIndex].paddingRight = this._padding.y;
		// 	this._textContentInlines[lastIndex].marginRight = this._margin.y;
		//
		// }

	}

	process( element ) {

		if( !element._font._fontVariant ) return;
		if( !element._font._fontVariant.isReady ) return;

		this._value = element._whiteSpace._whiteSpacedContent.split( '' ).map( ( char ) => element._font._fontVariant.getTypographicGlyph( char ) );

		// @TODO : Even if the value is removed it should trigger a rebuild.
		if( this._value ) element._inlines._needsProcess = true;

	}

	/**
	 *
	 * @return {Array.<TypographicGlyph>}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/ColorProperty.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class ColorProperty extends StyleColorProperty {

	constructor( ) {

		super( 'color', 'inherit', false );

		this.output = this._outputValue;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		if( this._input === 'inherit' ) {

			this._value.set( this.getInheritedInput( element ) );

		} else {

			this._value.set( this._input);

		}

	}

}

;// CONCATENATED MODULE: ./src/core/properties/LineBreakProperty.js



//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

class LineBreakProperty extends BaseProperty{

	constructor( defaultValue = "- ,.:?!\n" ) {

		super( "lineBreak", defaultValue, true );

		/**
		 *
		 * @type {"mandatory"|"possible"|null}
		 * @private
		 */
		this._newLineBreakability = null;


	}

	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */

		this._needsProcess = true;

	}

	process( element ) {

		const newLineBreakability = element._whiteSpace._newLineBreakability;

		if( !element._inlines._value ) return;

		// update inlines properties before inline placements in lines
		for ( let i = 0; i < element._inlines._value.length; i++ ) {


			const inline = element._inlines._value[ i ];
			const char = inline.char;

			// Whitespace Breakability ---------------------------------------------------------------------------------------
			let lineBreak = null;

			// could be inlineBlock without char
			if( char !== undefined ) {

				// @question : Does it worth to be strategy? I don't really think so
				if ( newLineBreakability !== 'nowrap' ) {

					if ( this._value.includes( char ) || char.match( /\s/g ) ) lineBreak = 'possible';

				}

				if ( char.match( /\n/g ) ) {

					lineBreak = newLineBreakability;

				}

			}

			inline.lineBreak = lineBreak;

		}

	}

	/**
	 * @override
	 * @return {string}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/InlineLayouter.js


class InlineLayouter extends BaseProperty {

	constructor() {

		super( 'layouter', null, false );

		/**
		 *
		 * @type {MeshUIBaseElement}
		 * @private
		 */
		this._value = null;

	}


	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */

		// find the first text parent;
		this._value = element._parent.find( (p) => { return p.isUI && p.isText } );

		this._needsProcess = true;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 */
	process( element ) { 	/* eslint-enable no-unused-vars */


		// layout has been changed
		if( this._value ) {

			this._value._layouter._needsProcess = true;

		}

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/background/BackgroundColorPropertyInline.js


//JSDoc related imports
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

class BackgroundColorPropertyInline extends StyleColorProperty {

	constructor( defaultValue ) {

		super( 'backgroundColor', defaultValue, false );

		this._allowsInherit = false;

		this._input = 0x000000;


	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		// @TODO : Changes multiple mesh visibility
		// element._backgroundMesh.visible = !(this._input === 'none' || this._input === 'transparent');

		if( this._input === 'inherit' ) {

			this._value.set(this.getInheritedInput( element ));

		} else {

			this._value.set( this._input );

		}

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontStylePropertyInline.js



class FontStylePropertyInline extends FontStyleProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;
	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontWeightPropertyInline.js



class FontWeightPropertyInline extends FontWeightProperty {

	constructor() {

		super();

	}

	computeOutputValue( element ) {

		this._value = uniformizeFontWeight( this.getInheritedInput( element )	);

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontFamilyPropertyInline.js





class FontFamilyPropertyInline extends FontFamilyProperty {

	constructor( ) {

		super( 'fontFamily', 'inherit' , true );

		this._input = 'inherit';
		this._needsUpdate = true;

		// configure
		this._allowsInherit = false;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 */
	computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		let abstractedInput = this._inheritedInput;

		if( abstractedInput === 'inherit' ) {
			abstractedInput = this.getInheritedInput( element );
		}

		if( abstractedInput instanceof FontFamily ) {

			this._value = abstractedInput;
			element._font._needsUpdate = true;

		} else if ( typeof abstractedInput === 'string' ) {

			// string - family
			const fontFamily = font_FontLibrary.getFontFamily(abstractedInput);

			if( fontFamily ) {

				this._value = fontFamily;
				element._font._needsUpdate = true;

			} else {

				console.warn( `(.style) fontFamily, the font '${abstractedInput}' is not registered. Aborted.`)

			}

		} else {

			console.warn( `(.style) fontFamily requires a registered fontFamily instance, or the id of a registered fontFamily.`);
			console.warn( `If you want to set a specific font, please use .font property instead.`);

		}

	}

	/**
	 * @override
	 * @return {any|FontFamilyPropertyInline|null}
	 */
	get value() { return this._value; }

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/WhiteSpacePropertyInline.js


/**
 * @typedef  StringCollapserStrategy
 * @type {(textContent:{string}) => string}
 */


/**
 * @typedef  InlineCollapserStrategy
 * @type {(line:{Line}) => number }
 */


/**
 * @typedef InlineWrapperStrategy
 * @type {(inlines:{Array}, i:{number}, lastInlineOffset:{number}, options:Object<string,any>) => boolean}
 */

class WhiteSpacePropertyInline extends WhiteSpaceProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;

		this._whiteSpacedContent = '';

		// strategies

		/**
		 *
		 * @type {StringCollapserStrategy}
		 * @internal
		 */
		this._stringCollapser = this.emptyStrategyLogic;

		/**
		 *
		 * @type {InlineCollapserStrategy}
		 * @internal
		 */
		this._inlineCollapser = this.emptyStrategyLogic;

		/**
		 *
		 * @type {InlineWrapperStrategy}
		 * @internal
		 */
		this._inlineWrapper = this.emptyStrategyLogic;
	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param element
	 * @private
	 */
	_computeFromInherited( element ) { /* eslint-enable no-unused-vars */
		super._computeFromInherited( element );

		// set strategies
		this._newLineBreakability = _newlineBreakability( this._value );

		// REDO Whitespace Matrix
		// https://developer.mozilla.org/en-US/docs/Web/CSS/white-space

		switch ( this._value ) {

			case 'nowrap':
			case 'normal':
				this._stringCollapser = _stringCollapseNewLine;
				break;

			case 'pre-line':
				this._stringCollapser = _stringCollapseMultipleSpace;
				break;

			default:
				this._stringCollapser = _stringCollapseNothing;

		}

		switch ( this._value ) {

			case 'pre-line':
			case 'nowrap':
			case 'normal':
				this._inlineCollapser = _inlineCollapseMultiple;
				break;

			case 'pre-wrap':
				this._inlineCollapser = _inlineCollapseSingle;
				break;

			default:
				this._inlineCollapser = _inlineCollapseNothing;

		}

		switch ( this._value ) {

			case 'pre-line':
			case 'pre-wrap':
			case 'normal':
				this._inlineWrapper = _lineBreakerWrapText;
				break;

			case 'pre':
				this._inlineWrapper = _lineBreakerLineBreakOnly;
				break;

			default:
				this._inlineWrapper = _lineBreakerNoWrap;

		}


		this._needsProcess = true;

	}


	process( element ) {

		// @TODO: Make a property for Text -> inlineCollapser
		if( element.isInline && !element.isInlineBlock ) {

			this._whiteSpacedContent = this._stringCollapser( element._textContent._value );

			element._glyphs._needsProcess = true;

		}
	}

}

/***********************************************************************************************************************
 * STRATEGIES
 **********************************************************************************************************************/

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace#whitespace_helper_functions
 *
 * Throughout, whitespace is defined as one of the characters
 *  "\t" TAB \u0009
 *  "\n" LF  \u000A
 *  "\r" CR  \u000D
 *  " "  SPC \u0020
 *
 * This does not use Javascript's "\s" because that includes non-breaking
 * spaces (and also some other characters).
 **/
const WHITE_CHARS = { '\t': '\u0009', '\n': '\u000A', '\r': '\u000D', ' ': '\u0020' };

/**
 * Get the breakability of a newline character according to white-space property
 *
 * @param whiteSpace
 * @returns {string|null}
 */
const _newlineBreakability = function ( whiteSpace ) {

	switch ( whiteSpace ) {

		case 'pre':
		case 'pre-wrap':
		case 'pre-line':
			return 'mandatory';
	}

	// case NOWRAP:
	// case NORMAL:
	// default:

	return null;

};


// STRING COLLAPSER -----------------------------------------------------

/**
 * Treat newlines as spaces
 * @param textContentValue
 * @return {*}
 * @private
 *
 */
function _stringCollapseNewLine( textContentValue ) {

	return _stringCollapseMultipleSpace( textContentValue.replace( /\n/g, ' ' ) );

}

/**
 * Treat sequences of spaces as only one space
 * @param textContentValue
 * @return {*}
 * @private
 */
function _stringCollapseMultipleSpace( textContentValue ) {

	return textContentValue.replace( /[ ]{2,}/g, ' ' );

}

/**
 *
 * @param textContentValue
 * @return {*}
 * @private
 */
function _stringCollapseNothing ( textContentValue ) {
	return textContentValue;
}

// LineBreakers -----------------------------------------------------

/**
 *
 * @param inlines
 * @param i
 * @param lastInlineOffset
 * @param options
 * @return {boolean}
 * @private
 */
function _lineBreakerWrapText( inlines, i, lastInlineOffset, options ) {
	const inline = inlines[ i ];

	// prevent additional computation if line break is mandatory
	if ( inline.lineBreak === 'mandatory' ) return true;

	// ?? Missing letterSpacing ?
	// prevent additional computation if this character already exceed the available size
	if ( lastInlineOffset + inline.xadvance + inline.xoffset + inline.kerning > options.INNER_WIDTH ) return true;


	const nextBreak = _distanceToNextBreak( inlines, i, options );
	return _shouldFriendlyBreak( inlines[ i - 1 ], lastInlineOffset, nextBreak, options );
}

/* eslint-disable no-unused-vars */
/**
 *
 * @param inlines
 * @param i
 * @param lastInlineOffset
 * @param options
 * @return {boolean}
 * @private
 */
function _lineBreakerLineBreakOnly( inlines, i, lastInlineOffset, options ) { /* eslint-enable no-unused-vars */

	return inlines[ i ].lineBreak === 'mandatory';

}

/**
 *
 * @return {boolean}
 * @private
 */
function _lineBreakerNoWrap() {
	return false;
}

// Inlines collapser -----------------------------------------------------

/**
 *
 * @param line
 * @return {number}
 * @private
 */
function _inlineCollapseSingle( line ) {
	if ( !line[ 0 ] ) return 0;

	const firstInline = line[ 0 ];
	const lastInline = line[ line.length - 1 ];

	// only process whiteChars glyphs inlines
	// if( firstInline.glyph && whiteChars[firstInline.glyph] && line.length > 1 ){
	if ( firstInline.char && firstInline.char === '\n' && line.length > 1 ) {
	// if ( firstInline.char && WHITE_CHARS[ firstInline.char ] && line.length > 1 ) {

		_collapseLeftInlines( [ firstInline ], line[ 1 ] );

	}

	// if( lastInline.glyph && whiteChars[lastInline.glyph] && line.length > 1 ){
	if ( lastInline.char && lastInline.char === '\n' && line.length > 1 ) {
	// if ( lastInline.char && WHITE_CHARS[ firstInline.char ] && line.length > 1 ) {

		_collapseRightInlines( [ lastInline ], line[ line.length - 2 ] );

	}

	return firstInline.offsetX;

}

function _inlineCollapseMultiple( line ) {

	if ( !line[ 0 ] ) return 0;

	let inlinesToCollapse = [];
	let collapsingTarget;
	// collect starting whitespaces to collapse
	for ( let i = 0; i < line.length; i++ ) {

		const inline = line[ i ];

		if ( inline.char && WHITE_CHARS[ inline.char ] && line.length > i ) {

			inlinesToCollapse.push( inline );
			collapsingTarget = line[ i + 1 ];
			continue;

		}

		break;

	}

	_collapseLeftInlines( inlinesToCollapse, collapsingTarget );


	inlinesToCollapse = [];
	collapsingTarget = null;
	// collect ending whitespace to collapse
	for ( let i = line.length - 1; i > 0; i-- ) {

		const inline = line[ i ];
		if ( inline.char && WHITE_CHARS[ inline.char ] && i > 0 ) {

			inlinesToCollapse.push( inline );
			collapsingTarget = line[ i - 1 ];
			continue;

		}

		break;

	}

	_collapseRightInlines( inlinesToCollapse, collapsingTarget );

	return line[ 0 ].offsetX;

}

/**
 *
 * @param line
 * @return {number|*}
 * @private
 */
function _inlineCollapseNothing( line ) {

	if ( !line[ 0 ] ) return 0;
	return line[ 0 ].offsetX;

}

/***********************************************************************************************************************
 * Internal logics
 **********************************************************************************************************************/


/**
 * Visually collapse inlines from right to left ( endtrim )
 * @param {Array} inlines
 * @param targetInline
 * @private
 */
function _collapseRightInlines( inlines, targetInline ) {

	if ( !targetInline ) return;

	for ( let i = 0; i < inlines.length; i++ ) {

		const inline = inlines[ i ];

		inline.fontFactor = 0;
		inline.offsetX = targetInline.offsetX + targetInline.cumulativeWidth;
		inline.cumulativeWidth = 0;

	}

}

/**
 * Visually collapse inlines from left to right (starttrim)
 * @param {Array} inlines
 * @param targetInline
 * @private
 */
function _collapseLeftInlines( inlines, targetInline ) {

	if ( !targetInline ) return;

	for ( let i = 0; i < inlines.length; i++ ) {

		const inline = inlines[ i ];

		inline.fontFactor = 0;
		// inline.offsetX += inline.cumulativeWidth;
		inline.offsetX = targetInline.offsetX;
		inline.cumulativeWidth = 0;

	}

}

/**
 * get the distance in world coord to the next glyph defined
 * as break-line-safe ( like whitespace for instance )
 * @private
 */
function _distanceToNextBreak( inlines, currentIdx, options, accu ) {

	accu = accu || 0;

	// end of the text
	if ( !inlines[ currentIdx ] ) return accu;

	const inline = inlines[ currentIdx ];

	// const kerning = inline.kerning ? inline.kerning : 0;
	// const xoffset = inline.xoffset ? inline.xoffset : 0;
	// const xadvance = inline.xadvance ? inline.xadvance : inline.width;

	// if inline.lineBreak is set, it is 'mandatory' or 'possible'
	if ( inline.lineBreak ) return accu + inline.xadvance;

	// no line break is possible on this character
	return _distanceToNextBreak(
		inlines,
		currentIdx + 1,
		options,
		accu + inline.xadvance + inline.xoffset + inline.kerning + options.LETTERSPACING
	);

}

/**
 * Test if we should line break here even if the current glyph is not out of boundary.
 * It might be necessary if the last glyph was break-line-friendly (whitespace, hyphen..)
 * and the distance to the next friendly glyph is out of boundary.
 */
function _shouldFriendlyBreak( prevChar, lastInlineOffset, nextBreak, options ) {

	// We can't check if last glyph is break-line-friendly it does not exist
	if ( !prevChar || !prevChar.char ) return false;

	// Next break-line-friendly glyph is inside boundary
	if ( lastInlineOffset + nextBreak < options.INNER_WIDTH ) return false;

	// Previous glyph was break-line-friendly
	return options.BREAKON.indexOf( prevChar.char ) > -1;

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/LetterSpacingPropertyInline.js


class LetterSpacingPropertyInline extends LetterSpacingProperty {

	constructor() {

		super();

		// configure
		this._input = 'inherit';
		this._allowsInherit = false;

		this.computeOutputValue = this._computeFromInherited;

	}

	_computeFromInherited( element ) {
		super._computeFromInherited( element );


		element._fontSize._needsProcess = true;
		element._layouter._needsProcess = true;

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontSizePropertyInline.js


class FontSizePropertyInline extends SubStyleProperty {

	constructor( ) {

		super( 'fontSize', 'inherit', true );

		// Configure
		this._allowsInherit = false;

	}

	computeOutputValue( element ) {

		this._value = this._inheritedInput;

		if( element._font._fontVariant ) {
			element._bounds._needsProcess = true;
			element._layouter._needsProcess = true;
		}

	}

	process( element ) {

		if( !element._font._fontVariant || !element._font._fontVariant.isReady ) return;

		const SCALE_MULT = this._value / element._font._fontVariant.typographic.size;

		// First character won't be kerned with its void lefthanded peer
		const inlines = element._inlines._value;

		// update inlines properties before inline placements in lines
		for ( let i = 0; i < inlines.length; i++ ) {

			const inline = inlines[ i ];

			inline.resetOffsets();

			inline.fontSize = this._value;
			inline.fontFactor = SCALE_MULT;

		}

		// element._layouter._needsProcess = true;

	}

	/**
	 *
	 * @return {number}
	 */
	get value() { return this._value; }

}



;// CONCATENATED MODULE: ./src/core/properties/geometry/SegmentsPropertyText.js


class SegmentsPropertyText extends SegmentsProperty {

	constructor() {

		super( 'segments', 1, false );

		this._notInheritedValue = undefined;

	}


	/* eslint-disable no-unused-vars */	update( element, out ) { 	/* eslint-enable no-unused-vars */

		this._notInheritedValue = this._value;
		if ( this._notInheritedValue === 'inherit' ) {

			this._notInheritedValue = this.getInheritedInput( element );

		}

		element._layouter._needsUpdate = true;

	}

	/**
	 *
	 * @param {number|"inherit"} v
	 */
	set value( v ) {

		if ( this._value === v ) return;

		this._value = v;
		this._needsUpdate = true;
	}

	/**
	 *
	 * @override
	 * @return {number}
	 */
	get value() {

		if ( this._value === 'inherit' ) return this._notInheritedValue;

		return this._value;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/geometry/SegmentsPropertyInline.js


class SegmentsPropertyInline extends SegmentsPropertyText {

	constructor() {

		super();

		this._value = 'inherit';

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontKerningPropertyInline.js



class FontKerningPropertyInline extends FontKerningProperty {

	constructor() {

		super();

		// Configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;
	}


	_computeFromInherited( element ) {
		super._computeFromInherited(element);

		// this._needsProcess = true;
		element._parent._value._layouter._needsProcess = false;
	}

	process( element ) {

		// apply kerning on inlines
		if ( this._value !== 'none' ) {

			// First character won't be kerned with its void lefthanded peer
			const whiteSpacedContent = element._whiteSpace._whiteSpacedContent;
			const inlines = element._inlines._value;
			for ( let i = 1; i < inlines.length; i++ ) {

				const glyphPair = whiteSpacedContent[ i - 1 ] + whiteSpacedContent[ i ];

				// retrieve the kerning from the font
				// as set it on the characterInline
				inlines[ i ].kerning = element._font._fontVariant.getKerningAmount( glyphPair );

			}

		}

	}

}

;// CONCATENATED MODULE: ./src/core/properties/hierarchy/ChildrenInline.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class ChildrenInline extends BaseProperty {

	constructor() {

		super( 'children', null, false );

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._uis = [];

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Update requested when :
	 * 		- New child has been added
	 * 		- Existing child has been removed
	 *
	 * @param element
	 * @param out
	 */
	update( element, out ) { /* eslint-enable no-unused-vars */

		// this._compute( element );
		//
		// this._needsProcess = true;

	}


	/* eslint-disable no-unused-vars */
	/**
	 * Process when :
	 * 		- Existing child visibility changed
	 *
	 * @param element
	 */
	process( element ) { /* eslint-enable no-unused-vars */

		// this._compute( element );

	}

	/* eslint-disable no-unused-vars */ _compute( element ) { /* eslint-enable no-unused-vars */

		// this._uis = element.children.filter( child => child.visible && child.isUI );
		//
		// this._inlines = this._uis.filter( child => child.isInline );

	}

	/**
	 *
	 */
	dispose() {

		// this._inlines = null;

	}

}

;// CONCATENATED MODULE: ./node_modules/three/examples/jsm/utils/BufferGeometryUtils.js


function computeMikkTSpaceTangents( geometry, MikkTSpace, negateSign = true ) {

	if ( ! MikkTSpace || ! MikkTSpace.isReady ) {

		throw new Error( 'BufferGeometryUtils: Initialized MikkTSpace library required.' );

	}

	if ( ! geometry.hasAttribute( 'position' ) || ! geometry.hasAttribute( 'normal' ) || ! geometry.hasAttribute( 'uv' ) ) {

		throw new Error( 'BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.' );

	}

	function getAttributeArray( attribute ) {

		if ( attribute.normalized || attribute.isInterleavedBufferAttribute ) {

			const dstArray = new Float32Array( attribute.count * attribute.itemSize );

			for ( let i = 0, j = 0; i < attribute.count; i ++ ) {

				dstArray[ j ++ ] = attribute.getX( i );
				dstArray[ j ++ ] = attribute.getY( i );

				if ( attribute.itemSize > 2 ) {

					dstArray[ j ++ ] = attribute.getZ( i );

				}

			}

			return dstArray;

		}

		if ( attribute.array instanceof Float32Array ) {

			return attribute.array;

		}

		return new Float32Array( attribute.array );

	}

	// MikkTSpace algorithm requires non-indexed input.

	const _geometry = geometry.index ? geometry.toNonIndexed() : geometry;

	// Compute vertex tangents.

	const tangents = MikkTSpace.generateTangents(

		getAttributeArray( _geometry.attributes.position ),
		getAttributeArray( _geometry.attributes.normal ),
		getAttributeArray( _geometry.attributes.uv )

	);

	// Texture coordinate convention of glTF differs from the apparent
	// default of the MikkTSpace library; .w component must be flipped.

	if ( negateSign ) {

		for ( let i = 3; i < tangents.length; i += 4 ) {

			tangents[ i ] *= - 1;

		}

	}

	//

	_geometry.setAttribute( 'tangent', new BufferAttribute( tangents, 4 ) );

	if ( geometry !== _geometry ) {

		geometry.copy( _geometry );

	}

	return geometry;

}

/**
 * @param  {Array<BufferGeometry>} geometries
 * @param  {Boolean} useGroups
 * @return {BufferGeometry}
 */
function mergeGeometries( geometries, useGroups = false ) {

	const isIndexed = geometries[ 0 ].index !== null;

	const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
	const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );

	const attributes = {};
	const morphAttributes = {};

	const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;

	const mergedGeometry = new external_three_namespaceObject.BufferGeometry();

	let offset = 0;

	for ( let i = 0; i < geometries.length; ++ i ) {

		const geometry = geometries[ i ];
		let attributesCount = 0;

		// ensure that all geometries are indexed, or none

		if ( isIndexed !== ( geometry.index !== null ) ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
			return null;

		}

		// gather attributes, exit early if they're different

		for ( const name in geometry.attributes ) {

			if ( ! attributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
				return null;

			}

			if ( attributes[ name ] === undefined ) attributes[ name ] = [];

			attributes[ name ].push( geometry.attributes[ name ] );

			attributesCount ++;

		}

		// ensure geometries have the same number of attributes

		if ( attributesCount !== attributesUsed.size ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
			return null;

		}

		// gather morph attributes, exit early if they're different

		if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
			return null;

		}

		for ( const name in geometry.morphAttributes ) {

			if ( ! morphAttributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
				return null;

			}

			if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];

			morphAttributes[ name ].push( geometry.morphAttributes[ name ] );

		}

		if ( useGroups ) {

			let count;

			if ( isIndexed ) {

				count = geometry.index.count;

			} else if ( geometry.attributes.position !== undefined ) {

				count = geometry.attributes.position.count;

			} else {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
				return null;

			}

			mergedGeometry.addGroup( offset, count, i );

			offset += count;

		}

	}

	// merge indices

	if ( isIndexed ) {

		let indexOffset = 0;
		const mergedIndex = [];

		for ( let i = 0; i < geometries.length; ++ i ) {

			const index = geometries[ i ].index;

			for ( let j = 0; j < index.count; ++ j ) {

				mergedIndex.push( index.getX( j ) + indexOffset );

			}

			indexOffset += geometries[ i ].attributes.position.count;

		}

		mergedGeometry.setIndex( mergedIndex );

	}

	// merge attributes

	for ( const name in attributes ) {

		const mergedAttribute = mergeAttributes( attributes[ name ] );

		if ( ! mergedAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' + name + ' attribute.' );
			return null;

		}

		mergedGeometry.setAttribute( name, mergedAttribute );

	}

	// merge morph attributes

	for ( const name in morphAttributes ) {

		const numMorphTargets = morphAttributes[ name ][ 0 ].length;

		if ( numMorphTargets === 0 ) break;

		mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
		mergedGeometry.morphAttributes[ name ] = [];

		for ( let i = 0; i < numMorphTargets; ++ i ) {

			const morphAttributesToMerge = [];

			for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {

				morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );

			}

			const mergedMorphAttribute = mergeAttributes( morphAttributesToMerge );

			if ( ! mergedMorphAttribute ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
				return null;

			}

			mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );

		}

	}

	return mergedGeometry;

}

/**
 * @param {Array<BufferAttribute>} attributes
 * @return {BufferAttribute}
 */
function mergeAttributes( attributes ) {

	let TypedArray;
	let itemSize;
	let normalized;
	let gpuType = - 1;
	let arrayLength = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.' );
			return null;

		}

		if ( itemSize === undefined ) itemSize = attribute.itemSize;
		if ( itemSize !== attribute.itemSize ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.' );
			return null;

		}

		if ( normalized === undefined ) normalized = attribute.normalized;
		if ( normalized !== attribute.normalized ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
			return null;

		}

		if ( gpuType === - 1 ) gpuType = attribute.gpuType;
		if ( gpuType !== attribute.gpuType ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.' );
			return null;

		}

		arrayLength += attribute.count * itemSize;

	}

	const array = new TypedArray( arrayLength );
	const result = new external_three_namespaceObject.BufferAttribute( array, itemSize, normalized );
	let offset = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];
		if ( attribute.isInterleavedBufferAttribute ) {

			const tupleOffset = offset / itemSize;
			for ( let j = 0, l = attribute.count; j < l; j ++ ) {

				for ( let c = 0; c < itemSize; c ++ ) {

					const value = attribute.getComponent( j, c );
					result.setComponent( j + tupleOffset, c, value );

				}

			}

		} else {

			array.set( attribute.array, offset );

		}

		offset += attribute.count * itemSize;

	}

	if ( gpuType !== undefined ) {

		result.gpuType = gpuType;

	}

	return result;

}

/**
 * @param {BufferAttribute}
 * @return {BufferAttribute}
 */
function deepCloneAttribute( attribute ) {

	if ( attribute.isInstancedInterleavedBufferAttribute || attribute.isInterleavedBufferAttribute ) {

		return deinterleaveAttribute( attribute );

	}

	if ( attribute.isInstancedBufferAttribute ) {

		return new InstancedBufferAttribute().copy( attribute );

	}

	return new BufferAttribute().copy( attribute );

}

/**
 * @param {Array<BufferAttribute>} attributes
 * @return {Array<InterleavedBufferAttribute>}
 */
function interleaveAttributes( attributes ) {

	// Interleaves the provided attributes into an InterleavedBuffer and returns
	// a set of InterleavedBufferAttributes for each attribute
	let TypedArray;
	let arrayLength = 0;
	let stride = 0;

	// calculate the length and type of the interleavedBuffer
	for ( let i = 0, l = attributes.length; i < l; ++ i ) {

		const attribute = attributes[ i ];

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'AttributeBuffers of different types cannot be interleaved' );
			return null;

		}

		arrayLength += attribute.array.length;
		stride += attribute.itemSize;

	}

	// Create the set of buffer attributes
	const interleavedBuffer = new InterleavedBuffer( new TypedArray( arrayLength ), stride );
	let offset = 0;
	const res = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	for ( let j = 0, l = attributes.length; j < l; j ++ ) {

		const attribute = attributes[ j ];
		const itemSize = attribute.itemSize;
		const count = attribute.count;
		const iba = new InterleavedBufferAttribute( interleavedBuffer, itemSize, offset, attribute.normalized );
		res.push( iba );

		offset += itemSize;

		// Move the data for each attribute into the new interleavedBuffer
		// at the appropriate offset
		for ( let c = 0; c < count; c ++ ) {

			for ( let k = 0; k < itemSize; k ++ ) {

				iba[ setters[ k ] ]( c, attribute[ getters[ k ] ]( c ) );

			}

		}

	}

	return res;

}

// returns a new, non-interleaved version of the provided attribute
function deinterleaveAttribute( attribute ) {

	const cons = attribute.data.array.constructor;
	const count = attribute.count;
	const itemSize = attribute.itemSize;
	const normalized = attribute.normalized;

	const array = new cons( count * itemSize );
	let newAttribute;
	if ( attribute.isInstancedInterleavedBufferAttribute ) {

		newAttribute = new InstancedBufferAttribute( array, itemSize, normalized, attribute.meshPerAttribute );

	} else {

		newAttribute = new BufferAttribute( array, itemSize, normalized );

	}

	for ( let i = 0; i < count; i ++ ) {

		newAttribute.setX( i, attribute.getX( i ) );

		if ( itemSize >= 2 ) {

			newAttribute.setY( i, attribute.getY( i ) );

		}

		if ( itemSize >= 3 ) {

			newAttribute.setZ( i, attribute.getZ( i ) );

		}

		if ( itemSize >= 4 ) {

			newAttribute.setW( i, attribute.getW( i ) );

		}

	}

	return newAttribute;

}

// deinterleaves all attributes on the geometry
function deinterleaveGeometry( geometry ) {

	const attributes = geometry.attributes;
	const morphTargets = geometry.morphTargets;
	const attrMap = new Map();

	for ( const key in attributes ) {

		const attr = attributes[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			attributes[ key ] = attrMap.get( attr );

		}

	}

	for ( const key in morphTargets ) {

		const attr = morphTargets[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			morphTargets[ key ] = attrMap.get( attr );

		}

	}

}

/**
 * @param {BufferGeometry} geometry
 * @return {number}
 */
function estimateBytesUsed( geometry ) {

	// Return the estimated memory used by this geometry in bytes
	// Calculate using itemSize, count, and BYTES_PER_ELEMENT to account
	// for InterleavedBufferAttributes.
	let mem = 0;
	for ( const name in geometry.attributes ) {

		const attr = geometry.getAttribute( name );
		mem += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT;

	}

	const indices = geometry.getIndex();
	mem += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0;
	return mem;

}

/**
 * @param {BufferGeometry} geometry
 * @param {number} tolerance
 * @return {BufferGeometry}
 */
function mergeVertices( geometry, tolerance = 1e-4 ) {

	tolerance = Math.max( tolerance, Number.EPSILON );

	// Generate an index buffer if the geometry doesn't have one, or optimize it
	// if it's already available.
	const hashToIndex = {};
	const indices = geometry.getIndex();
	const positions = geometry.getAttribute( 'position' );
	const vertexCount = indices ? indices.count : positions.count;

	// next value for triangle indices
	let nextIndex = 0;

	// attributes and new attribute arrays
	const attributeNames = Object.keys( geometry.attributes );
	const tmpAttributes = {};
	const tmpMorphAttributes = {};
	const newIndices = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	// Initialize the arrays, allocating space conservatively. Extra
	// space will be trimmed in the last step.
	for ( let i = 0, l = attributeNames.length; i < l; i ++ ) {

		const name = attributeNames[ i ];
		const attr = geometry.attributes[ name ];

		tmpAttributes[ name ] = new attr.constructor(
			new attr.array.constructor( attr.count * attr.itemSize ),
			attr.itemSize,
			attr.normalized
		);

		const morphAttributes = geometry.morphAttributes[ name ];
		if ( morphAttributes ) {

			if ( ! tmpMorphAttributes[ name ] ) tmpMorphAttributes[ name ] = [];
			morphAttributes.forEach( ( morphAttr, i ) => {

				const array = new morphAttr.array.constructor( morphAttr.count * morphAttr.itemSize );
				tmpMorphAttributes[ name ][ i ] = new morphAttr.constructor( array, morphAttr.itemSize, morphAttr.normalized );

			} );

		}

	}

	// convert the error tolerance to an amount of decimal places to truncate to
	const halfTolerance = tolerance * 0.5;
	const exponent = Math.log10( 1 / tolerance );
	const hashMultiplier = Math.pow( 10, exponent );
	const hashAdditive = halfTolerance * hashMultiplier;
	for ( let i = 0; i < vertexCount; i ++ ) {

		const index = indices ? indices.getX( i ) : i;

		// Generate a hash for the vertex attributes at the current index 'i'
		let hash = '';
		for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

			const name = attributeNames[ j ];
			const attribute = geometry.getAttribute( name );
			const itemSize = attribute.itemSize;

			for ( let k = 0; k < itemSize; k ++ ) {

				// double tilde truncates the decimal value
				hash += `${ ~ ~ ( attribute[ getters[ k ] ]( index ) * hashMultiplier + hashAdditive ) },`;

			}

		}

		// Add another reference to the vertex if it's already
		// used by another index
		if ( hash in hashToIndex ) {

			newIndices.push( hashToIndex[ hash ] );

		} else {

			// copy data to the new index in the temporary attributes
			for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

				const name = attributeNames[ j ];
				const attribute = geometry.getAttribute( name );
				const morphAttributes = geometry.morphAttributes[ name ];
				const itemSize = attribute.itemSize;
				const newArray = tmpAttributes[ name ];
				const newMorphArrays = tmpMorphAttributes[ name ];

				for ( let k = 0; k < itemSize; k ++ ) {

					const getterFunc = getters[ k ];
					const setterFunc = setters[ k ];
					newArray[ setterFunc ]( nextIndex, attribute[ getterFunc ]( index ) );

					if ( morphAttributes ) {

						for ( let m = 0, ml = morphAttributes.length; m < ml; m ++ ) {

							newMorphArrays[ m ][ setterFunc ]( nextIndex, morphAttributes[ m ][ getterFunc ]( index ) );

						}

					}

				}

			}

			hashToIndex[ hash ] = nextIndex;
			newIndices.push( nextIndex );
			nextIndex ++;

		}

	}

	// generate result BufferGeometry
	const result = geometry.clone();
	for ( const name in geometry.attributes ) {

		const tmpAttribute = tmpAttributes[ name ];

		result.setAttribute( name, new tmpAttribute.constructor(
			tmpAttribute.array.slice( 0, nextIndex * tmpAttribute.itemSize ),
			tmpAttribute.itemSize,
			tmpAttribute.normalized,
		) );

		if ( ! ( name in tmpMorphAttributes ) ) continue;

		for ( let j = 0; j < tmpMorphAttributes[ name ].length; j ++ ) {

			const tmpMorphAttribute = tmpMorphAttributes[ name ][ j ];

			result.morphAttributes[ name ][ j ] = new tmpMorphAttribute.constructor(
				tmpMorphAttribute.array.slice( 0, nextIndex * tmpMorphAttribute.itemSize ),
				tmpMorphAttribute.itemSize,
				tmpMorphAttribute.normalized,
			);

		}

	}

	// indices

	result.setIndex( newIndices );

	return result;

}

/**
 * @param {BufferGeometry} geometry
 * @param {number} drawMode
 * @return {BufferGeometry}
 */
function toTrianglesDrawMode( geometry, drawMode ) {

	if ( drawMode === TrianglesDrawMode ) {

		console.warn( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.' );
		return geometry;

	}

	if ( drawMode === TriangleFanDrawMode || drawMode === TriangleStripDrawMode ) {

		let index = geometry.getIndex();

		// generate index if not present

		if ( index === null ) {

			const indices = [];

			const position = geometry.getAttribute( 'position' );

			if ( position !== undefined ) {

				for ( let i = 0; i < position.count; i ++ ) {

					indices.push( i );

				}

				geometry.setIndex( indices );
				index = geometry.getIndex();

			} else {

				console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.' );
				return geometry;

			}

		}

		//

		const numberOfTriangles = index.count - 2;
		const newIndices = [];

		if ( drawMode === TriangleFanDrawMode ) {

			// gl.TRIANGLE_FAN

			for ( let i = 1; i <= numberOfTriangles; i ++ ) {

				newIndices.push( index.getX( 0 ) );
				newIndices.push( index.getX( i ) );
				newIndices.push( index.getX( i + 1 ) );

			}

		} else {

			// gl.TRIANGLE_STRIP

			for ( let i = 0; i < numberOfTriangles; i ++ ) {

				if ( i % 2 === 0 ) {

					newIndices.push( index.getX( i ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i + 2 ) );

				} else {

					newIndices.push( index.getX( i + 2 ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i ) );

				}

			}

		}

		if ( ( newIndices.length / 3 ) !== numberOfTriangles ) {

			console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.' );

		}

		// build final geometry

		const newGeometry = geometry.clone();
		newGeometry.setIndex( newIndices );
		newGeometry.clearGroups();

		return newGeometry;

	} else {

		console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:', drawMode );
		return geometry;

	}

}

/**
 * Calculates the morphed attributes of a morphed/skinned BufferGeometry.
 * Helpful for Raytracing or Decals.
 * @param {Mesh | Line | Points} object An instance of Mesh, Line or Points.
 * @return {Object} An Object with original position/normal attributes and morphed ones.
 */
function computeMorphedAttributes( object ) {

	const _vA = new Vector3();
	const _vB = new Vector3();
	const _vC = new Vector3();

	const _tempA = new Vector3();
	const _tempB = new Vector3();
	const _tempC = new Vector3();

	const _morphA = new Vector3();
	const _morphB = new Vector3();
	const _morphC = new Vector3();

	function _calculateMorphedAttributeData(
		object,
		attribute,
		morphAttribute,
		morphTargetsRelative,
		a,
		b,
		c,
		modifiedAttributeArray
	) {

		_vA.fromBufferAttribute( attribute, a );
		_vB.fromBufferAttribute( attribute, b );
		_vC.fromBufferAttribute( attribute, c );

		const morphInfluences = object.morphTargetInfluences;

		if ( morphAttribute && morphInfluences ) {

			_morphA.set( 0, 0, 0 );
			_morphB.set( 0, 0, 0 );
			_morphC.set( 0, 0, 0 );

			for ( let i = 0, il = morphAttribute.length; i < il; i ++ ) {

				const influence = morphInfluences[ i ];
				const morph = morphAttribute[ i ];

				if ( influence === 0 ) continue;

				_tempA.fromBufferAttribute( morph, a );
				_tempB.fromBufferAttribute( morph, b );
				_tempC.fromBufferAttribute( morph, c );

				if ( morphTargetsRelative ) {

					_morphA.addScaledVector( _tempA, influence );
					_morphB.addScaledVector( _tempB, influence );
					_morphC.addScaledVector( _tempC, influence );

				} else {

					_morphA.addScaledVector( _tempA.sub( _vA ), influence );
					_morphB.addScaledVector( _tempB.sub( _vB ), influence );
					_morphC.addScaledVector( _tempC.sub( _vC ), influence );

				}

			}

			_vA.add( _morphA );
			_vB.add( _morphB );
			_vC.add( _morphC );

		}

		if ( object.isSkinnedMesh ) {

			object.applyBoneTransform( a, _vA );
			object.applyBoneTransform( b, _vB );
			object.applyBoneTransform( c, _vC );

		}

		modifiedAttributeArray[ a * 3 + 0 ] = _vA.x;
		modifiedAttributeArray[ a * 3 + 1 ] = _vA.y;
		modifiedAttributeArray[ a * 3 + 2 ] = _vA.z;
		modifiedAttributeArray[ b * 3 + 0 ] = _vB.x;
		modifiedAttributeArray[ b * 3 + 1 ] = _vB.y;
		modifiedAttributeArray[ b * 3 + 2 ] = _vB.z;
		modifiedAttributeArray[ c * 3 + 0 ] = _vC.x;
		modifiedAttributeArray[ c * 3 + 1 ] = _vC.y;
		modifiedAttributeArray[ c * 3 + 2 ] = _vC.z;

	}

	const geometry = object.geometry;
	const material = object.material;

	let a, b, c;
	const index = geometry.index;
	const positionAttribute = geometry.attributes.position;
	const morphPosition = geometry.morphAttributes.position;
	const morphTargetsRelative = geometry.morphTargetsRelative;
	const normalAttribute = geometry.attributes.normal;
	const morphNormal = geometry.morphAttributes.position;

	const groups = geometry.groups;
	const drawRange = geometry.drawRange;
	let i, j, il, jl;
	let group;
	let start, end;

	const modifiedPosition = new Float32Array( positionAttribute.count * positionAttribute.itemSize );
	const modifiedNormal = new Float32Array( normalAttribute.count * normalAttribute.itemSize );

	if ( index !== null ) {

		// indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = index.getX( j );
					b = index.getX( j + 1 );
					c = index.getX( j + 2 );

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = index.getX( i );
				b = index.getX( i + 1 );
				c = index.getX( i + 2 );

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	} else {

		// non-indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = j;
					b = j + 1;
					c = j + 2;

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( positionAttribute.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = i;
				b = i + 1;
				c = i + 2;

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	}

	const morphedPositionAttribute = new Float32BufferAttribute( modifiedPosition, 3 );
	const morphedNormalAttribute = new Float32BufferAttribute( modifiedNormal, 3 );

	return {

		positionAttribute: positionAttribute,
		normalAttribute: normalAttribute,
		morphedPositionAttribute: morphedPositionAttribute,
		morphedNormalAttribute: morphedNormalAttribute

	};

}

function mergeGroups( geometry ) {

	if ( geometry.groups.length === 0 ) {

		console.warn( 'THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge.' );
		return geometry;

	}

	let groups = geometry.groups;

	// sort groups by material index

	groups = groups.sort( ( a, b ) => {

		if ( a.materialIndex !== b.materialIndex ) return a.materialIndex - b.materialIndex;

		return a.start - b.start;

	} );

	// create index for non-indexed geometries

	if ( geometry.getIndex() === null ) {

		const positionAttribute = geometry.getAttribute( 'position' );
		const indices = [];

		for ( let i = 0; i < positionAttribute.count; i += 3 ) {

			indices.push( i, i + 1, i + 2 );

		}

		geometry.setIndex( indices );

	}

	// sort index

	const index = geometry.getIndex();

	const newIndices = [];

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		const groupStart = group.start;
		const groupLength = groupStart + group.count;

		for ( let j = groupStart; j < groupLength; j ++ ) {

			newIndices.push( index.getX( j ) );

		}

	}

	geometry.dispose(); // Required to force buffer recreation
	geometry.setIndex( newIndices );

	// update groups indices

	let start = 0;

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		group.start = start;
		start += group.count;

	}

	// merge groups

	let currentGroup = groups[ 0 ];

	geometry.groups = [ currentGroup ];

	for ( let i = 1; i < groups.length; i ++ ) {

		const group = groups[ i ];

		if ( currentGroup.materialIndex === group.materialIndex ) {

			currentGroup.count += group.count;

		} else {

			currentGroup = group;
			geometry.groups.push( currentGroup );

		}

	}

	return geometry;

}


/**
 * Modifies the supplied geometry if it is non-indexed, otherwise creates a new,
 * non-indexed geometry. Returns the geometry with smooth normals everywhere except
 * faces that meet at an angle greater than the crease angle.
 *
 * @param {BufferGeometry} geometry
 * @param {number} [creaseAngle]
 * @return {BufferGeometry}
 */
function toCreasedNormals( geometry, creaseAngle = Math.PI / 3 /* 60 degrees */ ) {

	const creaseDot = Math.cos( creaseAngle );
	const hashMultiplier = ( 1 + 1e-10 ) * 1e2;

	// reusable vectors
	const verts = [ new Vector3(), new Vector3(), new Vector3() ];
	const tempVec1 = new Vector3();
	const tempVec2 = new Vector3();
	const tempNorm = new Vector3();
	const tempNorm2 = new Vector3();

	// hashes a vector
	function hashVertex( v ) {

		const x = ~ ~ ( v.x * hashMultiplier );
		const y = ~ ~ ( v.y * hashMultiplier );
		const z = ~ ~ ( v.z * hashMultiplier );
		return `${x},${y},${z}`;

	}

	// BufferGeometry.toNonIndexed() warns if the geometry is non-indexed
	// and returns the original geometry
	const resultGeometry = geometry.index ? geometry.toNonIndexed() : geometry;
	const posAttr = resultGeometry.attributes.position;
	const vertexMap = {};

	// find all the normals shared by commonly located vertices
	for ( let i = 0, l = posAttr.count / 3; i < l; i ++ ) {

		const i3 = 3 * i;
		const a = verts[ 0 ].fromBufferAttribute( posAttr, i3 + 0 );
		const b = verts[ 1 ].fromBufferAttribute( posAttr, i3 + 1 );
		const c = verts[ 2 ].fromBufferAttribute( posAttr, i3 + 2 );

		tempVec1.subVectors( c, b );
		tempVec2.subVectors( a, b );

		// add the normal to the map for all vertices
		const normal = new Vector3().crossVectors( tempVec1, tempVec2 ).normalize();
		for ( let n = 0; n < 3; n ++ ) {

			const vert = verts[ n ];
			const hash = hashVertex( vert );
			if ( ! ( hash in vertexMap ) ) {

				vertexMap[ hash ] = [];

			}

			vertexMap[ hash ].push( normal );

		}

	}

	// average normals from all vertices that share a common location if they are within the
	// provided crease threshold
	const normalArray = new Float32Array( posAttr.count * 3 );
	const normAttr = new BufferAttribute( normalArray, 3, false );
	for ( let i = 0, l = posAttr.count / 3; i < l; i ++ ) {

		// get the face normal for this vertex
		const i3 = 3 * i;
		const a = verts[ 0 ].fromBufferAttribute( posAttr, i3 + 0 );
		const b = verts[ 1 ].fromBufferAttribute( posAttr, i3 + 1 );
		const c = verts[ 2 ].fromBufferAttribute( posAttr, i3 + 2 );

		tempVec1.subVectors( c, b );
		tempVec2.subVectors( a, b );

		tempNorm.crossVectors( tempVec1, tempVec2 ).normalize();

		// average all normals that meet the threshold and set the normal value
		for ( let n = 0; n < 3; n ++ ) {

			const vert = verts[ n ];
			const hash = hashVertex( vert );
			const otherNormals = vertexMap[ hash ];
			tempNorm2.set( 0, 0, 0 );

			for ( let k = 0, lk = otherNormals.length; k < lk; k ++ ) {

				const otherNorm = otherNormals[ k ];
				if ( tempNorm.dot( otherNorm ) > creaseDot ) {

					tempNorm2.add( otherNorm );

				}

			}

			tempNorm2.normalize();
			normAttr.setXYZ( i3 + n, tempNorm2.x, tempNorm2.y, tempNorm2.z );

		}

	}

	resultGeometry.setAttribute( 'normal', normAttr );
	return resultGeometry;

}



;// CONCATENATED MODULE: ./src/core/properties/rendering/RendererPropertyInline.js

// import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';



class RendererPropertyInline extends BaseProperty {
	constructor() {
		super("renderer");
	}

	render(element) {
		if (!element._inlines._value || !element._inlines._value.length) return;

		const charactersAsGeometries = element._inlines._value.map((inline) =>
			element._font._fontVariant
				.getGeometricGlyph(inline, element)
				.translate(inline.offsetX, inline.offsetY, 0)
		);

		const mergedGeom = mergeGeometries(charactersAsGeometries);

		element.setFontMesh(new external_three_namespaceObject.Mesh(mergedGeom, element.fontMaterial));

		element._fontMesh.renderOrder = Infinity;
	}
}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/TextAlignPropertyInline.js



class TextAlignPropertyInline extends TextAlignProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this._needsUpdate = false;

	}


	/* eslint-disable no-unused-vars */ computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._value = this._inheritedInput;

		element._layouter._needsProcess = true;

	}

}

;// CONCATENATED MODULE: ./src/elements/basic/InlineElement.js





















//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class InlineElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 * @param {object} [properties={}]
	 */
	constructor( values = { }, properties = {}) {

		InlineElement.definePropertiesValues( properties, values );

		super( properties, values );

		InlineElement.init( this );

	}

	/* eslint-disable no-unused-vars */
	/**
	 * A Text Element can only contains inline elements
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) { /* eslint-enable no-unused-vars */

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI || argument.isInline ) {

				validChildren.push( argument );

				argument.position.z = 0.005;

			} else {

				console.warn( 'Inline element can only contain inline elements.', argument );

			}

		}

		return super.add( ...validChildren );

	}

	_rebuildParentUI = () => {

		super._rebuildParentUI();

		this._layouter._needsUpdate = true;

	}

	set textContent( value ) {

		this._textContent.value = value;

	}

	get textContent () { return this._textContent._value; }

	set invertAlpha( value ) {

		this._invertAlpha.value = value;

	}

	get invertAlpha () { return this._invertAlpha._value; }

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {  /* eslint-enable no-unused-vars */

		if( !properties.children ) properties.children = ChildrenInline;
		if( !properties.textContent ) properties.textContent = TextContentProperty;
		if( !properties.glyphs ) properties.glyphs = GlyphsProperty;
		if( !properties.inlines ) properties.inlines = InlinesProperty;
		if( !properties.layouter ) properties.layouter = InlineLayouter;
		if( !properties.renderer ) properties.renderer = RendererPropertyInline;


		if( !properties.fontFamily ) properties.fontFamily = FontFamilyPropertyInline;
		if( !properties.fontWeight ) properties.fontWeight = FontWeightPropertyInline;
		if( !properties.fontStyle ) properties.fontStyle = FontStylePropertyInline;
		if( !properties.fontSize ) properties.fontSize = FontSizePropertyInline;
		if( !properties.color ) properties.color = ColorProperty;
		if( !properties.backgroundColor ) properties.backgroundColor = BackgroundColorPropertyInline;
		if( !properties.lineBreak ) properties.lineBreak = LineBreakProperty;
		if( !properties.letterSpacing ) properties.letterSpacing = LetterSpacingPropertyInline;
		if( !properties.whiteSpace ) properties.whiteSpace = WhiteSpacePropertyInline;
		if( !properties.segments ) properties.segments = SegmentsPropertyInline;
		if( !properties.textAlign ) properties.textAlign = TextAlignPropertyInline;

		if( !properties.fontKerning ) properties.fontKerning = FontKerningPropertyInline;

		// if( !properties.inlines ) properties.inlines = InlinesProperty;


	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init( element ) {

		Object.defineProperties( element, {
				isInline: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

	}
}

;// CONCATENATED MODULE: ./src/core/properties/TextContentProperty.js



class TextContentProperty extends TextContentDefault{

	constructor() {

		super( "textContent", null, false );

		this._needsUpdate = false;

	}

	set value( value ) {

		// If content hasn't change, dont update it
		if( this._value !== value ) {

			this._value = value;

			this._needsUpdate = true;

		}

	}

	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		// prevent multiple update
		this._needsUpdate = false;

		// Remove all its children (Inlines)
		for ( let i = element.children.length - 1 ; i >= 0; i-- ) {
			const child = element.children[ i ];
			if( child.isUI ) {

				element.remove( child );
				child.clear();

			}

		}

		// Rebuild its child list
		element._children._uis = [];

		// If a value, add a child
		if( this._value ) {

			const childrenInlines = this.buildInlines( this._value );
			if( childrenInlines.length ){

				element.add( ...childrenInlines );

			}

		}

		if( element.isInline ) {

			element._glyphs._needsUpdate = true;
			element._whiteSpace._needsProcess = true;

		}

	}

	/**
	 *
	 * @param {string} textContent
	 * @return {InlineElement[]}
	 */
	buildInlines( textContent ) {

		return [ new InlineElement({name:'anonymousInline',textContent}) ];

	}

}

;// CONCATENATED MODULE: ./src/core/elements/glyphs/Lines.js
//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * Lines represents a vertical succession of Line
 */
class Lines extends Array {

	/**
	 *
	 * @param {Line} items
	 */
	constructor(...items) {
		super(...items);

		/**
		 * The maximum width of Line items
		 * @type {number}
		 */
		this.width = 0;

		/**
		 * The addition of height of any Line
		 * @type {number}
		 */
		this.height = 0;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/TextLayouter.js




class TextLayouter extends BaseProperty {

	constructor() {

		super( 'layouter', null, false );

		/**
		 *
		 * @type {Lines}
		 * @private
		 */
		this._value = null;
	}


	/* eslint-disable no-unused-vars */ update( element, out ) { 	/* eslint-enable no-unused-vars */ }

	/**
	 *
	 * @override
	 */
	process( element ) {


		let INNER_WIDTH = element._width._value;

		if ( element._width._auto ) {

			INNER_WIDTH = Infinity;

		} else {

			INNER_WIDTH = element._bounds._innerWidth;

		}

		// Compute lines

		const INTERLINE = element._lineHeight._value;

		// Will stock the characters of each line, so that we can
		// correct lines position before to merge
		const lines = new Lines( new Line() );

		let lastInlineOffset = 0;
		element._children._inlines.forEach( ( inlineElement ) => {

			// Abort condition

			if ( !inlineElement._inlines.value ) return;

			this._resetInlines( inlineElement );

			//////////////////////////////////////////////////////////////
			// Compute offset of each children according to its dimensions
			//////////////////////////////////////////////////////////////

			// @TODO: Fontsize best fit
			const FONTSIZE = inlineElement._fontSize._value;

			const LETTERSPACING = inlineElement._letterSpacing._value * FONTSIZE;

			const WHITESPACE = inlineElement._whiteSpace._value;

			const BREAKON = inlineElement._lineBreak._value;

			const whiteSpaceOptions = {
				WHITESPACE,
				LETTERSPACING,
				BREAKON,
				INNER_WIDTH
			}

			const inlineWrapper = inlineElement._whiteSpace._inlineWrapper;

			lastInlineOffset += inlineElement._margin._value.w + inlineElement._padding._value.w;

			inlineElement._inlines.value.forEach( ( inline, i, inlines ) => {

				const line = lines[lines.length - 1];

				// Line break
				const shouldBreak = inlineWrapper(inlines,i,lastInlineOffset, whiteSpaceOptions );

				if ( shouldBreak ) {

					lines.push( new Line( inline ) );

					inline.offsetX = inline.xoffset;

					// restart the lastInlineOffset as zero.
					if ( inline.width === 0 ) {
						lastInlineOffset = 0;
						return;
					}

					// compute lastInlineOffset normally
					// except for kerning which won't apply
					// as there is visually no lefthanded glyph to kern with
					inline.cumulativeWidth = inline.xadvance + LETTERSPACING;
					lastInlineOffset = inline.cumulativeWidth;
					return;

				}

				lines[ lines.length - 1 ].push( inline );
				inline.offsetX = lastInlineOffset + inline.xoffset + inline.kerning;

				inline.cumulativeWidth = inline.xadvance + inline.kerning + LETTERSPACING;
				lastInlineOffset += inline.cumulativeWidth;

				// in case of lineBreak mandatory
				if( line.length-1 === 1) {

					if ( line[ line.length - 2 ].width === 0 ) {

						// remove the offset of the character following the newline
						inline.offsetX -= inline.xoffset;
						lastInlineOffset -= inline.xoffset;

					}

				}

			} );

			lastInlineOffset += inlineElement._margin._value.y + inlineElement._padding._value.y;

		} );

		// Compute single line and combined lines dimensions
		const inlineCollapser = element._whiteSpace._inlineCollapser;


		let width = 0, height =0, lineOffsetY = 0;

		// calculates lines
		lines.forEach( ( line, i ) => {

			// starts by processing whitespace, it will return a collapsed left offset
			const whiteSpaceOffset = inlineCollapser( line );

			//
			let lineHeight = 0;
			let lineBase = 0;

			line.forEach( ( inline ) => {

				lineHeight = Math.max( lineHeight, inline.lineHeight );
				lineBase = Math.max( lineBase, inline.lineBase );

				inline.offsetX -= whiteSpaceOffset;

			});

			line.lineHeight = lineHeight;
			line.lineBase = lineBase;

			// const baseLineDelta = lineHeight - lineBase;

			if( i === 0 ){
				lineOffsetY = -(lineHeight*INTERLINE - lineHeight) * 0.5;
			} else {
				lineOffsetY -= lines[i-1].lineHeight*INTERLINE;
			}

			line.y = lineOffsetY;
			line.x = 0;

			// process yoffset
			line.forEach( ( inline ) => {

				inline.offsetY = lineOffsetY - inline.anchor;

				if( inline.lineHeight < line.lineHeight ){
					inline.offsetY -= line.lineBase- inline.lineBase;
				}

			});



			height += ( line.lineHeight * INTERLINE );
			// height += ( line.lineHeight);

			//
			line.width = 0;
			// if this line have inlines
			if ( line[ 0 ] ) {

				// compute its width: length from firstInline:LEFT to lastInline:RIGHT
				// only by the length of its extremities
				const lastInline = line[ line.length - 1 ];

				// Right + Left ( left is negative )
				line.width = ( lastInline.offsetX + lastInline.cumulativeWidth + lastInline.paddingRight + lastInline.marginRight ) + line[ 0 ].offsetX;

				width = Math.max( width, line.width);
			}

		} );

		lines.height = height;
		lines.width = width;

		this._value = lines;

		if( INNER_WIDTH === Infinity ) {

			element._bounds.setChildrenWidth( element, lines.width );

		}

		if( element._height._auto ) {

			element._bounds.setChildrenHeight( element, lines.height );

		}

		const parent = element._parent._value;
		if( parent ) {

			parent._autoSize._needsProcess = true;
			parent._flexDirection._needsProcess = true;

		}

		element._inlineJustificator._needsProcess = true;
		element._textAlign._needsProcess = true;

		element._overflow._needsUpdate = true;

	}

	/**
	 *
	 * @param inlineElement
	 * @protected
	 */
	_resetInlines ( inlineElement ) {

		// ensure no collapsed remains
		inlineElement._fontSize.process( inlineElement );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/TextAlignPropertyText.js



class TextAlignPropertyText extends TextAlignProperty {

	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this._needsUpdate = true;

		//
		// @TODO : strategies

	}


	/* eslint-disable no-unused-vars */computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		this._value = this._inheritedInput;

		this._needsProcess = true;

	}

	process( element ) {

		_process( element );

		element._renderer._needsRender = true;

	}

}

function _process( element ) {

	const lines = element._layouter._value;
	const ALIGNMENT = element._textAlign._value;
	const INNER_WIDTH = element._bounds._innerWidth;

	// Start the alignment by sticking to directions : left, right, center
	for ( let i = 0; i < lines.length; i++ ) {

		const line = lines[ i ];

		// compute the alignment offset of the line
		const offsetX = _computeLineOffset( element, line, i === lines.length - 1 );

		const padding = element._padding._value;
		const border = element._borderWidth._value;

		// const paddingAmount = - ( padding.w + padding.y ) / 2 - ( border.w + border.y ) / 2;
		// const paddingAmount = - ( padding.w + padding.y ) / 2;
		const paddingAmount = ( - padding.w + padding.y ) / 2 + ( - border.w + border.y ) / 2;

		line.x += offsetX;

		// apply the offset to each characters of the line
		for ( let j = 0; j < line.length; j++ ) {

			line[ j ].offsetX += offsetX - paddingAmount;
			// line[ j ].offsetX += offsetX;

		}

		// line.x = line[ 0 ].offsetX;


	}

	// last operations for justifications alignments
	if ( ALIGNMENT.indexOf( 'justify' ) === 0 ) {

		for ( let i = 0; i < lines.length; i++ ) {

			const line = lines[ i ];


			// do not process last line for justify-left or justify-right
			if ( ALIGNMENT.indexOf( '-' ) !== -1 && i === lines.length - 1 ) return;

			// can only justify is space is remaining
			const REMAINING_SPACE = INNER_WIDTH - line.width;
			if ( REMAINING_SPACE <= 0 ) return;

			// count the valid spaces to extend
			// Do not take the first nor the last space into account
			let validSpaces = 0;
			for ( let j = 1; j < line.length - 1; j++ ) {

				validSpaces += line[ j ].char === ' ' ? 1 : 0;

			}
			const additionalSpace = REMAINING_SPACE / validSpaces;


			// for right justification, process the loop in reverse
			let inverter = 1;
			if ( ALIGNMENT === 'justify-right' ) {

				line.reverse();
				inverter = -1;

			}

			let incrementalOffsetX = 0;

			// start at ONE to avoid first space
			for ( let j = 1; j <= line.length - 1; j++ ) {

				// apply offset on each char
				const inlineCharacter = line[ j ];
				inlineCharacter.offsetX += incrementalOffsetX * inverter;

				// and increase it when space
				incrementalOffsetX += inlineCharacter.char === ' ' ? additionalSpace : 0;

			}

			// for right justification, the loop was processed in reverse
			if ( ALIGNMENT === 'justify-right' ) {
				line.reverse();
			}


		}

	}

}

function _computeLineOffset ( element, line, lastLine ) {

	switch ( element._textAlign._value ) {

		case 'justify-left':
		case 'justify':
		case 'left':
			return - element._bounds._innerWidth / 2;

		case 'justify-right':
		case 'right':
			return -line.width + ( element._bounds._innerWidth / 2 );


		case 'center':
			return -line.width / 2;

		case 'justify-center':
			if ( lastLine ) {

				// center alignement
				return -line.width / 2;

			}

			// left alignment
			return - element._bounds._innerWidth / 2;

		default:
			console.warn( `textAlign: '${element._textAlign._value}' is not valid` );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/flex/FlexDirectionPropertyText.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class FlexDirectionPropertyText extends FlexDirectionProperty {

	constructor( ) {

		super();

		this._value = this._input = 'column';

		// Configure
		this._allowsInherit = false;
		this._needsUpdate = true;

	}

	/* eslint-disable no-unused-vars */computeOutputValue( element ) { /* eslint-enable no-unused-vars */

		// @TODO : Evaluate the needs of this property. Could be empty
		this._value = this._inheritedInput;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/LineHeightPropertyInline.js



class LineHeightPropertyInline extends LineHeightProperty {

	/**
	 *
	 */
	constructor() {

		super();

		// configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;

	}

}



;// CONCATENATED MODULE: ./src/core/properties/style-properties/font/FontKerningPropertyText.js



class FontKerningPropertyText extends FontKerningProperty {

	constructor() {

		super();

		this._value = this._input = this.getDefaultValue();

		// Configure
		this._allowsInherit = false;
		this.computeOutputValue = this._computeFromInherited;

	}


	_computeFromInherited( element ) {
		super._computeFromInherited(element);


	}

}

;// CONCATENATED MODULE: ./src/core/properties/BoundsText.js


class BoundsText extends BoundsBox {

	constructor() {

		super();

		this._innerWidth = Infinity;
		this._innerHeight = 0;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/hierarchy/ChildrenText.js


//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

class ChildrenText extends BaseProperty {

	constructor() {

		super( 'children', null, false );

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._uis = [];

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._inlines = [];

		/**
		 *
		 * @type {Array.<MeshUIBaseElement>}
		 * @internal
		 */
		this._boxes = [];

	}

	/* eslint-disable no-unused-vars */
	/**
	 * Update requested when :
	 * 		- New child has been added
	 * 		- Existing child has been removed
	 *
	 * @param element
	 * @param out
	 */
	update( element, out ) { /* eslint-enable no-unused-vars */

		this._compute( element );

		this._needsProcess = true;

	}


	/**
	 * Process when :
	 * 		- Existing child visibility changed
	 *
	 * @param element
	 */
	process( element ) {

		// this._compute( element );

		element._overflow._needsRender = true;

	}

	_compute( element ) {

		this._uis = element.children.filter( child => child.visible && child.isUI );

		this._inlines = this._uis.filter( child => child.isInline ).sort( this._sortOrder );

	}

	/**
	 *
	 */
	dispose() {

		this._inlines = null;

	}

	/**
	 *
	 * Sort children according to their .style.order property or fallback on children index
	 *
	 * @param {HTMLElementVR} a
	 * @param {HTMLElementVR} b
	 * @return {number}
	 * @private
	 */
	_sortOrder = ( a, b ) => {

		if( a._order._value < b._order._value ) return -1;
		if( a._order._value > b._order._value ) return 1;

		// if both children have the same order value, use their children index to order them
		if( this._uis.indexOf(a) < this._uis.indexOf(b) ) {
			return -1;
		}

		return 1;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/AutoSizePropertyText.js


/**
 * Autosize are only trigger when natural size changed
 */
class AutoSizePropertyText extends BaseProperty {

	constructor() {

		super( 'autosize' );

	}

	process( element ) {

		if( element._layouter._value && element._layouter._value.length ) {

			const lines = element._layouter._value;

			// as this is from children offsetWidth, it means parent innerWidth
			const padding = element._padding._value;
			const border = element._borderWidth._value;

			// has auto size get the height from children
			if ( element._width._auto ) {

				element._bounds.setOffsetWidth( element, lines.width + padding.w + padding.y + border.w + border.y );

			}

			if ( element._height._auto ) {

				element._bounds.setOffsetHeight( element, lines.height + padding.x + padding.z + border.x + border.z );

			}

		}

	}

}

;// CONCATENATED MODULE: ./src/core/properties/rendering/RendererPropertyText.js


class RendererPropertyText extends RendererPropertyBox{

	constructor() {

		super( 'renderer' );

		this._needsUpdate = false;

	}


	render( element ) {

		super.render( element );

		for ( const inlineElement of element._children._inlines ) {

			inlineElement._renderer.render( inlineElement );

		}

		element.performAfterUpdate();

	}

}

;// CONCATENATED MODULE: ./src/elements/basic/TextElement.js

















//JSDoc related imports
/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

class TextElement extends BoxElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 * @param [properties={}]
	 */
	constructor( values = {}, properties = {}) {

		TextElement.definePropertiesValues( properties, values );

		super( properties, values );

		TextElement.init( this );


	}

	/* eslint-disable no-unused-vars */
	/**
	 * A Text Element can only contains inline elements
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) { /* eslint-enable no-unused-vars */

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];
		let updateLayout = false;

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI || argument.isInline ) {

				if( argument.isInline ) {
					updateLayout = true;
				}

				validChildren.push( argument );

			} else {

				console.warn( 'Block element can only contain Box elements.', argument );

			}

		}

		if( validChildren.length > 0 ) {

			super.add( ...validChildren )

		}

		if( updateLayout ) {
			this._children._needsUpdate = true;
			this._layouter._needsProcess = true;
		}

		return this;

	}


	set textContent ( value ) {

		this._textContent.value = value;

	}

	// Must redefine getter also, or issue.
	get textContent() {

		return super.textContent;

	}

	set invertAlpha( value ) {

		this._invertAlpha.value = value;

	}

	get invertAlpha () { return this._invertAlpha._value; }

	get lines() { return this._layouter._value; }

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {

		properties.flexDirection = FlexDirectionPropertyText;
		properties.justifyContent = JustifyContentProperty;
		properties.alignItems = AlignItemsProperty;
		properties.bounds = BoundsText;
		properties.autoSize = AutoSizePropertyText;
		properties.renderer = RendererPropertyText;

		if( !properties.children ) properties.children = ChildrenText;
		if( !properties.textContent ) properties.textContent = TextContentProperty;
		if( !properties.layouter ) properties.layouter = TextLayouter;
		if( !properties.lineHeight ) properties.lineHeight = LineHeightPropertyInline;
		if( !properties.textAlign ) properties.textAlign = TextAlignPropertyText;
		if( !properties.whiteSpace ) properties.whiteSpace = WhiteSpacePropertyInline;
		if( !properties.fontKerning ) properties.fontKerning = FontKerningPropertyText;
		if( !properties.segments ) properties.segments = SegmentsPropertyText;

		// configure
		if ( !values.width ) values.width = '100%';


		// break inheritance chains
		if ( !values.fontSide ) values.fontSide = 0; // FrontSide;

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init( element ) {

		Object.defineProperties( element, {
				isText: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

	}
}

;// CONCATENATED MODULE: ./src/core/properties/InlinesPropertyInlineBlock.js



//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/**
 * @property {Array.<InlineGlyph>} value
 */
class InlinesPropertyInlineBlock extends BaseProperty{

	constructor() {

		super( "inlines", null, false );

		/**
		 *
		 * @type {Array.<Inline>}
		 * @internal
		 */
		this._value = [];

	}

	process( element ) {

		// First gets left side
		this._value[0].paddingLeft = element._padding._value.w;
		this._value[0].marginLeft = element._margin._value.w;

		// Last gets right side
		const lastIndex = this._value.length - 1;
		this._value[lastIndex].paddingRight = element._padding._value.y;
		this._value[lastIndex].marginRight = element._margin._value.y;

	}

}

;// CONCATENATED MODULE: ./src/core/properties/rendering/RendererPropertyInlineBox.js



class RendererPropertyInlineBox extends BaseProperty{

	constructor() {

		super( 'renderer' );

	}


	render( element ) {

		if( !element._backgroundMesh ) {

			element.setBackgroundMesh( new Frame(element) );

		}

		element._backgroundMesh.position.x = element._inlines._value[0].offsetX + element._inlines._value[0].width/2;
		// element._backgroundMesh.position.y = element._inlines._value[0].offsetY + element._inlines._value[0].lineBase/4;
		element._backgroundMesh.position.y = element._inlines._value[0].offsetY + element._inlines._value[0].lineBase/2;

		element._bounds.render( element );

	}

}

;// CONCATENATED MODULE: ./src/core/properties/BoundsInlineBlock.js



class BoundsInlineBlock extends BaseProperty {

	constructor() {

		super( 'bounds', null, false );

		/**
		 *
		 * @type {Vector3}
		 * @internal
		 */
		this._size = new external_three_namespaceObject.Vector3( 1, 1, 1 );

		this._offsetWidth = 0;
		this._offsetHeight = 0;

		this._innerWidth = 0;
		this._innerHeight = 0;
	}




	/* eslint-disable no-unused-vars */ update( element, out ) { /* eslint-enable no-unused-vars */

		this.output( out );

		this._needsProcess = true;

	}

	process( element ) {

		this._offsetWidth = this._innerWidth = element._inlines._value[0].width;
		this._offsetHeight = this._innerHeight = element._inlines._value[0].height;

		this._needsRender = true;

		element._borderWidth._needsRender = true;
		element._borderRadius._needsRender = true;

	}

	/* eslint-disable no-unused-vars */ render( element ) { /* eslint-enable no-unused-vars */

		this._size.x = this._offsetWidth;
		this._size.y = this._offsetHeight;

	}

	/**
	 *
	 * @param {Object.<string,any>} out
	 */
	output( out ) {

		out[ 'size' ] = this._size;

	}

}


;// CONCATENATED MODULE: ./src/elements/basic/InlineBlockElement.js



















class InlineBlockElement extends MeshUIBaseElement {

	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} [values={}]
	 */
	constructor( values = {}) {

		const properties = {};
		InlineBlockElement.definePropertiesValues( properties, values );

		super( properties, values );

		InlineBlockElement.init( this );

	}

	clear() {

		// remove cross reference
		for ( const inline of this._inlines._value ) {
			inline.clear();
		}

		return super.clear();
	}

	/**
	 * When the backgroundMesh has been set, bind properties
	 * @override
	 */
	bindBackgroundMeshProperties () {

		this._backgroundMesh.raycast = ()=>{};

		// bind the background scale with bounds
		this._bounds._size = this._backgroundMesh.scale;
		this._bounds._needsUpdate = true;

	}

	/**
	 * When the backgroundMesh has been unset, unbind properties
	 * @override
	 */
	unbindBackgroundMeshProperties () {

		// detach bounds size
		this._bounds._size = new external_three_namespaceObject.Vector3(1,1,1);
		this._bounds._needsUpdate = true;

	}

	/* eslint-disable no-unused-vars */
	/**
	 *
	 * @override
	 * @param {...Object3D} object
	 * @return {this}
	 */
	add( object ) { /* eslint-enable no-unused-vars */

		/**
		 *
		 * @type {Array.<Object3D>}
		 */
		const validChildren = [];

		for ( let i = 0; i < arguments.length; i++ ) {

			const argument = arguments[ i ];

			if ( !argument.isUI ) {

				validChildren.push( argument );

				argument.position.z = 0.005;

			} else {

				console.warn( 'ThreeMeshUI::InlineBlockElement cannot contains UI Elements.', argument );

			}

		}

		return super.add( ...validChildren );

	}


	/**
	 *
	 * @param {import('./../../core/elements/MeshUIBaseElement').Properties} properties
	 * @param {import('./../../core/elements/MeshUIBaseElement').Options} values
	 */
	static definePropertiesValues( properties, values ) {

		if( !properties.children ) properties.children = ChildrenInline;
		if( !properties.bounds ) properties.bounds = BoundsInlineBlock;
		if( !properties.inlines ) properties.inlines = InlinesPropertyInlineBlock;
		if( !properties.layouter ) properties.layouter = InlineLayouter;
		if( !properties.renderer ) properties.renderer = RendererPropertyInlineBox;

		// reset inlineElement specificity
		if( !properties.fontFamily ) properties.fontFamily = FontFamilyPropertyInline;
		if( !properties.fontWeight ) properties.fontWeight = FontWeightPropertyInline;
		if( !properties.fontStyle ) properties.fontStyle = FontStylePropertyInline;
		if( !properties.fontSize ) properties.fontSize = FontSizePropertyInline;

		if( !properties.backgroundColor ) properties.backgroundColor = BackgroundColorProperty;

		if( !properties.lineBreak ) properties.lineBreak = LineBreakProperty;
		if( !properties.letterSpacing ) properties.letterSpacing = LetterSpacingPropertyInline;
		if( !properties.whiteSpace ) properties.whiteSpace = WhiteSpacePropertyInline;
		if( !properties.fontKerning ) properties.fontKerning = FontKerningProperty;

		if( !values.backgroundSize ) values.backgroundSize = 'cover';
		if( !values.width ) values.width = '100%';
		if( !values.height ) values.height = '100%';
		if( !values.boxSizing ) values.boxSizing = 'border-box';

	}

	/**
	 *
	 * @param {MeshUIBaseElement} element
	 */
	static init( element ) {

		Object.defineProperties( element, {
				isInline: {
					configurable: false,
					enumerable: true,
					value: true
				},
				isInlineBlock: {
					configurable: false,
					enumerable: true,
					value: true
				}
			}
		);

		element._inlines._value = [new InlineBlockInline(element)];

		element.backgroundMaterial = new FrameMaterial();
		element._renderer.render( element );

	}

}




/**
 * InlineBlock has its own Inline implementation
 */
class InlineBlockInline extends Inline {

	/**
	 *
	 * @param {InlineBlockElement} parent
	 */
	constructor( parent ) {

		super();

		/**
		 * @TODO: This currently make a circular reference that should ideally be removed
		 * @type {InlineBlockElement}
		 * @private
		 */
		this._uiElement = parent;

	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get xadvance() {

		const padding = this._uiElement._padding._value;
		const width = this._uiElement._width;
		if( width._relative ) {
			return width._value * this._uiElement._fontSize.getInheritedInput( this._uiElement );
		}

		return padding.w + padding.y + width.value ;
	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get width() {

		const width = this._uiElement._width;

		if( width._relative ) {
			return width._value * this._uiElement._fontSize.getInheritedInput( this._uiElement );
		}

		return width.value;

	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get height() {

		const height = this._uiElement._height;
		if( height._relative ) {
			return height._value * this._uiElement._fontSize.getInheritedInput( this._uiElement ) ;
		}

		return height.value;

	}

	get anchor(){
		return this.height;
	}


	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get lineHeight() {

		const height = this._uiElement._height;
		if( height._relative ) {
			return height._value * this._uiElement._fontSize.getInheritedInput( this._uiElement );
		}

		return height.value;

	}

	/**
	 * Rely on the parent for size computation
	 * @override
	 * @returns {number}
	 */
	get lineBase() {

		const height = this._uiElement._height;
		if( height._relative ) {
			return height._value * this._uiElement._fontSize.getInheritedInput( this._uiElement );
		}

		return height.value;

	}

	/**
	 *
	 */
	clear() {

		this._uiElement = null;

	}

}


;// CONCATENATED MODULE: ./src/utils/Behavior.js
//JSDoc related imports
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */


class Behavior {

	/**
	 *
	 * @param {MeshUIBaseElement} subject
	 */
	constructor( subject ) {

		/**
		 *
		 * @type {MeshUIBaseElement}
		 * @protected
		 */
		this._subject = subject;

	}

	/**
	 * @abstract
	 */
	attach() {

		console.error(`Behavior::attach() - Is abstract and therefore should be overridden in ${this.constructor.name}`);

	}

	/**
	 * @abstract
	 * @returns {void}
	 */
	act() {

		throw new Error(`Behavior::act() - Is abstract and therefore should be overridden in ${this.constructor.name}`);

	}

	/**
	 * @abstract
	 */
	detach() {

		console.error(`Behavior::detach() - Is abstract and therefore should be overridden in ${this.constructor.name}`);

	}

	/**
	 *
	 */
	clear() {

	}

}

;// CONCATENATED MODULE: ./src/three-mesh-ui.js
/* global global */
























const update = () => UpdateManager.update();

const ThreeMeshUI = {
	BaseProperty: BaseProperty,
	Block: BlockElement,
	Text : TextElement,
	Inline: InlineElement,
	InlineBlock : InlineBlockElement,
	// Keyboard : KeyboardElement,
	MeshUIBaseElement: MeshUIBaseElement,
	FontLibrary: font_FontLibrary,
	update,
	MSDFFontMaterialUtils: MSDFFontMaterialUtils,
	ShaderChunkUI: ShaderChunkUI,
	Behavior: Behavior,
	FontVariant: font_FontVariant,
	DefaultValues: DefaultValues_namespaceObject,
	InheritableProperty: InheritableProperty,
	TextContentProperty: TextContentProperty,
};


if ( typeof global !== 'undefined' ) global.ThreeMeshUI = ThreeMeshUI;





















/* harmony default export */ const three_mesh_ui = (ThreeMeshUI);

// console.warn("ThreeMeshUI v7.1.x - Three "+window.__THREE__)





var __webpack_exports__BaseProperty = __webpack_exports__.ti;
var __webpack_exports__Behavior = __webpack_exports__.nS;
var __webpack_exports__Block = __webpack_exports__.eB;
var __webpack_exports__DefaultValues = __webpack_exports__.Yp;
var __webpack_exports__FontLibrary = __webpack_exports__.VB;
var __webpack_exports__FontVariant = __webpack_exports__.BC;
var __webpack_exports__InheritableProperty = __webpack_exports__.zN;
var __webpack_exports__Inline = __webpack_exports__.cV;
var __webpack_exports__InlineBlock = __webpack_exports__.hW;
var __webpack_exports__InlineGlyph = __webpack_exports__.k2;
var __webpack_exports__MSDFFontMaterialUtils = __webpack_exports__.K6;
var __webpack_exports__MaterialTransformers = __webpack_exports__.M7;
var __webpack_exports__MeshUIBaseElement = __webpack_exports__.ls;
var __webpack_exports__ShaderChunkUI = __webpack_exports__.Hi;
var __webpack_exports__Text = __webpack_exports__.EY;
var __webpack_exports__TextContentProperty = __webpack_exports__.ME;
var __webpack_exports__TypographicFont = __webpack_exports__.MR;
var __webpack_exports__TypographicGlyph = __webpack_exports__.zf;
var __webpack_exports__default = __webpack_exports__.Ay;
var __webpack_exports__update = __webpack_exports__.yo;
export { __webpack_exports__BaseProperty as BaseProperty, __webpack_exports__Behavior as Behavior, __webpack_exports__Block as Block, __webpack_exports__DefaultValues as DefaultValues, __webpack_exports__FontLibrary as FontLibrary, __webpack_exports__FontVariant as FontVariant, __webpack_exports__InheritableProperty as InheritableProperty, __webpack_exports__Inline as Inline, __webpack_exports__InlineBlock as InlineBlock, __webpack_exports__InlineGlyph as InlineGlyph, __webpack_exports__MSDFFontMaterialUtils as MSDFFontMaterialUtils, __webpack_exports__MaterialTransformers as MaterialTransformers, __webpack_exports__MeshUIBaseElement as MeshUIBaseElement, __webpack_exports__ShaderChunkUI as ShaderChunkUI, __webpack_exports__Text as Text, __webpack_exports__TextContentProperty as TextContentProperty, __webpack_exports__TypographicFont as TypographicFont, __webpack_exports__TypographicGlyph as TypographicGlyph, __webpack_exports__default as default, __webpack_exports__update as update };
