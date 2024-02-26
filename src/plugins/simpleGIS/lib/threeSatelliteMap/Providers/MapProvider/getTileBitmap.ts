import { Fetch } from '../../Utils/Fetch';

let offscreencanvas: OffscreenCanvas;

export async function getTileBitmap(tileNo: number[], fetch: Fetch, debug = false): Promise<ImageBitmap> {
    const res = await fetch.ready();
    const blob = await res.blob();
    const bitmap = await createImageBitmap(blob, debug ? undefined : { imageOrientation: 'flipY' });

    if (!debug) {
        return bitmap;
    }

    if (!offscreencanvas) {
        offscreencanvas = new OffscreenCanvas(256, 256);
    }
    const ctx = offscreencanvas.getContext('2d');
    if (!ctx) {
        throw new Error('Offscreencanvas.getContext("2d") error!');
    }
    const { width, height } = offscreencanvas;
    ctx.drawImage(bitmap, 0, 0);
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