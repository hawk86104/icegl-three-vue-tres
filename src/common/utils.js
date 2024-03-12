/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-12 10:02:02
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
	const modulePaths = import.meta.glob('PLS/**/config.js', { eager: true })
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
export const getOnePluginConfig = (pName, oName, cName) => {
	// 获得插件列表 根据插件目录
	const modulePaths = import.meta.glob('PLS/**/config.js', { eager: true })
	for (const path of Object.keys(modulePaths)) {
		const name = findStringBetween(path)
		if (name === pName) {
			if (oName && modulePaths[path].default.preview) {
				// 如果存在该插件中 对应的页面参数
				for (let i = 0; i < modulePaths[path].default.preview.length; i++) {
					if (modulePaths[path].default.preview[i].name === oName) {
						return modulePaths[path].default.preview[i]
					}
				}
			} else {
				if (cName && modulePaths[path].default.child) {
					for (let i = 0; i < modulePaths[path].default.child.length; i++) {
						if (modulePaths[path].default.child[i].name === oName) {
							const mpd = modulePaths[path].default.child[i].preview
							for (let j = 0; j < mpd.length; j++) {
								if (mpd[j].name === cName) {
									return mpd[j]
								}
							}
						}
					}
				}
				return modulePaths[path].default
			}
		}
	}
	return null
}