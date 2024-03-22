// 作者：冰哥
// 时间：2022.7.10


/**
 * 初始化shader
 * @param gl 
 * @param vshader 
 * @param fshader 
 * @return true
 */
export function initShaders (gl, vshader, fshader) {
  const program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log('创建项目失败！');
    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return program;
}

/**
 * 创建项目
 * @param gl 
 * @param vshader 
 * @param fshader 
 * @return program
 */
function createProgram (gl, vshader, fshader) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }


  const program = gl.createProgram();
  if (!program) {
    return null;
  }


  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);


  gl.linkProgram(program);


  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    const error = gl.getProgramInfoLog(program);
    console.log(`Failed to link program: ${error}`);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

/**
 * 创建shader对象
 * @param gl
 * @param type 
 * @param source
 * @return shaderobj
 */
function loadShader (gl, type, source) {

  const shader = gl.createShader(type);
  if (shader == null) {
    console.log('unable to create shader');
    return null;
  }


  gl.shaderSource(shader, source);


  gl.compileShader(shader);

  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    const error = gl.getShaderInfoLog(shader);
    console.log(`Failed to compile shader: ${error}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/** 
 * 初始化webgl
 * @param canvas 
 * @param opt_debug
 * @return 
 */
function getWebGLContext (canvas, opt_debug) {
  let gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) return null;
  if (arguments.length < 2 || opt_debug) {
    gl = WebGLDebugUtils.makeDebugContext(gl);
  }

  return gl;
}

function angleToRadian (angle) {
  return angle / 180 * Math.PI
}
function multiplyMVP (m1, m2, m3) {
  const mvpMatrix = glMatrix.mat4.create();
  const mvMatrix = glMatrix.mat4.create();
  glMatrix.mat4.multiply(mvpMatrix, m1, glMatrix.mat4.multiply(mvMatrix, m2, m3));
  return mvpMatrix;
}
/**
 * 屏幕坐标系转世界坐标系
 * @param {*} screenPosition 
 * @param {*} InverseMVPMatrix 
 * @param {*} viewWH 
 * @returns 
 */
function screenToWorld (screenPosition, InverseMVPMatrix, viewWH) {
  let worldPosition = glMatrix.vec4.create();
  screenPosition[0] = screenPosition[0] / viewWH[0];
  screenPosition[1] = (viewWH[1] - screenPosition[1]) / viewWH[1];
  screenPosition[2] = screenPosition[2];
  console.log(screenPosition.length);
  for (let i = 0; i < screenPosition.length; i++) {
    screenPosition[i] = screenPosition[i] * 2 - 1;
  }
  worldPosition = glMatrix.mat4.multiply(worldPosition, InverseMVPMatrix, screenPosition);
  worldPosition[0] /= worldPosition[3];
  worldPosition[1] /= worldPosition[3];
  worldPosition[2] /= worldPosition[3];
  worldPosition = worldPosition.slice(0, -1);
  return worldPosition;
}
/**
 * 世界坐标系转屏幕坐标系
 * @param {*} worldPosition  世界坐标
 * @param {*} MVPMatrix      MVP变换矩阵
 * @param {*} viewWH         视口宽高
 * @returns 
 */
function worldToScreen (worldPosition, MVPMatrix, viewWH) {
  let screenPosition = glMatrix.vec4.create();
  worldPosition = glMatrix.mat4.multiply(screenPosition, MVPMatrix, worldPosition);
  for (let i = 0; i < screenPosition.length; i++) {
    screenPosition[i] /= screenPosition[screenPosition.length];
    screenPosition[i] = screenPosition[i] * 0.5 + 0.5;
  }
  screenPosition[0] = screenPosition[0] * viewWH[0];
  screenPosition[1] = viewWH[1] - (screenPosition[1] * viewWH[1]);
  screenPosition = screenPosition.slice(0, -1);
  return screenPosition;
}


/**
 * 
 * @param {屏幕坐标系} screen 
 * @param {转职矩阵} inverseMVPMatrix 
 * @param {画布宽高} viewWH 
 * @returns 
 */
function getModelSelectPosition (screen, inverseMVPMatrix, viewWH) {
  let minWorld = glMatrix.vec4.create();
  let maxWorld = glMatrix.vec4.create();
  const screen1 = screen.slice(0)
  screen1[2] = screen1[2] + 1;

  minWorld = screenToWorld(screen, inverseMVPMatrix, viewWH);
  maxWorld = screenToWorld(screen1, inverseMVPMatrix, viewWH);
  const dir = glMatrix.vec3.create();
  glMatrix.vec3.subtract(dir, maxWorld, minWorld);
  glMatrix.vec3.normalize(dir, dir);
  const tm = Math.abs((minWorld[1]) / dir[1]);
  const target = new Float32Array(3);
  target[0] = minWorld[0] + tm * dir[0];
  target[1] = minWorld[1] + tm * dir[1];
  target[2] = minWorld[2] + tm * dir[2];
  return target;
}

/**
 * 
 * @param {*} 图片地址 
 * @returns 
 */
function initTexture (gl, imageFile, name) {
  return new Promise((resolve, reject) => {
    const uniformTexture = gl.getUniformLocation(gl.program, name);
    let texture;
    texture = gl.createTexture();
    texture.image = new Image();
    texture.image.src = imageFile;
    texture.image.onload = function () {
      handleLoadedTexture(gl, texture);
      console.log(2);
      resolve(texture);
      texture.uniformTexture = uniformTexture;

    }
  })

}
/**
* 
* @param {*} 纹理
*/
function handleLoadedTexture (gl, texture) {

  gl.bindTexture(gl.TEXTURE_2D, texture);
  //https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/texImage2D
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  //https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
  // 函数功能：将param的值赋给pname指定的参数上，并绑定到目标上
  // ---------------------------------------------------------------------------------------
  // 调用示例：gl.texParameteri(target, pname, param)
  // ---------------------------------------------------------------------------------------
  // 参数		
  //       target		gl.TEXTURE_2D或gl.TEXTURE_BUVE_MAP
  //             分别代表二维纹理和立方体纹理
  //       pname		纹理参数，可选值：
  //             gl.TEXTURE_MAG_FILTER 纹理放大方法，默认值gl.LINEAR
  //             gl.TEXTURE_MIN_FILTER 纹理缩小方法，默认值gl.NEAREST_MIPMAP_LINEAR
  //             gl.TEXTURE_WRAP_S	  纹理水平填充，默认值gl.REPEAT
  //             gl.TEXTURE_WRAP_T     纹理垂直填充，默认值gl.REPEAT
  //       param		纹理参数的值，
  //             当pname为gl.TEXTURE_MAG_FILTER或gl.TEXTURE_MIN_FILTER
  //               可选值：
  //               gl.NEAREST	使用原纹理上距离映射后像素（新像素）中心最近的那个
  //                     像素的颜色值，作为新像素的值
  //               gl.LINEAR	使用距离新像素中心最近的四个像素的颜色的加权平均值，
  //                     作为新像素的值，图像效果更好，但开销较大
  //             当pname为gl.TEXTURE_WRAP_S或gl.TEXTURE_WRAP_T
  //               可选值：
  //               gl.REPEAT			平铺式的重复纹理
  //               gl.MIRRORED_REPEAT	镜像对称式的重复纹理
  //               gl.CLAMP_TO_EDGE	使用纹理图像边缘值						
  // ---------------------------------------------------------------------------------------			
  // 返回值		无
  // ---------------------------------------------------------------------------------------
  // 错  误		INVALID_ENUM		target的值不合法		
  //       INVALID_OPERATION	当前目标没有绑定纹理对象
  // ————————————————

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

  gl.bindTexture(gl.TEXTURE_2D, null);


}

/**
 *  创建顶点缓冲区
 * @param {*} gl 
 * @param {*} data 
 * @param {*} num 
 * @param {*} type 
 * @param {*} attribute 
 * @returns 
 */

function initArrayBuffer (gl, data, num, type, attribute) {
  const attributeobj = gl.getAttribLocation(gl.program, attribute);
  // 先创建一个缓冲区对象
  const buffer = gl.createBuffer();
  // 把数据写入到缓冲区中
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  // 将图元分配到图元装配空间中去，并存储起来
  gl.vertexAttribPointer(attributeobj, num, type, false, 0, 0);
  // 开启图元装配
  gl.enableVertexAttribArray(attributeobj);
  //赋值所需点位数与所占字节数
  buffer.itemSize = num;
  buffer.attributeobj = attributeobj;
  return buffer;
}
/**
 * 创建索引缓冲区
 * @param {*} gl 
 * @param {*} data 
 * @param {*} num 
 * @param {*} numberOfItems 
 * @returns 
 */
function initIndexArrayBuffer (gl, data) {
  // 先创建一个缓冲区对象
  const buffer = gl.createBuffer();
  // 把数据写入到缓冲区中
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);

  buffer.numberOfItems = data.length;
  // 
  return buffer;
}


export function resizeCanvasToDisplaySize (canvas, multiplier) {
  multiplier = multiplier || 1;
  const width = canvas.clientWidth * multiplier | 0;
  const height = canvas.clientHeight * multiplier | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

export function degToRad (d) {
  return (d * Math.PI) / 180;
}