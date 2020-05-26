const has = require('./has')
const read = require('./read')

const resolve = require('./resolve')
const list = require('./posts')
const post = require('./post')

const layout = require('./layout')
const _head = require('./head')
const _index = require('./index')

module.exports = async (path, { head = _head, index = _index } = {}) => {
  // strip slash
  if (path.startsWith('/'))
    path = path.slice(1)

  // render index
  if (path === '' || path === 'index.html') {
    const dom = await layout()
    const { document } = dom.window
  
    const posts = await list()
    const data = await index(document, posts)

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

  const dom = await layout()
  const { document } = dom.window

  const { meta, data } = await post(file)
    
  head(document, meta)

  document
    .getElementById('main')
    .innerHTML = data

  return dom.serialize()
}
