import { access, defineRuntimeConfig } from '@fesjs/fes';

import PageLoading from '@/components/pageLoading.vue';
import UserCenter from '@/components/userCenter.vue';

export default defineRuntimeConfig({
    beforeRender: {
        loading: <PageLoading />,
        action() {
            const { setRole } = access;
            return new Promise((resolve) => {
                setTimeout(() => {
                    setRole('admin');
                    // 初始化应用的全局状态，可以通过 useModel('@@initialState') 获取，具体用法看@/components/UserCenter 文件
                    resolve({
                        userName: '李雷',
                    });
                }, 1000);
            });
        },
    },
    layout: {
        renderCustom: () => <UserCenter />,
    },
});
