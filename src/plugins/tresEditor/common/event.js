/* eslint-disable no-undefined */
/* eslint-disable guard-for-in */
import * as THREE from 'three'

window.THREE = THREE // Used by APP Scripts.
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
