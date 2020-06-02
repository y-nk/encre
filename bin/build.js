#!/usr/bin/env node

// tooling
const now = Date.now()

const { mkdirSync, copyFile } = require('fs')
const { outputFile, removeSync, ensureFile } = require('fs-extra')
const { join, resolve } = require('path')
const glob = require('glob')

const search = async expr => new Promise((resolve, reject) => {
  glob(expr, { nodir: true }, (err, files) => !err ? resolve(files) : reject(err))
})

const write = async (data, file) => new Promise((resolve, reject) => {
  outputFile(file, data, err => !err ? resolve() : reject(err))
})

const copy = async (src, dst) => new Promise((resolve, reject) => {
  ensureFile(dst)
    .then(() => copyFile(src, dst, err => (
      !err ? resolve() : reject(err)
    )))
})

// entrypoint 
;(async () => {
  // clean build
  const build = resolve(process.cwd(), './dist')
  removeSync(build)
  mkdirSync(build)

  // start build
  const config = require('./config')

  const middleware = require('../src/router')
  const { md2html } = require('../src/convert')

  console.log('build destination:', build)

  // creating a mock middleware
  const router = middleware(config)

  // mock request function
  const render = path => {  
    router.handle({
      method: 'get', url: path, path: path,
    }, {
      header: () => {},

      async send(html) {
        await write(html, join(build, path))
      },
      
    }, () => {})
  }

  // index
  render('/index.html')

  // posts
  const posts = await search(`${process.cwd()}/posts/**/*.md`)
  
  for (const post of posts)
    render(`/${md2html(post)}`)

  // static files
  const static = await search(`${process.cwd()}/static/**/*`)
  const assets = await search(`${process.cwd()}/posts/**/!(*.md)`)

  for (const file of static)
    await copy(file, join(build, file.replace(`${process.cwd()}/static`, '')))

  for (const file of assets)
    await copy(file, join(build, file.replace(`${process.cwd()}/posts`, '')))

  console.log('build complete!', `(${Date.now() - now}ms)`)
})()
