/* eslint-disable no-undefined, guard-for-in */

/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-10 10:32:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-11 15:53:41
 */
import { request } from '@fesjs/fes'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

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
const checkFinishImportJson = (srcNum, gJson, handler) => {
    if (srcNum.geometries <= 0 && srcNum.images <= 0) {
        handler(gJson)
    }
}
const getMatchingKeys = (obj, name) => Object.keys(obj).filter((key) => key.startsWith(name))
export const importJsonZip = (file, handler) => {
    let gJson = null
    JSZip.loadAsync(file).then(
        (zip) => {
            console.log(zip)
            if (!zip.files['app.json']) {
                console.error(`非标准文件：不存在 app.json`)
                return
            }
            const srcNum = {
                geometries: getMatchingKeys(zip.files, 'geometries/').length - 1,
                images: getMatchingKeys(zip.files, 'images/').length - 1,
            }
            zip.files['app.json'].async('string').then((jdata) => {
                gJson = JSON.parse(jdata)
                checkFinishImportJson(srcNum, gJson, handler)
                gJson.scene.geometries?.forEach((geometry) => {
                    if (geometry.data === 'zip') {
                        zip.files[`geometries/${geometry.uuid}.json`].async('string').then((gdata) => {
                            geometry.data = JSON.parse(gdata)
                            srcNum.geometries--
                            checkFinishImportJson(srcNum, gJson, handler)
                        })
                    }
                })
                gJson.scene.images?.forEach((image) => {
                    if (image.url === 'zip') {
                        const matchingKeys = getMatchingKeys(zip.files, `images/${image.uuid}`)
                        if (matchingKeys.length) {
                            zip.files[matchingKeys[0]].async('base64').then((idata) => {
                                const fileNameParts = matchingKeys[0].split('.')
                                const extension = fileNameParts[fileNameParts.length - 1].toUpperCase()
                                image.url = `data:image/${extension};base64,${idata}`
                                srcNum.images--
                                checkFinishImportJson(srcNum, gJson, handler)
                            })
                        }
                    }
                })
            })
        },
        (e) => {
            console.error(`${file.name}: ${e.message}`)
        },
    )
    return gJson
}
