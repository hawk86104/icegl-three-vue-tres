/* eslint-disable no-undefined, guard-for-in */

/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-10 10:32:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-28 11:54:39
 */
import { request } from '@fesjs/fes'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import * as THREE from 'three'

// 启用缓存
THREE.Cache.enabled = true
export async function loadJsonFile(url) {
    const loader = new THREE.FileLoader()

    return new Promise((resolve, reject) => {
        loader.load(
            url,
            (data) => resolve(JSON.parse(data)), // 成功回调
            undefined, // 进度回调（可选）
            (error) => reject(error), // 错误回调
        )
    })
}
function getMimeTypeFromUrl(url) {
    const extension = url.split('.').pop().toLowerCase()
    const mimeTypes = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        bmp: 'image/bmp',
        webp: 'image/webp',
    }
    return mimeTypes[extension] || 'application/octet-stream'
}
export async function loadImageToBase64(url) {
    const loader = new THREE.FileLoader()
    return new Promise((resolve, reject) => {
        loader.setResponseType('blob')
        loader.load(
            url,
            (data) => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    const mimeType = getMimeTypeFromUrl(url)
                    const base64Data = reader.result.split(',')[1]
                    resolve(`data:${mimeType};base64,${base64Data}`)
                }
                reader.onerror = (error) => {
                    reject(error)
                }
                reader.readAsDataURL(data)
            },
            undefined, // 进度回调（可选）
            (error) => reject(error),
        )
    })
}

export const loadRemoteZip = (url) => {
    const loader = new THREE.FileLoader()
    loader.setResponseType('blob')
    return new Promise((resolve, reject) => {
        loader.load(
            url,
            async (data) => {
                resolve(await JSZip.loadAsync(data))
            },
            undefined, // 进度回调（可选）
            (error) => reject(error),
        )
    })
}

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

export const convertImageToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

export const getImageFormat = (base64Data) => {
    const header = base64Data.substring(0, 15)
    const jpgHeader = 'data:image/jpeg;base64,'
    const jpg2Header = 'data:image/JPEG;base64,'
    const pngHeader = 'data:image/png;base64,'
    const png2Header = 'data:image/PNG;base64,'
    const gifHeader = 'data:image/gif;base64,'
    const gif2Header = 'data:image/GIF;base64,'
    const webpHeader = 'data:image/webp;base64,'
    const webp2Header = 'data:image/WEBP;base64,'

    if (jpgHeader.startsWith(header) || jpg2Header.startsWith(header)) {
        return 'JPEG'
    }
    if (pngHeader.startsWith(header) || png2Header.startsWith(header)) {
        return 'PNG'
    }
    if (gifHeader.startsWith(header) || gif2Header.startsWith(header)) {
        return 'GIF'
    }
    if (webpHeader.startsWith(header || webp2Header.startsWith(header))) {
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
                geometry.data = `url:geometries/${geometry.uuid}.json`
            }
        })
    }
    const imagesList = []
    if (jsonObjct.scene.images) {
        jsonObjct.scene.images.forEach((image) => {
            if (image.url) {
                imagesList.push({ uuid: image.uuid, url: image.url })
                if (image.url.type) {
                    image.url = `url:images/${image.uuid}.${image.url.type}.json`
                } else {
                    image.url = `url:images/${image.uuid}.${getImageFormat(image.url)}`
                }
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
            if (image.url.type) {
                imagesZip.file(`${image.uuid}.${image.url.type}.json`, JSON.stringify(image.url))
            } else {
                imagesZip.file(`${image.uuid}.${getImageFormat(image.url)}`, image.url.split(';base64,').pop(), { base64: true })
            }
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
// const getMatchingKeys = (obj, name) => Object.keys(obj).filter((key) => key.startsWith(name))
const getResourceNum = (gJson) => {
    const srcNum = {
        geometries: 0,
        images: 0,
    }
    gJson.scene.geometries?.forEach((geometry) => {
        if (geometry.data.startsWith('url:')) {
            srcNum.geometries++
        }
    })
    gJson.scene.images?.forEach((image) => {
        if (image.url.startsWith('url:')) {
            srcNum.images++
        }
    })
    return srcNum
}
export const importJsonZip = (file, handler) => {
    let gJson = null
    JSZip.loadAsync(file).then(
        (zip) => {
            if (!zip.files['app.json']) {
                console.error(`非标准文件：不存在 app.json`)
                return
            }
            zip.files['app.json'].async('string').then((jdata) => {
                gJson = JSON.parse(jdata)
                const resourceNum = getResourceNum(gJson)
                checkFinishImportJson(resourceNum, gJson, handler)
                gJson.scene.geometries?.forEach((geometry) => {
                    if (geometry.data.startsWith('url:')) {
                        zip.files[geometry.data.slice(4)].async('string').then((gdata) => {
                            geometry.data = JSON.parse(gdata)
                            resourceNum.geometries--
                            checkFinishImportJson(resourceNum, gJson, handler)
                        })
                    }
                })
                gJson.scene.images?.forEach((image) => {
                    if (image.url.startsWith('url:')) {
                        const imgName = image.url.slice(4)
                        if (imgName.endsWith('.json')) {
                            zip.files[imgName].async('string').then((gdata) => {
                                image.url = JSON.parse(gdata)
                                resourceNum.images--
                                checkFinishImportJson(resourceNum, gJson, handler)
                            })
                        } else {
                            zip.files[imgName].async('base64').then((idata) => {
                                const fileNameParts = imgName.split('.')
                                const extension = fileNameParts[fileNameParts.length - 1].toUpperCase()
                                image.url = `data:image/${extension};base64,${idata}`
                                resourceNum.images--
                                checkFinishImportJson(resourceNum, gJson, handler)
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
