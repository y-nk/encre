#!/usr/bin/env node

const express = require('express')
const serve = require('../serve')

const { argv } = process
const args = argv.slice(2)
const config = args.shift()

const options = config
  ? require(`${process.cwd()}/${config}`)
  : {}

const app = express()

// home page
app.get('/*', serve(options))

// main
const port = process.env.PORT || 9999

app.listen(port, () => {
  console.log(`\n  development server running on http://localhost:${port}/\n`)
})
