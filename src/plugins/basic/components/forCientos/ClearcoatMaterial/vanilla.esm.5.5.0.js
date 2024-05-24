import objectHash from 'object-hash'
import * as THREE from 'three'

function _toPrimitive(input, hint) {
    if (typeof input !== 'object' || input === null) return input
    var prim = input[Symbol.toPrimitive]
    if (prim !== undefined) {
        var res = prim.call(input, hint || 'default')
        if (typeof res !== 'object') return res
        throw new TypeError('@@toPrimitive must return a primitive value.')
    }
    return (hint === 'string' ? String : Number)(input)
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, 'string')
    return typeof key === 'symbol' ? key : String(key)
}

function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key)
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
        })
    } else {
        obj[key] = value
    }
    return obj
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object)
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object)
        enumerableOnly &&
            (symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })),
            keys.push.apply(keys, symbols)
    }
    return keys
}
function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {}
        i % 2
            ? ownKeys(Object(source), !0).forEach(function (key) {
                  _defineProperty(target, key, source[key])
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
            : ownKeys(Object(source)).forEach(function (key) {
                  Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
              })
    }
    return target
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {}
    var target = {}
    var sourceKeys = Object.keys(source)
    var key, i
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i]
        if (excluded.indexOf(key) >= 0) continue
        target[key] = source[key]
    }
    return target
}

function _objectWithoutProperties(source, excluded) {
    if (source == null) return {}
    var target = _objectWithoutPropertiesLoose(source, excluded)
    var key, i
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i]
            if (excluded.indexOf(key) >= 0) continue
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue
            target[key] = source[key]
        }
    }
    return target
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr
}

function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : ('undefined' != typeof Symbol && arr[Symbol.iterator]) || arr['@@iterator']
    if (null != _i) {
        var _s,
            _e,
            _x,
            _r,
            _arr = [],
            _n = !0,
            _d = !1
        try {
            if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
                if (Object(_i) !== _i) return
                _n = !1
            } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
        } catch (err) {
            ;(_d = !0), (_e = err)
        } finally {
            try {
                if (!_n && null != _i.return && ((_r = _i.return()), Object(_r) !== _r)) return
            } finally {
                if (_d) throw _e
            }
        }
        return _arr
    }
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
    return arr2
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
    var n = Object.prototype.toString.call(o).slice(8, -1)
    if (n === 'Object' && o.constructor) n = o.constructor.name
    if (n === 'Map' || n === 'Set') return Array.from(o)
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen)
}

function _nonIterableRest() {
    throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    )
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i]
        descriptor.enumerable = descriptor.enumerable || false
        descriptor.configurable = true
        if ('value' in descriptor) descriptor.writable = true
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    Object.defineProperty(Constructor, 'prototype', {
        writable: false,
    })
    return Constructor
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function _setPrototypeOf(o, p) {
              o.__proto__ = p
              return o
          }
    return _setPrototypeOf(o, p)
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function')
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true,
        },
    })
    Object.defineProperty(subClass, 'prototype', {
        writable: false,
    })
    if (superClass) _setPrototypeOf(subClass, superClass)
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o)
          }
    return _getPrototypeOf(o)
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false
    if (Reflect.construct.sham) return false
    if (typeof Proxy === 'function') return true
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
        return true
    } catch (e) {
        return false
    }
}

function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === 'object' || typeof call === 'function')) {
        return call
    } else if (call !== void 0) {
        throw new TypeError('Derived constructors may only return object or undefined')
    }
    return _assertThisInitialized(self)
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct()
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor
            result = Reflect.construct(Super, arguments, NewTarget)
        } else {
            result = Super.apply(this, arguments)
        }
        return _possibleConstructorReturn(this, result)
    }
}

// Map of all CSM keywords
var keywordMap = {
    // PBR
    diffuse: 'csm_DiffuseColor',
    // Color + alpha
    normal: 'csm_Normal',
    // Normal
    roughness: 'csm_Roughness',
    // Roughness
    metalness: 'csm_Metalness',
    // Metalness
    emissive: 'csm_Emissive',
    // Emissive
    ao: 'csm_AO',
    // AO
    bump: 'csm_Bump',
    // Bump
    clearcoat: 'csm_Clearcoat',
    // Clearcoat factor
    clearcoatRoughness: 'csm_ClearcoatRoughness',
    // Clearcoat roughness
    clearcoatNormal: 'csm_ClearcoatNormal',
    // Clearcoat normals

    // Extras
    pointSize: 'csm_PointSize',
    fragColor: 'csm_FragColor',
    depthAlpha: 'csm_DepthAlpha',
    // Depth

    // Vert
    position: 'csm_Position',
    positionRaw: 'csm_PositionRaw',
}

var _defaultAvailabilityM

// Map of CSM keywords to the materials they are available in
// Some keywords are only available in certain materials
var defaultAvailabilityMap =
    ((_defaultAvailabilityM = {}),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.position), '*'),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.positionRaw), '*'),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.normal), '*'),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.pointSize), ['PointsMaterial']),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.diffuse), '*'),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.fragColor), '*'),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.emissive), ['MeshStandardMaterial', 'MeshPhysicalMaterial']),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.roughness), ['MeshStandardMaterial', 'MeshPhysicalMaterial']),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.metalness), ['MeshStandardMaterial', 'MeshPhysicalMaterial']),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.ao), [
        'MeshStandardMaterial',
        'MeshPhysicalMaterial',
        'MeshBasicMaterial',
        'MeshLambertMaterial',
        'MeshPhongMaterial',
        'MeshToonMaterial',
    ]),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.bump), [
        'MeshLambertMaterial',
        'MeshMatcapMaterial',
        'MeshNormalMaterial',
        'MeshPhongMaterial',
        'MeshPhysicalMaterial',
        'MeshStandardMaterial',
        'MeshToonMaterial',
        'ShadowMaterial',
    ]),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.depthAlpha), ['MeshDepthMaterial']),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.clearcoat), ['MeshPhysicalMaterial']),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.clearcoatRoughness), ['MeshPhysicalMaterial']),
    _defineProperty(_defaultAvailabilityM, ''.concat(keywordMap.clearcoatNormal), ['MeshPhysicalMaterial']),
    _defaultAvailabilityM)

// Map of shader includes to be expanded
// Some substitutions require 2 replacements within
// one include, which is not possible without expanding the includes.
var expansionMaps = {
    '#include <lights_physical_fragment>': THREE.ShaderChunk.lights_physical_fragment,
}

var _defaultPatchMap, _shaderMaterial_Patch

// Map of CSM keywords to their substitutions
var defaultPatchMap =
    ((_defaultPatchMap = {}),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.normal), {
        '#include <beginnormal_vertex>': '\n    vec3 objectNormal = '.concat(
            keywordMap.normal,
            ';\n    #ifdef USE_TANGENT\n\t    vec3 objectTangent = vec3( tangent.xyz );\n    #endif\n    ',
        ),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.position), {
        '#include <begin_vertex>': '\n    vec3 transformed = '.concat(keywordMap.position, ';\n  '),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.positionRaw), {
        '#include <begin_vertex>': '\n    vec4 csm_internal_positionUnprojected = '.concat(
            keywordMap.positionRaw,
            ';\n    mat4x4 csm_internal_unprojectMatrix = projectionMatrix * modelViewMatrix;\n    #ifdef USE_INSTANCING\n      csm_internal_unprojectMatrix = csm_internal_unprojectMatrix * instanceMatrix;\n    #endif\n    csm_internal_positionUnprojected = inverse(csm_internal_unprojectMatrix) * csm_internal_positionUnprojected;\n    vec3 transformed = csm_internal_positionUnprojected.xyz;\n  ',
        ),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.pointSize), {
        'gl_PointSize = size;': '\n    gl_PointSize = '.concat(keywordMap.pointSize, ';\n    '),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.diffuse), {
        '#include <color_fragment>': '\n    #include <color_fragment>\n    diffuseColor = '.concat(keywordMap.diffuse, ';\n  '),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.fragColor), {
        '#include <dithering_fragment>': '\n    #include <dithering_fragment>\n    gl_FragColor  = '.concat(keywordMap.fragColor, ';\n  '),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.emissive), {
        'vec3 totalEmissiveRadiance = emissive;': '\n    vec3 totalEmissiveRadiance = '.concat(keywordMap.emissive, ';\n    '),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.roughness), {
        '#include <roughnessmap_fragment>': '\n    #include <roughnessmap_fragment>\n    roughnessFactor = '.concat(keywordMap.roughness, ';\n    '),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.metalness), {
        '#include <metalnessmap_fragment>': '\n    #include <metalnessmap_fragment>\n    metalnessFactor = '.concat(keywordMap.metalness, ';\n    '),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.ao), {
        '#include <aomap_fragment>': '\n    #include <aomap_fragment>\n    reflectedLight.indirectDiffuse *= 1. - '.concat(keywordMap.ao, ';\n    '),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.bump), {
        '#include <normal_fragment_maps>': '\n    #include <normal_fragment_maps>\n\n    vec3 csm_internal_orthogonal = '
            .concat(keywordMap.bump, ' - (dot(')
            .concat(
                keywordMap.bump,
                ', normal) * normal);\n    vec3 csm_internal_projectedbump = mat3(csm_internal_vModelViewMatrix) * csm_internal_orthogonal;\n    normal = normalize(normal - csm_internal_projectedbump);\n    ',
            ),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.depthAlpha), {
        'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );': '\n      gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity * '.concat(
            keywordMap.depthAlpha,
            ' );\n    ',
        ),
        'gl_FragColor = packDepthToRGBA( fragCoordZ );': '\n      gl_FragColor = packDepthToRGBA( fragCoordZ );\n      gl_FragColor.a *= '.concat(
            keywordMap.depthAlpha,
            ';\n    ',
        ),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.clearcoat), {
        'material.clearcoat = clearcoat;': 'material.clearcoat = '.concat(keywordMap.clearcoat, ';'),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.clearcoatRoughness), {
        'material.clearcoatRoughness = clearcoatRoughness;': 'material.clearcoatRoughness = '.concat(keywordMap.clearcoatRoughness, ';'),
    }),
    _defineProperty(_defaultPatchMap, ''.concat(keywordMap.clearcoatNormal), {
        '#include <clearcoat_normal_fragment_begin>':
            '\n      vec3 csm_coat_internal_orthogonal = csm_ClearcoatNormal - (dot(csm_ClearcoatNormal, nonPerturbedNormal) * nonPerturbedNormal);\n      vec3 csm_coat_internal_projectedbump = mat3(csm_internal_vModelViewMatrix) * csm_coat_internal_orthogonal;\n      vec3 clearcoatNormal = normalize(nonPerturbedNormal - csm_coat_internal_projectedbump);\n    ',
    }),
    _defaultPatchMap)
var shaderMaterial_PatchMap =
    ((_shaderMaterial_Patch = {}),
    _defineProperty(_shaderMaterial_Patch, ''.concat(keywordMap.position), {
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );': '\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( '.concat(
            keywordMap.position,
            ', 1.0 );\n  ',
        ),
    }),
    _defineProperty(_shaderMaterial_Patch, ''.concat(keywordMap.positionRaw), {
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );': '\n    gl_Position = '.concat(keywordMap.position, ';\n  '),
    }),
    _defineProperty(_shaderMaterial_Patch, ''.concat(keywordMap.diffuse), {
        'gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );': '\n    gl_FragColor = '.concat(keywordMap.diffuse, ';\n  '),
    }),
    _defineProperty(_shaderMaterial_Patch, ''.concat(keywordMap.fragColor), {
        'gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );': '\n    gl_FragColor = '.concat(keywordMap.fragColor, ';\n  '),
    }),
    _shaderMaterial_Patch)

// Map of props to their keywords
// this is because Three only injects some defines
// if certain properties are set in the material options.
// We need to enforce these props on the material. For example
// the user uses csm_Clearcoat but does not set clearcoat on the material.
var requiredPropsMap = {
    clearcoat: [keywordMap.clearcoat, keywordMap.clearcoatNormal, keywordMap.clearcoatRoughness],
}

var defaultCsmDefinitions =
    /* glsl */ '\n    \n#ifdef IS_VERTEX\n    vec3 csm_Position;\n    vec4 csm_PositionRaw;\n    vec3 csm_Normal;\n\n    // csm_PointSize\n    #ifdef IS_POINTSMATERIAL\n        float csm_PointSize;\n    #endif\n#else\n    vec4 csm_DiffuseColor;\n    vec4 csm_FragColor;\n\n    // csm_Emissive, csm_Roughness, csm_Metalness\n    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL\n        vec3 csm_Emissive;\n        float csm_Roughness;\n        float csm_Metalness;\n        \n        #if defined IS_MESHPHYSICALMATERIAL\n            float csm_Clearcoat;\n            float csm_ClearcoatRoughness;\n            vec3 csm_ClearcoatNormal;\n        #endif\n    #endif\n\n    // csm_AO\n    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHBASICMATERIAL || defined IS_MESHLAMBERTMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHTOONMATERIAL\n        float csm_AO;\n    #endif\n\n    // csm_Bump\n    #if defined IS_MESHLAMBERTMATERIAL || defined IS_MESHMATCAPMATERIAL || defined IS_MESHNORMALMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHSTANDARDMATERIAL || defined IS_MESHTOONMATERIAL || defined IS_SHADOWMATERIAL \n        vec3 csm_Bump;\n    #endif\n\n    float csm_DepthAlpha;\n#endif\n'
var defaultCsmMainDefinitions =
    /* glsl */ '\n\n#ifdef IS_VERTEX\n    // csm_Position & csm_PositionRaw\n    #ifdef IS_UNKNOWN\n        csm_Position = vec3(0.0);\n        csm_PositionRaw = vec4(0.0);\n        csm_Normal = vec3(0.0);\n    #else\n        csm_Position = position;\n        csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(position, 1.);\n        csm_Normal = normal;\n    #endif\n\n    // csm_PointSize\n    #ifdef IS_POINTSMATERIAL\n        csm_PointSize = size;\n    #endif\n#else\n    // csm_DiffuseColor & csm_FragColor\n    #if defined IS_UNKNOWN || defined IS_SHADERMATERIAL || defined IS_MESHDEPTHMATERIAL || defined IS_MESHNORMALMATERIAL || defined IS_SHADOWMATERIAL\n        csm_DiffuseColor = vec4(1.0, 0.0, 1.0, 1.0);\n        csm_FragColor = vec4(1.0, 0.0, 1.0, 1.0);\n    #else\n        #ifdef USE_MAP\n            vec4 _csm_sampledDiffuseColor = texture2D(map, vMapUv);\n\n            #ifdef DECODE_VIDEO_TEXTURE\n            // inline sRGB decode (TODO: Remove this code when https://crbug.com/1256340 is solved)\n            _csm_sampledDiffuseColor = vec4(mix(pow(_csm_sampledDiffuseColor.rgb * 0.9478672986 + vec3(0.0521327014), vec3(2.4)), _csm_sampledDiffuseColor.rgb * 0.0773993808, vec3(lessThanEqual(_csm_sampledDiffuseColor.rgb, vec3(0.04045)))), _csm_sampledDiffuseColor.w);\n            #endif\n\n            csm_DiffuseColor = vec4(diffuse, opacity) * _csm_sampledDiffuseColor;\n            csm_FragColor = vec4(diffuse, opacity) * _csm_sampledDiffuseColor;\n        #else\n            csm_DiffuseColor = vec4(diffuse, opacity);\n            csm_FragColor = vec4(diffuse, opacity);\n        #endif\n    #endif\n\n    // csm_Emissive, csm_Roughness, csm_Metalness\n    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL\n        csm_Emissive = emissive;\n        csm_Roughness = roughness;\n        csm_Metalness = metalness;\n\n        #if defined IS_MESHPHYSICALMATERIAL\n            #ifdef USE_CLEARCOAT\n                csm_Clearcoat = clearcoat;\n                csm_ClearcoatRoughness = clearcoatRoughness;\n            #else\n                csm_Clearcoat = 0.0;\n                csm_ClearcoatRoughness = 0.0;\n            #endif\n        #endif\n    #endif\n\n    // csm_AO\n    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHBASICMATERIAL || defined IS_MESHLAMBERTMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHTOONMATERIAL\n        csm_AO = 0.0;\n    #endif\n\n    // csm_Bump\n    #if defined IS_MESHLAMBERTMATERIAL || defined IS_MESHMATCAPMATERIAL || defined IS_MESHNORMALMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHSTANDARDMATERIAL || defined IS_MESHTOONMATERIAL || defined IS_SHADOWMATERIAL \n        csm_Bump = vec3(0.0);\n    #endif\n\n    csm_DepthAlpha = 1.0;\n#endif\n'
var defaultVertDefinitions = /* glsl */ '\n    varying mat4 csm_internal_vModelViewMatrix;\n'
var defaultVertMain = /* glsl */ '\n    csm_internal_vModelViewMatrix = modelViewMatrix;\n'
var defaultFragDefinitions = /* glsl */ '\n    varying mat4 csm_internal_vModelViewMatrix;\n'
var defaultFragMain = /* glsl */ '\n    \n'

var _excluded = ['baseMaterial', 'fragmentShader', 'vertexShader', 'uniforms', 'patchMap', 'cacheKey', 'silent']
var hash = function hash(obj) {
    return objectHash(obj, {
        excludeValues: true,
    })
}
var replaceAll = function replaceAll(str, find, rep) {
    return str.split(find).join(rep)
}
var escapeRegExpMatch = function escapeRegExpMatch(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
var isExactMatch = function isExactMatch(str, match) {
    return new RegExp('\\b'.concat(escapeRegExpMatch(match), '\\b')).test(str)
}

// Hacky, yikes!
function isConstructor(f) {
    try {
        // @ts-ignore
        new f()
    } catch (err) {
        if (err.message.indexOf('is not a constructor') >= 0) {
            return false
        }
    }
    return true
}
function copyObject(target, source) {
    var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false
    Object.assign(target, source)
    var proto = Object.getPrototypeOf(source)
    Object.entries(Object.getOwnPropertyDescriptors(proto))
        .filter(function (e) {
            var isGetter = typeof e[1].get === 'function'
            var isSetter = typeof e[1].set === 'function'
            var isFunction = typeof e[1].value === 'function'
            var isConstructor = e[0] === 'constructor'
            return (isGetter || isSetter || isFunction) && !isConstructor
        })
        .forEach(function (val) {
            // If function exists on target, rename it with "base_" prefix
            if (typeof target[val[0]] === 'function') {
                if (!silent) {
                    // hawk delete
                    // console.warn("Function ".concat(val[0], " already exists on CSM. Overriding."));
                }
                return
            }
            Object.defineProperty(target, val[0], val[1])
        })
}
function isFunctionEmpty(fn) {
    var fnString = fn.toString().trim()
    var fnBody = fnString.substring(fnString.indexOf('{') + 1, fnString.lastIndexOf('}'))
    return fnBody.trim().length === 0
}
function stripSpaces(str) {
    return str ? str.replace(/\s/g, '') : undefined
}
function stripComments(str) {
    return str.replace(/\/\*\*(.*?)\*\/|\/\/(.*?)\n/gm, '')
}
function replaceLastOccurrence(str, find, rep) {
    var index = str.lastIndexOf(find)
    if (index === -1) {
        return str
    }
    return str.substring(0, index) + rep + str.substring(index + find.length)
}
var CustomShaderMaterial = /*#__PURE__*/ (function (_THREE$Material) {
    _inherits(CustomShaderMaterial, _THREE$Material)
    var _super = _createSuper(CustomShaderMaterial)
    function CustomShaderMaterial(_ref) {
        var _this
        var baseMaterial = _ref.baseMaterial,
            fragmentShader = _ref.fragmentShader,
            vertexShader = _ref.vertexShader,
            uniforms = _ref.uniforms,
            patchMap = _ref.patchMap,
            cacheKey = _ref.cacheKey,
            silent = _ref.silent,
            opts = _objectWithoutProperties(_ref, _excluded)
        _classCallCheck(this, CustomShaderMaterial)
        var base
        if (isConstructor(baseMaterial)) {
            // If base material is a constructor, instantiate it
            base = new baseMaterial(opts)
        } else {
            // Else, copy options onto base material and use the already create
            // instance as the base material
            base = baseMaterial
            Object.assign(base, opts)
        }

        // Supporting RawShaderMaterial is redundant as there is nothing
        // to patch, extend or override
        if (base.type === 'RawShaderMaterial') {
            throw new Error('CustomShaderMaterial does not support RawShaderMaterial')
        }

        // Copy all properties from base material onto this material
        // Rename any functions that already exist on this material with "base_" prefix
        _this = _super.call(this)
        copyObject(_assertThisInitialized(_this), base, silent)

        // Set up private internals
        _this.__csm = {
            patchMap: patchMap || {},
            fragmentShader: fragmentShader || '',
            vertexShader: vertexShader || '',
            cacheKey: cacheKey,
            baseMaterial: baseMaterial,
            instanceID: THREE.MathUtils.generateUUID(),
            type: base.type,
            isAlreadyExtended: !isFunctionEmpty(base.onBeforeCompile),
            cacheHash: '',
            silent: silent,
        }
        _this.uniforms = _objectSpread2(_objectSpread2({}, _this.uniforms || {}), uniforms || {})

        // Scoped to avoid name collisions
        {
            // Generate material and assign cache key
            var _this$__csm = _this.__csm,
                _fragmentShader = _this$__csm.fragmentShader,
                _vertexShader = _this$__csm.vertexShader
            var _uniforms = _this.uniforms
            _this.__csm.cacheHash = _this._getCacheHash()
            _this._generateMaterial(_fragmentShader, _vertexShader, _uniforms)
        }
        return _this
    }

    /**
     *
     * Update the material with new arguments.
     * TODO: Fix memory leak.
     *
     * @param opts Options to update the material with.
     *
     * @deprecated This method leaks memory.
     */
    _createClass(CustomShaderMaterial, [
        {
            key: 'update',
            value: function update() {
                var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
                // Basically just re-run the last bit of the constructor
                this.uniforms = opts.uniforms || this.uniforms
                Object.assign(this.__csm, opts)
                var _this$__csm2 = this.__csm,
                    fragmentShader = _this$__csm2.fragmentShader,
                    vertexShader = _this$__csm2.vertexShader
                var uniforms = this.uniforms
                var newHash = this._getCacheHash()
                this.__csm.cacheHash = newHash
                this._generateMaterial(fragmentShader, vertexShader, uniforms)
            },

            /**
             * Returns a new instance of this material with the same options.
             *
             * @returns A clone of this material.
             */
        },
        {
            key: 'clone',
            value: function clone() {
                var opts = {
                    baseMaterial: this.__csm.baseMaterial,
                    fragmentShader: this.__csm.fragmentShader,
                    vertexShader: this.__csm.vertexShader,
                    uniforms: this.uniforms,
                    silent: this.__csm.silent,
                    patchMap: this.__csm.patchMap,
                    cacheKey: this.__csm.cacheKey,
                }
                var clone = new this.constructor(opts)
                Object.assign(this, clone)
                return clone
            },

            /**
             * Internally calculates the cache key for this instance of CSM.
             * If no specific CSM inputs are provided, the cache key is the same as the default
             * cache key, i.e. `baseMaterial.onBeforeCompile.toString()`. Not meant to be called directly.
             *
             * This method is quite expensive owing to the hashing function and string manip.
             *
             * TODO:
             * - Optimize string manip.
             * - Find faster hash function
             *
             * @returns {string} A cache key for this instance of CSM.
             */
        },
        {
            key: '_getCacheHash',
            value: function _getCacheHash() {
                // The cache key is a hash of the fragment shader, vertex shader, and uniforms
                var _this$__csm3 = this.__csm,
                    fragmentShader = _this$__csm3.fragmentShader,
                    vertexShader = _this$__csm3.vertexShader
                var uniforms = this.uniforms

                // We strip spaces because whitespace is not significant in GLSL
                // and we want `blah` and `     blah ` to be the same.
                var hashInp = [stripSpaces(fragmentShader), stripSpaces(vertexShader), uniforms].filter(function (inp) {
                    return inp !== undefined
                })

                // If CSM inputs are empty, use default cache key
                // This means that `<baseMaterial />` and <CSM baseMaterial={baseMaterial} />`
                // are the same shader program, i.e they share the same cache key
                return hashInp.length > 0 ? hash(hashInp) : this.customProgramCacheKey()
            },

            /**
             * Does the internal shader generation. Not meant to be called directly.
             *
             * @param fragmentShader
             * @param vertexShader
             * @param uniforms
             */
        },
        {
            key: '_generateMaterial',
            value: function _generateMaterial(fragmentShader, vertexShader, uniforms) {
                var _this2 = this
                // Get parsed shaders. A Parsed shader is a shader with
                // it's `#define`s, function and var definitions and main separated.
                this.uniforms = uniforms || {}

                // Set material cache key
                this.customProgramCacheKey = function () {
                    return _this2.__csm.cacheHash
                }

                // Set onBeforeCompile
                var customOnBeforeCompile = function customOnBeforeCompile(shader) {
                    try {
                        var materialDefine = _this2._getMaterialDefine()

                        // If Fragment shader is not empty, patch it
                        if (fragmentShader) {
                            var patchedFragmentShader = _this2._patchShader(stripComments(fragmentShader), shader.fragmentShader, true)
                            shader.fragmentShader = materialDefine + patchedFragmentShader
                        }

                        // If Vertex shader is not empty, patch it
                        if (vertexShader) {
                            var patchedVertexShader = _this2._patchShader(stripComments(vertexShader), shader.vertexShader)
                            shader.vertexShader = '#define IS_VERTEX;\n' + patchedVertexShader
                            shader.vertexShader = materialDefine + shader.vertexShader
                        }

                        // Patch uniforms
                        shader.uniforms = _objectSpread2(_objectSpread2({}, shader.uniforms), _this2.uniforms)
                        _this2.uniforms = shader.uniforms
                    } catch (error) {
                        console.error(error)
                    }
                }
                if (this.__csm.isAlreadyExtended) {
                    // If the material has already been extending via onBeforeCompile has a
                    // then chain the new onBeforeCompile after the old one.
                    var prevOnBeforeCompile = this.onBeforeCompile
                    this.onBeforeCompile = function (shader, renderer) {
                        prevOnBeforeCompile(shader, renderer)
                        customOnBeforeCompile(shader)
                    }
                } else {
                    // Else just set the onBeforeCompile
                    this.onBeforeCompile = customOnBeforeCompile
                }
                this.needsUpdate = true
            },

            /**
             * Patches input shader with custom shader. Not meant to be called directly.
             * @param customShader
             * @param shader
             * @param isFrag
             * @returns
             */
        },
        {
            key: '_patchShader',
            value: function _patchShader(customShader, currentShader, isFrag) {
                var _this3 = this
                var patchedShader = currentShader

                // Get the patch map, its a combination of the default patch map and the
                // user defined patch map. The user defined map takes precedence.
                var patchMap = _objectSpread2(_objectSpread2({}, this._getPatchMapForMaterial()), this.__csm.patchMap)

                // Enforce requiredPropsMap
                Object.entries(requiredPropsMap).forEach(function (_ref2) {
                    var _ref3 = _slicedToArray(_ref2, 2),
                        prop = _ref3[0],
                        keywords = _ref3[1]
                    var key = keywords.find(function (keyword) {
                        return isExactMatch(customShader, keyword)
                    })
                    if (key) {
                        // @ts-ignore
                        if (!_this3[prop]) {
                            throw new Error('CSM: Property "'.concat(prop, '" is required to use output "').concat(key, '". Shader cannot compile.'))
                        }
                    }
                })

                // Apply expansion maps as some substitutions require 2 replacements within
                // one include, which is not possible without expanding the includes.
                Object.entries(expansionMaps).forEach(function (_ref4) {
                    var _ref5 = _slicedToArray(_ref4, 2),
                        key = _ref5[0],
                        value = _ref5[1]
                    patchedShader = replaceAll(patchedShader, key, value)
                })

                // Replace all entries in the patch map
                Object.keys(patchMap).forEach(function (name) {
                    Object.keys(patchMap[name]).forEach(function (key) {
                        var availableIn = defaultAvailabilityMap[name]
                        var type = _this3.__csm.type

                        // Only inject keywords that appear in the shader.
                        // If the keyword is '*', then inject the patch regardless.
                        if (name === '*' || isExactMatch(customShader, name)) {
                            if (!availableIn || (Array.isArray(availableIn) && availableIn.includes(type)) || availableIn === '*') {
                                patchedShader = replaceAll(patchedShader, key, patchMap[name][key])
                            } else {
                                throw new Error('CSM: '.concat(name, ' is not available in ').concat(type, '. Shader cannot compile.'))
                            }
                        }
                    })
                })

                // Rename main in customShader to csm__main
                var csmMainFunctionName = 'csm_main_' + this.__csm.instanceID.replace(/-/g, '_')
                var renamedCustomShader = customShader.replace(/void\s+main\s*\(\s*\)/g, 'void '.concat(csmMainFunctionName, '()'))
                var hasMain = customShader.includes('void main()')
                var isAlreadyExtendedByCSM = patchedShader.includes('// #_CSM_#')
                if (hasMain) {
                    if (isAlreadyExtendedByCSM && this.__csm.isAlreadyExtended) {
                        // Inject defaults
                        // If the shader has already been extended by CSM
                        // then we don't need to inject the defaults again.
                        patchedShader = patchedShader.replace(
                            'void main() {',
                            '\n            '.concat(renamedCustomShader, '\n            \n            void main() {\n          '),
                        )

                        // Find the end of the previously injected main call
                        // and add the new main call after it.
                        patchedShader = replaceLastOccurrence(
                            patchedShader,
                            '// #_CSM_#',
                            '\n            '.concat(csmMainFunctionName, '();\n            // #_CSM_#\n          '),
                        )
                    } else {
                        // If this is the first time the shader is being extended by CSM
                        // Add the default definitions and main call
                        patchedShader = patchedShader.replace(
                            'void main() {',
                            '\n            #ifndef CSM_IS_HEAD_DEFAULTS_DEFINED\n              '
                                .concat(
                                    isFrag ? defaultFragDefinitions : defaultVertDefinitions,
                                    '\n              #define CSM_IS_HEAD_DEFAULTS_DEFINED 1\n            #endif\n    \n            ',
                                )
                                .concat(defaultCsmDefinitions, '\n    \n            ')
                                .concat(
                                    renamedCustomShader,
                                    '\n            \n            void main() {\n              #ifndef CSM_IS_DEFAULTS_DEFINED\n                ',
                                )
                                .concat(
                                    defaultCsmMainDefinitions,
                                    '\n                #define CSM_IS_DEFAULTS_DEFINED 1\n              #endif\n              \n              #ifndef CSM_IS_MAIN_DEFAULTS_DEFINED\n                ',
                                )
                                .concat(
                                    isFrag ? defaultFragMain : defaultVertMain,
                                    '\n                #define CSM_IS_MAIN_DEFAULTS_DEFINED 1\n              #endif\n  \n              ',
                                )
                                .concat(csmMainFunctionName, '();\n              // #_CSM_#\n          '),
                        )
                    }
                }
                return patchedShader
            },

            /**
             * Gets the material type as a string. Not meant to be called directly.
             * @returns
             */
        },
        {
            key: '_getMaterialDefine',
            value: function _getMaterialDefine() {
                var type = this.__csm.type
                return type ? '#define IS_'.concat(type.toUpperCase(), ';\n') : '#define IS_UNKNOWN;\n'
            },

            /**
             * Gets the right patch map for the material. Not meant to be called directly.
             * @returns
             */
        },
        {
            key: '_getPatchMapForMaterial',
            value: function _getPatchMapForMaterial() {
                switch (this.__csm.type) {
                    case 'ShaderMaterial':
                        return shaderMaterial_PatchMap
                    default:
                        return defaultPatchMap
                }
            },
        },
    ])
    return CustomShaderMaterial
})(THREE.Material)

export { CustomShaderMaterial as C, _objectWithoutProperties as _, _objectSpread2 as a }
