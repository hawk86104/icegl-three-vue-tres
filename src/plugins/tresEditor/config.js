/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-10 10:11:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-13 09:58:17
 */
export default {
    name: 'tresEditor',
    title: 'tres3D编辑器',
    intro: '利用Three.js的原生编辑器，导入到本TvT.js快速完成项目落地。',
    version: '0.0.1',
    author: '地虎降天龙',
    website: 'https://gitee.com/hawk86104',
    state: 'active',
    creatTime: '2024-05-10',
    updateTime: '2024-05-10',
    require: [],
    preview: [
        {
            src: `此为：https://threejs.org/editor/ 的国内镜像，为了让大家更方便使用。编辑好场景后，选择项目下的发布按钮，解压包，获得:app.json，拿着它开始我们TvT.js的旅程吧！`,
            type: 'text',
            name: 'threeEditor',
            url: 'https://editor.icegl.cn',
            title: 'three原生Editor',
        },
        {
            src: `1、载入原生Three.js编辑器的Json文件；</br>
            2、导出拆解Json的Zip包；</br>
            3、载入拆解后的Zip包了；`,
            type: 'text',
            name: 'simpleImport',
            title: '导入/出JsonZip',
        }
    ],
}
