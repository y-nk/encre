const { Router } = require('express')

const defaults = require('./defaults')

const mimetypes = require('./mimetypes')
const static = require('./static')

const { route: index } = require('../modules/index')
const { route: atom }  = require('../modules/atom')
const { route: post }  = require('../modules/post')

module.exports = options => {
  const router = new Router()

  // options are injected in request so the modules
  // can reuse them freely
  router.use((req, _, next) => {
    req.encre = {
      ...defaults,
      ...options,
    }
    
    next()
  })

  // basic things
  router.use(mimetypes)
  router.use(static)

  // index module
  router.get('/', index)
  router.get('/index.html', index)

  // rss module
  router.get('/feed.xml', atom)

  // post module
  router.get('/*', post)

  return router
}
