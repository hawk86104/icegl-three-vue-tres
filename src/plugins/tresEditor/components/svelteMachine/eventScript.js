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
{"1d0e8871-bd60-47f9-8ab7-232dabd30201":[{"name":"SpotLightEvent","source":"this.shadow.mapSize.width = 1024 * 2\nthis.shadow.mapSize.height = 1024 * 2\nthis.shadow.camera.near = 1\nthis.shadow.camera.far = 10\nthis.shadow.bias = -0.0075\nthis.shadow.radius = 24\nthis.target.position.copy(this.position.clone().setY(0))\nfunction update( event ) {}"}],"beea1423-1e37-47ab-9443-f8429259e120":[{"name":"dirb","source":"this.shadow.mapSize.width = 1024 * 2\nthis.shadow.mapSize.height = 1024 * 2\nthis.shadow.camera.near = 1\nthis.shadow.camera.far = 50\nthis.shadow.camera.top = 80\nthis.shadow.camera.bottom = -80\nthis.shadow.camera.left = -80\nthis.shadow.camera.right = 80\nthis.shadow.radius = 24\nthis.shadow.bias = -0.0075\nfunction update( event ) {}"}],"31517222-A9A7-4EAF-B5F6-60751C0BABA3":[{"name":"senceScirpt","source":"this.environment.mapping = THREE.EquirectangularReflectionMapping;\nthis.environment.colorSpace = THREE.SRGBColorSpace;\nfunction update( event ) {}"}]}

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
