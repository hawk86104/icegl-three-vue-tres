/* eslint-disable no-undefined, guard-for-in */

/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-10 10:32:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-10 12:00:43
 */
import { request } from '@fesjs/fes'
import * as THREE from 'three'

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
    debugger
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
