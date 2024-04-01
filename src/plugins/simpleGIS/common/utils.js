/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-31 13:37:31
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-01 09:09:24
 */
import * as TWEEN from '@tweenjs/tween.js'

export const flyTo = (camera, target, controls, duration = 1000) => {
	const startPosition = camera.value.position.clone()
	const startLookAt = controls.value.target.clone()
	const targetPosition = target.clone()
	const targetLookAt = target.clone()
	targetLookAt.y = 0

	const tween = new TWEEN.Tween({
		x: startPosition.x, y: startPosition.y, z: startPosition.z,
		lookAtX: startLookAt.x, lookAtY: startLookAt.y, lookAtZ: startLookAt.z
	})
		.to({
			x: targetPosition.x, y: targetPosition.y, z: targetPosition.z,
			lookAtX: targetLookAt.x, lookAtY: targetLookAt.y, lookAtZ: targetLookAt.z
		}, duration)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate((e) => {
			camera.value.position.set(e.x, e.y, e.z)
			controls.value.target.set(e.lookAtX, e.lookAtY, e.lookAtZ)

			// 如下参数 若controls 的 enableDamping 拖动参数 为false时，不自动刷新 则需要加上
			// controls.value.position0.set(e.x, e.y, e.z)
			// camera.value.lookAt(e.x, e.y, e.z)
			// camera.value.updateProjectionMatrix()
			// controls.value.update()

			// 若移动后 最后一整会被重置 那么需要考虑 相机默认旋转朝上的 向量
			// <TresPerspectiveCamera :up="[0, 0, -1]" />
		})
		.start()
		.onComplete(() => {
			tween.stop()
		})

	tween.start()
}
export const flyToNative = (camera, target, controls, offsetZ = [-2000, -2000], duration = 1000) => {
	const startPosition = camera.position.clone()
	const startLookAt = controls.target.clone()
	const targetPosition = target.clone()
	const targetLookAt = target.clone()
	targetLookAt.y = 0
	targetLookAt.x = targetLookAt.x + offsetZ[0]
	targetLookAt.z = targetLookAt.z + offsetZ[1]

	const tween = new TWEEN.Tween({
		x: startPosition.x, y: startPosition.y, z: startPosition.z,
		lookAtX: startLookAt.x, lookAtY: startLookAt.y, lookAtZ: startLookAt.z
	})
		.to({
			x: targetPosition.x, y: targetPosition.y, z: targetPosition.z,
			lookAtX: targetLookAt.x, lookAtY: targetLookAt.y, lookAtZ: targetLookAt.z
		}, duration)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate((e) => {
			camera.position.set(e.x, e.y, e.z)
			controls.target.set(e.lookAtX, e.lookAtY, e.lookAtZ)
		})
		.start()
		.onComplete(() => {
			tween.stop()
		})

	tween.start()
}