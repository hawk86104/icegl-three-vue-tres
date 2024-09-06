<script setup lang="js">
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { useTresContext } from '@tresjs/core'

const { scene } = useTresContext()
const texture = {
  matcap:
    "/plugins/visualArts/image/photo.avif",
  skin:
    "/plugins/visualArts/image/photo-1560780552-ba54683cb263.avif",
  env:
    "/plugins/visualArts/image/photo-1536566482680-fca31930a0bd.avif"
}

class LightBar {
  constructor(props) {
    this.geometry(props.scene, props.uid)
  }
  geometry (e, i) {
    const amp = 1
    const c_mat = new THREE.MeshBasicMaterial()
    const c_geo = new THREE.CapsuleGeometry(0.02, 0.5 + Math.random(), 5, 16)
    this.c_mes = new THREE.Mesh(c_geo, c_mat)
    this.c_mes.position.y =
      -Math.random() * (amp / 2) + Math.random() * (amp / 2)
    this.c_mes.position.x = -Math.sin(i * 0.3) * Math.PI
    this.c_mes.position.z = -Math.cos(i * 0.3) * Math.PI
    e.add(this.c_mes)
  }
}

class Space {
  constructor(props) {
    this.init()
  }
  init () {
    this.lights()
    this.object()
    this.capsule()
  }
  lights () {
    const h_light = new THREE.HemisphereLight(0xffffff, 0xaaaacc, 1)
    const p_light = new THREE.PointLight(0xffffff, 0.2)
    p_light.castShadow = true
    p_light.position.set(1, 5, 1)
    scene.value.add(h_light, p_light)
  }
  capsule () {
    for (let i = 0; i <= 20; i++) {
      const lightbar = new LightBar({ scene: scene.value, uid: i })
    }
  }
  object () {
    const o_geo = new RoundedBoxGeometry(1, 1, 1, 5, 0.05)
    const c_geo = new THREE.CircleGeometry(5, 5)
    const o_mat = new THREE.MeshMatcapMaterial({
      color: 0xffffff,
      //side: THREE.DoubleSide,
      matcap: new THREE.TextureLoader().load(texture.matcap),
      map: new THREE.TextureLoader().load(texture.env)
    })

    const c_mes = new THREE.Mesh(c_geo, o_mat)
    const o_mes = new THREE.Mesh(o_geo, o_mat)
    c_mes.rotateX(Math.PI / 2)
    c_mes.position.y = -1
    scene.value.add(o_mes)
  }

}
const world = new Space()
</script>
