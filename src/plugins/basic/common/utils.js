/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-13 14:35:16
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-12-13 14:35:19
 */
/**
 * Dilate or erode a geometry inplace
 * @param  {THREE.BufferGeometry} geometry - Geometry to dilate
 * @param  {Number} length - Scale factor (positive to dilate, negative to erode)
 */
function dilateBufferGeometry(geometry, length) {
    if (!geometry.isBufferGeometry) {
        console.error('The geometry must be a BufferGeometry.')
        return
    }

    // Ensure the geometry has normals
    if (!geometry.attributes.normal) {
        geometry.computeVertexNormals()
    }

    // Get positions and normals
    const position = geometry.attributes.position
    const normal = geometry.attributes.normal

    const posArray = position.array
    const normalArray = normal.array

    // Iterate over each vertex
    for (let i = 0; i < position.count; i++) {
        const i3 = i * 3

        // Modify the position by the normal scaled by length
        posArray[i3] += normalArray[i3] * length // x
        posArray[i3 + 1] += normalArray[i3 + 1] * length // y
        posArray[i3 + 2] += normalArray[i3 + 2] * length // z
    }

    // Notify Three.js that the position has been updated
    position.needsUpdate = true
}

export { dilateBufferGeometry }
