/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-26 18:58:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-14 22:30:06
 */
import { Box3Helper, BufferGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, Texture, SRGBColorSpace, ShaderMaterial, Matrix4 } from 'three';
import { TerrainMesh } from './TerrainMesh';
import { Provider } from '../Provider';
// import { Completer } from '../Utils/PromiseUtils';

class TerrainMeshProvider implements Provider<Mesh> {
    constructor(
        public geometryProvider: Provider<BufferGeometry>,
        public textureProvider: Provider<Texture>,
    ) { }

    maxZoom = 20;
    showBoundingBox = false;
    wireframe = false;
    flatShading = false;
    useStandardMaterial = false;
    filter = null as any;

    getTranMatrix() {
        let tranMatrix = new Matrix4()

        if (this.filter?.opposite) {
            let oppositeMat = new Matrix4() //反色
            oppositeMat.set(
                -1, 0, 0, 0,
                0, -1, 0, 0,
                0, 0, -1, 0,
                1, 1, 1, 1)
            tranMatrix.multiply(oppositeMat)
        }

        if (this.filter?.monochrome) {
            let monochromeMat = new Matrix4()  //单色滤镜
            const rmonoWeight = this.filter.monochrome.r
            const gmonoWeight = this.filter.monochrome.g
            const bmonoWeight = this.filter.monochrome.b
            monochromeMat.set(
                rmonoWeight, gmonoWeight, bmonoWeight, 0,  // Red channel
                rmonoWeight, gmonoWeight, bmonoWeight, 0,  // Green channel
                rmonoWeight, gmonoWeight, bmonoWeight, 0,  // Blue channel
                0, 0, 0, 1
                // rmonoWeight, rmonoWeight, rmonoWeight, 0,
                // gmonoWeight, gmonoWeight, gmonoWeight, 0,
                // bmonoWeight, bmonoWeight, bmonoWeight, 0,
                // 0, 0, 0, 1
            )
            tranMatrix.multiply(monochromeMat)
        }

        if (this.filter?.genBright) {
            let genBrightMat = new Matrix4() //亮度
            const genBright = this.filter.genBright // 1 原色，  < 1 变暗， > 1 变亮
            genBrightMat.set(
                genBright, 0, 0, 0,
                0, genBright, 0, 0,
                0, 0, genBright, 0,
                0, 0, 0, 1
            )
            tranMatrix.multiply(genBrightMat)
        }

        if (this.filter?.genContrast) {
            let genContrastMat = new Matrix4()  //对比度
            const genContrast1 = this.filter.genContrast  // 1 原色，  < 1 减弱对比度， > 1 增强对比度
            const genContrast2 = 0.5 * (1 - genContrast1)
            genContrastMat.set(
                genContrast1, 0, 0, 0,
                0, genContrast1, 0, 0,
                0, 0, genContrast1, 0,
                genContrast2, genContrast2, genContrast2, 1)
            tranMatrix.multiply(genContrastMat)
        }

        if (this.filter?.genSaturate) {
            let genSaturateMat = new Matrix4()  //饱和度
            const genSaturate = this.filter.genSaturate  // p = 0 完全灰度化，p = 1 原色，p > 1 增强饱和度。
            const rWeight = 0.3 * (1 - genSaturate)
            const gWeight = 0.6 * (1 - genSaturate)
            const bWeight = 0.1 * (1 - genSaturate)
            genSaturateMat.set(
                rWeight + genSaturate, rWeight, rWeight, 0,
                gWeight, gWeight + genSaturate, gWeight, 0,
                bWeight, bWeight, bWeight + genSaturate, 0,
                0, 0, 0, 1
            )
            tranMatrix.multiply(genSaturateMat)
        }
        return tranMatrix
    }

    async getTile(tileNo: number[]): Promise<Mesh> {
        const tasks = [
            this.geometryProvider.getTile(tileNo),
            this.textureProvider.getTile(tileNo)
        ];
        const res = await Promise.all(tasks);
        const geometry = res[0] as BufferGeometry;
        const texture = res[1] as Texture;
        texture.colorSpace = SRGBColorSpace;
        const { wireframe, flatShading } = this;
        let material = null
        const renderOrder = tileNo[0] + tileNo[1] + tileNo[2]

        if (this.filter) {
            material = new ShaderMaterial({
                wireframe: wireframe,
                depthTest: true,
                //开启多边形偏移
                polygonOffset: false,
                //当两个参数都为负值（深度减小）时，网格将被拉向摄影机（因此，位于前面）。
                //当两个参数都为正值（增加深度）时，网格将被推离摄影机（因此，被推到后面）。
                polygonOffsetFactor: 0,
                polygonOffsetUnits: 1.0,
                uniforms: {
                    e_Texture: {
                        value: texture
                    },
                    t_Matrix: {
                        value: this.getTranMatrix()
                    }
                },
                // 顶点着色器
                vertexShader: `
                varying vec2 v_Uv;    //顶点纹理坐标
                void main () {
                    v_Uv = uv;
                    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 ); 着色器会抖动
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
                `,
                // 片元着色器
                fragmentShader: `
                uniform sampler2D e_Texture;     //纹理图像
                varying vec2 v_Uv;               //片元纹理坐标
                uniform mat4 t_Matrix;     //接收变换矩阵
                void main () {
                    // gl_FragColor = texture2D( e_Texture, v_Uv );

                    // vec4 textureColor = texture2D( e_Texture, v_Uv );
                    // //计算加权平均值
                    // float w_a = textureColor.r * 0.3 + textureColor.g * 0.6 + textureColor.b * 0.1;
                    // gl_FragColor = vec4(w_a, w_a, w_a, 1.0);

                    vec4 textureColor = texture2D( e_Texture, v_Uv );
                    //变换矩阵乘以 vec4(R,G,B,1)    --->vec4(R,G,B,1) 是齐次坐标，原本是n维的向量用一个n+1维向量来表示
                    //vec4(R,G,B,1)第四个分量不是透明度
                    vec4 transColor =  vec4(textureColor.r, textureColor.g, textureColor.b, 1.0)*t_Matrix; 
                    //设置透明度
                    transColor.a = 1.0;
                    gl_FragColor = transColor;
                }`
            })
        } else {
            material = this.useStandardMaterial
                ? new MeshStandardMaterial({ map: texture, wireframe, flatShading })
                : new MeshBasicMaterial({ map: texture, wireframe })
        }
        const mesh = new TerrainMesh();
        mesh.renderOrder = renderOrder
        geometry.computeBoundingBox();

        geometry.boundingBox!.getCenter(mesh.center);
        geometry.center();
        geometry.computeBoundingSphere();

        mesh.position.copy(mesh.center);

        mesh.geometry = geometry;
        mesh.material = material;

        if (this.showBoundingBox) {
            const boxHelper = new Box3Helper(geometry.boundingBox!);
            mesh.add(boxHelper);
        }

        return mesh;
    }

    abort(tileNo: number[]): void {
        this.geometryProvider.abort(tileNo);
        this.textureProvider.abort(tileNo);
    }

    dispose(tileNo: number[], target: Mesh): void {
        const geometry = target.geometry as BufferGeometry | undefined;
        const material = target.material as MeshBasicMaterial | undefined;
        if (geometry) {
            this.geometryProvider.dispose(tileNo, geometry);
        }
        if (material && material.map) {
            this.textureProvider.dispose(tileNo, material.map);
        }
        material?.dispose();
    }
}

export { TerrainMeshProvider };