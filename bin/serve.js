#!/usr/bin/env node
const express = require('express')

const config = require('./config')
const router = require('../src/router')

const app = express()
app.use(router(config))

// main
const port = process.env.PORT || 9999

app.listen(port, () => {
  console.log(`\n  development server running on http://localhost:${port}/\n`)
})
