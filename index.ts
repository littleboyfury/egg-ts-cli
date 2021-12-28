import * as fs from 'fs'
import * as path from 'path'
import * as inquirer from 'inquirer'
import * as ejs from 'ejs'
import { Command } from 'commander'

const program = new Command()

// 获取输出路径，默认当前文件夹
program
  .version(require('./package').version)
  .usage('[options] <directories>')
  .showHelpAfterError()
  .option('-D, --dest [type]', 'destination dir', '.')

program.parse()
const opts = program.opts()

// 用户自定义的值
inquirer.prompt([

  // 项目名
  {
    type: 'input',
    name: 'name',
    message: 'Project name?',
    default: 'egg-ts-demo',
  },

  // 作者
  {
    type: 'input',
    name: 'author',
    message: 'Author name?',
    default: 'skyfury',
  },

  // 描述
  {
    type: 'input',
    name: 'description',
    message: 'Description?',
    default: 'egg typescript demo',
  },
  // {
  //   type: 'input',
  //   name: 'license',
  //   message: 'License?',
  //   default: 'MIT',
  // },
])
  .then(anwsers => {

    // 模板目录
    const tmplDir = path.join(__dirname, 'templates')
    // 目标目录
    const destDir = path.join(process.cwd(), opts.dest)

    const source: string[] = []

    // 读取路径中的所有文件，放入 source 中
    readFiles(tmplDir, source)

    source.forEach(file => {

      // 生成目标路径
      const destPath = file.replace(tmplDir, destDir)

      if (!fs.existsSync(path.dirname(destPath))) {

        // 如果文件夹不存在，这创建文件夹，recursive 可以递归创建
        fs.mkdirSync(path.dirname(destPath), { recursive: true })
      }

      // 通过模板引擎渲染文件
      ejs.renderFile(file, anwsers, (err, result) => {
        if (err) throw err

        // 将结果写入目标文件路径
        fs.writeFileSync(destPath.endsWith('.backup') ? destPath.slice(0, -7) : destPath, result)
      })
    })
  })

/**
 * 读取文件中所有文件的绝对路径
 * @param dir 目前文件夹
 * @param source 文件路径保存
 */
function readFiles(dir: string, source: string[]) {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  files.forEach(file => {
    if (file.isFile()) {
      source.push(path.join(dir, file.name))
    } else {
      readFiles(path.join(dir, file.name), source)
    }
  })
}
