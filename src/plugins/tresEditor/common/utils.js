/* eslint-disable no-undefined, guard-for-in */

/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-10 10:32:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-11 11:32:49
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
//暂时不考虑摄像机的动画
const setCamera = () => {
    // camera = value
    // camera.aspect = this.width / this.height
    // camera.updateProjectionMatrix()
}
export const initEvents = (renderer, scene, camera, sizes, jsonData) => {
    const scriptsObg = jsonData.scripts || {}
    let scriptWrapParams = 'player,renderer,scene,camera'
    const scriptWrapResultObj = {}

    for (const eventKey in events) {
        scriptWrapParams += `,${eventKey}`
        scriptWrapResultObj[eventKey] = eventKey
    }

    const scriptWrapResult = JSON.stringify(scriptWrapResultObj).replace(/\"/g, '')
    // eslint-disable-next-line block-scoped-var
    for (const uuid in scriptsObg) {
        let curUuid = uuid
        //这里解决一个问题 目前并没有把 主场景scene直接替换而是通过group 加进入的，所以 如果事件是基于主场景scene 那么替换这个uuid为现在tres主场景的uuid
        if (uuid === jsonData.scene.object.uuid) {
            curUuid = scene.uuid
        }
        const object = scene.getObjectByProperty('uuid', curUuid, true)

        if (object === undefined) {
            console.warn('APP.Player: Script without object.', curUuid)
            continue
        }

        const scripts = scriptsObg[uuid]

        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i]

            // eslint-disable-next-line no-new-func
            const functions = new Function(scriptWrapParams, `${script.source}\nreturn ${scriptWrapResult};`).bind(object)(
                { width: sizes.width.value, height: sizes.height.value, setCamera },
                renderer,
                scene,
                camera,
            )

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
function onKeyDown(event) {
    dispatch(events.keydown, event)
}
function onKeyUp(event) {
    dispatch(events.keyup, event)
}
function onPointerDown(event) {
    dispatch(events.pointerdown, event)
}
function onPointerUp(event) {
    dispatch(events.pointerup, event)
}
function onPointerMove(event) {
    dispatch(events.pointermove, event)
}
export const registerEvent = () => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('pointerup', onPointerUp)
    document.addEventListener('pointermove', onPointerMove)
    dispatch(events.start, null)
}
export const unregisterEvent = () => {
    document.removeEventListener('keydown', onKeyDown)
    document.removeEventListener('keyup', onKeyUp)
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('pointerup', onPointerUp)
    document.removeEventListener('pointermove', onPointerMove)
    dispatch(events.stop, null)

    events.init = []
    events.start = []
    events.stop = []
    events.keydown = []
    events.keyup = []
    events.pointerdown = []
    events.pointerup = []
    events.pointermove = []
    events.update = []
}
export const updateEvents = (elapsed, delta) => {
    dispatch(events.update, { time: elapsed, delta })
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
