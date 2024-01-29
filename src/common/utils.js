/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-29 19:19:26
 */
// 放工具函数
const findStringBetween = (str) => {
	const regex = /\/([^/]+)(?=\/[^/]*$)/;
	const match = str.match(regex);
	if (match && match[1]) {
		return match[1];
	}
	return null;
}
export const getPluginsConfig = () => {
	// 获得插件列表 根据插件目录
	const modulePaths = import.meta.globEager('PLS/**/config.js');
	const config = {};
	for (const path of Object.keys(modulePaths)) {
		const name = findStringBetween(path)
		if (!name) {
			continue;
		}
		config[name] = modulePaths[path].default
	}
	return config
}
export const getOnePluginConfig = (pName, oName) => {
	// 获得插件列表 根据插件目录
	const modulePaths = import.meta.glob('PLS/**/config.js', { eager: true })
	for (const path of Object.keys(modulePaths)) {
		const name = findStringBetween(path)
		if (name === pName) {
			if (oName && modulePaths[path].default.preview) {
				// 如果存在该插件中 对应的页面参数
				for (let i = 0; i < modulePaths[path].default.preview.length; i++) {
					if (modulePaths[path].default.preview[i].name === oName) { // 当数组元素等于 5 时跳出循环并返回结果
						return modulePaths[path].default.preview[i]
					}
				}
			} else {
				return modulePaths[path].default
			}
		}
	}
	return null
}