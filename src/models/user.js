/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-21 15:34:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-04 19:35:08
 */
import { reactive } from 'vue';
import { access } from '@fesjs/fes';

export default function userModel () {
	const user = reactive({ userName: '11' });

	const signin = () => {
		// todo
		const { setRole } = access;
		user.userName = '';
		setRole('admin');
	};

	const signout = () => {
		// todo
	};

	return {
		user,
		signin,
		signout,
	};
}
