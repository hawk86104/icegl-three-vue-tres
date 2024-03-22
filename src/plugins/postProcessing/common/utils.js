import * as THREE from 'three'

const loadShader = function (file, callback) {

  const oReq = new XMLHttpRequest();
  oReq.onload = function () {
    const content = oReq.responseText;
    callback(content);
  };
  oReq.onerror = function () {

    function WagnerLoadShaderException (f) {
      this.message = `Shader "${f}" couldn't be loaded.`;
      this.name = "WagnerLoadShaderException";
      this.toString = function () {
        return this.message;
      };
    }
    throw new WagnerLoadShaderException(file);
  };
  oReq.onabort = function () {

    function WagnerLoadShaderException (f) {
      this.message = `Shader "${f}" load was aborted.`;
      this.name = "WagnerLoadShaderException";
      this.toString = function () {
        return this.message;
      };
    }
    throw new WagnerLoadShaderException(file);
  };
  oReq.open('get', file, true);
  oReq.send();

};

const processShader = function (vertexShaderCode, fragmentShaderCode) {

  const regExp = /uniform\s+([^\s]+)\s+([^\s]+)\s*;/gi;
  const regExp2 = /uniform\s+([^\s]+)\s+([^\s]+)\s*\[\s*(\w+)\s*\]*\s*;/gi;

  const typesMap = {

    sampler2D: { type: 't', value () { return new THREE.Texture(); } },
    samplerCube: { type: 't', value () { } },

    bool: { type: 'b', value () { return 0; } },
    int: { type: 'i', value () { return 0; } },
    float: { type: 'f', value () { return 0; } },

    vec2: { type: 'v2', value () { return new THREE.Vector2(); } },
    vec3: { type: 'v3', value () { return new THREE.Vector3(); } },
    vec4: { type: 'v4', value () { return new THREE.Vector4(); } },

    bvec2: { type: 'v2', value () { return new THREE.Vector2(); } },
    bvec3: { type: 'v3', value () { return new THREE.Vector3(); } },
    bvec4: { type: 'v4', value () { return new THREE.Vector4(); } },

    ivec2: { type: 'v2', value () { return new THREE.Vector2(); } },
    ivec3: { type: 'v3', value () { return new THREE.Vector3(); } },
    ivec4: { type: 'v4', value () { return new THREE.Vector4(); } },

    mat2: { type: 'v2', value () { return new THREE.Matrix2(); } },
    mat3: { type: 'v3', value () { return new THREE.Matrix3(); } },
    mat4: { type: 'v4', value () { return new THREE.Matrix4(); } }

  };

  const arrayTypesMap = {
    float: { type: 'fv', value () { return []; } },
    vec3: { type: 'v3v', value () { return []; } }
  };
  let matches;
  const uniforms = {
    resolution: { type: 'v2', value: new THREE.Vector2(1, 1), default: true },
    time: { type: 'f', value: Date.now(), default: true },
    tInput: { type: 't', value: new THREE.Texture(), default: true }
  };

  let uniformType, uniformName, arraySize;

  while ((matches = regExp.exec(fragmentShaderCode)) !== null) {
    if (matches.index === regExp.lastIndex) {
      regExp.lastIndex++;
    }
    uniformType = matches[1];
    uniformName = matches[2];
    // WAGNER.log('  > SINGLE', uniformType, uniformName);
    uniforms[uniformName] = {
      type: typesMap[uniformType].type,
      value: typesMap[uniformType].value()
    };
  }

  while ((matches = regExp2.exec(fragmentShaderCode)) !== null) {
    if (matches.index === regExp.lastIndex) {
      regExp.lastIndex++;
    }
    uniformType = matches[1];
    uniformName = matches[2];
    arraySize = matches[3];
    // WAGNER.log('  > ARRAY', arraySize, uniformType, uniformName);
    uniforms[uniformName] = {
      type: arrayTypesMap[uniformType].type,
      value: arrayTypesMap[uniformType].value()
    };
  }

  // WAGNER.log('Uniform reflection completed. Compiling...');

  const shader = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertexShaderCode,
    fragmentShader: fragmentShaderCode,
    depthWrite: false,
    depthTest: false,
    transparent: true
  });

  // WAGNER.log('Compiled');
  return shader;
};
/**
 * 深度拷贝对象
 * @param {*} obj 
 * @returns 
 */
function deepCopy (obj, changekey, changevalue) {
  if (typeof obj !== 'object' || obj === null) {
    return obj; // 如果不是对象类型，直接返回
  }

  const copy = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]); // 递归拷贝子对象
    }
    if (key == changekey) {
      copy[changekey] = changevalue;
    }
  }

  return copy;
}
/**
 * 生成uuid
 * @returns 
 */
function generateUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export { loadShader, processShader, deepCopy, generateUUID }