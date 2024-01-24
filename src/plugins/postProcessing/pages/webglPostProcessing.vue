<template >
    <canvas id="canvaswebgl">
        <img id="logo-texture" :src="publicPath + '/plugins/postProcessing/image/logo.png'" style="display: none" />
    </canvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos';
import postProcessFShaderSource from '../shaders/post-process.frag?raw';
import postProcessVShaderSource from '../shaders/post-process.vert?raw';
import texQuadVShaderSource from '../shaders/tex-quad.vert?raw';
import texQuadFShaderSource from '../shaders/tex-quad.frag?raw';
import { initShaders, resizeCanvasToDisplaySize, degToRad } from '../common/ice-utils.js';
import * as glMatrix from 'gl-matrix';
import { onMounted, reactive } from 'vue';
import { Pane } from 'tweakpane';

let publicPath = process.env.BASE_URL

var positionLocation = null;
var texcoordLocation = null;
let canvas: HTMLCanvasElement;
let gl: WebGL2RenderingContext;

let quadProgram: WebGLProgram;
let quadVAO: WebGLVertexArrayObject;

let postProcessVao: WebGLVertexArrayObject;
let postProcessProgram: WebGLProgram;
let framebuffer: WebGLFramebuffer;
let framebufferTexture: WebGLTexture;

let materialProjectionMatrixLocation: WebGLUniformLocation;
let materialViewMatrixLocation: WebGLUniformLocation;
let materialModelMatrixLocation: WebGLUniformLocation;
let mixParamLocation: WebGLUniformLocation;
let colorLocation: WebGLUniformLocation;

let catTexture: WebGLTexture;

const clearColor1 = { r: 1, g: 0.71, b: 0.76 };
const clearColor2 = { r: 1, g: 1, b: 0.76 };

const paneControl = new Pane({
    title: '参数',
});
const PARAMS = reactive({
    hidden: true,
    offset_right_top: { x: 0.5, y: 0.5 },
    offset_right_bottom: { x: 0.5, y: 0.5 },
    offset_left_top: { x: 0.5, y: 0.5 },
    offset_left_bottom: { x: 0.5, y: 0.5 },
    overlay: { r: 1, g: 0, b: 0.33 },
});

paneControl
    .addBlade({
        view: 'slider',
        label: '颜色',
        min: 0,
        max: 1,
        value: 0.5,
    })
    .on('change', (ev: any) => {
        postProcessSetup();
        gl.uniform1f(mixParamLocation, ev.value);
    });
//设置点
let dataPostProcess = new Float32Array([
    // x   y   z    t  s
    0.5,
    0.5,
    0,
    1,
    1, //  1

    0.5,
    -0.5,
    0,
    1,
    0, //  2

    -0.5,
    -0.5,
    0,
    0,
    0, //  3

    -0.5,
    0.5,
    0,
    0,
    1, //  4
]);
paneControl.addBinding(PARAMS, 'hidden', {
    label: '是否后处理',
});
paneControl
    .addBinding(PARAMS, 'offset_right_top', {
        picker: 'inline',

        x: { min: 0, max: 1 },
        y: { min: 0, max: 1 },
    })
    .on('change', (ev: any) => {
        dataPostProcess[0] = PARAMS.offset_right_top.x;
        dataPostProcess[1] = PARAMS.offset_right_top.y;
        postProcessSetup();
    });
paneControl
    .addBinding(PARAMS, 'offset_right_bottom', {
        picker: 'inline',

        x: { min: -1, max: 1 },
        y: { min: -1, max: 1 },
    })
    .on('change', (ev: any) => {
        dataPostProcess[5] = PARAMS.offset_right_bottom.x;
        dataPostProcess[6] = PARAMS.offset_right_bottom.y;
        postProcessSetup();
    });
paneControl
    .addBinding(PARAMS, 'offset_left_bottom', {
        picker: 'inline',

        x: { min: -1, max: 1 },
        y: { min: -1, max: 1 },
    })
    .on('change', (ev: any) => {
        dataPostProcess[10] = PARAMS.offset_left_bottom.x;
        dataPostProcess[11] = PARAMS.offset_left_bottom.y;
        postProcessSetup();
    });
paneControl
    .addBinding(PARAMS, 'offset_left_top', {
        picker: 'inline',

        x: { min: -1, max: 1 },
        y: { min: -1, max: 1 },
    })
    .on('change', (ev: any) => {
        dataPostProcess[15] = PARAMS.offset_left_top.x;
        dataPostProcess[16] = PARAMS.offset_left_top.y;
        postProcessSetup();
    });
onMounted(() => {
    main();
});
const main = function () {
    canvas = document.querySelector('#canvaswebgl');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl = canvas.getContext('webgl');
    if (!gl) {
        return;
    }
    //设置图片绘制数据
    setDatas();
    //装载后处理
    postProcessSetup();

    // 开始颜色混合
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //绘制
    draw();
};
function draw() {
    // 启用帧缓冲区，后面生成的sence都将附着到此帧缓冲上面
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

    // 清空帧缓存
    gl.clearColor(clearColor1.r, clearColor1.g, clearColor1.b, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制sence场景
    drawScene();

    //恢复默认缓冲区，将其直接绘制到屏幕上
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (PARAMS.hidden) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.clearColor(0, 0, 1, 1);
        //绑定顶点缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, postProcessVao);
        //使用帧缓冲区的program
        gl.useProgram(postProcessProgram);
        //将帧缓冲sence生成的纹理绑定到最后渲染的纹理上
        gl.bindTexture(gl.TEXTURE_2D, framebufferTexture);
    }

    //绘制
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0);

    requestAnimationFrame(draw);
}

// Draw the scene.
function drawScene() {
    // 使用绘制sence场景的shader与program
    gl.useProgram(quadProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVAO);
    // 设置投影 matrix
    const projection = glMatrix.mat4.create();
    glMatrix.mat4.ortho(projection, 0, canvas.width, canvas.height, 0, 0.1, 100);
    gl.uniformMatrix4fv(materialProjectionMatrixLocation, false, projection);

    //设置viewmatrix
    const view = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(view, [0, 0, 1], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv(materialViewMatrixLocation, false, view);
    //绘制图片
    drawQuad(catTexture, 600, 600);
    drawQuad(catTexture, 400, 400);
}
function drawQuad(texture: WebGLTexture, posX: number, posY: number) {
    let model = glMatrix.mat4.create();
    glMatrix.mat4.translate(model, model, [posX, posY, 0]);
    glMatrix.mat4.scale(model, model, [250, 250, 0]);
    gl.uniformMatrix4fv(materialModelMatrixLocation, false, model);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0);
}

function setDatas() {
    const data = new Float32Array([
        // x   y   z    t  s
        0.5,
        0.5,
        0,
        1,
        1, //  1

        0.5,
        -0.5,
        0,
        1,
        0, //  2

        -0.5,
        -0.5,
        0,
        0,
        0, //  3

        -0.5,
        0.5,
        0,
        0,
        1, //  4
    ]);
    const iData = new Uint8Array([0, 1, 2, 0, 2, 3]);
    quadVAO = createVAO(data, iData);

    quadProgram = initShaders(gl, texQuadVShaderSource, texQuadFShaderSource);

    materialProjectionMatrixLocation = gl.getUniformLocation(quadProgram, 'uProjection')!;
    materialViewMatrixLocation = gl.getUniformLocation(quadProgram, 'uView')!;
    materialModelMatrixLocation = gl.getUniformLocation(quadProgram, 'uModel')!;

    catTexture = createTexture(document.getElementById('logo-texture') as HTMLImageElement);
}
function postProcessSetup() {
    //谁知索引缓冲
    const iData = new Uint8Array([
        0,
        1,
        2, // first triangle
        0,
        2,
        3, // second triangle
    ]);
    //创建顶点缓冲区
    postProcessVao = createVAO(dataPostProcess, iData);

    // 将后处理shader绑定到program
    postProcessProgram = initShaders(gl, postProcessVShaderSource, postProcessFShaderSource);
    mixParamLocation = gl.getUniformLocation(postProcessProgram, 'mixParam')!;
    colorLocation = gl.getUniformLocation(postProcessProgram, 'color')!;

    framebufferSetup();
}

function framebufferSetup() {
    // 后处理操作
    // 1. 创先一个纹理图片
    framebufferTexture = createTexture(canvas);

    // 2. 创建帧缓存
    framebuffer = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, framebufferTexture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}
function createTexture(imageOrCanvas: HTMLImageElement | HTMLCanvasElement): WebGLTexture {
    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);

    if (imageOrCanvas instanceof HTMLImageElement) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageOrCanvas as HTMLImageElement);
    } else {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, imageOrCanvas.width, imageOrCanvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    return texture;
}

function createVAO(data: Float32Array, indicesData: Uint8Array): WebGLVertexArrayObject {
    // 创建vao
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    const stride = 3 * Float32Array.BYTES_PER_ELEMENT + 2 * Float32Array.BYTES_PER_ELEMENT;

    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(0);

    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(1);

    const indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesData, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vertexBuffer;
}
</script>
<style >
.tp-dfwv {
    width: 280px !important;
}
</style>