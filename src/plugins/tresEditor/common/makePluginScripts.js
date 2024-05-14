const codeForEventScript = (scripts) => {
    const scriptsJson = `const scriptsJson = 
${JSON.stringify(scripts)}
`
    const code = `/* eslint-disable prefer-rest-params */
/* eslint-disable no-undefined */
/* eslint-disable guard-for-in */
import * as THREE from 'three'

window.THREE = THREE // Used by APP Scripts.
const Grscwh = { scene: null, renderer: null, camera: null, sizes: null }
const player = {
	get renderer() {
		return Grscwh.renderer?.value
	},
	loader: new THREE.TextureLoader(),
	get scene() {
			return Grscwh.scene?.value
	},
	get camera() {
			return Grscwh.camera?.value
	},
	get width() {
			return Grscwh.sizes?.width?.value
	},
	get height() {
			return Grscwh.sizes?.height?.value
	},
	// dom
	// canvas
	events: {},
	init(scene, renderer, camera, sizes) {
			Grscwh.scene = scene
			Grscwh.renderer = renderer
			Grscwh.camera = camera
			Grscwh.sizes = sizes
	},
	load() {
		${scriptsJson}
		this.events = {
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

		for (const eventKey in this.events) {
				scriptWrapParams += \`,\${eventKey}\`
				scriptWrapResultObj[eventKey] = eventKey
		}
		const scriptWrapResult = JSON.stringify(scriptWrapResultObj).replace(/\\"/g, '')
		for (const uuid in scriptsJson) {
				const object = this.scene.getObjectByProperty('uuid', uuid, true)
				if (object === undefined) {
						console.warn('player: Script without object.', uuid)
						continue
				}
				const scripts = scriptsJson[uuid]
				for (let i = 0; i < scripts.length; i++) {
						const script = scripts[i]
						// eslint-disable-next-line no-new-func
						const functions = new Function(scriptWrapParams, \`\${script.source}\nreturn \${scriptWrapResult};\`).bind(object)(
								this,
								this.renderer,
								this.scene,
								this.camera,
						)
						for (const name in functions) {
								if (functions[name] === undefined) continue
								if (this.events[name] === undefined) {
										console.warn('player: Event type not supported (', name, ')')
										continue
								}
								this.events[name].push(functions[name].bind(object))
						}
				}
				this.dispatch(this.events.init, arguments)
		}
	},
	dispatch(array, event) {
		for (let i = 0, l = array.length; i < l; i++) {
				array[i](event)
		}
	},
	setCamera(value) {
			console.warn('暂时不考虑摄像机的设置函数', value)
			// camera = value
			// camera.aspect = this.width / this.height
			// camera.updateProjectionMatrix()
	},
	setScene(value) {
			console.warn('暂时不考虑场景的设置函数', value)
			// scene = value
	},
	setPixelRatio(value) {
			console.warn('暂时不考虑像素比的设置函数', value)
	},
	setSize(value) {
			console.warn('暂时不考虑尺寸的设置函数', value)
	},
	dispose() {
			// renderer.dispose();
			// camera = undefined;
			// scene = undefined;
			console.warn('暂时不考虑释放资源的函数')
	},
	onKeyDown(event) {
		player.dispatch(player.events.keydown, event)
	},
	onKeyUp(event) {
			player.dispatch(player.events.keyup, event)
	},
	onPointerDown(event) {
			player.dispatch(player.events.pointerdown, event)
	},
	onPointerUp(event) {
			player.dispatch(player.events.pointerup, event)
	},
	onPointerMove(event) {
			player.dispatch(player.events.pointermove, event)
	},
	play() {
			document.addEventListener('keydown', this.onKeyDown)
			document.addEventListener('keyup', this.onKeyUp)
			document.addEventListener('pointerdown', this.onPointerDown)
			document.addEventListener('pointerup', this.onPointerUp)
			document.addEventListener('pointermove', this.onPointerMove)
			this.dispatch(this.events.start, null)
			//renderer.setAnimationLoop( animate ); 播放是自动的
	},
	stop() {
			document.removeEventListener('keydown', this.onKeyDown)
			document.removeEventListener('keyup', this.onKeyUp)
			document.removeEventListener('pointerdown', this.onPointerDown)
			document.removeEventListener('pointerup', this.onPointerUp)
			document.removeEventListener('pointermove', this.onPointerMove)
			this.dispatch(this.events.stop, arguments)
			// renderer.setAnimationLoop( null );播放是自动的
	},
	render(elapsed, delta) {
			this.dispatch(this.events.update, { time: elapsed, delta })
	},
}
export default player
`
    return code
}

export { codeForEventScript }
