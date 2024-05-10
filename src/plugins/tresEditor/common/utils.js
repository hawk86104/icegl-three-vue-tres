/* eslint-disable no-undefined, guard-for-in */

/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-10 10:32:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-10 18:00:50
 */
import { request } from '@fesjs/fes'
import * as THREE from 'three'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

window.THREE = THREE // Used by APP Scripts.

export const loadJson = (filepath) =>
    new Promise((resolve, reject) => {
        request(filepath, {}, { method: 'get' })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.error(err)
                reject(err)
            })
    })

function dispatch(array, event) {
    for (let i = 0, l = array.length; i < l; i++) {
        array[i](event)
    }
}
export const initEvents = (renderer, scene, camera, scriptsObg) => {
    const events = {
        init: [],
        start: [],
        stop: [],
        keydown: [],
        keyup: [],
        pointerdown: [],
        pointerup: [],
        pointermove: [],
        update: [],
    }
    let scriptWrapParams = 'player,renderer,scene,camera'
    const scriptWrapResultObj = {}

    for (const eventKey in events) {
        scriptWrapParams += `,${eventKey}`
        scriptWrapResultObj[eventKey] = eventKey
    }

    const scriptWrapResult = JSON.stringify(scriptWrapResultObj).replace(/\"/g, '')
    // eslint-disable-next-line block-scoped-var
    for (const uuid in scriptsObg) {
        const object = scene.getObjectByProperty('uuid', uuid, true)

        if (object === undefined) {
            console.warn('APP.Player: Script without object.', uuid)
            continue
        }

        const scripts = scriptsObg[uuid]

        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i]

            // eslint-disable-next-line no-new-func
            const functions = new Function(scriptWrapParams, `${script.source}\nreturn ${scriptWrapResult};`).bind(object)(this, renderer, scene, camera)

            for (const name in functions) {
                if (functions[name] === undefined) continue

                if (events[name] === undefined) {
                    console.warn('APP.Player: Event type not supported (', name, ')')
                    continue
                }

                events[name].push(functions[name].bind(object))
            }
        }
    }

    dispatch(events.init, null) //arguments
}

function getImageFormat(base64Data) {
    const header = base64Data.substring(0, 15)
    const jpgHeader = 'data:image/jpeg;base64,'
    const pngHeader = 'data:image/png;base64,'
    const gifHeader = 'data:image/gif;base64,'
    const webpHeader = 'data:image/webp;base64,'

    if (jpgHeader.startsWith(header)) {
        return 'JPEG'
    }
    if (pngHeader.startsWith(header)) {
        return 'PNG'
    }
    if (gifHeader.startsWith(header)) {
        return 'GIF'
    }
    if (webpHeader.startsWith(header)) {
        return 'WEBP'
    }
    return 'Unknown'
}
export const exporterJsonZip = (jsonObjct) => {
    const geometrieList = []
    if (jsonObjct.scene.geometries) {
        jsonObjct.scene.geometries.forEach((geometry) => {
            if (geometry.type === 'BufferGeometry') {
                geometrieList.push({ uuid: geometry.uuid, data: geometry.data })
                geometry.data = 'zip'
            }
        })
    }
    const imagesList = []
    if (jsonObjct.scene.images) {
        jsonObjct.scene.images.forEach((image) => {
            if (image.url) {
                imagesList.push({ uuid: image.uuid, url: image.url })
                image.url = 'zip'
            }
        })
    }
    const zip = new JSZip()
    if (geometrieList.length) {
        const geometrieZip = zip.folder('geometries')
        geometrieList.forEach((geometry) => {
            geometrieZip.file(`${geometry.uuid}.json`, JSON.stringify(geometry.data))
        })
    }
    if (imagesList.length) {
        const imagesZip = zip.folder('images')
        imagesList.forEach((image) => {
            imagesZip.file(`${image.uuid}.${getImageFormat(image.url)}`, image.url.split(';base64,').pop(), { base64: true })
        })
    }
    const json = JSON.stringify(jsonObjct)
    zip.file('app.json', json)
    return zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, 'config.zip')
    })
}
