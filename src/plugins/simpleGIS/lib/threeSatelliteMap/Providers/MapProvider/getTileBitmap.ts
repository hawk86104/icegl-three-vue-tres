/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-26 18:58:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-02-29 12:39:48
 */
import { Fetch } from '../../Utils/Fetch';

let offscreencanvas: OffscreenCanvas;

export async function getTileBitmap(tileNo: number[], fetch: Fetch, debug = false): Promise<ImageBitmap> {
    const res = await fetch.ready();
    const blob = await res.blob();
    const bitmap = await createImageBitmap(blob, debug ? undefined : { imageOrientation: 'flipY' });

    if (!offscreencanvas) {
        offscreencanvas = new OffscreenCanvas(256, 256); // 256
    }
    const ctx = offscreencanvas.getContext('2d');
    if (!ctx) {
        throw new Error('Offscreencanvas.getContext("2d") error!');
    }
    const { width, height } = offscreencanvas
    ctx.drawImage(bitmap, 0, 0)
    // 应用模糊滤镜效果
    ctx.filter = 'invert(100%) hue-rotate(321deg) grayscale(80%) brightness(120%)' // 这里可以调整模糊程度

    // if (!debug) {
    //     return bitmap;
    // }
    if (!debug) {
        return await createImageBitmap(offscreencanvas);
    }
    ctx.rect(0, 0, width, height);
    ctx.strokeStyle = '#00FFFF';
    ctx.font = '20px Arial';
    ctx.stroke();
    ctx.fillStyle = '#FF4444';
    ctx.fillText(`${tileNo[0]}`, 10, 30);
    ctx.fillStyle = '#44FF44';
    ctx.fillText(`${tileNo[1]}`, 10, 55);
    ctx.fillStyle = '#66AAFF';
    ctx.fillText(`${tileNo[2]}`, 10, 80);
    // @ts-ignore
    return await createImageBitmap(offscreencanvas, { imageOrientation: 'flipY' });
}