import * as fs from 'fs'
import * as path from 'path'
import * as inquirer from 'inquirer'
import * as ejs from 'ejs'
import { Command } from 'commander'

const program = new Command()

program
  .version(require('./package').version)
  .usage('[options] <files|directories|globs>')
  .showHelpAfterError()
  .option('-D, --dest [type]', 'destination dir', '.')

program.parse()
const opts = program.opts()
console.log(opts, 'opts')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?',
    default: 'egg-ts-demo',
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author name?',
    default: 'skyfury',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description?',
    default: 'egg typescript demo',
  },
  {
    type: 'input',
    name: 'license',
    message: 'License?',
    default: 'MIT',
  },
])
  .then(anwsers => {
    console.log(anwsers)
    // 根据用户回答的结果生成文件

    // 模板目录
    const tmplDir = path.join(__dirname, 'templates')
    // 目标目录
    const destDir = path.join(process.cwd(), opts.dest)

    const source: string[] = []
    readFiles(tmplDir, source)

    // console.log(fs.readdirSync(tmplDir, { withFileTypes: true }))
    // fs.writeFileSync(path.join(destDir, 'a.txt'), 'hhh')
    // fs.mkdirSync(path.join(destDir, '/a/b/c/a.txt'), { recursive: true })
    // if (!fs.existsSync(destDir)) {
    //   fs.mkdirSync(destDir)
    // }

    // 将模板下的文件全部转换到目标目录
    source.forEach(file => {
      const destPath = file.replace(tmplDir, destDir)
      if (!fs.existsSync(path.dirname(destPath))) {
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
