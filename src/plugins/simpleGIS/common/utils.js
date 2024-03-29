import * as TWEEN from '@tweenjs/tween.js'

export const flyTo = (camera, target, duration = 3000) => {
	const position = camera.value.position.clone()
	const targetPosition = target.clone()
	target.y = 0
	const tween = new TWEEN.Tween(position)
		.to(targetPosition, duration)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate((e) => {
			camera.value.position.copy(e)
			// camera.value.lookAt(target)
		})
		.start()
		.onComplete(() => {
			tween.stop()
		})

	tween.start()
}

export const flyTo2 = (camera, target, controls, duration = 3000) => {
	// 首先重置控制器 不然getAzimuthalAngle getPolarAngle 都会被保存，在结束动画时会被回复
	// controls.value.update()
	// controls.value.saveState()
	// controls.value.update()

	const startPosition = camera.value.position.clone()
	const startLookAt = controls.value.target.clone()
	const targetPosition = target.clone()
	const targetLookAt = target.clone()
	targetLookAt.y = 0
	// targetLookAt.x = targetLookAt.x
	// targetLookAt.z = targetLookAt.z
	console.log('startLookAt', startLookAt)
	console.log('targetLookAt', targetLookAt)
	const tween = new TWEEN.Tween({
		x: startPosition.x, y: startPosition.y, z: startPosition.z,
		lookAtX: startLookAt.x, lookAtY: startLookAt.y, lookAtZ: startLookAt.z
	})
		.to({
			x: targetPosition.x, y: targetPosition.y, z: targetPosition.z,
			lookAtX: targetLookAt.x, lookAtY: targetLookAt.y, lookAtZ: targetLookAt.z
		}, duration)
		.onUpdate((e) => {
			camera.value.position.set(e.x, e.y, e.z)
			controls.value.position0.set(e.x, e.y, e.z)

			camera.value.lookAt(e.x, e.y, e.z)
			controls.value.target.set(e.lookAtX, e.lookAtY, e.lookAtZ)
			console.log('e', e.x, e.y, e.z)
			console.log('lookAtX', e.lookAtX, e.lookAtY, e.lookAtZ)
			console.log('getAzimuthalAngle', controls.value.getAzimuthalAngle())
			console.log('getPolarAngle', controls.value.getPolarAngle())
			controls.value.update()
			// controls.value.reset()
			// controls.value.saveState()
		})
		.start()
		.onComplete(() => {
			debugger
			console.log('controls.value.target0', controls.value.target)
			console.log('getAzimuthalAngleEnd0', controls.value.getAzimuthalAngle())
			console.log('getPolarAngleENd0', controls.value.getPolarAngle())
			camera.value.lookAt(targetLookAt.x, targetLookAt.y, targetLookAt.z)
			controls.value.target.set(targetLookAt.x, targetLookAt.y, targetLookAt.z)
			console.log('controls.value.target1', controls.value.target)
			console.log('getAzimuthalAngleEnd1', controls.value.getAzimuthalAngle())
			console.log('getPolarAngleENd1', controls.value.getPolarAngle())
			controls.value.update()
			console.log('controls.value.target2', controls.value.target)
			console.log('getAzimuthalAngleEnd2', controls.value.getAzimuthalAngle())
			console.log('getPolarAngleENd2', controls.value.getPolarAngle())
			tween.stop()
		})

	tween.start()
}
