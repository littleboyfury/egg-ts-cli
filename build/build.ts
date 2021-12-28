import * as fs from 'fs'
import * as path from 'path'

const indexJsPath = path.join(__dirname, '../index.js')

const indexJs = fs.readFileSync(indexJsPath).toString()

// add node exec
fs.writeFileSync(indexJsPath,'#!/usr/bin/env node\n' + indexJs)
