import {
  CatmullRomCurve3,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Texture,
  TubeGeometry,
  Vector3
} from 'three'
import { punctuation } from '../world/Earth'

/**
 * 经纬度坐标转球面坐标
 * @param {地球半径} R
 * @param {经度(角度值)} longitude
 * @param {维度(角度值)} latitude
 */
export const lon2xyz = (R: number, longitude: number, latitude: number): Vector3 => {
  let lon = (longitude * Math.PI) / 180 // 转弧度值
  const lat = (latitude * Math.PI) / 180 // 转弧度值
  lon = -lon // js坐标系z坐标轴对应经度-90度，而不是90度

  // 经纬度坐标转球面坐标计算公式
  const x = R * Math.cos(lat) * Math.cos(lon)
  const y = R * Math.sin(lat)
  const z = R * Math.cos(lat) * Math.sin(lon)
  // 返回球面坐标
  return new Vector3(x, y, z)
}

// 创建波动光圈
export const createWaveMesh = (options: { radius: number; lon: number; lat: number; textures: any }) => {
  const geometry = new PlaneGeometry(1, 1) //默认在XOY平面上
  const texture = options.textures.aperture

  const material = new MeshBasicMaterial({
    color: 0xe99f68,
    map: texture,
    transparent: true, //使用背景透明的png贴图，注意开启透明计算
    opacity: 1.0,
    depthWrite: false //禁止写入深度缓冲区数据
  })
  const mesh = new Mesh(geometry, material)
  // 经纬度转球面坐标
  const coord = lon2xyz(options.radius * 1.001, options.lon, options.lat)
  const size = options.radius * 0.12 //矩形平面Mesh的尺寸
  mesh.scale.set(size, size, size) //设置mesh大小
  mesh.userData['size'] = size //自顶一个属性，表示mesh静态大小
  mesh.userData['scale'] = Math.random() * 1.0 //自定义属性._s表示mesh在原始大小基础上放大倍数  光圈在原来mesh.size基础上1~2倍之间变化
  mesh.position.set(coord.x, coord.y, coord.z)
  const coordVec3 = new Vector3(coord.x, coord.y, coord.z).normalize()
  const meshNormal = new Vector3(0, 0, 1)
  mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3)
  return mesh
}

// 创建柱状
export const createLightPillar = (options: {
  radius: number
  lon: number
  lat: number
  index: number
  textures: Record<string, Texture>
  punctuation: punctuation
}) => {
  const height = options.radius * 0.3
  const geometry = new PlaneGeometry(options.radius * 0.05, height)
  geometry.rotateX(Math.PI / 2)
  geometry.translate(0, 0, height / 2)
  const material = new MeshBasicMaterial({
    map: options.textures.light_column,
    color: options.index == 0 ? options.punctuation.lightColumn.startColor : options.punctuation.lightColumn.endColor,
    transparent: true,
    side: DoubleSide,
    depthWrite: false //是否对深度缓冲区有任何的影响
  })
  const mesh = new Mesh(geometry, material)
  const group = new Group()
  // 两个光柱交叉叠加
  group.add(mesh, mesh.clone().rotateZ(Math.PI / 2)) //几何体绕x轴旋转了，所以mesh旋转轴变为z
  // 经纬度转球面坐标
  const SphereCoord = lon2xyz(options.radius, options.lon, options.lat) //SphereCoord球面坐标
  group.position.set(SphereCoord.x, SphereCoord.y, SphereCoord.z) //设置mesh位置
  const coordVec3 = new Vector3(SphereCoord.x, SphereCoord.y, SphereCoord.z).normalize()
  const meshNormal = new Vector3(0, 0, 1)
  group.quaternion.setFromUnitVectors(meshNormal, coordVec3)
  return group
}

// 光柱底座矩形平面
export const createPointMesh = (options: { radius: number; lon: number; lat: number; material: MeshBasicMaterial }) => {
  const geometry = new PlaneGeometry(1, 1) //默认在XOY平面上
  const mesh = new Mesh(geometry, options.material)
  // 经纬度转球面坐标
  const coord = lon2xyz(options.radius * 1.001, options.lon, options.lat)
  const size = options.radius * 0.05 // 矩形平面Mesh的尺寸
  mesh.scale.set(size, size, size) // 设置mesh大小

  // 设置mesh位置
  mesh.position.set(coord.x, coord.y, coord.z)
  const coordVec3 = new Vector3(coord.x, coord.y, coord.z).normalize()
  const meshNormal = new Vector3(0, 0, 1)
  mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3)
  return mesh
}

// 获取点
export const getCirclePoints = (option: any) => {
  const list = []
  for (let j = 0; j < 2 * Math.PI - 0.1; j += (2 * Math.PI) / (option.number || 100)) {
    list.push([
      parseFloat((Math.cos(j) * (option.radius || 10)).toFixed(2)),
      0,
      parseFloat((Math.sin(j) * (option.radius || 10)).toFixed(2))
    ])
  }
  if (option.closed) list.push(list[0])
  return list
}

// 创建线

/**
 * 创建动态的线
 */
export const createAnimateLine = (option: any) => {
  // 由多个点数组构成的曲线 通常用于道路
  const l: Array<any> = []
  option.pointList.forEach((e: Array<any>) => l.push(new Vector3(e[0], e[1], e[2])))
  const curve = new CatmullRomCurve3(l) // 曲线路径

  // 管道体
  const tubeGeometry = new TubeGeometry(curve, option.number || 50, option.radius || 1, option.radialSegments)
  return new Mesh(tubeGeometry, option.material)
}
