/*
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: Hawk
 * @LastEditTime: 2023-10-23 15:34:10
 */
import { defineRuntimeConfig,useModel } from '@fesjs/fes';

import { FMenu } from '@fesjs/fes-design';
import PageLoading from '@/components/pageLoading.vue';
import UserCenter from '@/components/userCenter.vue';

// add buy hawk
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
    const needAddRouter = {}
    const viteModules = import.meta.glob('./plugins/*/pages/*.vue');
    for (const [key, value] of Object.entries(viteModules)) {
        const pluginName = findStringBetween(key)
        const pageName = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
        if(pluginName){
            const nodeRouter = {
                path:`/${pluginName}/${pageName}`,
                component:value
            }
            if(needAddRouter[pluginName]){
                needAddRouter[pluginName].push(nodeRouter)
            }else{
                needAddRouter[pluginName] = [nodeRouter]
            }
        }
    }
    // eslint-disable-next-line guard-for-in
    for (const one in needAddRouter) {
        const OneNode = needAddRouter[one]
        const addRouterNode = {
             path: `/${one}`,
             component: () => import("./components/suspenseLayout.vue"),
             children: []
         }
         // eslint-disable-next-line array-callback-return
         OneNode.forEach((e)=>{
            addRouterNode.children.push(e)
        })
        routes.unshift(addRouterNode)
     }
    // routes.unshift({
    //     path: "/digitalCity",
    //     component: () => import("./components/suspenseLayout.vue"),
    //     children: [{
    //         path: "/digitalCity/city",
    //         component: ()=>import('./plugins/digitalCity/pages/city.vue'),
    //     }]
    // });
}