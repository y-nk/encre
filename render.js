const has = require('./has')
const read = require('./read')

const resolve = require('./resolve')
const list = require('./posts')

const layout = require('./layout')

// default renderers
const post = require('./renderers/post')

const $head  = require('./renderers/head')
const $index = require('./renderers/index')
const $title = require('./renderers/title')

module.exports = async (path, {
  head  = $head,  // renderer for <head />
  index = $index, // renderer for the index's list of posts
  title = $title  // renderer for the post title (from metadata)
} = {}) => {

  // strip slash
  if (path.startsWith('/'))
    path = path.slice(1)

  // render index
  if (path === '' || path === 'index.html') { 
    // get posts list
    const posts = await list()
    const metas = posts.map(({ meta }) => meta)

    // generate layout
    const dom = await layout()
    const { document } = dom.window

    // mutate head
    head(document)

    // render
    document
      .getElementById('main')
      .innerHTML = await index(metas)
  
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

  // generate layout
  const dom = await layout(meta?.layout ?? 'post')
  const { document } = dom.window
    
  // mutate
  head(document, meta)

  // render
  document
    .getElementById('main')
    .innerHTML = `${title(meta)} ${data}`

  return dom.serialize()
}
