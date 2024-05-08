import * as THREE from 'three'

const initEvent = (mouse, brushActive, camera, mouseType, targetMesh, controls) => {
    window.addEventListener('pointermove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
        brushActive.value = true
    })

    window.addEventListener(
        'pointerdown',
        (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
            mouseType.value = e.button

            const raycaster = new THREE.Raycaster()
            raycaster.setFromCamera(mouse, camera.value)
            raycaster.firstHitOnly = true

            const res = raycaster.intersectObject(targetMesh.value, true)
            brushActive.value = true
            controls.enabled = res.length === 0
        },
        true,
    )

    window.addEventListener(
        'pointerup',
        (e) => {
            mouseType.value = -1
            if (e.pointerType === 'touch') {
                brushActive.value = false
            }
        },
        true,
    )
}

export { initEvent }
