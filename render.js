const has = require('./has')
const read = require('./read')

const resolve = require('./resolve')
const list = require('./posts')

const layout = require('./layout')

// default renderers
const post = require('./renderers/post')

const _head  = require('./renderers/head')
const _index = require('./renderers/index')
const _title = require('./renderers/title')

module.exports = async (path, {
  head  = _head,  // renderer for <head />
  index = _index, // renderer for the index's list of posts
  title = _title  // renderer for the post title (from metadata)
} = {}) => {

  // strip slash
  if (path.startsWith('/'))
    path = path.slice(1)

  // render index
  if (path === '' || path === 'index.html') { 
    const posts = await list()
    const metas = posts.map(({ meta }) => meta)
    const data = await index(metas)

    const dom = await layout()
    const { document } = dom.window

    head(document)

    document
      .getElementById('main')
      .innerHTML = data  
  
    return dom.serialize()
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

  // get post infos
  const { meta, data } = await post(file)

  const dom = await layout(meta?.layout ?? 'post')
  const { document } = dom.window
    
  head(document, meta)

  document
    .getElementById('main')
    .innerHTML = `${title(meta)} ${data}`

  return dom.serialize()
}
