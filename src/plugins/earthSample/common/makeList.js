/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-02 17:32:16
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-02 20:08:15
 */
import * as THREE from 'three';
import { countryPositionList } from '../data/postions'

const getVector3 = (e) => {
	const t = new THREE.Spherical;
	t.radius = 100;
	const n = e[0]
		, i = e[1]
		, r = (n + 90) * (Math.PI / 180)
		, a = (90 - i) * (Math.PI / 180);
	t.phi = a
	t.theta = r;
	const o = new THREE.Vector3;
	o.setFromSpherical(t)
	return o
}
const addMeshes = (e, t) => {
	const kb = new THREE.Object3D
	const colorList = ["#66ffff", "#66aaaa"]
	const n = colorList[t]
	const i = new THREE.CircleGeometry(3, 6)
	const r = new THREE.CircleGeometry(2, 6)
	const a = i.vertices;
	// a.shift();
	const o = new THREE.BoxGeometry();
	o.vertices = a;
	const s = new THREE.MeshBasicMaterial({
		color: n,
		side: THREE.DoubleSide,
		blending: THREE.AdditiveBlending
	})
		, l = new THREE.MeshBasicMaterial({
			color: n,
			side: THREE.DoubleSide,
			transparent: !0,
			opacity: 1
		})
		, c = new THREE.LineLoop(o, s)
		, u = new THREE.Mesh(r, l);
	c.position.copy(e)
	u.position.copy(e)
	u.lookAt(new THREE.Vector3(0, 0, 0))
	c.lookAt(new THREE.Vector3(0, 0, 0))
	kb.add(c)
	kb.add(u)
	return kb
}
const addlightMeshes = (e) => {
	const n = (new THREE.TextureLoader).load("./plugins/earthSample/image/menuA/lightray.jpg")
		, i = new THREE.MeshBasicMaterial({
			map: n,
			alphaMap: n,
			transparent: !0,
			depthTest: !0,
			opacity: .7,
			side: THREE.DoubleSide,
			color: 16777215,
			blending: THREE.AdditiveBlending
		})
		, r = 50 * Math.random()
	const a = new THREE.PlaneGeometry(6, r)
	const o = new THREE.Matrix4
		, s = new THREE.Mesh(a, i);
	o.makeRotationX(Math.PI / 2)
	o.setPosition(new THREE.Vector3(0, 0, r / -2))
	a.applyMatrix4(o);
	const l = s.clone()
	l.rotation.z = Math.PI / 2
	s.add(l)
	s.position.copy(e)
	s.lookAt(0, 0, 0)
	return s
}
export const initCountryPosition = (scene) => {
	for (let i = 0; i < countryPositionList.length; i++) {
		const a = getVector3(countryPositionList[i].position)
		const o = Math.floor(2 * Math.random())
		scene.add(addMeshes(a, o))
		scene.add(addlightMeshes(a))
	}
}