/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-08 09:01:48
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-01-08 15:54:14
 */
const compressing = require('compressing')
const fs = require('fs')
var path = require('path')

// 示例代码
const args = process.argv; // 包含了所有的命令行参数，第一个元素为 node 路径，第二个元素为脚本文件名

if (!args[2]) {
	console.error('【类型:creat、package、install】 参数错误')
	return
}

function fileExistsWithCaseSync (filepath) {
	var dir = path.dirname(filepath)
	if (dir === path.dirname(dir)) {
		return true
	}
	var filenames = fs.readdirSync(dir)
	if (filenames.indexOf(path.basename(filepath)) === -1) {
		return false
	}
	return fileExistsWithCaseSync(dir)
}
const packagePlugins = (pluginName) => {
	if (!pluginName) {
		console.error('打包插件_:【插件名错误】 ')
		return
	}
	const pluginPath = './src/plugins/' + pluginName
	// 检查是否存在此插件
	if (!fileExistsWithCaseSync(pluginPath)) {
		console.error(`打包插件_:不存在名为:【 ${pluginName} 】的插件。地址：${pluginPath}`)
		return
	}
	const packagePath = `./pluginMaker/packages/${pluginName}.zip`
	// compressing.zip.compressDir(pluginPath, packagePath, { ignoreBase: false })
	// 	.then(() => {
	// 		console.log(`打包插件_:【 ${pluginName} 】 成功。地址：${packagePath}`)
	// 	})
	// 	.catch(err => {
	// 		console.error(err)
	// 	})
	const zipStream = new compressing.zip.Stream()
	zipStream.addEntry(pluginPath, { relativePath: pluginPath, ignoreBase: true })
	zipStream.addEntry(`./public/plugins/${pluginName}`, { relativePath: `./public/plugins/${pluginName}`, ignoreBase: true })
	const destStream = fs.createWriteStream(packagePath)
	zipStream.pipe(destStream)
		.on('finish', () => {
			console.log(`打包插件_:【 ${pluginName} 】 成功。地址：${packagePath}`)
		})
		.on('error', (err) => {
			console.error(err)
		});
}
const installPlugins = (pluginName) => {
	if (!pluginName) {
		console.error('安装插件_:【插件名错误】 ')
		return
	}
	// 检查是否存在此插件包
	const packagePath = `./pluginMaker/install/${pluginName}.zip`
	if (!fileExistsWithCaseSync(packagePath)) {
		console.error(`安装插件_:不存在名为:【 ${pluginName} 】的插件包。地址：${packagePath}`)
		return
	}
	const pluginPath = './src/plugins/' + pluginName
	// 检查是否存在此插件目录
	if (fileExistsWithCaseSync(pluginPath)) {
		console.error(`安装插件_:已经存在名为:【 ${pluginName} 】的插件。目录地址为：${pluginPath}。 如若需要安装请备份和删除目录`)
		return
	}
	// 解压插件 到 目录
	compressing.zip.uncompress(packagePath, './')
		.then(() => {
			console.log(`安装插件_:【 ${pluginName} 】 成功。地址：${pluginPath}。安装文件包请自行删除。`)
		})
		.catch(err => {
			console.error(err)
		})
}

const createPlugins = (pluginName) => {
	if (!pluginName) {
		console.error('新建插件_:【插件名错误】 ')
		return
	}
	const pluginPath = './src/plugins/' + pluginName
	// 检查是否存在此插件目录
	if (fileExistsWithCaseSync(pluginPath)) {
		console.error(`新建插件_:已经存在名为:【 ${pluginName} 】的插件。目录地址为：${pluginPath}。 请取其他的名字`)
		return
	}

	// 创建目录
	const publicPath = `./public/plugins/${pluginName}/preview`
	fs.mkdir(publicPath, { recursive: true }, (err) => {
		if (err) throw err
		console.log(`新建插件_:静态资源目录已创建:【 ${publicPath} 】`)
	})

	// 解压对应的模版代码到对应的目录
	compressing.zip.uncompress('./pluginMaker/template.zip', pluginPath)
		.then(() => {
			// 要替换的字符及其替换后的内容
			const configFile = pluginPath + '/config.js'

			// 获得当前日期
			const currentDate = new Date()
			const year = currentDate.getFullYear()// 获取年份
			const month = String(currentDate.getMonth() + 1).padStart(2, '0') // 获取月份（注意月份是从 0 开始的，需要加 1）
			const day = String(currentDate.getDate()).padStart(2, '0') // 获取日期
			const formattedDate = `${year}-${month}-${day}`

			const replaceCharacters = {
				'template': pluginName,
				'2024-01-01': formattedDate,
			}
			// 读取原始文件内容
			fs.readFile(configFile, 'utf8', (err, data) => {
				if (err) throw err;
				// 遍历需要替换的字符列表
				for (let oldChar in replaceCharacters) {
					const newChar = replaceCharacters[oldChar]
					// 在数据中查找并替换指定字符
					data = data.replace(new RegExp(oldChar, 'g'), newChar)
				}
				// 将修改后的内容写入新文件
				fs.writeFile(configFile, data, 'utf8', (err) => {
					if (err) throw err;
					console.log(`新建插件_:【 ${configFile} 】config修改完毕`)
				})
			})

			console.log(`新建插件_:【 ${pluginName} 】 成功。地址：${pluginPath}。请自行更改config.js`)
		})
		.catch(err => {
			console.error(err)
		})
}


let type = args[2]
if (type === 'create') {
	createPlugins(args[3])
} else if (type === 'package') {
	packagePlugins(args[3])
} else if (type === 'install') {
	installPlugins(args[3])
}