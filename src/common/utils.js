/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-04-09 08:35:22
 */
// 放工具函数
import { request } from '@fesjs/fes'
// import { format } from 'echarts'
import { FMessage } from '@fesjs/fes-design'

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
const formatMenu = (online, local) => {
	const result = local
	for (const olKey of Object.keys(online)) {
		let hasWaitForGit = false
		if (olKey === 'basic') {
			continue
		}
		let hasItem = false
		for (const loKey of Object.keys(local)) {
			if (olKey === loKey) {
				hasItem = true
				// 如果存在第一层目录 ，则对比preview
				const olItem = online[olKey]
				const loItem = local[loKey]
				for (let i = 0; i < olItem.preview.length; i++) {
					let hasPreview = false
					for (let j = 0; j < loItem.preview.length; j++) {
						if (olItem.preview[i].name === loItem.preview[j].name) {
							hasPreview = true
							// 如果存在preview 则无需更改
						}
					}
					if (!hasPreview) {
						// 如果不存在preview，则添加
						olItem.preview[i].waitForGit = true
						result[olKey].preview.push(olItem.preview[i])
						hasWaitForGit = true
					}
				}
			}
		}
		if (!hasItem) {
			// 如果第一层目录不存在，则添加
			online[olKey].waitForGit = true
			result[olKey] = online[olKey]
			hasWaitForGit = true
		}
		if(hasWaitForGit){
			FMessage.warning?.({
				content: `官网已经更新的插件功能，请git 更新代码!`,
				colorful:true,
				duration:5,
			})
		}
	}
	return result
}
export const getOnlinePluginConfig = (plConfig) => {
	request(
		'https://www.icegl.cn/addons/tvt/index/getRelaseMenuList', {},
		{
			method: 'get',
		},
	)
		.then((res) => {
			plConfig.value = formatMenu(res.code.menuList.configs, plConfig.value)
		})
		.catch((err) => {
			// 处理异常
			console.log(err, '请连接网络，获得插件的菜单更新')
		})
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