const has = require('./has')
const read = require('./read')

const resolve = require('./resolve')
const list = require('./posts')

const layout = require('./layout')

// default renderers
const post = require('./renderers/post')
const renderers  = require('./renderers')

module.exports = async (path, options = {}) => {
  // renderers
  const { head, index, title } = { ...renderers, ...options }

  // page generator
  const page = async (fetch, name, meta) => {
    // generate layout
    const dom = await layout(name)
    const { document } = dom.window

    // mutate head
    head(document, meta)

    // render
    document
      .getElementById('main')
      .innerHTML = await fetch()
  
    return dom.serialize()
  }

  // =================================================================

  // strip slash
  if (path.startsWith('/'))
    path = path.slice(1)

  // render index
  if (path === '' || path === 'index.html') { 
    // get posts list
    const posts = await list()
    const metas = posts.map(({ meta }) => meta)

    return page(() => index(metas))
  }

  // try out assets
  const files = ['static', 'posts']
    .map(directory => `${process.cwd()}/${directory}/${path}`)

  for (const file of files)
    if (await has(file))
      return await read(file)

  // otherwise consider as post
  const file = await resolve(path)

  // should go to 404
  if (!file)
    return null



  const { meta, data } = await post(file)

  return page(
    () => `${title(meta)} ${data}`,
    meta?.layout ?? 'post',
    meta,
  )
}
