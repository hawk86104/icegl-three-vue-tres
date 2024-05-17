/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-25 15:39:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-05-15 08:10:03
 */
const path = require('path')
const fs = require('fs').promises
const glob = require('glob')

const getPluginsConfig = () => {
    // console.log(__dirname)
    // const modulePaths = glob.sync('/plugins/**/config.js', { eager: true, cwd: __dirname }); //../../src , sync: true
    const configFiles = glob.sync('../plugins/*/config.js', { cwd: __dirname })
    // 读取这些文件的内容并合并
    const configs = {}
    const require2 = require('esm')(module)
    configFiles.forEach(async (file) => {
        const config = require2(path.join(__dirname, file)).default
        configs[config.name] = config
    })

    // console.log(configs);
    return { configs, date: new Date().toLocaleString() }
}
// getPluginsConfig()

export default function addExtraScriptPlugin() {
    return {
        name: 'add-extra-script-plugin',
        async generateBundle() {
            async function writeToFile() {
                try {
                    // 初始化要写入的文件内容
                    const pluginsConfig = getPluginsConfig()
                    const content = JSON.stringify(pluginsConfig)

                    // 写入文件
                    await fs.writeFile('dist/menu.json', content, 'utf8')

                    // console.log('menu.json written successfully.', pluginsConfig)
                } catch (error) {
                    console.error('Error writing file:', error)
                }
            }

            await writeToFile()
        },
    }
}
