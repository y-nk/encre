#!/usr/bin/env node
process.env.NODE_ENV = 'development'
const express = require('express')

const config = require('./config')
const router = require('../src/router')

// main
const port = process.env.PORT || 9999
const url = `http://localhost:${port}/`

// mutate for proper linking
config.metadata = { ...config.metadata, url }

const app = express()
app.use(router(config))

app.listen(port, () => {
  console.log(`\n  development server running on ${url}\n`)
})
