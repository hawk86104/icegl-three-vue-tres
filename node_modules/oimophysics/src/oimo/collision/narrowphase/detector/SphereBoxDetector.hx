package oimo.collision.narrowphase.detector;
import oimo.collision.geometry.*;
import oimo.collision.narrowphase.*;
import oimo.common.MathUtil;
import oimo.common.Transform;
import oimo.m.IVec3;
import oimo.m.M;

/**
 * Sphere vs Box collision detector.
 */
@:build(oimo.m.B.bu())
class SphereBoxDetector extends Detector {
	/**
	 * If `swapped` is `true`, the collision detector expects `BoxGeometry` and `SphereGeometry` for the
	 * first and second argument of `SphereBoxDetector.detect`. If `swapped` is `false`, the collision detector expects
	 * `SphereGeometry` and `BoxGeometry` instead.
	 */
	public function new(swapped:Bool) {
		super(swapped);
	}

	override function detectImpl(result:DetectorResult, geom1:Geometry, geom2:Geometry, tf1:Transform, tf2:Transform, cachedData:CachedDetectorData):Void {
		var s:SphereGeometry = cast geom1;
		var b:BoxGeometry = cast geom2;

		result.incremental = false;

		var halfExt:IVec3;
		var negHalfExt:IVec3;
		M.vec3_assign(halfExt, b._halfExtents);
		M.vec3_negate(negHalfExt, halfExt);

		var r:Float = s._radius;

		var boxToSphere:IVec3;
		M.vec3_sub(boxToSphere, tf1._position, tf2._position);

		var boxToSphereInBox:IVec3;
		M.vec3_mulMat3Transposed(boxToSphereInBox, boxToSphere, tf2._rotation);

		// is the center of the sphere inside the box?
		var insideBox:Bool = M.aabb_overlap(negHalfExt, halfExt, boxToSphereInBox, boxToSphereInBox);
		if (insideBox) {
			// compute minimum distance between the center of the sphere and the box's surfaces that are perpendicular to each axis
			var sphereToBoxSurface:IVec3;
			M.vec3_abs(sphereToBoxSurface, boxToSphereInBox);
			M.vec3_sub(sphereToBoxSurface, halfExt, sphereToBoxSurface);

			var normalInBox:IVec3;

			// ... and select the smallest one, setting normal
			var distX:Float = M.vec3_get(sphereToBoxSurface, 0);
			var distY:Float = M.vec3_get(sphereToBoxSurface, 1);
			var distZ:Float = M.vec3_get(sphereToBoxSurface, 2);
			var depth:Float;
			var projectionMask:IVec3;
			M.compare3min(
				distX, distY, distZ, {
					if (M.vec3_get(boxToSphereInBox, 0) > 0) {
						M.vec3_set(normalInBox, 1, 0, 0);
					} else {
						M.vec3_set(normalInBox, -1, 0, 0);
					}
					M.vec3_set(projectionMask, 0, 1, 1);
					depth = distX;
				}, {
					if (M.vec3_get(boxToSphereInBox, 1) > 0) {
						M.vec3_set(normalInBox, 0, 1, 0);
					} else {
						M.vec3_set(normalInBox, 0, -1, 0);
					}
					M.vec3_set(projectionMask, 1, 0, 1);
					depth = distY;
				}, {
					if (M.vec3_get(boxToSphereInBox, 2) > 0) {
						M.vec3_set(normalInBox, 0, 0, 1);
					} else {
						M.vec3_set(normalInBox, 0, 0, -1);
					}
					M.vec3_set(projectionMask, 1, 1, 0);
					depth = distZ;
				}
			);

			// compute the closest point
			var base:IVec3;
			M.vec3_compWiseMul(base, projectionMask, boxToSphereInBox);
			var boxToClosestPointInBox:IVec3;
			M.vec3_compWiseMul(boxToClosestPointInBox, normalInBox, halfExt);
			M.vec3_add(boxToClosestPointInBox, boxToClosestPointInBox, base);

			// bring them back to the world coordinate system
			var boxToClosestPoint:IVec3;
			var normal:IVec3;
			M.vec3_mulMat3(boxToClosestPoint, boxToClosestPointInBox, tf2._rotation);
			M.vec3_mulMat3(normal, normalInBox, tf2._rotation);
			M.call(setNormal(result, normal));

			var pos1:IVec3;
			var pos2:IVec3;
			M.vec3_addRhsScaled(pos1, tf1._position, normal, -r);
			M.vec3_add(pos2, tf2._position, boxToClosestPoint);
			M.call(addPoint(result, pos1, pos2, depth, 0));
			return;
		}

		// compute the closest point to the center of the sphere; just clamp the coordinate
		var boxToClosestPointInBox:IVec3;

		// avoid division by zero
		var eps:Float = 1e-9;
		var epsVec:IVec3;
		M.vec3_set(epsVec, eps, eps, eps);
		M.vec3_sub(halfExt, halfExt, epsVec);
		M.vec3_add(negHalfExt, negHalfExt, epsVec);

		M.vec3_clamp(boxToClosestPointInBox, boxToSphereInBox, negHalfExt, halfExt);

		var closestPointToSphereInBox:IVec3;
		M.vec3_sub(closestPointToSphereInBox, boxToSphereInBox, boxToClosestPointInBox);

		var dist:Float = M.vec3_dot(closestPointToSphereInBox, closestPointToSphereInBox);
		if (dist >= r * r) {
			// does not collide
			return;
		}
		dist = MathUtil.sqrt(dist);

		// bring them back to the world coordinate system
		var boxToClosestPoint:IVec3;
		var closestPointToSphere:IVec3;
		M.vec3_mulMat3(boxToClosestPoint, boxToClosestPointInBox, tf2._rotation);
		M.vec3_mulMat3(closestPointToSphere, closestPointToSphereInBox, tf2._rotation);

		var normal:IVec3;
		M.vec3_normalize(normal, closestPointToSphere);
		M.call(setNormal(result, normal));

		var pos1:IVec3;
		var pos2:IVec3;
		M.vec3_addRhsScaled(pos1, tf1._position, normal, -r);
		M.vec3_add(pos2, tf2._position, boxToClosestPoint);
		M.call(addPoint(result, pos1, pos2, r - dist, 0));
	}
}
