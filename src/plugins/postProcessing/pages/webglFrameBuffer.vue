<template>
    <canvas id="canvaswebgl" style="height: 500px; width: 500px"></canvas>
</template>

<script setup lang="ts">
import * as glMatrix from 'gl-matrix';
import { onMounted } from 'vue';
// eslint-disable-next-line import/extensions
import { initShaders, resizeCanvasToDisplaySize, degToRad } from '../common/ice-utils.js'

const vertexString = `
attribute vec4 a_position;
attribute vec2 a_texcoord;
uniform mat4 u_matrix;
varying vec2 v_texcoord;
void main() {
  gl_Position = u_matrix * a_position;
  v_texcoord = a_texcoord;
}`;
const fragmentString = `
precision mediump float;
varying vec2 v_texcoord;
uniform sampler2D u_texture;
void main(){
	gl_FragColor=texture2D(u_texture, v_texcoord.xy);
}
`;
const main = function () {
    const canvas = document.querySelector('#canvaswebgl') as HTMLCanvasElement;
    const gl = canvas?.getContext('webgl');
    if (!gl) {
        return
    }
    // 初始化shader
    var program = initShaders(gl, vertexString, fragmentString);

    // 获取shader变量
    var positionLocation = gl.getAttribLocation(program, 'a_position');
    var texcoordLocation = gl.getAttribLocation(program, 'a_texcoord');
    // lookup uniforms
    var matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    var textureLocation = gl.getUniformLocation(program, 'u_texture');
    // 创建buffer
    var positionBuffer = gl.createBuffer();
    // 绑定位置buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // 将位置放入buffer
    setGeometry(gl);
    // 创建buffer
    var texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    // 设置uv坐标
    setTexcoords(gl);
    // 创建纹理
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    {
        // 设置纹理
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;
        const data = new Uint8Array([255, 255, 0, 255]);
        const alignment = 1;
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data);
        // 设置纹理过滤方式
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    // 帧渲染纹理容器
    const targetTextureWidth = 256;
    const targetTextureHeight = 256;
    const targetTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);
    {
        // 同上
        const level = 0;
        const internalFormat = gl.RGBA;
        const border = 0;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;
        const data = null;
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, targetTextureWidth, targetTextureHeight, border, format, type, data);
        // 同上
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    // 创建帧缓冲
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    // 附件类型
    const attachmentPoint = gl.COLOR_ATTACHMENT0;
    const level = 0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, level);

    var modelXRotationRadians = degToRad(0);

    // 开始时间
    var then = 0;
    requestAnimationFrame(drawScene);
    function drawCube(aspect) {
        // 使用项目
        gl.useProgram(program);
        // 开启顶点坐标
        gl.enableVertexAttribArray(positionLocation);
        // 绑定顶点buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        var size = 3;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

        gl.enableVertexAttribArray(texcoordLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

        var size = 2;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);
        //创建投影
        var projectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.perspective(projectionMatrix, -30.0, aspect, 0.1, 10000.0);

        var cameraPosition = [0, 0, 2];
        var up = [0, 1, 0];
        var target = [0, 0, 0];

        // 创建模型矩阵
        let modelMatrix = glMatrix.mat4.create();
        modelMatrix = glMatrix.mat4.rotate(modelMatrix, modelMatrix, modelXRotationRadians, [0, 1, 0]);

        // 创建相机矩阵
        var cameraMatrix = glMatrix.mat4.create();
        glMatrix.mat4.lookAt(cameraMatrix, cameraPosition, target, up);
        // 创建模型相机矩阵
        let modelViewMatrix = glMatrix.mat4.create();
        glMatrix.mat4.multiply(modelViewMatrix, cameraMatrix, modelMatrix);

        var viewProjectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.multiply(viewProjectionMatrix, projectionMatrix, modelViewMatrix);

        gl.uniformMatrix4fv(matrixLocation, false, viewProjectionMatrix);

        gl.uniform1i(textureLocation, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);
    }

    function drawScene(time) {
        time *= 0.001;

        var deltaTime = time - then;

        then = time;

        modelXRotationRadians += -0.4 * deltaTime;
        resizeCanvasToDisplaySize(gl.canvas);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        {
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

            gl.bindTexture(gl.TEXTURE_2D, texture);

            gl.viewport(0, 0, targetTextureWidth, targetTextureHeight);

            gl.clearColor(0, 1, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            const aspect = targetTextureWidth / targetTextureHeight;
            drawCube(aspect);
        }
        {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);

            gl.bindTexture(gl.TEXTURE_2D, targetTexture);

            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            gl.clearColor(1, 1, 1, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
            drawCube(aspect);
        }
        requestAnimationFrame(drawScene);
    }
};
onMounted(() => {
    main();
});

function setGeometry(gl) {
    var positions = new Float32Array([
        -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5,

        -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,

        -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5,

        -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5,

        -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5,

        0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
}

function setTexcoords(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

            0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1,

            0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

            0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1,

            0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

            0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1,
        ]),
        gl.STATIC_DRAW,
    );
}
</script>
