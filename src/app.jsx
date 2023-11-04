/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-04 19:01:15
 */
import { defineRuntimeConfig,useModel } from '@fesjs/fes';

import { FMenu } from '@fesjs/fes-design';
import PageLoading from '@/components/pageLoading.vue';
import UserCenter from '@/components/userCenter.vue';

// add by 地虎降天龙
import 'uno.css';

export default defineRuntimeConfig({
    beforeRender: {
        loading: <PageLoading />,
        action () {
            const { signin } = useModel('user');
            signin();
            // const { setRole } = access;
            // return new Promise((resolve) => {
            //     setTimeout(() => {
            //         setRole('admin');
            //         // 初始化应用的全局状态，可以通过 useModel('@@initialState') 获取，具体用法看@/components/UserCenter 文件
            //         resolve({
            //             userName: '李雷',
            //         });
            //     }, 1000);
            // });
        },
    },
    layout: {
        renderCustom: () => <UserCenter />,
        menus: [
            {
                name: 'index',
            },
        ],
    },
});

export function onAppCreated({ app }) {
    app.use(FMenu);
}

const findStringBetween = (str) => {
    const regex = /plugins\/([^/]+)\/pages\//;
    const match = str.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
}
//自动读取plugins目录下所有插件的pages的目录下的*.vue 并加入路由
export function patchRoutes ({ routes }) {
    const viteModules = import.meta.glob('./plugins/**/pages/**/*.vue')
    const needAddRouter = {
        path: '/plugins',
        component: () => import("./components/suspenseLayout.vue"), 
        children: []
      }
    // eslint-disable-next-line guard-for-in
    for (const [key, value] of Object.entries(viteModules)) {
        const pluginName = findStringBetween(key)
        const urlList = key.match(/\.\/(.+)\.vue$/)[1].split('/')
        if(urlList.length === 4){  //插件一级目录 普通插件
            needAddRouter.children.unshift({
                path:`/plugins/${pluginName}/${urlList[3]}`,
                component:value
              })
        }
        else if(urlList.length === 5){ //插件二级目录 目前只存在已 basic 基础功能展示
            needAddRouter.children.unshift({
                path:`/plugins/${pluginName}/${urlList[3]}/${urlList[4]}`,
                component:value
              })
        }else{  // 若目录异常 那么直接跳过
            return
        }
    }
    routes.unshift(needAddRouter)
}
// export function patchRoutes ({ routes }) { 只读取一级 已弃用
//     const needAddRouter = {}
//     const viteModules = import.meta.glob('./plugins/*/pages/*.vue');
//     //const viteModules = import.meta.glob('./plugins/**/pages/**/*.vue');
//     debugger
//     for (const [key, value] of Object.entries(viteModules)) {
//         const pluginName = findStringBetween(key)
//         const pageName = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
//         if(pluginName){
//             const nodeRouter = {
//                 path:`/${pluginName}/${pageName}`,
//                 component:value
//             }
//             if(needAddRouter[pluginName]){
//                 needAddRouter[pluginName].push(nodeRouter)
//             }else{
//                 needAddRouter[pluginName] = [nodeRouter]
//             }
//         }
//     }
//     // eslint-disable-next-line guard-for-in
//     for (const one in needAddRouter) {
//         const OneNode = needAddRouter[one]
//         const addRouterNode = {
//              path: `/${one}`,
//              component: () => import("./components/suspenseLayout.vue"), // 全局增加suspense 标签 异步语法糖
//              children: []
//          }
//          // eslint-disable-next-line array-callback-return
//          OneNode.forEach((e)=>{
//             addRouterNode.children.push(e)
//         })
//         routes.unshift(addRouterNode)
//      }
// }