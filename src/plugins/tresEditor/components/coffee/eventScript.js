/* eslint-disable prefer-rest-params */
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
	get dom() {
			return Grscwh.renderer?.value.domElement.parentElement
	},
	get canvas() {
			return Grscwh.renderer?.value.domElement
	},
	events: {},
	init(scene, renderer, camera, sizes) {
			Grscwh.scene = scene
			Grscwh.renderer = renderer
			Grscwh.camera = camera
			Grscwh.sizes = sizes
	},
	load(sceneObject) {
		const scriptsJson = 
{"b76d97b2-0cef-486d-862b-f83c140c795b":[{"name":"forShader","source":"const img = 'data:image/png;base64,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'\nconst textureLoader = new THREE.TextureLoader()\nconst map = textureLoader.load(img)\nmap.wrapS = THREE.RepeatWrapping\nmap.wrapT = THREE.RepeatWrapping\nthis.material.uniforms.uPerlin.value = map\n\nthis.geometry.translate(0, 0.5, 0)\nthis.geometry.scale(1.5, 6, 1.5)\n\nfunction update( event ) {\n\tconst timev = event.time / 500.0\n\tthis.material.uniforms.uTime.value = timev\n}"}]}

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
				scriptWrapParams += `,${eventKey}`
				scriptWrapResultObj[eventKey] = eventKey
		}
		const scriptWrapResult = JSON.stringify(scriptWrapResultObj).replace(/\"/g, '')
		for (const uuid in scriptsJson) {
				let curUuid = uuid
				//这里解决一个问题 目前并没有把 主场景scene直接替换而是通过group 加进入的，所以 如果事件是基于主场景scene 那么替换这个uuid为现在tres主场景的uuid
				if (uuid === sceneObject.uuid) {
						curUuid = this.scene.uuid
				}
				const object = this.scene.getObjectByProperty('uuid', curUuid, true)
				if (object === undefined) {
						console.warn('player: Script without object.', curUuid)
						continue
				}
				const scripts = scriptsJson[uuid]
				for (let i = 0; i < scripts.length; i++) {
						const script = scripts[i]
						// eslint-disable-next-line no-new-func
						const functions = new Function(scriptWrapParams, `${script.source}
return ${scriptWrapResult};`).bind(object)(
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
