import { MeshBasicMaterial, PerspectiveCamera, Scene, ShaderMaterial, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// interfaces
import { IWord } from '../interfaces/IWord'
import { Basic } from './Basic'
import { Resources } from './Resources'
// earth
import Earth from './Earth'

export default class World {
  public basic: Basic
  public scene: Scene
  public camera: PerspectiveCamera
  public renderer: WebGLRenderer
  public controls: OrbitControls
  public material!: ShaderMaterial | MeshBasicMaterial
  public resources: Resources
  public option: IWord
  public earth!: Earth

  constructor(option: IWord) {
    /**
     * 加载资源
     */
    this.option = option
    this.basic = new Basic(option.dom)
    this.scene = this.basic.scene
    this.renderer = this.basic.renderer
    this.controls = this.basic.controls
    this.camera = this.basic.camera
    this.updateSize()
    this.resources = new Resources(async () => {
      await this.createEarth()
      // 开始渲染
      this.render()
    })
  }

  async createEarth(data?: any) {
    // 资源加载完成，开始制作地球，注释在new Earth()类型里面
    this.earth = new Earth({
      data: data || this.option.data,
      dom: this.option.dom,
      textures: this.resources.textures,
      earth: {
        radius: 50,
        rotateSpeed: 0.002,
        isRotation: true
      },
      satellite: {
        show: true,
        rotateSpeed: -0.01,
        size: 1,
        number: 2
      },
      punctuation: {
        circleColor: 0x3892ff,
        lightColumn: {
          startColor: 0xe4007f, // 起点颜色
          endColor: 0xffffff // 终点颜色
        }
      },
      flyLine: {
        color: 0xf3ae76, // 飞线的颜色
        flyLineColor: 0xff7714, // 飞行线的颜色
        speed: 0.004 // 拖尾飞线的速度
      }
    })

    this.scene.add(this.earth.group)
    await this.earth.init()
  }

  /**
   * 渲染函数
   */
  public render() {
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
    this.controls && this.controls.update()
    this.earth && this.earth.render()
  }

  // 更新
  public updateSize(width?: number, height?: number) {
    let w = width || this.option.width
    let h = height || this.option.height
    // 取小值
    if (w < h) h = w
    else w = h

    this.renderer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  // 数据更新重新渲染
  public updateData(data?: any) {
    if (!this.earth.group) return
    // 先删除旧的
    this.scene.remove(this.earth.group)
    // 递归遍历组对象group释放所有后代网格模型绑定几何体占用内存
    this.earth.group.traverse((obj: any) => {
      if (obj.type === 'Mesh') {
        obj.geometry.dispose()
        obj.material.dispose()
      }
    })
    // 重新创建
    this.createEarth(data)
  }
}
