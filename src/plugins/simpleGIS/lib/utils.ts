/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-28 16:26:55
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-16 12:12:26
 */
import * as THREE from 'three'
import { Tileset } from '3d-tiles-renderer'
export const rotationBetweenDirections = (dir1: any, dir2: any) => {
	const rotation = new THREE.Quaternion()
	const a = new THREE.Vector3().crossVectors(dir1, dir2)
	rotation.x = a.x
	rotation.y = a.y
	rotation.z = a.z
	rotation.w = 1 + dir1.clone().dot(dir2)
	rotation.normalize()
	return rotation
}

export const onLoadTileSetForCesium3Dtitles = (tiles: any) => {
	tiles.onLoadTileSet = (tileSet1: Tileset) => {
		const box = new THREE.Box3()
		const sphere = new THREE.Sphere()
		const matrix = new THREE.Matrix4()
		let position = null
		let distanceToEllipsoidCenter = 0
		if (tiles.getOrientedBounds(box, matrix)) {
			position = new THREE.Vector3().setFromMatrixPosition(matrix)
			distanceToEllipsoidCenter = position.length()
		} else if (tiles.getBoundingSphere(sphere)) {
			position = sphere.center.clone()
			distanceToEllipsoidCenter = position.length()
		}
		// tiles.group.matrix.copy(matrix).invert()
		// tiles.group.updateMatrix()
		// tiles.group.position.z = -distanceToEllipsoidCenter

		const surfaceDirection = position?.normalize()
		const up = new THREE.Vector3(0, 1, 0)
		const rotationToNorthPole = rotationBetweenDirections(surfaceDirection, up)
		tiles.group.quaternion.x = rotationToNorthPole.x
		tiles.group.quaternion.y = rotationToNorthPole.y
		tiles.group.quaternion.z = rotationToNorthPole.z
		tiles.group.quaternion.w = rotationToNorthPole.w
		tiles.group.position.z = -distanceToEllipsoidCenter

	}
}

/*
涉及坐标的转换
https://github.com/NASA-AMMOS/3DTilesRendererJS/issues/413
From [lat, lon, height] to [x, y, z]

const positionVector = new Vector3();

tiles.ellipsoid.getCartographicToPosition(
			MathUtils.degToRad(lat),
			MathUtils.degToRad(lon),
			height,
			positionVector
);

const mat = tiles.group.matrixWorld.clone();
positionVector.applyMatrix4(mat);
From [x, y, z] to [lat, lon, height]

 const res = {};
 const intersectedPoint = getTilesIntersection(); // Vector3
 
 const mat = tiles.group.matrixWorld.clone().invert();
 const vec = intersectedPoint.applyMatrix4(mat);
 
 tiles.ellipsoid.getPositionToCartographic(vec, res);


 https://github.com/NASA-AMMOS/3DTilesRendererJS/issues/404
 How to get the centre location (latitude and longitude) of the 3D tiles when the user moves the 3D view

 const { lat, lng } = mapCenterOnMove; tiles.setLatLonToYUp(lat * MathUtils.DEG2RAD, lng * MathUtils.DEG2RAD); tiles.update();
*/