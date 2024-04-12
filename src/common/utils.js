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
	// 复制本地菜单
	const result = { ...local };

	for (const olKey in online) {
		if (olKey === 'basic') {
			continue; 
		}

		const olItem = online[olKey];
		const loItem = local[olKey];

		//  如果在线和本地都存在该键，比较它们的预览项
		if (loItem) {
			const localPreviews = new Map(loItem.preview.map(item => [item.name, item]));

			// 检查并添加在线中缺少的预览到结果中
			olItem.preview.forEach(preview => {
				if (!localPreviews.has(preview.name)) {
					preview.waitForGit = true; 
					result[olKey].preview.push(preview);
					showWarning();
				}
			});
		} else {
			//如果本地不存在该键，则从在线添加整个部分
			olItem.waitForGit = true;
			result[olKey] = olItem;
			showWarning();
		}
	}

	return result;
};

// 警告函数
function showWarning() {
	FMessage.warning?.({
		content: '官网已经更新的插件功能，请git 更新代码!',
		colorful: true,
		duration: 5,
	});
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
	// 获得所有插件配置
	const modulePaths = import.meta.glob('PLS/**/config.js', { eager: true });

	// 遍历插件配置路径
	for (const path in modulePaths) {
			const config = modulePaths[path].default;
			const pluginName = findStringBetween(path);

			// 匹配插件名称
			if (pluginName === pName) {
					// 根据页面参数名查找预览配置
					if (oName && config.preview) {
							const preview = findPreviewByName(config.preview, oName);
							if (preview) return preview;
					}
					// 根据子页面参数名查找子配置
					else if (cName && config.child) {
							const childPreview = findChildPreviewByName(config.child, oName, cName);
							if (childPreview) return childPreview;
					}
					// 如果没有找到具体配置，返回默认配置
					return config;
			}
	}
	// 如果没有找到匹配的插件配置，返回null
	return null;
}

// 通过名称查找预览配置
function findPreviewByName(previews, name) {
	return previews.find(preview => preview.name === name);
}

// 在子配置中查找预览配置
function findChildPreviewByName(children, childName, previewName) {
	const child = children.find(child => child.name === childName);
	if (child && child.preview) {
			return child.preview.find(preview => preview.name === previewName);
	}
	return null;
}
