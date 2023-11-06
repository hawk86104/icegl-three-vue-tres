/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-02 17:32:16
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-06 12:01:54
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
	const r = new THREE.CircleGeometry(2, 6)
	const l = new THREE.MeshBasicMaterial({
		color: n,
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 1
	})

	// 设置起始角度和角度范围，以跳过中间的顶点
	const bigline = new THREE.CircleGeometry(3, 6)
	// bigline.vertices.shift(); 新版本的变化
	const positions = bigline.getAttribute('position');
	const newPositions = new Float32Array(positions.count * 3 - 3);
	for (let i = 3; i < positions.array.length; i++) {
		newPositions[i - 3] = positions.array[i];
	}
	const newGeometry = new THREE.BufferGeometry();
	newGeometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
	const s = new THREE.MeshBasicMaterial({
		color: n,
		side: THREE.DoubleSide,
		blending: THREE.AdditiveBlending
	})
	const cLineLoop = new THREE.LineLoop(newGeometry, s)
	const u = new THREE.Mesh(r, l);
	u.position.copy(e)
	cLineLoop.position.copy(e)
	u.lookAt(new THREE.Vector3(0, 0, 0))
	cLineLoop.lookAt(new THREE.Vector3(0, 0, 0))
	kb.add(cLineLoop)
	kb.add(u)
	return kb
}
const addlightMeshes = (e) => {
	const n = (new THREE.TextureLoader).load("./plugins/earthSample/image/menuA/lightray.jpg")
		, i = new THREE.MeshBasicMaterial({
			map: n,
			alphaMap: n,
			transparent: true,
			depthTest: true,
			depthWrite: true,
			alphaTest: 0.3,
			opacity: .9,
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

const Xb = (e, t, Eb, Lb) => {
	const n = Math.trunc(Lb.width * e)
		, i = Math.trunc(Lb.height * t);
	return Eb.data[4 * (i * Eb.width + n)] === 0
}
const addPoints = (scene, Eb, Lb) => {
	const e = [], t = [], n = []
	for (let i = 0; i < 2; i++) {
		e[i] = {
			positions: []
		}
		n[i] = {
			sizes: []
		};
		const r = new THREE.PointsMaterial;
		r.size = 5
		r.color = new THREE.Color(10092543)
		r.map = new THREE.TextureLoader().load(`${process.env.BASE_URL}plugins/earthSample/image/menuA/circle.png`)
		r.depthWrite = false
		r.transparent = true
		r.opacity = .2
		r.side = THREE.FrontSide
		r.blending = THREE.AdditiveBlending;
		const a = i / 2;
		r.t_ = a * Math.PI * 2
		r.speed_ = .05
		r.min_ = .2 * Math.random() + .5
		r.delta_ = .1 * Math.random() + .1
		r.opacity_coef_ = 1
		t.push(r)
	}
	const o = new THREE.Spherical;
	o.radius = 100;
	for (let s = 200, l = 0; l < s; l++) {
		for (let c = new THREE.Vector3, u = s * (1 - Math.sin(l / s * Math.PI)) / s + .5, h = 0; h < s; h += u) {
			const d = h / s
				, f = l / s
				, p = Math.floor(2 * Math.random())
				, v = e[p]
				, m = n[p];
			if (Xb(d, f, Eb, Lb)) {
				o.theta = d * Math.PI * 2 - Math.PI / 2
				o.phi = f * Math.PI
				c.setFromSpherical(o)
				v.positions.push(c.x)
				v.positions.push(c.y)
				v.positions.push(c.z)
				if (h % 3 === 0) {
					m.sizes.push(6)
				}
			}
		}
	}
	const Ob = new THREE.Object3D
	for (let g = 0; g < e.length; g++) {
		const _ = new THREE.BufferGeometry()
		const y = e[g]
		const b = n[g]
		const x = new Float32Array(y.positions.length)
		const w = new Float32Array(b.sizes.length)
		for (let M = 0; M < y.positions.length; M++)
			x[M] = y.positions[M];
		for (let S = 0; S < b.sizes.length; S++)
			w[S] = b.sizes[S];
		_.setAttribute("position", new THREE.BufferAttribute(x, 3))
		_.setAttribute("size", new THREE.BufferAttribute(w, 1))
		_.computeBoundingSphere();
		const T = new THREE.Points(_, t[g])
		Ob.add(T)
	}
	Ob.name = 'pointsEearth'
	scene.add(Ob)
}
export const addImgEarth = (scene) => {
	const Lb = document.createElement("img")
	Lb.src = `${process.env.BASE_URL}plugins/earthSample/image/menuA/earth.jpg`
	Lb.onload = function () {
		const t = document.createElement("canvas")
		const n = t.getContext("2d")
		t.width = Lb.width
		t.height = Lb.height
		n.drawImage(Lb, 0, 0, Lb.width, Lb.height)
		const Eb = n.getImageData(0, 0, Lb.width, Lb.height)
		addPoints(scene, Eb, Lb)
	}
}

export const XRayearth = (scene) => {
	const XRayMaterial = function (e) {
		const t = {
			uTex: {
				type: "t",
				value: e.map || new THREE.Texture
			},
			offsetRepeat: {
				value: new THREE.Vector4(0, 0, 1, 1)
			},
			alphaProportion: {
				type: "1f",
				value: e.alphaProportion || .5
			},
			diffuse: {
				value: e.color || new THREE.Color(16777215)
			},
			opacity: {
				value: e.opacity || 1
			},
			gridOffset: {
				value: 0
			}
		};
		return new THREE.ShaderMaterial({
			uniforms: t,
			vertexShader: " \nvarying float _alpha;\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\nuniform float alphaProportion;\nvoid main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\nvec4 worldPosition = modelMatrix * vec4( vec3( position ), 1.0 );\nvec3 cameraToVertex = normalize( cameraPosition - worldPosition.xyz);\n_alpha = 1.0 - max( 0.0, dot( normal, cameraToVertex ) );\n_alpha = max( 0.0, (_alpha - alphaProportion) / (1.0 - alphaProportion) );\n}",
			fragmentShader: "\nuniform sampler2D uTex;\nuniform vec3 diffuse;\nuniform float opacity;\nuniform float gridOffset;\nvarying float _alpha;\nvarying vec2 vUv;\nvoid main() {\nvec4 texColor = texture2D( uTex, vUv );\nfloat _a = _alpha * opacity;\nif( _a <= 0.0 ) discard;\n_a = _a * ( sin( vUv.y * 1.0 + gridOffset ) * .5 + .5 );\ngl_FragColor = vec4( texColor.rgb * diffuse, _a );\n}",
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			side: THREE.DoubleSide
		})
	}

	const e = new THREE.SphereGeometry(1.1 * 100, 120, 144)
	const t = (new THREE.TextureLoader).load(`${process.env.BASE_URL}plugins/earthSample/image/menuA/clouds.png`);
	t.wrapT = THREE.ClampToEdgeWrapping
	t.wrapS = THREE.ClampToEdgeWrapping
	const n = new XRayMaterial({
		map: t,
		alphaProportion: .35,
		color: new THREE.Color(6723993),
		opacity: 1,
		gridOffsetSpeed: .6
	})
	const i = new THREE.Mesh(e, n)
	i.matrixAutoUpdate = false
	const Ob = new THREE.Object3D
	Ob.name = 'cloudsEearth'
	Ob.add(i)
	scene.add(Ob)
	return Ob
}