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
  const link = require('../link')
  const render = require('../render')

  const { argv } = process
  const args = argv.slice(2)
  const config = args.shift()
  
  const options = config
    ? require(`${process.cwd()}/${config}`)
    : {}

  const build = resolve(process.cwd(), './dist')
  removeSync(build)
  mkdirSync(build)

  console.log('build destination:', build)

  const index = await render('/', options)
  await write(index, join(build, '/index.html'))

  // posts
  const posts = await search(`${process.cwd()}/posts/**/*.md`)

  for (const post of posts) {
    const href = link(post)
    const page = await render(href, options)
    await write(page, join(build, href))
  }

  // static files
  const static = await search(`${process.cwd()}/static/**/!(index.html|post.html)`)
  const assets = await search(`${process.cwd()}/posts/**/!(*.md)`)

  for (const file of static)
    await copy(file, join(build, file.replace(`${process.cwd()}/static`, '')))

  for (const file of assets)
    await copy(file, join(build, file.replace(`${process.cwd()}/posts`, '')))

  console.log('build complete!', `(${Date.now() - now}ms)`)
})()
