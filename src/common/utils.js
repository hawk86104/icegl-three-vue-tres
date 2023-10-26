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
	// console.log(Object.keys(modulePaths))
	for (const path of Object.keys(modulePaths)) {
		const name = findStringBetween(path)
		if (!name) {
			continue;
		}
		config[name] = modulePaths[path].default
	}
	return config
}